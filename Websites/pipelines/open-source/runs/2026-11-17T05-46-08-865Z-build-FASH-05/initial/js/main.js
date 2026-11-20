/**
 * Lumina Magazine — Shared Interactions
 * Vanilla JS, no dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('is-open');
    });

    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // --- Newsletter Simulation ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const button = newsletterForm.querySelector('button');
      const feedback = newsletterForm.nextElementSibling;

      if (input.value && input.checkValidity()) {
        // Simulate API call
        button.disabled = true;
        button.textContent = 'Subscribing...';
        
        setTimeout(() => {
          button.textContent = 'Subscribed';
          input.value = '';
          feedback.textContent = 'Thank you for subscribing to Lumina Magazine!';
          feedback.classList.remove('sr-only');
          feedback.setAttribute('role', 'status');
        }, 1000);
      } else {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.classList.remove('sr-only');
        feedback.setAttribute('role', 'alert');
        input.focus();
      }
    });
  }

  // --- Slideshow / Lightbox Logic ---
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach(container => {
    const slides = container.querySelectorAll('.slideshow-slide');
    const prevBtn = container.querySelector('.prev-slide');
    const nextBtn = container.querySelector('.next-slide');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }

    // Keyboard navigation for slideshow
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevBtn?.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn?.click();
      }
    });
  });

  // --- Search Filter Simulation (for local pages) ---
  const searchInputs = document.querySelectorAll('[data-component="search-input"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const grid = e.target.closest('[data-section]').querySelector('.card-grid');
      if (!grid) return;

      const cards = grid.querySelectorAll('.card');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || excerpt.includes(query)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update empty state message if present
      const emptyMsg = grid.querySelector('.empty-state');
      if (emptyMsg) {
        emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

});
