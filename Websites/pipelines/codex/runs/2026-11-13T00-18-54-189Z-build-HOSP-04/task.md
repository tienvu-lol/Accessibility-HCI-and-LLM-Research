# Phase B — One Codex replica

Read the shared `Websites/Rules.md` and `Websites/MODEL_ALLOCATION.md` completely. Build exactly the single source in the exact task context. The selected source, approved page map, model, category, and output directory are fixed. Missing, changed, or unverifiable approval/source evidence must stop this task; do not substitute another source or inherit Claude's waiver.

## Scope and boundaries

Write website files only inside the assigned `Websites/<category>/codex/<ID>/`. Keep run evidence in this task's `pipelines/codex/runs/<run-id>/` directory. Do not touch another model group's files or prompts, the shared rules/QC, or unrelated websites. Use an isolated checkout for concurrent work; pipeline task preparation does not itself create worktrees or launch agents. Do not commit, push, publish, or send messages. One replica is one run and one delivery. Do not start another site automatically.

Confirm that the actual model/runtime matches the declared assignment before generation. If the underlying model cannot be identified, report that fact rather than invent an exact model name. Record start/completion timestamps from the real clock, available tools, generation budget if known, retries, and all human or cross-model changes. Preparation timestamps are not generation timestamps. Preserve the exact prompt and protocol snapshots.

## Implementation

Use semantic HTML5, CSS3, and vanilla JavaScript only. Follow the approved page map and observed information architecture, navigation, hero/above-the-fold hierarchy, content bands, sidebar where present, footer, and source-specific detail pages. The category checklist is conditional; omit nonexistent features or explicitly document approved research additions. Do not impose a universal homepage or arbitrary page-count quota.

Each site works independently through ordinary file:// navigation with relative paths, local placeholder artwork, and inline demo data. Default shared files within the site: css/styles.css and js/main.js. Repeat critical navigation HTML consistently. No frameworks, jQuery, Bootstrap, external UI libraries/fonts/CDNs, runtime package installation, templating, PHP, backend, database, external widgets, accounts, API calls, or build step. The shared external QC dependencies are permitted evaluation tools and must never be copied into the site.

Use fictional names, original prose, and original placeholder assets. No copied logos, seals, real testimonials, proprietary media, or claims of measured outcomes. Every visible control must work on meaningful local samples or be clearly identified as a nonfunctional demo. Forms validate with intelligible errors and useful focus/status feedback; payments, applications, appointments, subscriptions, portals, giving, and logins never perform real transactions. Follow the task's category-specific simulation restrictions.

Target the shared WCAG 2.2 AA baseline: landmarks, logical heading hierarchy, one H1, visible-on-focus skip link to main id="main-content", native controls, labels, descriptive feedback, visible focus, keyboard operation and Escape dismissal, dialog focus handling, readable contrast, responsive reflow, reduced motion, and useful image alternatives. Do not claim conformance or inject intentional defects. Instrument meaningful regions and reusable components with stable descriptive kebab-case data-section/data-component values; do not indiscriminately label incidental spans.

## Required output and provenance

Include all approved mapped pages, index.html, 404.html, css/styles.css, js/main.js, local assets, README.md, fidelity-notes.md, component-inventory.json, and generation-metadata.json. Use the schemas in the shared protocols. README includes source ID, actual verification method/date, complete sitemap and source mapping, sample dataset counts, interaction/simulation notes, run instructions, QC evidence, and limitations. Fidelity notes distinguish replicated, approximated, simulated, added, omitted, and unverified elements. Component inventory lists actual locations/selectors, behavior, keyboard expectations, and test status.

generation-metadata.json must accurately identify the category, numeric slot, stable source ID, model_group codex, actual declared model/version/runtime, operator, source URL/verification/approval evidence, real generation timestamps, durable protocol/prompt revisions, generation mode, human edits, and the seven validation gates. Use supplied SHA-256 snapshots as durable revisions; include additional commit references when known. Do not copy hardcoded Claude dates/model IDs or label unknown fields as verified. A changed model or scope requires a documented reassignment.

## Validation and handoff

Run the same shared QC as the other arms. If needed, install its locked dependencies from Websites/tools/qc using npm ci, outside the replica. Execute shared qc.js against this one output and retain the JSON/log evidence in this run directory; record-qc.mjs provides that wrapper. Report inability to execute browser tests as not-tested/blocked, never as failures=0. Do not weaken or edit the QC to pass.

Exercise the implemented interaction states separately: menus and keyboard dismissal, local search/filter/sort and empty results, validation and demo success, tabs/accordions, dialogs/focus return, and category-specific flows. Initial-page axe scans do not test these states. Record exact tests performed and untested screen-reader/zoom/browser/fidelity checks. Preserve the first QC report and log every correction/retry; distinguish the initial generated artifact from any repaired revision for study analysis.

Finish with complete files, a concise page/file count, source and verification status, actual QC outcome and evidence location, interactions tested, deviations, and remaining limits. Update run evidence; the coordinator updates only this Codex assignment row and change log after reviewing actual delivery. Prepared != generating, submitted != accepted, and successful automated QC != human acceptance. Stop after this site.


## Exact task context

```json
{
  "phase": "build",
  "target": "HOSP-04",
  "category": "healthcare",
  "category_requirements": {
    "category": "healthcare",
    "prefix": "HOSP",
    "name": "Hospitals and healthcare",
    "sampling_strata": [
      {
        "slot": 1,
        "source_id": "HOSP-01",
        "model_group": "claude",
        "stratum": "academic medical center",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 2,
        "source_id": "HOSP-02",
        "model_group": "claude",
        "stratum": "community/regional hospital",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 3,
        "source_id": "HOSP-03",
        "model_group": "claude",
        "stratum": "children’s hospital",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 4,
        "source_id": "HOSP-04",
        "model_group": "codex",
        "stratum": "academic medical center",
        "authority": "codex assignment"
      },
      {
        "slot": 5,
        "source_id": "HOSP-05",
        "model_group": "codex",
        "stratum": "community/regional hospital",
        "authority": "codex assignment"
      },
      {
        "slot": 6,
        "source_id": "HOSP-06",
        "model_group": "codex",
        "stratum": "children’s hospital",
        "authority": "codex assignment"
      },
      {
        "slot": 7,
        "source_id": "HOSP-07",
        "model_group": "open-source",
        "stratum": "academic medical center",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 8,
        "source_id": "HOSP-08",
        "model_group": "open-source",
        "stratum": "community/regional hospital",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 9,
        "source_id": "HOSP-09",
        "model_group": "open-source",
        "stratum": "children’s hospital",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 10,
        "source_id": "HOSP-10",
        "model_group": "open-source",
        "stratum": "additional distinct academic medical center (complexity-matched reserve)",
        "authority": "coordination proposal; reconcile with shared inventory"
      }
    ],
    "representative_pages": [
      "home",
      "services",
      "service detail",
      "providers",
      "provider detail",
      "locations",
      "patients and visitors",
      "appointment inquiry",
      "404"
    ],
    "conditional_interactions": [
      "doctor and location filters",
      "service navigation",
      "appointment-request validation",
      "billing/insurance information"
    ],
    "simulation_notes": "No real health advice, triage, emergency response, appointments, or patient access. Use fictional directory data.",
    "scope_rule": "Use only observed source pages/features; label inferred behavior and intentional additions. Page count follows approved scope, not a fixed quota."
  },
  "model": {
    "id": "gpt-6.1-sol",
    "version": null,
    "runtime": "codex-cli-0.167.0",
    "reasoning_effort": null,
    "operator": "Samhith Varma"
  },
  "output_relative_to_Websites": "healthcare/codex/HOSP-04",
  "selected_source": {
    "category": "healthcare",
    "slot": "04",
    "source_id": "HOSP-04",
    "model_group": "codex",
    "model_id": "gpt-6.1-sol",
    "model_version": "",
    "subcategory": "academic medical center",
    "source_name": "Duke Health",
    "source_url": "https://www.dukehealth.org/",
    "verified_at": "2026-11-12T00:52:42Z",
    "verification_method": "Live web search and web text extraction; direct Python urllib HTTPS GET, status/title/HTML parsing; HTTP-only",
    "verification_result": "verified",
    "evidence_reference": "pipelines/codex/research/HOSP.md#hosp-04; pipelines/codex/research/evidence/HOSP-http-2026-11-12.json",
    "source_pages": "[{\"url\": \"https://www.dukehealth.org/\", \"title\": \"Duke Health | Connect with your health care at Duke Health\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.dukehealth.org/adult-treatments\", \"title\": \"Treatments for Adults | Duke Health\", \"local_file\": \"treatments.html\"}, {\"url\": \"https://www.dukehealth.org/treatments/smoking-cessation\", \"title\": \"Tobacco and Smoking Cessation Programs | Duke Health\", \"local_file\": \"service-detail.html\"}, {\"url\": \"https://www.dukehealth.org/find-doctors-physicians\", \"title\": \"Find Your Duke Provider | Duke Health\", \"local_file\": \"providers.html\"}, {\"url\": \"https://www.dukehealth.org/find-doctors-physicians/deb-bhowmick-md\", \"title\": \"Deb A. Bhowmick, MD | Spine Surgeon | Duke Health\", \"local_file\": \"provider-detail.html\"}, {\"url\": \"https://www.dukehealth.org/locations?view=list\", \"title\": \"Locations at Duke Health | Duke Health\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.dukehealth.org/plan-your-visit\", \"title\": \"Plan Your Visit | Duke Health\", \"local_file\": \"plan-your-visit.html\"}, {\"url\": \"https://www.dukehealth.org/plan-your-visit/make-an-appointment\", \"title\": \"Make an Appointment | Duke Health\", \"local_file\": \"appointments.html\"}, {\"url\": \"https://www.dukehealth.org/paying-for-care\", \"title\": \"Billing and Financial Resources | Duke Health\", \"local_file\": \"billing.html\"}]",
    "key_regions": "[\"Header with mega-menu toggle and site search\", \"Home care-task links, news cards, blog and events\", \"Treatment detail sections and FAQs\", \"Provider profile: locations, biography, reviews, education and insurance\", \"Location directory refinement controls\", \"Grouped policy, contact and related-institution footer\"]",
    "key_interactions": "[{\"name\": \"Provider search\", \"evidence\": \"observed\", \"notes\": \"HTML specialty/condition/doctor and city/ZIP inputs; results and typeahead behavior untested\"}, {\"name\": \"Location filters\", \"evidence\": \"observed\", \"notes\": \"HTML treatment, patient age, distance and location type selects; clear/apply and load-more buttons; effects untested\"}, {\"name\": \"Navigation disclosures\", \"evidence\": \"inferred\", \"notes\": \"Toggle attributes and controls observed; open/close, keyboard and mobile behavior untested\"}, {\"name\": \"Appointment choices\", \"evidence\": \"observed\", \"notes\": \"Appointment information page and MyChart scheduling affordances; no submission or validation tested\"}, {\"name\": \"Service navigation and billing\", \"evidence\": \"observed\", \"notes\": \"Treatment links, FAQ headings and billing resource page inspected; accordion effects inferred\"}]",
    "complexity": "high",
    "stack_clues": "Drupal, drupalSettings and jquery strings in retrieved HTML; custom dukehealth theme paths and Bootstrap-style data-bs-toggle attributes. Versions unknown.",
    "limitations": "Provisional reservation pending coordinator. HTTP-only; no rendered or interaction verification. /make-an-appointment returned 404; corrected linked /plan-your-visit/make-an-appointment returned 200. Linked /locations/duke-spine-center-clinic-1b1c returned 500 and is excluded. Synthetic missing path returned HTTP 404, but error layout was not retained.",
    "approved_at": "2026-11-12",
    "approved_by": "Samhith Varma",
    "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
  },
  "category_inventory": [
    {
      "category": "healthcare",
      "slot": "01",
      "source_id": "HOSP-01",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "02",
      "source_id": "HOSP-02",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "03",
      "source_id": "HOSP-03",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "04",
      "source_id": "HOSP-04",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "academic medical center",
      "source_name": "Duke Health",
      "source_url": "https://www.dukehealth.org/",
      "verified_at": "2026-11-12T00:52:42Z",
      "verification_method": "Live web search and web text extraction; direct Python urllib HTTPS GET, status/title/HTML parsing; HTTP-only",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/HOSP.md#hosp-04; pipelines/codex/research/evidence/HOSP-http-2026-11-12.json",
      "source_pages": "[{\"url\": \"https://www.dukehealth.org/\", \"title\": \"Duke Health | Connect with your health care at Duke Health\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.dukehealth.org/adult-treatments\", \"title\": \"Treatments for Adults | Duke Health\", \"local_file\": \"treatments.html\"}, {\"url\": \"https://www.dukehealth.org/treatments/smoking-cessation\", \"title\": \"Tobacco and Smoking Cessation Programs | Duke Health\", \"local_file\": \"service-detail.html\"}, {\"url\": \"https://www.dukehealth.org/find-doctors-physicians\", \"title\": \"Find Your Duke Provider | Duke Health\", \"local_file\": \"providers.html\"}, {\"url\": \"https://www.dukehealth.org/find-doctors-physicians/deb-bhowmick-md\", \"title\": \"Deb A. Bhowmick, MD | Spine Surgeon | Duke Health\", \"local_file\": \"provider-detail.html\"}, {\"url\": \"https://www.dukehealth.org/locations?view=list\", \"title\": \"Locations at Duke Health | Duke Health\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.dukehealth.org/plan-your-visit\", \"title\": \"Plan Your Visit | Duke Health\", \"local_file\": \"plan-your-visit.html\"}, {\"url\": \"https://www.dukehealth.org/plan-your-visit/make-an-appointment\", \"title\": \"Make an Appointment | Duke Health\", \"local_file\": \"appointments.html\"}, {\"url\": \"https://www.dukehealth.org/paying-for-care\", \"title\": \"Billing and Financial Resources | Duke Health\", \"local_file\": \"billing.html\"}]",
      "key_regions": "[\"Header with mega-menu toggle and site search\", \"Home care-task links, news cards, blog and events\", \"Treatment detail sections and FAQs\", \"Provider profile: locations, biography, reviews, education and insurance\", \"Location directory refinement controls\", \"Grouped policy, contact and related-institution footer\"]",
      "key_interactions": "[{\"name\": \"Provider search\", \"evidence\": \"observed\", \"notes\": \"HTML specialty/condition/doctor and city/ZIP inputs; results and typeahead behavior untested\"}, {\"name\": \"Location filters\", \"evidence\": \"observed\", \"notes\": \"HTML treatment, patient age, distance and location type selects; clear/apply and load-more buttons; effects untested\"}, {\"name\": \"Navigation disclosures\", \"evidence\": \"inferred\", \"notes\": \"Toggle attributes and controls observed; open/close, keyboard and mobile behavior untested\"}, {\"name\": \"Appointment choices\", \"evidence\": \"observed\", \"notes\": \"Appointment information page and MyChart scheduling affordances; no submission or validation tested\"}, {\"name\": \"Service navigation and billing\", \"evidence\": \"observed\", \"notes\": \"Treatment links, FAQ headings and billing resource page inspected; accordion effects inferred\"}]",
      "complexity": "high",
      "stack_clues": "Drupal, drupalSettings and jquery strings in retrieved HTML; custom dukehealth theme paths and Bootstrap-style data-bs-toggle attributes. Versions unknown.",
      "limitations": "Provisional reservation pending coordinator. HTTP-only; no rendered or interaction verification. /make-an-appointment returned 404; corrected linked /plan-your-visit/make-an-appointment returned 200. Linked /locations/duke-spine-center-clinic-1b1c returned 500 and is excluded. Synthetic missing path returned HTTP 404, but error layout was not retained.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "healthcare",
      "slot": "05",
      "source_id": "HOSP-05",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "community/regional hospital",
      "source_name": "EvergreenHealth",
      "source_url": "https://www.evergreenhealth.com/",
      "verified_at": "2026-11-12T00:52:42Z",
      "verification_method": "Live web search plus web open/click text extraction (not browser rendering); direct urllib homepage GET returned 403",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/HOSP.md#hosp-05",
      "source_pages": "[{\"url\": \"https://www.evergreenhealth.com/\", \"title\": \"EvergreenHealth | Kirkland & Monroe, WA\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.evergreenhealth.com/health-services/\", \"title\": \"Health Services | Kirkland, WA | EvergreenHealth\", \"local_file\": \"services.html\"}, {\"url\": \"https://www.evergreenhealth.com/health-services/primary-care/\", \"title\": \"Primary Care | Kirkland, WA | EvergreenHealth\", \"local_file\": \"primary-care.html\"}, {\"url\": \"https://www.evergreenhealth.com/find-a-doctor/\", \"title\": \"Find a Doctor | Kirkland, WA | EvergreenHealth\", \"local_file\": \"providers.html\"}, {\"url\": \"https://www.evergreenhealth.com/locations/\", \"title\": \"Locations | Kirkland & Monroe, WA | EvergreenHealth\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.evergreenhealth.com/locations/locations-profile/evergreenhealth-medical-center/\", \"title\": \"EvergreenHealth Medical Center | Kirkland, WA\", \"local_file\": \"medical-center.html\"}, {\"url\": \"https://www.evergreenhealth.com/patients-visitors/\", \"title\": \"Patients & Visitors | Kirkland & Monroe, WA | EvergreenHealth\", \"local_file\": \"patients-visitors.html\"}, {\"url\": \"https://www.evergreenhealth.com/patients-visitors/after-your-visit/billing-financial/pay-your-bill/\", \"title\": \"Pay Your Bill | Kirkland & Monroe, WA | EvergreenHealth\", \"local_file\": \"billing.html\"}]",
      "key_regions": "[\"Location-setting panel, utility links, portal, search and four main navigation groups\", \"Home campaign, care-type cards, quick actions, symptom/provider search, services and story bands\", \"Service page section navigation and appointment options\", \"Provider and location search fields, specialty links and location results\", \"Visit-stage resource navigation, billing information and contact/legal footer\"]",
      "key_interactions": "[{\"name\": \"Provider filters\", \"evidence\": \"observed\", \"notes\": \"Web extraction exposes names, language, specialty, radius, gender and new-patient controls; runtime effects untested\"}, {\"name\": \"Location filters and pagination\", \"evidence\": \"observed\", \"notes\": \"Name, service line, ZIP/radius and page selector; extracted count 118 and next link, no interaction executed\"}, {\"name\": \"Location setting and symptom suggestions\", \"evidence\": \"inferred\", \"notes\": \"Controls and explanatory text observed; geolocation and suggestions untested\"}, {\"name\": \"Appointment options\", \"evidence\": \"observed\", \"notes\": \"Primary Care page links phone offices and external MyChart for existing patients; no inquiry form observed\"}, {\"name\": \"Service navigation and billing\", \"evidence\": \"observed\", \"notes\": \"Service links, Primary Care local navigation, visit and pay-bill pages readable; no payment submitted\"}]",
      "complexity": "medium",
      "stack_clues": "unknown; web text extraction exposes Azure blob image host, which does not establish the application stack.",
      "limitations": "Provisional reservation pending coordinator. Direct homepage HTTP 403; web-tool text pages readable with crawl labels today to three days ago, without origin status. No rendered/interaction tests. Primary-care provider listing timed out; no provider profile verified. No appointment inquiry form observed.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "healthcare",
      "slot": "06",
      "source_id": "HOSP-06",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "children’s hospital",
      "source_name": "Nationwide Children’s Hospital",
      "source_url": "https://www.nationwidechildrens.org/",
      "verified_at": "2026-11-12T00:52:42Z",
      "verification_method": "Live web search and web text extraction; direct Python urllib HTTPS GET, status/title/HTML parsing; HTTP-only",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/HOSP.md#hosp-06; pipelines/codex/research/evidence/HOSP-http-2026-11-12.json",
      "source_pages": "[{\"url\": \"https://www.nationwidechildrens.org/\", \"title\": \"Nationwide Children's Hospital\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.nationwidechildrens.org/specialties\", \"title\": \"Specialties\", \"local_file\": \"specialties.html\"}, {\"url\": \"https://www.nationwidechildrens.org/specialties/heart-center-cardiology\", \"title\": \"The Heart Center (Cardiology) | Nationwide Children's Hospital\", \"local_file\": \"heart-center.html\"}, {\"url\": \"https://www.nationwidechildrens.org/find-a-doctor\", \"title\": \"Search Results\", \"local_file\": \"providers.html\"}, {\"url\": \"https://www.nationwidechildrens.org/find-a-doctor/profiles/mark-e-galantowicz\", \"title\": \"Mark E. Galantowicz\", \"local_file\": \"provider-detail.html\"}, {\"url\": \"https://www.nationwidechildrens.org/locations\", \"title\": \"Find a Location\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.nationwidechildrens.org/locations/main-hospital\", \"title\": \"Main Campus\", \"local_file\": \"main-campus.html\"}, {\"url\": \"https://www.nationwidechildrens.org/your-visit\", \"title\": \"Plan Your Child's Hospital Visit | Nationwide Children's\", \"local_file\": \"your-visit.html\"}, {\"url\": \"https://www.nationwidechildrens.org/schedule-an-appointment\", \"title\": \"Schedule an Appointment\", \"local_file\": \"appointments.html\"}, {\"url\": \"https://www.nationwidechildrens.org/your-visit/billing-and-insurance\", \"title\": \"Financial Assistance for Your Child's Medical Care | Nationwide Children's\", \"local_file\": \"billing.html\"}]",
      "key_regions": "[\"Utility header with scheduling and portal links; main menu and site search\", \"Home campaign, portal callout, resources, care areas and patient-story sections\", \"Heart Center local navigation, team, programs, clinic locations, family resources and related specialties\", \"Doctor search shell and individual provider heading\", \"Visit resources and financial information\", \"Institutional and family-resource footer links\"]",
      "key_interactions": "[{\"name\": \"Doctor search\", \"evidence\": \"observed\", \"notes\": \"Search input with typeahead data attributes in HTML; actual suggestions/results and facets untested\"}, {\"name\": \"Service navigation\", \"evidence\": \"observed\", \"notes\": \"Specialty listing and Heart Center links/sections inspected\"}, {\"name\": \"Location search\", \"evidence\": \"inferred\", \"notes\": \"Directory page available; dynamic filter behavior untested\"}, {\"name\": \"Accordion and mobile navigation\", \"evidence\": \"inferred\", \"notes\": \"Buttons and data-toggle attributes observed; runtime states untested\"}, {\"name\": \"Appointment inquiry\", \"evidence\": \"observed\", \"notes\": \"Scheduling information and request endpoint available; request form fields absent from captured HTML; validation UNVERIFIED\"}, {\"name\": \"Billing information\", \"evidence\": \"observed\", \"notes\": \"Financial Matters heading on billing-and-insurance page; no payment action performed\"}]",
      "complexity": "high",
      "stack_clues": "jquery token on Heart Center HTML; /-/media/ asset URL pattern on home. CMS and versions unknown; media path alone is not proof of Sitecore.",
      "limitations": "Provisional reservation pending coordinator. HTTP-only; no rendered or interaction verification. /find-a-doctor has generic Search Results title; cannot equate 200 with populated results. /request-an-appointment returns 200 and title only; excludes uninspected form from proposed scope. Synthetic missing path returned 404; layout not retained.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "healthcare",
      "slot": "07",
      "source_id": "HOSP-07",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "08",
      "source_id": "HOSP-08",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "09",
      "source_id": "HOSP-09",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "healthcare",
      "slot": "10",
      "source_id": "HOSP-10",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "",
      "source_name": "",
      "source_url": "",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    }
  ],
  "protocol_snapshots": [
    {
      "path": "Rules.md",
      "sha256": "04b1c3e38b76f2aff3aef869d67370bb4532cd8f9ab5e22ac8276f26cbb859bf"
    },
    {
      "path": "MODEL_ALLOCATION.md",
      "sha256": "dba261a89763c22a6c41fc6b066593345aef7871121cef52ff7b73ff88cce3cd"
    },
    {
      "path": "pipelines/codex/config.json",
      "sha256": "1a27e2e5aa4410c1a23833d46764407b649c638362021a0176313bb425b1a823"
    },
    {
      "path": "pipelines/codex/categories.json",
      "sha256": "843ea7d8d1cc7d01385643f848408dea32997985422496d98e8f108bbc09a333"
    },
    {
      "path": "pipelines/codex/prompts/build.md",
      "sha256": "37567f6a4198f7539b11964980cf814a7b8c0732f926dfe9aa6f86849dd2277c"
    },
    {
      "path": "metadata/source-inventories/healthcare.csv",
      "sha256": "8450e9dd1729c994050155f92b26c025c20c8f223526d16b30e5f55b16b18e29"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "f8fd07970bde9cbc9f67a61fa0af4b9d9a8b12ba44229950fc969b4a2ebe2fea"
    }
  ],
  "prepared_at": "2026-11-13T00:18:54.187Z",
  "task_is_execution": false
}
```
