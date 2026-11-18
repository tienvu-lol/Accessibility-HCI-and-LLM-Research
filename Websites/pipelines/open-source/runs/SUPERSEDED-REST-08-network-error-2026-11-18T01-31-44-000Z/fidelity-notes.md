# Fidelity Notes – REST-08 (Jade Dragon Kitchen)

## General approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns from the observed source evidence.
- Fictional organization name, original prose, and original placeholder artwork used; no real logos, trademarks, or copyrighted text.
- Where the source evidence did not include a feature (e.g., menu detail page, real‑time API), we omitted it or simulated it as noted.
- All interactive controls either work on local inline data or are clearly labelled as non‑functional demonstrations.

## Page‑by‑page

### index.html (Home)
- **Replicated:** Header, navigation, hero section with tagline and call‑to‑action, footer with quick links and newsletter signup.
- **Approximated:** Hero background colour and image‑less layout (source used a background photo; we used a solid colour for simplicity).
- **Simulated:** Age‑gate modal (source had an inferred age gate; we implemented a modal that blocks progression until dismissed).
- **Intentionally added:** None beyond the required baseline.
- **Omitted:** Any carousel or rotating banner (not observed in evidence).
- **Unverified:** Visual exactness of hero styling (no rendered evidence provided).

### menu.html (Menu index)
- **Replicated:** Menu listing, filter controls for cuisine and spice level, responsive grid layout.
- **Approximated:** Exact dish names and prices are fictional but patterned after typical Xi’an dishes.
- **Simulated:** Filtering operates on inline JavaScript array; no server call.
- **Intentionally added:** None.
- **Omitted:** Individual menu detail pages (source did not provide evidence of separate detail pages).
- **Unverified:** Exact visual treatment of menu cards (no rendered evidence).

### our-story.html (Our Story)
- **Replicated:** Main content band with heading, body text, and a blockquote.
- **Approximated:** Prose is original but mirrors the tone of a family‑run restaurant story.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** Any embedded video or photo gallery (not observed).
- **Unverified:** Exact styling of blockquote and spacing.

### locations.html (Locations)
- **Replicated:** Location cards with address, hours, phone; reservation form; open/closed status badge.
- **Approximated:** Hours and addresses are fictional but plausible.
- **Simulated:** Reservation form shows a demo confirmation; open/closed badge uses client time.
- **Intentionally added:** None.
- **Omitted:** Map integration (source may have had a map; no evidence provided, so omitted).
- **Unverified:** Exact map‑like visual (none present).

### contact.html (Contact)
- **Replicated:** Contact form with name, email, subject, message fields; simulated submission response.
- **Approximated:** Layout matches a typical contact band.
- **Simulated:** Form does not submit; shows a thank‑you message.
- **Intentionally added:** None.
- **Omitted:** Any CAPTCHA or anti‑spam mechanism (not observed).
- **Unverified:** Exact styling of form elements.

### order-acknowledgment.html (Order Acknowledgment)
- **Replicated:** Order summary table with items, totals, status.
- **Approximated:** Order number, items, and totals are fictional but realistic.
- **Simulated:** Entire page is a demo acknowledgment; no actual order processing.
- **Intentionally added:** None.
- **Omitted:** Payment integration, receipt download (source only had acknowledgment page).
- **Unverified:** Exact visual treatment of the summary table.

### press.html (Press)
- **Replicated:** List of press articles with title, date, excerpt, source.
- **Approximated:** Articles are fictional but based on typical media coverage.
- **Simulated:** List generated from inline data; no external feed.
- **Intentionally added:** None.
- **Omitted:** Embedded tweets or video clips (not observed).
- **Unverified:** Exact visual styling of press cards.

### accessibility.html (Accessibility)
- **Replicated:** Accessibility statement heading, measures list, feedback form.
- **Approximated:** Content is original but follows typical accessibility statement structure.
- **Simulated:** Feedback form does not submit; shows a thank‑you message.
- **Intentionally added:** None (page added because source had an accessibility page in the approved map).
- **Omitted:** Any third‑party accessibility widget or toolbar.
- **Unverified:** Exact visual match to source (no rendered evidence).

### 404.html (Page not found)
- **Replicated:** Standard 404 layout with heading, apology message, and link to home.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** Added to satisfy category requirements (source did not provide a 404 page, but the category checklist expects one).
- **Omitted:** None.
- **Unverified:** None.

## Component‑by‑component

### site-header
- **Replicated:** Logo, navigation toggle, age‑gate trigger.
- **Approximated:** Colour scheme derived from source’s primary colour (inferred).
- **Simulated:** Age‑gate trigger opens modal (simulated gate).
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** Exact hover/focus colours.

### primary-nav
- **Replicated:** Horizontal list of links, responsive toggle.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### hero
- **Replicated:** Prominent heading, paragraph, call‑to‑action button.
- **Approximated:** Background colour (source used image; we used colour).
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** Exact typography and spacing.

### content-band
- **Replicated:** Generic section wrapper used on story, locations, contact, press, accessibility.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### menu-filter
- **Replicated:** Checkbox groups for cuisine and spice.
- **Approximated:** None.
- **Simulated:** Filters menu items client‑side.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### menu-grid / menu-card
- **Replicated:** Grid of dish cards with title, description, price, tags.
- **Approximated:** None.
- **Simulated:** Data from inline array.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### reservation-form
- **Replicated:** Form with name, email, location, date, time, party size.
- **Approximated:** None.
- **Simulated:** Demo confirmation toast.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### location-card
- **Replicated:** Card showing location details and hours badge.
- **Approximated:** None.
- **Simulated:** Open/closed badge based on client time.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### press-list / press-item
- **Replicated:** List of press articles with title, date, excerpt, source.
- **Approximated:** None.
- **Simulated:** Data from inline array.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### newsletter-signup
- **Replicated:** Email input and submit button in footer.
- **Approximated:** None.
- **Simulated:** Demo thank‑you message.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### site-footer
- **Replicated:** About, quick links, newsletter sections.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### age-gate
- **Replicated:** Modal overlay with disclaimer and confirm button.
- **Approximated:** None.
- **Simulated:** Blocks progression until dismissed (no actual age verification).
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### contact-form
- **Replicated:** Form with name, email, subject, message.
- **Approximated:** None.
- **Simulated:** Demo feedback/response.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### order-summary
- **Replicated:** Definition list showing order details.
- **Approximated:** None.
- **Simulated:** Static demo data.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### cta-button
- **Replicated:** Primary call‑to‑action button in hero.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

### skip-link
- **Replicated:** Hidden skip link that appears on focus.
- **Approximated:** None.
- **Simulated:** None.
- **Intentionally added:** None.
- **Omitted:** None.
- **Unverified:** None.

## Summary of deviations
- All deviations are either approximations (where source evidence lacked visual detail), simulations (where real‑world server interaction would be required), or intentional additions (404 page, component‑inventory, documentation) required by the study protocol.
- No accessibility defects were introduced intentionally; the replica follows a WCAG‑oriented baseline.
