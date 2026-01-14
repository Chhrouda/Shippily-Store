// ================= CONFIG =================
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://backend.onrender.com";

// ================= GLOBAL CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= HELPERS =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  if (cartCount) cartCount.textContent = getCartCount();
  if (floatingCount) floatingCount.textContent = getCartCount();
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {
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
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          $${item.price.toFixed(2)} × ${item.quantity}
        </div>
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.splice(btn.dataset.index, 1);
        saveCart();
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

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart })
      });

      const data = await res.json();
      if (!data.url) throw new Error("Stripe failed");

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  });
}

// ===== LOAD PRODUCTS FROM BACKEND =====
  if (document.getElementById("products-list")) {
    loadProducts();
  }
});

// ================= ADD TO CART =================
document.addEventListener("click", e => {
  if (!e.target.classList.contains("addToCart")) return;

  const product = e.target.closest(".product");
  if (!product) return;

  const name = product.dataset.name;
  const price = Number(product.dataset.price);

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartUI();
});

// ================= API PRODUCTS =================
async function loadProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "<p>Loading products...</p>";

  let products = [];

  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error();
    products = await res.json();
  } catch (err) {
    console.warn("Backend not available");
  }

  if (!products.length) {
    list.innerHTML = "<p>No products available.</p>";
    return;
  }

  list.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image || 'https://picsum.photos/300'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>
        Add to Cart
      </button>
    </div>
  `).join("");
}






