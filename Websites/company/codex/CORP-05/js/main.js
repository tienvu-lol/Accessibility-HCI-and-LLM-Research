/* Local-only interaction layer. No network, credentials or persistent storage. */
(function () {
  'use strict';
  const locations = [
    {name:'Alder Bay Center', address:'12 Example Square, Alder Bay', hours:'Mon–Fri 9–5; Saturday 10–2', services:'Member service • ATM'},
    {name:'Cedar Hill Center', address:'45 Fiction Way, Cedar Hill', hours:'Mon–Fri 9–5', services:'Member service • ATM'},
    {name:'Harbor Walk ATM', address:'8 Sample Promenade, Harbor Walk', hours:'Daily 6–10', services:'ATM only'}
  ];
  function filterLocations(query) {
    const term = String(query).trim().toLowerCase();
    return locations.filter(item => Object.values(item).join(' ').toLowerCase().includes(term));
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {filterLocations};
  if (typeof document === 'undefined') return;
  document.body.classList.add('js-ready');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  function closeMenu(returnFocus) {
    nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open',open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(false); });
  const desktop = window.matchMedia('(min-width:761px)');
  desktop.addEventListener('change', () => closeMenu(false));
  const dialog = document.getElementById('demo-dialog'); let opener = null;
  document.querySelectorAll('[data-open-demo]').forEach(button => button.addEventListener('click', () => {
    opener = button; dialog.showModal(); dialog.querySelector('button').focus();
  }));
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  const form = document.getElementById('location-form');
  if (form) {
    const query = document.getElementById('location-query');
    const results = document.getElementById('location-results');
    const status = document.getElementById('location-status');
    function renderLocations() {
      const matches = filterLocations(query.value);
      results.replaceChildren();
      matches.forEach((item) => {
        const card = document.createElement('article'); card.className = 'card';
        card.dataset.section = 'location-' + item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
        card.dataset.component = 'feature-card';
        const title = document.createElement('h3'); title.textContent = item.name; card.append(title);
        [item.address,item.hours,item.services].forEach(text => { const p = document.createElement('p'); p.textContent = text; card.append(p); });
        results.append(card);
      });
      status.textContent = matches.length ? matches.length + ' demo location' + (matches.length === 1 ? '' : 's') + ' found.' : 'No demo locations match. Try Alder, ATM or Saturday, or choose Show all.';
    }
    form.addEventListener('submit', event => { event.preventDefault(); renderLocations(); });
    document.getElementById('reset-locations').addEventListener('click', () => { query.value = ''; renderLocations(); query.focus(); });
  }
}());
