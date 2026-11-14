# REST-05 QC evidence

## Executed

- PASS — `node --check js/main.js`, JavaScript syntax.
- PASS — standalone HTMLParser static audit of six pages, 92 references (relative files/assets and fragments), one H1 per page, landmarks, skip target, unique IDs, image alt presence, required files, valid JSON, prohibited file types and network JS. 18 component types: inventory page lists match actual data-component selectors. Evidence: run `static-audit.json` and reproducible `static-audit.py` (execute from repository root).
- PASS — coordinator's independent source/sitemap/component review, recorded separately as `coordinator-source-review.json` in this run. This does not execute controls or establish rendered fidelity.
- BLOCKED / NOT TESTED — shared QC was actually attempted once using `record-qc.mjs REST-05 --run 2026-11-14T05-07-13-605Z-build-REST-05`. Actual tool exit 2. Chromium could not launch: `bootstrap_check_in ... Permission denied (1100)`. No axe/layout/runtime results or browser JSON report were produced. Log: `qc-2026-11-14T05-10-13-422Z.log`.

## Seven protocol gates

| Gate | Result and scope |
|---|---|
| Technology | PASS source/static inspection: HTML5, CSS3, vanilla JS and local SVGs, no build or remote runtime dependency |
| Completeness | PASS static audit: five approved pages plus local 404; required docs, metadata and assets |
| Structure | PASS source/static inspection of landmarks, hierarchy, data metadata and approved regions; rendered source fidelity NOT TESTED |
| Interaction | NOT TESTED in browser; source inspected manual gallery wraparound/status, mobile expanded state and Escape/focus return, relative navigation, native footer disclosure |
| Accessibility | NOT TESTED in browser; shared QC blocked before axe; semantic source checks passed but no conformance claim |
| Traceability | PASS static source/page/component mapping; initial output and immutable task/protocol snapshots retained |
| Scope | PASS source review: sparse detail, directory entries, no added form, account, checkout, live inquiry, menu or reservation data |

## Remaining limitations

No local visual rendering, 375/1280 layout scan, real keyboard/control activation, focus rendering, screen-reader, contrast rendering, zoom/reflow or source layout comparison was executed. Parent previously found browser preview host unavailable; this worker did not retry CUA. No screenshot exists. WCAG 2.2 AA is a target only. Human acceptance is pending.

No website code corrections followed initial snapshot or first QC. Only QA/validation documentation was finalized. `initial-output/` preserves pre-QC site state; `delivery.zip` and `delivery-sha256.json` cover final delivery. No publication, commits, or other-model edits.
