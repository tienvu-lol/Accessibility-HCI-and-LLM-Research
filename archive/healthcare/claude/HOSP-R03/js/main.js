/* Larkspur Children's Hospital - fictional replica. Vanilla JS, inline data, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Inline sample data (all invented) ---------- */
  var SPECIALTIES = ['Allergy and Immunology','Cardiology','Dermatology','Developmental Pediatrics','Endocrinology','Gastroenterology','Neurology','Ophthalmology','Orthopedics','Otolaryngology (ENT)','Pulmonology','Nephrology','Psychology','Urology'];
  var LANGS = ['English','Spanish','Mandarin','Arabic','Hindi'];
  var LOCATIONS = [
    {id:'l01',name:'Larkspur Main Campus',type:'Inpatient',types:['Inpatient','Emergency','Specialty'],addr:'100 Example Way, Larkspur Heights, ZZ 00001',phone:'555-0100',hours:'Hospital open all day, every day (illustrative)'},
    {id:'l02',name:'Larkspur North Campus',type:'Inpatient',types:['Inpatient','Specialty'],addr:'250 Sample Road, North Larkspur, ZZ 00002',phone:'555-0111',hours:'Weekdays, clinic hours vary (illustrative)'},
    {id:'l03',name:'Riverside Primary Care',type:'Primary',types:['Primary'],addr:'12 Riverbend Lane, Larkspur Heights, ZZ 00001',phone:'555-0121',hours:'Weekdays, daytime (illustrative)'},
    {id:'l04',name:'Maple Grove Primary Care',type:'Primary',types:['Primary'],addr:'48 Maple Grove Court, Maple Grove, ZZ 00003',phone:'555-0122',hours:'Weekdays, daytime (illustrative)'},
    {id:'l05',name:'Eastgate Specialty Care Center',type:'Specialty',types:['Specialty'],addr:'7 Eastgate Plaza, Eastgate, ZZ 00004',phone:'555-0131',hours:'Weekdays, daytime (illustrative)'},
    {id:'l06',name:'Westfield Specialty Care Center',type:'Specialty',types:['Specialty'],addr:'330 Westfield Parkway, Westfield, ZZ 00005',phone:'555-0132',hours:'Weekdays, daytime (illustrative)'},
    {id:'l07',name:'Hillcrest Urgent Care',type:'Urgent',types:['Urgent'],addr:'91 Hillcrest Drive, Hillcrest, ZZ 00006',phone:'555-0141',hours:'Extended hours (illustrative)'},
    {id:'l08',name:'Harbor Urgent Care',type:'Urgent',types:['Urgent'],addr:'5 Harbor Street, Harbor Point, ZZ 00007',phone:'555-0142',hours:'Extended hours (illustrative)'},
    {id:'l09',name:'Valley Emergency Care Center',type:'Emergency',types:['Emergency'],addr:'600 Valley Boulevard, Valley Falls, ZZ 00008',phone:'555-0151',hours:'Open all day, every day (illustrative)'},
    {id:'l10',name:'Pinecrest Community Hospital (affiliate)',type:'Affiliate',types:['Affiliate'],addr:'18 Pinecrest Avenue, Pinecrest, ZZ 00009',phone:'555-0161',hours:'See affiliate (illustrative)'}
  ];
  var LOC_TYPES = ['Primary','Specialty','Emergency','Urgent','Inpatient','Affiliate'];
  var D = function (id, name, spec, loc, lang, accepting, title, bio, edu) { return {id:id,name:name,specialty:spec,locations:loc,languages:lang,accepting:accepting,title:title,bio:bio,training:edu}; };
  var DOCTORS = [
    D('d01','Amara Okonkwo-Reyes, MD','Cardiology',['l01','l05'],['English','Spanish'],true,'Division of Cardiology','Dr. Okonkwo-Reyes is a fictional profile used for this layout study. Her listed interests are invented placeholders.','Fictional Medical School; Fictional Training Program'),
    D('d02','Basil Thornfield, MD, PhD','Cardiology',['l01'],['English'],false,'Division of Cardiology','A fictional profile with placeholder text only.','Imaginary University School of Medicine'),
    D('d03','Chiara Delmonico, MD','Cardiology',['l02','l06'],['English','Mandarin'],true,'Division of Cardiology','A fictional profile with placeholder text only.','Sample College of Medicine'),
    D('d04','Devraj Nambiar, MD','Neurology',['l01','l06'],['English','Hindi'],true,'Division of Neurology','A fictional profile with placeholder text only.','Example Institute of Medicine'),
    D('d05','Elspeth Marlowe, MD','Neurology',['l02'],['English'],true,'Division of Neurology','A fictional profile with placeholder text only.','Placeholder University'),
    D('d06','Farid Haddad, MD','Orthopedics',['l01','l05'],['English','Arabic'],true,'Division of Orthopedics','A fictional profile with placeholder text only.','Imaginary University School of Medicine'),
    D('d07','Greta Lindqvist, MD','Orthopedics',['l06'],['English'],false,'Division of Orthopedics','A fictional profile with placeholder text only.','Sample College of Medicine'),
    D('d08','Hector Villanueva, MD','Pulmonology',['l01','l03'],['English','Spanish'],true,'Division of Pulmonology','A fictional profile with placeholder text only.','Fictional Medical School'),
    D('d09','Ines Karlsson, MD, MPH','Pulmonology',['l02','l04'],['English'],true,'Division of Pulmonology','A fictional profile with placeholder text only.','Example Institute of Medicine'),
    D('d10','Jun-ho Park, MD','Gastroenterology',['l01','l05'],['English'],true,'Division of Gastroenterology','A fictional profile with placeholder text only.','Placeholder University'),
    D('d11','Katarzyna Wolny, MD','Gastroenterology',['l06'],['English'],false,'Division of Gastroenterology','A fictional profile with placeholder text only.','Sample College of Medicine'),
    D('d12','Lamar Whitfield, MD','Endocrinology',['l01','l04'],['English'],true,'Division of Endocrinology','A fictional profile with placeholder text only.','Imaginary University School of Medicine'),
    D('d13','Mireille Fontaine, MD','Allergy and Immunology',['l03','l05'],['English'],true,'Division of Allergy and Immunology','A fictional profile with placeholder text only.','Fictional Medical School'),
    D('d14','Nikolai Brandt, MD','Allergy and Immunology',['l02'],['English'],true,'Division of Allergy and Immunology','A fictional profile with placeholder text only.','Example Institute of Medicine'),
    D('d15','Oluwaseun Adebayo, MD','Dermatology',['l04','l06'],['English'],true,'Division of Dermatology','A fictional profile with placeholder text only.','Placeholder University'),
    D('d16','Priya Raghunathan, MD','Developmental Pediatrics',['l03'],['English','Hindi'],true,'Division of Developmental Pediatrics','A fictional profile with placeholder text only.','Sample College of Medicine'),
    D('d17','Quentin Abernathy, MD','Ophthalmology',['l05'],['English'],false,'Division of Ophthalmology','A fictional profile with placeholder text only.','Imaginary University School of Medicine'),
    D('d18','Rosalind Teague, MD','Otolaryngology (ENT)',['l01','l06'],['English','Spanish'],true,'Division of Otolaryngology','A fictional profile with placeholder text only.','Fictional Medical School'),
    D('d19','Soren Halvorsen, MD','Nephrology',['l01'],['English'],true,'Division of Nephrology','A fictional profile with placeholder text only.','Example Institute of Medicine'),
    D('d20','Tamsin Oyelaran, PhD','Psychology',['l03','l04'],['English'],true,'Department of Psychology','A fictional profile with placeholder text only.','Placeholder University'),
    D('d21','Umberto Castellano, MD','Urology',['l02'],['English'],true,'Division of Urology','A fictional profile with placeholder text only.','Sample College of Medicine'),
    D('d22','Valentina Cruz, MD','Neurology',['l05'],['English','Spanish'],false,'Division of Neurology','A fictional profile with placeholder text only.','Fictional Medical School'),
    D('d23','Wen Li, MD','Cardiology',['l01','l02'],['English','Mandarin'],true,'Division of Cardiology','A fictional profile with placeholder text only.','Imaginary University School of Medicine'),
    D('d24','Ximena Torres-Bell, MD','Pulmonology',['l06'],['English','Spanish'],true,'Division of Pulmonology','A fictional profile with placeholder text only.','Example Institute of Medicine')
  ];
  var CONDITIONS = [
    {name:'Asthma',spec:'Pulmonology',page:'condition-detail.html'},{name:'Seasonal allergies',spec:'Allergy and Immunology'},{name:'Eczema',spec:'Dermatology'},
    {name:'Heart rhythm concerns',spec:'Cardiology'},{name:'Headache conditions',spec:'Neurology'},{name:'Bone and joint injuries',spec:'Orthopedics'},
    {name:'Digestive conditions',spec:'Gastroenterology'},{name:'Diabetes',spec:'Endocrinology'},{name:'Vision conditions',spec:'Ophthalmology'},
    {name:'Ear conditions',spec:'Otolaryngology (ENT)'},{name:'Kidney conditions',spec:'Nephrology'},{name:'Developmental concerns',spec:'Developmental Pediatrics'},
    {name:'Anxiety and mood concerns',spec:'Psychology'},{name:'Food allergies',spec:'Allergy and Immunology'},{name:'Congenital heart conditions',spec:'Cardiology'},{name:'Urinary conditions',spec:'Urology'}
  ];

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function locName(id) { var l = LOCATIONS.filter(function (x) { return x.id === id; })[0]; return l ? l.name : id; }
  function params() { var o = {}; (location.search || '').replace(/^\?/, '').split('&').forEach(function (p) { if (!p) return; var kv = p.split('='); o[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); }); return o; }
  function fillSelect(sel, items, first) {
    if (!sel) return;
    sel.appendChild(h('option', {value: '', text: first}));
    items.forEach(function (i) { var v = typeof i === 'string' ? i : i.id, t = typeof i === 'string' ? i : i.name; sel.appendChild(h('option', {value: v, text: t})); });
  }
  function announce(msg) { var s = $('#live-status'); if (s) { s.textContent = ''; setTimeout(function () { s.textContent = msg; }, 30); } }

  /* ---------- navigation ---------- */
  var nav = $('[data-component="primary-nav"]');
  if (nav) {
    var toggle = $('.nav-toggle', nav), list = $('.nav-list', nav);
    var triggers = $$('.nav-trigger', nav);
    function closeMenus(except) {
      triggers.forEach(function (t) { if (t !== except) { t.setAttribute('aria-expanded', 'false'); $('#' + t.getAttribute('aria-controls')).hidden = true; } });
    }
    triggers.forEach(function (t) {
      $('#' + t.getAttribute('aria-controls')).hidden = true;
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true';
        closeMenus(t);
        t.setAttribute('aria-expanded', String(!open));
        $('#' + t.getAttribute('aria-controls')).hidden = open;
      });
    });
    if (toggle) toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      list.classList.toggle('open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openT = triggers.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
      if (openT) { closeMenus(); openT.focus(); return; }
      if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
        toggle.setAttribute('aria-expanded', 'false'); list.classList.remove('open'); toggle.focus();
      }
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeMenus(); });
    nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeMenus(); });
  }

  /* ---------- portal demo dialog ---------- */
  var dlg = $('#portal-dialog');
  if (dlg) {
    var opener = null;
    $$('[data-open-portal]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b; resetDialog();
        if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
        $('#portal-user').focus();
      });
    });
    $$('[data-close-portal]').forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
    dlg.addEventListener('close', function () { if (opener) opener.focus(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    var pf = $('form', dlg);
    function resetDialog() { $('#portal-result').hidden = true; $('#portal-result').textContent = ''; clearErrors(pf); }
    pf.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = validate(pf);
      if (errs.length) { showErrors(pf, errs, true); return; }
      var r = $('#portal-result'); r.hidden = false;
      r.textContent = 'Demo only: no sign-in took place and no account exists. Nothing was sent anywhere.';
      announce('Demo only. No sign-in took place.');
    });
  }

  /* ---------- generic form validation ---------- */
  function fieldLabel(el) { var l = el.id && $('label[for="' + el.id + '"]'); return l ? l.firstChild.textContent.trim().replace(/\s*\*$/, '') : (el.getAttribute('data-label') || el.name); }
  function msgFor(el) {
    var label = fieldLabel(el), v = (el.value || '').trim();
    if (el.type === 'checkbox') return el.required && !el.checked ? 'Please confirm: ' + label : '';
    if (el.required && !v) return el.tagName === 'SELECT' ? 'Choose an option for ' + label : 'Enter ' + label;
    if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return label + ' must look like name@example.com';
    if (v && el.type === 'tel' && !/^[0-9+()\-.\s]{7,}$/.test(v)) return label + ' must contain at least 7 digits, for example 555-0100';
    var min = parseInt(el.getAttribute('data-minlength') || '0', 10);
    if (v && min && v.length < min) return label + ' must be at least ' + min + ' characters';
    if (v && el.getAttribute('data-numeric') && !/^\d{4,12}$/.test(v)) return label + ' must be 4 to 12 digits';
    return '';
  }
  function validate(form) {
    var errs = [];
    $$('input,select,textarea', form).forEach(function (el) {
      if (el.type === 'hidden' || el.type === 'submit') return;
      var m = msgFor(el); if (m) errs.push({el: el, msg: m});
    });
    return errs;
  }
  function clearErrors(form) {
    $$('.error-msg', form).forEach(function (n) { n.remove(); });
    $$('[aria-invalid]', form).forEach(function (n) { n.removeAttribute('aria-invalid'); var d = (n.getAttribute('data-desc') || ''); if (d) n.setAttribute('aria-describedby', d); else n.removeAttribute('aria-describedby'); });
    var s = $('.error-summary', form); if (s) s.remove();
  }
  function showErrors(form, errs, inDialog) {
    clearErrors(form);
    errs.forEach(function (x) {
      var el = x.el, id = (el.id || el.name) + '-error';
      if (!el.hasAttribute('data-desc')) el.setAttribute('data-desc', el.getAttribute('aria-describedby') || '');
      var p = h('p', {id: id, class: 'error-msg', text: x.msg});
      var host = el.closest('.field') || el.parentNode; host.appendChild(p);
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', ((el.getAttribute('data-desc') || '') + ' ' + id).trim());
    });
    var sum = h('div', {class: 'error-summary', role: 'alert', tabindex: '-1'}, [h('h2', {text: 'There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with this form'})]);
    var ul = h('ul');
    errs.forEach(function (x) {
      var a = h('a', {href: '#' + x.el.id, text: x.msg});
      a.addEventListener('click', function (ev) { ev.preventDefault(); x.el.focus(); });
      ul.appendChild(h('li', {}, [a]));
    });
    sum.appendChild(ul);
    form.insertBefore(sum, form.firstChild);
    if (inDialog) { errs[0].el.focus(); } else { sum.focus(); }
  }
  $$('form[data-demo-form]').forEach(function (form) {
    if (form.closest('dialog')) return;
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = validate(form);
      if (errs.length) { showErrors(form, errs); return; }
      clearErrors(form);
      var box = $('[data-success]', form.parentNode);
      form.hidden = true;
      if (box) { box.hidden = false; box.focus(); }
    });
    $$('input,select,textarea', form).forEach(function (el) {
      var recheck = function () {
        if (el.getAttribute('aria-invalid') !== 'true') return;
        if (!msgFor(el)) {
          var ex = $('#' + (el.id || el.name) + '-error'); if (ex) ex.remove();
          el.removeAttribute('aria-invalid');
          var d = el.getAttribute('data-desc') || ''; if (d) el.setAttribute('aria-describedby', d); else el.removeAttribute('aria-describedby');
        }
      };
      el.addEventListener('input', recheck); el.addEventListener('change', recheck);
    });
  });

  /* ---------- accordions ---------- */
  $$('[data-component="accordion"] button[aria-controls]').forEach(function (b) {
    var p = $('#' + b.getAttribute('aria-controls')); p.hidden = true;
    b.addEventListener('click', function () { var o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!o)); p.hidden = o; });
  });

  /* ---------- Find a doctor (landing form) ---------- */
  var fad = $('#fad-specialty'); if (fad) fillSelect(fad, SPECIALTIES, 'All specialties');
  var quick = $('#quick-specialties');
  if (quick) ['Cardiology','Neurology','Orthopedics','Pulmonology','Gastroenterology','Allergy and Immunology'].forEach(function (s) {
    quick.appendChild(h('li', {}, [h('a', {class: 'chip', href: 'doctor-search.html?specialty=' + encodeURIComponent(s), text: s})]));
  });

  /* ---------- Doctor search ---------- */
  var dsForm = $('#doctor-filter-form');
  if (dsForm) {
    var q = $('#f-query'), sp = $('#f-specialty'), lc = $('#f-location'), lg = $('#f-language'), ac = $('#f-accepting'), so = $('#f-sort');
    fillSelect(sp, SPECIALTIES, 'All specialties'); fillSelect(lc, LOCATIONS, 'All locations'); fillSelect(lg, LANGS, 'Any language');
    var P = params(); if (P.query) q.value = P.query; if (P.specialty) sp.value = P.specialty; if (P.location) lc.value = P.location; if (P.language) lg.value = P.language; if (P.accepting) ac.checked = true;
    var out = $('#doctor-results'), count = $('#result-count');
    function renderDoctors(focusHeading) {
      var qq = q.value.trim().toLowerCase();
      var rows = DOCTORS.filter(function (d) {
        return (!qq || d.name.toLowerCase().indexOf(qq) > -1 || d.specialty.toLowerCase().indexOf(qq) > -1) &&
          (!sp.value || d.specialty === sp.value) && (!lc.value || d.locations.indexOf(lc.value) > -1) &&
          (!lg.value || d.languages.indexOf(lg.value) > -1) && (!ac.checked || d.accepting);
      });
      rows.sort(function (a, b) { return so.value === 'specialty' ? a.specialty.localeCompare(b.specialty) || a.name.localeCompare(b.name) : a.name.replace(/^[^,]*?\s/, '').localeCompare(b.name.replace(/^[^,]*?\s/, '')); });
      out.textContent = '';
      var msg = rows.length + (rows.length === 1 ? ' provider' : ' providers') + ' found';
      count.textContent = msg; announce(msg);
      if (!rows.length) {
        out.appendChild(h('li', {}, [h('div', {class: 'empty-state', 'data-component': 'empty-state'}, [h('h3', {text: 'No providers match these filters'}), h('p', {text: 'Try removing a filter or checking the spelling. This demo has a small set of invented providers.'}), (function () { var b = h('button', {type: 'button', class: 'btn btn-outline', text: 'Clear all filters'}); b.addEventListener('click', clearFilters); return b; })()])]));
        return;
      }
      rows.forEach(function (d) {
        out.appendChild(h('li', {class: 'result', 'data-component': 'provider-card', 'data-instance': d.id}, [
          h('h3', {}, [h('a', {href: 'doctor-profile.html?id=' + d.id, text: d.name})]),
          h('p', {text: d.specialty + ' - ' + d.title}),
          h('p', {class: 'small', text: 'Locations: ' + d.locations.map(locName).join('; ')}),
          h('p', {class: 'small', text: 'Languages: ' + d.languages.join(', ')}),
          h('span', {class: d.accepting ? 'badge' : 'badge neutral', text: d.accepting ? 'Accepting new patients (demo data)' : 'Not accepting new patients (demo data)'})
        ]));
      });
    }
    function clearFilters() { q.value = ''; sp.value = ''; lc.value = ''; lg.value = ''; ac.checked = false; renderDoctors(); q.focus(); }
    dsForm.addEventListener('submit', function (e) { e.preventDefault(); renderDoctors(); });
    [sp, lc, lg, ac, so].forEach(function (c) { c.addEventListener('change', function () { renderDoctors(); }); });
    q.addEventListener('input', function () { renderDoctors(); });
    $('#clear-filters').addEventListener('click', clearFilters);
    renderDoctors();
  }

  /* ---------- Doctor profile ---------- */
  var prof = $('#profile-root');
  if (prof) {
    var id = params().id || 'd01';
    var d = DOCTORS.filter(function (x) { return x.id === id; })[0];
    var ttl = $('#profile-name');
    if (!d) {
      ttl.textContent = 'Provider not found';
      prof.appendChild(h('p', {text: 'No provider in this demo has that identifier.'}));
      prof.appendChild(h('p', {}, [h('a', {href: 'doctor-search.html', text: 'Back to doctor search'})]));
    } else {
      document.title = d.name + ' | Larkspur Children\'s Hospital (fictional)';
      ttl.textContent = d.name;
      $('#profile-bc').textContent = d.name;
      var dl = h('dl', {class: 'meta-list'}, [
        h('dt', {text: 'Specialty'}), h('dd', {}, [h('a', {href: 'doctor-search.html?specialty=' + encodeURIComponent(d.specialty), text: d.specialty})]),
        h('dt', {text: 'Department'}), h('dd', {text: d.title}),
        h('dt', {text: 'Languages'}), h('dd', {text: d.languages.join(', ')}),
        h('dt', {text: 'Training'}), h('dd', {text: d.training}),
        h('dt', {text: 'New patients'}), h('dd', {text: d.accepting ? 'Accepting (demo data only)' : 'Not accepting (demo data only)'})
      ]);
      prof.appendChild(dl);
      prof.appendChild(h('h2', {text: 'About'})); prof.appendChild(h('p', {text: d.bio}));
      prof.appendChild(h('h2', {text: 'Locations'}));
      var ul = h('ul'); d.locations.forEach(function (l) { ul.appendChild(h('li', {text: locName(l)})); }); prof.appendChild(ul);
      prof.appendChild(h('p', {}, [h('a', {class: 'btn', href: 'appointments.html', text: 'Request an appointment (demo)'})]));
    }
  }

  /* ---------- Locations ---------- */
  function locCard(l) {
    return h('li', {class: 'result', 'data-component': 'location-card', 'data-instance': l.id}, [
      h('h3', {text: l.name}), h('p', {text: l.types.join(' / ') + ' care'}),
      h('p', {class: 'small', text: l.addr}), h('p', {class: 'small', text: 'Phone (fictional): ' + l.phone + ' - ' + l.hours})
    ]);
  }
  var lf = $('#location-filter-form');
  if (lf) {
    var lt = $('#loc-type'), lq = $('#loc-query'), lout = $('#location-results'), lcount = $('#loc-count');
    fillSelect(lt, LOC_TYPES, 'All care types');
    var LP = params(); if (LP.type) lt.value = LP.type;
    function renderLocs() {
      var qq = lq.value.trim().toLowerCase();
      var rows = LOCATIONS.filter(function (l) { return (!lt.value || l.types.indexOf(lt.value) > -1) && (!qq || (l.name + ' ' + l.addr).toLowerCase().indexOf(qq) > -1); });
      lout.textContent = '';
      var m = rows.length + (rows.length === 1 ? ' location' : ' locations') + ' found'; lcount.textContent = m; announce(m);
      if (!rows.length) lout.appendChild(h('li', {}, [h('div', {class: 'empty-state', 'data-component': 'empty-state'}, [h('h3', {text: 'No locations match'}), h('p', {text: 'Try a different care type or search term.'})])]));
      rows.forEach(function (l) { lout.appendChild(locCard(l)); });
    }
    lf.addEventListener('submit', function (e) { e.preventDefault(); renderLocs(); });
    lt.addEventListener('change', renderLocs); lq.addEventListener('input', renderLocs);
    renderLocs();
  }
  var er = $('#emergency-sites');
  if (er) LOCATIONS.filter(function (l) { return l.types.indexOf('Emergency') > -1; }).forEach(function (l) { er.appendChild(locCard(l)); });

  /* ---------- Specialties ---------- */
  var spf = $('#specialty-filter-form');
  if (spf) {
    var sq = $('#spec-query'), sout = $('#specialty-results'), scount = $('#spec-count');
    function renderSpecs() {
      var qq = sq.value.trim().toLowerCase();
      var rows = SPECIALTIES.filter(function (s) { return !qq || s.toLowerCase().indexOf(qq) > -1; });
      sout.textContent = '';
      var m = rows.length + (rows.length === 1 ? ' specialty' : ' specialties') + ' shown'; scount.textContent = m; announce(m);
      if (!rows.length) sout.appendChild(h('li', {}, [h('div', {class: 'empty-state', 'data-component': 'empty-state'}, [h('h3', {text: 'No specialties match'}), h('p', {text: 'Check the spelling or clear the search box.'})])]));
      rows.forEach(function (s) {
        var n = DOCTORS.filter(function (d) { return d.specialty === s; }).length;
        sout.appendChild(h('li', {class: 'card', 'data-component': 'specialty-card'}, [h('div', {class: 'card-body'}, [h('h3', {text: s}), h('p', {class: 'small', text: n + ' demo provider' + (n === 1 ? '' : 's') + ' listed'}), h('a', {href: 'doctor-search.html?specialty=' + encodeURIComponent(s), text: 'Find a doctor in ' + s})])]));
      });
    }
    spf.addEventListener('submit', function (e) { e.preventDefault(); renderSpecs(); });
    sq.addEventListener('input', renderSpecs); renderSpecs();
  }

  /* ---------- Conditions ---------- */
  var cf = $('#condition-filter-form');
  if (cf) {
    var cq = $('#cond-query'), cout = $('#condition-results'), ccount = $('#cond-count');
    function renderConds() {
      var qq = cq.value.trim().toLowerCase();
      var rows = CONDITIONS.filter(function (c) { return !qq || c.name.toLowerCase().indexOf(qq) > -1; });
      cout.textContent = '';
      var m = rows.length + (rows.length === 1 ? ' topic' : ' topics') + ' shown'; ccount.textContent = m; announce(m);
      if (!rows.length) cout.appendChild(h('li', {}, [h('div', {class: 'empty-state', 'data-component': 'empty-state'}, [h('h3', {text: 'No topics match'}), h('p', {text: 'Try a shorter search term.'})])]));
      rows.forEach(function (c) {
        var title = c.page ? h('a', {href: c.page, text: c.name}) : document.createTextNode(c.name);
        cout.appendChild(h('li', {class: 'result', 'data-component': 'condition-item'}, [h('h3', {}, [title]), h('p', {class: 'small'}, [document.createTextNode('Related specialty: '), h('a', {href: 'doctor-search.html?specialty=' + encodeURIComponent(c.spec), text: c.spec})])]));
      });
    }
    cf.addEventListener('submit', function (e) { e.preventDefault(); renderConds(); });
    cq.addEventListener('input', renderConds); renderConds();
  }
})();
