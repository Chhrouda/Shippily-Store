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
function checkoutCOD() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let msg = "🛒 New Order:%0A%0A";

  cart.forEach(i => {
    msg += `• ${i.name} x${i.quantity} = ${i.price * i.quantity}$%0A`;
  });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  msg += `%0A💰 Total: ${total}$`;
  msg += `%0A📦 Cash on Delivery`;

  const phone = "21620342004"; // YOUR NUMBER
  const url = `https://wa.me/${phone}?text=${msg}`;

  cart = [];
  saveCart();
  updateCartCount();
  renderCart();

  window.open(url, "_blank");
}

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












