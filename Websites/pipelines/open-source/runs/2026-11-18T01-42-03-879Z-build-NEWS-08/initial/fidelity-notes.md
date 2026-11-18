# Fidelity Notes for NEWS-08

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns observed in the approved source or inferred as typical for news sites.  
- Used fictional organization name (Cascadia Chronicle), original prose, and original placeholder artwork (SVG placeholders or inline data‑URI SVGs).  
- No real logos, trademarks, copyrighted text, real photographs, real staff names, or real statistics were used.  
- Where the reference relied on real services (e.g., live RSS feed aggregation, comment system, ad serving), we simulated with static data or omitted and noted the deviation.

## Page‑by‑Page Notes

### index.html (Homepage)
- **Replicated:** Header with site name, primary navigation to sections, newsletter signup section, layout with main content area.  
- **Approximated:** The hero/latest tabs area mimics a typical news homepage layout with featured articles.  
- **Simulated:** Article cards use inline placeholder data; no live feed.  
- **Intentional addition:** Search form in header (inferred typical news site feature).  
- **Omitted:** Real‑time breaking news ticker, weather widget, advertisement slots.  
- **Unverified:** Visual exact match to source (we only have HTTP evidence, no rendering).

### seattle-news.html, business.html, sports.html, nation-world.html (Section Fronts)
- **Replicated:** Breadcrumb navigation, section title, grid/list of article cards, newsletter signup.  
- **Approximated:** Use of tabs for “Latest” / “Most Read” (inferred common pattern).  
- **Simulated:** Article data is static arrays; no live article feed.  
- **Intentional addition:** Search form in header (same as homepage).  
- **Omitted:** Infinite scroll, pagination beyond first set, comment sections, real‑time updating lists.  
- **Unverified:** Exact ordering or selection of articles on the live site.

### seattle-i-5-express-lanes-closed.html (Sample Article)
- **Replicated:** Article headline, timestamp, lead image placeholder, body paragraphs, related stories aside.  
- **Approximated:** Layout similar to a typical article page (header, article, footer).  
- **Simulated:** All text is fictional; image is SVG placeholder.  
- **Intentional addition:** None beyond standard article structure.  
- **Omitted:** Comment system, social sharing widgets, embedded multimedia, advertisements.  
- **Unverified:** Exact visual styling of the source article page.

### subscribe-signup-offers-subsource-voluntary.html (Subscription Page)
- **Replicated:** Newsletter signup form, subscription plan selection form.  
- **Approximated:** Presentation of plan options and benefits.  
- **Simulated:** Form submission shows a modal with fictional confirmation; no real payment processing.  
- **Intentional addition:** Modal dialog for demo confirmation (to avoid implying a real transaction).  
- **Omitted:** Actual payment gateway, account creation, authentication, real pricing from source.  
- **Unverified:** Exact copy of the source’s subscription offer text and layout.

### help.html (Help/FAQ)
- **Replicated:** FAQ format with questions and answers, contact information section.  
- **Approximated:** Grouping of common help topics.  
- **Simulated:** All answers are original and fictional; no live support system.  
- **Intentional addition:** None.  
- **Omitted:** Live chat, ticket‑submission form, searchable knowledge base.  
- **Unverified:** Exact match to source FAQ content.

### newsroom-staff.html (Newsroom Staff)
- **Replicated:** Staff grid with name, role, placeholder photo, short bio.  
- **Approximated:** Layout similar to a typical staff directory.  
- **Simulated:** All staff names, roles, and bios are fictional; photos are SVG placeholders.  
- **Intentional addition:** None.  
- **Omitted:** Detailed biographies, social media links, filter/search functionality.  
- **Unverified:** Exact ordering or staff list from source.

### rss-feeds.html (RSS Feeds)
- **Replicated:** Listing of RSS feed URLs with brief descriptions.  
- **Approximated:** Simple list format typical of RSS directories.  
- **Simulated:** All feed URLs and descriptions are fictional; no actual feed parsing.  
- **Intentional addition:** None.  
- **Omitted:** Ability to subscribe via one‑click, feed preview, categorization beyond section feeds.  
- **Unverified:** Exact list of feeds offered by the source.

### 404.html
- **Replicated:** Standard “Page not found” message with link to homepage.  
- **Approximated:** Simple layout consistent with site footer/header.  
- **Simulated:** None.  
- **Intentional addition:** None.  
- **Omitted:** Search box, suggested links, site map.  
- **Unverified:** Exact wording or design from source (source may not have a custom 404).

## Component‑Level Notes

### site-header
- **Replicated:** Site name, skip link, search form (inferred).  
- **Approximated:** Background color and spacing inspired by typical news site headers.  
- **Simulated:** Search form does not connect to backend.  
- **Intentional addition:** Search form (inferred typical feature).  
- **Omitted:** Real logo, navigation menus for user account, weather widget.  
- **Unverified:** Exact height, font sizes, colors.

### primary-nav
- **Replicated:** Links to section fronts and static pages (Local News, Business, Sports, Nation & World, Subscribe, Help, Newsroom Staff, RSS Feeds).  
- **Approximated:** Horizontal list that wraps on narrow screens.  
- **Simulated:** No dynamic highlighting beyond `aria-current`.  
- **Intentional addition:** None.  
- **Omitted:** Dropdown mega‑menus, sub‑sections, advertisement links.  
- **Unverified:** Exact order or inclusion of all source sections (source has many more sections not mapped).

### site-footer
- **Replicated:** Copyright notice, fictional address, placeholder policy links.  
- **Approximated:** Simple single‑column footer.  
- **Simulated:** Links are placeholders (`#`).  
- **Intentional addition:** None.  
- **Omitted:** Social media icons, newsletter signup, site map, multiple columns.  
- **Unverified:** Exact styling or content.

### breadcrumb
- **Replicated:** Shows hierarchy (Home > Section > Article where applicable).  
- **Approximated:** Simple list with separators.  
- **Simulated:** No microdata/RDFa.  
- **Intentional addition:** None.  
- **Omitted:** Rich schema markup.  
- **Unverified:** Exact styling.

### article-card
- **Replicated:** Image placeholder, title, timestamp, short summary, read‑more link.  
- **Approximated:** Consistent card layout across sections.  
- **Simulated:** All content is fictional; image is SVG placeholder.  
- **Intentional addition:** None.  
- **Omitted:** Author byline, tags, comment count, reaction buttons.  
- **Unverified:** Exact dimensions or hover effects.

### latest-tabs
- **Replicated:** Two tabs (Latest / Most Read) that toggle associated article lists.  
- **Approximated:** Common pattern seen on news section fronts.  
- **Simulated:** Tab content is static arrays; no live sorting.  
- **Intentional addition:** Inferred typical feature.  
- **Omitted:** More than two tabs, AJAX loading, persistent tab state via URL hash.  
- **Unverified:** Exact visual styling or animation.

### newsletter-signup
- **Replicated:** Email input, submit button, inline validation messages, focus movement on success/error.  
- **Approximated:** Straight‑forward signup form.  
- **Simulated:** Submission logs to console only; no actual list storage.  
- **Intentional addition:** None.  
- **Omitted:** Double opt‑in, privacy policy link, reCAPTCHA.  
- **Unverified:** Exact error messages or success copy from source.

### subscription-form
- **Replicated:** Plan selection, name and email inputs, submit button.  
- **Approximated:** Typical subscription checkout flow (simulated).  
- **Simulated:** Modal shows fictional confirmation; no payment processing, no account creation.  
- **Intentional addition:** Modal dialog to avoid implying a real transaction.  
- **Omitted:** Payment gateway, address fields, promotional codes, terms‑and‑conditions checkbox.  
- **Unverified:** Exact plan names, pricing, or benefits from source.

### search-form (inferred addition)
- **Replicated:** Input type="search", submit button, label hidden for accessibility.  
- **Approximated:** Placed in header, works on all pages.  
- **Simulated:** Filters inline article data; no backend search.  
- **Intentional addition:** Added because typical news sites include search, though not observed in the fetched markup.  
- **Omitted:** Search filters, autocomplete, advanced search, search results page with pagination.  
- **Unverified:** Exact behavior or placement on source site.

### staff-card
- **Replicated:** Placeholder image, name, role, short bio.  
- **Approximated:** Uniform card layout in a grid.  
- **Simulated:** All data fictional; image is SVG placeholder.  
- **Intentional addition:** None.  
- **Omitted:** Social media links, detailed biography, contact form.  
- **Unverified:** Exact styling or ordering.

### rss-item
- **Replicated:** Feed title, URL, description, subscribe link.  
- **Approximated:** Simple list item.  
- **Simulated:** URLs and descriptions are fictional; link does not perform actual subscription.  
- **Intentional addition:** None.  
- **Omitted:** Feed preview, item count, categorization by topic.  
- **Unverified:** Exact list from source.

### faq-item & contact-info (help.html)
- **Replicated:** Question/answer pairs, contact details.  
- **Approximated:** Straight‑forward FAQ layout.  
- **Simulated:** All content fictional.  
- **Intentional addition:** None.  
- **Omitted:** Accordion behavior, live chat, support ticket form.  
- **Unverified:** Exact wording or grouping.

### modal (subscription confirmation)
- **Replicated:** Dialog with close button, modal‑background, focus trap on open, return focus on close.  
- **Approximated:** Accessible modal pattern.  
- **Simulated:** Content is purely fictional confirmation.  
- **Intentional addition:** Added to simulate subscription outcome without implying a real transaction.  
- **Omitted:** Underlying form submission to server, validation of real data.  
- **Unverified:** Exact styling or animation from source (source likely does not have a modal for subscription confirmation).

## Overall Deviations
- All visual design (colors, typography, spacing) is original; we did not attempt to copy the source’s exact look.  
- No third‑party resources, web fonts, or external libraries are used.  
- All interactive features work with inline data only; no network requests are made.  
- Where the source likely uses server‑side rendering or APIs, we substituted static simulations and marked them as such.  
- No accessibility defects were intentionally introduced; we aimed for WCAG 2.2 AA baseline (skip link, landmarks, heading order, labels, focus indicators, etc.).  

---  
*These notes are intended for researchers to understand what was replicated, approximated, simulated, added, omitted, or left unverified in this replica.*  
