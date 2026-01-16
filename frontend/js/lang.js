document.addEventListener("DOMContentLoaded", () => {
  // If language already selected → go home
  if (localStorage.getItem("lang")) {
    window.location.replace("/");
    return;
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      localStorage.setItem("lang", lang);
      window.location.replace("/");
    });
  });
});
