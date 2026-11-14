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
    "runtime": "OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex",
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
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "large academic medical center",
      "source_name": "UCSF Health",
      "source_url": "https://www.ucsfhealth.org/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/HOSP.md#hosp-01",
      "source_pages": "[{\"url\": \"https://www.ucsfhealth.org/\", \"title\": \"Ranked #1 in CA and Among the Best Hospitals in the Nation | UCSF Health\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.ucsfhealth.org/providers\", \"title\": \"Find a Doctor | UCSF Health\", \"local_file\": \"providers.html\"}, {\"url\": \"https://www.ucsfhealth.org/locations\", \"title\": \"Find a Location | UCSF Health\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.ucsfhealth.org/medical-services\", \"title\": \"Medical Services | UCSF Health\", \"local_file\": \"medical-services.html\"}, {\"url\": \"https://www.ucsfhealth.org/care\", \"title\": \"Conditions and Care | UCSF Health\", \"local_file\": \"care.html\"}, {\"url\": \"https://www.ucsfhealth.org/care/services/emergency-department\", \"title\": \"Emergency Department | UCSF Health\", \"local_file\": \"emergency-department.html\"}, {\"url\": \"https://www.ucsfhealth.org/care/services/cancer\", \"title\": \"Cancer Care | UCSF Health\", \"local_file\": \"cancer.html\"}, {\"url\": \"https://www.ucsfhealth.org/patients-visitors\", \"title\": \"Patients & Visitors | UCSF Health\", \"local_file\": \"patients-visitors.html\"}, {\"url\": \"https://www.ucsfhealth.org/patients-visitors/appointments\", \"title\": \"Request an Appointment | UCSF Health\", \"local_file\": \"appointments.html\"}, {\"url\": \"https://www.ucsfhealth.org/patients-visitors/billing-insurance\", \"title\": \"Billing & Insurance | UCSF Health\", \"local_file\": \"billing-insurance.html\"}, {\"url\": \"https://www.ucsfhealth.org/patients-visitors/billing-insurance/help-paying-your-bill\", \"title\": \"Help Paying Your Bill | UCSF Health\", \"local_file\": \"help-paying-your-bill.html\"}, {\"url\": \"https://www.ucsfhealth.org/patients-visitors/your-hospital-stay\", \"title\": \"Your Hospital Stay | UCSF Health\", \"local_file\": \"your-hospital-stay.html\"}, {\"url\": \"https://www.ucsfhealth.org/mychart\", \"title\": \"MyChart | UCSF Health\", \"local_file\": \"mychart.html\"}, {\"url\": \"https://www.ucsfhealth.org/about\", \"title\": \"About UCSF Health | UCSF Health\", \"local_file\": \"about.html\"}]",
      "key_regions": "[\"Header:** \\\"Skip to main content\\\" link, logo, MyChart, \\\"Request appointment\\\" and \\\"Refer a patient\\\" utility links, search link `/search`, mobile menu button.\", \"Nav (observed):** Care, Medical Services, Find a Doctor, Locations, Virtual Visits (`/patients-visitors/virtual-visits`), Second Opinion, Clinical trials (external). Care expands to Conditions (`/care/conditions`), Treat\", \"Hero:** an h1 with \\\"Your hea…\\\" (truncated in my grep) over a large image.\", \"Body sections (h2/h3):\", \"\\\"Great care starts here\\\", with h3 cards \\\"I need…\\\", \\\"I need to…\\\" and \\\"I need help with…\\\"\", \"\\\"Expert care in every specialty\\\"\", \"\\\"Our doctors specialize in you\\\"\", \"\\\"Real people, remarkable recoveries\\\" (media carousel with play/pause and previous/next controls)\", \"\\\"Latest & greatest from UCSF Health\\\" (news cards)\", \"\\\"Excellent care everywhere\\\" (locations)\", \"\\\"I want to...\\\" (quick actions)\", \"Footer:** collapsible groups \\\"Quick links\\\", \\\"More information\\\" and \\\"Research & education\\\", plus \\\"Follow us\\\".\"]",
      "key_interactions": "[{\"name\": \"** `/providers` has a typeahead search (label \\\"Search by specialty, na\", \"evidence\": \"observed\", \"notes\": \"** `/providers` has a typeahead search (label \\\"Search by specialty, name, con…\\\"). `/patients-visitors/appointments` is a request-appointment page. MyChart is linked from the header and has its own page.\"}, {\"name\": \"** an Emergency Department service page and a \\\"Help paying your bill\\\" \", \"evidence\": \"observed\", \"notes\": \"** an Emergency Department service page and a \\\"Help paying your bill\\\" page both exist.\"}, {\"name\": \"** the request-appointment form and the filters on `/providers` and `/\", \"evidence\": \"inferred\", \"notes\": \"** the request-appointment form and the filters on `/providers` and `/locations` (not inspected).\"}, {\"name\": \"** the provider profile URL pattern. `/providers/<letter>` links exist\", \"evidence\": \"inferred\", \"notes\": \"** the provider profile URL pattern. `/providers/<letter>` links exist, but I did not fetch a profile.\"}, {\"name\": \"** the dropdown contents beyond the Care submenu.\", \"evidence\": \"inferred\", \"notes\": \"** the dropdown contents beyond the Care submenu.\"}]",
      "complexity": "high",
      "stack_clues": "Next.js (`/_next/static/` assets and `data-next-head` title attributes). Sitecore Cloud media is served from `edge.sitecorecloud.io`. Styling looks like Tailwind-style utility classes.",
      "limitations": "- Search and filter results are not in the HTML.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "healthcare",
      "slot": "02",
      "source_id": "HOSP-02",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "community-regional hospital (nonprofit health system, Orange County CA)",
      "source_name": "Hoag Hospital (Hoag Health Network)",
      "source_url": "https://www.hoag.org/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/HOSP.md#hosp-02",
      "source_pages": "[{\"url\": \"https://www.hoag.org/\", \"title\": \"Best Health System in Orange County | Hoag Hospital\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.hoag.org/find-care/\", \"title\": \"Best Healthcare System in Orange County\", \"local_file\": \"find-care.html\"}, {\"url\": \"https://www.hoag.org/locations\", \"title\": \"Our Locations\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.hoag.org/locations/hoag-hospital-newport-beach\", \"title\": \"Hoag Hospital Newport Beach\", \"local_file\": \"hoag-hospital-newport-beach.html\"}, {\"url\": \"https://www.hoag.org/patients-visitors/\", \"title\": \"Patients & Visitors\", \"local_file\": \"patients-visitors.html\"}, {\"url\": \"https://www.hoag.org/patients-visitors/insurance-accepted\", \"title\": \"Patients & Visitors (generic title; the content is insurance accepted)\", \"local_file\": \"insurance-accepted.html\"}, {\"url\": \"https://www.hoag.org/patients-visitors/infection-prevention/\", \"title\": \"Infection Prevention\", \"local_file\": \"infection-prevention.html\"}, {\"url\": \"https://www.hoag.org/billing-information/help-paying-your-bill/\", \"title\": \"Billing Information | Hoag Health Network\", \"local_file\": \"help-paying-your-bill.html\"}, {\"url\": \"https://www.hoag.org/institute/cancer/\", \"title\": \"Hoag Family Cancer Institute | Hoag Hospital\", \"local_file\": \"cancer.html\"}, {\"url\": \"https://www.hoag.org/institute/heart-vascular/\", \"title\": \"Hoag Heart & Vascular Institute | Hoag Hospital\", \"local_file\": \"heart-vascular.html\"}, {\"url\": \"https://www.hoag.org/specialties-services/\", \"title\": \"Specialities & Programs at Hoag\", \"local_file\": \"specialties-services.html\"}, {\"url\": \"https://www.hoag.org/resources/classes-events/\", \"title\": \"Resources (generic title; 5 MB)\", \"local_file\": \"classes-events.html\"}, {\"url\": \"https://www.hoag.org/about-hoag/\", \"title\": \"About Hoag\", \"local_file\": \"about-hoag.html\"}, {\"url\": \"https://www.hoag.org/contact-us/\", \"title\": \"Contact Us - Hoag\", \"local_file\": \"contact-us.html\"}]",
      "key_regions": "[\"Header:** \\\"Skip to content\\\" link. Utility links: On Demand (external), Pay Your Bill (links to the MyChart login), Donate, Contact Us, Find Care.\", \"Nav (dropdowns):\", \"Explore Services: Primary Care, Cancer, Digestive Health, Heart & Vascular, Neurosciences, Orthopedics, Spine, Women's Health, Imaging & Radiology Services, Other Programs & Services.\", \"Locations: All Locations, Hoag Hospital Newport Beach, Hoag Hospital Irvine, Primary Care, Health Centers, Urgent Care.\", \"Resources: Patients & Visitors, Resources, Health Risk Assessments, Classes & Events, Support Groups, Patient Stories.\", \"About Hoag: Overview, Awards & Accreditations, Safety & Quality, Community Health, Culture, Graduate Medical Education.\", \"Hero:** h1 \\\"A New Era of Care in Irvine\\\", h2 \\\"Find the care you need, when you need it\\\". It sits over a search widget (see interactions).\", \"Body sections:\", \"\\\"Quick Links\\\" tiles: Find a Doctor, Pay my bill, Sign in to MyChart, Check Insurance, Visitor Info, Find a Hoag Location.\", \"Institutes intro (centers of excellence).\", \"\\\"Why Choose Hoag\\\".\", \"Patient testimonial carousel.\"]",
      "key_interactions": "[{\"name\": \"** the home hero search has a radio toggle (\\\"specialty_or_condition\\\" v\", \"evidence\": \"observed\", \"notes\": \"** the home hero search has a radio toggle (\\\"specialty_or_condition\\\" vs \\\"find_a_physician\\\") plus a text input and a location input. A MyChart login link, a Pay Your Bill link and a \\\"Check Insurance\\\" tile also exist.\"}, {\"name\": \"** an `emergency-announcement` component is present in the source (an \", \"evidence\": \"observed\", \"notes\": \"** an `emergency-announcement` component is present in the source (an alert banner), but its text is not visible in the HTML.\"}, {\"name\": \"** the dropdown open/close behaviour and the testimonial carousel cont\", \"evidence\": \"inferred\", \"notes\": \"** the dropdown open/close behaviour and the testimonial carousel controls.\"}, {\"name\": \"** no appointment-request form was seen in the home HTML; booking is p\", \"evidence\": \"inferred\", \"notes\": \"** no appointment-request form was seen in the home HTML; booking is presumably via MyChart or phone.\"}]",
      "complexity": "medium",
      "stack_clues": "`<meta name=\"generator\" content=\"Astro v7.4.2\">`, Astro islands, and `hds-` prefixed utility classes (a custom design system).",
      "limitations": "- There is no standalone doctor directory or profile page; find-a-doctor is only the home widget and `/find-care/`.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "healthcare",
      "slot": "03",
      "source_id": "HOSP-03",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "children's hospital",
      "source_name": "Children's Hospital of Philadelphia (CHOP)",
      "source_url": "https://www.chop.edu/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/HOSP.md#hosp-03",
      "source_pages": "[{\"url\": \"https://www.chop.edu/\", \"title\": \"Welcome\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.chop.edu/doctors\", \"title\": \"Find a Doctor\", \"local_file\": \"doctors.html\"}, {\"url\": \"https://www.chop.edu/doctors/search?filter=provider.specialties.name%3ACardiology\", \"title\": \"Doctor Search\", \"local_file\": \"search.html\"}, {\"url\": \"https://www.chop.edu/doctors/dori-yoav\", \"title\": \"Yoav Dori, MD, PhD\", \"local_file\": \"dori-yoav.html\"}, {\"url\": \"https://www.chop.edu/locations\", \"title\": \"Locations\", \"local_file\": \"locations.html\"}, {\"url\": \"https://www.chop.edu/emergency-care-locations\", \"title\": \"Emergency Care for Kids\", \"local_file\": \"emergency-care-locations.html\"}, {\"url\": \"https://www.chop.edu/specialties\", \"title\": \"Search specialties\", \"local_file\": \"specialties.html\"}, {\"url\": \"https://www.chop.edu/conditions-diseases\", \"title\": \"Search conditions\", \"local_file\": \"conditions-diseases.html\"}, {\"url\": \"https://www.chop.edu/conditions-diseases/asthma\", \"title\": \"Asthma in children\", \"local_file\": \"asthma.html\"}, {\"url\": \"https://www.chop.edu/get-care\", \"title\": \"Get Care at CHOP\", \"local_file\": \"get-care.html\"}, {\"url\": \"https://www.chop.edu/appointment-scheduling\", \"title\": \"Appointment Scheduling\", \"local_file\": \"appointment-scheduling.html\"}, {\"url\": \"https://www.chop.edu/patients-and-families\", \"title\": \"Patients & Families\", \"local_file\": \"patients-and-families.html\"}, {\"url\": \"https://www.chop.edu/billing-and-insurance\", \"title\": \"Billing and Insurance\", \"local_file\": \"billing-and-insurance.html\"}, {\"url\": \"https://www.chop.edu/billing-and-insurance/online-bill-pay\", \"title\": \"Online Bill Pay\", \"local_file\": \"online-bill-pay.html\"}]",
      "key_regions": "[\"Header:** \\\"Go to CHOP.edu\\\" link. Utility links: Research, Careers, International, Donate Now, MyCHOP Portal (`mychop.chop.edu/mychart`). Primary links: Locations, Specialties.\", \"Nav (Get Care mega-menu):** See all types of care, Schedule an appointment, Find a doctor, Symptom Checker, Get a second opinion, Conditions we treat. Locations group: Primary Care, Specialty Care, Emergency Care, Urgent\", \"Nav (other groups):** Patients & Families (Resources for families, Caring for your child, medical records, research studies, inpatient stays for the Philadelphia and King of Prussia campuses, health forms). Billing & ins\", \"Hero:** h1 (visually hidden) \\\"Welcome\\\", then h2 \\\"Breakthroughs. Every day.\\\"\", \"Body sections:** \\\"Find care you can count on\\\", \\\"Explore care options\\\", \\\"Best in nation year after year\\\", plus an alert region (the global alert block is present).\", \"Footer:** groups About CHOP (Careers, Our mission, Innovation, Newsroom), Get Care (Find a doctor / location / specialty, second opinion), Patients & Families (Insurance & billing, Price transparency, surprise-billing ri\", \"Footer extras:** \\\"Sign up for newsletters\\\", \\\"Join the conversation.\\\" (social), and a \\\"Language Assistance/Auxiliary Aids and Services Available\\\" block linking to English, Español, العربية, 繁體中文, Deitsch, ગુજરાતી, Deutsch\"]",
      "key_interactions": "[{\"name\": \"** specialty filter links under `/doctors/search?filter=…`. Search/fil\", \"evidence\": \"observed\", \"notes\": \"** specialty filter links under `/doctors/search?filter=…`. Search/filter pages exist for doctors, specialties and conditions. Pages for appointment scheduling, symptom checker, second opinions and online bill pay exist. A MyCHOP Portal link goes to an externa\"}, {\"name\": \"** the Find-a-Doctor form fields. The `/doctors` HTML shows search inp\", \"evidence\": \"inferred\", \"notes\": \"** the Find-a-Doctor form fields. The `/doctors` HTML shows search inputs without a populated filter list, so the filter facets are probably JavaScript-rendered.\"}, {\"name\": \"** the appointment form and symptom-checker behaviour (page content no\", \"evidence\": \"inferred\", \"notes\": \"** the appointment form and symptom-checker behaviour (page content not inspected).\"}]",
      "complexity": "high",
      "stack_clues": "`<meta name=\"generator\" content=\"Drupal 11\">`, `drupal-settings-json`, `drupal-link-system-path` attributes, and `block-outline-frontend-*` block ids. The HTML uses `<header>`, `<main>`, `<footer>` and 7 `<nav>` landmarks.",
      "limitations": "- The `/doctors` filter facets and result lists did not appear in the static HTML, so I could not read them.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
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
      "sha256": "b16751854f14ec50f9e8e8726e4ab0c064503f1ebdea6d71ba7e1faf85ed6d95"
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
      "sha256": "824cd91b8ff64910e05cf7eb2f4ce7517b236fba312d8694cd9a8263b887f085"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "a10fbf398eb226807cb7391e6756fcd1a192a6ed246292ecdda77c24c6e35362"
    }
  ],
  "prepared_at": "2026-11-13T15:47:56.446Z",
  "task_is_execution": false
}
```
