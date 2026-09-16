# ZeePredict

**Status: PROTOTYPE — all content on the live site is fictional sample data.**

ZeePredict is an early-stage football prediction platform in a labelled demo
state. The current site is a visual prototype only: it has no real fixture
feed, no prediction engine, no automatic settlement, and no verified track
record. Any tips, dates, results or statistics shown are fictional samples
for layout demonstration.

## Current state (September 2026)

A CTO audit (see `ZEEPREDICT_CTO_AUDIT_2026-09-16.md` in the project workspace)
found that the previous build presented synthetic demo records as current,
real predictions, including a fabricated win rate. This branch contains the
48-hour containment fix: a persistent prototype banner on every page, removal
of all accuracy/track-record claims, removal of the client-side admin
(plaintext password), removal of the broken Firestore sync layer, and static
sample dates replacing the dynamic date generator.

## What has been removed and why

- `admin.html` and the `views/` admin copies — client-side "authentication"
  with a plaintext password is not authentication. Editorial tooling returns
  in Phase 1 with server-side auth, roles and MFA.
- `firebase-config.js`, `firebase-sync.js` and all Firebase CDN scripts —
  anonymous Firestore access was non-functional (403) and the sync layer
  would have corrupted data even if enabled. Cloud publishing returns as a
  server-authorised API in Phase 1.
- `server.js`, `package.json`, `package-lock.json` — Express is irrelevant to
  GitHub Pages hosting and only added dependency/attack surface.
- Legacy/archive folders and broken PDF documentation.

## Roadmap

1. **Phase 0 — Containment (done in this branch).** No visitor can mistake
   sample data for a real track record.
2. **Phase 1 — Trusted data foundation (days 3–14).** Managed PostgreSQL,
   server-side auth + RBAC, sports-data provider proof of concept, editorial
   publish flow, CI and monitoring.
3. **Phase 2 — Trustworthy public MVP (days 15–45).** Real fixture-linked
   predictions, immutable publish timestamps, automatic settlement, public
   result ledger.

## Legal baseline (drafts — pending counsel review)

`responsible-gaming.html`, `terms.html`, `privacy.html` and `contact.html`
are placeholder pages. ZeePredict does not accept bets and makes no guarantees
of outcomes. Strictly 18+.

## Website

Live at: https://martinzico35-afk.github.io/myworkspace/
