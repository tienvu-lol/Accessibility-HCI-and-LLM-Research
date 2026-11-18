# Fidelity Notes – PORT‑08 (Ava Portfolio)

## General Approach
- Replicated information architecture, layout patterns, hierarchy, navigation structure, and interaction patterns from the source where observable.
- Used fictional organization name, original prose, and original placeholder artwork (SVGs).
- No real logos, trademarks, copyrighted text, or real photographs were used.
- Where source markup did not reveal a feature (e.g., hero, sidebar, footer groups, legal pages), those were omitted and noted as unverified/omitted.
- Interactions inferred from the source (filtering, gallery, responsive nav, contact form, reduced‑motion) were implemented as simulations with clear demo outcomes.

## Page‑by‑Page

### index.html (Home)
- **Replicated:** Header, navigation, main section with heading, introductory text, and a three‑card featured‑projects section.
- **Approximated:** Hero section replaced with a simple SVG placeholder and tagline (source hero not visible in fetched markup).
- **Intentionally Added:** None beyond the placeholder hero.
- **Omitted:** Sidebar and footer groups (not visible in source); legal pages.
- **Unverified:** Visual styling of hero, exact card layout, and any hidden sections.

### courses.html
- **Replicated:** Page heading, project filter controls (inferred), project grid.
- **Approximated:** Filter categories derived from typical topics; project data fabricated.
- **Simulated:** Filtering logic runs client‑side on inline `PROJECTS` array; no server call.
- **Omitted:** Any hidden sidebar or promotional sections not in source.
- **Unverified:** Exact appearance of filter UI and project cards.

### about.html
- **Replicated:** Heading, bio paragraph, skills list.
- **Approximated:** Bio text and skill items are original placeholders.
- **Omitted:** Any testimonials or external links not visible.
- **Unverified:** Precise styling of skills section.

### blog.html
- **Replicated:** Heading, list of blog post cards.
- **Approximated:** Post titles, dates, and excerpts are fabricated.
- **Simulated:** No actual blog backend; data is inline array.
- **Omitted:** Pagination, sidebar widgets, comment sections.
- **Unverified:** Exact card layout and metadata display.

### tips.html
- **Replicated:** Heading, list of tip cards.
- **Approximated:** Tips are original accessibility‑focused statements.
- **Simulated:** None beyond static list.
- **Omitted:** Any categorization or search.
- **Unverified:** Visual treatment of tips.

### javascript.html
- **Replicated:** Heading, series of article‑style notes on modern JavaScript features.
- **Approximated:** Code examples and explanations are original.
- **Omitted:** Interactive code playgrounds.
- **Unverified:** Styling of code blocks.

### speaking-and-training.html
- **Replicated:** Heading, list of event cards.
- **Approximated:** Event names, dates, locations, and slide URLs are placeholders.
- **Simulated:** None.
- **Omitted:** Video embeds, ticket links.
- **Unverified:** Card layout details.

### uses.html
- **Replicated:** Heading, grid of technology‑stack icons.
- **Approximated:** Icon SVGs are placeholders; usage notes are original.
- **Simulated:** Lightbox gallery interaction (click icon → enlarged SVG placeholder).
- **Omitted:** Any detailed descriptions, download links, or affiliate badges.
- **Unverified:** Exact icon sizes and hover effects.

### contact.html
- **Replicated:** Heading, contact form with name, email, message fields, and submit button.
- **Approximated:** Form labels and placeholder text are original.
- **Simulated:** Form submission prevented; demo toast shown.
- **Omitted:** CAPTCHA, newsletter signup, social‑media links.
- **Unverified:** Visual styling of form and success message.

### 404.html
- **Added:** Standard “Page not found” page (not in source but required by category checklist).
- **Content:** Simple message and link to home.

## Component‑Level Notes

| Component | Replicated? | Notes |
|-----------|-------------|-------|
| site-header | Yes | Logo and nav toggle match source pattern. |
| site-logo | Yes | Text‑only logo “Ava Portfolio”. |
| primary-nav | Yes | Horizontal list; becomes hamburger on narrow screens. |
| nav-toggle | Yes | Button with `aria-controls` and `aria-expanded`. |
| site-footer | Yes | Minimal copyright text. |
| page-title | Yes | Wraps `<h1>` unique to each page. |
| card-grid | Yes | Used for projects, posts, tips, events, tech stack. |
| card | Yes | Consistent card layout with image, title, description, link. |
| project-filter | Yes (inferred) | Checkbox group; filters project cards client‑side. |
| gallery-lightbox | Yes (inferred) | Lightbox dialog for tech‑stack icons; ESC closes, focus returns. |
| contact-form | Yes (inferred) | Form with validation; demo submission toast. |
| hero | Approximated | Simple SVG placeholder; source hero not visible. |
| intro | Yes | Introductory paragraph after hero. |
| featured-projects | Yes | Three static cards on home. |
| bio | Yes | About page biography. |
| skills | Yes | About page skill list. |
| post-list | Yes | Blog page listing. |
| tip-list | Yes | Tips page listing. |
| js-reference | Yes | JavaScript notes page. |
| event-list | Yes | Speaking‑and‑training page listing. |
| tech-stack | Yes | Uses page icon grid. |
| skip-link | Yes | First focusable element, visible on focus. |

## Intentional Additions
- None beyond placeholders and simulations required to make the site functional and demonstrative.

## Omitted Items (with Reason)
- Hero section, sidebar, and footer groups: not present in fetched markup; omitted per guidance.
- Legal pages (privacy, terms): omitted per category guidance.
- Any interactive component whose markup was not visible (filtering, gallery, contact form): implemented as simulations and labeled as such.

## Unverified Items
- Exact visual styling of hero, cards, nav, and footer groups (source not visible).
- Precise dimensions and spacing of components.
- Any hidden sections that might exist in the source but were not captured in the static HTML.

---  
*End of fidelity notes.*  
