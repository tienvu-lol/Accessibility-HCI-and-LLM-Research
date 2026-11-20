/* Harvest Table Replica JS */

// Inline Sample Data
const menuItems = [
  { id: 1, name: "Harvest Bowl", category: "Bowls", price: 12.99, desc: "Quinoa, roasted veggies, tahini." },
  { id: 2, name: "Avocado Toast", category: "Breakfast", price: 9.99, desc: "Sourdough, smashed avocado, chili flakes." },
  { id: 3, name: "Grilled Cheese", category: "Sandwiches", price: 8.99, desc: "Cheddar, gruyere, tomato soup side." },
  { id: 4, name: "Berry Smoothie", category: "Drinks", price: 5.99, desc: "Mixed berries, yogurt, honey." },
  { id: 5, name: "Caesar Salad", category: "Salads", price: 10.99, desc: "Romaine, parmesan, croutons." },
  { id: 6, name: "Bagel & Cream Cheese", category: "Breakfast", price: 4.99, desc: "Plain bagel, scallion cream cheese." },
  { id: 7, name: "Chicken Pesto Panini", category: "Sandwiches", price: 11.99, desc: "Grilled chicken, pesto, mozzarella." },
  { id: 8, name: "Iced Coffee", category: "Drinks", price: 3.99, desc: "Cold brew, oat milk option." },
  { id: 9, name: "Veggie Wrap", category: "Salads", price: 9.49, desc: "Spinach wrap, hummus, veggies." },
  { id: 10, name: "Chocolate Chip Cookie", category: "Desserts", price: 2.99, desc: "Warm, gooey center." },
  { id: 11, name: "Quiche Lorraine", category: "Breakfast", price: 7.99, desc: "Bacon, cheese, flaky crust." },
  { id: 12, name: "Lemonade", category: "Drinks", price: 3.49, desc: "Fresh squeezed, mint." }
];

const locations = [
  { id: 1, name: "Harvest Table Downtown", address: "123 Main St, Cityville, ST 12345", phone: "(555) 123-4567", hours: "6am - 9pm" },
  { id: 2, name: "Harvest Table Westside", address: "456 Oak Ave, Townsburg, ST 67890", phone: "(555) 987-6543", hours: "7am - 8pm" },
  { id: 3, name: "Harvest Table Northgate", address: "789 Pine Rd, Villageton, ST 11223", phone: "(555) 456-7890", hours: "6am - 10pm" },
  { id: 4, name: "Harvest Table Eastend", address: "321 Elm St, Hamletville, ST 44556", phone: "(555) 789-0123", hours: "7am - 9pm" }
];

const giftCardDenominations = [
  { id: 1, amount: 25, label: "$25 Gift Card" },
  { id: 2, amount: 50, label: "$50 Gift Card" },
  { id: 3, amount: 100, label: "$100 Gift Card" }
];

const pressReleases = [
  { id: 1, title: "Harvest Table Announces New Sustainability Initiative", date: "2026-10-01", summary: "Commitment to 100% compostable packaging by 2027." },
  { id: 2, title: "Harvest Table Opens Fifth Location", date: "2026-09-15", summary: "New store in Suburbia brings fresh options to the community." },
  { id: 3, title: "Harvest Table Partners with Local Farms", date: "2026-08-20", summary: "Sourcing 50% more ingredients from regional growers." }
];

const communityPrograms = [
  { id: 1, title: "Breakfast for Students", summary: "Providing free breakfast to local schools every Tuesday." },
  { id: 2, title: "Community Garden Project", summary: "Supporting urban agriculture initiatives in Cityville." }
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMenuFilter();
  initGiftCardBalance();
  initSupportSearch();
  initReservationForm();
  initNewsletterForm();
});

// Navigation
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Menu Filter
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.menu-category-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  if (filterBtns.length === 0 || menuItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Gift Card Balance
function initGiftCardBalance() {
  const form = document.getElementById('gift-card-balance-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById('gift-card-number').value;
    const pin = document.getElementById('gift-card-pin').value;
    const resultDiv = document.getElementById('gift-card-balance-result');
    
    if (!cardNumber || !pin) {
      resultDiv.innerHTML = '<p class="error-message">Please enter both card number and PIN.</p>';
      return;
    }

    // Simulation
    resultDiv.innerHTML = `<p>Balance for card ending in ${cardNumber.slice(-4)}: <strong>$${(Math.random() * 50).toFixed(2)}</strong></p>`;
  });
}

// Support Search
function initSupportSearch() {
  const searchInput = document.getElementById('support-search-input');
  const faqItems = document.querySelectorAll('.faq-item');
  if (!searchInput || faqItems.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    faqItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Reservation Form
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reservation-name').value;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const guests = document.getElementById('reservation-guests').value;

    if (!name || !date || !time || !guests) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulation
    const resultDiv = document.getElementById('reservation-result');
    resultDiv.innerHTML = `<p>Thank you, ${name}! Your reservation for ${guests} on ${date} at ${time} has been confirmed. (Simulation)</p>`;
    form.reset();
  });
}

// Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const resultDiv = document.getElementById('newsletter-result');
    
    if (!email || !email.includes('@')) {
      resultDiv.innerHTML = '<p class="error-message">Please enter a valid email address.</p>';
      return;
    }

    // Simulation
    resultDiv.innerHTML = '<p>Thank you for subscribing!</p>';
    form.reset();
  });
}
