# HOSP-08 — open-source source research (slot 08)

- **Run:** `2026-11-17T05-06-50-800Z-research-HOSP-08`
- **Scope:** partial — this file covers HOSP-08 only. The rest of the category is researched separately.
- **Research model:** unsloth/NVIDIA-Nemotron-3-Super-120B-A12B-GGUF (vt-arc-falcon-llamacpp, nvidia-nemotron-open-model-license, open weights) declared for slot 08
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/HOSP-08-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### HOSP-08
source_id: HOSP-08
subcategory: community/regional hospital
source_name: Mercy Medical Center
official_url: https://www.mercy.com/
verified_at: 
verification_result: verified
source_pages:
- url: https://www.mercy.com/
  title: Mercy Health | The Highest Quality Care across Ohio & Kentucky
  local_file: index.html
- url: https://www.mercy.com/get-care-now
  title: Care Where You Need It | Mercy Health
  local_file: get-care-now.html
- url: https://www.mercy.com/pay-a-bill
  title: Pay Your Mercy Health Bill | Online Bill Pay | Mercy Health
  local_file: pay-a-bill.html
- url: https://www.mercy.com/find-a-doctor
  title: Find a Doctor | Physician Search | Mercy Health
  local_file: find-a-doctor.html
- url: https://www.mercy.com/find-a-doctor?displayValue=Primary%20Care%20Providers&page=1&primary_care=Primary%20Care%20Providers&shuffle_seed=cc2dc033-78de-4d3e-acb9-cb48ed7f5c63&sort=networks%2Cdistance%2Cavailability_soonest%2Crelevance
  title: Find a Doctor | Physician Search | Mercy Health
  local_file: find-a-doctor-primary-care.html
- url: https://www.mercy.com/health-care-services
  title: Mercy Health Services & Specialties | Ohio & Kentucky Health Care
  local_file: health-care-services.html
- url: https://www.mercy.com/conditions-and-treatments
  title: Conditions and Treatments | Mercy Health
  local_file: conditions-and-treatments.html
- url: https://www.mercy.com/location-map
  title: Location Map | Mercy Health
  local_file: location-map.html
- url: https://www.mercy.com/locations/hospitals
  title: Mercy Health Hospitals | Hospitals in Ohio and Kentucky
  local_file: locations-hospitals.html
- url: https://www.mercy.com/patient-resources
  title: Patient Resources | Mercy Health Patient Information
  local_file: patient-resources.html
key_regions:
- header (inferred)
- navigation (inferred)
- hero (inferred)
- service bands (inferred)
- provider listing band (inferred)
- location map band (inferred)
- footer (inferred)
key_interactions:
- {name: "doctor filter", evidence: "inferred", notes: "No explicit filter markup observed in fetched HTML; typical for hospital sites."}
- {name: "location filter", evidence: "inferred", notes: "No explicit filter markup observed; location pages suggest filtering capability."}
- {name: "service navigation", evidence: "inferred", notes: "Navigation links to services present, but interactive navigation component not visible in markup."}
- {name: "appointment-request validation", evidence: "inferred", notes: "No form or validation markup observed; inferred from site purpose."}
- {name: "billing/insurance information", evidence: "inferred", notes: "Links to bill pay and insurance pages present, but no form or validation markup observed."}
complexity: medium
rationale: Evidence shows multiple distinct sections (services, providers, locations, patient resources) indicating moderate structural richness.
stack_clues: unknown
limitations: 
- Verification date not provided in evidence; verified_at left blank.
- Detailed doctor or service detail pages (e.g., individual physician profiles, specific treatment pages) not captured.
- Dynamic search results with varying parameters beyond the sampled query not verified.
- Any client‑side‑only navigation or interactive components cannot be confirmed from static HTML.
- Pages that returned non‑2xx status: none; all requested pages fetched successfully.

```json
{
  "rows": [
    {
      "source_id": "HOSP-08",
      "subcategory": "community/regional hospital",
      "source_name": "Mercy Medical Center",
      "source_url": "https://www.mercy.com/",
      "verified_at": "",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.mercy.com/",
          "title": "Mercy Health | The Highest Quality Care across Ohio & Kentucky",
          "local_file": "index.html"
        },
        {
          "url": "https://www.mercy.com/get-care-now",
          "title": "Care Where You Need It | Mercy Health",
          "local_file": "get-care-now.html"
        },
        {
          "url": "https://www.mercy.com/pay-a-bill",
          "title": "Pay Your Mercy Health Bill | Online Bill Pay | Mercy Health",
          "local_file": "pay-a-bill.html"
        },
        {
          "url": "https://www.mercy.com/find-a-doctor",
          "title": "Find a Doctor | Physician Search | Mercy Health",
          "local_file": "find-a-doctor.html"
        },
        {
          "url": "https://www.mercy.com/find-a-doctor?displayValue=Primary%20Care%20Providers&page=1&primary_care=Primary%20Care%20Providers&shuffle_seed=cc2dc033-78de-4d3e-acb9-cb48ed7f5c63&sort=networks%2Cdistance%2Cavailability_soonest%2Crelevance",
          "title": "Find a Doctor | Physician Search | Mercy Health",
          "local_file": "find-a-doctor-primary-care.html"
        },
        {
          "url": "https://www.mercy.com/health-care-services",
          "title": "Mercy Health Services & Specialties | Ohio & Kentucky Health Care",
          "local_file": "health-care-services.html"
        },
        {
          "url": "https://www.mercy.com/conditions-and-treatments",
          "title": "Conditions and Treatments | Mercy Health",
          "local_file": "conditions-and-treatments.html"
        },
        {
          "url": "https://www.mercy.com/location-map",
          "title": "Location Map | Mercy Health",
          "local_file": "location-map.html"
        },
        {
          "url": "https://www.mercy.com/locations/hospitals",
          "title": "Mercy Health Hospitals | Hospitals in Ohio and Kentucky",
          "local_file": "locations-hospitals.html"
        },
        {
          "url": "https://www.mercy.com/patient-resources",
          "title": "Patient Resources | Mercy Health Patient Information",
          "local_file": "patient-resources.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero",
        "service bands",
        "provider listing band",
        "location map band",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "doctor filter",
          "evidence": "inferred",
          "notes": "No explicit filter markup observed in fetched HTML; typical for hospital sites."
        },
        {
          "name": "location filter",
          "evidence": "inferred",
          "notes": "No explicit filter markup observed; location pages suggest filtering capability."
        },
        {
          "name": "service navigation",
          "evidence": "inferred",
          "notes": "Navigation links to services present, but interactive navigation component not visible in markup."
        },
        {
          "name": "appointment-request validation",
          "evidence": "inferred",
          "notes": "No form or validation markup observed; inferred from site purpose."
        },
        {
          "name": "billing/insurance information",
          "evidence": "inferred",
          "notes": "Links to bill pay and insurance pages present, but no form or validation markup observed."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Verification date not provided in evidence; detailed doctor/service detail pages not captured; dynamic search results beyond sampled query not verified; client‑side‑only interactive components cannot be confirmed from static HTML."
    }
  ]
}
```
