(() => {
  // Location search demo
  const searchForm = document.querySelector('.location-search form');
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = searchForm.querySelector('input');
      const val = input.value.trim();
      if (val) {
        alert(`Demo: showing forecast for "${val}". (No real data)`);
        input.value = '';
      }
    });
  }
  // Unit toggle demo (if present)
  const unitToggle = document.getElementById('unit-toggle');
  if (unitToggle) {
    let isC = false;
    unitToggle.addEventListener('click', () => {
      isC = !isC;
      unitToggle.textContent = isC ? '°F' : '°C';
      // Temperature conversion would happen here in a full demo.
    });
  }
  // Alert filters demo
  const alertCheckboxes = document.querySelectorAll('.alert-filter input[type="checkbox"]');
  const alertBanner = document.getElementById('demo-alert-banner');
  if (alertCheckboxes.length && alertBanner) {
    alertCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const anyChecked = Array.from(alertCheckboxes).some(c => c.checked);
        alertBanner.style.display = anyChecked ? 'block' : 'none';
      });
    });
  }
  // Close banner
  const closeBanner = document.getElementById('close-alert-banner');
  if (closeBanner) {
    closeBanner.addEventListener('click', () => {
      document.getElementById('demo-alert-banner').style.display = 'none';
    });
  }
  // Forecast tabs demo (if present)
  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('aria-controls');
        tabButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
        tabPanels.forEach(p => p.hidden = true);
        btn.setAttribute('aria-selected', 'true');
        document.getElementById(target).hidden = false;
      });
    });
  }
})();
