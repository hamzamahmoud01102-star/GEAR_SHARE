const products = [
  { id: 1, name: "Sony 24-70mm f/2.8 GM II", price: 89, image: "images/Sony FE 16-35mm f_2.8 GM II.JPG" },
  { id: 2, name: "Canon RF 50mm f/1.2 L", price: 65, image: "images/0207028010-1.jpg" },
  { id: 3, name: "DJI Ronin RS 3 Pro Gimbal", price: 45, image: "images/OIP.webp" },
  { id: 4, name: "Sony A7 IV Camera Body", price: 120, image: "images/DSC_0002_102d2410-027a-4899-8159-5eceff80a42e_2000x2000.webp" },
  { id: 5, name: "Godox AD600Pro Flash", price: 35, image: "images/71knDebk-XL.jpg" },
  { id: 6, name: "DJI Mini 4 Pro Drone", price: 95, image: "images/DJI_Mini_4_Pro_1.jpg" }
];

let cart = [];

function saveCartToStorage() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = sessionStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function renderProducts() {
  const container = document.getElementById('products-container');
  let html = '';
 
  products.forEach(product => {
    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card product-card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="product-name">${product.name}</h5>
            <p class="text-success fw-bold fs-4">$${product.price}/day</p>
            <button onclick="addToCart(${product.id})" class="btn1">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`${product.name} added to cart`);
}

function updateCartUI() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('offcanvas-count').textContent = count;
  renderOffcanvasCart();
}

function renderOffcanvasCart() {
  const container = document.getElementById('offcanvas-cart-body');
  let html = '';
  let total = 0;

  if (cart.length === 0) {
    html = `<p class="text-center text-muted py-5">Your cart is empty</p>`;
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      html += `
        <div class="d-flex mb-4 align-items-center">
          <img src="${item.image}" class="me-3 cart-img">
          <div class="flex-grow-1">
            <h6 class="mb-1 item-name">${item.name}</h6>
            <small>$${item.price}/day × ${item.quantity}</small>
            <div class="mt-2">
              <button onclick="changeQuantity(${index}, -1)" class="btn btn-sm btn-outline-secondary">-</button>
              <span class="mx-3 fw-bold">${item.quantity}</span>
              <button onclick="changeQuantity(${index}, 1)" class="btn btn-sm btn-outline-secondary">+</button>
              <button onclick="removeItem(${index})" class="btn btn-sm btn-danger float-end">Remove</button>
            </div>
          </div>
          <div class="text-end fw-bold">$${itemTotal}</div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
  document.getElementById('offcanvas-total').textContent = `$${total}`;
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  
  saveCartToStorage();
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#28a745; color:white; padding:15px 20px; border-radius:8px; z-index:9999; box-shadow:0 4px 15px rgba(0,0,0,0.2);';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
 
  saveCartToStorage(); 
  window.location.href = "checkout.html";
}

window.onload = () => {
  loadCartFromStorage();  
  renderProducts();
  updateCartUI();
};