# PORT-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-51-36-886Z-research-PORT-08`
- **Scope:** partial — this file covers PORT-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/PORT-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### PORT-08
- source_id: PORT-08
- subcategory: software developer / engineer
- source_name: Wes Bos
- official_url: https://wesbos.com/
- verified_at: date not provided in evidence; method: HTTP GET by the orchestrator
- verification_result: verified
- source_pages:
  - url: https://wesbos.com/
    title: Wes Bos
    local_file: index.html
  - url: https://wesbos.com/courses
    title: Courses - Wes Bos
    local_file: courses.html
  - url: https://wesbos.com/about
    title: About - Wes Bos
    local_file: about.html
  - url: https://wesbos.com/blog
    title: Blog - Wes Bos
    local_file: blog.html
  - url: https://wesbos.com/tips
    title: Tips - Wes Bos
    local_file: tips.html
  - url: https://wesbos.com/javascript
    title: Beginner JavaScript Notes & Reference - Wes Bos
    local_file: javascript.html
  - url: https://wesbos.com/speaking-and-training
    title: Speaking And Training - Wes Bos
    local_file: speaking-and-training.html
  - url: https://wesbos.com/uses
    title: Uses - Wes Bos
    local_file: uses.html
  - url: https://wesbos.com/contact
    title: Contact - Wes Bos
    local_file: contact.html
- key_regions:
  - header
  - navigation
- key_interactions:
  - { name: "project filtering on inline data", evidence: "inferred", notes: "No filtering controls visible in fetched markup." }
  - { name: "gallery or lightbox navigation", evidence: "inferred", notes: "No gallery markup evident in fetched HTML." }
  - { name: "responsive navigation", evidence: "inferred", notes: "Navigation list present but responsive behavior not verifiable from markup." }
  - { name: "contact inquiry on inline data", evidence: "inferred", notes: "Contact page link present; form not visible in fetched HTML." }
  - { name: "reduced-motion handling", evidence: "inferred", notes: "No prefers-reduced-motion media queries detectable in fetched markup." }
- complexity: medium
  rationale: Site provides multiple distinct content sections (courses, blog, tips, etc.) with plain‑text navigation visible in HTML, indicating moderate structural richness.
- stack_clues: unknown
- limitations: 
  - Hero section, sidebar, and footer groups not visible in the fetched markup, so cannot be confirmed.
  - Legal pages (terms, privacy) were excluded per guidance to avoid boilerplate.
  - Interactive components such as project filters, galleries, or contact forms are not verifiable from the static HTML alone.
  - Verification date was not included in the evidence; only the HTTP GET method is known.

```json
{
  "rows": [
    {
      "source_id": "PORT-08",
      "subcategory": "software developer / engineer",
      "source_name": "Wes Bos",
      "source_url": "https://wesbos.com/",
      "verified_at": "date not provided in evidence; method: HTTP GET by the orchestrator",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        { "url": "https://wesbos.com/", "title": "Wes Bos", "local_file": "index.html" },
        { "url": "https://wesbos.com/courses", "title": "Courses - Wes Bos", "local_file": "courses.html" },
        { "url": "https://wesbos.com/about", "title": "About - Wes Bos", "local_file": "about.html" },
        { "url": "https://wesbos.com/blog", "title": "Blog - Wes Bos", "local_file": "blog.html" },
        { "url": "https://wesbos.com/tips", "title": "Tips - Wes Bos", "local_file": "tips.html" },
        { "url": "https://wesbos.com/javascript", "title": "Beginner JavaScript Notes & Reference - Wes Bos", "local_file": "javascript.html" },
        { "url": "https://wesbos.com/speaking-and-training", "title": "Speaking And Training - Wes Bos", "local_file": "speaking-and-training.html" },
        { "url": "https://wesbos.com/uses", "title": "Uses - Wes Bos", "local_file": "uses.html" },
        { "url": "https://wesbos.com/contact", "title": "Contact - Wes Bos", "local_file": "contact.html" }
      ],
      "key_regions": [
        "header",
        "navigation"
      ],
      "key_interactions": [
        { "name": "project filtering on inline data", "evidence": "inferred", "notes": "No filtering controls visible in fetched markup." },
        { "name": "gallery or lightbox navigation", "evidence": "inferred", "notes": "No gallery markup evident in fetched HTML." },
        { "name": "responsive navigation", "evidence": "inferred", "notes": "Navigation list present but responsive behavior not verifiable from markup." },
        { "name": "contact inquiry on inline data", "evidence": "inferred", "notes": "Contact page link present; form not visible in fetched HTML." },
        { "name": "reduced-motion handling", "evidence": "inferred", "notes": "No prefers-reduced-motion media queries detectable in fetched markup." }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Hero section, sidebar, and footer groups not visible in the fetched markup; legal pages omitted per guidance; interactive components (filtering, gallery, contact form) not verifiable from static HTML; verification date missing from evidence."
    }
  ]
}
```
