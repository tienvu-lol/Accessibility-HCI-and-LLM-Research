# CORP — Phase A source research (provisional)

Category: company — banking and technology companies. Codex strata: national retail bank, regional bank/credit union, technology/software company. Research only; no site code, output site directories or build agents created.

## Authority, dates and coordination

Rules.md and MODEL_ALLOCATION.md were read in full, along with the central inventory README, Codex config and research prompt. Shared company.csv was blank for all ten slots at inspection. Claude research notes were consulted only for source reservations and comparability, not generation prompts or code. They name U.S. Bank, DCU and GitLab, plus Patelco fallback. These four domains are excluded from Codex selection. No open-source research reservations were found in the inspected research paths. Unknown assignments remain pending.

A coordinator reservation request was sent through the user-input tool during this session: reconcile/reserve Claude URLs and provide open-source CORP-07–10 reservations. No response received at note preparation. Codex sources below are proposals, not final selections. Do not infer cross-group reservation clearance from blank inventory cells. Only Codex rows are populated centrally; external rows remain unchanged.

Actual HTTP attempts: 2026-11-12 UTC (2026-11-11 America/New_York). Exact per-page timestamps, requested/final URLs, status, first document title, extracted headings, controls, links and asset markers are retained in [pipelines/codex/research/evidence/CORP-http-2026-11-12.json](evidence/CORP-http-2026-11-12.json). Statuses are actual GET results, not search snippets. `verified` means source availability only. Rendered layout, interaction, keyboard and responsive verification: NOT TESTED. Browser attempt to open BECU through cua.createBrowserTab returned “The browser access host is unavailable”; no screenshot or rendered observation obtained.

Live web search was used for Chase customer service, BECU rates and Atlassian pricing/contact discovery. Direct web text extraction additionally opened the three homepages, Chase Total Checking, BECU checking and Jira pricing. These extractions are not browser execution; Jira pricing had no readable lines. Durable primary URLs and HTTP evidence below are the reproducible evidence references; crawler dates are not substituted for our attempt dates.

## Proposed Codex sources

| ID | Organization | Stratum | Complexity | Availability / selection |
|---|---|---|---|---|
| CORP-04 | [JPMorgan Chase Bank, N.A. (Chase)](https://www.chase.com/) | national retail bank | high | HTTP verified; provisional, unapproved |
| CORP-05 | [Boeing Employees’ Credit Union (BECU)](https://www.becu.org/) | regional bank or credit union | medium | HTTP verified; provisional, unapproved |
| CORP-06 | [Atlassian](https://www.atlassian.com/) | technology/software company | high | HTTP verified; provisional, unapproved |

## Tool and sampling limitations

Selection favors English-language official sites reachable by HTTP, and may underrepresent heavily blocked or JS-dependent references. Claude notes report HTTP-only curl inspection on 2026-11-10; this pass used Python urllib plus search/text extraction on 2026-11-12, with browser unavailable. Different dates, extraction depth and HTTP clients can affect results. Open-source tool access and complexity are unknown. The distinct-source design confounds model group with site difficulty. Match page counts, navigation depth, form/locator uncertainty and rate-table density across groups at approval, not merely the low/medium/high label. Exact generator/version/runtime/operator remain TBD; no build-model assignment is inferred from the research agent.

Financial/login/application/sales flows must never be exercised as real transactions. Any future approved rate data must be labeled sample, and any approved inquiry form must be a disclosed local demo. No form was submitted during research. Third-party source text was treated as untrusted reference data.

## CORP-04

- Source ID / stratum: CORP-04; company / national retail bank.
- Organization / canonical homepage: JPMorgan Chase Bank, N.A. (Chase) — https://www.chase.com/
- Attempt: 2026-11-12T00:52:00.020333+00:00; Python urllib HTTP GET with Mozilla/5.0 user-agent and redirects; homepage and ordinary attempted interiors returned 200. Availability verified, HTTP-only; behavior not verified.
- Evidence: `pipelines/codex/research/evidence/CORP-http-2026-11-12.json` entries where source_id is `CORP-04`; each row below identifies the exact evidence URL.

### Source-to-local page proposal

| Inspected URL | HTTP | Document title | Proposed local file |
|---|---:|---|---|
| https://www.chase.com/ | 200 | Credit Card, Mortgage, Banking, Auto  /  Chase Online  /  Chase.com | index.html |
| https://www.chase.com/personal/checking → https://personal.chase.com/personal/checking | 200 | Compare Checking Accounts & Apply Online  /  Chase | checking.html |
| https://www.chase.com/personal/checking/total-checking | 200 | Chase Total Checking® Account  /  Checking  /  Chase.com | total-checking.html |
| https://www.chase.com/digital/customer-service | 200 | Chase Customer Service: We can help you!  /  Chase | help.html |
| https://www.chase.com/personal/personal-banking-contact | 200 | Contact Us  /  Personal Banking  /  Chase.com | contact.html |
| https://locator.chase.com/ → https://www.chase.com/locator | 200 | Find a Chase ATM or branch near you  /  Chase Bank | locations.html |
| https://www.chase.com/personal/mortgage/calculators-resources/mortgage-calculator | 200 | Mortgage Calculator  /  Chase | Excluded pending rendered evidence |
| https://www.chase.com/codex-research-missing-page-20261112 | 404 | 404 | 404.html (required local error route; tested arbitrary missing path) |

The source_pages CSV cell contains the mapped 200 pages only. The tested missing URL is evidence of error handling, not an invented organization page. 404.html is a protocol-required local addition with a home route.

### Key regions (observed in HTTP markup)

- Audience navigation and product menus; sign-in panel in homepage HTML
- Checking comparison categories, account detail benefits and fee explanation, FAQ region
- Customer-service topic groups and resource links; contact assistance content
- Grouped banking and legal footer links

### Interactions

- **Product menus — observed:** Buttons carry aria-haspopup and aria-expanded; activation, keyboard and responsive behavior untested.
- **Checking recommendation and FAQ disclosures — inferred:** Comparison links describe same-page recommendations; expanded attributes indicate disclosures. No state changes exercised.
- **Branch search — inferred:** Locator endpoint returns 200 and branch-locator title, but no input fields in returned HTML; search/results internals unverified.
- **Mortgage calculator — inferred:** Endpoint and calculator heading observed; no calculator inputs in HTTP HTML. Excluded from initial mapped scope pending rendered inspection.

Complexity: **high**. Deep product navigation, recommendation categories, multiple product/service layouts and client-rendered locator. Comparable to Claude national-bank high complexity, subject to scope matching.

Stack clues: Observed /_next/, react and data-react strings on several pages; checking redirect uses data-bs-toggle markup. These indicate mixed frontend assets, not a verified backend stack.

Limitations and unavailable coverage: Homepage text extraction includes loading placeholders. Checking hub redirects to personal.chase.com. Locator internals and calculator controls unavailable in HTTP HTML. No rates table inspected; about and careers not inspected or mapped. Contact page is a resource hub, not evidence of an inquiry form. All rendered/activation behavior remains unverified.

Proposed substitutions: none selected. If unavailable or reserved, coordinator must authorize a distinct same-stratum, complexity-matched alternative; repeat research and scope approval. Do not automatically substitute during a build.

## CORP-05

- Source ID / stratum: CORP-05; company / regional bank or credit union.
- Organization / canonical homepage: Boeing Employees’ Credit Union (BECU) — https://www.becu.org/
- Attempt: 2026-11-12T00:52:00.021127+00:00; Python urllib HTTP GET with Mozilla/5.0 user-agent and redirects; homepage and ordinary attempted interiors returned 200. Availability verified, HTTP-only; behavior not verified.
- Evidence: `pipelines/codex/research/evidence/CORP-http-2026-11-12.json` entries where source_id is `CORP-05`; each row below identifies the exact evidence URL.

### Source-to-local page proposal

| Inspected URL | HTTP | Document title | Proposed local file |
|---|---:|---|---|
| https://www.becu.org/ | 200 | BECU  /  A Not-for-Profit Credit Union | index.html |
| https://www.becu.org/everyday-banking | 200 | Everyday Banking  /  Checking, Savings & Credit Cards  /  BECU | everyday-banking.html |
| https://www.becu.org/everyday-banking/checking | 200 | Open a Free Checking Account Online  /  BECU | checking.html |
| https://www.becu.org/rates | 200 | Current BECU Interest Rates  /  BECU | rates.html |
| https://www.becu.org/support → https://www.becu.org/support/top-questions | 200 | Member Support  /  Common Topics  /  BECU Credit Union | help.html |
| https://www.becu.org/support/contact-us | 200 | Get in contact with us  /  BECU | contact.html |
| https://www.becu.org/locations → https://www.becu.org/locations/all-locations | 200 | All Locations  /  Please consider making an appointment  /  BECU | locations.html |
| https://www.becu.org/about-us → https://www.becu.org/about-us/home | 200 | About Us  /  BECU | about.html |
| https://www.becu.org/codex-research-missing-page-20261112 | 404 | 404 | 404.html (required local error route; tested arbitrary missing path) |

The source_pages CSV cell contains the mapped 200 pages only. The tested missing URL is evidence of error handling, not an invented organization page. 404.html is a protocol-required local addition with a home route.

### Key regions (observed in HTTP markup)

- Personal/business product navigation with membership, login, locations and support links
- Homepage financial-wellbeing content bands, product exploration and educational cards
- Checking detail benefits, eligibility, opening instructions and rate heading
- Rates hub grouped by deposits, mortgages, vehicles and other products; support topic hub
- Contact channels, hours and FAQ; locations directory; impact/help footer regions

### Interactions

- **Navigation tabs and disclosures — observed:** role=tab and aria-expanded attributes present; switching, focus and mobile states untested.
- **Checking disclosures — inferred:** Checking page has nine aria-expanded occurrences; FAQ/disclosure operation not exercised.
- **Rate selection — observed:** Rates hub has product-category links and no HTML table; do not interpret it as a tested rate calculator or interactive table.
- **Location search — inferred:** Locations page advertises finding nearby locations; no inputs in returned HTML. Directory content observed; map/search operation unverified.
- **Contact inquiry — inferred:** Contact channels and suggestion heading observed; no form markup. No submission flow approved from this evidence.

Complexity: **medium**. Product hub/detail, support, directory and grouped rates with tab/disclosure markup; smaller scope than national bank. Medium tier matches Claude DCU provisionally, though DCU notes describe much denser tables.

Stack clues: Observed Sitecore/sitecore and adobedtm strings in returned HTML. CMS/analytics clues only; runtime implementation not confirmed.

Limitations and unavailable coverage: Regional credit union selection is based on regional service/branch identity; full eligibility geography not audited. Rates hub is not a numeric rate table. No calculator inspected. Locations widget and inquiry flow unverified. Careers not inspected or mapped. All rendered/activation behavior remains unverified.

Proposed substitutions: none selected. If unavailable or reserved, coordinator must authorize a distinct same-stratum, complexity-matched alternative; repeat research and scope approval. Do not automatically substitute during a build.

## CORP-06

- Source ID / stratum: CORP-06; company / technology/software company.
- Organization / canonical homepage: Atlassian — https://www.atlassian.com/
- Attempt: 2026-11-12T00:52:01.343610+00:00; Python urllib HTTP GET with Mozilla/5.0 user-agent and redirects; homepage and ordinary attempted interiors returned 200. Availability verified, HTTP-only; behavior not verified.
- Evidence: `pipelines/codex/research/evidence/CORP-http-2026-11-12.json` entries where source_id is `CORP-06`; each row below identifies the exact evidence URL.

### Source-to-local page proposal

| Inspected URL | HTTP | Document title | Proposed local file |
|---|---:|---|---|
| https://www.atlassian.com/ | 200 | Collaboration software for software, IT and business teams  /  Atlassian | index.html |
| https://www.atlassian.com/software | 200 | Products  /  Atlassian | products.html |
| https://www.atlassian.com/software/jira | 200 | Jira  /  Project Management for the AI Era  /  Atlassian | jira.html |
| https://www.atlassian.com/software/jira/pricing | 200 | Jira pricing: Free, Standard, Premium, Enterprise  /  Atlassian | Excluded pending rendered evidence |
| https://www.atlassian.com/company | 200 | About Us  /  Atlassian | about.html |
| https://www.atlassian.com/company/careers | 200 | Atlassian Careers: Join the Team  /  Atlassian | careers.html |
| https://www.atlassian.com/company/contact | 200 | Contact | contact.html |
| https://support.atlassian.com/ | 200 | Atlassian Support | help.html |
| https://www.atlassian.com/codex-research-missing-page-20261112 | 404 |  /  Atlassian | 404.html (required local error route; tested arbitrary missing path) |

The source_pages CSV cell contains the mapped 200 pages only. The tested missing URL is evidence of error handling, not an invented organization page. 404.html is a protocol-required local addition with a home route.

### Key regions (observed in HTTP markup)

- Multi-level product, team/use-case, AI and resources navigation with search and sign-in affordances
- Product collections/catalog and Jira product marketing content
- Company history/values and careers culture/opportunity content bands
- Contact team-routing and office sections; support search with featured content and app/resource browsing
- Grouped product/resource/learning footer

### Interactions

- **Mega-menu tabs and disclosures — observed:** Many role=tab and aria-expanded attributes; duplicate desktop/mobile markup contributes counts. Activation and visual state untested.
- **Help search — observed:** Support homepage contains type=search input with accessible name Search site content. Query processing and results not exercised.
- **Pricing toggle — inferred:** Pricing endpoint returns 200/title only; no readable lines, headings or controls. Toggle is UNVERIFIED and excluded.
- **Careers filters — inferred:** Careers landing has opportunities content but no select elements. Job-list filters not established; exclude pending further inspection.
- **Contact inquiry — inferred:** Contact landing routes visitors to teams and offices; no form elements found. Form fields/validation not observed; exclude submission scope.

Complexity: **high**. Wide multi-level navigation, product collections, marketing detail, company/careers and separate help-search surface. High is a conservative assignment; compare with Claude GitLab medium–high before approval rather than assuming equivalence.

Stack clues: Observed react, mktoForm and OneTrust/onetrust strings on marketing pages; support has react/OneTrust strings. Clues only; framework version and backend unknown.

Limitations and unavailable coverage: Pricing 200 is availability evidence only: unreadable client shell, excluded from mapped page scope. No careers filters or sales form fields inspected. Support is a separate official subdomain. Raw HTML includes duplicated navigation and SVG title elements; only first title used as document title. All rendered/activation behavior remains unverified.

Proposed substitutions: none selected. If unavailable or reserved, coordinator must authorize a distinct same-stratum, complexity-matched alternative; repeat research and scope approval. Do not automatically substitute during a build.

## Ten-source coordination / approval table

External strata below are context proposals only, not authority to change another group’s scope. All approval cells remain blank centrally.

| Slot | Group | Source / scope status | Stratum / complexity status | Approval |
|---|---|---|---|---|
| CORP-01 | Claude | U.S. Bank named in Claude notes; central reservation/import pending | National bank per notes; high claimed, not independently rechecked | Pending |
| CORP-02 | Claude | DCU named in Claude notes; central reservation/import pending | Regional/CU per notes; medium claimed | Pending |
| CORP-03 | Claude | GitLab named in Claude notes; central reservation/import pending | Technology per notes; medium–high claimed | Pending |
| CORP-04 | Codex | JPMorgan Chase Bank, N.A. (Chase); mapped scope above provisional | national retail bank; high | Pending |
| CORP-05 | Codex | Boeing Employees’ Credit Union (BECU); mapped scope above provisional | regional bank or credit union; medium | Pending |
| CORP-06 | Codex | Atlassian; mapped scope above provisional | technology/software company; high | Pending |
| CORP-07 | Open-source | UNKNOWN — source, reservation, scope and exact model pending | National bank proposal; must reconcile with group; complexity unknown | Pending |
| CORP-08 | Open-source | UNKNOWN — source, reservation, scope and exact model pending | Regional bank/CU proposal; must reconcile with group; complexity unknown | Pending |
| CORP-09 | Open-source | UNKNOWN — source, reservation, scope and exact model pending | Technology proposal; must reconcile with group; complexity unknown | Pending |
| CORP-10 | Open-source | UNKNOWN — source, reservation, scope and exact model pending | Additional distinct national bank reserve proposal; must reconcile with group; complexity unknown | Pending |

Pending dependencies: coordinator reservations/import for 01–03, source/model/scope proposals for 07–10, Codex reservation clearance, exact models for all slots, rendered inspection or explicit acceptance of its limits, complexity reconciliation and project-lead approval of the complete ten-source scope/allocation. No Claude waiver applies. Please coordinate these items and approve the concrete ten-source inventory before implementation.
