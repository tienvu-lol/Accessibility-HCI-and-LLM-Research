/* Shared JavaScript for Rivergate University replica */

/* Navigation toggle for responsive menu */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-component="primary-nav"]');
  const toggleBtn = document.querySelector('[data-component="primary-nav"] .menu-toggle');

  if (nav && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  /* Directory search */
  const dirForm = document.getElementById('directory-search-form');
  if (dirForm) {
    dirForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = dirForm.elements['search'].value.trim().toLowerCase();
      const resultsContainer = document.getElementById('directory-results');
      const errorSummary = document.getElementById('directory-error-summary');
      resultsContainer.innerHTML = '';
      errorSummary.textContent = '';

      if (!query) {
        errorSummary.textContent = 'Please enter a name to search.';
        dirForm.elements['search'].focus();
        return;
      }

      const matches = directoryData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = '<p>No matching staff found.</p>';
        return;
      }

      const list = document.createElement('ul');
      matches.forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.name} – ${person.title}, ${person.department}`;
        list.appendChild(li);
      });
      resultsContainer.appendChild(list);
    });
  }

  /* Events filtering */
  const eventsForm = document.getElementById('events-filter-form');
  if (eventsForm) {
    const typeSelect = eventsForm.elements['type'];
    const monthSelect = eventsForm.elements['month'];
    const resultsContainer = document.getElementById('events-results');

    const render = () => {
      const type = typeSelect.value;
      const month = monthSelect.value;
      const filtered = eventsData.filter(ev => {
        const typeMatch = type === '' || ev.type === type;
        const monthMatch = month === '' || ev.month === month;
        return typeMatch && monthMatch;
      });

      resultsContainer.innerHTML = '';
      if (filtered.length === 0) {
        resultsContainer.textContent = 'No events match the selected criteria.';
        return;
      }
      const grid = document.createElement('div');
      grid.setAttribute('data-component', 'card-grid');
      filtered.forEach(ev => {
        const card = document.createElement('div');
        card.setAttribute('data-component', 'card');
        card.innerHTML = `<h3>${ev.title}</h3><p>${ev.date} – ${ev.type}</p><p>${ev.description}</p>`;
        grid.appendChild(card);
      });
      resultsContainer.appendChild(grid);
    };

    eventsForm.addEventListener('change', render);
    // Initial render
    render();
  }
});

/* Inline sample datasets */
const directoryData = [
  { name: "Dr. Alice Monroe", title: "Professor of Physics", department: "Physics" },
  { name: "John Patel", title: "Admissions Officer", department: "Admissions" },
  { name: "Maria Gomez", title: "Director of Student Affairs", department: "Student Affairs" },
  { name: "Liu Wei", title: "Research Associate", department: "Chemistry" },
  { name: "Sofia Rossi", title: "Campus Librarian", department: "Library" },
  { name: "Carlos Mendes", title: "IT Support Specialist", department: "IT Services" },
  { name: "Emily Clark", title: "Financial Aid Advisor", department: "Financial Aid" },
  { name: "Rajesh Singh", title: "Dean of Engineering", department: "Engineering" },
  { name: "Nina Patel", title: "Graduate Coordinator", department: "Graduate Studies" },
  { name: "Tomás Alvarez", title: "Facilities Manager", department: "Facilities" },
  { name: "Olivia Brown", title: "Communications Officer", department: "Communications" },
  { name: "Haruto Tanaka", title: "Research Lab Technician", department: "Biology" }
];

const eventsData = [
  { title: "Open House", date: "2024-09-15", type: "Campus Tour", month: "September", description: "Explore campus with faculty and current students." },
  { title: "Science Symposium", date: "2024-10-05", type: "Academic", month: "October", description: "Presentations from leading researchers." },
  { title: "Alumni Reunion", date: "2024-11-20", type: "Social", month: "November", description: "Reconnect with fellow alumni." },
  { title: "Winter Concert", date: "2024-12-10", type: "Arts", month: "December", description: "Student orchestra performance." },
  { title: "Career Fair", date: "2025-01-12", type: "Career", month: "January", description: "Meet potential employers." },
  { title: "Spring Hackathon", date: "2025-03-03", type: "Tech", month: "March", description: "24‑hour coding challenge." },
  { title: "Environmental Forum", date: "2025-04-22", type: "Academic", month: "April", description: "Discussions on sustainability." },
  { title: "Graduation Ceremony", date: "2025-05-30", type: "Ceremony", month: "May", description: "Commencement for the class of 2025." }
];
