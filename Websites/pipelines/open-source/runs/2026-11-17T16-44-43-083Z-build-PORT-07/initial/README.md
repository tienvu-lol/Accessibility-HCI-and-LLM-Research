# Replica: PORT-07

## Metadata
- **Replica ID:** PORT-07
- **Category:** portfolio (Personal and creative portfolios)
- **Fictional Branding:** Alex Morgan's Portfolio
- **Approved Source URL:** https://joshuatz.com/
- **Verification Method:** HTTP GET by the orchestrator
- **Verification Date:** 2026-11-16
- **Source Verified At:** 2026-11-16
- **Source Approved At:** 2026-11-17
- **Approved By:** Samhith Varma Yallamraju

## How to Open Locally
Open `index.html` in any modern web browser. No server is required. All assets are local.

## Sitemap
1. `index.html` - Home
2. `projects.html` - Projects Index
3. `projects-applications.html` - Projects: Applications
4. `projects-electronics.html` - Projects: Electronics
5. `projects-marketing.html` - Projects: Marketing
6. `projects-other.html` - Projects: Other
7. `projects-web-stuff.html` - Projects: Web Stuff
8. `mini-tools.html` - Mini-Tools
9. `blog.html` - Blog Posts
10. `all-posts.html` - All Posts
11. `projects-applications-git-date-extractor-npm-package-and-cli-tool.html` - Project Detail: Git-Date-Extractor
12. `projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html` - Project Detail: Cheatsheets
13. `posts-2023-what-makes-svelte-so-great-features-and-comparisons.html` - Blog Post: Svelte
14. `posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html` - Blog Post: Heredocs
15. `404.html` - Error Page

## Page-to-Source Mapping
- `index.html` -> `https://joshuatz.com/`
- `projects.html` -> `https://joshuatz.com/projects/`
- `projects-applications.html` -> `https://joshuatz.com/projects/applications/`
- `projects-electronics.html` -> `https://joshuatz.com/projects/electronics/`
- `projects-marketing.html` -> `https://joshuatz.com/projects/marketing/`
- `projects-other.html` -> `https://joshuatz.com/projects/other/`
- `projects-web-stuff.html` -> `https://joshuatz.com/projects/web-stuff/`
- `mini-tools.html` -> `https://joshuatz.com/mini-tools/`
- `blog.html` -> `https://joshuatz.com/blog/`
- `all-posts.html` -> `https://joshuatz.com/all-posts/`
- `projects-applications-git-date-extractor-npm-package-and-cli-tool.html` -> `https://joshuatz.com/projects/applications/git-date-extractor-npm-package-and-cli-tool/`
- `projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html` -> `https://joshuatz.com/projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site/`
- `posts-2023-what-makes-svelte-so-great-features-and-comparisons.html` -> `https://joshuatz.com/posts/2023/what-makes-svelte-so-great-features-and-comparisons/`
- `posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html` -> `https://joshuatz.com/posts/2023/shell-heredocs-productive-fun-bash-and-beyond/`
- `404.html` -> Not in source (intentional addition)

## Sample Datasets
- `projectsData`: 12 items
- `blogPostsData`: 8 items
- `miniToolsData`: 6 items

## Interactions and Simulations
- **Navigation:** Responsive hamburger menu with focus trapping.
- **Filtering:** Client-side category filtering on project pages.
- **Contact:** Inline form simulation with validation and success message.
- **Back to Top:** Button appears on scroll, respects `prefers-reduced-motion`.
- **Simulations:** Contact form submission is simulated; no real data is sent.

## QC Gates (Rules.md Section 9)
1. **HTML Validity:** not-tested
2. **CSS Validity:** not-tested
3. **JS Validity:** not-tested
4. **Accessibility (WCAG 2.2 AA):** not-tested
5. **Performance:** not-tested
6. **Security:** not-tested
7. **Usability:** not-tested

## Limitations
- Screen readers, zoom, manual keyboard walkthroughs, and non-Chromium browsers were not tested.
- Source was verified via HTTP GET only; no visual inspection or interaction testing was performed.
- Some inferred interactions (filtering, contact) were implemented based on page structure but not explicitly observed in markup snippets.
