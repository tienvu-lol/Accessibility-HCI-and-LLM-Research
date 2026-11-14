# FASH-06 — Thread & Form

Fictional fashion editorial replica inspired by Who What Wear, approved source https://www.whowhatwear.com/. Source verified 2026-11-13 by connected-web search/page-open text extraction, accepted by Samhith Varma at 2026-11-13T00:11:23.688078+00:00. “Verified” is limited to that potentially cached/indexed text retrieval: no fresh origin HTTP result, rendered browser observation, or executed source interactions. Approval evidence: pipelines/codex/research/evidence/replacement-approval-2026-11-13.json. Complexity is high, greater than the replaced Fashionista proposal; source complexity may confound model comparisons.

Open index.html directly with a browser; no server, installation, build, network or account is needed. Navigate using ordinary relative HTML links. Six local story records, six original SVG wardrobe illustrations, six article sections, two edition previews. Card headings are unlinked summary-only samples. A separate, explicitly labeled representative-story link opens the one approved article; it does not promise six separate articles.

## Sitemap and source mapping
- `index.html` ← https://www.whowhatwear.com/
- `trends.html` ← https://www.whowhatwear.com/fashion/trends
- `fashion.html` ← https://www.whowhatwear.com/fashion
- `guides.html` ← https://www.whowhatwear.com/buying-guides
- `article.html` ← https://www.whowhatwear.com/fashion/trends/most-iconic-fashion-trends-last-20-years
- `404.html` — protocol-required local recovery page (research addition).

## Interactions

Header search opens an in-page panel, searches title/category over six inline samples and reports result counts or an empty state. Clear restores all six. Topics and edition are mutually exclusive disclosure panels; Escape dismisses and returns focus. Edition changes only its local label, with no persistence or translated content. Article has six native fragment jump links and a clearly labeled share preview; no external sharing, clipboard permission, affiliate commerce, purchase or transmission occurs. Escape closes share preview and returns focus. There is no newsletter, author, gallery or separate search screen because those were not in the approved map. No transactional form is present; search needs no email validation or success simulation.

## Validation evidence

Initial artifact and hashes retained in the run directory before corrections. Static audits and actual-JS DOM-mock tests are documented in the run evidence; see final validation note below. Browser rendering, axe, native keyboard, screen reader, zoom, contrast sampling and source visual fidelity require independent review. No conformance claim.

Final validation: technology, completeness, static structure, DOM-mock interaction, traceability and scope gates passed within the disclosed limits; accessibility gate not-tested. `node --check js/main.js` passed. Static audit checked all six HTML pages, 165 relative references/fragments and all 32 unique component types with exact static instance counts. Seventeen tests executed the actual shared JS with explicit Node DOM mocks, covering search/title/category/empty/clear, disclosures/mutual exclusion/Escape/focus targets, edition selection and article share preview.

Shared QC was attempted once, exit **2**: Chromium launch failed with MachPortRendezvous permission denied (1100). The shared tool emitted no JSON report; `qc-outcome.json` is an honest blocked wrapper, not a successful QC report. Evidence is in `pipelines/codex/runs/2026-11-13T21-37-53-917Z-build-FASH-06/` (`qc-initial.log`, `qc-initial.exit`, `static-results.json`, `interaction-results.json`, `validation.md`, first-artifact archive/hashes and revision log). Browser axe, native keyboard/focus, rendering, 375px reflow, screen-reader and zoom checks remain **not-tested**. No failures=0 or accessibility conformance claim is made.

Final clarity revision: the lead headline exactly matches the article H1. Nonrepresentative card/search titles are unlinked and visibly marked summary-only; their separate links explicitly name the representative article. No extra detail pages were added.
