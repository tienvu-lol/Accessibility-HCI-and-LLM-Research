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

    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        navToggle.click();
      }
    });
  }

  // Product Data (Inline)
  const products = [
    { id: 1, name: 'Summit Jacket', category: 'womens', price: 150, image: 'assets/img/placeholder.svg' },
    { id: 2, name: 'Trail Pants', category: 'mens', price: 80, image: 'assets/img/placeholder.svg' },
    { id: 3, name: 'Kids Fleece', category: 'kids', price: 40, image: 'assets/img/placeholder.svg' },
    { id: 4, name: 'Camp Chair', category: 'gear', price: 60, image: 'assets/img/placeholder.svg' },
    { id: 5, name: 'Rain Shell', category: 'womens', price: 120, image: 'assets/img/placeholder.svg' },
    { id: 6, name: 'Hiking Boots', category: 'mens', price: 180, image: 'assets/img/placeholder.svg' }
  ];

  // Render Products
  const productGrid = document.querySelector('.product-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (productGrid) {
    // Determine category from data attribute on body
    const currentCategory = document.body.dataset.category || 'all';
    
    let filteredProducts = products;
    if (currentCategory !== 'all') {
      filteredProducts = products.filter(p => p.category === currentCategory);
    }

    function renderItems(items) {
      productGrid.innerHTML = '';
      items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(card);
      });
    }

    renderItems(filteredProducts);

    // Filter logic
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        let items = products;
        if (filter !== 'all') {
          items = products.filter(p => p.category === filter);
        }
        renderItems(items);
      });
    });

    // Add to Cart Simulation
    productGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const id = e.target.dataset.id;
        const product = products.find(p => p.id === id);
        alert(`Added ${product.name} to cart (simulation).`);
      }
    });
  }
});
