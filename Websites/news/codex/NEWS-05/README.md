# NEWS-05 — Ridgeway News

Fictional local/regional newsroom inspired by the approved Cardinal News information architecture. Original prose and four original local SVG illustrations. This is an independent static research artifact, not an official news service.

## Source and scope

Source: https://cardinalnews.org/ . Verification: 2026-11-12T00:54:46.019250+00:00, live web discovery/extracted text and direct urllib HTTPS GET. Availability verified by HTTP only. No source browser, menu, newsletter submission or responsive behavior was executed. Approval: Samhith Varma, 2026-11-12, `metadata/change-log.md`, Codex Phase A approval. Earlier provisional research wording is superseded by that approval and the active-allocation amendment. Slots 01–06 are active; 07–10 deferred, with approval per group.

## Run

Open `index.html` directly in a browser. All assets, links and logic work without a server or network. JavaScript enables local search, article selection, disclosure, share-address feedback and form validation. Without JS, navigation/content remain readable; search explains its limitation. No address, membership or payment data is sent or saved.

## Complete sitemap and source mapping

| Local page | Source URL |
|---|---|
| index.html | https://cardinalnews.org/ |
| politics.html | https://cardinalnews.org/category/politics/ |
| article.html | https://cardinalnews.org/2026/11/11/lawsuit-over-botetourt-county-data-center-project-can-move-forward-judge-rules/ |
| search.html | https://cardinalnews.org/?s=housing |
| newsletters.html | https://cardinalnews.org/sign-up-for-updates/ |
| about.html | https://cardinalnews.org/about-us/ |
| faq.html | https://cardinalnews.org/frequently-asked-questions/ |
| 404.html | Diagnostic Cardinal invalid-path response (HTTP 404) |

## Sample data and behavior

Eight fictional stories, six geography groups, five newsletter choices and four SVG landscapes. Every story link uses `article.html?story=0` through `7`, changing headline, deck, geography and illustration; the common fictional article body deliberately discusses a generic consultation process. Main navigation repeats in HTML on every page. The expanded directory offers geography anchors and topic searches. Escape closes it and returns focus to its button.

Search matches headline, region and summary, case-insensitively. Try `housing`, `transit`, `library`, an empty query and `zzzz`. Positive results simulate a local dataset; source positive-result behavior was not verified. Newsletter validation requires a valid email and at least one choice; success explicitly creates no subscription. Share displays a local address without a clipboard/network dependency. Support routes to the FAQ funding explanation. Sign-in is visibly unavailable; no account or payment control is implied. FAQ uses linked answers, not an invented accordion.

## Validation

Evidence is in `pipelines/codex/runs/2026-11-13T21-13-32-919Z-build-NEWS-05/`. Initial artifact archive and SHA-256 manifest precede checks/corrections. See `validation-report.json`, `interaction-tests.log` and `qc-initial.log` for actual results. Browser/axe and actual keyboard, screen-reader, zoom and rendered fidelity checks must remain not-tested when browser launch is blocked. Actual results: static checks passed across 952 element checks with no errors; Node syntax passed; nine delivered-JS VM tests passed with explicit DOM mocks. Shared QC attempted once and exited 2 at Chromium launch (MachPort bootstrap permission denied), before any browser/axe result or JSON report. Interaction and accessibility gates remain not-tested for full browser evaluation. No conformance or pixel-fidelity claim is made.

## Files and provenance

8 HTML pages, shared `css/styles.css`, shared `js/main.js`, 4 SVGs and 4 documentation/provenance files: 18 files total. Generated as gpt-6.1-sol in the declared OpenAI collaboration worker runtime; exact release string unavailable. Protocol snapshots/task hashes are recorded in generation-metadata.json. No human or cross-model site edits at generation handoff.

## Same-worker correction after coordinator review

The coordinator identified 18 article cards missing data-section; the original static checker accepted data-component alone and missed this. This worker added the missing section attribute to all static cards and dynamic search results, tightened the checker, and added explicit dynamic metadata assertions. The stricter 952-element audit, JavaScript syntax and nine mocked VM tests pass. Initial archive/hashes remain unchanged; correction details are in correction-log.json. No browser QC was repeated; its permission block remains.
