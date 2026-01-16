/* =====================
   CONFIG
===================== */
const API_URL = "https://shippily-store.onrender.com";

/* =====================
   CART STATE
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    products_title: "Products",
    cart_title: "Your Cart",
    checkout_title: "Checkout",
    contact_title: "Contact Us",
    remove: "Remove",
    pay_cod: "Pay on Delivery",
    empty_cart: "Your cart is empty"
  },

  fr: {
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    contact: "Contact",
    home_title: "La meilleure boutique e-commerce tunisienne",
    home_sub: "Produits premium basés sur la confiance et la qualité.",
    explore: "Voir les produits",
    products_title: "Produits",
    cart_title: "Votre panier",
    checkout_title: "Paiement",
    contact_title: "Contactez-nous",
    remove: "Supprimer",
    pay_cod: "Paiement à la livraison",
    empty_cart: "Votre panier est vide"
  },

  tn: {
    home: "الرئيسية",
    products: "البرودوي",
    cart: "السلة",
    contact: "إتصل بينا",
    home_title: "أحسن متجر تونسي أونلاين",
    home_sub: "منتوجات مضمونة، جودة وثقة.",
    explore: "شوف البرودوي",
    products_title: "البرودوي",
    cart_title: "السلة متاعك",
    checkout_title: "الخلاص",
    contact_title: "إتصل بينا",
    remove: "نحّي",
    pay_cod: "خلاص عند التسليم",
    empty_cart: "السلة فارغة"
  }
};

/* =====================
   LANGUAGE ENFORCEMENT
===================== */
(function enforceLanguage() {
  const lang = localStorage.getItem("lang");
  const isLangPage = window.location.pathname.endsWith("lang.html");

  if (!lang && !isLangPage) {
    window.location.replace("/lang.html");
  }
})();

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
   CART ACTIONS
===================== */
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  saveCart();
  updateCartCount();
}

function removeOne(name) {
  const item = cart.find(p => p.name === name);
  if (!item) return;

  item.quantity--;
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

  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p>${t.empty_cart}</p>`;
    totalEl.textContent = "0.00";
    return;
  }

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
   WHATSAPP COD
===================== */
function checkoutCOD() {
  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  if (cart.length === 0) {
    alert(t.empty_cart);
    return;
  }

  let message = "🛒 Nouvelle commande:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    message += `• ${item.name} x${item.quantity} = ${lineTotal} TND%0A`;
  });

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;

  window.open(`https://wa.me/21620342004?text=${message}`, "_blank");
}

/* =====================
   CONTACT FORM
===================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("input[type=text]").value.trim();
    const email = form.querySelector("input[type=email]").value.trim();
    const msg = form.querySelector("textarea").value.trim();

    if (!name || !email || !msg) return;

    const text = `📩 New Message\n\n👤 ${name}\n📧 ${email}\n\n💬 ${msg}`;
    window.open(
      `https://wa.me/21620342004?text=${encodeURIComponent(text)}`,
      "_blank"
    );

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
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

/* =====================
   LANGUAGE SWITCHER
===================== */
function initLanguageSwitcher() {
  const currentLang = localStorage.getItem("lang");

  document.querySelectorAll(".lang-change").forEach(btn => {
    const btnLang = btn.dataset.lang;

    if (btnLang === currentLang) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("lang", btnLang);
      location.reload();
    });
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
  applySEO();
  initLanguageSwitcher();

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
function applySEO() {
  const lang = localStorage.getItem("lang") || "en";

  const seo = {
    en: {
      title: "Shippily Store – Fast Tunisian E-commerce",
      desc: "Fast and reliable Tunisian online store."
    },
    fr: {
      title: "Shippily Store – Boutique tunisienne en ligne",
      desc: "Boutique e-commerce tunisienne rapide et fiable."
    },
    tn: {
      title: "Shيبلي – متجر تونسي أونلاين",
      desc: "متجر تونسي سريع وموثوق."
    }
  };

  document.title = seo[lang].title;

  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = seo[lang].desc;
}



















