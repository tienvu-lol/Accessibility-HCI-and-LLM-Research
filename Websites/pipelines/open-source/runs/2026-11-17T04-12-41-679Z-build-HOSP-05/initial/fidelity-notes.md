# Fidelity Notes for HOSP-05 Replica

## General Deviations
- **Identity**: Fictional name "Metro General Health" used instead of NYU Langone Health.
- **Rendering**: Source uses heavy client-side rendering; replica uses static HTML/CSS/JS.
- **Data**: All data is inline and fictional. No external API calls.
- **PDFs**: Source PDF links simulated as local text anchors.

## Page-by-Page Notes

### `index.html`
- **Replicated**: Hero banner, service directory, location preview, condition expertise.
- **Approximated**: Navigation structure matches source.

### `doctors.html`
- **Replicated**: Search and filter functionality.
- **Simulated**: Doctor data is fictional. No real search backend.

### `conditions.html`
- **Replicated**: List of conditions with categories.
- **Approximated**: Source likely had more detailed pages; this is a directory view.

### `locations.html`
- **Replicated**: Location list with region filter.
- **Simulated**: Location data is fictional.

### `care-services.html`
- **Replicated**: Service directory with cards.
- **Approximated**: Links to brain, cancer, women's health pages.

### `insurance-billing.html`
- **Replicated**: List of documents/resources.
- **Simulated**: Document links are local anchors.

### `patient-forms.html`
- **Replicated**: List of patient forms.
- **Simulated**: Form links are local anchors.

### `brain-care.html`
- **Replicated**: Service overview and doctor search link.
- **Approximated**: Content is generic neurological care info.

### `cancer-care.html`
- **Replicated**: Service overview and doctor search link.
- **Approximated**: Content is generic oncology care info.

### `womens-health.html`
- **Replicated**: Service overview and doctor search link.
- **Approximated**: Content is generic women's health info.

### `contact-us.html`
- **Replicated**: Contact form and info.
- **Simulated**: Form submission shows alert, no data sent.

### `404.html`
- **Replicated**: Standard 404 page with navigation.

## Component Notes
- **Header/Footer**: Consistent across all pages.
- **Hero Banner**: Used on most pages for context.
- **Card Grid**: Used for services and conditions.
- **Document List**: Used for insurance and forms.
- **Search/Filter**: Used for doctors and locations.

## Intentional Additions
- **Contact Form Validation**: Added for usability demonstration.
- **Active Nav State**: Added for better UX.

## Omissions
- **Provider Detail Pages**: Not in approved map.
- **Dynamic Content**: Source's JS-heavy features simplified to static HTML/JS.
