# WX-01: Meridian Weather Authority (fictional) - weather replica

- **Replica ID:** WX-01 | **Category:** weather | **Slot:** 1 | **Model group:** claude (claude-sonnet-5-5)
- **Stratum:** national weather service (government meteorological agency)
- **Fictional branding:** "Meridian Weather Authority", original SVG emblem. No real agency name, seal, logo or insignia is used.
- **Approved source (research metadata only):** National Weather Service, https://www.weather.gov/
- **Source verification:** 2026-11-12, HTTP GET via curl: home page 200 (about 126 KB server-rendered), 12 interior pages 200 (per `Websites/pipelines/claude/research/WX.md`). Only the home page's links and titles were inspected. The builder did not re-fetch the source.
- **Source approval:** 2026-11-13, per `Websites/pipelines/claude/research/approval-2026-11-13.md`. The project lead also waived the Rules.md Phase A stop for the ten original categories; that waiver is recorded in `metadata/change-log.md`. (The `workflow.js` constant 2026-11-10 is stale and not used.)

## ALL WEATHER DATA IS FICTIONAL SAMPLE DATA

Every temperature, alert, advisory, map, radar/satellite image, observation and timestamp is invented. Each page carries a "Sample data only" banner in the header, and every block showing weather figures carries a "Sample data: fictional..." tag. Do not use this site for any real decision.

## Run locally

Open `index.html` in a browser (works from `file://`; no server, build step or network). Inline JS data only, no fetch.

## Sitemap and page-to-source mapping

| Local page | Source page |
|---|---|
| index.html | weather.gov home |
| alerts.html | /alerts (Active Alerts) |
| current.html | /current (Current Conditions) |
| forecast-maps.html | /forecastmaps/ |
| satellite.html | /satellite |
| glossary.html | /glossary |
| safety.html | /safety (Owlie page replaced by a mascot card) |
| point-forecast.html | forecast.weather.gov MapClick point forecast |
| local-office.html | /rah/ local office |
| about.html | /about/ |
| news.html | /news/ |
| contact.html | /contact |
| 404.html | required by Rules.md |

12 mapped pages plus 404. Owlie Skywarn page, Graphical, Radar and other external-domain items are not built and not linked. Files: 28 (13 HTML, 1 CSS, 1 JS, 9 SVG, 4 documentation/JSON).

## Features

- Hover/click dropdown nav with keyboard support and Escape; mobile Menu disclosure; skip link; breadcrumbs.
- Site search ("Go") and My Forecast widget over sample locations (My Forecast is INFERRED, saved in localStorage).
- Sample alerts with filters; sample station table with sort/filter; point forecast with 7-day and hourly tabs, current-conditions and hazards blocks.
- F/C unit toggle: **intentional addition**, not observed on the source.
- Placeholder map/radar/satellite viewers (demo buttons swap local SVGs). Glossary, safety accordion, news filter, contact form with error summary and a demo success state (nothing is sent).

## Sample data counts

10 locations (5 invented regions), 12 stations, 14 alerts (warning/watch/advisory), 18 glossary terms, 6 news articles, 5 offices, 9 SVG placeholder images.

## QC results (Rules.md section 9)

Run 2026-11-14 with `node "Websites/tools/qc/qc.js" "Websites/weather/claude/WX-01"` (Playwright + axe-core at 1280px and 375px):
`pages=13 files=28 failures=0 warnings=0`

| Gate | Result | Evidence |
|---|---|---|
| 13 Technology | pass | qc.js static checks (no prohibited files, no remote requests, no console/page errors); no libraries |
| 14 Completeness | pass | all 12 mapped pages + 404 + required artifacts present; qc.js link/asset audit found no broken refs |
| 15 Structure | pass | qc.js confirmed main#main-content, skip link, lang, data-section/data-component on every page; one h1 per page by construction (not separately machine-checked) |
| 16 Interaction | pass (scripted) | 29 of 29 Playwright checks on dropdown click/hover/Escape/Arrow, mobile menu, radar toggle, saved location persistence, unit toggle, site search multi/empty, tabs with arrows, alert filter/reset/empty, table sort, glossary filter, contact error summary and demo success |
| 17 Accessibility | partial: axe pass, rest not tested | axe-core (wcag2a/2aa/21/22aa, best-practice) 0 violations at both widths; no horizontal scroll at 375px; contrast, focus visibility and reduced motion checked by axe/CSS inspection only, no manual review |
| 18 Traceability | pass (self-reviewed) | docs written from the implemented files; not independently reviewed |
| 19 Scope | pass (self-reviewed) | 12 pages, small sample data |

This is a WCAG 2.2 AA-oriented baseline. It is **not** a claim of WCAG conformance.

## Not tested

Real assistive technology (screen readers, voice control), manual keyboard-only review of every page, zoom/text-spacing at 200-400%, forced-colors mode, Safari/Firefox, print, touch devices, actual dark-mode contrast beyond axe's light-mode scan, no-JS rendering (data pages show a noscript note only on the point forecast).

## Known limitations

Interior page layouts are approximated (only the home page's links and titles were inspected during research). Radar, satellite and forecast maps are drawings. Saved location and unit use localStorage, which may be unavailable in private modes; pages still render. Dropdown grouping is inferred. The point-forecast page needs JavaScript. Region/location names are invented and may coincidentally resemble real places.

See `fidelity-notes.md` for details and `component-inventory.json` for components.
