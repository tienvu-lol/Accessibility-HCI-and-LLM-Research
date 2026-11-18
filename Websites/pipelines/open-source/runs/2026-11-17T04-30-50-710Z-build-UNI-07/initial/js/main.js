// Lone Star University - Shared Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
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
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  // Search Simulation (Home & Academics)
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      searchResults.innerHTML = '';
      if (query.length < 2) return;

      const mockData = [
        { title: 'Computer Science', url: '#' },
        { title: 'Business Administration', url: '#' },
        { title: 'Engineering', url: '#' },
        { title: 'Liberal Arts', url: '#' }
      ];

      const results = mockData.filter(item => item.title.toLowerCase().includes(query));
      results.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.title;
        li.appendChild(a);
        searchResults.appendChild(li);
      });
    });
  }

  // Apply Form Simulation
  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(applyForm);
      const data = Object.fromEntries(formData.entries());
      
      // Simple validation simulation
      let errors = [];
      if (!data.firstName) errors.push('First name is required');
      if (!data.lastName) errors.push('Last name is required');
      if (!data.email || !data.email.includes('@')) errors.push('Valid email is required');

      if (errors.length > 0) {
        const errorSummary = document.getElementById('error-summary');
        errorSummary.innerHTML = `<ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        errorSummary.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Success simulation
      alert('Application submitted successfully! (Simulation)');
      applyForm.reset();
    });
  }

  // Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent successfully! (Simulation)');
      contactForm.reset();
    });
  }
});
