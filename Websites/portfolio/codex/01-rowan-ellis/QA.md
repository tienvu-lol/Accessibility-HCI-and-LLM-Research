# Verification record

## Completed checks

- `node --check assets/app.js`: passed.
- Parsed all 17 HTML documents using Python’s standard HTML parser.
- Checked local `href`/`src` targets and referenced local fragments: passed.
- Checked duplicate IDs per document: passed after correcting a contact-section/input collision.
- Checked exactly one main landmark per page: passed.
- Checked explicit button types, image alt attributes, and labels for non-checkbox form fields: passed. Checkboxes use wrapping labels.
- Checked `data-section` and `data-component` on header, main, footer, and section regions: passed.
- Computed WCAG relative-luminance contrast for text, heading, accent, and muted tokens against base and surface tokens in both themes: all 16 pairs exceed 4.5:1; minimum 5.17:1.
- Source reviewed for network calls, form endpoints, remote dependencies, forbidden framework code, and persistent storage: none used.
- Component inventory generated from delivered HTML rather than a hypothetical list: 42 distinct instrumented component types.

## Not completed

Browser host unavailable. No rendered visual QA, live interaction testing, automated browser test, keyboard traversal, screen-reader run, responsive screenshot comparison, or complete WCAG audit was performed. The HTML parser is not an HTML conformance validator. Syntax and source checks establish a useful baseline but do not prove browser behavior or accessibility compliance.

## Manual acceptance checklist

1. At 1440px the identity stays visible while the right content scrolls; at 760px or narrower the header stacks and the utility navigation remains usable.
2. At 320px and 400% zoom, text and controls reflow without page-wide horizontal scrolling; the project table may scroll within its wrapper.
3. Tab from Skip to content through navigation and each page. Focus should remain visible and logical. Test Explore with Enter, Escape, and outside click.
4. Search `library`, combine with Interface design, then switch to Creative coding. Confirm matching results, counts, and the empty state. Repeat in Writing.
5. Open and close every gallery and print modal with a keyboard; verify Escape and focus restoration. Try gallery arrow controls.
6. Submit each form empty, with an invalid email, and with valid fictional data. Try a short inquiry and a weekend/past booking date. Confirm local success and no network request.
7. Enter a wrong NDA passcode, then `fieldnotes`. Confirm failure feedback and focus on the revealed case-study heading.
8. Toggle theme; confirm text and focus contrast. Enable reduced motion and verify animations stop.
9. Move through all testimonials. Confirm no autoplay and that new text is announced.
10. Download the text CV and print the résumé page. Test copy email both with and without Clipboard permission.
11. Verify the New York badge against current time, including DST behavior.
12. Configure a static host’s error page, visit a missing route, and confirm the 404 recovery links.
