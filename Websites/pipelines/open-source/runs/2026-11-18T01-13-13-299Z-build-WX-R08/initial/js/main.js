/* Utility functions */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Skip link focus already handled by CSS */

/* Unit toggle */
const unitToggle = $('#unit-toggle');
if (unitToggle) {
  unitToggle.addEventListener('change', () => {
    const isC = unitToggle.checked;
    $$('.temp').forEach(el => {
      const f = Number(el.dataset.f);
      const c = Math.round((f - 32) * 5 / 9);
      el.textContent = isC ? `${c}°C` : `${f}°F`;
    });
  });
}

/* Location search demo */
const locationForm = $('#location-search-form');
if (locationForm) {
  locationForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#location-search-input').value.trim();
    if (!input) return;
    // Demo: pretend we searched and show a toast
    showToast(`Showing forecast for "${input}" (demo)`);
    // Reset to default data (hardcoded Ashburn, VA)
    loadForecastData('Ashburn, VA');
  });
}

/* Forecast tabs */
const tabButtons = $$('[role="tab"]');
const tabPanels = $$('[role="tabpanel"]');
if (tabButtons.length) {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('aria-controls');
      // set aria-selected
      tabButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      // hide/show panels
      tabPanels.forEach(p => {
        p.hidden = p.id !== target;
      });
      // manage tabindex
      tabButtons.forEach(b => b.tabIndex = -1);
      btn.tabIndex = 0;
      btn.focus();
    });
  });
  // initial focus on first tab
  if (tabButtons[0]) tabButtons[0].tabIndex = 0;
}

/* Alert filters demo */
const alertFilterForm = $('#alert-filter-form');
if (alertFilterForm) {
  alertFilterForm.addEventListener('submit', e => {
    e.preventDefault();
    const filters = $$('#alert-filter-form input:checked').map(cb => cb.value);
    showToast(`Filters active: ${filters.join(', ') || 'none'} (demo)`);
    // In a real app we would filter alert list; here we just show toast
  });
}

/* Login demo */
const loginForm = $('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    // pretend validation
    showToast('Login successful (demo)');
    // redirect to home via hash change (no reload)
    location.hash = '#home';
    setTimeout(() => { location.reload(); }, 800);
  });
}

/* Toast utility */
function showToast(msg) {
  // remove any existing toast
  const existing = $('#toast');
  if existing existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '1rem';
  toast.style.right = '1rem';
  toast.style.background = '#000';
  toast.style.color = '#fff';
  toast.style.padding = '.75rem 1rem';
  toast.style.borderRadius = '.25rem';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity .2s';
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '0.9'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

/* Load demo forecast data (hardcoded) */
function loadForecastData(location) {
  // In a real app we would update UI with data; here we just log
  console.log(`Loading forecast for ${location}`);
  // For demo, we could update some elements; omitted for brevity
}

/* Initialize on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure first tab panel visible
  if (tabPanels.length) {
    tabPanels.forEach(p => p.hidden = true);
    const firstPanel = $('#today-tabpanel');
    if (firstPanel) firstPanel.hidden = false;
  }
});
