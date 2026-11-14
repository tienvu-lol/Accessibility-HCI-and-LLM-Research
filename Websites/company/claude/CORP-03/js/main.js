/* Northcairn (fictional) - CORP-03 replica. Vanilla JS, inline data, no network. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- inline data ---------- */
  var SITE_INDEX = [
    { t: 'Northcairn home', u: 'index.html', d: 'Ship faster with control: the Cairn delivery platform overview.', k: 'home overview platform' },
    { t: 'Platform overview', u: 'platform.html', d: 'Trunk source control, Relay pipelines, Cellar registry, Sentinel scanning, Launchpad deployments.', k: 'trunk relay cellar sentinel launchpad pipelines registry' },
    { t: 'Pricing', u: 'pricing.html', d: 'Starter, Plus and Summit plans with an illustrative comparison table.', k: 'plans cost price tiers compare' },
    { t: 'Why Plus?', u: 'pricing-plus.html', d: 'What the Plus plan adds for growing engineering teams.', k: 'plus upgrade plan' },
    { t: 'Solutions', u: 'solutions.html', d: 'Outcomes, company sizes and industries.', k: 'solutions industries enterprise startups' },
    { t: 'Pipelines and continuous delivery', u: 'solutions-pipelines.html', d: 'Build, test and release automation with Relay.', k: 'ci cd continuous integration delivery build release' },
    { t: 'Customer stories', u: 'customers.html', d: 'Fictional customer stories grouped by industry.', k: 'case studies customers' },
    { t: 'Brannock Aerospace story', u: 'customer-story.html', d: 'A fictional story about shortening release cycles.', k: 'brannock aerospace case study' },
    { t: 'Blog', u: 'blog.html', d: 'Articles about delivery, security and engineering culture.', k: 'articles news posts' },
    { t: 'Contact sales', u: 'sales.html', d: 'Simulated contact form for the sales team.', k: 'talk to sales contact form' },
    { t: 'Request a demo', u: 'demo.html', d: 'Simulated demo request form.', k: 'demo book walkthrough' },
    { t: 'Jobs', u: 'jobs.html', d: 'Browse sample openings by location and department.', k: 'careers jobs hiring remote' },
    { t: 'About Northcairn', u: 'company.html', d: 'The fictional company, its values and leadership.', k: 'company about leadership' },
    { t: 'Get started', u: 'get-started.html', d: 'Choose a path and start a simulated free trial.', k: 'trial onboarding quick start install' },
    { t: 'Security and trust', u: 'security.html', d: 'How the fictional company approaches security.', k: 'security trust compliance privacy' }
  ];

  var JOBS = [
    ['Senior Backend Engineer, Relay', 'Engineering', 'Remote', 'Build the scheduler that runs millions of pipeline jobs.'],
    ['Staff Backend Engineer, Trunk', 'Engineering', 'Remote', 'Own repository storage performance and replication.'],
    ['Frontend Engineer, Workspace', 'Engineering', 'Lisbon', 'Craft accessible, fast interfaces for code review.'],
    ['Frontend Engineer, Pipelines UI', 'Engineering', 'Remote', 'Design visual pipeline graphs that work with a keyboard.'],
    ['Site Reliability Engineer', 'Engineering', 'Dublin', 'Keep the hosted service available and well understood.'],
    ['Site Reliability Engineer', 'Engineering', 'Bangalore', 'Join the follow-the-sun on-call rotation.'],
    ['Engineering Manager, Cellar', 'Engineering', 'Remote', 'Lead the team behind the artifact registry.'],
    ['Database Engineer', 'Engineering', 'Toronto', 'Tune query plans and plan large migrations.'],
    ['Security Engineer, Sentinel', 'Security', 'Remote', 'Improve the quality of the scanning engine findings.'],
    ['Application Security Analyst', 'Security', 'Austin', 'Triage reports and run the disclosure programme.'],
    ['Security Compliance Manager', 'Security', 'Dublin', 'Coordinate audits and evidence collection.'],
    ['Threat Detection Engineer', 'Security', 'Remote', 'Build detections for the internal fleet.'],
    ['Product Manager, Launchpad', 'Product', 'Remote', 'Shape the roadmap for deployment automation.'],
    ['Senior Product Manager, Assist', 'Product', 'Toronto', 'Define how automated agents help engineers safely.'],
    ['Product Designer, Onboarding', 'Product', 'Lisbon', 'Improve first-run experiences for new teams.'],
    ['UX Researcher', 'Product', 'Remote', 'Plan and run usability and accessibility studies.'],
    ['Technical Writer', 'Product', 'Remote', 'Write clear task-based help for builders.'],
    ['Account Executive, Mid-market', 'Sales', 'Austin', 'Guide mid-sized teams through evaluations.'],
    ['Account Executive, Enterprise', 'Sales', 'London', 'Lead complex multi-team engagements.'],
    ['Solutions Architect', 'Sales', 'Remote', 'Run technical workshops and proofs of concept.'],
    ['Sales Development Representative', 'Sales', 'Bangalore', 'Qualify inbound interest and book meetings.'],
    ['Customer Success Manager', 'Customer Support', 'London', 'Help customers reach their delivery goals.'],
    ['Support Engineer', 'Customer Support', 'Remote', 'Debug customer pipelines and write up fixes.'],
    ['Support Engineer', 'Customer Support', 'Bangalore', 'Cover the Asia-Pacific support window.'],
    ['Support Team Lead', 'Customer Support', 'Dublin', 'Coach a team of support engineers.'],
    ['Content Marketing Manager', 'Marketing', 'Remote', 'Plan the blog and long-form resources.'],
    ['Field Marketing Manager', 'Marketing', 'London', 'Run regional events and community meetups.'],
    ['Brand Designer', 'Marketing', 'Lisbon', 'Evolve the visual system across channels.'],
    ['Recruiter, Engineering', 'People', 'Remote', 'Partner with hiring managers on engineering roles.'],
    ['People Operations Partner', 'People', 'Dublin', 'Support managers and teams through the employee lifecycle.'],
    ['Learning and Development Lead', 'People', 'Remote', 'Build programmes for new managers.'],
    ['Financial Analyst', 'Finance', 'Austin', 'Support planning and monthly reporting.'],
    ['Revenue Accountant', 'Finance', 'Toronto', 'Own revenue recognition workflows.'],
    ['Legal Counsel, Commercial', 'Legal', 'London', 'Review customer agreements and policies.'],
    ['Data Analyst, Growth', 'Data', 'Remote', 'Measure activation and retention.'],
    ['Machine Learning Engineer, Assist', 'Data', 'Toronto', 'Evaluate and ship assistant features.']
  ];

  var POSTS = [
    ['Shorter feedback loops without skipping checks', 'Delivery', '2026-10-28', 'How teams trim build time while keeping every required gate in place.'],
    ['What a pipeline graph should tell you at a glance', 'Delivery', '2026-10-21', 'Design notes on making complex job graphs readable.'],
    ['A practical guide to secrets hygiene', 'Security', '2026-10-14', 'Rotation, scoping and detection habits that hold up under pressure.'],
    ['Reading scanner findings without panic', 'Security', '2026-10-07', 'A calm approach to prioritising vulnerability reports.'],
    ['Writing review comments people want to read', 'Culture', '2026-09-30', 'Small habits that make code review kinder and faster.'],
    ['Our remote-first handbook, one year on', 'Culture', '2026-09-23', 'What worked, what we changed and what we still debate.'],
    ['Introducing Cairn Assist previews', 'Product', '2026-09-16', 'A look at assisted agents that propose changes for humans to approve.'],
    ['Release notes: the autumn platform update', 'Product', '2026-09-09', 'New registry retention rules and faster repository imports.'],
    ['Accessible dashboards: lessons from usability tests', 'Product', '2026-09-02', 'What keyboard and screen reader users taught our design team.'],
    ['Measuring delivery performance responsibly', 'Delivery', '2026-08-26', 'Metrics that help teams without turning into leaderboards.'],
    ['Supply chain basics for small teams', 'Security', '2026-08-19', 'Pin, verify, record: three habits to start with this week.'],
    ['How we run blameless reviews', 'Culture', '2026-08-12', 'A template for incident reviews that focus on systems.'],
    ['Deploy windows are a smell', 'Delivery', '2026-08-05', 'Why frequent small releases beat scheduled big ones.'],
    ['Community spotlight: the autumn meetup series', 'Community', '2026-07-29', 'Highlights and recordings from this season of local meetups.']
  ];

  var STORIES = [
    ['Brannock Aerospace', 'Manufacturing', 'Cut release preparation from nine days to two by moving to one pipeline workspace.', 'customer-story.html'],
    ['Larkspur Credit Co-op', 'Finance', 'Standardised approvals and audit trails across eleven delivery teams.', null],
    ['Tidewater Transit Authority', 'Public sector', 'Moved rider-information releases to a weekly cadence.', null],
    ['Quillon Retail Group', 'Retail', 'Handled peak-season traffic with automated rollbacks.', null],
    ['Ferngate Health Network', 'Healthcare', 'Unified scanning across clinical and patient-facing apps.', null],
    ['Ombra Telecom', 'Telecommunications', 'Consolidated four toolchains into one shared platform.', null],
    ['Wickham Mutual', 'Finance', 'Reduced change-approval wait times by automating evidence.', null],
    ['Pinecrest University IT', 'Public sector', 'Gave student developers a safe shared sandbox.', null]
  ];

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  /* ---------- navigation ---------- */
  var triggers = $$('.nav-trigger');
  function closeMenus(except, returnFocus) {
    triggers.forEach(function (t) {
      if (t === except) return;
      if (t.getAttribute('aria-expanded') === 'true') {
        t.setAttribute('aria-expanded', 'false');
        $('#' + t.getAttribute('aria-controls')).hidden = true;
        if (returnFocus) t.focus();
      }
    });
  }
  triggers.forEach(function (t) {
    t.addEventListener('click', function () {
      var open = t.getAttribute('aria-expanded') === 'true';
      closeMenus(t);
      t.setAttribute('aria-expanded', String(!open));
      $('#' + t.getAttribute('aria-controls')).hidden = open;
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.primary-nav')) closeMenus();
  });
  var toggle = $('.menu-toggle'), navArea = $('#nav-area');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      navArea.classList.toggle('open', !open);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var d = $('dialog[open]');
    if (d) return; // native dialog handles it
    var openTrig = triggers.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
    if (openTrig) { closeMenus(null, false); openTrig.focus(); return; }
    if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
      toggle.setAttribute('aria-expanded', 'false'); navArea.classList.remove('open'); toggle.focus();
    }
  });
  // mark current
  var here = location.pathname.split('/').pop() || 'index.html';
  $$('.primary-nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) {
      a.setAttribute('aria-current', 'page');
      var li = a.closest('li.has-menu'); if (li) $('.nav-trigger', li).classList.add('has-current');
    }
  });

  /* ---------- site search dialog ---------- */
  var sBtn = $('#open-search'), dlg = $('#search-dialog');
  if (sBtn && dlg) {
    var sIn = $('#site-search-input'), sOut = $('#site-search-results'), sStat = $('#site-search-status');
    var runSearch = function () {
      var q = sIn.value.trim().toLowerCase();
      if (!q) { sOut.innerHTML = ''; sStat.textContent = 'Type to search the 15 pages of this demo site.'; return; }
      var terms = q.split(/\s+/);
      var hits = SITE_INDEX.filter(function (p) {
        var hay = (p.t + ' ' + p.d + ' ' + p.k).toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) > -1; });
      });
      sOut.innerHTML = hits.map(function (p) { return '<li><a href="' + p.u + '">' + esc(p.t) + '</a><br>' + esc(p.d) + '</li>'; }).join('');
      sStat.textContent = hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + sIn.value.trim() + '".' : 'No pages match "' + sIn.value.trim() + '". Try a shorter word such as "pricing" or "security".';
    };
    sBtn.addEventListener('click', function () {
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      sIn.focus(); runSearch();
    });
    $('#close-search').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () { sBtn.focus(); });
    $('#site-search-form').addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
    sIn.addEventListener('input', runSearch);
    dlg.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); dlg.close(); } });
  }

  /* ---------- accordions (generic) ---------- */
  function wireAccordion(root) {
    $$('.acc-btn', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        $('#' + b.getAttribute('aria-controls')).hidden = open;
      });
    });
  }
  $$('[data-accordion]').forEach(wireAccordion);

  /* ---------- tabs ---------- */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role=tab]', root);
    function select(t, focus) {
      tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; var p = document.getElementById(x.getAttribute('aria-controls')); if (p && root.dataset.tabs !== 'stories') p.hidden = !on; if (p && on) p.setAttribute('aria-labelledby', x.id); });
      if (focus) t.focus();
      if (root.dataset.tabs === 'stories') renderStories(t.dataset.filter);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') n = tabs[0];
        else if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* ---------- customers ---------- */
  var storyList = $('#story-list');
  function renderStories(filter) {
    if (!storyList) return;
    var list = STORIES.filter(function (s) { return !filter || filter === 'All' || s[1] === filter; });
    storyList.innerHTML = list.map(function (s) {
      var link = s[3] ? '<p><a href="' + s[3] + '">Read the story<span class="visually-hidden">: ' + esc(s[0]) + '</span></a></p>' : '<p class="meta">Summary only in this demo.</p>';
      return '<li class="card" data-component="story-card"><h3>' + esc(s[0]) + '</h3><p class="meta"><span class="tag">' + esc(s[1]) + '</span></p><p>' + esc(s[2]) + '</p>' + link + '</li>';
    }).join('');
    var st = $('#story-status'); if (st) st.textContent = list.length + ' stories shown' + (filter && filter !== 'All' ? ' for ' + filter : '') + '.';
  }
  renderStories('All');

  /* ---------- blog ---------- */
  var postList = $('#post-list');
  if (postList) {
    var bq = $('#blog-q'), bc = $('#blog-cat'), bs = $('#post-status'), be = $('#post-empty');
    var renderPosts = function () {
      var q = bq.value.trim().toLowerCase(), c = bc.value;
      var list = POSTS.filter(function (p) {
        return (!c || p[1] === c) && (!q || (p[0] + ' ' + p[3]).toLowerCase().indexOf(q) > -1);
      });
      postList.innerHTML = list.map(function (p) {
        return '<li class="card" data-component="blog-card"><p class="meta"><span class="tag">' + esc(p[1]) + '</span> <time datetime="' + p[2] + '">' + p[2] + '</time></p><h3>' + esc(p[0]) + '</h3><p>' + esc(p[3]) + '</p><p class="meta">Article pages are not part of this replica.</p></li>';
      }).join('');
      be.hidden = list.length > 0;
      bs.textContent = list.length + ' of ' + POSTS.length + ' articles shown.';
    };
    $('#blog-form').addEventListener('submit', function (e) { e.preventDefault(); renderPosts(); });
    bq.addEventListener('input', renderPosts); bc.addEventListener('change', renderPosts);
    $('#blog-reset').addEventListener('click', function () { bq.value = ''; bc.value = ''; renderPosts(); bq.focus(); });
    renderPosts();
  }

  /* ---------- jobs ---------- */
  var jobList = $('#job-list');
  if (jobList) {
    var jl = $('#job-location'), jd = $('#job-department'), jk = $('#job-keyword'), js = $('#job-status'), je = $('#job-empty');
    var uniq = function (i) { return JOBS.map(function (j) { return j[i]; }).filter(function (v, k, a) { return a.indexOf(v) === k; }).sort(); };
    uniq(2).forEach(function (v) { jl.add(new Option(v, v)); });
    uniq(1).forEach(function (v) { jd.add(new Option(v, v)); });
    var renderJobs = function () {
      var l = jl.value, d = jd.value, k = jk.value.trim().toLowerCase();
      var list = JOBS.filter(function (j) { return (!l || j[2] === l) && (!d || j[1] === d) && (!k || (j[0] + ' ' + j[3]).toLowerCase().indexOf(k) > -1); });
      jobList.innerHTML = list.map(function (j, i) {
        var id = 'job-' + i + '-' + slug(j[0] + j[2]);
        return '<div class="acc-item" data-component="job-row"><h3><button class="acc-btn" type="button" aria-expanded="false" aria-controls="' + id + '"><span>' + esc(j[0]) + '<span class="sub">' + esc(j[1]) + ' &middot; ' + esc(j[2]) + '</span></span></button></h3><div class="acc-panel" id="' + id + '" hidden><p>' + esc(j[3]) + '</p><p class="meta">Sample posting for a design study. Applications are not accepted and nothing is submitted.</p></div></div>';
      }).join('');
      wireAccordion(jobList);
      je.hidden = list.length > 0; jobList.hidden = list.length === 0;
      js.textContent = list.length + ' of ' + JOBS.length + ' openings shown.';
    };
    [jl, jd].forEach(function (s) { s.addEventListener('change', renderJobs); });
    jk.addEventListener('input', renderJobs);
    $('#job-filters').addEventListener('submit', function (e) { e.preventDefault(); renderJobs(); });
    $$('.job-reset').forEach(function (b) { b.addEventListener('click', function () { jl.value = ''; jd.value = ''; jk.value = ''; renderJobs(); jl.focus(); }); });
    renderJobs();
  }

  /* ---------- simulated forms ---------- */
  $$('form[data-demo-form]').forEach(function (form) {
    var summary = $('.error-summary', form.parentNode), success = $('.success', form.parentNode);
    var fields = $$('[data-rule]', form);
    function msgFor(f) {
      var v = f.type === 'checkbox' ? f.checked : f.value.trim();
      var label = f.dataset.label || 'This field';
      if (f.dataset.rule.indexOf('required') > -1 && !v) return f.type === 'checkbox' ? 'Please tick the box to continue.' : label + ' is required.';
      if (f.dataset.rule.indexOf('email') > -1 && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter an email address like name@example.com.';
      if (f.dataset.rule.indexOf('phone') > -1 && v && !/^[0-9+()\-.\s]{7,}$/.test(v)) return 'Enter a phone number using digits, spaces, + or dashes (at least 7 characters).';
      return '';
    }
    function show(f, m) {
      var e = document.getElementById(f.id + '-error');
      e.textContent = m; f.setAttribute('aria-invalid', m ? 'true' : 'false');
    }
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.dataset.touched) show(f, msgFor(f)); });
      f.addEventListener('input', function () { f.dataset.touched = '1'; if (f.getAttribute('aria-invalid') === 'true') show(f, msgFor(f)); });
      f.addEventListener('change', function () { f.dataset.touched = '1'; if (f.getAttribute('aria-invalid') === 'true') show(f, msgFor(f)); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [];
      fields.forEach(function (f) { var m = msgFor(f); show(f, m); if (m) errs.push([f, m]); });
      if (errs.length) {
        $('ul', summary).innerHTML = errs.map(function (x) { return '<li><a href="#' + x[0].id + '">' + esc(x[1]) + '</a></li>'; }).join('');
        summary.hidden = false; summary.focus();
        $$('a', summary).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); errs[i][0].focus(); }); });
        return;
      }
      summary.hidden = true; form.hidden = true; success.hidden = false; success.focus();
    });
  });
})();
