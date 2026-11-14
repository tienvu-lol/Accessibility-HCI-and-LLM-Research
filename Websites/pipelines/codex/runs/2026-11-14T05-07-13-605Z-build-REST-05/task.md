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
  "target": "REST-05",
  "category": "restaurant",
  "category_requirements": {
    "category": "restaurant",
    "prefix": "REST",
    "name": "Restaurants and food service",
    "sampling_strata": [
      {
        "slot": 1,
        "source_id": "REST-01",
        "model_group": "claude",
        "stratum": "small local independent",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 2,
        "source_id": "REST-02",
        "model_group": "claude",
        "stratum": "BBQ / smokehouse",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 3,
        "source_id": "REST-03",
        "model_group": "claude",
        "stratum": "fine dining",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 4,
        "source_id": "REST-04",
        "model_group": "codex",
        "stratum": "vegan / health",
        "authority": "codex assignment"
      },
      {
        "slot": 5,
        "source_id": "REST-05",
        "model_group": "codex",
        "stratum": "multi-location group",
        "authority": "codex assignment"
      },
      {
        "slot": 6,
        "source_id": "REST-06",
        "model_group": "codex",
        "stratum": "pizzeria",
        "authority": "codex assignment"
      },
      {
        "slot": 7,
        "source_id": "REST-07",
        "model_group": "open-source",
        "stratum": "fast-casual chain",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 8,
        "source_id": "REST-08",
        "model_group": "open-source",
        "stratum": "ethnic (Xi'an Chinese)",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 9,
        "source_id": "REST-09",
        "model_group": "open-source",
        "stratum": "brewery (age gate)",
        "authority": "coordination proposal; reconcile with shared inventory"
      },
      {
        "slot": 10,
        "source_id": "REST-10",
        "model_group": "open-source",
        "stratum": "cafe / bakery",
        "authority": "coordination proposal; reconcile with shared inventory"
      }
    ],
    "representative_pages": [
      "home",
      "menu index",
      "menu detail when present",
      "reservations",
      "about/story",
      "locations or visit",
      "private events or catering",
      "news/journal when present",
      "contact",
      "404"
    ],
    "conditional_interactions": [
      "menu filtering on inline data",
      "reservation request on inline data",
      "responsive navigation",
      "open/closed hours display",
      "age gate where observed",
      "newsletter signup where observed"
    ],
    "simulation_notes": "Reservations, online ordering, delivery, payment and gift cards are labeled simulations only.",
    "scope_rule": "Use only observed source pages/features; label inferred behavior and intentional additions. Page count follows approved scope, not a fixed quota."
  },
  "model": {
    "id": "gpt-6",
    "version": null,
    "runtime": "Codex coding agent",
    "reasoning_effort": null,
    "operator": "Samhith Varma"
  },
  "output_relative_to_Websites": "restaurant/codex/REST-05",
  "selected_source": {
    "category": "restaurant",
    "slot": "05",
    "source_id": "REST-05",
    "model_group": "codex",
    "model_id": "gpt-6",
    "model_version": "",
    "subcategory": "multi-location group",
    "source_name": "Hogsalt",
    "source_url": "https://www.hogsalt.com/",
    "verified_at": "2026-11-14T04:40:26.232400+00:00",
    "verification_method": "Live web search and web open/click text retrieval; potentially indexed/cached; no rendered browser",
    "verification_result": "verified",
    "evidence_reference": "pipelines/codex/research/REST.md#rest-05",
    "source_pages": "[{\"url\": \"https://www.hogsalt.com/\", \"title\": \"Homepage\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.hogsalt.com/restaurants\", \"title\": \"Restaurants\", \"local_file\": \"restaurants.html\"}, {\"url\": \"https://www.hogsalt.com/restaurants-list/maudes-liquor-bar-gdj97\", \"title\": \"Maude’s Liquor Bar\", \"local_file\": \"restaurant-detail.html\"}, {\"url\": \"https://www.hogsalt.com/about\", \"title\": \"About\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.hogsalt.com/private-events\", \"title\": \"Private events\", \"local_file\": \"private-events.html\"}]",
    "key_regions": "[\"Image-led homepage and slide indicators\", \"Restaurant directory with city labels\", \"Brief restaurant detail with next-item link\", \"Story and image sequence\", \"Private dining venue directory\", \"Grouped utility footer\"]",
    "key_interactions": "[{\"name\": \"Directory navigation\", \"evidence\": \"observed\", \"notes\": \"Read-more links and city labels; interactive filtering not established.\"}, {\"name\": \"Slides\", \"evidence\": \"inferred\", \"notes\": \"Numbered current-slide labels in text; autoplay, transitions and keyboard behavior untested.\"}, {\"name\": \"Next restaurant\", \"evidence\": \"observed\", \"notes\": \"Detail page links to next venue.\"}, {\"name\": \"Mailing list\", \"evidence\": \"observed\", \"notes\": \"Footer link only; fields and submission behavior unverified and outside proposed scope.\"}]",
    "complexity": "medium",
    "stack_clues": "images.squarespace-cdn.com image host; platform/version not independently confirmed",
    "limitations": "Bare hogsalt.com retrieval failed; www homepage and interior pages readable. Detail page is sparse; do not invent menu/reservation details. No brand-site cloning, rewards, checkout or live event inquiry. No rendered/mobile/keyboard/form tests. Source and scope unapproved; exact generator TBD.",
    "approved_at": "2026-11-14T04:44:45.932240+00:00",
    "approved_by": "Samhith Varma",
    "approval_reference": "pipelines/codex/research/REST-source-approval.md"
  },
  "category_inventory": [
    {
      "category": "restaurant",
      "slot": "01",
      "source_id": "REST-01",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "small local independent",
      "source_name": "Via Carota",
      "source_url": "https://www.viacarota.com/",
      "verified_at": "2026-11-14",
      "verification_method": "HTTP GET via Node fetch (no browser rendering); robots.txt honored for user-agent *",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/REST.md#rest-01; pipelines/claude/research/evidence/REST-http-2026-11-14.json",
      "source_pages": "[{\"url\": \"https://www.viacarota.com/\", \"title\": \"Via Carota\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.viacarota.com/text\", \"title\": \"Plain Text Menu \\u2014 Via Carota\", \"local_file\": \"menu.html\"}, {\"url\": \"https://www.viacarota.com/press\", \"title\": \"Via Carota press reviews \\u2014 Via Carota\", \"local_file\": \"press.html\"}, {\"url\": \"https://www.viacarota.com/gatherings\", \"title\": \"Gatherings \\u2014 Via Carota\", \"local_file\": \"gatherings.html\"}, {\"url\": \"https://www.viacarota.com/shop\", \"title\": \"Shop \\u2014 Via Carota\", \"local_file\": \"shop.html\"}, {\"url\": \"https://www.viacarota.com/craft-cocktails\", \"title\": \"Craft Cocktails \\u2014 Via Carota\", \"local_file\": \"cocktails.html\"}, {\"url\": \"https://www.viacarota.com/ritaandjody\", \"title\": \"Rita Sodi & Jody Williams \\u2014 Via Carota\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.viacarota.com/community\", \"title\": \"Via Carota Community \\u2014 Via Carota\", \"local_file\": \"community.html\"}, {\"url\": \"https://www.viacarota.com/cart\", \"title\": \"Via Carota\", \"local_file\": \"cart.html\"}, {\"url\": \"https://www.viacarota.com/pomeriggio-1/\", \"title\": \"Via Carota food gallery \\u2014 Via Carota\", \"local_file\": \"gallery.html\"}]",
      "key_regions": "[\"Header: 6 nav elements; anchor text Gatherings, Shop, Craft Cocktails, Rita & Jody, Cart; search form action=/search method=get\", \"Home h1: 'VIA CAROTA MENU', 'VIA CAROTA', 'IT TAKEs A VILLAGE'\", \"Home h2: 'INDIRIZZO' (address), 'ORARI' (hours), 'STAY IN TOUCH' (newsletter)\", \"Home h3: plain-text menu pointer; '51 Grove Street, New York City'; two hours lines; 'Walk-ins always welcome.'; email contact line\", \"Menu is an image on the home page with a plain-text alternative at /text (h2: SPUNTINI, BRUSCHETTA, ANTIPASTI, VERDURE, Pasta, PESCE, CARNE, SPeCIALS, Lista del vini)\", \"Footer: newsletter form, Accessibility, Privacy, Careers, sister restaurants, James Beard link\", \"58 img, 4 button, 2 forms, 2 inputs (text, email)\"]",
      "key_interactions": "[{\"name\": \"Site search form (GET /search, text input)\", \"evidence\": \"observed\", \"notes\": \"/search itself returned no HTTP status when fetched\"}, {\"name\": \"Newsletter subscribe (POST, email)\", \"evidence\": \"observed\", \"notes\": \"footer 'STAY IN TOUCH'\"}, {\"name\": \"Cart at /cart (Squarespace commerce)\", \"evidence\": \"observed\", \"notes\": \"shop merchandise\"}, {\"name\": \"Reservations are off-site via Resy\", \"evidence\": \"observed\", \"notes\": \"'Begin Resy Widget Footer Injection' plus link to resy.com venue page; no on-site booking form\"}, {\"name\": \"Ordering is off-site\", \"evidence\": \"observed\", \"notes\": \"order.online/store/995599\"}, {\"name\": \"Image gallery under /pomeriggio-1/<hash>\", \"evidence\": \"observed\", \"notes\": \"two hashed URLs returned byte-identical responses\"}]",
      "complexity": "low-medium",
      "stack_clues": "Squarespace (static1.squarespace.com, images.squarespace-cdn.com, definitions.sqspcdn.com component CSS, sqs-announcement-bar classes), Adobe Typekit, Resy widget injection, order.online for takeout.",
      "limitations": "Raw HTML only; rendered nav may differ. /search returned no HTTP status. Menu dish content is an image on the home page, text only at /text. SOURCE DEFECT: nav link labelled 'Careers' points to /covid-19-safety-measures.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "02",
      "source_id": "REST-02",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "BBQ / smokehouse",
      "source_name": "Franklin Barbecue",
      "source_url": "https://franklinbbq.com/",
      "verified_at": "2026-11-14",
      "verification_method": "HTTP GET via Node fetch (no browser rendering); robots.txt honored for user-agent *",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/REST.md#rest-02; pipelines/claude/research/evidence/REST-http-2026-11-14.json",
      "source_pages": "[{\"url\": \"https://franklinbbq.com/\", \"title\": \"Franklin Barbecue | Discover, Savor, Enjoy - Order Now\", \"local_file\": \"index.html\"}, {\"url\": \"https://franklinbbq.com/menu\", \"title\": \"Menu | Order Now for Fresh BBQ \\u2014 Franklin Barbecue\", \"local_file\": \"menu.html\"}, {\"url\": \"https://franklinbbq.com/visitus\", \"title\": \"Catering & Events | Enjoy, Celebrate, Book Now \\u2014 Franklin Barbecue\", \"local_file\": \"visit.html\"}, {\"url\": \"https://franklinbbq.com/about\", \"title\": \"About | Experience Better BBQ Today \\u2014 Franklin Barbecue\", \"local_file\": \"about.html\"}, {\"url\": \"https://franklinbbq.com/private-events01\", \"title\": \"Catering & Events | Enjoy, Celebrate, Book Now \\u2014 Franklin Barbecue\", \"local_file\": \"private-events.html\"}, {\"url\": \"https://franklinbbq.com/private-party-franklin-backyard\", \"title\": \"Private Party at Franklin Backyard \\u2014 Franklin Barbecue\", \"local_file\": \"private-party.html\"}, {\"url\": \"https://franklinbbq.com/gift-cards\", \"title\": \"Gift Cards | Elevate Your Grill Game - Shop Now \\u2014 Franklin Barbecue\", \"local_file\": \"gift-cards.html\"}, {\"url\": \"https://franklinbbq.com/sauces-rubs\", \"title\": \"Sauces & Rubs | Enhance Your Grilling Today \\u2014 Franklin Barbecue\", \"local_file\": \"sauces-rubs.html\"}, {\"url\": \"https://franklinbbq.com/contact\", \"title\": \"Contact | Reach Out Today \\u2014 Franklin Barbecue\", \"local_file\": \"contact.html\"}]",
      "key_regions": "[\"Header: 4 nav elements; anchor text Visit Us, Menu, Sauces & Rubs, About, Gift Cards, 'Folder: Ship', Private Events, Contact, cart count\", \"Announcement bar with a holiday-booking message (sqs-announcement-bar-text-inner)\", \"Home h1: '\\u201cSERVING THE BEST BARBECUE IN THE KNOWN UNIVERSE.\\u201d', 'Planning to visit?'\", \"Home h2: 'New Venue Space', 'HOLIDAY HOURS', 'Visit our sister restaurant - Uptown', 'Buy an e-Gift Card today!', 'Get the Latest'\", \"Home h3: 'Our location', 'Our Hours'\", \"Menu page h1 'menu'; h3 lunch hours 'Tuesday - Sunday, 11 am until sold out (about 3 pm). closed Monday.' and a preordering pointer; only 4 img and no form\", \"46 img, 10 button, 1 form, 1 input (email) on the home page\"]",
      "key_interactions": "[{\"name\": \"Newsletter subscribe (POST, email)\", \"evidence\": \"observed\", \"notes\": \"'Get the Latest'\"}, {\"name\": \"Cart and Squarespace commerce\", \"evidence\": \"observed\", \"notes\": \"sauces, rubs, merchandise\"}, {\"name\": \"Pre-ordering is off-site\", \"evidence\": \"observed\", \"notes\": \"preorder.franklinbbq.com\"}, {\"name\": \"Shop is off-site\", \"evidence\": \"observed\", \"notes\": \"shop.franklinbbq.com\"}, {\"name\": \"Gift cards are off-site\", \"evidence\": \"observed\", \"notes\": \"www.toasttab.com/franklinbbq/giftcards\"}, {\"name\": \"Nationwide shipping off-site\", \"evidence\": \"observed\", \"notes\": \"goldbelly.com/franklin-barbecue\"}, {\"name\": \"Catering / private-event enquiry pages\", \"evidence\": \"observed\", \"notes\": \"/private-events01 and /private-party-franklin-backyard\"}]",
      "complexity": "medium",
      "stack_clues": "Squarespace (static1.squarespace.com, versioned site CSS, definitions.sqspcdn.com components, hide-opentable-icons / opentable-style-dark theme classes), Typekit, Toast for gift cards, separate shop. subdomain, Goldbelly.",
      "limitations": "Raw HTML only; rendered nav may differ. SOURCE DEFECT: primary nav links 'Private Events' to /private-events, which returns 404; the working page is /private-events01. /visitus and /private-events01 serve the same <title>. Menu dish content appears image-led.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "03",
      "source_id": "REST-03",
      "model_group": "claude",
      "model_id": "",
      "model_version": "",
      "subcategory": "fine dining",
      "source_name": "Eleven Madison Park",
      "source_url": "https://www.elevenmadisonpark.com/",
      "verified_at": "2026-11-14",
      "verification_method": "HTTP GET via Node fetch (no browser rendering); robots.txt honored for user-agent *",
      "verification_result": "verified",
      "evidence_reference": "pipelines/claude/research/REST.md#rest-03; pipelines/claude/research/evidence/REST-http-2026-11-14.json",
      "source_pages": "[{\"url\": \"https://www.elevenmadisonpark.com/\", \"title\": \"Eleven Madison Park\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/ourrestaurant\", \"title\": \"About \\u2014 Eleven Madison Park\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/team\", \"title\": \"Team \\u2014 Eleven Madison Park\", \"local_file\": \"team.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/events\", \"title\": \"Events \\u2014 Eleven Madison Park\", \"local_file\": \"events.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/stories\", \"title\": \"Stories \\u2014 Eleven Madison Park\", \"local_file\": \"stories.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/magic-farms\", \"title\": \"Magic Farms \\u2014 Eleven Madison Park\", \"local_file\": \"magic-farms.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/faq\", \"title\": \"FAQs \\u2014 Eleven Madison Park\", \"local_file\": \"faq.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/press-and-accolades\", \"title\": \"Press and Accolades \\u2014 Eleven Madison Park\", \"local_file\": \"press.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/careers\", \"title\": \"Careers \\u2014 Eleven Madison Park\", \"local_file\": \"careers.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/giftcards\", \"title\": \"Gift Cards \\u2014 Eleven Madison Park\", \"local_file\": \"gift-cards.html\"}, {\"url\": \"https://www.elevenmadisonpark.com/contact\", \"title\": \"Contact \\u2014 Eleven Madison Park\", \"local_file\": \"contact.html\"}]",
      "key_regions": "[\"CRITICAL: this source returned NO h1, h2 or h3 elements in raw HTML; page content is rendered client-side, so section hierarchy is NOT established by this research\", \"Header/nav: 3 nav elements; anchor text About Us (/ourrestaurant), Team, Magic Farms, Events, Stories, Gift Cards, 'Folder: About', 'Folder: Shop', cart count, FAQs, Press & Accolades, Careers, Contact Us, Accessibility Statement\", \"43 img, 28 button, 1 form, 3 inputs (given-name, surname, email) - a first/last-name newsletter signup\", \"The site publishes its own Accessibility Statement page at /accessibility-statement\", \"/about and /ourrestaurant returned byte-identical 296,093-byte responses: two routes onto one page\"]",
      "key_interactions": "[{\"name\": \"Newsletter subscribe (POST; given-name, surname, email)\", \"evidence\": \"observed\", \"notes\": \"only form in raw HTML\"}, {\"name\": \"Substantial client-side interaction implied\", \"evidence\": \"inferred\", \"notes\": \"28 button elements in raw markup; this method cannot characterise them\"}, {\"name\": \"Reservations are off-site via Resy\", \"evidence\": \"observed\", \"notes\": \"resy.com/cities/new-york-ny/venues/eleven-madison-park; no on-site booking form\"}, {\"name\": \"Wine list is an external PDF\", \"evidence\": \"observed\", \"notes\": \"hub.binwise.com/print/WineList_PDF.aspx\"}, {\"name\": \"Related properties linked\", \"evidence\": \"observed\", \"notes\": \"elevenmadisonhome.com, wineclub.elevenmadisonhome.com, clementebar.com\"}]",
      "complexity": "unknown",
      "stack_clues": "Squarespace (static1.squarespace.com versioned CSS, definitions.sqspcdn.com components, file.squarespace-cdn.com), Typekit, Resy for booking, BinWise for the wine list.",
      "limitations": "MOST SIGNIFICANT: no headings in raw HTML, so page structure, section order and copy hierarchy are unknown; a replica built from this evidence alone would be inventing structure. No browsable menu page exists. /about and /ourrestaurant duplicate one page. Raw HTML only; rendered nav may differ.",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "04",
      "source_id": "REST-04",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "vegan / health",
      "source_name": "Crossroads Kitchen",
      "source_url": "https://www.crossroadskitchen.com/",
      "verified_at": "2026-11-14T04:40:26.232400+00:00",
      "verification_method": "Live web search and web open/click text retrieval; potentially indexed/cached; no rendered browser",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/REST.md#rest-04",
      "source_pages": "[{\"url\": \"https://www.crossroadskitchen.com/\", \"title\": \"Restaurants\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.crossroadskitchen.com/los-angeles\", \"title\": \"Los Angeles\", \"local_file\": \"los-angeles.html\"}, {\"url\": \"https://www.crossroadskitchen.com/dinner-menu\", \"title\": \"Dinner menu\", \"local_file\": \"dinner-menu.html\"}, {\"url\": \"https://www.crossroadskitchen.com/our-story\", \"title\": \"Our story\", \"local_file\": \"our-story.html\"}, {\"url\": \"https://www.crossroadskitchen.com/reservations\", \"title\": \"Reservations\", \"local_file\": \"reservations.html\"}, {\"url\": \"https://www.crossroadskitchen.com/private-dining\", \"title\": \"Private dining\", \"local_file\": \"private-dining.html\"}]",
      "key_regions": "[\"Nested restaurant/about/menu navigation\", \"Location chooser and hours\", \"Categorized dinner listings and dietary markers\", \"Story content\", \"Reservation handoff\", \"Private dining imagery and information\", \"Legal footer\"]",
      "key_interactions": "[{\"name\": \"Navigation\", \"evidence\": \"observed\", \"notes\": \"Links and nested menu hierarchy in extracted text; disclosure behavior untested.\"}, {\"name\": \"Dinner section navigation\", \"evidence\": \"observed\", \"notes\": \"Dinner and tasting-menu links; tabs versus anchors unverified.\"}, {\"name\": \"Reservations\", \"evidence\": \"observed\", \"notes\": \"Los Angeles OpenTable link; local handoff/demo only, no live availability.\"}, {\"name\": \"Private dining gallery\", \"evidence\": \"inferred\", \"notes\": \"Repeated venue images suggest gallery; transitions and controls untested.\"}]",
      "complexity": "medium",
      "stack_clues": "static.wixstatic.com and static.parastorage.com asset hosts; Wix-associated clues, version unknown",
      "limitations": "Six source pages; no external Las Vegas build, ordering, gift-card payment or catering transaction. Reservation fields not inspected; a custom booking form would be an intentional addition. No rendered/mobile/keyboard/form tests. Source and scope unapproved; exact generator TBD.",
      "approved_at": "2026-11-14T04:44:45.932240+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/REST-source-approval.md"
    },
    {
      "category": "restaurant",
      "slot": "05",
      "source_id": "REST-05",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "multi-location group",
      "source_name": "Hogsalt",
      "source_url": "https://www.hogsalt.com/",
      "verified_at": "2026-11-14T04:40:26.232400+00:00",
      "verification_method": "Live web search and web open/click text retrieval; potentially indexed/cached; no rendered browser",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/REST.md#rest-05",
      "source_pages": "[{\"url\": \"https://www.hogsalt.com/\", \"title\": \"Homepage\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.hogsalt.com/restaurants\", \"title\": \"Restaurants\", \"local_file\": \"restaurants.html\"}, {\"url\": \"https://www.hogsalt.com/restaurants-list/maudes-liquor-bar-gdj97\", \"title\": \"Maude’s Liquor Bar\", \"local_file\": \"restaurant-detail.html\"}, {\"url\": \"https://www.hogsalt.com/about\", \"title\": \"About\", \"local_file\": \"about.html\"}, {\"url\": \"https://www.hogsalt.com/private-events\", \"title\": \"Private events\", \"local_file\": \"private-events.html\"}]",
      "key_regions": "[\"Image-led homepage and slide indicators\", \"Restaurant directory with city labels\", \"Brief restaurant detail with next-item link\", \"Story and image sequence\", \"Private dining venue directory\", \"Grouped utility footer\"]",
      "key_interactions": "[{\"name\": \"Directory navigation\", \"evidence\": \"observed\", \"notes\": \"Read-more links and city labels; interactive filtering not established.\"}, {\"name\": \"Slides\", \"evidence\": \"inferred\", \"notes\": \"Numbered current-slide labels in text; autoplay, transitions and keyboard behavior untested.\"}, {\"name\": \"Next restaurant\", \"evidence\": \"observed\", \"notes\": \"Detail page links to next venue.\"}, {\"name\": \"Mailing list\", \"evidence\": \"observed\", \"notes\": \"Footer link only; fields and submission behavior unverified and outside proposed scope.\"}]",
      "complexity": "medium",
      "stack_clues": "images.squarespace-cdn.com image host; platform/version not independently confirmed",
      "limitations": "Bare hogsalt.com retrieval failed; www homepage and interior pages readable. Detail page is sparse; do not invent menu/reservation details. No brand-site cloning, rewards, checkout or live event inquiry. No rendered/mobile/keyboard/form tests. Source and scope unapproved; exact generator TBD.",
      "approved_at": "2026-11-14T04:44:45.932240+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/REST-source-approval.md"
    },
    {
      "category": "restaurant",
      "slot": "06",
      "source_id": "REST-06",
      "model_group": "codex",
      "model_id": "gpt-6",
      "model_version": "",
      "subcategory": "pizzeria",
      "source_name": "Pizzeria Bianco",
      "source_url": "https://www.pizzeriabianco.com/",
      "verified_at": "2026-11-14T04:40:26.232400+00:00",
      "verification_method": "Live web search and web open/click text retrieval; potentially indexed/cached; no rendered browser",
      "verification_result": "verified",
      "evidence_reference": "pipelines/codex/research/REST.md#rest-06",
      "source_pages": "[{\"url\": \"https://www.pizzeriabianco.com/\", \"title\": \"Homepage\", \"local_file\": \"index.html\"}, {\"url\": \"https://www.pizzeriabianco.com/pizzeria-bianco-heritage-square\", \"title\": \"Heritage Square\", \"local_file\": \"heritage-square.html\"}, {\"url\": \"https://www.pizzeriabianco.com/pizzeria-bianco-town-country\", \"title\": \"Town & Country\", \"local_file\": \"town-country.html\"}, {\"url\": \"https://www.pizzeriabianco.com/los-angeles\", \"title\": \"Los Angeles\", \"local_file\": \"los-angeles.html\"}, {\"url\": \"https://www.pizzeriabianco.com/s/PHXPBMenu_Apr2023.pdf\", \"title\": \"Heritage Square linked menu PDF\", \"local_file\": \"heritage-menu.html\"}]",
      "key_regions": "[\"City/location navigation\", \"Homepage restaurant list\", \"Location heading and menu links\", \"Hours, directions and dining policies\", \"Location history and image groups\", \"Categorized menu document\"]",
      "key_interactions": "[{\"name\": \"Location navigation\", \"evidence\": \"observed\", \"notes\": \"Homepage and restaurant links inspected.\"}, {\"name\": \"Menu link\", \"evidence\": \"observed\", \"notes\": \"Heritage Square PDF text retrieved; propose semantic HTML adaptation with original fictional dishes.\"}, {\"name\": \"Reservation demonstration\", \"evidence\": \"inferred\", \"notes\": \"Town & Country text invites reservations but embedded fields unexposed; demonstrate handoff only.\"}, {\"name\": \"Image gallery\", \"evidence\": \"inferred\", \"notes\": \"Image groups present; gallery controls/transitions not verified.\"}]",
      "complexity": "medium",
      "stack_clues": "images.squarespace-cdn.com and static1.squarespace.com hosts; framework/version unknown",
      "limitations": "Heritage Square explicitly excludes reservations/takeout; do not add those flows there. Town & Country dinner JPG retrieval failed; omitted. Linked PDF filename dates to 2023: menu availability is verified, freshness is not. No live takeout/payment. No rendered/mobile/keyboard/form tests. Source and scope unapproved; exact generator TBD.",
      "approved_at": "2026-11-14T04:44:45.932240+00:00",
      "approved_by": "Samhith Varma",
      "approval_reference": "pipelines/codex/research/REST-source-approval.md"
    },
    {
      "category": "restaurant",
      "slot": "07",
      "source_id": "REST-07",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "fast-casual chain",
      "source_name": "Sweetgreen",
      "source_url": "https://www.sweetgreen.com/",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "stratum retained from the deleted pre-protocol batch; source not re-verified or re-approved under WEB-REPLICA-V1.0",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "08",
      "source_id": "REST-08",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "ethnic (Xi'an Chinese)",
      "source_name": "Xi'an Famous Foods",
      "source_url": "https://www.xianfoods.com/",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "stratum retained from the deleted pre-protocol batch; source not re-verified or re-approved under WEB-REPLICA-V1.0",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "09",
      "source_id": "REST-09",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "brewery (age gate)",
      "source_name": "Russian River Brewing",
      "source_url": "https://www.russianriverbrewing.com/",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "stratum retained from the deleted pre-protocol batch; source not re-verified or re-approved under WEB-REPLICA-V1.0",
      "approved_at": "",
      "approved_by": "",
      "approval_reference": ""
    },
    {
      "category": "restaurant",
      "slot": "10",
      "source_id": "REST-10",
      "model_group": "open-source",
      "model_id": "",
      "model_version": "",
      "subcategory": "cafe / bakery",
      "source_name": "Tartine Bakery",
      "source_url": "https://tartinebakery.com/",
      "verified_at": "",
      "verification_method": "",
      "verification_result": "",
      "evidence_reference": "",
      "source_pages": "",
      "key_regions": "",
      "key_interactions": "",
      "complexity": "",
      "stack_clues": "",
      "limitations": "stratum retained from the deleted pre-protocol batch; source not re-verified or re-approved under WEB-REPLICA-V1.0",
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
      "sha256": "81f3a5dc01cd370643ad84f39989a2625a03611ab5f5a34b10de5494d9e61a9b"
    },
    {
      "path": "pipelines/codex/config.json",
      "sha256": "48b347d83717a75bd622b0b5d2ba413dfc3db2450d765fe0067a691eb47a7106"
    },
    {
      "path": "pipelines/codex/categories.json",
      "sha256": "24e7955b43d30f2e988d94adc577d00c30f1e9895833ed388eadb09d75589482"
    },
    {
      "path": "pipelines/codex/prompts/build.md",
      "sha256": "37567f6a4198f7539b11964980cf814a7b8c0732f926dfe9aa6f86849dd2277c"
    },
    {
      "path": "metadata/source-inventories/restaurant.csv",
      "sha256": "1c63e545562d6b2402cf1f6aa3b603550e92d25630c21426143bc72bf7634738"
    },
    {
      "path": "metadata/assignments.csv",
      "sha256": "832281b186a5220df22b10cb581b1f3b64140e0287db6c1e0c7c294896cac7fa"
    }
  ],
  "prepared_at": "2026-11-14T05:07:13.604Z",
  "task_is_execution": false
}
```
