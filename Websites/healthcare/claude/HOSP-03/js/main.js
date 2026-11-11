/* Larkspur Children's Hospital (fictional) - vanilla JS, inline demo data, no network. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- sample data (all fictional) ---------- */
  const SPECIALTIES = [
    ['Allergy & Immunology', 'Allergies, food allergy, asthma triggers and immune conditions.'],
    ['Behavioral Health', 'Support for anxiety, mood, attention and behavior concerns.'],
    ['Cardiology', 'Heart rhythm, heart defects and heart health.'],
    ['Dermatology', 'Skin, hair and nail conditions such as eczema.'],
    ['Developmental Pediatrics', 'Learning, speech, autism and developmental concerns.'],
    ['Endocrinology', 'Diabetes, growth and hormone conditions.'],
    ['Gastroenterology', 'Stomach, bowel and liver conditions.'],
    ['Neurology', 'Seizures, headaches and brain and nerve conditions.'],
    ['Oncology', 'Care for children with blood disorders and cancer.'],
    ['Ophthalmology', 'Eye care and vision problems.'],
    ['Orthopedics', 'Bones, joints, sports injuries and spine.'],
    ['Primary Care', 'Checkups, vaccines and everyday health for newborns to teens.'],
    ['Pulmonology', 'Asthma, cough and lung conditions.'],
    ['Sleep Medicine', 'Snoring, sleep apnea and sleep problems.'],
    ['Surgery', 'General and specialty surgery for infants and children.'],
    ['Urology', 'Kidney, bladder and urinary conditions.'],
  ];
  const LOCATIONS = [
    { id: 'main', name: 'Larkspur Main Campus', types: ['specialty', 'emergency', 'inpatient'], address: '100 Larkspur Way', city: 'Alderbrook', zip: '19101', phone: '(555) 010-0142', hours: 'Emergency department open 24 hours (sample)' },
    { id: 'northside', name: 'Northside Specialty Care Center', types: ['specialty', 'urgent'], address: '2200 Birch Lane', city: 'Fairhaven', zip: '19144', phone: '(555) 010-0150', hours: 'Mon-Fri 8 am-8 pm, Sat 9 am-3 pm (sample)' },
    { id: 'riverside', name: 'Riverside Primary Care', types: ['primary'], address: '48 River Street', city: 'Alderbrook', zip: '19104', phone: '(555) 010-0151', hours: 'Mon-Fri 8 am-5 pm (sample)' },
    { id: 'maplewood', name: 'Maplewood Pediatrics', types: ['primary'], address: '915 Maple Court', city: 'Maplewood', zip: '19027', phone: '(555) 010-0152', hours: 'Mon-Sat 8 am-6 pm (sample)' },
    { id: 'eastgate', name: 'Eastgate Urgent Care', types: ['urgent'], address: '7 Eastgate Plaza', city: 'Eastgate', zip: '19320', phone: '(555) 010-0153', hours: 'Daily 10 am-10 pm (sample)' },
    { id: 'harbor', name: 'Harbor Road Emergency Department', types: ['emergency'], address: '600 Harbor Road', city: 'Port Alder', zip: '19950', phone: '(555) 010-0154', hours: 'Open 24 hours (sample)' },
    { id: 'westfield', name: 'Westfield Specialty & Surgery Center', types: ['specialty'], address: '31 Orchard Drive', city: 'Westfield', zip: '19380', phone: '(555) 010-0155', hours: 'Mon-Fri 7 am-5 pm (sample)' },
    { id: 'cedar', name: 'Cedar Hill Inpatient Campus', types: ['inpatient'], address: '1400 Cedar Hill Road', city: 'Cedar Hill', zip: '19460', phone: '(555) 010-0156', hours: 'Visiting 9 am-8 pm (sample)' },
    { id: 'lakeview', name: 'Lakeview Urgent Care', types: ['urgent', 'primary'], address: '82 Lakeview Terrace', city: 'Fairhaven', zip: '19145', phone: '(555) 010-0157', hours: 'Daily 8 am-8 pm (sample)' },
  ];
  const TYPE_LABEL = { primary: 'Primary care', specialty: 'Specialty care', emergency: 'Emergency care', urgent: 'Urgent care', inpatient: 'Inpatient care' };
  const PROVIDERS = [
    { id: 'elena-marchetti', name: 'Elena Marchetti', cred: 'MD', specialty: 'Cardiology', locs: ['main', 'northside'], langs: ['English', 'Italian'], newPatients: true, tele: true, bio: 'Dr. Marchetti cares for children with heart rhythm problems and congenital heart conditions.', edu: 'Medical degree and pediatric residency (fictional institutions).' },
    { id: 'samuel-adeyemi', name: 'Samuel Adeyemi', cred: 'MD, PhD', specialty: 'Cardiology', locs: ['main'], langs: ['English', 'Yoruba'], newPatients: false, tele: true, bio: 'Dr. Adeyemi studies how the heart grows in babies and sees children who need advanced heart imaging.', edu: 'Medical and research degrees, cardiology fellowship (fictional institutions).' },
    { id: 'naomi-brightwell', name: 'Naomi Brightwell', cred: 'MD', specialty: 'Pulmonology', locs: ['main', 'northside'], langs: ['English', 'Spanish'], newPatients: true, tele: true, bio: 'Dr. Brightwell treats asthma, chronic cough and breathing problems in children of all ages.', edu: 'Medical degree and pulmonary fellowship (fictional institutions).' },
    { id: 'tomas-herrera', name: 'Tomas Herrera', cred: 'MD', specialty: 'Allergy & Immunology', locs: ['main', 'riverside'], langs: ['English', 'Spanish'], newPatients: true, tele: false, bio: 'Dr. Herrera helps families manage food allergy, eczema and allergic asthma.', edu: 'Medical degree and allergy fellowship (fictional institutions).' },
    { id: 'hana-takeda', name: 'Hana Takeda', cred: 'MD', specialty: 'Neurology', locs: ['main'], langs: ['English', 'Japanese'], newPatients: false, tele: true, bio: 'Dr. Takeda sees children with epilepsy, migraine and concussion.', edu: 'Medical degree and neurology residency (fictional institutions).' },
    { id: 'marcus-oyelaran', name: 'Marcus Oyelaran', cred: 'DO', specialty: 'Primary Care', locs: ['maplewood', 'riverside', 'northside'], langs: ['English'], newPatients: true, tele: true, bio: 'Dr. Oyelaran provides checkups, vaccines and care for common illnesses.', edu: 'Osteopathic medical degree and pediatric residency (fictional institutions).' },
    { id: 'lucia-fernandez', name: 'Lucia Fernandez', cred: 'MD', specialty: 'Primary Care', locs: ['maplewood'], langs: ['English', 'Spanish', 'Portuguese'], newPatients: true, tele: false, bio: 'Dr. Fernandez enjoys caring for newborns and supporting new parents.', edu: 'Medical degree and pediatric residency (fictional institutions).' },
    { id: 'priyanka-raman', name: 'Priyanka Raman', cred: 'MD', specialty: 'Endocrinology', locs: ['main', 'northside'], langs: ['English', 'Hindi', 'Tamil'], newPatients: true, tele: true, bio: 'Dr. Raman treats type 1 diabetes, thyroid conditions and growth concerns.', edu: 'Medical degree and endocrinology fellowship (fictional institutions).' },
    { id: 'jonas-albrecht', name: 'Jonas Albrecht', cred: 'MD', specialty: 'Gastroenterology', locs: ['main'], langs: ['English', 'German'], newPatients: false, tele: false, bio: 'Dr. Albrecht cares for children with celiac disease, reflux and bowel conditions.', edu: 'Medical degree and gastroenterology fellowship (fictional institutions).' },
    { id: 'grace-lindqvist', name: 'Grace Lindqvist', cred: 'MD', specialty: 'Orthopedics', locs: ['main', 'westfield'], langs: ['English', 'Swedish'], newPatients: true, tele: false, bio: 'Dr. Lindqvist treats fractures, scoliosis and sports injuries.', edu: 'Medical degree and orthopedic residency (fictional institutions).' },
    { id: 'daniel-nguyen', name: 'Daniel Nguyen', cred: 'MD', specialty: 'Oncology', locs: ['main'], langs: ['English', 'Vietnamese'], newPatients: false, tele: true, bio: 'Dr. Nguyen leads a team caring for children with blood disorders and leukemia.', edu: 'Medical degree and oncology fellowship (fictional institutions).' },
    { id: 'fatima-alsayed', name: 'Fatima Al-Sayed', cred: 'MD', specialty: 'Dermatology', locs: ['northside'], langs: ['English', 'Arabic'], newPatients: true, tele: true, bio: 'Dr. Al-Sayed treats eczema, birthmarks and other skin conditions.', edu: 'Medical degree and dermatology residency (fictional institutions).' },
    { id: 'owen-gallagher', name: 'Owen Gallagher', cred: 'PhD', specialty: 'Behavioral Health', locs: ['riverside'], langs: ['English'], newPatients: true, tele: true, bio: 'Dr. Gallagher is a psychologist who helps children with anxiety and attention concerns.', edu: 'Doctoral degree in clinical psychology (fictional institution).' },
    { id: 'meiling-chao', name: 'Mei-Ling Chao', cred: 'MD', specialty: 'Developmental Pediatrics', locs: ['main', 'riverside'], langs: ['English', 'Mandarin', 'Cantonese'], newPatients: true, tele: false, bio: 'Dr. Chao evaluates children with speech, learning and autism concerns.', edu: 'Medical degree and developmental fellowship (fictional institutions).' },
  ];
  const CONDITIONS = [
    ['Allergies', 'Sneezing, itchy eyes and rashes triggered by pollen, pets or foods.', 'Allergy & Immunology'],
    ['Anxiety', 'Worry or fear that gets in the way of school and play.', 'Behavioral Health'],
    ['Asthma', 'Swollen, narrowed airways that cause cough and wheezing.', 'Pulmonology', 'condition-asthma.html'],
    ['Attention-deficit/hyperactivity disorder (ADHD)', 'Trouble with focus, impulse control or high energy.', 'Behavioral Health'],
    ['Autism spectrum disorder', 'Differences in communication, play and sensory experience.', 'Developmental Pediatrics'],
    ['Celiac disease', 'An immune reaction to gluten that harms the gut.', 'Gastroenterology'],
    ['Childhood leukemia', 'Cancer of the blood-forming cells.', 'Oncology'],
    ['Concussion', 'A head injury that changes how the brain works for a time.', 'Neurology'],
    ['Congenital heart defects', 'Heart differences that are present at birth.', 'Cardiology'],
    ['Croup', 'A barking cough with noisy breathing, often from a virus.', 'Primary Care'],
    ['Ear infections', 'Pain and fluid behind the eardrum.', 'Primary Care'],
    ['Eczema', 'Dry, itchy, inflamed skin.', 'Dermatology'],
    ['Epilepsy', 'A brain condition that causes repeated seizures.', 'Neurology'],
    ['Food allergy', 'A harmful immune reaction to certain foods.', 'Allergy & Immunology'],
    ['Fractures', 'Broken bones from falls or sports.', 'Orthopedics'],
    ['Migraine', 'Strong, repeated headaches, sometimes with nausea.', 'Neurology'],
    ['Reflux', 'Stomach contents that flow back up.', 'Gastroenterology'],
    ['Scoliosis', 'A sideways curve of the spine.', 'Orthopedics'],
    ['Sleep apnea', 'Pauses in breathing during sleep.', 'Sleep Medicine'],
    ['Type 1 diabetes', 'A condition in which the body makes little or no insulin.', 'Endocrinology'],
  ];
  const PLANS = ['Evergreen Health Plan (sample)', 'Harborlight PPO (sample)', 'Northwind Family Coverage (sample)', 'Cedar State Medicaid managed care (sample)', 'Sunrise Children\'s Health Program (sample)', 'Bluebell Choice HMO (sample)', 'Pioneer Employer Plan (sample)', 'Meridian Marketplace Silver (sample)'];

  const locById = Object.fromEntries(LOCATIONS.map((l) => [l.id, l]));
  const languages = [...new Set(PROVIDERS.flatMap((p) => p.langs))].sort();

  /* ---------- notice bar + dialogs ---------- */
  $$('[data-dismiss-notice]').forEach((b) => b.addEventListener('click', () => b.closest('.notice-bar').remove()));
  $$('[data-open-dialog]').forEach((b) => {
    const d = document.getElementById(b.dataset.openDialog);
    b.addEventListener('click', () => d.showModal()); // native dialog: traps focus, Escape closes
    d.addEventListener('close', () => b.focus());
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    $$('[data-close-dialog]', d).forEach((c) => c.addEventListener('click', () => d.close()));
  });

  /* ---------- navigation: dropdowns, mega menu, mobile disclosure ---------- */
  const navToggle = $('.nav-toggle');
  const triggers = $$('.menu-trigger');
  const closeMenus = (except) => triggers.forEach((t) => {
    if (t === except) return;
    t.setAttribute('aria-expanded', 'false');
    document.getElementById(t.getAttribute('aria-controls')).hidden = true;
  });
  triggers.forEach((t) => t.addEventListener('click', () => {
    const open = t.getAttribute('aria-expanded') !== 'true';
    closeMenus(t);
    t.setAttribute('aria-expanded', String(open));
    document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
  }));
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
    if (!open) closeMenus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openTrigger = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
    if (openTrigger) { closeMenus(); openTrigger.setAttribute('aria-expanded', 'false'); openTrigger.focus(); return; }
    if (navToggle?.getAttribute('aria-expanded') === 'true') { navToggle.click(); navToggle.focus(); }
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.primary-nav, .nav-toggle')) closeMenus(); });
  $('.primary-nav')?.addEventListener('focusout', (e) => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) closeMenus(); });

  /* ---------- tabs (home finder) ---------- */
  $$('.tabs').forEach((tabs) => {
    const list = $$('[role=tab]', tabs);
    const select = (tab) => list.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    list.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: list.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        const target = list[(next + list.length) % list.length];
        select(target); target.focus();
      });
    });
  });

  /* ---------- accordions ---------- */
  $$('.accordion button[aria-controls]').forEach((b) => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
  }));

  /* ---------- populate selects ---------- */
  const optionSets = {
    specialties: () => SPECIALTIES.map(([n]) => [n, n]),
    locations: () => LOCATIONS.map((l) => [l.id, l.name]),
    languages: () => languages.map((l) => [l, l]),
  };
  $$('select[data-options]').forEach((sel) => {
    const first = sel.hasAttribute('data-required') ? 'Select one' : 'All';
    sel.innerHTML = `<option value="">${first}</option>` + optionSets[sel.dataset.options]().map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join('');
    const pre = params.get(sel.name);
    if (pre) sel.value = pre;
  });

  /* ---------- location rendering (finder + emergency page) ---------- */
  const locCard = (l) => `<li class="result-card" data-component="location-card"><h3>${esc(l.name)}</h3>
    <p>${esc(l.address)}, ${esc(l.city)} ${esc(l.zip)}</p>
    <p>Phone: <a href="tel:${l.phone.replace(/\D/g, '')}">${esc(l.phone)}</a></p><p>${esc(l.hours)}</p>
    <p><span class="tag">${l.types.map((t) => TYPE_LABEL[t]).join(', ')}</span></p></li>`;

  const locList = $('#location-results');
  if (locList) {
    const form = $('#location-form');
    const count = $('#location-count');
    const empty = $('#location-empty');
    const run = () => {
      const q = norm(form ? form.q.value.trim() : '');
      const type = form ? form.type.value : locList.dataset.presetType;
      const hits = LOCATIONS.filter((l) => (!type || l.types.includes(type)) && (!q || norm(`${l.name} ${l.city} ${l.zip} ${l.address}`).includes(q)));
      locList.innerHTML = hits.map(locCard).join('');
      if (empty) empty.hidden = hits.length > 0;
      if (count) count.textContent = `${hits.length} location${hits.length === 1 ? '' : 's'} found${type ? ' for ' + TYPE_LABEL[type].toLowerCase() : ''}.`;
      if (form) history.replaceState(null, '', `?${new URLSearchParams({ q: form.q.value.trim(), type })}`);
    };
    if (form) {
      form.q.value = params.get('q') || '';
      form.type.value = params.get('type') || '';
      form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
      form.type.addEventListener('change', run);
      $$('[data-reset-filters]').forEach((b) => b.addEventListener('click', () => { form.reset(); form.q.value = ''; form.type.value = ''; run(); form.q.focus(); }));
    }
    run();
  }

  /* ---------- doctor search ---------- */
  const doctorList = $('#doctor-results');
  if (doctorList) {
    const form = $('#doctor-form');
    const PAGE = 6;
    let shown = PAGE;
    form.q.value = params.get('q') || '';
    form.new.checked = params.get('new') === '1';
    form.tele.checked = params.get('tele') === '1';
    const sortSel = $('#sort');
    const more = $('#show-more');
    const lastName = (p) => p.name.split(' ').pop();
    const run = (resetPage = true) => {
      if (resetPage) shown = PAGE;
      const q = norm(form.q.value.trim());
      const hits = PROVIDERS.filter((p) =>
        (!form.specialty.value || p.specialty === form.specialty.value) &&
        (!form.location.value || p.locs.includes(form.location.value)) &&
        (!form.language.value || p.langs.includes(form.language.value)) &&
        (!form.new.checked || p.newPatients) && (!form.tele.checked || p.tele) &&
        (!q || norm(`${p.name} ${p.specialty} ${p.bio}`).includes(q)))
        .sort((a, b) => sortSel.value === 'specialty' ? a.specialty.localeCompare(b.specialty) || lastName(a).localeCompare(lastName(b)) : lastName(a).localeCompare(lastName(b)));
      doctorList.innerHTML = hits.slice(0, shown).map((p) => `<li class="result-card" data-component="provider-card"><img src="assets/provider.svg" alt="" width="64" height="64">
        <div><h3><a href="provider.html?id=${p.id}">Dr. ${esc(p.name)}, ${esc(p.cred)}</a></h3><p>${esc(p.specialty)}</p>
        <p>${p.locs.map((id) => esc(locById[id].name)).join('; ')}</p><p>Languages: ${esc(p.langs.join(', '))}</p>
        <p><span class="tag">${p.newPatients ? 'Accepting new patients' : 'Not accepting new patients'}</span>${p.tele ? ' <span class="tag">Video visits</span>' : ''}</p></div></li>`).join('');
      $('#doctor-empty').hidden = hits.length > 0;
      more.hidden = hits.length <= shown;
      $('#result-count').textContent = hits.length ? `Showing ${Math.min(shown, hits.length)} of ${hits.length} doctor${hits.length === 1 ? '' : 's'}.` : '0 doctors found.';
      const qs = new URLSearchParams();
      [['q', form.q.value.trim()], ['specialty', form.specialty.value], ['location', form.location.value], ['language', form.language.value], ['new', form.new.checked ? '1' : ''], ['tele', form.tele.checked ? '1' : '']].forEach(([k, v]) => v && qs.set(k, v));
      history.replaceState(null, '', `?${qs}`);
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
    [form.specialty, form.location, form.language, form.new, form.tele, sortSel].forEach((c) => c.addEventListener('change', () => run()));
    more.addEventListener('click', () => {
      const firstNew = doctorList.children.length;
      shown += PAGE; run(false);
      $('a', doctorList.children[firstNew])?.focus(); // keep focus on the first newly added result
    });
    $$('[data-reset-filters]').forEach((b) => b.addEventListener('click', () => {
      form.reset(); form.q.value = ''; [form.specialty, form.location, form.language].forEach((s) => { s.value = ''; }); run(); form.q.focus();
    }));
    run();
  }

  /* ---------- provider profile ---------- */
  const profile = $('#provider-root');
  if (profile) {
    const p = PROVIDERS.find((x) => x.id === params.get('id')) || (params.has('id') ? null : PROVIDERS[0]);
    const h1 = $('h1');
    if (!p) {
      h1.textContent = 'Doctor not found';
      document.title = "Doctor not found | Larkspur Children's Hospital";
      profile.innerHTML = '<div class="empty-state"><p>We could not find that doctor in this sample directory.</p><a class="btn" href="doctor-search.html">Back to doctor search</a></div>';
    } else {
      const title = `Dr. ${p.name}, ${p.cred}`;
      h1.textContent = title;
      document.title = `${title} | Larkspur Children's Hospital`;
      $('[data-component=breadcrumbs] [aria-current]').textContent = title;
      profile.innerHTML = `<div class="split"><div>
        <section aria-labelledby="prov-about" data-section="provider-about" data-component="content-section"><h2 id="prov-about">About</h2><p>${esc(p.bio)}</p>
          <p><span class="tag">${p.newPatients ? 'Accepting new patients' : 'Not accepting new patients'}</span>${p.tele ? ' <span class="tag">Video visits</span>' : ''}</p></section>
        <section aria-labelledby="prov-edu" data-section="provider-education" data-component="content-section"><h2 id="prov-edu">Education</h2><p>${esc(p.edu)}</p></section>
        <section aria-labelledby="prov-loc" data-section="provider-locations" data-component="location-list"><h2 id="prov-loc">Locations</h2><ul class="results">${p.locs.map((id) => locCard(locById[id])).join('')}</ul></section></div>
        <aside aria-labelledby="prov-side" data-section="provider-summary" data-component="side-panel"><img src="assets/provider.svg" alt="" width="120" height="120"><h2 id="prov-side">At a glance</h2>
          <dl><dt>Specialty</dt><dd>${esc(p.specialty)}</dd><dt>Languages</dt><dd>${esc(p.langs.join(', '))}</dd></dl>
          <a class="btn" href="appointment-scheduling.html?provider=${encodeURIComponent(title)}&amp;specialty=${encodeURIComponent(p.specialty)}">Request an appointment</a></aside></div>`;
    }
  }

  /* ---------- A-Z directories (specialties, conditions) ---------- */
  const dir = $('[data-component=az-directory]');
  if (dir) {
    const isSpec = dir.dataset.directory === 'specialties';
    const items = isSpec ? SPECIALTIES.map(([n, s]) => ({ name: n, text: s, spec: n })) : CONDITIONS.map(([n, s, sp, href]) => ({ name: n, text: s, spec: sp, href }));
    const input = $('#dir-q');
    let letter = '';
    input.value = params.get('q') || '';
    const letters = [...new Set(items.map((i) => i.name[0].toUpperCase()))].sort();
    const btnBox = $('#az-buttons');
    btnBox.innerHTML = ['', ...letters].map((l) => `<button type="button" class="az-btn" aria-pressed="${l === ''}" data-letter="${l}">${l || 'All'}</button>`).join('');
    const run = () => {
      const q = norm(input.value.trim());
      const hits = items.filter((i) => (!letter || i.name[0].toUpperCase() === letter) && (!q || norm(i.name + ' ' + i.text).includes(q)));
      $('#dir-list').innerHTML = hits.map((i) => `<li class="dir-item"><h3>${i.href ? `<a href="${i.href}">${esc(i.name)}</a>` : esc(i.name)}</h3><p>${esc(i.text)}</p>
        <p><a href="doctor-search.html?specialty=${encodeURIComponent(i.spec)}">Find a ${esc(i.spec)} doctor<span class="visually-hidden"> for ${esc(i.name)}</span></a></p></li>`).join('');
      $('#dir-empty').hidden = hits.length > 0;
      $('#dir-count').textContent = `${hits.length} ${isSpec ? 'specialt' + (hits.length === 1 ? 'y' : 'ies') : 'condition' + (hits.length === 1 ? '' : 's')} shown.`;
    };
    btnBox.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      letter = b.dataset.letter;
      $$('.az-btn', btnBox).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      run();
    });
    input.addEventListener('input', run);
    $('#dir-reset').addEventListener('click', () => {
      input.value = ''; letter = '';
      $$('.az-btn', btnBox).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.letter === '')));
      run(); input.focus();
    });
    run();
  }

  /* ---------- insurance plan filter ---------- */
  const planList = $('#plan-list');
  if (planList) {
    const input = $('#plan-q');
    const run = () => {
      const q = norm(input.value.trim());
      const hits = PLANS.filter((p) => norm(p).includes(q));
      planList.innerHTML = hits.map((p) => `<li>${esc(p)}</li>`).join('');
      $('#plan-empty').hidden = hits.length > 0;
      $('#plan-count').textContent = `${hits.length} plan${hits.length === 1 ? '' : 's'} listed.`;
    };
    input.addEventListener('input', run);
    run();
  }

  /* ---------- demo forms: validation, error summary, focus management ---------- */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const message = (el) => {
    const v = el.type === 'checkbox' ? el.checked : el.value.trim();
    if (!v) return el.dataset.required || '';
    switch (el.dataset.validate) {
      case 'email': return EMAIL.test(v) ? '' : 'Enter an email address like name@example.com.';
      case 'phone': return v.replace(/\D/g, '').length >= 10 ? '' : 'Enter a 10-digit phone number with area code.';
      case 'past-date': return !isNaN(new Date(v)) && new Date(v) <= new Date() ? '' : 'Enter a date of birth that is in the past.';
      case 'zip': return /^\d{5}$/.test(v) ? '' : 'Enter a 5-digit ZIP code.';
      case 'account': return /^\d{6,10}$/.test(v) ? '' : 'Enter the 6 to 10 digit account number from your statement.';
      default: return '';
    }
  };
  const setError = (el, msg) => {
    const err = document.getElementById(el.id ? el.id + '-error' : '');
    if (!err) return;
    err.textContent = msg; err.hidden = !msg;
    if (el.matches('fieldset')) return;
    el.setAttribute('aria-invalid', String(!!msg));
  };
  $$('form[data-demo-form]').forEach((form) => {
    const sum = document.getElementById(form.dataset.summary);
    const ok = document.getElementById(form.dataset.successId);
    ['provider', 'specialty'].forEach((k) => { if (form.elements[k] && params.get(k)) form.elements[k].value = params.get(k); });
    const groups = $$('fieldset[data-required-group]', form);
    const groupMessage = (g) => ($('input:checked', g) ? '' : g.dataset.requiredGroup);
    const setGroupError = (g, msg) => { const e = $('.field-error', g); e.textContent = msg; e.hidden = !msg; };
    const fields = $$('[data-required], [data-validate]', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const problems = [];
      fields.forEach((f) => { const m = message(f); setError(f, m); if (m) problems.push([f, m, f.id]); });
      groups.forEach((g) => { const m = groupMessage(g); setGroupError(g, m); if (m) problems.push([$('input', g), m, $('input', g).id || g.querySelector('input').name]); });
      ok.hidden = true;
      if (problems.length) {
        $('ul', sum).innerHTML = problems.map(([f, m]) => { f.id ||= 'grp-' + f.name; return `<li><a href="#${f.id}">${esc(m)}</a></li>`; }).join('');
        sum.hidden = false; sum.focus();
        return;
      }
      sum.hidden = true; form.hidden = true; ok.hidden = false; ok.focus();
    });
    $('ul', sum).addEventListener('click', (e) => {
      const a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus();
    });
    const live = (e) => { const f = e.target; if (f.matches('[data-required], [data-validate]') && f.getAttribute('aria-invalid') === 'true') setError(f, message(f)); };
    form.addEventListener('input', live);
    form.addEventListener('change', (e) => { live(e); const g = e.target.closest('fieldset[data-required-group]'); if (g) setGroupError(g, groupMessage(g)); });
  });
})();
