# NPO-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-22-25-232Z-research-NPO-08`
- **Scope:** partial — this file covers NPO-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/NPO-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### NPO-08
source_id: NPO-08
subcategory: local community nonprofit
source_name: Seattle Humane Society
official_url: https://www.seattlehumane.org/
verified_at: 
verification_result: verified
source_pages:
- url: https://www.seattlehumane.org/
  title: Seattle Humane Supports Pets and Their Owners - Seattle Humane
  local_file: index.html
- url: https://www.seattlehumane.org/adoption/
  title: Adoption - Seattle Humane
  local_file: adoption.html
- url: https://www.seattlehumane.org/adoption/find-a-pet/
  title: Find a Pet - Seattle Humane
  local_file: find-a-pet.html
- url: https://www.seattlehumane.org/services/
  title: Services - Seattle Humane
  local_file: services.html
- url: https://www.seattlehumane.org/services/veterinary-care-center/
  title: Veterinary Care Center - Seattle Humane
  local_file: veterinary-care-center.html
- url: https://www.seattlehumane.org/get-involved
  title: Get Involved - Seattle Humane
  local_file: get-involved.html
- url: https://www.seattlehumane.org/get-involved/volunteer/
  title: Volunteer - Seattle Humane
  local_file: volunteer.html
- url: https://www.seattlehumane.org/ways-to-give/
  title: Ways to Give - Seattle Humane
  local_file: ways-to-give.html
key_regions: 
key_interactions:
- name: donation amount and frequency
  evidence: inferred
  notes: Not visible in fetched markup; expected based on site type.
- name: volunteer form
  evidence: inferred
  notes: Not visible in fetched markup; expected based on site type.
- name: program/chapter search
  evidence: inferred
  notes: Not visible in fetched markup; expected based on site type.
- name: event filters
  evidence: inferred
  notes: Not visible in fetched markup; expected based on site type.
complexity: medium
stack_clues: unknown
limitations: Verification date not provided in evidence; region detection (header, navigation, hero, content bands, sidebar, footer) cannot be determined from raw HTML alone; all requested interior pages returned 2xx and were mapped.

```json
{
  "rows": [
    {
      "source_id": "NPO-08",
      "subcategory": "local community nonprofit",
      "source_name": "Seattle Humane Society",
      "source_url": "https://www.seattlehumane.org/",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.seattlehumane.org/",
          "title": "Seattle Humane Supports Pets and Their Owners - Seattle Humane",
          "local_file": "index.html"
        },
        {
          "url": "https://www.seattlehumane.org/adoption/",
          "title": "Adoption - Seattle Humane",
          "local_file": "adoption.html"
        },
        {
          "url": "https://www.seattlehumane.org/adoption/find-a-pet/",
          "title": "Find a Pet - Seattle Humane",
          "local_file": "find-a-pet.html"
        },
        {
          "url": "https://www.seattlehumane.org/services/",
          "title": "Services - Seattle Humane",
          "local_file": "services.html"
        },
        {
          "url": "https://www.seattlehumane.org/services/veterinary-care-center/",
          "title": "Veterinary Care Center - Seattle Humane",
          "local_file": "veterinary-care-center.html"
        },
        {
          "url": "https://www.seattlehumane.org/get-involved",
          "title": "Get Involved - Seattle Humane",
          "local_file": "get-involved.html"
        },
        {
          "url": "https://www.seattlehumane.org/get-involved/volunteer/",
          "title": "Volunteer - Seattle Humane",
          "local_file": "volunteer.html"
        },
        {
          "url": "https://www.seattlehumane.org/ways-to-give/",
          "title": "Ways to Give - Seattle Humane",
          "local_file": "ways-to-give.html"
        }
      ],
      "key_regions": [],
      "key_interactions": [
        {
          "name": "donation amount and frequency",
          "evidence": "inferred",
          "notes": "Not visible in fetched markup; expected based on site type."
        },
        {
          "name": "volunteer form",
          "evidence": "inferred",
          "notes": "Not visible in fetched markup; expected based on site type."
        },
        {
          "name": "program/chapter search",
          "evidence": "inferred",
          "notes": "Not visible in fetched markup; expected based on site type."
        },
        {
          "name": "event filters",
          "evidence": "inferred",
          "notes": "Not visible in fetched markup; expected based on site type."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verification date not provided in evidence; region detection (header, navigation, hero, content bands, sidebar, footer) cannot be determined from raw HTML alone; all requested interior pages returned 2xx and were mapped."
    }
  ]
}
```
