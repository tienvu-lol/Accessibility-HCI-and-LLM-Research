// Add event listener to navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('nav');
  
  navToggle.addEventListener('click', function() {
    nav.classList.toggle('open');
  });
});

// Add event listener to skip link
document.addEventListener('DOMContentLoaded', function() {
  const skipLink = document.getElementById('skip-link');
  
  skipLink.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('main-content').focus();
  });
});

// Add event listener to responsive navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      document.querySelector('nav').classList.remove('open');
    });
  });
});
