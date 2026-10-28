"use strict";
 
/* ---------- Mobile Navigation ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
 
function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".visually-hidden").textContent = open ? "Menü schließen" : "Menü öffnen";
}
 
toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});
 
// Menü nach Klick auf einen Link oder Escape schließen
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
 
/* ---------- Immobiliensuche (filtert die Karten) ---------- */
const form = document.getElementById("suche");
const cards = document.querySelectorAll("#angebote .card");
const info = document.getElementById("ergebnis");
const empty = document.getElementById("keine-treffer");
 
function filterCards() {
  const ort = form.ort.value.trim().toLowerCase();
  const maxPreis = Number(form.preis.value) || Infinity;
  const minZimmer = Number(form.zimmer.value) || 0;
 
  let treffer = 0;
  cards.forEach((card) => {
    const passt =
      card.dataset.ort.includes(ort) &&
      Number(card.dataset.preis) <= maxPreis &&
      Number(card.dataset.zimmer) >= minZimmer;
 
    card.hidden = !passt;
    if (passt) treffer++;
  });
 
  info.textContent =
    treffer === 1 ? "1 Immobilie gefunden" : `${treffer} Immobilien gefunden`;
  empty.hidden = treffer > 0;
}
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  filterCards();
  document.getElementById("immobilien").scrollIntoView({ behavior: "smooth" });
});
 
/* ---------- Jahreszahl im Footer ---------- */
document.getElementById("jahr").textContent = new Date().getFullYear();
 
