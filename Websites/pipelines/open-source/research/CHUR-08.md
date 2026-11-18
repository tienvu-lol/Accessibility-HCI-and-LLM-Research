# CHUR-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-24-17-819Z-research-CHUR-08`
- **Scope:** partial — this file covers CHUR-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CHUR-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CHUR-08
source_id: CHUR-08
subcategory: historic cathedral/parish
source_name: York Minster
official_url: https://yorkminster.org/
verified_at: 2025-08-27
verification_result: verified
source_pages:
- url: https://yorkminster.org/
  title: Homepage | York Minster
  local_file: index.html
- url: https://yorkminster.org/discover/
  title: Discover | York Minster
  local_file: discover.html
- url: https://yorkminster.org/discover/collections-archive-library/
  title: Collections, Archive and Library | York Minster
  local_file: collections-archive-library.html
- url: https://yorkminster.org/discover/interactive-map/
  title: Interactive Map | York Minster
  local_file: interactive-map.html
- url: https://yorkminster.org/worship/sermons/
  title: Sermons | York Minster
  local_file: sermons.html
- url: https://yorkminster.org/visit/plan-your-visit/
  title: Plan your visit | York Minster
  local_file: plan-your-visit.html
- url: https://yorkminster.org/whats-on/
  title: What's on | York Minster
  local_file: whats-on.html
- url: https://yorkminster.org/donate-to-york-minster/
  title: Donate to York Minster | York Minster
  local_file: donate.html
key_regions:
- navigation
key_interactions:
- name: Sermon archive
  evidence: inferred
  notes: Page lists sermons but no search/filter observed in markup.
- name: Events listing
  evidence: inferred
  notes: Whats-on page likely contains event list; not verified in fetched markup.
- name: Groups finder
  evidence: inferred
  notes: Visit/groups link suggests group visits but no finder observed.
- name: Donation/giving
  evidence: inferred
  notes: Donate page supports giving but no simulation observed.
- name: Visit planning
  evidence: inferred
  notes: Plan your visit page provides information but no interactive planner observed.
complexity: medium
rationale: Site exhibits multiple top-level sections and deep navigation indicating moderate information architecture.
stack_clues: unknown
limitations: Verification date not present in evidence (approximated); deeper pages such as individual sermon details, specific event instances, group finder forms, prayer request forms, and live service status were not fetched; any JavaScript‑driven navigation is not visible in the raw HTML.

```json
{
  "rows": [
    {
      "source_id": "CHUR-08",
      "subcategory": "historic cathedral/parish",
      "source_name": "York Minster",
      "source_url": "https://yorkminster.org/",
      "verified_at": "2025-08-27",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://yorkminster.org/",
          "title": "Homepage | York Minster",
          "local_file": "index.html"
        },
        {
          "url": "https://yorkminster.org/discover/",
          "title": "Discover | York Minster",
          "local_file": "discover.html"
        },
        {
          "url": "https://yorkminster.org/discover/collections-archive-library/",
          "title": "Collections, Archive and Library | York Minster",
          "local_file": "collections-archive-library.html"
        },
        {
          "url": "https://yorkminster.org/discover/interactive-map/",
          "title": "Interactive Map | York Minster",
          "local_file": "interactive-map.html"
        },
        {
          "url": "https://yorkminster.org/worship/sermons/",
          "title": "Sermons | York Minster",
          "local_file": "sermons.html"
        },
        {
          "url": "https://yorkminster.org/visit/plan-your-visit/",
          "title": "Plan your visit | York Minster",
          "local_file": "plan-your-visit.html"
        },
        {
          "url": "https://yorkminster.org/whats-on/",
          "title": "What's on | York Minster",
          "local_file": "whats-on.html"
        },
        {
          "url": "https://yorkminster.org/donate-to-york-minster/",
          "title": "Donate to York Minster | York Minster",
          "local_file": "donate.html"
        }
      ],
      "key_regions": [
        "navigation"
      ],
      "key_interactions": [
        {
          "name": "Sermon archive",
          "evidence": "inferred",
          "notes": "Page lists sermons but no search/filter observed in markup."
        },
        {
          "name": "Events listing",
          "evidence": "inferred",
          "notes": "Whats-on page likely contains event list; not verified in fetched markup."
        },
        {
          "name": "Groups finder",
          "evidence": "inferred",
          "notes": "Visit/groups link suggests group visits but no finder observed."
        },
        {
          "name": "Donation/giving",
          "evidence": "inferred",
          "notes": "Donate page supports giving but no simulation observed."
        },
        {
          "name": "Visit planning",
          "evidence": "inferred",
          "notes": "Plan your visit page provides information but no interactive planner observed."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verification date not present in evidence (approximated); deeper pages such as individual sermon details, specific event instances, group finder forms, prayer request forms, and live service status were not fetched; any JavaScript‑driven navigation is not visible in the raw HTML."
    }
  ]
}
```
