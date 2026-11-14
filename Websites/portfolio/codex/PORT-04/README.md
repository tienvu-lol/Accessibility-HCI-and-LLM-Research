# Rowan Ellis — portfolio replica 01

A complete, buildless research website inspired by [Brittany Chiang’s portfolio](https://brittanychiang.com/). Rowan Ellis and every employer, project, testimonial, award, and biography detail are fictional. All images are original local SVG placeholders. No real owner assets, text, analytics, credentials, or source code are copied.

## Run

Open `index.html` in a current browser, or serve this folder with any static server. For example, from this folder:

```sh
python3 -m http.server 8080
```

Visit `http://localhost:8080`. Python is an optional local serving convenience, not an application dependency or build tool. There is no installation, compilation, database, backend, package manager, or PHP requirement. The files also work on ordinary static hosting. Configure your host to serve `404.html` for unknown routes if desired; a plain static server does not automatically do that.

The site uses only HTML5, CSS3, and vanilla JavaScript. jQuery and Bootstrap were permitted but are unnecessary for this reference, so neither is loaded. There are no remote fonts, images, CDN libraries, tracking scripts, fetch calls, or form endpoints. Native HTML is readable without JavaScript; enhanced controls require it.

## Page map

| File | Purpose |
| --- | --- |
| `index.html` | Reference-inspired two-column homepage: identity, about, experience, selected projects, writing, contact CTA |
| `archive.html` | Searchable/filterable projects and compact archive table |
| `project-tide.html` | Library discovery case study, process, gallery, outcomes, previous/next |
| `project-fieldwork.html` | Trail journal case study and gallery |
| `project-signal.html` | Operations console case study with explicitly insecure demonstration NDA gate |
| `about.html` | Biography, working approach, experience, skills, CV links |
| `resume.html` | Readable CV, downloadable text résumé, print/save-as-PDF control |
| `services.html` | Three service bands and FAQ accordions |
| `writing.html` | Searchable/filterable blog listing and demo newsletter |
| `post-quiet-interfaces.html` | Design article, on-page contents, article navigation |
| `post-keyboard-first.html` | Accessibility article |
| `post-useful-motion.html` | Engineering article |
| `contact.html` | Contact actions, validated inquiry, simulated booking |
| `toolkit.html` | Tools and working principles |
| `press.html` | Clearly fictional recognition and manual testimonial carousel |
| `prints.html` | Demo print catalogue and modal order simulation |
| `404.html` | Error-page document with recovery links |

## Demo interaction guide

- **Navigation:** Homepage section links jump to About, Experience, Projects, and Writing. IntersectionObserver updates the active link. Explore opens a native details menu; Escape and outside clicks dismiss it. At mobile widths the identity column becomes a normal-flow header and the compact utility bar stays visible.
- **Search and category filters:** Type `library` on the project archive; combine it with Interface design. Choose another category to see the empty state. Writing supports Design, Accessibility, and Engineering categories. Result counts are announced politely; content order does not change.
- **Theme:** Light theme / Dark theme changes CSS variables and updates `aria-pressed`. State is in memory and resets with navigation/reload. Default is dark to follow the reference.
- **Contact:** Required name, syntactically valid email, service, at least 20 characters of project context, and the demo acknowledgement. Native browser validation identifies invalid inputs; successful submissions display a local status and clear the form. No data is transmitted or retained.
- **Booking:** Select a future weekday, a listed New York time, and an email address. Past dates fail native validation; weekends receive a custom validation message. All slots are illustrative and unrelated to a real calendar. Success does not create an appointment.
- **Newsletter:** Email validation and a local success state only.
- **NDA gate:** Open Signal and enter `fieldnotes`. This is interaction research, not authentication or access control. The notes exist in the HTML and are visible through source inspection or DOM manipulation. Never put confidential content here.
- **Gallery:** Open a case-study image. Native `dialog` provides modal focus containment and Escape dismissal. Previous/next buttons and left/right arrow keys cycle images. Closing restores focus to the gallery opener.
- **Testimonials:** Previous/next buttons cycle three fictional quotations; there is no autoplay. Updated quote text uses a polite live region.
- **Prints:** Select a print, choose its format, and simulate an order. No shipping or payment information is collected. The modal resets its success message when reopened.
- **Email:** Copy email uses the Clipboard API. If the browser denies access or the page is not a secure context, a visible manual-copy fallback shows the address. `.example` is deliberately non-deliverable.
- **Résumé:** Download the complete `.txt` file or use the browser print dialog to save `resume.html` as PDF. No pre-generated PDF is included.
- **Availability:** The availability wording is fictional and static. The time is real, computed using `Intl.DateTimeFormat` with `America/New_York` and refreshed every minute; DST is handled by the browser.
- **Motion:** Scroll reveal and a pointer-following ambient highlight are progressive enhancements. `prefers-reduced-motion` disables them and smooth scrolling.

## Accessibility baseline

Semantic landmarks, one primary heading per document, skip link, labeled forms, native buttons and links, explicit button types, clear keyboard focus, image text alternatives, fieldset/legend filter grouping, polite result/success messages, reduced-motion support, manual carousels, and native modal focus management are included. Sections and custom components carry `data-section` and/or `data-component`; every principal region has both. Reused component names are stable; IDs are unique per document.

Source checks confirmed primary text tokens against both base and surface colors have contrast above 4.5:1 in both themes (minimum checked pair: 5.17:1). This is a WCAG 2.2 AA implementation baseline, not a claim of certified conformance. Actual browser reflow, target geometry, full contrast combinations, focus visibility under all conditions, screen readers, and zoom need manual review. See `QA.md`.

## Files and editing

`assets/styles.css` contains tokens, layouts, component styles, responsive rules at 950/760/420px, reduced-motion rules, and print styling. `assets/app.js` contains all progressive enhancement behavior. The three project SVGs are complete local placeholder artwork; `favicon.svg` is an original initial mark. `component-inventory.json` lists each page’s instrumented sections/components and interaction contracts.

HTML is intentionally delivered in full per page. Repeated headers/footers are duplicated so the deliverable opens without a PHP server or client-side template loader. When editing global navigation, update all 17 pages consistently. PHP includes were optional and were not needed.

Read `FIDELITY.md` for the distinction between reference-derived architecture and research extensions. No source license or permission to reuse the real portfolio’s proprietary code/assets is implied; this package is independently implemented with fictional content.
