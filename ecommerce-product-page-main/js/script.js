// 1. පින්තූර මාරු කිරීමේ ක්‍රියාවලිය
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    document.querySelector('.thumb.active').classList.remove('active');
    thumb.classList.add('active');
    mainImage.src = `images/image-product-${index + 1}.jpg`;
  });
});

// 2. භාණ්ඩ ප්‍රමාණය (Quantity) වෙනස් කිරීමේ ක්‍රියාවලිය
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

// 3. Mobile මෙනුව Open/Close කිරීම
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 4. Cart ක්‍රියාවලිය (Add to Cart, Delete, & Toggle)
const cartIconBtn = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartBadge = document.querySelector('.cart-badge');
const addToCartMainBtn = document.querySelector('.add-to-cart-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyMsg = document.querySelector('.empty-msg');
const checkoutBtn = document.querySelector('.checkout-btn');

// Cart එක Open/Close වීම
cartIconBtn.addEventListener('click', () => {
  if (cartDropdown.style.display === 'none' || cartDropdown.style.display === '') {
    cartDropdown.style.display = 'block';
  } else {
    cartDropdown.style.display = 'none';
  }
});

// "Add to cart" බොත්තම එබූ විට
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

// Delete අයිකන් එක එබූ විට භාණ්ඩය Cart එකෙන් ඉවත් කිරීම (Event Delegation ක්‍රමය)
cartItemsContainer.addEventListener('click', (event) => {
  // Click කළේ delete-btn එක නම් පමණක් ක්‍රියාත්මක වීම
  if (event.target.classList.contains('delete-btn')) {
    cartItemsContainer.innerHTML = '';
    emptyMsg.style.display = 'block';
    checkoutBtn.style.display = 'none';
    cartBadge.style.display = 'none';
    quantity = 0; 
    quantityDisplay.textContent = quantity;
  }
});