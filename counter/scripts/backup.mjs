import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { backupKey, decryptSql, encryptSql, validateSql } from "./backup-lib.mjs";

const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const database = process.env.CLOUDFLARE_DATABASE_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
const key = backupKey(process.env.VISITOR_BACKUP_KEY);
if (!/^[a-f0-9]{32}$/i.test(account || "") || !/^[a-f0-9-]{36}$/i.test(database || "") || !token) {
    throw new Error("Cloudflare account, database and API token are required");
}

const endpoint = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/export`;
let bookmark;
let sql;
for (let attempt = 0; attempt < 60; attempt++) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ output_format: "polling", dump_options: {
            tables: ["historical_counts", "visitors", "page_views", "counters"]
        }, ...(bookmark ? { current_bookmark: bookmark } : {}) }),
        signal: AbortSignal.timeout(30000)
    });
    if (!response.ok) throw new Error(`Database export failed (${response.status})`);
    const data = await response.json();
    if (!data.success || data.result?.status === "error") throw new Error("Cloudflare rejected the database export");
    if (data.result?.status === "complete") {
        const download = new URL(data.result.result.signed_url);
        if (download.protocol !== "https:") throw new Error("Invalid backup download URL");
        const dump = await fetch(download, { signal: AbortSignal.timeout(30000) });
        if (!dump.ok) throw new Error("Could not download database export");
        sql = await dump.text();
        break;
    }
    bookmark = data.result?.at_bookmark;
    if (!bookmark) throw new Error("Database export returned no polling bookmark");
    await new Promise((resolve) => setTimeout(resolve, 2000));
}
if (!sql) throw new Error("Database export timed out");
// Filtered D1 exports omit triggers; retrieve the live counting trigger separately.
const triggerResponse = await fetch(endpoint.replace(/\/export$/, "/query"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql: "SELECT sql FROM sqlite_master WHERE type='trigger' AND name='count_new_view'" }),
    signal: AbortSignal.timeout(30000)
});
if (!triggerResponse.ok) throw new Error("Could not retrieve counting schema");
const triggerData = await triggerResponse.json();
const triggerSql = triggerData.result?.[0]?.results?.[0]?.sql;
if (!triggerData.success || typeof triggerSql !== "string" || !triggerSql.startsWith("CREATE TRIGGER")) {
    throw new Error("Live counting trigger is missing");
}
sql += "\nDROP TRIGGER IF EXISTS count_new_view;\n" + triggerSql + ";\n";
// Keep IP/device details out of permanent archives; restore an empty detail table.
sql += "\n" + await readFile(new URL("../migrations/0002_visit_details.sql", import.meta.url), "utf8");

const totals = validateSql(sql);
const encrypted = encryptSql(sql, key);
// Restore the encrypted copy in memory before accepting the backup.
validateSql(decryptSql(encrypted.ciphertext, encrypted.metadata, key));
const createdAt = new Date().toISOString();
const name = createdAt.replace(/[:.]/g, "-");
const directory = fileURLToPath(new URL("../../counter-backups/", import.meta.url));
await mkdir(directory, { recursive: true });
await writeFile(path.join(directory, `${name}.sql.enc`), encrypted.ciphertext, { flag: "wx" });
await writeFile(path.join(directory, `${name}.json`), JSON.stringify({ ...encrypted.metadata, createdAt, totals }, null, 2) + "\n", { flag: "wx" });
const api = process.env.VISITOR_COUNTER_URL;
if (api) {
    const url = new URL(api);
    if (url.protocol !== "https:" || url.origin !== api) throw new Error("VISITOR_COUNTER_URL must be an HTTPS origin");
    const snapshot = { ...totals, includesHistory: true, updatedAt: createdAt, api };
    await writeFile(fileURLToPath(new URL("../../visitor-totals.json", import.meta.url)), JSON.stringify(snapshot, null, 2) + "\n");
}
console.log(`Backup verified and encrypted: ${name}; visitors=${totals.uv}, views=${totals.pv}`);
