# UNI-05 — Redbrook College

Independent fictional university research replica inspired by Dickinson College (small private liberal-arts stratum). Source: https://www.dickinson.edu/. Approved 2026-11-12 by Samhith Varma. Verification: 2026-11-12 HTTP GET plus live search/text extraction, not rendered browser evidence. See `pipelines/codex/research/UNI.md#uni-05` and `research/evidence/UNI-http-2026-11-12.json` in the research workspace.

Open `index.html` directly in a browser. No server, installation, external request or build is required. Shared files: `css/styles.css`, `js/main.js`; 2 original SVG illustrations.

## Complete sitemap and source mapping
- `index.html` ← https://www.dickinson.edu/
- `programs.html` ← https://www.dickinson.edu/homepage/199/academic_programs
- `biology.html` ← https://www.dickinson.edu/homepage/55/biology
- `admissions.html` ← https://www.dickinson.edu/homepage/287/admissions
- `apply.html` ← https://www.dickinson.edu/homepage/279/apply
- `tuition-aid.html` ← https://www.dickinson.edu/homepage/281/tuition_and_aid_overview
- `visit.html` ← https://www.dickinson.edu/homepage/278/visit
- `news.html` ← https://www.dickinson.edu/news
- `404.html`: approved intentional local recovery page.

8 mapped content pages plus 404, 9 HTML pages total. Directory omitted because no valid directory source was verified.

## Local interactions and datasets
Recruitment actions and consistent primary navigation; mobile menu with Escape dismissal. Site search uses 8 inline page records; program search uses 8 fictional program records; news search uses 4 original fictional stories. Biology is the only approved program detail, other listing records explicitly disclose that limit. Visit slideshow contains 3 manually selected scenes using 2 illustrations; 3 native visit questions and 2 native application policy disclosures. Inquiry validates name/email and gives demo-only confirmation without storage or network. Application and calculator destinations explain their simulation/nonfunctional boundaries; no application/account/payment is submitted. Form behavior approximates uninspected external source flows.

## Evaluation
Shared QC executed once and exited 2 because Chromium launch was blocked (SIGTRAP/EPERM). No axe or browser-page check ran and the shared executable emitted no JSON. Raw evidence: `qc-initial.log`; truthful attempt summary: `qc-attempt.json`. Independent static audit passed local paths/fragments, IDs, H1, landmarks, labels, alt presence and JSON parsing. `node --check js/main.js` passed. Six separate Node VM tests with DOM stubs passed menu/Escape logic, site/program/news search match/empty states, program reset, inquiry validation/simulated success and slideshow wrap. These do not establish real browser focus, keyboard behavior or rendering. Solid color token contrast calculations range from 7.46:1 to 14.46:1; image-overlay contrast is unverified. Evidence `static-results.json`, `interaction-results.json`, their reproducible scripts and initial generated artifact are stored outside this site under `pipelines/codex/runs/2026-11-13T15-34-51-770Z-build-UNI-05/`. Passing automation is not human acceptance or accessibility conformance.

## Limits
Source observations were HTTP-only. Typography, colors, image treatment and responsive behavior are original approximations, not visually measured fidelity. Screen reader, real-device, 200–400% zoom and cross-browser tests are untested. No real organizational identity, student outcomes, deadlines or costs are represented. Active allocation 01–06; 07–10 remain deferred.

Coordinator source review identified incomplete instrumentation. The same gpt-6.1-sol worker added both region/component attributes and unique instance selectors throughout all semantic regions and existing component containers, then regenerated the inventory. Original artifact preserved; correction evidence: `instrumentation-correction.json` and `instrumentation-audit.json`. Presentation and interaction code were unchanged.
