// Add event listener to navigation links for responsive navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Toggle active class for navigation links
      navLinks.forEach(function(otherLink) {
        otherLink.classList.remove('active');
      });
      link.classList.add('active');
    });
  });
});
