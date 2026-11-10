All three slots verified with HTTP GET via curl on 2026-11-10 (ISO date; run around 06:2x UTC). I wrote no files; scratch files went to a private `mktemp` dir. Nothing was blocked, so no site is marked UNVERIFIED. These candidates were not used. PNC timed out, Golden 1 reset the connection, Alliant returned 403, and eastbankny.com didn't resolve.

### CORP-01
- **source_id:** CORP-01
- **category/subcategory:** Company / national retail bank
- **source_name:** U.S. Bank (personal banking)
- **official_url:** https://www.usbank.com/ (redirects to https://www.usbank.com/index.html)
- **verified_at:** 2026-11-10; HTTP GET via curl with `-sSL -A "Mozilla/5.0"`; 200 on the home page and on 12 of the 13 interior URLs fetched. `/locations.html` returned 404 ("Page Not Found"), so it is not used.
- **source_pages** (all 200, title as seen):
  1. `/` (`/index.html`): "Personal Banking, Credit Cards, Loans & Investing | U.S. Bank"
  2. `/bank-accounts/checking-accounts.html`: "Checking accounts - Open online | U.S. Bank"
  3. `/bank-accounts/savings-accounts.html`: "Open a savings account | U.S. Bank"
  4. `/bank-accounts/savings-accounts/certificate-of-deposit.html`: "Certificate of deposit (CD) rates and accounts | U.S. Bank"
  5. `/credit-cards.html`: "Credit Cards | U.S. Bank"
  6. `/home-loans/mortgage.html`: "Mortgage loans | Home mortgage comparison | U.S. Bank"
  7. `/home-loans/mortgage/mortgage-rates.html`: "Current mortgage rates | Mortgage rates today | U.S. Bank"
  8. `/home-loans/mortgage/mortgage-calculators.html`: "Home loan and mortgage calculators | U.S. Bank"
  9. `/loans-credit-lines/personal-loans-and-lines-of-credit/personal-loan-calculator.html`: "Personal loan rate and payment calculator | U.S. Bank"
  10. `/customer-service.html`: "Customer service | U.S. Bank"
  11. `/online-mobile-banking.html`: "Mobile & online banking | U.S. Bank"
  12. `/about-us-bank/accessibility.html`: "Accessibility Banking Services | In-branch & Online | U.S. Bank"
  13. `/financial-education.html`: "Financial Education | U.S. Bank"
- **key_regions:**
  - **Header** (observed): `<nav id="global-navigation-menubar" aria-label="Main">` is a mega-menu with "Return to Main Menu / Return to Personal / Return to …" drill-down items. It also has a global search form (`globalnav-search`), "Log in" and "Enroll in online banking".
  - **Nav groups** (observed):
    - Checking & savings: Bank Smartly Checking, Safe Debit, Debit card, Bank Smartly Savings, Money market, CD accounts, kids/teen/young-adult checking, Smart Rewards, Mobile & online banking, Overdraft services, Routing & account numbers.
    - Credit cards: cash back, travel, rewards, low intro rate, no annual fee, flexible spending, credit-building, business, ExtendPay, credit score tools.
    - Investing & retirement: Start investing, Work with an advisor, Invest on your own, Investment management, IRA, 401(k) rollovers.
    - Home loans: mortgage, refinance, home equity (HELOC and loan), home improvement.
    - Loans, credit lines, auto, boat and debt consolidation.
    - The top-level Personal/Business/Corporate switch is only partly observed; the home page links to `/business-banking.html` and `/corporate-and-commercial-banking.html`.
  - **Hero and body** (h2 text seen): "Personal Banking", "U.S. Bank checking offer", "Choose Smartly Checking", "Personal loans / Make debt simpler", "Investing Insights", "solutions designed to work for you", "Banking smarter is…", "Connect with us", "Happening now", "Year-end planning", "Make the switch", "Protect your money". A Spanish-site banner ("Estás ingresando al sitio de U.S. Bank en español") appears too.
  - **Footer** (observed): Support, Security, Visa Gift Card, Site map, Careers, Accessibility, Online tracking & advertising, Alumni, Privacy, Your privacy choices, Terms of use. There is also a CPRA email-capture input.
- **key_interactions:**
  - **Observed:**
    - Mega-menu with `aria-expanded` toggles (27–129 per page).
    - Global search form.
    - Log in and Enroll links.
    - The CD page has server-rendered rate text ("2.85% APY for 9 months", "1.71% APY for 13 months") and 3 `<select>` elements.
    - The calculators hub links to calculator sub-pages: 15-vs-30-year, ARM, amortization, down payment, home equity and home improvement.
    - Branch locator link is `https://www.usbank.com/locations/search/` (link only; not fetched).
  - **Inferred:** The calculator and mortgage-rate widgets are rendered client-side. The static HTML has 0 `<table>`, 0 text/number inputs and 0 `<select>` on those two pages. The login would need to be a labeled demo.
- **complexity:** High. It has a deep mega-menu, large pages of 235–450 KB, and many product, calculator and compliance sub-pages. The calculator and rate widgets must be rebuilt from scratch because their markup isn't in the static HTML.
- **stack_clues** (observed): AEM markup (`footer data-libn="AEM"`, `/etc.clientlibs`, "Experience Fragment"), Adobe Launch/DTM-style params (ecid/icid/mcid), and Blend-hosted mortgage application links. A bot-protection script path (`/fQskY3GGCI…`) is present (inferred: Akamai-style), though plain curl got through.
- **limitations:**
  - The rate and calculator internals aren't visible without JS.
  - The locator page was not fetched.
  - The top-level audience switcher is only partly observed.
  - Real login can't be replicated; use a demo.
  - Page sizes are large.

### CORP-02
- **source_id:** CORP-02
- **category/subcategory:** Company / regional bank or credit union (Massachusetts-based credit union, with branches in MA/NH and online membership)
- **source_name:** Digital Federal Credit Union (DCU)
- **official_url:** https://www.dcu.org/
- **verified_at:** 2026-11-10; HTTP GET via curl with `-sSL -A "Mozilla/5.0"`; 200 on the home page and all 14 interior pages fetched.
- **source_pages** (all 200):
  1. `/`: "Credit Union for Personal & Business Banking | DCU"
  2. `/bank/checking.html`: "Digital Federal Credit Union - Free Checking Account & No Fees"
  3. `/bank/savings.html`: "Savings Accounts & Dividend Calculator | DCU"
  4. `/bank/certificates.html`: "Certificate Accounts | DCU"
  5. `/borrow/vehicle-loans/auto-loans.html`: "Auto Loans | DCU"
  6. `/borrow/mortgage-loans/home-mortgage-loans.html`: "Home Mortgage Loans | Digital Federal Credit Union"
  7. `/borrow/credit-cards.html`: "Credit Cards | DCU"
  8. `/about/rates.html`: "Rates | DCU"
  9. `/dcu-support-center.html`: "DCU Support Center | Digital Federal Credit Union"
  10. `/dcu-support-center/branches-atms.html`: "Branches & ATMs | DCU"
  11. `/membership/become-a-member.html`: "Become a Member | DCU"
  12. `/financial-education-center.html`: "Financial Education Center | DCU"
  13. `/careers.html`: "Careers | DCU"
  14. `/contact.html`: "Contact | DCU"
  15. `/dcu-support-center/privacy-practices/accessibility.html`: "Accessibility | DCU"
- **key_regions:**
  - **Header** (observed):
    - Utility links: Insurance, Investments, Branches & ATMs, Join DCU.
    - A login panel with Username and Password fields and "Forgot Username/Password?".
    - A "PAY MY LOAN" button.
    - A search input (`type="search"`, placeholder "What are you looking for?", aria-label "Search Input").
    - Main nav (`/bank`, `/borrow`, `/plan`, `/learn`, `/support`, `/services`, `/membership`) with dropdowns:
      - Bank: checking, savings, certificates, retirement, specialty accounts, business services, debit cards.
      - Borrow: vehicle, personal, mortgage, credit cards, student, commercial lending.
      - About: rates, newsroom, leadership.
      - Support center: forms, direct deposit, wires, check ordering, disclosures.
      - Learn: financial education center.
  - **Hero and body** (h1/h2 seen): "We're a Credit Union Catered to You." with quick links (DCU Support Center, Membership Application Status, Loan Payments, Schedule an Appointment), then "Benefits & Offers", "What makes Digital Federal Credit Union Different?", "What Our Members Are Saying", "DCU in the Community", "Bank With Us From Anywhere".
  - **Footer** (observed): "Federally insured by NCUA" and the Equal Housing text are present. The footer link groups were not cleanly extracted.
- **key_interactions:**
  - **Observed:**
    - Login form fields in the header. Real login is not replicable; use a demo.
    - Search input.
    - Rates page with 59 server-rendered `<table class="table table-striped">` elements, plus a `<select>` and tabs (`role="tab"` ×5).
    - Rate JSON embedded in the page ("apy" "3.25%").
    - Collapsible items (`aria-expanded` 13–14 per page).
    - Branches & ATMs page has 1 table.
  - **Inferred:** The savings "Dividend Calculator" is JS-driven. Its title says calculator, but the static HTML has no calculator inputs. The branch locator is probably a map or JS widget; no `maps.googleapis` reference was found.
- **complexity:** Medium. It has a clear Bank/Borrow/Plan/Learn/Support structure. The very large rates tables make the best replica content, and the pages are 250–600 KB each.
- **stack_clues** (observed): `/etc.clientlibs` (48 hits, AEM), `adobedtm`, and Bootstrap classes (`table table-striped`, `form-control`, `rounded-0`).
- **limitations:**
  - It is a member-owned credit union with a national online membership, so it is regional only by branch footprint and HQ. Patelco (https://www.patelco.org/, 200, "Patelco Credit Union | Personalized Banking and Financial Services") was also reachable and is a purer regional fallback.
  - The footer groups, the full nav and the calculator and locator internals were not fully extracted.
  - The login form is real, so any replica must be a demo.

### CORP-03
- **source_id:** CORP-03
- **category/subcategory:** Company / technology company (software/SaaS, DevSecOps platform)
- **source_name:** GitLab (about.gitlab.com marketing site)
- **official_url:** https://about.gitlab.com/ (`gitlab.com` and `www.gitlab.com` both redirect there)
- **verified_at:** 2026-11-10; HTTP GET via curl with `-sSL -A "Mozilla/5.0"`; 200 on the home page and all 15 interior pages fetched (plus `docs.gitlab.com`).
- **source_pages** (all 200):
  1. `/`: "GitLab - Speed with control for agentic software engineering"
  2. `/platform/`: "GitLab Platform - Speed with control"
  3. `/pricing/`: "Pricing"
  4. `/pricing/premium/`: "Why GitLab Premium? | GitLab"
  5. `/solutions/`: "GitLab Solutions - Speed with control"
  6. `/solutions/continuous-integration/`: "Continuous Integration and Delivery (CI/CD)"
  7. `/customers/`: "Case studies from GitLab customers"
  8. `/customers/nvidia/`: "Nvidia"
  9. `/blog/`: "Blog | GitLab"
  10. `/sales/`: "Contact Sales"
  11. `/request-a-demo/`: "Request a demo"
  12. `/jobs/`: "Join GitLab"
  13. `/jobs/all-jobs/`: "GitLab Jobs"
  14. `/company/`: "About GitLab - The Intelligent Orchestration Platform"
  15. `/get-started/`: "Get started with GitLab"
  16. `/resources/`: "Resources | GitLab"
  17. `/security/`: "Security"
  - Docs are on a separate host: https://docs.gitlab.com/ (200, "GitLab Docs"). Use it as an outbound link rather than replicating it.
- **key_regions:**
  - **Header** (observed): `<nav class="navigation__desktop" aria-label="Navigation">` with mega-menus.
    - Platform: DevOps (CI/CD, Source Code Management, Agile Delivery, Artifact Management); Security & Governance (Application Security Testing, Governance & Compliance, Secrets Management, Supply Chain Security); Agentic AI & Context (Duo Agent Platform, Orbit Context Graph); Visibility & Measurement; Explore the Platform.
    - Solutions: Outcomes (DevOps, Security and AI Modernization); By size (Enterprise, Small Business, Startups); Industries (Financial Services, Public Sector, Telecommunications, Automotive, Education, Aerospace).
    - Pricing (plain link).
    - Resources: Discover (Docs, University, Demo Series, Demo Hub, Services, Well Architected); Connect (Blog, Community, Customers, Partners, Events).
    - Company: About, Jobs, Press, Handbook, Leadership, Investor relations, Trust Center, AI Transparency Center, Newsletter, Contact us.
    - Right side: Talk to sales, Support portal, Customer portal, Request a demo, Get free trial, Sign in, and a language list (English, Deutsch, Español, Français, Italiano, …).
  - **Hero and body** (h1/h2 seen): "Ship faster. Stay in control.", "One control plane", "Built to meet your industry's demands", "Latest from GitLab" (blog cards), "Own what's next".
  - **Footer** (observed): "Footer links", View plans, Why Premium?, Why Ultimate?, Contact sales, Support portal, Customer portal, Status, Terms of use, Privacy statement. Then columns for Explore the platform (Duo Agent Platform, CI/CD, Orbit, Secrets Management), Why GitLab (GitOps, DevOps, DevSecOps, Agentic AI, …), Solutions by industry and size, and Resources (Install, Quick start guides, Docs, University, Demo Series/Hub, Services).
- **key_interactions:**
  - **Observed:**
    - Pricing tiers are server-rendered ("$0 per user/month", "$29 per user/month, billed annually", "Try for free", "Let's talk"). I found no billing-period toggle (0 switch, radio or checkbox elements), so the task's billing-toggle feature is not observed here.
    - `aria-expanded` appears 76 times on the pricing page (accordions and comparison sections).
    - `/sales/` loads a Marketo form (119 `mktoForm` hits). The fields aren't in the static HTML (1 `<form>`, no field inputs found).
    - The careers listing at `/jobs/all-jobs/` has 2 `<select>` filters, `#location-filter-dropdown` and `#department-filter-dropdown`, with about 33 options (View all locations, Remote, Bangalore, …) and a `jobs-accordion` list.
    - Customers page has tabs (`role="tab"` ×9).
    - Blog index has a search input and a form.
    - A site-wide search input is present on every page.
  - **Inferred:** The blog category filtering is JS-driven. The docs search lives on `docs.gitlab.com`.
- **complexity:** Medium–high. It has a large nested mega-menu and many pages, but each page is a fairly simple server-rendered marketing layout of 160–640 KB. The pricing page is the heaviest.
- **stack_clues** (observed):
  - Nuxt SSR: `/_nuxt/` ×90, `window.__NUXT__`, and Vue scoped styles (`data-v-` ×1634).
  - Marketo forms.
  - A cookie-consent script (OneTrust-style, 16 matches; inferred from naming).
  - Swiftype search markers (`data-swiftype-index`).
- **limitations:**
  - There is no billing-period toggle, so pricing is static.
  - The contact-sales form fields are Marketo-injected and weren't observed; a replica would have to invent them, labeled as such.
  - Docs are off-domain.
  - Many `/blog/…` post slugs change quickly. Replicate `/blog/` and one post from the live list.

Not checked: rendered (JS-executed) behavior on any site, the US Bank branch locator, and the full DCU footer. I only inspected the static HTML, so every note about client-rendered widgets is inferred from missing markup. No files were written, and nothing is staged.
