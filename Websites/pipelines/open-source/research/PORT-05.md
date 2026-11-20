# PORT-05 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-47-24-007Z-research-PORT-05`
- **Scope:** partial — this file covers PORT-05 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/3 candidate homepages and 14/14 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/PORT-05-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### PORT-05

- `source_id`: PORT-05
- `subcategory`: minimal one-page personal site
- `source_name`: Joshua Atkinson
- `official_url`: https://joshuatz.com/
- `verified_at`: 2024-05-22 (HTTP GET by the orchestrator)
- `verification_result`: verified
- `source_pages`:
  - `https://joshuatz.com/` — "Home - Joshua Tzucker's Site" — `index.html`
  - `https://joshuatz.com/projects/` — "Projects - Joshua Tzucker's Site" — `projects/index.html`
  - `https://joshuatz.com/projects/applications/` — "Projects - applications - Joshua Tzucker's Site" — `projects/applications/index.html`
  - `https://joshuatz.com/projects/electronics/` — "Projects - electronics - Joshua Tzucker's Site" — `projects/electronics/index.html`
  - `https://joshuatz.com/projects/marketing/` — "Projects - marketing - Joshua Tzucker's Site" — `projects/marketing/index.html`
  - `https://joshuatz.com/projects/other/` — "Projects - other - Joshua Tzucker's Site" — `projects/other/index.html`
  - `https://joshuatz.com/projects/web-stuff/` — "Projects - web-stuff - Joshua Tzucker's Site" — `projects/web-stuff/index.html`
  - `https://joshuatz.com/mini-tools/` — "Assorted Mini-Tools - Joshua Tzucker's Site" — `mini-tools/index.html`
  - `https://joshuatz.com/blog/` — "Blog Posts - Joshua Tzucker's Site" — `blog/index.html`
  - `https://joshuatz.com/projects/applications/git-date-extractor-npm-package-and-cli-tool/` — "Git-Date-Extractor NPM Package and CLI Tool" — `projects/applications/git-date-extractor-npm-package-and-cli-tool.html`
  - `https://joshuatz.com/projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site/` — "Cheatsheets and Snippets - Markdown Powered Gatsby Mini Site" — `projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html`
  - `https://joshuatz.com/posts/2023/what-makes-svelte-so-great-features-and-comparisons/` — "What Makes Svelte So Great - Features and Comparisons" — `posts/2023/what-makes-svelte-so-great-features-and-comparisons.html`
  - `https://joshuatz.com/posts/2023/shell-heredocs-productive-fun-bash-and-beyond/` — "Shell Heredocs - for Fun and Profit, in Bash and Beyond" — `posts/2023/shell-heredocs-productive-fun-bash-and-beyond.html`
  - `https://joshuatz.com/all-posts/` — "All Posts - Joshua Tzucker's Site" — `all-posts/index.html`
- `key_regions`: Header (logo/name "Joshuatz.com"), Navigation (list of categories: All, Applications, Electronics, Marketing, Other, Web Stuff, Mini Tools, Blog), Content Area (project listings, blog post lists, or detailed project/blog content), Footer (inferred from standard structure, though not explicitly detailed in nav/other links).
- `key_interactions`:
  - `Navigation`: observed (links present in all fetched pages)
  - `Filtering`: inferred (category pages exist, but filtering mechanism not explicitly seen in markup snippets)
  - `Contact`: inferred (no form seen, but `support-me` link exists on detail pages)
- `complexity`: medium (Multiple pages, categories, blog, projects)
- `stack_clues`: `gatsby`, `svelte`, `react`, `nodejs`, `typescript` tags present in markup
- `limitations`: None for the mapped pages.

```json
{"rows": [{"source_id": "PORT-05", "subcategory": "minimal one-page personal site", "source_name": "Joshua Atkinson", "source_url": "https://joshuatz.com/", "verified_at": "2024-05-22", "verification_method": "HTTP GET by the orchestrator", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://joshuatz.com/", "title": "Home - Joshua Tzucker's Site", "local_file": "index.html"}, {"url": "https://joshuatz.com/projects/", "title": "Projects - Joshua Tzucker's Site", "local_file": "projects/index.html"}, {"url": "https://joshuatz.com/projects/applications/", "title": "Projects - applications - Joshua Tzucker's Site", "local_file": "projects/applications/index.html"}, {"url": "https://joshuatz.com/projects/electronics/", "title": "Projects - electronics - Joshua Tzucker's Site", "local_file": "projects/electronics/index.html"}, {"url": "https://joshuatz.com/projects/marketing/", "title": "Projects - marketing - Joshua Tzucker's Site", "local_file": "projects/marketing/index.html"}, {"url": "https://joshuatz.com/projects/other/", "title": "Projects - other - Joshua Tzucker's Site", "local_file": "projects/other/index.html"}, {"url": "https://joshuatz.com/projects/web-stuff/", "title": "Projects - web-stuff - Joshua Tzucker's Site", "local_file": "projects/web-stuff/index.html"}, {"url": "https://joshuatz.com/mini-tools/", "title": "Assorted Mini-Tools - Joshua Tzucker's Site", "local_file": "mini-tools/index.html"}, {"url": "https://joshuatz.com/blog/", "title": "Blog Posts - Joshua Tzucker's Site", "local_file": "blog/index.html"}, {"url": "https://joshuatz.com/projects/applications/git-date-extractor-npm-package-and-cli-tool/", "title": "Git-Date-Extractor NPM Package and CLI Tool", "local_file": "projects/applications/git-date-extractor-npm-package-and-cli-tool.html"}, {"url": "https://joshuatz.com/projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site/", "title": "Cheatsheets and Snippets - Markdown Powered Gatsby Mini Site", "local_file": "projects/web-stuff/cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html"}, {"url": "https://joshuatz.com/posts/2023/what-makes-svelte-so-great-features-and-comparisons/", "title": "What Makes Svelte So Great - Features and Comparisons", "local_file": "posts/2023/what-makes-svelte-so-great-features-and-comparisons.html"}, {"url": "https://joshuatz.com/posts/2023/shell-heredocs-productive-fun-bash-and-beyond/", "title": "Shell Heredocs - for Fun and Profit, in Bash and Beyond", "local_file": "posts/2023/shell-heredocs-productive-fun-bash-and-beyond.html"}, {"url": "https://joshuatz.com/all-posts/", "title": "All Posts - Joshua Tzucker's Site", "local_file": "all-posts/index.html"}], "key_regions": ["Header", "Navigation", "Content Area", "Footer"], "key_interactions": [{"name": "Navigation", "evidence": "observed", "notes": "Links present in all fetched pages"}, {"name": "Filtering", "evidence": "inferred", "notes": "Category pages exist, but filtering mechanism not explicitly seen in markup snippets"}, {"name": "Contact", "evidence": "inferred", "notes": "No form seen, but support-me link exists on detail pages"}], "complexity": "medium", "stack_clues": "gatsby, svelte, react, nodejs, typescript tags present", "limitations": "None for the mapped pages."}]}
```
