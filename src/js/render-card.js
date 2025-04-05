export function createCard({ image: { src }, details }) {
  const {
    title,
    price,
    size,
    location,
    amenities = [],
    features = [],
    type,
  } = details;

  const card = document.createElement("article");
  card.className = "gallery-card";

  card.innerHTML = `
    <figure class="gallery-card-img">
      <img src="${src}" alt="${title}" />
      <a class="gallery-card-btn" href="#">Show More</a>
    </figure>

    <div class="gallery-card-details">
      <div class="gallery-card-block">
        <h2 class="gallery-card-title">${title}</h2>
        <p class="gallery-card-price">${price}</p>
      </div>

      <div class="gallery-card-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <address class="gallery-card-address">${location}</address>
      </div>

      <div class="gallery-card-area">
        <svg class="gallery-card-area-svg" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
          <path fill="currentColor" fill-rule="evenodd"
            d="M11.5 3.05a.45.45 0 0 1 .45.45v4a.45.45 0 0 1-.9 0V4.586L4.586 11.05H7.5a.45.45 0 0 1 0 .9h-4a.45.45 0 0 1-.45-.45v-4a.45.45 0 1 1 .9 0v2.914l6.464-6.464H7.5a.45.45 0 1 1 0-.9z">
          </path>
        </svg>
        <p><strong>${size}</strong></p>
      </div>

      <p class="gallery-card-type">${type}</p>

      ${
        features.length
          ? `<div class="gallery-card-features">
              ${features
                .map(
                  ({ value, unit }) =>
                    `<p class="gallery-card-feature"><span>•</span> ${value} ${unit}</p>`
                )
                .join("")}
            </div>`
          : ""
      }

      ${
        amenities.length
          ? `<h3 class="gallery-card-amenities-title">Additional amenities:</h3>
             <div class="gallery-card-amenities">
               ${amenities
                 .map(
                   (amenity) => `<p class="gallery-card-amenity">${amenity}</p>`
                 )
                 .join("")}
             </div>`
          : ""
      }
    </div>
  `;

  return card;
}
