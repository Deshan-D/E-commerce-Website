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

// Plus (+) 
plusBtn.addEventListener('click', () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

// Minus (-)
minusBtn.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// Mobile menu Open/Close
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});