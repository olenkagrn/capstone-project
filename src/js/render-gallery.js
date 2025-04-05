import fetchCardsInfo from "/src/js/fetch-card-info.js";

import { createCard } from "/src/js/render-card.js";

export default async function renderGalleryCards(filteredProperties = null) {
  try {
    const properties = await fetchCardsInfo();

    if (!properties) return;

    const galleryContainer = document.getElementById("gallery-container");

    if (!galleryContainer) {
      console.error("Container with ID 'gallery-cards-container' not found.");

      return;
    }

    const paginationList = document.querySelector(".pagination-list");

    const prevBtn = document.getElementById("prevBtn");

    const nextBtn = document.getElementById("nextBtn");

    const cardsPerPage = 10;

    let currentPage = 1;

    const propertiesToDisplay = filteredProperties || properties;

    function displayCards(page) {
      const startIndex = (page - 1) * cardsPerPage;
      const endIndex = page * cardsPerPage;
      const currentPageProperties = properties.slice(startIndex, endIndex);

      galleryContainer.innerHTML = "";

      currentPageProperties.forEach((property) => {
        const card = createCard(property);
        galleryContainer.appendChild(card);
      });
    }

    function updatePagination() {
      paginationList.innerHTML = "";

      const pageCount = Math.ceil(propertiesToDisplay.length / cardsPerPage);

      if (propertiesToDisplay.length <= cardsPerPage) {
        paginationList.style.display = "none";

        prevBtn.disabled = true;

        nextBtn.disabled = true;

        return;
      } else {
        paginationList.style.display = "flex";
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

          displayCards(currentPage);
          updatePagination();
        });

        paginationList.appendChild(pageLink);
      }
    }

    nextBtn.addEventListener("click", async () => {
      const pageCount = Math.ceil(propertiesToDisplay.length / cardsPerPage);

      if (currentPage < pageCount) {
        currentPage++;

        displayCards(currentPage);

        updatePagination();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;

        displayCards(currentPage);

        updatePagination();
      }
    });

    displayCards(currentPage);

    updatePagination();
  } catch (error) {
    console.error("Error rendering gallery cards:", error);
  }
}
