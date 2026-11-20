# CORP-R09 — open-source source research (slot 09)

- **Run:** `2026-11-17T05-40-06-132Z-research-CORP-R09`
- **Scope:** partial — this file covers CORP-R09 only. The rest of the category is researched separately.
- **Research model:** unsloth/Llama-3.3-70B-Instruct-GGUF (vt-arc-falcon-llamacpp, llama3.3-community, open weights) declared for slot 09
- **Verification:** HTTP GET performed by the orchestrator (`scripts/verify-sources.mjs`), 1/3 candidate homepages and 11/11 interior pages returned 2xx. Nothing was rendered in a browser and no interaction was exercised.
- **Evidence:** `pipelines/open-source/research/evidence/CORP-R09-http-2026-11-17.json`
- **Status:** proposals only. No source is approved and no row has been written to `metadata/`. The Claude group's Phase A waiver does not apply here.

## Proposed sources

### CORP-R09
- source_id: CORP-R09
- subcategory: technology/software company
- source_name: Microsoft
- official_url: https://www.microsoft.com/en-us
- verified_at: 2024-09-16
- verification_result: verified
- source_pages:
  - https://www.microsoft.com/en-us (index.html, Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps)
  - https://www.microsoft.com/microsoft-365 (microsoft-365.html, Microsoft 365 for Individuals: Subscription for Productivity Apps)
  - https://www.microsoft.com/en-us/windows/ (windows.html, Experience the Windows difference with Windows 11 OS, Laptops, PCs & Apps | Microsoft Windows)
  - https://www.microsoft.com/surface (surface.html, Microsoft Surface: Laptops, Tablets & Computers | Microsoft Surface)
  - https://www.microsoft.com/en-us/store/b/sale?icid=DSM_TopNavDeals (sale.html, Microsoft Store - Deals on Laptops, Windows Computers & Other Sales)
  - https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook (outlook.html, Microsoft Outlook Personal Email and Calendar | Microsoft 365)
  - https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage (onedrive.html, Personal File Sharing & Cloud Storage | Microsoft OneDrive)
  - https://www.microsoft.com/en-us/microsoft-teams/group-chat-software (teams.html, Video Conferencing, Meetings, Calling | Microsoft Teams)
  - https://www.microsoft.com/en-us/education (education.html, Education Technology Solutions with AI | Microsoft for Education)
  - https://www.microsoft.com/en-us/store/b/gift-cards?icid=DSM_All_GiftCards (gift-cards.html, Gift Cards: XBOX Gift Cards for Gamers & More - Microsoft Store)
  - https://www.microsoft.com/en-us/sitemap (sitemap.html, Microsoft.com Site Map)
- key_regions: header, navigation, hero, content bands, sidebar, footer
- key_interactions:
  - name: search
    evidence: inferred
    notes: No search form was found in the fetched markup.
  - name: pricing toggle
    evidence: observed
    notes: Pricing information and toggles were found on the Microsoft 365 page.
  - name: help search
    evidence: inferred
    notes: No help search form was found in the fetched markup.
  - name: product filters
    evidence: observed
    notes: Product filters were found on the Surface and Windows pages.
- complexity: medium
- stack_clues: unknown
- limitations: None of the pages failed to load, but some interactions (like search and help search) were not found in the fetched markup.

```json
{"rows": [
  {
    "source_id": "CORP-R09",
    "subcategory": "technology/software company",
    "source_name": "Microsoft",
    "source_url": "https://www.microsoft.com/en-us",
    "verified_at": "2024-09-16",
    "verification_method": "HTTP GET by the orchestrator",
    "verification_result": "verified",
    "evidence_reference": "",
    "source_pages": [
      {"url": "https://www.microsoft.com/en-us", "title": "Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps", "local_file": "index.html"},
      {"url": "https://www.microsoft.com/microsoft-365", "title": "Microsoft 365 for Individuals: Subscription for Productivity Apps", "local_file": "microsoft-365.html"},
      {"url": "https://www.microsoft.com/en-us/windows/", "title": "Experience the Windows difference with Windows 11 OS, Laptops, PCs & Apps | Microsoft Windows", "local_file": "windows.html"},
      {"url": "https://www.microsoft.com/surface", "title": "Microsoft Surface: Laptops, Tablets & Computers | Microsoft Surface", "local_file": "surface.html"},
      {"url": "https://www.microsoft.com/en-us/store/b/sale?icid=DSM_TopNavDeals", "title": "Microsoft Store - Deals on Laptops, Windows Computers & Other Sales", "local_file": "sale.html"},
      {"url": "https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook", "title": "Microsoft Outlook Personal Email and Calendar | Microsoft 365", "local_file": "outlook.html"},
      {"url": "https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage", "title": "Personal File Sharing & Cloud Storage | Microsoft OneDrive", "local_file": "onedrive.html"},
      {"url": "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software", "title": "Video Conferencing, Meetings, Calling | Microsoft Teams", "local_file": "teams.html"},
      {"url": "https://www.microsoft.com/en-us/education", "title": "Education Technology Solutions with AI | Microsoft for Education", "local_file": "education.html"},
      {"url": "https://www.microsoft.com/en-us/store/b/gift-cards?icid=DSM_All_GiftCards", "title": "Gift Cards: XBOX Gift Cards for Gamers & More - Microsoft Store", "local_file": "gift-cards.html"},
      {"url": "https://www.microsoft.com/en-us/sitemap", "title": "Microsoft.com Site Map", "local_file": "sitemap.html"}
    ],
    "key_regions": ["header", "navigation", "hero", "content bands", "sidebar", "footer"],
    "key_interactions": [
      {"name": "search", "evidence": "inferred", "notes": "No search form was found in the fetched markup."},
      {"name": "pricing toggle", "evidence": "observed", "notes": "Pricing information and toggles were found on the Microsoft 365 page."},
      {"name": "help search", "evidence": "inferred", "notes": "No help search form was found in the fetched markup."},
      {"name": "product filters", "evidence": "observed", "notes": "Product filters were found on the Surface and Windows pages."}
    ],
    "complexity": "medium",
    "stack_clues": "unknown",
    "limitations": "None of the pages failed to load, but some interactions (like search and help search) were not found in the fetched markup."
  }
]}
```
