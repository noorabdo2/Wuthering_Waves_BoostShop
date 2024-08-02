let currentIndex = 0;
let useCoupon = "";
const coupons = {
  tzc: { name: "Crook", discountPercentage: 50 },
  SAVE50: { name: "SAVE20", discountPercentage: 20 },
  Free10: { name: "Free", discountPercentage: 100 },
};

const images = [
  {
    src: `.\\assets\\Farm1Screenshot_5ar-1-Echo-jue-50.jpg`,
    title: "(1) تفريم أيكو C4",
  },
  {
    src: `.\\assets\\Farm1Screenshot_6ar-2-Echo-jue-50.jpg`,
    title: "(2) تفريم أيكو C4",
  },
  {
    src: `.\\assets\\Farm1Screenshot_7ar-3-Echo-jue-50.jpg`,
    title: "(3) تفريم أيكو C4",
  },

  {
    src: `.\\assets\\Data-bank1Screenshot_4en-ar.jpg`,
    title: "(1) داتا بانك ماكس",
  },

  {
    src: `.\\assets\\Exp-1Screenshot_3ar.jpg`,
    title: "(1) أستكشاف",
  },
];

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

function showOrderPopup(button) {
  const card = button.closest(".card-container");
  const title = card.querySelector(".card__title").textContent;
  const originalPrice = card.querySelector(".original-price");
  const discountedPrice = card.querySelector(".discounted-price");

  const orderNameInput = document.getElementById("unique-order-name");
  const priceInput = document.getElementById("unique-price");

  orderNameInput.value = title;
  priceInput.value = originalPrice
    ? originalPrice.textContent
    : discountedPrice.textContent;

  document.getElementById("order-receipt-popup").style.display = "block";
}

function hideOrderPopup() {
  document.getElementById("order-receipt-popup").style.display = "none";
}

function printReceipt() {
  const orderForm = document.getElementById("unique-order-form");

  html2canvas(orderForm).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "receipt.png";
    link.click();
  });
}

const galleryImage = document.querySelector(".gallery-image");
const imageTitle = document.querySelector(".image-title");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");

function prevImage() {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateImage();
}

function nextImage() {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateImage();
}

function updateImage() {
  galleryImage.style.transform = "translateX(-100%)";
  setTimeout(() => {
    galleryImage.src = images[currentIndex].src;
    imageTitle.textContent = images[currentIndex].title;
    galleryImage.style.transform = "translateX(0)";
  }, 500);
}

updateImage();

function openModal() {
  modal.style.display = "block";
  modalImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].title;
}

function closeModal() {
  modal.style.display = "none";
}

function applyCoupon() {
  const couponCode = document.getElementById("coupon-code").value.trim();

  if (coupons[couponCode]) {
    const { name, discountPercentage } = coupons[couponCode];
    const nonDiscountedOffers = document.querySelectorAll(
      ".nondiscounted-offer"
    );

    nonDiscountedOffers.forEach((offer) => {
      const cardContainer = offer.closest(".card-container");
      const cardHeadContent = offer.querySelector(".card__head-content");
      const originalPriceElement = cardHeadContent.querySelector(
        ".upper-cent-price__body"
      );
      const originalPriceText = originalPriceElement.innerText;
      const [priceEGP, priceUSD] = originalPriceText
        .split("/")
        .map((price) => price.trim());

      const newPriceEGP = parseFloat(priceEGP) * (1 - discountPercentage / 100);
      const newPriceUSD =
        parseFloat(priceUSD.replace("$", "")) * (1 - discountPercentage / 100);

      // Create discount wrapper
      const discountWrapper = document.createElement("div");
      discountWrapper.classList.add("discount-wrapper");

      // Create discount badge
      const discountBadge = document.createElement("div");
      discountBadge.classList.add("discount-badge");
      discountBadge.innerText = `${discountPercentage}%`;

      // Update offer class and data attribute
      offer.classList.remove("nondiscounted-offer");
      offer.classList.add("discounted-offer");
      offer.setAttribute("data-discount", discountPercentage);

      // Update prices
      const upperCentPriceBody = cardHeadContent.querySelector(
        ".upper-cent-price__body"
      );
      upperCentPriceBody.innerHTML = `
              <span class="old-price">${priceEGP}</span>
              <span class="discounted-price">${newPriceEGP.toFixed(
                2
              )} جنية / ${newPriceUSD.toFixed(2)}$</span>
          `;

      // Wrap card container with discount wrapper
      cardContainer.parentNode.insertBefore(discountWrapper, cardContainer);
      discountWrapper.appendChild(discountBadge);
      discountWrapper.appendChild(cardContainer);
    });

    // Set the coupon code in the unique-coupon input field
    document.getElementById("unique-coupon").value = couponCode;
    hideCouponPopup();
  } else {
    alert("Invalid coupon code.");
  }
}

function showCouponPopup() {
  document.getElementById("coupon-popup").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}

function hideCouponPopup() {
  document.getElementById("coupon-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
