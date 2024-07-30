document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});

function showContactPopup() {
  document.getElementById("contact-popup").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}

function hideContactPopup() {
  document.getElementById("contact-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
