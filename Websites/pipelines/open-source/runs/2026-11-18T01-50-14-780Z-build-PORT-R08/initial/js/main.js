/* Utility: toggle ARIA expanded and handle focus */
function toggleNav(button) {
  const expanded = button.getAttribute('aria-expanded') === 'true' || false;
  button.setAttribute('aria-expanded', !expanded);
  const nav = button.nextElementSibling; // assumes .primary-nav follows button
  if (nav) {
    nav.setAttribute('aria-expanded', !expanded);
    if (!expanded) {
      nav.focus();
    }
  }
}

/* Mobile nav toggle */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-component="primary-nav"] button');
  if (navToggle) {
    navToggle.addEventListener('click', () => toggleNav(navToggle));
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleNav(navToggle);
        navToggle.focus();
      }
    });
  }

  /* Contact form validation & simulated submit */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // clear previous errors
      const form = contactForm;
      form.querySelectorAll('.error').forEach(el => el.remove());
      form.querySelector('.error-summary')?.remove();
      let valid = true;
      const errors = [];

      const name = form.elements['name'];
      if (!name.value.trim()) {
        valid = false;
        errors.push('Name is required');
        const msg = document.createElement('p');
        msg.className = 'error';
        msg.textContent = 'Name is required';
        name.after(msg);
      }
      const email = form.elements['email'];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value)) {
        valid = false;
        errors.push('Valid email is required');
        const msg = document.createElement('p');
        msg.className = 'error';
        msg.textContent = 'Valid email is required';
        email.after(msg);
      }
      const message = form.elements['message'];
      if (!message.value.trim()) {
        valid = false;
        errors.push('Message is required');
        const msg = document.createElement('p');
        msg.className = 'error';
        msg.textContent = 'Message is required';
        message.after(msg);
      }

      if (!valid) {
        const summary = document.createElement('div');
        summary.className = 'error-summary';
        summary.role = 'alert';
        const heading = document.createElement('h3');
        heading.textContent = 'Please fix the errors below';
        const list = document.createElement('ul');
        errors.forEach(err => {
          const li = document.createElement('li');
          li.textContent = err;
          list.appendChild(li);
        });
        summary.appendChild(heading);
        summary.appendChild(list);
        form.prepend(summary);
        name.focus();
        return;
      }

      // Simulate submission
      const thanks = document.createElement('p');
      thanks.textContent = 'Thanks! Your message has been sent (demo).';
      thanks.style.color = '#090';
      form.reset();
      form.appendChild(thanks);
      // move focus to thanks message
      thanks.focus();
    });
  }

  /* Filtering for courses and uses */
  function initFilter(containerId, dataArray, renderFn) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const filterInputs = container.querySelectorAll('[data-filter]');
    let filtered = [...dataArray];

    function applyFilter() {
      const tags = [];
      filterInputs.forEach(inp => {
        if (inp.type === 'checkbox' && inp.checked) {
          tags.push(inp.value);
        }
      });
      if (tags.length === 0) {
        filtered = [...dataArray];
      } else {
        filtered = dataArray.filter(item => {
          // assume item.tags is array of strings
          return item.tags && item.tags.some(t => tags.includes(t));
        });
      }
      renderFn(container, filtered);
    }

    filterInputs.forEach(inp => inp.addEventListener('change', applyFilter));
    // initial render
    renderFn(container, filtered);
  }

  /* Lightbox simulation */
  function initLightbox() {
    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('role', 'dialog');
    document.body.appendChild(backdrop);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.innerHTML = '&times;';

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeLightbox();
      }
    });
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.getAttribute('aria-hidden') === 'false') {
        closeLightbox();
      }
    });

    function openLightbox(contentHTML) {
      backdrop.innerHTML = ''; // clear
      backdrop.appendChild(closeBtn);
      const content = document.createElement('div');
      content.className = 'lightbox-content';
      content.innerHTML = contentHTML;
      backdrop.appendChild(content);
      backdrop.setAttribute('aria-hidden', 'false');
      content.focus();
    }

    function closeLightbox() {
      backdrop.setAttribute('aria-hidden', 'true');
      // return focus to trigger? we could store last focus, but skip for simplicity
    }

    // expose globally for inline HTML to call
    window.openLightbox = openLightbox;
  }

  // Initialize interactions if elements exist
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    // Filtering data will be defined in each page's inline script
  });
});
