# PORT-02: Priya Raman

## Protocol record (WEB-REPLICA-V1.0)

| Field | Value |
|---|---|
| Replica ID | PORT-02 |
| Category | personal portfolio: software developer / engineer |
| Fictional branding | Priya Raman, senior frontend engineer (accessibility), Boston, Massachusetts (fictional person; 555 phone number, `.example` email) |
| Approved source | Brittany Chiang, https://brittanychiang.com/ |
| Source verification | Fetched live on 2026-11-09 and confirmed as a working single-page engineer portfolio with a separate project archive; structure (fixed left identity rail with anchor nav and social row, scrolling About / Experience / Projects / Writing column, résumé link, archive table) recorded from that page. No markup, copy or assets were copied. |
| Run locally | Open `index.html` in a browser. No server, build step or network needed. |
| Layout | `*.html` pages, `css/styles.css`, `js/main.js`, `assets/` (SVG placeholders, resume text, vendor/bootstrap, vendor/jquery), `README.md`, `fidelity-notes.md`, `component-inventory.json` |
| Deviations | **None outstanding.** The replica was first built with Bootstrap 5.3.3 and jQuery 3.7.1 on the project lead's instruction, which conflicted with `RULES.md` section 2. The conflict was reported and the lead chose removal: on 2026-11-10 both libraries were deleted and the dropdown, slide-in navigation, disclosures and the image dialog were reimplemented in vanilla JS and CSS. **No PHP**: shared partials are inlined into every page, so the site runs from `file://`. |

### Sample data

| Data | Count |
|---|---|
| Pages | 19 (including 404) |
| Archive entries | 16 (4 with case-study pages, 12 hosted elsewhere) |
| Featured projects on the home page | 4 |
| Blog posts | 4 (shown 2 at a time) |
| Experience entries | 6 roles, 2015 to present |
| Uses / toolkit rows | 15 across 4 cards |
| Site-search index entries | 17 |
| Placeholder images | 13 labelled SVGs |
| `data-section` regions | 24 types, 127 instances |
| `data-component` components | 71 types, 551 instances |

### Quality-control gates

| Gate | Result |
|---|---|
| 13. Technology | **Pass:** HTML, CSS and vanilla JavaScript only. No framework, UI library, icon kit, PHP, backend, build step or remote runtime dependency; `assets/vendor/` is gone and nothing loads from the network. Verified by `Websites/tools/qc/qc.js`: **failures=0, warnings=0**. The lightbox is the native `<dialog>` element. |
| 14. Completeness | **Pass:** 19 pages and the 3 required documents are present. Automated link audit of every `href`/`src`, every CSS `url()` and every page reference in the JS: **0 broken, 0 orphan assets, 0 `href="#"` placeholders.** |
| 15. Structure | **Pass (automated):** every page carries `header`, a labelled `nav`, `main` and `footer` with `data-section`; sidebars use `aside`. On the home page the sticky rail *is* the `header`, as on the source. 551 `data-component` instances. |
| 16. Interaction | **Pass: 91/91 scripted Playwright checks** over `file://` (theme toggle and persistence, archive sort/filter/search, writing filter and show-more, dialog lightbox, forms, navigation, clock, copy buttons, reduced motion). **0 JavaScript console errors.** |
| 17. Accessibility review | **Automated pass:** axe-core 4.10.2 (`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`) found **0 violations in 57 runs** — all 19 pages at 1280px light, 375px light and 1280px dark. Also scripted: no horizontal scroll at 375px on any page, and nothing left hidden under `prefers-reduced-motion`. **Not tested:** manual keyboard walkthrough, screen readers, 200%/400% text zoom. |
| 18. Traceability | **Pass:** this README, `fidelity-notes.md` and `component-inventory.json` were generated from the delivered files and the QC report. The inventory records which components a script exercised. |
| 19. Scope | **Pass, with additions:** the source is a one-page site plus an archive; the brief requires a full portfolio page set, so 17 pages are intentional additions, each labelled in the page-to-source mapping below. |

Automated results support a WCAG 2.2 AA–oriented baseline. They are not a conformance claim.

---

## About Priya Raman

**Priya Raman** is a fictional frontend engineer in Boston. This static site copies the *structure* of a real software-engineer portfolio ([brittanychiang.com](https://brittanychiang.com/)): a fixed identity rail carrying the name, role, one-line pitch, section anchor nav and social icons; a scrolling content column of About, Experience, Projects and Writing; a résumé link; and a separate full project archive. All names, employers, projects, figures and images are invented or placeholders.

> Not a real person. The phone number uses the 555 range and the email address uses the reserved `.example` domain. Outbound "profile" links point at platform home pages, never at a real account.

## Run it

Open `index.html`. Every page works over `file://`, offline: there is nothing to install and no network request of any kind. A static server (`python3 -m http.server`) also works if a tool needs `http://` URLs.

## Stack and constraints

| Used | Not used |
|---|---|
| HTML5, CSS3, vanilla JavaScript (a module object of init functions) | React, Vue, Angular or any other framework |
| UI primitives written for this replica: dropdown, slide-in navigation, disclosure, dialog, form controls and layout utilities | Bootstrap, jQuery, Tailwind, icon fonts or any third-party library |
| Native `<dialog>` for the lightbox; `localStorage` for the theme only | Raster images, icon fonts, third-party scripts |

**Shared top bar and footer** are copied in full into every page, so each page is complete on its own. The home page deliberately has **no top bar**: its sticky rail is the header, exactly as on the source.

## File tree

```
PORT-02/
├── index.html                      One-page home: sticky identity rail (name, role, pitch, anchor
│                                   nav, site nav, socials, theme toggle, clock) + scrolling
│                                   About / Experience / Projects / Writing / Contact column
├── archive.html                    Full project archive: 16 rows, sortable columns, technology
│                                   chips, text search, focusable scroll region
├── project-fretboard.html          Case study: offline tab editor
├── project-umbra-theme.html        Case study: contrast-first editor theme
├── project-transit-clock.html      Case study: hallway departures board
├── project-ramanbuilds-v4.html     Case study: this site
├── writing.html                    Writing: tag chips, search, show-more, sidebar + newsletter
├── post-tab-order.html             Post (accessibility, process)
├── post-contrast-first.html        Post (accessibility, craft)
├── post-budgets-beat-opinions.html Post (performance, process)
├── post-component-nobody-uses.html Post (design systems, craft)
├── about.html                      Bio, how I work, background, sidebar with availability
├── resume.html                     Print-friendly CV, download, print button, skill cards
├── uses.html                       Toolkit: 4 cards, 15 rows
├── contact.html                    Validated enquiry form + availability sidebar
├── search.html                     Client-side site search over a 17-entry index (?q=)
├── accessibility.html              Accessibility statement
├── colophon.html                   How the site is built; annotation conventions
├── 404.html                        Not found: search form and popular destinations
├── css/styles.css                  All custom styles. Dark palette first; light palette for the
│                                   system setting and for the explicit toggle
├── js/main.js                      Site data, then a module object of named init functions
├── assets/img/*.svg                13 labelled placeholder images
├── assets/priya-raman-resume.txt   Downloadable demo resume
├── component-inventory.json        Every data-section and data-component: selector, pages,
│                                   behaviour, keyboard, verification status
├── fidelity-notes.md               What matches the original, what was adapted, added, left out
└── README.md
```

## Annotation conventions

- **`data-section="…"`** marks every layout region: `header`, `rail`, `primary-nav`, `main`, `page-header`, `sidebar`, `footer`, plus named bands such as `about`, `experience`, `projects`, `writing`, `archive`. 24 types.
- **`data-component="…"`** marks every interactive or repeated component. 71 types; see `component-inventory.json`.
- **`data-form="…"`** names each form for the shared validator (`enquiry`, `newsletter`).

## Simulated backend behaviour

| Feature | What happens |
|---|---|
| Enquiry form | Validated in the browser: required fields, email shape, a 12-character minimum on the message, consent checkbox. Failures raise an error summary that takes focus and links to each field. Success replaces the form with a panel carrying a reference (`EN-####`) and the address that would have been written to. Nothing is sent. |
| Newsletter (writing sidebar) | Same validator, reference prefix `NE-`. Nothing is stored. |
| Theme | Stored in `localStorage` under `pr-theme` and applied before first paint by a four-line inline script, so the page never flashes the wrong palette. Without a stored choice the site follows `prefers-color-scheme`. |
| Availability badge and clock | Computed from `SITE.hours` in `America/New_York`, refreshed every minute, expressed in text as well as colour. |
| Archive sort, filter and search | Entirely client-side over data in the markup; `aria-sort` and a polite live region report the state. |
| Copy email / copy permalink | `navigator.clipboard` with an `execCommand` fallback; the outcome, including a blocked clipboard, is announced politely. |
| Resume download | A real plain-text file in `assets/`. No PDF generator is bundled. |

## Testing aids

- **`?demo-time=YYYY-MM-DDTHH:MM`** forces the owner's own wall clock for that page load, so the desk state is reproducible in any time zone. `index.html?demo-time=2026-11-08T11:00` is a Sunday ("Away from the keyboard"); `?demo-time=2026-11-10T11:00` is a Tuesday ("At the keyboard").
- **URL parameters:** `archive.html?tech=React`, `writing.html?tag=accessibility`, `writing.html?q=budget`, `search.html?q=contrast`.
- **Theme:** clear it with `localStorage.removeItem('pr-theme')` to fall back to the system setting.
- **Deep links:** `index.html#projects`, `uses.html#uses-testing`.

## Accessibility baseline (WCAG 2.2 AA)

Built in:
- Skip link and landmarks on every page; on the home page the rail is the `header` and sits beside `main` rather than inside it.
- One `h1` per page, no skipped heading levels (checked by script on all 19 pages).
- A 3px focus indicator offset outside the component, in a colour reserved for focus in both themes.
- Targets at least 24×24 CSS px; most are 44px (2.5.8).
- Forms: visible labels, `autocomplete` tokens (1.3.5), inline errors linked by `aria-describedby` with `aria-invalid`, an error summary that takes focus (3.3.1, 3.3.3).
- The archive's sort state is exposed with `aria-sort` and announced in a polite live region (4.1.3); the wide table sits in a focusable, labelled scroll region so it can be scrolled from the keyboard.
- The theme toggle reports state with `aria-pressed` and announces the change politely.
- The pointer spotlight is decorative, `aria-hidden`, and removed entirely under `prefers-reduced-motion` or on devices without hover (2.3.3).
- Status in text as well as colour (1.4.1); external links say so in visually hidden text.
- No horizontal scroll at 375px on any page; standalone tables reflow rather than forcing the page wide (1.4.10).

Automated results at delivery (2026-11-09):
- **axe-core 4.10.2:** 0 violations across **57 runs** (19 pages × 1280 light, 375 light, 1280 dark).
- **91/91 scripted Playwright checks**, 0 JavaScript console errors.
- **Repo QC gate (`Websites/tools/qc/qc.js`):** failures=0, warnings=0.
- **Static audit:** 0 broken links, 0 duplicate ids, 0 unresolved `aria-*` references, 0 unlabelled form controls, 0 images without `alt`, 0 heading-order jumps.

Not done: manual screen reader testing, manual keyboard walkthrough, 200%/400% zoom checks, and testing with real users.

## Page-to-source mapping

| Replica page | Source basis |
|---|---|
| `index.html` | The brittanychiang.com home page: fixed identity rail with anchor nav and social row, scrolling About / Experience / Projects / Writing column, résumé and archive links |
| `archive.html` | The source's `/archive` page: a full project table with year, title, made at and built with; sorting, filtering and search are additions |
| `project-*.html` (4) | Intentional addition: the source's project entries link out rather than to case studies |
| `writing.html` | Intentional addition: the source lists articles on the home page and links to external platforms |
| `post-*.html` (4) | Intentional addition; all content is original |
| `about.html` | Expanded from the source's About section |
| `resume.html` | The source links to a résumé PDF; this is an on-page, print-ready equivalent plus a downloadable text file |
| `uses.html` | Intentional addition (brief requirement) |
| `contact.html` | Intentional addition: the source offers email only, which is kept in the rail and footer |
| `search.html` | Intentional addition (client-side site search) |
| `accessibility.html` | Intentional addition (accessibility statement for the test baseline) |
| `colophon.html` | Intentional addition; mirrors the source's "built with" footer credit, expanded |
| `404.html` | Intentional addition (required by the protocol) |
