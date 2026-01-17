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
    empty_cart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    pay_card: "Pay with Card",
    trust_text: "Payment on delivery · 24–72h delivery in Tunisia · WhatsApp support",
    full_name: "Full Name",
    email: "Email",
    address: "Address",
    delivery: "Fast Delivery",
    secure_payments: "Secure Payments",
    tunisian_store: "Tunisian Store",
    verified_products: "Verified Products",
    why_shippily: "Why Shippily?",
    curated_products: "Curated Products",
    curated_desc: "Only high-quality products selected for performance and durability.",
    local_reliable: "Local & Reliable",
    local_desc: "Built for Tunisia with fast shipping and local support.",
    secure_checkout: "Secure Checkout",
    secure_desc: "Your data and payments are protected at every step.",
    contact_us: "Contact Us",
    feedback_text: "Have feedback or questions? We’d love to hear from you.",
    feedback: "Feedback",
    send_feedback: "Send Feedback",
    whatsapp_contact: "Or contact us directly on WhatsApp",
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
    empty_cart: "Votre panier est vide",
    total: "Total",
    checkout: "Paiement",
    pay_card: "Payer par carte",
    trust_text: "Paiement à la livraison · Livraison 24–72h en Tunisie · Support WhatsApp",
    full_name: "Nom complet",
    email: "Email",
    address: "Adresse",
    delivery: "Livraison rapide",
  secure_payments: "Paiements sécurisés",
  tunisian_store: "Boutique tunisienne",
  verified_products: "Produits vérifiés",
  why_shippily: "Pourquoi Shippily ?",
  curated_products: "Produits sélectionnés",
  curated_desc: "Uniquement des produits de haute qualité choisis pour leur performance et durabilité.",
  local_reliable: "Local & fiable",
  local_desc: "Conçu pour la Tunisie avec livraison rapide et support local.",
  secure_checkout: "Paiement sécurisé",
  secure_desc: "Vos données et paiements sont protégés à chaque étape.",
  contact_us: "Contactez-nous",
  feedback_text: "Une question ou un avis ? Nous serions ravis de vous répondre.",
  feedback: "Avis",
  send_feedback: "Envoyer",
  whatsapp_contact: "Ou contactez-nous directement sur WhatsApp",
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
    empty_cart: "السلة فارغة",
    total: "المجموع",
    checkout: "الخلاص",
    pay_card: "خلاص بالكارطة",
    trust_text: "الخلاص عند التسليم · التوصيل 24–72 ساعة · واتساب",
    full_name: "الإسم الكامل",
    email: "الإيميل",
    address: "العنوان",
    tn: {
  delivery: "توصيل سريع",
  secure_payments: "خلاص آمن",
  tunisian_store: "متجر تونسي",
  verified_products: "منتوجات مضمونة",
  why_shippily: "علاش Shippily؟",
  curated_products: "منتوجات مختارة",
  curated_desc: "كان منتوجات ذات جودة عالية مختارة للأداء والمتانة.",
  local_reliable: "محلي وموثوق",
  local_desc: "مبني لتونس مع توصيل سريع ودعم محلي.",
  secure_checkout: "خلاص آمن",
  secure_desc: "معطياتك وخلاصك محميين في كل مرحلة.",
  contact_us: "إتصل بينا",
  feedback_text: "عندك ملاحظة ولا سؤال؟ يهمنا نسمعوك.",
  feedback: "ملاحظة",
  send_feedback: "إبعث",
  whatsapp_contact: "ولا كلمنا مباشرة على واتساب",
}

  }
};

/* =====================
   LANGUAGE ENFORCEMENT
===================== */
(function enforceLanguage() {
  try {
    const lang = localStorage.getItem("lang");
    const path = window.location.pathname;
    const isLangPage = path.endsWith("/lang.html") || path.endsWith("lang.html");

    if (!lang && !isLangPage) {
      window.location.replace("/lang.html");
    }
  } catch (err) {
    console.warn("Language enforcement skipped:", err);
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
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  renderCart();
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
  const t = translations[lang] || translations.en;

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
  const t = translations[lang] || translations.en;

  if (cart.length === 0) {
    alert(t.empty_cart);
    return;
  }

  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();

  // ✅ REQUIRED FIELDS CHECK
  if (!name || !email || !address) {
    alert("Please fill all required fields");
    return;
  }

  // ✅ BUILD WHATSAPP MESSAGE
  let message = "🛒 Nouvelle commande:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    message += `• ${item.name} x${item.quantity} = ${lineTotal} TND%0A`;
  });

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;
  message += `%0A👤 ${name}`;
  message += `%0A📧 ${email}`;
  message += `%0A🏠 ${address}`;

  // ✅ OPEN WHATSAPP
  window.open(
    `https://wa.me/21620342004?text=${message}`,
    "_blank"
  );

  // ✅ CLEAR CART AFTER SUCCESS
  clearCart();
}


function generateInvoice(customer) {
  const orderNumber = "SH-" + Date.now();
  const date = new Date().toLocaleDateString("fr-TN");

  document.getElementById("invOrder").textContent = orderNumber;
  document.getElementById("invDate").textContent = date;

  document.getElementById("invName").textContent = customer.name;
  document.getElementById("invEmail").textContent = customer.email;
  document.getElementById("invAddress").textContent = customer.address;

  const itemsBox = document.getElementById("invItems");
  itemsBox.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const line = document.createElement("p");
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    line.textContent = `${item.name} x${item.quantity} — ${lineTotal} TND`;
    itemsBox.appendChild(line);
  });

  document.getElementById("invTotal").textContent = total.toFixed(2);

  document.getElementById("invoicePanel").classList.add("active");
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
  const t = translations[lang] || translations.en;
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
  initLanguageSwitcher();
  
  const payBtn = document.getElementById("payBtn");

if (payBtn) {
  payBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("💳 Card payment is not available yet.\nPlease choose Pay on Delivery.");
  });
}


  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      if (!product) return;

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





















