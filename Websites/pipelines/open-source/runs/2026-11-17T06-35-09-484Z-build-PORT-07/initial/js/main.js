/**
 * Main JavaScript for Portfolio Replica
 * Handles navigation, filtering, and interactions.
 */

(function() {
  'use strict';

  // --- Sample Data ---
  const projectsData = [
    { id: 1, title: 'Git-Date-Extractor', category: 'applications', description: 'NPM package and CLI tool for extracting dates from git logs.', url: 'projects-applications-git-date-extractor-npm-package-and-cli-tool.html' },
    { id: 2, title: 'Cheatsheets Mini-Site', category: 'web-stuff', description: 'Markdown powered Gatsby mini site for developer cheatsheets.', url: 'projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html' },
    { id: 3, title: 'E-Commerce Dashboard', category: 'applications', description: 'React-based dashboard for managing online store inventory.', url: '#' },
    { id: 4, title: 'Smart Home Hub', category: 'electronics', description: 'ESP32 based home automation controller with web interface.', url: '#' },
    { id: 5, title: 'IoT Sensor Array', category: 'electronics', description: 'Wireless sensor network for environmental monitoring.', url: '#' },
    { id: 6, title: 'Brand Identity Redesign', category: 'marketing', description: 'Complete rebrand for a local tech startup.', url: '#' },
    { id: 7, title: 'SEO Audit Tool', category: 'marketing', description: 'Automated SEO analysis script for small business sites.', url: '#' },
    { id: 8, title: '3D Printer Mod', category: 'other', description: 'Custom firmware and hardware mods for Creality Ender 3.', url: '#' },
    { id: 9, title: 'Mechanical Keyboard', category: 'other', description: 'Hand-wired 60% keyboard with custom keycaps.', url: '#' },
    { id: 10, title: 'Portfolio V1', category: 'web-stuff', description: 'First version of this portfolio built with Hugo.', url: '#' },
    { id: 11, title: 'Weather Widget', category: 'web-stuff', description: 'Simple weather widget using OpenWeatherMap API.', url: '#' },
    { id: 12, title: 'Task Manager', category: 'applications', description: 'Local-first task manager with offline support.', url: '#' }
  ];

  const blogData = [
    { id: 1, title: 'What Makes Svelte So Great', date: '2023-05-15', category: 'tech', url: 'posts-2023-what-makes-svelte-so-great-features-and-comparisons.html' },
    { id: 2, title: 'Shell Heredocs - for Fun and Profit', date: '2023-06-20', category: 'tech', url: 'posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html' },
    { id: 3, title: 'Building Accessible Forms', date: '2023-07-10', category: 'accessibility', url: '#' },
    { id: 4, title: 'CSS Grid vs Flexbox', date: '2023-08-05', category: 'tech', url: '#' },
    { id: 5, title: 'My Setup for 2023', date: '2023-09-01', category: 'personal', url: '#' },
    { id: 6, title: 'Understanding Web Components', date: '2023-10-12', category: 'tech', url: '#' },
    { id: 7, title: 'The Joy of Static Sites', date: '2023-11-05', category: 'tech', url: '#' },
    { id: 8, title: 'Remote Work Productivity', date: '2023-12-01', category: 'personal', url: '#' },
    { id: 9, title: 'Learning Rust', date: '2024-01-15', category: 'tech', url: '#' },
    { id: 10, title: 'Open Source Contributions', date: '2024-02-20', category: 'community', url: '#' }
  ];

  const toolsData = [
    { id: 1, title: 'Color Contrast Checker', description: 'Check if your text colors meet WCAG standards.', url: '#' },
    { id: 2, title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs.', url: '#' },
    { id: 3, title: 'JSON Formatter', description: 'Pretty print and validate JSON data.', url: '#' },
    { id: 4, title: 'CSS Gradient Generator', description: 'Create beautiful CSS gradients visually.', url: '#' },
    { id: 5, title: 'Regex Tester', description: 'Test regular expressions in real-time.', url: '#' },
    { id: 6, title: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings.', url: '#' }
  ];

  // --- Navigation ---
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('is-open');
    });

    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  // --- Project Filtering ---
  function initFilters() {
    const filterContainer = document.querySelector('.filters');
    const cardGrid = document.querySelector('.card-grid');
    
    if (!filterContainer || !cardGrid) return;

    // Create filter buttons
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];
    
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn';
      btn.setAttribute('aria-pressed', cat === 'all' ? 'true' : 'false');
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.dataset.category = cat;
      
      btn.addEventListener('click', () => {
        // Update buttons
        filterContainer.querySelectorAll('.filter-btn').forEach(b => {
          b.setAttribute('aria-pressed', 'false');
        });
        btn.setAttribute('aria-pressed', 'true');
        
        // Filter cards
        const cards = cardGrid.querySelectorAll('.card');
        cards.forEach(card => {
          const projectCat = card.dataset.category;
          if (cat === 'all' || projectCat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
      
      filterContainer.appendChild(btn);
    });
  }

  // --- Tool Simulation ---
  function initTools() {
    const toolButtons = document.querySelectorAll('.tool-action');
    toolButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const toolName = btn.dataset.tool;
        alert(`Simulation: ${toolName} executed. In a real environment, this would perform the action.`);
      });
    });
  }

  // --- Support Me Simulation ---
  function initSupport() {
    const supportBtns = document.querySelectorAll('.support-me-btn');
    supportBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Simulation: Support page would open here. Thank you for your interest!');
      });
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initFilters();
    initTools();
    initSupport();
  });

})();
