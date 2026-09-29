// Data & State
let cart = [];

const productsList = [
  { id: 1, name: "Classic White Sneakers", category: "men", price: 110.00, image: "images/image-product-1.jpg" },
  { id: 2, name: "Urban Comfort Walk", category: "women", price: 95.00, image: "images/image-product-2.jpg" },
  { id: 3, name: "Street Style High-Tops", category: "men", price: 130.00, image: "images/image-product-3.jpg" },
  { id: 4, name: "Summer Breeze Runners", category: "women", price: 85.00, image: "images/image-product-4.jpg" },
  { id: 5, name: "Sport Pro Edition", category: "men", price: 140.00, image: "images/image-product-1.jpg" },
  { id: 6, name: "Casual Everyday Kicks", category: "women", price: 105.00, image: "images/image-product-2.jpg" }
];

// Mobile Menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');
if (menuIcon) {
  menuIcon.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// Cart UI Logic
const cartIconBtn = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartBadge = document.querySelector('.cart-badge');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyMsg = document.querySelector('.empty-msg');
const checkoutBtn = document.querySelector('.checkout-btn');

cartIconBtn.addEventListener('click', () => {
  cartDropdown.style.display = (cartDropdown.style.display === 'none' || !cartDropdown.style.display) ? 'block' : 'none';
});

function updateCartUI() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity > 0) {
    cartBadge.style.display = 'block';
    cartBadge.textContent = totalQuantity;
    emptyMsg.style.display = 'none';
    checkoutBtn.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" style="margin-bottom: 15px;">
        <img src="${item.image}" alt="product" class="product-img" style="width: 50px; border-radius: 5px;">
        <div class="cart-item-details" style="flex: 1; margin: 0 15px;">
          <p style="margin-bottom: 5px; font-size: 0.9rem;">${item.name}</p>
          <p>$${item.price.toFixed(2)} x ${item.quantity} <b style="color: var(--very-dark-blue); margin-left: 10px;">$${(item.price * item.quantity).toFixed(2)}</b></p>
        </div>
        <img src="images/icon-delete.svg" alt="delete" class="delete-btn" onclick="removeFromCart(${item.id})" style="cursor: pointer;">
      </div>
    `).join('');
  } else {
    cartBadge.style.display = 'none';
    emptyMsg.style.display = 'block';
    checkoutBtn.style.display = 'none';
    cartItemsContainer.innerHTML = '';
  }
}

window.addToCart = function(productId) {
  const product = productsList.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  
  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = "Added ✓";
  btn.style.backgroundColor = "#4CAF50";
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.backgroundColor = "";
  }, 1000);
}

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Product Catalog Rendering
const productGrid = document.getElementById('product-grid');

function displayProducts(products) {
  productGrid.innerHTML = '';
  if (products.length === 0) {
    productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--dark-grayish-blue);">No products found.</p>';
    return;
  }

  products.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-card-info">
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-small" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

// Search & Filter
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

function filterAndSearchProducts(category, searchTerm) {
  let filtered = productsList;
  if (category !== 'all') filtered = filtered.filter(p => p.category === category);
  if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    filterAndSearchProducts(btn.dataset.filter, searchInput.value.toLowerCase());
  });
});

searchInput.addEventListener('input', (e) => {
  const category = document.querySelector('.filter-btn.active').dataset.filter;
  filterAndSearchProducts(category, e.target.value.toLowerCase());
});

// Navbar Link Filters
const navCollections = document.getElementById('nav-collections');
const navMen = document.getElementById('nav-men');
const navWomen = document.getElementById('nav-women');

function triggerNavbarFilter(category) {
  document.querySelector('.filter-btn.active').classList.remove('active');
  document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
  filterAndSearchProducts(category, searchInput.value.toLowerCase());
}

if (navCollections) navCollections.addEventListener('click', () => triggerNavbarFilter('all'));
if (navMen) navMen.addEventListener('click', () => triggerNavbarFilter('men'));
if (navWomen) navWomen.addEventListener('click', () => triggerNavbarFilter('women'));

displayProducts(productsList);