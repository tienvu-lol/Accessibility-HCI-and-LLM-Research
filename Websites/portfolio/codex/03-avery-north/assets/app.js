/* Independent static portfolio enhancements. All demonstration state is page-local. */
'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let toastTimer;
  function notify(message) {
    $('#toast').textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('#toast').textContent = ''; }, 6000);
  }
  // Submit controls are initially disabled in HTML: no-JS pages cannot submit data.
  $$('form button[type="submit"]').forEach(button => { button.disabled = false; });
  const themeButton = $('[data-theme]');
  themeButton.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
  });
  function clock() {
    $$('[data-clock]').forEach(el => {
      const zone = el.dataset.timezone;
      const value = new Intl.DateTimeFormat('en-US', {timeZone:zone,hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date());
      el.textContent = `${zone === 'Australia/Sydney' ? 'Sydney' : 'Montana'} · ${value}`;
      el.dateTime = new Date().toISOString();
    });
  }
  clock(); setInterval(clock, 60000);
  $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(button.dataset.copy);
      notify(`Copied: ${button.dataset.copy}`);
    } catch (_) { notify(`Select and copy this example address: ${button.dataset.copy}`); }
  }));
  const mobileButton = $('.mobile-toggle');
  const nav = $('#primary-nav');
  const mobileQuery = matchMedia('(max-width: 760px)');
  function menuLayout() {
    mobileButton.hidden = !mobileQuery.matches;
    nav.hidden = mobileQuery.matches;
    mobileButton.setAttribute('aria-expanded','false');
  }
  menuLayout(); mobileQuery.addEventListener('change', menuLayout);
  mobileButton.addEventListener('click', () => {
    nav.hidden = !nav.hidden;
    mobileButton.setAttribute('aria-expanded', String(!nav.hidden));
    if (nav.hidden) $$('.nav-more[open]', nav).forEach(detail => { detail.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openMenu = $('.site-header .nav-more[open]');
    if (openMenu) { openMenu.open = false; $('summary',openMenu).focus(); }
    else if (mobileQuery.matches && !nav.hidden) {
      nav.hidden = true; mobileButton.setAttribute('aria-expanded','false'); mobileButton.focus();
    }
  });
  document.addEventListener('click', event => {
    $$('.nav-more[open]').forEach(detail => { if (!detail.contains(event.target)) detail.open = false; });
  });
  $$('[data-filter-panel]').forEach(form => {
    const results = $('[data-filter-results]');
    const items = $$('[data-search]',results);
    const input = $('input[type="search"]',form);
    let category = 'All';
    function filter() {
      const query = input.value.trim().toLocaleLowerCase();
      let count = 0;
      items.forEach(item => {
        const visible = (category === 'All' || item.dataset.category === category) && item.dataset.search.includes(query);
        item.hidden = !visible;
        if (visible) count++;
      });
      $('.result-count',form).textContent = `${count} of ${items.length} results shown`;
      $('[data-empty]').hidden = count !== 0;
    }
    form.addEventListener('submit', event => event.preventDefault());
    input.addEventListener('input',filter);
    $$('[data-filter]',form).forEach(button => button.addEventListener('click', () => {
      category = button.dataset.filter;
      $$('[data-filter]',form).forEach(other => other.setAttribute('aria-pressed',String(other === button)));
      filter();
    }));
    filter();
  });
  function dateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  $$('[data-future-date]').forEach(input => {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
    input.min = dateString(tomorrow);
    input.addEventListener('input', () => input.setCustomValidity(''));
  });
  $$('form[data-demo]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const kind = form.dataset.demo;
      const fields = new FormData(form);
      if (kind === 'booking') {
        const input = $('[data-future-date]',form);
        input.setCustomValidity('');
        const selected = new Date(`${input.value}T12:00:00`);
        if ([0,6].includes(selected.getDay())) input.setCustomValidity('Choose a future weekday, Monday through Friday.');
      }
      if (!form.reportValidity()) return;
      let message = '';
      if (kind === 'inquiry') message = 'Demo inquiry complete. Nothing was sent or saved; this is a local success state.';
      if (kind === 'newsletter') message = 'Demo subscription complete. No email was sent, stored, or subscribed.';
      if (kind === 'booking') message = `Demo slot: ${fields.get('date')} at ${fields.get('slot')} studio time. No appointment was created.`;
      if (kind === 'purchase') message = `Demo order complete: ${$('#order-item').textContent}, ${fields.get('format')}. No charge, delivery, or real order.`;
      $('.form-status',form).textContent = message;
      form.reset();
      if (kind === 'purchase') updatePrice();
    });
  });
  $('[data-nda]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if ($('input',form).value.trim() !== 'openstudio') {
      $('.form-status',form).textContent = 'Use the demo passcode openstudio. This gate does not secure content.';
      $('input',form).focus(); return;
    }
    const content = $('[data-nda-content]'); content.hidden = false;
    $('.nda-gate').hidden = true;
    const heading = $('h2',content); heading.tabIndex = -1; heading.focus();
    notify('Fictional notes revealed. This is a demonstration gate, not authentication.');
  });
  $$('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  const openers = new WeakMap();
  function showDialog(dialog, opener) {
    if (typeof dialog.showModal !== 'function') { notify('Your browser does not support this dialog. Please use a current browser.'); return; }
    openers.set(dialog,opener); dialog.showModal();
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]',dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => openers.get(dialog)?.focus());
  });
  let activeImages = [], activeIndex = 0;
  function displayImage(index) {
    if (!activeImages.length) return;
    activeIndex = (index + activeImages.length) % activeImages.length;
    const button = activeImages[activeIndex];
    $('#viewer-image').src = button.dataset.image;
    $('#viewer-image').alt = button.dataset.caption;
    $('#image-caption').textContent = button.dataset.caption;
    $('#image-count').textContent = `${activeIndex+1} / ${activeImages.length}`;
  }
  $$('[data-image]').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('[data-component="masonry-gallery"]') || document;
    activeImages = $$('[data-image]',group);
    displayImage(activeImages.indexOf(button));
    showDialog($('#image-dialog'),button);
  }));
  $('[data-gallery-prev]').addEventListener('click', () => displayImage(activeIndex-1));
  $('[data-gallery-next]').addEventListener('click', () => displayImage(activeIndex+1));
  $('#image-dialog').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); displayImage(activeIndex-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); displayImage(activeIndex+1); }
  });
  function updatePrice() {
    const prices = {'Digital study':20,'A4 print':35,'A3 print':60};
    $('[data-order-total]').textContent = `Demo total: $${prices[$('#order-format').value]}`;
  }
  $('#order-format').addEventListener('change',updatePrice);
  $$('[data-buy]').forEach(button => button.addEventListener('click', () => {
    const dialog = $('#order-dialog');
    $('form',dialog).reset(); $('.form-status',dialog).textContent = '';
    $('#order-item').textContent = button.dataset.buy; updatePrice();
    showDialog(dialog,button);
  }));
  $$('.testimonials').forEach(slider => {
    const quotes = $$('[data-quote]',slider); let index = 0;
    function move(direction) {
      index = (index+direction+quotes.length) % quotes.length;
      quotes.forEach((quote,i) => { quote.hidden = i !== index; });
      $('[data-quote-count]',slider).textContent = `${index+1} / ${quotes.length}`;
    }
    $('[data-quote-prev]',slider).addEventListener('click', () => move(-1));
    $('[data-quote-next]',slider).addEventListener('click', () => move(1));
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal-arrived'); observer.unobserve(entry.target); }
    }), {threshold:.06});
    $$('.work-card,.photo-work-card,.journal-card,.resource-card').forEach(item => observer.observe(item));
  }
})();
