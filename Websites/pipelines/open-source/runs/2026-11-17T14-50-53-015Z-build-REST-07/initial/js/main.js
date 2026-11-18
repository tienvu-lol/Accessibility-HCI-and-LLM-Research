document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMenuFilter();
  initSupportSearch();
  initGiftCard();
  initReservation();
});

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
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// Sample Data
const menuItems = [
  { id: 1, name: "Broccoli Cheddar Soup", category: "Soups", price: "$5.99", desc: "Creamy broccoli cheddar soup." },
  { id: 2, name: "Garden Salad", category: "Salads", price: "$6.99", desc: "Fresh mixed greens with vinaigrette." },
  { id: 3, name: "Turkey Avocado Panini", category: "Sandwiches", price: "$8.99", desc: "Turkey, avocado, and pesto." },
  { id: 4, name: "Mac & Cheese", category: "Sides", price: "$4.99", desc: "Creamy macaroni and cheese." },
  { id: 5, name: "Tomato Basil Soup", category: "Soups", price: "$5.49", desc: "Classic tomato basil soup." },
  { id: 6, name: "Caesar Salad", category: "Salads", price: "$7.49", desc: "Romaine lettuce with Caesar dressing." },
  { id: 7, name: "Grilled Cheese", category: "Sandwiches", price: "$6.49", desc: "Classic grilled cheese sandwich." },
  { id: 8, name: "Side Salad", category: "Sides", price: "$3.99", desc: "Fresh side salad." },
  { id: 9, name: "Chicken Noodle Soup", category: "Soups", price: "$6.29", desc: "Hearty chicken noodle soup." },
  { id: 10, name: "Quinoa Power Bowl", category: "Salads", price: "$8.49", desc: "Quinoa, kale, and roasted veggies." },
  { id: 11, name: "Veggie Panini", category: "Sandwiches", price: "$7.99", desc: "Grilled vegetables and hummus." },
  { id: 12, name: "Apple Chips", category: "Sides", price: "$2.99", desc: "Crispy apple chips." }
];

function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cardGrid = document.querySelector('.card-grid');
  if (!filterBtns.length || !cardGrid) return;

  function renderCards(items) {
    cardGrid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-img" role="img" aria-label="${item.name} placeholder image">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          <p>${item.desc}</p>
          <p><strong>${item.price}</strong></p>
        </div>
      `;
      cardGrid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
      renderCards(filtered);
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Initial render
  renderCards(menuItems);
}

const supportArticles = [
  { id: 1, topic: "Order Status", desc: "Check the status of your online order." },
  { id: 2, topic: "Gift Cards", desc: "Manage your gift card balance and redemption." },
  { id: 3, topic: "Allergens", desc: "Find information about allergens in our menu." },
  { id: 4, topic: "Rewards", desc: "Learn about our rewards program." },
  { id: 5, topic: "Contact Us", desc: "Get in touch with customer support." }
];

function initSupportSearch() {
  const searchInput = document.querySelector('#support-search');
  const resultsList = document.querySelector('#support-results');
  if (!searchInput || !resultsList) return;

  function renderResults(items) {
    resultsList.innerHTML = '';
    if (items.length === 0) {
      resultsList.innerHTML = '<li>No results found.</li>';
      return;
    }
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.topic}</strong>: ${item.desc}`;
      resultsList.appendChild(li);
    });
  }

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = supportArticles.filter(article => 
      article.topic.toLowerCase().includes(query) || 
      article.desc.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  // Initial render
  renderResults(supportArticles);
}

function initGiftCard() {
  const form = document.querySelector('#gift-card-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = document.querySelector('#gift-card-number').value;
    const pin = document.querySelector('#gift-card-pin').value;
    const resultDiv = document.querySelector('#gift-card-result');
    
    if (cardNumber && pin) {
      resultDiv.innerHTML = `
        <div class="alert alert-success" role="alert">
          <p>Balance for card ending in ${cardNumber.slice(-4)}: <strong>$25.50</strong></p>
          <p><em>This is a simulated balance for demonstration purposes.</em></p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="alert alert-error" role="alert">
          <p>Please enter both card number and PIN.</p>
        </div>
      `;
    }
  });
}

function initReservation() {
  const form = document.querySelector('#reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#reservation-name').value;
    const date = document.querySelector('#reservation-date').value;
    const time = document.querySelector('#reservation-time').value;
    const guests = document.querySelector('#reservation-guests').value;
    const resultDiv = document.querySelector('#reservation-result');

    if (name && date && time && guests) {
      resultDiv.innerHTML = `
        <div class="alert alert-success" role="alert">
          <p>Reservation confirmed for ${name} on ${date} at ${time} for ${guests} guests.</p>
          <p><em>This is a simulated reservation for demonstration purposes.</em></p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="alert alert-error" role="alert">
          <p>Please fill in all fields.</p>
        </div>
      `;
    }
  });
}
