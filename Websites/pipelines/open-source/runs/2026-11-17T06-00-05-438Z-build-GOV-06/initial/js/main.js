/* Global script for demo site – handles skip link, language toggle, search, alerts, form validation,
   and inline demo data rendering */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Language toggle ---------- */
  const langToggle = document.querySelector('[data-component="language-switcher"] button');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isEn = html.lang === 'en';
      html.lang = isEn ? 'es' : 'en';
      langToggle.textContent = isEn ? 'Español' : 'English';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const en = el.dataset.en;
        const es = el.dataset.es;
        el.textContent = isEn ? es : en;
      });
    });
  }

  /* ---------- Alert dismiss ---------- */
  document.querySelectorAll('.alert-banner button.dismiss').forEach(btn => {
    btn.addEventListener('click', e => {
      const banner = e.target.closest('.alert-banner');
      banner.remove();
    });
  });

  /* ---------- Sample datasets (inline) ---------- */
  const parks = [
    { name: 'Sunset Park', description: 'Playgrounds, picnic areas, and walking trails.' },
    { name: 'Harborview Gardens', description: 'Botanical garden with native plants.' },
    { name: 'Riverfront Trail', description: 'Bike and pedestrian path along the river.' },
    { name: 'Cedar Creek Preserve', description: 'Nature preserve with wildlife viewing.' },
    { name: 'Ocean Breeze Beach', description: 'Sandy beach with lifeguard services.' }
  ];

  const permitTypes = [
    'Picnic Shelter Permit',
    'Group Event Permit',
    'Sports Tournament Permit',
    'Film Production Permit',
    'Special Use Permit'
  ];

  const potholeIssues = [
    { location: '5th & Main', description: 'Large pothole causing traffic slowdown.' },
    { location: 'Elm St near Library', description: 'Cracked pavement, needs resurfacing.' },
    { location: 'Broadway & 2nd', description: 'Multiple small potholes.' },
    { location: 'Lakeview Rd', description: 'Sinkhole forming near the culvert.' },
    { location: 'Maple Ave', description: 'Edge of road deteriorating.' }
  ];

  const paymentMethods = [
    'Credit Card',
    'Debit Card',
    'Bank Transfer',
    'Mobile Pay',
    'Check (mail)'
  ];

  const complaintCategories = [
    'Noise',
    'Street Lighting',
    'Garbage Collection',
    'Water Service',
    'Other'
  ];

  /* ---------- Rendering functions ---------- */
  const renderServiceList = (containerId, items) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = items.map(item => `
      <div class="service-card" data-search-item>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
      </div>
    `).join('');
  };

  const renderIssueList = (containerId, items) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = items.map(item => `
      <div class="service-card" data-search-item>
        <h3>${item.location}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  };

  const renderSelectOptions = (selectId, options) => {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value=\"\">--Select--</option>' + options.map(opt => `
      <option value="${opt}">${opt}</option>
    `).join('');
  };

  /* Populate pages */
  renderServiceList('parks-list', parks);
  renderIssueList('pothole-list', potholeIssues);
  renderSelectOptions('permit-type', permitTypes);
  renderSelectOptions('payment-method', paymentMethods);
  renderSelectOptions('complaint-category', complaintCategories);

  /* ---------- Search widget ---------- */
  const searchInputs = document.querySelectorAll('[data-component="search-widget"] input');
  searchInputs.forEach(input => {
    const targetId = input.dataset.target;
    const targetContainer = document.getElementById(targetId);
    const items = Array.from(targetContainer.querySelectorAll('[data-search-item]'));
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? '' : 'none';
      });
    });
  });

  /* ---------- Form validation helper ---------- */
  const validateForm = (form) => {
    const required = form.querySelectorAll('[required]');
    let valid = true;
    const errors = [];
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        const label = form.querySelector(`label[for="${field.id}"]`);
        const name = label ? label.textContent : field.name;
        errors.push(`${name} is required.`);
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    });
    return { valid, errors };
  };

  /* ---------- Generic demo form handler ---------- */
  document.querySelectorAll('form[data-demo="true"]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const { valid, errors } = validateForm(form);
      const summary = form.querySelector('.error-summary');
      if (!valid) {
        if (summary) {
          summary.innerHTML = '<ul>' + errors.map(err => `<li>${err}</li>`).join('') + '</ul>';
          summary.style.display = 'block';
        }
        const firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
      } else {
        if (summary) summary.style.display = 'none';
        const success = document.createElement('div');
        success.setAttribute('role', 'status');
        success.className = 'demo-success';
        success.textContent = 'Demo submission successful. (No real transaction performed.)';
        form.appendChild(success);
        form.reset();
      }
    });
  });

  /* ---------- Escape key to close alerts ---------- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const openAlert = document.querySelector('.alert-banner');
      if (openAlert) {
        openAlert.remove();
      }
    }
  });
});
