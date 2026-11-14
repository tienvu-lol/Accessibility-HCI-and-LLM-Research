# REST — Phase A restaurant source research (Claude slots 01–03)

**Group:** claude · **Slots:** REST-01, REST-02, REST-03 · **Date:** 2026-11-14
**Status:** researched and verified; **NOT approved**. `Rules.md` section 3 blocks every build in
round 11 until the project lead approves the table at the end of this file.

## Method and limitations

Every request was an HTTP GET issued by the orchestrator with
`user-agent: Mozilla/5.0 (compatible; accessibility-research-replica-study/1.0)`, a 25s timeout and
redirects followed. `robots.txt` was read for user-agent `*` before fetching each origin and
permitted every path fetched below. **No browser rendering, no JavaScript execution, no web search
tool.** Raw HTML only. Full request records — status, final URL, content type, byte count, title, robots decision and
extracted links — are in `pipelines/claude/research/evidence/REST-http-2026-11-14.json`: **38 request records over 34 unique URLs**, in three passes (page discovery; structure and off-host links; interior pages found via the second pass). The homepages and
Franklin's menu page were fetched twice, in passes 1 and 2, and both records are kept.

**Who performed this research.** The other ten categories' Claude research was produced by
`claude-sonnet-5-5` worker agents through pi-subagents. That runtime was unavailable here, so this
category's Phase A was performed directly by the orchestrator session (`claude-opus-5`). Same model
group, different agent and model. It is recorded here and in the change log so the difference is not
mistaken for worker output.

**Source selection.** These are the same three references the deleted pre-protocol batch used for
these strata, re-verified from scratch. Codex took the same approach for its three slots. No
reference held by another group was considered: claude slots must avoid Codex's approved
`crossroadskitchen.com`, `hogsalt.com` and `pizzeriabianco.com`, and the four URLs still recorded
against open-source slots 07–10.

**One cross-cutting finding, flagged before the table.** All three sources are **Squarespace** sites,
and all three delegate reservations, ordering and commerce to third parties (Resy, Toast,
order.online, Goldbelly, BinWise). The Claude third of this category therefore has low platform
diversity, and in every case the booking flow is off-site — so `reservations` can only ever be a
labeled simulation in these replicas, which matches the category's `simulation_notes` but should be a
conscious choice rather than a surprise at build time.

---

### REST-01
- **source_id:** REST-01
- **category/subcategory:** Restaurant & Food Service / small local independent
- **source_name:** Via Carota
- **official_url:** https://www.viacarota.com/
- **verified_at:** 2026-11-14, HTTP GET (no browser rendering). The home page returned 200 with
  title "Via Carota". Nine further `www.viacarota.com` pages returned 200 with the titles below.
  `robots.txt` was read and matched no disallow rule for any path fetched.
- **source_pages:**
  1. https://www.viacarota.com/ — Via Carota
  2. https://www.viacarota.com/text — Plain Text Menu — Via Carota
  3. https://www.viacarota.com/press — Via Carota press reviews — Via Carota
  4. https://www.viacarota.com/gatherings — Gatherings — Via Carota
  5. https://www.viacarota.com/shop — Shop — Via Carota
  6. https://www.viacarota.com/craft-cocktails — Craft Cocktails — Via Carota
  7. https://www.viacarota.com/ritaandjody — Rita Sodi & Jody Williams — Via Carota
  8. https://www.viacarota.com/community — Via Carota Community — Via Carota
  9. https://www.viacarota.com/cart — Via Carota
  10. https://www.viacarota.com/pomeriggio-1/&lt;hash&gt; — Via Carota food gallery (two distinct
      hashed URLs returned byte-identical 134,671-byte responses; the gallery is one template)
  - `https://www.viacarota.com/search` returned **no status at all** (request error, not an HTTP
    code), although a `GET /search` form exists in the header.
- **key_regions (observed in HTML):**
  - **Header:** 6 `<nav>` elements. Primary nav anchor text: Gatherings, Shop, Craft Cocktails,
    Rita & Jody, Cart. A search form (`action=/search`, `method=get`).
  - **Home h1s:** "VIA CAROTA MENU", "VIA CAROTA", "IT TAKEs A VILLAGE" (capitalisation as served).
  - **Home h2s:** "INDIRIZZO" (address), "ORARI" (hours), "STAY IN TOUCH" (newsletter).
  - **Home h3s:** "A plain-text version of the Via Carota menu is available here.";
    "51 Grove Street, New York City"; "Lunedi al Giovedi • 11:00am—11:00pm";
    "Venerdi, Sabato e Domenica • 10:00am—11:00pm"; "Walk-ins always welcome.";
    "COMMENTS & QUESTIONS ARE WELCOME Please email us at ciao@viacarota.com".
  - **Menu presentation — the most useful finding for this slot.** The homepage menu is presented as
    an image, and the site offers a separate **plain-text menu** at `/text` ("Plain-Text Menu") whose
    headings are real text: SPUNTINI, BRUSCHETTA, ANTIPASTI, VERDURE, Pasta, PESCE, CARNE, SPeCIALS,
    Lista del vini, with h3 subsections Spumanti, Bianci, Rossi, Aperitivi, Cocktails. This is a
    text alternative to an image menu — directly relevant to the study's accessibility focus and
    worth replicating as a pattern, not just a page.
  - **Footer:** newsletter form (POST, email input), Accessibility, Privacy, Careers; sister
    restaurants i Sodi, Buvette, Bar Pisellino, The Commerce Inn; a James Beard link.
  - 58 `<img>`, 4 `<button>`, 2 forms, 2 inputs (text, email).
- **key_interactions:**
  - Site search form, `GET /search` with a text input — but `/search` itself failed to respond.
  - Newsletter subscribe (POST, email).
  - Cart at `/cart` (Squarespace commerce for the shop).
  - **Reservations are off-site:** the HTML contains `<!-- Begin Resy Widget Footer Injection -->`
    and a link to `https://resy.com/cities/new-york-ny/venues/via-carota`. There is no on-site
    booking form.
  - **Ordering is off-site:** `https://order.online/store/995599`.
  - Image gallery under `/pomeriggio-1/<hash>`.
- **complexity:** Low–medium. A shallow, image-heavy single-location site. Few interior pages, no
  filtering, no on-site booking. The hours/address blocks and the dual image/plain-text menu are the
  interesting structures.
- **stack_clues:** Squarespace (`static1.squarespace.com`, `images.squarespace-cdn.com`,
  `definitions.sqspcdn.com` component stylesheets, `sqs-announcement-bar-*` classes), Adobe Typekit
  (`use.typekit.net`, `p.typekit.net`), Resy widget injection, order.online for takeout.
- **limitations:**
  - Raw HTML only; the rendered nav may differ, as Squarespace injects markup client-side.
  - `/search` could not be verified — it returned no HTTP status.
  - The menu's dish content is in an image on the homepage; only `/text` exposes it as text.
  - A nav link labelled **"Careers" points to `/covid-19-safety-measures`** — a source defect,
    carried as-is into the fidelity notes rather than silently corrected.

### REST-02
- **source_id:** REST-02
- **category/subcategory:** Restaurant & Food Service / BBQ / smokehouse
- **source_name:** Franklin Barbecue
- **official_url:** https://franklinbbq.com/
- **verified_at:** 2026-11-14, HTTP GET (no browser rendering). The home page returned 200 with
  title "Franklin Barbecue | Discover, Savor, Enjoy - Order Now". Eight further pages returned 200;
  one nav target returned **404**, recorded below. `robots.txt` matched no disallow rule.
- **source_pages:**
  1. https://franklinbbq.com/ — Franklin Barbecue | Discover, Savor, Enjoy - Order Now
  2. https://franklinbbq.com/menu — Menu | Order Now for Fresh BBQ — Franklin Barbecue
  3. https://franklinbbq.com/visitus — Catering & Events | Enjoy, Celebrate, Book Now — Franklin Barbecue
  4. https://franklinbbq.com/about — About | Experience Better BBQ Today — Franklin Barbecue
  5. https://franklinbbq.com/private-events01 — Catering & Events | Enjoy, Celebrate, Book Now — Franklin Barbecue
  6. https://franklinbbq.com/private-party-franklin-backyard — Private Party at Franklin Backyard — Franklin Barbecue
  7. https://franklinbbq.com/gift-cards — Gift Cards | Elevate Your Grill Game - Shop Now — Franklin Barbecue
  8. https://franklinbbq.com/sauces-rubs — Sauces & Rubs | Enhance Your Grilling Today — Franklin Barbecue
  9. https://franklinbbq.com/contact — Contact | Reach Out Today — Franklin Barbecue — Franklin Barbecue
  - `https://franklinbbq.com/private-events` returned **404** ("404 | Explore Smoky Barbecue – Order
    Today") even though the primary nav links to it with the text "Private Events". The working page
    is `/private-events01`.
- **key_regions (observed in HTML):**
  - **Header:** 4 `<nav>` elements. Primary nav anchor text: Visit Us, Menu, Sauces & Rubs, About,
    Gift Cards, "Folder: Ship", Private Events, Contact, cart count.
  - **Announcement bar:** a holiday-booking message (`sqs-announcement-bar-text-inner`).
  - **Home h1s:** "“SERVING THE BEST BARBECUE IN THE KNOWN UNIVERSE.”", "Planning to visit?".
  - **Home h2s:** "New Venue Space", "HOLIDAY HOURS", "Visit our sister restaurant - Uptown",
    "Buy an e-Gift Card today!", "Get the Latest".
  - **Home h3s:** "Our location", "Our Hours".
  - **Menu page:** h1 "menu"; h3 "We're open for lunch Tuesday - Sunday, 11 am until sold out
    (about 3 pm). closed Monday." and "Can't wait in line? Check out our preordering system to order
    takeout in advance." Only 4 `<img>` and no form on this page.
  - 46 `<img>`, 10 `<button>`, 1 form, 1 input (email) on the home page.
- **key_interactions:**
  - Newsletter subscribe (POST, email) — "Get the Latest".
  - Cart (`/cart`) and Squarespace commerce for sauces, rubs and merchandise.
  - **Pre-ordering is off-site:** `preorder.franklinbbq.com`. **Shop is off-site:**
    `shop.franklinbbq.com`. **Gift cards are off-site:** `www.toasttab.com/franklinbbq/giftcards`.
    Nationwide shipping via `goldbelly.com/franklin-barbecue`.
  - Catering / private-event enquiry routed through the `/private-events01` and
    `/private-party-franklin-backyard` pages.
  - Social: Instagram, Facebook, `youtube.com/bbqwithfranklin`.
- **complexity:** Medium. The richest of the three in raw HTML: a real on-site menu page, an
  announcement bar, hours and location blocks, several commerce-adjacent pages, and the most
  server-rendered headings.
- **stack_clues:** Squarespace (`static1.squarespace.com`, versioned site CSS,
  `definitions.sqspcdn.com` components, `hide-opentable-icons` / `opentable-style-dark` theme
  classes), Typekit, Toast for gift cards, a separate Shopify-style `shop.` subdomain, Goldbelly.
- **limitations:**
  - Raw HTML only; the rendered nav may differ.
  - **`/private-events` is a broken nav target (404).** Under the round-11 navigation convention the
    replica links only pages it actually builds, so this becomes a pruned link, and the defect is
    recorded in `fidelity-notes.md` rather than reproduced.
  - `/visitus` and `/private-events01` serve the **same `<title>`**, so titles alone do not identify
    the page; the replica must give each page a distinct title.
  - Menu dish content appears to be image-led — only 4 images and no text list of items was visible
    in raw HTML beyond the hours and preorder notes.

### REST-03
- **source_id:** REST-03
- **category/subcategory:** Restaurant & Food Service / fine dining
- **source_name:** Eleven Madison Park
- **official_url:** https://www.elevenmadisonpark.com/
- **verified_at:** 2026-11-14, HTTP GET (no browser rendering). The home page returned 200 with
  title "Eleven Madison Park". Eleven further pages returned 200 with the titles below.
  `robots.txt` matched no disallow rule.
- **source_pages:**
  1. https://www.elevenmadisonpark.com/ — Eleven Madison Park
  2. https://www.elevenmadisonpark.com/ourrestaurant — About — Eleven Madison Park
  3. https://www.elevenmadisonpark.com/about — About — Eleven Madison Park
  4. https://www.elevenmadisonpark.com/team — Team — Eleven Madison Park
  5. https://www.elevenmadisonpark.com/events — Events — Eleven Madison Park
  6. https://www.elevenmadisonpark.com/stories — Stories — Eleven Madison Park
  7. https://www.elevenmadisonpark.com/magic-farms — Magic Farms — Eleven Madison Park
  8. https://www.elevenmadisonpark.com/faq — FAQs — Eleven Madison Park
  9. https://www.elevenmadisonpark.com/press-and-accolades — Press and Accolades — Eleven Madison Park
  10. https://www.elevenmadisonpark.com/careers — Careers — Eleven Madison Park
  11. https://www.elevenmadisonpark.com/giftcards — Gift Cards — Eleven Madison Park
  12. https://www.elevenmadisonpark.com/contact — Contact — Eleven Madison Park
  - `/about` and `/ourrestaurant` returned **byte-identical 296,093-byte responses** with the same
    title. They are two routes onto one page.
- **key_regions (observed in HTML):**
  - **This source returned no `h1`, `h2` or `h3` elements at all in raw HTML.** Its page content is
    rendered client-side. What follows is therefore link, form and control structure only — the
    section hierarchy of this site is **not** established by this research.
  - **Header/nav:** 3 `<nav>` elements. Anchor text: About Us (`/ourrestaurant`), Team, Magic Farms,
    Events, Stories, Gift Cards, "Folder: About", "Folder: Shop", cart count, FAQs,
    Press & Accolades, Careers, Contact Us, Accessibility Statement.
  - 43 `<img>`, **28 `<button>`**, 1 form, 3 inputs (`given-name`, `surname`, `email`) — a
    first/last-name newsletter signup.
  - The site publishes an **Accessibility Statement** page (`/accessibility-statement`).
- **key_interactions:**
  - Newsletter subscribe (POST; given-name, surname, email).
  - 28 buttons in raw markup imply substantial client-side interaction that this method cannot
    characterise.
  - **Reservations are off-site:** `https://resy.com/cities/new-york-ny/venues/eleven-madison-park`.
    No on-site booking form.
  - **Wine list is an external PDF:** `hub.binwise.com/print/WineList_PDF.aspx`.
  - Related properties: `elevenmadisonhome.com`, `wineclub.elevenmadisonhome.com`,
    `clementebar.com`.
- **complexity:** Unresolved by this method, and that is itself the finding. The URL surface is the
  widest of the three (12 verified pages), but with zero server-rendered headings the structural
  depth cannot be judged from raw HTML. Treat complexity as **unknown**, not low.
- **stack_clues:** Squarespace (`static1.squarespace.com` versioned CSS, `definitions.sqspcdn.com`
  components, `file.squarespace-cdn.com`), Typekit, Resy for booking, BinWise for the wine list.
- **limitations:**
  - **Most significant:** no headings in raw HTML, so page structure, section order and copy
    hierarchy are unknown. A replica built from this evidence alone would be inventing structure.
    Either accept that and label it inferred under `Rules.md` section 5, or render the page before
    building.
  - No menu page exists on the site in raw HTML; fine-dining menus here are not a browsable page.
  - `/about` and `/ourrestaurant` duplicate one page — the replica should pick one route.
  - Raw HTML only; the rendered nav may differ.

---

## Approval table — awaiting project lead

| Slot | Stratum | Proposed reference | Verified | Pages 200 | Complexity | Blocking limitation |
|---|---|---|---|---|---|---|
| REST-01 | small local independent | https://www.viacarota.com/ | 2026-11-14, HTTP 200 | 10 | low–medium | `/search` returned no status; menu is an image plus a `/text` alternative |
| REST-02 | BBQ / smokehouse | https://franklinbbq.com/ | 2026-11-14, HTTP 200 | 9 | medium | nav link `/private-events` is a 404; two pages share one title |
| REST-03 | fine dining | https://www.elevenmadisonpark.com/ | 2026-11-14, HTTP 200 | 12 | unknown | **no server-rendered headings at all**; structure not established |

**No cell above is an approval.** `approved_at`, `approved_by` and `approval_reference` are empty in
`metadata/source-inventories/restaurant.csv` for slots 01–03, and the 2026-11-13 Phase A waiver and
approval record cover the ten original categories only — not restaurant.

**What approval would need to decide, beyond yes/no:**

1. **REST-03's missing structure.** Approving it as-is means its replica's page hierarchy is largely
   inferred, which weakens it as a fidelity baseline. The alternatives are to render the page first,
   or to substitute a fine-dining reference that serves real HTML.
2. **Platform monoculture.** All three are Squarespace. If platform diversity matters to the study,
   one of these should be swapped for a differently built site.
3. **Reservations are off-site on all three.** Every booking flow in these replicas will be a
   labeled simulation. That is protocol-compliant, but it means this category's Claude third
   exercises no real on-site booking form.
