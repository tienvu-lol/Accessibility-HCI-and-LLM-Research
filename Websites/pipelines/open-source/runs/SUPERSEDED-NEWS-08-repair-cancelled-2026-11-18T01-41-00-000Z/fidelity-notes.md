# Fidelity Notes – Cascadia Times Replica (NEWS-08)

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns from the approved source where evidence existed.
- Used fictional organization name, original prose, and original placeholder artwork (SVG).
- No real logos, trademarks, copyrighted text, real photographs, real staff, real testimonials, or real statistics were used.
- Where evidence was missing (inferred interactions), we implemented a clearly labelled simulation.
- Intentional additions are marked as such.

## Page‑by‑Page Notes

### index.html (home)
- **Replicated:** header with site logo, search form, menu button; primary navigation with sections; footer with section links; overall three‑column layout pattern.
- **Approximated:** hero carousel (featured articles) and latest/most‑read tabs – inferred common patterns; used sample data.
- **Simulated:** search form shows demo results; newsletter signup shows toast; subscription form shows modal (both labelled as demo).
- **Intentionally Added:** subscription modal (to demonstrate simulated subscription flow) – not observed in source but useful for interaction coverage.
- **Omitted:** any real-time breaking news ticker, weather widget, or live stock ticker (not in evidence).
- **Unverified:** visual exactness of spacing, font sizes, or color values – we used a reasonable baseline.

### Section Fronts (seattle-news.html, business.html, sports.html, nation-world.html)
- **Replicated:** header, navigation, breadcrumb, section heading, footer.
- **Approximated:** latest/most‑read tabs (inferred common pattern); article grid layout.
- **Simulated:** search, tabs switching content via script, newsletter promo.
- **Intentionally Added:** none beyond inferred tabs.
- **Omitted:** any section‑specific filters, author bios, or date‑based archives (not in evidence).
- **Unverified:** exact article ordering or styling of cards.

### Article Page (seattle-i-5-express-lanes-closed.html)
- **Replicated:** header, navigation, breadcrumb, article heading, byline, timestamp, body paragraph structure, footer with back link.
- **Approximated:** related articles section (inferred common pattern).
- **Simulated:** none beyond static content.
- **Intentionally Added:** placeholder images for layout.
- **Omitted:** comments section, social sharing embeds, related multimedia (not in evidence).
- **Unverified:** exact typographic details (e.g., line‑height, margin sizes).

### Subscribe Page (subscribe-signup-offers-subsource-voluntary.html)
- **Replicated:** header, navigation, breadcrumb, heading, newsletter promo, subscription options layout.
- **Approximated:** three subscription tiers (inferred typical offerings).
- **Simulated:** newsletter form (toast), subscription card selection (no real transaction).
- **Intentionally Added:** modal‑like subscription confirmation (not observed but added to demonstrate simulation).
- **Omitted:** actual payment gateway, account creation, real‑time price validation.
- **Unverified:** exact visual design of subscription cards.

### Help Page (help.html)
- **Replicated:** header, navigation, breadcrumb, heading, FAQ list, contact support section, footer.
- **Approximated:** FAQ format (common pattern).
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** live chat, ticket‑forming widget.
- **Unverified:** exact styling of definition list.

### Newsroom Staff Page (newsroom-staff.html)
- **Replicated:** header, navigation, breadcrumb, heading, staff grid layout.
- **Approximated:** staff cards with placeholder images, name, title.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** real staff bios, social media links, filter/search.
- **Unverified:** exact card dimensions and hover effects.

### RSS Feeds Page (rss-feeds.html)
- **Replicated:** header, navigation, breadcrumb, heading, list of feeds.
- **Approximated:** simple unordered list of example feeds.
- **Simulated:** none (feeds are static placeholders).
- **Intentionally Added:** none.
- **Omitted:** live XML parsing, feed preview, subscription buttons.
- **Unverified:** exact visual treatment of list items.

### 404.html
- **Replicated:** header, navigation, footer, heading, message, link to home.
- **Approximated:** simple error page layout.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** suggested searches, popular links.
- **Unverified:** exact wording or styling.

## Component‑Level Notes

### site-header
- **Replicated:** logo, search form, menu button across all pages.
- **Approximated:** search placeholder text.
- **Simulated:** search yields demo results.
- **Intentionally Added:** none.
- **Omitted:** language selector, user login (not in evidence).
- **Unverified:** exact breakpoint for menu collapse.

### primary-nav
- **Replicated:** horizontal list of section links, ARIA‑current for active page.
- **Approximated:** none.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** sub‑menus, mega‑menu.
- **Unverified:** hover/focus colors exact match.

### site-footer
- **Replicated:** three‑column layout with section links and more links.
- **Approximated:** none.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** social media icons, newsletter signup (we placed promo elsewhere).
- **Unverified:** exact spacing and font size.

### breadcrumb
- **Replicated:** appears on interior pages (article, help, staff, rss, subscribe).
- **Approximated:** none.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** on home and section fronts (source did not show breadcrumbs there).
- **Unverified:** separator character.

### article-card
- **Replicated:** used in grids on section fronts, home carousel, related articles, staff grid, subscription cards.
- **Approximated:** image placeholder, title, excerpt.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** author badge, comment count, tags.
- **Unverified:** exact image ratio and text truncation.

### tabs (latest/most‑read)
- **Replicated:** inferred pattern on section fronts.
- **Approximated:** none.
- **Simulated:** content switching via script.
- **Intentionally Added:** none.
- **Omitted:** panel persistence, URL hash update.
- **Unverified:** exact indicator styling.

### newsletter-form / subscription-form
- **Replicated:** email input, submit button.
- **Approximated:** none.
- **Simulated:** toast (newsletter) and modal (subscription) on submit.
- **Intentionally Added:** subscription modal (to show simulated outcome).
- **Omitted:** real validation, server‑side processing.
- **Unverified:** exact error messaging styles.

### modal-backdrop & modal
- **Replicated:** used for subscription confirmation.
- **Approximated:** none.
- **Simulated:** none (pure demo).
- **Intentionally Added:** none.
- **Omitted:** focus trap, returning focus to trigger (we return focus via script on close).
- **Unverified:** animation duration, backdrop opacity.

### search-form
- **Replicated:** present in header.
- **Approximated:** none.
- **Simulated:** demo results on submit.
- **Intentionally Added:** none.
- **Omitted:** autocomplete, recent searches.
- **Unverified:** exact placeholder text.

### staff-card
- **Replicated:** grid on newsroom-staff.html.
- **Approximated:** placeholder image, name, title.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** bio snippet, social links.
- **Unverified:** exact card dimensions.

### feed-list (rss-feeds)
- **Replicated:** simple list of example feed URLs.
- **Approximated:** none.
- **Simulated:** none.
- **Intentionally Added:** none.
- **Omitted:** RSS icons, subscription buttons.
- **Unverified:** list styling.

## Summary of Deviations
- All deviations are either inferred interactions (clearly labelled as demo/simulation) or intentional additions marked in notes.
- No real copyrighted or trademarked content was used.
- The replica aims for structural and interaction fidelity, not pixel‑perfect visual match.
