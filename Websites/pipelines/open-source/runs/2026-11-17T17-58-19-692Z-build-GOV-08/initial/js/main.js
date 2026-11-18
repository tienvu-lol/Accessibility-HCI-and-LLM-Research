/* JavaScript for GOV-08 replica – vanilla, accessible, demo interactions */
document.addEventListener('DOMContentLoaded', () => {
    // Inline sample data
    const servicesList = [
        { id: 1, name: 'Unemployment Insurance', topic: 'Health & Social Services' },
        { id: 2, name: 'Vehicle Registration', topic: 'Transportation' },
        { id: 3, name: 'Court Docket Search', topic: 'Transportation' },
        { id: 4, name: 'Family Assistance', topic: 'Families & Children' },
        { id: 5, name: 'Health Benefits', topic: 'Health & Social Services' },
        { id: 6, name: 'Child Care Services', topic: 'Families & Children' },
        { id: 7, name: 'Business Licensing', topic: 'Transportation' },
        { id: 8, name: 'Voter Information', topic: 'Health & Social Services' },
        { id: 9, name: 'Disability Services', topic: 'Health & Social Services' },
        { id: 10, name: 'Senior Programs', topic: 'Families & Children' },
        { id: 11, name: 'Environmental Permits', topic: 'Transportation' },
        { id: 12, name: 'Emergency Alerts', topic: 'Health & Social Services' }
    ];
    const orgsAtoZ = [
        'Massachusetts Department of Revenue',
        'Massachusetts Department of Transportation',
        'Massachusetts Executive Office of Health and Human Services',
        'Massachusetts Office of the Attorney General',
        'Massachusetts State Police',
        'Massachusetts Gaming Commission',
        'Massachusetts Department of Elementary and Secondary Education',
        'Massachusetts Department of Environmental Protection',
        'Massachusetts Department of Higher Education',
        'Massachusetts Department of Public Health',
        'Massachusetts Department of Correction',
        'Massachusetts Department of Fire Services',
        'Massachusetts Department of Agricultural Resources',
        'Massachusetts Commission for the Blind',
        'Massachusetts Historical Commission',
        'Massachusetts Office of Consumer Affairs and Business Regulation',
        'Massachusetts Department of Veterans Services',
        'Massachusetts Department of Youth Services',
        'Massachusetts Office of the State Auditor',
        'Massachusetts Office of the State Treasurer',
        'Massachusetts Office of the Secretary of the Commonwealth',
        'Massachusetts Office of the Governor',
        'Massachusetts Office of the Lieutenant Governor',
        'Massachusetts Office of the Comptroller',
        'Massachusetts Office of the Attorney General',
        'Massachusetts Office of the Inspector General',
        'Massachusetts Office of the State Ethics Commission',
        'Massachusetts Office of Campaign and Political Finance',
        'Massachusetts Office of Dispute Resolution',
        'Massachusetts Office of the Child Advocate',
        'Massachusetts Office of the Health Safety Net',
        'Massachusetts Office of the Health Connector',
        'Massachusetts Office of the Health Policy Commission',
        'Massachusetts Office of the Health and Hospital Finance',
        'Massachusetts Office of the Health Equity',
        'Massachusetts Office of the Health Innovation',
        'Massachusetts Office of the Health Lawyers',
        'Massachusetts Office of the Health Statistics',
        'Massachusetts Office of the Health Workforce',
        'Massachusetts Office of the Health IT',
        'Massachusetts Office of the Health Facilities',
        'Massachusetts Office of the Health Planning',
        'Massachusetts Office of the Health Research',
        'Massachusetts Office of the Health Outreach'
    ];
    const unemploymentSteps = [
        'Determine eligibility',
        'Gather required documents',
        'File initial claim online',
        'Complete weekly claim certification',
        'Attend any required eligibility review',
        'Receive benefits via direct deposit or debit card'
    ];
    const vehicleRegSteps = [
        'Verify insurance coverage',
        'Complete safety and emissions inspection (if required)',
        'Gather title and registration documents',
        'Submit renewal online or in person',
        'Receive new registration and decals'
    ];
    const courtDocketSample = [
        { caseNo: '2024-CV-00123', party: 'Doe v. Smith', date: '2024-10-02', court: 'Superior Court' },
        { caseNo: '2024-CV-00456', party: 'Roe v. Jones', date: '2024-10-03', court: 'District Court' },
        { caseNo: '2024-CV-00789', party: 'Lee v. Brown', date: '2024-10-04', court: 'Superior Court' },
        { caseNo: '2024-CV-00101', party: 'White v. Black', date: '2024-10-05', court: 'District Court' },
        { caseNo: '2024-CV-00202', party: 'Green v. Yellow', date: '2024-10-06', court: 'Superior Court' },
        { caseNo: '2024-CV-00303', party: 'Purple v. Orange', date: '2024-10-07', court: 'District Court' },
        { caseNo: '2024-CV-00404', party: 'Pink v. Gray', date: '2024-10-08', court: 'Superior Court' },
        { caseNo: '2024-CV-00505', party: 'Brown v. White', date: '2024-10-09', court: 'District Court' }
    ];
    const alertMessages = [
        'Demo: Severe weather warning for western Massachusetts.',
        'Demo: Public health advisory – flu season peak.',
        'Demo: Road closure on I-90 eastbound due to construction.'
    ];

    // ---- Skip link already handled by CSS ----

    // ---- Alert banner ----
    const alertBanner = document.getElementById('alert-banner');
    const alertMsg = document.getElementById('alert-message');
    const alertDismiss = document.getElementById('alert-dismiss');
    let alertIndex = 0;
    function showAlert() {
        alertMsg.textContent = alertMessages[alertIndex];
        alertBanner.classList.remove('hidden');
        alertBanner.removeAttribute('hidden');
        alertBanner.focus();
    }
    function hideAlert() {
        alertBanner.classList.add('hidden');
        alertBanner.setAttribute('hidden', '');
        // Return focus to first header after banner
        const firstHeader = document.querySelector('h1');
        if (firstHeader) firstHeader.focus();
    }
    // Rotate alerts every 8 seconds for demo
    setInterval(() => {
        alertIndex = (alertIndex + 1) % alertMessages.length;
        if (!alertBanner.hasAttribute('hidden')) showAlert();
    }, 8000);
    alertDismiss.addEventListener('click', hideAlert);
    // Show initial alert
    showAlert();

    // ---- Search form ----
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    searchForm.addEventListener('input', (e) => {
        if (e.target !== searchInput) return;
        const term = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        if (term === '') return;
        const matches = servicesList.filter(s =>
            s.name.toLowerCase().includes(term) ||
            s.topic.toLowerCase().includes(term)
        );
        if (matches.length === 0) {
            searchResults.innerHTML = '<li>No results found.</li>';
            return;
        }
        const ul = document.createElement('ul');
        matches.forEach(m => {
            const li = document.createElement('li');
            li.textContent = `${m.name} – ${m.topic}`;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
    });

    // ---- Calendar widget (demo month changer) ----
    const monthDisplay = document.getElementById('month-display');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    let currentMonth = 0; // 0 = Jan, 11 = Dec
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    function updateMonth() {
        monthDisplay.textContent = monthNames[currentMonth] + ' 2024';
    }
    prevBtn.addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateMonth();
    });
    nextBtn.addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        updateMonth();
    });
    updateMonth();

    // ---- Report-a-problem form ----
    const reportForm = document.getElementById('report-form');
    const reportName = document.getElementById('report-name');
    const reportEmail = document.getElementById('report-email');
    const reportDesc = document.getElementById('report-desc');
    const errorSummary = document.getElementById('error-summary');
    const errorList = document.getElementById('error-list');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const descError = document.getElementById('desc-error');
    const formSuccess = document.getElementById('form-success');

    function showInlineError(input, message) {
        input.setAttribute('aria-invalid', 'true');
        const err = input.nextElementSibling;
        if (err && err.classList.contains('error-message')) {
            err.textContent = message;
            err.style.display = 'block';
        }
    }
    function clearInlineError(input) {
        input.removeAttribute('aria-invalid');
        const err = input.nextElementSibling;
        if (err && err.classList.contains('error-message')) {
            err.textContent = '';
            err.style.display = 'none';
        }
    }
    function validateForm() {
        let valid = true;
        errorList.innerHTML = '';
        // Name
        if (reportName.value.trim() === '') {
            showInlineError(reportName, 'Name is required');
            errorList.innerHTML += '<li>Name is required</li>';
            valid = false;
        } else {
            clearInlineError(reportName);
        }
        // Email
        const emailVal = reportEmail.value.trim();
        if (emailVal === '') {
            showInlineError(reportEmail, 'Email is required');
            errorList.innerHTML += '<li>Email is required</li>';
            valid = false;
        } else {
            // simple email pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailVal)) {
                showInlineError(reportEmail, 'Enter a valid email address');
                errorList.innerHTML += '<li>Enter a valid email address</li>';
                valid = false;
            } else {
                clearInlineError(reportEmail);
            }
        }
        // Description
        if (reportDesc.value.trim() === '') {
            showInlineError(reportDesc, 'Please describe the problem');
            errorList.innerHTML += '<li>Please describe the problem</li>';
            valid = false;
        } else {
            clearInlineError(reportDesc);
        }
        if (valid) {
            errorSummary.setAttribute('hidden', '');
            errorSummary.style.display = 'none';
            formSuccess.removeAttribute('hidden');
            formSuccess.style.display = 'block';
            reportForm.reset();
            // Move focus to success message
            formSuccess.focus();
        } else {
            errorSummary.removeAttribute('hidden');
            errorSummary.style.display = 'block';
            formSuccess.setAttribute('hidden', '');
            formSuccess.style.display = 'none';
            // Focus first erroneous field
            if (reportName.hasAttribute('aria-invalid')) reportName.focus();
            else if (reportEmail.hasAttribute('aria-invalid')) reportEmail.focus();
            else reportDesc.focus();
        }
        return false; // prevent actual submit
    }
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm();
    });

    // ---- Language selector (demo) ----
    const langSelect = document.getElementById('lang-select');
    const langDemo = document.getElementById('lang-demo');
    langSelect.addEventListener('change', () => {
        const val = langSelect.value;
        if (val === 'es') {
            langDemo.textContent = 'Selección de idioma: Español (demo)';
        } else {
            langDemo.textContent = 'Language selection: English (demo)';
        }
    });
});
