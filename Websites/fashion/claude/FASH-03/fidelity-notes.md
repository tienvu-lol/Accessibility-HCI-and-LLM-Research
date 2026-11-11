# Fidelity notes - FASH-03 (Stitch & Strut Daily)

Source: https://fashionbombdaily.com/ (Fashion Bomb Daily), as recorded in the Phase A inventory (`Websites/pipelines/claude/research/FASH.md`, verified 2026-11-10 by curl). Nothing here comes from a browser rendering of the source; "observed" below means observed in that inventory's HTML-level notes. No pixel-level fidelity is claimed.

## Page mapping

| Local | Source | Status |
| --- | --- | --- |
| `index.html` | home | replicated order (latest, video block, Black Designers, popular posts, Stay Connected); approximated layout and content |
| 8 category pages | `/category/...` archives | replicated as separate archive pages; approximated (JS-drawn list, 6 per page) |
| `article.html` | post template | replicated structure (h1, author block, share buttons, related 3); approximated slideshow and widgets |
| `author.html` | `/author/the-fashion-bomb-staff/` | replicated as a staff archive; one fictional author |
| `search.html` | `/?s=dress` | replicated as GET `?s=` search over inline data |
| `about.html`, `contact.html` | `/about/`, `/contact/` | replicated at a basic level; legal and press pages condensed into `about.html` |
| `404.html` | none | added (required) |

## Component mapping

| Component | Treatment |
| --- | --- |
| Skip link | replicated (source skip link targets `#primary`; here `#main-content` per the rules) |
| Header: logo, Shop and Shop Instagram Feed links, `role="search"` form | replicated structure; shop links are labeled demos opening a dialog, search form is real |
| Category menu with sub-menus | approximated: nine primary categories grouped into three dropdowns (source has 12 `.sub-menu` elements and many more entries, e.g. celebrity names, events, lifestyle); click-to-open behavior is **inferred** |
| Mobile navigation | simulated with a Menu disclosure button; the source's mobile behavior is unverified |
| Home "The latest" two-column list | replicated |
| Video block, Black Designers, Popular posts | replicated as sections; the video block is demo-only with no media |
| Stay Connected | moved into the footer as demo buttons |
| Article share buttons with tooltips | approximated: visible text buttons, Copy link works, others demo; tooltips omitted |
| Article slideshow (theiaPostSlider classes) | **inferred**, approximated as a 4-slide carousel with buttons and arrow keys |
| "Black Designers Resource" widget, shop promo | approximated as two aside widgets; shop promo is a demo |
| Related articles (3) | replicated |
| Footer: Contact Us, About, Advertising, Press & Features, Privacy Policy, Terms Of Use | replicated links; last four point to anchors on `about.html` |

## Intentional additions (not on the source)

Sort select, section filter (author/search), Load more pager, status messages, empty and not-found states, error summary on the contact form, the demo dialog. The sort and filter note is shown on the list pages themselves.

## Omitted

Ads (Google Publisher Tag slots), newsletter (none found on the source), celebrity-name/event/lifestyle menu entries, Fashion Bomb TV video content, real imagery, the optional Press and Bomb Fashion Show LA pages, comment sections (not recorded in the inventory).

## Unverified

Dropdown behavior, slideshow behavior, share-tooltip behavior, and mobile menu behavior of the source. Section order within the article page below the header was taken from class names, not from a rendered page.

## Rationale for material deviations

- Story lists are JS-drawn from inline data so one HTML shell per section can serve the sample dataset without repeating 20 cards in 9 files. The cost is that those pages need JavaScript; the home page is static HTML.
- All people, labels, events and shows are invented; "Black Designers" is kept as a generic topic label because it describes the category, not a brand.

## Research-relevant observations

- The source is a large WordPress category menu over a single-column blog; the replica's difficulty is mostly the menu, repeated cards and filterable lists.
- The pages share one header/footer duplicated by hand across 15 files, which is the main place a repair study could see inconsistency.
