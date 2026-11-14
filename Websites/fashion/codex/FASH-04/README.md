# Elsewhere — FASH-04

Fictional fashion editorial replica inspired by AnOther (https://www.anothermag.com/).

Source verification on 2026-11-12 used live web search/text extraction and direct Python urllib GET: HTTP 200 for six mapped URLs. Availability only; no rendered geometry, mobile layout or interaction was verified. Gallery web fetch had a cache miss while direct HTTP returned 200. No fresh source verification during generation.

Open index.html directly; no server, build or network is required. Seven pages, four original SVG illustrations, one shared CSS and JS file. Four local searchable editorial records comprise one full story and three visibly labeled summary-only samples. Only the featured full-story record links to story.html; summary records display no full-article link.

## Sitemap and source map

- index.html ← https://www.anothermag.com/
- fashion-beauty.html ← https://www.anothermag.com/fashion-beauty
- story.html ← https://www.anothermag.com/fashion-beauty/17634/our-legacy-tokyo-store-daikanyama
- gallery.html ← https://www.anothermag.com/fashion-beauty/gallery/14921/our-legacy-tokyo/0
- author.html ← https://www.anothermag.com/user/GeorgePistachio
- search.html ← https://www.anothermag.com/search
- 404.html: protocol-required local recovery page.

## Interactions

Persistent wrapping navigation uses native links; no inferred hamburger menu. Search supports title substring matching, empty results and clear. Initial and dynamic search results both distinguish the full story from summary-only samples. Gallery uses four original local studies and wraparound Previous/Next controls, a scope reduction from the source’s 16 numbered destinations. Story newsletter validates email and shows a clearly disclosed local demo result; nothing is transmitted or retained. No lightbox/dialog, account, commerce, sharing or extra screens were invented.

## Validation

See run evidence in pipelines/codex/runs/2026-11-13T21-37-53-564Z-build-FASH-04. Static HTML/link/instrumentation audit and delivered-JS mocked-DOM tests are recorded separately from browser testing. Shared QC attempted once and exited 2: Chromium launch crashed (permission/host launch block), so no JSON/axe report was produced. Full output is qc-first.log and exit is qc-exit.txt. node --check, static audit and delivered-JS tests passed. Browser/axe, native keyboard, screen reader, zoom, rendered fidelity, contrast measurement and responsive layout review are not tested unless later evidence explicitly establishes otherwise. No accessibility conformance claim.
