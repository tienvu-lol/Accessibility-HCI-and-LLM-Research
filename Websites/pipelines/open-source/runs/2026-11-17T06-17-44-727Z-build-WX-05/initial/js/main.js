document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Forecast Tabs
  const tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        panels.forEach(p => p.setAttribute('aria-hidden', 'true'));
        
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        const panelId = tab.getAttribute('aria-controls');
        document.getElementById(panelId).setAttribute('aria-hidden', 'false');
        document.getElementById(panelId).focus();
      });

      tab.addEventListener('keydown', (e) => {
        let nextTab;
        if (e.key === 'ArrowRight') {
          nextTab = tabs[tabs.indexOf(tab) + 1] || tabs[0];
        } else if (e.key === 'ArrowLeft') {
          nextTab = tabs[tabs.indexOf(tab) - 1] || tabs[tabs.length - 1];
        }
        if (nextTab) {
          e.preventDefault();
          nextTab.click();
        }
      });
    });
  }

  // Unit Toggle (°F / °C)
  const unitToggle = document.getElementById('unit-toggle');
  if (unitToggle) {
    unitToggle.addEventListener('change', (e) => {
      const isF = e.target.value === 'F';
      document.querySelectorAll('.temp-c').forEach(el => {
        const cVal = parseFloat(el.dataset.c);
        if (!isNaN(cVal)) {
          el.textContent = `${Math.round(cVal * 9/5 + 32)}°F`;
        }
      });
      document.querySelectorAll('.temp-f').forEach(el => {
        const fVal = parseFloat(el.dataset.f);
        if (!isNaN(fVal)) {
          el.textContent = `${Math.round((fVal - 32) * 5/9)}°C`;
        }
      });
      // Swap labels
      const labels = unitToggle.parentElement.querySelectorAll('label');
      labels.forEach(l => l.classList.toggle('sr-only'));
    });
  }

  // Location Search Filter
  const searchInput = document.getElementById('location-search');
  const locationList = document.getElementById('location-list');
  if (searchInput && locationList) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      locationList.querySelectorAll('.location-card').forEach(card => {
        const name = card.querySelector('.location-name').textContent.toLowerCase();
        const region = card.querySelector('.location-region').textContent.toLowerCase();
        if (name.includes(term) || region.includes(term)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  // Alert Filters
  const alertFilters = document.querySelectorAll('.alert-filter');
  const alertItems = document.querySelectorAll('.alert-item');
  if (alertFilters.length && alertItems.length) {
    alertFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        const type = filter.value;
        alertItems.forEach(item => {
          if (type === 'all' || item.classList.contains(type)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Radar Layer Toggle
  const layerButtons = document.querySelectorAll('.radar-layer-btn');
  const mapDisplay = document.getElementById('radar-map-display');
  if (layerButtons.length && mapDisplay) {
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        layerButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');
        const layer = btn.dataset.layer;
        // Simulate map change by updating alt text and visual placeholder
        mapDisplay.querySelector('img').alt = `Static radar map showing ${layer} layer`;
        mapDisplay.querySelector('p').textContent = `Displaying ${layer} layer data (simulated).`;
      });
    });
  }
});
