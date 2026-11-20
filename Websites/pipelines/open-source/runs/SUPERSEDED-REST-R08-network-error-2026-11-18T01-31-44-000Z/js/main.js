/* Main JavaScript for REST-R08 replica – vanilla, file:// compatible */
(() => {
  'use strict';

  /* ---- Helper utilities ---- */
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => el.querySelectorAll(sel);
  const on = (el, type, handler, opts = false) => el.addEventListener(type, handler, opts);
  const off = (el, type, handler, opts = false) => el.removeEventListener(type, handler, opts);
  const toggleAttr = (el, attr, value) => {
    if (value === null) el.removeAttribute(attr);
    else el.setAttribute(attr, value);
  };
  const focusFirstFocusable = (container) => {
    const focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  };

  /* ---- Skip link ---- */
  const skipLink = qs('.skip-link');
  if (skipLink) {
    on(skipLink, 'click', (e) => {
      e.preventDefault();
      const target = qs(skipLink.getAttribute('href'));
      if (target) target.focus();
    });
  }

  /* ---- Mobile nav toggle ---- */
  const navToggle = qs('.nav-toggle');
  const navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    on(navToggle, 'click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        focusFirstFocusable(navMenu);
      }
    });
    // Close on Escape
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && navMenu.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---- Age gate modal ---- */
  const ageGateTrigger = qs('.age-gate-trigger');
  const ageGateModal = qs('#age-gate-modal');
  const ageGateClose = qs('.age-gate-dialog button');
  if (ageGateTrigger && ageGateModal && ageGateClose) {
    const openModal = () => {
      ageGateModal.removeAttribute('aria-hidden');
      ageGateModal.setAttribute('aria-hidden', 'false');
      focusFirstFocusable(ageGateModal);
    };
    const closeModal = () => {
      ageGateModal.setAttribute('aria-hidden', 'true');
      ageGateTrigger.focus();
    };
    on(ageGateTrigger, 'click', openModal);
    on(ageGateClose, 'click', closeModal);
    on(ageGateModal, 'keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    // Click outside to close
    on(ageGateModal, 'click', (e) => {
      if (e.target === ageGateModal) closeModal();
    });
  }

  /* ---- Menu filtering ---- */
  const menuFilterForm = qs('.menu-filter');
  const menuCards = qsa('.menu-card');
  if (menuFilterForm) {
    on(menuFilterForm, 'change', () => {
      const cuisineChecked = Array.from(qsa('.menu-filter input[name="cuisine"]:checked')).map(i => i.value);
      const spiceChecked = Array.from(qsa('.menu-filter input[name="spice"]:checked')).map(i => i.value);
      menuCards.forEach(card => {
        const cuisine = card.dataset.cuisine || '';
        const spice = card.dataset.spice || '';
        const matchCuisine = cuisineChecked.length === 0 || cuisineChecked.includes(cuisine);
        const matchSpice = spiceChecked.length === 0 || spiceChecked.includes(spice);
        card.style.display = (matchCuisine && matchSpice) ? '' : 'none';
      });
    });
  }

  /* ---- Reservation form simulation ---- */
  const reservationForm = qs('.reservation-form');
  if (reservationForm) {
    on(reservationForm, 'submit', (e) => {
      e.preventDefault();
      // Gather values (not stored)
      const name = reservationForm.querySelector('[name="name"]').value.trim();
      const date = reservationForm.querySelector('[name="date"]').value;
      const time = reservationForm.querySelector('[name="time"]').value;
      const party = reservationForm.querySelector('[name="party"]').value;
      const location = reservationForm.querySelector('[name="location"]').value;
      // Simple validation
      if (!name || !date || !time || !party || !location) {
        alert('Please fill in all fields.');
        return;
      }
      // Show simulated confirmation
      const msg = document.createElement('div');
      msg.role = 'alert';
      msg.style.background = '#d4edda';
      msg.style.color = '#155724';
      msg.style.padding = '0.75rem';
      msg.style.borderRadius = '0.25rem';
      msg.style.marginTop = '0.5rem';
      msg.textContent = `Thank you, ${name}! Your reservation for ${party} people at ${location} on ${date} at ${time} has been received (demo).`;
      reservationForm.appendChild(msg);
      // Reset form
      reservationForm.reset();
      // Remove message after 5 seconds
      setTimeout(() => msg.remove(), 5000);
    });
  }

  /* ---- Open/closed hours badge ---- */
  function updateStatusBadge() {
    const now = new Date();
    const day = now.getDay(); // 0 Sun, 1 Mon...
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInMinutes = hour * 60 + minute;
    qsa('.location-card').forEach(card => {
      const openStr = card.dataset.open || '09:00';
      const closeStr = card.dataset.close || '21:00';
      const [openH, openM] = openStr.split(':').map(Number);
      const [closeH, closeM] = closeStr.split(':').map(Number);
      const openMin = openH * 60 + openM;
      const closeMin = closeH * 60 + closeM;
      const isOpen = timeInMinutes >= openMin && timeInMinutes < closeMin;
      const badge = card.querySelector('.status');
      if (badge) {
        badge.textContent = isOpen ? 'Open now' : 'Closed';
        badge.className = 'status ' + (isOpen ? 'open' : 'closed');
      }
    });
  }
  // Run once and every minute (though file:// may not keep running, but we call on load)
  updateStatusBadge();
  setInterval(updateStatusBadge, 60000);

  /* ---- Newsletter form simulation ---- */
  const newsletterForm = qs('.newsletter-form');
  if (newsletterForm) {
    on(newsletterForm, 'submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('[name="email"]').value.trim();
      if (!email) {
        alert('Please enter an email address.');
        return;
      }
      const msg = document.createElement('div');
      msg.role = 'alert';
      msg.style.background = '#d1ecf1';
      msg.style.color = '#0c5460';
      msg.style.padding = '0.75rem';
      msg.style.borderRadius = '0.25rem';
      msg.style.marginTop = '0.5rem';
      msg.textContent = `Thanks! We’ll send updates to ${email} (demo).`;
      newsletterForm.appendChild(msg);
      newsletterForm.reset();
      setTimeout(() => msg.remove(), 5000);
    });
  }

  /* ---- Ensure focus outline visible for mouse users (optional) ---- */
  document.documentElement.classList.add('focus-visible');
})();
