export default async function fetchCardsInfo() {
  const res = await fetch("api/assortements.json");
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const properties = await res.json();
  return properties;
}
