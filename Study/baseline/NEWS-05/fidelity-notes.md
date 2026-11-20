# Fidelity Notes: NEWS-05

## General Deviations
- **Fictional Branding:** The source "The New Zealand Herald" is replaced with "The Metropolitan Herald". All logos, wordmarks, and specific branding elements are omitted or replaced with text-based placeholders.
- **Content:** All article headlines, summaries, and metadata are fictional. No real news stories, staff names, or statistics are used.
- **Verification:** The source was verified via HTTP GET only. No visual inspection or interaction testing was performed on the source.

## Page-by-Page Notes

### `index.html` (Home)
- **Replicated:** Header, primary navigation, hero section with featured story, "Latest/Most-Read" tabs, article grid, newsletter signup, footer.
- **Simulated:** "Latest/Most-Read" tabs (inferred from common patterns, not explicitly observed in markup evidence). Newsletter signup is a client-side simulation.
- **Omitted:** Individual article links do not lead to full articles (not in approved map).

### `nz.html`, `world.html`, `business.html`, `sport.html`, `entertainment.html`, `politics.html`, `crime.html`, `election-2026.html`, `opinion.html`, `lifestyle.html`
- **Replicated:** Section-specific hero (where applicable), section navigation (active state), article grid, sidebar with trending items, footer.
- **Simulated:** Article content is fictional. Sidebar trending items are static.
- **Omitted:** Individual article pages.

### `video.html`, `podcasts.html`
- **Replicated:** List of media items with play buttons.
- **Simulated:** Media players are static UI elements. Clicking play does not stream content.

### `weather.html`
- **Replicated:** 7-day forecast grid.
- **Simulated:** Weather data is static and fictional. No live API integration.

### `premium.html`
- **Replicated:** Premium content layout.
- **Intentional Addition:** A "Premium Gate" overlay is applied to some content cards to simulate a paywall. Clicking "Subscribe" triggers a simulated alert.

### `404.html`
- **Replicated:** Standard error page with navigation and footer.

## Component Notes
- **Tabs:** Implemented with `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Keyboard navigation (Arrow keys) is supported.
- **Newsletter Form:** Client-side validation with error summary and focus management.
- **Mobile Nav:** Toggle button with `aria-expanded` state. Closes on Escape key.

## Limitations
- No server-side features (search, authentication, comments).
- No real-time data updates.
- No external dependencies (CDNs, fonts, images).
- Accessibility compliance is a baseline implementation; no formal audit has been performed.
