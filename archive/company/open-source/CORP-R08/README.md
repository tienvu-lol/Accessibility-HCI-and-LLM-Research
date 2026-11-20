# Riverbank Community Bank Replica

**Replica ID:** company/open-source/CORP-R08  
**Category:** Banking and technology companies (company)  
**Slot:** 8  
**Fictional Branding:** Riverbank Community Bank  

**Approved Source:**  
- Source Name: First Horizon Bank  
- Source URL: https://www.firsthorizon.com/  
- Verified At: 2026-11-17  
- Verification Method: HTTP GET by the orchestrator  
- Verification Result: verified  

**How to Open Locally:**  
Download the entire site folder and open any `.html` file in a modern browser (e.g., Firefox, Safari, Chrome). No server is required; the site uses only relative paths and inline data.

**Full Sitemap:**  
1. index.html – Home  
2. about.html – About  
3. learning.html – Learning Center  
4. contact.html – Contact Us (includes branch search and contact form)  
5. support.html – Support (FAQ and contact info)  
6. checking.html – Checking & Savings Accounts  
7. loans.html – Loans & Credit  
8. digital.html – Digital Banking  
9. calculators.html – Financial Calculators  
10. careers.html – Careers  
11. 404.html – Page Not Found  

**Page-to-Source Mapping:**  
- index.html → https://www.firsthorizon.com/  
- about.html → https://www.firsthorizon.com/first-horizon-corporation  
- learning.html → https://www.firsthorizon.com/learning-center  
- contact.html → https://www.firsthorizon.com/personal/support/contact-us  
- support.html → https://www.firsthorizon.com/personal/support  
- checking.html → https://www.firsthorizon.com/personal/checking-and-savings  
- loans.html → https://www.firsthorizon.com/personal/personal-loans  
- digital.html → https://www.firsthorizon.com/personal/digital-banking  
- calculators.html → https://www.firsthorizon.com/personal/support/calculators  
- careers.html → https://www.firsthorizon.com/first-horizon-corporation/Careers  
- 404.html → (no source; standard error page)  

**Sample Dataset Row Counts:**  
- sampleRates.js: 5 rows (sample interest rates)  
- sampleBranches.js: 5 rows (branch/ATM locations)  
- sampleLearningResources.js: 5 rows (articles, videos, guides)  
- sampleCheckingProducts.js: 3 rows (checking/savings account types)  
- sampleLoanProducts.js: 3 rows (loan product types)  

**Interaction and Simulation Notes:**  
- Sample Rate Table: static table showing example rates; clearly labeled as sample data.  
- Loan Calculator: form that computes monthly payment from user‑entered principal, term, and rate; disclaimer indicates demo only.  
- Branch Search: input filters an inline array of branch objects; no external API.  
- Contact Inquiry: form validates client‑side and shows a toast‑style demo submission message; no email is sent.  
All simulations are explicitly marked as demos and do not imply real financial transactions.

**Quality Control Gates (per Rules.md section 9):**  
All gates are left as `not-tested`; the orchestrator will populate them after the QC run.  
1. HTML5 validity: not-tested  
2. CSS2/3 validity: not-tested  
3. JavaScript error‑free: not-tested  
4. WCAG 2.2 AA baseline: not-tested  
5. Responsive reflow at 375px: not-tested  
6. prefers-reduced-motion respected: not-tested  
7. Keyboard operability: not-tested  

**What Was Not Tested:**  
- Screen reader verification (unless otherwise informed by the orchestrator)  
- Manual zoom testing  
- Non‑Chromium browser compatibility beyond the QC suite  
- Real‑world performance metrics  

---  
*This replica is intended for research use only. No real logos, trademarks, copyrighted text, or personal data have been used.*  
