# Fidelity Notes

## General
- **Fictional Branding**: "Atlas Digital" replaces "Joshua Atkinson".
- **Content**: All text is original prose. No real logos, photos, or statistics are used.
- **Data**: All project and blog data is inlined in `js/main.js` as JavaScript arrays.

## Page-by-Page Notes

### `index.html`
- **Replicated**: Header, navigation, hero section, featured projects grid, footer.
- **Intentional Addition**: Contact form (`#contact-form`). The source has a "support-me" link but no visible form. This is added per category requirements for a contact inquiry simulation.
- **Interaction**: Contact form submission is simulated with a timeout and success state.

### `projects.html`
- **Replicated**: Header, navigation, title, project grid.
- **Interaction**: Category filtering buttons. The source has category pages, implying filtering. Here, filtering is client-side via JS.
- **Data**: 12 projects inlined.

### `projects-applications.html`, `projects-electronics.html`, `projects-marketing.html`, `projects-other.html`, `projects-web-stuff.html`
- **Replicated**: Header, navigation, title, project grid.
- **Interaction**: These pages are pre-filtered by JS to show only the relevant category. The filtering buttons are not present on these specific pages to keep them simple, but the data is filtered.
- **Data**: Filtered subset of the 12 projects.

### `mini-tools.html`
- **Replicated**: Header, navigation, title, tool grid.
- **Data**: 6 mini-tools inlined.

### `blog.html`
- **Replicated**: Header, navigation, title, blog post list.
- **Interaction**: Year filter dropdown.
- **Data**: 10 blog posts inlined.

### `projects-applications-git-date-extractor-npm-package-and-cli-tool.html`
- **Replicated**: Header, navigation, project detail layout (title, description, metadata).
- **Content**: Original prose based on the source title.

### `projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html`
- **Replicated**: Header, navigation, project detail layout.
- **Content**: Original prose based on the source title.

### `posts-2023-what-makes-svelte-so-great-features-and-comparisons.html`
- **Replicated**: Header, navigation, blog post detail layout (title, date, content).
- **Content**: Original prose based on the source title.

### `posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html`
- **Replicated**: Header, navigation, blog post detail layout.
- **Content**: Original prose based on the source title.

### `all-posts.html`
- **Replicated**: Header, navigation, title, full list of blog posts.
- **Data**: All 10 blog posts.

### `404.html`
- **Replicated**: Header, navigation, footer.
- **Content**: Standard 404 message.

## Component Notes
- **Filtering**: Implemented via vanilla JS in `main.js`. No server-side filtering.
- **Contact Form**: Simulation only. No data is sent anywhere.
- **Reduced Motion**: CSS media query `prefers-reduced-motion` is respected.
