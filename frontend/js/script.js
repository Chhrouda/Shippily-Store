/* =========================
   CART STATE
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   SAVE / LOAD
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   UPDATE COUNTS
========================= */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  if (cartCount) cartCount.textContent = count;
  if (floatingCount) floatingCount.textContent = count;
}

/* =========================
   ADD TO CART
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
   PRODUCTS PAGE BINDING
========================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.dataset.name;
      const price = Number(product.dataset.price);

      addToCart(name, price);
    });
  });

  updateCartCount();
  updateCartPage();
});

/* =========================
   RENDER CART PAGE (FIX)
========================= */
function updateCartPage() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p style="color:#555; padding:1rem 0;">
        Your cart is empty.
      </p>
    `;
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <strong>${item.name}</strong>
      <span>x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

/* =========================
   REMOVE ITEM
========================= */
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  updateCartPage();
}

/* =========================
   WHATSAPP CHECKOUT (COD)
========================= */
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
  message += `%0A💰 Total: ${total} TND%0A`;
  message += `%0A📍 Paiement à la livraison`;

  const phone = "216XXXXXXXX"; // ⚠️ YOUR NUMBER
  const url = `https://wa.me/${phone}?text=${message}`;

  cart = [];
  saveCart();
  updateCartCount();
  updateCartPage();

  window.open(url, "_blank");
}

/* =========================
   CONTACT → WHATSAPP
========================= */
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

  const phone = "21620342004"; // SAME NUMBER
  const url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
}








