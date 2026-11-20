"use strict";
(() => {
  document.documentElement.classList.add("js-ready");
  const menuButton = document.querySelector("#menu-button");
  const menu = document.querySelector("#menu");
  function closeMenus() {
    document.querySelectorAll("details[open]").forEach(item => { item.open = false; });
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open", !expanded);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const openDetails = document.querySelector("details[open]");
      if (openDetails) { openDetails.open = false; openDetails.querySelector("summary").focus(); }
      else if (menuButton.getAttribute("aria-expanded") === "true") { closeMenus(); menuButton.focus(); }
    }
  });
  const stories = [
    {title:"Clothes that gather memories", topic:"Clothing", text:"Cloth, care and a familiar coat.", image:"cloth", url:"story.html"},
    {title:"A considered layer", topic:"Clothing", text:"Loose shapes for the colder days.", image:"studio", url:null},
    {title:"A morning in the clay studio", topic:"Making", text:"Clay vessels and quiet workshop rituals.", image:"vessel", url:null},
    {title:"The rhythm of the loom", topic:"Making", text:"Threads, cloth and the pace of handwork.", image:"cloth", url:null},
    {title:"In the quiet of the season", topic:"Place", text:"A seasonal concept in earth tones.", image:"field", url:"seasonal-concept.html"},
    {title:"A walk before winter", topic:"Place", text:"Field notes from a changing landscape.", image:"field", url:null}
  ];
  const search = document.querySelector("#search-form");
  if (search) {
    const query = document.querySelector("#query"), results = document.querySelector("#search-results"), status = document.querySelector("#search-status");
    function renderSearch(value) {
      const term = value.trim().toLowerCase();
      const matches = stories.filter(story => (story.title + " " + story.topic + " " + story.text).toLowerCase().includes(term));
      results.replaceChildren();
      matches.forEach(story => {
        const article = document.createElement("article");
        article.className = "card";
        article.dataset.section = "search-results"; article.dataset.component = "story-card";
        const image = document.createElement("img"); image.src = "assets/" + story.image + ".svg"; image.alt = "Original illustration accompanying " + story.title; image.width = 1000; image.height = 1200;
        const topic = document.createElement("p"); topic.className = "eyebrow"; topic.textContent = story.topic;
        const heading = document.createElement("h2");
        if (story.url) { const link = document.createElement("a"); link.href = story.url; link.textContent = story.title; heading.append(link); }
        else { heading.textContent = story.title + " (summary-only sample)"; }
        const description = document.createElement("p"); description.textContent = story.text;
        article.append(image, topic, heading, description); results.append(article);
      });
      status.textContent = matches.length ? matches.length + " local stories" + (term ? " matching “" + value.trim() + "”." : ". Enter a word to narrow the list.") : "No local stories found. Try cloth, making or place.";
    }
    query.value = new URLSearchParams(window.location.search).get("q") || "";
    renderSearch(query.value);
    search.addEventListener("submit", event => { event.preventDefault(); renderSearch(query.value); });
  }
  document.querySelectorAll("form[data-demo]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const kind = form.dataset.demo;
      const status = form.querySelector("[role=status]");
      const fields = Array.from(form.querySelectorAll("input,textarea"));
      fields.forEach(field => { field.removeAttribute("aria-invalid"); });
      const invalid = fields.find(field => !field.value.trim() || (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())));
      if (invalid) {
        status.textContent = invalid.type === "email" ? "Enter a valid email address, such as name@example.com." : "Complete the " + invalid.name + " field.";
        invalid.setAttribute("aria-invalid", "true"); invalid.setAttribute("aria-describedby", status.id); invalid.focus(); return;
      }
      if (kind === "comment") {
        document.querySelector("#preview-name").textContent = "Demo preview by " + form.elements.name.value.trim();
        document.querySelector("#preview-text").textContent = form.elements.comment.value.trim();
        document.querySelector("#comment-preview").hidden = false;
        status.textContent = "Your demo comment is previewed below. Nothing has been published or saved.";
      } else { status.textContent = "Thank you. This is a demo confirmation; you have not been subscribed and no data was sent."; }
      status.focus();
    });
  });
})();
