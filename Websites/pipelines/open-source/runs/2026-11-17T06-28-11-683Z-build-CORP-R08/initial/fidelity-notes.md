# Fidelity Notes – Riverbank Community Bank Replica (CORP-R08)

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns from the approved source where evidence existed.
- Used a fictional organization name (Riverbank Community Bank) and original placeholder text/logos.
- All images are local SVG placeholders (none used in this replica; all visuals are CSS/text).
- No real photographs, trademarks, or copyrighted content were incorporated.
- Where the reference required a real service (login, transactions), we provided clearly marked simulations or non‑functional demonstrations.

## Page‑by‑Page Notes

### index.html (Home)
- **Replicated:** Header, primary navigation, hero section with call‑to‑action, product‑listing band, educational‑resources band, footer.
- **Approximated:** Product cards use placeholder text; actual product details from the source are not reproduced.
- **Simulated:** None.
- **Intentionally Added:** Skip link (first focusable element) and ARIA‑expanded mobile menu toggle for accessibility.
- **Omitted:** Any carousel or rotating banner not observed in evidence.
- **Unverified:** Exact visual styling (colors, spacing) – inferred from typical banking sites; we used a neutral theme.

### about.html (About)
- **Replicated:** Header, nav, hero, two‑column‑style content bands (story and leadership), footer.
- **Approximated:** Leadership cards contain placeholder names and titles.
- **Simulated:** None.
- **Intentionally Added:** Same accessibility features as index.html.
- **Omitted:** Detailed history timeline, press‑release section.
- **Unverified:** Exact copy wording; we wrote original prose.

### learning.html (Learning Center)
- **Replicated:** Header, nav, hero, grid of learning resources.
- **Approximated:** Resource cards show title, type, length, topic – based on typical resource types.
- **Simulated:** None.
- **Intentionally Added:** Inline JavaScript renders sample data (5 resources) to demonstrate a list.
- **Omitted:** Search bar, filtering, pagination.
- **Unverified:** Whether the source uses a grid or list layout; we chose a grid for responsiveness.

### contact.html (Contact Us)
- **Replicated:** Header, nav, hero, branch‑search simulation, contact‑form simulation, footer.
- **Approximated:** Branch search uses a static array of 5 branches; contact form validates and shows demo confirmation.
- **Simulated:** Branch search (client‑side filtering) and contact form (demo submission).
- **Intentionally Added:** ARIA live regions for search results and form status; skip link; mobile menu.
- **Omitted:** Real map integration, third‑party API (e.g., Google Maps).
- **Unverified:** Whether the source includes a branch‑search widget; we inferred from the “Find a Bank or ATM” wording.

### support.html (Support)
- **Replicated:** Header, nav, hero, FAQ accordion, contact‑support section, footer.
- **Approximated:** FAQ questions and answers are generic banking‑style.
- **Simulated:** None (accordion is functional but content is demo).
- **Intentionally Added:** ARIA‑expanded on accordion buttons, keyboard‑operable panels.
- **Omitted:** Live chat, ticket‑submission system.
- **Unverified:** Exact FAQ wording from source.

### checking.html (Checking & Savings)
- **Replicated:** Header, nav, hero, product‑card grid, footer.
- **Approximated:** Account cards show monthly fee, interest, features – based on typical account attributes.
- **Simulated:** None.
- **Intentionally Added:** Inline JavaScript renders three sample account products.
- **Omitted:** Interest‑rate tables, fee calculators.
- **Unverified:** Whether the source uses a grid or list for accounts.

### loans.html (Loans)
- **Replicated:** Header, nav, hero, product‑card grid, footer.
- **Approximated:** Loan cards show APR range, term, typical amount.
- **Simulated:** None.
- **Intentionally Added:** Inline JavaScript renders three sample loan products.
- **Omitted:** Loan‑application pre‑qualification tool.
- **Unverified:** Exact layout of loan product presentation.

### digital.html (Digital Banking)
- **Replicated:** Header, nav, hero, feature‑card grid, footer.
- **Approximated:** Feature cards describe typical digital banking capabilities.
- **Simulated:** None.
- **Intentionally Added:** Inline JavaScript renders four sample features.
- **Omitted:** Screenshots or demo videos of the actual app.
- **Unverified:** Whether the source uses a grid or list for features.

### calculators.html (Calculators)
- **Replicated:** Header, nav, hero, two calculator forms (loan payment, savings goal), footer.
- **Approximated:** Form labels and placeholders match typical financial calculators.
- **Simulated:** Both calculators perform client‑side calculations and display results.
- **Intentionally Added:** Error messages with ARIA‑live behavior, focus movement to result on submit.
- **Omitted:** Additional calculators (e.g., mortgage, retirement) not evidenced.
- **Unverified:** Whether the source includes both calculators; we inferred from the calculators page title.

### careers.html (Careers)
- **Replicated:** Header, nav, hero, job‑listing grid, culture section, footer.
- **Approximated:** Job cards show title, location, department, type.
- **Simulated:** None.
- **Intentionally Added:** Inline JavaScript renders four sample job listings.
- **Omitted:** Application form, detailed job descriptions.
- **Unverified:** Exact layout of job listings.

### 404.html (Page Not Found)
- **Replicated:** Header, nav, main content with error message, footer.
- **Approximated:** Simple user‑friendly message and link to homepage.
- **Simulated:** None.
- **Intentionally Added:** Same accessibility features as other pages.
- **Omitted:** Search box, suggested links.
- **Unverified:** Whether the source uses a custom 404 page; we provided a standard one.

## Component‑Level Notes
- **site-header:** Replicated across all pages; includes fictional logo, skip link, and mobile menu button.
- **primary-nav:** Replicated; same set of links on every page; mobile toggle added for accessibility.
- **hero-banner:** Present on home, about, learning, checking, loans, digital, careers (inferred from observed hero region). Uses original heading and paragraph.
- **content-band-product:** Used on checking, loans, digital to show product/feature grids; approximated with placeholder data.
- **content-band-educational:** Used on learning page; approximated with sample resources.
- **content-band-about, content-band-leadership, content-band-learning, content-band-branch-search, content-band-contact-form, content-band-faq, content-band-contact-support, content-band-error, content-band-calculator, content-band-culture, content-band-careers:** Each approximated with generic but relevant content.
- **accordion-item / accordion-trigger / accordion-panel:** Used in FAQ; simulated with ARIA attributes and keyboard support.
- **product-card, learning-card, feature-card, career-card:** Reusable card components; approximated with sample data.
- **form elements (input, button, textarea, select):** Used in branch search, contact form, loan calculator, savings calculator; all have programmatic labels, inline error messages, and focus management where appropriate.
- **skip link:** First focusable element on every page; visible on focus.
- **landmarks:** header, nav, main, footer present; main has id="main-content".
- **heading order:** Each page has exactly one h1; subsequent headings follow hierarchy without skipping levels.
- **focus indicator:** Custom CSS outline for :focus-visible meets contrast requirement.
- **color contrast:** Text/background combinations meet WCAG AA (checked via manual reasoning; not tested by tool).
- **responsive reflow:** Layout uses flexible grids and percentages; no horizontal scroll at 320px width (tested by reasoning).
- **prefers-reduced-motion:** No animation used; therefore respects the setting.

## Intentional Additions
- Skip link (accessibility).
- Mobile navigation toggle with aria‑expanded (accessibility).
- ARIA live regions for dynamic content (branch search results, form status, calculator results).
- Error messages with ARIA‑alert‑like behavior and focus movement.
- All interactive controls are native HTML elements; no custom widgets requiring ARIA beyond where native semantics fall short.

## Omissions (Due to Lack of Evidence)
- Real‑time data (e.g., live rates, live branch inventory).
- Third‑party embeds (maps, social media widgets).
- Authenticated areas (login, account dashboard).
- Advanced filtering/search facets.
- Pagination or infinite scroll.
- Real photographs or icons from the source.

## Unverified Items
- Exact visual design (colors, fonts, spacing) – we used a neutral, accessible theme.
- Whether certain sections (e.g., sidebar) exist in the source; we omitted unless observed.
- Whether the source uses particular JavaScript frameworks; we used vanilla JS.

---  
*End of fidelity notes.*  
