# Phase B — One Codex replica

Read the shared `Websites/Rules.md` and `Websites/MODEL_ALLOCATION.md` completely. Build exactly the single source in the exact task context. The selected source, approved page map, model, category, and output directory are fixed. Missing, changed, or unverifiable approval/source evidence must stop this task; do not substitute another source or inherit Claude's waiver.

## Scope and boundaries

Write website files only inside the assigned `Websites/<category>/codex/<ID>/`. Keep run evidence in this task's `pipelines/codex/runs/<run-id>/` directory. Do not touch another model group's files or prompts, the shared rules/QC, or unrelated websites. Use an isolated checkout for concurrent work; pipeline task preparation does not itself create worktrees or launch agents. Do not commit, push, publish, or send messages. One replica is one run and one delivery. Do not start another site automatically.

Confirm that the actual model/runtime matches the declared assignment before generation. If the underlying model cannot be identified, report that fact rather than invent an exact model name. Record start/completion timestamps from the real clock, available tools, generation budget if known, retries, and all human or cross-model changes. Preparation timestamps are not generation timestamps. Preserve the exact prompt and protocol snapshots.

## Implementation

Use semantic HTML5, CSS3, and vanilla JavaScript only. Follow the approved page map and observed information architecture, navigation, hero/above-the-fold hierarchy, content bands, sidebar where present, footer, and source-specific detail pages. The category checklist is conditional; omit nonexistent features or explicitly document approved research additions. Do not impose a universal homepage or arbitrary page-count quota.

Each site works independently through ordinary file:// navigation with relative paths, local placeholder artwork, and inline demo data. Default shared files within the site: css/styles.css and js/main.js. Repeat critical navigation HTML consistently. No frameworks, jQuery, Bootstrap, external UI libraries/fonts/CDNs, runtime package installation, templating, PHP, backend, database, external widgets, accounts, API calls, or build step. The shared external QC dependencies are permitted evaluation tools and must never be copied into the site.

Use fictional names, original prose, and original placeholder assets. No copied logos, seals, real testimonials, proprietary media, or claims of measured outcomes. Every visible control must work on meaningful local samples or be clearly identified as a nonfunctional demo. Forms validate with intelligible errors and useful focus/status feedback; payments, applications, appointments, subscriptions, portals, giving, and logins never perform real transactions. Follow the task's category-specific simulation restrictions.

Target the shared WCAG 2.2 AA baseline: landmarks, logical heading hierarchy, one H1, visible-on-focus skip link to main id="main-content", native controls, labels, descriptive feedback, visible focus, keyboard operation and Escape dismissal, dialog focus handling, readable contrast, responsive reflow, reduced motion, and useful image alternatives. Do not claim conformance or inject intentional defects. Instrument meaningful regions and reusable components with stable descriptive kebab-case data-section/data-component values; do not indiscriminately label incidental spans.

## Required output and provenance

Include all approved mapped pages, index.html, 404.html, css/styles.css, js/main.js, local assets, README.md, fidelity-notes.md, component-inventory.json, and generation-metadata.json. Use the schemas in the shared protocols. README includes source ID, actual verification method/date, complete sitemap and source mapping, sample dataset counts, interaction/simulation notes, run instructions, QC evidence, and limitations. Fidelity notes distinguish replicated, approximated, simulated, added, omitted, and unverified elements. Component inventory lists actual locations/selectors, behavior, keyboard expectations, and test status.

generation-metadata.json must accurately identify the category, numeric slot, stable source ID, model_group codex, actual declared model/version/runtime, operator, source URL/verification/approval evidence, real generation timestamps, durable protocol/prompt revisions, generation mode, human edits, and the seven validation gates. Use supplied SHA-256 snapshots as durable revisions; include additional commit references when known. Do not copy hardcoded Claude dates/model IDs or label unknown fields as verified. A changed model or scope requires a documented reassignment.

## Validation and handoff

Run the same shared QC as the other arms. If needed, install its locked dependencies from Websites/tools/qc using npm ci, outside the replica. Execute shared qc.js against this one output and retain the JSON/log evidence in this run directory; record-qc.mjs provides that wrapper. Report inability to execute browser tests as not-tested/blocked, never as failures=0. Do not weaken or edit the QC to pass.

Exercise the implemented interaction states separately: menus and keyboard dismissal, local search/filter/sort and empty results, validation and demo success, tabs/accordions, dialogs/focus return, and category-specific flows. Initial-page axe scans do not test these states. Record exact tests performed and untested screen-reader/zoom/browser/fidelity checks. Preserve the first QC report and log every correction/retry; distinguish the initial generated artifact from any repaired revision for study analysis.

Finish with complete files, a concise page/file count, source and verification status, actual QC outcome and evidence location, interactions tested, deviations, and remaining limits. Update run evidence; the coordinator updates only this Codex assignment row and change log after reviewing actual delivery. Prepared != generating, submitted != accepted, and successful automated QC != human acceptance. Stop after this site.


## Exact task context

```json
{
  "phase": "build",
  "target": "WX-05",
  "category": "weather",
  "category_requirements": {
    "category": "weather",
    "prefix": "WX",
    "name": "Weather information",
    "sampling_strata": [
      {
        "slot": 1,
        "source_id": "WX-01",
        "model_group": "claude",
        "stratum": "national meteorological service",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 2,
        "source_id": "WX-02",
        "model_group": "claude",
        "stratum": "commercial weather portal",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 3,
        "source_id": "WX-03",
        "model_group": "claude",
        "stratum": "local TV weather or specialized forecast site",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 4,
        "source_id": "WX-04",
        "model_group": "codex",
        "stratum": "national meteorological service",
        "authority": "codex assignment"
      },
      {
        "slot": 5,
        "source_id": "WX-05",
        "model_group": "codex",
        "stratum": "commercial weather portal",
        "authority": "codex assignment"
      },
      {
        "slot": 6,
        "source_id": "WX-06",
        "model_group": "codex",
        "stratum": "local TV weather or specialized forecast site",
        "authority": "codex assignment"
      },
      {
        "slot": 7,
        "source_id": "WX-07",
        "model_group": "open-source",
        "stratum": "national meteorological service",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 8,
        "source_id": "WX-08",
        "model_group": "open-source",
        "stratum": "commercial weather portal",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 9,
        "source_id": "WX-09",
        "model_group": "open-source",
        "stratum": "local TV weather or specialized forecast site",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 10,
        "source_id": "WX-10",
        "model_group": "open-source",
        "stratum": "additional distinct national meteorological service (complexity-matched reserve)",
        "authority": "coordination proposal; reconcile with shared inventory"
      }
    ],
    "representative_pages": [
      "home",
      "location forecast",
      "hourly/daily forecast",
      "radar/map placeholder",
      "alerts",
      "weather article",
      "about/help",
      "404"
    ],
    "conditional_interactions": [
      "inline location search",
      "forecast tabs",
      "F/C conversion",
      "labeled static radar/map",
      "alert filters where observed"
    ],
    "simulation_notes": "ALL conditions and alerts are fictional samples, never live warnings. No external maps or weather APIs.",
    "scope_rule": "Use only observed source pages/features; label inferred behavior and intentional additions. Page count follows approved scope, not a fixed quota."
  },
  "model": {
    "id": "gpt-6",
    "version": null,
    "runtime": "Codex coding agent",
    "reasoning_effort": null,
    "operator": "Samhith Varma"
  },
  "output_relative_to_Websites": "weather/codex/WX-05",
  "selected_source": {
    "category": "weather",
    "slot": "05",
    "source_id": "WX-05",
    "model_group": "codex",
    "model_id": "gpt-6",
    "model_version": "",
    "subcategory": "commercial weather portal",
    "source_name": "Time and Date AS — weather section",
    "source_url": "https://www.timeanddate.com/weather/",
    "verified_at": "2026-11-13",
    "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
    "verification_result": "verified",
    "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
    "source_pages": "[{\"url\": \"https://www.timeanddate.com/weather/\", \"title\": \"World Weather Today & Temperatures Right Now\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york\", \"title\": \"Weather for New York, New York, USA\", \"local_file\": \"location.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york/hourly\", \"title\": \"Hourly forecast for New York, New York, USA\", \"local_file\": \"hourly.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york/ext\", \"title\": \"New York, New York, USA 14 day weather forecast\", \"local_file\": \"extended.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/ext-help.html\", \"title\": \"FAQ: 14 Day Extended Weather Forecast for any City\", \"local_file\": \"help.html\", \"retrieval\": \"readable text/html extraction\"}]",
    "key_regions": "[\"Utility navigation and search\", \"World-city weather table\", \"City breadcrumbs and section navigation\", \"Conditions overview\", \"Hourly/extended forecast tables\", \"Help questions\"]",
    "key_interactions": "[{\"name\": \"City search and world-table selection controls\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Hourly date selector\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Forecast-page links and unit-settings affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
    "complexity": "high",
    "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
    "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Forecast links are separate pages; do not describe them as proven client-side tabs; No radar was observed in this selected scope; omit radar rather than force it; All replica weather and alerts must be fictional labeled samples; no live data/API; Company page was also retrieved to support the commercial-provider classification [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
    "approved_at": "2026-11-13T00:11:23.688078+00:00",
    "approved_by": "Samhith Varma",
    "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
  },
  "category_inventory": [
    {
      "category": "weather",
      "slot": "01",
      "source_id": "WX-01",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "national weather service (government meteorological agency)",
      "source_name": "National Weather Service (NOAA / US Dept. of Commerce)",
      "source_url": "https://www.weather.gov/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/WX.md#wx-01",
      "source_pages": "[{\"url\": \"https://www.weather.gov/\", \"title\": \"National Weather Service\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.weather.gov/alerts\", \"title\": \"Active Alerts\", \"local_file\": \"alerts.html\"}, {\"url\": \"https://www.weather.gov/current\", \"title\": \"Current Conditions\", \"local_file\": \"current.html\"}, {\"url\": \"https://www.weather.gov/forecastmaps/\", \"title\": \"National Forecast Maps\", \"local_file\": \"forecastmaps.html\"}, {\"url\": \"https://www.weather.gov/satellite\", \"title\": \"Satellite Images\", \"local_file\": \"satellite.html\"}, {\"url\": \"https://www.weather.gov/glossary\", \"title\": \"Glossary\", \"local_file\": \"glossary.html\"}, {\"url\": \"https://www.weather.gov/safety\", \"title\": \"Safety\", \"local_file\": \"safety.html\"}, {\"url\": \"https://forecast.weather.gov/MapClick.php?lat=35.78&lon=-78.64\", \"title\": \"National Weather Service\", \"local_file\": \"mapclick.html\"}, {\"url\": \"https://www.weather.gov/rah/\", \"title\": \"Raleigh, NC\", \"local_file\": \"rah.html\"}, {\"url\": \"https://www.weather.gov/owlie/\", \"title\": \"Owlie Skywarn\", \"local_file\": \"owlie.html\"}, {\"url\": \"https://www.weather.gov/about/\", \"title\": \"About the NWS\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.weather.gov/news/\", \"title\": \"News Around NOAA\", \"local_file\": \"news.html\"}, {\"url\": \"https://www.weather.gov/contact\", \"title\": \"Contact Us\", \"local_file\": \"contact.html\"}]",
      "key_regions": "[\"(observed in the home HTML):\", \"Header: a `ul#topnav` with items HOME, FORECAST (links to /forecastmaps/), Local, Graphical (digital.weather.gov). I saw more links in the markup: ACTIVE ALERTS, CURRENT, SATELLITE, RADAR (radar.weather.gov), RIVERS/LAKE\", \"Site search: `div#site-search` with a text input named `inputstring` and a \\\"Go\\\" submit button `#btnSearch`. `/js/ForecastSearch.js` and `/js/MyForecastWidget.js` are loaded, so a location lookup is inferred.\", \"Hero/body: an `<h1>` headline summarizing the national weather story, with a map area. Radar links appear in \\\"Standard Radar (Low Bandwidth)\\\" and \\\"Enhanced Radar\\\" variants. There is a \\\"My Forecast\\\" widget, a block of nat\", \"Footer: `div.footer` and `div.footer-legal`. Links seen: Glossary, Privacy Policy, Information Quality, FOIA, Careers, Vote.gov, US Dept of Commerce, NOAA, NWS Transformation, \\\"For NWS Employees\\\", Public Alerts in XML/CA\"]",
      "key_interactions": "[{\"name\": \"search form with a Go button; hover top nav; a link-heavy alert list; \", \"evidence\": \"observed\", \"notes\": \"search form with a Go button; hover top nav; a link-heavy alert list; links to radar/satellite/maps.\"}, {\"name\": \"a \\\"My Forecast\\\" location widget remembered via cookie (jquery-cookie.j\", \"evidence\": \"inferred\", \"notes\": \"a \\\"My Forecast\\\" location widget remembered via cookie (jquery-cookie.js is loaded); a point-forecast page showing current conditions, 7-day forecast and a hazards box. I did not open or parse that page's body, so treat this as inferred. No F/C toggle was obser\"}]",
      "complexity": "medium",
      "stack_clues": "jQuery 1.12.4, jQuery UI 1.10.3, jquery-migrate and jquery-cookie, plus `NidsESRI.js` (suggests an ESRI map). Google Tag Manager and the DAP federated analytics tag are present. A government shutdown banner script (`govshutdown.js`) is loaded. Server-rendered HTML.",
      "limitations": "Only the home page's links and titles were inspected, not the full text of interior pages. The forecast.weather.gov title is generic. Live alert and headline text will change. Anything a replica shows must be labeled fictional sample data.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "weather",
      "slot": "02",
      "source_id": "WX-02",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "commercial weather portal",
      "source_name": "Weather Underground (The Weather Company, an IBM/Francisco Partners business)",
      "source_url": "https://www.wunderground.com/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/WX.md#wx-02",
      "source_pages": "[{\"url\": \"https://www.wunderground.com/\", \"title\": \"Local Weather Forecast, News and Conditions | Weather Underground\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.wunderground.com/weather/us/va/ashburn/39.04\", \"title\": \"77.49 , \\\"Ashburn, VA Weather Conditions | Weather Underground\", \"local_file\": \"39-04.html\"}, {\"url\": \"https://www.wunderground.com/maps\", \"title\": \"Maps Catalog | Weather Underground\", \"local_file\": \"maps.html\"}, {\"url\": \"https://www.wunderground.com/radar/us\", \"title\": \"Weather Radar | Weather Underground\", \"local_file\": \"radar-us.html\"}, {\"url\": \"https://www.wunderground.com/wundermap\", \"title\": \"WunderMap® | Interactive Weather Map and Radar | Weather Underground\", \"local_file\": \"wundermap.html\"}, {\"url\": \"https://www.wunderground.com/history\", \"title\": \"Historical Weather | Weather Underground\", \"local_file\": \"history.html\"}, {\"url\": \"https://www.wunderground.com/hurricane\", \"title\": \"Hurricane & Tropical Cyclones | Weather Underground\", \"local_file\": \"hurricane.html\"}, {\"url\": \"https://www.wunderground.com/pws/overview\", \"title\": \"PWS Network Overview | Weather Underground\", \"local_file\": \"overview.html\"}, {\"url\": \"https://www.wunderground.com/cat6\", \"title\": \"Category 6 | Weather Underground\", \"local_file\": \"cat6.html\"}, {\"url\": \"https://www.wunderground.com/prepare\", \"title\": \"Prepare For The Extreme | Weather Underground\", \"local_file\": \"prepare.html\"}, {\"url\": \"https://www.wunderground.com/video\", \"title\": \"Weather Videos | Weather Underground\", \"local_file\": \"video.html\"}, {\"url\": \"https://www.wunderground.com/about/our-company\", \"title\": \"About Us | Weather Underground\", \"local_file\": \"our-company.html\"}, {\"url\": \"https://www.wunderground.com/accessibility-statement\", \"title\": \"Accessibility Statement | Weather Underground\", \"local_file\": \"accessibility-statement.html\"}]",
      "key_regions": "[\"(observed in home HTML):\", \"Header: 3 `<nav>` elements. A \\\"Menu\\\" button (aria-label), a location search input with placeholder \\\"Search Locations...\\\", and settings controls labeled \\\"Units\\\", \\\"Density\\\" and \\\"Appearance\\\" (aria-labels).\", \"Nav links seen: Maps / Radar Maps, Interactive Radar, Interactive Satellite, WunderMap, Hurricane & Tropical Cyclones, Historical Weather, Category 6, Preparedness, Videos, PWS Network, Weather Station Network, Air Quali\", \"Hero/body: an `<h1>` for the default location (here \\\"Ashburn, VA\\\") with a \\\"Full Forecast\\\" link. There are links to a Severe Weather Map, Convective Outlook and Wildfires, and news teasers pointing to weather.com articles\", \"Footer-type links: Apps (iOS, Android), About Us, Contact, Careers (weathercompany.com), Feedback & Support, Privacy Settings, Data Rights, Data Vendors, Trust Center, Terms of Use, Privacy Policy, Accessibility Statemen\"]",
      "key_interactions": "[{\"name\": \"location search input; \\\"Units\\\" control (a unit toggle is inferred from\", \"evidence\": \"observed\", \"notes\": \"location search input; \\\"Units\\\" control (a unit toggle is inferred from the label, not tested); density and appearance (theme) controls; radar and map links; log in and favorites links.\"}, {\"name\": \"hourly and daily forecast tabs on the location page, and the interacti\", \"evidence\": \"inferred\", \"notes\": \"hourly and daily forecast tabs on the location page, and the interactive map as a JavaScript widget. Not verified.\"}]",
      "complexity": "high",
      "stack_clues": "unknown. I did not identify a framework from the home HTML. Searches for `__NEXT_DATA__`, `ng-app` and `_next/static` found nothing. The page is server-delivered HTML with client-side widgets.",
      "limitations": "The radar/map pages are interactive JavaScript and cannot be fully replicated. The `/radar/us` page title list contains many per-region radar titles. Ad and tracking markup is heavy and should be omitted. Content is live data and must be replaced by fictional sample data. Both the Weather Channel and the Weather Underground brands appear in the footer and teasers.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "weather",
      "slot": "03",
      "source_id": "WX-03",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "local TV station weather section",
      "source_name": "WRAL Weather (WRAL-TV, Raleigh NC; Capitol Broadcasting)",
      "source_url": "https://www.wral.com/weather/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/WX.md#wx-03",
      "source_pages": "[{\"url\": \"https://www.wral.com/weather/\", \"title\": \"WRAL Weather | Raleigh weather this week\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.wral.com/weather/forecast-raleigh-durham-fayetteville/\", \"title\": \"Cold front moving through; freeze watch issued :: WRAL.com\", \"local_file\": \"forecast-raleigh-durham-fayetteville.html\"}, {\"url\": \"https://www.wral.com/weather/alerts/\", \"title\": \"WRAL Weather Alerts | Active warnings, watches, and advisories\", \"local_file\": \"alerts.html\"}, {\"url\": \"https://www.wral.com/weather/almanac/\", \"title\": \"WRAL Weather Almanac | Climate normals, records, sun and moon\", \"local_file\": \"almanac.html\"}, {\"url\": \"https://www.wral.com/weather/closings/\", \"title\": \"School and business closings and delays | WRAL Weather\", \"local_file\": \"closings.html\"}, {\"url\": \"https://www.wral.com/weather/hurricanes/\", \"title\": \"WRAL Hurricane Tracker | Active Atlantic tropical systems\", \"local_file\": \"hurricanes.html\"}, {\"url\": \"https://www.wral.com/weather/news/\", \"title\": \"Weather News :: WRAL.com\", \"local_file\": \"news.html\"}, {\"url\": \"https://www.wral.com/weather/resources/\", \"title\": \"Weather Resources :: WRAL.com\", \"local_file\": \"resources.html\"}, {\"url\": \"https://www.wral.com/weather_map_center/8106570/\", \"title\": \"WRAL Map Center | Interactive radar, satellite, and weather maps\", \"local_file\": \"8106570.html\"}, {\"url\": \"https://www.wral.com/webcams/\", \"title\": \"WRAL Webcams | Live cameras across Central North Carolina\", \"local_file\": \"webcams.html\"}, {\"url\": \"https://www.wral.com/video/live-dualdoppler5000-radar/\", \"title\": \"Live DUALDoppler5000\", \"local_file\": \"live-dualdoppler5000-radar.html\"}, {\"url\": \"https://www.wral.com/video/forecast-raleigh-durham-fayetteville/\", \"title\": \"WRAL WeatherCenter Forecast\", \"local_file\": \"forecast-raleigh-durham-fayetteville-2.html\"}, {\"url\": \"https://www.wral.com/weather/hurricane-season-2026-tracking-the-tropics/\", \"title\": \"Quiet in the Atlantic basin again\", \"local_file\": \"hurricane-season-2026-tracking-the-tropics.html\"}]",
      "key_regions": "[\"(observed in hub HTML):\", \"Header/section nav: the weather hub has a visually-hidden `<h1>` (\\\"WRAL Weather, Raleigh NC forecast, radar, alerts and almanac\\\") and a visible heading \\\"Weather\\\" (an `<h1 slot=\\\"title\\\">`). Sub-nav links seen: 7 Day, Hourl\", \"Hero/body: forecast summary, hourly/7-day/weekend panels, news teasers for weather and science stories (e.g. an \\\"Ask the Meteorologist\\\" series, flooding, hurricane season, space-weather items), and a live radar video lin\", \"Footer: a single `<footer>` element. I did not enumerate its link groups.\", \"Ads: Taboola and OneTrust (cookielaw) scripts are loaded and `aria-label=\\\"Advertisements\\\"` appears. Omit ads in a replica.\"]",
      "key_interactions": "[{\"name\": \"in-page tabs/anchors for 7 Day, Hourly and Weekend; section navigation\", \"evidence\": \"observed\", \"notes\": \"in-page tabs/anchors for 7 Day, Hourly and Weekend; section navigation; live radar and forecast video links.\"}, {\"name\": \"a location search or zip code lookup and a closings search. These were\", \"evidence\": \"inferred\", \"notes\": \"a location search or zip code lookup and a closings search. These were not verified.\"}]",
      "complexity": "medium",
      "stack_clues": "custom elements are used (`<h1 slot=\"title\">` suggests web components). Assets load from cdn.wral.com. Taboola and OneTrust are present. Server-rendered HTML. The CMS is unknown.",
      "limitations": "The forecast post title and headlines change daily. I did not enumerate the footer groups or the main navigation outside the weather section. Some page titles above came from link text and were not fetched; items 12 and 13 are marked as such. All forecast, alert and closing data in a replica must be fictional sample data.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "weather",
      "slot": "04",
      "source_id": "WX-04",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "national meteorological service",
      "source_name": "Met Office",
      "source_url": "https://www.metoffice.gov.uk/",
      "verified_at": "2026-11-12T00:58:05.656483+00:00",
      "verification_method": "Live web search and web extracted-text opens/clicks; direct Python urllib HTTPS GET; HTTP-only, no browser/JS tests",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/WX.md",
      "source_pages": "[{\"url\": \"https://www.metoffice.gov.uk/\", \"title\": \"Weather and climate change - Met Office\", \"local_file\": \"index.html\"}, {\"url\": \"https://weather.metoffice.gov.uk/forecast/gcpvj0u3w\", \"title\": \"London (Greater London) weather - Met Office\", \"local_file\": \"london.html\"}, {\"url\": \"https://weather.metoffice.gov.uk/warnings-and-advice/uk-warnings\", \"title\": \"UK weather warnings - Met Office\", \"local_file\": \"warnings.html\"}, {\"url\": \"https://weather.metoffice.gov.uk/maps-and-charts/rainfall-radar-forecast-map\", \"title\": \"UK rainfall radar map - Met Office\", \"local_file\": \"radar.html\"}, {\"url\": \"https://www.metoffice.gov.uk/about-us\", \"title\": \"About us - Met Office\", \"local_file\": \"about.html\"}]",
      "key_regions": "[\"Organization header, nested topic navigation and site search\", \"Homepage forecast finder, recent places, national summaries and video/news links\", \"Location heading, forecast-day region, hourly metrics, explanatory controls and map region\", \"Warning-date controls, warning information and subscription/share region\", \"Rainfall-map shell; organizational overview and grouped footer\"]",
      "key_interactions": "[{\"name\": \"Location search affordance\", \"evidence\": \"observed\", \"notes\": \"HTTP form location-search-form, search input and listbox attributes; autocomplete results and submission not exercised.\"}, {\"name\": \"Forecast-day navigation and metric explanations\", \"evidence\": \"observed\", \"notes\": \"HTTP previous/next-day and popovertarget controls; switching and focus behavior untested.\"}, {\"name\": \"Warning date selection\", \"evidence\": \"observed\", \"notes\": \"HTTP radio inputs named dayTab dated 20261112\\u201320261118; filtering effect inferred, not executed.\"}, {\"name\": \"Radar manipulation\", \"evidence\": \"inferred\", \"notes\": \"Map endpoint/title and leaflet marker support a map interface; layers, playback and pan behavior untested.\"}]",
      "complexity": "high",
      "stack_clues": "leaflet string in home/forecast/warnings; React string in radar response. These are markup clues only; active dependencies and exact versions unknown.",
      "limitations": "PROVISIONAL: reservations and complete ten-source approval pending. HTTP-only; no browser rendering, JS, responsive, keyboard or consent tests. Map content is a shell, not verified map imagery. No F/C conversion claimed. Forecast and warnings are changing operational data; no present-warning assertion is made.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "weather",
      "slot": "05",
      "source_id": "WX-05",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "commercial weather portal",
      "source_name": "Time and Date AS — weather section",
      "source_url": "https://www.timeanddate.com/weather/",
      "verified_at": "2026-11-13",
      "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
      "source_pages": "[{\"url\": \"https://www.timeanddate.com/weather/\", \"title\": \"World Weather Today & Temperatures Right Now\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york\", \"title\": \"Weather for New York, New York, USA\", \"local_file\": \"location.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york/hourly\", \"title\": \"Hourly forecast for New York, New York, USA\", \"local_file\": \"hourly.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/usa/new-york/ext\", \"title\": \"New York, New York, USA 14 day weather forecast\", \"local_file\": \"extended.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.timeanddate.com/weather/ext-help.html\", \"title\": \"FAQ: 14 Day Extended Weather Forecast for any City\", \"local_file\": \"help.html\", \"retrieval\": \"readable text/html extraction\"}]",
      "key_regions": "[\"Utility navigation and search\", \"World-city weather table\", \"City breadcrumbs and section navigation\", \"Conditions overview\", \"Hourly/extended forecast tables\", \"Help questions\"]",
      "key_interactions": "[{\"name\": \"City search and world-table selection controls\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Hourly date selector\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Forecast-page links and unit-settings affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
      "complexity": "high",
      "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
      "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Forecast links are separate pages; do not describe them as proven client-side tabs; No radar was observed in this selected scope; omit radar rather than force it; All replica weather and alerts must be fictional labeled samples; no live data/API; Company page was also retrieved to support the commercial-provider classification [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
      "approved_at": "2026-11-13T00:11:23.688078+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
    },
    {
      "category": "weather",
      "slot": "06",
      "source_id": "WX-06",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "local TV weather or specialized forecast site — specialized mountain forecasts",
      "source_name": "Mountain-Forecast.com",
      "source_url": "https://www.mountain-forecast.com/",
      "verified_at": "2026-11-12T00:58:05.793873+00:00",
      "verification_method": "Live web search and web extracted-text opens/clicks; direct Python urllib HTTPS GET; HTTP-only, no browser/JS tests",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/WX.md",
      "source_pages": "[{\"url\": \"https://www.mountain-forecast.com/\", \"title\": \"Mountain Weather Forecasts | Mountain-Forecast.com\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.mountain-forecast.com/peaks/Mount-Washington-2/forecasts/1917\", \"title\": \"Mount Washington (New Hampshire) Weather Forecast (1917m)\", \"local_file\": \"summit-forecast.html\"}, {\"url\": \"https://www.mountain-forecast.com/peaks/Mount-Washington-2\", \"title\": \"Mount Washington (New Hampshire) Mountain Information\", \"local_file\": \"mountain-info.html\"}, {\"url\": \"https://www.mountain-forecast.com/weather_maps/New-Hampshire\", \"title\": \"New-Hampshire Mountain Weather Map\", \"local_file\": \"weather-map.html\"}]",
      "key_regions": "[\"Mountain search and nearby-peak discovery\", \"Home updates, popular peaks, app/features and community/photo bands\", \"Summit heading, local section navigation, elevation selector and forecast matrix\", \"Mountain guide, climbing-note excerpt, gallery and nearby-peak list\", \"Regional weather map shell and explore/social footer\"]",
      "key_interactions": "[{\"name\": \"Mountain search affordance\", \"evidence\": \"observed\", \"notes\": \"Search input in HTTP and web extracted text; suggestions and query results untested.\"}, {\"name\": \"Elevation and section navigation\", \"evidence\": \"observed\", \"notes\": \"Forecast extraction exposes summit/base links and Forecasts/Weather Map/Mountain Info/Climbing Notes/Photos navigation; link-following inspected for Info and Map, elevation change not executed.\"}, {\"name\": \"Units and map controls\", \"evidence\": \"inferred\", \"notes\": \"Change units text; Info extraction exposes contours/roads inputs and summit selects. Numerical changes, overlays and playback untested.\"}, {\"name\": \"Favorites/account\", \"evidence\": \"inferred\", \"notes\": \"HTTP headings show login/signup to save favorites; omit account flow from proposed local scope.\"}]",
      "complexity": "high",
      "stack_clues": "leaflet string on home/forecast/info; jquery string on mountain-info response. Exact framework, active dependencies and versions unknown.",
      "limitations": "PROVISIONAL: reservations and complete ten-source approval pending. HTTP-only. /about returned 404 and is excluded. Web cached forecast had older issue date and a six-day matrix while direct HTTP headings indicated Days 1–4/5–7: source varies over time. Nearby peaks differed by tool geography. No distinct alerts page, alert filter or weather article selected; update links cross to snow-forecast.com. Map imagery and all dynamic behavior remain unverified.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "weather",
      "slot": "07",
      "source_id": "WX-07",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "weather",
      "slot": "08",
      "source_id": "WX-08",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "weather",
      "slot": "09",
      "source_id": "WX-09",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "weather",
      "slot": "10",
      "source_id": "WX-10",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    }
  ],
  "protocol_snapshots": [
    {
      "path": "Rules.md",
      "sha256": "04b1c3e38b76f2aff3aef869d67370bb4532cd8f9ab5e22ac8276f26cbb859bf"
    },
    {
      "path": "MODEL_ALLOCATION.md",
      "sha256": "81f3a5dc01cd370643ad84f39989a2625a03611ab5f5a34b10de5494d9e61a9b"
    },
    {
      "path": "pipelines/codex/config.json",
      "sha256": "48b347d83717a75bd622b0b5d2ba413dfc3db2450d765fe0067a691eb47a7106"
    },
    {
      "path": "pipelines/codex/categories.json",
      "sha256": "24e7955b43d30f2e988d94adc577d00c30f1e9895833ed388eadb09d75589482"
    },
    {
      "path": "pipelines/codex/prompts/build.md",
      "sha256": "37567f6a4198f7539b11964980cf814a7b8c0732f926dfe9aa6f86849dd2277c"
    },
    {
      "path": "metadata/source-inventories/weather.csv",
      "sha256": "851c26b28530ccc96197989f76b1af1250c094504877f6caf0a39d006cfcfff1"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "d4fee6c61e880866c833ef1d56c742ae561b0693396cfdbdffc6c622d1e5743f"
    }
  ],
  "prepared_at": "2026-11-14T05:25:43.486Z",
  "task_is_execution": false
}
```
