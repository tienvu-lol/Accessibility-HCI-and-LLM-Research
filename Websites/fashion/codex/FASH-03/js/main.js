"use strict";
(() => {
 const titles = ["Inside the quiet rooms of Atelier Vale", "A wardrobe drawn from the landscape", "The shape of a slower afternoon", "Objects that carry a little history"];
 const search = document.getElementById("search");
 if (search) {
  const query = document.getElementById("query"), results = document.getElementById("results"), status = document.getElementById("search-status");
  function render() {
   const matches = titles.filter(title => title.toLowerCase().includes(query.value.trim().toLowerCase()));
   results.replaceChildren();
   matches.forEach(title => { const li = document.createElement("li"), a = document.createElement("a"); li.dataset.section = "search-results"; li.dataset.component = "search-result"; a.href = "story.html"; a.textContent = title; if (title === titles[0]) { li.append(a); } else { const label = document.createElement("span"), note = document.createElement("p"); label.textContent = title; note.textContent = "Summary-only sample — no full article in this demo."; li.append(label); li.append(note); } results.append(li); });
   status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? "story" : "stories"} found` : "No stories found. Try rooms, landscape or history.";
  }
  search.addEventListener("submit", event => { event.preventDefault(); render(); });
  document.getElementById("clear-search").addEventListener("click", () => { query.value = ""; render(); query.focus(); });
 }
 const newsletter = document.getElementById("newsletter");
 if (newsletter) newsletter.addEventListener("submit", event => {
  event.preventDefault(); const email = document.getElementById("email"), status = document.getElementById("newsletter-status");
  if (!email.validity.valid) { email.setAttribute("aria-invalid", "true"); status.textContent = "Enter a valid email address, such as reader@example.com."; email.focus(); return; }
  email.removeAttribute("aria-invalid"); status.textContent = "Demo complete. Your email has not been stored or sent; no subscription was created."; newsletter.reset();
 });
 const image = document.getElementById("gallery-image");
 if (image) {
  let index = 0; const palettes = ["Clay and stone", "Slate and sea", "Ochre and earth", "Mauve and dusk"];
  function move(direction) { index = (index + direction + 4) % 4; image.src = `assets/study-${index + 1}.svg`; image.alt = `Garment and architectural opening: ${palettes[index]}`; document.getElementById("gallery-caption").textContent = `Study ${index + 1} of 4 — ${palettes[index]}`; document.getElementById("gallery-status").textContent = `Study ${index + 1} of 4`; }
  document.getElementById("previous").addEventListener("click", () => move(-1)); document.getElementById("next").addEventListener("click", () => move(1));
 }
})();
