document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('is-open');
        });
    }

    // Alert Dismissal
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        const alertClose = alertBanner.querySelector('button');
        if (alertClose) {
            alertClose.addEventListener('click', () => {
                alertBanner.style.display = 'none';
                sessionStorage.setItem('alertDismissed', 'true');
            });
        }
        // Restore dismissed state
        if (sessionStorage.getItem('alertDismissed') === 'true') {
            alertBanner.style.display = 'none';
        }
    }

    // Language Toggle (Demo)
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = langToggle.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'es' : 'en';
            langToggle.setAttribute('data-lang', newLang);
            langToggle.textContent = newLang === 'en' ? 'Español' : 'English';
            // In a real app, this would trigger a translation function
            // For demo, we just toggle the button text
            alert(`Language switched to ${newLang === 'en' ? 'English' : 'Spanish'}. (Demo)`);
        });
    }

    // Service Search (if on services page)
    const serviceSearchInput = document.getElementById('service-search');
    const serviceList = document.getElementById('service-list');
    if (serviceSearchInput && serviceList) {
        serviceSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = serviceList.querySelectorAll('.card');
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Calendar Navigation (if on events page)
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const monthDisplay = document.getElementById('current-month');
    const eventList = document.getElementById('event-list');

    if (prevMonthBtn && nextMonthBtn && monthDisplay && eventList) {
        let currentDate = new Date();
        
        function renderEvents(date) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            monthDisplay.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            
            // In a real app, this would filter a dataset
            // For demo, we just show a message
            eventList.innerHTML = `<p>Events for ${monthNames[date.getMonth()]} ${date.getFullYear()} would be listed here.</p>`;
        }

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderEvents(currentDate);
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderEvents(currentDate);
        });

        renderEvents(currentDate);
    }

    // Form Validation (Service Request & Pay Bill)
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                if (!field.value.trim()) {
                    formGroup.classList.add('has-error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('has-error');
                }
            });

            if (isValid) {
                // Simulate submission
                const successMsg = form.querySelector('.success-message');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    form.reset();
                } else {
                    alert('Form submitted successfully (Demo).');
                }
            } else {
                // Move focus to first error
                const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    });
});
