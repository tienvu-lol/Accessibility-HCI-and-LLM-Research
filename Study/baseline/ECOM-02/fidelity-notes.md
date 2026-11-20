# Fidelity notes - ECOM-02 (Larkwood Home, fictional)

Source: https://www.ikea.com/us/en/, verified 2026-11-10 (HTTP GET via curl, 16 pages, all 200), approved 2026-11-13. Only the structure recorded in the research block was used; no copy, trademark, logo, imagery or product naming was reproduced.

## Replicated (structure recorded in the research block)

- Header pattern: skip navigation first, header with entry-point navigation, search form (`role="search"`), and a shopping-links group with sign-in, and bag.
- Home section order: promo strip, hero with h1 "Welcome to ...", then headed bands: best deals, club offers, newest designs, discover what is new, "right now" feature, footer.
- Category listing pages with filters, sorting and paging (research block recorded `filters`/`sorting` markup and `?page=2` pagination).
- Product page with "choose" style variant selection and an add-to-bag action (strings "Add to bag", "Choose an option" observed).
- Search page, bag page, login page, new, rooms and customer-service pages (faq, returns, contact, delivery).
- Footer link groups: customer service, plus shop and account groups.

## Approximated

- Listing pagination: "Show more" button instead of numbered `?page=` links.
- Login: a page, not a modal (modal behaviour was only inferred in the research block, never verified).
- Search results page: the reference's h1 was empty and its content unverified; mine has an h1 "Search results" and a card grid.
- Bag page: the reference title was only the brand name; mine uses a descriptive title.
- Contact and delivery: sections of the customer-service hub rather than separate pages.
- Hero, promo strip: copy is original and not date-dependent.

## Simulated

- Bag in `sessionStorage` (guarded), checkout, confirmation, sign-in. All are labelled demos; the payment step is a non-functional placeholder with no inputs.

## Intentionally added (not observed in the sampled reference pages)

- `checkout.html` and `confirmation.html` (category-typical flow; the checkout step was not among the 16 observed URLs).
- `stores.html` store locator over invented data (the reference footer has a "find a location" target, but the page was not sampled).
- Size select and quantity stepper details, mobile filter disclosure, result-count and cart live announcements.

## Omitted / pruned navigation (per fixed convention: nothing routes to a stand-in page)

- **Mega-menu dropdown contents: not observed.** The research block recorded that the reference's dropdown items were not in the static HTML. The department and item lists here are the author's own structure, built from the observed top-level categories and limited to items that have a local page.
- Homepage category links not rebuilt (18 of 21): baby-kids, bathroom, cookware-tableware, home-decor, home-electronics, home-improvement, home-textiles, food-restaurant, kitchen-appliances, laundry-cleaning, outdoor, pet-accessories, plants-planters, smart-home, storage-organization, tables-chairs, window-treatments, workspace-desks-chairs (desks are reachable only through a search link). Rebuilt: furniture, lighting, beds-mattresses (as beds and bedroom, without mattresses), plus sofas as a sub-department.
- Header: Favorites, the "Skip product categories list" link (replaced by one skip link to main content), account modal.
- Footer: product recalls, my orders, warranties, feedback, the services group (services, family programme, business programme, planning tools, brochures, buying guides, payment options, gift cards, credit cards, pay-later offers, app), the "this is us" group (careers, newsroom, life at home, foundation, safety), the legal group (privacy, terms, accessibility, cookie, regional notices) and the business-network join block.
- Home sections kept without links where the target was not rebuilt: none (the "Thanksgiving prep" band was dropped).
- Real-product copy, ratings, reviews and availability: not reproduced; no reviews exist in the replica.

## Unverified

- Real header and mega-menu interaction behaviour, exact filter types, configurator behaviour and cart storage were not observed in the reference.
- Visual layout was not compared pixel by pixel; no claim of visual fidelity is made.

## Research-relevant observations

- A large retailer's real navigation is far wider than any scoped replica; pruning keeps links coherent but makes the replica's information scent narrower than the reference.
- Variant swatches carry visible text names and a selected check mark to avoid colour-only state.
- All dynamic product grids are rendered by `js/main.js` from inline data, so product cards are absent from the static HTML of listing pages.
