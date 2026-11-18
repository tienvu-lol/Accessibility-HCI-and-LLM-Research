# Fidelity Notes for ECOM-07 Replica

## General
- **Fictional Branding**: "Summit & Stone" replaces Patagonia.
- **Content**: All text is original or generic placeholder text.
- **Images**: Placeholder SVGs are used.
- **Data**: Product data is inlined in `js/main.js`.

## Page-by-Page Notes

### `index.html` (Home)
- **Replicated**: Header, Nav, Hero, Featured Products grid, Footer.
- **Simulated**: Product grid rendering and Add to Cart.
- **Deviation**: Product data is static/inline, not fetched.

### `home.html` (Secondary Home)
- **Replicated**: Similar to index but with "New Arrivals" focus.
- **Simulated**: Product grid rendering.

### `shop-womens.html`, `shop-mens.html`, `shop-kids-baby.html`, `shop-gear.html` (Category Listings)
- **Replicated**: Header, Nav, Category Title, Product Grid, Footer.
- **Intentional Addition**: Filter bar. The evidence indicated client-side rendering, so I implemented client-side filtering using the inline dataset.
- **Simulated**: Product rendering, filtering, and Add to Cart.
- **Deviation**: The source evidence showed low byte counts, implying JS rendering. I simulated this with vanilla JS.

### `worn-wear.html` (Used Gear)
- **Replicated**: Header, Nav, Hero, Featured Used Gear grid, Footer.
- **Simulated**: Product grid rendering.

### `returns.html` (Help/Returns)
- **Replicated**: Header, Nav, Returns Info, Contact Form, Footer.
- **Simulated**: Form submission.

### `account-register.html` (Registration)
- **Replicated**: Header, Nav, Registration Form, Footer.
- **Simulated**: Form validation and submission.

### `stories-articles.html` (Article Grid)
- **Replicated**: Header, Nav, Stories Header, Article Grid, Footer.
- **Static**: Articles are hardcoded HTML.

### `progress-report.html` (Impact Report)
- **Replicated**: Header, Nav, Report Content, Footer.
- **Static**: Report content is hardcoded HTML.

### `guides-size-fit.html` (Size Charts)
- **Replicated**: Header, Nav, Size Tables, Footer.
- **Static**: Size data is hardcoded in HTML tables.

### `repairs.html` (Product Care)
- **Replicated**: Header, Nav, Care Instructions, Repair Services, Footer.
- **Static**: Content is hardcoded HTML.

### `404.html` (Error Page)
- **Replicated**: Header, Nav, Error Message, Footer.

## Interactions
- **Navigation**: Fully implemented with mobile toggle.
- **Product Filtering**: Intentional addition to simulate the inferred JS behavior.
- **Add to Cart**: Intentional addition to simulate the inferred JS behavior.
- **Forms**: Basic validation and simulation.

## Limitations
- No real backend, database, or payment processing.
- No real images.
- No screen reader testing.
- No cross-browser testing.
