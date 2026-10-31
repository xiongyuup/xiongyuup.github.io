# Owned Visitor Counter

Status (2026-10-31): the owner completed device authorization. The Worker and D1
database have been deployed and the 19/45 baseline has been seeded. The GitHub
endpoint health check and first scheduled-workflow manual backup run both passed.
The encrypted backup was pulled back to the owner's computer and decrypted and
restore-verified using the separately stored recovery key. Automatic daily backups
are enabled. The homepage now uses the owned API. Where workers.dev cannot be
reached, it shows cached or same-site backup totals and offers retry. Such visits
are NOT recorded by the database until a request actually reaches it; the snapshot
is a display fallback, not an alternative write endpoint.

## Data

- D1 owns the durable counters and anonymous browser identities.
- The initial migration seeds exactly 19 visitors and 45 views, once.
- Browser identities are random UUIDs. The database stores SHA-256 hashes, plus
  separate short-lived masked IP ranges and parsed device details, never full IP
  addresses or raw user-agent strings. Clearing browser storage or using another
  device creates a new visitor. Historical cross-provider UV remains an estimate.
- Each page load gets an event UUID. Retry sends the same UUID and cannot count
  the visit twice. Refreshing the page creates a new event and increases PV.
- `/stats` is read-only. `/visit` accepts JSON from the configured homepage origin.
  CORS is not authentication; a determined bot can spoof an origin. These are
  website usage estimates, not audited human counts.

## Deploy After Account Registration

Run commands in `counter/`. Register and verify the account in the owner's own
browser, then run `npx wrangler login --device --browser=false --scopes account:read user:read workers:write workers_scripts:write d1:write`.
Open the printed Cloudflare verification URL in that same browser and enter the
short device code. Keep Wrangler running until it confirms success. This flow
does not redirect to localhost and avoids refused connections when a local
callback listener is unreachable or has timed out. If the device code expires,
start a new login; do not reuse the old code. Do not send passwords, email OTPs
or API tokens in chat.

1. `npm ci`
2. `npx wrangler whoami`
3. `npx wrangler d1 create xiongyu-homepage-visitors`
4. Create ignored `wrangler.local.json` from `wrangler.jsonc`, removing the
   `$schema` property if desired, and replacing the dummy database ID with the
   returned ID. Include the returned account ID as `account_id`.
5. `npx wrangler d1 migrations apply xiongyu-homepage-visitors --remote --config wrangler.local.json`
6. `npm run deploy`
7. Confirm the deployed `/stats` returns the migrated baseline without counting
   a visit. Check `/visit`, repeat the same event, and confirm it counted once.
8. Capture the existing busuanzi.cc **raw** UV/PV, not the displayed totals that
   already include 19/45. Save `{ "uv": <raw uv>, "pv": <raw pv> }` locally.
9. `node scripts/import-baseline.mjs <provider-raw-counts.json>`
10. Set `visitorApi` in `index.html` to the verified Worker origin (no trailing
    slash), review the diff, and publish the homepage. D1 returns combined totals;
    the frontend must not add 19/45 again.
11. After GitHub Pages updates and old in-flight requests settle, refresh the old
    provider snapshot and run the import again. This replaces the same source's
    baseline using MAX; it never adds that baseline twice. Record the final raw
    snapshot and migration date in `VISITOR-RECORDS.md`.

## Independent Daily Backups

The GitHub Actions workflow exports durable counting tables, restores them in memory,
checks integrity and row counts, verifies the counting trigger, encrypts it,
decrypts it and repeats the restore check. Only verified encrypted SQL and its
manifest enter Git. Plain SQL and identities are never committed. The repository
can be public because the dump uses authenticated AES-256-GCM encryption.

IP/device rows in `visit_details` are explicitly excluded from export. The
backup adds that table's empty schema, so recovery preserves lifetime counting
but does not recover IP/device history. Cloudflare's own short Time Travel
window is independent of this Git backup policy and may retain earlier states.

After verification, the backup workflow also updates `visitor-totals.json` with
only aggregate UV/PV, a timestamp and the API origin. GitHub Pages serves this
file as a read-only fallback when the browser cannot reach the API. It contains
no visitor identifiers. Because an Actions bot commit does not automatically
trigger another Pages build, the workflow explicitly requests a Pages build after
pushing the snapshot. Publication can still be delayed or fail independently of
the stored backup; the frontend labels it as backup totals, never as live data.

In repository Settings > Secrets and variables > Actions configure:

| Type | Name | Value |
| --- | --- | --- |
| Variable | `CLOUDFLARE_ACCOUNT_ID` | Account ID |
| Variable | `CLOUDFLARE_DATABASE_ID` | D1 database ID |
| Secret | `CLOUDFLARE_D1_BACKUP_TOKEN` | Owner-created token scoped to the account's D1 export access |
| Secret | `VISITOR_BACKUP_KEY` | Base64-encoded, cryptographically random 32-byte key |
| Variable | `VISITOR_BACKUP_ENABLED` | `true`, after all other settings are ready |

Keep a separate secure copy of `VISITOR_BACKUP_KEY`, for example in a password
manager. GitHub secrets cannot be read back. Losing the key loses access to
encrypted backups. Never rotate it without retaining previous keys.

Enable repository workflow permissions to write contents. Set the enable variable
and immediately run the workflow manually, download one backup and verify it
with the restore command below. The scheduled workflow runs daily at 02:30
Asia/Shanghai (18:30 UTC). GitHub may delay or disable scheduled runs; check its
failure notifications and last successful run. Do not assume a schedule alone
guarantees a backup. Keep an occasional offline copy of encrypted backups and
their manifests as well.

The initial deployment is incomplete until the remote database, imported
baseline, first backup, and restore check have all been verified.

The optional `Check Visitor Counter` workflow checks `/stats` from GitHub without
creating page views. Set the repository variable `VISITOR_COUNTER_URL` to the
verified API origin to enable it. It runs daily at 03:15 Asia/Shanghai and can
also be dispatched manually. Check Actions notifications for failures; a
successful check from GitHub does not prove that every visitor's network can
reach the endpoint.

## Restore Without Overwriting Production

With `VISITOR_BACKUP_KEY` available as a local environment variable:

```sh
npm run restore-check -- ../counter-backups/<timestamp>.sql.enc
npm run restore-check -- ../counter-backups/<timestamp>.sql.enc .wrangler/restored.sql
```

The second command writes SQL only to a new file and refuses to overwrite one.
Import into a **new recovery database**, verify `/stats` and idempotent counting
against it, then deliberately switch the Worker binding. Never run a dump over
the existing production database as the first recovery attempt. Future backups
must use the recovery database ID after the switch.

D1 also provides built-in Time Travel. Its free plan's recovery window is seven
days; Git backups retain encrypted snapshots beyond that window. Snapshot
recovery can lose visits since the last snapshot. Outages and blocked browser
requests cannot be counted reliably.

## Local Verification

```sh
npm test
npx wrangler deploy --dry-run
npx wrangler d1 migrations apply xiongyu-homepage-visitors --local
npm run dev
```

Reference: https://developers.cloudflare.com/d1/reference/time-travel/
Reference: https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/export/

## Owner Dashboard

The Worker serves `/admin`; `/admin/api` requires the `ADMIN_TOKEN` Worker secret.
It is a cryptographically random access key, not an API token from Cloudflare or
GitHub. Never commit it, put it in a URL, or send screenshots showing it. The
browser keeps it only in memory and clears it on logout or refresh. The dashboard
is same-origin, has no third-party scripts, sends no CORS allowance for admin
data, and disallows framing. To rotate it, use `wrangler secret put ADMIN_TOKEN
--config wrangler.local.json` and securely retain the new random key separately.

For this deployment, the owner's local key file is outside the repository in
`C:/Users/xiongyu/.codex/visitor-counter-recovery/admin-key.txt`. It is not the
backup encryption key. The homepage footer links to the protected dashboard.

New visits record time, masked IPv4 /24 or IPv6 /48, browser family, OS family,
device category and country code. These are approximate client/network signals,
not a way to identify a person. Previous visits have no backfilled details. A
daily Worker cron clears IP/device detail rows older than 30 days; time filters
never expose older rows. Lifetime anonymized event/visitor rows and cumulative
totals are preserved. The public homepage discloses this policy. The default
workers.dev hostname can still be inaccessible on some networks, including the
current owner's network; neither login nor counting can bypass that limitation.
