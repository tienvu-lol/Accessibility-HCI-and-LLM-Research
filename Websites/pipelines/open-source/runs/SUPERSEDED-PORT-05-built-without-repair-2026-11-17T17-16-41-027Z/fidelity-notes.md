# Fidelity Notes

## General Deviations
- **Identity:** The source uses "Joshua Atkinson" / "Joshua Tzucker". This replica uses "Alex Morgan" as a fictional name. All prose, project descriptions, and blog content are original.
- **Technology:** The source uses Gatsby/Svelte/React/Node. This replica uses pure HTML5, CSS3, and Vanilla JS. No build step, no frameworks.
- **Data:** The source likely pulls data from a CMS or JSON files. This replica uses inline JavaScript arrays for all sample data.

## Page-by-Page Notes

### `index.html` (Home)
- **Replicated:** Header, navigation, hero section, featured projects grid, contact form.
- **Approximated:** The contact form is a simulation. The source had a "support-me" link but no visible contact form in the evidence. I added a contact form as it is a standard portfolio feature and explicitly listed in category requirements.
- **Intentional Addition:** "Back to top" button.

### `projects.html` (Projects Index)
- **Replicated:** Project grid, category filtering.
- **Simulated:** Filtering is implemented via client-side JS showing/hiding cards. The source evidence did not show the filtering mechanism explicitly, but category pages exist, implying categorization.

### `projects-*.html` (Category Pages)
- **Replicated:** Category-specific headers, filtered project grids.
- **Note:** Each category page pre-selects its filter button via `aria-pressed="true"`.

### `mini-tools.html`
- **Replicated:** Grid of tool cards.
- **Note:** Tools are linked to `#` as they are simulated utilities.

### `blog.html` & `all-posts.html`
- **Replicated:** Blog post lists, archive structure.
- **Note:** `all-posts.html` uses a simple list archive, approximating the source's "All Posts" page.

### Project Detail Pages (`projects-applications-git-date-extractor...`, `projects-web-stuff-cheatsheets...`)
- **Replicated:** Title, description, features, installation/usage code blocks, support link.
- **Simulated:** Code blocks and installation instructions are fictional but plausible for the project types.

### Blog Post Pages (`posts-2023-...`)
- **Replicated:** Title, date, content sections, headings.
- **Note:** Content is original prose summarizing the topics mentioned in the source titles.

### `404.html`
- **Intentional Addition:** Not present in the source page map but required by category standards for error handling.

## Component Notes
- **Navigation:** Fully responsive. Mobile menu uses `aria-expanded` and Escape key to close.
- **Filtering:** Uses `data-category` attributes on cards and buttons.
- **Forms:** Contact form includes validation, error summary, and focus management.

## Unverified Items
- Source visual layout was not inspected. Layout is approximated based on standard portfolio patterns and the observed regions (Header, Nav, Content, Footer).
- Source interactions (filtering, contact) were inferred.
