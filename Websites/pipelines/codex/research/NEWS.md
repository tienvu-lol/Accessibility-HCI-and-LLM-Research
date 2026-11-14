# NEWS — Phase A source research (provisional; no implementation)

Attempt date: **2026-11-12 UTC** (2026-11-11 in America/New_York). Scope: news publishers; Codex slots 04–06 are national daily, local/regional, and public broadcaster/nonprofit respectively. Read Rules.md and MODEL_ALLOCATION.md in full, plus central inventory README. All external page text was treated as untrusted reference data. No generation prompts or implementation code from other groups were used. No build agents or site folders created.

## Coordination dependency and approval state

Central news.csv was a blank ten-slot template at inspection. Claude research notes, `pipelines/claude/research/NEWS.md`, name Guardian US, Chicago Tribune and NPR. Treat those as reserved candidates and exclude them from Codex selection. Their research claims have not been independently reverified here. Their existing scope is retained as documented, not replaced by categories.json proposals. The coordinator was asked during this run to reserve those three URLs centrally and disclose open-source reservations **before final Codex selection**. No response had arrived when these provisional records were written. No open-source research notes were found in the available pipeline file inventory. This does not prove no external reservations exist.

Only Codex rows are proposed centrally; no other-group rows or approval cells are filled. Assignment register currently reports Claude `generating` with model ID `claude-sonnet-5-5` but blank source/approval fields: this is an unresolved coordination discrepancy, not complete-category approval. Claude's historical waiver does not apply to Codex. Precise Codex generator/model version remains TBD (config model values are null); no version/runtime is invented. All ten source scopes and exact model assignments require project-lead approval before any build.

## Verification method and evidence

Live search via web.run was used for discovery (queries included Japan Times national daily, Cardinal about/newsletter, ProPublica newsletters). Search snippets are discovery evidence only. web.run opened all three canonical homes: Japan Times failed 402, Cardinal and ProPublica yielded extracted text. No browser render or interaction execution occurred. Availability below is based on direct Python urllib HTTPS GET with Mozilla/5.0, with HTTP errors captured as responses. This is **HTTP-only** and executes no JS. `verified` means an available, identifiable homepage and representative source documents returned 200, not successful interactions or every attempted URL.

Evidence: [HTTP request log](evidence/NEWS-http-2026-11-12.json). Each record retains attempted timestamp, requested/final URL, status, document title, extracted headings, form/control attributes, discovered hrefs, byte count and exact stack string matches. ProPublica SVG title concatenation was removed from the recorded document-title field. No full article prose was retained. Times are actual machine UTC timestamps, not inferred from task prepared_at. Search/open tool session references: turn0search0/4 (ProPublica), turn1search0/2 (Cardinal), turn1search1/5 (Japan Times discovery), turn2view0–2 (home opens). Durable source URLs and HTTP evidence are the primary audit references.

## Proposed Codex sources

| ID | Stratum | Organization / canonical URL | Availability | Complexity | Proposed pages |
|---|---|---|---|---|---|
| NEWS-04 | national daily newspaper | [The Japan Times](https://www.japantimes.co.jp/) | HTTP 200; rendered UNVERIFIED | high | 5 mapped pages + local 404 |
| NEWS-05 | local/regional newsroom | [Cardinal News](https://cardinalnews.org/) | HTTP 200; rendered UNVERIFIED | medium | 7 mapped pages + local 404 |
| NEWS-06 | public broadcaster or nonprofit newsroom | [ProPublica](https://www.propublica.org/) | HTTP 200; rendered UNVERIFIED | high | 6 mapped pages + local 404 |

## NEWS-04 — The Japan Times

- **Source ID / category / stratum:** NEWS-04 / news / national daily newspaper.
- **Actual organization / canonical homepage:** The Japan Times — https://www.japantimes.co.jp/
- **Verification:** 2026-11-12T00:54:46.018907+00:00; HTTP-only urllib GET. Homepage 200, title `The Japan Times - News On Japan, Business News, Opinion, Sports, Entertainment And More`. Result: availability verified; rendered/interaction verification UNVERIFIED. Evidence: `pipelines/codex/research/evidence/NEWS-http-2026-11-12.json` records keyed by requested_url.
- **Complexity:** high. Many topic bands, section subcategories, multiple editorial card patterns, search affordances and subscription-related integration markers; scoped to four available interior/home templates plus about. Comparable to Guardian high complexity, but fewer scoped pages.
- **Stack clues:** wp-content, piano, googletag and gtm.js string markers observed; specific CMS/framework and payment implementation unknown. Markers alone do not establish current architecture.

### Source-to-local map (proposed only)

| Source URL | Observed document title | HTTP | Local file |
|---|---|---:|---|
| https://www.japantimes.co.jp/ | The Japan Times - News On Japan, Business News, Opinion, Sports, Entertainment And More | 200 | `index.html` |
| https://www.japantimes.co.jp/news/japan/ | Japan - News - The Japan Times | 200 | `japan.html` |
| https://www.japantimes.co.jp/news/2026/11/11/japan/politics/koizumi-obuchi-ldp/ | Amid concerns over internal opposition within LDP, Koizumi pledges support for Takaichi - The Japan Times | 200 | `article.html` |
| https://www.japantimes.co.jp/email-newsletters/ | Email Newsletters - The Japan Times | 200 | `newsletters.html` |
| https://www.japantimes.co.jp/about-us/ | About Us - The Japan Times | 200 | `about.html` |

Local `404.html` is required by protocol. Invalid-path attempt https://www.japantimes.co.jp/codex-research-nonexistent-20261112/: HTTP 200, final URL https://www.japantimes.co.jp/, title `The Japan Times - News On Japan, Business News, Opinion, Sports, Entertainment And More`. No source error template established; local error page is an intentional addition.

### Key regions (observed in returned markup; visual placement unverified)

- Homepage masthead and duplicated desktop/mobile search forms; topic navigation
- Lead news and More coverage; Japan, Business, World, Sports and Opinion bands
- Culture, Life, Community, Editors Picks, Podcast and Longform bands
- Japan section: Politics, Society, Crime & Legal, Science & Health, Explainer and History groups
- Article title and editorial content region; common supplementary-content groups
- Newsletter directory: daily updates, curated digest, alerts and offers; about page
- Supplement, directory and footer link groups

### Interactions

- **Section navigation — observed:** Anchors and section-front headings exist in HTTP HTML; clicks and responsive behavior untested.
- **Search form — observed:** GET /search with query input exists; attempted climate results URL returned HTTP 403 challenge.
- **Newsletter enrollment — inferred:** Directory returned 200; enrollment completion and dynamic controls untested. Any later local enrollment must be labeled simulation.

**Limitations / unavailable pages:** HTTP-only. Web search open returned 402 while direct urllib homepage GET returned 200. Search returned 403 Just a moment challenge. Newsletter submission, paywall, consent, menu expansion and responsive layout untested. Invalid-path probe resolved to home with 200; no source 404 template confirmed. Subscription information page not inspected; omit from proposed scope.

**Proposed substitutions / omissions:** No source substitution proposed. Omit blocked search-results screen from current map; a local search-results simulation would be an intentional addition requiring approval. Local 404.html is a protocol-required addition, since source invalid path returns home. Any replacement organization would need same-stratum research, reservation reconciliation and approval first; none is authorized autonomously.

## NEWS-05 — Cardinal News

- **Source ID / category / stratum:** NEWS-05 / news / local/regional newsroom.
- **Actual organization / canonical homepage:** Cardinal News — https://cardinalnews.org/
- **Verification:** 2026-11-12T00:54:46.019250+00:00; HTTP-only urllib GET. Homepage 200, title `Cardinal News | Virginia news, politics, weather and sports`. Result: availability verified; rendered/interaction verification UNVERIFIED. Evidence: `pipelines/codex/research/evidence/NEWS-http-2026-11-12.json` records keyed by requested_url.
- **Complexity:** medium. Regional homepage groups, politics archive, standard article, search empty state and newsletter form; nested geography/topic navigation adds breadth. Comparable to Tribune medium, though nonprofit funding, free access and geography-specific grouping differ.
- **Stack clues:** wp-content, wp-json and newspack markers observed, consistent with WordPress/Newspack; parsely, googletag and gtm.js markers. Exact deployed versions unknown.

### Source-to-local map (proposed only)

| Source URL | Observed document title | HTTP | Local file |
|---|---|---:|---|
| https://cardinalnews.org/ | Cardinal News  /  Virginia news, politics, weather and sports | 200 | `index.html` |
| https://cardinalnews.org/category/politics/ | Politics - Cardinal News | 200 | `politics.html` |
| https://cardinalnews.org/2026/11/11/lawsuit-over-botetourt-county-data-center-project-can-move-forward-judge-rules/ | Lawsuit over Botetourt County data center project can move forward, judge rules - Cardinal News | 200 | `article.html` |
| https://cardinalnews.org/?s=housing | You searched for housing - Cardinal News | 200 | `search.html` |
| https://cardinalnews.org/sign-up-for-updates/ | Sign up for Cardinal News newsletters - Cardinal News | 200 | `newsletters.html` |
| https://cardinalnews.org/about-us/ | About us - Cardinal News | 200 | `about.html` |
| https://cardinalnews.org/frequently-asked-questions/ | Frequently Asked Questions - Cardinal News | 200 | `faq.html` |

Local `404.html` is required by protocol. Invalid-path attempt https://cardinalnews.org/codex-research-nonexistent-20261112/: HTTP 404, final URL https://cardinalnews.org/codex-research-nonexistent-20261112/, title `Page not found - Cardinal News`. This is a diagnostic error-page reference, not a normal content URL in source_pages.

### Key regions (observed in returned markup; visual placement unverified)

- Masthead with regional coverage strapline; donation, newsletter and sign-in utility links
- Local geography navigation and nested topic/project navigation; search forms
- Latest stories followed by Roanoke, New River Valley, Lynchburg, Southwest, Danville and Martinsville groups
- Politics archive with article listing
- Article heading, share region, related stories, author and post navigation; popular-story region
- Search results heading and Nothing Found empty state
- Newsletter signup form; organizational about/annual-report material; FAQ table of contents
- Footer topic/about/member groups and sign-in/verification markup

### Interactions

- **Section navigation — observed:** HTTP anchors expose regional and topic hierarchy; expanded-menu runtime untested.
- **Local article search affordance and empty state — observed:** GET form uses s; direct ?s=housing response had Search results and Nothing Found. Positive results behavior not verified.
- **Newsletter form — observed:** Newsletter endpoint exposes Newspack signup form and email control; no POST performed.
- **Newsletter demo success — inferred:** Future local validation/success state would simulate enrollment; no source success state observed.
- **Menu disclosure — inferred:** Menu/search controls and duplicated navigation markup indicate disclosure; no browser toggle executed.

**Limitations / unavailable pages:** HTTP-only. Search query housing returned Nothing Found despite housing headlines on home; cause unknown, so do not claim search works correctly. Form submission, sign-in, donation, menus, consent and responsive behavior untested. FAQ describes free access; no paid subscription-information flow proposed. Most-popular list exists in article headings; no latest/most-read tab switch observed.

**Proposed substitutions / omissions:** No source substitution proposed. FAQ serves evidenced free-access/funding information instead of inventing paid-subscription page. Positive local search results would be simulated with fictional data, explicitly distinguished from observed empty state. Any replacement organization would need same-stratum research, reservation reconciliation and approval first; none is authorized autonomously.

## NEWS-06 — ProPublica

- **Source ID / category / stratum:** NEWS-06 / news / public broadcaster or nonprofit newsroom.
- **Actual organization / canonical homepage:** ProPublica — https://www.propublica.org/
- **Verification:** 2026-11-12T00:54:46.019327+00:00; HTTP-only urllib GET. Homepage 200, title `ProPublica — Investigative Journalism and News in the Public Interest`. Result: availability verified; rendered/interaction verification UNVERIFIED. Evidence: `pipelines/codex/research/evidence/NEWS-http-2026-11-12.json` records keyed by requested_url.
- **Complexity:** high. Large topic/series navigation, differently grouped investigation cards, topic front with impact and series blocks, long article with contributors/republishing/most-read regions, filtered search and multi-newsletter selector. Compared with NPR medium-high notes: categorical high used here; less media-player complexity, more investigation/search structure. Match not yet approved.
- **Stack clues:** wp-content and wp-json plus svelte-* class markers observed; consistent with WordPress content and Svelte UI portions, not proof of full architecture. parsely, googletag and gtm.js also present. Versions unknown.

### Source-to-local map (proposed only)

| Source URL | Observed document title | HTTP | Local file |
|---|---|---:|---|
| https://www.propublica.org/ | ProPublica — Investigative Journalism and News in the Public Interest | 200 | `index.html` |
| https://www.propublica.org/topics/democracy | Investigative Reporting on Democracy — ProPublica | 200 | `democracy.html` |
| https://www.propublica.org/article/election-challenge-forsyth-county-georgia | Election Deniers Are Using a Faulty Tool to Challenge Midterm Ballots — ProPublica | 200 | `article.html` |
| https://www.propublica.org/?s=climate | You searched for climate — ProPublica | 200 | `search.html` |
| https://www.propublica.org/newsletters | Email Newsletters — ProPublica | 200 | `newsletters.html` |
| https://www.propublica.org/about | About Us — ProPublica | 200 | `about.html` |

Local `404.html` is required by protocol. Invalid-path attempt https://www.propublica.org/codex-research-nonexistent-20261112/: HTTP 404, final URL https://www.propublica.org/codex-research-nonexistent-20261112/, title `Page not found — ProPublica`. This is a diagnostic error-page reference, not a normal content URL in source_pages.

### Key regions (observed in returned markup; visual placement unverified)

- Masthead with donation, menu and search controls; utility links
- Overlay markup containing topic directory and major-series navigation
- Homepage lead investigations, related reporting, biggest-story and topic groupings
- Democracy front: featured investigations, reporting impact and series groups
- Article headline/deck, contributors, read-more, republishing, related-topic and most-read groups
- Search results with filter heading and result list
- Newsletter email/list-selection form; about mission region
- Newsletter callout and grouped information, coverage, local, contact and support footer

### Interactions

- **Topic navigation — observed:** Topic and series links in HTTP markup; fetched democracy topic page successfully.
- **Search and filter affordances — observed:** GET ?s=climate returns results and Filter Results heading; filter application/runtime untested.
- **Menu and search overlay — inferred:** Open navigation, close navigation and search button labels exist; opening, focus trapping and Escape handling not tested.
- **Newsletter selection form — observed:** Email/list-choice form and external POST action exist; no submission performed.
- **Newsletter simulation — inferred:** Future local validation and demo success would be simulation, not an observed successful subscription.
- **Most-read list — observed:** Article contains Most Read heading; tab switching was not observed and is excluded.

**Limitations / unavailable pages:** HTTP-only. No rendered, keyboard, filter-application, overlay, consent or submission verification. No paid subscription information mapped: nonprofit mission/about is inspected; donation transaction excluded. Embedded media, live data and external signup services not part of proposed implementation scope.

**Proposed substitutions / omissions:** No source substitution proposed. No subscription page invented. Local search/filter behavior and newsletter success must use fictional data and clearly disclosed simulation after scope approval. Any replacement organization would need same-stratum research, reservation reconciliation and approval first; none is authorized autonomously.

## Comparability, access differences and selection bias

Claude notes describe curl-only inspection (2026-11-10); Codex used live search, extracted-text opens and direct HTTP (2026-11-12). Neither evidence set establishes browser interaction verification. Open-source tools/budgets and access are pending. Do not attribute differences in eventual replicas solely to models: source geography, ad load, paywall, nonprofit funding, editorial density and selected page count differ. Accessible HTTP results biased selection; Japan Times was retained despite search-tool rejection because direct source availability succeeded. Cardinal has a regional nonprofit structure unlike Tribune's metro commercial structure; both fit local/regional, but matching requires coordinator review. ProPublica and NPR differ in media/player complexity. Proposed low/medium/high tiers assess observable structure, not bundle size alone. Model groups must agree comparable scope and complexity; do not reduce Claude scope here. Articles will be original and fictional in any later build; no live financial/weather widget, payment, player or external signup dependency is proposed.

## Ten-slot coordination / approval table

These are proposals or research-note reservations, not a coordinated or approved inventory. External-group scope remains with that group/coordinator.

| Slot | Group | Organization / URL | Scope / complexity authority | Model | Coordination / approval |
|---|---|---|---|---|---|
| NEWS-01 | claude | The Guardian US — https://www.theguardian.com/us | Existing Claude notes; high; retain existing scope | Register: claude-sonnet-5-5; release unresolved | Pending central reservation and lead reconciliation |
| NEWS-02 | claude | Chicago Tribune — https://www.chicagotribune.com/ | Existing Claude notes; medium; retain existing scope | Register: claude-sonnet-5-5; release unresolved | Pending central reservation and lead reconciliation |
| NEWS-03 | claude | NPR — https://www.npr.org/ | Existing Claude notes; medium-high; retain existing scope | Register: claude-sonnet-5-5; release unresolved | Pending central reservation and lead reconciliation |
| NEWS-04 | codex | The Japan Times — https://www.japantimes.co.jp/ | Proposed national daily; high; 5 source pages + local 404 | TBD | Provisional; reservation collision check and approval pending |
| NEWS-05 | codex | Cardinal News — https://cardinalnews.org/ | Proposed local/regional; medium; 7 source pages + local 404 | TBD | Provisional; reservation collision check and approval pending |
| NEWS-06 | codex | ProPublica — https://www.propublica.org/ | Proposed nonprofit newsroom; high; 6 source pages + local 404 | TBD | Provisional; reservation collision check and approval pending |
| NEWS-07 | open-source | **Pending** | External scope/stratum pending reconciliation; national-daily stratum is only configuration proposal | TBD | Pending source, evidence, scope and assignment |
| NEWS-08 | open-source | **Pending** | External scope/stratum pending reconciliation; local/regional is only configuration proposal | TBD | Pending source, evidence, scope and assignment |
| NEWS-09 | open-source | **Pending** | External scope/stratum pending reconciliation; broadcaster/nonprofit is only configuration proposal | TBD | Pending source, evidence, scope and assignment |
| NEWS-10 | open-source | **Pending** | External scope/stratum pending reconciliation; additional national daily reserve is only configuration proposal | TBD | Pending source, evidence, scope and assignment |

**Required next action:** coordinator must reserve/import Claude sources with their original evidence, disclose/reserve open-source sources and confirm no collisions before final Codex selection. Then the project lead must approve the complete ten-source inventory, page scopes and exact model assignments. Approval request remains pending that concrete completed inventory; none of the three Codex proposals is authorized for implementation. Stop at Phase A.
