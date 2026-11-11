/* Harborline Bank (fictional) - CORP-01 replica. Vanilla JS, inline demo data, no network. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const usd = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const usd2 = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const pct = (n, d = 2) => `${n.toFixed(d)}%`;
  const params = new URLSearchParams(location.search);

  /* ---------- demo data (all fictional and illustrative) ---------- */
  const CDS = [
    { term: 3, apy: [0.75, 0.90, 1.10] }, { term: 6, apy: [1.50, 1.65, 1.85] }, { term: 9, apy: [2.60, 2.75, 2.95] },
    { term: 12, apy: [2.40, 2.55, 2.75] }, { term: 13, apy: [1.60, 1.75, 1.95] }, { term: 18, apy: [2.00, 2.15, 2.35] },
    { term: 24, apy: [2.10, 2.25, 2.45] }, { term: 36, apy: [2.25, 2.40, 2.60] }, { term: 60, apy: [2.50, 2.65, 2.85] },
  ];
  const TIERS = ['Under $10,000', '$10,000 to $99,999', '$100,000 or more'];
  const CARDS = [
    { name: 'Tidewater Cash Card', cats: ['cash-back'], fee: 0, apr: '19.24% to 28.24% variable', perk: '2% cash back on groceries and gas, 1% on everything else', intro: '0% intro APR for 15 months on purchases' },
    { name: 'Everyday Flat 1.5% Card', cats: ['cash-back'], fee: 0, apr: '18.74% to 27.74% variable', perk: 'Unlimited 1.5% cash back on every purchase', intro: 'No intro offer' },
    { name: 'Lantern Travel Card', cats: ['travel'], fee: 95, apr: '20.24% to 29.24% variable', perk: '3 points per $1 on travel and dining; airport lounge day passes', intro: '30,000 bonus points after $3,000 in 90 days' },
    { name: 'Calm Waters Low-Rate Card', cats: ['low-intro'], fee: 0, apr: '15.99% to 25.99% variable', perk: 'Lower ongoing rate for planned purchases', intro: '0% intro APR for 21 months on purchases and transfers' },
    { name: 'Starter Builder Card', cats: ['credit-building'], fee: 0, apr: '24.99% variable', perk: 'Reports to all three credit bureaus; free score tracker', intro: 'Credit line review after 6 on-time months' },
    { name: 'Anchor Secured Card', cats: ['credit-building'], fee: 29, apr: '26.49% variable', perk: 'Refundable deposit sets your limit; upgrade path to unsecured', intro: 'Deposit from $200' },
    { name: 'Harborline Business Cash Card', cats: ['cash-back', 'business'], fee: 0, apr: '17.99% to 26.99% variable', perk: '2% cash back on office supplies and shipping', intro: 'Employee cards at no extra cost' },
  ];
  const CAT_LABEL = { 'cash-back': 'Cash back', travel: 'Travel', 'low-intro': 'Low intro rate', 'credit-building': 'Credit-building', business: 'Business' };
  const BRANCHES = [
    { name: 'Riverside Branch', type: 'branch', street: '210 Mill Street', city: 'Port Alder', zip: '90101', hours: 'Mon-Fri 9-5, Sat 9-1', tags: ['drive-up', 'saturday'] },
    { name: 'Riverside ATM Plaza', type: 'atm', street: '14 Pier Road', city: 'Port Alder', zip: '90102', hours: 'ATM open 24 hours', tags: ['drive-up', 'atm-24'] },
    { name: 'Lakemont Main Branch', type: 'branch', street: '5 Lakeview Avenue', city: 'Lakemont', zip: '90210', hours: 'Mon-Fri 9-5', tags: ['saturday'] },
    { name: 'Lakemont Transit ATM', type: 'atm', street: 'Station Concourse', city: 'Lakemont', zip: '90211', hours: 'ATM open 5am-midnight', tags: [] },
    { name: 'Cedar Falls Branch', type: 'branch', street: '88 Cedar Falls Parkway', city: 'Cedar Falls', zip: '90310', hours: 'Mon-Fri 9-5, Sat 9-1', tags: ['drive-up', 'saturday', 'atm-24'] },
    { name: 'Cedar Falls Market ATM', type: 'atm', street: '300 Orchard Lane', city: 'Cedar Falls', zip: '90311', hours: 'ATM open 24 hours', tags: ['atm-24'] },
    { name: 'Brookhaven Branch', type: 'branch', street: '17 Founders Square', city: 'Brookhaven', zip: '90415', hours: 'Mon-Fri 8:30-4:30', tags: [] },
    { name: 'Brookhaven College ATM', type: 'atm', street: 'Student Union, Level 1', city: 'Brookhaven', zip: '90416', hours: 'ATM open 6am-11pm', tags: [] },
    { name: 'Summit Ridge Branch', type: 'branch', street: '902 Ridge Road', city: 'Summit Ridge', zip: '90520', hours: 'Mon-Fri 9-5, Sat 9-12', tags: ['drive-up', 'saturday'] },
    { name: 'Summit Ridge Drive-up ATM', type: 'atm', street: '902 Ridge Road', city: 'Summit Ridge', zip: '90520', hours: 'ATM open 24 hours', tags: ['drive-up', 'atm-24'] },
    { name: 'Oak Harbor Branch', type: 'branch', street: '41 Harbor Way', city: 'Oak Harbor', zip: '90630', hours: 'Mon-Fri 9-5', tags: ['atm-24'] },
    { name: 'Oak Harbor Ferry ATM', type: 'atm', street: 'Ferry Terminal', city: 'Oak Harbor', zip: '90631', hours: 'ATM open 24 hours', tags: ['atm-24'] },
  ];
  const ARTICLES = [
    { title: 'Build a starter emergency fund in six steps', topic: 'saving', mins: 4, text: 'Start with one week of expenses, automate a small transfer, and grow the target as habits settle.' },
    { title: 'How a high-yield savings account differs from checking', topic: 'saving', mins: 3, text: 'Compare access, fees and APY to decide how to split everyday cash from goals.' },
    { title: 'What goes into a credit score', topic: 'credit', mins: 5, text: 'Payment history, utilization and account age explained with simple examples.' },
    { title: 'Using a first credit card responsibly', topic: 'credit', mins: 4, text: 'Keep balances low, pay on time and review statements each month.' },
    { title: 'Mortgage pre-approval checklist', topic: 'home-buying', mins: 6, text: 'Gather pay stubs, tax returns and bank statements before talking to a lender.' },
    { title: 'Fixed or adjustable: choosing a mortgage rate type', topic: 'home-buying', mins: 5, text: 'Weigh payment stability against a lower starting rate and how long you plan to stay.' },
    { title: 'Investing basics: stocks, bonds and funds', topic: 'investing', mins: 7, text: 'A plain-language tour of asset types, risk and diversification.' },
    { title: 'Retirement accounts compared: IRA and workplace plans', topic: 'retirement', mins: 6, text: 'Contribution limits, tax treatment and rollover basics side by side.' },
    { title: 'Spot and stop common payment scams', topic: 'fraud', mins: 4, text: 'Recognize urgency tactics, verify requests by calling a known number, and never share one-time codes.' },
    { title: 'Year-end money tune-up', topic: 'saving', mins: 3, text: 'Review recurring bills, raise automatic savings and check beneficiaries.' },
  ];
  const TOPIC_LABEL = { saving: 'Saving', credit: 'Credit', 'home-buying': 'Home buying', investing: 'Investing', retirement: 'Retirement', fraud: 'Fraud and security' };
  const FAQS = [
    { q: 'How do I reset my online banking password?', a: 'On the Log in page choose "Forgot your password?", then verify your identity with a one-time code. In this replica the flow is a labeled demo.', cat: 'online', tags: 'password login reset locked' },
    { q: 'How do I enroll in online banking?', a: 'Use the enrollment form on the Mobile & online banking page. You need an account number and the email address on file.', cat: 'online', tags: 'enroll sign up register' },
    { q: 'Where can I find my routing and account numbers?', a: 'Routing numbers are listed on the checking accounts page; your account number appears on statements and in the app under Account details.', cat: 'accounts', tags: 'routing account number direct deposit' },
    { q: 'What is the overdraft policy?', a: 'Harborline offers a linked-savings transfer and a standby credit line. Fees and eligibility are shown in the checking page overdraft section.', cat: 'accounts', tags: 'overdraft fee insufficient funds' },
    { q: 'How do I order checks?', a: 'Sign in, open the account, choose Order checks, and pick a style. Delivery takes five to seven business days.', cat: 'accounts', tags: 'checks order checkbook' },
    { q: 'How do I report a lost or stolen card?', a: 'Call 1-800-555-0100 any time, or lock the card in the app. A replacement arrives in three to five business days.', cat: 'cards', tags: 'lost stolen card lock freeze report' },
    { q: 'How do I dispute a card transaction?', a: 'Open the transaction in the app and choose Dispute, or call customer service within 60 days of the statement date.', cat: 'cards', tags: 'dispute charge transaction fraud' },
    { q: 'How do I set a travel notice?', a: 'Add dates and destinations under Card settings in the app. Notices are optional for most purchases.', cat: 'cards', tags: 'travel notice abroad international' },
    { q: 'How long does a wire transfer take?', a: 'Domestic wires sent before the 4 pm cutoff usually arrive the same business day. International timing varies.', cat: 'accounts', tags: 'wire transfer send money cutoff' },
    { q: 'Can I pay my mortgage online?', a: 'Yes. Add the loan under Pay & transfer, choose a date, and set up autopay if you like. Escrow changes are mailed.', cat: 'loans', tags: 'mortgage payment autopay escrow' },
    { q: 'How is my personal loan rate decided?', a: 'Rates depend on credit profile, amount and term. Use the personal loan calculator for an illustrative estimate.', cat: 'loans', tags: 'personal loan rate apr estimate' },
    { q: 'How can I recognize a phishing message?', a: 'Harborline never asks for your full password or one-time code by email, text or phone. Report suspicious messages through the app.', cat: 'security', tags: 'phishing scam fraud suspicious email text' },
    { q: 'What is two-step verification?', a: 'It sends a one-time code to your phone or an authenticator app when you sign in from a new device.', cat: 'security', tags: 'two-step 2fa verification code authenticator' },
    { q: 'What accessibility services are available?', a: 'Large print, braille and audio statements, relay calls, and in-branch assistance. See the Accessibility page.', cat: 'accounts', tags: 'accessibility braille large print relay screen reader' },
  ];
  const FAQ_CAT = { accounts: 'Accounts', cards: 'Cards', loans: 'Loans', online: 'Online banking', security: 'Security' };

  /* ---------- navigation ---------- */
  const nav = $('[data-component="primary-nav"]');
  const menuToggle = $('.menu-toggle');
  if (nav && menuToggle) {
    const triggers = $$('.nav-trigger', nav);
    const setMega = (t, open) => {
      t.setAttribute('aria-expanded', String(open));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
    };
    const closeMegas = (except) => triggers.forEach((t) => t !== except && setMega(t, false));
    const closeAll = () => {
      closeMegas();
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    triggers.forEach((t) => t.addEventListener('click', () => {
      const open = t.getAttribute('aria-expanded') !== 'true';
      closeMegas(t);
      setMega(t, open);
    }));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
      const menuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (!open && !menuOpen) return;
      const focusTarget = open && nav.contains(document.activeElement) ? open : menuOpen && getComputedStyle(menuToggle).display !== 'none' ? menuToggle : null;
      closeMegas();
      if (menuOpen && getComputedStyle(menuToggle).display !== 'none') { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); }
      if (focusTarget) focusTarget.focus();
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.site-header')) closeAll(); });
    nav.addEventListener('focusout', (e) => { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeMegas(); });
  }

  /* ---------- accordions (static and rendered) ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.accordion-trigger');
    if (!t) return;
    const open = t.getAttribute('aria-expanded') !== 'true';
    t.setAttribute('aria-expanded', String(open));
    document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
  });

  /* ---------- tabs ---------- */
  $$('[data-component="tabs"]').forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    const select = (tab, focus) => {
      tabs.forEach((x) => {
        const on = x === tab;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const to = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        select(tabs[to], true);
      });
    });
  });

  /* ---------- demo dialog ---------- */
  const dialog = $('#demo-dialog');
  if (dialog) {
    let opener = null;
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-demo]');
      if (!b) return;
      opener = b;
      $('#demo-dialog-text').textContent = b.dataset.demo;
      dialog.showModal();
    });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => opener && opener.focus());
  }

  /* ---------- form validation ---------- */
  const labelText = (el) => {
    const l = $(`label[for="${el.id}"]`);
    const c = l.cloneNode(true);
    $$('.req', c).forEach((r) => r.remove());
    return c.textContent.trim();
  };
  const fieldError = (el) => {
    const v = el.value.trim();
    const name = labelText(el);
    if (el.required && !v) return el.tagName === 'SELECT' ? `Select ${name.toLowerCase()}.` : `Enter ${name.toLowerCase()}.`;
    if (!v) return '';
    if (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return 'Enter an email address like name@example.com.';
    if (el.dataset.pattern && !new RegExp(`^(?:${el.dataset.pattern})$`).test(v)) return el.dataset.patternMsg;
    if (el.type === 'number') {
      const n = Number(v);
      if (Number.isNaN(n)) return 'Enter a number.';
      if ((el.min !== '' && n < +el.min) || (el.max !== '' && n > +el.max)) return `${name} must be between ${el.min} and ${el.max}.`;
    }
    return '';
  };
  const showError = (el, msg) => {
    const p = document.getElementById(`${el.id}-error`);
    p.textContent = msg;
    p.hidden = !msg;
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  };
  // cross-field rules, keyed by form[data-validate]
  const CHECKS = {
    mortgage: (f) => (+f.price.value && +f.down.value >= +f.price.value ? [[f.down, 'Down payment must be less than the home price.']] : []),
  };
  const monthly = (principal, ratePct, months) => {
    const r = ratePct / 1200;
    return r ? (principal * r) / (1 - (1 + r) ** -months) : principal / months;
  };
  const table = (caption, head, rows) => `<table><caption>${caption}</caption><thead><tr>${head.map((h, i) => `<th scope="col"${i ? ' class="num"' : ''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((c) => `<td class="num">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const RATE_BASE = { '30': 6.45, '15': 5.7, arm: 5.95, fha: 6.1 };
  const RATE_NAME = { '30': '30-year fixed', '15': '15-year fixed', arm: '7/6 adjustable', fha: '30-year FHA' };
  const CREDIT_ADJ = { '760': -0.25, '700': 0, '660': 0.35, '620': 0.9 };
  const LOAN_BASE = { excellent: 9.49, good: 13.99, fair: 19.49, building: 25.99 };
  const CALCS = {
    mortgage(f) {
      const loan = +f.price.value - +f.down.value, n = +f.term.value * 12, rate = +f.rate.value;
      const pay = monthly(loan, rate, n);
      let bal = loan; const rows = [];
      for (let y = 1; y <= +f.term.value; y++) {
        let interest = 0;
        for (let m = 0; m < 12; m++) { const i = bal * rate / 1200; interest += i; bal -= pay - i; }
        rows.push([`Year ${y}`, usd(interest), usd(pay * 12 - interest), usd(Math.max(bal, 0))]);
      }
      return `<h3>Estimate</h3><p class="result-big">${usd2(pay)} per month</p><p>Principal and interest on a ${usd(loan)} loan. Taxes, insurance and mortgage insurance are not included. Total interest: ${usd(pay * n - loan)}.</p><details><summary>Show yearly amortization schedule</summary>${table('Yearly amortization (illustration)', ['Year', 'Interest paid', 'Principal paid', 'Ending balance'], rows)}</details>`;
    },
    compare(f) {
      const loan = +f.loan.value;
      const a = [monthly(loan, +f.rate15.value, 180), 180], b = [monthly(loan, +f.rate30.value, 360), 360];
      const row = (p) => [usd2(p[0]), usd(p[0] * p[1] - loan), usd(p[0] * p[1])];
      return `<h3>Comparison</h3>${table('15-year versus 30-year', ['Loan', 'Monthly payment', 'Total interest', 'Total paid'], [['15-year fixed', ...row(a)], ['30-year fixed', ...row(b)]])}<p>The 15-year loan saves about ${usd((b[0] * b[1]) - (a[0] * a[1]))} in total cost but raises the payment by ${usd2(a[0] - b[0])} per month.</p>`;
    },
    afford(f) {
      const r = +f.rate.value / 1200, n = +f.term.value * 12;
      const loan = r ? (+f.budget.value * (1 - (1 + r) ** -n)) / r : +f.budget.value * n;
      return `<h3>Estimate</h3><p class="result-big">${usd(loan + +f.down.value)} home price</p><p>A ${usd(+f.budget.value)} monthly principal-and-interest budget supports a loan of about ${usd(loan)}. Add your ${usd(+f.down.value)} down payment for the price. Taxes and insurance are not included.</p>`;
    },
    rates(f) {
      const loan = +f.price.value - +f.down.value, ltv = loan / +f.price.value;
      const base = RATE_BASE[f.product.value] + CREDIT_ADJ[f.credit.value] + (ltv > 0.8 ? 0.2 : 0) + (f.purpose.value === 'refinance' ? 0.125 : 0);
      const term = f.product.value === '15' ? 180 : 360;
      const rows = [0, 0.5, 1].map((pts) => {
        const rate = base - pts * 0.2;
        return [`${pts} points`, pct(rate, 3), pct(rate + 0.12 + pts * 0.03, 3), usd2(monthly(loan, rate, term)), usd(loan * pts / 100)];
      });
      return `<h3>${RATE_NAME[f.product.value]} sample rates</h3>${table(`Illustrative offers for ZIP ${esc(f.zip.value)}`, ['Option', 'Rate', 'APR', 'Monthly P&amp;I', 'Upfront points'], rows)}<p class="small">Illustration only. These are not offers or live rates; the Harborline Bank brand is fictional.</p>`;
    },
    loan(f) {
      const n = +f.term.value, amt = +f.amount.value;
      const apr = LOAN_BASE[f.credit.value] + ((n - 36) / 12) * 0.5, pay = monthly(amt, apr, n);
      return `<h3>Estimate</h3><p class="result-big">${usd2(pay)} per month</p><p>Illustrative APR ${pct(apr)} over ${n} months on ${usd(amt)}. Total interest ${usd(pay * n - amt)}; total repaid ${usd(pay * n)}. Not an offer of credit.</p>`;
    },
    cd(f) {
      const dep = +f.deposit.value, row = CDS.find((c) => c.term === +f.term.value);
      const apy = row.apy[dep >= 100000 ? 2 : dep >= 10000 ? 1 : 0], earned = dep * ((1 + apy / 100) ** (row.term / 12) - 1);
      return `<h3>Estimate</h3><p class="result-big">${usd2(earned)} interest</p><p>${usd(dep)} for ${row.term} months at ${pct(apy)} APY grows to about ${usd2(dep + earned)}. Illustration only.</p>`;
    },
  };
  $$('form[data-validate]').forEach((form) => {
    const summary = $('.error-summary', form), success = $('.demo-success', form), result = $('[data-result]', form);
    const controls = $$('input, select, textarea', form).filter((el) => el.id && el.type !== 'checkbox' && el.type !== 'radio');
    // revalidate while typing so errors clear before blur; a layout shift at blur could swallow a submit click
    controls.forEach((el) => ['input', 'change'].forEach((ev) => el.addEventListener(ev, () => { if (el.hasAttribute('aria-invalid')) showError(el, fieldError(el)); })));
    $$('.error-summary', form).forEach((s) => s.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      document.getElementById(a.getAttribute('href').slice(1)).focus();
    }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const errors = [];
      controls.forEach((el) => { const m = fieldError(el); showError(el, m); if (m) errors.push([el, m]); });
      if (!errors.length && CHECKS[form.dataset.validate]) {
        CHECKS[form.dataset.validate](form).forEach(([el, m]) => { showError(el, m); errors.push([el, m]); });
      }
      if (success) success.hidden = true;
      if (errors.length) {
        $('ul', summary).innerHTML = errors.map(([el, m]) => `<li><a href="#${el.id}">${esc(m)}</a></li>`).join('');
        summary.hidden = false;
        summary.focus();
        if (result) result.innerHTML = '';
        return;
      }
      summary.hidden = true;
      if (result) result.innerHTML = CALCS[form.dataset.calc](form);
      else { success.hidden = false; success.focus(); }
    });
  });
  const showPw = $('#show-password');
  if (showPw) showPw.addEventListener('change', () => { $('#password').type = showPw.checked ? 'text' : 'password'; });

  /* ---------- list renderers ---------- */
  const listState = (status, msg, list, html, empty) => {
    list.innerHTML = html || '';
    status.textContent = msg;
    const e = document.getElementById(empty);
    if (e) e.hidden = !!html;
  };

  const cdBox = $('[data-list="cds"]');
  if (cdBox) {
    const f = { group: $('#cd-group'), tier: $('#cd-tier'), sort: $('#cd-sort') };
    const render = () => {
      const g = f.group.value, tier = f.tier.value;
      let rows = CDS.filter((c) => g === 'all' || (g === 'short' && c.term <= 12) || (g === 'mid' && c.term > 12 && c.term <= 24) || (g === 'long' && c.term > 24));
      const key = (c) => (tier === 'all' ? Math.max(...c.apy) : c.apy[+tier]);
      rows = f.sort.value === 'apy' ? rows.sort((a, b) => key(b) - key(a)) : rows.sort((a, b) => a.term - b.term);
      const cols = tier === 'all' ? [0, 1, 2] : [+tier];
      $('#cd-table').innerHTML = `<caption>Illustrative certificate of deposit rates</caption><thead><tr><th scope="col">Term</th>${cols.map((i) => `<th scope="col" class="num">${TIERS[i]}</th>`).join('')}</tr></thead><tbody>${rows.map((c) => `<tr><th scope="row">${c.term} months</th>${cols.map((i) => `<td class="num">${pct(c.apy[i])} APY</td>`).join('')}</tr>`).join('')}</tbody>`;
      $('#cd-status').textContent = `Showing ${rows.length} of ${CDS.length} terms.`;
    };
    Object.values(f).forEach((el) => el.addEventListener('change', render));
    render();
  }

  const cardBox = $('[data-list="cards"]');
  if (cardBox) {
    const cat = $('#card-cat'), nofee = $('#card-nofee'), sort = $('#card-sort');
    if (CAT_LABEL[params.get('cat')]) cat.value = params.get('cat');
    const render = () => {
      let rows = CARDS.filter((c) => (cat.value === 'all' || c.cats.includes(cat.value)) && (!nofee.checked || c.fee === 0));
      rows = rows.sort((a, b) => (sort.value === 'fee' ? a.fee - b.fee || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)));
      listState($('#card-status'), `${rows.length} of ${CARDS.length} cards shown.`, $('#card-list'), rows.map((c) => `<li class="card"><h3>${esc(c.name)}</h3><p>${c.cats.map((x) => `<span class="tag">${CAT_LABEL[x]}</span> `).join('')}</p><p>${esc(c.perk)}</p><p><strong>Intro:</strong> ${esc(c.intro)}<br><strong>Annual fee:</strong> ${c.fee ? usd(c.fee) : '$0'}<br><strong>APR:</strong> ${esc(c.apr)}</p><button type="button" class="btn" data-demo="Demo only: applying for the ${esc(c.name)} is simulated. No application was started and nothing was sent.">Apply (demo)<span class="visually-hidden"> for ${esc(c.name)}</span></button></li>`).join(''), 'card-empty');
    };
    [cat, nofee, sort].forEach((el) => el.addEventListener('change', render));
    $('#card-reset').addEventListener('click', () => { cat.value = 'all'; nofee.checked = false; sort.value = 'name'; render(); cat.focus(); });
    render();
  }

  const locBox = $('[data-list="branches"]');
  if (locBox) {
    const q = $('#loc-q'), type = $('#loc-type'), form = $('#loc-form');
    const render = () => {
      const terms = q.value.toLowerCase().split(/\s+/).filter(Boolean);
      const feats = $$('input[name="feat"]:checked', form).map((x) => x.value);
      const rows = BRANCHES.filter((b) => (type.value === 'all' || b.type === type.value) && feats.every((x) => b.tags.includes(x)) && terms.every((t) => `${b.name} ${b.city} ${b.zip} ${b.street}`.toLowerCase().includes(t)));
      listState($('#loc-status'), `${rows.length} of ${BRANCHES.length} sample locations shown.`, $('#loc-list'), rows.map((b) => `<li class="card location-card"><h3>${esc(b.name)}</h3><span class="tag">${b.type === 'atm' ? 'ATM' : 'Branch'}</span><dl><dt>Address</dt><dd>${esc(b.street)}, ${esc(b.city)} ${b.zip}</dd><dt>Hours</dt><dd>${esc(b.hours)} (sample)</dd><dt>Features</dt><dd>${b.tags.length ? b.tags.map((t) => ({ 'drive-up': 'Drive-up', saturday: 'Saturday hours', 'atm-24': '24-hour ATM' }[t])).join(', ') : 'None listed'}</dd></dl></li>`).join(''), 'loc-empty');
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
    form.addEventListener('change', render);
    $('#loc-reset').addEventListener('click', () => { form.reset(); render(); q.focus(); });
    q.value = params.get('q') || '';
    render();
  }

  const artBox = $('[data-list="articles"]');
  if (artBox) {
    const q = $('#art-q'), topic = $('#art-topic'), form = $('#art-form');
    if (TOPIC_LABEL[params.get('topic')]) topic.value = params.get('topic');
    const render = () => {
      const terms = q.value.toLowerCase().split(/\s+/).filter(Boolean);
      const rows = ARTICLES.filter((a) => (topic.value === 'all' || a.topic === topic.value) && terms.every((t) => `${a.title} ${a.text}`.toLowerCase().includes(t)));
      listState($('#art-status'), `${rows.length} of ${ARTICLES.length} articles shown.`, $('#art-list'), rows.map((a) => `<li class="card"><span class="tag">${TOPIC_LABEL[a.topic]}</span><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p><p class="muted small">${a.mins} minute read (sample summary; full article not included)</p></li>`).join(''), 'art-empty');
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
    topic.addEventListener('change', render);
    $('#art-reset').addEventListener('click', () => { q.value = ''; topic.value = 'all'; render(); q.focus(); });
    render();
  }

  const helpBox = $('[data-list="help"]');
  if (helpBox) {
    const q = $('#help-q'), cat = $('#help-cat'), form = $('#help-form');
    q.value = params.get('q') || '';
    const render = () => {
      const terms = q.value.toLowerCase().split(/\s+/).filter(Boolean);
      const rows = FAQS.map((x, i) => ({ ...x, i })).filter((x) => (cat.value === 'all' || x.cat === cat.value) && terms.every((t) => `${x.q} ${x.a} ${x.tags}`.toLowerCase().includes(t)));
      listState($('#help-status'), q.value.trim() ? `${rows.length} answers for "${q.value.trim()}".` : `${rows.length} common questions.`, $('#help-list'), rows.map((x) => `<div class="accordion-item"><h3><button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="faq-${x.i}">${esc(x.q)}</button></h3><div class="accordion-panel" id="faq-${x.i}" hidden><p>${esc(x.a)}</p><p class="muted small">Category: ${FAQ_CAT[x.cat]}</p></div></div>`).join(''), 'help-empty');
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
    cat.addEventListener('change', render);
    $$('[data-help-chip]').forEach((b) => b.addEventListener('click', () => { q.value = b.dataset.helpChip; cat.value = 'all'; render(); q.focus(); }));
    $('#help-reset').addEventListener('click', () => { q.value = ''; cat.value = 'all'; render(); q.focus(); });
    render();
  }
})();
