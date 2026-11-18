# Refinery29 Replica (FASH-08)

**Replica ID:** fashion/open-source/FASH-08  
**Category:** fashion  
**Slot:** 8  
**Fictional Branding:** Refinery29 Replica  

**Approved Source:**  
- Source Name: Refinery29  
- Source URL: https://www.refinery29.com/en-us  
- Verified At: 2026-11-17  
- Verification Method: HTTP GET by the orchestrator  
- Verification Result: verified  

**How to Open Locally:**  
Download the entire directory and open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge). No server required; the site uses only relative paths and inline data.

**Full Sitemap:**  
1. index.html – Home  
2. fashion.html – Fashion category  
3. beauty.html – Beauty category  
4. shopping.html – Shopping category  
5. summer-lookbook-2026.html – Lookbook/gallery  
6. money-diary.html – Money Diary (author/story)  
7. horoscope.html – Horoscope (story)  
8. podcasts.html – Podcasts (author/story)  
9. 404.html – Error page  

**Page-to-Source Mapping:**  
- index.html → https://www.refinery29.com/en-us  
- fashion.html → https://www.refinery29.com/en-us/fashion/  
- beauty.html → https://www.refinery29.com/en-us/beauty/  
- shopping.html → https://www.refinery29.com/en-us/shopping/  
- summer-lookbook-2026.html → https://www.refinery29.com/en-us/summer-lookbook-2026  
- money-diary.html → https://www.refinery29.com/en-us/money-diary  
- horoscope.html → https://www.refinery29.com/en-us/horoscope  
- podcasts.html → https://www.refinery29.com/en-us/podcasts  
- 404.html → (error page, not in source)  

**Sample Dataset Row Counts (inline in js/main.js):**  
- fashionArticles: 10 items  
- beautyArticles: 8 items  
- shoppingItems: 12 items  
- lookbookImages: 15 images  
- diaryEntries: 5 entries  
- horoscopeSigns: 12 zodiac signs  
- podcastEpisodes: 6 episodes  

**Interaction and Simulation Notes:**  
- Editorial navigation: observed; primary-nav links update active state via aria-current.  
- Gallery/lightbox or carousel: inferred; lookbook page includes a JS-driven carousel with modal lightbox for image view.  
- Article search: observed; search form filters relevant dataset per page and shows results in-place.  
- Newsletter simulation: inferred; footer form shows toast confirmation on submit (no actual submission).  

**Seven QC Gates (Rules.md section 9):**  
All gates left as `not-tested`; the orchestrator will populate after the real QC run.  
1. HTML validity: not-tested  
2. CSS validity: not-tested  
3. JS linting: not-tested  
4. Color contrast: not-tested  
5. Keyboard navigation: not-tested  
6. Screen reader readability: not-tested  
7. Responsiveness (reflow at 375px): not-tested  

**What Was Not Tested:**  
- Screen readers, zoom, manual keyboard walkthroughs, non-Chromium browsers (unless explicitly stated by orchestrator).  
- Deeper article pages beyond those listed (e.g., individual fashion/beauty articles) – omitted due to lack of evidence.  
- Any server‑dependent features (e.g., real‑time comments, user accounts) – replaced with static simulations.  

---  
*This replica is intended for research use only. No real logos, trademarks, copyrighted text, or personal data are used.*  
