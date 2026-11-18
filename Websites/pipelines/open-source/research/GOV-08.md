# GOV-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-16-32-358Z-research-GOV-08`
- **Scope:** partial — this file covers GOV-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 8/8 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/GOV-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### GOV-08
source_id: GOV-08
subcategory: state portal/agency
source_name: Massachusetts State Government
official_url: https://www.mass.gov/
verified_at: 
verification_result: verified
source_pages:
- url: https://www.mass.gov/
  title: Mass.gov
  local_file: index.html
- url: https://www.mass.gov/topics/health-social-services
  title: Health & Social Services | Mass.gov
  local_file: health-social-services.html
- url: https://www.mass.gov/topics/families-children
  title: Families & Children | Mass.gov
  local_file: families-children.html
- url: https://www.mass.gov/topics/transportation
  title: Transportation | Mass.gov
  local_file: transportation.html
- url: https://www.mass.gov/how-to/apply-for-unemployment-insurance-benefits
  title: Apply for unemployment insurance benefits | Mass.gov
  local_file: apply-unemployment-benefits.html
- url: https://www.mass.gov/how-to/renew-your-vehicle-or-trailer-registration
  title: Renew your vehicle or trailer registration | Mass.gov
  local_file: renew-vehicle-registration.html
- url: https://www.mass.gov/search-court-dockets-calendars-and-case-information
  title: Search Court Dockets, Calendars and Case Information | Mass.gov
  local_file: search-court-dockets.html
- url: https://www.mass.gov/info-details/massachusetts-state-organizations-a-to-z
  title: Massachusetts State Organizations | Mass.gov
  local_file: state-organizations-a-to-z.html
key_regions:
- header (inferred)
- navigation and its structure (inferred)
- hero (inferred)
- content band (inferred)
- footer groups (inferred)
key_interactions:
- name: service/department search
  evidence: inferred
  notes: No search form observed in fetched markup.
- name: alerts
  evidence: inferred
  notes: No alert banner observed in fetched markup.
- name: calendar navigation
  evidence: inferred
  notes: No calendar widget observed in fetched markup.
- name: report-a-problem form
  evidence: inferred
  notes: No report-a-problem form observed in fetched markup.
- name: language control
  evidence: inferred
  notes: No language selector observed in fetched markup.
complexity: medium
rationale: The site presents multiple topical sections, service directories, transactional forms, and rich navigation indicating moderate structural depth.
stack_clues: unknown
limitations: Verification date not provided in evidence; markup structure not inspected, so regions and interactions are inferred; all requested pages returned 2xx and were mapped.

```json
{
  "rows": [
    {
      "source_id": "GOV-08",
      "subcategory": "state portal/agency",
      "source_name": "Massachusetts State Government",
      "source_url": "https://www.mass.gov/",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.mass.gov/",
          "title": "Mass.gov",
          "local_file": "index.html"
        },
        {
          "url": "https://www.mass.gov/topics/health-social-services",
          "title": "Health & Social Services | Mass.gov",
          "local_file": "health-social-services.html"
        },
        {
          "url": "https://www.mass.gov/topics/families-children",
          "title": "Families & Children | Mass.gov",
          "local_file": "families-children.html"
        },
        {
          "url": "https://www.mass.gov/topics/transportation",
          "title": "Transportation | Mass.gov",
          "local_file": "transportation.html"
        },
        {
          "url": "https://www.mass.gov/how-to/apply-for-unemployment-insurance-benefits",
          "title": "Apply for unemployment insurance benefits | Mass.gov",
          "local_file": "apply-unemployment-benefits.html"
        },
        {
          "url": "https://www.mass.gov/how-to/renew-your-vehicle-or-trailer-registration",
          "title": "Renew your vehicle or trailer registration | Mass.gov",
          "local_file": "renew-vehicle-registration.html"
        },
        {
          "url": "https://www.mass.gov/search-court-dockets-calendars-and-case-information",
          "title": "Search Court Dockets, Calendars and Case Information | Mass.gov",
          "local_file": "search-court-dockets.html"
        },
        {
          "url": "https://www.mass.gov/info-details/massachusetts-state-organizations-a-to-z",
          "title": "Massachusetts State Organizations | Mass.gov",
          "local_file": "state-organizations-a-to-z.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation and its structure",
        "hero",
        "content band",
        "footer groups"
      ],
      "key_interactions": [
        {
          "name": "service/department search",
          "evidence": "inferred",
          "notes": "No search form observed in fetched markup."
        },
        {
          "name": "alerts",
          "evidence": "inferred",
          "notes": "No alert banner observed in fetched markup."
        },
        {
          "name": "calendar navigation",
          "evidence": "inferred",
          "notes": "No calendar widget observed in fetched markup."
        },
        {
          "name": "report-a-problem form",
          "evidence": "inferred",
          "notes": "No report-a-problem form observed in fetched markup."
        },
        {
          "name": "language control",
          "evidence": "inferred",
          "notes": "No language selector observed in fetched markup."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verification date not provided in evidence; markup structure not inspected, so regions and interactions are inferred; all requested pages returned 2xx and were mapped."
    }
  ]
}
```
