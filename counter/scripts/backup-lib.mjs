import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

export function backupKey(value) {
    const key = Buffer.from(value || "", "base64");
    if (key.length !== 32) throw new Error("VISITOR_BACKUP_KEY must be a base64-encoded 32-byte key");
    return key;
}

export function validateSql(sql) {
    const db = new DatabaseSync(":memory:");
    try {
        db.exec(sql);
        const baseline = db.prepare("SELECT uv, pv FROM historical_counts WHERE source = 'ibruce-before-2026-10-06'").get();
        if (baseline?.uv !== 19 || baseline?.pv !== 45) throw new Error("Confirmed historical baseline is missing or changed");
        const counter = db.prepare("SELECT uv, pv FROM counters WHERE id = 1").get();
        const raw = db.prepare("SELECT (SELECT COUNT(*) FROM visitors) AS uv, (SELECT COUNT(*) FROM page_views) AS pv").get();
        if (!counter || counter.uv !== raw.uv || counter.pv !== raw.pv) throw new Error("Restored counter does not match visit records");
        const integrity = db.prepare("PRAGMA integrity_check").get();
        if (integrity.integrity_check !== "ok") throw new Error("SQLite integrity check failed");
        const totals = db.prepare(`SELECT
            counters.uv + COALESCE((SELECT SUM(uv) FROM historical_counts), 0) AS uv,
            counters.pv + COALESCE((SELECT SUM(pv) FROM historical_counts), 0) AS pv
            FROM counters WHERE id = 1`).get();
        if (!totals || !Number.isSafeInteger(totals.uv) || !Number.isSafeInteger(totals.pv) || totals.uv < 19 || totals.pv < 45) {
            throw new Error("Historical baseline missing from restored database");
        }
        if (!db.prepare("SELECT name FROM sqlite_master WHERE type = 'trigger' AND name = 'count_new_view'").get()) {
            throw new Error("Restored database is missing its counting trigger");
        }
        // A disposable transaction checks that counting also works after a restore.
        db.exec("BEGIN");
        try {
            db.prepare("INSERT INTO page_views VALUES (?, ?, ?)").run(`restore-check-${randomBytes(16).toString("hex")}`, `restore-visitor-${randomBytes(16).toString("hex")}`, new Date().toISOString());
            const checked = db.prepare("SELECT uv, pv FROM counters WHERE id = 1").get();
            if (checked.uv !== counter.uv + 1 || checked.pv !== counter.pv + 1) throw new Error("Restored counting trigger does not work");
        } finally {
            db.exec("ROLLBACK");
        }
        return { uv: totals.uv, pv: totals.pv };
    } finally {
        db.close();
    }
}

export function encryptSql(sql, key) {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    cipher.setAAD(Buffer.from("homepage-visitor-backup-v1"));
    const ciphertext = Buffer.concat([cipher.update(sql, "utf8"), cipher.final()]);
    return {
        ciphertext,
        metadata: {
            version: 1,
            algorithm: "aes-256-gcm",
            iv: iv.toString("base64"),
            tag: cipher.getAuthTag().toString("base64"),
            sha256: createHash("sha256").update(sql).digest("hex")
        }
    };
}

export function decryptSql(ciphertext, metadata, key) {
    if (metadata.version !== 1 || metadata.algorithm !== "aes-256-gcm") throw new Error("Unsupported backup format");
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(metadata.iv, "base64"));
    decipher.setAAD(Buffer.from("homepage-visitor-backup-v1"));
    decipher.setAuthTag(Buffer.from(metadata.tag, "base64"));
    const sql = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
    if (createHash("sha256").update(sql).digest("hex") !== metadata.sha256) throw new Error("Backup checksum mismatch");
    return sql;
}
