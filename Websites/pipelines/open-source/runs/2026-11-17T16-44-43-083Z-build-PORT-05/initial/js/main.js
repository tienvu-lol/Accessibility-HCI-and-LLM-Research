document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
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

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update button states
      filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      
      // Filter cards
      projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact Form Simulation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      let isValid = true;
      const errors = [];
      
      if (!name) {
        isValid = false;
        errors.push('Name is required.');
      }
      if (!email || !email.includes('@')) {
        isValid = false;
        errors.push('Valid email is required.');
      }
      if (!message) {
        isValid = false;
        errors.push('Message is required.');
      }
      
      if (!isValid) {
        const errorSummary = document.createElement('div');
        errorSummary.className = 'error-summary';
        errorSummary.setAttribute('role', 'alert');
        errorSummary.innerHTML = `<h2>Please correct the following errors:</h2><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
        contactForm.insertBefore(errorSummary, contactForm.firstChild);
        errorSummary.querySelector('ul').focus();
        return;
      }
      
      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        contactForm.innerHTML = '<div class="success-message" role="status"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';
      }, 1000);
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
      } else {
        backToTopBtn.style.opacity = '0';
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Sample Data
const projectsData = [
  { id: 1, title: 'Project Alpha', category: 'applications', description: 'A web application for data extraction.', url: '#' },
  { id: 2, title: 'Project Beta', category: 'electronics', description: 'A custom PCB design.', url: '#' },
  { id: 3, title: 'Project Gamma', category: 'marketing', description: 'SEO analysis tool.', url: '#' },
  { id: 4, title: 'Project Delta', category: 'web-stuff', description: 'Static site generator.', url: '#' },
  { id: 5, title: 'Project Epsilon', category: 'other', description: 'Miscellaneous experiments.', url: '#' },
  { id: 6, title: 'Project Zeta', category: 'applications', description: 'CLI tool for git.', url: '#' },
  { id: 7, title: 'Project Eta', category: 'electronics', description: 'IoT sensor node.', url: '#' },
  { id: 8, title: 'Project Theta', category: 'marketing', description: 'Email campaign tracker.', url: '#' },
  { id: 9, title: 'Project Iota', category: 'web-stuff', description: 'CSS framework.', url: '#' },
  { id: 10, title: 'Project Kappa', category: 'other', description: 'Game prototype.', url: '#' },
  { id: 11, title: 'Project Lambda', category: 'applications', description: 'Database migration tool.', url: '#' },
  { id: 12, title: 'Project Mu', category: 'web-stuff', description: 'API wrapper.', url: '#' }
];

const blogPostsData = [
  { id: 1, title: 'What Makes Svelte So Great', date: '2023-01-15', excerpt: 'A deep dive into Svelte features.', url: '#' },
  { id: 2, title: 'Shell Heredocs', date: '2023-02-20', excerpt: 'Using heredocs in Bash.', url: '#' },
  { id: 3, title: 'CSS Grid Basics', date: '2023-03-10', excerpt: 'Understanding CSS Grid.', url: '#' },
  { id: 4, title: 'JavaScript Async', date: '2023-04-05', excerpt: 'Async/await patterns.', url: '#' },
  { id: 5, title: 'Web Accessibility', date: '2023-05-12', excerpt: 'WCAG guidelines.', url: '#' },
  { id: 6, title: 'Node.js Streams', date: '2023-06-18', excerpt: 'Handling data streams.', url: '#' },
  { id: 7, title: 'React vs Vue', date: '2023-07-22', excerpt: 'Framework comparison.', url: '#' },
  { id: 8, title: 'TypeScript Tips', date: '2023-08-30', excerpt: 'Advanced TS features.', url: '#' }
];

const miniToolsData = [
  { id: 1, title: 'Color Picker', description: 'Select colors.', url: '#' },
  { id: 2, title: 'JSON Formatter', description: 'Pretty print JSON.', url: '#' },
  { id: 3, title: 'Regex Tester', description: 'Test regular expressions.', url: '#' },
  { id: 4, title: 'Base64 Encoder', description: 'Encode/decode Base64.', url: '#' },
  { id: 5, title: 'Lorem Ipsum', description: 'Generate dummy text.', url: '#' },
  { id: 6, title: 'Unit Converter', description: 'Convert units.', url: '#' }
];
