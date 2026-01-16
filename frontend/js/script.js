/* =====================
   LANGUAGE GUARD
===================== */
(function () {
  if (!localStorage.getItem("lang") && !location.pathname.endsWith("lang.html")) {
    window.location.replace("/lang.html");
  }
})();

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
    footer: "© 2025 Shippily Store"
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    cart: "Panier",
    contact: "Contact",
    home_title: "La meilleure boutique e-commerce tunisienne",
    home_sub: "Produits premium basés sur la confiance et la qualité.",
    explore: "Voir les produits",
    footer: "© 2025 Shippily Store"
  },
  tn: {
    home: "الرئيسية",
    products: "البرودوي",
    cart: "السلة",
    contact: "إتصل بينا",
    home_title: "أحسن متجر تونسي أونلاين",
    home_sub: "منتوجات مضمونة، جودة وثقة.",
    explore: "شوف البرودوي",
    footer: "© 2025 شيبلي"
  }
};

/* =====================
   APPLY TRANSLATION
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
   CART COUNT SAFE
===================== */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslation();
  updateCartCount();
});





















