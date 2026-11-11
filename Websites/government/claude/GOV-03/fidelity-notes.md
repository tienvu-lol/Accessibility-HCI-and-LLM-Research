# GOV-03 fidelity notes

Reference: U.S. EPA (<https://www.epa.gov/>), verified 2026-11-10 by HTTP GET only (see `Websites/pipelines/claude/research/GOV.md`). No browser rendering or JavaScript behavior of the reference was observed. "Replicated" below therefore means "matches what the research notes recorded", not "pixel or behavior match".

## Page mapping

See the table in `README.md`. All 14 listed source pages were mapped one-to-one. The excluded `/newsreleases/search` (HTTP 202) was not mapped; the newsroom page approximates a news search.

## By component

| Reference element | Status | Notes |
| --- | --- | --- |
| Skip link | replicated | First focusable element, targets `#main-content`. |
| Government banner (`usa-banner`) | approximated | Replaced by a fictional-site notice with a "How this notice works" disclosure. Official-site wording, flag and seal intentionally omitted. The "How you know" expansion is inferred from the USWDS pattern. |
| Alert link to `/alerts` | replicated | Shown as a site alert banner linking to `alerts.html`; the dismiss button is an intentional addition. |
| Logo and emblem | approximated | Fictional emblem and name. |
| Search drawer button + search form | approximated | Drawer disclosure kept. Form targets the local A-Z topic index instead of a site search endpoint. |
| Primary navigation, 4 menus | approximated | Three menu groups use the item names recorded in the research (Environmental Topics, Laws and Regulations, About EPA), renamed for the fictional agency. The fourth menu was never read; it is a plain "Newsroom" link, which is inferred. Dropdown behavior and column layout are inferred. Several items go to anchor sections on hub pages. |
| Home body: 4 feature cards, news releases list, "Search all news releases", Discover/Connect/Ask/Follow | replicated / approximated | Same order and content types, original copy. Social links omitted (external). |
| Language block | simulated | Ten languages in the reference; six here. Buttons only show a demo message. |
| Footer link groups | approximated | Reduced to links that map to local pages or `about.html` anchors. Many reference links (Contracting, FOIA, Hotlines, Data, etc.) are omitted. Social and external government links omitted. "Back to top" button replicated. |
| Topic hub, water landing, drinking water, radon | approximated | Page hierarchy, breadcrumbs and a local side nav follow the research; body copy is original. |
| A-Z topic index | approximated | The reference page is an alphabetical index; the letter and text filter is an inferred/added pattern. |
| Laws and Regulations | approximated | Section names taken from the menu items recorded in the research. |
| Report a Violation | simulated | Reference form behavior not observed. Fields are invented. Not wired to anything. |
| Regional offices | approximated | Reference listing/selection UI is inferred. Searchable table is an approximation. |
| Newsroom | approximated | Search and filter UI inferred (endpoint returned 202). Items have no detail pages. |
| Alerts | approximated | Sample alerts clearly marked as demo. |
| Contact | simulated | Contact form is simulated. |
| Accessibility statement | approximated | Original text; no conformance claim. |

## Intentionally added

Accordions on `drinking-water.html` and `radon.html`; the alert-banner dismiss button; letter-filter buttons on the A-Z page; reset buttons on filter forms; stacked mobile layout for the offices table.

## Omitted

Services directory, meetings/agendas calendar and department directory (the reference has none among the mapped pages); social links; external links; real seals and logos; news detail pages; Spanish and other translated pages; most footer links.

## Unverified

Dropdown/mega-menu grouping and the fourth primary menu item; the "How you know" expansion; the news search and region selection behavior; landmark counts of the reference; all JavaScript behavior of the reference; color, typography and spacing of the reference (not copied; a neutral green palette was chosen).

## Research-relevant observations

- Heavy reliance on disclosure buttons (banner, search drawer, mobile menu, dropdowns, accordions) shares one JS handler with `aria-expanded`/`aria-controls`; Escape closes the innermost open disclosure containing focus.
- Data-driven pages (A-Z, newsroom, offices) render from inline JS, so their lists are empty without JavaScript; a `noscript` note says so.
- Form errors are inserted before the field and linked via `aria-describedby`; the error summary receives focus on failed submit.
