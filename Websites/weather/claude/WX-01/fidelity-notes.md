# WX-01 fidelity notes

Reference: National Weather Service home page (https://www.weather.gov/), as recorded in the Phase A inventory (curl, 2026-11-10, HTTP 200). This run did **not** re-fetch the reference, so the observations below are inherited from that inventory and are not independently re-verified. No pixel-perfect claim is made.

## Replicated (information architecture, from the inventory)
- Header: location input + button + "remember" checkbox + forecast-search help link; top nav HOME / FORECAST / PAST WEATHER / SAFETY / INFORMATION / EDUCATION / NEWS / SEARCH / ABOUT with dropdowns of 12, 3, 14 and 9 items; secondary nav (Active Alerts, Current, Forecast Maps, Satellite, Radar, Air Quality, Rivers).
- Home body order: national summary with "Read more", alert-type links, radar links (Enhanced/Standard/Low-bandwidth), regional office list. Footer: required links, parent-organization links, social group.
- Interior pages: alerts, current conditions, forecast maps, satellite, safety, education, news, about, contact, glossary.

## Approximated
- Hover dropdowns (the reference loads hoverIntent): mouse-only hover plus click/keyboard disclosure.
- Site search with affiliate radios: modal dialog with a local pages/glossary scope.
- Forecast and radar pages (other hosts on the reference): local `forecast.html` and `radar.html`.
- Forecast-menu and Past Weather items: anchor sections in `topics.html`; Information items: anchor sections in `information.html`; About/legal items: `about.html`.
- Footer social icons: a text note, no icons or links.

## Simulated
Location search, forecast, hourly series (formula from the daily values), alerts, station observations, radar frames and the contact form all run on inline fictional data and are labeled as sample.

## Intentionally added (not observed on the reference home page)
°F/°C toggle, alert filters, station sort/filter, education chips, news filter/show-more, glossary filter, site-search results, tabbed forecast/map views.

## Omitted
Interactive radar and alerts map apps, real data feeds, analytics, regional office pages, sunrise/sunset calculation, document downloads.

## Unverified
Details of external-host pages (local forecast, radar); Daily Briefing and Information Center statuses (the inventory records titles only); live behavior of the reference.

## Research-relevant observations
- Wide dropdown menus (up to 14 items) are the main keyboard/mobile complexity; replicated as buttons with `aria-expanded`, Escape and focus-out closing, and a stacked list on mobile.
- State-changing controls (menus, tabs, accordions, toggles, chips) use native buttons with ARIA state; filter results are announced through `role="status"` regions.
- The baseline is intended to be near-clean per RULES §6; no defects were injected.
