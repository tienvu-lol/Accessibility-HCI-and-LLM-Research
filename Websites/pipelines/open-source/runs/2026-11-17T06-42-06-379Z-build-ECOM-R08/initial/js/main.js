/* Shared JavaScript for the replica */
/* Inline sample data – used by pages that need it */
const sampleData = {
  products: [
    { id: 1, name: "Organic Bananas", price: 0.59, imageAlt: " bunch of bananas", category: "Produce" },
    { id: 2, name: "Whole Milk Gallon", price: 3.49, imageAlt: "plastic gallon of milk", category: "Dairy" },
    { id: 3, name: "Multigrain Bread", price: 2.99, imageAlt: "loaf of multigrain bread", category: "Bakery" },
    { id: 4, name: "Chicken Breast", price: 5.99, imageAlt: "raw chicken breast", category: "Meat" },
    { id: 5, name: "Olive Oil", price: 6.99, imageAlt: "bottle of olive oil", category: "Pantry" },
    { id: 6, name: "Almond Butter", price: 4.49, imageAlt: "jar of almond butter", category: "Spreads" },
    { id: 7, name: "Sparkling Water", price: 1.29, imageAlt: "can of sparkling water", category: "Beverages" },
    { id: 8, name: "Dark Chocolate Bar", price: 2.49, imageAlt: "wrapped dark chocolate", category: "Snacks" }
  ],
  registries: [
    { owner: "Alex & Sam", eventDate: "2027-06-15", items: ["Coffee Maker", "Bed Sheet Set"] },
    { owner: "Taylor", eventDate: "2027-09-02", items: ["Blender", "Cookware Set"] },
    { owner: "Jordan", eventDate: "2027-12-20", items: ["Stand Mixer", "Knife Set"] }
  ],
  deals: [
    { title: "20% Off Home Essentials", discount: "20%", imageAlt: "living room rug and lamp", validThrough: "2027-01-31" },
    { title: "Buy One Get One 50% Off Snacks", discount: "BOGO 50%", imageAlt: "assorted snack packs", validThrough: "2027-01-31" },
    { title: "$5 Off $25 Purchase", discount: "$5 off", imageAlt: "shopping cart with groceries", validThrough: "2027-01-31" },
    { title: "Free Shipping on Orders $35+", discount: "Free ship", imageAlt: "delivery box", validThrough: "2027-01-31" },
    { title: "Clearance: Up to 70% Off", discount: "Up to 70%", imageAlt: "clearance rack clothing", validThrough: "2027-01-31" }
  ],
  stores: [
    { name: "Target Downtown", address: "123 Main St, Anytown, USA", distance: "0.6 mi", hours: "8am–10pm" },
    { name: "Target Westside", address: "456 Oak Ave, Anytown, USA", distance: "2.3 mi", hours: "8am–10pm" },
    { name: "Target Eastside", address: "789 Pine Rd, Anytown, USA", distance: "3.1 mi", hours: "8am–10pm" },
    { name: "Target North", address: "321 Elm Blvd, Anytown, USA", distance: "4.0 mi", hours: "8am–10pm" }
  ],
  benefits: [
    { title: "Earn 1% Back", description: "Earn Target Circle earnings on every purchase.", iconAlt: "percent symbol" },
    { title: "Birthday Reward", description: "Get a special treat on your birthday.", iconAlt: "birthday cake" },
    { title: "Early Access Sales", description: "Shop sales before they open to the public.", iconAlt: "clock" }
  ]
};

/* Utility: render product cards */
function renderProductCards(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.component = 'product-card';
    card.innerHTML = `
      <img src="assets/placeholder.svg" alt="${p.imageAlt}" loading="lazy">
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-price">$${p.price.toFixed(2)}</p>
        <p class="visually-hidden">Category: ${p.category}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

/* Filtering logic for shop-all-categories and top-deals */
function applyFilters(products, filters) {
  return products.filter(p => {
    if (filters.category && filters.category !== 'all' && p.category !== filters.category) return false;
    if (filters.maxPrice !== '' && p.price > parseFloat(filters.maxPrice)) return false;
    return true;
  });
}

/* Sorting logic */
function sortProducts(products, sortBy) {
  const sorted = [...products];
  if (sortBy === 'price-asc') sorted.sort((a,b)=>a.price-b.price);
  else if (sortBy === 'price-desc') sorted.sort((a,b)=>b.price-a.price);
  else if (sortBy === 'name-asc') sorted.sort((a,b)=>a.name.localeCompare(b.name));
  else if (sortBy === 'name-desc') sorted.sort((a,b)=>b.name.localeCompare(a.name));
  return sorted;
}

/* Initialize interactive components on pages that need them */
document.addEventListener('DOMContentLoaded', () => {
  // Shop All Categories page
  const shopAllContainer = document.getElementById('product-grid');
  if (shopAllContainer) {
    let currentProducts = [...sampleData.products];
    let filters = { category: 'all', maxPrice: '' };
    let sortBy = 'name-asc';

    function refresh() {
      let filtered = applyFilters(sampleData.products, filters);
      let sorted = sortProducts(filtered, sortBy);
      renderProductCards('product-grid', sorted);
    }

    // Category filter
    const catSelect = document.getElementById('filter-category');
    if (catSelect) {
      catSelect.addEventListener('change', e => {
        filters.category = e.target.value;
        refresh();
      });
    }
    // Price max filter
    const priceInput = document.getElementById('filter-max-price');
    if (priceInput) {
      priceInput.addEventListener('input', e => {
        filters.maxPrice = e.target.value;
        refresh();
      });
    }
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        sortBy = e.target.value;
        refresh();
      });
    }
    // Reset button
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        filters = { category: 'all', maxPrice: '' };
        sortBy = 'name-asc';
        if (catSelect) catSelect.value = 'all';
        if (priceInput) priceInput.value = '';
        if (sortSelect) sortSelect.value = 'name-asc';
        refresh();
      });
    }

    refresh();
  }

  // Top Deals page – similar but using deals data
  const dealsContainer = document.getElementById('deals-grid');
  if (dealsContainer) {
    renderProductCards('deals-grid', sampleData.deals.map(d => ({
      name: d.title,
      price: 0, // placeholder
      imageAlt: d.imageAlt,
      category: 'Deal'
    })));
  }

  // Gift Registry page – simple list
  const registryList = document.getElementById('registry-list');
  if (registryList) {
    sampleData.registries.forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${r.owner}</strong> – ${r.eventDate}<br>Items: ${r.items.join(', ')}`;
      registryList.appendChild(li);
    });
  }

  // Weekly Ad page – show deals as cards
  const weeklyAdContainer = document.getElementById('weekly-ad-grid');
  if (weeklyAdContainer) {
    renderProductCards('weekly-ad-grid', sampleData.deals.map(d => ({
      name: d.title,
      price: 0,
      imageAlt: d.imageAlt,
      category: 'Ad'
    })));
  }

  // Store Locator page – list
  const storeList = document.getElementById('store-list');
  if (storeList) {
    sampleData.stores.forEach(s => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${s.name}</strong><br>${s.address}<br>${s.distance} away<br>Hours: ${s.hours}`;
      storeList.appendChild(li);
    });
  }

  // Target Circle page – benefits list
  const benefitsList = document.getElementById('benefits-list');
  if (benefitsList) {
    sampleData.benefits.forEach(b => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${b.title}</strong>: ${b.description}`;
      benefitsList.appendChild(li);
    });
  }
});
