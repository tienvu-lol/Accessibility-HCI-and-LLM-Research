# HOSP-07 Replica: Metro General Health

## Replica Metadata
- **Replica ID**: HOSP-07
- **Category**: Healthcare (Hospitals and healthcare)
- **Fictional Organization**: Metro General Health
- **Approved Source**: [NYU Langone Health](https://nyulangone.org/)
- **Source Verified**: 2026-11-16 via HTTP GET by the orchestrator
- **Verification Method**: HTTP GET by the orchestrator
- **Verification Result**: Verified

## How to Open Locally
1. Download all files into a single directory.
2. Open `index.html` in a web browser using the `file://` protocol.
3. No server or build step is required.

## Sitemap
1. `index.html` - Patient Care at Metro General Health
2. `doctors.html` - Find a Doctor
3. `conditions.html` - Conditions We Treat
4. `locations.html` - Our Locations
5. `care-services.html` - Care & Services
6. `insurance-billing.html` - Insurance, Billing & Financial Assistance
7. `patient-forms.html` - Patient Forms
8. `brain-care.html` - Brain & Neurology
9. `cancer-care.html` - Cancer Center
10. `womens-health.html` - Women's Health
11. `contact-us.html` - Contact Us
12. `404.html` - Page Not Found

## Page-to-Source Mapping
| Local File | Source URL | Source Title |
| :--- | :--- | :--- |
| `index.html` | https://nyulangone.org/ | Patient Care at NYU Langone Health |
| `doctors.html` | https://nyulangone.org/doctors | Find a Doctor |
| `conditions.html` | https://nyulangone.org/conditions | Conditions We Treat |
| `locations.html` | https://nyulangone.org/locations | Our Locations |
| `care-services.html` | https://nyulangone.org/care-services | Care & Services |
| `insurance-billing.html` | https://nyulangone.org/insurance-billing-financial-assistance | Insurance, Billing & Financial Assistance |
| `patient-forms.html` | https://nyulangone.org/patient-forms | Patient Forms |
| `brain-care.html` | https://nyulangone.org/brain | Brain Care |
| `cancer-care.html` | https://nyulangone.org/cancer | Perlmutter Cancer Center |
| `womens-health.html` | https://nyulangone.org/womens-health | Women's Health |
| `contact-us.html` | https://nyulangone.org/contact-us | Contact Us |

## Sample Datasets
- **Doctors**: 15 rows (name, specialty, location, bio)
- **Locations**: 12 rows (name, address, region, hours, phone)
- **Conditions**: 20 rows (name, category)
- **Insurance Docs**: 8 rows (title, description)
- **Patient Forms**: 6 rows (title, description)

## Interactions & Simulations
- **Doctor Search**: Filters doctors by name/specialty using inline JS data.
- **Location Filter**: Filters locations by region using inline JS data.
- **Contact Form**: Validates input fields and shows a demo alert on submit.
- **Document Lists**: Renders lists of insurance and patient forms from inline data.
- **No Real Transactions**: All forms and links are simulations. No data is sent.

## QC Gates (Rules.md Section 9)
1. **HTML Validity**: Not Tested
2. **CSS Validity**: Not Tested
3. **JS Validity**: Not Tested
4. **Accessibility (WCAG 2.2 AA)**: Not Tested
5. **Performance**: Not Tested
6. **Security**: Not Tested
7. **Usability**: Not Tested

## Limitations
- No screen reader, zoom, manual keyboard, or non-Chromium browser testing performed.
- Source relied on heavy client-side rendering; this replica uses static HTML/CSS/JS.
- PDF delivery simulated with text anchors.
- Provider detail pages excluded per scope rule.
