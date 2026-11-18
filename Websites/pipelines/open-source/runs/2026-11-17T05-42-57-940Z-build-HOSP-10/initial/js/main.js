/* Sample datasets – embedded for demo purposes */
const doctors = [
  { name: "Dr. Alice Smith", specialty: "Cardiology", location: "Springfield", img: "assets/doctor1.svg" },
  { name: "Dr. Bob Jones", specialty: "Neurology", location: "Rivertown", img: "assets/doctor2.svg" },
  { name: "Dr. Carol Lee", specialty: "Oncology", location: "Lakeside", img: "assets/doctor3.svg" },
  { name: "Dr. David Patel", specialty: "Pediatrics", location: "Hillview", img: "assets/doctor4.svg" },
  { name: "Dr. Eva Gomez", specialty: "Dermatology", location: "Greenville", img: "assets/doctor5.svg" }
];

const locations = [
  { name: "Main Campus", city: "Springfield", state: "IL", img: "assets/location1.svg" },
  { name: "North Clinic", city: "Rivertown", state: "IL", img: "assets/location2.svg" },
  { name: "East Center", city: "Lakeside", state: "IL", img: "assets/location3.svg" },
  { name: "South Hospital", city: "Hillview", state: "IL", img: "assets/location4.svg" },
  { name: "West Outpatient", city: "Greenville", state: "IL", img: "assets/location5.svg" }
];

const diseases = [
  { name: "Asthma", desc: "Chronic airway inflammation.", icon: "assets/disease1.svg" },
  { name: "Diabetes", desc: "Metabolic disorder affecting blood sugar.", icon: "assets/disease2.svg" },
  { name: "Hypertension", desc: "High blood pressure.", icon: "assets/disease3.svg" },
  { name: "Migraine", desc: "Recurrent headaches.", icon: "assets/disease4.svg" },
  { name: "Arthritis", desc: "Joint inflammation.", icon: "assets/disease5.svg" },
  { name: "Depression", desc: "Mood disorder.", icon: "assets/disease6.svg" }
];

/* Utility: render a list of cards */
function renderCards(containerId, items, cardRenderer) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = cardRenderer(item);
    container.appendChild(card);
  });
}

/* Doctor card renderer */
function doctorCard(item) {
  return `
    <img src="${item.img}" alt="Portrait of ${item.name}" />
    <h3>${item.name}</h3>
    <p><strong>Specialty:</strong> ${item.specialty}</p>
    <p><strong>Location:</strong> ${item.location}</p>
  `;
}

/* Location card renderer */
function locationCard(item) {
  return `
    <img src="${item.img}" alt="Map placeholder for ${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.city}, ${item.state}</p>
  `;
}

/* Disease card renderer */
function diseaseCard(item) {
  return `
    <img src="${item.icon}" alt="${item.name} icon" />
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
  `;
}

/* Filter logic for doctors */
function filterDoctors() {
  const specialty = document.getElementById("filter-specialty").value.toLowerCase();
  const location = document.getElementById("filter-location").value.toLowerCase();
  const filtered = doctors.filter(d =>
    (specialty === "" || d.specialty.toLowerCase().includes(specialty)) &&
    (location === "" || d.location.toLowerCase().includes(location))
  );
  renderCards("doctor-card-grid", filtered, doctorCard);
}

/* Filter logic for locations */
function filterLocations() {
  const city = document.getElementById("filter-city").value.toLowerCase();
  const filtered = locations.filter(l =>
    city === "" || l.city.toLowerCase().includes(city)
  );
  renderCards("location-card-grid", filtered, locationCard);
}

/* Appointment form validation */
function validateAppointment(event) {
  event.preventDefault();
  const form = event.target;
  const errors = [];
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const date = form.elements["date"].value;

  if (name === "") errors.push("Name is required.");
  if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("A valid email address is required.");
  if (date === "") errors.push("Preferred date is required.");

  const summary = document.getElementById("error-summary");
  summary.innerHTML = "";
  if (errors.length > 0) {
    const ul = document.createElement("ul");
    errors.forEach(msg => {
      const li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    });
    summary.appendChild(ul);
    summary.focus();
    // Move focus to first invalid field
    if (name === "") form.elements["name"].focus();
    else if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      form.elements["email"].focus();
    else form.elements["date"].focus();
  } else {
    alert("Demo submission successful. (No real appointment created.)");
    form.reset();
  }
}

/* Initialization on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
  // Render initial grids
  if (document.getElementById("doctor-card-grid")) {
    renderCards("doctor-card-grid", doctors, doctorCard);
  }
  if (document.getElementById("location-card-grid")) {
    renderCards("location-card-grid", locations, locationCard);
  }
  if (document.getElementById("disease-card-grid")) {
    renderCards("disease-card-grid", diseases, diseaseCard);
  }

  // Attach filter listeners
  const specFilter = document.getElementById("filter-specialty");
  const locFilter = document.getElementById("filter-location");
  if (specFilter) specFilter.addEventListener("input", filterDoctors);
  if (locFilter) locFilter.addEventListener("input", filterDoctors);

  const cityFilter = document.getElementById("filter-city");
  if (cityFilter) cityFilter.addEventListener("input", filterLocations);

  // Attach form validation
  const apptForm = document.getElementById("appointment-form");
  if (apptForm) apptForm.addEventListener("submit", validateAppointment);
});
