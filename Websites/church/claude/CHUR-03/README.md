# CHUR-03: Saint Aldric's Church (fictional)

| Field | Value |
| --- | --- |
| Replica ID | CHUR-03 (slot 3, model group `claude`) |
| Category / stratum | church / small community congregation |
| Fictional branding | "Saint Aldric's Church, Millstone Cove": invented name, people, address (`401-555-0142`, `office@example.org`) and copy. The logo and every image are original local SVGs. |
| Approved source (research metadata only) | Holy Trinity Episcopal Church, Tiverton, RI: <https://holytrinitychurch.org/> |
| Source verification | From the project lead's research inventory: 2026-11-10, HTTP GET via curl, home page 200, title "Holy Trinity Episcopal Church – Tiverton", all 13 mapped URLs 200. On 2026-11-11 this run re-fetched the 13 URLs with curl (all 200) and read their headings and form counts. Layout, CSS and external services were not inspected. |
| Approval | The project lead approved this source in the research inventory and **waived the Phase A approval stop** (orchestrator brief, 2026-11-10). |
| Model / runtime | `claude-sonnet-5-5` via a pi-subagents worker agent, orchestrated by `claude-opus-5-5`. See `generation-metadata.json`. |
| Protocols | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 |

## Run locally

Open `index.html` in a browser (double-click works; no server, no build, no network). Everything uses relative paths and inline JavaScript data. (The HTML pages were assembled with a throwaway generator kept outside the repository; the delivered files are plain static HTML, CSS and JS.)

## Sitemap and source mapping

| Local page | Reference page |
| --- | --- |
| `index.html` | `/` Home |
| `who-we-are.html` | `/who-we-are/` |
| `history.html` | `/who-we-are/history/` |
| `vestry.html` | `/who-we-are/vestry/` (Staff & Vestry) |
| `rector.html` | `/who-we-are/search-process/` (nav label "Rector") |
| `special-services.html` | `/who-we-are/special-services/` |
| `education.html` | `/who-we-are/education/` (nav label "Adult Formation") |
| `what-we-believe.html` | `/what-we-believe/` |
| `what-we-do.html` | `/what-we-do/` (Outreach & Community) |
| `giving.html` | `/stewardship/giving/` |
| `announcements.html` | `/announcements/` |
| `thrift-shop.html` | `/thrift-shoppe/` |
| `contact.html` | `/contact-us/` |
| `calendar.html` | Calendar nav item (an external site on the reference; local stand-in, intentional addition) |
| `404.html` | none (required by the protocol) |

13 reference pages mapped + 1 local calendar + 404 = 15 HTML pages. Support files: `css/styles.css`, `js/main.js`, 7 SVGs in `assets/`, and the four documentation/metadata files. 28 files in total.

## Feature checklist

- [x] Skip link, one h1 per page, landmarks, `data-section` / `data-component` metadata
- [x] Primary nav with two dropdowns (Who We Are, Giving) as link + disclosure button, `aria-expanded`, Escape closes; mobile Menu disclosure
- [x] Accordions (4 instances) with expand/collapse all
- [x] Service times, staff and vestry, rector profile, beliefs, history, special services, adult formation, thrift shop, directions
- [x] Footer with Mailing Address / Map / Office Hours on every page (as the reference)
- [x] Intentional additions, each labeled on the page: ministry finder, announcement search/filter, local events calendar with details dialog, giving form (simulation), contact form (simulation)
- [x] Inline error messages, error summary with links, focus moved to summary, demo success state
- [x] 404 page with routes back to the site
- Not present because the reference has none: sermon/media archive, prayer-request form, ministries finder (added anyway, see above), live-stream, member login

## Sample data counts

11 ministries, 6 announcements, 11 events (Nov 2026 to Jan 2027; February 2027 is deliberately empty to exercise the empty state), 8 vestry members, 4 staff, 6 FAQ items, 6 special services. All in `js/main.js` or the HTML.

## Interaction simulation notes

- Giving and contact forms validate locally and show a **demo success message**. No data is sent or stored, no payment is taken; both forms say so.
- Calendar "Details" opens a local dialog; there is no registration.
- The welcome video is a static placeholder image; there is no media playback.
- Email and phone links (`mailto:`, `tel:`) use fictional contact details.

## QC gates (RULES.md section 9)

Evidence: `node Websites/tools/qc/qc.js Websites/church/claude/CHUR-03`, run 2026-11-11 (see "Final run" below), plus the scripted checks described under it.

| Gate | Result | Basis |
| --- | --- | --- |
| 13. Technology | **pass** | qc.js: no prohibited file types or libraries, no remote requests at runtime (every page loaded under Chromium with request logging), no `fetch`/`XMLHttpRequest` warnings. Hand-checked: no CDNs or web fonts (system font stacks), no build step needed. |
| 14. Completeness | **pass** | qc.js: all required files present, JSON valid, 0 broken links or asset paths across 15 pages. |
| 15. Structure | **pass (partial evidence)** | qc.js: `main#main-content`, skip link, `lang`, `data-section`/`data-component` on every page. Section order was compared with the reference's heading outline, not with its rendered layout. |
| 16. Interaction | **pass** | Scripted Playwright run, 32 checks, all passed (flows below). Forms disclose simulation. |
| 17. Accessibility review | **partial** | axe-core (WCAG 2.0 to 2.2 A/AA plus best-practice) at 1280px and 375px on all 15 pages: 0 violations. Also 0 violations in these states: giving and contact error states, FAQ expanded, calendar dialog open, calendar empty state, open dropdown (1280px) and open mobile menu (375px). No horizontal scroll at 375px (qc.js). Keyboard behavior was checked by a script, not by a person. |
| 18. Traceability | **pass** | `component-inventory.json` and `fidelity-notes.md` were written from the delivered files; counts above were taken from the files. |
| 19. Scope | **pass** | 13 reference pages plus 1 local calendar. Additions are labeled and listed in `fidelity-notes.md`. |

### Final run

`QC <path>` then `pages=15 files=28 failures=0 warnings=0` (qc.js, 2026-11-11). The first run before documentation existed reported only the four missing documentation files.

### Flows checked by script (Playwright, Chromium, file://)

Skip link; dropdown open with Enter and close with Escape with focus return (1280px); ministry search, category filter and empty state; calendar month filter, empty state (Feb 2027), dialog open/focus/Escape/focus restore; announcement search; accordion Space and expand all; contact form empty, invalid and valid submissions with summary, `aria-invalid` and focus; giving form empty submit, Other-amount rule and success; mobile Menu, submenu and two-step Escape (375px).

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack): not tested.
- A human keyboard-only walkthrough: not done; only the scripted keyboard flows above.
- 200% and 400% zoom, text-spacing overrides, forced-colors and high-contrast modes: not tested.
- Browsers other than Chromium; real mobile devices: not tested.
- Reduced-motion behavior: the CSS has a `prefers-reduced-motion` rule and the site has almost no motion; not run with the preference set.
- Color contrast was checked only by axe's automatic rules; gradients and images are not present.
- No claim of WCAG conformance is made. This is a WCAG 2.2 AA-oriented baseline checked by automated tools and a script.
- Visual fidelity to the reference was not measured; the reference was not screenshotted.

## Known limitations

- Filters render results with JavaScript; with scripting disabled the lists are empty (inline data was chosen over `fetch`).
- The nine-item primary nav fits one line at 1280px but wraps to two lines at 1000 to 1024px (measured); it collapses to the Menu button below 992px.
- Hover opens the dropdowns on pointer devices (and syncs `aria-expanded`); keyboard and touch users use the arrow button next to the link.
- Dialog uses the native `<dialog>` element, which needs a current browser.
