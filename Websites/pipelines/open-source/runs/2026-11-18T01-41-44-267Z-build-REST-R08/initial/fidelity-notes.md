# Fidelity Notes for REST-R08 Replica

## Overview
This replica is based on the approved source Xi'an Famous Foods (source_id: REST-R08). No visual inspection was performed; all design decisions are inferred from the description and typical restaurant site patterns. Where evidence is lacking, we note approximations or intentional additions.

## Page‑by‑Page Notes

### index.html (home)
- **Replicated**: header, navigation, hero section with call‑to‑action, reservation form, footer with newsletter signup.
- **Approximated**: visual styling (colors, spacing) is an original accessible interpretation; no claim of pixel‑perfect match.
- **Simulated**: reservation form shows a toast confirmation; no actual booking.
- **Age gate**: modal appears on first visit; simulates age restriction using sessionStorage.
- **Intentional additions**: skip link, newsletter signup in footer, breadcrumb omitted (not needed on home), toast live region.
- **Unverified**: exact hero image, specific copy, and any promotional banners; replaced with original text and placeholder illustration.

### menu.html
- **Replicated**: menu listing, filter controls, reservation call‑to‑action.
- **Approximated**: layout of menu cards and filter area; original source may have used different grouping.
- **Simulated**: filtering works on inline JSON data (12 items); no server call.
- **Reservation form**: same simulation as on home.
- **Intentional additions**: breadcrumb omitted (not present in source), filter component, live item count.
- **Unverified**: exact dish names, prices, and categories; replaced with plausible original placeholders.

### our-story.html
- **Replicated**: story section with heading, paragraph, illustrative placeholder.
- **Approximated**: use of a simple SVG placeholder instead of any specific photograph.
- **Intentional additions**: breadcrumb navigation, newsletter signup.
- **Unverified**: exact historical details, any embedded video or timeline; replaced with original prose.

### locations.html
- **Replicated**: list of location cards with address, phone, hours.
- **Approximated**: hours badge shows simulated open/closed state based on time of day (11:00‑22:00).
- **Intentional additions**: breadcrumb, newsletter signup.
- **Unverified**: actual coordinates, real‑time hour data, any map embed; replaced with static placeholders.

### contact.html
- **Replicated**: contact form with name, email, phone, subject, message.
- **Approximated**: form layout and validation; original may have used different field grouping.
- **Simulated**: form shows a toast confirmation on submit; no email sent.
- **Intentional additions**: breadcrumb, newsletter signup.
- **Unverified**: exact subject options, any auto‑response or CAPTCHA; replaced with original selections.

### order-acknowledgment.html
- **Replicated**: order summary with order number, pickup location, time, items, totals.
- **Approximated**: visual presentation of summary; original may have included a barcode or QR code.
- **Simulated**: all data is static placeholder; no real order processing.
- **Intentional additions**: breadcrumb, newsletter signup.
- **Unverified**: actual order details, payment integration, any promotional messages; replaced with original placeholders.

### press.html
- **Replicated**: grid of press cards with outlet name, date, excerpt.
- **Approximated**: layout of cards; original may have used different excerpt lengths or images.
- **Intentional additions**: breadcrumb, newsletter signup.
- **Unverified**: real articles, logos, or images; replaced with original placeholder text.

### accessibility.html
- **Replicated**: accessibility statement heading, measures, feedback contacts, technical details, limitations.
- **Approximated**: wording is original but conforms to typical accessibility statement structure.
- **Intentional additions**: breadcrumb, newsletter signup.
- **Unverified**: any specific third‑party compliance claims or certifications; omitted as not observed.

### 404.html
- **Replicated**: simple not‑found page with link to homepage.
- **Approximated**: styling matches site theme.
- **Intentional additions**: none beyond standard footer and age gate (included for consistency).
- **Unverified**: source does not contain a 404 page; added to satisfy category checklist.

## Component‑by‑Component Notes

### site-header
- **Replicated**: logo (text), skip link, navigation toggle.
- **Approximated**: colors and spacing.
- **Keyboard**: toggle button operable with Enter/Space; ESC closes mobile nav.
- **Status**: implemented.

### primary-nav
- **Replicated**: horizontal list of links; collapses to vertical on narrow view.
- **Keyboard**: arrow keys move focus; Enter activates link.
- **Status**: implemented.

### hero
- **Replicated**: prominent call‑to‑action section.
- **Approximated**: background color, text sizing.
- **Status**: implemented.

### content-band
- **Replicated**: generic section wrapper used on interior pages.
- **Approximated**: padding and max‑width.
- **Status**: implemented.

### card-grid
- **Replicated**: responsive grid for menu items, locations, press.
- **Approximated**: gap and column count.
- **Status**: implemented.

### menu-card / location-card / press-card
- **Replicated**: individual card displaying title, description, meta.
- **Approximated**: styling (border, padding).
- **Keyboard**: focusable if made interactive (none are interactive).
- **Status**: implemented.

### contact-form / reservation-form
- **Replicated**: form with labels, inputs, textarea, submit/reset.
- **Approximated**: layout and validation.
- **Keyboard**: Tab navigation, Enter submits, Escape not used (could reset).
- **Status**: implemented (simulated).

### newsletter-signup
- **Intentional addition**: simple email form in footer.
- **Keyboard**: Tab to input, Enter submits.
- **Status**: implemented (simulated).

### age-gate-modal
- **Simulated**: modal requesting date of birth; stores pass in sessionStorage.
- **Keyboard**: Tab to input, Enter submits, ESC closes (returns focus to trigger? trigger is page load; focus returns to body).
- **Status**: implemented.

### filter-controls
- **Simulated**: checkboxes filter menu cards in real time.
- **Keyboard**: Space toggles checkbox; Tab moves between.
- **Status**: implemented.

### site-footer
- **Replicated**: copyright, social‑media placeholder list, newsletter signup.
- **Approximated**: colors and spacing.
- **Status**: implemented.

### social-links
- **Intentional addition**: placeholder icons (FB, TW, IG) with aria‑labels.
- **Keyboard**: Tab focus, Enter activates (links to #).
- **Status**: implemented.

### breadcrumb
- **Intentional addition**: appears on interior pages.
- **Keyboard**: Tab focus, Enter activates link.
- **Status**: implemented.

### modal-backdrop / modal
- **Used for**: age gate.
- **Approximated**: dark backdrop, centered panel.
- **Keyboard**: ESC closes modal and returns focus to trigger (page load -> body).
- **Status**: implemented.

### toast ([aria-live])
- **Used for**: reservation and contact form confirmations.
- **Approximated**: appears at bottom center, fades.
- **Keyboard**: readable by screen readers; not focusable.
- **Status**: implemented.

### order-summary
- **Replicated**: static summary of a placeholder order.
- **Approximated**: layout and typography.
- **Status**: implemented.

## Summary of Deviations
- Visual design is an original accessible interpretation; no claim of exact match.
- All interactive features are simulations (no server persistence).
- Age gate and filtering are client‑side only.
- Newsletter signup and breadcrumb are intentional additions for demonstration and accessibility.
- No third‑party resources, web fonts, or external APIs are used.
- All content is original or placeholder; no copyrighted text, logos, or real photographs.

---  
*End of fidelity notes.*  
