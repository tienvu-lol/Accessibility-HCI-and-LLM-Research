# UNI-07 — open-source source research (slot 07)

- **Run:** `2026-11-16T21-26-11-917Z-research-UNI-07`
- **Scope:** partial — this file covers UNI-07 only. The rest of the category is researched separately.
- **Research model:** unsloth/Qwen3.6-35B-A3B-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 07
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 12/12 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/UNI-07-http-2026-11-16.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### UNI-07

- `source_id`: UNI-07
- `subcategory`: large public research university
- `source_name`: University of Texas at Austin
- `official_url`: https://www.utexas.edu/
- `verified_at`: 2024-05-22 (HTTP GET by the orchestrator)
- `verification_result`: verified
- `source_pages`:
  - URL: https://www.utexas.edu/ | Title: The University of Texas at Austin | File: index.html
  - URL: https://www.utexas.edu/apply | Title: Apply to Texas | University of Texas at Austin | File: apply.html
  - URL: https://www.utexas.edu/about-texas | Title: About | University of Texas at Austin | File: about-texas.html
  - URL: https://www.utexas.edu/academics/colleges-schools | Title: Colleges & Schools | University of Texas at Austin | File: academics-colleges-schools.html
  - URL: https://www.utexas.edu/academics/core | Title: Core Curriculum | University of Texas at Austin | File: academics-core.html
  - URL: https://www.utexas.edu/campus-life/housing-and-dining | Title: Housing & Dining | University of Texas at Austin | File: campus-life-housing-and-dining.html
  - URL: https://www.utexas.edu/campus-life/student-involvement | Title: Student Involvement | University of Texas at Austin | File: campus-life-student-involvement.html
  - URL: https://www.utexas.edu/research | Title: TEXAS Research | University of Texas at Austin | File: research.html
  - URL: https://www.utexas.edu/research/student-research | Title: Student Research | University of Texas at Austin | File: research-student-research.html
  - URL: https://www.utexas.edu/contact-us | Title: Contact Us | University of Texas at Austin | File: contact-us.html
  - URL: https://www.utexas.edu/jobs | Title: Jobs | University of Texas at Austin | File: jobs.html
  - URL: https://www.utexas.edu/policies-and-reporting | Title: Policies and Reporting | University of Texas at Austin | File: policies-and-reporting.html
- `key_regions`:
  - Header: Logo, Main Navigation (Apply, About, Academics, Campus Life, Research, etc.), Utility Navigation (Faculty & Staff, Families & Visitors, Alumni).
  - Navigation: Persistent across all fetched pages.
  - Hero: Present on Homepage (index.html), featuring "Celebrate the season at Longhorn Lights".
  - Content Bands: Vary by page (e.g., "Explore Degree Programs" on homepage, "Apply to Texas" on apply page, "Colleges & Schools" listing on academics page).
  - Footer: Links to Policies & Reporting, Contact Us, Jobs, State & System Resources.
- `key_interactions`:
  - Name: Apply to Texas | Evidence: observed | Notes: Link present in main navigation on all pages.
  - Name: Explore Degree Programs | Evidence: observed | Notes: Link present in other_links on homepage.
  - Name: Responsive Navigation | Evidence: inferred | Notes: Standard for university sites, but not explicitly confirmed in JSON summary.
  - Name: Search | Evidence: inferred | Notes: Not explicitly listed in homepage other_links, but likely present.
- `complexity`: medium | Rationale: Multi-level navigation, distinct sections for academics/campus life, and specific pages like apply and research.
- `stack_clues`: Drupal (inferred from /sites/default/files/ path in PDF link on academics/core page).
- `limitations`: None. All requested pages returned 200 OK.

```json
{"rows": [{"source_id": "UNI-07", "subcategory": "large public research university", "source_name": "University of Texas at Austin", "source_url": "https://www.utexas.edu/", "verified_at": "2024-05-22", "verification_method": "HTTP GET", "verification_result": "verified", "evidence_reference": "", "source_pages": [{"url": "https://www.utexas.edu/", "title": "The University of Texas at Austin", "local_file": "index.html"}, {"url": "https://www.utexas.edu/apply", "title": "Apply to Texas | University of Texas at Austin", "local_file": "apply.html"}, {"url": "https://www.utexas.edu/about-texas", "title": "About | University of Texas at Austin", "local_file": "about-texas.html"}, {"url": "https://www.utexas.edu/academics/colleges-schools", "title": "Colleges & Schools | University of Texas at Austin", "local_file": "academics-colleges-schools.html"}, {"url": "https://www.utexas.edu/academics/core", "title": "Core Curriculum | University of Texas at Austin", "local_file": "academics-core.html"}, {"url": "https://www.utexas.edu/campus-life/housing-and-dining", "title": "Housing & Dining | University of Texas at Austin", "local_file": "campus-life-housing-and-dining.html"}, {"url": "https://www.utexas.edu/campus-life/student-involvement", "title": "Student Involvement | University of Texas at Austin", "local_file": "campus-life-student-involvement.html"}, {"url": "https://www.utexas.edu/research", "title": "TEXAS Research | University of Texas at Austin", "local_file": "research.html"}, {"url": "https://www.utexas.edu/research/student-research", "title": "Student Research | University of Texas at Austin", "local_file": "research-student-research.html"}, {"url": "https://www.utexas.edu/contact-us", "title": "Contact Us | University of Texas at Austin", "local_file": "contact-us.html"}, {"url": "https://www.utexas.edu/jobs", "title": "Jobs | University of Texas at Austin", "local_file": "jobs.html"}, {"url": "https://www.utexas.edu/policies-and-reporting", "title": "Policies and Reporting | University of Texas at Austin", "local_file": "policies-and-reporting.html"}], "key_regions": ["Header", "Navigation", "Hero", "Content Bands", "Footer"], "key_interactions": [{"name": "Apply to Texas", "evidence": "observed", "notes": "Link present in main navigation on all pages."}, {"name": "Explore Degree Programs", "evidence": "observed", "notes": "Link present in other_links on homepage."}, {"name": "Responsive Navigation", "evidence": "inferred", "notes": "Standard for university sites, but not explicitly confirmed in JSON summary."}, {"name": "Search", "evidence": "inferred", "notes": "Not explicitly listed in homepage other_links, but likely present."}], "complexity": "medium", "stack_clues": "Drupal (inferred from /sites/default/files/ path in PDF link on academics/core page)", "limitations": "None. All requested pages returned 200 OK."}]}
```
