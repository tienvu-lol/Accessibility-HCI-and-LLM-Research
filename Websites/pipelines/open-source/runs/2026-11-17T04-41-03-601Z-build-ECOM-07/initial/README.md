# ECOM-07 Replica: Summit & Stone

## Overview
This is a static website replica of the Patagonia e-commerce site (ECOM-07), built for accessibility and usability research. It uses fictional branding ("Summit & Stone") and original content.

## Source Information
- **Source URL**: https://www.patagonia.com/
- **Verified At**: 2026-11-16
- **Verification Method**: HTTP GET by the orchestrator
- **Approved At**: 2026-11-17
- **Approved By**: Samhith Varma Yallamraju

## How to Open
Open `index.html` in any modern web browser. No server is required.

## Sitemap
1. `index.html` - Home
2. `home.html` - New Arrivals
3. `shop-womens.html` - Women's Collection
4. `shop-mens.html` - Men's Collection
5. `shop-kids-baby.html` - Kids & Baby
6. `shop-gear.html` - Gear
7. `worn-wear.html` - Worn Wear
8. `returns.html` - Returns & Repairs
9. `account-register.html` - Register
10. `stories-articles.html` - Stories
11. `progress-report.html` - Progress Report
12. `guides-size-fit.html` - Size Guide
13. `repairs.html` - Product Care & Repairs
14. `404.html` - Page Not Found

## Sample Datasets
- **Products**: 6 rows inlined in `js/main.js`.
- **Articles**: 3 rows hardcoded in `stories-articles.html`.
- **Size Data**: 10 rows hardcoded in `guides-size-fit.html`.

## Interactions & Simulations
- **Navigation**: Mobile menu toggle.
- **Product Filtering**: Client-side filtering on category pages.
- **Add to Cart**: Simulation via alert.
- **Forms**: Client-side validation and submission simulation.

## QC Gates
- **Gate 1 (Structure)**: not-tested
- **Gate 2 (Semantics)**: not-tested
- **Gate 3 (Accessibility)**: not-tested
- **Gate 4 (Interactivity)**: not-tested
- **Gate 5 (Content)**: not-tested
- **Gate 6 (Assets)**: not-tested
- **Gate 7 (Documentation)**: not-tested

## Limitations
- No real transactions or accounts.
- No real images or backend.
- No screen reader or cross-browser testing.
