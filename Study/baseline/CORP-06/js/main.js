/* Utility: show/hide element */
function toggleVisibility(id, show) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = show ? 'block' : 'none';
  }
}

/* Branch Locator – simple search */
const branchData = [
  { name: "NovaBank Downtown", address: "123 Main St, Metropolis", distance: "0.5 mi" },
  { name: "NovaBank Uptown", address: "456 Oak Ave, Metropolis", distance: "2.1 mi" },
  { name: "NovaBank Suburb", address: "789 Pine Rd, Smallville", distance: "5.8 mi" }
];

function runBranchSearch(event) {
  event.preventDefault();
  const query = document.getElementById('branch-search-input').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('branch-results');
  resultsContainer.innerHTML = '';
  const filtered = branchData.filter(b => b.name.toLowerCase().includes(query) || b.address.toLowerCase().includes(query));
  if (filtered.length === 0) {
    resultsContainer.textContent = 'No branches found.';
    return;
  }
  const ul = document.createElement('ul');
  filtered.forEach(b => {
    const li = document.createElement('li');
    li.textContent = `${b.name} – ${b.address} (${b.distance})`;
    ul.appendChild(li);
  });
  resultsContainer.appendChild(ul);
}

/* Loan Calculator – uses sample rate table */
const rateTable = [
  { term: 12, rate: 0.045, apr: 0.047 },
  { term: 24, rate: 0.042, apr: 0.045 },
  { term: 36, rate: 0.039, apr: 0.042 },
  { term: 48, rate: 0.037, apr: 0.040 },
  { term: 60, rate: 0.035, apr: 0.038 }
];

function calculateLoan(event) {
  event.preventDefault();
  const amount = parseFloat(document.getElementById('loan-amount').value);
  const term = parseInt(document.getElementById('loan-term').value, 10);
  const rateObj = rateTable.find(r => r.term === term);
  const output = document.getElementById('loan-result');
  if (!rateObj || isNaN(amount) || amount <= 0) {
    output.textContent = 'Please enter a valid amount and select a term.';
    return;
  }
  const monthlyRate = rateObj.rate / 12;
  const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  output.textContent = `Estimated monthly payment: $${payment.toFixed(2)}`;
}

/* Generic form validation */
function validateForm(event) {
  const form = event.target;
  const required = form.querySelectorAll('[required]');
  let valid = true;
  const errors = [];
  required.forEach(inp => {
    const errorEl = inp.parentElement.querySelector('.error');
    if (errorEl) errorEl.textContent = '';
    if (!inp.value.trim()) {
      valid = false;
      const msg = `${inp.name || inp.id} is required.`;
      errors.push(msg);
      if (errorEl) errorEl.textContent = msg;
    }
  });
  const summary = form.querySelector('.error-summary');
  if (summary) {
    summary.innerHTML = '';
    if (!valid) {
      const ul = document.createElement('ul');
      errors.forEach(e => {
        const li = document.createElement('li');
        li.textContent = e;
        ul.appendChild(li);
      });
      summary.appendChild(ul);
      summary.style.display = 'block';
      summary.focus();
    } else {
      summary.style.display = 'none';
    }
  }
  if (!valid) {
    event.preventDefault();
    const firstError = form.querySelector('.error');
    if (firstError) firstError.previousElementSibling.focus();
  } else {
    // Simulated successful submission
    event.preventDefault();
    const msg = document.createElement('p');
    msg.textContent = 'Thank you – your submission has been received (demo only).';
    form.parentElement.replaceChild(msg, form);
  }
}

/* Help Search – placeholder */
function runHelpSearch(event) {
  event.preventDefault();
  const query = document.getElementById('help-search-input').value.trim();
  const results = document.getElementById('help-search-results');
  results.textContent = query ? `No results found for “${query}”.` : 'Please enter a search term.';
}

/* Event listeners registration */
document.addEventListener('DOMContentLoaded', () => {
  const branchForm = document.getElementById('branch-search-form');
  if (branchForm) branchForm.addEventListener('submit', runBranchSearch);

  const loanForm = document.getElementById('loan-calc-form');
  if (loanForm) loanForm.addEventListener('submit', calculateLoan);

  const accountForms = document.querySelectorAll('.account-form');
  accountForms.forEach(f => f.addEventListener('submit', validateForm));

  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', validateForm);

  const helpForm = document.getElementById('help-search-form');
  if (helpForm) helpForm.addEventListener('submit', runHelpSearch);
});
