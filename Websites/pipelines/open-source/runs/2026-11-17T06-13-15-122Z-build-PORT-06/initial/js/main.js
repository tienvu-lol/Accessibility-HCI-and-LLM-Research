/* Shared JavaScript for the replica */

/* Navigation toggle */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav[data-component="primary-nav"]');
  const toggleBtn = document.querySelector('button[data-component="nav-toggle"]');

  if (nav && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  /* Contact form handling */
  const contactForm = document.querySelector('form[data-component="contact-form"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const errors = {};

      // Simple validation
      if (!formData.get('name')?.trim()) {
        errors.name = 'Name is required.';
      }
      if (!formData.get('email')?.trim()) {
        errors.email = 'Email is required.';
      } else if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(formData.get('email'))) {
        errors.email = 'Enter a valid email address.';
      }
      if (!formData.get('message')?.trim()) {
        errors.message = 'Message cannot be empty.';
      }

      // Clear previous errors
      contactForm.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (Object.keys(errors).length > 0) {
        // Show errors
        Object.entries(errors).forEach(([field, msg]) => {
          const errorEl = contactForm.querySelector(`.error[data-for="${field}"]`);
          if (errorEl) errorEl.textContent = msg;
        });
        // Focus first error field
        const firstErrorField = contactForm.querySelector(`[name="${Object.keys(errors)[0]}"]`);
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Simulated successful submission
      const successDiv = document.createElement('div');
      successDiv.setAttribute('role', 'status');
      successDiv.textContent = 'Thank you! Your message has been received.';
      contactForm.replaceWith(successDiv);
    });
  }

  /* Sample data for other pages (inline) */
  window.sampleData = {
    blogPosts: [
      { title: 'Understanding Async JavaScript', date: '2023-05-01', excerpt: 'A quick guide to async patterns.' },
      { title: 'Testing React Components', date: '2023-04-15', excerpt: 'Best practices for component testing.' },
      { title: 'CSS Grid vs Flexbox', date: '2023-03-20', excerpt: 'When to use each layout system.' },
      { title: 'Node.js Streams Explained', date: '2023-02-10', excerpt: 'Deep dive into streams API.' },
      { title: 'Accessibility First', date: '2023-01-05', excerpt: 'Why accessibility matters.' }
    ],
    talksList: [
      { title: 'Modern Testing Strategies', event: 'JSConf', date: '2022-09-12' },
      { title: 'React Hooks in Depth', event: 'React Summit', date: '2022-07-08' },
      { title: 'Performance Optimization', event: 'WebPerf', date: '2022-05-20' },
      { title: 'State Management', event: 'Frontend Masters', date: '2022-04-15' },
      { title: 'Design Systems', event: 'DesignOps', date: '2022-03-10' },
      { title: 'Open Source Sustainability', event: 'OSS Summit', date: '2022-02-01' }
    ],
    coursesList: [
      { title: 'Testing JavaScript', description: 'Learn unit, integration, and end‑to‑end testing.' },
      { title: 'Advanced React', description: 'Hooks, context, and performance patterns.' },
      { title: 'Accessibility Fundamentals', description: 'Build inclusive web experiences.' },
      { title: 'Full‑Stack Node', description: 'From APIs to databases.' }
    ],
    testimonialsList: [
      { author: 'Alex Johnson', text: 'The courses transformed my workflow.' },
      { author: 'Maria Lee', text: 'Clear, practical, and engaging.' },
      { author: 'Sam Patel', text: 'A go‑to resource for testing.' },
      { author: 'Lena Wu', text: 'Excellent depth on accessibility.' },
      { author: 'Tomás García', text: 'Highly recommend the React talks.' }
    ],
    officeHoursSlots: [
      { day: 'Monday', time: '10:00 – 11:00 UTC' },
      { day: 'Wednesday', time: '14:00 – 15:00 UTC' },
      { day: 'Friday', time: '16:00 – 17:00 UTC' }
    ]
  };
});
