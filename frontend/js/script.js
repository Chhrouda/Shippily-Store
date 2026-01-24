
/* =====================
   CONFIG
===================== */
const API_URL = "https://shippily-store.onrender.com";

/* =====================
   SAFE STORAGE HELPERS
===================== */
function safeGet(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
function safeSetRaw(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}
function safeGetRaw(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch { return fallback; }
}

/* =====================
   CART STATE
===================== */
let cart = safeGet("cart", []);

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
    see_details: "See Details",

    home_title: "Best Tunisian E-commerce Store",
    home_sub: "Premium products built for trust, quality, and scale.",
    explore: "Explore Products",
    product_default_desc: "High-quality product selected by Shippily.",

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

    trust_text: "Payment on delivery · 24–72h delivery in Tunisia · WhatsApp support",

    full_name: "Full Name",
    email: "Email",
    address: "Address",

    fast_delivery: "Fast Delivery",
    secure_payments: "Secure Payments",
    tunisian_store: "Tunisian Store",
    verified_products: "Verified Products",
    
details_page_title: "Details Page",
ask_on_whatsapp: "Ask on WhatsApp",
trust_line: "24–72h · TN Tunisia · Pay on delivery",


    why_title: "Why Shippily?",
    why_curated_title: "Curated Products",
    why_curated_text: "Only high-quality products selected for performance and durability.",
    why_local_title: "Local & Reliable",
    why_local_text: "Built for Tunisia with fast shipping and local support.",
    why_secure_title: "Secure Checkout",
    why_secure_text: "Your data and payments are protected at every step.",

    feedback: "Feedback",
    send_feedback: "Send Feedback",
    whatsapp_hint: "Or contact us directly on WhatsApp"
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    contact: "Contact",
    add_to_cart: "Ajouter au panier",
    see_details: "Voir les détails",
    
    details_page_title: "Détails du produit",
    ask_on_whatsapp: "Demander sur WhatsApp",
    trust_line: "24–72h · TN Tunisie · Paiement à la livraison",
    product_default_desc: "Produit de haute qualité sélectionné par Shippily.",


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

    trust_text: "Paiement à la livraison · Livraison 24–72h en Tunisie · Support WhatsApp",

    full_name: "Nom complet",
    email: "Email",
    address: "Adresse",

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
    whatsapp_hint: "Ou contactez-nous directement sur WhatsApp"
  },
  tn: {
    home: "الرئيسية",
    products: "البرودوي",
    cart: "السلة",
    contact: "إتصل بينا",
    add_to_cart: "زيد للسلة",
    see_details: "شوف التفاصيل",
    
details_page_title: "تفاصيل المنتج",
ask_on_whatsapp: "أسأل على واتساب",
trust_line: "24–72 · تونس · خلاص عند التسليم",


    home_title: "أحسن متجر تونسي أونلاين",
    home_sub: "منتوجات مضمونة، جودة وثقة.",
    explore: "شوف البرودوي",
    product_default_desc: "منتج عالي الجودة مختار من Shippily.",

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

    trust_text: "الخلاص عند التسليم · التوصيل 24–72 ساعة · واتساب",

    full_name: "الإسم الكامل",
    email: "الإيميل",
    address: "العنوان",

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
    whatsapp_hint: "ولا تنجم تكلمنا مباشرة على واتساب"
  }
};

/* =====================
   LANGUAGE STRATEGY (SEO-SAFE)
   - No forced redirect.
   - Use existing <html lang="..."> as default.
   - Respect stored preference if available.
===================== */
function getInitialLang() {
  const stored = safeGetRaw("lang", null);
  if (stored && translations[stored]) return stored;

  // Fallback to document <html lang>, else 'en'
  const docLang = (document.documentElement.getAttribute("lang") || "en");
  return translations[docLang] ? docLang : "en";
}

/* =====================
   HELPERS
===================== */
function saveCart() { safeSet("cart", cart); }

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount, #floatingCount").forEach(el => {
    if (el) el.textContent = String(count);
  });
}
function clearCart() {
  cart = [];
  try { localStorage.removeItem("cart"); } catch {}
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

  const lang = getInitialLang();
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
      <button class="remove-btn" type="button">${t.remove}</button>
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
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;

  if (cart.length === 0) {
    alert(t.empty_cart);
    return;
  }

  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const name = (form.name?.value || "").trim();
  const email = (form.email?.value || "").trim();
  const address = (form.address?.value || "").trim();

  if (!name || !email || !address) {
    alert("Please fill all required fields");
    return;
  }

  let message = "Nouvelle commande:%0A%0A";
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

  window.open(`https://wa.me/21620342004?text=${message}`, "_blank");

  clearCart();
}

/* =====================
   INVOICE (overlay)
===================== */
function generateInvoice(customer) {
  const orderNumber = "SH-" + Date.now();
  const date = new Date().toLocaleDateString("fr-TN");

  const byId = id => document.getElementById(id);

  byId("invOrder") && (byId("invOrder").textContent = orderNumber);
  byId("invDate") && (byId("invDate").textContent = date);

  byId("invName") && (byId("invName").textContent = customer.name);
  byId("invEmail") && (byId("invEmail").textContent = customer.email);
  byId("invAddress") && (byId("invAddress").textContent = customer.address);

  const itemsBox = byId("invItems");
  if (itemsBox) {
    itemsBox.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const line = document.createElement("p");
      const lineTotal = item.price * item.quantity;
      total += lineTotal;
      line.textContent = `${item.name} x${item.quantity} — ${lineTotal} TND`;
      itemsBox.appendChild(line);
    });

    byId("invTotal") && (byId("invTotal").textContent = total.toFixed(2));
  }

  const panel = byId("invoicePanel");
  if (panel && panel.classList) panel.classList.add("active");
}

/* =====================
   CONTACT FORM
===================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("input[type=text]")?.value.trim() || "";
    const email = form.querySelector("input[type=email]")?.value.trim() || "";
    const msg = form.querySelector("textarea")?.value.trim() || "";

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
   TRANSLATION ENGINE (Progressive Enhancement)
===================== */
function applyTranslation() {
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;

  // Update <title> if data-i18n is set and key exists
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl && t[titleEl.dataset.i18n]) {
    titleEl.textContent = t[titleEl.dataset.i18n];
  }

  // Only replace text if translation exists; do not blank SSR text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key && t[key]) {
      // Prefer textContent for safety; for placeholders use data-i18n-attr="placeholder"
      const attr = el.dataset.i18nAttr;
      if (attr) {
        el.setAttribute(attr, t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });
}

/* =====================
   LANGUAGE SWITCHER
===================== */
function initLanguageSwitcher() {
  const currentLang = getInitialLang();

  document.querySelectorAll(".lang-change").forEach(btn => {
    const btnLang = btn.dataset.lang;

    if (btnLang === currentLang) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "true");
    }

    btn.addEventListener("click", () => {
      if (!btnLang || !translations[btnLang]) return;

      safeSetRaw("lang", btnLang);

      // If you have separate URLs per language, navigate:
      // location.href = `/${btnLang}/`;
      // Otherwise, just reload to apply JS translations:
      location.reload();
    });
  });
}

/* =====================
   INIT
===================== */
/* =====================
   DOM READY
===================== */
document.addEventListener("DOMContentLoaded", () => {  // ✅ valid
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



/* =====================
   PRODUCT DETAILS MODAL
===================== */
(function initProductModal() {
  const modal      = document.getElementById('productModal');
  if (!modal) return;

  const mainImg    = document.getElementById('mMainImg');
  const thumbsWrap = document.getElementById('mThumbs');
  const nameEl     = document.getElementById('mName');
  const priceEl    = document.getElementById('mPrice');
  const descEl     = document.getElementById('mDesc');
  const addBtn     = document.getElementById('mAddToCart');
  const waLink     = document.getElementById('mWA');

  let currentProduct = null;
  let lastFocused = null;

  function openModal(prod) {
    currentProduct = prod;
    lastFocused = document.activeElement;
    

    // Fill content
    nameEl.textContent = prod.name;

    if (prod.priceValue != null && !Number.isNaN(prod.priceValue)) {
      priceEl.textContent = `${prod.priceValue} TND`;
    } else {
      priceEl.textContent = prod.price; // already includes currency text
    }

    descEl.textContent = prod.desc || 'High-quality product selected by Shippily.';

    const images = Array.isArray(prod.images) && prod.images.length
      ? prod.images
      : [prod.image, prod.image, prod.image].filter(Boolean);

    // Main image
    if (images[0]) {
      mainImg.src = images[0];
      mainImg.alt = prod.name;
    }

    
// Thumbs
thumbsWrap.innerHTML = '';
images.forEach((src, i) => {
  const im = new Image();
  im.src = src;
  im.className = i === 0 ? 'active' : '';
  im.loading = 'lazy';
  im.tabIndex = 0; // keyboard focus
  im.addEventListener('click', () => selectThumb(i, src, im));
  im.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      selectThumb(i, src, im);
    }
  });
  thumbsWrap.appendChild(im);
});

function selectThumb(index, src, el) {
  // update active state
  document.querySelectorAll('#mThumbs img').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  // cross-fade even if src is the same (to give visible feedback)
  mainImg.classList.remove('fading-in');
  mainImg.classList.add('fading-out');

  // small timeout lets CSS animate out before swap
  setTimeout(() => {
    mainImg.src = src;

    // When the new image is ready, fade in
    if (mainImg.complete) {
      mainImg.classList.remove('fading-out');
      mainImg.classList.add('fading-in');
    } else {
      mainImg.onload = () => {
        mainImg.classList.remove('fading-out');
        mainImg.classList.add('fading-in');
      };
    }
  }, 80);
}


    
// WhatsApp link (keeps price pretty and up-to-date)
const priceText = (prod.priceValue != null ? `${prod.priceValue} TND` : prod.price);
const waText = `🛒 Product inquiry\n\n📦 ${prod.name}\n💰 ${priceText}`;
waLink.href = `https://wa.me/21620342004?text=${encodeURIComponent(waText)}`;

// Add to Cart (close after adding)
if (addBtn) {
  addBtn.onclick = () => {
    const numericPrice = (prod.priceValue != null)
      ? Number(prod.priceValue)
      : Number(String(prod.price).replace(/\D+/g, ''));
    addToCart(prod.name, numericPrice);
    closeModal();
  };
}


    // Open
    modal.classList.add('open');
    document.body.classList.add('modal-open');

    // Accessibility focus
    setTimeout(() => {
      modal.querySelector('.modal-close')?.focus();
    }, 0);

    // Close on Esc
    document.addEventListener('keydown', onEsc);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function onEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  // Delegate clicks on See Details buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.see-details-btn, .seeDetails, .see-details');
    if (!btn) return;

    e.preventDefault();

    const card = btn.closest('.product');
    if (!card) return;

    // Build product data from card
    const imgEl = card.querySelector('img');
    const name = (card.dataset.name || card.querySelector('h3')?.textContent || '').trim();
    const priceValue = card.dataset.price ? Number(card.dataset.price) : null;
    const priceText  = card.querySelector('p')?.textContent?.trim()
                    || (priceValue != null ? `${priceValue} TND` : '');

    const image = imgEl?.src || card.dataset.image || '';

    if (!name || !priceText || !image) {
      console.warn('❌ Product structure/data missing');
      return;
    }

    const prod = {
      name,
      price: priceText,
      priceValue,
      image,
      images: [image, image, image],
      desc: (card.dataset.desc && card.dataset.desc.trim()) || tKey('product_default_desc')
    };

    openModal(prod);
  });

  // Close handlers
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) closeModal();
  });
})();

function tKey(key) {
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;
  return t[key] || translations.en[key] || key;
}


