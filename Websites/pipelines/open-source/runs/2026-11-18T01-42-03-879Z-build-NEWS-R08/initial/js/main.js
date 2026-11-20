(() => {
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('main-content')?.focus();
    });
  }

  // Tabs
  document.querySelectorAll('[data-tab-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tabTarget;
      document.querySelectorAll('[data-tab-panel]').forEach(panel => {
        panel.hidden = panel.id !== target;
      });
      document.querySelectorAll('[data-tab-trigger]').forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
    });
  });

  // Search
  document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="search"]');
      const query = input.value.trim().toLowerCase();
      const resultsContainer = form.nextElementSibling;
      if (!resultsContainer) return;
      if (query === '') {
        resultsContainer.innerHTML = '<p>Enter a search term.</p>';
        return;
      }
      const articles = window.pageArticles || [];
      const matches = articles.filter(a => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query));
      if (matches.length) {
        resultsContainer.innerHTML = '';
        matches.forEach(a => {
          const div = document.createElement('div');
          div.className = 'search-result';
          div.innerHTML = `<h3><a href="${a.url}">${a.title}</a></h3><p>${a.summary}</p>`;
          resultsContainer.appendChild(div);
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    });
  });

  // Newsletter signup
  document.querySelectorAll('.newsletter-signup').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      const errorEl = form.parentNode.querySelector('.error-message');
      const successEl = form.parentNode.querySelector('.success-message');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errorEl) errorEl.style.display = 'block';
        if (successEl) successEl.style.display = 'none';
        emailInput.focus();
        return;
      }
      if (errorEl) errorEl.style.display = 'none';
      if (successEl) {
        successEl.textContent = `Thanks! We’ll send updates to ${email}.`;
        successEl.style.display = 'block';
      }
      form.reset();
      if (successEl) successEl.focus();
    });
  });

  // Subscription form
  document.querySelectorAll('.subscription-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const modal = document.getElementById('subscription-modal');
      if (!modal) return;
      const planSelect = form.querySelector('select[name="plan"]');
      const plan = planSelect ? planSelect.value : 'Standard';
      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = `<p>Thank you for subscribing to the <strong>${plan}</strong> plan.</p><p>Your confirmation number is <strong>${Math.floor(Math.random()*100000)}</strong>.</p>`;
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.modal-close').focus();
    });
  });

  // Close modal
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.setAttribute('aria-hidden', 'true');
    });
  });
})();
