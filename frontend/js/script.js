/* =====================
   CONFIG
===================== */
const API_URL = "https://shippily-store.onrender.com";

/* =====================
   CART STATE
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =====================
   LANGUAGE INIT (SEO SAFE)
===================== */
const DEFAULT_LANG = "en";
let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;
document.documentElement.lang = currentLang;

/* =====================
   TRANSLATIONS
===================== */
const translations = {
  en: {
    home: "Home",
    products: "Products",
    cart: "Cart",
    contact: "Contact",
    add_to_cart: "Add to Cart",

    home_title: "Best Tunisian E-commerce Store",
    home_sub: "Premium products built for trust, quality, and scale.",
    explore: "Explore Products",

    products_title: "Products",
    cart_title: "Your Cart",
    checkout_title: "Checkout",

    contact_title: "Contact Us",
    contact_sub: "Have feedback or questions? We’d love to hear from you.",

    remove: "Remove",
    empty_cart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",

    pay_cod: "Pay on Delivery",
    pay_card: "Pay with Card",

    fast_delivery: "Fast Delivery",
    secure_payments: "Secure Payments",
    tunisian_store: "Tunisian Store",
    verified_products: "Verified Products",

    why_title: "Why Shippily?",
    why_curated_title: "Curated Products",
    why_curated_text: "Only high-quality products selected for performance and durability.",
    why_local_title: "Local & Reliable",
    why_local_text: "Built for Tunisia with fast shipping and local support.",
    why_secure_title: "Secure Checkout",
    why_secure_text: "Your data and payments are protected at every step.",

    feedback: "Feedback",
    send_feedback: "Send Feedback",
    whatsapp_hint: "Or contact us directly on WhatsApp",

    full_name: "Full Name",
    email: "Email",
    address: "Address"
  },

  fr: {
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    contact: "Contact",
    add_to_cart: "Ajouter au panier",

    home_title: "La meilleure boutique e-commerce tunisienne",
    home_sub: "Produits premium basés sur la confiance et la qualité.",
    explore: "Voir les produits",

    products_title: "Produits",
    cart_title: "Votre panier",
    checkout_title: "Paiement",

    contact_title: "Contactez-nous",
    contact_sub: "Vous avez des questions ou des remarques ? Nous serions ravis de vous répondre.",

    remove: "Supprimer",
    empty_cart: "Votre panier est vide",
    total: "Total",
    checkout: "Paiement",

    pay_cod: "Paiement à la livraison",
    pay_card: "Payer par carte",

    fast_delivery: "Livraison rapide",
    secure_payments: "Paiements sécurisés",
    tunisian_store: "Boutique tunisienne",
    verified_products: "Produits vérifiés",

    why_title: "Pourquoi Shippily ?",
    why_curated_title: "Produits sélectionnés",
    why_curated_text: "Des produits de haute qualité sélectionnés pour leur performance et durabilité.",
    why_local_title: "Local & Fiable",
    why_local_text: "Conçu pour la Tunisie avec livraison rapide et support local.",
    why_secure_title: "Paiement sécurisé",
    why_secure_text: "Vos données et paiements sont protégés à chaque étape.",

    feedback: "Avis",
    send_feedback: "Envoyer",
    whatsapp_hint: "Ou contactez-nous directement sur WhatsApp",

    full_name: "Nom complet",
    email: "Email",
    address: "Adresse"
  },

  tn: {
    home: "الرئيسية",
    products: "البرودوي",
    cart: "السلة",
    contact: "إتصل بينا",
    add_to_cart: "زيد للسلة",

    home_title: "أحسن متجر تونسي أونلاين",
    home_sub: "منتوجات مضمونة، جودة وثقة.",
    explore: "شوف البرودوي",

    products_title: "البرودوي",
    cart_title: "السلة متاعك",
    checkout_title: "الخلاص",

    contact_title: "إتصل بينا",
    contact_sub: "عندك سؤال ولا ملاحظة؟ يسعدنا نجاوبوك.",

    remove: "نحّي",
    empty_cart: "السلة فارغة",
    total: "المجموع",
    checkout: "الخلاص",

    pay_cod: "خلاص عند التسليم",
    pay_card: "خلاص بالكارطة",

    fast_delivery: "توصيل سريع",
    secure_payments: "خلاص آمن",
    tunisian_store: "ستور تونسي",
    verified_products: "منتجات مضمونة",

    why_title: "علاش Shippily؟",
    why_curated_title: "منتجات مختارة",
    why_curated_text: "منتجات ذات جودة عالية مختارة بعناية للأداء والمتانة.",
    why_local_title: "محلي وموثوق",
    why_local_text: "مصمم لتونس مع توصيل سريع ودعم محلي.",
    why_secure_title: "خلاص آمن",
    why_secure_text: "المعطيات والخلاص متاعك محميين في كل مرحلة.",

    feedback: "ملاحظة",
    send_feedback: "إبعث",
    whatsapp_hint: "ولا تنجم تكلمنا مباشرة على واتساب",

    full_name: "الإسم الكامل",
    email: "الإيميل",
    address: "العنوان"
  }
};

/* =====================
   CART HELPERS
===================== */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll("#cartCount").forEach(el => {
    if (el) el.textContent = count;
  });
}

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  saveCart();
  updateCartCount();
}

/* =====================
   CART RENDER
===================== */
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container || !totalEl) return;

  const t = translations[currentLang];
  container.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    container.innerHTML = `<p>${t.empty_cart}</p>`;
    totalEl.textContent = "0.00";
    return;
  }

  cart.forEach(item => {
    const line = item.price * item.quantity;
    total += line;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <strong>${item.name} x${item.quantity}</strong>
      <span>${line.toFixed(2)} TND</span>
      <button class="remove-btn">${t.remove}</button>
    `;

    div.querySelector("button").onclick = () => {
      item.quantity--;
      if (item.quantity <= 0)
        cart = cart.filter(p => p.name !== item.name);
      saveCart();
      renderCart();
      updateCartCount();
    };

    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

/* =====================
   TRANSLATION ENGINE
===================== */
function applyTranslation() {
  const t = translations[currentLang];

  document.documentElement.lang = currentLang;

  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl && t[titleEl.dataset.i18n]) {
    titleEl.textContent = t[titleEl.dataset.i18n];
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

/* =====================
   LANGUAGE SWITCHER
===================== */
function initLanguageSwitcher() {
  document.querySelectorAll(".lang-change").forEach(btn => {
    btn.onclick = () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem("lang", currentLang);
      applyTranslation();
    };
  });
}

/* =====================
   CONTACT FORM
===================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.onsubmit = e => {
    e.preventDefault();
    const name = form.querySelector("input[type=text]").value.trim();
    const email = form.querySelector("input[type=email]").value.trim();
    const msg = form.querySelector("textarea").value.trim();
    if (!name || !email || !msg) return;

    window.open(
      `https://wa.me/21620342004?text=${encodeURIComponent(
        `📩 Message\n\n👤 ${name}\n📧 ${email}\n\n💬 ${msg}`
      )}`,
      "_blank"
    );
    form.reset();
  };
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  applyTranslation();
  initLanguageSwitcher();
  initContactForm();
});






















