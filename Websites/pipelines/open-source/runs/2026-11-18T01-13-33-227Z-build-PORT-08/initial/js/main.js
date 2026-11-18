document.addEventListener('DOMContentLoaded', () => {
  /* Mobile nav toggle */
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* Project filtering – courses.html */
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
    const projects = window.PROJECTS || [];
    const grid = document.querySelector('[data-component="card-grid"]');
    function renderProjects(filtered) {
      grid.innerHTML = '';
      filtered.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <img src="${p.thumbnail}" alt="${p.title} thumbnail">
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <a href="#">Details</a>
          </div>
        `;
        grid.appendChild(card);
      });
    }
    function filterProjects() {
      const selected = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
      if (selected.length === 0) {
        renderProjects(projects);
      } else {
        const filtered = projects.filter(p => selected.includes(p.category));
        renderProjects(filtered);
      }
    }
    filterForm.addEventListener('change', filterProjects);
    // Initial render
    renderProjects(projects);
  }

  /* Lightbox – uses.html */
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxContent = document.getElementById('lightbox-content');
  const galleryItems = document.querySelectorAll('[data-component="tech-item"]');
  if (lightbox && lightboxClose && galleryItems.length) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const svg = item.querySelector('svg').cloneNode(true);
        lightboxContent.innerHTML = '';
        lightboxContent.appendChild(svg);
        lightboxContent.appendChild(lightboxClose);
        lightbox.classList.add('open');
        // trap focus
        lightboxClose.focus();
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightboxContent.innerHTML = '';
    }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* Contact form demo – contact.html */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      // Simulate submission
      const demoMsg = document.createElement('div');
      demoMsg.role = 'status';
      demoMsg.className = 'demo-status';
      demoMsg.textContent = 'Message sent (demo).';
      contactForm.insertAdjacentElement('afterend', demoMsg);
      contactForm.reset();
      setTimeout(() => demoMsg.remove(), 3000);
    });
  }
});
