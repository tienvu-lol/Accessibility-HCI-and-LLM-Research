# Verification record — Avery North

## Completed

- JavaScript syntax: `node --check assets/app.js` passed.
- Parsed all 21 full HTML documents with Python’s standard HTML parser.
- Checked local `href`/`src` targets, fragment destinations, and page IDs: no missing targets or duplicate IDs.
- Checked exactly one H1 and one main landmark in each document.
- Checked image alt attributes and field label associations, including wrapping checkbox labels.
- Checked explicit button types and initially disabled form-submit controls for no-JS safety.
- Checked both instrumentation attributes on header/footer/main/section/article/aside/nav/form/dialog/details/fieldset/figure/button/input/select/textarea components.
- Checked no form endpoints, network submission APIs, or persistent storage in application JavaScript.
- Calculated 18 foreground/background token contrast combinations across light and dark themes. Minimum checked ratio: **4.74:1**.
- Generated component inventory from delivered HTML, not a proposed component list.
- ZIP packaging integrity is checked after documentation is finalized.

## Not completed

The browser access host was unavailable. Native Safari access was also attempted, but computer-use permissions were not granted. No rendered visual QA, browser functional test, screenshot comparison, screen-reader review, actual zoom/reflow test, or full WCAG 2.2 AA audit was completed. Python HTMLParser is not a formal HTML conformance validator. These results establish source-level consistency only.

## Manual acceptance checklist

1. Open `index.html` at 1440px, 1024px, 760px, 390px, and 320px. Confirm readable columns, no unintended page-wide overflow, and sensible image crops.
2. Test 200% and 400% zoom, increased text spacing, dark/light themes, and reduced motion. Inspect actual contrast, target sizes, and focus visibility, including sticky-header obstruction.
3. Tab through the skip link, header, resources dropdown, mobile menu, content, and footer. Escape should close the active dropdown/mobile menu and restore sensible focus.
4. Search Work using part of a title, combine it with a category, and try a zero-result query. Repeat on the article listing. Counts should update politely and hidden cards should leave the tab order.
5. Open each gallery. Test native modal focus containment, caption updates, previous/next buttons, arrow keys, Escape, and return focus.
6. Enter a wrong NDA passcode, then `openstudio`. Confirm feedback and focus on the first revealed heading. Verify the notes are plainly described as insecure demo content.
7. Submit empty and invalid forms, then use valid fictional data. Try a too-short inquiry, a past booking date, and a weekend. Confirm local success and no request in browser network tools.
8. Disable JavaScript. Ordinary content/navigation should remain available, and form-submit controls should stay disabled.
9. Select each print format. Confirm $20/$35/$60 demo pricing, local success, no payment fields, and reset on reopening.
10. Cycle all testimonials manually. Confirm no autoplay and useful screen-reader announcements.
11. Test copy email with and without Clipboard permission. Compare the studio clock to `America/Denver`, including DST.
12. Download the complete CV and use the résumé print layout. Configure a static host’s 404 document and test a missing route.

Reference-derived architecture and research additions are separated in `FIDELITY.md`.
