# Fidelity Notes – HOSP-R08

## General
- **Replicated:** Information architecture, navigation structure, layout patterns (header, nav, hero, service bands, provider listing, location map, footer) as observed in the source page map.
- **Approximated:** Visual styling uses original CSS but with a fictional brand name and colors; layout follows the same hierarchy.
- **Simulated:** All interactive components (doctor filter, location filter, service accordion, appointment form, insurance modal) are client‑side simulations using inline data; no real backend or third‑party calls.
- **Intentionally added:** ARIA attributes, focus management, skip link, error summary, modal accessibility features to meet WCAG 2.2 AA baseline; these were not present in the source but are added for accessibility.
- **Omitted:** Detailed doctor/service detail pages, dynamic search results beyond sampled queries, real map integration, any real photographs/logos/trademarks.
- **Unverified:** The source’s exact visual treatment (fonts, spacing, exact colors) – we used a reasonable approximation; we cannot confirm pixel‑perfect match without rendered evidence.

## Page‑by‑Page

### index.html (home)
- Replicated: header, nav, hero banner, three service bands, footer.
- Approximated: Service band titles and short descriptions are placeholders; icons omitted (decorative).
- Simulated: Service band accordion (toggle) works with keyboard (Enter/Space).
- Intentionally added: Skip link, visible focus outline, aria‑expanded on toggles, role="region" and aria-label on service bands.
- Omitted: Any carousel or video hero observed on source (not captured in evidence).

### get-care-now.html (appointment inquiry)
- Replicated: Form layout with name, email, phone, date, reason.
- Approximated: Form styling matches site; no real backend.
- Simulated: Client‑side validation, error summary, focus on first error, simulated success alert.
- Intentionally added: ARIA invalid attributes, error summary role="alert".
- Omitted: Real appointment scheduling system, CAPTCHA, authentication.

### pay-a-bill.html (billing/insurance)
- Replicated: Bill pay call‑to‑action, insurance plan list.
- Approximated: Insurance plan list is static modal; button label approximates source.
- Simulated: Modal shows accepted insurance plans (inline data), dismissible with Escape, focus returned.
- Intentionally added: Modal backdrop, focus trap (via Escape), aria‑modal, changed placeholder link to a button with demo label.
- Omitted: Real payment gateway, login, actual bill details.

### find-a-doctor.html (provider listing – all)
- Replicated: Provider list grid, filter input.
- Approximated: Doctor data is fictional; specialties and accepting status are placeholders.
- Simulated: Client‑side filter by name/specialty, Escape clears.
- Intentionally added: ARIA live region not used; filter updates via CSS display; keyboard accessible.
- Omitted: Real doctor profiles, pagination, map integration, insurance filter.

### find-a-doctor-primary-care.html (provider listing – primary care)
- Replicated: Same as find-a-doctor.html but pre‑filtered to primary care specialties.
- Approximated: Same data set; filter resets to primary care on Escape.
- Simulated: Same filtering behavior.
- Intentionally added: Pre‑filter logic.
- Omitted: Any secondary filters (location, gender) seen on source.

### health-care-services.html (services overview)
- Replicated: Service bands with titles and short descriptions.
- Approximated: Service icons omitted (decorative).
- Simulated: Accordion toggle for each band.
- Intentionally added: Same accessibility features as home page, added role="region" and aria-label to each service band.
- Omitted: Any service detail pages or scheduling links.

### conditions-and-treatments.html
- Replicated: List of conditions with typical treatment and related service.
- Approximated: Data is fictional but mirrors plausible condition/service pairs.
- Simulated: No interaction; static list.
- Intentionally added: Card styling for readability, added h2 heading to fix heading order.
- Omitted: Any search, filtering, or accordion behavior.

### location-map.html
- Replicated: Static SVG map placeholder, location filter dropdown, location list.
- Approximated: SVG is a placeholder; real source may have used an interactive map.
- Simulated: Filter updates location list via CSS display; keyboard accessible dropdown.
- Intentionally added: ARIA label on SVG, role="img".
- Omitted: Real interactive map (Google/Leaflet), click‑to‑detail markers, geolocation.

### locations-hospitals.html
- Replicated: List of hospitals with address, phone, website link.
- Approximated: Data is fictional but matches structure.
- Simulated: No interaction.
- Intentionally added: Link opens in new tab with rel="noopener"; changed placeholder link to a button with demo label to satisfy QC.
- Omitted: Any map integration, filtering, or hospital detail pages.

### patient-resources.html
- Replicated: List of resource links with categories.
- Approximated: Resource titles and URLs are placeholders.
- Simulated: No interaction.
- Intentionally added: Card styling, clear headings, changed list to proper <ul> to satisfy listitem rule, changed placeholder links to buttons with demo labels.
- Omitted: Any downloadable forms, search, or accordion.

### 404.html
- Replicated: Simple not‑found page with link to home.
- Approximated: Matches typical 404 layout.
- Simulated: No interaction.
- Intentionally added: Same header/nav/footer, skip link, focus style.
- Omitted: Any search box or suggested links observed on source.

## Component Notes
- **site-header, primary-nav, site-footer:** Replicated on every page; nav links match source.
- **skip-link:** Added as first focusable element; not observed in source but required for WCAG.
- **hero-banner:** Present only on home; approximated.
- **service-bands / service-band / service-band-toggle / service-details:** Replicated on home and services page; simulated accordion; added role and aria-label to satisfy ARIA rules.
- **provider-listing-band / provider-grid / doctor-card:** Replicated on both doctor pages; simulated filter.
- **doctor-filter:** Simulated text input filter; Escape clears.
- **location-map-band / location-filter / location-item:** Replicated on location-map and locations-hospitals; simulated dropdown filter.
- **error-summary / appointment-form:** Simulated validation and error handling.
- **insurance-modal-backdrop / insurance-modal / modal-close:** Simulated modal with focus management.
- **condition-list / condition-item:** Static list, no interaction.
- **resource-list / resource-item:** Changed from <section> to <ul> to satisfy listitem rule; static list.

## Limitations
- No real photographs, logos, or trademarks used; all artwork is placeholder SVG or omitted.
- All data is fictional and limited to the counts stated in README.
- Interactions work only client‑side; no network requests, so behavior over `file://` is identical to served site.
- The replica does not intend to deceive; it is clearly marked as a fictional brand for research purposes.
- Adjustments made to address QC failures: placeholder links replaced with buttons, color contrast improved for buttons, list structure corrected, and heading order fixed where needed.
