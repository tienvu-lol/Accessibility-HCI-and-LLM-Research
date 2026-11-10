# PORT-01: Tobias Quill

## Protocol record (WEB-REPLICA-V1.0)

| Field | Value |
|---|---|
| Replica ID | PORT-01 |
| Category | personal portfolio: minimal one-page personal site (simplest stratum of the 10-site set) |
| Fictional branding | Tobias Quill, interactive developer & creative technologist, Portland, Oregon (fictional person; 555 phone number, `.example` email) |
| Approved source | The Curious Creations of Tim Holman, https://tholman.com/ |
| Source verification | Fetched live on 2026-11-09 and confirmed as a working single-page personal site; structure (header, contact/social row, intro, link lists of toys and experiments, roles, talks and podcasts) recorded from that page. Visual design was not measured in a browser; no markup, copy or assets were copied. |
| Run locally | Open `index.html` in a browser. No server, build step or network needed. |
| Layout | `*.html` pages, `css/styles.css`, `js/main.js`, `assets/` (SVG placeholders, resume text, vendor/bootstrap, vendor/jquery), `README.md`, `fidelity-notes.md`, `component-inventory.json` |
| Deviations | **None outstanding.** The replica was first built with Bootstrap 5.3.3 and jQuery 3.7.1 on the project lead's instruction, which conflicted with `RULES.md` section 2. The conflict was reported and the lead chose removal: on 2026-11-10 both libraries were deleted and the dropdown, slide-in navigation, disclosures, the accordion and the image dialog were reimplemented in vanilla JS and CSS. **No PHP**: shared partials are inlined into every page, so the site runs from `file://`. |

### Sample data

| Data | Count |
|---|---|
| Pages | 23 (including 404) |
| Projects in the work grid | 9 (5 case studies with their own pages, 4 toys hosted elsewhere) |
| Blog posts | 6 (3 per listing page) |
| Talks and podcast appearances | 6 |
| Uses / toolkit rows | 19 across 4 disclosures |
| Site-search index entries | 21 |
| Experience timeline entries | 4 roles (5 on the about page, including education) |
| Placeholder images | 20 labelled SVGs |
| `data-section` regions | 31 types, 205 instances |
| `data-component` components | 75 types, 927 instances |

### Quality-control gates

| Gate | Result |
|---|---|
| 13. Technology | **Pass:** HTML, CSS and vanilla JavaScript only. No framework, UI library, icon kit, PHP, backend, build step or remote runtime dependency; `assets/vendor/` is gone and nothing loads from the network. Verified by `Websites/tools/qc/qc.js`: **failures=0, warnings=0**. The image viewer is the native `<dialog>` element. |
| 14. Completeness | **Pass:** 23 pages and the 3 required documents are present. Automated link audit of every `href`/`src` in the HTML, every `url()` in the CSS and every page reference in the JS: **0 broken, 0 orphan assets, 0 `href="#"` placeholders.** |
| 15. Structure | **Pass (automated):** every page carries `header`, a labelled `nav` (two or three per page), `main` and `footer` with `data-section`; sidebars use `aside`. 927 `data-component` instances. The region hierarchy was compared with the source during the build; there was no independent review. |
| 16. Interaction | **Pass: 93/93 scripted Playwright checks** over `file://` (navigation, forms, filters, pagination, search, lightbox, accordions, clock, copy buttons, mobile nav). **0 JavaScript console errors.** Every simulated flow states that it is a demo. |
| 17. Accessibility review | **Automated pass:** axe-core 4.10.2 (`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`) found **0 violations in 69 runs** — all 23 pages at 1280px light, 375px light and 1280px dark. Also scripted: no horizontal scroll at 375px on any page, and no content left hidden under `prefers-reduced-motion`. **Not tested:** manual keyboard walkthrough, screen readers, 200%/400% text zoom. |
| 18. Traceability | **Pass:** this README, `fidelity-notes.md` and `component-inventory.json` were generated from the delivered files and from the QC report. The inventory records which components a script exercised and which were not. |
| 19. Scope | **Pass, with additions:** the source is a one-page site; the brief requires a full portfolio page set, so 22 pages are intentional additions. Every one is labelled in the page-to-source mapping below and in `fidelity-notes.md`. |

Automated results support a WCAG 2.2 AA–oriented baseline. They are not a conformance claim.

---

## About Tobias Quill

**Tobias Quill** is a fictional interactive developer in Portland, Oregon. This static site copies the *structure* of a real minimal one-page personal site ([The Curious Creations of Tim Holman](https://tholman.com/)): a text-first single column, no imagery in the header, a contact and social row directly under the name, long link lists of toys and experiments, a short professional history and a talks list. All names, copy, projects, employers and images are invented or placeholders.

> Not a real person. The phone number uses the 555 range and the email address uses the reserved `.example` domain. Outbound "profile" links point at platform home pages, never at a real account.

## Run it

Open `index.html`. Every page works over `file://`, offline: there is nothing to install and no network request of any kind. A static server (`python3 -m http.server`) also works if a tool needs `http://` URLs.

## Stack and constraints

| Used | Not used |
|---|---|
| HTML5, CSS3, vanilla JavaScript (one IIFE, no modules, no bundler) | React, Vue, Angular or any other framework |
| UI primitives written for this replica: dropdown, slide-in navigation, disclosure, dialog, form controls and layout utilities | Bootstrap, jQuery, Tailwind, icon fonts or any third-party library |
| System font stacks and 20 generated SVG placeholders | Raster images, icon fonts, third-party scripts |

**Shared header and footer.** Both are copied in full into every HTML file, so each page is complete on its own and the raw source matches what the browser renders. To change the navigation, find-and-replace the same block across all `*.html` files.

## File tree

```
PORT-01/
├── index.html                       One-page home: hero, availability card, anchor nav,
│                                    contraption link lists, selected work, writing, experience,
│                                    talks, elsewhere + newsletter
├── work.html                        9-project grid with tag chips and client-side text search
├── project-cursor-weather.html      Case study: canvas toy
├── project-keyboard-garden.html     Case study: hardware + accessibility
├── project-tiny-orrery.html         Case study: SVG teaching tool
├── project-paper-plotter.html       Case study: plotter toolchain and a stencil typeface
├── project-focus-ring-museum.html   Case study: accessibility research
├── writing.html                     Blog listing: search, tag chips, 3-per-page pagination, sidebar
├── post-making-it-rain.html         Post (canvas, toy)
├── post-focus-rings-furniture.html  Post (accessibility, craft)
├── post-twelve-small-tools.html     Post (tooling, craft)
├── post-plotting-400-pages.html     Post (hardware, type)
├── post-teaching-with-toys.html     Post (teaching, craft)
├── post-in-praise-of-small-pages.html  Post (craft, tooling)
├── about.html                       Bio, "how I work" accordion, history timeline, elsewhere
├── resume.html                      Print-friendly CV, download, print button, skills, education
├── uses.html                        Toolkit: 4 accordion sections, 19 rows
├── talks.html                       6 talks and podcasts with anchors, plus speaking terms
├── contact.html                     Validated enquiry form + availability sidebar
├── search.html                      Client-side site search over a 21-entry index (?q=)
├── accessibility.html               Accessibility statement
├── colophon.html                    How the site is built; annotation conventions
├── 404.html                         Not found: search form and popular destinations
├── css/styles.css                   All custom styles; design tokens at the top, dark palette
│                                    under prefers-color-scheme
├── js/main.js                       Site data (availability, projects, posts, talks, search index)
│                                    then all behaviour in one IIFE
├── assets/img/*.svg                 20 labelled placeholder images
├── assets/tobias-quill-resume.txt   Downloadable demo resume
├── component-inventory.json         Every data-section and data-component: selector, pages,
│                                    behaviour, keyboard, verification status
├── fidelity-notes.md                What matches the original, what was adapted, added or left out
└── README.md
```

## Annotation conventions

- **`data-section="…"`** marks every layout region: `header`, `utility-bar`, `brand-bar`, `primary-nav`, `main`, `hero`, `page-header`, `sidebar`, `footer`, and named bands such as `contraptions`, `selected-work`, `experience`, `talks` and `elsewhere`. 31 types.
- **`data-component="…"`** marks every interactive or repeated component. 75 types; see `component-inventory.json`.
- **`data-form="…"`** names each form for the shared validator (`enquiry`, `newsletter`, `sidebar-newsletter`).

Together these make every region and component addressable, so an issue can be logged or planted against a stable selector such as `[data-component="availability-card"]`.

## Simulated backend behaviour

| Feature | What happens |
|---|---|
| Enquiry form (`contact.html`) | Validated in the browser: required fields, email shape, a 12-character minimum on the message, and a consent checkbox. Failures raise an error summary that takes focus and links to each field. Success replaces the form with a panel carrying a generated reference (`EN-####`) and the address that would have been written to. Nothing is sent. |
| Newsletter (home band and every blog sidebar) | Same validator, reference prefix `NE-` / `SI-`. Nothing is stored. |
| Availability badge and studio clock | Computed from `SITE.hours` in `America/Los_Angeles` and refreshed every minute. Shows "at the desk" or "away from the desk" as text, never colour alone. |
| Copy email / copy permalink | `navigator.clipboard` with an `execCommand` fallback; the result, including a blocked-clipboard message, is announced in a polite live region. |
| Project and writing filters, site search | Pure client-side filtering over data in `js/main.js`. No network request of any kind. |
| Resume download | A real plain-text file in `assets/`. No PDF generator is bundled. |

## Testing aids

- **`?demo-time=YYYY-MM-DDTHH:MM`** on any page forces the studio's own wall clock for that page load, so the desk state is reproducible in any time zone. `index.html?demo-time=2026-11-08T11:00` is a Sunday and reads "Away from the desk"; `?demo-time=2026-11-10T11:00` is a Tuesday and reads "At the desk".
- **URL parameters:** `work.html?tag=hardware`, `writing.html?tag=craft`, `writing.html?q=plotter`, `search.html?q=focus`.
- **Deep links:** `talks.html#serious-play`, `index.html#selected-work`, `uses.html#uses-editor`.
- **Reset state:** nothing is persisted — no storage, no cookies. Reloading restores the initial state.

## Accessibility baseline (WCAG 2.2 AA)

Built in:
- Skip link and landmarks on every page (`header`, labelled `nav` ×2–3, `main`, `aside` where there is a sidebar, `footer`).
- One `h1` per page and no skipped heading levels (checked by script on all 23 pages).
- A 3px focus indicator offset outside the component, in a blue reserved for focus only.
- `scroll-padding-top` so the sticky nav never covers a freshly focused element (2.4.11).
- Targets at least 24×24 CSS px; most are 44px (2.5.8).
- Forms: visible labels, `autocomplete` tokens (1.3.5), inline errors linked by `aria-describedby` with `aria-invalid`, an error summary that takes focus (3.3.1, 3.3.3), and a stated required/optional convention.
- Filter, pagination and search counts announced in polite live regions (4.1.3).
- Status conveyed in text as well as colour (1.4.1); external links say so in visually hidden text.
- Scroll-reveal and smooth scrolling disabled under `prefers-reduced-motion` (2.3.3), verified by script.
- Dark palette under `prefers-color-scheme: dark`, scanned by axe at 1280px.
- Help in the same place on every page: the email address and copy button in the utility bar (3.2.6).

Automated results at delivery (2026-11-09):
- **axe-core 4.10.2:** 0 violations across **69 runs** (23 pages × 1280 light, 375 light, 1280 dark).
- **93/93 scripted Playwright checks**, 0 JavaScript console errors.
- **Repo QC gate (`Websites/tools/qc/qc.js`):** failures=0, warnings=0.
- **Static audit:** 0 broken links, 0 duplicate ids, 0 unresolved `aria-*` references, 0 unlabelled form controls, 0 images without `alt`, 0 heading-order jumps.

Not done: manual screen reader testing (NVDA, JAWS, VoiceOver), manual keyboard walkthrough, 200%/400% zoom checks, and testing with real users. Treat the automated results as a baseline, not a conformance claim.

## Page-to-source mapping

| Replica page | Title | Source basis |
|---|---|---|
| `index.html` | The curious contraptions of Tobias Quill | The tholman.com home page: name and role header, contact/social row, short intro, grouped link lists of toys and experiments, professional history, talks and podcasts |
| `work.html` | Work | Expanded from the source's inline project lists into a filterable index (brief requirement) |
| `project-*.html` (5) | Case studies | Intentional addition: the source links out to hosted toys instead of carrying case studies |
| `writing.html` | Writing | Intentional addition; the source has `/post/*` write-ups but no listing page with search or pagination |
| `post-*.html` (6) | Posts | Mirrors the source's `/post/<slug>` write-ups; all content is original |
| `about.html` | About | Expanded from the source's one-paragraph intro and role list |
| `resume.html` | Resume | Intentional addition (brief requirement) |
| `uses.html` | Uses | Intentional addition (brief requirement); fits the source's maker register |
| `talks.html` | Talks & podcasts | Mirrors the source's talks and podcasts section, given its own page |
| `contact.html` | Start a project | Intentional addition: the source offers only a mailto link, which is kept in the utility bar and footer |
| `search.html` | Search | Intentional addition (client-side site search) |
| `accessibility.html` | Accessibility | Intentional addition (accessibility statement for the test baseline) |
| `colophon.html` | Colophon | Intentional addition; mirrors the "how this is built" register common to this genre |
| `404.html` | Page not found | Intentional addition (required by the protocol) |
