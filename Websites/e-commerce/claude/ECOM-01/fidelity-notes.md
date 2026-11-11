# ECOM-01 fidelity notes

Replica: **Softbloom** (fictional), a direct-to-consumer single-brand beauty store.
Approved reference: Glossier, <https://www.glossier.com/> (research inventory block ECOM-01, verified 2026-11-10 by HTTP GET with curl, raw HTML only, no JS executed).

Everything below is based on that inventory block. I did not browse the live site myself in this run, so nothing here is a claim about how Glossier looks or behaves beyond what the inventory recorded. No Glossier logos, copy, imagery, product names or the "Skin First. Makeup Second" tagline are used.

Legend: **replicated** = structure/pattern follows the inventory; **approximated** = same idea, simplified; **simulated** = local stand-in for a backend; **added** = intentional addition not recorded on the reference; **omitted**; **unverified** = inventory did not characterise it.

## Page mapping

| Reference page (inventory) | Replica page | Status |
| --- | --- | --- |
| `/` Home | `index.html` | Approximated. Hero and body order are not in the inventory (hero "not identified"), so the hero, category tiles, best-sellers, gift promo and newsletter band are my own plausible layout. Home has no `<h1>` on the reference; the replica adds one (accessibility baseline). |
| `/collections/all`, `/collections/skincare`, `/collections/makeup`, `/collections/fragrance`, `/collections/best-sellers` | `shop.html?collection=all\|skincare\|makeup\|fragrance\|best-sellers` | Replicated as one data-driven listing page (five reference URLs → one local page + query string). Filters and sort were observed as markup only; the option labels were not enumerated, so the filter groups (type, price, in stock) and sort options are approximated. |
| `/products/boy-brow`, `/products/glossier-you` | `product.html?id=<slug>` (18 products) | Replicated pattern: variant selector, quantity input, add-to-bag, sticky add-to-bag bar. Gallery thumbnails, accordions, rating and "You may also like" are added/approximated. |
| `/search?q=balm` | `search.html?q=` | Replicated (header search form → results page with item count in the heading, as in the observed title). |
| `/cart` | `cart.html` | Replicated as a page, plus the drawer (the inventory observed a cart drawer, `bag__header`, and a `/cart` page). |
| `/account/login` | `account.html` | Approximated and simulated: demo sign-in only. A "forgot password" disclosure is an addition. "Create account" is omitted. |
| `/pages/locations` | `locations.html` | Approximated: invented stores, local search and a Sundays filter (both added). Map is a placeholder SVG. |
| `/pages/holiday-gift-guide` | `gift-guide.html` | Approximated: three product groups built from the inline data. |
| `/policies/refund-policy` | `returns.html` | Approximated with invented sample text in accordions. |
| Footer "Help & FAQ" (lives on `help.glossier.com`, not fetched) | `help.html` | Approximated and **added**: FAQ filter and contact form are inventions; the real help site was not inspected. |
| Shopify-hosted checkout (not fetched) | `checkout.html`, `order-confirmation.html` | **Simulated / added.** Entirely my own design, labelled "demo" on both pages. |
| `/policies/privacy-policy`, `/policies/terms-of-service` | none | Omitted (200 on the reference, not needed for 8-15 page scope). |
| — | `404.html` | Added (required by RULES.md). |

Total: 12 content pages + `404.html` = 13 HTML files.

## Components

| Region / component | Reference evidence | Replica |
| --- | --- | --- |
| Header, `nav`, search form with `role="search"` | Observed in HTML | Replicated. |
| Nav order Shop, Gift Guide, Fragrance, Makeup, Skincare; submenu buttons | Observed | Replicated as click-to-open dropdowns (desktop) and a Menu disclosure with stacked submenus (mobile). Submenu items follow the inventory lists, except: "Digital Gift Card" omitted; fragrance submenu links to my three products instead of the named scents; "Save with Sets" kept as a type filter. Hover behaviour and animation unverified. |
| Localization form ("You're shopping in United States") | Observed | Approximated as a demo select in a utility bar; it only shows a note and stores the choice in sessionStorage. |
| Demo banner | Not on reference | **Added** (research labelling). |
| Cart drawer | Observed (`bag__header`) | Approximated with a native `<dialog>`. |
| Filter / sort markup | Observed (class names only) | Approximated, see above. |
| Product form, hidden variant `select`, quantity input, sticky ATB | Observed | Approximated: visible radio group instead of a hidden select. |
| Cart persistence | Inferred cookies | Replaced by localStorage (bag) and sessionStorage (last demo order). |
| Footer help and about groups, cookie button | Partly observed (first part of the footer only) | Approximated; the "About Glossier" group, student discount, international, authorized retailers, responsible disclosure and the second brand site link are omitted. Cookie settings is a demo dialog. |
| Newsletter band | Inferred only (Klaviyo string) | **Added** (demo). |
| Modals | Observed generically | Only the cart drawer and cookie dialog exist. |
| Third-party widgets (Yotpo reviews, Gorgias chat, Klaviyo) | String clues only | Omitted. Ratings on product pages are static invented numbers labelled "sample reviews". |

## Content and data

- 18 invented products (8 skincare, 7 makeup, 3 fragrance), 6 invented stores, 5 FAQ entries. One product is fully sold out and two others have a sold-out variant, to exercise disabled states and the in-stock filter.
- All prices, ratings, hours, addresses and policies are invented. Illustrations are original SVG shapes.
- Checkout accepts the test card number 4242 4242 4242 4242 (Luhn-valid); nothing is processed.

## Deliberate accessibility choices that may differ from the reference

- Skip link, one `h1` per page, named landmarks, error summary + inline errors with focus management, `aria-expanded` on all disclosures, Escape handling and visible focus. The inventory did not assess the reference's accessibility, so no comparison is claimed.
- Product images inside cards are decorative (`alt=""`) because the product name link sits next to them; the gallery on the detail page has descriptive alt text.

## Research-relevant observations

- Because the reference is server-rendered Shopify with client scripts, the replica uses a single product/collection template driven by URL query strings and inline data. This makes product and collection content JavaScript-rendered, so with JS disabled those lists are empty (a `noscript` notice is shown).
- Sources for hero/filter/sort details were not available; those regions are the most "invented" part of this replica.
