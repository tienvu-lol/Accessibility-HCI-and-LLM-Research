/* No network calls, dependencies, persistent form storage, or backend. */
'use strict';
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  let toastTimer;
  function announce(message) {
    $('#toast').textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('#toast').textContent = ''; }, 5000);
  }
  const themeButton = $('#theme-toggle');
  function setTheme(light) {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    themeButton.textContent = light ? 'Dark theme' : 'Light theme';
    themeButton.setAttribute('aria-pressed', String(light));
  }
  themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme !== 'light'));
  $$('[data-copy-email]').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@rowan.example');
      announce('Example email copied: hello@rowan.example');
    } catch (_) {
      announce('Clipboard unavailable. Select and copy: hello@rowan.example');
    }
  }));
  function updateClock() {
    const time = new Intl.DateTimeFormat('en-US', {timeZone:'America/New_York',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date());
    $('#local-time').textContent = `New York · ${time}`;
  }
  updateClock(); setInterval(updateClock, 60000);
  // Escape and outside click dismiss the native details navigation.
  const menu = $('.more-menu');
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) { menu.open = false; $('summary', menu).focus(); }
  });
  document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
  if ('IntersectionObserver' in window) {
    const sections = $$('body[data-page="index"] main > section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.section-nav a').forEach(a => {
          if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current','location');
          else a.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-10% 0px -55% 0px'});
    sections.forEach(section => observer.observe(section));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('reveal-ready'); reveals.unobserve(entry.target); }
      }), {threshold:0.05});
      $$('.project-card,.experience,.writing-card').forEach(item => reveals.observe(item));
    }
  }
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let scheduled = false;
    document.addEventListener('pointermove', event => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
        scheduled = false;
      });
    }, {passive:true});
  }
  $$('[data-filter-for]').forEach(form => {
    const container = $(`[data-results="${form.dataset.filterFor}"]`);
    const items = $$('[data-search]', container);
    let category = 'All';
    function filter() {
      const query = $('input[type=search]', form).value.trim().toLowerCase();
      let count = 0;
      items.forEach(item => {
        const show = (category === 'All' || item.dataset.category === category) && item.dataset.search.includes(query);
        item.hidden = !show; if (show) count++;
      });
      $('.result-count', form).textContent = `${count} of ${items.length} ${form.dataset.filterFor} shown`;
      container.nextElementSibling.hidden = count !== 0;
    }
    form.addEventListener('submit', event => event.preventDefault());
    $('input', form).addEventListener('input', filter);
    $$('[data-filter]', form).forEach(button => button.addEventListener('click', () => {
      category = button.dataset.filter;
      $$('[data-filter]', form).forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      filter();
    }));
    filter();
  });
  // Validation uses native accessible constraint validation; all outcomes are local.
  const dateInput = $('#booking-date');
  function localISO(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  if (dateInput) {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
    dateInput.min = localISO(tomorrow);
    dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
  }
  $$('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const kind = form.dataset.demoForm;
      if (kind === 'booking') {
        dateInput.setCustomValidity('');
        const selected = new Date(`${dateInput.value}T12:00:00`);
        if (selected.getDay() === 0 || selected.getDay() === 6) dateInput.setCustomValidity('Choose a weekday for this demonstration.');
      }
      if (!form.reportValidity()) return;
      const status = $('.form-status', form);
      const messages = {
        inquiry:'Demo inquiry complete. Nothing was sent or saved. Thank you for trying the form.',
        newsletter:'Demo subscription complete. No email was sent or stored.',
        purchase:'Demo order complete. No payment was taken and no order was placed.',
        booking:`Demo booking selected: ${dateInput?.value || ''} at ${$('#booking-time')?.value || ''} New York time. No appointment was created.`
      };
      status.textContent = messages[kind];
      form.reset();
    });
  });
  $('#nda-form')?.addEventListener('submit', event => {
    event.preventDefault();
    if ($('#passcode').value === 'fieldnotes') {
      $('#nda-content').hidden = false;
      $('#nda-form').closest('.gate').hidden = true;
      const heading = $('#nda-content h2'); heading.tabIndex = -1; heading.focus();
      announce('Fictional case study revealed. This gate does not provide security.');
    } else { $('#nda-status').textContent = 'That is not the demo passcode. Enter fieldnotes.'; $('#passcode').focus(); }
  });
  $$('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  // Native dialogs trap focus and support Escape; return focus to their opener.
  let dialogOpener;
  function openDialog(dialog, opener) { dialogOpener = opener; dialog.showModal(); }
  $$('dialog').forEach(dialog => {
    $('[data-close-dialog]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialogOpener?.focus());
  });
  const gallery = $$('[data-lightbox]');
  let galleryIndex = 0;
  function showImage(index) {
    galleryIndex = (index + gallery.length) % gallery.length;
    const item = gallery[galleryIndex];
    $('#lightbox-image').src = item.dataset.lightbox;
    $('#lightbox-image').alt = item.dataset.caption;
    $('#lightbox-caption').textContent = `${galleryIndex+1} / ${gallery.length} — ${item.dataset.caption}`;
  }
  gallery.forEach((button,index) => button.addEventListener('click', () => { showImage(index); openDialog($('#lightbox'),button); }));
  $('#gallery-prev')?.addEventListener('click', () => showImage(galleryIndex-1));
  $('#gallery-next')?.addEventListener('click', () => showImage(galleryIndex+1));
  $('#lightbox')?.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(galleryIndex+1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(galleryIndex-1); }
  });
  $$('[data-buy]').forEach(button => button.addEventListener('click', () => {
    $('#purchase-name').textContent = button.dataset.buy;
    $('.form-status', $('#purchase-dialog')).textContent = '';
    openDialog($('#purchase-dialog'), button);
  }));
  const quotes = [
    ['“Rowan turns a complicated conversation into a clear next step.”','Morgan Lane · fictional design lead'],
    ['“The handoff explained why each pattern existed, not just how to use it.”','Alex Reed · fictional engineering lead'],
    ['“Keyboard interaction was part of the first prototype, which made every later decision easier.”','Sam Rivers · fictional product partner']
  ];
  let quoteIndex = 0;
  function quote(direction) {
    quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
    $('#quote-slide p').textContent = quotes[quoteIndex][0];
    $('#quote-slide cite').textContent = quotes[quoteIndex][1];
    $('#quote-count').textContent = `${quoteIndex+1} / ${quotes.length}`;
  }
  $('#quote-prev')?.addEventListener('click', () => quote(-1));
  $('#quote-next')?.addEventListener('click', () => quote(1));
})();
