# Fidelity notes - ECOM-02 (Lindora Home)

Source: IKEA USA, https://www.ikea.com/us/en/ (stratum: large multi-category retailer, home furnishings). Everything below about the reference comes from the research inventory (`Websites/pipelines/claude/research/ECOM.md`, raw HTML read via curl on 2026-11-10, no JS execution). This run did not browse the live site again. Nothing here claims pixel-level or behavioural equivalence.

## Page mapping

See the table in `README.md`. The 16 researched reference pages are mapped to 15 local pages (delivery is a section of `customer-service.html`); `checkout.html` and `404.html` are not reference pages.

## Replicated (observed in the research notes)

- Skip link first in the document (reference has an "Accessibility" nav with a skip link for the category list; here a single skip link to `#main-content`).
- Header structure: promo strip, brand, search form (`role=search`), "Shopping links" utility nav (log in/sign up, bag), entry-point nav for the product menu.
- Homepage section order: promo, hero with `h1` welcome, category links, best deals, family offers, newest designs, "right now" band, footer.
- Category listing markup concepts: filters, sorting, pagination, subcategory/type links with preset filters (`?type=` echoes the reference's `filters=f-subcategories` links).
- Product page choices: "Choose cover" and "Choose an option" gate the add-to-bag action (required radios/select with errors).
- Footer: join-family block and grouped link lists (customer service, shop, about).
- Customer service split into hub, returns, FAQ, contact.

## Approximated

- **Mega-menu:** the reference's dropdown content was not in the static HTML (entry points carried a loading class). The menu here is a four-column disclosure built from the local categories and types. Structure and labels are inferred.
- **Listing filters:** reference has many filter types; here type, cover/finish colour, price ceiling, rating, sale and new.
- **Delivery page:** merged into the customer-service hub as a table.
- **Search results, bag and login pages:** the research recorded an empty `h1` for search and a title of only "IKEA" for the bag, so these layouts follow the generic retail pattern, not observed content.
- **Imagery and copy:** original text and generic SVG illustrations; fictional product names; all prices and ratings invented.
- **Brand colours:** deliberately different from the reference (teal and sand).

## Simulated

Bag (localStorage), checkout and order confirmation (no payment, no order), sign-in/sign-up (sessionStorage display name), contact form, footer sign-up, return-window checker, promo code. All are labelled as demos in the UI.

## Intentionally added (not observed on the reference)

- `checkout.html` with demo confirmation (the research did not fetch a checkout page; the reference's bag leads to one in practice, unverified).
- Promo code `FAMILY10` and the $500 free-delivery threshold (the reference promo strip carries date-dependent copy; these values are invented).
- Return-window checker on the returns page and the FAQ search filter.
- Add-to-bag confirmation dialog (native `dialog`), active-filter chips, and a result-count live region.
- Room tiles linking to room-keyword searches (reference `/rooms/` content was not enumerated).

## Omitted

Favorites, login modal (research only inferred it; replaced by a page), store/location finder, product recalls, warranties, gift cards, planning tools, brochures, business network, the other ~18 category hubs from the homepage, multi-image zoom, delivery ZIP calculator, cookie banner, language/region switch, account area after sign-in.

## Unverified

Live behaviour of the reference mega-menu, search, bag, login and filter UI; its real accessibility state; current promo copy. Stack clues (`hnf-` fragments, React strings, Tealium) are not replicated; none of those technologies is used.

## Research-relevant observations

- Many cards share one pattern (heading link with a stretched `::after` hit area, decorative image, price and rating text). Sale price is communicated with text ("Now/Was", "Sale" badge), not colour alone.
- Content such as listings, product details and the bag is rendered by JavaScript from inline data, so a no-JS user sees a notice. This follows the data-in-JS rule and is a known trade-off for evaluators.
- The product form intentionally starts with no selection so the error summary, inline errors and focus handling can be exercised.
- Colour swatches are text-labelled radios; the swatch circle is supplementary.

## Accessibility status

Automated only: axe-core (WCAG 2.0-2.2 A/AA + best-practice) reported zero violations on all 17 pages at 1280px and 375px and on the scripted interactive states. Screen readers, 200% zoom, a manual keyboard walkthrough and forced-colors were not tested. No conformance claim is made.
