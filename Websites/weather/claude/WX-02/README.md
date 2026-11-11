# WX-02 — Driftwell Weather (fictional demo)

- **Replica ID:** WX-02 (category `weather`, slot 2, model group `claude`)
- **Stratum:** commercial weather portal
- **Fictional branding:** "Driftwell Weather" (community-station magazine section: "Eyewall Journal"). No real logos, text or data are reproduced.
- **Approved source URL:** https://www.wunderground.com/ (Weather Underground, research metadata only)
- **Source verification:** 2026-11-10, HTTP GET via curl, HTTP 200 on the home page and the 16 listed pages (recorded in `Websites/pipelines/claude/research/WX.md`). I did not re-verify the source during this run; I relied on that inventory.
- **Approval:** source approved 2026-11-10. The project lead **waived the Phase A approval stop** and approved the reference in the orchestrator brief.
- **Generation:** autonomous run with model `claude-sonnet-5-5`; see `generation-metadata.json`.

**All weather data is fictional sample data** (observations, forecasts, alerts, storms, stations, history). It is generated in the browser from inline parameters in `js/main.js` and must never be read as live conditions. A banner on every page says so.

## Run locally

Open `index.html` in a browser (works from `file://`; no server, no network, no build step). JavaScript is required for menus, search, forms and all data views. Preferences (units, favorites, checklist) are saved in `localStorage` only.

## Sitemap and page-to-source mapping

| Local page | Reference page (path on source) |
| --- | --- |
| `index.html` | `/` Local Weather Forecast, News and Conditions |
| `conditions.html?loc=ID` | `/weather/us/va/ashburn/...` Weather Conditions |
| `hourly.html?loc=ID` | `/hourly/us/va/ashburn/...` Hourly Weather Forecast |
| `forecast.html?loc=ID` | `/forecast/us/va/ashburn/...` 10-Day Weather Forecast |
| `history.html` | `/history` Historical Weather |
| `hurricane.html` | `/hurricane` Hurricane & Tropical Cyclones |
| `maps.html` | `/maps` Maps Catalog |
| `radar.html` | `/radar/us` Weather Radar |
| `prepare.html` | `/prepare` Prepare For The Extreme |
| `video.html` | `/video` Weather Videos |
| `stations.html` | `/pws/overview` PWS Network Overview |
| `blog.html` | `/cat6` Category 6 (editorial) |
| `about.html` | `/about/our-company` About Us (plus footer legal/contact placeholders) |
| `accessibility.html` | `/accessibility-statement` |
| `404.html` | none (required by protocol) |

Not mapped: `/weather-infographics`, `/weather-posters`, `/download`, and the source's Calendar tab (see `fidelity-notes.md`).

## Feature checklist

- Header with location search (inline sample dataset, 10 locations), utility links, Primary nav with dropdowns, mobile "Menu" disclosure
- °F/mph vs °C/km/h toggle (placed in the utility bar — an inference, the source's control was not located)
- "Get current location (demo)" button (never reads the real location)
- Favorites list and Log in dialog (demo)
- Location tabs: Today, Hourly, 10-Day, History, Radar
- Current conditions, alerts (expandable), hourly precipitation table, nearby stations, almanac
- Hourly table with day selector and precipitation filter; 10-day accordion with Expand all
- History lookup form (date validation, single day or whole month)
- Hurricane table with filters and a placeholder-track dialog
- Maps catalog with category/keyword filters; radar viewer placeholder with layers and a six-frame loop
- Preparedness checklist and hazard tips; video library (demo dialog); station list with filters and a simulated registration form; article list with filter and expanders; contact form (simulated)
- 404 page, breadcrumbs, skip link, footer link groups

## Sample data counts

10 locations (3 with alerts), generated hourly/daily/history values (deterministic from the location id and date), 6 storms, 9 maps, 6 videos, 8 stations, 6 articles, 8 checklist items, 5 hazards.

## Interaction simulation notes

- Login, station registration and the contact form validate on the client and show a **demo success message**. Nothing is sent or stored.
- Video "Play" opens a dialog with a placeholder; no media exists. Storm "View track" shows a placeholder graphic.
- Radar uses two static SVGs; layer and frame controls tint/shift them.
- Intentional additions (not observed on the source): the six-frame radar loop, the preparedness checklist, the article filter, the video topic filter, and the station filters/sort. Page text labels these as samples.

## Known limitations

- Requires JavaScript; no `noscript` fallback.
- Layout and copy are inspired by, not copies of, the source; no pixel fidelity claimed.
- Source pages were inspected only through curl (HTML/titles/links), not visually in a browser.
- Date formats and sample times are fixed to a sample "today" of 2026-11-10.

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/weather/claude/WX-02` run on 2026-11-11: **pages=15 files=33 failures=0 warnings=0** (static file/JSON/link/prohibited-tech checks, remote-request and JS-error checks, axe-core WCAG 2.0–2.2 A/AA + best-practice at 1280px and 375px, horizontal-scroll check at 375px). Pages were scanned in their initial state only.

| Gate | Result | Notes |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited file types/libraries, no remote requests; vanilla HTML/CSS/JS only |
| 14 Completeness | pass | All mapped pages and required artifacts present; qc.js found no broken links/assets |
| 15 Structure | pass (qc + self-inspection) | Landmarks, skip link, `data-section`/`data-component` present on all pages; match to the source's structure inferred from curl-level inspection only |
| 16 Interaction | pass (scripted) | A Playwright script (27 checks, run 2026-11-11, all passed) covered: skip link first focus, dropdown open/Escape/focus return, search error/empty/navigate, unit toggle, favorites, login dialog errors + Escape, unknown-location error, hourly/hurricane/maps empty states, history validation and month view, storm dialog, station form errors + demo success, blog hash expand/filter, forecast expand all, mobile menu open/Escape. Not covered: video dialog, contact form, prepare page, radar loop |
| 17 Accessibility | partial | Automated axe passes; no screen reader, no 200% zoom, no full manual keyboard walkthrough, no manual contrast audit, reduced-motion CSS present but not exercised |
| 18 Traceability | pass (self-review) | Docs written against the implemented files |
| 19 Scope | pass (self-review) | 15 pages, small sample data sets |

**Not tested:** screen readers, 200% zoom / text resizing, a human keyboard-only walkthrough of every page, other browsers (only Chromium headless via Playwright), forced-colors mode, voice control, dialog behavior after the initial scan (axe was not run with menus/dialogs open), the video dialog/contact form/radar loop flows. No WCAG conformance is claimed; WCAG 2.2 AA is an implementation target only.

## Build note

The 15 HTML pages share header/footer markup that was assembled with a throwaway script kept outside the repository; the delivered site has no build step.
