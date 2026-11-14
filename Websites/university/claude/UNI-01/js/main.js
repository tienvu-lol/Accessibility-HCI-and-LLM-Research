/* Cedar Lake State University - fictional replica. Vanilla JS, inline demo data, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- demo data (all fictional) ---------- */
  var SCHOOLS = ['College of Arts and Sciences', 'School of Engineering', 'School of Business', 'College of Agricultural and Life Sciences', 'School of Education', 'School of Nursing', 'School of Music and Design'];
  var MAJORS = [
    ['Anthropology', 0, 'Major', 'Study human cultures, languages and origins through fieldwork and archives.'],
    ['Applied Mathematics', 0, 'Major', 'Model real systems with calculus, statistics and computation.'],
    ['Astronomy', 0, 'Major', 'Observe and model stars, planets and galaxies using the campus observatory.'],
    ['Biochemistry', 0, 'Major', 'Explore the chemistry of living cells in teaching and research labs.'],
    ['Biology', 0, 'Major', 'Core training in genetics, ecology and physiology with lab and field options.'],
    ['Chemistry', 0, 'Major', 'Hands-on study of matter, reactions and instrumentation.'],
    ['Communication Arts', 0, 'Major', 'Media, rhetoric and storytelling for public audiences.'],
    ['Computer Science', 0, 'Major', 'Algorithms, systems and software design with a strong ethics thread.'],
    ['Economics', 0, 'Major', 'Use data and theory to study markets, policy and choices.'],
    ['English', 0, 'Major', 'Read widely and write precisely across literary traditions.'],
    ['Environmental Studies', 0, 'Major', 'Connect natural science, policy and community action.'],
    ['Geography', 0, 'Major', 'Maps, spatial data and the human story of places.'],
    ['History', 0, 'Major', 'Research the past with archives, oral histories and digital tools.'],
    ['Philosophy', 0, 'Major', 'Reason carefully about knowledge, ethics and meaning.'],
    ['Political Science', 0, 'Major', 'Institutions, elections and public policy in comparative view.'],
    ['Psychology', 0, 'Major', 'Behavior and the mind, from lab experiments to clinical practice.'],
    ['Data Science Certificate', 0, 'Certificate', 'A compact sequence in programming, statistics and visualization.'],
    ['Global Health Certificate', 0, 'Certificate', 'Public health fundamentals with an international focus.'],
    ['Aerospace Engineering', 1, 'Major', 'Flight, propulsion and structures with a design-build capstone.'],
    ['Biomedical Engineering', 1, 'Major', 'Engineering methods applied to medicine and devices.'],
    ['Civil Engineering', 1, 'Major', 'Design resilient bridges, water systems and buildings.'],
    ['Electrical Engineering', 1, 'Major', 'Circuits, signals and power from chips to grids.'],
    ['Industrial Engineering', 1, 'Major', 'Optimize processes in factories, hospitals and logistics.'],
    ['Mechanical Engineering', 1, 'Major', 'Machines, energy and robotics with shop-floor practice.'],
    ['Accounting', 2, 'Major', 'Financial reporting and audit skills for professional licensure.'],
    ['Finance', 2, 'Major', 'Investments, risk and corporate decisions.'],
    ['Marketing', 2, 'Major', 'Understand customers and build brands using data.'],
    ['Entrepreneurship Certificate', 2, 'Certificate', 'Launch a venture with mentors and a small seed competition.'],
    ['Agronomy', 3, 'Major', 'Crop science and soil management for sustainable farms.'],
    ['Food Science', 3, 'Major', 'Safety, chemistry and product development for food systems.'],
    ['Wildlife Ecology', 3, 'Major', 'Conserve habitats and manage wild populations.'],
    ['Elementary Education', 4, 'Major', 'Teacher preparation with classroom placements from year two.'],
    ['Secondary Education', 4, 'Major', 'Subject-area teaching licensure for middle and high school.'],
    ['Nursing (BSN)', 5, 'Major', 'Clinical training leading to nursing licensure exams.'],
    ['Music Performance', 6, 'Major', 'Studio instruction, ensembles and recitals.'],
    ['Graphic Design', 6, 'Major', 'Typography, interaction and visual communication.'],
    ['Art Studio Certificate', 6, 'Certificate', 'Drawing, printmaking and sculpture studios for non-majors.']
  ].map(function (m, i) { return { id: 'major-' + (i + 1), name: m[0], school: SCHOOLS[m[1]], type: m[2], blurb: m[3] }; });

  var PEOPLE = [
    ['Amara Okafor', 'Professor', 'Biology', 'Science Hall 214', '555-0101'], ['Daniel Brooks', 'Associate Professor', 'History', 'Hale Building 310', '555-0102'],
    ['Priya Raman', 'Professor', 'Computer Science', 'Tech Commons 405', '555-0103'], ['Lucas Ferreira', 'Lecturer', 'Mathematics', 'Science Hall 120', '555-0104'],
    ['Hannah Weiss', 'Assistant Professor', 'Psychology', 'Hale Building 222', '555-0105'], ['Mateo Alvarez', 'Director', 'Office of Admissions', 'Welcome Center', '555-0106'],
    ['Grace Nakamura', 'Professor', 'Chemistry', 'Science Hall 330', '555-0107'], ['Omar Haddad', 'Associate Professor', 'Electrical Engineering', 'Engineering Annex 210', '555-0108'],
    ['Sofia Lindqvist', 'Librarian', 'University Libraries', 'Central Library 2F', '555-0109'], ['Marcus Bell', 'Coach', 'Athletics', 'Fieldhouse', '555-0110'],
    ['Eleni Tadesse', 'Professor', 'Economics', 'Hale Building 401', '555-0111'], ['Ravi Subramanian', 'Assistant Professor', 'Civil Engineering', 'Engineering Annex 115', '555-0112'],
    ['Claire Dubois', 'Advisor', 'Student Success Center', 'Union South 150', '555-0113'], ['Tomas Novak', 'Professor', 'Physics', 'Science Hall 402', '555-0114'],
    ['Imani Carter', 'Financial Aid Counselor', 'Office of Student Aid', 'Welcome Center', '555-0115'], ['Yuki Tanaka', 'Associate Professor', 'English', 'Hale Building 118', '555-0116'],
    ['Peter Olsen', 'Facilities Manager', 'Campus Operations', 'Operations Yard', '555-0117'], ['Nadia Petrova', 'Professor', 'Political Science', 'Hale Building 305', '555-0118'],
    ['Jonas Meyer', 'Lecturer', 'Marketing', 'Commerce Hall 220', '555-0119'], ['Layla Rahman', 'Assistant Professor', 'Nursing', 'Health Sciences 240', '555-0120'],
    ['Henry Walsh', 'Registrar', 'Office of the Registrar', 'Welcome Center', '555-0121'], ['Bianca Rossi', 'Professor', 'Music Performance', 'Arts Center 105', '555-0122'],
    ['Kwame Mensah', 'Associate Professor', 'Agronomy', 'Farm Sciences 12', '555-0123'], ['Ingrid Solberg', 'Dean', 'College of Arts and Sciences', 'Hale Building 500', '555-0124'],
    ['Diego Castillo', 'Research Scientist', 'Environmental Studies', 'Lakeside Lab', '555-0125'], ['Fatima Zahra', 'Accessibility Specialist', 'Access and Inclusion Office', 'Union South 112', '555-0126'],
    ['Oliver Grant', 'Professor', 'Anthropology', 'Hale Building 207', '555-0127'], ['Mei Lin', 'Assistant Professor', 'Graphic Design', 'Arts Center 220', '555-0128'],
    ['Samuel Adeyemi', 'Associate Professor', 'Mechanical Engineering', 'Engineering Annex 320', '555-0129'], ['Rosa Delgado', 'Visit Program Coordinator', 'Office of Admissions', 'Welcome Center', '555-0130']
  ].map(function (p, i) {
    var parts = p[0].toLowerCase().replace(/[^a-z ]/g, '').split(' ');
    return { id: 'person-' + (i + 1), name: p[0], role: p[1], dept: p[2], office: p[3], phone: p[4], email: parts[0].charAt(0) + parts[parts.length - 1] + '@cedarlake.example' };
  });

  var NEWS = [
    ['heron-solar-field', 'Campus solar field powers three residence halls', '2026-11-04', 'Campus', 'A new array on the south lot now supplies a share of residence hall electricity.'],
    ['lake-sensor-network', 'Students deploy sensors to track lake ice', '2026-10-28', 'Research', 'An undergraduate team built low-cost buoys that report water temperature each hour.'],
    ['first-gen-center', 'First-generation student center opens in Union South', '2026-10-21', 'Student life', 'The center adds drop-in advising, a study lounge and a peer mentoring program.'],
    ['fieldhouse-reopens', 'Renovated fieldhouse reopens for winter season', '2026-10-15', 'Athletics', 'New seating, step-free entrances and a larger training room are ready.'],
    ['soil-microbe-study', 'Soil microbe study could cut fertilizer use', '2026-10-09', 'Research', 'Agronomy researchers describe a seed coating that supports beneficial microbes.'],
    ['library-night-hours', 'Central Library extends night hours during finals', '2026-10-02', 'Campus', 'Quiet floors will stay open until 2 a.m. with free tea and coffee.'],
    ['tuition-promise-update', 'Tuition promise expands to more families', '2026-09-25', 'Admissions', 'Families under a revised income threshold can now apply for the tuition promise.'],
    ['theater-fall-season', 'Fall theater season opens with a student-written play', '2026-09-18', 'Arts', 'The Arts Center stage hosts four productions through December.'],
    ['nursing-sim-lab', 'Nursing school adds a simulation lab', '2026-09-11', 'Campus', 'Mannequins and scenario software let students rehearse emergency care.'],
    ['alumni-fund-record', 'Alumni giving day sets a participation record', '2026-09-04', 'Community', 'Gifts support scholarships and emergency aid for students.'],
    ['quantum-lab-grant', 'Physics group receives grant for quantum lab', '2026-08-28', 'Research', 'The award funds equipment and four graduate fellowships.'],
    ['move-in-weekend', 'Move-in weekend welcomes the largest class yet', '2026-08-21', 'Student life', 'More than 800 volunteers helped residents move into the halls.']
  ].map(function (n) { return { id: n[0], title: n[1], date: n[2], cat: n[3], summary: n[4] }; });

  var EVENTS = [
    ['open-house-dec', 'Winter open house for prospective students', '2026-12-05', '10:00 a.m.', 'Welcome Center', 'Admissions', 'Tours, a student panel and a financial aid drop-in session.'],
    ['choir-concert', 'Holiday choir concert', '2026-12-08', '7:30 p.m.', 'Arts Center Hall', 'Arts', 'The university choir and chamber singers perform seasonal works.'],
    ['sci-seminar-lake', 'Seminar: Lakes in a warming world', '2026-12-10', '4:00 p.m.', 'Science Hall 100', 'Lectures', 'A public talk on ice cover records and what they tell us.'],
    ['hoops-opener', 'Herons basketball home opener', '2026-12-12', '6:00 p.m.', 'Fieldhouse', 'Athletics', 'Doors open one hour before tip-off; accessible seating is available.'],
    ['career-fair-winter', 'Winter career and internship fair', '2027-01-21', '11:00 a.m.', 'Union South Ballroom', 'Career', 'Employers from engineering, health and business meet students.'],
    ['mlk-lecture', 'Community lecture and service day', '2027-01-18', '1:00 p.m.', 'Arts Center Hall', 'Community', 'A keynote followed by service projects around the city.'],
    ['visit-day-feb', 'Admitted student visit day', '2027-02-13', '9:00 a.m.', 'Welcome Center', 'Admissions', 'Meet faculty, see residence halls and ask about aid.'],
    ['robotics-expo', 'Robotics showcase', '2027-02-20', '12:00 p.m.', 'Engineering Annex', 'Lectures', 'Student teams demonstrate autonomous machines.'],
    ['poetry-night', 'Open mic poetry night', '2027-02-26', '8:00 p.m.', 'Union South Cafe', 'Arts', 'Sign up at the door; five-minute slots.'],
    ['spring-concert', 'Spring orchestra concert', '2027-03-06', '3:00 p.m.', 'Arts Center Hall', 'Arts', 'Works by student composers alongside classics.'],
    ['research-day', 'Undergraduate research day', '2027-03-26', '9:30 a.m.', 'Hale Building atrium', 'Lectures', 'Poster sessions across every college.'],
    ['baseball-opener', 'Herons baseball home opener', '2027-03-27', '1:00 p.m.', 'Lakeshore Park', 'Athletics', 'Free admission for students with a campus card.'],
    ['commencement-prep', 'Commencement information session', '2027-04-14', '5:00 p.m.', 'Union South 200', 'Community', 'Tickets, regalia, and accessible seating details.'],
    ['arbor-day', 'Campus tree planting', '2027-04-24', '10:00 a.m.', 'Lakeside Lawn', 'Community', 'Volunteers plant native trees; gloves provided.']
  ].map(function (e) { return { id: e[0], title: e[1], date: e[2], time: e[3], place: e[4], cat: e[5], desc: e[6] }; });

  var PAGES = [
    ['index.html', 'Home', 'Cedar Lake State University home page'], ['academics.html', 'Academics', 'Colleges, schools, majors and learning support'],
    ['majors.html', 'Undergraduate majors and certificates', 'Search and filter the list of programs'], ['admissions.html', 'Admissions and aid', 'Affording college, promises and professional schools; tuition and fees'],
    ['apply.html', 'Apply', 'Steps to apply and a demonstration application start form'], ['visit.html', 'Visit', 'Tours, campus map and visit request'],
    ['directories.html', 'Directory search', 'Find people and offices'], ['research.html', 'Research', 'Discoveries, centers and undergraduate research'],
    ['student-life.html', 'Student life', 'Housing, clubs, dining and wellbeing'], ['athletics.html', 'Athletics', 'Herons teams, schedules and facilities'],
    ['about.html', 'About Cedar Lake State', 'Mission, history, leadership'], ['facts.html', 'Facts and figures', 'Sample enrollment and campus numbers'],
    ['news.html', 'News', 'Campus news stories'], ['events.html', 'Events calendar', 'Upcoming events with filters'],
    ['services.html', 'Campus tools and resources', 'MyUW, email, library, jobs, giving, policies and audience links'], ['search.html', 'Search results', 'Search people and pages']
  ].map(function (p) { return { url: p[0], title: p[1], desc: p[2] }; });

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function qparam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  }
  function setStatus(node, msg) { node.textContent = msg; }

  /* ---------- navigation disclosure + Escape ---------- */
  var toggle = $('.menu-toggle');
  var collapsibles = $$('.nav-collapsible');
  function setMenu(open) {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    collapsibles.forEach(function (c) { c.classList.toggle('is-open', open); });
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
      setMenu(false); toggle.focus();
    }
  });

  /* ---------- generic form validation with error summary ---------- */
  function fieldLabel(f) {
    var l = f.id && $('label[for="' + f.id + '"]');
    return l ? l.textContent.replace(/\s*\(required\)\s*$/, '').trim() : (f.getAttribute('name') || 'Field');
  }
  function setError(host, field, msg) {
    if (!host.id) host.id = field.id + '-field';
    var id = host.id + '-error';
    var err = document.getElementById(id);
    if (!err) {
      err = el('p', { id: id, class: 'field-error' });
      host.appendChild(err);
    }
    err.textContent = msg;
    if (field.tagName === 'FIELDSET') field.setAttribute('aria-describedby', id);
    else {
      var d = (field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (d.indexOf(id) < 0) d.push(id);
      field.setAttribute('aria-describedby', d.join(' '));
      field.setAttribute('aria-invalid', 'true');
    }
  }
  function clearError(host, field) {
    if (!host.id) host.id = field.id + '-field';
    var id = host.id + '-error';
    var err = document.getElementById(id);
    if (err) err.remove();
    if (field.tagName !== 'FIELDSET') {
      field.removeAttribute('aria-invalid');
      var d = (field.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; });
      if (d.length) field.setAttribute('aria-describedby', d.join(' ')); else field.removeAttribute('aria-describedby');
    }
  }
  function validateField(f) {
    var v = (f.value || '').trim();
    var name = fieldLabel(f);
    if (f.hasAttribute('required') && !v) return 'Enter ' + (f.getAttribute('data-noun') || name.toLowerCase()) + '.';
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address like name@example.org.';
    if (f.getAttribute('data-minlength') && v && v.length < +f.getAttribute('data-minlength')) return name + ' needs at least ' + f.getAttribute('data-minlength') + ' characters.';
    if (f.type === 'date' && v) {
      var min = f.getAttribute('min');
      if (min && v < min) return 'Choose a date on or after ' + min + '.';
    }
    if (f.type === 'tel' && v && !/^[0-9+().\s-]{7,}$/.test(v)) return 'Enter a phone number with at least 7 digits.';
    return '';
  }
  function initForm(form) {
    var summaryHost = $('.error-summary-host', form) || form;
    function run(focusFirst) {
      var problems = [];
      $$('input, select, textarea', form).forEach(function (f) {
        if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'submit' || f.type === 'button') return;
        var host = f.closest('.field');
        if (!host) return;
        var msg = validateField(f);
        if (msg) { setError(host, f, msg); problems.push({ f: f, msg: msg, id: f.id }); } else clearError(host, f);
      });
      $$('fieldset[data-required]', form).forEach(function (fs) {
        var ok = $$('input:checked', fs).length > 0;
        if (!fs.id) return;
        var errId = fs.id + '-error';
        var old = document.getElementById(errId);
        if (old) old.remove();
        if (!ok) {
          var err = el('p', { id: errId, class: 'field-error', text: 'Choose one option for "' + $('legend', fs).textContent.trim() + '".' });
          fs.appendChild(err);
          fs.setAttribute('aria-describedby', errId);
          problems.push({ f: $('input', fs), msg: err.textContent, id: $('input', fs).id });
        } else fs.removeAttribute('aria-describedby');
      });
      var box = $('.error-summary', form);
      if (box) box.remove();
      if (problems.length) {
        var list = el('ul');
        problems.forEach(function (p) {
          var a = el('a', { href: '#' + p.id, text: p.msg });
          a.addEventListener('click', function (ev) { ev.preventDefault(); p.f.focus(); });
          list.appendChild(el('li', {}, [a]));
        });
        box = el('div', { class: 'error-summary', role: 'alert', tabindex: '-1', 'data-component': 'error-summary' }, [
          el('h2', { text: 'There ' + (problems.length === 1 ? 'is 1 problem' : 'are ' + problems.length + ' problems') + ' with your entry' }), list]);
        summaryHost.insertBefore(box, summaryHost.firstChild);
        if (focusFirst) box.focus();
      }
      return problems.length === 0;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!run(true)) return;
      var evt = new CustomEvent('demo-valid', { bubbles: true });
      form.dispatchEvent(evt);
    });
    $$('input, select, textarea', form).forEach(function (f) {
      f.addEventListener('input', function () {
        var host = f.closest('.field');
        if (!host || f.type === 'radio' || f.type === 'checkbox') return;
        if (document.getElementById(host.id + '-error') && !validateField(f)) clearError(host, f);
      });
    });
  }
  function demoSuccess(form, title, text) {
    var s = el('div', { class: 'demo-success', role: 'status', tabindex: '-1', 'data-component': 'demo-success' }, [
      el('h2', { text: title }), el('p', { text: text }),
      el('p', { text: 'This is a demonstration. Nothing was sent, stored or submitted anywhere.' })]);
    form.parentNode.insertBefore(s, form);
    form.hidden = true;
    s.focus();
    var again = el('button', { type: 'button', class: 'btn btn-alt', text: 'Start over' });
    again.addEventListener('click', function () { form.reset(); form.hidden = false; s.remove(); $$('input,select,textarea', form)[0].focus(); });
    s.appendChild(again);
  }

  /* ---------- page-specific ---------- */
  var page = document.body.getAttribute('data-page');

  function renderMajors() {
    var form = $('#major-form'), list = $('#major-results'), status = $('#major-status');
    var dlg = $('#major-dialog'), lastBtn = null;
    var schoolSel = $('#major-school');
    SCHOOLS.forEach(function (s) { schoolSel.appendChild(el('option', { value: s, text: s })); });
    $('#major-q').value = qparam('q');
    function draw() {
      var q = norm($('#major-q').value), school = schoolSel.value;
      var types = $$('input[name=type]:checked', form).map(function (c) { return c.value; });
      var sort = $('#major-sort').value;
      var out = MAJORS.filter(function (m) {
        return (!q || norm(m.name + ' ' + m.blurb + ' ' + m.school).indexOf(q) >= 0) && (!school || m.school === school) && (!types.length || types.indexOf(m.type) >= 0);
      });
      out.sort(function (a, b) { return sort === 'za' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name); });
      list.textContent = '';
      out.forEach(function (m) {
        var btn = el('button', { type: 'button', class: 'link-btn', 'data-id': m.id, text: 'View details' });
        btn.appendChild(el('span', { class: 'visually-hidden', text: ' for ' + m.name }));
        list.appendChild(el('li', {}, [el('h3', { text: m.name }), el('p', { class: 'meta' }, [el('span', { class: 'tag', text: m.type }), ' ' + m.school]), el('p', { text: m.blurb }), btn]));
      });
      $('#major-empty').hidden = out.length > 0;
      setStatus(status, out.length === 0 ? 'No programs match your search.' : 'Showing ' + out.length + ' of ' + MAJORS.length + ' programs.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); draw(); });
    form.addEventListener('input', draw);
    form.addEventListener('change', draw);
    $('#major-reset').addEventListener('click', function () { setTimeout(draw, 0); });
    $('#major-empty-reset').addEventListener('click', function () { form.reset(); draw(); $('#major-q').focus(); });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-id]'); if (!b) return;
      var m = MAJORS.filter(function (x) { return x.id === b.getAttribute('data-id'); })[0];
      lastBtn = b;
      $('#major-dialog-title').textContent = m.name;
      $('#major-dialog-body').textContent = m.blurb + ' (' + m.type + ', ' + m.school + '). This is sample text; no real curriculum is shown.';
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    });
    $('#major-dialog-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () { if (lastBtn) lastBtn.focus(); });
    draw();
  }

  function renderPeople() {
    var form = $('#people-form'), list = $('#people-results'), status = $('#people-status');
    $('#people-q').value = qparam('q');
    var typeSel = $('#people-type');
    function search() {
      var q = norm($('#people-q').value), t = typeSel.value;
      var out = PEOPLE.filter(function (p) {
        var hay = t === 'name' ? p.name : t === 'dept' ? p.dept + ' ' + p.role : p.name + ' ' + p.dept + ' ' + p.role + ' ' + p.email;
        return norm(hay).indexOf(q) >= 0;
      });
      list.textContent = '';
      out.forEach(function (p) {
        list.appendChild(el('li', {}, [el('h3', { text: p.name }), el('p', { class: 'meta', text: p.role + ', ' + p.dept }),
          el('p', {}, [el('a', { href: 'mailto:' + p.email, text: p.email }), ' ', document.createTextNode(' | ' + p.phone + ' | ' + p.office)])]));
      });
      $('#people-empty').hidden = out.length > 0;
      setStatus(status, out.length ? out.length + ' result' + (out.length === 1 ? '' : 's') + ' for "' + $('#people-q').value.trim() + '".' : 'No people or offices match "' + $('#people-q').value.trim() + '".');
    }
    initForm(form);
    form.addEventListener('demo-valid', search);
    if (qparam('q').length >= 2) search();
    else setStatus(status, 'Enter at least 2 characters to search the sample directory of ' + PEOPLE.length + ' fictional people.');
  }

  function renderNews() {
    var list = $('#news-results'), status = $('#news-status'), form = $('#news-form');
    var cats = []; NEWS.forEach(function (n) { if (cats.indexOf(n.cat) < 0) cats.push(n.cat); });
    cats.sort().forEach(function (c) { $('#news-cat').appendChild(el('option', { value: c, text: c })); });
    function draw() {
      var q = norm($('#news-q').value), c = $('#news-cat').value;
      var out = NEWS.filter(function (n) { return (!c || n.cat === c) && (!q || norm(n.title + ' ' + n.summary).indexOf(q) >= 0); });
      list.textContent = '';
      out.forEach(function (n) {
        list.appendChild(el('li', { id: n.id }, [el('h3', { text: n.title }), el('p', { class: 'meta' }, [el('span', { class: 'tag', text: n.cat }), ' ', el('time', { datetime: n.date, text: fmtDate(n.date) })]), el('p', { text: n.summary }), el('p', { class: 'meta', text: 'Sample story. The full article is not included in this demonstration.' })]));
      });
      $('#news-empty').hidden = out.length > 0;
      setStatus(status, out.length ? 'Showing ' + out.length + ' of ' + NEWS.length + ' stories.' : 'No stories match your filters.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); draw(); });
    form.addEventListener('input', draw);
    $('#news-reset').addEventListener('click', function () { setTimeout(draw, 0); });
    draw();
  }

  function renderEvents() {
    var list = $('#event-results'), status = $('#event-status'), form = $('#event-form');
    var cats = []; EVENTS.forEach(function (n) { if (cats.indexOf(n.cat) < 0) cats.push(n.cat); });
    cats.sort().forEach(function (c) { $('#event-cat').appendChild(el('option', { value: c, text: c })); });
    function draw() {
      var q = norm($('#event-q').value), c = $('#event-cat').value, from = $('#event-from').value;
      var out = EVENTS.filter(function (n) { return (!c || n.cat === c) && (!from || n.date >= from) && (!q || norm(n.title + ' ' + n.desc + ' ' + n.place).indexOf(q) >= 0); });
      out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      list.textContent = '';
      out.forEach(function (n) {
        list.appendChild(el('li', { id: n.id }, [el('h3', { text: n.title }), el('p', { class: 'meta' }, [el('span', { class: 'tag', text: n.cat }), ' ', el('time', { datetime: n.date, text: fmtDate(n.date) }), ' at ' + n.time + ', ' + n.place]), el('p', { text: n.desc })]));
      });
      $('#event-empty').hidden = out.length > 0;
      setStatus(status, out.length ? 'Showing ' + out.length + ' of ' + EVENTS.length + ' sample events.' : 'No events match your filters.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); draw(); });
    form.addEventListener('input', draw);
    form.addEventListener('change', draw);
    $('#event-reset').addEventListener('click', function () { setTimeout(draw, 0); });
    draw();
  }

  function renderSearch() {
    var q = qparam('q').trim(), box = $('#search-q'), out = $('#search-results'), status = $('#search-status');
    box.value = q;
    if (q.length < 2) { setStatus(status, 'Enter at least 2 characters to search pages, programs, people, news and events.'); return; }
    var n = norm(q), groups = [];
    function add(label, items) { if (items.length) groups.push({ label: label, items: items }); }
    add('Pages', PAGES.filter(function (p) { return norm(p.title + ' ' + p.desc).indexOf(n) >= 0; }).map(function (p) { return { t: p.title, u: p.url, d: p.desc }; }));
    add('Programs', MAJORS.filter(function (m) { return norm(m.name + ' ' + m.blurb).indexOf(n) >= 0; }).map(function (m) { return { t: m.name, u: 'majors.html?q=' + encodeURIComponent(m.name), d: m.type + ', ' + m.school }; }));
    add('People', PEOPLE.filter(function (p) { return norm(p.name + ' ' + p.dept + ' ' + p.role).indexOf(n) >= 0; }).map(function (p) { return { t: p.name, u: 'directories.html?q=' + encodeURIComponent(p.name), d: p.role + ', ' + p.dept }; }));
    add('News', NEWS.filter(function (x) { return norm(x.title + ' ' + x.summary).indexOf(n) >= 0; }).map(function (x) { return { t: x.title, u: 'news.html#' + x.id, d: x.summary }; }));
    add('Events', EVENTS.filter(function (x) { return norm(x.title + ' ' + x.desc).indexOf(n) >= 0; }).map(function (x) { return { t: x.title, u: 'events.html#' + x.id, d: fmtDate(x.date) }; }));
    var total = 0;
    groups.forEach(function (g) {
      total += g.items.length;
      var ul = el('ul', { class: 'results single' });
      g.items.forEach(function (i) { ul.appendChild(el('li', {}, [el('h3', {}, [el('a', { href: i.u, text: i.t })]), el('p', { text: i.d })])); });
      out.appendChild(el('section', { 'aria-label': g.label + ' results', 'data-component': 'result-group' }, [el('h2', { text: g.label + ' (' + g.items.length + ')' }), ul]));
    });
    setStatus(status, total ? total + ' result' + (total === 1 ? '' : 's') + ' for "' + q + '".' : 'No results for "' + q + '". Try a program name, a department, or a campus service.');
  }

  function initApply() {
    var form = $('#apply-form'); initForm(form);
    form.addEventListener('demo-valid', function () { demoSuccess(form, 'Demo application started', 'In a real system you would now create an account and continue to the application. Here, your entries were checked only for format.'); });
  }
  function initVisit() {
    var form = $('#visit-form');
    var d = $('#visit-date'); var t = new Date(); t.setDate(t.getDate() + 1);
    d.setAttribute('min', t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2));
    initForm(form);
    form.addEventListener('demo-valid', function () { demoSuccess(form, 'Demo visit request recorded locally for this page only', 'A real request would be sent to the visit office. This demonstration does not reserve a time.'); });
  }
  if (page === 'majors') renderMajors();
  if (page === 'directories') renderPeople();
  if (page === 'news') renderNews();
  if (page === 'events') renderEvents();
  if (page === 'search') renderSearch();
  if (page === 'apply') initApply();
  if (page === 'visit') initVisit();
  /* highlight anchored item when arriving via hash */
  if (location.hash && (page === 'news' || page === 'events')) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) { t.setAttribute('tabindex', '-1'); t.scrollIntoView(); }
  }
})();
