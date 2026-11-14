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
  "target": "UNI-06",
  "category": "university",
  "category_requirements": {
    "category": "university",
    "prefix": "UNI",
    "name": "Universities and colleges",
    "sampling_strata": [
      {
        "slot": 1,
        "source_id": "UNI-01",
        "model_group": "claude",
        "stratum": "large public research university",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 2,
        "source_id": "UNI-02",
        "model_group": "claude",
        "stratum": "small private liberal-arts college",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 3,
        "source_id": "UNI-03",
        "model_group": "claude",
        "stratum": "community college",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 4,
        "source_id": "UNI-04",
        "model_group": "codex",
        "stratum": "large public research university",
        "authority": "codex assignment"
      },
      {
        "slot": 5,
        "source_id": "UNI-05",
        "model_group": "codex",
        "stratum": "small private liberal-arts college",
        "authority": "codex assignment"
      },
      {
        "slot": 6,
        "source_id": "UNI-06",
        "model_group": "codex",
        "stratum": "community college",
        "authority": "codex assignment"
      },
      {
        "slot": 7,
        "source_id": "UNI-07",
        "model_group": "open-source",
        "stratum": "large public research university",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 8,
        "source_id": "UNI-08",
        "model_group": "open-source",
        "stratum": "small private liberal-arts college",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 9,
        "source_id": "UNI-09",
        "model_group": "open-source",
        "stratum": "community college",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 10,
        "source_id": "UNI-10",
        "model_group": "open-source",
        "stratum": "additional distinct large public research university (complexity-matched reserve)",
        "authority": "coordination proposal; reconcile with shared inventory"
      }
    ],
    "representative_pages": [
      "home",
      "academics/program listing",
      "program detail when present",
      "admissions/apply",
      "tuition and aid",
      "visit",
      "news/events",
      "directory",
      "404"
    ],
    "conditional_interactions": [
      "program or directory search on inline data",
      "responsive navigation",
      "visit/information inquiry",
      "events filtering where observed"
    ],
    "simulation_notes": "Applications, student portals, and login are labeled simulations only.",
    "scope_rule": "Use only observed source pages/features; label inferred behavior and intentional additions. Page count follows approved scope, not a fixed quota."
  },
  "model": {
    "id": "gpt-6.1-sol",
    "version": null,
    "runtime": "OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex",
    "reasoning_effort": null,
    "operator": "Samhith Varma"
  },
  "output_relative_to_Websites": "university/codex/UNI-06",
  "selected_source": {
    "category": "university",
    "slot": "06",
    "source_id": "UNI-06",
    "model_group": "codex",
    "model_id": "gpt-6.1-sol",
    "model_version": "",
    "subcategory": "community college",
    "source_name": "Wake Technical Community College",
    "source_url": "https://www.waketech.edu/",
    "verified_at": "2026-11-13",
    "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
    "verification_result": "verified",
    "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
    "source_pages": "[{\"url\": \"https://www.waketech.edu/\", \"title\": \"Lead the Way | Wake Tech\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/catalog/programs-study\", \"title\": \"Programs of Study | Wake Tech\", \"local_file\": \"programs.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/admissions\", \"title\": \"Admissions | Wake Tech\", \"local_file\": \"admissions.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/programs-courses/credit/business-administration/degrees-programs/a25120a\", \"title\": \"General Business Administration AAS | Wake Tech\", \"local_file\": \"program-detail.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/student-services/registration-student-records/payment-deadlines\", \"title\": \"Tuition Information and Payment Deadlines | Wake Tech\", \"local_file\": \"tuition.html\", \"retrieval\": \"readable text/html extraction\"}]",
    "key_regions": "[\"Apply/aid/info/search utility links\", \"Career-field homepage bands\", \"Credential tables\", \"Program subnavigation and detail metadata\", \"Admissions and tuition information\"]",
    "key_interactions": "[{\"name\": \"Program links and credential rows\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Apply, request-information and virtual-tour links\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Program local-menu affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
    "complexity": "high",
    "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
    "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Mobile-menu activation, filtering and form submission are untested; Application and virtual-tour destinations are external; simulate or disclose rather than embed; Do not assume a filterable program finder from the listing table [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
    "approved_at": "2026-11-13T00:11:23.688078+00:00",
    "approved_by": "Samhith Varma",
    "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
  },
  "category_inventory": [
    {
      "category": "university",
      "slot": "01",
      "source_id": "UNI-01",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "large public research university",
      "source_name": "University of Wisconsin–Madison",
      "source_url": "https://www.wisc.edu/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/UNI.md#uni-01",
      "source_pages": "[{\"url\": \"https://www.wisc.edu/\", \"title\": \"University of Wisconsin–Madison\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.wisc.edu/academics/\", \"title\": \"Academics - University of Wisconsin–Madison\", \"local_file\": \"academics.html\"}, {\"url\": \"https://www.wisc.edu/academics/majors/\", \"title\": \"Undergraduate majors and certificates - University of Wisconsin–Madison\", \"local_file\": \"majors.html\"}, {\"url\": \"https://www.wisc.edu/admissions/\", \"title\": \"Admissions & Aid - University of Wisconsin–Madison\", \"local_file\": \"admissions.html\"}, {\"url\": \"https://www.wisc.edu/admissions/apply/\", \"title\": \"Apply - University of Wisconsin–Madison\", \"local_file\": \"apply.html\"}, {\"url\": \"https://www.wisc.edu/visit/\", \"title\": \"Visit UW–Madison - University of Wisconsin–Madison\", \"local_file\": \"visit.html\"}, {\"url\": \"https://www.wisc.edu/directories/\", \"title\": \"Directory Search - University of Wisconsin–Madison\", \"local_file\": \"directories.html\"}, {\"url\": \"https://www.wisc.edu/research/\", \"title\": \"Research - University of Wisconsin–Madison\", \"local_file\": \"research.html\"}, {\"url\": \"https://www.wisc.edu/student\", \"title\": \"life/ — Student Life - University of Wisconsin–Madison\", \"local_file\": \"student.html\"}, {\"url\": \"https://www.wisc.edu/athletics/\", \"title\": \"Athletics - University of Wisconsin–Madison\", \"local_file\": \"athletics.html\"}, {\"url\": \"https://www.wisc.edu/about/\", \"title\": \"About UW–Madison - University of Wisconsin–Madison\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.wisc.edu/about/facts/\", \"title\": \"Facts - University of Wisconsin–Madison\", \"local_file\": \"facts.html\"}]",
      "key_regions": "[\"(observed in HTML):\", \"A \\\"Search People and Pages\\\" form (`#uw-top-search-form`, `action=/search/`, input `q`).\", \"A \\\"Main Menu\\\" with 6 flat items: Academics, Admissions & Aid, Student Life, Research, Athletics, About UW. I found no dropdown markup in the HTML.\", \"A \\\"Utility Menu\\\": MyUW, Email/calendar, Canvas, Box, Google Apps, Zoom, Libraries, Map, News, Events, Visit, Apply, Jobs, Give.\", \"Hero:** the heading text near the top is \\\"Launch your future at…\\\", with Visit and Apply buttons.\", \"Home body sections (h2/h3):\", \"\\\"Key next steps\\\"\", \"\\\"Why choose UW–Madison?\\\"\", \"\\\"Trending on campus\\\" (news cards)\", \"\\\"Our research solves mysteries and transforms lives\\\" / \\\"More UW–Madison discoveries\\\"\", \"\\\"We're a public university guided by public service\\\"\", \"\\\"The Badger Way\\\"\"]",
      "key_interactions": "[{\"name\": \"The site search form (GET `/search/`, `q`).\", \"evidence\": \"observed\", \"notes\": \"The site search form (GET `/search/`, `q`).\"}, {\"name\": \"A look-ahead container (`uw-look-ahead-top`, `aria-controls` on the in\", \"evidence\": \"observed\", \"notes\": \"A look-ahead container (`uw-look-ahead-top`, `aria-controls` on the input).\"}, {\"name\": \"Apply and Visit calls to action.\", \"evidence\": \"observed\", \"notes\": \"Apply and Visit calls to action.\"}, {\"name\": \"Many card and promo links.\", \"evidence\": \"observed\", \"notes\": \"Many card and promo links.\"}, {\"name\": \"The directory page loads a React LDAP-lookup bundle (`uw-ldap-lookup-r\", \"evidence\": \"observed\", \"notes\": \"The directory page loads a React LDAP-lookup bundle (`uw-ldap-lookup-react.*.js`).\"}, {\"name\": \"A cookie-consent script is loaded.\", \"evidence\": \"observed\", \"notes\": \"A cookie-consent script is loaded.\"}, {\"name\": \"A site-alert script is loaded (`uw-alerts.*.js`).\", \"evidence\": \"observed\", \"notes\": \"A site-alert script is loaded (`uw-alerts.*.js`).\"}, {\"name\": \"** the directory search is client-rendered and people-search results c\", \"evidence\": \"inferred\", \"notes\": \"** the directory search is client-rendered and people-search results come from JS. The majors page is a short link page, not a filterable program finder (63 anchors total, no filter form seen). The application portal and login are simulation only.\"}]",
      "complexity": "medium",
      "stack_clues": "Custom-built static site with fingerprinted assets (`/css/redesign.<hash>.css`, `/js/redesign.<hash>.js`), Google Tag Manager, CDN-hosted fonts and cookie consent at `cdn.wisc.cloud`, served via CloudFront. The CMS is unknown.",
      "limitations": "- There is no real program finder on `www`.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "university",
      "slot": "02",
      "source_id": "UNI-02",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "small private liberal-arts college",
      "source_name": "Swarthmore College",
      "source_url": "https://www.swarthmore.edu/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/UNI.md#uni-02",
      "source_pages": "[{\"url\": \"https://www.swarthmore.edu/\", \"title\": \"Swarthmore Home :: Swarthmore College\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.swarthmore.edu/meet\", \"title\": \"swarthmore — Meet Swarthmore :: Swarthmore College\", \"local_file\": \"meet.html\"}, {\"url\": \"https://www.swarthmore.edu/academics\", \"title\": \"Academics :: Swarthmore College (hosts the \\\"Programs of Study\\\" list of departments)\", \"local_file\": \"academics.html\"}, {\"url\": \"https://www.swarthmore.edu/biology\", \"title\": \"Biology :: Swarthmore College (department detail)\", \"local_file\": \"biology.html\"}, {\"url\": \"https://www.swarthmore.edu/academics/design\", \"title\": \"your-own-major — Design Your Own Major :: Academics :: Swarthmore College\", \"local_file\": \"design.html\"}, {\"url\": \"https://www.swarthmore.edu/academics/academic\", \"title\": \"calendar — Academic Calendar :: Academics :: Swarthmore College\", \"local_file\": \"academic.html\"}, {\"url\": \"https://www.swarthmore.edu/admissions\", \"title\": \"aid — Admissions & Aid :: Swarthmore College\", \"local_file\": \"admissions.html\"}, {\"url\": \"https://www.swarthmore.edu/financial\", \"title\": \"aid — Financial Aid :: Swarthmore College\", \"local_file\": \"financial.html\"}, {\"url\": \"https://www.swarthmore.edu/campus\", \"title\": \"life — Campus Life :: Swarthmore College\", \"local_file\": \"campus.html\"}, {\"url\": \"https://www.swarthmore.edu/news\", \"title\": \"events — News & Events :: Swarthmore College\", \"local_file\": \"news.html\"}]",
      "key_regions": "[\"(observed in HTML):\", \"A utility area: phone (610) 328-8000, A-Z Index, Calendar, Directory, Campus Map, Make A Gift, Visit Swarthmore.\", \"A \\\"Main Horizontal Navigation\\\" with 6 dropdown groups (ARIA `menuitem`/`aria-posinset` attributes are present):\", \"Meet Swarthmore: What's Distinctive…, Mission, Why Liberal Arts?, A Brief History, By the Numbers, Explore Swarthmore, Traditions, Diversity @Swarthmore, Meet the President.\", \"Academics: Academic Calendar, Programs of Study, Course Catalog, Faculty Spotlight, Course Spotlight, First-Year Experience, Global Engagement, Honors Program, Libraries, Registrar, Research, Tri-College Consortium.\", \"Campus Life: Arts@Swarthmore, Athletics & Recreation, Be Well, Career Services, Clubs & Activities, Commencement, Living @ Swarthmore, New Students, Offices & Services, Sustainability.\", \"Admissions & Aid: Affordability & Access, Apply to Swarthmore, Financial Aid & Cost, Swarthmore Tuition Guarantee, Life After Swarthmore, Campus Tours and Virtual Visits, SwatStories, Visit Admissions.\", \"News & Events: Stories, Social Media, Faculty Experts, Faculty & Alumni Lectures, Campus Calendar, Campus Classifieds, Communications Office.\", \"A sixth group, unnamed in my extraction, whose first link is `/meet-swarthmore`. The list above has only the 5 named groups, so the 6 is unconfirmed.\", \"An \\\"Additional Navigation and Search Menu\\\" with a flyout search (GET `/search`, input `keys`) and an Accessibility Options panel with an Animation On/Off toggle.\", \"Hero:** a homepage ambient video with a Pause/Play control, the line \\\"Swarthmore is a community where people with good ideas come together to make great ones\\\", and a \\\"Meet Swarthmore\\\" button.\", \"Home body sections:** Alumni Voices and Sustainability, Garnet Weekend feature, \\\"Watch\\\" video cards (\\\"Beyond the Classroom\\\"), \\\"To Zero By Thirty-Five\\\", \\\"Tuition Guarantee\\\", \\\"Homepage Link List\\\", \\\"Living @ Swarthmore\\\", \\\"O\"]",
      "key_interactions": "[{\"name\": \"Dropdown mega-menu with ARIA menu roles.\", \"evidence\": \"observed\", \"notes\": \"Dropdown mega-menu with ARIA menu roles.\"}, {\"name\": \"Site search flyout.\", \"evidence\": \"observed\", \"notes\": \"Site search flyout.\"}, {\"name\": \"Directory search form (`directory-search--form`, `role=combobox`, plac\", \"evidence\": \"observed\", \"notes\": \"Directory search form (`directory-search--form`, `role=combobox`, placeholder \\\"Find faculty and staff...\\\").\"}, {\"name\": \"Animation on/off toggle.\", \"evidence\": \"observed\", \"notes\": \"Animation on/off toggle.\"}, {\"name\": \"Pause/play on the video.\", \"evidence\": \"observed\", \"notes\": \"Pause/play on the video.\"}, {\"name\": \"Visit page with \\\"Sign up for a campus tour\\\", \\\"Take a self-guided campu\", \"evidence\": \"observed\", \"notes\": \"Visit page with \\\"Sign up for a campus tour\\\", \\\"Take a self-guided campus tour\\\" and \\\"Take a virtual tour\\\" links.\"}, {\"name\": \"** the tour sign-up is an external form, since the page itself had onl\", \"evidence\": \"inferred\", \"notes\": \"** the tour sign-up is an external form, since the page itself had only a `/search` form. Calendar, catalog, careers and the application portal are separate subdomains, so only stubs or simulation are possible there.\"}]",
      "complexity": "high",
      "stack_clues": "Drupal (observed `/sites/default/files/...` and `/themes/custom/swarthmore_theme/`), the `ambient_video_poster` image style, a `.webp` derivative, and Cloudflare-style delivery (inferred only). Page titles use the `Page :: Section :: Swarthmore College` pattern.",
      "limitations": "- No dedicated program-finder page with filters (departments are a plain list). Complexity recorded in research as 'Medium-high'; normalized to 'high' for this field.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "university",
      "slot": "03",
      "source_id": "UNI-03",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "community college",
      "source_name": "Northern Virginia Community College (NOVA)",
      "source_url": "https://www.nvcc.edu/",
      "verified_at": "2026-11-10",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/UNI.md#uni-03",
      "source_pages": "[{\"url\": \"https://www.nvcc.edu/\", \"title\": \"Home | Northern Virginia Community College\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.nvcc.edu/academics/programs/index.html\", \"title\": \"Find a Program | Northern Virginia Community College\", \"local_file\": \"programs-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/academics/schedule/index.html\", \"title\": \"Schedule of Classes | Northern Virginia Community College\", \"local_file\": \"schedule-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/academics/calendar/index.html\", \"title\": \"Academic Calendar | Northern Virginia Community College\", \"local_file\": \"calendar-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/admissions/index.html\", \"title\": \"Admissions & Aid | Northern Virginia Community College\", \"local_file\": \"admissions-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/admissions/apply/index.html\", \"title\": \"Apply to NOVA | Northern Virginia Community College\", \"local_file\": \"apply-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/admissions/financialaid/index.html\", \"title\": \"Financial Aid | Northern Virginia Community College\", \"local_file\": \"financialaid-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/admissions/tuition/index.html\", \"title\": \"Tuition & Costs | Northern Virginia Community College\", \"local_file\": \"tuition-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/admissions/visit/index.html\", \"title\": \"Visit & Connect | Northern Virginia Community College\", \"local_file\": \"visit-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/student\", \"title\": \"resources/index.html — Student Resources | Northern Virginia Community College\", \"local_file\": \"student.html\"}, {\"url\": \"https://www.nvcc.edu/about/locations/index.html\", \"title\": \"NOVA Locations | Northern Virginia Community College\", \"local_file\": \"locations-index-html.html\"}, {\"url\": \"https://www.nvcc.edu/about/directory/\", \"title\": \"College Directory\", \"local_file\": \"directory.html\"}, {\"url\": \"https://www.nvcc.edu/about/news/index.html\", \"title\": \"News | Northern Virginia Community College (`/news/index.html` also returns 200 with the same title)\", \"local_file\": \"news-index-html.html\"}]",
      "key_regions": "[\"(observed in HTML):\", \"A \\\"Skip To Main Content\\\" link.\", \"A Google Translate language list of about 20 languages (`#googtrans(...)` anchors).\", \"A \\\"Quick Links\\\" dropdown: College Safety, Contact Us, Directory, Bookstore, Libraries, Schedule of Classes, Catalog, Testing Centers, NOVA Service Portal, Forms, Closings.\", \"An \\\"Info For\\\" dropdown: Current Students, Visiting Students, International Students, Alumni, Adult Learners, Parents & Family, Employers, Military & Veterans, Faculty & Staff.\", \"Apply, Give and Request Info buttons.\", \"A \\\"Search NOVA\\\" form (GET `/search`, `q`).\", \"Main nav (6 dropdown groups):\", \"Academics: Explore Academics, Programs of Study, Workforce & Professional Development, Honors Program, Online Learning, Study Abroad, Class Schedules, Divisions, Academic Calendar.\", \"Admissions & Aid: Explore, Register for Classes, Dual Enrollment, Financial Aid, Tuition & Costs, Visit, International Admissions.\", \"Student Resources: Parking, Accommodations & Accessibility, Student-Parents, Financial Education, ESL, Advising, Transfer Planning, Career Services, Technology, Transcripts, Tutoring, NOVACard, Student Success Guides.\", \"Student Life: Clubs & Organizations, Athletics & Fitness, Dining, Arts & Theater, College Galleries, Nighthawks VOTE!, Mentoring, Health & Wellness, SGA, Contact Student Life.\"]",
      "key_interactions": "[{\"name\": \"Program finder form (`/academics/programs/`)\", \"evidence\": \"observed\", \"notes\": \"Program finder form (`/academics/programs/`)\"}, {\"name\": \"The form `action` is `https://www.nvcc.edu/api/programfinder/programs/\", \"evidence\": \"observed\", \"notes\": \"The form `action` is `https://www.nvcc.edu/api/programfinder/programs/` and the form carries `spa-form` / `data-spa-empty-template` attributes.\"}, {\"name\": \"It has a text input \\\"Search for programs\\\" (`name=query`, `data-auto-su\", \"evidence\": \"observed\", \"notes\": \"It has a text input \\\"Search for programs\\\" (`name=query`, `data-auto-submit`).\"}, {\"name\": \"It has a `Degree` select (`DegreeTypes`) and an `Interest` select (`in\", \"evidence\": \"observed\", \"notes\": \"It has a `Degree` select (`DegreeTypes`) and an `Interest` select (`interests`).\"}, {\"name\": \"Directory search form (`/about/directory/search`) with people/other ra\", \"evidence\": \"observed\", \"notes\": \"Directory search form (`/about/directory/search`) with people/other radio choices.\"}, {\"name\": \"Site search.\", \"evidence\": \"observed\", \"notes\": \"Site search.\"}, {\"name\": \"Google Translate language list.\", \"evidence\": \"observed\", \"notes\": \"Google Translate language list.\"}, {\"name\": \"Request Info and Apply links to external portals.\", \"evidence\": \"observed\", \"notes\": \"Request Info and Apply links to external portals.\"}, {\"name\": \"Visit page with campus-tour and virtual-tour (YouVisit) links and webi\", \"evidence\": \"observed\", \"notes\": \"Visit page with campus-tour and virtual-tour (YouVisit) links and webinar/event links on `nighthawkhub.nvcc.edu`.\"}, {\"name\": \"** program results render client-side from the API. Selecting a degree\", \"evidence\": \"inferred\", \"notes\": \"** program results render client-side from the API. Selecting a degree or interest probably filters them. The application portal and login are simulation only.\"}]",
      "complexity": "high",
      "stack_clues": "Static `.html` URLs (`index.html`) with a `bundle.js?v=…` front-end bundle, an `api/programfinder` endpoint, Google Translate, a Gideon Taylor chat hook (`chatui.ida.gideontaylor.com`), and `Server: AmazonS3` response headers. The CMS is unknown.",
      "limitations": "- The program list is API-loaded and I did not fetch the API. Complexity recorded in research as 'Medium-high'; normalized to 'high' for this field.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "university",
      "slot": "04",
      "source_id": "UNI-04",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "large public research university",
      "source_name": "The Pennsylvania State University (Penn State)",
      "source_url": "https://www.psu.edu/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP-only urllib GET and live web search/text extraction; no browser rendering",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/UNI.md#uni-04",
      "source_pages": "[{\"url\": \"https://www.psu.edu/\", \"title\": \"The Pennsylvania State University | Penn State\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.psu.edu/academics/undergraduate/majors\", \"title\": \"Undergraduate Majors | Penn State\", \"local_file\": \"majors.html\"}, {\"url\": \"https://bulletins.psu.edu/undergraduate/colleges/eberly-science/biology-bs/\", \"title\": \"Biology, B.S. (Science) | Penn State\", \"local_file\": \"biology.html\"}, {\"url\": \"https://www.psu.edu/admission/undergraduate/how-to-apply\", \"title\": \"How to Apply | Undergraduate Admissions | Penn State\", \"local_file\": \"apply.html\"}, {\"url\": \"https://www.psu.edu/costs-aid\", \"title\": \"Invest in Your Future | Student Aid | Penn State\", \"local_file\": \"costs-aid.html\"}, {\"url\": \"https://www.psu.edu/admission/undergraduate/explore/visit-penn-state\", \"title\": \"Visit Penn State | Undergraduate Admissions | Penn State\", \"local_file\": \"visit.html\"}, {\"url\": \"https://www.psu.edu/search/directories\", \"title\": \"Faculty and Staff Directories | Penn State\", \"local_file\": \"directories.html\"}, {\"url\": \"https://www.psu.edu/news\", \"title\": \"News | Penn State University\", \"local_file\": \"news.html\"}]",
      "key_regions": "[\"Utility actions and nested academic, admissions, aid and news navigation\", \"Home media hero followed by opportunity/statistics bands, traditions features and news links\", \"Majors search region and filter heading; structured program data embedded in response\", \"Application routes, preparation questions, dates and FAQ sections\", \"Visit options grouped by campus and audience\", \"Biology bulletin: breadcrumbs, program summary, requirement tables, advising and academic plans\", \"Directory gateway; news feature groups\", \"Footer grouped exploration, support, quick links, resources and social connections\"]",
      "key_interactions": "[{\"name\": \"Major search/filter\", \"evidence\": \"observed\", \"notes\": \"Text input with data-tracking-id MajorListing-Filter and Filters heading in HTTP HTML; filtering outcome inferred, not executed.\"}, {\"name\": \"Responsive navigation\", \"evidence\": \"inferred\", \"notes\": \"Nested link groups and repeated navigation markup indicate responsive variants; breakpoints, disclosure and keyboard behavior untested.\"}, {\"name\": \"Visit registration\", \"evidence\": \"observed\", \"notes\": \"Visit page links to apply.psu.edu/portal/up-all; external registration not inspected or submitted.\"}, {\"name\": \"Directory lookup\", \"evidence\": \"inferred\", \"notes\": \"Directories gateway retrieved; no lookup form captured. Do not assume an inline people search.\"}, {\"name\": \"Program section navigation\", \"evidence\": \"inferred\", \"notes\": \"Bulletin headings/section links indicate navigation within a long requirements page; switching behavior not tested.\"}]",
      "complexity": "high",
      "stack_clues": "Observed /_next/static/chunks and turbopack-named assets on main site; ctfassets.net video host. Next.js indicated by paths; CMS unknown. Bulletin is a separate template.",
      "limitations": "HTTP-only. No rendered layout, mobile, keyboard, search results or submissions verified. News/bulletin templates differ. External application and registration excluded from live scope. Exact model/version TBD; coordination and approval pending.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "university",
      "slot": "05",
      "source_id": "UNI-05",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "small private liberal-arts college",
      "source_name": "Dickinson College",
      "source_url": "https://www.dickinson.edu/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP-only urllib GET and live web search/text extraction; no browser rendering",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/UNI.md#uni-05",
      "source_pages": "[{\"url\": \"https://www.dickinson.edu/\", \"title\": \"Dickinson College Homepage\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/199/academic_programs\", \"title\": \"Academic Programs | Dickinson College\", \"local_file\": \"programs.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/55/biology\", \"title\": \"Biology | Dickinson College\", \"local_file\": \"biology.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/287/admissions\", \"title\": \"Admissions | Dickinson College\", \"local_file\": \"admissions.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/279/apply\", \"title\": \"Apply | Dickinson College\", \"local_file\": \"apply.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/281/tuition_and_aid_overview\", \"title\": \"Tuition and Aid | Dickinson College\", \"local_file\": \"tuition-aid.html\"}, {\"url\": \"https://www.dickinson.edu/homepage/278/visit\", \"title\": \"Visit Dickinson | Dickinson College\", \"local_file\": \"visit.html\"}, {\"url\": \"https://www.dickinson.edu/news\", \"title\": \"Latest News | Dickinson College\", \"local_file\": \"news.html\"}]",
      "key_regions": "[\"Header with recruitment actions, main topical links and duplicate phone/desktop search forms\", \"Home institutional introduction, mentoring and place feature bands, featured news and inclusion feature\", \"Academic programs list/search region; unresolved client template text present in HTTP response\", \"Biology departmental contact block, features, outcomes, student/alumni features and news\", \"Admissions visit/connect/apply routes; application landing and policy sections\", \"Aid overview with cost, calculator and assistance routes\", \"Visit opportunities, preparation questions and slideshow controls\", \"News list/search and institutional footer\"]",
      "key_interactions": "[{\"name\": \"Program keyword search\", \"evidence\": \"observed\", \"notes\": \"Input #majors-search uses v-model=searchparam; unresolved {{ major.name | ampersanChange }} is present. Result updates inferred, not run.\"}, {\"name\": \"Site/news search\", \"evidence\": \"observed\", \"notes\": \"GET forms target /site/scripts/google_results.php with q; news form includes sites[]=News. Results not requested.\"}, {\"name\": \"Visit slideshow\", \"evidence\": \"observed\", \"notes\": \"Previous/next buttons call plusSlides(-1/1); transition and keyboard behavior not executed.\"}, {\"name\": \"Visit/information inquiry\", \"evidence\": \"observed\", \"notes\": \"Homepage links to admissions.dickinson.edu request-information and visit pages; external form not inspected or submitted.\"}, {\"name\": \"Responsive navigation\", \"evidence\": \"inferred\", \"notes\": \"visible-phone/hidden-phone classes and repeated search markup indicate alternate layouts; actual menu behavior untested.\"}]",
      "complexity": "high",
      "stack_clues": "Observed jQuery 1.10.2, jQuery UI 1.10.4, widget.js and /site/javascript scripts. Program input v-model suggests Vue-style binding; full framework/version and CMS unknown. Reference stack is not permission to use those libraries.",
      "limitations": "HTTP-only; no client rendering or interaction execution. Guessed /directory returns genuine 404, so no directory page or search is proposed. External inquiry/application/tour flows remain outside inspected scope. Model/version TBD; coordination and approval pending.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "university",
      "slot": "06",
      "source_id": "UNI-06",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "community college",
      "source_name": "Wake Technical Community College",
      "source_url": "https://www.waketech.edu/",
      "verified_at": "2026-11-13",
      "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
      "source_pages": "[{\"url\": \"https://www.waketech.edu/\", \"title\": \"Lead the Way | Wake Tech\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/catalog/programs-study\", \"title\": \"Programs of Study | Wake Tech\", \"local_file\": \"programs.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/admissions\", \"title\": \"Admissions | Wake Tech\", \"local_file\": \"admissions.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/programs-courses/credit/business-administration/degrees-programs/a25120a\", \"title\": \"General Business Administration AAS | Wake Tech\", \"local_file\": \"program-detail.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.waketech.edu/student-services/registration-student-records/payment-deadlines\", \"title\": \"Tuition Information and Payment Deadlines | Wake Tech\", \"local_file\": \"tuition.html\", \"retrieval\": \"readable text/html extraction\"}]",
      "key_regions": "[\"Apply/aid/info/search utility links\", \"Career-field homepage bands\", \"Credential tables\", \"Program subnavigation and detail metadata\", \"Admissions and tuition information\"]",
      "key_interactions": "[{\"name\": \"Program links and credential rows\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Apply, request-information and virtual-tour links\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Program local-menu affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
      "complexity": "high",
      "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
      "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Mobile-menu activation, filtering and form submission are untested; Application and virtual-tour destinations are external; simulate or disclose rather than embed; Do not assume a filterable program finder from the listing table [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
      "approved_at": "2026-11-13T00:11:23.688078+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
    },
    {
      "category": "university",
      "slot": "07",
      "source_id": "UNI-07",
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
      "category": "university",
      "slot": "08",
      "source_id": "UNI-08",
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
      "category": "university",
      "slot": "09",
      "source_id": "UNI-09",
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
      "category": "university",
      "slot": "10",
      "source_id": "UNI-10",
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
      "path": "metadata/source-inventories/university.csv",
      "sha256": "5440c3be1b991975717f32484b2e1a5069f04e4899245706f29eea8272acc9db"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "c64f58a19f9540122d680901fe888ce91a724068a6b719b1bb4f324ba5d8277c"
    }
  ],
  "prepared_at": "2026-11-13T15:34:51.838Z",
  "task_is_execution": false
}
```
