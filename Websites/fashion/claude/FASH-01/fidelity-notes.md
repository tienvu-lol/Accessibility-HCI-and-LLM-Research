# FASH-01 fidelity notes

Source (research metadata): Harper's BAZAAR US, https://www.harpersbazaar.com/. Replica: fictional magazine **Fable & Hem**. Observations come only from the Phase A notes (`Websites/pipelines/claude/research/FASH.md`, curl of static HTML on 2026-11-10, no JavaScript run). Nothing here claims pixel-level or behavioral fidelity.

## Page mapping

See the table in `README.md`. 15 reference pages map to 15 local pages; `info.html` and `404.html` are additions.

## Component mapping

| Reference observation | Replica | Status |
| :-- | :-- | :-- |
| "Skip to Content" link first, targeting `#main-content` | `.skip-link` first in every page | replicated |
| Top bar: Other Editions list, Newsletter, Sign in, Subscribe | `utility-nav`; editions list is text only; Sign in is a demo dialog; Subscribe goes to the demo newsletter page | approximated / simulated |
| Search form with `role="search"`; `/search/?q=` works | header form GETs `search.html?q=`; page filters inline sample stories | replicated (data is local) |
| Top nav: Fashion, Beauty, Celebrity, Culture, Shopping, Weddings, More | `primary-nav` with the same six sections plus More | replicated |
| "Open … submenu" buttons per section | `sub-toggle` buttons with `aria-expanded` | replicated (button pattern); **submenu items inferred**, since they were not in the static HTML |
| More holds Travel & Food and Politics | More holds Travel & Food (a search that returns the empty state), Sitemap, Company & legal | approximated; Politics omitted |
| Sidepanel dialog repeating sections | native `<dialog>` side panel with accordions | approximated |
| Home blocks: Fashion, Beauty, Celebrity News, Cover Stories, From the Magazine, Shopping, Film & TV, Trends, Runway Report, Podcast, More Stories + Pagination | same order in `index.html` | replicated (order only; content invented) |
| Royals block | none | omitted |
| Article: h1, byline linking to author page, shopping/affiliate links | `article.html` | replicated; affiliate links are labeled demo buttons |
| Author pages | `author.html?id=` | replicated |
| Newsletter sign-up page | `newsletter.html` | replicated as demo form |
| Footer: Footer and Legal navs with the listed links | footer navs; company/legal links point to anchors on `info.html` | replicated; link targets condensed (addition) |
| Pagination nav | JS-generated "Pagination" nav of buttons | approximated (the reference's mechanism was not observed; infinite scroll/"load more" is inferred only) |
| Locale selector | disclosure with plain-text list | simulated |
| Ads, tracking, personalization, Hearst credit | none; footer states the site is fictional | omitted |

## Intentional additions

- Runway lookbook carousel (`fashion-week.html`): the Phase A notes could not confirm any gallery or slideshow on the reference. No autoplay.
- `info.html`, topic filter chips on Trends and category chips and sort on Shopping, the `Footwear` chip and `author.html?id=a5` (empty-state fixtures).

## Unverified

Dropdown/mega-menu contents and behavior, hover behavior, infinite scroll or load-more, visual design, responsive breakpoints and the reference's real accessibility implementation.

## Research-relevant observations

- Content is intentionally repetitive across cards so lists are dense with links; each card has one tabbable headline link, while the image link is `aria-hidden` with `tabindex="-1"`.
- Dynamic pages (`article`, `author`, `search`) are filled by JS from inline data via query strings; without JavaScript they show a default story, author, and an empty search.
- Pagination and filters are buttons, not links, so page state is not in the URL.
- Dialogs use the native `<dialog>` element; dropdowns and accordions use button + `aria-expanded` disclosures.
- Form errors appear inline, in an error summary that receives focus, and per-field `aria-invalid`.
