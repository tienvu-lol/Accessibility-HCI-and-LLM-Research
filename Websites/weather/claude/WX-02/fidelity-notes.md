# Fidelity notes — WX-02 Driftwell Weather

Source: https://www.wunderground.com/ — verified 2026-11-10 by curl (HTTP 200 on 17 pages) in `Websites/pipelines/claude/research/WX.md`. Observations about the source come from that inventory only (HTML/links/titles). I did not view the source in a browser during this run, so visual layout is **unverified**.

## Replicated (from inventory)

- Header: location search input, "Get current location" button, utility links (Log in, Mobile apps, Historical weather, Favorites, ad-free link), primary nav with group menus (Maps, Stations) and flat links.
- Location pages with Today / Hourly / 10-Day / History / Radar tab-style links; h1 is the location name; "Hourly liquid precipitation" and "Almanac for November" sections on the conditions page.
- Page set: home, conditions, hourly, 10-day, history, hurricane, maps catalog, radar, prepare, video, station network, editorial (Category 6 analogue), about, accessibility statement.
- Footer link groups (apps, about, contact, careers, network, feedback, legal, accessibility).
- Home page article teasers (the source teasers go to an external site; here they go to local sample articles).

## Approximated

- Dropdown contents: the source's nav group headings were not in raw HTML (grouping was inferred in the inventory). Group names "Weather", "Maps", "Stations" are my labels; link sets follow the inventory loosely.
- Location tab order and labels follow the inventory text.
- Station overview, hurricane tracker, maps catalog, video and prepare pages: layout is a generic card/table pattern, not a copy of the source.

## Simulated

- Location search over 10 invented locations; "use my location" sets the sample default only.
- Log in, station registration, contact form: client validation with a demo success message, no data sent.
- Units: toggle over in-memory values (imperial → metric).
- Radar, satellite, maps: static SVG placeholders; video: placeholder poster and dialog.
- Default location: the source picks one from the network address; the demo uses a fixed fictional default and says so.

## Intentionally added (not observed on the source)

Six-frame radar loop and layer radios, preparedness checklist with saved progress and hazard tips, article category filter, video topic filter, station filter/sort, maps keyword filter, hurricane basin/status filters, history date form with validation, favorites list, forecast Expand all. These exercise filters, errors and empty states for the research dataset.

## Omitted

Real weather data, accounts, ads, maps tiles, the Calendar tab, infographics and posters pages, the Download page, PWS buying guide and air-quality sensor pages, brand links to the parent company, member settings page. Footer destinations without a local page (careers, terms, privacy, data rights, privacy settings, trust center, data vendors) are short placeholder sections on `about.html`.

## Unverified

Exact visual hierarchy, spacing, colors, the real unit-toggle location, whether the source's menus use hover or click, behavior of the source's search suggestions, the source's framework (inventory notes `ng-*` strings only).

## Material deviations and rationale

- Weather values are generated procedurally from inline parameters rather than stored as tables, to keep the dataset small while covering 10-day, hourly and history views. Output is deterministic per location and date.
- Dropdowns open on click (not hover) for keyboard and touch parity.
- The accessibility statement page states the audit status honestly (automated checks only) rather than copying the source's statement.

## Research-relevant observations

- Dense data tables (hourly 9 columns, history 7 columns) are wrapped in focusable scrollable regions for narrow screens.
- Disclosure patterns used: menu button, dropdowns, alert and day accordions, article expanders (all `aria-expanded`), native `<dialog>` for modals.
- The JS-rendered content means pages are mostly empty without JavaScript.
