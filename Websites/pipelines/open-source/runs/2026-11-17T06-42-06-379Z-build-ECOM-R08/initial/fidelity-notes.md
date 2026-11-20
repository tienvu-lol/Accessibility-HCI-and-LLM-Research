# Fidelity Notes – ECOM-R08

## General Approach
“…….”

## Page‑by‑Page

### index.html (Home)
- **Replicated:** Header, primary navigation, hero section, featured product grid layout.
- **Approximated:** Product data is fictional; used inline sample of 8 products.
- **Simulated:** None.
- **Intentionally added:** Skip link, visually hidden category text for screen readers, focus‑visible outline.
- **Omitted:** Real product images, real promotions, carousel, personalized recommendations.
- **Unverified:** Exact visual styling of Target’s hero; we used a simple textual hero.

### target-circle.html
- **Replicated:** Header, nav, hero, benefits list layout.
- **Approximated:** Benefit text is fictional but mirrors typical Target Circle perks.
- **Simulated:** None.
- **Intentionally added:** Same accessibility enhancements as home.
- **Omitted:** Real enrollment UI, dynamic points display.
- **Unverified:** Exact benefit icons and wording.

### gift-registry.html
- **Replicated:** Header, nav, hero, registry list.
- **Approximated:** Sample registries with fictional owners and items.
- **Simulated:** None.
- **Intentionally added:** Accessible list structure.
- **Omitted:** Real registry creation/search UI, barcode scanning, social sharing.
- **Unverified:** Exact registry UI details.

### weekly-ad.html
- **Replicated:** Header, nav, hero, deals grid.
- **Approximated:** Deal copy is fictional but resembles typical weekly ad format.
- **Simulated:** None.
- **Intentionally added:** Accessible card grid.
- **Omitted:** Real coupon clipping, expiration timers, localized ad variations.
- **Unverified:** Exact ad layout and imagery.

### store-locator.html
- **Replicated:** Header, nav, hero, store list.
- **Approximated:** Fictional store names, addresses, distances, hours.
- **Simulated:** None.
- **Intentionally added:** Simple list with clear headings.
- **Omitted:** Map integration, real‑time location detection, filter by services.
- **Unverified:** Exact store‑locator UI (map + list).

### shop-all-categories.html
- **Replicated:** Header, nav, hero, filter controls, product grid.
- **Approximated:** Filter UI (category, price, sort) mimics typical e‑commerce filters.
- **Simulated:** Filtering and sorting of inline product dataset via JavaScript.
- **Intentionally added:** Visible focus states, error‑ready form elements (though no actual errors), reset button.
- **Omitted:** Real product images, pagination, infinite scroll, stock indicators.
- **Unverified:** Exact filter UI styling and server‑side behavior.

### top-deals.html
- **Replicated:** Same as shop-all-categories.html but deals‑focused.
- **Approximated:** Same filter controls; deals data is fictional.
- **Simulated:** Filtering and sorting of inline deals dataset.
- **Intentionally added:** Same accessibility additions.
- **Omitted:** Real deal images, countdown timers, “limited stock” badges.
- **Unverified:** Exact deal‑page layout.

### 404.html
- **Replicated:** Header, nav, hero with message and link home.
- **Approximated:** Simple error page.
- **Simulated:** None.
- **Intentionally added:** Same accessibility features.
- **Omitted:** Site search, suggested links, branded artwork.
- **Unverified:** Target’s actual 404 page design.

## Component‑by‑Component

### site-header
- **Replicated:** Brand name and navigation wrapper on every page.
- **Approximated:** Navigation links match observed nav_links from source.
- **Simulated:** None.
- **Intentionally added:** Skip link placement before header (still first focusable).
- **Omitted:** Real logo, search bar, mini‑cart widget.
- **Unverified:** Exact styling (colors, spacing).

### primary-nav
- **Replicated:** List of links to all mapped pages plus cart/account placeholders.
- **Approximated:** Links reflect observed nav_links.
- **Simulated:** None.
- **Intentionally added:** Aria‑labels on cart/account to denote demo.
- **Omitted:** Dropdown menus, mega‑menu, search input.
- **Unverified:** Exact hover/focus styling.

### hero
- **Replicated:** Prominent heading and short paragraph on most pages.
- **Approximated:** Textual content is fictional but matches the purpose (value proposition, category title).
- **Simulated:** None.
- **Intentionally added:** Consistent heading level (h2) and margin.
- **Omitted:** Background image, call‑to‑action button.
- **Unverified:** Exact visual treatment.

### card-grid / product-card
- **Replicated:** Grid layout showing product/deal/ad cards.
- **Approximated:** Card contains image placeholder, title, price.
- **Simulated:** Image uses local SVG placeholder; price formatted.
- **Intentionally added:** Visible focus outline on card (via tab‑index? not needed; cards not interactive).
- **Omitted:** Real images, rating stars, add‑to‑cart button.
- **Unverified:** Exact card dimensions and spacing.

### filter-controls
- **Replicated:** Category select, price input, sort select, reset button.
- **Approximated:** Matches typical e‑commerce filter UI.
- **Simulated:** Operates on inline data via JS.
- **Intentionally added:** Labels associated with inputs, visible focus, reset button.
- **Omitted:** Real‑time validation, AJAX‑driven updates.
- **Unverified:** Exact styling and server‑side behavior.

### benefits-list / registry-list / store-list / ad-grid
- **Replicated:** Simple unordered list of items.
- **Approximated:** Content is fictional but reflects the purpose.
- **Simulated:** None.
- **Intentionally added:** Semantic list, clear headings.
- **Omitted:** Interactive controls (e.g., “remove”, “edit”).
- **Unverified:** Exact list styling and interactive features.

### site-footer
- **Replicated:** Copyright text.
- **Approximated:** Simple footer.
- **Simulated:** None.
- **Intentionally added:** Sufficient contrast.
- **Omitted:** Social links, newsletter signup, auxiliary navigation.
- **Unverified:** Exact footer content and links.

## Overall Deviations
- No real images, logos, or copyrighted text used; all replaced with fictional equivalents and placeholders.
- No third‑party assets, fonts, or scripts; everything is self‑hosted and inline.
- No server‑side logic; all interactions are client‑side simulations with inline data.
- Intentionally added accessibility features (skip link, focus outlines, ARIA labels where native semantics insufficient) to meet WCAG 2.2 AA baseline.
- Omitted features that require pages not in the approved map (cart, account, product detail, checkout) – this is in scope per the approved page map.
- All deviations are documented above with reasons.
