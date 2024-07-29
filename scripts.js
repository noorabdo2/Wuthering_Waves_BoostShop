document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const cardHeadContents = document.querySelectorAll(".card__head-content");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});
