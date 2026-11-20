// Add event listener to the document for keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open menus or dialogs
    const openMenus = document.querySelectorAll('.menu-open');
    openMenus.forEach(menu => {
      menu.classList.remove('menu-open');
    });
  }
});

// Function to toggle menu open state
function toggleMenu(menu) {
  menu.classList.toggle('menu-open');
}

// Add event listeners to menu toggles
const menuToggles = document.querySelectorAll('.menu-toggle');
menuToggles.forEach(toggle => {
  toggle.addEventListener('click', function() {
    const menu = toggle.nextElementSibling;
    toggleMenu(menu);
  });
});
