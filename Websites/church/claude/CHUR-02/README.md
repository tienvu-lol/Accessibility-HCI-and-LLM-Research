# CHUR-02 - Cathedral of Saint Aurelian (fictional)

- **Replica ID:** CHUR-02 (category `church`, slot 2, model group `claude`, stratum: historic cathedral or parish)
- **Fictional branding:** "Cathedral of Saint Aurelian", Harrowmere. The name, people, address, phone numbers, events and recordings are invented. The logo and all graphics are original SVG placeholders.
- **Approved source (research metadata only):** Cathedral of Saint John the Divine, New York - https://www.stjohndivine.org/
- **Source verification:** from `Websites/pipelines/claude/research/CHUR.md`: 2026-11-10, HTTP GET via curl, home page returned 200, title "Home - Cathedral of Saint John the Divine"; all 16 checked URLs returned 200. I did not re-fetch the source during this run and did not copy any of its text or media.
- **Approval:** approved 2026-11-10. The project lead waived the Phase A approval stop and approved this reference up front.
- **Protocols:** WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 at commit a07e70e (branch websites/claude-replicas).

## Run locally
Open `index.html` in a browser. No server, build step or network is needed; all data is inline in `js/main.js` and forms never send anything.

## Sitemap and source mapping
14 of the 15 source pages in the inventory are mapped, plus `404.html` (15 HTML files in total).

| Local page | Source page |
| --- | --- |
| `index.html` | `/` Home |
| `about.html` | `/about` About |
| `leadership.html` | `/about/leadership` Leadership |
| `visit.html` | `/visit` Plan Your Visit |
| `tours.html` | `/visit/public-guided-tours` Public Guided Tours |
| `services.html` | `/spiritual-life/services` Services |
| `dean-clergy.html` | `/spiritual-life/dean-clergy` Dean & Clergy |
| `music.html` | `/music` Music |
| `choral-ensembles.html` | `/music/choral-ensembles` Choral Ensembles |
| `calendar.html` | `/calendar/` Calendar |
| `watch-listen.html` | `/watch-listen` Watch & Listen |
| `donate.html` | `/support/donate` Donate Now |
| `volunteer.html` | `/education-outreach/volunteer` Volunteer |
| `search.html` | `/search/` Search |
| `404.html` | none (required by RULES.md) |

Not mapped: `/art-ideas` (Art & Ideas), and the Shop utility link.

## Feature checklist
- Utility bar plus primary navigation with six dropdown groups (About, Visit, Spiritual Life, Education & Outreach, Music, Support); button disclosures with `aria-expanded`; mobile "Menu" disclosure; Escape closes.
- Home: today's date, Hours & Admission, Sunday Services, "Live at the Cathedral" next events, season events, "Seeking more?".
- Calendar: month, type and text filters, paging, details dialog, empty state.
- Watch & Listen: search, format and series filters, sort, player placeholder dialog, empty state.
- Site search over pages, events and recordings; empty state.
- Leadership and Volunteer filter lists; Choral Ensembles tabs; Plan Your Visit FAQ accordion.
- Forms (all demos): timed tickets, tour reservation, donation, volunteer interest, newsletter.
- Error summary with links, inline errors, `aria-invalid`, focus moved to the summary; labelled demo success.
- Skip link, landmarks, `data-section` / `data-component` metadata, reduced-motion CSS, 375px reflow.

## Sample data (all in `js/main.js` or static HTML)
- Calendar: 7 weekly rules and 16 one-off events producing 844 generated occurrences between 2026-11-01 and 2027-06-30. Home "next events" starts at the real current date, or at 2026-11-01 when the date is outside that window.
- Media: 12 recordings. People: 10 (Leadership), 4 (Dean & Clergy). Volunteer roles: 7. Ensembles: 6.

## Simulation notes
- Timed tickets, tour reservations, donations, volunteer interest and the newsletter are **simulations**: they validate locally, show a labelled "Demo only" confirmation, and send or store nothing. No payment details are collected.
- Demo-only rules added to exercise errors: Sunday visits start at 1:00 pm; tours run Tuesday to Saturday; custom gift $5 to $10,000.
- Media players are placeholders; no audio or video is included.
- Copy page link uses the Clipboard API when available; otherwise it prints the page address.

## Intentional additions and omissions
Intentional additions (not observed on the source): the demo ticket-price calculator, tour reservation form, volunteer interest form, filter controls on Leadership and Volunteer, FAQ accordion, and an "About this demo site" notice. See `fidelity-notes.md` for the rest.

## QC gates (RULES.md section 9)
Automated run: `node Websites/tools/qc/qc.js Websites/church/claude/CHUR-02` on 2026-11-11, 15 pages, 28 files, **failures=0 warnings=0**. It covers required files, JSON validity, broken links and assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core (WCAG 2.0-2.2 A/AA plus best practices) at 1280px and 375px, and horizontal scroll.

| Gate | Result | Evidence |
| --- | --- | --- |
| 1. Technology | pass | qc.js (prohibited tech, remote requests); hand-written HTML/CSS/JS only; no fetch |
| 2. Completeness | pass | qc.js required files and link/asset audit |
| 3. Structure | pass (partial) | qc.js landmarks and skip link; metadata attributes present; match with the source is based on the research notes, not a fresh visit |
| 4. Interaction | pass (scripted subset) | Playwright script (not shipped), 37 checks, 0 failures: dropdown/Escape/focus return, mobile menu, calendar filters/paging/dialog, media search/sort/empty state, site search, ticket/donate/newsletter/tour errors and ticket/donate success, tabs arrows, accordion, leadership filter |
| 5. Accessibility review | partial | axe-core clean at 1280px and 375px; no horizontal scroll at 375px; focus return and Escape scripted. Keyboard walkthrough, contrast beyond axe, alt-text review, reduced-motion behaviour: not tested |
| 6. Traceability | pass (self-reviewed) | docs written against the final files; component inventory pages from generated HTML |
| 7. Scope | pass (self-reviewed) | 14 of 15 source pages, small sample data |

**Not tested:** screen readers; 200% / 400% zoom and text-spacing overrides; a manual keyboard-only walkthrough; touch devices; browsers other than Chromium; volunteer and tour form success paths; newsletter success path; Copy page link; print layout; no-JavaScript fallback (calendar, media, search and tabs need JavaScript). This site is a WCAG 2.2 AA-oriented baseline; no conformance is claimed.

## Known limitations
- The source's very large menus (about 60 links) are reduced to links that exist locally; unmapped items are omitted.
- Pages are duplicated static HTML (header, footer repeated); they were emitted from a scratch script that is not part of the delivery.
- Calendar times are local with no time zone; the sample window ends 2027-06-30.
