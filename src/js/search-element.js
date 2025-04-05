import fetchCardsInfo from "./fetch-card-info.js";
import { createCard } from "./render-card.js";

const searchInput = document.getElementById("search");
const galleryContainer = document.getElementById("gallery-container");
const paginationContainer = document.querySelector(".pagination-container");
const paginationList = document.querySelector(".pagination-list");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const filterPanel = document.querySelector(".filter-panel");
const openBtn = document.getElementById("filterButton");
const closeBtn = document.getElementById("closeBtn");
const form = document.querySelector("#filter-form");

let properties = await fetchCardsInfo();
let currentPage = 1;
const cardsPerPage = 10;
let filteredProperties = [...properties];

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filteredProperties = properties.filter((property) =>
    property.details.title.toLowerCase().includes(searchTerm)
  );
  currentPage = 1;
  renderFilteredGallery(filteredProperties);
  updatePagination(filteredProperties);
});

openBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  filterPanel.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  filterPanel.classList.remove("active");
  document.body.style.overflow = "";
});

document.addEventListener("click", (event) => {
  if (!filterPanel.contains(event.target) && event.target !== openBtn) {
    filterPanel.classList.remove("active");
    document.body.style.overflow = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = document.getElementById("price").value.trim();
  const bedrooms = document.getElementById("bedrooms").value.trim();
  const bathrooms = document.getElementById("bathrooms").value.trim();
  const type = document.getElementById("type").value;
  const location = document.getElementById("location").value;

  const cleanBedrooms = bedrooms.replace(/[^\d]/g, "");
  const cleanBathrooms = bathrooms.replace(/[^\d]/g, "");

  const bedroomsNumber = cleanBedrooms ? Number(cleanBedrooms) : null;
  const bathroomsNumber = cleanBathrooms ? Number(cleanBathrooms) : null;

  const filters = {
    price: price ? Number(price) : null,
    bedrooms: bedroomsNumber,
    bathrooms: bathroomsNumber,
    type: type || null,
    location: location || null,
    amenities: Array.from(
      document.querySelectorAll('input[name="amenities"]:checked')
    ).map((checkbox) => checkbox.value),
  };
  localStorage.setItem("propertyFilters", JSON.stringify(filters));
  console.log("Filters saved:", filters);

  filterPanel.classList.remove("active");
  document.body.style.overflow = "";
  applyFilters();
});
const sortCriteriaSelect = document.getElementById("sortCriteria");
const sortDirectionSelect = document.getElementById("sortDirection");

sortCriteriaSelect.addEventListener("change", applyFilters);
sortDirectionSelect.addEventListener("change", applyFilters);

async function applyFilters() {
  const properties = await fetchCardsInfo();
  const filters = JSON.parse(localStorage.getItem("propertyFilters")) || {};

  const filteredProperties = properties.filter((property) => {
    const cleanPrice = Number(property.details.price.replace(/[$,]/g, ""));
    if (filters.price && cleanPrice > filters.price) return false;

    const bedsFeature = property.details.features.find(
      (f) => f.unit === "Beds"
    );
    const bathsFeature = property.details.features.find(
      (f) => f.unit === "Baths"
    );

    const propertyBedrooms = bedsFeature ? Number(bedsFeature.value) : 0;
    const propertyBathrooms = bathsFeature ? Number(bathsFeature.value) : 0;

    if (filters.bedrooms && propertyBedrooms < filters.bedrooms) return false;
    if (filters.bathrooms && propertyBathrooms < filters.bathrooms)
      return false;

    if (filters.type && property.details.type !== filters.type) return false;

    if (filters.location && property.details.location !== filters.location)
      return false;

    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        property.details.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  const sortCriteria = sortCriteriaSelect.value;
  const sortDirection = sortDirectionSelect.value;

  if (sortCriteria) {
    filteredProperties.sort((a, b) => {
      let valueA, valueB;

      if (sortCriteria === "price") {
        valueA = Number(a.details.price.replace(/[$,]/g, ""));
        valueB = Number(b.details.price.replace(/[$,]/g, ""));
      } else if (sortCriteria === "size") {
        valueA = Number(a.details.size.replace(/[^0-9.]/g, ""));
        valueB = Number(b.details.size.replace(/[^0-9.]/g, ""));
      }

      if (sortDirection === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }

  renderFilteredGallery(filteredProperties);
  updatePagination(filteredProperties);
}

function renderFilteredGallery(propertiesToDisplay) {
  galleryContainer.innerHTML = "";

  if (propertiesToDisplay.length === 0) {
    galleryContainer.innerHTML = `<p class="no-results">No matching properties found.</p>`;
    paginationContainer.style.display = "none";
    return;
  }

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentPageProperties = propertiesToDisplay.slice(startIndex, endIndex);

  currentPageProperties.forEach((property) => {
    const card = createCard(property);
    galleryContainer.appendChild(card);
  });

  paginationContainer.style.display = "block";
}

function updatePagination(propertiesToPaginate) {
  paginationList.innerHTML = "";
  const pageCount = Math.ceil(propertiesToPaginate.length / cardsPerPage);

  if (pageCount === 0) {
    paginationContainer.style.display = "none";
    return;
  }

  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement("li");
    pageLink.classList.add("pagination-link");
    pageLink.textContent = i;
    pageLink.value = i;

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pageLink.addEventListener("click", () => {
      currentPage = i;
      renderFilteredGallery(propertiesToPaginate);
      updatePagination(propertiesToPaginate);
    });

    paginationList.appendChild(pageLink);
  }

  paginationContainer.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  const pageCount = Math.ceil(filteredProperties.length / cardsPerPage);
  if (currentPage < pageCount) {
    currentPage++;
    renderFilteredGallery(filteredProperties);
    updatePagination(filteredProperties);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderFilteredGallery(filteredProperties);
    updatePagination(filteredProperties);
  }
});

renderFilteredGallery(filteredProperties);
updatePagination(filteredProperties);
