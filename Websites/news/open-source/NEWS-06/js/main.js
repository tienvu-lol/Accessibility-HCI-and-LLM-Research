/* Sample data – inline JavaScript objects */
const homeArticles = [
  {
    title: "City Council Approves New Park",
    summary: "A new downtown park will open next summer, featuring green spaces and a community garden.",
    image: "assets/placeholder.svg",
    url: "#"
  },
  {
    title: "Tech Startup Raises $10M",
    summary: "Local startup launches AI platform to help small businesses automate workflows.",
    image: "assets/placeholder.svg",
    url: "#"
  },
  {
    title: "Health Officials Issue Flu Advisory",
    summary: "Seasonal flu cases rise; officials recommend vaccination for vulnerable groups.",
    image: "assets/placeholder.svg",
    url: "#"
  },
  {
    title: "Art Festival Draws Record Crowds",
    summary: "Annual arts festival showcases local talent and draws visitors from across the state.",
    image: "assets/placeholder.svg",
    url: "#"
  },
  {
    title: "New Restaurant Opens Downtown",
    summary: "Farm-to-table eatery offers seasonal menus sourced from regional farms.",
    image: "assets/placeholder.svg",
    url: "#"
  },
  {
    title: "University Announces Scholarship Program",
    summary: "Scholarships available for students pursuing STEM fields.",
    image: "assets/placeholder.svg",
    url: "#"
  }
];

const sectionArticles = {
  politics: [
    {title:"Mayor Announces Housing Initiative",summary:"Affordable housing plan unveiled.",image:"assets/placeholder.svg",url:"#"},
    {title:"State Senate Passes Education Bill",summary:"Funding increase for public schools.",image:"assets/placeholder.svg",url:"#"},
    {title:"Local Election Results",summary:"Voter turnout hits record high.",image:"assets/placeholder.svg",url:"#"},
    {title:"Policy Debate on Climate Action",summary:"Lawmakers discuss carbon targets.",image:"assets/placeholder.svg",url:"#"},
    {title:"Community Forum on Public Safety",summary:"Residents voice concerns.",image:"assets/placeholder.svg",url:"#"}
  ],
  business: [
    {title:"Company X Reports Quarterly Earnings",summary:"Revenue up 12% YoY.",image:"assets/placeholder.svg",url:"#"},
    {title:"Small Business Grants Available",summary:"Funding for local entrepreneurs.",image:"assets/placeholder.svg",url:"#"},
    {title:"Retail Sales Surge in Q3",summary:"Consumer spending rebounds.",image:"assets/placeholder.svg",url:"#"},
    {title:"Tech Merger Announced",summary:"Two firms combine forces.",image:"assets/placeholder.svg",url:"#"},
    {title:"Local Startup Wins Innovation Award",summary:"Recognized for AI solution.",image:"assets/placeholder.svg",url:"#"}
  ],
  technology: [
    {title:"New Smartphone Released",summary:"Features advanced camera system.",image:"assets/placeholder.svg",url:"#"},
    {title:"Cybersecurity Threats Rise",summary:"Experts warn of ransomware.",image:"assets/placeholder.svg",url:"#"},
    {title:"Breakthrough in Quantum Computing",summary:"Researchers achieve new milestone.",image:"assets/placeholder.svg",url:"#"},
    {title:"Open Source Project Gains Traction",summary:"Community contributions increase.",image:"assets/placeholder.svg",url:"#"},
    {title:"5G Network Expansion",summary:"Coverage extended to rural areas.",image:"assets/placeholder.svg",url:"#"}
  ],
  world: [
    {title:"International Summit on Climate",summary:"Leaders pledge emission cuts.",image:"assets/placeholder.svg",url:"#"},
    {title:"Trade Agreements Signed",summary:"New markets opened.",image:"assets/placeholder.svg",url:"#"},
    {title:"Global Health Initiative Launched",summary:"Vaccination campaigns worldwide.",image:"assets/placeholder.svg",url:"#"},
    {title:"Election Results Abroad",summary:"Power shift in neighboring country.",image:"assets/placeholder.svg",url:"#"},
    {title:"Cultural Festival Celebrated",summary:"Heritage showcased globally.",image:"assets/placeholder.svg",url:"#"}
  ],
  science: [
    {title:"Mars Rover Sends New Images",summary:"Surface exploration continues.",image:"assets/placeholder.svg",url:"#"},
    {title:"Medical Trial Shows Promise",summary:"New therapy for chronic disease.",image:"assets/placeholder.svg",url:"#"},
    {title:"Ocean Research Finds Plastic Hotspots",summary:"Efforts to clean up underway.",image:"assets/placeholder.svg",url:"#"},
    {title:"Physics Lab Discovers Particle",summary:"Potential breakthrough.",image:"assets/placeholder.svg",url:"#"},
    {title:"Genetics Study Reveals Ancestry Links",summary:"Population insights.",image:"assets/placeholder.svg",url:"#"}
  ],
  environment: [
    {title:"Wildfire Containment Achieved",summary:"Firefighters control blaze.",image:"assets/placeholder.svg",url:"#"},
    {title:"Renewable Energy Adoption Grows",summary:"Solar installations rise.",image:"assets/placeholder.svg",url:"#"},
    {title:"Water Conservation Campaign",summary:"Tips for households.",image:"assets/placeholder.svg",url:"#"},
    {title:"Endangered Species Recovery",summary:"Population rebounds.",image:"assets/placeholder.svg",url:"#"},
    {title:"Air Quality Improves Downtown",summary:"Pollution levels drop.",image:"assets/placeholder.svg",url:"#"}
  ],
  entertainment: [
    {title:"Film Festival Announces Winners",summary:"Top honors awarded.",image:"assets/placeholder.svg",url:"#"},
    {title:"Concert Series Returns",summary:"Live music events resume.",image:"assets/placeholder.svg",url:"#"},
    {title:"Theater Production Opens",summary:"New play debuts.",image:"assets/placeholder.svg",url:"#"},
    {title:"Art Exhibit Highlights Local Artists",summary:"Gallery opens.",image:"assets/placeholder.svg",url:"#"},
    {title:"Award Show Highlights",summary:"Highlights from ceremony.",image:"assets/placeholder.svg",url:"#"}
  ],
  food: [
    {title:"Farmers Market Opens Early",summary:"Fresh produce available.",image:"assets/placeholder.svg",url:"#"},
    {title:"Restaurant Review: Bistro Delight",summary:"Chef’s tasting menu praised.",image:"assets/placeholder.svg",url:"#"},
    {title:"Cooking Class Series Launched",summary:"Learn new techniques.",image:"assets/placeholder.svg",url:"#"},
    {title:"Food Safety Alert Issued",summary:"Recall of certain products.",image:"assets/placeholder.svg",url:"#"},
    {title:"Vegan Festival Celebrates Plant-Based Cuisine",summary:"Events and vendors.",image:"assets/placeholder.svg",url:"#"}
  ]
};

const mostRead = [
  {title:"Mayor Announces Housing Initiative",url:"#"},
  {title:"Company X Reports Quarterly Earnings",url:"#"},
  {title:"New Smartphone Released",url:"#"},
  {title:"International Summit on Climate",url:"#"}
];

/* Utility to render article cards */
function renderArticles(container, articles) {
  container.innerHTML = "";
  articles.forEach((a) => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.setAttribute("data-component","article-card");
    card.innerHTML = `
      <img src="${a.image}" alt="">
      <h3>${a.title}</h3>
      <p>${a.summary}</p>
      <a href="${a.url}">Read more</a>
    `;
    container.appendChild(card);
  });
}

/* Search functionality (client‑side) */
function initSearch() {
  const form = document.getElementById("search-form");
  if (!form) return;
  const input = form.querySelector('input[type="search"]');
  const resultsContainer = document.getElementById("search-results");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = `<p role="alert">Please enter a search term.</p>`;
      input.focus();
      return;
    }
    const matches = homeArticles.filter(a => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query));
    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p role="alert">No results found.</p>`;
    } else {
      renderArticles(resultsContainer, matches);
    }
  });
}

/* Newsletter simulation */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;
  const emailInput = form.querySelector('input[type="email"]');
  const messageDiv = document.getElementById("newsletter-message");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email || !email.includes("@")) {
      messageDiv.innerHTML = `<p role="alert">Please enter a valid email address.</p>`;
      emailInput.focus();
      return;
    }
    messageDiv.innerHTML = `<p>Thank you for subscribing!</p>`;
    form.reset();
  });
}

/* Initialization on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
  // Home page article list
  const homeList = document.getElementById("home-article-list");
  if (homeList) renderArticles(homeList, homeArticles);

  // Section pages – detect via body data-section
  const body = document.body;
  const section = body.getAttribute("data-section");
  if (section && section !== "home") {
    const list = document.getElementById("section-article-list");
    if (list && sectionArticles[section]) {
      renderArticles(list, sectionArticles[section]);
    }
  }

  // Sidebar most‑read
  const mostReadContainer = document.getElementById("most-read-list");
  if (mostReadContainer) {
    mostReadContainer.innerHTML = "";
    mostRead.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
      mostReadContainer.appendChild(li);
    });
  }

  initSearch();
  initNewsletter();
});
