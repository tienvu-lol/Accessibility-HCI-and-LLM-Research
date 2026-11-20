/* Global script for navigation, search, newsletter form, and lightbox */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Navigation toggle (mobile) ---------- */
  const nav = document.querySelector('nav[data-component="primary-nav"]');
  const menuButton = nav.querySelector('button.hamburger');
  const menuList = nav.querySelector('ul');

  if (menuButton && menuList) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        menuList.classList.add('open');
      } else {
        menuList.classList.remove('open');
      }
    });
    // Close with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        menuButton.click();
        menuButton.focus();
      }
    });
  }

  /* ---------- Search filter (demo) ---------- */
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  if (searchInput && resultsContainer) {
    const articles = window.featuredArticles || [];
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      const filtered = articles.filter(a => a.title.toLowerCase().includes(term));
      resultsContainer.innerHTML = filtered.map(a => `
        <li class="card">
          <h3>${a.title}</h3>
          <p>${a.summary}</p>
        </li>
      `).join('') || '<li>No results</li>';
    });
  }

  /* ---------- Newsletter form validation ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.elements['email'].value.trim();
      const firstName = newsletterForm.elements['first-name'].value.trim();
      const consent = newsletterForm.elements['consent'].checked;
      const errors = [];

      if (!email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
        errors.push('Please enter a valid email address.');
      }
      if (!firstName) {
        errors.push('First name is required.');
      }
      if (!consent) {
        errors.push('You must agree to receive the newsletter.');
      }

      const errorSummary = newsletterForm.querySelector('#error-summary');
      errorSummary.innerHTML = '';
      if (errors.length) {
        errorSummary.innerHTML = '<ul>' + errors.map(err => `<li class="error">${err}</li>`).join('') + '</ul>';
        // focus first error field
        const firstErrorField = newsletterForm.querySelector(errors[0].includes('email') ? '[name="email"]' :
          errors[0].includes('First name') ? '[name="first-name"]' : '[name="consent"]');
        firstErrorField.focus();
      } else {
        // Demo success message
        newsletterForm.innerHTML = '<p>Thank you for signing up! (Demo only)</p>';
      }
    });
  }

  /* ---------- Lightbox carousel (demo) ---------- */
  const lightbox = document.getElementById('lightbox-dialog');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxCaption = lightbox ? lightbox.querySelector('figcaption') : null;
  const galleryItems = window.galleryItems || [];
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightbox.showModal();
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.focus();
  };

  document.querySelectorAll('[data-action="open-lightbox"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      openLightbox(idx);
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.querySelector('[data-action="prev"]').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      const item = galleryItems[currentIndex];
      lightboxImg.src = item.src;
      lightboxCaption.textContent = item.caption;
    });
    lightbox.querySelector('[data-action="next"]').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      const item = galleryItems[currentIndex];
      lightboxImg.src = item.src;
      lightboxCaption.textContent = item.caption;
    });
    // Close with Escape
    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.close();
    });
  }
});
