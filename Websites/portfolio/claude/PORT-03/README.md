# PORT-03: Juno Salvi

## Protocol record (WEB-REPLICA-V1.0)

| Field | Value |
|---|---|
| Replica ID | PORT-03 |
| Category | personal portfolio: motion / 3D designer (gallery-first stratum) |
| Fictional branding | Juno Salvi, 3D & motion designer, Stockholm (fictional one-person studio; `.example` email) |
| Approved source | Andreas Wannerstedt, https://andreaswannerstedt.se/ (Adobe Portfolio) |
| Source verification | Fetched live on 2026-11-09 and confirmed as a working portfolio: wordmark plus a two-item nav (Projects, About), a dense grid of project tiles, about 39 project detail pages at root-level slugs, a social icon row and a back-to-top footer. Structure recorded from that page; no markup, copy or assets were copied. |
| Run locally | Open `index.html` in a browser. No server, build step or network needed. |
| Layout | `*.html` pages, `css/styles.css`, `js/main.js`, `assets/` (SVG placeholders, vendor/bootstrap, vendor/jquery), `README.md`, `fidelity-notes.md`, `component-inventory.json` |
| Deviations | **None outstanding.** The replica was first built with Bootstrap 5.3.3 and jQuery 3.7.1 on the project lead's instruction, which conflicted with `RULES.md` section 2. The conflict was reported and the lead chose removal: on 2026-11-10 both libraries were deleted and the dropdown, slide-in navigation, disclosures were reimplemented in vanilla JS and CSS. **No PHP**: shared partials are inlined into every page, so the site runs from `file://`. |

### Sample data

| Data | Count |
|---|---|
| Pages | 19 (including 404) |
| Projects in the gallery | 9 (5 with case studies, 4 hosted elsewhere) |
| Case-study carousel slides | 4 per case study |
| Showreel chapters | 6 |
| Notes (journal) | 3 |
| Service packages | 4, with a live estimator |
| Client wall entries | 10 |
| Site-search index entries | 17 |
| Placeholder images | 16 labelled SVGs |
| `data-section` regions | 26 types, 132 instances |
| `data-component` components | 71 types, 551 instances |

### Quality-control gates

| Gate | Result |
|---|---|
| 13. Technology | **Pass:** HTML, CSS and vanilla JavaScript only. No framework, UI library, icon kit, PHP, backend, build step or remote runtime dependency; `assets/vendor/` is gone and nothing loads from the network. Verified by `Websites/tools/qc/qc.js`: **failures=0, warnings=0**. The carousel and the loop marks are hand-written. |
| 14. Completeness | **Pass:** 19 pages and the 3 required documents are present. Automated link audit of every `href`/`src`, every CSS `url()` and every page reference in the JS: **0 broken, 0 orphan assets, 0 `href="#"` placeholders.** |
| 15. Structure | **Pass (automated):** every page carries `header`, a labelled `nav`, `main` and `footer` with `data-section`; sidebars use `aside` and no `aside` is nested inside another landmark. 551 `data-component` instances. |
| 16. Interaction | **Pass: 98/98 scripted Playwright checks** over `file://` (motion control, loop animation state, carousel, view switcher, filters, estimator, reel chapters, forms, navigation, clock, copy buttons, reduced motion). **0 JavaScript console errors.** |
| 17. Accessibility review | **Automated pass:** axe-core 4.10.2 (`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`) found **0 violations in 57 runs** — all 19 pages at 1280px light, 375px light and 1280px dark. Also scripted: no horizontal scroll at 375px, loops stopped outright under `prefers-reduced-motion`, and the carousel refusing to autoplay. **Not tested:** manual keyboard walkthrough, screen readers, 200%/400% text zoom, captions (no video is bundled). |
| 18. Traceability | **Pass:** this README, `fidelity-notes.md` and `component-inventory.json` were generated from the delivered files and the QC report. |
| 19. Scope | **Pass, with additions:** the source is a project grid, an about page and project detail pages. The brief requires a full portfolio page set, so the reel, services, notes, contact, search, colophon, accessibility and 404 pages are intentional additions, each labelled in the mapping below. |

Automated results support a WCAG 2.2 AA–oriented baseline. They are not a conformance claim.

---

## About Juno Salvi

**Juno Salvi** is a fictional one-person 3D and motion studio in Stockholm. This static site copies the *structure* of a real motion designer's portfolio ([andreaswannerstedt.se](https://andreaswannerstedt.se/)): a minimal wordmark header, a dense gallery of project tiles as the primary navigation, one detail page per project, a short about page and a social row. All names, clients, projects, awards and images are invented or placeholders.

> Not a real studio. The email address uses the reserved `.example` domain, outbound "profile" links point at platform home pages, and the awards are fictional.

## Run it

Open `index.html`. Every page works over `file://`, offline: there is nothing to install and no network request of any kind. A static server (`python3 -m http.server`) also works if a tool needs `http://` URLs.

## Stack and constraints

| Used | Not used |
|---|---|
| HTML5, CSS3, vanilla JavaScript (named features on a registry, each fault-isolated) | React, Vue, Angular or any other framework |
| UI primitives written for this replica: dropdown, slide-in navigation, disclosure, dialog, form controls and layout utilities | Bootstrap, jQuery, Tailwind, icon fonts or any third-party library |
| CSS animations on inline SVG marks; a hand-written carousel | Video files, raster images, icon fonts, third-party scripts |

**Shared header and footer** are copied in full into every page, so each page is complete on its own.

## File tree

```
PORT-03/
├── index.html                       Gallery home: hero, five selected tiles, client wall,
│                                    client quote, service cards, studio teaser, availability
├── work.html                        Nine-project gallery: kind filter, text search,
│                                    grid/list view switcher, result count, empty state
├── project-brass-pendulum.html      Case study: looping animation
├── project-nordvik-handheld.html    Case study: product film
├── project-terminal-four.html       Case study: multi-screen installation
├── project-marble-parade.html       Case study: title sequence
├── project-satisfying-objects.html  Case study: loop series
├── reel.html                        Showreel: demo player, six chapters, details sidebar
├── services.html                    Four packages, a browser-side estimator, the process
├── about.html                       The studio: how work is made, tools, teaching, awards
├── notes.html                       Journal index
├── note-half-speed.html             Note: why I render at half speed
├── note-a-loop-is-a-promise.html    Note: where loops break
├── note-motion-permission.html      Note: motion that asks permission
├── contact.html                     Brief form with date and budget + availability sidebar
├── search.html                      Client-side site search over a 17-entry index (?q=)
├── accessibility.html               Accessibility statement, motion first
├── colophon.html                    How the site is built; annotation conventions
├── 404.html                         Not found: search form and popular destinations
├── css/styles.css                   All custom styles; light palette with a dark palette
│                                    under prefers-color-scheme
├── js/main.js                       Site data, then named features on a registry
├── assets/img/*.svg                 16 labelled placeholder images
├── component-inventory.json         Every data-section and data-component
├── fidelity-notes.md                What matches the original, what was adapted or added
└── README.md
```

## Annotation conventions

- **`data-section="…"`** marks every layout region: `header`, `primary-nav`, `main`, `hero`, `page-header`, `sidebar`, `footer`, plus named bands such as `selected-work`, `clients`, `work-index`, `case-body`, `reel`, `services`, `estimator-region`, `note-index`. 26 types.
- **`data-component="…"`** marks every interactive or repeated component. 71 types; see `component-inventory.json`.
- **`data-form="…"`** names each form for the shared validator (`brief`).

## Simulated backend behaviour

| Feature | What happens |
|---|---|
| Brief form | Validated in the browser: required fields, email shape, a 12-character minimum on the brief, consent checkbox. Failures raise an error summary that takes focus and links to each field. Success shows a reference (`BR-####`) and the address that would have been written to. Nothing is sent. |
| Estimator | Computes a range from the rates in `js/main.js` (kind, length in seconds, revision rounds, rush multiplier) and announces it in a polite live region. Indicative only; no quote is binding. |
| Showreel | A labelled demo player. No video file is bundled with this replica, so the play button and the six chapter buttons cue a section and say so in text and in a live region. |
| Availability badge and studio clock | Computed from `SITE.hours` in `Europe/Stockholm`, refreshed every minute, expressed in text as well as colour. |
| Gallery filter, search and view | Entirely client-side; the result count reports the filter, the search term and the current view. |
| Copy email / copy permalink | `navigator.clipboard` with an `execCommand` fallback; the outcome, including a blocked clipboard, is announced politely. |

## Testing aids

- **`?demo-time=YYYY-MM-DDTHH:MM`** forces the studio's own wall clock for that page load. `index.html?demo-time=2026-11-08T11:00` is a Sunday ("Out of the studio"); `?demo-time=2026-11-10T11:00` is a Tuesday ("In the studio").
- **URL parameters:** `work.html?kind=installation`, `search.html?q=loop`.
- **Motion:** the header control pauses every loop; emulating `prefers-reduced-motion: reduce` starts the page paused and removes the animations outright.
- **Reset:** nothing is persisted — no storage, no cookies. Reloading restores the initial state.

## Accessibility baseline (WCAG 2.2 AA)

Motion, which is the interesting part on this site:
- Nothing animates for a visitor who asks for reduced motion: the loop animations are removed in CSS, not merely paused, and the carousel refuses to start.
- One **Motion** control in the header stops every loop on the page at once (2.2.2), reports state with `aria-pressed`, and announces the change politely.
- The carousel never autoplays on load, pauses on hover and on focus, and is driveable with the arrow keys.
- Loop marks are decorative inline SVG, `aria-hidden`, carrying no information that is not also in text. They are inline rather than `<img>` precisely so one control can pause them.

The rest:
- Skip link and landmarks on every page; no `aside` nested inside another landmark.
- One `h1` per page, no skipped heading levels (checked by script on all 19 pages).
- A 3px focus indicator offset outside the component; gallery tiles show a ring when the title link is focused.
- Targets at least 24×24 CSS px; most are 44px, and chapter rows are 48px.
- Forms: visible labels, `autocomplete` tokens, inline errors with `aria-invalid`, an error summary that takes focus.
- Filter, view, slideshow and estimator changes announced in polite live regions.
- Status in text as well as colour; external links say so in visually hidden text.
- No horizontal scroll at 375px on any page.

Automated results at delivery (2026-11-10):
- **axe-core 4.10.2:** 0 violations across **57 runs** (19 pages × 1280 light, 375 light, 1280 dark).
- **98/98 scripted Playwright checks**, 0 JavaScript console errors.
- **Repo QC gate (`Websites/tools/qc/qc.js`):** failures=0, warnings=0.
- **Static audit:** 0 broken links, 0 duplicate ids, 0 unresolved `aria-*` references, 0 unlabelled form controls, 0 images without `alt`, 0 heading-order jumps.

Not done: manual screen reader testing, manual keyboard walkthrough, 200%/400% zoom checks, caption and audio-description review (no video is bundled), and testing with real users.

## Page-to-source mapping

| Replica page | Source basis |
|---|---|
| `index.html` | The source's project grid as a home page, with the wordmark header and social row kept; the client wall, quote, service cards and studio teaser are additions |
| `work.html` | The source's `/projects` grid, expanded with a kind filter, text search and a grid/list switcher (brief requirements) |
| `project-*.html` (5) | Mirrors the source's one-page-per-project detail pages; the carousel, spec table, credits and prev/next are additions |
| `reel.html` | Intentional addition: the source links to Vimeo rather than hosting a reel page |
| `services.html` | Intentional addition (brief requirement), with an estimator as this replica's distinctive interactive element |
| `about.html` | Mirrors the source's `/about` page, expanded with process, tools, teaching and awards |
| `notes.html`, `note-*.html` (3) | Intentional addition (brief requirement); all content is original |
| `contact.html` | Intentional addition: the source offers an email address only, which is kept in the header area and footer |
| `search.html` | Intentional addition (client-side site search) |
| `accessibility.html` | Intentional addition (accessibility statement for the test baseline) |
| `colophon.html` | Intentional addition; replaces the source's platform credit line |
| `404.html` | Intentional addition (required by the protocol) |
