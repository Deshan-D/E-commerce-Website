
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    document.querySelector('.thumb.active').classList.remove('active');
    thumb.classList.add('active');
    mainImage.src = `images/image-product-${index + 1}.jpg`;
  });
});

const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const quantityDisplay = document.querySelector('.quantity');

let quantity = 0;

plusBtn.addEventListener('click', () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

minusBtn.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});


const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const cartIconBtn = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartBadge = document.querySelector('.cart-badge');
const addToCartMainBtn = document.querySelector('.add-to-cart-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyMsg = document.querySelector('.empty-msg');
const checkoutBtn = document.querySelector('.checkout-btn');

cartIconBtn.addEventListener('click', () => {
  if (cartDropdown.style.display === 'none' || cartDropdown.style.display === '') {
    cartDropdown.style.display = 'block';
  } else {
    cartDropdown.style.display = 'none';
  }
});

addToCartMainBtn.addEventListener('click', () => {
  if (quantity > 0) {
    cartBadge.style.display = 'block';
    cartBadge.textContent = quantity;

    const total = 125.00 * quantity;
    cartItemsContainer.innerHTML = `
      <div class="cart-item">
        <img src="images/image-product-1-thumbnail.jpg" alt="product" class="product-img">
        <div class="cart-item-details">
          <p>Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${quantity} <b>$${total}.00</b></p>
        </div>
        <img src="images/icon-delete.svg" alt="delete" class="delete-btn">
      </div>
    `;

    emptyMsg.style.display = 'none';
    checkoutBtn.style.display = 'block';
  }
});

cartItemsContainer.addEventListener('click', (event) => {
  
  if (event.target.classList.contains('delete-btn')) {
    cartItemsContainer.innerHTML = '';
    emptyMsg.style.display = 'block';
    checkoutBtn.style.display = 'none';
    cartBadge.style.display = 'none';
    quantity = 0; 
    quantityDisplay.textContent = quantity;
  }
});


const productsList = [
  { id: 1, name: "Classic White Sneakers", category: "men", price: 110.00, image: "images/image-product-1.jpg" },
  { id: 2, name: "Urban Comfort Walk", category: "women", price: 95.00, image: "images/image-product-2.jpg" },
  { id: 3, name: "Street Style High-Tops", category: "men", price: 130.00, image: "images/image-product-3.jpg" },
  { id: 4, name: "Summer Breeze Runners", category: "women", price: 85.00, image: "images/image-product-4.jpg" },
  { id: 5, name: "Sport Pro Edition", category: "men", price: 140.00, image: "images/image-product-1.jpg" },
  { id: 6, name: "Casual Everyday Kicks", category: "women", price: 105.00, image: "images/image-product-2.jpg" }
];

const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

function displayProducts(products) {
  productGrid.innerHTML = '';
  
  if (products.length === 0) {
    productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--dark-grayish-blue);">No products found matching your criteria.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-card-info">
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-small" onclick="alert('${product.name} added to cart!')">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

displayProducts(productsList);

// Process (Men / Women / All)
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const category = btn.dataset.filter;
    const searchTerm = searchInput.value.toLowerCase();
    
    filterAndSearchProducts(category, searchTerm);
  });
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const category = document.querySelector('.filter-btn.active').dataset.filter;
  
  filterAndSearchProducts(category, searchTerm);
});

function filterAndSearchProducts(category, searchTerm) {
  let filtered = productsList;
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  }
  
  displayProducts(filtered);
}

// Avtive Navbar
const navCollections = document.getElementById('nav-collections');
const navMen = document.getElementById('nav-men');
const navWomen = document.getElementById('nav-women');

function triggerNavbarFilter(category) {
  document.querySelector('.filter-btn.active').classList.remove('active');
  document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
  
  //Filter Product
  filterAndSearchProducts(category, document.getElementById('search-input').value.toLowerCase());
}

if (navCollections) navCollections.addEventListener('click', () => triggerNavbarFilter('all'));
if (navMen) navMen.addEventListener('click', () => triggerNavbarFilter('men'));
if (navWomen) navWomen.addEventListener('click', () => triggerNavbarFilter('women'));