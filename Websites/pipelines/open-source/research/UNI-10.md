# UNI-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-08-50-005Z-research-UNI-10`
- **Scope:** partial — this file covers UNI-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/UNI-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### UNI-10
{
  "source_id": "UNI-10",
  "subcategory": "additional distinct large public research university (complexity-matched reserve)",
  "source_name": "University of California, Berkeley",
  "official_url": "https://www.berkeley.edu/",
  "verified_at": "unknown (HTTP GET)",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://www.berkeley.edu/",
      "title": "University of California, Berkeley: Home",
      "local_file": "home-index.html"
    },
    {
      "url": "https://www.berkeley.edu/admissions/",
      "title": "Admissions - University of California, Berkeley",
      "local_file": "admissions-index.html"
    },
    {
      "url": "https://www.berkeley.edu/academics/",
      "title": "Academics - University of California, Berkeley",
      "local_file": "academics-index.html"
    },
    {
      "url": "https://www.berkeley.edu/academics/schools-colleges/",
      "title": "Schools & colleges - University of California, Berkeley",
      "local_file": "schools-colleges-index.html"
    },
    {
      "url": "https://www.berkeley.edu/directory/",
      "title": "Campus directory - University of California, Berkeley",
      "local_file": "directory-index.html"
    },
    {
      "url": "https://www.berkeley.edu/research/",
      "title": "Research - University of California, Berkeley",
      "local_file": "research-index.html"
    },
    {
      "url": "https://www.berkeley.edu/campus-life/events-attractions/",
      "title": "Events & attractions - University of California, Berkeley",
      "local_file": "events-index.html"
    },
    {
      "url": "https://www.berkeley.edu/about/by-the-numbers/",
      "title": "By the numbers - University of California, Berkeley",
      "local_file": "by-the-numbers-index.html"
    }
  ],
  "key_regions": [
    "navigation",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "directory search",
      "evidence": "inferred",
      "notes": "Directory page present; search form not visible in fetched markup."
    },
    {
      "name": "events filtering",
      "evidence": "inferred",
      "notes": "Events & attractions page present; filtering UI not visible in markup."
    },
    {
      "name": "responsive navigation",
      "evidence": "inferred",
      "notes": "Navigation links listed; responsiveness cannot be determined from static HTML."
    },
    {
      "name": "visit/information inquiry",
      "evidence": "inferred",
      "notes": "Visit page not fetched; typical for university sites."
    }
  ],
  "complexity": "medium",
  "complexity_rationale": "Eight distinct top‑level pages with a rich set of navigation links (22+ items) indicate a moderately complex information architecture.",
  "stack_clues": "unknown",
  "limitations": "None – all requested pages returned HTTP 200."
}

```json
{
  "rows": [
    {
      "source_id": "UNI-10",
      "subcategory": "additional distinct large public research university (complexity-matched reserve)",
      "source_name": "University of California, Berkeley",
      "source_url": "https://www.berkeley.edu/",
      "verified_at": "unknown",
      "verification_method": "HTTP GET",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.berkeley.edu/",
          "title": "University of California, Berkeley: Home",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.berkeley.edu/admissions/",
          "title": "Admissions - University of California, Berkeley",
          "local_file": "admissions-index.html"
        },
        {
          "url": "https://www.berkeley.edu/academics/",
          "title": "Academics - University of California, Berkeley",
          "local_file": "academics-index.html"
        },
        {
          "url": "https://www.berkeley.edu/academics/schools-colleges/",
          "title": "Schools & colleges - University of California, Berkeley",
          "local_file": "schools-colleges-index.html"
        },
        {
          "url": "https://www.berkeley.edu/directory/",
          "title": "Campus directory - University of California, Berkeley",
          "local_file": "directory-index.html"
        },
        {
          "url": "https://www.berkeley.edu/research/",
          "title": "Research - University of California, Berkeley",
          "local_file": "research-index.html"
        },
        {
          "url": "https://www.berkeley.edu/campus-life/events-attractions/",
          "title": "Events & attractions - University of California, Berkeley",
          "local_file": "events-index.html"
        },
        {
          "url": "https://www.berkeley.edu/about/by-the-numbers/",
          "title": "By the numbers - University of California, Berkeley",
          "local_file": "by-the-numbers-index.html"
        }
      ],
      "key_regions": [
        "navigation",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "directory search",
          "evidence": "inferred",
          "notes": "Directory page present; search form not visible in fetched markup."
        },
        {
          "name": "events filtering",
          "evidence": "inferred",
          "notes": "Events & attractions page present; filtering UI not visible in markup."
        },
        {
          "name": "responsive navigation",
          "evidence": "inferred",
          "notes": "Navigation links listed; responsiveness cannot be determined from static HTML."
        },
        {
          "name": "visit/information inquiry",
          "evidence": "inferred",
          "notes": "Visit page not fetched; typical for university sites."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "None – all requested pages returned HTTP 200."
    }
  ]
}
```
