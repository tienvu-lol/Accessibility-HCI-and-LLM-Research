// Global Script
function init() {
  const skipLink = document.getElementById('skip-link');
  skipLink.addEventListener('click', function() {
    document.getElementById('main-content').focus();
  });
}

document.addEventListener('DOMContentLoaded', init);
