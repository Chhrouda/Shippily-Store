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
    address: "Address"
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
    address: "Adresse"
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
    address: "العنوان"
  }
};

/* =====================
   HELPERS
===================== */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.quantity, 0);
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
   CART
===================== */
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  item ? item.quantity++ : cart.push({ name, price, quantity: 1 });
  saveCart();
  updateCartCount();
}

function removeOne(name) {
  const item = cart.find(p => p.name === name);
  if (!item) return;
  item.quantity--;
  if (item.quantity <= 0) cart = cart.filter(p => p.name !== name);
  saveCart();
  renderCart();
  updateCartCount();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!box || !totalEl) return;

  const t = translations[localStorage.getItem("lang") || "en"];
  box.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    box.innerHTML = `<p>${t.empty_cart}</p>`;
    totalEl.textContent = "0.00";
    return;
  }

  cart.forEach(i => {
    const line = i.price * i.quantity;
    total += line;
    const div = document.createElement("div");
    div.innerHTML = `<strong>${i.name} x${i.quantity}</strong> <span>${line.toFixed(2)} TND</span>`;
    box.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

/* =====================
   CHECKOUT COD
===================== */
function checkoutCOD() {
  if (!cart.length) return alert(translations.en.empty_cart);

  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const customer = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    address: form.address.value.trim()
  };

  generateInvoice(customer);

  let message = "🛒 Nouvelle commande:%0A";
  let total = 0;

  cart.forEach(i => {
    const l = i.price * i.quantity;
    total += l;
    message += `• ${i.name} x${i.quantity} = ${l} TND%0A`;
  });

  message += `%0A💰 Total: ${total} TND`;
  window.open(`https://wa.me/21620342004?text=${message}`, "_blank");

  clearCart();
}

/* =====================
   INVOICE
===================== */
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
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    itemsBox.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)} TND</td>
        <td>${lineTotal.toFixed(2)} TND</td>
      </tr>
    `;
  });

  document.getElementById("invTotal").textContent = total.toFixed(2);

  document.getElementById("invoicePanel").classList.add("active");
}


/* =====================
   LANGUAGE SWITCHER
===================== */
function initLanguageSwitcher() {
  const currentLang = localStorage.getItem("lang") || "en";

  document.querySelectorAll(".lang-change").forEach(btn => {
    const btnLang = btn.dataset.lang;

    // highlight active language
    btn.classList.toggle("active", btnLang === currentLang);

    btn.addEventListener("click", () => {
      localStorage.setItem("lang", btnLang);

      // instant UI update (NO reload)
      applyTranslation();

      // update active styles
      document.querySelectorAll(".lang-change").forEach(b =>
        b.classList.toggle("active", b.dataset.lang === btnLang)
      );
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
  initLanguageSwitcher();
});

/* =====================
   SYNC LANGUAGE ACROSS TABS (OPTIONAL BUT RECOMMENDED)
===================== */
window.addEventListener("storage", e => {
  if (e.key === "lang") {
    applyTranslation();
    initLanguageSwitcher();
  }
});
























