Phase A is done. I picked UNICEF (NPO-01), Capital Area Food Bank (NPO-02) and ASPCA (NPO-03), and checked their pages with curl. I wrote no files and used no saved HTML except an `mktemp -d` dir that I deleted.

All checks ran 2026-11-11 (03:46Z, shell UTC clock) with `curl -sSL --max-time 25 -A "Mozilla/5.0"`. Every URL listed under source_pages below returned HTTP 200 with the title shown, apart from the pages in each block's limitations.

Candidates I rejected:
- **Doctors Without Borders USA:** the first request returned 200 ("Home | Doctors Without Borders - USA"), but three later requests returned 403 "Checking connection", so I replaced it.
- **Save the Children:** 403 Cloudflare "Attention Required!".
- **WWF:** 403 "Just a moment...".

### NPO-01
- **source_id:** NPO-01
- **category/subcategory:** Nonprofit & Charity / large international humanitarian organization (UN agency for children)
- **source_name:** UNICEF (unicef.org, global site)
- **official_url:** https://www.unicef.org/
- **verified_at:** 2026-11-11T03:46Z, HTTP GET via curl. Homepage returned 200, title "UNICEF, for every child", 234 KB server-rendered HTML.
- **source_pages** (all 200, title as seen):
  1. https://www.unicef.org/ — "UNICEF, for every child"
  2. https://www.unicef.org/who-we-are — "Who we are | UNICEF"
  3. https://www.unicef.org/what-we-do — "What we do | UNICEF"
  4. https://www.unicef.org/reports — "Publications | UNICEF"
  5. https://www.unicef.org/stories — "Stories and features | UNICEF"
  6. https://www.unicef.org/stories/five-years-girls-afghanistan-are-still-locked-out-learning — "Five years on, girls in Afghanistan are still locked out of learning | UNICEF" (article template)
  7. https://www.unicef.org/where-we-work — "Where we work | UNICEF"
  8. https://www.unicef.org/take-action — "Take action | UNICEF"
  9. https://www.unicef.org/take-action/work-with-us — "Work with us | UNICEF"
  10. https://www.unicef.org/emergencies/nepal-flood — "Flash floods in Nepal leave thousands of children in urgent need of humanitarian assistance | UNICEF" (emergency template)
  11. https://www.unicef.org/about/frequently-asked-questions — "Frequently Asked Questions | UNICEF"
  12. https://www.unicef.org/child-rights-convention — "Convention on the Rights of the Child | UNICEF"
  13. https://www.unicef.org/who-we-are/transparency — "Transparency and accountability | UNICEF" (`/transparency` redirects here)
- **key_regions** (observed in homepage HTML):
  - **Header:**
    - Language links: Français, Español, العربية, 中文.
    - "Press centre" link.
    - Donate button pointing to the external https://help.unicef.org/global/donate.
    - Search form (`GET /search`).
  - **Main nav:** Who we are, What we do, Research and reports, Stories and features, Where we work, Take action. Dropdown contents under these items were not captured; I saw only the top-level links.
  - **Hero:** an h2 "Water Under Fire" with a "Learn more" link to /reports/water-under-fire, plus an h2 "UNICEF, for every child".
  - **Body:**
    - Press-release teaser cards (Gaza, Sudan).
    - A COP31 campaign card.
    - Emergency cards (Nepal flood, Venezuela earthquakes).
    - A story card (Afghan girls).
    - "UNICEF's work" section with an "Explore what we do" link.
    - "Spotlight" section.
    - Promo links: UNICEF Parenting, U-Report, SDGs.
    - Newsletter "Sign up" at /take-action/subscribe.
  - **Footer:** a link list covering UNICEF home, What we do, Research and reports, Stories and features, Where we work, Take action, About us, Work with us, Partner with UNICEF, Executive Board, Evaluation, Ethics, Internal Audit and Investigations, Transparency and accountability, Safeguarding, SDGs, FAQ. Column grouping was not inspected.
- **key_interactions:**
  - Observed: language switch links, a search form, a "mosaic curated" component form (`unicef-component-mosaic-curated`, probably a story filter), and a Donate link to an external donation subdomain.
  - Inferred: nav dropdown or mega-menu, country-office selector on /where-we-work, newsletter signup form at /take-action/subscribe. I did not inspect these.
- **complexity:** high. It has many page templates (landing, article, emergency, report listing), a multilingual header, a large nav/footer, and card mosaics.
- **stack_clues:** Drupal (`/sites/default/files` appears 38 times, `drupal-settings-json` is present, jQuery served from `/core/assets/vendor/jquery/`, Drupal Views exposed forms with `bef-` classes, a Solr search view). Everything else is unknown.
- **limitations:**
  - help.unicef.org/global/donate returned 403 from curl (Cloudflare "Attention Required!"), so the donate flow (amount selector, frequency) is unverified and should be treated as a simulated page.
  - Homepage hero and h3 text is mostly empty in the raw HTML, so card titles come from the links.
  - The page is large, so scope the replica to the pages above.

### NPO-02
- **source_id:** NPO-02
- **category/subcategory:** Nonprofit & Charity / local community nonprofit (regional food bank, Washington DC area)
- **source_name:** Capital Area Food Bank
- **official_url:** https://www.capitalareafoodbank.org/
- **verified_at:** 2026-11-11T03:46Z, HTTP GET via curl. Homepage returned 200, title "Food Bank for the Washington, DC, Region | Capital Area Food Bank", 127 KB.
- **source_pages** (all 200):
  1. https://www.capitalareafoodbank.org/ — "Food Bank for the Washington, DC, Region | Capital Area Food Bank"
  2. https://www.capitalareafoodbank.org/hunger-in-our-region/ — "Facts About Hunger in Washington, DC | Capital Area Food Bank"
  3. https://www.capitalareafoodbank.org/what-we-do/ — "Food Distribution, Nutritional Education, and Social Service Partnerships | Capital Area Food Bank"
  4. https://www.capitalareafoodbank.org/what-we-do/direct-food-distribution-programs/ — "Direct Food Distribution Programs | Capital Area Food Bank"
  5. https://www.capitalareafoodbank.org/impact/ — "Our Impact on Food Insecurity | Capital Area Food Bank"
  6. https://www.capitalareafoodbank.org/how-to-help/ — "Ways to Give to CAFB"
  7. https://www.capitalareafoodbank.org/how-to-help/ways-to-give/ — "More Ways to Help People in Need | Capital Area Food Bank"
  8. https://www.capitalareafoodbank.org/how-to-help/donate-food/ — "Donate Food | Capital Area Food Bank"
  9. https://www.capitalareafoodbank.org/upcoming/ — "Events & Campaigns - Capital Area Food Bank"
  10. https://www.capitalareafoodbank.org/blog/ — "Blog - Capital Area Food Bank"
  11. https://www.capitalareafoodbank.org/partners/ — "Partners - Capital Area Food Bank"
  12. https://www.capitalareafoodbank.org/find-food-assistance/ — "Need Help? | Food Assistance in the DC Region | Capital Area Food Bank"
  13. https://www.capitalareafoodbank.org/contact/ — "Contact - Capital Area Food Bank"
  14. https://www.capitalareafoodbank.org/sign-up/ — "Sign Up - Capital Area Food Bank"
- **key_regions** (observed):
  - **Header:**
    - Logo.
    - A Feeding America link.
    - Donate button (to give.capitalareafoodbank.org).
    - Site search form (`.site-search__form`).
  - **Main nav and dropdowns** (nested links observed):
    - Hunger In Our Region.
    - What We Do, with Direct Food Distribution, Food+ Partnerships, Advocacy & Public Policy, Nutrition & Wellness, Farms & Gardening.
    - Impact.
    - How To Help, with Ways to Give, Donate Food, Volunteer (external volunteer.capitalareafoodbank.org), Virtual Fundraising, Corporate Engagement, Workplace Giving.
    - Events & Campaigns.
    - Hunger Report 2026 (external hunger-report subdomain).
    - Blog, Careers, Partners, Get Help (/find-food-assistance/), Contact.
  - **Hero:** h1 "Capital Area Food Bank" with h2 "Good food today. Brighter futures tomorrow."
  - **Body:**
    - "Hunger exists in every zip code in our region", with a link to the ArcGIS map (experience.arcgis.com).
    - Partner cards: Martha's Table, DC Central Kitchen, Bread for the City, Manna, Food for Others.
    - Client story cards: Justin, Wanda, Deborah, Jose.
    - "How we're helping people in need", with "Providing Good Food To Help Today" and "Distributing Food Where It's Needed Most".
    - "Creating Hunger Solutions for Tomorrow", with cards for Nutrition & Wellness, Farms & Gardening, Food+ Partnerships.
    - "See Our Impact" link.
    - Donate / Volunteer / Partners CTA row.
    - Email "Sign up" link.
    - Event cards (2026 College Hunger Conference, Hard Hats Against Hunger).
  - **Footer:** not inspected in detail.
- **key_interactions:**
  - Observed: site search form, a /sign-up/ page (title only, form fields not inspected), a "Get Help" page, and external links for donate, volunteer and the map.
  - Inferred: a food-assistance location search on /find-food-assistance/, a donation amount and frequency form on the external donor platform, and a volunteer shift signup on the volunteer subdomain.
- **complexity:** medium. It is a conventional multi-level WordPress marketing site with about 15 pages and one level of dropdowns. The interactive parts live on external domains.
- **stack_clues:** WordPress (`wp-content` appears 65 times, `/wp-includes/js/jquery/jquery.min.js?ver=3.7.1`). The theme and builder are unknown.
- **limitations:**
  - The `/donate/` link redirects to give.capitalareafoodbank.org/give/324509/#!/donation/checkout, which returned 403 Cloudflare, so the donate flow is unverified. For an amount-and-frequency selector to simulate, use the ASPCA observations in NPO-03 as a reference.
  - The volunteer subdomain returned 200 with the generic title "Capital Area Food Bank"; its content was not inspected.
  - I did not check the footer, the find-food-assistance form, or the sign-up form fields.

### NPO-03
- **source_id:** NPO-03
- **category/subcategory:** Nonprofit & Charity / cause-focused charity (animal welfare)
- **source_name:** ASPCA (American Society for the Prevention of Cruelty to Animals)
- **official_url:** https://www.aspca.org/
- **verified_at:** 2026-11-11T03:46Z, HTTP GET via curl. Homepage returned 200, title "ASPCA | American Society for the Prevention of Cruelty to Animals", 95 KB.
- **source_pages** (all 200):
  1. https://www.aspca.org/ — "ASPCA | American Society for the Prevention of Cruelty to Animals"
  2. https://www.aspca.org/about-us — "About Us | Our Mission | History | Leadership | ASPCA"
  3. https://www.aspca.org/animal-care-recovery — "Animal Care and Recovery | ASPCA"
  4. https://www.aspca.org/investigations-rescue — "Animal Cruelty Investigations and Animal Rescue | ASPCA"
  5. https://www.aspca.org/improving-laws-animals — "Improving Laws for Animals | ASPCA"
  6. https://www.aspca.org/helping-shelters-people-pets — "Helping Shelters, People and Pets | ASPCA"
  7. https://www.aspca.org/grants-and-scholarships — "Grants & Scholarships | ASPCA"
  8. https://www.aspca.org/adopt-pet — "Adopt a Pet | ASPCA"
  9. https://www.aspca.org/pet-care — "Pet Care | Dog | Cat | Horse | Poison Control | ASPCA"
  10. https://www.aspca.org/get-involved — "Get Involved | ASPCA"
  11. https://www.aspca.org/get-involved/advocacy-center — "Advocacy Center l Ways to Advocate l Get Involved l ASPCA"
  12. https://www.aspca.org/ways-to-give — "Ways to Give | Donate | Charitable Contributions | ASPCA"
  13. https://www.aspca.org/news — "News | Animal Welfare | Breaking News & Stories | ASPCA"
  14. https://www.aspca.org/nyc — "New York City | ASPCA" (local-initiative template; also /los-angeles-initiative and /miami-initiative exist)
  - Optional extra: https://secure.aspca.org/donate/donate?pcode=WEBMEMBER&lpcode=WEBGUARD — "Donate to the ASPCA | Help Animals | Make a Gift | ASPCA" (200, separate domain)
- **key_regions** (observed in homepage HTML):
  - **Header:**
    - An h2 labelled "Primary Nav Menu".
    - Search form (`search-block-form`).
    - Donate button to secure.aspca.org.
    - Utility links: Adopt, NYC, News, ASPCA Pro (aspcapro.org).
  - **Main nav:**
    - Mission/program links: Helping Shelters People and Pets, Investigations and Rescue, Animal Care and Recovery, Improving Laws for Animals, The Puppy Industry, Protecting Farm Animals, Advancing Horse Welfare, Grants & Scholarships.
    - Veterinary Services Nationwide.
    - Locations: New York City, Los Angeles, Miami FL, Asheville NC, Oklahoma City OK.
    - Ways to Give, Get Involved, Find More Humane Food, Adopt a Pet, Advocate for Animals, Receive Text Updates.
    - How these group into dropdowns is inferred; I did not see the markup grouping.
  - **Hero and body:**
    - Banner: "Help us reach 200,000 meals for animals by Thanksgiving" (holiday-drive-2026).
    - "You Can Make a Difference" with Donate / Advocate / Give Monthly CTAs.
    - "The Latest" and "Featured Highlights" sections with news and pet-of-the-week cards (Colada, Bentley).
    - "Help the ASPCA Put a Stop to Animal Cruelty" appeal.
    - "Connect with Us" social block.
    - An email-updates signup form (`/sign-aspca-email-updates`).
  - **Footer:** Terms & Conditions and Privacy Policy links were seen; other groups were not inspected.
- **key_interactions:**
  - Observed:
    - Donate form on secure.aspca.org with five radio amount inputs (`donation[amount]`, ids amount-1 to amount-5).
    - A `recurs_monthly` field and a `recurring_amount` field.
    - An OneTrust cookie button (`ot-sdk-btn`).
    - An email-signup webform on the homepage.
    - Site search.
    - "Give Monthly" CTA.
  - Inferred: a pet adoption search on /adopt-pet, and an advocacy action form on the Advocacy Center.
- **complexity:** medium. It has server-rendered Drupal templates, a donate form with amount and frequency fields, a small number of page types, and a moderate nav.
- **stack_clues:** `<meta name="generator" content="Drupal 7">`, `/sites/default/files` appears 59 times, Springboard-style donation field names (`submitted[...]`, `webform-client-form`), and the OneTrust cookie SDK.
- **limitations:**
  - I did not fetch the donate form beyond its input names, so the amount values and labels are unverified.
  - There is no volunteer signup, because ASPCA has no volunteer program in the way a food bank does; Get Involved is about advocacy and giving. This is inferred from page titles, not checked in page content.
  - The Primary Nav dropdown structure was not confirmed from markup.
  - The homepage carries a seasonal holiday-drive banner, which may change.


Not checked: footers, the CAFB and ASPCA forms, and the nav dropdown markup. Risk: Cloudflare gave me intermittent 403s on some hosts (MSF, the donate subdomains), so re-check these sites before building.
