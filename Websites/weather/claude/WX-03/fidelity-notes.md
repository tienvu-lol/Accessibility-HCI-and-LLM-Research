# WX-03 fidelity notes

Reference: local TV station weather section, https://www.wral.com/weather/ (research metadata only). Replica brand: **Meridian 12 Weather**, fictional station "MRD-TV 12", fictional market "Cedar Basin". All places, people, storms and school names are invented.

Source basis: only the `### WX-03` research block (HTTP GET via curl, 2026-11-12). No page was re-fetched during the build, and the reference was not visually inspected. Everything below that says "observed" means "observed by that research".

## The category rule
All weather content is invented sample data and is labeled on every page: a persistent dashed "SAMPLE DATA ONLY" notice at the top of `<main>`, "Sample" badges beside every data heading and every closings/storm/alert row, table captions that say "Invented ... Not real", and timestamps written as "Sample issue time: not a real time". No real calendar dates appear in forecasts. The radar player and webcams are labeled non-functional placeholders (text on the page and text inside the SVGs). The closings page adds a red-bordered "This list is entirely invented ... Do not act on it" box.

## Page mapping

| Observed source page | Replica | Treatment |
|---|---|---|
| 1 weather hub | `index.html` | replicated structure; sample data |
| 2 forecast blog post | `forecast.html` | approximated; title and prose invented (source title changes daily) |
| 3 weather alerts | `alerts.html` | approximated (page body not enumerated by research; contents inferred from the title) |
| 4 almanac | `almanac.html` | approximated from title (normals, records, sun and moon) |
| 5 closings and delays | `closings.html` | approximated from title |
| 6 hurricane tracker | `hurricanes.html` | approximated from title |
| 7 weather news | `news.html` | approximated |
| 8 resources | `resources.html` | approximated |
| 9 map center | `map-center.html` | placeholder |
| 10 webcams | `webcams.html` | placeholder |
| 11 live radar video | `radar-video.html` | placeholder, no video |
| 12 forecast video page | not built | URL seen in hub links, never fetched; not linked |
| 13 hurricane-season post | not built | title from link text only; the hub's news teasers include an invented analogue, `news.html` item n5, linking to `hurricanes.html` |

Pages 3 to 11 were only fetched for HTTP status and `<title>`; their internal layout was never enumerated. Their content here is inferred from the title and category conventions.

## Replicated (observed by research)
- Weather hub section order: heading, forecast summary, hourly/7-day/weekend panels, news teasers, live radar video link.
- Sub-nav labels: 7 Day, Hourly, Weekend (same-page anchors `#7-day`, `#hourly`, `#weekend`), Weather Alerts, Almanac, Closings, Hurricanes, Map Center, Webcams, Resources, "View more top stories" (to the weather news page).
- Teaser themes: weather and science stories, an "Ask the Meteorologist" series, flooding, hurricane season, space weather.
- A single `<footer>` element.

## Anchor tabs (most distinctive interaction)
Implemented as anchor navigation, not ARIA tabs. Links are real `<a href="#7-day">` etc. With JavaScript only one panel is shown; activating a link updates the hash with `pushState`, marks the link `aria-current="true"` (plus a checkmark, so not colour alone), moves focus to the panel and keeps Back and deep links working. Without JavaScript all three panels are visible in order and the anchors scroll. Whether the reference shows one panel at a time or all three was not established by research; this is an approximation.

## Observed source traits deliberately not reproduced
- **Two h1 elements.** The reference hub serves a visually hidden `<h1>` and a visible `<h1 slot="title">` "Weather". The replica uses exactly one `<h1>` per page.
- Web components / shadow DOM (`slot` attribute), the CDN asset host, Taboola and OneTrust (cookielaw) scripts, and `aria-label="Advertisements"` regions: all omitted. The replica is plain HTML, one CSS file, one JS file, local assets. No ads or tracking.
- The reference's wider news site and its main navigation were not enumerated by research. The replica is scoped to the weather section only and does not invent the wider site.

## Navigation convention (adopted 2026-11-13)
Navigation was pruned to pages that exist locally. Nothing links to a stand-in page. The forecast video page (12) and the hurricane-season post (13) are not linked. `forecast.html` and `radar-video.html` are reached from the hub body, the footer and each other, because the research saw them as links in the hub body rather than in the sub-nav.

## Inferred, not verified (labeled as such)
- Location/ZIP search on the hub (a "sample code" such as CB-101 stands in for a ZIP). Intentional addition.
- Closings search/filter. Intentional addition.
- Footer link grouping (Forecasts / Alerts and local / Learn more): inferred; research did not enumerate footer groups.
- Page titles for items 12 and 13 (never fetched).

## Intentional additions (not in the research)
F/C unit toggle; alert filters; almanac month filter; hurricane "quiet basin" demo scenario (empty state); map layer/zoom/legend demo controls; webcam area filter and preview dialog; radar frame stepping and demo loop; news topic filter; "Ask the Meteorologist" demo form; the sample-data banner system. Filters exist to exercise empty states and keyboard flows.

## Simulated
Location lookup, all filters, the unit toggle, the map, zoom, webcam preview, the radar frames and the ask form operate only on inline data or local SVGs. The ask form sends nothing and says so.

## Omitted
Ads, tracking, consent manager, video, live feeds, full article pages for news teasers (8 teasers only; 2 link locally), forecast video page, hurricane-season post, wider site navigation, search of the whole site.

## Research-relevant observations
- The JS-dependent controls (filters, search, forms, dialog buttons) are hidden when JavaScript is off rather than shown as dead controls; the data tables still render fully.
- Tables are real `<table>` with captions and `scope`; each sits in a keyboard-focusable, named scroll region so the 375px page does not scroll horizontally.
- Alert level and closing status are communicated by words, plus border/outline style, never colour alone.
- Temperatures are written in Fahrenheit in the markup and converted client-side; wind stays in mph in both unit modes (a known inconsistency).
- Unit and layout choices were made by the builder; no pixel-level or visual comparison with the reference was done.
