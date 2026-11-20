/* Sample datasets – inline demo data (ES5 compatible) */
var datasets = {
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
var cart = [];

/* Utility: render a product card (ES5) */
function createProductCard(product) {
  var card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-component", "product-card");
  var html = '';
  html += '<img src="' + product.img + '" alt="' + product.name + '" />';
  html += '<h2>' + product.name + '</h2>';
  html += '<div class="price">' + product.price + '</div>';
  html += '<button type="button" class="add-to-cart">Add to cart</button>';
  card.innerHTML = html;
  var btn = card.querySelector(".add-to-cart");
  btn.addEventListener("click", function () {
    cart.push(product);
    alert(product.name + " added to cart (demo).");
  });
  return card;
}

/* Render collection grid based on body data-page attribute */
function renderCollection() {
  var pageKey = document.body.getAttribute("data-page");
  var container = document.getElementById("collection-grid");
  if (!container || !datasets[pageKey]) {
    return;
  }
  container.innerHTML = "";
  var filtered = applyFilters(datasets[pageKey]);
  for (var i = 0; i < filtered.length; i++) {
    container.appendChild(createProductCard(filtered[i]));
  }
}

/* Apply filter & search – simple name contains */
function applyFilters(products) {
  var searchInput = document.getElementById("search-input");
  var query = "";
  if (searchInput) {
    query = searchInput.value.trim().toLowerCase();
  }
  if (!query) {
    return products;
  }
  var result = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().indexOf(query) !== -1) {
      result.push(products[i]);
    }
  }
  return result;
}

/* Search box listener – works on any page with #search-input */
function initSearch() {
  var searchInput = document.getElementById("search-input");
  if (!searchInput) {
    return;
  }
  searchInput.addEventListener("input", function () {
    if (document.getElementById("collection-grid")) {
      renderCollection();
    }
  });
}

/* Redeem form demo validation */
function initRedeemForm() {
  var form = document.querySelector(".redeem-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var code = form.elements["gift-code"].value.trim();
    var email = form.elements["email"].value.trim();
    var errors = [];
    if (!code) {
      errors.push("Gift code required.");
    }
    if (!email || email.indexOf("@") === -1) {
      errors.push("Valid email required.");
    }
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    var valid = datasets["gift-codes"].indexOf(code) !== -1;
    if (valid) {
      alert("Gift code redeemed successfully (demo).");
    } else {
      alert("Invalid gift code (demo).");
    }
  });
}

/* Init on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", function () {
  renderCollection();
  initSearch();
  initRedeemForm();
});
