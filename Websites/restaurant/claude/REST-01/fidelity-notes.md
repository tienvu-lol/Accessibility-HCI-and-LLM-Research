# REST-01 fidelity notes

Source: https://www.viacarota.com/ (researched, HTTP-verified, approved 2026-11-14). Evidence: HTTP GET of raw HTML only; the rendered Squarespace DOM and visual layout were not observed.

## Replicated
- Home sequence: h1 menu title, link to plain-text menu, image menu, then INDIRIZZO (address), ORARI (hours, two lines, "Walk-ins always welcome."), a second h1 "IT TAKES A VILLAGE" (the reference serves three h1s on home; kept to mirror observed structure, a known heading-structure oddity), and a newsletter titled "Stay in touch" in the footer.
- Primary nav labels: Gatherings, Shop, Craft Cocktails, Rita & Jody (renamed Marta & Joel), Cart.
- Header search form (GET) and footer newsletter form.
- Image menu plus separate plain-text menu with the observed heading list and h3 subsections.
- Page set: press, gatherings, shop, craft cocktails, owners, community, cart, gallery.

## Approximated
- Layout, typography (system fonts instead of Typekit), colour palette, gallery behavior (reference gallery is hashed URLs; here a thumbnail grid with dialog).
- Shop and cart (Squarespace commerce) as a local demo.
- Footer: Accessibility link kept; sister-restaurant links and James Beard link omitted (see below).

## Simulated
Newsletter, events inquiry, reservation request, cart, checkout. All labeled demo.

## Intentionally added (not on the reference)
- `reserve.html` (reference reservations are an off-site widget).
- Search box and dietary filters on the plain-text menu.
- Open/closed indicator.
- Footer links to Press, Community, Gallery and Search; a "Plain-text menu" link in the header utility bar of every page (the reference exposes it from the home page only).
- Demo banner on every page; breadcrumbs on interior pages; error summaries.

## Omitted
Order-online link (off-site), Resy link, sister restaurants, James Beard link, Privacy page, Careers, covid-safety page, announcement-bar text, 58-image counts (about 22 local SVGs instead), real photography and brand marks.

## Source defects (observed, not reproduced)
1. Nav/footer link labelled "Careers" points to `/covid-19-safety-measures`. Not reproduced; neither page is built.
2. `/search` returned no HTTP status (request error) although the header search form exists. Here search is a working local page.
3. Two hashed gallery URLs returned byte-identical 134,671-byte responses; gallery treated as a single template. Here 8 distinct placeholders.

## Research-relevant observations
- The reference's menu is an image; the text alternative is a separate page reached by a heading-level link on the home page. This replica puts that link before the image, adds descriptive alt text and a caption link, and pairs the text menu with real headings. Whether the alt text should instead transcribe the whole menu was a design decision: it is a summary here, with the page link as the full equivalent.
- Multiple h1s on home mirrored from the reference; every other page has one h1.

## Unverified
Rendered nav (6 `<nav>` elements as served; this replica has primary, utility form, footer and breadcrumb navs), exact copy of the image menu, behavior of the Resy widget.
