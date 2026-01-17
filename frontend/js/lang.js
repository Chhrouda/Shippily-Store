document.addEventListener("DOMContentLoaded", () => {
  // If language already selected, go to home
  if (localStorage.getItem("lang")) {
    window.location.replace("/index.html");
    return;
  }

  // Attach click handlers
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      localStorage.setItem("lang", lang);
      window.location.replace("/index.html");
    });
  });
});
