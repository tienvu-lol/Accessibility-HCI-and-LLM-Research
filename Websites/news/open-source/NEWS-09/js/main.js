// Add event listener to navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const href = link.getAttribute('href');
      // Simulate navigation
      console.log(`Navigating to ${href}`);
    });
  });
});
