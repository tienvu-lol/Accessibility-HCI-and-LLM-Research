# HOSP-10 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-09-37-891Z-research-HOSP-10`
- **Scope:** partial — this file covers HOSP-10 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 10/10 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/HOSP-10-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### HOSP-10
{
  "source_id": "HOSP-10",
  "subcategory": "additional distinct academic medical center (complexity-matched reserve)",
  "source_name": "Mayo Clinic",
  "official_url": "https://www.mayoclinic.org",
  "verified_at": "2026-11-17",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://www.mayoclinic.org",
      "title": "The world's best hospital - Mayo Clinic",
      "local_file": "index.html"
    },
    {
      "url": "https://www.mayoclinic.org/appointments",
      "title": "Appointments at Mayo Clinic",
      "local_file": "appointments.html"
    },
    {
      "url": "https://www.mayoclinic.org/appointments/find-a-doctor",
      "title": "Doctors and Medical Staff - Mayo Clinic",
      "local_file": "find-a-doctor.html"
    },
    {
      "url": "https://www.mayoclinic.org/locations",
      "title": "U.S. and International Locations - Mayo Clinic",
      "local_file": "locations.html"
    },
    {
      "url": "https://www.mayoclinic.org/patient-visitor-guide",
      "title": "Patient and Visitor Guide - Mayo Clinic",
      "local_file": "patient-visitor-guide.html"
    },
    {
      "url": "https://www.mayoclinic.org/billing-insurance",
      "title": "Billing and Insurance - Mayo Clinic",
      "local_file": "billing-insurance.html"
    },
    {
      "url": "https://www.mayoclinic.org/departments-centers",
      "title": "Medical departments and centers - Mayo Clinic",
      "local_file": "departments-centers.html"
    },
    {
      "url": "https://www.mayoclinic.org/diseases-conditions",
      "title": "Medical Diseases & Conditions - Mayo Clinic",
      "local_file": "diseases-conditions.html"
    },
    {
      "url": "https://www.mayoclinic.org/diseases-conditions/brain-tumor/care-at-mayo-clinic/mac-20350092",
      "title": "Brain tumor - Care at Mayo Clinic - Mayo Clinic",
      "local_file": "brain-tumor.html"
    }
  ],
  "key_regions": [
    "header",
    "navigation",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "Doctor and location filters",
      "evidence": "inferred",
      "notes": "Find-a-Doctor and Locations pages are expected to provide filter controls, but the fetched markup does not expose the filter UI."
    },
    {
      "name": "Service navigation",
      "evidence": "observed",
      "notes": "Navigation links to Services, Departments & Centers, Diseases & Conditions, etc., are present in the markup."
    },
    {
      "name": "Appointment-request validation",
      "evidence": "inferred",
      "notes": "The Appointments page likely contains a form with validation; the markup only shows the link."
    },
    {
      "name": "Billing/insurance information",
      "evidence": "observed",
      "notes": "Dedicated Billing & Insurance page is fetched and linked."
    }
  ],
  "complexity": "high",
  "complexity_rationale": "The site returns >30 distinct top‑level navigation links, multiple specialized service pages, and deep condition‑specific detail pages, indicating a rich information architecture.",
  "stack_clues": "unknown",
  "limitations": "None – all requested pages returned HTTP 200."
}

```json
{
  "rows": [
    {
      "source_id": "HOSP-10",
      "subcategory": "additional distinct academic medical center (complexity-matched reserve)",
      "source_name": "Mayo Clinic",
      "source_url": "https://www.mayoclinic.org",
      "verified_at": "2026-11-17",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.mayoclinic.org",
          "title": "The world's best hospital - Mayo Clinic",
          "local_file": "index.html"
        },
        {
          "url": "https://www.mayoclinic.org/appointments",
          "title": "Appointments at Mayo Clinic",
          "local_file": "appointments.html"
        },
        {
          "url": "https://www.mayoclinic.org/appointments/find-a-doctor",
          "title": "Doctors and Medical Staff - Mayo Clinic",
          "local_file": "find-a-doctor.html"
        },
        {
          "url": "https://www.mayoclinic.org/locations",
          "title": "U.S. and International Locations - Mayo Clinic",
          "local_file": "locations.html"
        },
        {
          "url": "https://www.mayoclinic.org/patient-visitor-guide",
          "title": "Patient and Visitor Guide - Mayo Clinic",
          "local_file": "patient-visitor-guide.html"
        },
        {
          "url": "https://www.mayoclinic.org/billing-insurance",
          "title": "Billing and Insurance - Mayo Clinic",
          "local_file": "billing-insurance.html"
        },
        {
          "url": "https://www.mayoclinic.org/departments-centers",
          "title": "Medical departments and centers - Mayo Clinic",
          "local_file": "departments-centers.html"
        },
        {
          "url": "https://www.mayoclinic.org/diseases-conditions",
          "title": "Medical Diseases & Conditions - Mayo Clinic",
          "local_file": "diseases-conditions.html"
        },
        {
          "url": "https://www.mayoclinic.org/diseases-conditions/brain-tumor/care-at-mayo-clinic/mac-20350092",
          "title": "Brain tumor - Care at Mayo Clinic - Mayo Clinic",
          "local_file": "brain-tumor.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "Doctor and location filters",
          "evidence": "inferred",
          "notes": "Find-a-Doctor and Locations pages are expected to provide filter controls, but the fetched markup does not expose the filter UI."
        },
        {
          "name": "Service navigation",
          "evidence": "observed",
          "notes": "Navigation links to Services, Departments & Centers, Diseases & Conditions, etc., are present in the markup."
        },
        {
          "name": "Appointment-request validation",
          "evidence": "inferred",
          "notes": "The Appointments page likely contains a form with validation; the markup only shows the link."
        },
        {
          "name": "Billing/insurance information",
          "evidence": "observed",
          "notes": "Dedicated Billing & Insurance page is fetched and linked."
        }
      ],
      "complexity": "high",
      "stack_clues": "unknown",
      "limitations": "None – all requested pages returned HTTP 200."
    }
  ]
}
```
