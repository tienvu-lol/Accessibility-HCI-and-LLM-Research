# GOV-06 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-13-23-711Z-research-GOV-06`
- **Scope:** partial — this file covers GOV-06 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 3/3 candidate homepages and 7/7 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/GOV-06-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### GOV-06
{
  "source_id": "GOV-06",
  "subcategory": "additional distinct municipal government (complexity-matched reserve)",
  "source_name": "City of San Diego",
  "official_url": "https://www.sandiego.gov/",
  "verified_at": "2026-11-17 (HTTP GET by the orchestrator)",
  "verification_result": "verified",
  "source_pages": [
    {
      "url": "https://www.sandiego.gov/",
      "title": "City of San Diego Official Website",
      "local_file": "index.html"
    },
    {
      "url": "https://www.sandiego.gov/parks-and-recreation",
      "title": "Parks and Recreation | City of San Diego Official Website",
      "local_file": "parks-and-recreation.html"
    },
    {
      "url": "https://www.sandiego.gov/park-and-recreation/parks/permits",
      "title": "Park Use Permits and Applications | City of San Diego Official Website",
      "local_file": "park-permits.html"
    },
    {
      "url": "https://www.sandiego.gov/street-div/services/street-resurfacing-pothole-repair",
      "title": "Street Resurfacing and Pothole Repair | City of San Diego Official Website",
      "local_file": "pothole-repair.html"
    },
    {
      "url": "https://www.sandiego.gov/public-utilities/customer-support/pay-your-bill",
      "title": "Pay Your Bill | City of San Diego Official Website",
      "local_file": "pay-bill.html"
    },
    {
      "url": "https://www.sandiego.gov/cpp/filing/complaint-form",
      "title": "File a Complaint | City of San Diego Official Website",
      "local_file": "complaint-form.html"
    }
  ],
  "key_regions": [
    "header",
    "primary navigation",
    "hero/banner",
    "service listings",
    "sidebar (where present)",
    "footer"
  ],
  "key_interactions": [
    {
      "name": "search",
      "evidence": "inferred",
      "notes": "Search functionality is typical for municipal portals but not present in fetched navigation markup."
    },
    {
      "name": "alerts",
      "evidence": "inferred",
      "notes": "No explicit alerts link observed; likely present via dynamic components not captured in static HTML."
    },
    {
      "name": "calendar navigation",
      "evidence": "observed",
      "notes": "Event Calendar link appears in other_links of the homepage."
    },
    {
      "name": "report‑a‑problem form",
      "evidence": "observed",
      "notes": "Complaint form page fetched (redirected to /cpp/filing/complaint-form)."
    },
    {
      "name": "language control",
      "evidence": "observed",
      "notes": "Language Translation link present in other_links."
    },
    {
      "name": "payment form",
      "evidence": "observed",
      "notes": "Pay Your Bill page provides a payment interface."
    }
  ],
  "complexity": "medium",
  "stack_clues": "unknown",
  "limitations": "None – all requested pages returned HTTP 200."
}

```json
{
  "rows": [
    {
      "source_id": "GOV-06",
      "subcategory": "additional distinct municipal government (complexity-matched reserve)",
      "source_name": "City of San Diego",
      "source_url": "https://www.sandiego.gov/",
      "verified_at": "2026-11-17",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.sandiego.gov/",
          "title": "City of San Diego Official Website",
          "local_file": "index.html"
        },
        {
          "url": "https://www.sandiego.gov/parks-and-recreation",
          "title": "Parks and Recreation | City of San Diego Official Website",
          "local_file": "parks-and-recreation.html"
        },
        {
          "url": "https://www.sandiego.gov/park-and-recreation/parks/permits",
          "title": "Park Use Permits and Applications | City of San Diego Official Website",
          "local_file": "park-permits.html"
        },
        {
          "url": "https://www.sandiego.gov/street-div/services/street-resurfacing-pothole-repair",
          "title": "Street Resurfacing and Pothole Repair | City of San Diego Official Website",
          "local_file": "pothole-repair.html"
        },
        {
          "url": "https://www.sandiego.gov/public-utilities/customer-support/pay-your-bill",
          "title": "Pay Your Bill | City of San Diego Official Website",
          "local_file": "pay-bill.html"
        },
        {
          "url": "https://www.sandiego.gov/cpp/filing/complaint-form",
          "title": "File a Complaint | City of San Diego Official Website",
          "local_file": "complaint-form.html"
        }
      ],
      "key_regions": [
        "header",
        "primary navigation",
        "hero/banner",
        "service listings",
        "sidebar",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "search",
          "evidence": "inferred",
          "notes": "Search functionality typical but not visible in static markup."
        },
        {
          "name": "alerts",
          "evidence": "inferred",
          "notes": "No explicit alerts link observed."
        },
        {
          "name": "calendar navigation",
          "evidence": "observed",
          "notes": "Event Calendar link present."
        },
        {
          "name": "report‑a‑problem form",
          "evidence": "observed",
          "notes": "Complaint form page available."
        },
        {
          "name": "language control",
          "evidence": "observed",
          "notes": "Language Translation link present."
        },
        {
          "name": "payment form",
          "evidence": "observed",
          "notes": "Pay Your Bill page provides payment interface."
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": ""
    }
  ]
}
```
