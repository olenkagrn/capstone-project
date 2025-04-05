function init() {
  import("./render-gallery.js");
  import("./fetch-card-info.js");
  import("./search-element.js");
  import("./render-card.js");
  import("./render-aminities.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
