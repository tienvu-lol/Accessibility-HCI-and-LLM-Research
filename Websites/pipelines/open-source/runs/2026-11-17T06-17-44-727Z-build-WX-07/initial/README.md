# Aurora Meteorological Bureau Replica

**Replica ID:** WX-07
**Category:** Weather information
**Fictional Branding:** Aurora Meteorological Bureau
**Approved Source:** https://www.bom.gov.au
**Verification Method:** HTTP GET by the orchestrator
**Verification Date:** 2026-11-16
**Source Verified At:** 2026-11-16
**Source Approved At:** 2026-11-17

## How to Open Locally
1. Download the `weather/open-source/WX-07` directory.
2. Open `index.html` in any modern web browser.
3. No server is required; all assets are local.

## Sitemap
1. `index.html` - Home
2. `location-australia.html` - Forecasts and observations
3. `warnings-and-alerts.html` - Warnings and alerts
4. `rain-radar-and-weather-maps.html` - Rain radar and weather maps
5. `tropical-cyclone.html` - Tropical cyclone
6. `water-data-and-forecasts.html` - Water data and forecasts
7. `past-weather-and-climate.html` - Past weather and climate
8. `about-the-bureau.html` - About the bureau
9. `learn-and-explore.html` - Learn and explore
10. `indigenous-weather-knowledge.html` - Indigenous weather knowledge
11. `404.html` - Page not found

## Page-to-Source Mapping
- `index.html` -> `https://www.bom.gov.au`
- `location-australia.html` -> `https://www.bom.gov.au/location/australia`
- `warnings-and-alerts.html` -> `https://www.bom.gov.au/weather-and-climate/warnings-and-alerts`
- `rain-radar-and-weather-maps.html` -> `https://www.bom.gov.au/weather-and-climate/rain-radar-and-weather-maps`
- `tropical-cyclone.html` -> `https://www.bom.gov.au/weather-and-climate/specialised-forecasts-and-observations/tropical-cyclone`
- `water-data-and-forecasts.html` -> `https://www.bom.gov.au/weather-and-climate/water-data-and-forecasts`
- `past-weather-and-climate.html` -> `https://www.bom.gov.au/weather-and-climate/past-weather-and-climate`
- `about-the-bureau.html` -> `https://www.bom.gov.au/about-the-bureau`
- `learn-and-explore.html` -> `https://www.bom.gov.au/resources/learn-and-explore`
- `indigenous-weather-knowledge.html` -> `https://www.bom.gov.au/resources/indigenous-weather-knowledge`
- `404.html` -> Not in source map (standard 404 page)

## Sample Datasets
- `forecasts`: 12 rows (6 locations × daily/hourly)
- `alerts`: 4 rows (severe, advisory, watch, warning)
- `radar-layers`: 5 rows (rain, wind, satellite, lightning, model)
- `water-stations`: 8 rows (river levels, reservoir capacity)
- `cyclone-track`: 6 rows (historical fictional track)
All data is fictional and inlined in `js/main.js` or HTML.

## Interactions & Simulation Notes
- **Radar Map Selection:** JS toggles static SVG map placeholders. No live data.
- **Location Search:** JS filters location cards by name/region. No API.
- **Forecast Tabs:** JS switches daily/hourly views. No API.
- **Unit Toggle (°F/°C):** JS converts temperatures. No API.
- **Alert Filters:** JS filters alerts by severity/type. No API.
- **All weather data is fictional.** No external maps or APIs.

## QC Gates (Rules.md Section 9)
1. **Structure:** Pass
2. **Accessibility:** Pass
3. **Performance:** Not Tested
4. **Security:** Not Tested
5. **SEO:** Not Tested
6. **Compatibility:** Not Tested
7. **Content:** Pass

## Limitations
- No screen reader, zoom, manual keyboard walkthrough, or non-Chromium browser testing performed.
- All weather data is simulated.
- Radar maps are static SVG placeholders.
