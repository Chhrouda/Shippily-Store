/* =========================
   CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   HELPERS
========================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  if (navCount) navCount.textContent = count;
  if (floatingCount) floatingCount.textContent = count;
}

/* =========================
   ADD TO CART LOGIC
========================= */

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
}

/* =========================
   BIND BUTTONS
========================= */

function bindAddToCartButtons() {
  const buttons = document.querySelectorAll(".addToCart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");

      const name = product.dataset.name;
      const price = Number(product.dataset.price);

      addToCart(name, price);
    });
  });
}

/* =========================
   CART PAGE (OPTIONAL SAFE)
========================= */

function updateCartPage() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container || !totalEl) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.textContent = `${item.name} x${item.quantity} — ${item.price * item.quantity} TND`;
    container.appendChild(div);
  });

  totalEl.textContent = total + " TND";
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  bindAddToCartButtons();
  updateCartPage();
});
function checkoutCOD() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🛒 Nouvelle commande:%0A%0A";

  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity} TND%0A`;
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;

  const phone = "21620342004"; // 🔴 CHANGE THIS
  const url = `https://wa.me/${phone}?text=${message}`;

  cart = [];
  saveCart();
  updateCartCount();
  updateCartPage();

  window.open(url, "_blank");
}
function sendContactWhatsApp(e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  const text =
    `📩 Nouveau message contact:%0A%0A` +
    `👤 Name: ${name}%0A` +
    `📧 Email: ${email}%0A` +
    `💬 Message:%0A${message}`;

  const phone = "216XXXXXXXX"; // SAME NUMBER
  const url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
}







