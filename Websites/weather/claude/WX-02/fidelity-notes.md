# WX-02 fidelity notes

Source: Weather Underground, https://www.wunderground.com/ (researched 2026-11-12 by HTTP GET of home HTML only; approved 2026-11-13). The builder had no live access; everything below comes from the WX-02 research block. Content is original; no real brand names appear.

## Replicated (from the research block)
- Header with a "Menu" button (aria-label), location search with placeholder "Search Locations...", and settings controls labelled Units, Density, Appearance.
- Three `<nav>` elements: primary nav, footer nav, and a utility group (Favorites + settings). Reference has 3 navs; which three is not known (assumption).
- Home: h1 with default location and a "Full Forecast" link; links to Severe Weather Map, Convective Outlook, Wildfires; news teasers; Favorites area.
- Interior pages mapped: forecast (location), maps catalog, radar, interactive map, historical weather, hurricane/tropical, PWS network, blog (Category 6 -> Articles), preparedness, videos, about, accessibility statement.

## Approximated
- Interactive Satellite and WunderMap -> single "Interactive map" with a clouds layer (satellite-style, invented). Radar region pages -> one radar page with a region select.
- Severe/Convective/Wildfire targets become layers on the interactive map.
- Dropdown grouping (Maps & Radar / Storms / Data / Learn) is **inferred**; the reference grouping was not confirmed.
- Hourly/daily forecast tabs: **inferred** from category convention; not verified on the reference.
- Units: F/C toggle was inferred from the aria-label, not tested on the reference; wind and precipitation units are additions beyond the label. Density and Appearance behaviours (compact/comfortable, light/dark/system) are likewise **inferred**.

## Simulated
Location search, favorites (localStorage), station join form (demo success, nothing sent), video player (placeholder dialog), radar loop, storm tracks, history archive, preparedness checklists.

## Intentionally added (not observed on the reference)
Site-wide sample-data banner and labels; table alternative for the map; F/C + wind + precip conversion; breadcrumb on interior pages; error summary patterns; empty states; keyboard tab arrow-key support.

## Omitted
- All advertising, Taboola-style teasers, sponsored links, OneTrust/consent markup and tracking. The replica loads nothing remote.
- Log In and Member Settings (account features, left out). Favorites exists only as a clearly local list.
- Footer/nav targets not built are not linked (navigation convention adopted 2026-11-13): Apps, Contact, Careers, Feedback & Support, Privacy Settings, Data Rights, Data Vendors, Trust Center, Terms of Use, Privacy Policy, posters, infographics, buying guide, Discord, Air Quality Sensors as a page (represented only as a station-network type), Interactive Satellite and Weather Station Network as separate pages.
- Real-brand names, logos, wordmarks, WunderMap and Category 6 naming, and linked IBM/Weather Company/weather.com content.
- Reference page title list of per-region radar pages.

## Unverified
Exact dropdown grouping and order; the number and identity of the reference's three navs; behavior of Units/Density/Appearance controls; presence of hourly/daily tabs; the reference's heading structure beyond the observed h1; any reference accessibility behavior.

## Research-relevant observations
- Exactly one `h1` per page (the reference's single observed h1 is the location). No deviation.
- The reference publishes its own Accessibility Statement; this replica's statement describes only this replica's work and makes no conformance claim.
- The reference is data-heavy; here data tables use `<caption>`, `<th scope>` and focusable, named horizontal scroll regions.
- Building the replica surfaced one layout trap worth noting: visually-hidden (`.sr-only`) text inside a horizontally scrolling table escapes its overflow container unless the container is positioned, causing page-level horizontal scroll at 375 px; fixed with `position: relative` on the scroll region.
