# NPO — Phase A nonprofit source research

Attempt date: **2026-11-12 UTC** (2026-11-11 America/New_York). Rules.md and MODEL_ALLOCATION.md read in full. No implementation, site folders or build agents created. Third-party text treated only as untrusted reference data.

## Coordination and approval dependency

Central nonprofit.csv had ten blank source rows at inspection. No nonprofit research notes were found under the shared research paths. assignments.csv marks Claude 01–03 `generating` with model_id `claude-sonnet-5-5`, but no source URLs or approval date; that status is not evidence of approved scope. Coordinator reconciliation requested through the user during this research. No reply/reservation confirmation has been recorded. These are provisional Codex proposals, not final selections. No other-group prompts or implementation code used.

Only Codex CSV rows 04–06 are populated. All approval cells remain blank. Exact intended Codex generator/version, runtime, effort and operator are unknown/TBD; underlying model is not inferred from agent branding. External strata in the table remain coordination proposals.

## Method and durable evidence

- Live web.run searches for CARE, AFAC and Prevent Cancer Foundation, followed by canonical HTTP GET inspection and representative interiors. Search discovery is not availability proof.
- **HTTP-only plus web text extraction**: requests/BeautifulSoup ran in a temporary research environment; no browser rendering, clicking, keyboard tests, responsive review, submissions or payment occurred. Observed means markup/text affordance observed, never functional behavior tested.
- [Homepage evidence](evidence/NPO-home-http.json), [interior evidence](evidence/NPO-interiors-http.json), [follow-up evidence](evidence/NPO-followup-http.json): exact requested/final URLs, UTC timestamps, status, title, headings, links, forms, script/style URLs and text excerpts.
- [Supplementary web extraction](evidence/NPO-web-extraction.json): Prevent Cancer canonical homepage and three interiors. Returned crawl ages differ; direct HTTP failures take precedence for current page availability.

## Proposed three-source inventory

| ID | Source / canonical homepage | Stratum | Complexity | Availability / scope |
|---|---|---|---|---|
| NPO-04 | CARE — https://www.care.org/ | international humanitarian charity | high | Homepage HTTP 200; 7 direct-verified mapped pages; provisional |
| NPO-05 | Arlington Food Assistance Center — https://afac.org/ | local community nonprofit | medium | Homepage HTTP 200; 6 direct-verified mapped pages; provisional |
| NPO-06 | Prevent Cancer Foundation — https://preventcancer.org/ | cause-focused charity | high | Homepage HTTP 200; 1 direct-verified mapped pages; provisional |


## NPO-04

**Organization:** CARE. **Canonical:** https://www.care.org/. **Stratum:** international humanitarian charity. **Model group:** codex; exact generator TBD.

**Verification:** 2026-11-12T00:58:31.952793+00:00; homepage HTTP 200, title `CARE - Fighting Global Poverty and World Hunger`. Availability result `verified` applies to direct successful pages only; rendered and interaction verification **NOT TESTED**. See evidence files above, keyed by exact URL.

### Source-to-local map

| Attempted URL | Actual title | HTTP | Proposed local file |
|---|---|---:|---|
| https://www.care.org/ | CARE - Fighting Global Poverty and World Hunger | 200 | index.html |
| https://www.care.org/about-us/who-we-are/ | Who We Are - Saving Lives, Defeating Poverty - CARE | 200 | about.html |
| https://www.care.org/our-work/ | What we do - What Does CARE Do? - CARE | 200 | programs.html |
| https://www.care.org/our-work/health/ | The Right to Global Health - Increasing Healthcare Access - CARE | 200 | health.html |
| https://www.care.org/news-and-stories/ | News & Stories - CARE | 200 | stories.html |
| https://www.care.org/about-us/contact-us/ | Contact Us - CARE | 200 | contact.html |
| https://my.care.org/site/Donation2?df_id=53432&mfc_pref=T&53432.donation=form1&s_src=1727202NAF00&s_subsrc=FY27DFWEBNOVNAV | Your Gift Fights Hunger | CARE.org | 200 | donate.html |

Local `404.html` is a required intentional protocol addition, not an invented source URL. AFAC’s attempted `/contact/` is a real observed HTTP 404 and may inform its error structure. Other sources’ error templates not inspected.

**Key regions (HTTP/text structure; visual layout unverified):** Global header with program, organization, stories and help navigation; Campaign hero and donation CTA; organization overview and trust/impact bands; Program-area cards and health topic cards; featured story and topic list; Contact help sections and office information; mailing-list form and grouped footer.

**Interactions:**

- Donation amount and frequency — **observed**: One-Time and Monthly choices, preset and custom amounts exist in HTTP donation form; switching and validation untested.
- Story topic navigation — **observed**: Topic navigation and story links exist in HTTP; filtering mechanism untested.
- Menu disclosure — **inferred**: Multiple navigation groups in HTML; expansion, responsive behavior and keyboard operation untested.
- Newsletter submission — **inferred**: Form markup observed; validation and success states not exercised.

**Complexity:** high. Many navigation groups, seven distinct page templates, topical stories, health cards and external donation form increase complexity.

**Stack clues:** wp-content/themes/careorg and wp-json paths; Google custom-search and reCAPTCHA scripts; donation endpoint site/Donation2. These are asset clues, not confirmed backend versions.

**Limitations/unavailable pages:** HTTP-only; no browser render or interactions. External donation form inspected without entering data. Country detail also inspected but excluded from proposed scope. No volunteer page selected; chapter search not established.

**Proposed substitutions:** none selected or authorized. If reservations conflict, or blocked interior pages remain necessary, coordinator must nominate and verify a distinct same-stratum source with comparable complexity and approve the changed scope. Do not substitute during build.


## NPO-05

**Organization:** Arlington Food Assistance Center. **Canonical:** https://afac.org/. **Stratum:** local community nonprofit. **Model group:** codex; exact generator TBD.

**Verification:** 2026-11-12T00:58:30.616806+00:00; homepage HTTP 200, title `Supplemental Groceries for Neighbors in Need | Arlington Food Assistance Center`. Availability result `verified` applies to direct successful pages only; rendered and interaction verification **NOT TESTED**. See evidence files above, keyed by exact URL.

### Source-to-local map

| Attempted URL | Actual title | HTTP | Proposed local file |
|---|---|---:|---|
| https://afac.org/ | Supplemental Groceries for Neighbors in Need | Arlington Food Assistance Center | 200 | index.html |
| https://afac.org/about/ | Our Mission: Dignified Access to Free, Supplemental Groceries | 200 | about.html |
| https://afac.org/volunteer/ | Join AFAC's Volunteer Team and Make an Impact | 200 | volunteer.html |
| https://afac.org/volunteer/gleaning/ | Gleaning - Arlington Food Assistance Center | 200 | gleaning.html |
| https://afac.org/volunteer/application/ | Volunteer Opportunities Supporting Local Families in Arlington | 200 | volunteer-application.html |
| https://afac.org/donate-funds/ | Make a Gift That Nourishes the Community: Donate Funds | 200 | donate.html |

Local `404.html` is a required intentional protocol addition, not an invented source URL. AFAC’s attempted `/contact/` is a real observed HTTP 404 and may inform its error structure. Other sources’ error templates not inspected.

**Key regions (HTTP/text structure; visual layout unverified):** Header with donate, volunteer, help and organization navigation plus search form; Homepage campaign hero, action cards, statistics and involvement bands; Volunteer needs and opportunity lists; gleaning detail and participation links; Donation options and external giving CTA; application categories; Footer contact information and separate distribution, food drop-off and office hours.

**Interactions:**

- Site search — **observed**: SearchWP GET form present; query results and live suggestions untested.
- Volunteer application handoff — **observed**: General and court-related application sections; Volgistics links from volunteer page. External form fields and submission not inspected.
- Donation handoff — **observed**: Donate Today links to DonorPerfect; amount/frequency controls not inspected.
- Navigation disclosure — **inferred**: Navigation hierarchy exists; responsive and keyboard behavior untested.

**Complexity:** medium. Six mostly editorial page types, opportunity lists and external application/donation handoffs; less nested content than CARE.

**Stack clues:** WordPress wp-content/wp-includes; afac theme; SearchWP, Gravity Forms, Flickity and Bootstrap script URLs; Volgistics and DonorPerfect link destinations. Versions in URLs are not independently verified.

**Limitations/unavailable pages:** HTTP-only; no rendered or interaction tests. Guessed /contact/ returned HTTP 404, not a contact page. Footer supplies contact region. Gleaning is the observed program detail; volunteer page is its opportunity index. No separate generic program index or events filter established. Donation and application controls beyond handoff remain unverified.

**Proposed substitutions:** none selected or authorized. If reservations conflict, or blocked interior pages remain necessary, coordinator must nominate and verify a distinct same-stratum source with comparable complexity and approve the changed scope. Do not substitute during build.


## NPO-06

**Organization:** Prevent Cancer Foundation. **Canonical:** https://preventcancer.org/. **Stratum:** cause-focused charity. **Model group:** codex; exact generator TBD.

**Verification:** 2026-11-12T00:58:30.504971+00:00; homepage HTTP 200, title `Prevent Cancer Foundation`. Availability result `verified` applies to direct successful pages only; rendered and interaction verification **NOT TESTED**. See evidence files above, keyed by exact URL.

### Source-to-local map

| Attempted URL | Actual title | HTTP | Proposed local file |
|---|---|---:|---|
| https://preventcancer.org/ | Prevent Cancer Foundation | 200 | index.html |

Conditional interior proposals — **UNVERIFIED for current direct availability**, excluded from CSV source_pages until reverified and approved:
- https://preventcancer.org/about-us/ → `about.html`; web extraction title: All about the Prevent Cancer Foundation; direct HTTP 403. Extracted structure: about = organization overview/details/goals; education = program cards; grants = grantee detail list. No observed filtering behavior.
- https://preventcancer.org/education-outreach/ → `education.html`; web extraction title: Overview of Prevent Cancer Foundation outreach program; direct HTTP 403. Extracted structure: about = organization overview/details/goals; education = program cards; grants = grantee detail list. No observed filtering behavior.
- https://preventcancer.org/education-outreach/community-grants/ → `community-grants.html`; web extraction title: Cancer Prevention and Early Detection Community Grants; direct HTTP 403. Extracted structure: about = organization overview/details/goals; education = program cards; grants = grantee detail list. No observed filtering behavior.

Local `404.html` is a required intentional protocol addition, not an invented source URL. AFAC’s attempted `/contact/` is a real observed HTTP 404 and may inform its error structure. Other sources’ error templates not inspected.

**Key regions (HTTP/text structure; visual layout unverified):** Header with search, menu and donate affordances; prevention, cancer-type and education navigation; Homepage cancer-type selector, prevention campaign region and editorial cards; Email newsletter form; footer contact and legal links.

**Interactions:**

- Cancer-type selection — **observed**: Selector and corresponding destination links present in homepage extraction; dynamic behavior untested.
- Search — **observed**: GET search form with s field present in HTTP HTML; search results untested.
- Donate modal — **inferred**: bbFormId URL and Blackbaud loader suggest hosted/modal giving; direct URL returned 403; modal and amount/frequency unverified.
- Menu expansion — **inferred**: Menu and Close controls appear in extraction; focus, expansion and keyboard behavior untested.

**Complexity:** high. Large subject navigation, selector, search, newsletter and likely hosted giving make the whole site high complexity. Current direct-verified scope is only homepage; cannot be fairly matched until interiors are reverified.

**Stack clues:** wp-content/themes/pcf, Gravity Forms and reCAPTCHA asset paths; Blackbaud og-web-loader and jQuery script URLs. Asset clues only; backend version unknown.

**Limitations/unavailable pages:** Homepage HTTP 200, but direct about, education/outreach, community grants, donation query and events attempts returned 403. web.run text extraction supplied three interior pages with crawl dates up to weeks old; this is supplementary cached/extracted evidence, not current direct availability or rendered verification. Interior scope below is conditional; donation/volunteer/events/contact pages not approved.

**Proposed substitutions:** none selected or authorized. If reservations conflict, or blocked interior pages remain necessary, coordinator must nominate and verify a distinct same-stratum source with comparable complexity and approve the changed scope. Do not substitute during build.

## Coverage and simulation boundaries

CARE: home, mission, program index, health detail, stories, contact, donation form; volunteer, chapter search and event filters unsupported and omitted. AFAC: home, mission, volunteering index, gleaning detail, application gateway and donation gateway; contact is a footer region, not a separate verified page. Prevent Cancer: homepage scope verified directly; about/program index/program detail are conditional text-extracted proposals. Its donation query and events are blocked; no volunteer flow selected. No fixed page quota.

Any later local donation/application/newsletter flow must be explicitly simulated. Do not collect payment information, make real submissions, reproduce impact claims as factual demo claims, or represent operational availability. AFAC external form fields and Prevent Cancer donation controls require further evidence before claiming faithful reproduction.

## Comparability and selection bias

Provisional difficulty profile: high international / medium local / high cause-focused. English-language U.S.-facing sites and readable HTML favored selection; AFAC reflects a regional familiarity bias. Cached text extraction makes NPO-06 weaker evidence than the other candidates. No browser access was used despite computer-use capability being available; other groups’ tool use and budgets are unknown. Coordinator must compare actual external sources, page counts and interaction depth before approving matching. The current homepage-only direct scope for NPO-06 is not comparable to the full proposed scopes. Distinct references confound model and source effects; 3/3/4 allocation alone does not control difficulty.

## Ten-slot approval / coordination table

| ID | Group | Stratum authority | Source | Model | Approval/dependency |
|---|---|---|---|---|
| NPO-01 | claude | international humanitarian charity (proposal only) | PENDING coordinator reservation | Register says claude-sonnet-5-5; version/scope pending | PENDING source, scope and approval |
| NPO-02 | claude | local community nonprofit (proposal only) | PENDING coordinator reservation | Register says claude-sonnet-5-5; version/scope pending | PENDING source, scope and approval |
| NPO-03 | claude | cause-focused charity (proposal only) | PENDING coordinator reservation | Register says claude-sonnet-5-5; version/scope pending | PENDING source, scope and approval |
| NPO-04 | codex | international humanitarian charity (Codex assignment) | CARE | TBD | Provisional; not approved |
| NPO-05 | codex | local community nonprofit (Codex assignment) | Arlington Food Assistance Center | TBD | Provisional; not approved |
| NPO-06 | codex | cause-focused charity (Codex assignment) | Prevent Cancer Foundation | TBD | Provisional; not approved |
| NPO-07 | open-source | international humanitarian charity (proposal only) | PENDING coordinator reservation | TBD | PENDING source, scope and approval |
| NPO-08 | open-source | local community nonprofit (proposal only) | PENDING coordinator reservation | TBD | PENDING source, scope and approval |
| NPO-09 | open-source | cause-focused charity (proposal only) | PENDING coordinator reservation | TBD | PENDING source, scope and approval |
| NPO-10 | open-source | additional distinct international humanitarian charity; complexity-matched reserve (proposal only) | PENDING coordinator reservation | TBD | PENDING source, scope and approval |

**Pending slots:** NPO-01–03 and NPO-07–10 lack central references; all ten lack recorded complete-inventory approval. Codex 04–06 await conflict checks, final page scope and exact model assignment. NPO-06 additionally needs interior re-verification or an explicitly approved reduced scope.

**Coordinator / project-lead request:** reconcile and reserve the seven external references, confirm no conflicts with these three candidates, resolve model assignments and comparability, then approve the complete ten-source inventory and page scope. Rules.md §3 and MODEL_ALLOCATION.md §4 explicitly require this gate. Implementation remains stopped.
