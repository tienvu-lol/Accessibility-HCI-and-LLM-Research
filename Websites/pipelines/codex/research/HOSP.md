# HOSP — Phase A source research

Research only; no site code, site output directories or build agents created. Read Rules.md and MODEL_ALLOCATION.md in full, plus the central inventory README, current healthcare CSV, assignment rows and Claude source notes. Third-party content was treated only as untrusted reference data.

## Proposed Codex sources — provisional reservations

| ID | Stratum | Organization | Complexity | Availability / scope |
| --- | --- | --- | --- | --- |
| HOSP-04 | Academic medical center | [Duke Health](https://www.dukehealth.org/) | high | Direct HTTP 200; 9 mapped pages + intentional local 404 |
| HOSP-05 | Community/regional hospital | [EvergreenHealth](https://www.evergreenhealth.com/) | medium | Web text readable, direct HTTP 403; 8 mapped pages + local 404 |
| HOSP-06 | Children’s hospital | [Nationwide Children’s Hospital](https://www.nationwidechildrens.org/) | high | Direct HTTP 200; 10 mapped pages + local 404 |

`verified` denotes availability evidence only. All inspection was HTTP/text-only; web search/extraction is not a rendered browser. No interactions were executed or medical/appointment data submitted. Observed controls below mean present in retrieved markup/text, not tested behavior. All live flows would require explicitly disclosed local simulations and fictional directory data; no real advice, triage, emergency response, scheduling or patient access.

## Coordination and provenance

The central CSV was blank for all ten source names at start. Claude's `pipelines/claude/research/HOSP.md` records UCSF Health, Hoag and CHOP with claimed 2026-11-10 curl evidence. Those three are treated as reserved and excluded from Codex candidates; their research has not been independently verified here or imported into their rows. The coordinator was asked during this task to reserve those URLs centrally and disclose open-source reservations **before final selection**. No response had arrived at writing; all Codex sources remain proposals. No other-group prompts or implementation code were used.

`metadata/assignments.csv` lists Claude healthcare rows as generating but contains blank source URLs and approval dates; this is a coordination discrepancy, not approval evidence. Other-group strata from the supplied configuration remain proposals, not authority to revise their scope. No open-source research folder/reservations were found in the local searches. Unknown does not mean available for reassignment.

Actual generation model/version/runtime/operator are unresolved in supplied config; no precise model assignment is invented. Approval requires those values and the complete ten-source scope. Approval fields remain blank. Existing unrelated workspace changes are untouched.

Tool bias: these are US English patient-facing sites selected for retrievable content. Bot protection and text extraction hide dynamic features and visual difficulty. Claude notes also used HTTP-only inspection; open-source access is unknown. High/medium/high matches the recorded Claude complexity labels only provisionally, not a controlled causal comparison. Page counts and features differ by actual evidence; rendered review may revise complexity and must precede final scope approval.

## HOSP-04

- **Source / stratum:** Duke Health; healthcare / academic medical center; canonical https://www.dukehealth.org/
- **Attempt:** 2026-11-12 UTC (2026-11-11 America/New_York). Direct Python urllib HTTPS GET with Mozilla/5.0 header plus live search/web text extraction. **HTTP-only availability verified** for mapped pages; rendered layout and interaction verification **NOT TESTED**. Exact request timestamps, final URLs, titles, headings, controls and failures: [HTTP evidence](evidence/HOSP-http-2026-11-12.json).
- **Complexity:** high. High: directory refinements, provider profile, scheduling overlay markup, detailed treatment FAQ structure and multiple content hierarchies. Comparable to Claude UCSF high at a provisional level.
- **Stack clues:** Drupal, drupalSettings and jquery strings in retrieved HTML; custom dukehealth theme paths and Bootstrap-style data-bs-toggle attributes. Versions unknown.
- **Limitations / unavailable pages:** /make-an-appointment returned 404; corrected linked /plan-your-visit/make-an-appointment returned 200. Linked /locations/duke-spine-center-clinic-1b1c returned 500 and is excluded. Synthetic missing path returned HTTP 404, but error layout was not retained. No responsive geometry, screenshots, focus behavior, filter effects, validation, accessibility conformance, or authentication checked.
- **Proposed substitutions:** none selected. Failed detail omitted; any replacement requires same-stratum research and coordinator approval. Reservation remains provisional.

### Source-to-local page map

| Source / actual title | Proposed local file | Availability |
| --- | --- | --- |
| [Duke Health | Connect with your health care at Duke Health](https://www.dukehealth.org/) | `index.html` | HTTP 200 |
| [Treatments for Adults | Duke Health](https://www.dukehealth.org/adult-treatments) | `treatments.html` | HTTP 200 |
| [Tobacco and Smoking Cessation Programs | Duke Health](https://www.dukehealth.org/treatments/smoking-cessation) | `service-detail.html` | HTTP 200 |
| [Find Your Duke Provider | Duke Health](https://www.dukehealth.org/find-doctors-physicians) | `providers.html` | HTTP 200 |
| [Deb A. Bhowmick, MD | Spine Surgeon | Duke Health](https://www.dukehealth.org/find-doctors-physicians/deb-bhowmick-md) | `provider-detail.html` | HTTP 200 |
| [Locations at Duke Health | Duke Health](https://www.dukehealth.org/locations?view=list) | `locations.html` | HTTP 200 |
| [Plan Your Visit | Duke Health](https://www.dukehealth.org/plan-your-visit) | `plan-your-visit.html` | HTTP 200 |
| [Make an Appointment | Duke Health](https://www.dukehealth.org/plan-your-visit/make-an-appointment) | `appointments.html` | HTTP 200 |
| [Billing and Financial Resources | Duke Health](https://www.dukehealth.org/paying-for-care) | `billing.html` | HTTP 200 |

Local `404.html` is an intentional protocol addition; no fabricated source URL is mapped.

### Key regions

- Header with mega-menu toggle and site search
- Home care-task links, news cards, blog and events
- Treatment detail sections and FAQs
- Provider profile: locations, biography, reviews, education and insurance
- Location directory refinement controls
- Grouped policy, contact and related-institution footer

### Interactions

- **observed:** Provider search — HTML specialty/condition/doctor and city/ZIP inputs; results and typeahead behavior untested
- **observed:** Location filters — HTML treatment, patient age, distance and location type selects; clear/apply and load-more buttons; effects untested
- **inferred:** Navigation disclosures — Toggle attributes and controls observed; open/close, keyboard and mobile behavior untested
- **observed:** Appointment choices — Appointment information page and MyChart scheduling affordances; no submission or validation tested
- **observed:** Service navigation and billing — Treatment links, FAQ headings and billing resource page inspected; accordion effects inferred

## HOSP-05

- **Source / stratum:** EvergreenHealth; healthcare / community/regional hospital; canonical https://www.evergreenhealth.com/. Community-owned hospital district identity appears on the Medical Center page.
- **Attempt:** 2026-11-12 UTC (2026-11-11 local). **HTTP/text-only**. Direct urllib homepage GET returned **403 Forbidden**. Web `open`/`click` returned titled HTML text for the pages below, with crawl labels ranging from today to three days ago. Availability is verified only as retrievable through that tool, **not independently confirmed current origin HTTP 200**. No rendered or interaction verification.
- **Evidence:** direct failure recorded in this session; web open canonical homepage, then follow its Find a Doctor, Health Services, Locations, Patients & Visitors, Primary Care and Pay Bill links; follow Medical Center from Locations. These durable URLs are the evidence references; web tool does not expose origin status. No screenshots taken.
- **Complexity:** medium for the proposed scope: mostly resource pages with two search directories and local navigation. Provider facets exceed Claude Hoag's recorded controls, so cross-group equivalence remains provisional and needs rendered review; do not quietly simplify features.
- **Stack clues:** unknown; Azure blob-hosted imagery is observable, not proof of CMS.
- **Limitations:** provider-list link `https://www.evergreenhealth.com/health-services/primary-care/find-a-primary-care-provider/` timed out in web tool (400 tool error); no profile inspected. Synthetic missing URL `https://www.evergreenhealth.com/codex-research-missing-20261112` inaccessible via web tool; source 404 design UNVERIFIED. No appointment form verified.
- **Proposed substitutions:** none selected. Keep omitted provider detail and inquiry form pending further evidence; use observed phone/portal appointment choices inside Primary Care only. Source replacement needs coordinator approval.

### Source-to-local page map

| Source / returned title | Proposed local file | Availability |
| --- | --- | --- |
| [EvergreenHealth | Kirkland & Monroe, WA](https://www.evergreenhealth.com/) | `index.html` | Web text returned; origin status unknown |
| [Health Services | Kirkland, WA | EvergreenHealth](https://www.evergreenhealth.com/health-services/) | `services.html` | Web text returned; origin status unknown |
| [Primary Care | Kirkland, WA | EvergreenHealth](https://www.evergreenhealth.com/health-services/primary-care/) | `primary-care.html` | Web text returned; origin status unknown |
| [Find a Doctor | Kirkland, WA | EvergreenHealth](https://www.evergreenhealth.com/find-a-doctor/) | `providers.html` | Web text returned; origin status unknown |
| [Locations | Kirkland & Monroe, WA | EvergreenHealth](https://www.evergreenhealth.com/locations/) | `locations.html` | Web text returned; origin status unknown |
| [EvergreenHealth Medical Center | Kirkland, WA](https://www.evergreenhealth.com/locations/locations-profile/evergreenhealth-medical-center/) | `medical-center.html` | Web text returned; origin status unknown |
| [Patients & Visitors | Kirkland & Monroe, WA | EvergreenHealth](https://www.evergreenhealth.com/patients-visitors/) | `patients-visitors.html` | Web text returned; origin status unknown |
| [Pay Your Bill | Kirkland & Monroe, WA | EvergreenHealth](https://www.evergreenhealth.com/patients-visitors/after-your-visit/billing-financial/pay-your-bill/) | `billing.html` | Web text returned; origin status unknown |

Local `404.html` is an intentional protocol addition. No separate provider profile or appointment form is proposed.

### Key regions

- Location-setting panel, utility links, portal, search and four main navigation groups
- Home campaign, care-type cards, quick actions, symptom/provider search, services and story bands
- Service page section navigation and appointment options
- Provider and location search fields, specialty links and location results
- Visit-stage resource navigation, billing information and contact/legal footer

### Interactions

- **observed:** Provider filters — Web extraction exposes names, language, specialty, radius, gender and new-patient controls; runtime effects untested
- **observed:** Location filters and pagination — Name, service line, ZIP/radius and page selector; extracted count 118 and next link, no interaction executed
- **inferred:** Location setting and symptom suggestions — Controls and explanatory text observed; geolocation and suggestions untested
- **observed:** Appointment options — Primary Care page links phone offices and external MyChart for existing patients; no inquiry form observed
- **observed:** Service navigation and billing — Service links, Primary Care local navigation, visit and pay-bill pages readable; no payment submitted

## HOSP-06

- **Source / stratum:** Nationwide Children’s Hospital; healthcare / children’s hospital; canonical https://www.nationwidechildrens.org/
- **Attempt:** 2026-11-12 UTC (2026-11-11 America/New_York). Direct Python urllib HTTPS GET with Mozilla/5.0 header plus live search/web text extraction. **HTTP-only availability verified** for mapped pages; rendered layout and interaction verification **NOT TESTED**. Exact request timestamps, final URLs, titles, headings, controls and failures: [HTTP evidence](evidence/HOSP-http-2026-11-12.json).
- **Complexity:** high. High: large specialty hierarchy, provider/search shell, location detail, service team/program content, navigation variants and appointment request dependency. Provisionally comparable to Claude CHOP high.
- **Stack clues:** jquery token on Heart Center HTML; /-/media/ asset URL pattern on home. CMS and versions unknown; media path alone is not proof of Sitecore.
- **Limitations / unavailable pages:** /find-a-doctor has generic Search Results title; cannot equate 200 with populated results. /request-an-appointment returns 200 and title only; excludes uninspected form from proposed scope. Synthetic missing path returned 404; layout not retained. No responsive geometry, screenshots, focus behavior, filter effects, validation, accessibility conformance, or authentication checked.
- **Proposed substitutions:** none selected. Failed detail omitted; any replacement requires same-stratum research and coordinator approval. Reservation remains provisional.

### Source-to-local page map

| Source / actual title | Proposed local file | Availability |
| --- | --- | --- |
| [Nationwide Children's Hospital](https://www.nationwidechildrens.org/) | `index.html` | HTTP 200 |
| [Specialties](https://www.nationwidechildrens.org/specialties) | `specialties.html` | HTTP 200 |
| [The Heart Center (Cardiology) | Nationwide Children's Hospital](https://www.nationwidechildrens.org/specialties/heart-center-cardiology) | `heart-center.html` | HTTP 200 |
| [Search Results](https://www.nationwidechildrens.org/find-a-doctor) | `providers.html` | HTTP 200 |
| [Mark E. Galantowicz](https://www.nationwidechildrens.org/find-a-doctor/profiles/mark-e-galantowicz) | `provider-detail.html` | HTTP 200 |
| [Find a Location](https://www.nationwidechildrens.org/locations) | `locations.html` | HTTP 200 |
| [Main Campus](https://www.nationwidechildrens.org/locations/main-hospital) | `main-campus.html` | HTTP 200 |
| [Plan Your Child's Hospital Visit | Nationwide Children's](https://www.nationwidechildrens.org/your-visit) | `your-visit.html` | HTTP 200 |
| [Schedule an Appointment](https://www.nationwidechildrens.org/schedule-an-appointment) | `appointments.html` | HTTP 200 |
| [Financial Assistance for Your Child's Medical Care | Nationwide Children's](https://www.nationwidechildrens.org/your-visit/billing-and-insurance) | `billing.html` | HTTP 200 |

Local `404.html` is an intentional protocol addition; no fabricated source URL is mapped.

### Key regions

- Utility header with scheduling and portal links; main menu and site search
- Home campaign, portal callout, resources, care areas and patient-story sections
- Heart Center local navigation, team, programs, clinic locations, family resources and related specialties
- Doctor search shell and individual provider heading
- Visit resources and financial information
- Institutional and family-resource footer links

### Interactions

- **observed:** Doctor search — Search input with typeahead data attributes in HTML; actual suggestions/results and facets untested
- **observed:** Service navigation — Specialty listing and Heart Center links/sections inspected
- **inferred:** Location search — Directory page available; dynamic filter behavior untested
- **inferred:** Accordion and mobile navigation — Buttons and data-toggle attributes observed; runtime states untested
- **observed:** Appointment inquiry — Scheduling information and request endpoint available; request form fields absent from captured HTML; validation UNVERIFIED
- **observed:** Billing information — Financial Matters heading on billing-and-insurance page; no payment action performed

## Ten-source coordination / approval table

| ID | Group | Stratum authority | Source / canonical URL | Scope / approval status |
| --- | --- | --- | --- | --- |
| HOSP-01 | Claude | Existing notes: academic | UCSF Health — https://www.ucsfhealth.org/ | Notes only; central reservation, complete scope/model approval pending |
| HOSP-02 | Claude | Existing notes: community/regional | Hoag — https://www.hoag.org/ | Notes only; central reservation, complete scope/model approval pending |
| HOSP-03 | Claude | Existing notes: children’s | CHOP — https://www.chop.edu/ | Notes only; central reservation, complete scope/model approval pending |
| HOSP-04 | Codex | Assigned academic | Duke Health — https://www.dukehealth.org/ | Provisional; 9 source pages + local 404; approval pending |
| HOSP-05 | Codex | Assigned community/regional | EvergreenHealth — https://www.evergreenhealth.com/ | Provisional; 8 source pages + local 404; access caveat; approval pending |
| HOSP-06 | Codex | Assigned children’s | Nationwide Children’s — https://www.nationwidechildrens.org/ | Provisional; 10 source pages + local 404; approval pending |
| HOSP-07 | Open-source | Academic proposal only | **PENDING — unknown** | Source, scope, exact model and approval pending |
| HOSP-08 | Open-source | Community/regional proposal only | **PENDING — unknown** | Source, scope, exact model and approval pending |
| HOSP-09 | Open-source | Children’s proposal only | **PENDING — unknown** | Source, scope, exact model and approval pending |
| HOSP-10 | Open-source | Additional academic reserve proposal only | **PENDING — unknown** | Source, scope, exact model and approval pending |

Coordinator action needed: reconcile reservations for 01–03 and 07–10, confirm no collisions with the provisional Codex URLs, and finalize matched scopes/models. Then request project-lead approval of all ten sources, scopes and the 3/3/4 assignment. **Stop before implementation.** Missing external references and approval are real dependencies; no autonomous replacements during build.
