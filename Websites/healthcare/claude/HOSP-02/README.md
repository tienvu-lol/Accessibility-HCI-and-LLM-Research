# HOSP-02 - Marlowe Bay Health (fictional replica)

| Field | Value |
| --- | --- |
| Replica ID | HOSP-02 (category `healthcare`, slot 2, model group `claude`) |
| Stratum | Community / regional hospital |
| Fictional branding | **Marlowe Bay Health** ("Marlowe Bay Hospital Harbor Point / Eastvale"), logo is a local SVG; all names, phone numbers (800-555-01xx), addresses and people are invented |
| Approved source URL | https://www.hoag.org/ (research metadata only; no logos, text or media copied) |
| Source verification | Verified 2026-11-10 by HTTP GET via curl (200, title "Best Health System in Orange County \| Hoag Hospital") in `Websites/pipelines/claude/research/HOSP.md`. Not re-fetched in this run. |
| Approval | The project lead **waived the Phase A approval stop** and approved this reference on 2026-11-10 (`source_approved_at` = 2026-11-10). |
| Generator | `claude-sonnet-5-5` worker agent, orchestrated by `claude-opus-5-5`; see `generation-metadata.json` |

## Run locally

Open `index.html` in a browser (works from `file://`; no server, no build step, no network). All data is inline in `js/main.js`.
JavaScript is required for the navigation menus, filters and forms (limitation: without JS the dropdown panels stay hidden).

## Sitemap and page-to-source mapping

| Local page | Reference page (hoag.org path) |
| --- | --- |
| `index.html` | `/` home |
| `find-care.html` | `/find-care/` (and the home search widget) |
| `locations.html` | `/locations` |
| `location-harbor-point.html` | `/locations/hoag-hospital-newport-beach` |
| `patients-visitors.html` | `/patients-visitors/` |
| `insurance-accepted.html` | `/patients-visitors/insurance-accepted` |
| `billing-help.html` | `/billing-information/help-paying-your-bill/` |
| `institute-cancer.html` | `/institute/cancer/` |
| `institute-heart.html` | `/institute/heart-vascular/` |
| `specialties-services.html` | `/specialties-services/` |
| `classes-events.html` | `/resources/classes-events/` |
| `about.html` | `/about-hoag/` |
| `contact.html` | `/contact-us/` |
| `portal-login.html` | MyChart login (off-site link in the reference; intentional local demo) |
| `legal.html` | `/legal`, Privacy Policy, Terms of Use (footer links) |
| `404.html` | (not in reference; required by RULES.md) |

15 content pages + 404. Omitted from the approved list: `/patients-visitors/infection-prevention/` (scope cap).

## Sample data counts (inline in `js/main.js`)

14 providers, 9 locations, 12 events/classes, 16 insurance plans; 11 programs are static HTML on `specialties-services.html`.

## Feature checklist

- Header: emergency banner, utility links, brand, primary nav with four dropdown groups (Explore Services, Locations, Resources, About) matching the reference's observed groups, Find Care, portal demo; mobile "Menu" disclosure. Active page marked with `aria-current`.
- Home: hero with specialty/physician radio toggle + search + city (GET handoff to `find-care.html`), Quick Links tiles, centers of excellence, Why Choose, patient-story carousel (manual controls, no autoplay), community, article teasers.
- Find care: filters (mode, keyword, specialty, city, accepting new patients), count announcement, empty state, reset, profile dialog.
- Locations finder (type, text, URL presets, hash scroll), hospital detail with emergency notice, insurance search, programs filter, classes/events filter with registration demo dialog, billing accordion.
- Forms: contact (simulated) and portal login (labelled non-functional demo) with labels, hints, inline errors, error summary, focus management and a demo success message.
- Escape closes menus and dialogs; skip link; `prefers-reduced-motion` honoured.

Intentional additions (not observed on the reference): provider-profile dialog (reference has no profile page), event registration demo dialog, local portal demo page, 404 page, `legal.html` consolidating three footer links, Donate link pointing to a local explanatory section. No appointment-request form is included because the reference's home HTML shows none (see `fidelity-notes.md`).

## Simulation notes

Nothing is transmitted. Contact and portal forms validate, reset and show "Demo only" success text. Pay-bill and registration are demonstrations. Availability badges, hours and events are sample data, not live status.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/healthcare/claude/HOSP-02` on 2026-11-11 (UTC) -> `pages=16 files=28 failures=0 warnings=0` (checks required files, JSON validity, links/assets, prohibited tech, remote requests, JS errors, landmarks/skip link/metadata, axe-core WCAG 2.0-2.2 A/AA + best-practice at 1280px and 375px, horizontal scroll).

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | pass | qc.js: no prohibited files/libraries, no remote requests; plain HTML/CSS/JS, no fetch |
| 14 Completeness | pass | qc.js: required files present, no broken links or assets across 16 pages |
| 15 Structure | pass (partial) | qc.js landmark/metadata checks; hierarchy compared against the research notes only, not a live re-inspection of the reference |
| 16 Interaction | pass | scripted Playwright flows (menus + Escape, mobile nav, carousel, find-care filters/empty state/dialog, contact and portal validation, location/event/insurance/program filters, accordion) all passed; not re-run on other browsers |
| 17 Accessibility review | partial | axe-core 0 violations at 1280px and 375px (qc.js) and with a menu open, a dialog open and the form error state (scripted); no horizontal scroll at 375px; reduced-motion CSS present. Keyboard walkthrough only through scripted keypresses. Contrast checked by axe only |
| 18 Traceability | pass | README, fidelity notes and inventory written against the delivered files; source facts come from the lead's research file |
| 19 Scope | pass | 15 pages, small sample datasets, no extra frameworks |

**Not tested:** screen readers (NVDA/JAWS/VoiceOver), 200% zoom / text-only resize, a human manual keyboard walkthrough, Firefox/Safari, touch devices, high-contrast mode, voice control, page weight/performance. This is a WCAG 2.2 AA-oriented baseline, not a claim of conformance.

## Known limitations

- Reference nav behaviour (dropdown open/close, carousel) was inferred, not observed (see research notes); the carousel here has no autoplay.
- Mobile submenus are inline accordions; desktop panels are absolutely positioned and not tested at intermediate widths beyond 1280/375.
- Without JavaScript the dropdown menus and filtered lists do not render.
