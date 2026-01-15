let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount, #floatingCount").forEach(el => {
    if (el) el.textContent = count;
  });
}

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
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeOne(item.name);
    });

    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

function checkoutCOD() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "Nouvelle commande:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity} TND%0A`;
    total += item.price * item.quantity;
  });

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;

  const phone = "21620342004"; // ❗ ONLY NUMBERS, NO +
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}

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













