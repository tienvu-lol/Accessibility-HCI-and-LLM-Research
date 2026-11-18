# Fidelity Notes — WX-07

## General
- **Fictional Branding:** "Aurora Meteorological Bureau" replaces "Bureau of Meteorology". All text, logos, and imagery are original.
- **Data:** All weather data, forecasts, alerts, and observations are fictional samples. No live data or APIs are used.
- **Maps:** Radar and weather maps are static SVG placeholders. No external map tiles or interactive maps are included.
- **Accessibility:** WCAG 2.2 AA baseline implemented. Skip links, landmarks, ARIA, keyboard navigation, and focus management are present. No audit performed.

## Page-by-Page Notes

### `index.html` (Home)
- **Replicated:** Hero banner, current conditions card grid, active alerts summary.
- **Approximated:** Navigation structure matches source.
- **Simulated:** Current conditions and alerts are fictional static data.

### `location-australia.html` (Forecasts)
- **Replicated:** Location search, forecast tabs (daily/hourly), location cards.
- **Interactions:** Search filters cards client-side. Tabs switch views. Unit toggle converts °C/°F.
- **Simulated:** Forecast data is fictional.

### `warnings-and-alerts.html` (Warnings)
- **Replicated:** Alert list, severity filtering.
- **Interactions:** Filter by severity (critical, warning, watch).
- **Simulated:** Alerts are fictional samples.

### `rain-radar-and-weather-maps.html` (Radar)
- **Replicated:** Radar layer selection, static map display, weather map cards.
- **Interactions:** Layer buttons toggle static SVG content and labels.
- **Simulated:** Radar imagery is static SVG. No live radar.

### `tropical-cyclone.html` (Cyclones)
- **Replicated:** Active cyclone track, safety info, static map.
- **Simulated:** Cyclone "Sim" is fictional. Track map is static SVG.

### `water-data-and-forecasts.html` (Water Data)
- **Replicated:** River level table, reservoir capacity cards with progress bars.
- **Simulated:** Data is fictional.

### `past-weather-and-climate.html` (Past Weather)
- **Replicated:** Date range search, historical data table.
- **Simulated:** Search is non-functional (static table). Data is fictional.

### `about-the-bureau.html` (About)
- **Replicated:** Mission, values, history, contact info.
- **Simulated:** All text is original fiction.

### `learn-and-explore.html` (Learn)
- **Replicated:** Article cards, resource links.
- **Simulated:** Links are `#` placeholders. Content is original fiction.

### `indigenous-weather-knowledge.html` (Indigenous Knowledge)
- **Replicated:** Overview, traditional seasons cards, resource links.
- **Simulated:** Content is original fiction, respectful of the topic but not sourced from specific Indigenous communities.

### `404.html`
- **Replicated:** Standard 404 page with helpful links.
- **Note:** Not in source map, but required for completeness.

## Component Notes
- **`site-header`, `primary-nav`, `site-footer`:** Consistent across all pages. Mobile nav toggle implemented.
- **`hero-banner`:** Used on all pages except 404.
- **`card-grid`:** Used extensively for locations, alerts, articles.
- **`forecast-tabs`:** ARIA tablist pattern.
- **`alert-list`:** Severity-based styling.
- **`radar-map`:** Static SVG with layer toggle.
- **`search-form`:** Client-side filtering where applicable.

## Deviations
- No external fonts or CDNs.
- No server-side features.
- All data is static/fictional.
- No live maps or APIs.
- No accessibility audit performed.
