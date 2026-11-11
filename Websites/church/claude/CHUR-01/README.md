# CHUR-01 — Harbor Ridge Church (fictional replica)

| Field | Value |
| --- | --- |
| Replica ID | CHUR-01 (slot 1, model group `claude`, model `claude-sonnet-5-5`) |
| Category / stratum | church / large multi-site church |
| Fictional branding | **Harbor Ridge Church** (invented name, mark, campuses, people, and copy) |
| Approved source URL | https://saddleback.com/ (reference only; no logo, text, or media copied) |
| Source verification | 2026-11-10, HTTP GET with curl: home page 200, title "Saddleback Church"; all 14 mapped pages returned 200. This record comes from `Websites/pipelines/claude/research/CHUR.md`; it was **not re-checked** in this run. |
| Approval | Approved 2026-11-10. The project lead **waived the Phase A approval stop** and approved the CHUR-01 block of the research inventory. |
| Protocols | WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0 |

This site is a research stand-in. It is not a real church, offers no real services, and sends or stores nothing.

## Run locally

Open `index.html` in a browser (works from `file://`; no server, build step, or network needed). Data is inline in `js/main.js`.

## Sitemap and page-to-source mapping

| Local page | Reference page (saddleback.com) | Notes |
| --- | --- | --- |
| `index.html` | `/` | Hero, Our campuses, Your first step, App, Stay connected |
| `locations.html` | `/locations/` | Campus finder with search and feature filter |
| `watch.html` | `/watch/` | Online service, message archive with filters (archive is inferred; the source's Watch interior was not inspected) |
| `about.html` | `/about/` | Story, beliefs, leadership, stories |
| `care.html` | `/care/` | Care hub |
| `giving.html` | `/giving/` | Campus select + simulated gift form |
| `events.html` | `/events` | Search, campus select, category, date filter |
| `small-groups.html` | `/sections/get-involved/adults/small-groups/` | Group finder |
| `serve.html` | `/sections/get-involved/adults/serve` | Team finder |
| `prayer.html` | `/sections/get-care/prayer/` | Prayer request form (form is inferred) |
| `recovery.html` | `/sections/get-care/celebrate-recovery/` | Overview and meeting times |
| `podcasts.html` | `/sections/pursue-growth/podcasts/` | Show cards with episode lists, no audio |
| `contact.html` | `/sections/more/contact-us/` | Contact form |
| `careers.html` | `/sections/more/careers/` | Sample postings with filters |
| `legal.html` | footer Privacy Policy / Terms of Use | Intentional consolidation into one short page |
| `404.html` | none | Required by RULES.md |

16 HTML files (14 mapped reference pages, `legal.html`, `404.html`) and 29 files in total (the final qc.js run was made after all docs were written).

## Feature checklist

- Header with utility bar (language menu, sign-in dialog, watch link), five primary links, a "More ways to connect" mega menu (four groups), and a mobile Menu disclosure below 900px.
- Breadcrumbs on interior pages, `aria-current` on the active link.
- Filter/search over inline data with empty states and Clear filters: campuses (8), messages (14), events (12), groups (10), serving teams (8), jobs (6). Query-string prefill (`?q=`, `?type=`, `?topic=`).
- Forms with labels, inline errors, error summary with focus management, and demo success: sign-in dialog, newsletter, giving, prayer, contact.
- Native `<dialog>` sign-in, native `<details>` accordions.
- Reduced-motion rule, visible focus, no horizontal scroll at 375px.

## Simulation notes

- **Sign-in:** demo dialog, no account system. The source's "My Dashboard" link is omitted.
- **Giving:** no card or bank fields, no payment, nothing saved. The success text states this and echoes the chosen amount.
- **Prayer, contact, newsletter:** demo success only; nothing is sent.
- **Language menu:** lists the source's five languages but only shows a "translated pages are not included" notice.
- **Watch:** poster image with a caption saying no video is included. Message summaries only.
- **Careers / Serve / Groups / Events:** sample records; calls to action link to the demo contact form.

## Sample data counts

8 campuses, 14 messages, 12 events, 10 groups, 8 serving teams, 6 jobs, 4 staff, 3 podcast shows (8 episodes), 4 recovery meetings. All invented.

## Intentional additions (not observed on the source)

Message-archive search/filters (inferred only), consolidated `legal.html`, date filter on events, sample beliefs and stories copy, and the mobile "Menu" disclosure pattern. See `fidelity-notes.md`.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/church/claude/CHUR-01` on 2026-11-11 → `pages=16 files=29 failures=0 warnings=0`.

| Gate | Result | Evidence |
| --- | --- | --- |
| Technology | **pass** | qc.js: no prohibited file types or libraries, no remote requests, no fetch. Only HTML/CSS/vanilla JS. |
| Completeness | **pass** | qc.js: required files present, both JSON files parse, 0 broken links or assets across 16 pages. |
| Structure | **pass** (with caveat) | qc.js: `lang`, skip link, `main#main-content`, `data-section`/`data-component` on every page. Region order follows the research notes, not a fresh live crawl. |
| Interaction | **pass** (scripted only) | Playwright flows, 37 checks, all passed: skip link first focus; mega menu open/Escape/focus return; mobile menu; language notice; sign-in dialog open, errors, Escape, focus return; newsletter, giving, prayer, contact validation and success; message search, series, sort, empty state, Clear filters; events campus and date filters; `?type=` and `?topic=` prefill. These were scripted, not manual. |
| Accessibility review | **partial** | axe-core (WCAG 2.0–2.2 A/AA + best-practice) had 0 violations on all pages at 1280px and 375px, plus extra runs with the mega menu open, mobile menu open, dialog errors showing, and giving errors showing. No horizontal scroll at 375px (qc.js). Not tested: see below. |
| Traceability | **pass** | Inventory components were checked against the `data-component` values in the HTML by script. |

No claim of WCAG conformance is made. This is a WCAG 2.2 AA-oriented baseline only.

### Not tested

- Screen readers (NVDA, JAWS, VoiceOver, TalkBack).
- 200% / 400% zoom and text-spacing overrides.
- Manual keyboard walkthrough by a person (focus order was only checked by script for a few flows).
- Color contrast beyond what axe computes; forced-colors / high-contrast mode.
- Browsers other than Chromium; real mobile devices.
- `prefers-reduced-motion` was not exercised (the CSS only disables animation; there is little motion to begin with).
- Behavior with JavaScript disabled (menus fall back to inline lists, but filters and forms need JS).

## Known limitations

- Source Watch interior, prayer form, and sign-in flow were not inspected by the research step; those parts are inferred.
- Source pages for locations (per-campus pages), Kids, Students, Stories, and Counseling are not replicated; they link to the contact form or filters instead.
- Social links are omitted because the fictional site has no accounts.
- Dates are fixed sample dates from Aug 2026 to Jan 2027 and are not relative to today.
