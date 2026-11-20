/* Commonwealth Services – vanilla JS for accessibility and demo interactions */
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Skip link is handled purely via CSS ---- */

  /* ---- Navigation toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('nav-open');
      if (!expanded) {
        // When opening, move focus to first nav link
        const firstLink = primaryNav.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        // When closing, return focus to toggle
        navToggle.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('nav-open')) {
        e.preventDefault();
        primaryNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---- Demo form feedback (simulation) ---- */
  const demoForms = document.querySelectorAll('form[data-component="demo-form"]');
  demoForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Remove any previous alert
      const existingAlert = form.querySelector('.alert');
      if (existingAlert) existingAlert.remove();

      // Simple validation: check for empty required fields
      let hasError = false;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          hasError = true;
          field.setAttribute('aria-invalid', 'true');
          field.parentElement.insertAdjacentHTML(
            'afterend',
            '<p class="alert alert-error" role="alert">Please fill out this field.</p>'
          );
        } else {
          field.removeAttribute('aria-invalid');
          const err = field.parentElement.querySelector('.alert-error');
          if (err) err.remove();
        }
      });

      if (!hasError) {
        // Show success message (simulation)
        const successMsg = document.createElement('p');
        successMsg.className = 'alert';
        successMsg.setAttribute('role', 'alert');
        successMsg.textContent = 'Demo submission received. No data was sent.';
        form.appendChild(successMsg);
        // Reset form
        form.reset();
        // Move focus to success message
        successMsg.focus();
      }
    });
  });

  /* ---- Organization list filter (intentional addition) ---- */
  const filterInput = document.querySelector('input[data-component="org-filter"]');
  const orgList = document.querySelector('ul[data-component="org-list"]');
  if (filterInput && orgList) {
    filterInput.addEventListener('input', () => {
      const term = filterInput.value.trim().toLowerCase();
      const items = orgList.querySelectorAll('li');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  /* ---- Court docket demo data (if present) ---- */
  const docketTable = document.querySelector('table[data-component="docket-results"]');
  if (docketTable) {
    // Sample data – 6 rows
    const sampleRows = [
      ['2024-CV-01234', '2024-03-15', 'Doe v. Commonwealth', '<a href="#">Details</a>'],
      ['2024-CV-01235', '2024-03-16', 'Smith v. Agency', '<a href="#">Details</a>'],
      ['2024-CV-01236', '2024-03-17', 'Lee v. City', '<a href="#">Details</a>'],
      ['2024-CV-01237', '2024-03-18', 'Brown v. State', '<a href="#">Details</a>'],
      ['2024-CV-01238', '2024-03-19', 'White v. Town', '<a href="#">Details</a>'],
      ['2024-CV-01239', '2024-03-20', 'Green v. County', '<a href="#">Details</a>']
    ];
    const tbody = docketTable.querySelector('tbody') || document.createElement('tbody');
    if (!docketTable.querySelector('tbody')) docketTable.appendChild(tbody);
    sampleRows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.innerHTML = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
});
