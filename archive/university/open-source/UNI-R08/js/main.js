document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const hamburger = document.getElementById('nav-toggle');
  const navList = document.getElementById('primary-nav-list');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navList.setAttribute('aria-expanded', String(!expanded));
    });
    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // Program / directory search
  const searchInput = document.getElementById('program-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      const cards = document.querySelectorAll('[data-component="program-card"]');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = term ? (text.includes(term) ? '' : 'none') : '';
      });
    });
  }

  // Contact form simulation
  const forms = document.querySelectorAll('[data-component="contact-form"]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you – your inquiry has been received (demo)');
      form.reset();
    });
  });

  // News filtering
  const filterButtons = document.querySelectorAll('[data-filter-category]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter-category');
        // Update active button
        filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        // Filter cards
        const cards = document.querySelectorAll('[data-component="news-card"]');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          const show = category === 'all' || cat === category;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});

function showToast(message) {
  const toast = document.getElementById('toast') || (() => {
    const el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
    return el;
  })();
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
