/*
 * Shared JavaScript for HOSP-05 Replica
 * Vanilla JS, no dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Data ---
  const doctors = [
    { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", location: "Manhattan", bio: "Expert in interventional cardiology." },
    { id: 2, name: "Dr. James Wilson", specialty: "Neurology", location: "Brooklyn", bio: "Specializes in stroke care." },
    { id: 3, name: "Dr. Maria Garcia", specialty: "Oncology", location: "Manhattan", bio: "Focus on breast cancer research." },
    { id: 4, name: "Dr. Robert Brown", specialty: "Orthopedics", location: "Queens", bio: "Sports medicine specialist." },
    { id: 5, name: "Dr. Emily Davis", specialty: "Pediatrics", location: "Manhattan", bio: "General pediatric care." },
    { id: 6, name: "Dr. Michael Lee", specialty: "Dermatology", location: "Brooklyn", bio: "Cosmetic and medical dermatology." },
    { id: 7, name: "Dr. Lisa Johnson", specialty: "Psychiatry", location: "Manhattan", bio: "Mental health and therapy." },
    { id: 8, name: "Dr. David Kim", specialty: "Gastroenterology", location: "Queens", bio: "Digestive health specialist." },
    { id: 9, name: "Dr. Jennifer White", specialty: "Endocrinology", location: "Manhattan", bio: "Diabetes and thyroid care." },
    { id: 10, name: "Dr. Thomas Martinez", specialty: "Pulmonology", location: "Brooklyn", bio: "Lung disease treatment." },
    { id: 11, name: "Dr. Amanda Taylor", specialty: "Rheumatology", location: "Manhattan", bio: "Autoimmune disorders." },
    { id: 12, name: "Dr. Christopher Anderson", specialty: "Urology", location: "Queens", bio: "Kidney and urinary tract care." },
    { id: 13, name: "Dr. Jessica Thomas", specialty: "Ophthalmology", location: "Manhattan", bio: "Eye surgery and care." },
    { id: 14, name: "Dr. Daniel Jackson", specialty: "Anesthesiology", location: "Brooklyn", bio: "Pain management." },
    { id: 15, name: "Dr. Ashley Harris", specialty: "Emergency Medicine", location: "Manhattan", bio: "Trauma and acute care." }
  ];

  const locations = [
    { id: 1, name: "Main Hospital", address: "123 Health St, Manhattan, NY", region: "Manhattan", hours: "24/7", phone: "212-555-0101" },
    { id: 2, name: "Brooklyn Clinic", address: "456 Care Ave, Brooklyn, NY", region: "Brooklyn", hours: "8am-8pm", phone: "718-555-0102" },
    { id: 3, name: "Queens Center", address: "789 Wellness Blvd, Queens, NY", region: "Queens", hours: "9am-5pm", phone: "718-555-0103" },
    { id: 4, name: "Bronx Health Hub", address: "321 Health Way, Bronx, NY", region: "Bronx", hours: "8am-6pm", phone: "718-555-0104" },
    { id: 5, name: "Staten Island Clinic", address: "654 Care Rd, Staten Island, NY", region: "Staten Island", hours: "9am-5pm", phone: "718-555-0105" },
    { id: 6, name: "Manhattan West", address: "987 Health Ln, Manhattan, NY", region: "Manhattan", hours: "8am-8pm", phone: "212-555-0106" },
    { id: 7, name: "Brooklyn Heights", address: "147 Care St, Brooklyn, NY", region: "Brooklyn", hours: "9am-5pm", phone: "718-555-0107" },
    { id: 8, name: "Queens North", address: "258 Wellness Ave, Queens, NY", region: "Queens", hours: "8am-6pm", phone: "718-555-0108" },
    { id: 9, name: "Bronx South", address: "369 Health Blvd, Bronx, NY", region: "Bronx", hours: "9am-5pm", phone: "718-555-0109" },
    { id: 10, name: "Manhattan East", address: "741 Care Dr, Manhattan, NY", region: "Manhattan", hours: "8am-8pm", phone: "212-555-0110" },
    { id: 11, name: "Brooklyn South", address: "852 Health Ct, Brooklyn, NY", region: "Brooklyn", hours: "9am-5pm", phone: "718-555-0111" },
    { id: 12, name: "Queens East", address: "963 Wellness Pl, Queens, NY", region: "Queens", hours: "8am-6pm", phone: "718-555-0112" }
  ];

  const conditions = [
    { id: 1, name: "Heart Disease", category: "Cardiology" },
    { id: 2, name: "Cancer", category: "Oncology" },
    { id: 3, name: "Diabetes", category: "Endocrinology" },
    { id: 4, name: "Stroke", category: "Neurology" },
    { id: 5, name: "Asthma", category: "Pulmonology" },
    { id: 6, name: "Arthritis", category: "Rheumatology" },
    { id: 7, name: "Depression", category: "Psychiatry" },
    { id: 8, name: "Back Pain", category: "Orthopedics" },
    { id: 9, name: "Skin Cancer", category: "Dermatology" },
    { id: 10, name: "Kidney Disease", category: "Urology" },
    { id: 11, name: "Vision Loss", category: "Ophthalmology" },
    { id: 12, name: "Digestive Disorders", category: "Gastroenterology" },
    { id: 13, name: "Childhood Illnesses", category: "Pediatrics" },
    { id: 14, name: "Trauma", category: "Emergency Medicine" },
    { id: 15, name: "Chronic Pain", category: "Anesthesiology" },
    { id: 16, name: "Allergies", category: "Immunology" },
    { id: 17, name: "Bone Fractures", category: "Orthopedics" },
    { id: 18, name: "Migraines", category: "Neurology" },
    { id: 19, name: "Thyroid Issues", category: "Endocrinology" },
    { id: 20, name: "Eye Infections", category: "Ophthalmology" }
  ];

  const insuranceDocs = [
    { id: 1, title: "Insurance Accepted List", description: "Comprehensive list of accepted insurance plans." },
    { id: 2, title: "Billing FAQ", description: "Frequently asked questions about billing." },
    { id: 3, title: "Financial Assistance Application", description: "Apply for financial assistance." },
    { id: 4, title: "Payment Plans", description: "Information on available payment plans." },
    { id: 5, title: "Out-of-Network Claims", description: "How to file out-of-network claims." },
    { id: 6, title: "Pre-authorization Guide", description: "Guide to getting pre-authorization." },
    { id: 7, title: "Explanation of Benefits", description: "Understanding your EOB." },
    { id: 8, title: "Contact Billing Department", description: "Direct contact info for billing." }
  ];

  const patientForms = [
    { id: 1, title: "New Patient Registration", description: "Form for new patients." },
    { id: 2, title: "Medical History", description: "Detailed medical history form." },
    { id: 3, title: "Consent for Treatment", description: "Standard consent form." },
    { id: 4, title: "HIPAA Privacy Notice", description: "Privacy policy acknowledgment." },
    { id: 5, title: "Advance Directive", description: "Advance care planning form." },
    { id: 6, title: "Insurance Information", description: "Insurance details form." }
  ];

  // --- Interactions ---

  // 1. Doctor Search & Filter
  const doctorSearchInput = document.getElementById('doctor-search');
  const doctorSpecialtyFilter = document.getElementById('doctor-specialty-filter');
  const doctorResults = document.getElementById('doctor-results');

  if (doctorSearchInput && doctorResults) {
    function renderDoctors(list) {
      doctorResults.innerHTML = '';
      if (list.length === 0) {
        doctorResults.innerHTML = '<p>No doctors found matching your criteria.</p>';
        return;
      }
      list.forEach(doc => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${doc.name}</strong> - ${doc.specialty}<br>${doc.location}<br><em>${doc.bio}</em>`;
        doctorResults.appendChild(li);
      });
    }

    function filterDoctors() {
      const searchTerm = doctorSearchInput.value.toLowerCase();
      const specialty = doctorSpecialtyFilter.value;

      const filtered = doctors.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm) || doc.specialty.toLowerCase().includes(searchTerm);
        const matchesSpecialty = specialty === '' || doc.specialty === specialty;
        return matchesSearch && matchesSpecialty;
      });

      renderDoctors(filtered);
    }

    doctorSearchInput.addEventListener('input', filterDoctors);
    doctorSpecialtyFilter.addEventListener('change', filterDoctors);
    renderDoctors(doctors); // Initial render
  }

  // 2. Location Filter
  const locationRegionFilter = document.getElementById('location-region-filter');
  const locationResults = document.getElementById('location-results');

  if (locationRegionFilter && locationResults) {
    function renderLocations(list) {
      locationResults.innerHTML = '';
      if (list.length === 0) {
        locationResults.innerHTML = '<p>No locations found in this region.</p>';
        return;
      }
      list.forEach(loc => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${loc.name}</strong><br>${loc.address}<br>Hours: ${loc.hours}<br>Phone: ${loc.phone}`;
        locationResults.appendChild(li);
      });
    }

    function filterLocations() {
      const region = locationRegionFilter.value;
      const filtered = region === '' ? locations : locations.filter(loc => loc.region === region);
      renderLocations(filtered);
    }

    locationRegionFilter.addEventListener('change', filterLocations);
    renderLocations(locations); // Initial render
  }

  // 3. Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');

      // Reset errors
      [name, email, message].forEach(field => {
        field.classList.remove('invalid');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
          errorEl.style.display = 'none';
        }
      });

      // Validate Name
      if (name.value.trim() === '') {
        name.classList.add('invalid');
        name.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      // Validate Email
      if (email.value.trim() === '' || !email.value.includes('@')) {
        email.classList.add('invalid');
        email.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      // Validate Message
      if (message.value.trim() === '') {
        message.classList.add('invalid');
        message.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        alert('Thank you for your message. This is a demo form and no data was sent.');
        contactForm.reset();
      }
    });
  }

  // 4. Active Nav State
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.primary-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
