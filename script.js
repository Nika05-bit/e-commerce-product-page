
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const cartDropdown = document.querySelector(".cart-dropdown");
  const cartItemsContainer = document.querySelector(".cart-items");
  const checkoutBtn = document.querySelector(".checkout");

  const addToCartBtn = document.querySelector(".add-to-cart");
  const qtyMinus = document.querySelector(".quantity .minus");
  const qtyPlus = document.querySelector(".quantity .plus");
  const qtyCount = document.querySelector(".quantity .count");

  let quantity = 0;
  let cart = [];

  // Increase quantity
  qtyPlus?.addEventListener("click", () => {
    quantity++;
    qtyCount.textContent = quantity;
  });

  // Decrease quantity
  qtyMinus?.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      qtyCount.textContent = quantity;
    }
  });

  // Add to cart
  addToCartBtn?.addEventListener("click", () => {
    if (quantity > 0) {
      cart = [
        {
          id: 1,
          name: "Fall Limited Edition Sneakers",
          price: 125.0,
          quantity: quantity,
          img: "./images/image-product-1-thumbnail.jpg",
        },
      ];
      updateCartUI();
    }
  });

  // Toggle cart dropdown
  cartIcon?.addEventListener("click", () => {
    cartDropdown.classList.toggle("show");
  });

  // Update Cart UI
  function updateCartUI() {
    cartItemsContainer.innerHTML = ""; // Clear old content

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="empty">Your cart is empty.</p>`;
      cartCount.hidden = true;
      checkoutBtn.classList.add("hidden");
      return;
    }

    cart.forEach((item) => {
      const total = (item.price * item.quantity).toFixed(2);

      const itemHTML = `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)} x ${item.quantity} <strong>$${total}</strong></p>
          </div>
          <img src="./images/icon-delete.svg" alt="Delete" class="delete-btn" data-id="${item.id}">
        </div>
      `;
      cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Update badge
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
    cartCount.hidden = false;

    // Show checkout
    checkoutBtn.classList.remove("hidden");

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        cart = cart.filter((item) => item.id !== id);
        updateCartUI();
      });
    });
  }
});
// Lightbox Elements
const lightbox = document.querySelector('.lightbox');
const lightboxMainImg = document.querySelector('.lightbox-main-img');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnails img');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const mainProductImg = document.querySelector('.main-img'); // already on page

let currentIndex = 0;

// Open lightbox when main image clicked
mainProductImg.addEventListener('click', () => {
  lightbox.classList.remove('hidden');
  lightboxMainImg.src = lightboxThumbnails[currentIndex].dataset.full;
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

// Thumbnail click
lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox();
  });
});

// Prev/Next navigation
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + lightboxThumbnails.length) % lightboxThumbnails.length;
  updateLightbox();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % lightboxThumbnails.length;
  updateLightbox();
});

// Update displayed image + active thumbnail
function updateLightbox() {
  lightboxMainImg.src = lightboxThumbnails[currentIndex].dataset.full;
  lightboxThumbnails.forEach(t => t.classList.remove('active'));
  lightboxThumbnails[currentIndex].classList.add('active');
}
// Page thumbnails (outside lightbox)
const pageThumbnails = document.querySelectorAll('.thumbnail');

pageThumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    // Update main product image
    mainProductImg.src = thumb.src.replace('-thumbnail', ''); // swap with full image

    // Update active state on thumbnails
    pageThumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    // Sync with lightbox index
    currentIndex = index;
    updateLightbox();
  });
});
const menuIcon = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");

// Open menu
menuIcon.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});

// Close menu
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

// Mobile Image Slider
const mobilePrev = document.querySelector('.mobile-prev');
const mobileNext = document.querySelector('.mobile-next');
const mainImg = document.querySelector('.main-img');

const productImages = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

let mobileIndex = 0;

function updateMobileImage() {
  mainImg.src = productImages[mobileIndex];
}

mobilePrev.addEventListener('click', () => {
  mobileIndex = (mobileIndex - 1 + productImages.length) % productImages.length;
  updateMobileImage();
});

mobileNext.addEventListener('click', () => {
  mobileIndex = (mobileIndex + 1) % productImages.length;
  updateMobileImage();
});
