# FreshBite Cafe Replica

**Replica ID:** REST-05
**Category:** Restaurants and food service
**Fictional Branding:** FreshBite Cafe
**Approved Source:** https://www.panerabread.com
**Verification Method:** HTTP GET by the orchestrator (2026-11-16)
**Verification Result:** Verified

## How to Open
Open `index.html` in any modern web browser. No server required.

## Sitemap
1. `index.html` - Home
2. `home.html` - Home (Secondary)
3. `menu.html` - Menu
4. `locations.html` - Locations
5. `gift-cards.html` - Gift Cards
6. `about.html` - About Us
7. `values.html` - Our Values
8. `press.html` - Press Room
9. `community.html` - Our Communities
10. `support.html` - Customer Support
11. `404.html` - Not Found

## Page-to-Source Mapping
- `index.html` -> `https://www.panerabread.com`
- `home.html` -> `https://www.panerabread.com/en-us/home.html`
- `menu.html` -> `https://www.panerabread.com/en-us/menu.html`
- `locations.html` -> `https://www.panerabread.com/en-us/cafe-locator.html`
- `gift-cards.html` -> `https://www.panerabread.com/en-us/gift-cards.html`
- `about.html` -> `https://www.panerabread.com/en-us/company/about-panera.html`
- `values.html` -> `https://www.panerabread.com/en-us/food-values/our-values.html`
- `press.html` -> `https://www.panerabread.com/en-us/press/press-room.html`
- `community.html` -> `https://www.panerabread.com/en-us/food-values/community.html`
- `support.html` -> `https://www.panerabread.com/customercare`

## Sample Datasets
- `menuItems`: 12 rows
- `locations`: 6 rows
- `pressReleases`: 4 rows
- `communityInitiatives`: 3 rows
- `supportArticles`: 5 rows

## Interactions & Simulations
- **Menu Filtering:** Filters menu items by category using inline JS data.
- **Reservation Request:** Simulates a table booking with form validation and mock success message.
- **Gift Card Balance Check:** Simulates balance lookup with mock result.
- **Support Search:** Filters support articles by keyword.
- **Location Search:** Simulates location lookup (mock data).
- **Contact Form:** Simulates message submission.

## QC Gates
All gates reported as `not-tested` by the orchestrator.

## Limitations
- Source evidence limited to HTTP headers/redirects; no body content analyzed.
- All transactional flows are simulations.
- No real-time data, geolocation, or backend integration.
