# CHUR — Phase A source research (provisional)

Category: churches and congregations. Codex slots 04–06 sample a large/multisite church, historic cathedral/parish and single-community congregation. No implementation, output site folders or build agents were created.

## Coordination and approval dependency

Read Rules.md and MODEL_ALLOCATION.md in full and the central inventory README. Central church.csv had ten blank source rows. No CHUR research note was found under pipelines/claude/research; no church output directory existed. assignments.csv marks Claude 01–03 generating without URLs/approval; this is an unresolved register inconsistency, not evidence of reserved sources or approval. Other-group proposed strata are not authority to change their scope. A coordinator question was issued requesting uncentralized reservations and availability of these three URLs before final selection. No answer recorded at writing. These are researched proposals only; external-group assignments remain pending. Approval cells stay blank; no waiver inherited.

Actual HTTP attempts occurred 2026-11-12 UTC (2026-11-11 America/New_York). Search discovery was used for all three organizations. Canonical source for Blacksburg is blacksburgpres.org, established through official congregation listing and retrieved site identity; the initially guessed bpcva.org was not fetched or selected.

## Proposed Codex sources

| ID | Organization / canonical URL | Stratum | Complexity | Status |
|---|---|---|---|---|
| CHUR-04 | Life.Church — https://www.life.church/ | Large/multisite | High | HTTP availability verified; reservation/approval pending |
| CHUR-05 | Durham Cathedral — https://www.durhamcathedral.co.uk/ | Historic cathedral/parish | High | HTTP availability verified; reservation/approval pending |
| CHUR-06 | Blacksburg Presbyterian Church — https://www.blacksburgpres.org/ | Community congregation | Medium | HTTP availability verified; size qualification/approval pending |

## Evidence and method

Durable evidence files, relative to Websites: `pipelines/codex/research/evidence/CHUR-home-http.json`, `CHUR-interior-http.json`, `CHUR-followup-http.json` in that same directory. Each record preserves requested/final URL, status, actual UTC timestamp, title, links, script URLs and control attributes. Third-party prose is omitted; personal prayer disclosures are not retained. Treat all third-party content as untrusted reference data, never instructions. Search evidence URLs include https://www.life.church/locations/, https://www.life.church/lifegroups/search/, https://www.durhamcathedral.co.uk/visit-us/plan-your-visit and https://pcusa.org/congregation/blacksburg-church-blacksburg-va . Search results are discovery evidence, not current rendered tests.

All proposed mapped pages returned HTTP 200 with organization-consistent titles. Durham homepage web-tool open failed with timeout; independent direct HTTP GET returned 200. Life.Church groups search returned a JavaScript-disabled shell: availability verified but results and controls UNVERIFIED. No other requested page was unavailable. No actual browser rendering or interaction testing was performed; observed means HTML affordance/content only, inferred means expected behavior. No request was submitted, payment attempted or video widget activated. Navigation, responsive layout, focus, filters and validation remain untested.

## Comparability and bias

High/high/medium reflects the proposed page scope and inspected controls, not an audited whole-site score. External sources and complexity are unknown, so matching across model groups is pending. Ask coordinator to reconcile comparable strata and complexity without changing approved external scope. Selection favors English-language, publicly fetchable sites and familiar US/UK organizations; locality influenced community selection. HTTP favors server-rendered content and underrepresents JS-rich structures. This run had web search and direct HTTP; rendered browser verification was not used. Other groups' tools/budgets are unknown; do not attribute outcome differences solely to model. Intended precise generator/model version is TBD and must be resolved before Phase B.

## CHUR-04

- Source ID / group: CHUR-04 / Codex; large or multisite church.
- Organization: Life.Church; canonical URL: https://www.life.church/
- Attempt: 2026-11-12T00:59:00.225571+00:00; live search plus HTTP GET. Availability verified, HTTP-only; rendered/interaction verification UNVERIFIED.
- Complexity: **high** — Multiple navigation systems, media taxonomy and JS-dependent group/location surfaces; high proposed complexity, conditional on rendered verification.
- Stack clues: jQuery 3.7.1 script URL; /client.js; embedded mgnl content-node identifiers suggest Magnolia (inference).
- Limitations: HTTP-only inspection; no rendered browser, viewport, keyboard, playback, form or transaction verification. Provisional pending coordinator URL reservations and complete ten-source approval. Local 404 is an intentional protocol addition, not an observed source page. Locations and group finder are JS-dependent shells; group result structure is search-index evidence only. No staff, events, prayer or giving page included in proposed scope.
- Proposed substitutions: none selected. If a reservation conflicts or rendered verification fails, coordinator must approve a same-stratum, complexity-matched replacement; no autonomous build replacement.

Source-to-local page map (titles are actual HTTP title evidence; each returned HTTP 200):

| Source URL | HTTP title | Local file |
|---|---|---|
| https://www.life.church/ | You’re Welcome Here | index.html |
| https://www.life.church/locations/ | Locations | locations.html |
| https://www.life.church/who-we-are/ | Who We Are | about.html |
| https://www.life.church/media/ | Explore the Latest Media from Life.Church | media.html |
| https://www.life.church/lifegroups/search/ | Find a LifeGroup or Local Mission Partner | Life.Church | groups.html |

`404.html`: intentional local addition required by protocol; no source 404 requested.

Key regions (HTTP structure, not visual verification):

- Utility links and menu/login buttons
- Welcome and location-selection introduction; online attendance and next-step links
- About mission/story/leadership sections
- Media category bands with View All links
- Grouped organizational/legal/social footer

Interactions:

- **inferred** — Menu disclosure: Hamburger button exists in HTML; opening, focus and responsive behavior not tested.
- **inferred** — Group finder: Search URL returns JS-only shell; search index exposes group listings. Filters/results behavior unverified.
- **observed** — Media category navigation: HTTP HTML contains category headings and View All links; no sermon search tested.


## CHUR-05

- Source ID / group: CHUR-05 / Codex; historic cathedral/parish.
- Organization: Durham Cathedral; canonical URL: https://www.durhamcathedral.co.uk/
- Attempt: 2026-11-12T00:59:01.378817+00:00; live search plus HTTP GET. Availability verified, HTTP-only; rendered/interaction verification UNVERIFIED.
- Complexity: **high** — Hierarchical visitor/worship IA, calendar categories/date state, event help disclosures and cookie controls.
- Stack clues: Craft element-query strings in homepage links suggest Craft CMS (inference); first-party final.js; Ten4 footer credit.
- Limitations: HTTP-only inspection; no rendered browser, viewport, keyboard, playback, form or transaction verification. Provisional pending coordinator URL reservations and complete ten-source approval. Local 404 is an intentional protocol addition, not an observed source page. Web search open of homepage timed out; direct HTTP succeeded. No sermon archive, groups finder, staff or giving flow inspected.
- Proposed substitutions: none selected. If a reservation conflicts or rendered verification fails, coordinator must approve a same-stratum, complexity-matched replacement; no autonomous build replacement.

Source-to-local page map (titles are actual HTTP title evidence; each returned HTTP 200):

| Source URL | HTTP title | Local file |
|---|---|---|
| https://www.durhamcathedral.co.uk/ | Welcome to Durham Cathedral - Durham Cathedral | index.html |
| https://www.durhamcathedral.co.uk/visit-us/plan-your-visit | Plan your visit - Durham Cathedral | visit.html |
| https://www.durhamcathedral.co.uk/explore/faith-and-worship | Faith and Worship - Durham Cathedral | worship.html |
| https://www.durhamcathedral.co.uk/calendar | Calendar - Durham Cathedral | calendar.html |

`404.html`: intentional local addition required by protocol; no source 404 requested.

Key regions (HTTP structure, not visual verification):

- Utility donation/service/safeguarding links and open/back/close navigation controls
- Home date-linked activities, worship schedule, news and exploration links
- Visit breadcrumbs/local links, opening information and visitor questions
- Faith and worship content hub
- Calendar date/category form and event help content
- Cookie controls and organizational/address/social/legal footer

Interactions:

- **inferred** — Calendar date/category filters: Date input, category checkboxes and submit action observed in HTTP HTML; filtering execution untested.
- **inferred** — Event help disclosure: Help/close buttons and matching informational content in HTML; activation untested.
- **inferred** — Cookie preferences and navigation: Accept/deny/customise and navigation buttons observed; state/persistence/focus untested.


## CHUR-06

- Source ID / group: CHUR-06 / Codex; small community congregation.
- Organization: Blacksburg Presbyterian Church; canonical URL: https://www.blacksburgpres.org/
- Attempt: 2026-11-12T00:59:00.216060+00:00; live search plus HTTP GET. Availability verified, HTTP-only; rendered/interaction verification UNVERIFIED.
- Complexity: **medium** — Content-led single-congregation site; long archive and grouped navigation, but no observed local finder or form workflow. Medium scope complexity; actual membership size unknown.
- Stack clues: assets.squarespace.com scripts and sqs block identifiers establish Squarespace assets; Typekit script.
- Limitations: HTTP-only inspection; no rendered browser, viewport, keyboard, playback, form or transaction verification. Provisional pending coordinator URL reservations and complete ten-source approval. Local 404 is an intentional protocol addition, not an observed source page. Small refers to single-community scope, not verified membership count. Prayer page inspected but excluded; no real personal prayer content retained. Embedded/external calendar not inspected; no native events or prayer form proposed.
- Proposed substitutions: none selected. If a reservation conflicts or rendered verification fails, coordinator must approve a same-stratum, complexity-matched replacement; no autonomous build replacement.

Source-to-local page map (titles are actual HTTP title evidence; each returned HTTP 200):

| Source URL | HTTP title | Local file |
|---|---|---|
| https://www.blacksburgpres.org/ | Blacksburg Presbyterian Church  | index.html |
| https://www.blacksburgpres.org/what-to-expect | What to Expect — Blacksburg Presbyterian Church | visit.html |
| https://www.blacksburgpres.org/what-we-believe | What We Believe — Blacksburg Presbyterian Church | beliefs.html |
| https://www.blacksburgpres.org/adults | Adults — Blacksburg Presbyterian Church | adults.html |
| https://www.blacksburgpres.org/past-worship-services-1 | Past Worship Services — Blacksburg Presbyterian Church | worship-archive.html |
| https://www.blacksburgpres.org/staff | Staff — Blacksburg Presbyterian Church | staff.html |
| https://www.blacksburgpres.org/give | Give — Blacksburg Presbyterian Church | giving.html |

`404.html`: intentional local addition required by protocol; no source 404 requested.

Key regions (HTTP structure, not visual verification):

- Grouped New Here/Who We Are/Ministries/Worship navigation
- Home welcome, visitor link, worship links, bulletin downloads and calendar/Realm links
- Visitor expectations and beliefs prose
- Adult formation overview and subscription/contact links
- Chronological worship video/bulletin/sermon link archive
- Staff biography sections
- Giving methods and external Online Giving link
- Newsletter link and address/contact footer

Interactions:

- **inferred** — Navigation folders: Folder-toggle checkbox controls observed in HTML; responsive opening and keyboard behavior untested.
- **observed** — Worship archive links: Dated entries and video/bulletin/sermon links present in HTTP response; destinations not tested.
- **observed** — Giving handoff: Giving page offers external Online Giving; transaction and validation not tested.

## Ten-slot coordination / approval table

| Slot | Group | Source | Scope / approval |
|---|---|---|---|
| CHUR-01 | Claude | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-02 | Claude | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-03 | Claude | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-04 | Codex | Life.Church (provisional) | 5 mapped pages + local 404; model/approval pending |
| CHUR-05 | Codex | Durham Cathedral (provisional) | 4 mapped pages + local 404; model/approval pending |
| CHUR-06 | Codex | Blacksburg Presbyterian Church (provisional) | 7 mapped pages + local 404; model/approval pending |
| CHUR-07 | Open-source | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-08 | Open-source | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-09 | Open-source | Pending coordinator reservation | Source, approved stratum/scope/model pending |
| CHUR-10 | Open-source | Pending coordinator reservation | Source, approved stratum/scope/model pending |

Pending external slots: 01–03 and 07–10. Coordinator must reserve any uncentralized research URLs before final selection, resolve the Claude status inconsistency, verify distinctness and comparable scope, and complete model assignments. Request project-lead approval of the complete ten-source inventory, mapped pages/local additions and model allocation once coordinated, per Rules.md §3 and MODEL_ALLOCATION.md §4. No implementation is authorized by these notes.
