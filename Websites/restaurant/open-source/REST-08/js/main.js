/* Utility functions */
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

/* Mobile navigation */
const navToggle = qs('.nav-toggle');
const primaryNav = qs('.primary-nav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    primaryNav.setAttribute('aria-expanded', !expanded);
    if (!expanded) {
      primaryNav.focus();
    }
  });
}
primaryNav.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

/* Age gate modal */
const ageGateModal = qs('#age-gate-modal');
const ageGateBackdrop = qs('#age-gate-backdrop');
const ageGateForm = qs('#age-gate-form');
const ageGateInput = qs('#age-gate-input');
const ageGateMsg = qs('#age-gate-message');
if (ageGateModal && ageGateBackdrop && ageGateForm) {
  // Show on first visit if not already passed
  if (!sessionStorage.getItem('ageGatePassed')) {
    ageGateBackdrop.setAttribute('aria-hidden', 'false');
    ageGateModal.removeAttribute('aria-hidden');
    ageGateInput.focus();
  }
  ageGateForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = ageGateInput.value.trim();
    const parts = val.split(/[\/\-]/).map(Number);
    if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      ageGateMsg.textContent = 'Please enter a valid date (MM/DD/YYYY).';
      ageGateMsg.style.display = 'block';
      return;
    }
    const [month, day, year] = parts;
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age >= 18) {
      sessionStorage.setItem('ageGatePassed', 'true');
      ageGateBackdrop.setAttribute('aria-hidden', 'true');
      ageGateModal.setAttribute('aria-hidden', 'true');
    } else {
      ageGateMsg.textContent = 'You must be 18 or older to continue.';
      ageGateMsg.style.display = 'block';
    }
  });
}

/* Reservation form */
const reservationForm = qs('#reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const date = form.reservation_date.value;
    const time = form.reservation_time.value;
    const party = form.party_size.value;
    const special = form.special_requests.value.trim();
    // Simple validation
    if (!date || !time || !party || party < 1 || party > 20) {
      alert('Please fill in a valid date, time, and party size (1‑20).');
      return;
    }
    // Simulate submission
    const confirmation = qs('#reservation-confirmation');
    if (confirmation) {
      confirmation.textContent = `Reservation confirmed for ${date} at ${time} for ${party} person${party > 1 ? 's' : ''}.${special ? ' Special requests: ' + special : ''}`;
      confirmation.setAttribute('aria-live', 'polite');
      confirmation.classList.add('show');
      setTimeout(() => {
        confirmation.classList.remove('show');
        confirmation.removeAttribute('aria-live');
      }, 5000);
      form.reset();
    }
  });
}

/* Menu filtering */
const filterCheckboxes = qsa('.filter-input');
const menuCards = qsa('.menu-card');
if (filterCheckboxes.length && menuCards.length) {
  const updateFilter = () => {
    const activeFilters = [];
    filterCheckboxes.forEach(cb => {
      if (cb.checked) activeFilters.push(cb.value);
    });
    menuCards.forEach(card => {
      const categories = card.dataset.category.split(',');
      const match = activeFilters.length === 0 || categories.some(cat => activeFilters.includes(cat.trim()));
      card.style.display = match ? '' : 'none';
    });
    // Update count
    const visible = document.querySelectorAll('.menu-card:not([style*="display: none"])').length;
    const countEl = qs('#menu-count');
    if (countEl) countEl.textContent = `${visible} item${visible !== 1 ? 's' : ''} shown`;
  };
  filterCheckboxes.forEach(cb => cb.addEventListener('change', updateFilter));
  // Initial run
  updateFilter();
}

/* Toast helper */
function showToast(message, duration = 3000) {
  const toast = qs('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* Open/closed badge (simulated) */
function updateHoursBadge() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 Sun, 6 Sat
  // Simple mock: open 11-22 every day
  const open = hour >= 11 && hour < 22;
  const badges = qsa('.hours-badge');
  badges.forEach(badge => {
    badge.textContent = open ? 'Open now' : 'Closed';
    badge.style.background = open ? '#28a745' : '#dc3545';
  });
}
if (qs('.hours-badge')) {
  updateHoursBadge();
  // Re‑check every minute (optional)
  setInterval(updateHoursBadge, 60000);
}
