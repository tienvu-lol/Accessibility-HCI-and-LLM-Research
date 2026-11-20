// Script to handle navigation and accessibility features
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to skip link
  const skipLink = document.getElementById('skip-link');
  skipLink.addEventListener('click', function() {
    const mainContent = document.getElementById('main-content');
    mainContent.focus();
  });

  // Add event listener to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const href = link.getAttribute('href');
      if (href === '#') {
        // Prevent default link behavior
        return false;
      }
    });
  });
});
