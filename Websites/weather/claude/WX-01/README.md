# WX-01 — Halcyon National Weather Service (fictional replica)

- **Replica ID:** WX-01 (category `weather`, slot 1, model group `claude`)
- **Fictional branding:** "Halcyon National Weather Service" (HNWS), an invented agency in the invented country of Halcyon. Logo, names, regions, locations and all copy are original. **All weather data are fictional sample data and never represent live conditions.** Every page carries a visible sample-data notice.
- **Approved source:** National Weather Service home page and its linked top-level pages, <https://www.weather.gov/> (research metadata only; nothing is copied).
- **Verification:** per the approved Phase A inventory (`Websites/pipelines/claude/research/WX.md`), fetched with `curl` on 2026-11-10, HTTP 200, title "National Weather Service". I did not re-fetch the site during this run and relied on the inventory (which records the observed raw-HTML regions and nav).
- **Approval:** the project lead waived the Phase A approval stop and approved the source on 2026-11-10 (recorded as `source_approved_at: 2026-11-10`).

## Run locally
Open `index.html` directly (file://). No server, build step or network is needed. Vanilla HTML/CSS/JS; data is inline in `js/main.js`. Query strings are used for state (e.g. `forecast.html?loc=mossgate`, `alerts.html?type=flood-warning`). `localStorage` is used only for the °F/°C choice and the optional "remember my location" setting (try/catch guarded).

## Sitemap (15 mapped pages + 404)
| Local page | Reference page | Notes |
|---|---|---|
| `index.html` | `/` National Weather Service | header location search, nav with dropdowns, national summary, alert-type links, radar links, regional offices |
| `alerts.html` | `/alerts` Active Alerts | filters + disclosure rows (sample alerts) |
| `current.html` | `/current` Current Conditions | station table, filter, sort, unit toggle (addition) |
| `forecast.html` | forecast.weather.gov local forecast (other host, not verified) | search result page: picker / forecast / not-found; tabs 7-day + hourly |
| `forecast-maps.html` | `/forecastmaps/` | tabbed placeholder maps |
| `satellite.html` | `/satellite` | placeholder imagery with product/sector |
| `radar.html` | radar links (other host, not verified) | placeholder radar, modes, frame controls |
| `safety.html` | `/safety/` | accordion |
| `education.html` | `/education/` | audience chip filter |
| `information.html` | Information dropdown (14 items) | one anchor section per menu item |
| `topics.html` | Forecast and Past Weather dropdown items | consolidated page, anchors per item (substitution) |
| `news.html` | `/news` | category + text filter, show more |
| `about.html` | `/about/` plus footer legal links | menu and legal anchors |
| `contact.html` | `/contact` | validated demo form + search help |
| `glossary.html` | `/glossary` | text + letter filter |
| `404.html` | — | route back to home, alerts, forecast, news |

## Feature checklist
Skip link; sample-data banner; header location search with inline error + focus; "remember" checkbox; mega/dropdown nav (click, Enter/Space, hover with mouse, Escape, focus-out) with aria-expanded; mobile "Menu" disclosure; secondary tools nav; breadcrumbs; site-search dialog (Escape closes, focus returns); alerts filter/reset/empty state; station filter/sort/empty state; forecast tabs (arrow/Home/End); °F/°C toggle (`aria-pressed`, saved); map tabs; satellite and radar controls; accordion with expand-all; chip filter with count; news show-more; glossary filter; contact form with error summary, inline errors, focus management and demo success.

## Sample data counts
8 locations (7 daily + 24 hourly values each, hourly derived by formula), 10 alerts (7 types), 10 stations, 9 news stories, 14 glossary terms, 15 searchable page entries, 14 forecast/past-weather topics, 14 information items, 10 about/legal sections, 6 safety topics, 6 education resources.

## Simulation notes
Location search, alerts, forecasts, radar frames and everything else run only on inline fictional data. The contact form sends nothing and says so. Radar/map/satellite are static SVG placeholders; the radar "loop" only shifts invented echoes. Intentional additions (not on the reference home page): °F/°C toggle, site-search results over local pages/glossary, education chips, news filter, glossary filter, alert filters.

## QC (RULES.md §9)
Run: `node Websites/tools/qc/qc.js Websites/weather/claude/WX-01` on 2026-11-11 — pages=16 (15 + 404), files=26, **failures=0**, warnings=0 (checks: required files, JSON validity, broken links/assets, prohibited tech, remote requests, JS/console errors, landmarks/skip link/metadata, axe-core wcag2a/2aa/21a/21aa/22aa + best-practice at 1280px and 375px, horizontal scroll at 375px).

| Gate | Result |
|---|---|
| 13 Technology | pass (qc.js: no prohibited files, no remote requests; no fetch/XHR) |
| 14 Completeness | pass (qc.js: all required files, no broken relative links/assets) |
| 15 Structure | pass for landmarks/metadata (qc.js); region-by-region match to the reference is from the Phase A inventory, not re-compared against the live site |
| 16 Interaction | pass — scripted Playwright check (38 assertions, throwaway script not delivered): location search (ambiguous/single/unknown/empty), tabs + arrow keys, unit toggle, dropdown Enter/Escape/hover, search dialog, alert filters/disclosure/empty/reset, station sort/empty, contact errors/summary focus/success, news show-more/filter, glossary empty, accordion, chips, radar low mode/frames, map tabs, mobile menu + Escape |
| 17 Accessibility | partial — axe-core automated pass at 2 widths; scripted keyboard flows for menus/dialog/tabs/forms. Not a conformance claim |
| 18 Traceability | pass (docs written from the implemented files; the reference was not re-fetched) |
| 19 Scope | pass |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver), 200%/400% zoom and text-spacing overrides, a full manual keyboard walkthrough of every page, Windows high-contrast/forced colors, real touch devices, browsers other than Chromium, manual contrast review beyond axe, reduced-motion behavior (CSS present, not exercised), cross-check against the live reference.

## Known limitations
- No WCAG conformance is claimed; this is a WCAG 2.2 AA-oriented baseline.
- `forecast.html` and `radar.html` stand in for pages the reference hosts elsewhere (unverified); `topics.html` consolidates 14 dropdown destinations into one page.
- Reference site search with an NWS/NOAA affiliate radio and the "forecast search help" popup are approximated (dialog with local scope radios; help text in `contact.html#help`).
- Footer social icons are plain text/no icons; no real social links exist.
- HTML shared chrome is duplicated across pages (no includes); the pages were emitted by a throwaway local script that is not part of the deliverable.
- Hover-open dropdowns apply to mouse pointers at ≥60em only; touch and keyboard use click/Enter.
