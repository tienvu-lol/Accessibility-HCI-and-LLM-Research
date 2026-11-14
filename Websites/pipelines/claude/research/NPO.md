# NPO — Claude Phase A source research

Verification date for all slots: 2026-11-13 (UTC, from the shell clock). Method for all: HTTP GET via curl (`curl -sSL -A "Mozilla/5.0"`). Titles and statuses below are what I saw. Candidates rejected because curl was blocked: savethechildren.org (403 Cloudflare "Attention Required!") and chicagosfoodbank.org (403 "Just a moment..."). Other candidates that returned 200 but were not chosen: oxfamamerica.org, sfmfoodbank.org, surfrider.org, humanesociety.org (redirects to humaneworld.org).

### NPO-01
- source_id: NPO-01
- category/subcategory: Nonprofit & Charity / large international humanitarian organization
- source_name: International Rescue Committee (IRC)
- official_url: https://www.rescue.org/
- verified_at: 2026-11-13, HTTP GET via curl. Home returned 200 with title "International Rescue Committee | International Rescue Committee (IRC)". 10 interior pages returned 200 (below).
- source_pages (URL, title, all 200):
  1. https://www.rescue.org/ , "International Rescue Committee | International Rescue Committee (IRC)"
  2. https://www.rescue.org/who-we-are , "Who we are | IRC"
  3. https://www.rescue.org/impact-glance , "Impact at a glance | International Rescue Committee"
  4. https://www.rescue.org/where-we-work , "Where we work | IRC"
  5. https://www.rescue.org/country/syria , "Donate to help Syria | IRC"
  6. https://www.rescue.org/what-we-do , "What we do | IRC"
  7. https://www.rescue.org/outcome/health , "Health | International Rescue Committee"
  8. https://www.rescue.org/how-to-help , "How to help | IRC"
  9. https://www.rescue.org/united-states/seattle-wa , "Seattle, WA | International Rescue Committee"
  10. https://www.rescue.org/leadership , "Staff leaders | International Rescue Committee"
  11. https://www.rescue.org/financial-information , "Financial information and ratings | International Rescue Committee"
- key_regions (observed in HTML):
  - Header: a region switcher (U.S./Global, United Kingdom, Deutschland, Sverige, European Union, 한국). Social icons: Facebook, Instagram, YouTube, TikTok, LinkedIn, Bluesky. A "Donate" button links to `?form=donate&ms=...`.
  - Primary nav (mega-menu style):
    - Who We Are: At a Glance, Annual Report, Financials & Ratings, Our Strategy, President David Miliband, Staff Leaders, Board & Advisors, Ambassadors, Our Partners.
    - Where We Work: about 45 country links grouped by region (Africa, Asia, Europe, Latin America, Middle East) plus about 30 US city offices (e.g. Seattle, WA).
    - What We Do: Economic Wellbeing, Education, Health, Empowerment, Safety, Centered on Women & Girls, Policy & Advocacy, How We Use Evidence, Airbel Impact Lab, Reports and Resources.
    - How To Help.
  - Hero: h2 "We help people survive, recover and rebuild their lives".
  - Body sections (h2/h3): "Our commitment to cost efficiency", "Our impact", "News and featured stories" (3 story cards), "Get involved" (Donate, Join Rescue Collective, Volunteer, "Double your impact by 12/31").
  - Footer: I did not inspect the footer link groups in detail. Treat them as unknown.
- key_interactions:
  - Observed: the donate CTA opens a `?form=donate` donate form on the home URL; the HTML contains "Monthly" text, which suggests a frequency toggle. I did not inspect the form fields, so this is inferred.
  - Observed: country and US-city pages (`/country/<slug>`, `/united-states/<city>`) work as a find-a-location pattern via the Where We Work menu.
  - Observed: a "Volunteer" card, "Join Rescue Collective", and a news/stories section.
  - Inferred: mega-menu dropdowns toggled by hover or click.
- complexity: high. The site has a large mega-menu with about 80 links, a multi-region switcher, many page types (country, city, outcome, report, news), and a donate overlay.
- stack_clues: response header `x-generator: Drupal 11`; `x-drupal-cache` header; `drupal-settings-json` in the HTML; `/sites/default/files` assets; served via Cloudflare and Varnish; component class prefixes `rpla-` and `rplm-` (Rippleware-style component library, inferred).
- limitations: donate form internals and footer were not inspected. The page is server-rendered, but menus and the donate form probably need JavaScript. Donation must be simulated only. The `?ms=` tracking parameter in URLs should be ignored.

### NPO-02
- source_id: NPO-02
- category/subcategory: Nonprofit & Charity / local community nonprofit (regional food bank)
- source_name: Capital Area Food Bank (Washington, DC region). This is a different organization from the excluded AFAC.
- official_url: https://www.capitalareafoodbank.org/
- verified_at: 2026-11-13, HTTP GET via curl. Home returned 200 with title "Food Bank for the Washington, DC, Region | Capital Area Food Bank". 13 interior pages returned 200.
- source_pages (URL, title, all 200):
  1. https://www.capitalareafoodbank.org/ , "Food Bank for the Washington, DC, Region | Capital Area Food Bank"
  2. https://www.capitalareafoodbank.org/hunger-in-our-region/ , "Facts About Hunger in Washington, DC | Capital Area Food Bank"
  3. https://www.capitalareafoodbank.org/what-we-do/ , "Food Distribution, Nutritional Education, and Social Service Partnerships | Capital Area Food Bank"
  4. https://www.capitalareafoodbank.org/what-we-do/direct-food-distribution-programs/ , "Direct Food Distribution Programs | Capital Area Food Bank"
  5. https://www.capitalareafoodbank.org/impact/ , "Our Impact on Food Insecurity | Capital Area Food Bank"
  6. https://www.capitalareafoodbank.org/how-to-help/ , "Ways to Give to CAFB"
  7. https://www.capitalareafoodbank.org/how-to-help/ways-to-give/ , "More Ways to Help People in Need | Capital Area Food Bank"
  8. https://www.capitalareafoodbank.org/how-to-help/donate-food/ , "Donate Food | Capital Area Food Bank"
  9. https://www.capitalareafoodbank.org/upcoming/ , "Events & Campaigns - Capital Area Food Bank"
  10. https://www.capitalareafoodbank.org/blog/ , "Blog - Capital Area Food Bank"
  11. https://www.capitalareafoodbank.org/find-food-assistance/ , "Need Help? | Food Assistance in the DC Region | Capital Area Food Bank"
  12. https://www.capitalareafoodbank.org/about-us/ , "DC Area's Largest Hunger Relief Organization | Capital Area Food Bank"
  13. https://www.capitalareafoodbank.org/contact/ , "Contact - Capital Area Food Bank"
  14. https://www.capitalareafoodbank.org/newsroom/ , "Newsroom - Capital Area Food Bank"
- key_regions (observed):
  - Header: "Skip to main content" link, a Donate button (to the external give.capitalareafoodbank.org), then main nav.
  - Main nav, with dropdowns:
    - Hunger In Our Region.
    - What We Do: Direct Food Distribution, Food+ Partnerships, Advocacy & Public Policy, Nutrition & Wellness, Farms & Gardening.
    - Impact.
    - How To Help: Ways to Give, Donate Food, Volunteer (external volunteer.capitalareafoodbank.org), Virtual Fundraising, Corporate Engagement, Workplace Giving.
    - Events & Campaigns.
    - Hunger Report 2026 (external).
    - Blog, Careers, Partners, Get Help, Contact.
  - Hero: h1 "Capital Area Food Bank" with h2 "Good food today. Brighter futures tomorrow."
  - Body: "Hunger exists in every zip code in our region." (an interactive map section with layer tabs Need / Impact / Partners / People, and partner cards Martha's Table, DC Central Kitchen, Bread for the City, Manna, Food for Others). There are also client story cards (Justin, Wanda, Deborah, Jose), "How we're helping people in need" and "Providing Good Food To Help Today." with Learn More cards, an events/campaigns teaser (College Hunger Conference, Hard Hats Against Hunger, Season's Feedings), and 2 blog "Read More" cards.
  - Footer: About Us, Financial & Tax Info, Newsroom, Privacy Policy, a Donate button, and two addresses with phone/fax and Directions links (DC and a second location in Virginia, apparently).
- key_interactions:
  - Observed: a home map section with 4 layer tabs (anchors `#home-map-layer-0` to `-3`).
  - Observed: the Get Help page contains a form and map references; I did not inspect the finder's behavior (a zip or location search is inferred).
  - Observed: the donate flow is on an external give.capitalareafoodbank.org host (title "Capital Area Food Bank"); the amount and frequency UI was not inspected.
  - Observed: volunteer signup is on an external subdomain (volunteer.capitalareafoodbank.org); the page returned 200, but its form fields were not inspected.
  - Observed: events and campaigns listing, blog, newsroom, and impact stats pages.
  - Inferred: dropdown hover/click menus.
- complexity: medium. The site has many content pages and one interactive map. Donate and volunteer live off-site and would need to be simulated as in-page forms.
- stack_clues: WordPress (`wp-content` and `wp-json` in the HTML, WP-style trailing-slash permalinks); Google Tag Manager (`gtm.js`); external donate and volunteer subdomains.
- limitations: finder, donate and volunteer interiors were not inspected. Page-level interior stats were not extracted. Treat the volunteer and donate flows as simulations.

### NPO-03
- source_id: NPO-03
- category/subcategory: Nonprofit & Charity / cause-focused charity (animal welfare)
- source_name: ASPCA (American Society for the Prevention of Cruelty to Animals)
- official_url: https://www.aspca.org/
- verified_at: 2026-11-13, HTTP GET via curl. Home returned 200 with title "ASPCA | American Society for the Prevention of Cruelty to Animals". 12 interior pages plus the secure donate page returned 200.
- source_pages (URL, title, all 200):
  1. https://www.aspca.org/ , "ASPCA | American Society for the Prevention of Cruelty to Animals"
  2. https://www.aspca.org/helping-shelters-people-pets , "Helping Shelters, People and Pets | ASPCA"
  3. https://www.aspca.org/investigations-rescue , "Animal Cruelty Investigations and Animal Rescue | ASPCA"
  4. https://www.aspca.org/animal-care-recovery , "Animal Care and Recovery | ASPCA"
  5. https://www.aspca.org/improving-laws-animals , "Improving Laws for Animals | ASPCA"
  6. https://www.aspca.org/ways-to-give , "Ways to Give | Donate | Charitable Contributions | ASPCA"
  7. https://www.aspca.org/get-involved , "Get Involved | ASPCA"
  8. https://www.aspca.org/adopt-pet , "Adopt a Pet | ASPCA"
  9. https://www.aspca.org/about-us , "About Us | Our Mission | History | Leadership | ASPCA"
  10. https://www.aspca.org/news , "News | Animal Welfare | Breaking News & Stories | ASPCA"
  11. https://www.aspca.org/pet-care , "Pet Care | Dog | Cat | Horse | Poison Control | ASPCA"
  12. https://www.aspca.org/get-involved/advocacy-center , "Advocacy Center l Ways to Advocate l Get Involved l ASPCA"
  13. https://www.aspca.org/about-us/contact-us , "Contact Us | ASPCA"
  14. https://secure.aspca.org/donate/donate , "Donate to the ASPCA | Help Animals | Make a Gift | ASPCA" (external donate host)
- key_regions (observed):
  - Header: "Skip to content" link; "Primary Nav Menu" and "Search form" headings; Donate, Advocate and Give Monthly buttons.
  - Primary nav groups:
    - Our Work: Helping Shelters People and Pets, Investigations and Rescue, Animal Care and Recovery, Improving Laws for Animals, The Puppy Industry, Protecting Farm Animals, Advancing Horse Welfare, Grants & Scholarships.
    - Locations: Veterinary Services Nationwide, New York City, Los Angeles, Miami FL, Asheville NC, Oklahoma City OK.
    - How You Can Help: Ways to Give, Get Involved, Find More Humane Food, Adopt a Pet, Advocate for Animals, Receive Text Updates.
    - Top-level links: About Us, Adopt, NYC, News, ASPCA Pro.
  - Hero/body: donate-oriented hero "Help the ASPCA Put a Stop to Animal Cruelty"; a seasonal banner "Help us reach 200,000 meals for animals by Thanksgiving"; news/pet-of-the-week cards (e.g. "Pet of the Week: Colada"); a Cruelty Recovery Center adoptable card; a shop/merch promo; a TV-ad donate promo.
  - Footer: Careers, Contact, Press, Strategic Cause Partnerships, Pet Care, Shop, Legal Info, Terms & Conditions, Privacy Policy, social links (Facebook, YouTube, Instagram, TikTok), a Donate bar, and partner links (Subaru, ASPCA Pet Health Insurance).
- key_interactions:
  - Observed: the donate page (secure.aspca.org/donate/donate) has radio amounts $1000, $500, $250, $100 (checked by default), $50 and "other", plus payment-method radios (credit / bank account). A Give Monthly path exists via a separate `/donate/join` URL, so the frequency toggle is inferred rather than seen.
  - Observed: an Advocacy Center (take-action) page, a text-updates signup link, and an adopt page containing forms/selects (likely a search by zip, inferred).
  - Observed: a news listing page and a pet-care section.
  - Inferred: a mega-menu opening on hover or click.
- complexity: medium-high. There are three nav groups with many items, many page types (campaign, news, adopt, pet-care), and a separate donate host that would need to be replicated as a simulated form.
- stack_clues: Drupal 7 (`Drupal.settings`, `drupal.js`, `/sites/default/files`); Drupal webform naming on the donate page (`submitted[donation][amount]`, i.e. the Drupal 7 Webform module, inferred); Google Tag Manager is not confirmed.
- limitations: the www.aspca.org header was read from links only, so the nav-to-group mapping is partly inferred from link order. The donate flow is on a separate secure host and should be treated as simulation only. The `ms=` tracking parameters should be ignored. Tracking-parameter-heavy URLs should be normalized.
