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
