document.addEventListener("DOMContentLoaded", () => {

  // ===== LOAD CART =====
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cartCount");
  const floatingCount = document.getElementById("floatingCount");

  function updateCartUI() {
    if (cartCount) cartCount.textContent = cart.length;
    if (floatingCount) floatingCount.textContent = cart.length;
  }

  updateCartUI();

  // ===== ADD TO CART =====
  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.dataset.name;
      const price = Number(product.dataset.price);

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartUI();
      alert(name + " added to cart");
    });
  });

  // ===== CART PAGE =====
  const cartContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartContainer && cartTotal) renderCart();

  function renderCart() {
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
          <strong>${item.name}</strong><br>$${item.price}
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

});
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













