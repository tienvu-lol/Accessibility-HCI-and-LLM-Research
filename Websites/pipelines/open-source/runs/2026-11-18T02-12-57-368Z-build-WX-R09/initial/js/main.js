// Add event listener to skip link
document.addEventListener("DOMContentLoaded", function() {
  const skipLink = document.getElementById("skip-link");
  skipLink.addEventListener("click", function() {
    document.getElementById("main-content").focus();
  });
});

// Add event listener to navigation links
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      // Add navigation link click event handler
    });
  });
});
