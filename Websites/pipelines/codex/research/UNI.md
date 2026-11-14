> **Current selection update (2026-11-13 UTC):** The approved replacement addendum at the end of this file supersedes the original proposals for UNI-06. Earlier observations remain historical evidence.

# UNI — Phase A source research

Research date: 2026-11-12 UTC (2026-11-11 America/New_York). Category: Universities and colleges. Codex owns slots 04–06: public research university, small private liberal-arts college, community college. These are **proposals pending coordination and whole-category approval**, not approved selections.

Read Rules.md and MODEL_ALLOCATION.md in full, plus the central inventory README, Codex config and Claude UNI research notes. No generation prompts or implementation code from another group used. No site folders, site code or build agents created. Third-party text was treated only as untrusted reference data.

## Evidence and method

- [HTTP observations](evidence/UNI-http-2026-11-12.json): exact attempted UTC timestamps, requested/final URLs, HTTP status, first document title, headings, controls, script paths and links. Standard-library urllib with TLS validation, Mozilla/5.0 and 25-second timeout. This is **HTTP-only**, not browser observation. Initial quick parser accidentally read an SVG title on Penn State; corrected parser and second GET establish the document title recorded below.
- Live web searches for official Penn State, Dickinson, Montgomery and CCP pages were performed. Web `open`/`click` returned text extractions, not rendered interaction tests. CCP extraction links and observations are recorded separately below; crawl recency is not a new origin status check.
- A browser-tab creation attempt for CCP returned “The browser access host is unavailable.” No rendered pages, screenshots, responsive layouts, keyboard behavior or functional results were verified for any source. An observed control means its markup/extracted affordance was seen, not that its operation passed.
- Availability: Penn State and Dickinson have substantive HTTP 200 home/interior evidence. CCP is conservatively UNVERIFIED because origin requests were blocked despite usable web extracts. HTTP 200 alone is insufficient: Montgomery returned Request Rejected.
- Generator identity/version/runtime/operator remain TBD; no model inferred from the Codex brand. Approval fields remain blank.

## Coordination dependency

Central university.csv was blank for all ten slots when read. Claude notes at `pipelines/claude/research/UNI.md` independently name Wisconsin–Madison, Swarthmore and NOVA, with HTTP-only claims dated 2026-11-10. Treat these as reserved-in-notes and avoid them; do not import their verification or approval. An asynchronous request to the coordinator asked to reserve these URLs centrally and identify UNI-07–10 reservations before final selection. No reply was received when this note was prepared. Only Codex 04–06 CSV proposals are populated. assignments.csv reports Claude generating but supplies no source/approval evidence; this is a reconciliation issue, not authorization for Codex. Other-group proposed strata below do not change their approved scope.

## Proposed Codex sources

| ID | Organization | Stratum | Complexity | Availability | Scope |
|---|---|---|---|---|---|
| UNI-04 | [The Pennsylvania State University (Penn State)](https://www.psu.edu/) | large public research university | high | verified | 8 source pages + local 404 proposal |
| UNI-05 | [Dickinson College](https://www.dickinson.edu/) | small private liberal-arts college | high | verified | 8 source pages + local 404 proposal |
| UNI-06 | [Community College of Philadelphia](https://www.ccp.edu/) | community college | high | UNVERIFIED | 9 source pages + local 404 proposal |

## UNI-04

- Source ID: UNI-04; category university; subcategory/stratum: large public research university.
- Actual organization: **The Pennsylvania State University (Penn State)**; canonical homepage: https://www.psu.edu/.
- Attempted verification: 2026-11-12 UTC; HTTP-only GET plus web search/text extraction; result **verified**. Evidence: `evidence/UNI-http-2026-11-12.json` entries keyed by URL; CCP additionally has extraction evidence below.

### Source-to-local page map

| Source URL | Actual title evidence | Proposed local file | Evidence/result |
|---|---|---|---|
| https://www.psu.edu/ | The Pennsylvania State University / Penn State | `index.html` | HTTP 200 |
| https://www.psu.edu/academics/undergraduate/majors | Undergraduate Majors / Penn State | `majors.html` | HTTP 200 |
| https://bulletins.psu.edu/undergraduate/colleges/eberly-science/biology-bs/ | Biology, B.S. (Science) / Penn State | `biology.html` | HTTP 200 |
| https://www.psu.edu/admission/undergraduate/how-to-apply | How to Apply / Undergraduate Admissions / Penn State | `apply.html` | HTTP 200 |
| https://www.psu.edu/costs-aid | Invest in Your Future / Student Aid / Penn State | `costs-aid.html` | HTTP 200 |
| https://www.psu.edu/admission/undergraduate/explore/visit-penn-state | Visit Penn State / Undergraduate Admissions / Penn State | `visit.html` | HTTP 200 |
| https://www.psu.edu/search/directories | Faculty and Staff Directories / Penn State | `directories.html` | HTTP 200 |
| https://www.psu.edu/news | News / Penn State University | `news.html` | HTTP 200 |

`404.html` is an intentional local addition for approval, outside source_pages because it is not a canonical content page. Probe `/codex-research-missing-20261112` returned HTTP 404, title Penn State, without captured headings. Do not infer the rendered error layout.

### Key regions

- Utility actions and nested academic, admissions, aid and news navigation
- Home media hero followed by opportunity/statistics bands, traditions features and news links
- Majors search region and filter heading; structured program data embedded in response
- Application routes, preparation questions, dates and FAQ sections
- Visit options grouped by campus and audience
- Biology bulletin: breadcrumbs, program summary, requirement tables, advising and academic plans
- Directory gateway; news feature groups
- Footer grouped exploration, support, quick links, resources and social connections

### Interactions

- **observed — Major search/filter:** Text input with data-tracking-id MajorListing-Filter and Filters heading in HTTP HTML; filtering outcome inferred, not executed.
- **inferred — Responsive navigation:** Nested link groups and repeated navigation markup indicate responsive variants; breakpoints, disclosure and keyboard behavior untested.
- **observed — Visit registration:** Visit page links to apply.psu.edu/portal/up-all; external registration not inspected or submitted.
- **inferred — Directory lookup:** Directories gateway retrieved; no lookup form captured. Do not assume an inline people search.
- **inferred — Program section navigation:** Bulletin headings/section links indicate navigation within a long requirements page; switching behavior not tested.

### Complexity, stack, limitations and substitutions

- **high complexity:** Deep multilevel recruitment navigation, interactive majors listing, video-led pages, separate news and bulletin templates, and directory gateway. Higher than Claude UNI-01 recorded medium; scope/complexity matching requires coordinator review.
- Stack clues: Observed /_next/static/chunks and turbopack-named assets on main site; ctfassets.net video host. Next.js indicated by paths; CMS unknown. Bulletin is a separate template.
- Limitations: HTTP-only. No rendered layout, mobile, keyboard, search results or submissions verified. News/bulletin templates differ. External application and registration excluded from live scope. Exact model/version TBD; coordination and approval pending.
- Proposed substitutions/scope decisions: No source replacement selected. If high complexity cannot be matched, coordinator must approve reduced scope or a different public research university; no substitute is verified or reserved.
- Any later application, student portal, login, tour RSVP or inquiry submission must be explicitly labeled simulation. No live form was submitted. Local inline search data would be a simulation of inferred result behavior, requiring approval; no backend/API replication proposed.

## UNI-05

- Source ID: UNI-05; category university; subcategory/stratum: small private liberal-arts college.
- Actual organization: **Dickinson College**; canonical homepage: https://www.dickinson.edu/.
- Attempted verification: 2026-11-12 UTC; HTTP-only GET plus web search/text extraction; result **verified**. Evidence: `evidence/UNI-http-2026-11-12.json` entries keyed by URL; CCP additionally has extraction evidence below.

### Source-to-local page map

| Source URL | Actual title evidence | Proposed local file | Evidence/result |
|---|---|---|---|
| https://www.dickinson.edu/ | Dickinson College Homepage | `index.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/199/academic_programs | Academic Programs / Dickinson College | `programs.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/55/biology | Biology / Dickinson College | `biology.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/287/admissions | Admissions / Dickinson College | `admissions.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/279/apply | Apply / Dickinson College | `apply.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/281/tuition_and_aid_overview | Tuition and Aid / Dickinson College | `tuition-aid.html` | HTTP 200 |
| https://www.dickinson.edu/homepage/278/visit | Visit Dickinson / Dickinson College | `visit.html` | HTTP 200 |
| https://www.dickinson.edu/news | Latest News / Dickinson College | `news.html` | HTTP 200 |

`404.html` is an intentional local addition for approval, outside source_pages because it is not a canonical content page. Both `/directory` and `/codex-research-missing-20261112` returned HTTP 404, title Page not found | Dickinson College. Directory coverage is omitted; no people-search behavior inferred.

### Key regions

- Header with recruitment actions, main topical links and duplicate phone/desktop search forms
- Home institutional introduction, mentoring and place feature bands, featured news and inclusion feature
- Academic programs list/search region; unresolved client template text present in HTTP response
- Biology departmental contact block, features, outcomes, student/alumni features and news
- Admissions visit/connect/apply routes; application landing and policy sections
- Aid overview with cost, calculator and assistance routes
- Visit opportunities, preparation questions and slideshow controls
- News list/search and institutional footer

### Interactions

- **observed — Program keyword search:** Input #majors-search uses v-model=searchparam; unresolved {{ major.name | ampersanChange }} is present. Result updates inferred, not run.
- **observed — Site/news search:** GET forms target /site/scripts/google_results.php with q; news form includes sites[]=News. Results not requested.
- **observed — Visit slideshow:** Previous/next buttons call plusSlides(-1/1); transition and keyboard behavior not executed.
- **observed — Visit/information inquiry:** Homepage links to admissions.dickinson.edu request-information and visit pages; external form not inspected or submitted.
- **inferred — Responsive navigation:** visible-phone/hidden-phone classes and repeated search markup indicate alternate layouts; actual menu behavior untested.

### Complexity, stack, limitations and substitutions

- **high complexity:** Shared recruitment shell plus client-templated program search, department detail, visit slideshow and distinct admissions/aid/news templates. Approximately comparable to Claude UNI-02 medium-high (normalize to high only by coordinator agreement).
- Stack clues: Observed jQuery 1.10.2, jQuery UI 1.10.4, widget.js and /site/javascript scripts. Program input v-model suggests Vue-style binding; full framework/version and CMS unknown. Reference stack is not permission to use those libraries.
- Limitations: HTTP-only; no client rendering or interaction execution. Guessed /directory returns genuine 404, so no directory page or search is proposed. External inquiry/application/tour flows remain outside inspected scope. Model/version TBD; coordination and approval pending.
- Proposed substitutions/scope decisions: No replacement proposed. Directory omitted because no valid directory page was established; adding one later requires evidence and approval.
- Any later application, student portal, login, tour RSVP or inquiry submission must be explicitly labeled simulation. No live form was submitted. Local inline search data would be a simulation of inferred result behavior, requiring approval; no backend/API replication proposed.

## UNI-06

- Source ID: UNI-06; category university; subcategory/stratum: community college.
- Actual organization: **Community College of Philadelphia**; canonical homepage: https://www.ccp.edu/.
- Attempted verification: 2026-11-12 UTC; HTTP-only GET plus web search/text extraction; result **UNVERIFIED**. Evidence: `evidence/UNI-http-2026-11-12.json` entries keyed by URL; CCP additionally has extraction evidence below.

### Source-to-local page map

| Source URL | Actual title evidence | Proposed local file | Evidence/result |
|---|---|---|---|
| https://www.ccp.edu/ | Community College of Philadelphia / Community College of Philadelphia | `index.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/degrees-programs/all-academic-offerings/program-finder | Program Finder / Community College of Philadelphia | `programs.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/degree-programs/biology | Biology / Community College of Philadelphia | `biology.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/admission-aid/admissions/admissions-process | Admissions Process / Community College of Philadelphia | `admissions.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/admission-aid/paying-college/tuition-fees | Tuition & Fees / Community College of Philadelphia | `tuition-fees.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/admission-aid/admissions/admissions-events | Admissions Events / Community College of Philadelphia | `visit.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/about-ccp/news-events/event-calendar | Events Calendar / Community College of Philadelphia | `events.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/about-ccp/mission-and-leadership/offices-departments | Offices & Departments / Community College of Philadelphia | `offices.html` | Web text extraction only; origin availability UNVERIFIED |
| https://www.ccp.edu/about-ccp/news-events/newsroom | Newsroom / Community College of Philadelphia | `news.html` | Web text extraction only; origin availability UNVERIFIED |

`404.html` is an intentional local addition for approval, outside source_pages because it is not a canonical content page. Missing-path probe returned HTTP 403 challenge, not an observed source 404.

### Key regions

- Utility links, audience navigation and four nested topic groups
- Home program/cost/admissions feature links, upcoming events and news
- Program finder keyword, degree-level and interest controls plus card/list affordances
- Biology summary metrics and requirement/learning/sequence sections
- Admissions steps by student type; visit events with external RSVP routes
- Tuition residency sections and fee tables
- Event keyword/type/location/audience controls and pagination
- News keyword/category/year controls; alphabetical offices list and local section navigation

### Interactions

- **observed — Program filtering and view switch:** Controls visible in web-tool extraction: keyword, level, interests, card/list; actual updates inferred and untested.
- **observed — Event filtering/pagination:** Extracted keyword/type/location/audience controls, page-size/page selectors and next-page link; results not exercised.
- **observed — News filtering:** Extracted keyword/category/year inputs; update behavior inferred.
- **observed — Offices alphabetical navigation:** A–Z links in extracted office listing; destination behavior not exercised. This is not a people directory search.
- **observed — Visit/information inquiry:** Admissions-events extraction links externally to apply.ccp.edu for RSVP; no submission made.
- **inferred — Responsive navigation/program sections:** Menu/subnavigation inputs and program section labels indicate disclosures or tabs; rendering and state changes unverified.

### Complexity, stack, limitations and substitutions

- **high complexity:** Provisional from web extraction: nested navigation, program keyword/level/interest controls, card/list views, program sections, event facets/pagination and news filters. Comparable to Claude UNI-03 medium-high; runtime/rendering may change assessment.
- Stack clues: unknown: direct HTML blocked. Web extraction exposes a pantheonsite.io tuition-calculator link; hosting/CMS conclusions cannot be established from that alone.
- Limitations: UNVERIFIED current availability: urllib and curl homepage GETs returned HTTP 403 Just a moment; program listing/detail and missing path also 403. Web tool supplied indexed/extracted text with crawl labels today to four days ago, not a confirmed fresh origin response or render. Browser access host unavailable. Footer/layout and all interactions unverified. All scope provisional; model/version TBD.
- Proposed substitutions/scope decisions: No replacement authorized or chosen. Montgomery College candidate rejected (200 Request Rejected); www2 certificate hostname mismatch. PVCC candidate had issuer verification failure. Neither is a verified substitute. Coordinator may request a fresh CCP verification or another same-stratum source research pass.
- Any later application, student portal, login, tour RSVP or inquiry submission must be explicitly labeled simulation. No live form was submitted. Local inline search data would be a simulation of inferred result behavior, requiring approval; no backend/API replication proposed.

## CCP extraction evidence (not live-origin verification)

All requested 2026-11-12 UTC via web search/open/click. Titles in the map are extractor titles. Home/program/biology direct GET evidence is in the HTTP log; other CCP pages have no direct status measured. Canonical paths were followed from homepage links, except Biology followed from Program Finder.

| Official source | Extraction observations | Crawl label returned |
|---|---|---|
| [Homepage](https://www.ccp.edu/) | Nested topical and audience navigation, program/cost/admission links, event and news sections; footer not captured | today |
| [Program Finder](https://www.ccp.edu/degrees-programs/all-academic-offerings/program-finder) | Keyword, level, interest, card/list controls and linked offerings | yesterday |
| [Biology](https://www.ccp.edu/degree-programs/biology) | Program metrics, image, overview, requirement/learning/sequence labels and curriculum material | four days ago |
| [Admissions Process](https://www.ccp.edu/admission-aid/admissions/admissions-process) | Local navigation, student-type steps, external application links | today |
| [Admissions Events](https://www.ccp.edu/admission-aid/admissions/admissions-events) | Local navigation, events and external RSVP links | today |
| [Tuition & Fees](https://www.ccp.edu/admission-aid/paying-college/tuition-fees) | Residency rates and sample fee tables; calculator/aid links | today |
| [Events Calendar](https://www.ccp.edu/about-ccp/news-events/event-calendar) | Keyword/type/location/audience controls, dated results, page selectors | today |
| [Offices & Departments](https://www.ccp.edu/about-ccp/mission-and-leadership/offices-departments) | Section navigation, A–Z anchors, office links including external destinations | yesterday |
| [Newsroom](https://www.ccp.edu/about-ccp/news-events/newsroom) | Keyword/category/year controls, article summaries | three days ago |

No control was operated. Text extraction may omit layout, footer or client state. A same-day crawl label is not proof of current availability, hence the conservative UNVERIFIED CSV value.

## Comparability and selection bias

Strata align with Codex's explicit assignments. Claude's notes describe medium public-research and medium-high liberal-arts/community-college sources; Codex proposals are high under the required three-level vocabulary. This is not yet a matched inventory. Coordinator must reconcile scope and complexity across all groups, including the open-source reserve, without altering other groups' approved scope by assumption. Page counts differ because observed architectures differ; they are proposals, not quotas.

English-language US sites and HTTP-readable pages are favored by tool access; blocked pages and cached extraction make CCP evidence weaker. Public-research cross-subdomain templates add difficulty. Claude reports curl-only inspection; Codex used urllib/curl plus live search/extraction and attempted unavailable browser access. Open-source tools/budgets are unknown. Distinct source sites confound model comparisons; allocation alone does not establish causal model differences.

## Ten-slot coordination / approval view

The shared CSV is the approval source of truth. No whole-category approval is recorded. Precise generation model/version remains unresolved for every proposed Codex row; external register model labels are not independently authenticated releases.

| Slot | Group | Source / canonical URL | Stratum authority | Scope / approval state |
|---|---|---|---|---|
| UNI-01 | claude | Wisconsin–Madison — https://www.wisc.edu/ (Claude notes only) | Public research per their notes; coordinator reconcile | Central reservation, scope and approval pending; do not overwrite |
| UNI-02 | claude | Swarthmore — https://www.swarthmore.edu/ (Claude notes only) | Small private liberal arts per their notes | Central reservation, scope and approval pending; do not overwrite |
| UNI-03 | claude | NOVA — https://www.nvcc.edu/ (Claude notes only) | Community college per their notes | Central reservation, scope and approval pending; do not overwrite |
| UNI-04 | codex | Penn State — https://www.psu.edu/ | Assigned public research | 8 source pages + 404 proposed; model and approval pending |
| UNI-05 | codex | Dickinson — https://www.dickinson.edu/ | Assigned small private liberal arts | 8 source pages + 404 proposed; model and approval pending |
| UNI-06 | codex | CCP — https://www.ccp.edu/ | Assigned community college | 9 source pages + 404 provisional; availability UNVERIFIED; model and approval pending |
| UNI-07 | open-source | **Pending — unknown reservation** | Public research is coordination proposal only | Source, actual scope, model and approval pending |
| UNI-08 | open-source | **Pending — unknown reservation** | Small private liberal arts is coordination proposal only | Source, actual scope, model and approval pending |
| UNI-09 | open-source | **Pending — unknown reservation** | Community college is coordination proposal only | Source, actual scope, model and approval pending |
| UNI-10 | open-source | **Pending — unknown reservation** | Additional public research reserve is coordination proposal only | Source, actual scope, model and approval pending |

**Stop before implementation.** Coordinator action required: reserve Claude's noted URLs centrally, disclose open-source reservations, reconcile source-specific scope/complexity and exact model mapping, and resolve CCP availability or approve research of a same-stratum substitute. Then obtain project-lead approval for all ten sources, scope and model assignments under Rules.md §3 and MODEL_ALLOCATION.md §4. No approval cells have been filled and no Claude waiver is inherited.


## Approved replacement addendum — 2026-11-13T00:11:23.688078+00:00

Approval record: [replacement-approval-2026-11-13.json](evidence/replacement-approval-2026-11-13.json). The user explicitly approved the replacements with the disclosed web-retrieval limitations. No shared-protocol amendment or build execution is inferred.

### UNI-06 current selection — Wake Technical Community College

Replaces Community College of Philadelphia. Canonical URL: https://www.waketech.edu/. Stratum: community college. Complexity: high.

Approved mapping:
- `index.html` ← https://www.waketech.edu/
- `programs.html` ← https://www.waketech.edu/catalog/programs-study
- `admissions.html` ← https://www.waketech.edu/admissions
- `program-detail.html` ← https://www.waketech.edu/programs-courses/credit/business-administration/degrees-programs/a25120a
- `tuition.html` ← https://www.waketech.edu/student-services/registration-student-records/payment-deadlines

Observed regions: Apply/aid/info/search utility links; Career-field homepage bands; Credential tables; Program subnavigation and detail metadata; Admissions and tuition information.

Observed affordances, not executed behavior: Program links and credential rows; Apply, request-information and virtual-tour links; Program local-menu affordance.

Verified using connected web search/page-open text retrieval at 2026-11-13T00:07:47Z. Retrieval may be indexed/cached; fresh origin HTTP, rendered/mobile layout, keyboard and submission behavior remain unverified. Direct shell GET failed DNS resolution. The approved CSV status must be read with this method and its limitations.

Limitations: Mobile-menu activation, filtering and form submission are untested; Application and virtual-tour destinations are external; simulate or disclose rather than embed; Do not assume a filterable program finder from the listing table.
