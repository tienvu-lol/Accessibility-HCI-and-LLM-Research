# WX-01 fidelity notes

Replica: WX-01 (weather, slot 1, claude). Fictional agency: **Meridian Weather Authority**. Source: https://www.weather.gov/ (research metadata only; verified 2026-11-12, approved 2026-11-13). Only the home page's links and titles were inspected during research; interior page bodies were not read, so interior layouts are approximated from category conventions and the research summary, not observed.

## The hard rule: all weather data is fictional

Every temperature, alert, advisory, radar/satellite/forecast image, almanac-style figure and timestamp is invented. Labeling: (1) a persistent "Sample data only" banner inside the header of every page including 404; (2) a visible "Sample data: fictional, invented for a research exercise; not real weather" tag on every block that shows weather data; (3) timestamps use "Sample Day N, HH:MM (fictional)", never real dates; (4) place names are invented, in five invented regions; (5) every image alt and SVG text says sample/fictional. No copy claims current conditions without that label ("Current Conditions" is only the page-name mapping and the page h1 reads "Sample station observations (fictional)").

## No government insignia

No NOAA/NWS seal, logo, wordmark, Department of Commerce mark or the names "NOAA", "National Weather Service" or "weather.gov" appear in the replica's branding or copy. Emblem is an original SVG (sun over waves in a circle). The README names the source only as research metadata.

## Page mapping

| Source page | Local page | Treatment |
|---|---|---|
| weather.gov home | index.html | approximated: nav, search, h1 national headline, map area with Standard (Low Bandwidth) / Enhanced radar variants, "My Forecast" widget, long hazard link list, "Read More" discussion link |
| /alerts | alerts.html | approximated: filterable sample alert list |
| /current | current.html | approximated: sortable/filterable sample station table |
| /forecastmaps/ | forecast-maps.html | approximated: placeholder maps with product/day buttons |
| /satellite | satellite.html | approximated: band buttons and frame slider over placeholders |
| /glossary | glossary.html | approximated: searchable, letter-filtered definitions in original wording |
| /safety | safety.html | approximated: accordion of generic guidance |
| forecast.weather.gov MapClick | point-forecast.html | approximated and partly inferred: current-conditions block, 7-day and hourly tabs, hazards box. The research did not open this page's body. |
| /rah/ (local office) | local-office.html | approximated: office selector and sample discussion |
| /about/ | about.html | approximated |
| /news/ | news.html | approximated: filterable fictional articles |
| /contact | contact.html | simulated: validated demo form, sends nothing |
| (none) | 404.html | required by Rules.md |

## Classification

- **Replicated (structurally):** top navigation with dropdown (hover and click), site search with text input and "Go" button, one national headline with map area, radar variant labels, link-dense hazard list, footer groups and legal strip, breadcrumbs.
- **Approximated:** all interior page layouts; map and radar areas (static SVG drawings; the real site uses an ESRI map script).
- **Simulated:** radar/satellite/forecast maps (buttons swap local SVGs; marked "Demo"), contact form (demo success state, nothing sent), location search (inline sample dataset).
- **Intentionally added (not observed on source):** the F/C and mph/km/h unit toggle (the research observed no toggle); the sortable station table filters; alerts filter form; glossary letter filter; news topic filter; the "Pip the Plover" fictional mascot card (stands in for the real Owlie Skywarn page).
- **Inferred (not observed):** the "My Forecast" location widget saved in localStorage (research only saw loaded scripts and a cookie library); the point-forecast contents; dropdown behavior and grouping.
- **Omitted:** Owlie Skywarn page (replaced by a card on safety.html), Graphical, Radar, Rivers/Lakes/Rainfall, Air Quality, Aviation, Forecast Models, Hurricanes, Severe Weather, Space Weather, Climate Prediction pages, footer items Privacy Policy, Information Quality, FOIA, Careers, Vote.gov, regional office links, XML/CAP/ATOM alert feeds, "For NWS Employees", government shutdown banner. All omitted pages are simply not linked (navigation convention adopted 2026-11-13).
- **Unverified:** actual order and wording of the real home page sections beyond the research summary; the real interior page layouts.

## Navigation grouping is inferred

The research confirmed top-level labels but not which items sit in which dropdown. The replica's groups (Forecast; Alerts & Observations; Safety & Learning; About) are my own inferred grouping, pruned to pages that exist locally. Dropdowns list only items with a local page.

## External domains

The reference links heavily to other domains (radar.weather.gov, water.noaa.gov, nhc.noaa.gov, spc.noaa.gov, digital.weather.gov). Those are separate sites, not replicated, and not linked.

## Stack deviations

The reference uses jQuery 1.12.4, jQuery UI, jquery-migrate, jquery-cookie, hoverIntent and an ESRI map script. The replica uses none: vanilla JS in js/main.js only. hoverIntent's delay is approximated with a 250 ms close timer; the cookie is approximated with localStorage (wrapped in try/catch).

## Headings

Exactly one h1 per page, including the home page. The source's heading structure beyond one observed `<h1>` was not inspected, so this is not a deliberate deviation from an observed double h1.

## Research-relevant observations

- Link density: the home page carries a long list of hazard links (14 sample types here, generated from data) plus 5 top-level nav entries; this mirrors the reference's link-dense character at a smaller scale.
- Alert level is conveyed by a word, a symbol (triangle, square, circle) and border style in addition to colour.
- Sample banner sits inside the header landmark so it is not an orphan region for assistive technology.
- Dark mode via prefers-color-scheme is an addition not observed on the source.
