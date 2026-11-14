"use strict";
(() => {
  const stories = [
    {title:"Six wardrobe ideas worth returning to", category:"Trends"},
    {title:"The quiet confidence of a beautifully cut coat", category:"Fashion"},
    {title:"A practical guide to finding your everyday bag", category:"Guides"},
    {title:"Soft layers, strong silhouettes", category:"Trends"},
    {title:"The art of dressing for an ordinary afternoon", category:"Fashion"},
    {title:"The considered knitwear checklist", category:"Guides"}
  ];
  const toggles = Array.from(document.querySelectorAll("[data-toggle]"));
  function close(button, returnFocus) {
    document.getElementById(button.dataset.toggle).hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (returnFocus) button.focus();
  }
  toggles.forEach(button => button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.toggle);
    const opening = panel.hidden;
    toggles.forEach(other => close(other, false));
    panel.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    if (opening && button.dataset.toggle === "search-panel") document.getElementById("search-input").focus();
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const open = toggles.find(button => button.getAttribute("aria-expanded") === "true");
      if (open) close(open, true);
      const share = document.getElementById("share-preview");
      if (share && !share.hidden) { share.hidden = true; const button = document.getElementById("share-button"); button.setAttribute("aria-expanded", "false"); button.focus(); }
    }
  });
  document.querySelectorAll("[data-edition]").forEach(button => button.addEventListener("click", () => {
    document.getElementById("edition-name").textContent = button.dataset.edition;
    close(toggles.find(item => item.dataset.toggle === "edition-panel"), true);
  }));
  const input = document.getElementById("search-input"), results = document.getElementById("search-results"), status = document.getElementById("search-status");
  function search() {
    const query = input.value.trim().toLowerCase();
    const matches = stories.filter(story => (story.title + " " + story.category).toLowerCase().includes(query));
    results.replaceChildren();
    matches.forEach(story => {
      const article = document.createElement("article");
      article.className = "search-result";
      article.dataset.section = "global-search"; article.dataset.component = "search-result";
      const heading = document.createElement("h3"), link = document.createElement("a"), category = document.createElement("p");
      link.href = "article.html"; link.textContent = "Read the representative story: Six wardrobe ideas worth returning to";
      link.dataset.section = "global-search"; link.dataset.component = "story-link";
      heading.textContent = story.title; category.textContent = story.category + " — summary-only sample";
      article.append(heading, category, link); results.append(article);
    });
    status.textContent = matches.length ? matches.length + " sample " + (matches.length === 1 ? "story" : "stories") + " found. All sample story links open the representative article." : "No sample stories found. Try coat, layers or guides.";
  }
  document.getElementById("search-form").addEventListener("submit", event => { event.preventDefault(); search(); });
  document.getElementById("clear-search").addEventListener("click", () => { input.value = ""; search(); input.focus(); });
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.setAttribute("aria-controls", "share-preview"); shareButton.setAttribute("aria-expanded", "false");
    shareButton.addEventListener("click", () => {
      const panel = document.getElementById("share-preview"); panel.hidden = !panel.hidden;
      shareButton.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) document.getElementById("share-text").focus();
    });
  }
})();
