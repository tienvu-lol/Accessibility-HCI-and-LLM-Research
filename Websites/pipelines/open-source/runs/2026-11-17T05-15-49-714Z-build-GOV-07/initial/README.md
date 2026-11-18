# City of Oakhaven Replica (GOV-07)

## Replica Information
- **Replica ID**: GOV-07
- **Category**: Government (Public and government)
- **Fictional Branding**: City of Oakhaven
- **Approved Source**: [City of Austin](https://www.austintexas.gov)
- **Verification Method**: HTTP GET by the orchestrator
- **Verification Date**: 2026-11-16
- **Source Verified At**: 2026-11-16
- **Source Approved At**: 2026-11-17

## How to Open
Open `index.html` in any modern web browser. The site is designed to work locally via `file://` protocol. No server is required.

## Sitemap
1. `index.html` - Home
2. `services.html` - All Services
3. `departments.html` - Departments
4. `news.html` - News
5. `events.html` - Events
6. `service-request.html` - Service Request (Report a Problem)
7. `pay-utility-bill.html` - Pay Utility Bill
8. `housing.html` - Housing Assistance
9. `park-directory.html` - Park Directory
10. `police.html` - Police Department
11. `permits.html` - Types of Permits
12. `animal-services.html` - Animal Services
13. `404.html` - Page Not Found

## Page-to-Source Mapping
| Local File | Source URL |
| :--- | :--- |
| `index.html` | https://www.austintexas.gov/ |
| `services.html` | https://www.austintexas.gov/services |
| `departments.html` | https://www.austintexas.gov/departments |
| `news.html` | https://www.austintexas.gov/news |
| `events.html` | https://www.austintexas.gov/events |
| `service-request.html` | https://www.austintexas.gov/311 |
| `pay-utility-bill.html` | https://www.austintexas.gov/services/pay-utility-bill |
| `housing.html` | https://www.austintexas.gov/housing |
| `park-directory.html` | https://www.austintexas.gov/parks/locations/park-directory |
| `police.html` | https://www.austintexas.gov/police |
| `permits.html` | https://www.austintexas.gov/development-services/types-permits |
| `animal-services.html` | https://www.austintexas.gov/animal-services |
| `404.html` | N/A (Standard error page) |

## Sample Dataset Row Counts
- **Services**: 10 items
- **Departments**: 8 items
- **News**: 5 items
- **Events**: 4 items
- **Parks**: 6 items
- **Permits**: 5 items
- **Animal Services**: 4 items
- **Service Request Categories**: 3 items (Pothole, Graffiti, Noise)

## Interaction and Simulation Notes
- **Service Search**: Filters the service list on `services.html` using client-side JavaScript.
- **Alerts**: Dismissable alert banner on `news.html` and `index.html`. Persistence via `sessionStorage`.
- **Calendar Navigation**: Switches event list by month/year on `events.html`. (Demo)
- **Report-a-Problem Form**: Validates fields on `service-request.html` and simulates submission with a success message.
- **Pay Utility Bill**: Mock payment form on `pay-utility-bill.html` with validation and "Demo Payment" success state. No real transactions occur.
- **Language Control**: Toggles English/Spanish text in the header. (Demo)

## QC Gates
All Quality Control gates are reported as `not-tested` as the orchestrator will run the shared QC tool.
1. Structure: not-tested
2. Semantics: not-tested
3. Accessibility: not-tested
4. Performance: not-tested
5. Security: not-tested
6. Fidelity: not-tested
7. Documentation: not-tested
