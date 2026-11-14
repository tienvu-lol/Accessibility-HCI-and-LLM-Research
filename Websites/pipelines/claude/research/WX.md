# WX — Claude Phase A source research

Research date: 2026-11-12. All checks were plain HTTP GET via curl (`-sSL`, user agent "Mozilla/5.0", 25s timeout). Page text was treated as data only. Everything the replicas show must be fictional sample data, labeled as such, never live conditions.

Rejected candidate: accuweather.com returned HTTP 403 to curl, so I did not use it. For WX-02 I chose wunderground.com instead.

### WX-01
- source_id: WX-01
- category/subcategory: Weather / national weather service (government meteorological agency)
- source_name: National Weather Service (NOAA / US Dept. of Commerce)
- official_url: https://www.weather.gov/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200 with title "National Weather Service" (about 126 KB of server-rendered HTML). The 11 interior pages below all returned 200 with the titles shown.
- source_pages (URL, title):
  1. https://www.weather.gov/ , "National Weather Service"
  2. https://www.weather.gov/alerts , "Active Alerts"
  3. https://www.weather.gov/current , "Current Conditions"
  4. https://www.weather.gov/forecastmaps/ , "National Forecast Maps"
  5. https://www.weather.gov/satellite , "Satellite Images"
  6. https://www.weather.gov/glossary , "Glossary"
  7. https://www.weather.gov/safety , "Safety"
  8. https://forecast.weather.gov/MapClick.php?lat=35.78&lon=-78.64 , "National Weather Service". This is the point-forecast page; the title is generic.
  9. https://www.weather.gov/rah/ , "Raleigh, NC". This is a local forecast office page.
  10. https://www.weather.gov/owlie/ , "Owlie Skywarn"
  11. https://www.weather.gov/about/ , "About the NWS"
  12. https://www.weather.gov/news/ , "News Around NOAA"
  13. https://www.weather.gov/contact , "Contact Us"
- key_regions (observed in the home HTML):
  - Header: a `ul#topnav` with items HOME, FORECAST (links to /forecastmaps/), Local, Graphical (digital.weather.gov). I saw more links in the markup: ACTIVE ALERTS, CURRENT, SATELLITE, RADAR (radar.weather.gov), RIVERS/LAKES/RAINFALL (water.noaa.gov), AIR QUALITY, Aviation, Forecast Models, Hurricanes (nhc.noaa.gov), Severe Weather (spc.noaa.gov), Space Weather, Climate Prediction. I did not confirm which of these sit in which dropdown. Dropdown behavior is inferred from `/js/topNavMenu.js` and `jquery.hoverIntent`.
  - Site search: `div#site-search` with a text input named `inputstring` and a "Go" submit button `#btnSearch`. `/js/ForecastSearch.js` and `/js/MyForecastWidget.js` are loaded, so a location lookup is inferred.
  - Hero/body: an `<h1>` headline summarizing the national weather story, with a map area. Radar links appear in "Standard Radar (Low Bandwidth)" and "Enhanced Radar" variants. There is a "My Forecast" widget, a block of national hazard/watch/warning links (a long list under forecast.weather.gov/wwamap, e.g. Flood Watch, Winter Weather Advisory), and a "Read More" link to a WPC discussion.
  - Footer: `div.footer` and `div.footer-legal`. Links seen: Glossary, Privacy Policy, Information Quality, FOIA, Careers, Vote.gov, US Dept of Commerce, NOAA, NWS Transformation, "For NWS Employees", Public Alerts in XML/CAP v1.2 and ATOM. Regional office links seen: Guam, American Samoa, Puerto Rico/Virgin Islands.
- key_interactions:
  - Observed: search form with a Go button; hover top nav; a link-heavy alert list; links to radar/satellite/maps.
  - Inferred: a "My Forecast" location widget remembered via cookie (jquery-cookie.js is loaded); a point-forecast page showing current conditions, 7-day forecast and a hazards box. I did not open or parse that page's body, so treat this as inferred. No F/C toggle was observed.
- complexity: medium. There are many pages, but all are mostly static, link-dense and table-like. A faithful replica needs a large nav and a long alerts list. A sample point-forecast page needs multi-day and current-conditions blocks.
- stack_clues: jQuery 1.12.4, jQuery UI 1.10.3, jquery-migrate and jquery-cookie, plus `NidsESRI.js` (suggests an ESRI map). Google Tag Manager and the DAP federated analytics tag are present. A government shutdown banner script (`govshutdown.js`) is loaded. Server-rendered HTML.
- limitations: Only the home page's links and titles were inspected, not the full text of interior pages. The forecast.weather.gov title is generic. Live alert and headline text will change. Anything a replica shows must be labeled fictional sample data.

### WX-02
- source_id: WX-02
- category/subcategory: Weather / commercial weather portal
- source_name: Weather Underground (The Weather Company, an IBM/Francisco Partners business)
- official_url: https://www.wunderground.com/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200, title "Local Weather Forecast, News and Conditions | Weather Underground" (about 100 KB). The interior pages below returned 200 with the titles shown.
- source_pages (URL, title):
  1. https://www.wunderground.com/ , "Local Weather Forecast, News and Conditions | Weather Underground"
  2. https://www.wunderground.com/weather/us/va/ashburn/39.04,-77.49 , "Ashburn, VA Weather Conditions | Weather Underground"
  3. https://www.wunderground.com/maps , "Maps Catalog | Weather Underground"
  4. https://www.wunderground.com/radar/us , "Weather Radar | Weather Underground"
  5. https://www.wunderground.com/wundermap , "WunderMap® | Interactive Weather Map and Radar | Weather Underground"
  6. https://www.wunderground.com/history , "Historical Weather | Weather Underground"
  7. https://www.wunderground.com/hurricane , "Hurricane & Tropical Cyclones | Weather Underground"
  8. https://www.wunderground.com/pws/overview , "PWS Network Overview | Weather Underground"
  9. https://www.wunderground.com/cat6 , "Category 6 | Weather Underground". This is the blog/articles section.
  10. https://www.wunderground.com/prepare , "Prepare For The Extreme | Weather Underground"
  11. https://www.wunderground.com/video , "Weather Videos | Weather Underground"
  12. https://www.wunderground.com/about/our-company , "About Us | Weather Underground"
  13. https://www.wunderground.com/accessibility-statement , "Accessibility Statement | Weather Underground"
- key_regions (observed in home HTML):
  - Header: 3 `<nav>` elements. A "Menu" button (aria-label), a location search input with placeholder "Search Locations...", and settings controls labeled "Units", "Density" and "Appearance" (aria-labels).
  - Nav links seen: Maps / Radar Maps, Interactive Radar, Interactive Satellite, WunderMap, Hurricane & Tropical Cyclones, Historical Weather, Category 6, Preparedness, Videos, PWS Network, Weather Station Network, Air Quality Sensors, Log In, Favorites, Member Settings. Exact dropdown grouping was not confirmed.
  - Hero/body: an `<h1>` for the default location (here "Ashburn, VA") with a "Full Forecast" link. There are links to a Severe Weather Map, Convective Outlook and Wildfires, and news teasers pointing to weather.com articles.
  - Footer-type links: Apps (iOS, Android), About Us, Contact, Careers (weathercompany.com), Feedback & Support, Privacy Settings, Data Rights, Data Vendors, Trust Center, Terms of Use, Privacy Policy, Accessibility Statement, Weather Posters, Weather Infographics, a Discord link, and a PWS Buying Guide.
- key_interactions:
  - Observed: location search input; "Units" control (a unit toggle is inferred from the label, not tested); density and appearance (theme) controls; radar and map links; log in and favorites links.
  - Inferred: hourly and daily forecast tabs on the location page, and the interactive map as a JavaScript widget. Not verified.
- complexity: high. There are many sections, and the location page is data-heavy. The home page is large and ad-laden.
- stack_clues: unknown. I did not identify a framework from the home HTML. Searches for `__NEXT_DATA__`, `ng-app` and `_next/static` found nothing. The page is server-delivered HTML with client-side widgets.
- limitations: The radar/map pages are interactive JavaScript and cannot be fully replicated. The `/radar/us` page title list contains many per-region radar titles. Ad and tracking markup is heavy and should be omitted. Content is live data and must be replaced by fictional sample data. Both the Weather Channel and the Weather Underground brands appear in the footer and teasers.

### WX-03
- source_id: WX-03
- category/subcategory: Weather / local TV station weather section
- source_name: WRAL Weather (WRAL-TV, Raleigh NC; Capitol Broadcasting)
- official_url: https://www.wral.com/weather/
- verified_at: 2026-11-12, HTTP GET via curl. The weather hub returned 200, title "WRAL Weather | Raleigh weather this week" (about 36 KB). The interior pages below returned 200 with the titles shown.
- source_pages (URL, title):
  1. https://www.wral.com/weather/ , "WRAL Weather | Raleigh weather this week"
  2. https://www.wral.com/weather/forecast-raleigh-durham-fayetteville/ , "Cold front moving through; freeze watch issued :: WRAL.com". This is the forecast blog post and the title changes over time.
  3. https://www.wral.com/weather/alerts/ , "WRAL Weather Alerts | Active warnings, watches, and advisories"
  4. https://www.wral.com/weather/almanac/ , "WRAL Weather Almanac | Climate normals, records, sun and moon"
  5. https://www.wral.com/weather/closings/ , "School and business closings and delays | WRAL Weather"
  6. https://www.wral.com/weather/hurricanes/ , "WRAL Hurricane Tracker | Active Atlantic tropical systems"
  7. https://www.wral.com/weather/news/ , "Weather News :: WRAL.com"
  8. https://www.wral.com/weather/resources/ , "Weather Resources :: WRAL.com"
  9. https://www.wral.com/weather_map_center/8106570/ , "WRAL Map Center | Interactive radar, satellite, and weather maps"
  10. https://www.wral.com/webcams/ , "WRAL Webcams | Live cameras across Central North Carolina"
  11. https://www.wral.com/video/live-dualdoppler5000-radar/ , "Live DUALDoppler5000"
  12. https://www.wral.com/video/forecast-raleigh-durham-fayetteville/ , "WRAL WeatherCenter Forecast". The URL was seen in the hub's links but not fetched.
  13. https://www.wral.com/weather/hurricane-season-2026-tracking-the-tropics/ , "Quiet in the Atlantic basin again". The title is from the link text on the hub; the page was not fetched.
- key_regions (observed in hub HTML):
  - Header/section nav: the weather hub has a visually-hidden `<h1>` ("WRAL Weather, Raleigh NC forecast, radar, alerts and almanac") and a visible heading "Weather" (an `<h1 slot="title">`). Sub-nav links seen: 7 Day, Hourly and Weekend (anchors on the same page: #7-day, #hourly, #weekend), Weather Alerts, Almanac, Closings, Hurricanes, Map Center, Webcams, Resources, and "View more top stories" (Weather News).
  - Hero/body: forecast summary, hourly/7-day/weekend panels, news teasers for weather and science stories (e.g. an "Ask the Meteorologist" series, flooding, hurricane season, space-weather items), and a live radar video link.
  - Footer: a single `<footer>` element. I did not enumerate its link groups.
  - Ads: Taboola and OneTrust (cookielaw) scripts are loaded and `aria-label="Advertisements"` appears. Omit ads in a replica.
- key_interactions:
  - Observed: in-page tabs/anchors for 7 Day, Hourly and Weekend; section navigation; live radar and forecast video links.
  - Inferred: a location search or zip code lookup and a closings search. These were not verified.
- complexity: medium. The page structure is simple, with many sub-sections that are mostly list and card layouts.
- stack_clues: custom elements are used (`<h1 slot="title">` suggests web components). Assets load from cdn.wral.com. Taboola and OneTrust are present. Server-rendered HTML. The CMS is unknown.
- limitations: The forecast post title and headlines change daily. I did not enumerate the footer groups or the main navigation outside the weather section. Some page titles above came from link text and were not fetched; items 12 and 13 are marked as such. All forecast, alert and closing data in a replica must be fictional sample data.
