// ================= CONFIG =================
const API_BASE = ""; // same-origin (Render-safe)

// ================= GLOBAL CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= HELPERS =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const count = getCartCount();

  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  if (cartCount) cartCount.textContent = count;
  if (floatingCount) floatingCount.textContent = count;
}

// ================= CART UI LOGIC =================
function updateCartPage() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutSection = document.getElementById("checkoutSection");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    if (checkoutSection) checkoutSection.style.display = "none";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map((item, index) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <p>$${item.price} × ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  }).join("");

  cartTotal.textContent = total.toFixed(2);
  if (checkoutSection) checkoutSection.style.display = "block";
}

// ================= CART ACTIONS =================
function addToCart(name, price) {
  const existing = cart.find(p => p.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  updateCartPage();
}

// ================= PRODUCTS PAGE =================
async function loadProducts() {
  const list = document.getElementById("productList");
  if (!list) return;

  try {
    const res = await fetch(`${API_BASE}/api/products`);
    const items = await res.json();

    list.innerHTML = items.map(p => `
      <div class="product">
        <img src="${p.image || `https://picsum.photos/300?random=${p._id}`}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">
          Add to Cart
        </button>
      </div>
    `).join("");
  } catch (err) {
    list.innerHTML = "<p>Failed to load products.</p>";
  }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateCartPage();
  loadProducts();
});






