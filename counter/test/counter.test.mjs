import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { randomBytes, randomUUID } from "node:crypto";
import worker from "../src/worker.mjs";
import { decryptSql, encryptSql, validateSql } from "../scripts/backup-lib.mjs";

const schema = readFileSync(new URL("../migrations/0001_counter.sql", import.meta.url), "utf8");

function database() {
    const sqlite = new DatabaseSync(":memory:");
    sqlite.exec(schema);
    const prepare = (sql) => {
        let args = [];
        return {
            bind(...values) { args = values; return this; },
            async first() { return sqlite.prepare(sql).get(...args); },
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
