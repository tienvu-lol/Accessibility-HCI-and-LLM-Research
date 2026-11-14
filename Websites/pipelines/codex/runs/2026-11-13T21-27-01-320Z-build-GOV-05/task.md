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
  "target": "GOV-05",
  "category": "government",
  "category_requirements": {
    "category": "government",
    "prefix": "GOV",
    "name": "Public and government",
    "sampling_strata": [
      {
        "slot": 1,
        "source_id": "GOV-01",
        "model_group": "claude",
        "stratum": "municipal government",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 2,
        "source_id": "GOV-02",
        "model_group": "claude",
        "stratum": "state portal/agency",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 3,
        "source_id": "GOV-03",
        "model_group": "claude",
        "stratum": "federal agency",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 4,
        "source_id": "GOV-04",
        "model_group": "codex",
        "stratum": "municipal government",
        "authority": "codex assignment"
      },
      {
        "slot": 5,
        "source_id": "GOV-05",
        "model_group": "codex",
        "stratum": "state portal/agency",
        "authority": "codex assignment"
      },
      {
        "slot": 6,
        "source_id": "GOV-06",
        "model_group": "codex",
        "stratum": "federal agency",
        "authority": "codex assignment"
      },
      {
        "slot": 7,
        "source_id": "GOV-07",
        "model_group": "open-source",
        "stratum": "municipal government",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 8,
        "source_id": "GOV-08",
        "model_group": "open-source",
        "stratum": "state portal/agency",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 9,
        "source_id": "GOV-09",
        "model_group": "open-source",
        "stratum": "federal agency",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 10,
        "source_id": "GOV-10",
        "model_group": "open-source",
        "stratum": "additional distinct municipal government (complexity-matched reserve)",
        "authority": "coordination proposal; reconcile with shared inventory"
      }
    ],
    "representative_pages": [
      "home",
      "service directory",
      "service detail/how-to",
      "departments",
      "meetings/events",
      "news/alerts",
      "contact/report form",
      "404"
    ],
    "conditional_interactions": [
      "service/department search",
      "alerts",
      "calendar navigation",
      "report-a-problem form",
      "language control only if observed"
    ],
    "simulation_notes": "No official seals or claims of governmental authority. Reports, applications, translations and portal access are labeled demos.",
    "scope_rule": "Use only observed source pages/features; label inferred behavior and intentional additions. Page count follows approved scope, not a fixed quota."
  },
  "model": {
    "id": "gpt-6.1-sol",
    "version": null,
    "runtime": "OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex",
    "reasoning_effort": null,
    "operator": "Samhith Varma"
  },
  "output_relative_to_Websites": "government/codex/GOV-05",
  "selected_source": {
    "category": "government",
    "slot": "05",
    "source_id": "GOV-05",
    "model_group": "codex",
    "model_id": "gpt-6.1-sol",
    "model_version": "",
    "subcategory": "state portal/agency",
    "source_name": "Commonwealth of Virginia portal",
    "source_url": "https://www.virginia.gov/",
    "verified_at": "2026-11-13",
    "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
    "verification_result": "verified",
    "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
    "source_pages": "[{\"url\": \"https://www.virginia.gov/\", \"title\": \"Home | Virginia.gov\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/services/\", \"title\": \"Services & Resources | Virginia.gov\", \"local_file\": \"services.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/agencies/\", \"title\": \"Agencies | Virginia.gov\", \"local_file\": \"agencies.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/state-government/\", \"title\": \"State Government | Virginia.gov\", \"local_file\": \"government.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/services/government/\", \"title\": \"Government | Virginia.gov\", \"local_file\": \"service-category.html\", \"retrieval\": \"readable text/html extraction\"}]",
    "key_regions": "[\"Multi-level service-topic navigation\", \"Service category cards\", \"Agency directory\", \"State-government overview\", \"Grouped footer navigation\"]",
    "key_interactions": "[{\"name\": \"Site search affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Agency text filter and category checkboxes\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Feedback open/close affordances\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
    "complexity": "medium",
    "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
    "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Search/filter/feedback behavior untested; Agency-specific transactions are external and excluded from verified local scope; Prior GOV notes mentioned Virginia as a possible unverified substitute, not a reserved/selected source [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
    "approved_at": "2026-11-13T00:11:23.688078+00:00",
    "approved_by": "Samhith Varma",
    "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
  },
  "category_inventory": [
    {
      "category": "government",
      "slot": "01",
      "source_id": "GOV-01",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "city-municipal",
      "source_name": "City of Boise, Idaho",
      "source_url": "https://www.cityofboise.org/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/GOV.md#gov-01",
      "source_pages": "[{\"url\": \"https://www.cityofboise.org/\", \"title\": \"City of Boise\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.cityofboise.org/residents/\", \"title\": \"Residents | City of Boise\", \"local_file\": \"residents.html\"}, {\"url\": \"https://www.cityofboise.org/visitors/\", \"title\": \"Visitors | City of Boise\", \"local_file\": \"visitors.html\"}, {\"url\": \"https://www.cityofboise.org/business/\", \"title\": \"Business | City of Boise\", \"local_file\": \"business.html\"}, {\"url\": \"https://www.cityofboise.org/government/\", \"title\": \"Government | City of Boise\", \"local_file\": \"government.html\"}, {\"url\": \"https://www.cityofboise.org/departments-programs/\", \"title\": \"Departments & Programs | City of Boise\", \"local_file\": \"departments-programs.html\"}, {\"url\": \"https://www.cityofboise.org/residents/trash-and-recycling/\", \"title\": \"Trash and Recycling | City of Boise\", \"local_file\": \"trash-and-recycling.html\"}, {\"url\": \"https://www.cityofboise.org/departments/finance-and-administration/city-clerk/public-meetings/\", \"title\": \"Public Meetings | City of Boise\", \"local_file\": \"public-meetings.html\"}, {\"url\": \"https://www.cityofboise.org/government/report-an-issue-or-file-a-complaint/\", \"title\": \"File a Complaint or Report an Issue | City of Boise\", \"local_file\": \"report-an-issue-or-file-a-complaint.html\"}, {\"url\": \"https://www.cityofboise.org/departments/mayor/\", \"title\": \"Mayor | City of Boise\", \"local_file\": \"mayor.html\"}, {\"url\": \"https://www.cityofboise.org/departments/city-council/\", \"title\": \"City Council | City of Boise\", \"local_file\": \"city-council.html\"}, {\"url\": \"https://www.cityofboise.org/business/permits/\", \"title\": \"Permits | City of Boise\", \"local_file\": \"permits.html\"}, {\"url\": \"https://www.cityofboise.org/government/boards-and-commissions/\", \"title\": \"Boards and Commissions | City of Boise\", \"local_file\": \"boards-and-commissions.html\"}]",
      "key_regions": "[\"(observed from the home-page link list):\", \"Header and alert: an alert line at the top (the text read \\\"A nationwide Microsoft outage is impact…\\\"). Four audience tabs follow: Residents, Visitors, Business, Government. Departments & Programs is also linked. Each aud\", \"Dropdown items observed:\", \"Residents: Pay, Trash and Recycling, Parking Services, E-Newsletter.\", \"Visitors: Recreation, Parking and Transportation, Arts and Culture, Tourism.\", \"Business: Permits, Building and Planning, Bids and Purchasing, Licensing.\", \"Government: Mayor, City Council, Boards and Commissions, Report an Issue.\", \"Hero and quick links: Utility Billing Services, Jobs, Parking Tickets, Building Permits, Keep Boise Cool, Public Meetings, E-Motos, Pulse Point.\", \"Footer: a `<footer>` element is present, with a \\\"Get Directions\\\" Google Maps link to 150 N Capitol Blvd.\"]",
      "key_interactions": "[{\"name\": \"Google Translate markup appears in the HTML (\\\"google_translate\\\" and \\\"t\", \"evidence\": \"observed\", \"notes\": \"Google Translate markup appears in the HTML (\\\"google_translate\\\" and \\\"translate\\\" strings), so there is a language selector. Building Permits has a link with `?category=all&search=all` query parameters. There is a public-meetings page and a report-an-issue page.\"}, {\"name\": \"search box, hover or click dropdowns, filterable permits list, and a r\", \"evidence\": \"inferred\", \"notes\": \"search box, hover or click dropdowns, filterable permits list, and a report-an-issue form.\"}]",
      "complexity": "medium",
      "stack_clues": "the HTML contains the string \"umbraco\" (probably an Umbraco CMS); Google Translate widget; server-rendered pages. No Server header was captured.",
      "limitations": "I did not inspect the page-level structure (heading hierarchy, ARIA, forms). The alert banner text is time-sensitive and was truncated by the grep, and the live site is likely to differ at build time. I did not check the footer's link groups. I did not verify whether the Public Meetings page embeds a third-party calendar or agenda system.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "government",
      "slot": "02",
      "source_id": "GOV-02",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "state-portal",
      "source_name": "Texas.gov (the Official Website of the State of Texas)",
      "source_url": "https://www.texas.gov/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/GOV.md#gov-02",
      "source_pages": "[{\"url\": \"https://www.texas.gov/\", \"title\": \"The Official Website of the State of Texas | Texas.gov\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.texas.gov/search\", \"title\": \"Search | Texas.gov\", \"local_file\": \"search.html\"}, {\"url\": \"https://www.texas.gov/government-information/services\", \"title\": \"Government Services Directory | Texas.gov\", \"local_file\": \"services.html\"}, {\"url\": \"https://www.texas.gov/government-information/agencies\", \"title\": \"State Agencies Directory | Texas.gov\", \"local_file\": \"agencies.html\"}, {\"url\": \"https://www.texas.gov/licenses-ids-vehicles\", \"title\": \"Texas Licenses, IDs, and Vehicles | Texas.gov\", \"local_file\": \"licenses-ids-vehicles.html\"}, {\"url\": \"https://www.texas.gov/licenses-ids-vehicles/driver-licenses-ids-records\", \"title\": \"Texas Driver Licenses, IDs, and Records | Texas.gov\", \"local_file\": \"driver-licenses-ids-records.html\"}, {\"url\": \"https://www.texas.gov/family-support-services\", \"title\": \"Texas Family and Support Services | Texas.gov\", \"local_file\": \"family-support-services.html\"}, {\"url\": \"https://www.texas.gov/business-taxes/business-support/starting-a-business\", \"title\": \"Starting a Business in Texas | Texas.gov\", \"local_file\": \"starting-a-business.html\"}, {\"url\": \"https://www.texas.gov/help-support/frequently-asked-questions/\", \"title\": \"Frequently Asked Questions | Texas.gov\", \"local_file\": \"frequently-asked-questions.html\"}, {\"url\": \"https://www.texas.gov/family-support-services/accessibility-resources-and-support\", \"title\": \"Accessibility Resources and Support | Texas.gov\", \"local_file\": \"accessibility-resources-and-support.html\"}, {\"url\": \"https://www.texas.gov/sitemap\", \"title\": \"Sitemap | Texas.gov\", \"local_file\": \"sitemap.html\"}, {\"url\": \"https://www.texas.gov/about\", \"title\": \"About Texas.gov | Texas.gov\", \"local_file\": \"about.html\"}]",
      "key_regions": "[\"(observed from the home-page link list):\", \"Header: a government-site banner (`usa-banner`, appears 8 times in the HTML), a Search link, and a \\\"Sign in to TxT\\\" button (Texas by Texas account, an external site).\", \"Top-level categories, each with an \\\"Explore …\\\" link:\", \"Licenses, IDs & Vehicles: Driver Licenses, IDs & Records; Vehicle Registration; Handgun Licenses; Hunting & Fishing Licenses.\", \"Business & Taxes: Business Support; Starting a Business; Taxes.\", \"Family & Support Services: Birth, Marriage & Death Records; Disaster & Emergency Assistance; Education & Child Care; Food Assistance; Health; Housing; Jobs; Moving to Texas; Public Safety; Veteran Support; Accessibility \", \"Government Information: About Texas, Services Directory, State Agencies Directory, Local Government Resources, Open Data Portal, Voting & Elections.\", \"Recreation & Travel: History & Culture; Parks & the Outdoors.\", \"Hero: a search area with suggested queries (Renew driver license, Register vehicle, Voter info, Property tax info). The links point to `/search?q=…&type=ai`.\", \"Promo blocks: Texas by Texas (TxT), Property Tax Transparency, TREO (the Texas Regulatory Efficiency Office).\", \"Footer: About Texas.gov, Site Policies, AI Notice, Sitemap, Help and Support, FAQ, Provide Feedback, plus external state links (Veterans Portal, Open Data, Records Locator, Homeland Security, SAO Fraud Hotline).\"]",
      "key_interactions": "[{\"name\": \"a search page with suggested queries; a services directory that takes \", \"evidence\": \"observed\", \"notes\": \"a search page with suggested queries; a services directory that takes a `?category=86` filter; an agencies directory; translate markup (7 matches of \\\"translate\\\", which suggests a language option but I did not confirm a selector); a FAQ page.\"}, {\"name\": \"search autocomplete and directory filtering. I did not confirm an AI-a\", \"evidence\": \"inferred\", \"notes\": \"search autocomplete and directory filtering. I did not confirm an AI-assisted search, although `type=ai` and the \\\"AI Notice\\\" page suggest one. No meetings calendar was seen.\"}]",
      "complexity": "high",
      "stack_clues": "the HTML contains \"drupal\" (42 matches) and \"acquia\" (one link points to an Acquia host), so Drupal on Acquia. The USWDS banner class (`usa-banner`) is present.",
      "limitations": "there is no meetings calendar or alert banner (none observed). One footer link points to a staging hostname (texasgovportalstage.prod.acquia-sites.com), which I did not follow. Most transactional services are on external agency sites, so replication should be limited to texas.gov pages. I did not test search results. Complexity recorded in research as 'medium to high'; normalized to 'high' for this field.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "government",
      "slot": "03",
      "source_id": "GOV-03",
      "model_group": "claude",
      "model_id": "claude-sonnet-5-5",
      "model_version": "",
      "subcategory": "federal-agency",
      "source_name": "National Park Service (NPS.gov)",
      "source_url": "https://www.nps.gov/",
      "verified_at": "2026-11-12",
      "verification_method": "HTTP GET via curl (no browser rendering)",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/GOV.md#gov-03",
      "source_pages": "[{\"url\": \"https://www.nps.gov/\", \"title\": \"National Park Service (NPS.gov)\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.nps.gov/index.htm\", \"title\": \"NPS.gov Homepage (U.S. National Park Service)\", \"local_file\": \"index-2.html\"}, {\"url\": \"https://www.nps.gov/findapark/index.htm\", \"title\": \"Find a Park (U.S. National Park Service)\", \"local_file\": \"findapark-index-htm.html\"}, {\"url\": \"https://www.nps.gov/planyourvisit/index.htm\", \"title\": \"Plan Your Visit (U.S. National Park Service)\", \"local_file\": \"planyourvisit-index-htm.html\"}, {\"url\": \"https://www.nps.gov/learnandexplore/index.htm\", \"title\": \"Learn & Explore (U.S. National Park Service)\", \"local_file\": \"learnandexplore-index-htm.html\"}, {\"url\": \"https://www.nps.gov/getinvolved/index.htm\", \"title\": \"Get Involved (U.S. National Park Service)\", \"local_file\": \"getinvolved-index-htm.html\"}, {\"url\": \"https://www.nps.gov/aboutus/index.htm\", \"title\": \"What We Do (U.S. National Park Service)\", \"local_file\": \"aboutus-index-htm.html\"}, {\"url\": \"https://www.nps.gov/yell/index.htm\", \"title\": \"Yellowstone National Park (U.S. National Park Service)\", \"local_file\": \"yell-index-htm.html\"}, {\"url\": \"https://www.nps.gov/yell/planyourvisit/index.htm\", \"title\": \"Plan Your Visit - Yellowstone National Park (U.S. National Park Service)\", \"local_file\": \"planyourvisit-index-htm-2.html\"}, {\"url\": \"https://www.nps.gov/subjects/bears/index.htm\", \"title\": \"Bears (U.S. National Park Service)\", \"local_file\": \"bears-index-htm.html\"}, {\"url\": \"https://www.nps.gov/aboutus/news/index.htm\", \"title\": \"News (U.S. National Park Service)\", \"local_file\": \"news-index-htm.html\"}]",
      "key_regions": "[\"Header: a USWDS government banner (`usa-banner`, 13 matches), then `<nav id=\\\"GlobalNav\\\" class=\\\"GlobalNav usaGlobalNav\\\">`.\", \"Hero: two hero navigation blocks. One is labelled \\\"Find a Park\\\" (link /findapark/index.htm), the other is a topic navigation. The home page links to Yellowstone.\", \"Body: a very large \\\"explore by topic\\\" link set under /subjects/ (animals, geology and natural features, history and culture, and similar groups, such as Bats, Bears, Birds, Glaciers, Volcanoes and Battlefields).\", \"Footer: `<footer id=\\\"GlobalFooter\\\" class=\\\"usa-footer\\\">` and a `usa-identifier` section with required links.\"]",
      "key_interactions": "[{\"name\": \"a Find a Park page; a search page at /search/ that returned the title \", \"evidence\": \"observed\", \"notes\": \"a Find a Park page; a search page at /search/ that returned the title \\\"Your search didn't work | USAGov\\\", so search is delegated to the search.gov/USAGov service, and the search results are not reproducible. A contact page I guessed (/aboutus/contact-us.htm) r\"}, {\"name\": \"a park-picker dropdown and state filters in Find a Park, and park-aler\", \"evidence\": \"inferred\", \"notes\": \"a park-picker dropdown and state filters in Find a Park, and park-alert banners on park pages. I did not look for or see a language selector, meetings calendar or report-a-problem form.\"}]",
      "complexity": "high",
      "stack_clues": "static .htm URLs (suggests an in-house CMS; not confirmed); USWDS classes (`usa-banner`, `usa-footer`, `usa-identifier`); html5shiv and respond.js legacy shims loaded from a CDN. The CMS is unknown.",
      "limitations": "I did not capture the GlobalNav dropdown items, because the grep showed only the first 70 links; the nav labels (Find a Park, Plan Your Visit, Learn & Explore, Get Involved, What We Do) are inferred from the matching section page titles, not read from the nav markup. No department directory, meetings calendar, or alert banner was observed. Search relies on an external service.",
      "approved_at": "2026-11-13",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/claude/research/approval-2026-11-13.md"
    },
    {
      "category": "government",
      "slot": "04",
      "source_id": "GOV-04",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "municipal government",
      "source_name": "City of Boston",
      "source_url": "https://www.boston.gov/",
      "verified_at": "2026-11-13",
      "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
      "source_pages": "[{\"url\": \"https://www.boston.gov/\", \"title\": \"Homepage | Boston.gov\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.boston.gov/departments\", \"title\": \"Departments | Boston.gov\", \"local_file\": \"departments.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.boston.gov/public-notices\", \"title\": \"Public notices | Boston.gov\", \"local_file\": \"notices.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.boston.gov/departments/parking-clerk\", \"title\": \"Parking Clerk | Boston.gov\", \"local_file\": \"parking.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.boston.gov/departments/311/city-boston-government\", \"title\": \"City of Boston Government | Boston.gov\", \"local_file\": \"government.html\", \"retrieval\": \"readable text/html extraction\"}]",
      "key_regions": "[\"Utility/menu/language controls\", \"City-status homepage bands\", \"Department directory\", \"Public-notice listing\", \"Service page section navigation\"]",
      "key_interactions": "[{\"name\": \"Search affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Public-notice text and department filters\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"In-page section navigation and 311 handoff\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
      "complexity": "high",
      "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
      "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Search includes an AI-summary mode; replicate only labeled local search/demo behavior, never a live AI backend; Language switch, mobile menu, directory behavior and filters not executed; Do not copy real operational notices, seals, public officials or contact data into fictional content [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
      "approved_at": "2026-11-13T00:11:23.688078+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
    },
    {
      "category": "government",
      "slot": "05",
      "source_id": "GOV-05",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "state portal/agency",
      "source_name": "Commonwealth of Virginia portal",
      "source_url": "https://www.virginia.gov/",
      "verified_at": "2026-11-13",
      "verification_method": "Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/replacement-proposals-2026-11-13.md; pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json; pipelines/codex/research/evidence/replacement-approval-2026-11-13.json",
      "source_pages": "[{\"url\": \"https://www.virginia.gov/\", \"title\": \"Home | Virginia.gov\", \"local_file\": \"index.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/services/\", \"title\": \"Services & Resources | Virginia.gov\", \"local_file\": \"services.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/agencies/\", \"title\": \"Agencies | Virginia.gov\", \"local_file\": \"agencies.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/state-government/\", \"title\": \"State Government | Virginia.gov\", \"local_file\": \"government.html\", \"retrieval\": \"readable text/html extraction\"}, {\"url\": \"https://www.virginia.gov/services/government/\", \"title\": \"Government | Virginia.gov\", \"local_file\": \"service-category.html\", \"retrieval\": \"readable text/html extraction\"}]",
      "key_regions": "[\"Multi-level service-topic navigation\", \"Service category cards\", \"Agency directory\", \"State-government overview\", \"Grouped footer navigation\"]",
      "key_interactions": "[{\"name\": \"Site search affordance\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Agency text filter and category checkboxes\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}, {\"name\": \"Feedback open/close affordances\", \"evidence\": \"observed\", \"notes\": \"Affordance present in retrieved text only; behavior not executed.\"}]",
      "complexity": "medium",
      "stack_clues": "unknown; no rendered browser or raw-origin stack audit",
      "limitations": "Verification is limited to readable connected-web text, potentially cached/indexed; no fresh origin HTTP response and no rendered or interaction verification was obtained (origin_http_status: none). Approved verification_interpretation: verified denotes the connected-web text-retrieval method only. Source-specific: Search/filter/feedback behavior untested; Agency-specific transactions are external and excluded from verified local scope; Prior GOV notes mentioned Virginia as a possible unverified substitute, not a reserved/selected source [limitations text reconstructed 2026-11-12 from pipelines/codex/research/evidence/replacement-proposals-2026-11-13.json after an erroneous edit by the Claude session; the original prose wording was not recoverable.]",
      "approved_at": "2026-11-13T00:11:23.688078+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/evidence/replacement-approval-2026-11-13.json"
    },
    {
      "category": "government",
      "slot": "06",
      "source_id": "GOV-06",
      "model_group": "codex",
      "model_id": "gpt-6.1-sol",
      "model_version": "",
      "subcategory": "federal agency",
      "source_name": "U.S. Environmental Protection Agency",
      "source_url": "https://www.epa.gov/",
      "verified_at": "2026-11-12T00:55:55.417382+00:00",
      "verification_method": "Live web search/open/click text extraction plus urllib HTTP GET; HTTP-only, no browser rendering or interaction execution",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/GOV.md#gov-06",
      "source_pages": "[{\"url\": \"https://www.epa.gov/\", \"title\": \"U.S. Environmental Protection Agency | US EPA\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.epa.gov/environmental-topics\", \"title\": \"Environmental Topics | US EPA\", \"local_file\": \"topics.html\"}, {\"url\": \"https://www.epa.gov/aboutepa\", \"title\": \"About EPA | US EPA\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.epa.gov/newsreleases\", \"title\": \"Browse News Releases | US EPA\", \"local_file\": \"news.html\"}, {\"url\": \"https://www.epa.gov/enforcement/forms/contact-us-about-enforcement\", \"title\": \"Contact Us about Enforcement | US EPA\", \"local_file\": \"contact-enforcement.html\"}]",
      "key_regions": "[\"Government banner, global navigation and search drawer controls\", \"Home feature/slideshow structure, career/grant/water resource blocks and news\", \"Topic directory grouped by environmental subject; headquarters/regional-office overview\", \"News browse sections by subject/date/office/location/language; local sidebar navigation\", \"Enforcement contact guidance, question form and shared grouped footer\"]",
      "key_interactions": "[{\"name\": \"Menu and search drawer\", \"evidence\": \"observed\", \"notes\": \"Buttons have aria-expanded/aria-controls; GET search targets search.epa.gov/epasearch. Opening and results inferred, untested.\"}, {\"name\": \"Homepage slideshow\", \"evidence\": \"observed\", \"notes\": \"hero-slideshow__nav-button controls in HTML; transition, timing and pause behavior untested.\"}, {\"name\": \"News location selection\", \"evidence\": \"observed\", \"notes\": \"statepicker/regionpicker selects with Go controls; selection navigation untested. Language browse is content classification, not translation control.\"}, {\"name\": \"Enforcement question form\", \"evidence\": \"observed\", \"notes\": \"POST form with name/email/topic inputs, required topic, textarea and submit; no values entered or submission made. Error/success behavior inferred.\"}, {\"name\": \"Side navigation\", \"evidence\": \"inferred\", \"notes\": \"Toggle and expanded-state markup indicates disclosure; interaction and keyboard behavior untested.\"}]",
      "complexity": "medium",
      "stack_clues": "Observed drupalSettings and /core/misc/drupal.js?v=10.6.19; jQuery asset v=3.7.1; usa- class conventions; Touchpoints script. Drupal/USWDS conventions indicated, deployed backend/version not independently authenticated.",
      "limitations": "PROVISIONAL reservation clearance and all-ten approval pending. Availability verified by HTTP 200 only; rendering, responsive layout, keyboard, search, slideshow, validation and submissions untested. HTTP and web extraction content differ (including older news on topic page); no freshness claim. No service application, report form or events calendar inspected.",
      "approved_at": "2026-11-12",
      "approved_by": "Samhith Varma",
      "approval_reference": "metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)"
    },
    {
      "category": "government",
      "slot": "07",
      "source_id": "GOV-07",
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
      "category": "government",
      "slot": "08",
      "source_id": "GOV-08",
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
      "category": "government",
      "slot": "09",
      "source_id": "GOV-09",
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
      "category": "government",
      "slot": "10",
      "source_id": "GOV-10",
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
      "path": "metadata/source-inventories/government.csv",
      "sha256": "0bf719840a282534debc5051f0d9227b87bc0acf533a056ff7547518cbb8b197"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "776f2e7456882684f998881cfdf2bdeb433e9ff1cd4dbb3a87037a76c59f5c59"
    }
  ],
  "prepared_at": "2026-11-13T21:27:01.317Z",
  "task_is_execution": false
}
```
