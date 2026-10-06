import { readFile, mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const file = process.argv[2];
if (!file) throw new Error("Usage: node scripts/import-baseline.mjs <provider-raw-counts.json>");
const data = JSON.parse(await readFile(file, "utf8"));
if (![data.uv, data.pv].every((value) => Number.isSafeInteger(value) && value >= 0) || data.pv < data.uv) {
    throw new Error("Expected raw provider totals { uv, pv }; do not include the earlier 19/45 baseline");
}
const config = JSON.parse(await readFile("wrangler.local.json", "utf8"));
const database = config.d1_databases[0].database_name;
const sql = `INSERT INTO historical_counts (source, uv, pv, recorded_at)
VALUES ('busuanzi-cc-until-d1', ${data.uv}, ${data.pv}, '${new Date().toISOString()}')
ON CONFLICT(source) DO UPDATE SET
uv = MAX(historical_counts.uv, excluded.uv),
pv = MAX(historical_counts.pv, excluded.pv),
recorded_at = excluded.recorded_at;\n`;
await mkdir(".wrangler", { recursive: true });
const filename = path.join(".wrangler", "import-baseline.sql");
await writeFile(filename, sql);
const command = spawnSync(process.execPath, [
    "node_modules/wrangler/bin/wrangler.js", "d1", "execute", database,
    "--remote", "--file", filename, "--config", "wrangler.local.json"
], { stdio: "inherit" });
if (command.error) throw command.error;
process.exitCode = command.status ?? 1;
