/* ==========================================================================
   Atlas Digital Portfolio - Main Script
   ========================================================================== */

(function() {
    'use strict';

    // --- Inline Data ---
    const projects = [
        { id: 1, title: 'Git-Date-Extractor', category: 'applications', description: 'NPM package and CLI tool for extracting commit dates.', url: 'projects-applications-git-date-extractor-npm-package-and-cli-tool.html' },
        { id: 2, title: 'Cheatsheets Mini-Site', category: 'web-stuff', description: 'Markdown powered Gatsby mini site for developer cheatsheets.', url: 'projects-web-stuff-cheatsheets-and-snippets-markdown-powered-gatsby-mini-site.html' },
        { id: 3, title: 'E-Commerce Dashboard', category: 'applications', description: 'React-based dashboard for managing online store inventory.', url: 'projects-applications.html' },
        { id: 4, title: 'Smart Home Hub', category: 'electronics', description: 'ESP32-based home automation controller with custom PCB.', url: 'projects-electronics.html' },
        { id: 5, title: 'IoT Sensor Array', category: 'electronics', description: 'Wireless sensor network for environmental monitoring.', url: 'projects-electronics.html' },
        { id: 6, title: 'Brand Identity System', category: 'marketing', description: 'Complete visual identity and style guide for a fintech startup.', url: 'projects-marketing.html' },
        { id: 7, title: 'Social Campaign Analytics', category: 'marketing', description: 'Tool for tracking and visualizing social media engagement.', url: 'projects-marketing.html' },
        { id: 8, title: 'Retro Game Emulator', category: 'other', description: 'JavaScript-based emulator for 8-bit consoles.', url: 'projects-other.html' },
        { id: 9, title: 'Personal Finance Tracker', category: 'other', description: 'Privacy-first budgeting app with local storage.', url: 'projects-other.html' },
        { id: 10, title: 'API Gateway', category: 'web-stuff', description: 'Node.js microservice for routing and rate limiting.', url: 'projects-web-stuff.html' },
        { id: 11, title: 'Design System', category: 'web-stuff', description: 'Component library built with Web Components.', url: 'projects-web-stuff.html' },
        { id: 12, title: 'Mobile Banking App', category: 'applications', description: 'Cross-platform mobile app for secure transactions.', url: 'projects-applications.html' }
    ];

    const miniTools = [
        { id: 1, title: 'JSON Formatter', description: 'Pretty-print and validate JSON data.', url: 'mini-tools.html' },
        { id: 2, title: 'CSS Gradient Generator', description: 'Create complex CSS gradients visually.', url: 'mini-tools.html' },
        { id: 3, title: 'Regex Tester', description: 'Test regular expressions in real-time.', url: 'mini-tools.html' },
        { id: 4, title: 'Color Palette Extractor', description: 'Extract dominant colors from an image.', url: 'mini-tools.html' },
        { id: 5, title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for designs.', url: 'mini-tools.html' },
        { id: 6, title: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings.', url: 'mini-tools.html' }
    ];

    const blogPosts = [
        { id: 1, title: 'What Makes Svelte So Great', date: '2023-05-15', excerpt: 'A deep dive into Svelte\'s compile-time advantages.', url: 'posts-2023-what-makes-svelte-so-great-features-and-comparisons.html' },
        { id: 2, title: 'Shell Heredocs', date: '2023-08-22', excerpt: 'How to use heredocs for productive scripting in Bash.', url: 'posts-2023-shell-heredocs-productive-fun-bash-and-beyond.html' },
        { id: 3, title: 'Accessibility First', date: '2023-02-10', excerpt: 'Why accessibility should be part of your design process.', url: 'all-posts.html' },
        { id: 4, title: 'CSS Grid Mastery', date: '2022-11-05', excerpt: 'Advanced techniques for modern layout design.', url: 'all-posts.html' },
        { id: 5, title: 'Node.js Streams', date: '2022-09-18', excerpt: 'Understanding and using streams for efficient data processing.', url: 'all-posts.html' },
        { id: 6, title: 'TypeScript Tips', date: '2022-07-30', excerpt: 'Common pitfalls and best practices for TypeScript developers.', url: 'all-posts.html' },
        { id: 7, title: 'Web Performance', date: '2022-05-12', excerpt: 'Optimizing load times and Core Web Vitals.', url: 'all-posts.html' },
        { id: 8, title: 'Git Workflows', date: '2022-03-25', excerpt: 'Effective branching strategies for team projects.', url: 'all-posts.html' },
        { id: 9, title: 'Docker for Devs', date: '2022-01-15', excerpt: 'Getting started with containerization.', url: 'all-posts.html' },
        { id: 10, title: 'Remote Work Setup', date: '2021-12-01', excerpt: 'Building a productive home office environment.', url: 'all-posts.html' }
    ];

    // --- Navigation Active State ---
    function setActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.primary-nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // --- Filtering Logic ---
    function initFilters() {
        const projectFilters = document.querySelectorAll('[data-filter-group="projects"]');
        const blogFilters = document.querySelectorAll('[data-filter-group="blog"]');

        if (projectFilters.length > 0) {
            projectFilters.forEach(filter => {
                filter.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'BUTTON') return;
                    const category = e.target.dataset.category;
                    renderProjects(category);
                    // Update active state on filter buttons
                    projectFilters.forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                });
            });
            // Initial render
            renderProjects('all');
        }

        if (blogFilters.length > 0) {
            blogFilters.forEach(filter => {
                filter.addEventListener('change', (e) => {
                    const year = e.target.value;
                    renderBlogPosts(year);
                });
            });
            // Initial render
            renderBlogPosts('all');
        }
    }

    function renderProjects(category) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        // Guard against double rendering if HTML is already populated
        if (grid.children.length > 0) return;

        const filtered = category === 'all' 
            ? projects 
            : projects.filter(p => p.category === category);

        grid.innerHTML = filtered.map(project => `
            <li class="card">
                <h2 class="card-title"><a href="${project.url}">${project.title}</a></h2>
                <p class="card-meta">${project.category}</p>
                <p>${project.description}</p>
            </li>
        `).join('');
    }

    function renderBlogPosts(year) {
        const list = document.getElementById('blog-list');
        if (!list) return;
        // Guard against double rendering if HTML is already populated
        if (list.children.length > 0) return;

        const filtered = year === 'all'
            ? blogPosts
            : blogPosts.filter(p => p.date.startsWith(year));

        list.innerHTML = filtered.map(post => `
            <li class="card">
                <h2 class="card-title"><a href="${post.url}">${post.title}</a></h2>
                <p class="card-meta">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
            </li>
        `).join('');
    }

    // --- Contact Form Simulation ---
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.classList.add('btn-secondary');
                btn.classList.remove('btn');
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.classList.remove('btn-secondary');
                    btn.classList.add('btn');
                }, 3000);
            }, 1000);
        });
    }

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        setActiveNav();
        initFilters();
        initContactForm();
    });

})();
