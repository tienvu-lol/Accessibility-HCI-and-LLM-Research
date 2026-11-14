# GOV — Claude Phase A source research

Date of verification: 2026-11-12. Method for all pages: HTTP GET via curl (`curl -sSL --max-time 25 -A "Mozilla/5.0"`), reading the HTTP status and `<title>`, then grepping the home HTML for links. Everything marked "observed" below comes from those responses. I did not render JavaScript, take screenshots or test interactions, so any interaction not read in the HTML is marked "inferred". Page content was treated as data only.

Candidates checked and not chosen: seattle.gov, austintexas.gov, nyc.gov, ca.gov and nasa.gov all returned 200 but were not examined further. cdc.gov and usgs.gov returned 403 to curl, so they were rejected.

### GOV-01
- source_id: GOV-01
- category/subcategory: government / city-municipal
- source_name: City of Boise, Idaho
- official_url: https://www.cityofboise.org/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200 with title "City of Boise". All 12 interior pages below returned 200 with the titles shown.
- source_pages:
  1. https://www.cityofboise.org/ — "City of Boise"
  2. https://www.cityofboise.org/residents/ — "Residents | City of Boise"
  3. https://www.cityofboise.org/visitors/ — "Visitors | City of Boise"
  4. https://www.cityofboise.org/business/ — "Business | City of Boise"
  5. https://www.cityofboise.org/government/ — "Government | City of Boise"
  6. https://www.cityofboise.org/departments-programs/ — "Departments & Programs | City of Boise"
  7. https://www.cityofboise.org/residents/trash-and-recycling/ — "Trash and Recycling | City of Boise" (service how-to page)
  8. https://www.cityofboise.org/departments/finance-and-administration/city-clerk/public-meetings/ — "Public Meetings | City of Boise" (meetings and agendas)
  9. https://www.cityofboise.org/government/report-an-issue-or-file-a-complaint/ — "File a Complaint or Report an Issue | City of Boise" (report-a-problem)
  10. https://www.cityofboise.org/departments/mayor/ — "Mayor | City of Boise" (department page)
  11. https://www.cityofboise.org/departments/city-council/ — "City Council | City of Boise"
  12. https://www.cityofboise.org/business/permits/ — "Permits | City of Boise"
  13. https://www.cityofboise.org/government/boards-and-commissions/ — "Boards and Commissions | City of Boise"
- key_regions (observed from the home-page link list):
  - Header and alert: an alert line at the top (the text read "A nationwide Microsoft outage is impact…"). Four audience tabs follow: Residents, Visitors, Business, Government. Departments & Programs is also linked. Each audience tab has a "See All" link, which suggests dropdown or mega-menu panels (inferred from the repeated link groups).
  - Dropdown items observed:
    - Residents: Pay, Trash and Recycling, Parking Services, E-Newsletter.
    - Visitors: Recreation, Parking and Transportation, Arts and Culture, Tourism.
    - Business: Permits, Building and Planning, Bids and Purchasing, Licensing.
    - Government: Mayor, City Council, Boards and Commissions, Report an Issue.
  - Hero and quick links: Utility Billing Services, Jobs, Parking Tickets, Building Permits, Keep Boise Cool, Public Meetings, E-Motos, Pulse Point.
  - Footer: a `<footer>` element is present, with a "Get Directions" Google Maps link to 150 N Capitol Blvd.
- key_interactions:
  - Observed: Google Translate markup appears in the HTML ("google_translate" and "translate" strings), so there is a language selector. Building Permits has a link with `?category=all&search=all` query parameters. There is a public-meetings page and a report-an-issue page.
  - Inferred: search box, hover or click dropdowns, filterable permits list, and a report-an-issue form.
- complexity: medium. It has 4 audience sections, many department pages, and meetings, permits and report pages, but the layout is server-rendered with conventional page templates.
- stack_clues: the HTML contains the string "umbraco" (probably an Umbraco CMS); Google Translate widget; server-rendered pages. No Server header was captured.
- limitations: I did not inspect the page-level structure (heading hierarchy, ARIA, forms). The alert banner text is time-sensitive and was truncated by the grep, and the live site is likely to differ at build time. I did not check the footer's link groups. I did not verify whether the Public Meetings page embeds a third-party calendar or agenda system.

### GOV-02
- source_id: GOV-02
- category/subcategory: government / state-portal
- source_name: Texas.gov (the Official Website of the State of Texas)
- official_url: https://www.texas.gov/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200 with title "The Official Website of the State of Texas | Texas.gov". All 10 interior pages below returned 200 with the titles shown.
- source_pages:
  1. https://www.texas.gov/ — "The Official Website of the State of Texas | Texas.gov"
  2. https://www.texas.gov/search — "Search | Texas.gov"
  3. https://www.texas.gov/government-information/services — "Government Services Directory | Texas.gov" (services directory)
  4. https://www.texas.gov/government-information/agencies — "State Agencies Directory | Texas.gov" (department directory)
  5. https://www.texas.gov/licenses-ids-vehicles — "Texas Licenses, IDs, and Vehicles | Texas.gov"
  6. https://www.texas.gov/licenses-ids-vehicles/driver-licenses-ids-records — "Texas Driver Licenses, IDs, and Records | Texas.gov" (service detail)
  7. https://www.texas.gov/family-support-services — "Texas Family and Support Services | Texas.gov"
  8. https://www.texas.gov/business-taxes/business-support/starting-a-business — "Starting a Business in Texas | Texas.gov" (how-to)
  9. https://www.texas.gov/help-support/frequently-asked-questions/ — "Frequently Asked Questions | Texas.gov"
  10. https://www.texas.gov/family-support-services/accessibility-resources-and-support — "Accessibility Resources and Support | Texas.gov"
  11. https://www.texas.gov/sitemap — "Sitemap | Texas.gov"
  12. https://www.texas.gov/about — "About Texas.gov | Texas.gov"
- key_regions (observed from the home-page link list):
  - Header: a government-site banner (`usa-banner`, appears 8 times in the HTML), a Search link, and a "Sign in to TxT" button (Texas by Texas account, an external site).
  - Top-level categories, each with an "Explore …" link:
    - Licenses, IDs & Vehicles: Driver Licenses, IDs & Records; Vehicle Registration; Handgun Licenses; Hunting & Fishing Licenses.
    - Business & Taxes: Business Support; Starting a Business; Taxes.
    - Family & Support Services: Birth, Marriage & Death Records; Disaster & Emergency Assistance; Education & Child Care; Food Assistance; Health; Housing; Jobs; Moving to Texas; Public Safety; Veteran Support; Accessibility Resources.
    - Government Information: About Texas, Services Directory, State Agencies Directory, Local Government Resources, Open Data Portal, Voting & Elections.
    - Recreation & Travel: History & Culture; Parks & the Outdoors.
  - Hero: a search area with suggested queries (Renew driver license, Register vehicle, Voter info, Property tax info). The links point to `/search?q=…&type=ai`.
  - Promo blocks: Texas by Texas (TxT), Property Tax Transparency, TREO (the Texas Regulatory Efficiency Office).
  - Footer: About Texas.gov, Site Policies, AI Notice, Sitemap, Help and Support, FAQ, Provide Feedback, plus external state links (Veterans Portal, Open Data, Records Locator, Homeland Security, SAO Fraud Hotline).
- key_interactions:
  - Observed: a search page with suggested queries; a services directory that takes a `?category=86` filter; an agencies directory; translate markup (7 matches of "translate", which suggests a language option but I did not confirm a selector); a FAQ page.
  - Inferred: search autocomplete and directory filtering. I did not confirm an AI-assisted search, although `type=ai` and the "AI Notice" page suggest one. No meetings calendar was seen.
- complexity: medium to high. It has 5 category hubs, a services directory with categories, an agencies directory, search, and FAQ and accessibility pages. The layout is regular.
- stack_clues: the HTML contains "drupal" (42 matches) and "acquia" (one link points to an Acquia host), so Drupal on Acquia. The USWDS banner class (`usa-banner`) is present.
- limitations: there is no meetings calendar or alert banner (none observed). One footer link points to a staging hostname (texasgovportalstage.prod.acquia-sites.com), which I did not follow. Most transactional services are on external agency sites, so replication should be limited to texas.gov pages. I did not test search results.

### GOV-03
- source_id: GOV-03
- category/subcategory: government / federal-agency
- source_name: National Park Service (NPS.gov)
- official_url: https://www.nps.gov/
- verified_at: 2026-11-12, HTTP GET via curl. The home page redirected to /index.htm and returned 200 with title "NPS.gov Homepage (U.S. National Park Service)". 9 of the 10 interior URLs I tried returned 200; the exception is noted below.
- source_pages:
  1. https://www.nps.gov/index.htm — "NPS.gov Homepage (U.S. National Park Service)"
  2. https://www.nps.gov/findapark/index.htm — "Find a Park (U.S. National Park Service)" (directory)
  3. https://www.nps.gov/planyourvisit/index.htm — "Plan Your Visit (U.S. National Park Service)"
  4. https://www.nps.gov/learnandexplore/index.htm — "Learn & Explore (U.S. National Park Service)"
  5. https://www.nps.gov/getinvolved/index.htm — "Get Involved (U.S. National Park Service)"
  6. https://www.nps.gov/aboutus/index.htm — "What We Do (U.S. National Park Service)"
  7. https://www.nps.gov/yell/index.htm — "Yellowstone National Park (U.S. National Park Service)" (park home)
  8. https://www.nps.gov/yell/planyourvisit/index.htm — "Plan Your Visit - Yellowstone National Park (U.S. National Park Service)" (how-to / detail)
  9. https://www.nps.gov/subjects/bears/index.htm — "Bears (U.S. National Park Service)" (topic page)
  10. https://www.nps.gov/aboutus/news/index.htm — "News (U.S. National Park Service)"
- key_regions (observed):
  - Header: a USWDS government banner (`usa-banner`, 13 matches), then `<nav id="GlobalNav" class="GlobalNav usaGlobalNav">`.
  - Hero: two hero navigation blocks. One is labelled "Find a Park" (link /findapark/index.htm), the other is a topic navigation. The home page links to Yellowstone.
  - Body: a very large "explore by topic" link set under /subjects/ (animals, geology and natural features, history and culture, and similar groups, such as Bats, Bears, Birds, Glaciers, Volcanoes and Battlefields).
  - Footer: `<footer id="GlobalFooter" class="usa-footer">` and a `usa-identifier` section with required links.
- key_interactions:
  - Observed: a Find a Park page; a search page at /search/ that returned the title "Your search didn't work | USAGov", so search is delegated to the search.gov/USAGov service, and the search results are not reproducible. A contact page I guessed (/aboutus/contact-us.htm) returned a 404, so it was not included.
  - Inferred: a park-picker dropdown and state filters in Find a Park, and park-alert banners on park pages. I did not look for or see a language selector, meetings calendar or report-a-problem form.
- complexity: high. It is a very large site with thousands of park sub-sites, a deep topic taxonomy, and a mega-menu. Replication should be limited to the central pages and one park.
- stack_clues: static .htm URLs (suggests an in-house CMS; not confirmed); USWDS classes (`usa-banner`, `usa-footer`, `usa-identifier`); html5shiv and respond.js legacy shims loaded from a CDN. The CMS is unknown.
- limitations: I did not capture the GlobalNav dropdown items, because the grep showed only the first 70 links; the nav labels (Find a Park, Plan Your Visit, Learn & Explore, Get Involved, What We Do) are inferred from the matching section page titles, not read from the nav markup. No department directory, meetings calendar, or alert banner was observed. Search relies on an external service.
