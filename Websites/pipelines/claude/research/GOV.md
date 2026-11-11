Three sources verified over HTTP on 2026-11-10: Boston.gov, NY.gov and EPA.gov. No files were written. The one temp dir I created was removed after use.

**Method for all three:** `curl -sSL --max-time 25 -A "Mozilla/5.0"`, then grep of `<title>`, `<a href>`, landmark tags and class names. Where a title carries `&amp;`, I kept the raw HTML form.

**Rejected candidates:**
- mass.gov returned 403 ("Not allowed | Mass Gov").
- noaa.gov returned 403 with a 919-byte body.
- Both were skipped.

I also tested seattle.gov, sandiego.gov, chicago.gov, nps.gov and usa.gov. All returned 200 and were not selected.

### GOV-01
- **source_id:** GOV-01
- **category/subcategory:** Public / Government – city/municipal government
- **source_name:** City of Boston (Boston.gov)
- **official_url:** https://www.boston.gov/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "Homepage | Boston.gov" and about 129 KB of HTML.
- **source_pages** (all 200 unless noted):
  1. https://www.boston.gov/ – Homepage | Boston.gov
  2. https://www.boston.gov/departments – Departments | Boston.gov
  3. https://www.boston.gov/departments/boston-311 – Boston 311 | Boston.gov
  4. https://www.boston.gov/departments/parking-clerk/how-get-resident-parking-permit – How to Get a Resident Parking Permit | Boston.gov
  5. https://www.boston.gov/city-boston-services-applications-and-permits – City of Boston Services, Applications, and Permits | Boston.gov
  6. https://www.boston.gov/events – Events | Boston.gov
  7. https://www.boston.gov/news – Latest City of Boston news | Boston.gov
  8. https://www.boston.gov/public-notices – Public notices | Boston.gov
  9. https://www.boston.gov/neighborhoods – Neighborhoods | Boston.gov
  10. https://www.boston.gov/departments/city-clerk – City Clerk | Boston.gov
  11. https://www.boston.gov/departments/city-council – City Council | Boston.gov
  12. https://www.boston.gov/form/website-feedback-form – Tell us what you think | Boston.gov
  13. https://www.boston.gov/departments/mayors-office/contact-boston-city-hall – Contact Boston City Hall | Boston.gov
  - Also 200: /departments/election ("Election"), /career-center ("Career Center"), /community-centers ("Community Centers"), /departments/mayors-office, /departments/parks-and-recreation/playgrounds-and-parks-boston.
  - https://www.boston.gov/guides is linked from the nav but returned 503 "Technical Difficulties" on two attempts. I excluded it.
  - /departments/311 returned a 404 page.
- **key_regions:**
  - **Header:** Skip link ("Skip to Main Content"), then a site-banner area with expandable items (`site-banner-expansion-item-content`, observed).
  - **Header utility and nav links:** Help / 311, Guides, Departments, Public Notices, Pay and apply, Business Support, Events, City of Boston News, View City Projects, Newsletters.
  - **Header tools:** A Translate link (`id="cob_translate" … translate-link`) and a search window titled "Boston.gov Search" with a "Choose a search type" control.
  - **Nav groups:** Two groups, rendered as `href="#"` triggers:
    - "Places": Cemeteries, Historic Districts, Libraries, Neighborhoods, Parks and playgrounds, Schools.
    - "Government": City Clerk, City Council, Elections, Boards and commissions, City government overview.
  - **Nav caveat:** The group labels and grouping come from link order. I did not confirm whether they are top-level or nested.
  - **Hero:** A hero-image paragraph component (`paragraphs-item-hero-image`).
  - **Body sections (h2):** a date heading ("Tuesday, November 10"), Featured resources, Latest news, Featured videos, Stay Connected, Upcoming Events, Boston Mayor Michelle Wu, Boston City Council.
  - **Footer:** A footer with a 311 block and a links list (`ft-ll-311`, `ft-ll-links`).
  - **Footer links:** Privacy Policy, Vulnerability Disclosure, Public records, Accessibility, Contact Us, Feedback, and the Mayor's Office and City Council contact pages.
  - **Landmarks:** 1 `<header>` plus a second `<header>` without attributes, 4 `<nav>`, 1 `<footer>`, 3 `<form>`, 12 `<button>`. There is no `<main>` tag in the home HTML.
- **key_interactions:**
  - **Observed:**
    - Skip link.
    - CSS checkbox toggles for the banner, burger menu and search (`#dr-banner`, `#brg-tr`, `#s-tr`).
    - Site search that can also run an "Ask" mode (the form has AI-search placeholders and `data-ai-button="Ask"`).
    - Translate link.
    - Website feedback form at `/form/website-feedback-form`.
    - Events listing and news listing.
    - Departments A–Z listing.
    - Public notices.
  - **Inferred:**
    - Mega-menu dropdown open/close behavior, from the `#` triggers.
    - The 311 report-a-problem flow, which is external and not fetched.
    - Calendar views, filters and pagination on events and news. I did not inspect them.
- **complexity:** Medium-high. The home page is dense: utility bar, mega-menu, AI/search overlay, banner, many card sections and a large footer. The interior templates (department, guide-style how-to, listing, form) are repeatable.
- **stack_clues:** `<meta name="generator" content="Drupal 10">`, `data-drupal-selector` and `drupal-link-system-path` attributes, a Google Tag script (`/modules/contrib/google_tag/js/gtag.js`), and `antibot` on forms. The pages are server-rendered.
- **limitations:**
  - Only the home page markup was inspected in detail.
  - `/guides` was down (503).
  - The inline SVG `<title>` "city_hall" appears alongside the page title and should be ignored.
  - Boston.gov uses the city's own logo and branding, so the replica should use a fictional emblem.

### GOV-02
- **source_id:** GOV-02
- **category/subcategory:** Public / Government – state government portal
- **source_name:** New York State (NY.gov)
- **official_url:** https://www.ny.gov/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "The Official Website of New York State" and about 100 KB of HTML.
- **source_pages** (all 200):
  1. https://www.ny.gov/ – The Official Website of New York State
  2. https://www.ny.gov/services-and-benefits – Services &amp; Benefits | The State of New York
  3. https://www.ny.gov/services/renew-vehicle-registration – Renew a Vehicle Registration Online | The State of New York
  4. https://www.ny.gov/services/apply-snap – Apply or Recertify for SNAP | The State of New York
  5. https://www.ny.gov/state-agencies-and-departments – State Agencies and Departments | The State of New York
  6. https://www.ny.gov/counties – Counties | The State of New York
  7. https://www.ny.gov/taxes – Taxes | The State of New York
  8. https://www.ny.gov/start-business – Start a Business | The State of New York
  9. https://www.ny.gov/events – Events | The State of New York
  10. https://www.ny.gov/government – New York State Government | The State of New York
  11. https://www.ny.gov/visit-and-explore – Visit &amp; Explore | The State of New York
  12. https://www.ny.gov/elections-and-voting – Elections and Voting | The State of New York
  13. https://www.ny.gov/accessibility – Accessibility | The State of New York
  14. https://es.ny.gov/homepage – El sitio web oficial del estado de Nueva York (Spanish variant)
  - Also 200: /privacy-policy.
- **key_regions:**
  - **Header:** Government-site trust banner with "Official websites use ny.gov" and "Secure ny.gov websites use HTTPS".
  - **Header tools:** A "Log in to NY.gov ID" link, a language switcher, and a search form (`action="/search"`, `role="search"`, input `searchstax[query]`, "Clear search input" button).
  - **Language selector:** A translate block with 14 `translate__link` items. Three were read: English (`ny.gov/homepage`), Español (`es.ny.gov/homepage`), 中文 (`zh.ny.gov/homepage`).
  - **Mega-menu:** Titled "Main Menu" (screen-reader only), with four submenus:
    - Services & Benefits: Assistance Programs and Benefits, Driving and Vehicles, Education, Environment and Energy, Family and Children, Health, Housing and Property, Licenses and Permits, Personal Records, Prison and Incarceration, Public Safety and Emergencies, Taxes, Veterans.
    - Work & Business: Business Assistance, Business Taxes, Jobs and Career Support, Start a Business, State Employees, Unemployment, Workers' Rights and Safety.
    - Visit & Explore: Arts and Culture, Historic Sites, Parks and Recreation.
    - Your Government: Counties, Elections and Voting, News, State Agencies and Departments, State Government, State Holidays.
  - **Body sections:** "Popular Topics" chips; quick-service links (apply for SNAP, unemployment assistance, pay a traffic violation, renew vehicle registration, find health insurance, heating assistance); "Helpful Guides and Resources" cards (heating assistance/HEAP, utility-bill discounts, phone-free schools); "Discover New York" with Visit New York and the foliage report.
  - **Alert strip:** Emergency links in the footer area: NYC 311, State Jobs, Local Alerts (333111), 511 NY, 988 Lifeline, Amber Alert, NY-Alert, OASAS HOPEline.
  - **Footer:** A "Frequently Visited" menu (`footerMenu-title`) plus Accessibility, Disclaimer, Privacy Policy, Events, Mobile Apps, social links (Instagram, X) and a "Site Credits" label.
  - **Landmarks:** 2 `<header>`, 2 `<nav>`, 1 `<main>`, 1 `<footer>`, 2 `<aside>`, 2 `<form>`.
- **key_interactions:**
  - **Observed:**
    - Mega-menu with four submenu titles.
    - Search form (GET to `/search`).
    - Language links to subdomains.
    - Service detail pages with an "On this page" anchor list (seen on the vehicle-registration page).
    - Agencies directory page.
    - Counties page.
    - Events page.
  - **Inferred:**
    - Menu open/close and chip filtering behavior.
    - Agency or county search and filter on the directory pages. I saw no extra inputs in the markup of those pages, only the global search.
- **complexity:** Medium. The mega-menu has about 30 links and the home page has a few card sections. Interior pages are largely text and link lists, which are easy to template.
- **stack_clues:** `Drupal` string present in the markup. Tailwind-style utility classes (`translate-y-1/2`, `text-[28px]`, `mt-[10px]`) and BEM-style classes (`nygov-megamenu__submenu_title`, `o-chips__title`, `a-card__label`). Google Tag Manager references (`gtag`). SearchStax is the search backend, from the `searchstax[...]` field names.
- **limitations:**
  - Menu markup was read as flattened anchors, so the exact submenu-to-link grouping beyond the submenu titles is partly inferred from link order.
  - I did not inspect the events filtering controls, the directory UI or the individual language pages beyond one title.
  - The "Official website" trust banner and NY branding must be replaced with a fictional emblem.

### GOV-03
- **source_id:** GOV-03
- **category/subcategory:** Public / Government – federal agency
- **source_name:** U.S. Environmental Protection Agency (EPA.gov)
- **official_url:** https://www.epa.gov/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "U.S. Environmental Protection Agency | US EPA" and about 65 KB of HTML.
- **source_pages** (all 200):
  1. https://www.epa.gov/ – U.S. Environmental Protection Agency | US EPA
  2. https://www.epa.gov/environmental-topics – Environmental Topics | US EPA
  3. https://www.epa.gov/environmental-topics/water-topics – Water Topics | US EPA
  4. https://www.epa.gov/ground-water-and-drinking-water – Ground Water and Drinking Water | US EPA
  5. https://www.epa.gov/radon – Radon | US EPA
  6. https://www.epa.gov/topics-epa-web – A - Z Topic Index | US EPA
  7. https://www.epa.gov/laws-regulations – Laws &amp; Regulations | US EPA
  8. https://www.epa.gov/report-violation – Report a Violation | US EPA
  9. https://www.epa.gov/aboutepa – About EPA | US EPA
  10. https://www.epa.gov/aboutepa/regional-and-geographic-offices – Regional and Geographic Offices | US EPA
  11. https://www.epa.gov/newsroom – Newsroom | US EPA
  12. https://www.epa.gov/alerts – Currently Active Alerts | US EPA
  13. https://www.epa.gov/home/forms/contact-epa – Contact EPA | US EPA
  14. https://www.epa.gov/accessibility/epa-accessibility-statement – EPA Accessibility Statement | US EPA
  - Excluded: /newsreleases/search returned HTTP 202 with no title.
- **key_regions:**
  - **Header:** Skip link ("Skip to main content"), a USWDS-style government banner (`usa-banner`, 14 occurrences), and an alert link ("click here to see any active alerts", `/alerts`; `site-alert` classes present).
  - **Header tools:** Logo link (`aria-label="Home"`), an "Open search drawer" button, and a search form (`usa-search usa-search--epa`, GET to `https://search.epa.gov/epasearch`).
  - **Primary navigation** (`aria-label="Primary navigation"`), with four menus:
    - Environmental Topics: Air, Bed Bugs, Chemicals/Toxics/Pest…, Emergency Response, Environmental Information by Location, Health, Land/Waste/Cleanup, Lead, Mold, Radon, Research, Science Topics, Water Topics, A-Z Topic Index.
    - Laws & Regulations: By Business Sector, By Topic, Compliance, Enforcement, Guidance, Laws and Executive Orders, Regulations, Report a Violation (with Environmental Violations and Fraud/Waste/Abuse links).
    - About EPA: Our Mission and What We Do, Headquarters Offices, Regional Offices, Labs and Research Centers, Newsroom, Planning/Budget/Results, Organization Chart, History.
    - A fourth menu not read for items (inferred to be Newsroom or a similar top-level link).
  - **Body sections:** Four news feature cards (careers, grants webinars, drinking water resources, news releases), a news releases list with "Search all news releases", and "Discover. Connect. Ask. Follow." blocks.
  - **Language block:** Spanish (`espanol.epa.gov`) and `/lep/…` pages for Arabic, Chinese (simplified and traditional), French, Haitian Creole, Korean, Portuguese, Russian, Tagalog and Vietnamese.
  - **Footer:** Accessibility Statement, Budget & Performance, Contracting, Grants, No FEAR Act Data, Plain Writing, Privacy and Security Notice, Data, Inspector General, Jobs, Newsroom, Regulations.gov, USA.gov, White House, Contact EPA, EPA Disclaimers, Hotlines, FOIA Requests, Frequent Questions, "Site Feedback", plus social links (Facebook, Flickr, Instagram, X, YouTube) and a "Back to top" button.
  - **Landmarks:** Counts not captured for EPA.
- **key_interactions:**
  - **Observed:**
    - Skip link.
    - Search drawer.
    - Government banner (`usa-banner`, expandable "How you know" is inferred from the USWDS pattern).
    - Alerts page.
    - Topic landing pages.
    - A–Z index.
    - Regional offices listing.
    - Contact form page at `/home/forms/contact-epa`.
    - Language links.
  - **Inferred:**
    - Dropdown behavior of primary nav.
    - Regional office selection or map, and the news release search and filter UI (the search URL returned 202).
- **complexity:** Medium. The page types are consistent: topic hub, listing, form, alert. The navigation has deep, wide menus and many footer links.
- **stack_clues:** Drupal (`data-drupal-link-system-path` appears 34 times, `data-drupal-messages-fallback`). USWDS classes (`usa-banner`, `usa-alert`, `usa-search`). `googletagmanager` referenced twice. Server-rendered HTML.
- **limitations:**
  - Menu item lists come from flattened link extraction. The fourth primary menu was not read, and grouping is inferred from link order.
  - EPA's seal and logo must be replaced with a fictional emblem.
  - The news search endpoint returned 202, so I did not verify its behavior.
  - Page content is untrusted data. I recorded only titles, link text and structural markers.


Skipped or not checked: JS-driven behavior, since this was HTTP-only, and any pages beyond the ones listed. Real government logos and seals are in use on all three sites, so the replicas must substitute fictional emblems.
