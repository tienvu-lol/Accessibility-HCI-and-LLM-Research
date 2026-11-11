# WX-03 — Harbor 9 Weather (fictional replica)

- **Replica ID:** WX-03 (slot 3, model group `claude`)
- **Category / stratum:** weather / local TV station weather section
- **Fictional branding:** "Harbor 9 Weather" (invented station, region, people and data; placeholder SVG logo)
- **Approved source (research metadata only):** KING 5 Weather, https://www.king5.com/weather
- **Source verification:** 2026-11-10, HTTP GET via curl, HTTP 200 on the weather index and the mapped pages (record in `Websites/pipelines/claude/research/WX.md`). No browser or JavaScript rendering was done, so client-rendered behavior of the reference is unverified.
- **Approval:** the project lead waived the Phase A approval stop and approved this source (`source_approved_at` 2026-11-10).
- **Model / provenance:** `claude-sonnet-5-5`, see `generation-metadata.json`.

All weather values are **fictional sample data** and are labeled as such on every page. Nothing implies live conditions.

## Run locally

Open `index.html` in a browser (works from `file://`; no server, no build step, no network). Selected sample location and unit are kept in `localStorage` when the browser allows it.

## Sitemap and page-to-source mapping

| Local page | Reference page (king5.com) | Notes |
| --- | --- | --- |
| `index.html` | `/weather` | Forecast feature, regional forecast, Weather News carousel, 10-day, hourly, Entertainment, "Before You Leave" |
| `alerts.html` | `/weather/alerts` | Reference page title was generic and the body was not checked; layout is inferred |
| `radar.html` | `/radar` | Placeholder map, not an embedded map app |
| `ten-day.html` | `/10-day` | |
| `hourly.html` | `/hourly` | |
| `maps.html` | `/maps` | Tabbed placeholder maps |
| `traffic.html` | `/traffic` (+ "Drive Times" sub-nav item) | |
| `webcams.html` | `/webcams` | |
| `closings.html` | `/closings` | |
| `meet-the-team.html` | `/meet-the-team` | |
| `tv-listings.html` | `/tv-listings` | |
| `closed-captioning.html` | `/closed-captioning` | |
| `contact-us.html` | `/contact-us` | |
| `legal.html` | footer legal links | Consolidated into one page with anchors |
| `404.html` | none | Required by protocol |

## Feature checklist

- Skip link, landmarks, one `h1` per page, `data-section` / `data-component` instrumentation
- Primary nav with Weather and More dropdowns (`aria-expanded`), mobile "Menu" disclosure, Escape closes
- Weather sub-nav bar on weather pages (`aria-current`)
- Sample-data notice on every page
- Location search over 8 sample locations; F/C unit toggle (**intentional additions**)
- Current conditions, 10-day list with detail disclosures, hourly strip and table with filters
- Weather News carousel (previous/next), story summary disclosures
- Alerts filter by severity and county, with empty state
- Radar demo: layers, frame slider, play/pause, zoom
- Maps tabs (arrow-key navigation)
- Traffic incident filter, sortable drive-times table
- Webcams filter and modal dialog (native `<dialog>`, focus returns to opener)
- Closings search/filter with empty state; team filter; TV schedule day select
- Contact form: validation, error summary with focus management, demo-only success state
- Footer legal links including a demo "Do Not Sell" control (nothing saved)

## Sample data counts (inline in `js/main.js`)

8 locations; 10-day pattern and 24-hour pattern (derived from location values); 6 alerts; 5 traffic incidents; 5 drive-time routes; 6 webcams; 12 closings; 9 team members; 3 TV schedule days × 8 slots. News (6) and entertainment (3) stories are in the HTML.

## Simulation notes

- Forecast, radar, maps, webcams, traffic, closings and alerts are static invented data or placeholder SVGs.
- The forecast "video" is a poster plus a text script disclosure; there is no video.
- Radar play runs one loop of 6 frames and stops; the overlay is shifted by script and the "Clouds" and "Temperature" layers only recolor the same graphic.
- The contact form and "Do Not Sell" control send and save nothing and say so.

## QC gates (RULES.md section 9)

Run: `node Websites/tools/qc/qc.js Websites/weather/claude/WX-03` on 2026-11-11, **pages=15 files=36 failures=0 warnings=0**. Re-run after the final doc edits (2026-11-11): same result.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | **pass** | qc.js: no prohibited file types or library names, no remote requests; no `fetch` |
| 14 Completeness | **pass** | qc.js: required files present, JSON valid, links and assets resolve across 15 pages |
| 15 Structure | **pass** (landmarks/metadata); fidelity partial | qc.js checks main/skip link/lang/data attributes; see `fidelity-notes.md` for what was approximated |
| 16 Interaction | **pass** (scripted) | Playwright script, 28 checks, 0 failures: skip link first Tab, dropdown + Escape, unit toggle, location search (empty, none, multiple, choose), carousel, story disclosure, alerts empty state/reset, hourly filter, maps arrow keys, dialog open/Escape/focus return, closings empty state, traffic sort, contact validation/summary/success with `?topic=` prefill, radar next frame, mobile menu open/Escape. The script is not included in the repo. |
| 17 Accessibility | **partial** | qc.js axe-core (WCAG 2.0–2.2 A/AA + best-practice) at 1280px and 375px: failures=0; no horizontal scroll at 375px per qc.js. Keyboard behavior only checked by the scripted flows above. |
| 18 Traceability | **pass** | Docs written against the implemented files; source details come from the WX.md inventory |
| 19 Scope | **pass** | 14 mapped pages + 404; additions labeled |

**Not tested:** screen readers; 200% / 400% zoom and text-spacing overrides; a full manual keyboard walkthrough of every page; forced-colors/high-contrast mode; contrast beyond what axe computes; browsers other than headless Chromium; touch devices; reduced-motion behavior (CSS is present but not exercised); the radar play animation timing; dialog focus trapping beyond native `<dialog>` behavior.

No claim of WCAG conformance is made; axe-core finds only a subset of issues.

## Known limitations

- Reference sub-nav items SchoolNet and Jobs, and top-level program links (Evening, New Day, Investigators, etc.), are omitted because no pages were replicated for them.
- Header dropdown and weather sub-bar were both implemented because the reference's structure was inferred from raw HTML.
- Table regions that overflow on narrow screens scroll inside a focusable region instead of reflowing.
- Sample dates are fixed to Nov 11–20, 2026.
