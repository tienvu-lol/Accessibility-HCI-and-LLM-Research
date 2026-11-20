# Fidelity Notes for GOV-05

## General Notes
- **Branding**: Fictional "City of Oakhaven" used. No real logos, seals, or copyrighted text from the source (City of Austin) were reproduced.
- **Content**: All prose, descriptions, and placeholder data are original.
- **Accessibility**: WCAG 2.2 Level AA baseline implemented. Skip links, landmarks, ARIA attributes, and focus indicators are present.
- **Technology**: Semantic HTML5, CSS3, and vanilla JavaScript only. No frameworks or external dependencies.

## Page-by-Page Notes

### `index.html`
- **Replicated**: Header, Navigation, Hero, Content Bands (Services, News), Footer.
- **Approximated**: Hero layout and card grid structure based on observed patterns.
- **Unverified**: Specific visual styling of the hero image (replaced with CSS background color).

### `services.html`
- **Replicated**: Service directory with search functionality.
- **Simulated**: Search filter uses local JS array.
- **Intentional Addition**: Search input with live filtering.

### `departments.html`
- **Replicated**: Department list in card grid format.
- **Approximated**: Content based on typical municipal departments.

### `news.html`
- **Replicated**: News list with alert banner.
- **Simulated**: Alert dismissal and persistence.
- **Intentional Addition**: Alert banner component.

### `events.html`
- **Replicated**: Event list with calendar navigation.
- **Simulated**: Calendar navigation switches content (demo).
- **Intentional Addition**: Calendar navigation controls.

### `service-request.html`
- **Replicated**: Report-a-problem form.
- **Simulated**: Form validation and submission success message. Source redirects to external 311; this is a local simulation.
- **Intentional Addition**: Inline validation and error messages.

### `pay-utility-bill.html`
- **Replicated**: Payment form layout.
- **Simulated**: Payment processing is a demo. No real payment gateway integration.
- **Intentional Addition**: "Demo Payment" label and success state.

### `housing.html`
- **Replicated**: Hero section and program cards.
- **Approximated**: Content based on typical housing assistance programs.

### `park-directory.html`
- **Replicated**: Park list with details.
- **Approximated**: Park names and features are fictional.

### `police.html`
- **Replicated**: Hero section and service cards.
- **Approximated**: Content based on typical police department services.

### `permits.html`
- **Replicated**: Permit types list.
- **Approximated**: Permit categories are standard.

### `animal-services.html`
- **Replicated**: Hero section and service cards.
- **Approximated**: Content based on typical animal services offerings.

### `404.html`
- **Replicated**: Standard error page with navigation back to home.

## Component Notes

### `site-header`
- **Replicated**: Logo, navigation trigger, language toggle.
- **Simulated**: Language toggle is a demo.

### `primary-nav`
- **Replicated**: Multi-level navigation with dropdowns.
- **Approximated**: Dropdown behavior on hover/focus.

### `hero`
- **Replicated**: Banner with title, description, and CTA.
- **Approximated**: Visual styling.

### `content-bands`
- **Replicated**: Card grid layout for content.
- **Approximated**: Card styling.

### `alert-banner`
- **Replicated**: Dismissable alert.
- **Simulated**: Dismissal persistence.

### `site-footer`
- **Replicated**: Contact info, quick links, legal links.
- **Approximated**: Layout and content.

## Deviations and Limitations
- **External Redirects**: Source 311 page redirects to an external site; this replica simulates the form locally.
- **Payment Gateway**: Source pay bill page likely uses an external gateway; this replica simulates the form locally.
- **Language Control**: Not explicitly observed in source markup; implemented as an inferred feature.
- **Visual Fidelity**: Exact colors, fonts, and imagery are approximated or replaced with CSS/placeholder content.
- **Interactions**: Complex interactions (e.g., dynamic map loading) are simplified or simulated.
