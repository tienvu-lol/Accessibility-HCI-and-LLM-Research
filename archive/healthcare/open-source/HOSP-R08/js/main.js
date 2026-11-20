document.addEventListener('DOMContentLoaded', () => {
  /* Skip link focus management */
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(skipLink.getAttribute('href').slice(1));
      if (target) target.focus();
    });
  }

  /* Service band accordion */
  const serviceBands = document.querySelectorAll('[data-component="service-band"]');
  serviceBands.forEach(band => {
    const btn = band.querySelector('[data-component="service-band-toggle"]');
    const panel = band.querySelector('[data-component="service-details"]');
    if (!btn || !panel) return;
    band.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const expanded = band.getAttribute('aria-expanded') === 'true';
      band.setAttribute('aria-expanded', String(!expanded));
      btn.setAttribute('aria-expanded', String(!expanded));
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* Doctor filter */
  const doctorFilterInput = document.querySelector('[data-component="doctor-filter"]');
  const doctorCards = document.querySelectorAll('[data-component="doctor-card"]');
  if (doctorFilterInput && doctorCards.length) {
    doctorFilterInput.addEventListener('input', () => {
      const term = doctorFilterInput.value.trim().toLowerCase();
      doctorCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    });
    doctorFilterInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        doctorFilterInput.value = '';
        doctorFilterInput.dispatchEvent(new Event('input'));
      }
    });
  }

  /* Location filter */
  const locationFilterSelect = document.querySelector('[data-component="location-filter"]');
  const locationItems = document.querySelectorAll('[data-component="location-item"]');
  if (locationFilterSelect && locationItems.length) {
    locationFilterSelect.addEventListener('change', () => {
      const val = locationFilterSelect.value;
      locationItems.forEach(item => {
        const match = val === 'all' || item.dataset.locationCategory === val;
        item.style.display = match ? '' : 'none';
      });
    });
  }

  /* Appointment form validation */
  const appointmentForm = document.querySelector('[data-component="appointment-form"]');
  if (appointmentForm) {
    const errorSummary = appointmentForm.querySelector('[data-component="error-summary"]');
    const fields = appointmentForm.querySelectorAll('input, select, textarea');
    appointmentForm.addEventListener('submit', e => {
      e.preventDefault();
      let hasError = false;
      errorSummary.innerHTML = '';
      errorSummary.style.display = 'none';
      fields.forEach(field => {
        field.setAttribute('aria-invalid', 'false');
        const wrapper = field.parentElement;
        const existing = wrapper.querySelector('.error-message');
        if (existing) existing.remove();
        if (field.hasAttribute('required') && !field.value.trim()) {
          hasError = true;
          field.setAttribute('aria-invalid', 'true');
          const msg = document.createElement('p');
          msg.className = 'error-message';
          msg.textContent = `${field.previousElementSibling?.textContent || 'This field'} is required`;
          wrapper.appendChild(msg);
        }
        // simple email pattern
        if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          hasError = true;
          field.setAttribute('aria-invalid', 'true');
          const msg = document.createElement('p');
          msg.className = 'error-message';
          msg.textContent = 'Please enter a valid email address';
          field.parentElement.appendChild(msg);
        }
      });
      if (hasError) {
        errorSummary.style.display = 'block';
        errorSummary.innerHTML = '<strong>Please fix the errors below</strong>';
        const firstInvalid = appointmentForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
      } else {
        // simulate success
        alert('Appointment request submitted (demo).');
        appointmentForm.reset();
      }
    });
  }

  /* Insurance modal */
  const showInsuranceBtn = document.querySelector('[data-component="show-insurance-modal"]');
  const modalBackdrop = document.querySelector('[data-component="insurance-modal-backdrop"]');
  const modalCloseBtn = document.querySelector('[data-component="modal-close"]');
  if (showInsuranceBtn && modalBackdrop && modalCloseBtn) {
    showInsuranceBtn.addEventListener('click', () => {
      modalBackdrop.setAttribute('aria-hidden', 'false');
      modalCloseBtn.focus();
    });
    const hideModal = () => {
      modalBackdrop.setAttribute('aria-hidden', 'true');
      showInsuranceBtn.focus();
    };
    modalCloseBtn.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) hideModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalBackdrop.getAttribute('aria-hidden') === 'false') {
        hideModal();
      }
    });
  }
});
