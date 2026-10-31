# Visitor Records

## Historical Baseline

The site owner confirmed these totals on 2026-10-06:

- Previous provider: `busuanzi.ibruce.info`
- Visitors (UV): **19**
- Views (PV): **45**

These are the earlier service's totals, not the current service's totals.
The `visitorHistory` constant in `index.html` preserves this baseline in Git.
The homepage adds it to the current provider's raw counts exactly once.
Do not replace or increase the baseline with the displayed combined totals.

Visitors are an estimate after migration: the two services cannot identify
and deduplicate the same person across their separate records.

## Current Provider And Cache

- Current provider: `cdn.busuanzi.cc`
- Migration date: 2026-10-06
- Browser cache key: `visitor-counts:busuanzi.cc:2026-10-06`
- Cached values: raw provider UV/PV and the time they were saved; no history added.

On a failed request, a returning browser displays its last recorded totals.
If the provider returns smaller totals, the page keeps the cached totals instead
of overwriting them. Cached values are local to that browser and are lost when
its storage is cleared. They are not a shared database backup.

## Future Migrations

Before switching providers, record the old provider's exact raw UV/PV with a date
in this file and commit it. Add those raw counts to the existing historical
baseline once, then use a new cache key for the new provider. If the new provider
migrates the old data itself, do not add the same counts again.

Complete long-term retention of new visits needs a database under the site
owner's control, with scheduled backups and a tested restore procedure.
GitHub Pages serves static files; browser caching and third-party counters alone
cannot guarantee retention of every visit.

## Owned Database Preparation

On 2026-10-06, the owner requested migration to an owned Cloudflare Worker and D1
database with encrypted daily GitHub backups. Code, migration, backup and restore
checks are in `counter/`; setup and completion checks are in `counter/README.md`.
The confirmed 19/45 baseline is also seeded idempotently in the SQL migration.

Cloudflare registration and authentication, the remote deployment, the final
busuanzi.cc raw-count import and the first remote backup must happen before
cutover. Until those checks pass, `visitorApi` stays empty and the current live
counter continues operating. Do not describe local tests as an active deployment.

## Deployment Progress On 2026-10-31

- Device-code OAuth completed successfully, without a localhost callback.
- The owner account's D1 database and Worker were created and deployed.
- The remote database contains the confirmed 19 UV / 45 PV baseline.
- A first remote SQL export was encrypted and restored in memory successfully.
  Its encrypted dump and manifest are retained in `counter-backups/`.
- The recovery encryption key is retained separately on the owner's computer,
  outside this repository, and configured as a GitHub Actions secret.
- GitHub account/database variables are configured. Scheduled backups remain
  disabled until a scoped Cloudflare token is supplied and the first run passes.
- `visitorApi` is still empty: requests to the workers.dev endpoint fail from the
  current network. A reachable endpoint must be verified before changing the site.
- The old provider returned HTTP 502 during migration checks. Its current raw
  counts could not be recovered; do not treat the 19/45 baseline as a complete
  record of visits after 2026-10-06.
