# WX-03 - Meridian 12 Weather (fictional local-TV weather section)

- **Replica ID:** WX-03 (slot 3, category weather, model group claude)
- **Fictional branding:** Meridian 12 Weather, fictional station "MRD-TV 12", fictional market "Cedar Basin"; local SVG logo. No real call sign, market or brand is used.
- **Approved source (research metadata only):** WRAL Weather, https://www.wral.com/weather/
- **Verification:** 2026-11-12, HTTP GET via curl (hub 200, about 36 KB; interior pages 200), per `Websites/pipelines/claude/research/WX.md`. Not re-fetched during the build.
- **Approval:** 2026-11-13, per `Websites/pipelines/claude/research/approval-2026-11-13.md`. The project lead also waived the Rules.md Phase A stop for the ten original categories (recorded in `metadata/change-log.md`).

## READ FIRST: all weather data is fictional
Every temperature, forecast, alert, advisory, almanac figure, storm, closing and timestamp is **invented sample data** and is labeled as such on every page that shows it (top-of-page notice, "Sample" badges, table captions). Nothing is live or current. The radar player and webcams are non-functional placeholders; the closings list is invented and must not be acted on.

## Run locally
Open `index.html` in a browser from disk (`file://`). No server, build step, network or install is needed. JavaScript is used for filters, search, forms and the single-panel view of the forecast tabs; without it the pages still show all data and the anchor links work.

## Sitemap and source mapping
| File | Observed source page |
|---|---|
| `index.html` | weather hub (7 Day / Hourly / Weekend anchors, summary, news teasers, radar link) |
| `forecast.html` | forecast blog post |
| `alerts.html` | weather alerts |
| `almanac.html` | almanac |
| `closings.html` | school and business closings and delays |
| `hurricanes.html` | hurricane tracker |
| `news.html` | weather news |
| `resources.html` | weather resources |
| `map-center.html` | interactive map center (placeholder) |
| `webcams.html` | webcams (placeholders) |
| `radar-video.html` | live radar video (placeholder, no video) |
| `404.html` | none (required by Rules.md) |

11 mapped pages plus `404.html`. Source items 12 (forecast video page) and 13 (hurricane-season post) were not built and are not linked (navigation pruned to existing pages).

## Files
12 HTML, `css/styles.css`, `js/main.js`, 16 SVG in `assets/`, plus `README.md`, `fidelity-notes.md`, `component-inventory.json`, `generation-metadata.json`: **34 files**.

## Sample data counts
8 places, 7 forecast days, 12 hourly steps, 14 closings, 5 alerts, 12 almanac months, 7 sun/moon days, 3 storms (plus a quiet scenario), 6 webcam tiles, 8 news teasers, 5 resource items, 4 radar frames.

## Feature checklist
- [x] Header, section nav with 11 sub-nav labels, mobile menu disclosure (aria-expanded, Escape)
- [x] 7 Day / Hourly / Weekend same-page anchor views (works with and without JS)
- [x] Current conditions, 7-day, hourly and weekend views over sample data
- [x] Location search over sample places with error summary, inline error, empty state (intentional addition; inferred in research)
- [x] F/C toggle (intentional addition)
- [x] Alerts list with level and county filters, empty state
- [x] Almanac tables with month filter
- [x] Closings table with search/type/status filters, empty state (intentional addition; inferred in research)
- [x] Hurricane page with quiet-basin demo scenario
- [x] Map center demo (layers, zoom, legend), webcam placeholders with dialog, radar frame stepper
- [x] News topic filter and demo Ask the Meteorologist form (intentional addition)
- [x] 404 page, skip link, one h1 per page, reduced-motion support, no ads or tracking

## Interaction simulation notes
The ask form sends nothing and says so. Radar "play" just cycles four local SVGs and is hidden when the system asks for reduced motion. Zoom, layers and webcam preview swap local pictures. Unit preference is stored in `localStorage` (wrapped in try/catch; the site works without it).

## QC (Rules.md section 9)
Run: `node "Websites/tools/qc/qc.js" "Websites/weather/claude/WX-03"` on **2026-11-14**, final summary line:
`pages=12 files=34 failures=0 warnings=0`
The tool statically checks required files, JSON validity, link and asset references, remote dependencies, skip link, main landmark, lang and instrumentation, then loads every page in headless Chromium at 1280px and 375px with axe-core (wcag2a/2aa/21a/21aa/22aa and best-practice tags), console/network errors and horizontal overflow at 375px.

| Gate | Result | Evidence |
|---|---|---|
| 13 Technology | pass | qc.js: no prohibited files, no remote dependencies, no network requests; local grep shows no framework/CDN use |
| 14 Completeness | pass | qc.js: required files present, 0 broken links or assets across 12 pages |
| 15 Structure | pass (manual) | landmarks and data-section/data-component on every page (qc.js checks presence); section order follows the research summary only, not a visual comparison |
| 16 Interaction | pass (scripted) | Playwright script run once: 55 of 56 assertions passed; the 1 miss was a wrong expected count in my script (Wexley has 2 entries, not 3), confirmed against the data, not a site fault. Covered: anchor tabs (click, Enter, Back, deep link), header anchors, unit toggle, location search (empty error and focus, no match, single and multi match), mobile menu and Escape, closings/alerts/almanac/news/webcam filters and empty states, hurricane scenario, map layers/zoom/legend, dialog Escape and focus return, radar stepper and loop, ask form errors and demo success, no-JS rendering |
| 17 Accessibility review | partial pass | axe 0 violations on 12 pages at two widths; no horizontal scroll at 375px; skip link focus checked in script. Not a conformance claim |
| 18 Traceability | pass (manual) | file counts and component list generated from the actual files |
| 19 Scope | pass (manual) | 11 pages, small datasets; additions are labeled in fidelity-notes.md |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver); browsers other than headless Chromium; real mobile devices; zoom to 200/400 percent and text-spacing overrides; Windows high contrast / forced colors; manual contrast measurement beyond axe; full keyboard walk of every page by a human; print styles; visual comparison with the reference. No WCAG conformance is claimed; this is a WCAG 2.2 AA-oriented baseline only.

## Known limitations
- Reference pages 3 to 11 were only fetched for status and title; their internals are inferred.
- Shared header and footer HTML were stamped from a template by a throwaway script kept outside the repo (no build step is part of the site).
- Wind stays in mph when Celsius is selected.
- Only 2 of 8 news teasers link to local pages; there are no full article pages.
- Footer link grouping is inferred.
- Filters and forms need JavaScript and are hidden without it.
