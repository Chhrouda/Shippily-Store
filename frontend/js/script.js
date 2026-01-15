/* =========================
   CART STATE
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   SAVE
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   COUNTS
========================= */
function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  const c1 = document.getElementById("cartCount");
  const c2 = document.getElementById("floatingCount");

  if (c1) c1.textContent = count;
  if (c2) c2.textContent = count;
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
  const found = cart.find(p => p.name === name);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartCount();
}

/* =========================
   REMOVE ONE ITEM (REAL FIX)
========================= */
function removeOne(index) {
  if (!cart[index]) return;

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  renderCart();
}

/* =========================
   RENDER CART
========================= */
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="color:#555;">Your cart is empty.</p>`;
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.dataset.index = index;

    div.innerHTML = `
      <strong>${item.name}</strong>
      <span>x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn">Remove</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

/* =========================
   PAY ON DELIVERY
========================= */
window.checkoutCOD = function () {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🛒 New Order:%0A%0A";

  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity}$%0A`;
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  message += `%0A💰 Total: ${total}$`;
  message += `%0A📦 Payment: Cash on Delivery`;

  const phone = "21620342004"; // REAL NUMBER
  const url = `https://wa.me/${phone}?text=${message}`;

  cart = [];
  saveCart();
  updateCartCount();
  updateCartPage();

  window.open(url, "_blank");
};


/* =========================
   EVENTS (THE KEY PART)
========================= */
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.closest(".cart-item").dataset.index;
    removeOne(Number(index));
  }

  if (e.target.classList.contains("addToCart")) {
    const product = e.target.closest(".product");
    addToCart(
      product.dataset.name,
      Number(product.dataset.price)
    );
  }
});

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  const form = document.getElementById("checkoutForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Card payment coming soon.");
    });
  }
});
// ===============================
// PAY ON DELIVERY (WHATSAPP)
// CSP-SAFE VERSION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const codBtn = document.getElementById("codBtn");

  if (!codBtn) return;

  codBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    let message = "🛒 New Order:%0A%0A";

    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity}$%0A`;
    });

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    message += `%0A💰 Total: ${total}$`;
    message += `%0A📦 Payment: Cash on Delivery`;

    const phone = "216XXXXXXXX"; // ← YOUR NUMBER
    const url = `https://wa.me/${phone}?text=${message}`;

    localStorage.removeItem("cart");

    window.open(url, "_blank");
  });
});












