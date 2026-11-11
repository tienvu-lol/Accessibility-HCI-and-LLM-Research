# ECOM-03 fidelity notes

Source: <https://www.orvis.com/> (research metadata; verified 2026-11-10 by the approved inventory, raw HTML only, no JS execution, not re-fetched in this build). The replica, **Larkwater Outfitters**, is fictional and reference-inspired. Everything not listed in the inventory block is marked below as approximated, invented or unverified.

Legend: **R** replicated (observed in the inventory) / **A** approximated / **S** simulated / **I** intentionally added / **O** omitted / **U** unverified.

## Page mapping

| Local page | Source | Status | Notes |
| --- | --- | --- | --- |
| `index.html` | `/` | R/A | Order follows the inventory: promo bar, header, hero with "fall collection" and "gifts" calls to action, department content, footer. Hero copy is original. The source has no `h1`; one was added (A, accessibility). Department tiles, new-arrivals grid, feature band and service strip are A (inferred typical layout, not observed). |
| `men.html`, `women.html`, `dog-products.html`, `hunt.html` | `/men`, `/women`, `/dog-products`, `/hunt` | A | Only titles and the absence of an `h1` were observed. Layout (banner, category tiles, featured grid, feature band) is approximated. |
| `fly-fishing.html` | `/fly-fishing` | A/I | As above, plus a short original "learning center" section (the footer lists a Fly Fishing Learning Center; its content was never fetched). |
| `waders.html` | `/fly-fishing/wading-gear/waders` | R/A/S | Product tiles and refinements observed (size, features, style type). Local filter groups also include category, price and deals (I). Sort control is **U**: inferred, option labels invented. |
| `product.html` | `/product/kids-clearwater-waders/2TZ0.html` | R/A | `color` and `size` attribute selectors, swatches and "Add to Cart" observed. Local version adds quantity, sold-out sizes, a size-guide link, shipping/returns disclosures and related products (I). Single template for 34 products. |
| `cart.html` | `/cart` | R/A/I | Source `h1` "Your Shopping Cart" mirrored in spirit. Promo code field, free-shipping note and quantity editing are I. |
| `login.html` | `/login` | S | Sign-in form observed only as a page. Layout (sign-in beside create-account) is inferred. No authentication. |
| `gift-card.html` | `/gifts/gift-card` | A/S | The source flow was inferred, not observed. Balance form is S (footer lists "Gift Card Balance"). |
| `customer-care.html` | `/customer-care.html` | A | Folds in content from `/contact-us.html` and `/about-us.html` (both returned 200, not mapped as separate pages) and footer items (order status, shipping, stores, policies). FAQ accordion and filter are I. |
| `returns-exchanges.html` | `/returns-exchanges.html` | A | Policy, steps and return form are invented. |
| `size-and-fit-guide.html` | `/size-and-fit-guide.html` | A | Tabs and charts are invented. |
| `search.html` | `/search?q=` (redirected to a category) | I | One local results page serves search, category links, New, Sale, Home Goods and Packs. |
| `checkout.html` | not fetched | I/S | The source checkout was not captured. A demo checkout with a clearly labeled non-transactional confirmation was added. |
| `404.html` | none | I | Required by RULES.md. |

## Component mapping

| Component | Status | Notes |
| --- | --- | --- |
| Skip links "Skip to main content" and "Skip to footer" | R | Both observed in the source header. |
| Global header with `nav` and top-level buttons: Gifts, New, Men, Women, Fly Fishing, Dog, Hunt, Home Goods, Packs & Bags, Sale | R/A | Labels observed. Dropdown link text was **not captured**, so panel links are invented. "Trips & Schools" is **O** (no local content). New, Home Goods, Packs & Bags and Sale are plain links to the local results page (A). Panels open on click, not hover (A). |
| Mobile nav | A | Not observed; a Menu disclosure with nested panels was built. |
| Promo bar with free-shipping "Details" link | R/A | The source link was replaced by a Details button that opens a local dialog. The "exclusions" link is **O**. |
| Hero | R/A | Two CTAs retained in role (collection, gifts). |
| Footer: Customer Care, Company, Store Locator | R/A | Groups retained; the long lists were shortened to pages that exist locally. Several items (Repairs, Rewards card, International Orders, Corporate Sales, Dealers, Careers, Press Room, News, Feedback) are **O**. |
| Listing refinements | R/A | See waders row. |
| Product tile | A | Image, name, price, sale price, rating text, New/Sale badge. Prices and ratings are invented. |
| Cart persistence | I | The source's use of `localStorage` / `sessionStorage` was not checked (**U**). |

## Intentional additions (not observed in the source)

Search results page, demo checkout and confirmation, promo code, FAQ accordion with filter, tabs on the size guide, dialog for shipping details, order-status / contact / return / balance demo forms, learning-center section, related products, sold-out size handling, empty states and error summaries.

## Deviations and rationale

- Brand, copy, prices, product names, stores, phone numbers and policies are all invented (RULES.md section 1).
- Images are generated SVG placeholders. Decorative images use `alt=""`; the product page image has a descriptive placeholder alt.
- Sub-drawer contents, sort labels and several page sections were unavailable in the inventory, so the local versions are best-guess layouts and should not be read as observations of the live site.
- The cart is persisted per browser via `localStorage` for the demo; the source's mechanism is unknown.

## Research-relevant observations

- The source homepage and department pages had no `h1`; the replica gives each page exactly one `h1`.
- The source offers two skip links; both are kept.
- Product-card links use a single link per card (stretched via CSS) and rating text rather than star-only graphics.
- Variant selection uses native radio inputs styled as chips, so selection state is not conveyed by color alone (checked state plus visible label, sold-out labeled in text).
