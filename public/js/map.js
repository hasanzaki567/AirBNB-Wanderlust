document.addEventListener("DOMContentLoaded", () => {
  console.log("map.js loaded");
  console.log("Coords:", listingCoords);

  const lng = listingCoords[0];
  const lat = listingCoords[1];

  const map = L.map('map').setView([lat, lng], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Exact location")
    .openPopup();
});