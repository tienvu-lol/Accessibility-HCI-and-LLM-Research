# Fidelity Notes – WX-R08 (Weather)

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns from the approved source (Weather.com) as observed in the provided evidence.
- Did **not** reproduce the real identity: used fictional organization name “WeatherNow”, original prose, and original placeholder artwork (SVG).
- All content is fictional; no real logos, trademarks, copyrighted text, real photographs, staff, testimonials, or statistics are used.
- Where the reference’s flow depends on a real service (login, premium upgrade, etc.), a simulation with a clearly marked demo outcome is provided.
- No external resources (fonts, APIs, third‑party widgets) are used; everything is self‑contained for `file://` operation.

## Page‑by‑Page Notes

### index.html (Homepage)
- **Replicated:** Header with logo placeholder, primary navigation, location search, alert filter section, hero area.
- **Approximated:** Layout mimics a typical weather portal homepage (search prominent, navigation across, alerts below hero).
- **Simulated:** Location search shows a demo alert; alert filters trigger a demo banner.
- **Intentionally added:** Demo premium banner (non‑functional) at top of header to indicate where a premium upsell might appear.
- **Omitted:** Real‑time weather cards, video feeds, personalized recommendations (not in evidence).
- **Unverified:** Exact visual styling (colors, spacing) – approximated to be accessible and legible.

### today.html (Today Forecast)
- **Replicated:** Current conditions display, hourly forecast, 10‑day and monthly tabs, alert filters, location search.
- **Approximated:** Tabbed interface for forecast periods (today/hourly/10‑day/monthly) – inferred from source links.
- **Simulated:** All weather data is static inline arrays; unit toggle changes label only; location search demo; alert filters demo.
- **Intentionally added:** None beyond the standard demo premium banner (inherited from header).
- **Omitted:** Real‑time updates, interactive map within hourly, dynamic severity indicators.
- **Unverified:** Precise visual design of hourly cards and tab styling.

### radar.html (Radar Placeholder)
- **Replicated:** Radar link present; we provide a labeled static SVG map.
- **Approximated:** Static radar image with concentric circles and location marker.
- **Simulated:** “Refresh” button is non‑functional; no real radar data.
- **Intentionally added:** ARIA labels and description for accessibility.
- **Omitted:** Interactive pan/zoom, storm tracking layers, animation.
- **Unverified:** Whether the source uses an interactive map or static image (evidence only inferred).

### news.html (Weather News)
- **Replicated:** List of weather news articles with title, summary, timestamp.
- **Approximated:** Simple card layout for each article.
- **Simulated:** All news items are fabricated; no real feed.
- **Intentionally added:** None.
- **Omitted:** Video playback, related articles, infinite scroll.
- **Unverified:** Exact source layout (grid vs list) – we used a simple vertical list.

### login.html (Login Simulation)
- **Replicated:** Login form with email and password fields.
- **Approximated:** Basic form layout with client‑side validation.
- **Simulated:** Form validates email pattern and non‑empty password; on submit shows a toast “Demo login successful – no real account”. No real authentication.
- **Intentionally added:** Demo premium banner (inherited).
- **Omitted:** “Remember me”, password recovery, social login, multi‑factor authentication.
- **Unverified:** Source’s exact validation rules and error messaging.

### hourly.html (Hourly Forecast)
- **Replicated:** Hourly forecast grid, alert filters, location search, unit toggle.
- **Approximated:** Horizontal scrolling‑like layout (inline‑block cards) for 24 hours.
- **Simulated:** Data is static inline; unit toggle label only; location search demo; alert filters demo.
- **Intentionally added:** None.
- **Omitted:** Real‑time scrolling, drag‑to‑see more hours, precipitation graphs.
- **Unverified:** Exact source presentation (table vs cards).

### tenday.html (10‑Day Forecast)
- **Replicated:** 10‑day forecast cards, alert filters, location search, unit toggle.
- **Approximated:** Similar layout to hourly but daily cards.
- **Simulated:** Static data; unit toggle label only.
- **Intentionally added:** None.
- **Omitted:** Detailed day‑part breakdown, interactive expansion.
- **Unverified:** Exact source design.

### monthly.html (Monthly Forecast)
- **Replicated:** Calendar‑style daily high/low for a month, alert filters, location search, unit toggle.
- **Approximated:** Simple list view (due to space constraints) showing each day.
- **Simulated**: Static generated data; unit toggle label only.
- **Intentionally added:** None.
- **Omitted:** Graphical temperature trend, precipitation accumulation chart.
- **Unverified:** Exact source visualization.

### allergy.html (Pollen & Allergy Forecast)
- **Replicated:** Pollen levels for tree, grass, weed over several days.
- **Approximated:** Colored blocks representing low/moderate/high levels.
- **Simulated:** Data is static inline; no real pollen API.
- **Intentionally added:** None.
- **Omitted:** Detailed allergen types, health advice, medication reminders.
- **Unverified:** Source’s exact visual encoding (icons vs blocks).

### 404.html (Page Not Found)
- **Replicated:** Standard error page with site navigation and search.
- **Approximated:** Simple message and link to homepage.
- **Simulated:** Location search demo only.
- **Intentionally added:** None.
- **Omitted:** Suggested popular pages, search suggestions.
- **Unverified:** Whether the source includes a search box on 404 (we added one for consistency).

## Component‑by‑Component Notes

| Component | Replicated? | Approximated? | Simulated? | Intentionally Added? | Omitted? | Reason for Deviation |
|-----------|-------------|---------------|------------|----------------------|----------|----------------------|
| site-header | Yes (logo placeholder, nav, search) | Layout simplified | Search demo | Demo premium banner | Real logo, user avatar, premium CTA | No real assets; banner added to show where premium upsell might appear |
| primary-nav | Yes (links to major sections) | Order preserved | None | None | None | – |
| site-footer | Yes (copyright, help/about links) | Text only | None | None | None | – |
| location-search | Yes (input + button) | Placeholder text | Demo alert on submit | None | Real geocoding, autocomplete | No network; demo only |
| forecast-tabs | Yes (tablist with panels) | ARIA tablist used | Tab switching via JS | None | None | – |
| unit-toggle | Yes (button) | Label toggles °C/°F | Label change only (no conversion) | None | Actual temperature conversion | Demo only; conversion would require real data |
| radar-placeholder | Yes (SVG with title/desc) | Static circles | Refresh button non‑functional | ARIA labels/desc | Interactive map, animation | No external map library; static SVG suffices for demo |
| alert-filters | Yes (checkbox group) | Labelled options | Demo banner appears when any checked | None | Real alert routing, severity colors | Demo only |
| news-card | Yes (article block) | Simple card | Fabricated articles | None | Video, related articles | No real feed |
| login-form | Yes (email/password) | Client‑side validation | Demo success toast | None | Real auth, password recovery, MFA | No backend |
| pollen-indicator | Yes (colored blocks) | Low/moderate/high colors | Static data | None | Detailed allergen info, health tips | Demo only |
| hero | Yes (section heading/intro) | Varies per page | None | None | None | – |
| demo-premium-banner | No (not in source) | — | — | Yes (added) | — | Intentional addition to show where a premium upsell might appear; clearly labeled non‑functional |

## Material Deviations & Reasons
- **All weather data is static/fictional** – because external APIs are prohibited and no real data was fetched during research.
- **Interactive map replaced with static SVG** – no mapping library allowed; static SVG provides a labeled placeholder.
- **Login simulation only** – no backend; we cannot implement real authentication.
- **Unit toggle changes label only** – no real temperature data to convert.
- **Demo premium banner added** – to illustrate a common UI pattern observed in the source (premium upsell) while keeping it clearly non‑functional.
- **Alert filters trigger demo banner** – no real alerting system; we simulate the UI outcome.
- **Location search shows demo alert** – no geocoding service; we mimic the UI feedback.

All deviations are documented above with reasons; none are intended to deceive but to fulfill the requirements of a static, accessible, and reproducible replica.
