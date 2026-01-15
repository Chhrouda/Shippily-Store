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
  const item = cart.find(p => p.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartCount();
}

/* =========================
   REMOVE ONE ITEM (FIXED)
========================= */
function removeFromCart(index) {
  if (!cart[index]) return;

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  updateCartPage();
}

/* 🔴 MAKE IT GLOBAL (IMPORTANT FIX) */
window.removeFromCart = removeFromCart;

/* =========================
   RENDER CART PAGE
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
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <strong>${item.name}</strong>
      <span>x${item.quantity}</span>
      <span>$${itemTotal.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

/* =========================
   PAY ON DELIVERY (WORKING)
========================= */
function checkoutCOD() {
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

  const phone = "21620342004"; // ← your WhatsApp number
  const url = `https://wa.me/${phone}?text=${message}`;

  cart = [];
  saveCart();
  updateCartCount();
  updateCartPage();

  window.open(url, "_blank");
}

/* 🔴 MAKE IT GLOBAL */
window.checkoutCOD = checkoutCOD;

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      addToCart(
        product.dataset.name,
        Number(product.dataset.price)
      );
    });
  });

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      checkoutCOD();
    });
  }

  updateCartCount();
  updateCartPage();
});










