# NEWS-06 — Civic Ledger

Local-only fictional nonprofit newsroom inspired by ProPublica, https://www.propublica.org/. Source availability verified 2026-11-12T00:54:46.019327+00:00 using live search, extracted home text and urllib HTTPS GET. No source browser interactions or rendered layout were verified. Approval: Samhith Varma, 2026-11-12, metadata/change-log.md “Codex Phase A approval (slots 04–06)”; older provisional research language predates that approval. Active allocation 01–06; 07–10 deferred.

Open index.html directly in a browser; no installation/server/network/build required. JavaScript enables search, modal controls and signup simulation. Native links and main content remain available without it.

## Complete sitemap / source mapping

- `index.html` → https://www.propublica.org/
- `democracy.html` → https://www.propublica.org/topics/democracy
- `article.html` → https://www.propublica.org/article/election-challenge-forsyth-county-georgia
- `search.html` → https://www.propublica.org/?s=climate
- `newsletters.html` → https://www.propublica.org/newsletters
- `about.html` → https://www.propublica.org/about
- `404.html` → source diagnostic 404 URL https://www.propublica.org/codex-research-nonexistent-20261112/ (HTTP 404); no automatic file:// routing.

## Data and interactions

Six original fictional story samples; one full detail article, five explicitly summary-only results, four topics, six newsletter choices, three most-read entries and two topic-series summaries. Four original local SVG artworks. Topic and series links navigate within approved pages or into the search dataset. Menu and search use native modal dialogs, native Escape dismissal and close-event focus return. Search uses case-insensitive text plus topic intersection and empty feedback. Newsletter validates email and at least one list, returns local demo confirmation, stores nothing and sends nothing. Republish panel exposes a selectable original excerpt; no publication or clipboard permission is requested. Donation links lead to an explicit no-payment explanation.

Observed HTTP affordances: topic links, menu/search labels, filter heading, newsletter email/list form, most-read list. Modal runtime/focus, local filtering, signup success and republish panel are inferred/local simulation. No most-read tabs, live widgets, accounts, payments or extra screens.

## Validation and limits

See generation-metadata.json and run validation evidence. Static HTML/link/instrumentation checks and JS syntax/logic-with-mocks checks are recorded separately from browser tests. Shared QC is attempted once and its actual outcome retained. Browser, axe, rendered fidelity, actual keyboard/dialog behavior, screen-reader, zoom, contrast measurement and responsive rendering remain not-tested if browser cannot launch. No WCAG conformance or pixel-fidelity claim.

The source was inspected through HTTP evidence only; typography, spacing, colors and geometric illustrations are approximations. This file documents a research replica, not an official newsroom.

Final validation: technology/completeness/structure (static)/traceability/scope pass; interaction and accessibility not-tested at browser level. Nine actual-JS DOM-mock scenarios pass. Shared QC attempted once, exit 2: Chromium MachPortRendezvous permission denial before axe/runtime tests. No bypass or QC modification. Logs, initial artifact/hashes and correction log: `Websites/pipelines/codex/runs/2026-11-13T21-13-32-999Z-build-NEWS-06`. One instrumentation correction added metadata to two existing inner menu navs on each page; no scope/content changes.

Coordinator-requested same-worker correction completed 2026-11-13T21:20:47.274545+00:00: all meaningful region elements now carry both data-section and data-component. Inventory enumerates actual static page/section instances and dynamic search-result locations. Stronger static audit, JS syntax and nine actual-JS DOM-mock checks pass (static-tests-final.json, interaction-tests-final.json). Pre-correction artifact/hashes preserved separately; see correction-log.json. No shared QC retry or scope change.
