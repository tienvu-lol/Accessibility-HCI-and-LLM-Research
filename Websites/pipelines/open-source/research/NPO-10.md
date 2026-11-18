# NPO-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-04-57-740Z-research-NPO-10`
- **Scope:** partial — this file covers NPO-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 13/13 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-10
source_id: NPO-10  
subcategory: international humanitarian charity  
source_name: Doctors Without Borders (Médecins Sans Frontières)  
official_url: https://www.msf.org/  
verified_at: 2026-11-17 (HTTP GET by the orchestrator)  
verification_result: verified  
source_pages:
  - url: https://www.msf.org/
    title: MSF - Médecins Sans Frontières | Medical humanitarian organisation
    local_file: home-index.html
  - url: https://www.msf.org/donate
    title: Donate
    local_file: donate-index.html
  - url: https://www.msf.org/work-msf
    title: Work with MSF
    local_file: work-with-msf-index.html
  - url: https://www.msf.org/resource-centre
    title: Resources
    local_file: resource-centre-index.html
  - url: https://www.msf.org/latest-portal
    title: Latest
    local_file: latest-index.html
  - url: https://www.msf.org/where-we-work
    title: Where we work
    local_file: where-we-work-index.html
  - url: https://www.msf.org/who-we-are
    title: Who we are
    local_file: who-we-are-index.html
  - url: https://www.msf.org/contact-us
    title: Contact us
    local_file: contact-us-index.html
key_regions: [header, navigation, hero, content, footer]  
key_interactions:
  - name: navigation menu
    evidence: observed
    notes: Links listed in nav_links
  - name: donation form
    evidence: inferred
    notes: Donate page likely contains amount and frequency fields
  - name: volunteer application form
    evidence: inferred
    notes: “Work With MSF” page likely includes volunteer information
  - name: program/region search
    evidence: inferred
    notes: Site likely offers a search or filter for programs and locations
complexity: medium  
stack_clues: unknown  
limitations: none  

```json
{
  "rows": [
    {
      "source_id": "NPO-10",
      "subcategory": "international humanitarian charity",
      "source_name": "Doctors Without Borders (Médecins Sans Frontières)",
      "source_url": "https://www.msf.org/",
      "verified_at": "2026-11-17 (HTTP GET by the orchestrator)",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.msf.org/",
          "title": "MSF - Médecins Sans Frontières | Medical humanitarian organisation",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.msf.org/donate",
          "title": "Donate",
          "local_file": "donate-index.html"
        },
        {
          "url": "https://www.msf.org/work-msf",
          "title": "Work with MSF",
          "local_file": "work-with-msf-index.html"
        },
        {
          "url": "https://www.msf.org/resource-centre",
          "title": "Resources",
          "local_file": "resource-centre-index.html"
        },
        {
          "url": "https://www.msf.org/latest-portal",
          "title": "Latest",
          "local_file": "latest-index.html"
        },
        {
          "url": "https://www.msf.org/where-we-work",
          "title": "Where we work",
          "local_file": "where-we-work-index.html"
        },
        {
          "url": "https://www.msf.org/who-we-are",
          "title": "Who we are",
          "local_file": "who-we-are-index.html"
        },
        {
          "url": "https://www.msf.org/contact-us",
          "title": "Contact us",
          "local_file": "contact-us-index.html"
        }
      ],
      "key_regions": ["header", "navigation", "hero", "content", "footer"],
      "key_interactions": [
        {
          "name": "navigation menu",
          "evidence": "observed",
          "notes": "Links listed in nav_links"
        },
        {
          "name": "donation form",
          "evidence": "inferred",
          "notes": "Donate page likely contains amount and frequency fields"
        },
        {
          "name": "volunteer application form",
          "evidence": "inferred",
          "notes": "“Work With MSF” page likely includes volunteer information"
        },
        {
          "name": "program/region search",
          "evidence": "inferred",
          "notes": "Site likely offers a search or filter for programs and locations"
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": ""
    }
  ]
}
```
