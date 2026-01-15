let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
   HELPERS
===================== */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount, #floatingCount").forEach(el => {
    if (el) el.textContent = count;
  });
}

/* =====================
   ADD / REMOVE
===================== */
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function removeOne(name) {
  const item = cart.find(p => p.name === name);
  if (!item) return;

  item.quantity -= 1;
  if (item.quantity <= 0) {
    cart = cart.filter(p => p.name !== name);
  }

  saveCart();
  renderCart();
  updateCartCount();
}

/* =====================
   RENDER CART
===================== */
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <strong>${item.name} x${item.quantity}</strong>
      <span>${item.price * item.quantity} TND</span>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeOne(item.name);
    });

    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

/* =====================
   WHATSAPP COD
===================== */
function checkoutCOD() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🛒 Nouvelle commande:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    message += `• ${item.name} x${item.quantity} = ${lineTotal} TND%0A`;
    total += lineTotal;
  });

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;

  const phone = "21620342004"; // ❗ ONLY numbers
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      addToCart(
        product.dataset.name,
        Number(product.dataset.price)
      );
    });
  });

  const codBtn = document.getElementById("codBtn");
  if (codBtn) {
    codBtn.addEventListener("click", checkoutCOD);
  }
});
function sendContactWhatsApp(e) {
  e.preventDefault();

  const form = e.target;

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  const phone = "21620342004"; // ⚠️ REPLACE WITH YOUR NUMBER (NO +, NO SPACES)

  const text =
    `📩 New Contact Message\n\n` +
    `👤 Name: ${name}\n` +
    `📧 Email: ${email}\n` +
    `💬 Message:\n${message}`;

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(text);

  window.open(url, "_blank");

  form.reset();
}














