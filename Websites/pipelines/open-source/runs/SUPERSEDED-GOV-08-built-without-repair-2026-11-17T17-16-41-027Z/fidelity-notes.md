# Fidelity Notes – Commonwealth Services Replica (GOV-08)

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns observed in the approved source (Massachusetts State Government homepage and topic pages).
- Used fictional organization name “Commonwealth Services”, original prose, and original placeholder artwork (SVG placeholders not needed as we used only text and CSS).
- No real logos, trademarks, copyrighted text, real photographs, or real statistics were used.
- Where the source did not show a feature (e.g., alerts, language selector, calendar navigation, report‑a‑problem form), we omitted it and marked it unverified.
- Intentional additions are clearly marked and explained below.

## Page‑by‑Page Notes

### index.html (Home)
- **Replicated**: header with site name, primary navigation, hero section with call‑to‑action, content band with card grid of popular services, footer with three‑column links.
- **Approximated**: hero background colour and text styling; card grid layout mimics the source’s visual grouping of topics.
- **Simulated**: none beyond static content.
- **Intentionally added**: none.
- **Omitted**: any real‑time announcements, weather alerts, or personalized content (not observed in source).
- **Unverified**: visual exactness of spacing, font sizes, and colours; we relied on the HTTP evidence only for structure.

### health-social-services.html
- **Replicated**: header, navigation, page title, content band with card grid representing service areas.
- **Approximated**: card grid styling and number of items (5) based on typical topic landing pages.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: any accordions, expandable sections, or dynamic filters not seen in source.
- **Unverified**: exact wording of service descriptions; we used original placeholder text.

### families-children.html
- **Replicated**: same structural pattern as health‑social‑services.
- **Approximated**: card grid with 4 items.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: same as above.
- **Unverified**: exact copy of program names and details.

### transportation.html
- **Replicated**: header, navigation, title, content band with card grid.
- **Approximated**: 3 service cards.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: same as above.
- **Unverified**: exact service names.

### apply-unemployment-benefits.html
- **Replicated**: header, navigation, title, content band with a form.
- **Approximated**: form layout with fields typical for an unemployment claim.
- **Simulated**: form submission shows a demo success message; no data is sent.
- **Intentionally added**: demo success message (role="alert") to demonstrate accessible feedback.
- **Omitted**: real backend integration, validation beyond required fields, and multi‑step workflow.
- **Unverified**: exact field labels and help text from the source.

### renew-vehicle-registration.html
- **Replicated**: header, navigation, title, content band with a form.
- **Approximated**: form layout for vehicle registration renewal.
- **Simulated**: demo success message on submit.
- **Intentionally added**: demo success message (role="alert").
- **Omitted**: real payment processing, document upload, and backend validation.
- **Unverified**: exact field labels and instructions.

### search-court-dockets.html
- **Replicated**: header, navigation, title, content band with a search form and a table for results.
- **Approximated**: simple search form and table layout.
- **Simulated**: table populated with sample rows via JavaScript (intentional addition) to demonstrate how results would appear.
- **Intentionally added**: sample data injection and demo search button (no real query).
- **Omitted**: real docket database, pagination, advanced filters, and sorting.
- **Unverified**: exact appearance of the source’s search results table.

### state-organizations-a-to-z.html
- **Replicated**: header, navigation, title, content band with a filter input and a list of organization links.
- **Approximated**: filter‑able list UI pattern.
- **Simulated**: none.
- **Intentionally added**: client‑side text filter (org‑filter) to demonstrate usable directory search; no evidence of such a filter in the source.
- **Omitted**: real A‑Z indexing with jump links, logos, and detailed organization profiles.
- **Unverified**: exact list of organizations and descriptions.

### 404.html
- **Replicated**: header, navigation, simple error message, and link to home.
- **Approximated**: generic 404 layout.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: any suggested search or popular links sometimes present on real 404 pages.
- **Unverified**: exact wording and styling.

## Component‑Level Notes

### site-header
- **Replicated**: contains site name, navigation toggle, and primary nav wrapper on every page.
- **Approximated**: styling and spacing.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: any language selector or user‑profile controls not observed.
- **Unverified**: exact visual treatment.

### primary-nav
- **Replicated**: horizontal list of top‑level sections on all pages.
- **Approximated**: active page indication via `aria-current="page"`.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: dropdown mega‑menus or sub‑menus not seen in source.
- **Unverified**: exact hover/focus colours.

### nav-toggle (button)
- **Replicated**: button that toggles the primary nav on narrow widths.
- **Approximated**: ARIA attributes (`aria-controls`, `aria-expanded`).
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: animated icon morphing.
- **Unverified**: exact icon used.

### hero
- **Replicated**: prominent banner with heading, paragraph, and button on home page only.
- **Approximated**: background colour and text centering.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: carousel or rotating featured content.
- **Unverified**: exact image or illustration (we used none).

### content-band
- **Replicated**: main `<section>` holding page‑specific markup on every page.
- **Approximated**: padding and margin.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: none.
- **Unverified**: none.

### card-grid
- **Replicated**: responsive grid of cards used on topic landing pages and home page.
- **Approximated**: equal‑height cards, hover/focus styles.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: images inside cards.
- **Unverified**: exact card dimensions.

### footer-groups
- **Replicated**: three‑column footer with site‑wide links on every page.
- **Approximated**: layout and styling.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: social‑media icons with brand colours (we used generic text links).
- **Unverified**: exact link lists.

### demo-form
- **Replicated**: functional forms on unemployment and vehicle‑registration pages.
- **Approximated**: field grouping, labels, and submit button.
- **Simulated**: success message on submit (role="alert").
- **Intentionally added**: demo success message to show accessible feedback without real submission.
- **Omitted**: real validation, backend submission, and file upload.
- **Unverified**: exact validation rules.

### org-filter (input)
- **Replicated**: none in source; added as intentional demonstration.
- **Approximated**: text input with placeholder.
- **Simulated**: client‑side filtering of organization list.
- **Intentionally added**: yes – to provide a usable directory search demo.
- **Omitted**: none.
- **Unverified**: none (we implemented it).

### org-list (ul)
- **Replicated**: list of organization links on the organizations page.
- **Approximated**: plain list with links.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: logos, descriptions, and A‑Z jump links.
- **Unverified**: exact organization names and URLs.

### docket-results (table)
- **Replicated**: table header for docket info.
- **Approximated**: simple table layout.
- **Simulated**: body filled with sample rows via JavaScript.
- **Intentionally added**: sample data injection to illustrate results.
- **Omitted**: real data source, pagination, sorting.
- **Unverified**: exact styling of table rows.

### skip-link
- **Replicated**: first focusable element, hidden until focus.
- **Approximated**: styling when focused.
- **Simulated**: none.
- **Intentionally added**: none.
- **Omitted**: none.
- **Unverified**: none.

### alert (role="alert")
- **Replicated**: used for demo form success/error messages.
- **Approximated**: colour contrast and spacing.
- **Simulated**: none.
- **Intentionally added**: yes – to demonstrate accessible feedback.
- **Omitted**: none.
- **Unverified**: none.

## Summary of Deviations
- **Omitted features** (not observed in source): alerts banner, language selector, calendar navigation, report‑a‑problem form, any real‑time data, authentication, payment processing, file upload.
- **Intentional additions**: organization list filter, demo form success messages, sample data in court docket table.
- **Approximations**: visual styling, spacing, exact wording, and image usage (we used only text and CSS).
- **Unverified aspects**: exact pixel‑perfect layout, font rendering, colour values, and any interactive widgets not present in the source evidence.

All deviations are documented above with reasons.  
