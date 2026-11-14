# ECOM-01 fidelity notes

Replica: Pebblebloom (fictional), category e-commerce, stratum direct-to-consumer single-brand store (beauty).
Approved source: https://www.glossier.com/ (verified 2026-11-10 by HTTP GET via curl; approved 2026-11-13). The source record was built from raw HTML only, with no JavaScript executed. This replica was built from that research block, not from a fresh crawl.

Labels used below: **replicated** (structure/pattern observed in the research block), **approximated**, **simulated**, **intentionally added**, **omitted/pruned**, **unverified**.

## Page mapping

| Reference page (research block) | Local page | Treatment |
| --- | --- | --- |
| `/` | `index.html` | Replicated as structure only. Hero and carousel content in the reference were **not observed**, so the hero (headline, image, two calls to action), the best-sellers row and the other bands are designed from the generic single-brand-store pattern. Unverified against the reference. |
| `/collections/all` | `shop.html` | Replicated: product grid with filter and sort. Filter and sort option labels in the reference were **not enumerated**; the labels here are my own. |
| `/collections/skincare` | `skincare.html` | Replicated (same listing template, type filter preselectable from the nav via `?type=`). |
| `/collections/makeup` | `makeup.html` | Same. |
| `/collections/fragrance` | `fragrance.html` | Same. |
| `/collections/best-sellers` | `bestsellers.html` | Same. |
| `/products/<a makeup product>` and `/products/<a fragrance>` | `product.html?id=...` | One template, 35 sample products. Replicated: hidden variant select became a visible radio group; quantity field; sticky add-to-bag bar. Approximated: gallery is one abstract image. |
| `/search?q=...` | `search.html` | Replicated: results page with an item count. Searches the inline sample data. |
| `/cart` and the cart drawer | `cart.html` plus a dialog drawer in the header on every page | Replicated as pattern (drawer + full page). |
| `/account/login` | `account.html` | Simulated: labelled demo sign-in, validation only, nothing stored. |
| `/pages/holiday-gift-guide` | `gift-guide.html` | Approximated: three curated product groups (my own curation). |
| `/policies/refund-policy` | `returns.html` | Approximated: a fictional returns policy plus help questions (the reference's help site is a separate external site, so the help questions are an **intentional addition** folded into this page). |
| (externally hosted checkout; not fetched) | `checkout.html`, `confirmation.html` | **Intentionally added** and **simulated**. The research block says a demo checkout would have to be built. See below. |
| (none) | `404.html` | Added per Rules.md. |

Fifteen HTML files in total: 14 mapped or added pages plus `404.html`.

## Navigation and header

- **Replicated:** header with `role="search"` form, primary nav, submenu buttons for Fragrance, Makeup and Skincare, a Shop group and a Gift Guide link, a bag control that opens a drawer. Submenu items follow the research block: fragrance lists the individual scents then "Save with Sets" then "All Fragrance"; makeup lists Face, Lip, Brow, Eye, Cheek, "Save with Sets", "All Makeup"; skincare lists Moisturizers, Cleansers, Treatments, "Save with Sets", "All Skincare".
- **Approximated:** the reference labels submenu buttons "Open submenu". Here the visible text is the section name with a visually hidden " submenu" suffix, so the accessible name still contains the visible label. Submenus open on click or Enter/Space (no hover-only behaviour), and close on Escape, outside click, or focus leaving.
- **Mobile:** a "Menu" disclosure button (`aria-expanded`) reveals the same nav, with submenus stacked. The reference's mobile behaviour was not observed; this is a standard pattern.

### Reference navigation and footer targets pruned (not linked anywhere)

Per the fixed convention, targets without a local page are not linked and no stand-in page exists.
- Shop > Digital Gift Card
- Skincare > Sunscreen (also pruned because a sun-care category invites protection claims)
- Pages/locations (store locator page)
- Policies: privacy policy, terms of service
- Footer: Contact page, Track my package, Student Discount, International, Responsible disclosure, Authorized retailers, About Us, the external help site and the external editorial site, the cookie-settings button
- The country / localization form ("You're shopping in ...")
- The brand blurb is reproduced only as original copy.

The footer offers an email link on an invented reserved-for-examples domain and a 555 phone number as the contact route instead of the pruned contact page.

## Components and interactions

- **Replicated pattern:** collection filter and sort; variant selection; quantity input; sticky add-to-bag bar; cart drawer plus cart page; login page; modals (the drawer is a native `dialog`).
- **Simulated:** cart persistence (the reference was inferred to use cookies; here `sessionStorage`, always inside try/catch with an in-memory fallback); sign-in; checkout; confirmation.
- **Intentionally added** (not observed on the reference): the persistent "demonstration site" strip in the header; demo boxes on cart/checkout/account/returns; ratings on product pages (labelled fictional sample data; ratings widgets were only inferred from third-party strings in the research block); the error-summary pattern; the quantity limit of 10; a "hide products with an unavailable option" filter, which exists to exercise the disabled-variant state.
- **Home page heading:** the reference homepage has no `h1` in its raw HTML. This replica gives the hero an `h1` to meet the accessibility baseline. That is a deliberate deviation.

## Simulated checkout and the payment step

- Every checkout step carries a "simulation" notice. The confirmation page is headed "DEMONSTRATION ONLY - no order was placed", and shows no order number because no order exists.
- **There are no payment fields of any kind** (no payment-instrument, bank or wallet fields of any kind, not even disabled ones), and no payment validation code. Step 4 is a labelled, non-functional placeholder that says a real store would collect payment there and this demo deliberately does not.
- Fields that do exist: email, name, postal address, optional phone, delivery option (demo), and a required acknowledgement checkbox. Data is validated in the browser and discarded; only the item list from the bag is kept in `sessionStorage` for the confirmation page, then deleted.

## Data

- 35 invented products (12 skincare, 17 makeup including one kit, 6 fragrance; 9 flagged best-sellers) with 95 shade and size options in total, with a few intentionally unavailable options. All names, shade names, prices and ratings are invented. Prices are illustrative.
- No ingredient lists, no health, safety or efficacy claims; copy sticks to texture, finish, colour and format.
- Product art is abstract inline SVG generated by `main.js` plus six static SVGs in `assets/`. No people are depicted.

## Unverified / not observed

- Hero and carousel content of the reference.
- Filter and sort option labels of the reference.
- Anything after the first part of the reference footer.
- Real checkout behaviour (not fetched).
- Any behaviour that requires executing the reference's JavaScript.

## Research-relevant observations

- Components that appear on every page (nav disclosures, bag drawer, search, footer) make per-page component counts nearly identical; the interesting variation is on listing, product, cart and checkout pages.
- Variant selection is a radio group with visible text names, a colour chip and a check mark, so selection does not rely on colour alone.
