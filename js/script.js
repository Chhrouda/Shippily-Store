// js/script.js

// ================= CONFIG =================
// 🔁 CHANGE THIS when deploying to Render
const API_BASE = "http://localhost:5000";
// Example for production:
// const API_BASE = "https://shippily-store.onrender.com";

// ================= GLOBAL CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  function updateCartUI() {
    if (cartCount) cartCount.textContent = cart.length;
    if (floatingCount) floatingCount.textContent = cart.length;
  }

  updateCartUI();

  // ===== ADD TO CART (STATIC PRODUCTS) =====
  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      if (!product) return;

      const name = product.dataset.name;
      const price = Number(product.dataset.price);

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartUI();
      alert(name + " added to cart 🛒");
    });
  });

  // ===== CART PAGE =====
  const cartContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  function renderCart() {
    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0.00";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>$${item.price.toFixed(2)}
        </div>
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.splice(btn.dataset.index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        renderCart();
      });
    });
  }

  renderCart();

  // ===== CHECKOUT =====
  const checkoutForm = document.getElementById("checkoutForm");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      alert("Order placed successfully! 🎉");

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      renderCart();
      checkoutForm.reset();
    });
  }

  // ===== PRODUCTS PAGE (FROM BACKEND) =====
  if (document.getElementById("products-list")) {
    loadProducts();
  }
});

// ================= API PRODUCTS =================
async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      headers: { Accept: "application/json" }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} — ${text}`);
    }

    const products = await res.json();
    renderProducts(products);

  } catch (err) {
    console.error("Failed to load products:", err);
    const errorEl = document.getElementById("products-error");
    if (errorEl) errorEl.textContent = "Could not load products.";
  }
}

function renderProducts(items) {
  const list = document.getElementById("products-list");
  if (!list) return;

  list.innerHTML = items.map(p => `
    <li class="product">
      <div class="name">${p.name}</div>
      <div class="price">$${(p.price?.toFixed?.(2) ?? p.price)}</div>
      <button class="addToCart"
        data-name="${p.name}"
        data-price="${p.price}">
        Add to cart
      </button>
    </li>
  `).join("");
}
