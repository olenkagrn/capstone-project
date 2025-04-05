import fetchCardsInfo from "/src/js/fetch-card-info.js";

const track = document.querySelector(".our-assortments__carousel-track");
const prevBtn = document.querySelector(
  ".our-assortments__carousel-control.prev"
);
const nextBtn = document.querySelector(
  ".our-assortments__carousel-control.next"
);

let index = 0;
let slidesToShow = 1;
let gap = 0;

async function renderProperties(properties) {
  if (!properties) return;

  track.innerHTML = "";
  properties.map((property) => {
    const propertyCard = document.createElement("article");
    propertyCard.classList.add("property-card");
    propertyCard.innerHTML = `
      <figure class="property-card-image">
        <img src="${property.image.src}" alt="${property.image.alt}" />
      </figure>
      <div class="property-card__details">
        <h3 class="property-card__title">${property.details.title}</h3>
        <ul class="property-card__features">
          <li><span>${
            property.details.size.split(" ")[0]
          }</span><p>Sq. Ft</p></li>
          ${property.details.features
            .map(
              (feature) => `
              <li>
                <span>${feature.value}</span>
                <p>${feature.unit}</p>
              </li>
            `
            )
            .join("")}
        </ul>
      </div>
    `;
    track.appendChild(propertyCard);
  });
}

function updateCarousel(properties) {
  if (!properties) return;

  const screenWidth = window.innerWidth;
  slidesToShow = screenWidth < 768 ? 1 : screenWidth < 1024 ? 2 : 3;

  const totalSlides = properties.length;
  if (index < 0) index = totalSlides - slidesToShow;
  if (index > totalSlides - slidesToShow) index = 0;

  const trackStyle = getComputedStyle(track);
  gap = parseFloat(trackStyle.gap);

  const cardWidth = track.querySelector(".property-card").offsetWidth + gap;

  const translateX = -(index * cardWidth);
  track.style.transform = `translateX(${translateX}px)`;
}

function setupCarouselControls(properties) {
  if (!properties) return;

  prevBtn.addEventListener("click", () => {
    index--;
    updateCarousel(properties);
  });

  nextBtn.addEventListener("click", () => {
    index++;
    updateCarousel(properties);
  });

  window.addEventListener("resize", () => updateCarousel(properties));
}

async function initializeCarousel() {
  const properties = await fetchCardsInfo();
  if (properties) {
    await renderProperties(properties);
    updateCarousel(properties);
    setupCarouselControls(properties);
  } else {
    console.error("Failed to fetch cards info");
  }
}

initializeCarousel();
