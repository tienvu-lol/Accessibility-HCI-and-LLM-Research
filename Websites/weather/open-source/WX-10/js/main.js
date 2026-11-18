/* Accessible interactions for the replica */

/* Utility: focus trap for modal */
function trapFocus(modal) {
  const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  modal.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/* Modal handling */
function openModal(content) {
  const overlay = document.createElement('div');
  overlay.className = 'modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="modal-content" data-component="map-modal">
      <button class="modal-close" aria-label="Close map preview">&times;</button>
      ${content}
    </div>
  `;
  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);
  trapFocus(overlay);
  closeBtn.focus();
}
function closeModal() {
  const overlay = document.querySelector('.modal');
  if (overlay) overlay.remove();
}

/* Forecast tabs */
function initForecastTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;
  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      panels.forEach(p => p.setAttribute('hidden', 'true'));
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.setAttribute('hidden', 'false');
    });
  });
}

/* Temperature conversion */
let useFahrenheit = false;
function convertTempCtoF(c) { return Math.round(c * 9/5 + 32); }
function updateTempUnits() {
  const cells = document.querySelectorAll('[data-temp]');
  cells.forEach(cell => {
    const c = parseFloat(cell.dataset.temp);
    if (useFahrenheit) {
      cell.textContent = convertTempCtoF(c) + ' °F';
    } else {
      cell.textContent = c + ' °C';
    }
  });
}
function initTempToggle() {
  const btn = document.getElementById('temp-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    useFahrenheit = !useFahrenheit;
    btn.textContent = useFahrenheit ? 'Show °C' : 'Show °F';
    updateTempUnits();
  });
}

/* Inline location search (filters forecast table) */
function initLocationSearch() {
  const form = document.getElementById('location-search-form');
  if (!form) return;
  const input = form.querySelector('input');
  const table = document.getElementById('daily-forecast');
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    rows.forEach(row => {
      const city = row.dataset.city.toLowerCase();
      row.style.display = city.includes(query) ? '' : 'none';
    });
  });
}

/* Alert filters */
function initAlertFilters() {
  const form = document.getElementById('alert-filter-form');
  if (!form) return;
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const list = document.getElementById('alerts-list');
  const items = Array.from(list.querySelectorAll('li'));
  form.addEventListener('change', () => {
    const active = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    items.forEach(item => {
      const type = item.dataset.type;
      item.style.display = active.includes(type) ? '' : 'none';
    });
  });
}

/* Map placeholder click */
function initMapPlaceholder() {
  const map = document.getElementById('radar-map');
  if (!map) return;
  map.addEventListener('click', () => {
    const content = `<h2>Radar Map (Demo)</h2><svg width="300" height="200" aria-hidden="true"><rect width="300" height="200" fill="#cce5ff"/></svg>`;
    openModal(content);
  });
}

/* Initialize all */
document.addEventListener('DOMContentLoaded', () => {
  initForecastTabs();
  initTempToggle();
  initLocationSearch();
  initAlertFilters();
  initMapPlaceholder();
});
