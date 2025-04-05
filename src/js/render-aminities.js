const bedroomOptions = ["Any", "1+", "2+", "3+", "4+"];
const bathroomOptions = ["Any", "1+", "2+", "3+", "4+"];
const propertyTypes = ["Any", "For Sale", "For Rent"];
const locations = [
  "Any",
  "San Francisco, CA",
  "New York, NY",
  "Los Angeles, CA",
  "Miami, FL",
  "Chicago, IL",
  "Austin, TX",
  "Denver, CO",
  "Seattle, WA",
  "Dallas, TX",
  "Boston, MA",
  "Atlanta, GA",
  "Philadelphia, PA",
  "Orlando, FL",
];
const sortOptions = ["None", "Price", "Size"];
const sortDirections = ["Ascending", "Descending"];

function populateSelect(elementId, options) {
  const select = document.getElementById(elementId);
  select.innerHTML = "";

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option === "Any" ? "" : option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
}

// Заповнення динамічних випадаючих списків
populateSelect("bedrooms", bedroomOptions);
populateSelect("bathrooms", bathroomOptions);
populateSelect("type", propertyTypes);
populateSelect("location", locations);
populateSelect("sortCriteria", sortOptions);
populateSelect("sortDirection", sortDirections);

const allAmenities = [
  "Garden",
  "Smart Home",
  "Swimming Pool",
  "Garage",
  "Parking",
  "Gym",
  "Concierge Service",
  "Home Theater",
  "Rainwater Collection",
  "Solar Panels",
  "Nearby Park",
  "Terrace",
  "Fireplace",
  "Basement",
  "Hiking Trails",
  "Large Deck",
  "Fire Pit",
  "Mountain View",
  "Art Galleries",
  "Exposed Brick",
  "High Ceilings",
];

function renderAmenities() {
  const amenitiesContainer = document.querySelector(
    ".filter-panel__checkbox-group"
  );
  amenitiesContainer.innerHTML = "";

  allAmenities.forEach((amenity) => {
    const label = document.createElement("label");
    label.classList.add("filter-panel__checkbox");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "amenities";
    input.value = amenity;

    label.appendChild(input);
    label.appendChild(document.createTextNode(amenity));

    amenitiesContainer.appendChild(label);
  });
}

renderAmenities();
