# Meridian Valley Bank Replica (CORP-05)

## Replica Information
- **Replica ID**: CORP-05
- **Category**: Banking and technology companies (national retail bank)
- **Fictional Branding**: Meridian Valley Bank
- **Approved Source**: [Wells Fargo](https://www.wellsfargo.com)
- **Verification Method**: HTTP GET by the orchestrator
- **Verification Date**: 2026-11-16
- **Verification Result**: Verified

## How to Open
Open `index.html` in any modern web browser. No server is required. All assets are local.

## Sitemap
1. `index.html` - Home
2. `checking.html` - Checking Accounts
3. `checking-compare.html` - Compare Checking Accounts
4. `savings-cds.html` - Savings & CDs
5. `savings-rates.html` - Savings and CD Rates
6. `mortgage.html` - Home Mortgages
7. `mortgage-calculators.html` - Mortgage Calculators
8. `auto-loans.html` - Auto Loans
9. `help.html` - Customer Service
10. `help-routing.html` - Routing & Account Numbers
11. `about.html` - About Meridian Valley Bank
12. `about-inclusion.html` - Inclusion and Accessibility
13. `404.html` - Page Not Found

## Page-to-Source Mapping
| Local File | Source URL | Source Title |
| :--- | :--- | :--- |
| `index.html` | https://www.wellsfargo.com | Wells Fargo Bank | Financial Services & Online Banking |
| `checking.html` | https://www.wellsfargo.com/checking/ | Apply & Open a Checking Account Online Today | Wells Fargo |
| `checking-compare.html` | https://www.wellsfargo.com/checking/compare-checking-accounts/ | Compare Checking Accounts | Wells Fargo |
| `savings-cds.html` | https://www.wellsfargo.com/savings-cds/ | Open a Savings Account Online | Wells Fargo |
| `savings-rates.html` | https://www.wellsfargo.com/savings-cds/rates/ | Savings and Certificate of Deposit (CD) Interest Rates | Wells Fargo |
| `mortgage.html` | https://www.wellsfargo.com/mortgage/ | Home Mortgage Loans & Financing | Wells Fargo |
| `mortgage-calculators.html` | https://www.wellsfargo.com/mortgage/calculators/ | Mortgage Calculators | Wells Fargo |
| `auto-loans.html` | https://www.wellsfargo.com/auto-loans/ | Auto loans and financing | Wells Fargo |
| `help.html` | https://www.wellsfargo.com/help/ | Customer Service – Wells Fargo |
| `help-routing.html` | https://www.wellsfargo.com/help/routing-number/ | Routing & Account Number Information for Your Wells Fargo Accounts |
| `about.html` | https://www.wellsfargo.com/about/ | About Wells Fargo |
| `about-inclusion.html` | https://www.wellsfargo.com/about/inclusion/ | Inclusion and accessibility: Building an inclusive workplace | Wells Fargo |

## Sample Datasets
- **Checking Accounts**: 4 rows (Basic, Advantage, Clear Access, Student)
- **Savings/CD Rates**: 6 rows (Savings, 12mo/24mo/36mo/60mo CDs)
- **Auto Loan Rates**: 3 rows (New, Used, Refinance)
- **Help FAQs**: 5 rows
- **Routing Numbers**: 1 row (fictional)

## Interactions and Simulations
- **Savings Rate Table**: Sortable columns via vanilla JS.
- **Mortgage Calculator**: Monthly payment calculation using standard amortization formula.
- **Help Search**: Client-side filtering of inline FAQ dataset.
- **Branch Locator**: Intentional addition (inferred in task). Implemented as a disabled button triggering an accessible modal explaining it is a non-functional demonstration.
- **Application Buttons**: All "Open Account" or "Apply Now" buttons trigger an alert stating this is a demonstration.

## Quality Control Gates
- **Gate 1 (Structure)**: not-tested
- **Gate 2 (Accessibility)**: not-tested
- **Gate 3 (Performance)**: not-tested
- **Gate 4 (Responsiveness)**: not-tested
- **Gate 5 (Validation)**: not-tested
- **Gate 6 (Security)**: not-tested
- **Gate 7 (Fidelity)**: not-tested

## Limitations
- Screen readers, zoom, manual keyboard walkthroughs and non-Chromium browsers are not tested.
- No real financial quotes, transactions, banking access, sales submissions, or login.
- All rates and data are fictional and illustrative.
