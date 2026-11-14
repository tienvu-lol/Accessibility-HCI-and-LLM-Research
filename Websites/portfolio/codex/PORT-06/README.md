# Avery North — portfolio research replica 03

Complete, independent frontend interpretation of [Alex Strohl’s live portfolio](https://www.alexstrohl.com/), using a fictional identity, original copy, and original local SVG placeholder artwork. No owner photographs, project assets, branding, source code, endorsements, or personal contact details are reused. All projects, employers, testimonials, and recognition are fictional and marked as illustrative.

## Open the website

Open `index.html` in a current browser. No installation or build step is needed. For an optional local HTTP preview, run this from the site folder:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. Python is only an optional static file server, not part of the application. A current Safari, Firefox, or Chromium browser is the intended environment. Clipboard access can require localhost/HTTPS; a visible manual-copy fallback is included.

The application uses **HTML5, CSS3, and vanilla JavaScript only**. There is no React, other framework, package manager, compilation, database, backend logic, PHP runtime, remote font, CDN library, image service, analytics, account, real payment, or API integration. jQuery and Bootstrap 5 were permitted by the brief but were not needed. Every page is delivered in full, with local relative links and assets.

## Page map — 21 complete HTML documents

| File | Purpose |
| --- | --- |
| `404.html` | Static error document and recovery links |
| `about.html` | Biography, practice context, experience timeline, contact routes |
| `contact.html` | Inquiry form, contact sidebar, copy email, and demo booking |
| `faq.html` | Native FAQ accordions |
| `index.html` | Main portfolio homepage; editorial hero, large landscape, masonry imagery, selected stories, client-name study, print promotion, newsletter |
| `journal.html` | Searchable and filterable field-note listing |
| `latest-work.html` | Chronological illustrated-image archive with lightbox |
| `links.html` | Studio directory and newsletter |
| `post-carry-less.html` | Original editorial article with contents sidebar and related navigation |
| `post-sequence-a-story.html` | Original editorial article with contents sidebar and related navigation |
| `post-wait-for-light.html` | Original editorial article with contents sidebar and related navigation |
| `press.html` | Fictional press list and manual testimonial carousel |
| `prints.html` | Demo edition catalogue with format/price purchase modal |
| `project-between-places.html` | Full fictional case study, image gallery, process, and previous/next navigation |
| `project-high-country.html` | Full fictional case study, image gallery, process, and previous/next navigation |
| `project-outside-hours.html` | Full fictional case study, image gallery, process, and previous/next navigation |
| `project-tidelines.html` | Full fictional case study, image gallery, process, and previous/next navigation |
| `resume.html` | CV, downloadable text file, and print/save-as-PDF action |
| `services.html` | Service bands, process, and commission CTA |
| `toolkit.html` | Tools, working habits, and implementation stack |
| `work.html` | Searchable and filterable project collection |

The 404 file is provided for static-host configuration. Opening a nonexistent URL on an arbitrary server does not automatically route to this file.

## Interactive behavior

- **Navigation:** Sticky header, desktop navigation, a resources dropdown, and a JavaScript mobile disclosure. Menu uses `aria-expanded` and `aria-controls`; Escape closes the dropdown first, then the mobile panel. Native links remain available without JavaScript. Breadcrumbs, project previous/next links, and multi-column footer navigation connect the documents.
- **Search and filters:** Case-insensitive substring matching on title, category, and description, combined with the active category using AND. Result counts use a polite status region. A dedicated empty state appears for no matches. Search does not call a server.
- **Inquiry:** Required name, email, project type, budget range, a 30-character minimum project outline, and a demo acknowledgement. Native browser constraint validation identifies invalid fields. Success is an in-memory message and the form resets.
- **Booking:** Future weekdays only; the minimum date is tomorrow in the browser’s local date. Select a studio-local sample time and valid email. Weekends receive a custom validation message. No real slot is checked or reserved. Studio time zone: `America/Denver`.
- **Newsletter:** Email validation and a local success state. There is no mailing list or transmission.
- **No-JS form behavior:** Submit buttons are disabled in the HTML and enabled by `app.js`. This prevents accidental native GET submissions when JavaScript is unavailable. Content and ordinary page navigation still work.
- **Lightbox:** Select a gallery image. Native `dialog` supplies modal focus containment and Escape dismissal; previous/next buttons and left/right arrows change the image within its gallery group. Caption updates are announced politely. Closing returns focus to the opener. No automatic slideshow.
- **Demo NDA gate:** Open `project-outside-hours.html` and enter **`openstudio`**. Wrong values show feedback; success reveals fictional notes and moves focus to the first heading. This is explicitly not security or authentication: the content exists in the HTML source. Do not use it for confidential material.
- **Print purchase:** Select an edition, choose Digital ($20), A4 ($35), or A3 ($60), and simulate an order. The price updates in place. No payment or shipping information is requested; no order, delivery, or license is created. Reopening resets the modal.
- **Testimonials:** Manual previous/next buttons cycle three clearly fictional quotes, with a polite announcement region. There is no autoplay.
- **Theme:** Light/dark toggle updates `aria-pressed` and CSS variables. State is in memory only and resets on navigation/reload.
- **Availability / clock:** Availability is a static fictional label. The time is real, formatted with `Intl.DateTimeFormat` for `America/Denver`, and updated every minute with browser time-zone/DST handling.
- **Copy email:** Clipboard API when available, visible manual-copy address otherwise. `.example` addresses are deliberately non-deliverable.
- **Résumé:** Local `assets/avery-north-cv.txt` download and print styling for the browser’s Print / Save as PDF action. No pre-generated PDF is included.
- **Motion:** IntersectionObserver reveals are progressive enhancements; content is never initially hidden by CSS. Reduced-motion preferences disable animations, transitions, and smooth scrolling.

## Accessibility and instrumentation

Semantic landmarks, one H1 per document, a skip link, image alternatives, labeled inputs, filter fieldsets, native accordions, keyboard focus outlines, descriptive button labels, live status feedback, reduced-motion support, native dialogs, and non-autoplay carousels form a WCAG 2.2 AA baseline. Every region and semantic/interactive component is instrumented with both `data-section` and `data-component`. Repeated types use stable semantic names; generic HTML components have explicit tag-based names. `component-inventory.json` is generated from the actual delivered documents, including all page sections and component counts.

Source-level contrast calculations checked body, heading, muted, and accent text against both base and surface colors, plus button foreground/background, in both themes. All checked pairs are at least 4.74:1. This does not measure every rendered combination or establish full AA conformance. Browser reflow, target geometry, actual focus appearance, assistive technologies, and zoom still require manual review.

## File organization

- `assets/styles.css`: complete tokens, base styles, component rules, responsive breakpoints, site-specific visual direction, print rules, and reduced-motion rules.
- `assets/app.js`: all progressive enhancements and local demo state.
- `assets/*.svg`: original local placeholder artwork and favicon.
- `assets/avery-north-cv.txt`: complete fictional CV text.
- `FIDELITY.md`: observed reference architecture, intentional substitutions, and research additions.
- `QA.md`: completed source checks and uncompleted browser checks.
- `component-inventory.json`: actual page/component inventory and interaction contracts.
- `FILES.txt`: complete file manifest.

All HTML is repeated in full per page so the site can open directly from disk. Shared headers and footers are intentionally duplicated; update them consistently if editing. PHP includes were optional and are not used.

## Verification limits

JavaScript syntax, local links/fragments, IDs, landmark counts, field labels, instrumentation, form safeguards, and base color-token contrast were checked. Browser access was unavailable and native computer-use permissions were not granted, so rendered visual QA, real interaction tests, screen-reader review, and exact comparison with the reference were not completed. See `QA.md` for a manual acceptance path. No WCAG certification, real commercial results, or exact source-code/pixel fidelity is claimed.
