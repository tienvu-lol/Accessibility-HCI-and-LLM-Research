# Fidelity notes - NEWS-02 (The Lakeport Ledger)

Reference: https://www.chicagotribune.com/ (research metadata only). **Basis of all "replicated" claims:** the Phase A inventory in `Websites/pipelines/claude/research/NEWS.md` (HTML observed by curl on 2026-11-10). The reference was not re-fetched and not viewed in a browser during this build, so visual fidelity, spacing, colors and typography were **not** compared. No pixel-perfect claim is made.

Vocabulary: **replicated** = structure/pattern recorded in the inventory and reproduced; **approximated** = simplified; **simulated** = front-end stand-in for a service; **intentionally added** = not in the inventory; **omitted**; **unverified** = inferred or not checked.

## Page mapping

| Local page | Reference | Status |
| --- | --- | --- |
| index.html | home | Replicated: header, trending bar, featured stories + Most Popular list, section story blocks, newsletter block, footer groups. Approximated: block order and counts (inventory lists regions, not their order or sizes); the 10-item Most Popular list is kept, but the story text is invented |
| news.html, local-news.html | `/news/`, `/local-news/`, `/news/politics/` | Replicated as section fronts. Approximated: one list with a topic filter instead of separate fronts per sub-topic |
| latest-headlines.html | `/latest-headlines/` | Replicated as a newest-first list. **Intentionally added / unverified:** Latest vs Most read tabs (the inventory observed only a Most Popular list; tabs are flagged as inferred) and the section filter |
| business.html, sports.html, opinion.html, things-to-do.html, suburbs.html | section fronts | Replicated as section fronts with the topic filter. Added: labeled sample market table (business), scoreboard (sports), events calendar (things to do); the inventory notes "events" and "section story blocks" but not these specific widgets |
| obituaries.html | `/obituaries/` | Approximated: sample notices with a keyword/town filter. The reference's real obituary search or funeral-home integration was not inspected |
| weather.html | `/news/weather/` + AccuWeather link | Simulated: static sample forecast with location and unit controls. The real widget is a third-party service and its layout was not inspected |
| search.html | `/?s=` | Replicated: GET search with `s` query parameter and a results list. Approximated: runs against 34 inline stories; section and sort filters are **intentional additions** |
| article.html | article example | Replicated: breadcrumbs, byline ("By ... | For ..."), published date line, sidebar Most Popular, subscribe button. Approximated: share buttons reduced to copy link, email, print (X/Facebook/Bluesky omitted because they would link off-site); trending-stories widget omitted from the article rail (kept on home); co-author avatars omitted |
| subscribe.html | Subscribe button and Subscriber Services menu | Simulated. Plan form and request form are intentional simplifications; no real pricing or flows were inspected. The e-edition is only an explainer |
| about.html | footer links | Intentionally added placeholder text, so footer links resolve to local pages |
| 404.html | none observed | Required by protocol |

## Component mapping

| Reference component (inventory) | Replica | Status |
| --- | --- | --- |
| Subscribe button `mega-subscribe-button` | `#mega-subscribe-button` link in utility bar | Replicated (id kept as research traceability hook), links to simulated page |
| AccuWeather link with live temperature | `weather-link` | Simulated: static "41°F" labeled "sample data" |
| Subscriber Services dropdown (Manage Subscription, EZ Pay, Vacation Stop, Delivery Issue) | `services-dropdown` | Replicated labels (EZ Pay marked demo); each goes to the simulated form with the type preselected |
| "Today's E-Editions" link | utility link to the e-edition explainer | Simulated |
| Search form `search-bar` (GET `?s=`) | `search-toggle` disclosure + `search-form` (GET `search.html?s=`) | Approximated: the form is revealed from a Search button on all widths; the inventory did not say whether it is always visible |
| Push-nav `pushnav` | `menu-toggle` + `mega-menu` | Approximated: single disclosure panel with every section column |
| Section navigation (News 15 items, Business 4, Sports 2, Opinion 4, Entertainment, Suburbs) | `primary-nav` with per-section dropdowns (desktop) + mega menu (all widths) | Replicated for News/Business/Sports/Opinion/Things to do/Suburbs; omitted: Marijuana, Advice, Chicago Magazine, En Español, BestReviews, Top-level Politics link (reachable under News). Opinion's "Tribune Voices" renamed "Reader voices". **Unverified:** whether the real desktop bar opens dropdowns on hover or click, so click/keyboard disclosure was chosen |
| Trending bar | `trending-bar` (home) | Replicated as five links with static selection |
| `dfm-most-popular-flex-container` (10 headlines) | `most-popular-list` | Replicated with invented ranks; labeled static |
| `newsletter-simple` / `newsletter-item` | `newsletter-signup` | Simulated; the third-party newsletter script is not used |
| Breadcrumbs `breadcrumbs-bar` | `breadcrumbs` | Replicated |
| Share buttons | `share-tools` | Approximated (see above) |
| Footer groups (sister papers, company info, legal) | `site-footer` | Replicated groups; sister papers are invented names rendered as plain text; legal links point to placeholder sections; store/archives/media kit page omitted (media kit points at a placeholder) |

## Intentional additions (not in the inventory)

Demo banner at the top of every page; subscription prompt card and `<dialog>`; Latest/Most read tabs; topic/section filters and result counts; events calendar, market snapshot and scoreboard tables; search section/sort controls; about.html; sample weather location and unit controls. Each exists to exercise filters, empty states, dialogs and form validation, which the research protocol requires, not because they were observed.

## Intentional deviations for accessibility or protocol

- No third-party scripts, tracking, consent banner, paywall, ads or remote fonts; system fonts only (the reference loads Parse.ly, Sophi, googletag, Sailthru).
- Image placeholders are SVG. Card images are decorative (`alt=""`) because the headline link is adjacent; the article figure has descriptive alt text.
- Disclosure buttons use `aria-expanded`; Escape closes and returns focus; the dialog is a native `<dialog>`.
- Forms use `novalidate` with custom messages, an error summary and focus management rather than browser bubbles.

## Research-relevant observations

- Two nav landmarks plus breadcrumbs are labeled "Primary", "All sections" and "Breadcrumb" so the landmark names stay unique.
- The primary bar is intentionally absent below 900px; the mega menu is the only section navigation on mobile (it duplicates the primary links). A reviewer comparing nav structures should account for this.
- Cards: the image link is `aria-hidden` and `tabindex="-1"` so each story is one tab stop.
- Many card/list pages are generated as static HTML (works without JS); search results, the article `?id=` view, weather re-rendering and filters need JS.
- The Most Popular, Trending and weather data is intentionally static and does not reflect real activity.

## Unverified or not inspected

Real desktop dropdown behavior (hover vs click), mobile menu structure on the live site, any paywall or meter on articles, consent banner, whether the live Latest page offers tabs, real obituary workflow, real subscription flows, and live visual design. These were not observed.
