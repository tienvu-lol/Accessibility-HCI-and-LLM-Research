# WX-02 - Larkspur Weather (fictional replica)

- **Replica ID:** WX-02, slot 2, category `weather` (stratum: commercial weather portal), model group `claude`
- **Fictional brand:** Larkspur Weather (original name and local SVG logo; no real brand, wordmark or logo is used)
- **Approved source (research metadata only):** Weather Underground, https://www.wunderground.com/
- **Source verification:** researched and HTTP-verified **2026-11-12** (curl GET; home page 200, about 100 KB; the 12 interior pages listed in `pipelines/claude/research/WX.md` all returned 200). Not re-verified by the builder; no live site access was used during the build.
- **Source approval:** approved **2026-11-13** (`Websites/pipelines/claude/research/approval-2026-11-13.md`). The project lead also waived the Rules.md Phase A stop for the ten original categories; that waiver is recorded in `metadata/change-log.md`.
- **Note:** accuweather.com was rejected during research (HTTP 403 to curl); Weather Underground was chosen instead.

## ALL WEATHER DATA IS FICTIONAL SAMPLE DATA
Every temperature, condition, forecast row, alert, radar/map image, storm, station reading, historical figure and time on this site is invented. Labeling used:
1. A site-wide yellow notice at the top of every page ("SAMPLE DATA ONLY ...", `data-component="sample-data-banner"`).
2. A "SAMPLE DATA" badge notice on every page section that shows data (`sample-data-label`).
3. Every data table's `<caption>` begins "Sample data (fictional):" and is highlighted in the same yellow.
4. Radar, map and storm-track images carry the text "SAMPLE ILLUSTRATION" inside the drawing.
5. Times are "sample time 14:00" and "Sample Day 1..10"; no real calendar dates or live timestamps are shown. The only real-world-looking years are 2015-2024 in the history tool, labeled "sample year".
6. Place names, regions, storms and station IDs are invented.
Values come from a few seeds in `js/main.js` and are deterministic.

## Run locally
Open `index.html` in any modern browser (works from `file://`; no server, build step or network). `404.html` is the not-found page for a host.

## Sitemap and page-to-source mapping
| Local page | Reference page (observed title) | Notes |
|---|---|---|
| `index.html` | Home | h1 default location + "Full Forecast"; map/outlook links; news teasers |
| `forecast.html` | Location conditions (Ashburn, VA) | current conditions; hourly, 10-day, alerts tabs (tabs inferred) |
| `maps.html` | Maps Catalog | filterable card catalog |
| `radar.html` | Weather Radar | illustration with frame controls |
| `interactive-map.html` | WunderMap interactive map | layers, markers, table alternative |
| `history.html` | Historical Weather | validated place + year form |
| `tropical.html` | Hurricane & Tropical Cyclones | filters, table, track |
| `stations.html` | PWS Network Overview | search, table, demo join form |
| `articles.html` | Category 6 (blog) | search/topic filter, expandable articles |
| `prepare.html` | Prepare For The Extreme | accordion checklists |
| `videos.html` | Weather Videos | filter, placeholder player dialog |
| `about.html` | About Us | original copy |
| `accessibility.html` | Accessibility Statement | describes this replica's work only |
| `404.html` | - | route back to home |

13 content pages plus `404.html` = 14 HTML pages. Total files: 26 (14 HTML, `css/styles.css`, `js/main.js`, 6 SVG, README, fidelity-notes, component-inventory.json, generation-metadata.json).

## Sample data counts
8 locations (each with 24 hourly + 10 daily rows generated from seeds), 4 alerts, 6 articles, 6 videos (placeholders), 10 stations, 5 storms, 12-month x 10-year history generated from normals.

## Feature checklist
- Location search over inline data (datalist suggestions, empty error, no-match and multi-match states): done
- Units (temp F/C, wind mph/km-h, precip in/mm), Density, Appearance: done, persisted in localStorage (try/catch); **inferred** from reference aria-labels, not observed behavior
- Current conditions, hourly + 10-day tables, alerts, favorites: done (favorites is a local-only demo)
- Radar / interactive map: illustrations with controls, table alternative
- Prunings: see fidelity-notes.md (no ads, tracking, Log In, Member Settings, or links to un-built targets)

## QC (Rules.md section 9)
Run on 2026-11-14: `node "Websites/tools/qc/qc.js" "Websites/weather/claude/WX-02"` -> `pages=14 files=26 failures=0 warnings=0`
| Gate | Result | Evidence |
|---|---|---|
| 13 Technology | pass | qc.js (no prohibited files, no remote requests); manual: no libraries/CDNs/fonts |
| 14 Completeness | pass | qc.js (required files, links, relative assets) |
| 15 Structure | pass (manual) | landmarks, one h1, data-section/data-component present; qc.js presence check |
| 16 Interaction | pass | scripted Playwright flows, 40 checks (settings/units persistence, search, tabs, forms, filters, dialog, radar, map, nav, checklist). One check initially failed due to a test selector counting a hidden element; re-verified separately |
| 17 Accessibility | partial | axe-core via qc.js at 1280 and 375 px: no violations; keyboard flows scripted; focus visibility/contrast manually designed, not audited; **no WCAG conformance is claimed** |
| 18 Traceability | pass (manual) | docs reflect files |
| 19 Scope | pass (manual) | additions labeled in fidelity-notes |

**Not tested:** screen readers and other assistive technology; browsers other than Chromium (Playwright); zoom/text-spacing at 200-400%; full dark-mode contrast audit; Windows High Contrast beyond a basic forced-colors rule; touch devices; JavaScript-disabled use (tables show a notice); Safari/Firefox behavior of `<dialog>` and `datalist`.

## Known limitations
Radar/map are simplified illustrations of JS widgets; dropdown grouping is inferred; dynamic tables require JavaScript; headers use `aria-label="Menu"` plus visible text "Menu".
