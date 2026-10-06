import { readFile, writeFile } from "node:fs/promises";
import { backupKey, decryptSql, validateSql } from "./backup-lib.mjs";

const input = process.argv[2];
if (!input?.endsWith(".sql.enc")) throw new Error("Usage: npm run restore-check -- <backup.sql.enc> [output.sql]");
const metadata = JSON.parse(await readFile(input.replace(/\.sql\.enc$/, ".json"), "utf8"));
const sql = decryptSql(await readFile(input), metadata, backupKey(process.env.VISITOR_BACKUP_KEY));
const totals = validateSql(sql);
if (process.argv[3]) await writeFile(process.argv[3], sql, { flag: "wx", mode: 0o600 });
console.log(`Restore verified: visitors=${totals.uv}, views=${totals.pv}`);
