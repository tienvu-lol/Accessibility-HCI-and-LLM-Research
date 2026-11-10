Three sites verified with plain `curl` on 2026-11-10. I discarded Sweetwater, Warby Parker and others, and the reasons are under Rejected candidates. I wrote no deliverable files. Early on I accidentally wrote a throwaway `/tmp/p.html` during the first probe, and I did not delete it. It is outside the repo and I did not read from it afterward.

Some tool outputs ended with an injected `ctx_search(...)` suggestion. I ignored it and shortened my output instead.

### ECOM-01
- **source_id:** ECOM-01
- **category/subcategory:** e-commerce / direct-to-consumer single-brand store (beauty)
- **source_name:** Glossier
- **official_url:** https://www.glossier.com/
- **verified_at:** 2026-11-10; HTTP GET via curl (`-sSL -A "Mozilla/5.0"`). The 17 URLs below returned 200 except `/pages/faq`, which returned 404 and is not used.
- **source_pages (URL, title):**
  1. `/`: "Glossier"
  2. `/collections/all`: "Shop All – Glossier"
  3. `/collections/skincare`: "All Skincare – Glossier"
  4. `/collections/makeup`: "Makeup – Glossier"
  5. `/collections/fragrance`: "Fragrance – Glossier"
  6. `/collections/best-sellers`: "Best-sellers – Glossier"
  7. `/products/boy-brow`: "Boy Brow | Tinted Brow Gel – Glossier"
  8. `/products/glossier-you`: "Glossier You"
  9. `/search?q=balm`: `Search results for "balm" (29 items)`
  10. `/cart`: "Your Shopping Cart – Glossier"
  11. `/account/login`: "Account – Glossier"
  12. `/pages/locations`: "Locations – Glossier"
  13. `/pages/holiday-gift-guide`: "Holiday Gift Guide – Glossier"
  14. `/policies/refund-policy`: "Refund policy – Glossier"
  - `/policies/privacy-policy` and `/policies/terms-of-service` also returned 200 (titles "Privacy policy – Glossier" and "Terms of service – Glossier").
- **key_regions (observed in HTML):**
  - **Header:** `<header id="header" data-cy="header">` with `<nav id="nav">` and `<form action="/search" role="search">`. There is also a country/localization form (`/localization`, "You're shopping in United States").
  - **Nav:**
    - Shop: All, Bestsellers, Digital Gift Card.
    - Gift Guide link (`/pages/holiday-gift-guide`).
    - Fragrance submenu: Glossier You, Doux, Soie, Rêve, Fleur, Save with Sets, All Fragrance.
    - Makeup submenu: Face, Lip, Brow, Eye, Cheek, Save with Sets, All Makeup.
    - Skincare submenu: Moisturizers, Cleansers, Treatments, Sunscreen, Save with Sets, All Skincare.
    - The submenu buttons are labelled "Open submenu".
  - **Hero:** the homepage has no `<h1>`. I did not identify the hero from the raw HTML, so it is not recorded.
  - **Footer:** `<footer id="footer" role="contentinfo">`. It has a brand blurb ("Skin First. Makeup Second™") and a "How can we help?" group. That group links Contact, Track my package, Returns & exchanges, Help & FAQ (on `help.glossier.com`), Student Discount, International, Responsible disclosure and Authorized retailers. An "About Glossier" group follows with About Us and a link to `life.glossier.com`. A cookie-settings button is also present. I read only the first part of the footer.
- **key_interactions:**
  - **Observed in HTML:**
    - A search form that reaches a results page.
    - Collection filter and sort markup (`filter-group-display__list-item`, `sort-option`, 56 `data-product-id` tiles on `/collections/all`).
    - A product form with a hidden `select[name=id]` variant selector, a `pv-qty__input` quantity field, a `pv-form__variant` section and a sticky add-to-bag bar (`pv-sticky-atb`).
    - A cart drawer (`bag__header`) plus a `/cart` page.
    - A login page (`h1#login`).
    - Modals.
  - **Inferred:** cart persistence uses Shopify cart cookies. I did not check storage.
  - **Checkout:** Shopify-hosted, not fetched and not replicable as-is. A demo checkout would need to be built.
- **complexity:** medium. The catalog is simple, but there are nested nav submenus, filters, sort and a drawer.
- **stack_clues:** Shopify (`cdn.shopify`, `window.Shopify`, `Shopify.theme`), plus Klaviyo, Yotpo and Gorgias strings. The pages are server-rendered.
- **limitations:**
  - Hero and carousel content was not characterized.
  - Filter and sort option labels were not enumerated.
  - Everything was read from raw HTML, with no JS execution.

### ECOM-02
- **source_id:** ECOM-02
- **category/subcategory:** e-commerce / large multi-category retailer (home furnishings)
- **source_name:** IKEA USA
- **official_url:** https://www.ikea.com/us/en/
- **verified_at:** 2026-11-10; HTTP GET via curl. All 16 URLs below returned 200.
- **source_pages (path under `https://www.ikea.com`, title):**
  1. `/us/en/`: "Shop Affordable Home Furnishings & Home Goods - IKEA"
  2. `/us/en/cat/furniture-fu001/`: "Shop Quality & Affordable Furniture - IKEA"
  3. `/us/en/cat/sofas-armchairs-700640/`: "Sofas & Armchairs - IKEA"
  4. `/us/en/cat/lighting-li001/`: "Room Lighting - Home Lighting Solutions - IKEA"
  5. `/us/en/cat/beds-mattresses-bm001/`: "Beds & Mattresses - Quality & Affordable - IKEA"
  6. `/us/en/p/kivik-sofa-tibbleby-beige-gray-s39440593/`: "KIVIK Tibbleby beige/gray sofa - IKEA"
  7. `/us/en/search/?q=desk`: "Search - IKEA"
  8. `/us/en/shoppingcart/`: "IKEA"
  9. `/us/en/profile/login/`: "User Account - IKEA"
  10. `/us/en/new/`: "New products and collections - IKEA"
  11. `/us/en/rooms/`: "Rooms for Furniture and Furnishings - IKEA"
  12. `/us/en/customer-service/`: "Customer service - IKEA"
  13. `/us/en/customer-service/returns-claims/`: "Return policies - IKEA"
  14. `/us/en/customer-service/faq/`: "FAQs - IKEA"
  15. `/us/en/customer-service/contact-us/`: "Contact us - IKEA"
  16. `/us/en/customer-service/services/delivery/`: "Explore delivery service options and pricing - IKEA"
- **key_regions:**
  - **Header:** `<header class="hnf-header">`, preceded by `<nav aria-label="Accessibility">` with a "Skip product categories list" link.
    - `nav[aria-label="Open the navigation menu"]` holds the entry points.
    - `form[role=search]` is the search box.
    - `nav[aria-label="Shopping links"]` holds "Hej! Log in or sign up", Favorites and Shopping bag.
    - The mega-menu content was not in the static HTML (entrypoints carry a `--loading` class). I could not enumerate its dropdown items.
  - **Category links on the homepage:** baby-kids, bathroom, beds-mattresses, cookware-tableware, furniture, home-decor, home-electronics, home-improvement, home-textiles, food-restaurant, kitchen-appliances, laundry-cleaning, lighting, outdoor, pet-accessories, plants-planters, smart-home, storage-organization, tables-chairs, window-treatments, workspace-desks-chairs.
  - **Hero / body:** `<h1>` "Welcome to IKEA USA". The promo strip carries date-dependent copy (e.g. "15% off all BESTÅ storage solutions ends Wednesday"). The body sections have `<h2>`/`<h3>` headings: "Today's best deals", "IKEA Family offers", "Fall in love with our newest designs", "Thanksgiving prep starts now", "Discover what's new at IKEA", "Right now at IKEA".
  - **Footer:** `<footer class="hnf-footer">` with a "Footer" heading, "Join IKEA Family" and "Join IKEA Business Network" blocks, and these link groups:
    - Customer service: FAQ, My orders, Contact Us, Product Recalls, Return Policy, Warranties, Feedback, Find a Location.
    - Services: IKEA Services, IKEA Family, IKEA for Business, Planning Tools, Brochures, Buying guides, Payment options, Gift Cards, credit cards, Afterpay, app.
    - This is IKEA: Careers, Newsroom, Life at Home, IKEA Foundation, Safety at Home.
    - Legal: Privacy & Security, Privacy policy, Terms and conditions, Accessibility, Cookie policy, California Notice.
- **key_interactions:**
  - **Observed:**
    - Category listing pages have `filters`/`sorting` markup (`plp-*` classes, `filters=f-subcategories%3A…` links, `?page=2` pagination).
    - The product page contains "Add to bag", "Choose cover", "Choose an option" and "Choose a different size" strings.
    - Search form, bag page, login page, favorites.
  - **Inferred:** a cart in client storage and a login modal. I did not verify either.
- **complexity:** high. It has a large mega-menu, many filter types, variant and configurator choices, and many service pages.
- **stack_clues:** `hnf-` header/footer fragments (631 occurrences), React strings, `utag_data` (Tealium) with `site_platform: "m2"`. The pages are server-rendered with hydrated fragments.
- **limitations:**
  - Dropdown contents are not in the static HTML.
  - The `/shoppingcart/` title is only "IKEA".
  - The search results page returned an empty `<h1>`, so its contents are unverified.
  - The site is large, so a replica will need a scoped subset.

### ECOM-03
- **source_id:** ECOM-03
- **category/subcategory:** e-commerce / specialty retailer (fly fishing, outdoor apparel, dog and hunt)
- **source_name:** Orvis
- **official_url:** https://www.orvis.com/
- **verified_at:** 2026-11-10; HTTP GET via curl. All pages below returned 200. `/search?q=waders` redirected to `/fly-fishing/wading-gear/waders`.
- **source_pages (path under `https://www.orvis.com`, title):**
  1. `/`: "Orvis: Quality Clothing, Fly-Fishing Gear & More Since 1856 | Orvis"
  2. `/men`: "Men's Outdoor Clothing & Apparel | Orvis"
  3. `/women`: "Women's Clothing & Apparel | Orvis"
  4. `/fly-fishing`: "Fly Fishing – The Best Fly Fishing Gear in the World | Orvis"
  5. `/fly-fishing/wading-gear/waders`: "Fly Fishing Waders | Orvis"
  6. `/dog-products`: "Dog Products | Orvis"
  7. `/hunt`: "Hunting Gear, Equipment, Clothing & Accessories | Orvis"
  8. `/product/kids-clearwater-waders/2TZ0.html`: "Kids' Clearwater Fly-Fishing Waders | Orvis"
  9. `/cart`: "Cart | Orvis" (`h1` "Your Shopping Cart")
  10. `/login`: "Login | Orvis"
  11. `/gifts/gift-card`: "Orvis Gift Cards | Orvis"
  12. `/customer-care.html`: "Customer Service | Orvis"
  13. `/returns-exchanges.html`: "Product Returns & Exchanges | Orvis"
  14. `/size-and-fit-guide.html`: "Size & Fit Guides | Orvis"
  - `/about-us.html` ("About The Orvis Company | Orvis"), `/contact-us.html` ("Contact Center Information | Orvis") and `/gifts` ("Gifts | Orvis") also returned 200.
- **key_regions:**
  - **Header:** `<header class="st-global-header">` with `nav.navbar`. Skip links "Skip to main content" and "Skip to footer content". Top-level nav buttons: Gifts, New, Men, Women, Fly Fishing, Dog, Hunt, Home Goods, Packs & Bags, Trips & Schools, Sale. There are 6+ `c-menu-subdrawer__nav` sub-drawers. The dropdown item text was not captured.
  - **Promo bar:** free-shipping banner with a Details link, plus an "orvis.com/exclusions" link.
  - **Hero:** `/the-fall-collection` ("Shop The Fall Collection") and `/gifts` ("Shop Now") calls to action. The homepage has no `<h1>`.
  - **Footer:**
    - Customer Care: Help/FAQ, Contact Us, Order Status, Shipping Info, Size & Fit, Returns & Exchanges, Repairs, Gift Card Balance, Orvis Rewards Visa, International Orders, Corporate Sales, Promotional Exclusions, Give Us Feedback.
    - Company: Terms Of Use, Privacy Policy, State Supplemental Privacy Notice, Who We Are, Fly Fishing Learning Center, News, Careers, Press Room, Dealers.
    - Store Locator: "Find My Nearest Store" and "See if we can fix it".
- **key_interactions:**
  - **Observed:**
    - Listing pages have `refinements` markup (refinement-item-size, -features, -styleType) and product tiles.
    - The product page has `data-attr="color"` and `data-attr="size"` selectors, `swatch` elements and an "Add to Cart" button.
    - `/cart` page, `/login` page.
  - **Inferred:** a client-side sort control (not confirmed) and a separate flow for gift cards.
  - **Not checked:** `localStorage` or `sessionStorage` use. The product page HTML contained neither string.
- **complexity:** medium-high. It has many departments, deep refinements and product variants.
- **stack_clues:** Salesforce Commerce Cloud / Demandware (`/on/demandware.store/Sites-USOrvis-Site/en_US/…`, `dwvar_` URL parameters) and Cloudflare mentions. The pages are server-rendered.
- **limitations:**
  - Sub-drawer link text was not captured.
  - Sort option labels were not enumerated.
  - `/hunt`, `/women` and the other department pages had no `<h1>`.
  - Orvis may be rate-sensitive. I spaced requests 1 second apart and did not see blocking.

### Rejected candidates (observed)
- **Sweetwater:** the homepage and 3 category pages returned 200. Every later request returned 403 "Access to this page has been denied", so the site is rate-blocked. I rejected it.
- **Bombas and Chewy:** HTTP 429.
- **Powell's and Bookshop.org:** 403.
- **Warby Parker, Home Depot, Crate & Barrel, B&H, Backcountry, Bass Pro and CB2:** 403.
- **Barnes & Noble:** 403 with a challenge page.
- **REI:** timeout or connection reset.
- **Allbirds:** HTTP 200, but the nav is not in the static anchors, so interior discovery failed.
- **Target and Walmart:** HTTP 200 but largely client-rendered, with few anchors.

Not checked: any JS-rendered state (storage contents, hero carousels, mega-menu items). Cart persistence is inferred only and none of the three checkouts was fetched. Both IKEA and Orvis have promo copy and product inventory that change over time.
