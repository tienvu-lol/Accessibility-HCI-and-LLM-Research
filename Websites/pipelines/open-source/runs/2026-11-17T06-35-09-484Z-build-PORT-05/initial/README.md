# Portfolio Replica — PORT-05

## Replica Information
- **Replica ID**: PORT-05
- **Category**: Personal and creative portfolios
- **Fictional Branding**: Alex Mercer — Creative Developer & Digital Craftsman
- **Approved Source**: https://joshuatz.com/
- **Source Verified**: 2026-11-16 via HTTP GET by the orchestrator
- **Verification Method**: HTTP GET by the orchestrator
- **Verification Result**: verified

## How to Open Locally
Open `index.html` in any modern browser using `file://` protocol. No server required. All assets are local.

## Sitemap
| Page | Local File | Source URL |
|------|------------|------------|
| Home | `index.html` | https://joshuatz.com/ |
| Projects | `projects.html` | https://joshuatz.com/projects/ |
| Projects - Applications | `projects-applications.html` | https://joshuatz.com/projects/applications/ |
| Projects - Electronics | `projects-electronics.html` | https://joshuatz.com/projects/electronics/ |
| Projects - Marketing | `projects-marketing.html` | https://joshuatz.com/projects/marketing/ |
| Projects - Other | `projects-other.html` | https://joshuatz.com/projects/other/ |
| Projects - Web Stuff | `projects-web-stuff.html` | https://joshuatz.com/projects/web-stuff/ |
| Mini-Tools | `mini-tools.html` | https://joshuatz.com/mini-tools/ |
| Blog | `blog.html` | https://joshuatz.com/blog/ |
| Project Detail - Git-Date-Extractor | `projects-applications-git-date-extractor-npm-package-and-cli-tool.html` | https://joshuatz.com/projects/applications/git-date-extractor-npm-package-and-cli-tool/ |
| Project Detail - Cheatsheets | `projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html` | https://joshuatz.com/projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site/ |
| Blog Post - Svelte | `posts-2023-what-makes-svelte-so-great-features-and-comparisons.html` | https://joshuatz.com/posts/2023/what-makes-svelte-so-great-features-and-comparisons/ |
| Blog Post - Heredocs | `posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html` | https://joshuatz.com/posts/2023/shell-heredocs-productive-fun-bash-and-beyond/ |
| All Posts | `all-posts.html` | https://joshuatz.com/all-posts/ |
| 404 | `404.html` | N/A (generated) |

## Page-to-Source Mapping
All 14 pages in the approved map are implemented. Each page replicates the information architecture, layout patterns, and navigation structure of the source.

## Sample Dataset Row Counts
- **Projects**: 12 rows (distributed across applications, electronics, marketing, other, web-stuff categories)
- **Blog Posts**: 10 rows (2 detailed posts + 8 generic placeholders)
- **Mini-Tools**: 6 rows

## Interactions and Simulation Notes
- **Navigation**: Responsive hamburger menu with `aria-expanded` and Escape-to-close (observed)
- **Filtering**: Client-side category filter on `projects.html` using inline data (inferred from category page structure)
- **Support Me**: Non-functional button on project detail pages triggering accessible live-region alert (inferred from support-me link)
- **Mini-Tools**: All tool buttons trigger simulation alerts labeled as such
- **Contact/Commerce**: No contact form or commerce implemented; labeled as non-functional demonstrations

## QC Gates (Rules.md Section 9)
1. **Structure**: not-tested
2. **Accessibility**: not-tested
3. **Performance**: not-tested
4. **Security**: not-tested
5. **SEO**: not-tested
6. **Compatibility**: not-tested
7. **Fidelity**: not-tested

## What Was Not Tested
Screen readers, zoom, manual keyboard walkthroughs, and non-Chromium browsers were not tested unless the orchestrator reports otherwise.
