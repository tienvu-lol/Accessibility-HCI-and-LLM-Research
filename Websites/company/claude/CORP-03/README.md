# CORP-03 - Forgeline (fictional) 

- **Replica ID:** CORP-03 (slot 3, model group `claude`)
- **Category / stratum:** Company (Banking & Tech) / technology company (software/SaaS, DevSecOps platform)
- **Fictional branding:** "Forgeline", a made-up DevSecOps platform. All names, people, customers, prices, statistics, jobs and posts are invented. The logo is an original SVG tile. No real logos, seals, trademarks or copied prose are used.
- **Approved source URL:** https://about.gitlab.com/ (research metadata only; the replica is reference-*inspired*, not a copy)
- **Source verification:** 2026-11-10, HTTP GET with `curl -sSL -A "Mozilla/5.0"`: 200 on the home page and the 17 interior pages listed in `Websites/pipelines/claude/research/CORP.md`. Only static HTML was inspected; JS-rendered behavior of the reference was **not** observed. Recorded in the research inventory, not re-run in this session.
- **Approval:** the project lead **waived the Phase A approval stop** and approved the CORP-03 block of the research inventory (`source_approved_at` 2026-11-10).

## Run locally

Open `index.html` in a browser (works from `file://`). There is no build step, no server, no network need. All data is inline in `js/main.js`. (The HTML pages were produced with a throwaway generator script kept outside the repo; it is not part of the deliverable and nothing in the site depends on it.)

## Sitemap and page-to-source mapping

| Local page | Reference page (about.gitlab.com) | Notes |
| --- | --- | --- |
| `index.html` | `/` | hero, "One control plane", industries, "Latest from", closing CTA |
| `platform.html` | `/platform/` | 11 capabilities in 4 groups, anchors target the mega-menu |
| `pricing.html` | `/pricing/` | 3 plan cards, comparison accordions, FAQ accordion |
| `pricing-premium.html` | `/pricing/premium/` | benefits and plan-difference table |
| `solutions.html` | `/solutions/` | Outcomes / By size / Industries |
| `solutions-ci-cd.html` | `/solutions/continuous-integration/` | benefits, steps, FAQ |
| `customers.html` | `/customers/` | industry tabs filter 6 stories |
| `customer-story.html` | `/customers/nvidia/` | one fictional case study |
| `blog.html` | `/blog/` | search + category filter, 8 posts |
| `blog-post.html` | one `/blog/...` post | `?post=slug`, rendered from inline data |
| `contact-sales.html` | `/sales/` | demo form (fields invented) |
| `request-demo.html` | `/request-a-demo/` | demo form (fields invented) |
| `careers.html` | `/jobs/` | values, teams hiring |
| `careers-all.html` | `/jobs/all-jobs/` | search + department + location filters, 14 roles in accordions |
| `company.html` | `/company/` | mission, leadership, trust, legal/accessibility notes |
| `404.html` | - | usable route back |

Not replicated: `/get-started/`, `/resources/`, `/security/` (budget), `docs.gitlab.com` (off-domain). See `fidelity-notes.md`.

## Feature checklist

- [x] Header with brand, search, click-toggled mega-menus (Platform, Solutions, Resources, Company), plain Pricing link, Talk to sales, Request a demo; mobile disclosure
- [x] Site search dialog over an inline 59-entry index with empty state (reference has a site-wide search input)
- [x] Pricing plan cards and accordion comparison/FAQ (no billing toggle: the reference had none, so none was added)
- [x] Customer tabs with arrow-key navigation filtering stories
- [x] Blog search + category filter, empty state, article page by query string
- [x] Careers filters (keyword, department, location) with accordion roles, empty state, labeled demo "Apply" buttons
- [x] Two demo forms with inline errors, error summary, focus management and a labeled demo success state
- [x] Skip link, landmarks, `data-section`/`data-component`, breadcrumbs on interior pages, footer groups with legal/accessibility links, 404

## Sample data

8 blog posts (4 categories), 14 roles (5 departments, 5 locations), 6 customer stories (4 industries), 3 pricing plans, 59 search entries, 4 fictional leaders.

## Interaction simulation notes

- Contact sales / Request a demo: client-side validation only; **nothing is sent or stored**; success panel says so.
- "Apply (demo)" prints a "Demo only" message; no application exists.
- Sign-in, free-trial, cookie banner, language list: omitted (see fidelity notes), not faked.
- Search, filters, tabs and accordions operate purely on inline data/DOM.

## QC gates (RULES.md section 9)

Automated run: `node Websites/tools/qc/qc.js Websites/company/claude/CORP-03` on 2026-11-11 (UTC): `pages=16 files=27 failures=0 warnings=0`.

| Gate | Result | Evidence |
| --- | --- | --- |
| 13 Technology | **pass** | qc.js: no prohibited file types/libraries, zero non-file requests during page loads; vanilla JS only |
| 14 Completeness | **pass** | qc.js: all required files present, JSON valid, no broken links/assets; 15 pages + 404 |
| 15 Structure | **pass** (automated) / not reviewed against live reference | landmarks, skip link, `main#main-content`, data attributes checked by qc.js; section order mirrors the static-HTML inventory only |
| 16 Interaction | **pass** (scripted) | Playwright script (64 checks at 1280 and 375 px, 0 failures): skip link, mega-menu open/one-at-a-time/Escape, mobile toggle + Escape, search dialog + empty state + Escape focus return, accordion Enter/Space, tabs arrows/End, blog and job filters/empty/reset, blog article + not-found, form error summary/focus/inline errors/success for both forms, no JS errors |
| 17 Accessibility | **partially tested** | qc.js axe-core (WCAG 2.0-2.2 A/AA + best-practice) at 1280 and 375 px on every page: no violations; extra axe pass (same tags) on menu-open, dialog open/empty, form-error, tab-switched, all-accordions-open and empty-filter states at both widths: no violations; no horizontal scroll at 375 px (qc.js). Reduced motion is implemented in CSS but not exercised in a browser. |
| 18 Traceability | **pass** (self-checked) | component-inventory page lists were generated from the final HTML; docs describe only implemented files |
| 19 Scope | **pass** (self-assessed) | 15 pages, small sample data, no speculative screens |

### Not tested

Screen readers (NVDA/JAWS/VoiceOver), 200% / 400% text zoom, high-contrast mode, a full manual keyboard walkthrough of every page, touch/mobile devices (only emulated 375 px viewport in headless Chromium), browsers other than Chromium, reduced-motion emulation, no-JS behavior (menus, accordions and rendered article content need JS), side-by-side visual comparison with the live reference. **No WCAG conformance is claimed**; axe covers only a subset of WCAG criteria.

## Known limitations

- Page rendering relies on JS for menus, accordions and the blog article body; without JS those regions are hidden or generic.
- Mega-menus open on click/Enter only (not hover); the reference's hover behavior was not observed.
- The reference's real pages carry far more content; this replica keeps layout patterns and IA, not copy.
