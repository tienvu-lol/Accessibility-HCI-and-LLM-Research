# UNI-R08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-04-57-740Z-research-UNI-R08`
- **Scope:** partial — this file covers UNI-R08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/UNI-R08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### UNI-R08
source_id: UNI-R08
subcategory: small private liberal-arts college
source_name: Amherst College
official_url: https://www.amherst.edu/
verified_at: 2025-09-16
verification_result: verified
source_pages:
- url: https://www.amherst.edu/
  title: Home | Amherst College
  local_file: index.html
- url: https://www.amherst.edu/academiclife
  title: Academics | Academics | Amherst College
  local_file: academic-life.html
- url: https://www.amherst.edu/academiclife/departments
  title: Majors | Academics | Majors | Amherst College
  local_file: departments.html
- url: https://www.amherst.edu/academiclife/college-catalog
  title: Course Catalog | Academics | Course Catalog | Amherst College
  local_file: college-catalog.html
- url: https://www.amherst.edu/admission
  title: Admission & Financial Aid | Admission & Financial Aid | Amherst College
  local_file: admission.html
- url: https://www.amherst.edu/admission/apply
  title: Applying to Amherst | Admission & Financial Aid | Applying to Amherst | Amherst College
  local_file: apply.html
- url: https://www.amherst.edu/visiting
  title: Visiting | Visiting | Amherst College
  local_file: visiting.html
- url: https://www.amherst.edu/news
  title: News & Events | News & Events | Amherst College
  local_file: news.html
key_regions:
- navigation
key_interactions:
- name: program or directory search on inline data
  evidence: inferred
- name: responsive navigation
  evidence: inferred
- name: visit/information inquiry
  evidence: inferred
- name: events filtering
  evidence: inferred
complexity: medium
rationale: The site presents multiple top-level sections (academics, admission, visiting, news) with deep navigation and listing pages, indicating a medium information‑architecture complexity.
stack_clues: unknown
limitations: The verified_at date is inferred (not present in the raw evidence); the evidence only confirms navigation links, so header, hero, content bands, sidebar, and footer regions are not directly observed and are treated as inferred. All requested interior pages returned 2xx status, so no page‑fetch failures are recorded.

```json
{
  "rows": [
    {
      "source_id": "UNI-R08",
      "subcategory": "small private liberal-arts college",
      "source_name": "Amherst College",
      "source_url": "https://www.amherst.edu/",
      "verified_at": "2025-09-16",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.amherst.edu/",
          "title": "Home | Amherst College",
          "local_file": "index.html"
        },
        {
          "url": "https://www.amherst.edu/academiclife",
          "title": "Academics | Academics | Amherst College",
          "local_file": "academic-life.html"
        },
        {
          "url": "https://www.amherst.edu/academiclife/departments",
          "title": "Majors | Academics | Majors | Amherst College",
          "local_file": "departments.html"
        },
        {
          "url": "https://www.amherst.edu/academiclife/college-catalog",
          "title": "Course Catalog | Academics | Course Catalog | Amherst College",
          "local_file": "college-catalog.html"
        },
        {
          "url": "https://www.amherst.edu/admission",
          "title": "Admission & Financial Aid | Admission & Financial Aid | Amherst College",
          "local_file": "admission.html"
        },
        {
          "url": "https://www.amherst.edu/admission/apply",
          "title": "Applying to Amherst | Admission & Financial Aid | Applying to Amherst | Amherst College",
          "local_file": "apply.html"
        },
        {
          "url": "https://www.amherst.edu/visiting",
          "title": "Visiting | Visiting | Amherst College",
          "local_file": "visiting.html"
        },
        {
          "url": "https://www.amherst.edu/news",
          "title": "News & Events | News & Events | Amherst College",
          "local_file": "news.html"
        }
      ],
      "key_regions": [
        "navigation"
      ],
      "key_interactions": [
        {
          "name": "program or directory search on inline data",
          "evidence": "inferred",
          "notes": "No search form visible in fetched markup; typical for liberal‑arts college sites."
        },
        {
          "name": "responsive navigation",
          "evidence": "inferred",
          "notes": "Markup does not contain media queries or viewport meta; inferred from modern design."
        },
        {
          "name": "visit/information inquiry",
          "evidence": "inferred",
          "notes": "Visit and admission pages present; likely include inquiry forms but not seen in raw HTML."
        },
        {
          "name": "events filtering",
          "evidence": "inferred",
          "notes": "News/events calendar page exists; filtering UI common but not detected in fetched markup."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verified_at date is inferred (not in evidence); header, hero, content bands, sidebar, footer not directly observed; all requested pages fetched successfully."
    }
  ]
}
```
