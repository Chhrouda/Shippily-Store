document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem("lang", btn.dataset.lang);
      window.location.href = "/";
    });
  });
});

