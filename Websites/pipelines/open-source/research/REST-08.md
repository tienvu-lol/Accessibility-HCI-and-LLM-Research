# REST-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-28-44-974Z-research-REST-08`
- **Scope:** partial — this file covers REST-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/3 candidate homepages and 9/9 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/REST-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### REST-08
source_id: REST-08
subcategory: ethnic (Xi'an Chinese)
source_name: Xi'an Famous Foods
official_url: https://www.xianfoods.com
verified_at: 
verification_result: verified
source_pages:
- url: https://www.xianfoods.com/
  title: Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: index.html
- url: https://www.xianfoods.com/menu
  title: Menu-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: menu.html
- url: https://www.xianfoods.com/our-story
  title: Our Story-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: our-story.html
- url: https://www.xianfoods.com/locations
  title: Locations-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: locations.html
- url: https://www.xianfoods.com/contact
  title: Contact-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: contact.html
- url: https://www.xianfoods.com/order-acknowledgment
  title: Pickup/Delivery Acknowledgment
  local_file: order-acknowledgment.html
- url: https://www.xianfoods.com/press
  title: Press-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes
  local_file: press.html
- url: https://www.xianfoods.com/accessibility
  title: Accessibility
  local_file: accessibility.html
key_regions:
- header (inferred)
- navigation (inferred)
- hero (inferred)
- content band (menu) (inferred)
- content band (our story) (inferred)
- content band (locations) (inferred)
- content band (contact) (inferred)
- footer (inferred)
key_interactions:
- name: menu filtering on inline data
  evidence: inferred
- name: reservation request on inline data
  evidence: inferred
- name: responsive navigation
  evidence: inferred
- name: open/closed hours display
  evidence: inferred
- name: age gate
  evidence: inferred
- name: newsletter signup
  evidence: inferred
complexity: medium
rationale: Site contains multiple distinct sections (menu, locations, story, press, accessibility) with navigation, indicating moderate structural complexity.
stack_clues: unknown
limitations: Verified_at date not provided in evidence; interactive components (filtering, reservation, age gate, newsletter) could not be observed in markup and are marked inferred.

```json
{
  "rows": [
    {
      "source_id": "REST-08",
      "subcategory": "ethnic (Xi'an Chinese)",
      "source_name": "Xi'an Famous Foods",
      "source_url": "https://www.xianfoods.com",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.xianfoods.com/",
          "title": "Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "index.html"
        },
        {
          "url": "https://www.xianfoods.com/menu",
          "title": "Menu-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "menu.html"
        },
        {
          "url": "https://www.xianfoods.com/our-story",
          "title": "Our Story-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "our-story.html"
        },
        {
          "url": "https://www.xianfoods.com/locations",
          "title": "Locations-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "locations.html"
        },
        {
          "url": "https://www.xianfoods.com/contact",
          "title": "Contact-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "contact.html"
        },
        {
          "url": "https://www.xianfoods.com/order-acknowledgment",
          "title": "Pickup/Delivery Acknowledgment",
          "local_file": "order-acknowledgment.html"
        },
        {
          "url": "https://www.xianfoods.com/press",
          "title": "Press-Xi'an Famous Foods: specialty Chinese restaurants serving Xi'an dishes based on family recipes",
          "local_file": "press.html"
        },
        {
          "url": "https://www.xianfoods.com/accessibility",
          "title": "Accessibility",
          "local_file": "accessibility.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero",
        "content band (menu)",
        "content band (our story)",
        "content band (locations)",
        "content band (contact)",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "menu filtering on inline data",
          "evidence": "inferred",
          "notes": ""
        },
        {
          "name": "reservation request on inline data",
          "evidence": "inferred",
          "notes": ""
        },
        {
          "name": "responsive navigation",
          "evidence": "inferred",
          "notes": ""
        },
        {
          "name": "open/closed hours display",
          "evidence": "inferred",
          "notes": ""
        },
        {
          "name": "age gate",
          "evidence": "inferred",
          "notes": ""
        },
        {
          "name": "newsletter signup",
          "evidence": "inferred",
          "notes": ""
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verified_at date not provided in evidence; interactive components (filtering, reservation, age gate, newsletter) could not be observed in markup and are marked inferred."
    }
  ]
}
```
