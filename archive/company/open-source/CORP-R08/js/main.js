document.addEventListener('DOMContentLoaded', function () {
  const skipLink = document.querySelector('.skip-link');
  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.querySelector('.primary-nav ul');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      primaryNav.hidden = expanded;
    });
  }
});
