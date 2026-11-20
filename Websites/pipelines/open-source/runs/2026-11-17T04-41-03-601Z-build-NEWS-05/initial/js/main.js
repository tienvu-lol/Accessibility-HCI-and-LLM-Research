document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Navigation Toggle ===
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.contains('is-open');
            primaryNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', !isOpen);
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

    // === Tabs (Latest/Most-Read) ===
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Deactivate all tabs
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            panels.forEach(p => p.classList.remove('is-active'));

            // Activate clicked tab
            tab.setAttribute('aria-selected', 'true');
            document.getElementById(target).classList.add('is-active');
        });

        // Keyboard navigation for tabs
        tab.addEventListener('keydown', (e) => {
            let index = Array.from(tabs).indexOf(tab);
            let newIndex = index;

            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabs.length) % tabs.length;
            }

            if (newIndex !== index) {
                e.preventDefault();
                tabs[newIndex].focus();
                tabs[newIndex].click();
            }
        });
    });

    // === Newsletter Form Validation ===
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const submitBtn = newsletterForm.querySelector('.newsletter-btn');
        const messageDiv = newsletterForm.querySelector('.newsletter-message');

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                emailInput.classList.add('is-invalid');
                emailInput.setAttribute('aria-invalid', 'true');
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = '#e63946';
                return;
            }

            // Simulate submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            setTimeout(() => {
                newsletterForm.reset();
                emailInput.classList.remove('is-invalid');
                emailInput.removeAttribute('aria-invalid');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
                messageDiv.textContent = 'Thank you for subscribing!';
                messageDiv.style.color = '#28a745';
            }, 1000);
        });
    }

    // === Premium Gate Simulation ===
    const premiumBtns = document.querySelectorAll('.premium-gate-btn');
    premiumBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('This is a simulation. In a real site, this would lead to a subscription page.');
        });
    });
});
