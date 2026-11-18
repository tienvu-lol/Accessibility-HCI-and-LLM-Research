# PORT-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-07-10-590Z-research-PORT-10`
- **Scope:** partial — this file covers PORT-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 11/11 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/PORT-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### PORT-10
{
  "source_id": "PORT-10",
  "subcategory": "additional distinct software developer / engineer (complexity‑matched reserve)",
  "source_name": "Kent C. Dodds",
  "official_url": "https://kentcdodds.com",
  "verified_at": "",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://kentcdodds.com",
      "title": "Kent C. Dodds",
      "local_file": "index.html"
    },
    {
      "url": "https://kentcdodds.com/blog",
      "title": "The Kent C. Dodds Blog",
      "local_file": "blog.html"
    },
    {
      "url": "https://kentcdodds.com/talks",
      "title": "90 talks by Kent all about software development",
      "local_file": "talks.html"
    },
    {
      "url": "https://kentcdodds.com/courses",
      "title": "Courses by Kent C. Dodds",
      "local_file": "courses.html"
    },
    {
      "url": "https://kentcdodds.com/about",
      "title": "About Kent C. Dodds",
      "local_file": "about.html"
    },
    {
      "url": "https://kentcdodds.com/contact",
      "title": "Contact Kent C. Dodds",
      "local_file": "contact.html"
    },
    {
      "url": "https://kentcdodds.com/resume",
      "title": "Kent C. Dodds' Resume",
      "local_file": "resume.html"
    },
    {
      "url": "https://kentcdodds.com/office-hours",
      "title": "KCD Office Hours",
      "local_file": "office-hours.html"
    },
    {
      "url": "https://kentcdodds.com/transparency",
      "title": "Transparency",
      "local_file": "transparency.html"
    },
    {
      "url": "https://kentcdodds.com/testimonials",
      "title": "56 testimonials about Kent C. Dodds",
      "local_file": "testimonials.html"
    }
  ],
  "key_regions": [
    "header",
    "navigation",
    "hero (inferred)",
    "content band",
    "sidebar (inferred)",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "project filtering",
      "evidence": "inferred",
      "notes": "No project‑index page was fetched; cannot confirm."
    },
    {
      "name": "gallery / lightbox navigation",
      "evidence": "inferred",
      "notes": "No gallery pages observed in the fetched set."
    },
    {
      "name": "responsive navigation",
      "evidence": "inferred",
      "notes": "Responsive behavior not visible in static markup."
    },
    {
      "name": "contact inquiry",
      "evidence": "inferred",
      "notes": "Contact page exists but form markup not inspected."
    },
    {
      "name": "reduced‑motion handling",
      "evidence": "inferred",
      "notes": "No CSS or script evidence available."
    }
  ],
  "complexity": "medium",
  "stack_clues": "unknown",
  "limitations": "Pages such as /search, /login, and other utility endpoints were fetched but are not part of the portfolio content architecture and therefore omitted from the page map."
}

```json
{
  "rows": [
    {
      "source_id": "PORT-10",
      "subcategory": "additional distinct software developer / engineer (complexity‑matched reserve)",
      "source_name": "Kent C. Dodds",
      "source_url": "https://kentcdodds.com",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        { "url": "https://kentcdodds.com", "title": "Kent C. Dodds", "local_file": "index.html" },
        { "url": "https://kentcdodds.com/blog", "title": "The Kent C. Dodds Blog", "local_file": "blog.html" },
        { "url": "https://kentcdodds.com/talks", "title": "90 talks by Kent all about software development", "local_file": "talks.html" },
        { "url": "https://kentcdodds.com/courses", "title": "Courses by Kent C. Dodds", "local_file": "courses.html" },
        { "url": "https://kentcdodds.com/about", "title": "About Kent C. Dodds", "local_file": "about.html" },
        { "url": "https://kentcdodds.com/contact", "title": "Contact Kent C. Dodds", "local_file": "contact.html" },
        { "url": "https://kentcdodds.com/resume", "title": "Kent C. Dodds' Resume", "local_file": "resume.html" },
        { "url": "https://kentcdodds.com/office-hours", "title": "KCD Office Hours", "local_file": "office-hours.html" },
        { "url": "https://kentcdodds.com/transparency", "title": "Transparency", "local_file": "transparency.html" },
        { "url": "https://kentcdodds.com/testimonials", "title": "56 testimonials about Kent C. Dodds", "local_file": "testimonials.html" }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero (inferred)",
        "content band",
        "sidebar (inferred)",
        "footer"
      ],
      "key_interactions": [
        { "name": "project filtering", "evidence": "inferred", "notes": "No project‑index page was fetched; cannot confirm." },
        { "name": "gallery / lightbox navigation", "evidence": "inferred", "notes": "No gallery pages observed in the fetched set." },
        { "name": "responsive navigation", "evidence": "inferred", "notes": "Responsive behavior not visible in static markup." },
        { "name": "contact inquiry", "evidence": "inferred", "notes": "Contact page exists but form markup not inspected." },
        { "name": "reduced‑motion handling", "evidence": "inferred", "notes": "No CSS or script evidence available." }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Pages such as /search, /login, and other utility endpoints were fetched but are not part of the portfolio content architecture and therefore omitted from the page map."
    }
  ]
}
```
