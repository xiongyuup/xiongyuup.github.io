import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { randomBytes, randomUUID } from "node:crypto";
import worker from "../src/worker.mjs";
import { decryptSql, encryptSql, validateSql } from "../scripts/backup-lib.mjs";
import { maskedIp, purgeDetails } from "../src/admin.mjs";

const schema = readFileSync(new URL("../migrations/0001_counter.sql", import.meta.url), "utf8");

function database() {
    const sqlite = new DatabaseSync(":memory:");
    sqlite.exec(schema);
    sqlite.exec(readFileSync(new URL("../migrations/0002_visit_details.sql", import.meta.url), "utf8"));
    const prepare = (sql) => {
        let args = [];
        return {
            bind(...values) { args = values; return this; },
            async first() { return sqlite.prepare(sql).get(...args); },
            async run() { return this.execute(); },
            execute() {
                const stmt = sqlite.prepare(sql);
                if (sql.trim().startsWith("SELECT")) return { results: stmt.all(...args) };
                stmt.run(...args);
                return { results: [] };
            }
        };
    };
    return {
        sqlite,
        prepare,
        async batch(statements) {
            sqlite.exec("BEGIN");
            try {
                const result = statements.map((statement) => statement.execute());
                sqlite.exec("COMMIT");
                return result;
            } catch (error) {
                sqlite.exec("ROLLBACK");
                throw error;
            }
        }
    };
}

const origin = "https://xiongyuup.github.io";
function visit(db, visitorId, eventId, requestOrigin = origin) {
    return worker.fetch(new Request("https://counter.example/visit", {
        method: "POST",
        headers: { Origin: requestOrigin, "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, eventId })
    }), { DB: db, SITE_ORIGIN: origin });
}

test("history seeds once, repeat events are idempotent, distinct visitors count once", async () => {
    const db = database();
    try {
        db.sqlite.exec(schema);
        const visitor = randomUUID();
        const event = randomUUID();
        const first = await visit(db, visitor, event);
        assert.equal(first.status, 200);
        assert.deepEqual(await first.json(), { uv: 20, pv: 46, includesHistory: true });
        const duplicate = await visit(db, visitor, event);
        assert.deepEqual(await duplicate.json(), { uv: 20, pv: 46, includesHistory: true });
        const again = await visit(db, visitor, randomUUID());
        assert.deepEqual(await again.json(), { uv: 20, pv: 47, includesHistory: true });
        const another = await visit(db, randomUUID(), randomUUID());
        assert.deepEqual(await another.json(), { uv: 21, pv: 48, includesHistory: true });
        assert.equal(db.sqlite.prepare("SELECT COUNT(*) AS count FROM visitors WHERE visitor_key = ?").get(visitor).count, 0);
        const stats = await worker.fetch(new Request("https://counter.example/stats"), { DB: db, SITE_ORIGIN: origin });
        assert.deepEqual(await stats.json(), { uv: 21, pv: 48, includesHistory: true });
        assert.equal(db.sqlite.prepare("SELECT pv FROM counters").get().pv, 3);
    } finally { db.sqlite.close(); }
});

test("invalid origins and payloads cannot alter statistics", async () => {
    const db = database();
    try {
        assert.equal((await visit(db, randomUUID(), randomUUID(), "https://unrelated.example")).status, 403);
        assert.equal((await visit(db, "not-a-uuid", randomUUID())).status, 400);
        const malformed = await worker.fetch(new Request("https://counter.example/visit", {
            method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{broken"
        }), { DB: db, SITE_ORIGIN: origin });
        assert.equal(malformed.status, 400);
        assert.equal(db.sqlite.prepare("SELECT pv FROM counters").get().pv, 0);
        const preflight = await worker.fetch(new Request("https://counter.example/visit", {
            method: "OPTIONS", headers: { Origin: origin }
        }), { DB: db, SITE_ORIGIN: origin });
        assert.equal(preflight.status, 204);
        assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), origin);
        const unavailable = await visit({ batch: async () => { throw new Error("database down"); } }, randomUUID(), randomUUID());
        assert.equal(unavailable.status, 503);
    } finally { db.sqlite.close(); }
});

test("simultaneous retry of the same event counts once", async () => {
    const db = database();
    try {
        const visitor = randomUUID();
        const event = randomUUID();
        const results = await Promise.all(Array.from({ length: 8 }, () => visit(db, visitor, event)));
        for (const result of results) assert.deepEqual(await result.json(), { uv: 20, pv: 46, includesHistory: true });
    } finally { db.sqlite.close(); }
});

test("encrypted backup restores real records; tampering and missing history fail", async () => {
    const db = database();
    try {
        await visit(db, randomUUID(), randomUUID());
        const triggerStart = schema.indexOf("CREATE TRIGGER");
        const base = schema.slice(0, triggerStart);
        const visitor = db.sqlite.prepare("SELECT * FROM visitors").get();
        const event = db.sqlite.prepare("SELECT * FROM page_views").get();
        const sql = `${base}\nUPDATE counters SET uv=1, pv=1;\n` +
            `INSERT INTO visitors VALUES ('${visitor.visitor_key}', '${visitor.first_seen}');\n` +
            `INSERT INTO page_views VALUES ('${event.event_id}', '${event.visitor_key}', '${event.created_at}');\n` +
            schema.slice(triggerStart);
        assert.deepEqual(validateSql(sql), { uv: 20, pv: 46 });
        const key = randomBytes(32);
        const encrypted = encryptSql(sql, key);
        const restored = decryptSql(encrypted.ciphertext, encrypted.metadata, key);
        assert.deepEqual(validateSql(restored), { uv: 20, pv: 46 });
        assert.throws(() => decryptSql(encrypted.ciphertext, encrypted.metadata, randomBytes(32)));
        const damaged = Buffer.from(encrypted.ciphertext);
        damaged[0] ^= 1;
        assert.throws(() => decryptSql(damaged, encrypted.metadata, key));
        assert.throws(() => validateSql("CREATE TABLE unrelated (id INTEGER)"));
        assert.throws(() => validateSql(sql + "\nUPDATE counters SET pv = 99;"));
    } finally { db.sqlite.close(); }
});

test("admin data is private, input is bounded, and page has a restrictive CSP", async () => {
    const db = database();
    const env = { DB: db, SITE_ORIGIN: origin, ADMIN_TOKEN: "a".repeat(48) };
    try {
        const anonymous = await worker.fetch(new Request("https://counter.example/admin/api"), env);
        assert.equal(anonymous.status, 401);
        assert.equal(anonymous.headers.get("Access-Control-Allow-Origin"), null);
        const request = (suffix = "", key = env.ADMIN_TOKEN, requestOrigin) => worker.fetch(new Request("https://counter.example/admin/api" + suffix, {
            headers: { Authorization: "Bearer " + key, ...(requestOrigin ? { Origin: requestOrigin } : {}) }
        }), env);
        assert.equal((await request("", "wrong")).status, 401);
        assert.equal((await request("?page=-1")).status, 400);
        assert.equal((await request("?days=365")).status, 400);
        assert.equal((await request("", env.ADMIN_TOKEN, "https://attacker.example")).status, 403);
        const valid = await request();
        assert.equal(valid.status, 200);
        const data = await valid.json();
        assert.deepEqual(data.totals, { uv: 19, pv: 45 });
        assert.deepEqual(data.rows, []);
        const html = await worker.fetch(new Request("https://counter.example/admin"), env);
        assert.match(html.headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
        assert.equal(html.headers.get("Cache-Control"), "no-store");
        assert.ok(!(await html.text()).includes(env.ADMIN_TOKEN));
    } finally { db.sqlite.close(); }
});

test("details redact IPs, parse devices, deduplicate, and expire without changing totals", async () => {
    const db = database();
    try {
        assert.equal(maskedIp("192.0.2.54"), "192.0.2.0/24");
        assert.equal(maskedIp("2001:db8:abcd:1234::1"), "2001:db8:abcd::/48");
        assert.equal(maskedIp("::1"), "0:0:0::/48");
        assert.equal(maskedIp("not-an-ip"), "Unknown");
        const body = JSON.stringify({ visitorId: randomUUID(), eventId: randomUUID() });
        const request = () => new Request("https://counter.example/visit", { method: "POST", headers: {
            Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.54",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1"
        }, body });
        for (let i = 0; i < 2; i++) assert.equal((await worker.fetch(request(), { DB: db, SITE_ORIGIN: origin })).status, 200);
        const detail = db.sqlite.prepare("SELECT * FROM visit_details").get();
        assert.equal(detail.ip_mask, "192.0.2.0/24");
        assert.equal(detail.device, "mobile");
        assert.equal(detail.os, "iOS");
        assert.equal(db.sqlite.prepare("SELECT COUNT(*) AS n FROM visit_details").get().n, 1);
        db.sqlite.prepare("UPDATE visit_details SET created_at=?").run(new Date(Date.now() - 31 * 86400000).toISOString());
        await purgeDetails({ DB: db });
        assert.equal(db.sqlite.prepare("SELECT COUNT(*) AS n FROM visit_details").get().n, 0);
        assert.equal(db.sqlite.prepare("SELECT pv FROM counters").get().pv, 1);
    } finally { db.sqlite.close(); }
});
