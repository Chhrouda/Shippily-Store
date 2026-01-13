// ================= CONFIG =================
const API_URL = "/api";
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
    checkoutForm.addEventListener("submit", async e => {
      e.preventDefault();
      if (cart.length === 0) return alert("Your cart is empty.");

      const total = cart.reduce((sum, item) => sum + item.price, 0);

      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, total })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Order failed");

        alert("Order placed successfully 🎉");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        renderCart();
        checkoutForm.reset();
      } catch (err) {
        console.error(err);
        alert("Failed to place order.");
      }
    });
  }

  // ===== LOAD PRODUCTS FROM BACKEND =====
  if (document.getElementById("products-list")) {
    loadProducts();
  }
});

// ================= ADD TO CART (EVENT DELEGATION) =================
document.addEventListener("click", e => {
  if (!e.target.classList.contains("addToCart")) return;

  const product = e.target.closest(".product");
  if (!product) return;

  const name = product.dataset.name;
  const price = Number(product.dataset.price);

  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");
  if (cartCount) cartCount.textContent = cart.length;
  if (floatingCount) floatingCount.textContent = cart.length;

  alert(`${name} added to cart 🛒`);
});

// ================= API PRODUCTS =================
async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error("Failed to load products:", err);
    const errorEl = document.getElementById("products-error");
    if (errorEl) errorEl.textContent = "Could not load products from backend.";
  }
}

function renderProducts(items) {
  const list = document.getElementById("products-list");
  if (!list) return;

  // Map DB products dynamically
  list.innerHTML = items.map(p => `
    <div class="product" data-name="${p.name}" data-price="${p.price}">
      <img src="${p.image || `https://picsum.photos/300?random=${p._id}`}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button class="addToCart">Add to Cart</button>
    </div>
  `).join("");
}




