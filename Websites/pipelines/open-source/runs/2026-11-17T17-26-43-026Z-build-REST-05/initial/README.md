# Harvest Table Replica — REST-05

## Replica Information
- **Replica ID:** REST-05
- **Category:** Restaurant (Fast-Casual Chain)
- **Fictional Brand:** Harvest Table
- **Approved Source:** [Panera Bread](https://www.panerabread.com)
- **Verification Method:** HTTP GET by the orchestrator
- **Verification Date:** 2026-11-16
- **Verification Result:** Verified
- **Evidence Reference:** `pipelines/open-source/research/evidence/REST-05-http-2026-11-16.json`

## How to Open Locally
1. Download all files from this directory.
2. Open `index.html` in any modern web browser.
3. No server required — all assets are local.

## Sitemap
| Page | Local File | Source URL |
|------|------------|------------|
| Home | `index.html` | https://www.panerabread.com |
| Home (Secondary) | `home.html` | https://www.panerabread.com/en-us/home.html |
| Menu | `menu.html` | https://www.panerabread.com/en-us/menu.html |
| Locations | `locations.html` | https://www.panerabread.com/en-us/cafe-locator.html |
| Gift Cards | `gift-cards.html` | https://www.panerabread.com/en-us/gift-cards.html |
| About | `about.html` | https://www.panerabread.com/en-us/company/about-panera.html |
| Values | `values.html` | https://www.panerabread.com/en-us/food-values/our-values.html |
| Press | `press.html` | https://www.panerabread.com/en-us/press/press-room.html |
| Community | `community.html` | https://www.panerabread.com/en-us/food-values/community.html |
| Support | `support.html` | https://www.panerabread.com/customercare |
| 404 | `404.html` | N/A (Error Page) |

## Page-to-Source Mapping
- All pages map to the approved source URLs as listed above.
- Body content is fictionalized due to lack of observed body content in verification evidence.

## Sample Dataset Row Counts
- `js/main.js` inline data:
  - Menu Items: 12 rows
  - Locations: 4 rows
  - Gift Card Denominations: 3 rows
  - Press Releases: 3 rows
  - Community Programs: 2 rows

## Interaction & Simulation Notes
- **Menu Filtering:** Implemented via inline JS filtering of `menu-items.js` data.
- **Gift Card Balance Check:** Simulation form with random balance output.
- **Support Search:** Filters FAQ list by keyword.
- **Reservation Request:** Simulation form with demo success state.
- **Newsletter Signup:** Simulation form with demo success state.
- All transactions, submissions, and account actions are clearly labeled as simulations.

## QC Gates (Rules.md Section 9)
- Gate 1 (Structure): Not Tested
- Gate 2 (Accessibility): Not Tested
- Gate 3 (Performance): Not Tested
- Gate 4 (Security): Not Tested
- Gate 5 (Compatibility): Not Tested
- Gate 6 (Fidelity): Not Tested
- Gate 7 (Documentation): Not Tested

## Limitations
- Screen readers, zoom, manual keyboard walkthroughs, and non-Chromium browsers are not tested.
- No real map rendering, live hours, or external API calls implemented.
- All body text, imagery, and specific layout details are fictionalized and marked as inferred/simulated.
