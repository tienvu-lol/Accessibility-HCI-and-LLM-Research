# GOV-02: Marrowvale Portal (fictional state portal)

- Replica ID: GOV-02; category government; stratum state government portal / agency; slot 2; model group claude
- Fictional branding: "Marrowvale Portal", state of Marrowvale, Republic of Velmara. Invented domain marrowvale-portal.example (not a government domain).
- Approved source: https://www.texas.gov/ (research metadata only). Verified 2026-11-12 by HTTP GET via curl; approved 2026-11-13.
- **Fictional-government notice:** every page, including `404.html`, shows it at the top of the header (above the brand and navigation) and again in the footer. This is invented sample content, not a real government, and not official information or civic guidance. Do not rehost it as a real portal.

## Run
Open `index.html` in a browser directly (works from `file://`; no server, no build, no network). Vanilla HTML/CSS/JS only.

## Sitemap and source mapping
index.html (Home), search.html (Search), services.html (Services directory), agencies.html (State agencies directory), permits-passes.html (topic hub), permit-detail.html (sample service page), makers-markets.html (topic hub), community-learning.html (topic hub), accessibility.html, faq.html, about.html, contact.html (simulated feedback form), sitemap.html, 404.html. 13 mapped pages plus 404. Detailed mapping is in `fidelity-notes.md`.

## Features
Dropdown primary nav with mobile disclosure; fictional notice with disclosure; non-functional language demo; hero search with suggested queries; site search; services directory (text search, category filter, `?category=` and `?q=`, polite live-region count, empty state); agency directory (search, sector filter, count, empty state); topic pages with real list semantics; native-details FAQ; simulated contact form with error summary, focus management and demo-only outcome; breadcrumbs; skip link; reduced-motion support.
Sample data: 30 services, 16 agencies, 6 FAQ items, 5 categories, 5 sectors (all invented).

## Guardrails
Off-site providers are unlinked text labels naming invented `.example` hosts. No login, payments, identity fields, alert banner, meetings calendar or real officials. No `.gov` string. Pages are `noindex`. Topic and service pages say they are not real guidance.

## QC gates (Rules.md section 9)
Evidence: `node Websites/tools/qc/qc.js Websites/government/claude/GOV-02` (static audit plus axe-core at 1280px and 375px), plus scripted Playwright flow checks and grep audits by the builder.
- Technology: pass (no libraries, remote resources or build step; qc.js and grep).
- Completeness: pass (all mapped pages and artifacts present, links resolve per qc.js).
- Structure: partial (landmarks and data attributes checked by qc.js; match to reference hierarchy judged only from the research block).
- Interaction: partial (scripted checks of nav dropdown, Escape handling, directory search/filter/count/empty states, site search, contact validation, focus and demo outcome; no manual or screen-reader testing).
- Accessibility: partial (axe plus scripted checks only; no manual keyboard walkthrough on all pages, no screen-reader, zoom or contrast audit beyond axe).
- Traceability: partial (builder cross-checked docs against files; no independent review).
- Scope: pass.
Final qc.js line is recorded in the delivery report. No WCAG conformance is claimed.

## Not tested
Screen readers, real-device mobile, text-spacing and zoom overrides beyond axe, Safari/Firefox, print, forced-colors mode, human usability testing.

## Known limitations
Language selector, off-site promos and provider labels are non-functional by design. Search is simple keyword matching. Directory data is JS-rendered (noscript note points to topic pages).
