/* Sample datasets – inline demo data */
const datasets = {
  "womens-all": [
    { id: 1, name: "Silk Blouse", price: "$120", img: "assets/product1.svg" },
    { id: 2, name: "Denim Jeans", price: "$80", img: "assets/product2.svg" },
    { id: 3, name: "Leather Jacket", price: "$250", img: "assets/product3.svg" },
    { id: 4, name: "Cotton T‑Shirt", price: "$35", img: "assets/product4.svg" },
    { id: 5, name: "Wool Coat", price: "$300", img: "assets/product5.svg" },
    { id: 6, name: "Linen Shorts", price: "$45", img: "assets/product6.svg" }
  ],
  "womens-pants-trousers": [
    { id: 101, name: "Straight‑Leg Trousers", price: "$110", img: "assets/product7.svg" },
    { id: 102, name: "High‑Waist Chinos", price: "$95", img: "assets/product8.svg" },
    { id: 103, name: "Wide‑Leg Pants", price: "$130", img: "assets/product9.svg" },
    { id: 104, name: "Cropped Culottes", price: "$85", img: "assets/product10.svg" }
  ],
  "womens-sweaters-cashmere": [
    { id: 201, name: "Cashmere Crewneck", price: "$180", img: "assets/product11.svg" },
    { id: 202, name: "Cashmere V‑Neck", price: "$190", img: "assets/product12.svg" },
    { id: 203, name: "Cashmere Cardigan", price: "$210", img: "assets/product13.svg" },
    { id: 204, name: "Cashmere Turtleneck", price: "$200", img: "assets/product14.svg" },
    { id: 205, name: "Cashmere Sweater Dress", price: "$220", img: "assets/product15.svg" }
  ],
  "gift-codes": ["GIFT123", "GIFT456", "GIFT789"]
};

/* Simple cart – client‑side only */
let cart = [];

/* Utility: render a product card */
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-component", "product-card");
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}" />
    <h2>${product.name}</h2>
    <div class="price">${product.price}</div>
    <button type="button" class="add-to-cart">Add to cart</button>
  `;
  const btn = card.querySelector(".add-to-cart");
  btn.addEventListener("click", () => {
    cart.push(product);
    alert(\`\${product.name} added to cart (demo).\`);
  });
  return card;
}

/* Render collection grid based on page data-page attribute */
function renderCollection() {
  const pageKey = document.body.dataset.page;
  const container = document.getElementById("collection-grid");
  if (!container || !datasets[pageKey]) return;
  container.innerHTML = "";
  const filtered = applyFilters(datasets[pageKey]);
  filtered.forEach(p => container.appendChild(createProductCard(p)));
}

/* Apply filter & search – simple name contains */
function applyFilters(products) {
  const searchInput = document.getElementById("search-input");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (!query) return products;
  return products.filter(p => p.name.toLowerCase().includes(query));
}

/* Search box listener – works on any page with #search-input */
function initSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  searchInput.addEventListener("input", () => {
    // Re‑render current collection if present
    if (document.getElementById("collection-grid")) {
      renderCollection();
    }
  });
}

/* Redeem form demo validation */
function initRedeemForm() {
  const form = document.querySelector(".redeem-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const code = form.elements["gift-code"].value.trim();
    const email = form.elements["email"].value.trim();
    const errors = [];
    if (!code) errors.push("Gift code required.");
    if (!email || !email.includes("@")) errors.push("Valid email required.");
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    const valid = datasets["gift-codes"].includes(code);
    if (valid) {
      alert("Gift code redeemed successfully (demo).");
    } else {
      alert("Invalid gift code (demo).");
    }
  });
}

/* Init on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
  renderCollection();
  initSearch();
  initRedeemForm();
});
