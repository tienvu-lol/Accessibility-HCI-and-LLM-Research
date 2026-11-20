document.addEventListener('DOMContentLoaded', function () {
  // Skip link focus
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('main-content').focus();
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-button');
  const navMenu = document.getElementById('primary-nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function () {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !expanded);
      navMenu.hidden = expanded;
    });
  }

  // Tab functionality
  const tabGroups = document.querySelectorAll('[data-component="tabs"]');
  tabGroups.forEach(function (group) {
    const tabs = group.querySelectorAll('[role="tab"]');
    const panels = group.querySelectorAll('[role="tabpanel"]');
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        panels.forEach(p => p.setAttribute('aria-hidden', 'true'));
        tab.setAttribute('aria-selected', 'true');
        panels[index].setAttribute('aria-hidden', 'false');
        tab.focus();
      });
    });
  });

  // Search form simulation
  const searchForms = document.querySelectorAll('.site-search form');
  searchForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type=search]');
      const query = input.value.trim();
      if (!query) return;
      let resultsDiv = form.parentNode.querySelector('.search-results');
      if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.className = 'search-results';
        resultsDiv.setAttribute('aria-live', 'polite');
        form.parentNode.appendChild(resultsDiv);
      }
      resultsDiv.innerHTML = `<p>Showing simulated results for “${escapeHtml(query)}”. This is a demo; no real search is performed.</p>`;
      resultsDiv.tabIndex = -1;
      resultsDiv.focus();
    });
  });

  // Newsletter / subscription form simulation
  const newsletterForms = document.querySelectorAll('.newsletter-form, .subscription-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type=email]');
      const email = emailInput.value.trim();
      if (!email) return;
      const isSub = form.closest('[data-component="subscription-form"]');
      if (isSub) {
        const modal = document.getElementById('subscription-modal');
        if (modal) {
          modal.querySelector('.modal-email').textContent = email;
          modal.classList.add('show');
          document.getElementById('modal-backdrop').classList.add('show');
          modal.querySelector('.modal-close').focus();
        }
      } else {
        const toast = document.getElementById('newsletter-toast');
        if (toast) {
          toast.textContent = `Thanks! We’ll send updates to ${escapeHtml(email)}.`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      }
      form.reset();
    });
  });

  // Modal close
  const modalCloseBtn = document.getElementById('modal-close-button');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const subscriptionModal = document.getElementById('subscription-modal');
  if (modalCloseBtn && modalBackdrop && subscriptionModal) {
    function closeModal() {
      subscriptionModal.classList.remove('show');
      modalBackdrop.classList.remove('show');
    }
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && subscriptionModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // Helper to escape HTML for demo output
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m];
    });
  }
});
