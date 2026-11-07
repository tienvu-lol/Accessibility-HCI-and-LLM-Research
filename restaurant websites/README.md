# Restaurant category: 10 replicas (WEB-REPLICA-V1.0 layout)

Ten static, front-end structural replicas of live restaurant websites, built as accessibility and usability test sites for the LLM Accessibility & Usability Joint Loop. Every business name, all copy and every image is fictional or a placeholder.

## Opening a site

Open `REST-xx/index.html` in a browser. Every site runs from `file://`, offline, with no server and no build step.

Each folder follows the protocol layout:

```
REST-xx/
├── *.html                    pages, including 404.html
├── css/styles.css            the one shared stylesheet
├── js/main.js                the one shared script: site data first, then all behavior (vanilla JS)
├── assets/                   placeholder images, local fonts, vendor/bootstrap, vendor/jquery
├── README.md                 protocol record, sample counts, QC gates, sitemap, page-to-source mapping
├── fidelity-notes.md         what was replicated, adapted, added or left out; source defects; deviation
└── component-inventory.json  protocol schema: selector, pages, behavior, keyboard, status, validation
```

## Replicas

| ID | Replica (fictional) | Approved source | Stratum | Pages | Files | axe violations (1280 + 375px) | Scripted checks |
|---|---|---|---|---|---|---|---|
| REST-01 | Vicolo Verde | https://www.viacarota.com/ | Small local independent | 26 | 75 | 0 | 51/51 |
| REST-02 | Ironline Smokehouse | https://franklinbbq.com/ | BBQ / smokehouse | 23 | 75 | 0 | 30/31 * |
| REST-03 | Marlowe Hall | https://www.elevenmadisonpark.com/ | Fine dining | 26 | 71 | 0 | 30/30 |
| REST-04 | Fernway Kitchen | https://www.crossroadskitchen.com/ | Vegan / health | 23 | 57 | 0 | 29/29 |
| REST-05 | Copperline Hospitality | https://hogsalt.com/ | Multi-location group | 36 | 80 | 0 | 29/29 |
| REST-06 | Fornace Rossa | https://www.pizzeriabianco.com/ | Pizzeria | 26 | 67 | 0 | 26/27 * |
| REST-07 | Fieldbowl | https://www.sweetgreen.com/ | Fast-casual chain | 32 | 71 | 0 | 31/31 |
| REST-08 | Red Lantern Noodle Co. | https://www.xianfoods.com/ | Ethnic (Xi'an Chinese) | 28 | 69 | 0 | 30/30 |
| REST-09 | Alder Creek Brewing | https://www.russianriverbrewing.com/ | Brewery (age gate) | 27 | 70 | 0 | 37/37 |
| REST-10 | Morrow Bakery | https://tartinebakery.com/ | Café / bakery | 32 | 81 | 0 | 38/38 |

\* In the final `file://` run, one cross-page sessionStorage check failed on REST-02 (cart) and on REST-06 (announcement dismissal). Headless Chromium intermittently loses sessionStorage between `file://` page loads. Re-run over `http://localhost`, both sites passed every check in 3 of 3 runs. Details are in each site's QC gate 16.

All 10 sites: 0 JavaScript errors and 0 broken links, according to an automated audit of the HTML `href`/`src` attributes, the CSS `url()` values and the `.html` references in the JS.

## How the sites were tested (2026-11-07, on these delivered folders)

- **axe-core 4.14:** tags wcag2a/aa, wcag21a/aa, wcag22aa and best-practice. Every page was scanned at 1280px and 375px.
- **Scripted Playwright checks:**
  - **On every site:** the skip link, open/closed badges, empty-submit error summaries, filters, newsletter, site search and mobile navigation.
  - **On every page:** no horizontal scroll at 375px and no content overlapping the footer.
  - **Site-specific flows:** for example the cart, bowl builder, bookings, age gate, time zones and cake lead time.
- **Not tested:**
  - manual keyboard walkthroughs
  - screen readers
  - 200% text zoom
  - reduced-motion behavior

These results support a WCAG 2.2 AA–oriented baseline. They are not a conformance claim.

## Protocol deviations (all 10 sites)

WEB-REPLICA-V1.0 prohibits both of the following libraries. Both are included by Isaac's decisions on 2026-11-07, and each `fidelity-notes.md` and QC gate 13 records them.

- **Bootstrap 5.3.3** (CSS and the JS bundle), stored locally in `assets/vendor/bootstrap/`. It is used for layout and components. The sites were built before the protocol was adopted, and the decision was to change only the docs and layout.
- **jQuery 3.7.1**, stored locally in `assets/vendor/jquery/`. It is loaded on every page, before Bootstrap, so `jQuery` and `$` are available (for example to test tools or scripts). The decision was to include it and keep the existing vanilla JavaScript, so each site's own `js/main.js` does not call it. With jQuery present, Bootstrap also registers its jQuery plugin interface, such as `$('#id').modal('show')`.

No PHP or other server-side code is used anywhere.

**Process note:** the protocol asks for one replica per delivery with a stop after each. These ten were built in one sequence, at Isaac's instruction, before the protocol was added.
