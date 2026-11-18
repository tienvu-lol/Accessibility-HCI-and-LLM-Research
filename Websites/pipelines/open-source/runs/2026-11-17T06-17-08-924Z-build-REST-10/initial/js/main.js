/* Shared data sets */
const menuItems = [
  { name: "Sourdough", price: "$5" },
  { name: "Croissant", price: "$3" },
  { name: "Chocolate Tart", price: "$4" },
  { name: "Bagel", price: "$2.5" },
  { name: "Quiche", price: "$6" },
  { name: "Muffin", price: "$3" },
  { name: "Cinnamon Roll", price: "$4" },
  { name: "Baguette", price: "$4" },
  { name: "Apple Pie", price: "$5" },
  { name: "Coffee", price: "$2" },
  { name: "Tea", price: "$2" },
  { name: "Lemonade", price: "$2.5" }
];

const cityLocations = [
  { city: "San Francisco", address: "123 Market St", hours: "7am‑5pm" },
  { city: "Los Angeles", address: "456 Sunset Blvd", hours: "8am‑4pm" },
  { city: "Seattle", address: "789 Pike St", hours: "7am‑5pm" },
  { city: "Portland", address: "321 Burnside", hours: "8am‑4pm" },
  { city: "Oakland", address: "654 Broadway", hours: "7am‑5pm" }
];

const pressItems = [
  { title: "Tartine Bakery featured in Food Magazine", date: "2023-05-12" },
  { title: "New seasonal menu launch", date: "2023-03-08" },
  { title: "Community outreach program", date: "2022-11-20" },
  { title: "Awarded Best Bakery 2022", date: "2022-09-15" }
];

/* Navigation toggle */
function initNav() {
  const nav = document.querySelector('[data-component="primary-nav"]');
  const toggleBtn = document.getElementById('nav-toggle');
  if (!nav || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('data-open', String(!expanded));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
      toggleBtn.click();
      toggleBtn.focus();
    }
  });
}

/* Location filter (demo) */
function renderLocations(filter = '') {
  const container = document.getElementById('location-grid');
  if (!container) return;
  container.innerHTML = '';
  const filtered = cityLocations.filter(loc => loc.city.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(loc => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `<strong>${loc.city}</strong><br>${loc.address}<br><small>${loc.hours}</small>`;
    container.appendChild(card);
  });
}

/* Reservation form demo */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const date = form.elements['date'].value;
    const errors = [];

    if (!name) errors.push('Name is required.');
    if (!email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) errors.push('Valid email required.');
    if (!date) errors.push('Reservation date required.');

    const errorDiv = document.getElementById('form-errors');
    errorDiv.innerHTML = '';
    if (errors.length) {
      errors.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg;
        errorDiv.appendChild(p);
      });
      errorDiv.classList.remove('hidden');
      errorDiv.focus();
    } else {
      errorDiv.classList.add('hidden');
      alert('Reservation submitted (demo).');
      form.reset();
    }
  });
}

/* Init on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
  initNav();

  // Location page init
  const filterInput = document.getElementById('location-filter');
  if (filterInput) {
    filterInput.addEventListener('input', (e) => renderLocations(e.target.value));
    renderLocations();
  }

  // Reservation form init
  initReservationForm();
});
