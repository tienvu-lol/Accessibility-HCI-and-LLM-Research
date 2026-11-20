# FASH-06 — open-source source research (slot 10)

- **Run:** `2026-11-17T05-14-14-976Z-research-FASH-06`
- **Scope:** partial — this file covers FASH-06 only. The rest of the category is researched separately.
- **Research model:** unsloth/gpt-oss-120b-GGUF (vt-arc-falcon-llamacpp, apache-2.0, open weights) declared for slot 10
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 2/3 candidate homepages and 6/7 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/FASH-06-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### FASH-06
- **source_id**: FASH-06  
- **subcategory**: complexity‑matched reserve  
- **source_name**: Harper's Bazaar  
- **official_url**: https://www.harpersbazaar.com/  
- **verified_at**: unknown (HTTP GET by the orchestrator)  
- **verification_result**: verified  
- **source_pages**:  
  1. `url`: https://www.harpersbazaar.com/  
     `title`: Harper's BAZAAR - Your Source for Fashion Trends, Beauty Tips, Pop Culture News, and Celebrity Style  
     `local_file`: home-index.html  
  2. `url`: https://www.harpersbazaar.com/fashion/  
     `title`: Fashion 2026 - Runway Trends, Fashion Designers, and Style Tips  
     `local_file`: fashion-index.html  
  3. `url`: https://www.harpersbazaar.com/beauty/  
     `title`: Beauty Tips 2026 - Latest Hair, Makeup, and Beauty Advice  
     `local_file`: beauty-index.html  
  4. `url`: https://www.harpersbazaar.com/email/harpersbazaar-newsletter  
     `title`: Harper’s BAZAAR Newsletter: Sign Up for Free  
     `local_file`: newsletter-index.html  
  5. `url`: https://www.harpersbazaar.com/culture/travel-dining/  
     `title`: Bazaar's Guide to Travel: Best Travel Destinations, Tips, and more  
     `local_file`: travel-dining-index.html  
  6. `url`: https://www.harpersbazaar.com/celebrity/red-carpet-dresses/a74434344/all-the-red-carpet-looks-2026-governors-awards-photos/  
     `title`: All the Red-Carpet Looks From the 2026 Governors Awards  
     `local_file`: red-carpet-index.html  

- **key_regions**: ["header", "navigation", "hero", "content band 1", "content band 2", "footer"]  
- **key_interactions**:  
  1. `name`: editorial navigation, `evidence`: observed, `notes`: navigation links appear in the fetched markup.  
  2. `name`: gallery / lightbox carousel, `evidence`: inferred, `notes`: typical for fashion editorial sites but no gallery markup seen in the fetched pages.  
  3. `name`: article search, `evidence`: inferred, `notes`: search endpoint exists but was blocked by robots.txt, so not observed.  
  4. `name`: newsletter sign‑up, `evidence`: observed, `notes`: newsletter page contains a sign‑up form in the markup.  

- **complexity**: medium – the site returns multiple top‑level sections (fashion, beauty, travel, etc.) and a rich set of article links, indicating a moderately complex information architecture.  
- **stack_clues**: unknown – no explicit server or framework identifiers were present in the fetched markup.  
- **limitations**: Search page (https://www.harpersbazaar.com/search/) was not fetched due to robots.txt disallow; status unknown.

---

```json
{
  "rows": [
    {
      "source_id": "FASH-06",
      "subcategory": "complexity-matched reserve",
      "source_name": "Harper's Bazaar",
      "source_url": "https://www.harpersbazaar.com/",
      "verified_at": "unknown (HTTP GET by the orchestrator)",
      "verification_method": "HTTP GET by the orchestrator",
      "verification_result": "verified",
      "evidence_reference": "",
      "source_pages": [
        {
          "url": "https://www.harpersbazaar.com/",
          "title": "Harper's BAZAAR - Your Source for Fashion Trends, Beauty Tips, Pop Culture News, and Celebrity Style",
          "local_file": "home-index.html"
        },
        {
          "url": "https://www.harpersbazaar.com/fashion/",
          "title": "Fashion 2026 - Runway Trends, Fashion Designers, and Style Tips",
          "local_file": "fashion-index.html"
        },
        {
          "url": "https://www.harpersbazaar.com/beauty/",
          "title": "Beauty Tips 2026 - Latest Hair, Makeup, and Beauty Advice",
          "local_file": "beauty-index.html"
        },
        {
          "url": "https://www.harpersbazaar.com/email/harpersbazaar-newsletter",
          "title": "Harper’s BAZAAR Newsletter: Sign Up for Free",
          "local_file": "newsletter-index.html"
        },
        {
          "url": "https://www.harpersbazaar.com/culture/travel-dining/",
          "title": "Bazaar's Guide to Travel: Best Travel Destinations, Tips, and more",
          "local_file": "travel-dining-index.html"
        },
        {
          "url": "https://www.harpersbazaar.com/celebrity/red-carpet-dresses/a74434344/all-the-red-carpet-looks-2026-governors-awards-photos/",
          "title": "All the Red-Carpet Looks From the 2026 Governors Awards",
          "local_file": "red-carpet-index.html"
        }
      ],
      "key_regions": [
        "header",
        "navigation",
        "hero",
        "content band 1",
        "content band 2",
        "footer"
      ],
      "key_interactions": [
        {
          "name": "editorial navigation",
          "evidence": "observed",
          "notes": "navigation links appear in the fetched markup"
        },
        {
          "name": "gallery / lightbox carousel",
          "evidence": "inferred",
          "notes": "typical for fashion editorial sites but no gallery markup seen in the fetched pages"
        },
        {
          "name": "article search",
          "evidence": "inferred",
          "notes": "search endpoint exists but was blocked by robots.txt, so not observed"
        },
        {
          "name": "newsletter sign-up",
          "evidence": "observed",
          "notes": "newsletter page contains a sign‑up form in the markup"
        }
      ],
      "complexity": "medium",
      "stack_clues": "unknown",
      "limitations": "Search page (https://www.harpersbazaar.com/search/) blocked by robots.txt; status unknown"
    }
  ]
}
```
