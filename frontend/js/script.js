/* =====================
   CART STATE
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const API_URL = "https://your-backend.onrender.com";

/* =====================
   TRANSLATIONS
===================== */
const translations = {
  en: {
    home: "Home",
    products: "Products",
    cart: "Cart",
    contact: "Contact",

    home_title: "Best Tunisian E-commerce Store",
    home_sub: "Premium products built for trust, quality, and scale.",
    explore: "Explore Products",

    cart_title: "Your Cart",
    contact_title: "Contact Us",
    remove: "Remove",
    pay_cod: "Pay on Delivery"
  },

  fr: {
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    contact: "Contact",

    home_title: "La meilleure boutique e-commerce tunisienne",
    home_sub: "Produits premium basés sur la confiance et la qualité.",
    explore: "Voir les produits",

    cart_title: "Votre panier",
    contact_title: "Contactez-nous",
    remove: "Supprimer",
    pay_cod: "Paiement à la livraison"
  },

  tn: {
    home: "الرئيسية",
    products: "البرودوي",
    cart: "السلة",
    contact: "إتصل بينا",

    home_title: "أحسن متجر تونسي أونلاين",
    home_sub: "منتوجات مضمونة، جودة وثقة.",
    explore: "شوف البرودوي",

    cart_title: "السلة متاعك",
    contact_title: "إتصل بينا",
    remove: "نحّي",
    pay_cod: "خلاص عند التسليم"
  }
};

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
   ADD / REMOVE CART
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

  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <strong>${item.name} x${item.quantity}</strong>
      <span>${lineTotal.toFixed(2)} TND</span>
      <button class="remove-btn">${t.remove}</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeOne(item.name);
    });

    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

/* =====================
   WHATSAPP – PAY ON DELIVERY
===================== */
function checkoutCOD() {
  if (cart.length === 0) {
    alert("Cart is empty");
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

  const phone = "21620342004"; // ONLY numbers
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}

/* =====================
   CONTACT FORM → WHATSAPP
===================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const msg = form.querySelector("textarea").value.trim();

    if (!name || !email || !msg) {
      alert("Fill all fields");
      return;
    }

    const phone = "21620342004";
    const text =
      `📩 New Message\n\n` +
      `👤 ${name}\n📧 ${email}\n\n💬 ${msg}`;

    const url =
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(text);

    window.open(url, "_blank");
    form.reset();
  });
}

/* =====================
   TRANSLATION ENGINE
===================== */
function applyTranslation() {
  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  applyTranslation();
  initContactForm();

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















