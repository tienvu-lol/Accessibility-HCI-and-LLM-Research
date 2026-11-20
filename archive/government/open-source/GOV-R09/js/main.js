// Add event listener to navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    // Add functionality to navigation links
  });
});
