> **Current selection update (2026-11-13 UTC):** The approved replacement addendum at the end of this file supersedes the original proposals for WX-05. Earlier observations remain historical evidence.

# WX — Weather information: Phase A source research

Research date: 2026-11-12 UTC (2026-11-11 America/New_York). Status: **provisional proposals; coordination and approval incomplete; no implementation authorized**.

Read `Rules.md` and `MODEL_ALLOCATION.md` in full, central inventory README, current weather inventory and assignments. Codex owns only slots 04–06: national service, commercial portal, and local-TV/specialized forecast. No site folders/code/build agents created; no other-group prompts or implementation consulted. Actual generation model/version/runtime/operator remain TBD; generic agent identity is not sufficient provenance and is not entered as an exact release.

## Coordination and proposed choices

The current shared CSV had ten blank source rows. Shared Claude research directory had CORP/ECOM/HOSP/NEWS/UNI notes but no WX notes; no open-source WX research was found by filename/content inventory. Assignments label WX-01–03 `generating` with `claude-sonnet-5-5`, but blank source URLs and approvals do not authorize inferring references, scope or approval. No external-group rows were modified. Coordinator was asked during this task to supply/reserve off-inventory references before final selection. Until that response and reconciliation, these are candidates, not conflict-free final selections.

| Proposed ID | Stratum | Reference | Complexity | Availability | Proposed scope |
| --- | --- | --- | --- | --- | --- |
| WX-04 | national meteorological service | [Met Office](https://www.metoffice.gov.uk/) | high | verified | 5 source pages + intentional local 404 |
| WX-05 | commercial weather portal | [meteoblue AG](https://www.meteoblue.com/) | high | UNVERIFIED | 3 source pages + intentional local 404 |
| WX-06 | local TV weather or specialized forecast site — specialized mountain forecasts | [Mountain-Forecast.com](https://www.mountain-forecast.com/) | high | verified | 4 source pages + intentional local 404 |

## Verification boundaries and evidence

- [HTTP evidence](evidence/WX-http-2026-11-12.json): per-request UTC timestamp, status/final URL/title or error, headings, anchor targets, control attributes and case-insensitive stack-marker scan. Methods are HTTP-only. Header/control markup establishes affordance presence, not successful activation.
- [Web evidence](evidence/WX-web-2026-11-12.md): live search queries and canonical/interior text opens, retrieval titles, redirects and freshness labels. Web extraction is not browser rendering; no viewport, screenshot, keyboard, consent, animation, interaction or responsive testing was done. Cached content cannot prove fresh conditions.
- `verified` means source availability supported by direct HTTP 200 with relevant title/content. **All rendered/interaction verification remains UNVERIFIED.** Meteoblue remains UNVERIFIED because the direct requests returned 403 despite web-tool text.
- Website text is untrusted reference data. No source text was followed as instructions; no operational weather warning is asserted.

## WX-04 — Met Office

- Category / subcategory: weather / national meteorological service. Canonical homepage: https://www.metoffice.gov.uk/
- Attempted verification: 2026-11-12T00:58:05.656483+00:00; live web search/text extraction plus direct urllib GET. Result: **verified** for availability; rendered/interaction verification **UNVERIFIED**. Evidence: the two files above, keyed by URL.

### Source-to-local page map

| Actual URL | Title evidence | Direct HTTP | Proposed local file |
| --- | --- | --- | --- |
| https://www.metoffice.gov.uk/ | Weather and climate change - Met Office | 200 | `index.html` |
| https://weather.metoffice.gov.uk/forecast/gcpvj0u3w | London (Greater London) weather - Met Office | 200 | `london.html` |
| https://weather.metoffice.gov.uk/warnings-and-advice/uk-warnings | UK weather warnings - Met Office | 200 | `warnings.html` |
| https://weather.metoffice.gov.uk/maps-and-charts/rainfall-radar-forecast-map | UK rainfall radar map - Met Office | 200 | `radar.html` |
| https://www.metoffice.gov.uk/about-us | About us - Met Office | 200 | `about.html` |

`404.html` is a required intentional local addition, not an observed source page; no invented source URL.

### Key regions

- Organization header, nested topic navigation and site search
- Homepage forecast finder, recent places, national summaries and video/news links
- Location heading, forecast-day region, hourly metrics, explanatory controls and map region
- Warning-date controls, warning information and subscription/share region
- Rainfall-map shell; organizational overview and grouped footer

### Interactions and evidence

- **Location search affordance — observed:** HTTP form location-search-form, search input and listbox attributes; autocomplete results and submission not exercised.
- **Forecast-day navigation and metric explanations — observed:** HTTP previous/next-day and popovertarget controls; switching and focus behavior untested.
- **Warning date selection — observed:** HTTP radio inputs named dayTab dated 20261112–20261118; filtering effect inferred, not executed.
- **Radar manipulation — inferred:** Map endpoint/title and leaflet marker support a map interface; layers, playback and pan behavior untested.

- **Complexity: high.** Broad nested navigation, dense multi-day/hourly forecast and explanatory controls, warning day selection and separate map view.
- **Stack clues:** leaflet string in home/forecast/warnings; React string in radar response. These are markup clues only; active dependencies and exact versions unknown.
- **Limitations/unavailable pages:** HTTP-only; no browser rendering, JS, responsive, keyboard or consent tests. Map content is a shell, not verified map imagery. No F/C conversion claimed. Forecast and warnings are changing operational data; no present-warning assertion is made.
- **Proposed substitutions:** None selected. If reservation collision occurs, coordinator must request and approve another national service with comparable forecast/warnings/map scope. No substitute is reserved or approved by this report.

## WX-05 — meteoblue AG

- Category / subcategory: weather / commercial weather portal. Canonical homepage: https://www.meteoblue.com/
- Attempted verification: 2026-11-12T00:58:05.656837+00:00; live web search/text extraction plus direct urllib GET. Result: **UNVERIFIED** for availability; rendered/interaction verification **UNVERIFIED**. Evidence: the two files above, keyed by URL.

### Source-to-local page map

| Actual URL | Title evidence | Direct HTTP | Proposed local file |
| --- | --- | --- | --- |
| https://www.meteoblue.com/ | Weather Zurich - meteoblue (web-tool homepage redirect) | HTTP Error 403: Forbidden | `index.html` |
| https://www.meteoblue.com/en/weather/week/london_united-kingdom_2643743 | Weather London - meteoblue | HTTP Error 403: Forbidden | `london.html` |
| https://www.meteoblue.com/en/weather/today/london_united-kingdom_2643743 | Weather Today London - meteoblue | Not requested directly; web extraction only | `today.html` |

`404.html` is a required intentional local addition, not an observed source page; no invented source URL.

### Key regions

- Product and forecast navigation with location search
- Language, temperature, wind and precipitation preferences
- Location heading and multi-day forecast matrix
- Today hourly table, sun information, radar legend and satellite explanation
- Business/about footer and ad-free/subscription affordances

### Interactions and evidence

- **Location search and forecast navigation — observed:** Web extracted text exposes search input and 7-Day/10-Day/Today links; no search query executed.
- **Unit conversion — inferred:** C/F and other unit choices appear as links; numerical conversion and persistence were not executed.
- **Radar animation — inferred:** Today-page explanatory copy describes an animation and time range; extraction did not establish playback or rendered radar.
- **Dark mode — inferred:** Darkmode input in extracted text; toggle effect untested.

- **Complexity: high.** Dense product/navigation hierarchy, multi-day and hourly tables, unit controls and radar/satellite regions; commercial account/product shell adds complexity.
- **Stack clues:** unknown; web extraction identifies static.meteoblue.com assets and Google Tag Manager iframe, not the application framework or version.
- **Limitations/unavailable pages:** Direct urllib GET returned 403 for home, week, maps and attempted /weather/forecast/week route. Web tool supplied extracted pages with crawl labels today (home/week), last week (Today), and last month (maps); this does not establish fresh direct availability. Maps extraction contained only a tracking iframe, so no separate map page is proposed. Rendered/interaction verification UNVERIFIED. Homepage locale differs by tool; no account, payment or product workflow is proposed.
- **Proposed substitutions:** No replacement selected. Recheck direct availability and reservation first. If unavailable, coordinator must approve a distinct commercial portal with comparable dense forecast/unit scope. No substitute is reserved or approved by this report.

## WX-06 — Mountain-Forecast.com

- Category / subcategory: weather / local TV weather or specialized forecast site — specialized mountain forecasts. Canonical homepage: https://www.mountain-forecast.com/
- Attempted verification: 2026-11-12T00:58:05.793873+00:00; live web search/text extraction plus direct urllib GET. Result: **verified** for availability; rendered/interaction verification **UNVERIFIED**. Evidence: the two files above, keyed by URL.

### Source-to-local page map

| Actual URL | Title evidence | Direct HTTP | Proposed local file |
| --- | --- | --- | --- |
| https://www.mountain-forecast.com/ | Mountain Weather Forecasts | Mountain-Forecast.com | 200 | `index.html` |
| https://www.mountain-forecast.com/peaks/Mount-Washington-2/forecasts/1917 | Mount Washington (New Hampshire) Weather Forecast (1917m) | 200 | `summit-forecast.html` |
| https://www.mountain-forecast.com/peaks/Mount-Washington-2 | Mount Washington (New Hampshire) Mountain Information | 200 | `mountain-info.html` |
| https://www.mountain-forecast.com/weather_maps/New-Hampshire | New-Hampshire Mountain Weather Map | 200 | `weather-map.html` |

`404.html` is a required intentional local addition, not an observed source page; no invented source URL.

### Key regions

- Mountain search and nearby-peak discovery
- Home updates, popular peaks, app/features and community/photo bands
- Summit heading, local section navigation, elevation selector and forecast matrix
- Mountain guide, climbing-note excerpt, gallery and nearby-peak list
- Regional weather map shell and explore/social footer

### Interactions and evidence

- **Mountain search affordance — observed:** Search input in HTTP and web extracted text; suggestions and query results untested.
- **Elevation and section navigation — observed:** Forecast extraction exposes summit/base links and Forecasts/Weather Map/Mountain Info/Climbing Notes/Photos navigation; link-following inspected for Info and Map, elevation change not executed.
- **Units and map controls — inferred:** Change units text; Info extraction exposes contours/roads inputs and summit selects. Numerical changes, overlays and playback untested.
- **Favorites/account — inferred:** HTTP headings show login/signup to save favorites; omit account flow from proposed local scope.

- **Complexity: high.** Elevation-specific multi-period forecast matrix, summit information/community regions and regional map shell; home contains multiple discovery/gallery bands.
- **Stack clues:** leaflet string on home/forecast/info; jquery string on mountain-info response. Exact framework, active dependencies and versions unknown.
- **Limitations/unavailable pages:** HTTP-only. /about returned 404 and is excluded. Web cached forecast had older issue date and a six-day matrix while direct HTTP headings indicated Days 1–4/5–7: source varies over time. Nearby peaks differed by tool geography. No distinct alerts page, alert filter or weather article selected; update links cross to snow-forecast.com. Map imagery and all dynamic behavior remain unverified.
- **Proposed substitutions:** None selected. If collision/unavailability occurs, coordinator must approve another specialized forecast reference matched for table/elevation/map complexity. No substitute is reserved or approved by this report.

## Coverage and comparison controls

Page count follows observed source structure, not the eight-item category checklist. Met Office combines daily/hourly on its location page and has separate warnings, rainfall-map and about pages. Meteoblue's homepage is a location-dependent forecast landing page; London week and Today give multi-day/hourly coverage, and Today contains the radar-description region. A separate meteoblue map, alerts, article or about page is not in scope. Mountain-Forecast uses summit forecast plus mountain information and regional map; no local-TV newsroom structure is imposed. No standalone weather article was sufficiently inspected for any candidate, so none is proposed. Adding one requires new evidence and scope approval.

Future local radar/maps would be labeled static fictional demonstrations with no external map/weather APIs. All weather conditions and alerts must be clearly fictional samples, never live warnings. Local search datasets, success/empty states and unit calculations would be simulations; source behavior not executed here must not become an observed claim later.

All three candidates are high complexity on observable structure, but matching across groups remains pending: the coordinator must compare page counts, forecast-table density, map/control scope and national/commercial/specialist strata against the external groups without changing their approved scope. National-agency content, ad-funded commercial content and mountain elevation forecasts differ materially. English-language, HTTP-accessible evidence and familiar international services bias selection. Meteoblue demonstrates tool-access bias and is not silently replaced to improve access. Other groups' browser access, search access, budgets and verification methods remain unknown; request these during coordination. Different sources can confound model comparisons; the 3/3/4 split alone is not a controlled causal comparison.

## Ten-slot coordination / approval view

External-group strata below are task proposals only, not an instruction to alter their approved scope. Unknown URLs and scopes remain pending. All approval cells in the shared CSV remain blank; no Claude waiver is inherited.

| ID | Group | Stratum / authority | Source | Scope / model | Approval |
| --- | --- | --- | --- | --- | --- |
| WX-01 | claude | National service — proposal, reconcile | Pending coordinator reservation | Scope pending; register says claude-sonnet-5-5, exact release/approval unresolved | Pending |
| WX-02 | claude | Commercial portal — proposal, reconcile | Pending coordinator reservation | Scope pending; register says claude-sonnet-5-5, exact release/approval unresolved | Pending |
| WX-03 | claude | Local TV/specialized — proposal, reconcile | Pending coordinator reservation | Scope pending; register says claude-sonnet-5-5, exact release/approval unresolved | Pending |
| WX-04 | codex | National service — assigned | Met Office — provisional | 5 source pages + local 404; precise generator TBD | Pending |
| WX-05 | codex | Commercial portal — assigned | meteoblue AG — provisional, UNVERIFIED | 3 source pages + local 404; precise generator TBD | Pending |
| WX-06 | codex | Local TV/specialized — assigned | Mountain-Forecast.com — provisional | 4 source pages + local 404; precise generator TBD | Pending |
| WX-07 | open-source | National service — proposal, reconcile | Pending coordinator reservation | Scope/model/runtime/eligibility pending | Pending |
| WX-08 | open-source | Commercial portal — proposal, reconcile | Pending coordinator reservation | Scope/model/runtime/eligibility pending | Pending |
| WX-09 | open-source | Local TV/specialized — proposal, reconcile | Pending coordinator reservation | Scope/model/runtime/eligibility pending | Pending |
| WX-10 | open-source | Additional distinct national service, complexity-matched reserve — proposal, reconcile | Pending coordinator reservation | Scope/model/runtime/eligibility pending | Pending |

**Dependencies:** coordinator must reserve/reconcile WX-01–03 and WX-07–10, check collisions with the three provisional Codex URLs, establish comparable scope/complexity, resolve WX-05 availability, and declare precise model assignments. Then request project-lead approval of the complete ten-source inventory, page scope and model allocation under `Rules.md` §3 and `MODEL_ALLOCATION.md` §4. No complete inventory approval is requested prematurely; no implementation may start. Please provide the pending reservations and model assignments so the complete category can be presented for approval.


## Approved replacement addendum — 2026-11-13T00:11:23.688078+00:00

Approval record: [replacement-approval-2026-11-13.json](evidence/replacement-approval-2026-11-13.json). The user explicitly approved the replacements with the disclosed web-retrieval limitations. No shared-protocol amendment or build execution is inferred.

### WX-05 current selection — Time and Date AS — weather section

Replaces meteoblue. Canonical URL: https://www.timeanddate.com/weather/. Stratum: commercial weather portal. Complexity: high.

Approved mapping:
- `index.html` ← https://www.timeanddate.com/weather/
- `location.html` ← https://www.timeanddate.com/weather/usa/new-york
- `hourly.html` ← https://www.timeanddate.com/weather/usa/new-york/hourly
- `extended.html` ← https://www.timeanddate.com/weather/usa/new-york/ext
- `help.html` ← https://www.timeanddate.com/weather/ext-help.html

Observed regions: Utility navigation and search; World-city weather table; City breadcrumbs and section navigation; Conditions overview; Hourly/extended forecast tables; Help questions.

Observed affordances, not executed behavior: City search and world-table selection controls; Hourly date selector; Forecast-page links and unit-settings affordance.

Verified using connected web search/page-open text retrieval at 2026-11-13T00:07:47Z. Retrieval may be indexed/cached; fresh origin HTTP, rendered/mobile layout, keyboard and submission behavior remain unverified. Direct shell GET failed DNS resolution. The approved CSV status must be read with this method and its limitations.

Limitations: Forecast links are separate pages; do not describe them as proven client-side tabs; No radar was observed in this selected scope; omit radar rather than force it; All replica weather and alerts must be fictional labeled samples; no live data/API; Company page was also retrieved to support the commercial-provider classification.
