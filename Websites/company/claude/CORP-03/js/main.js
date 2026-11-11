/* Forgeline (fictional demo site) - vanilla JS, no dependencies, works from file:// */
(function () {
  'use strict';

  /* Inline demo data (no fetch, works from file://) */
  var DATA = {
    search: [
      {"title":"Forgeline - Ship faster, stay accountable","desc":"Forgeline is a fictional DevSecOps platform used as an accessibility research replica.","url":"index.html"},
      {"title":"Platform","desc":"Everything in the Forgeline platform, from source control and CI/CD to security, agents and analytics.","url":"platform.html"},
      {"title":"Pricing","desc":"Compare Free, Premium and Ultimate plans and read answers to common pricing questions.","url":"pricing.html"},
      {"title":"Why Premium?","desc":"What the Premium plan adds for teams that need faster reviews and stronger delivery controls.","url":"pricing-premium.html"},
      {"title":"Solutions","desc":"Forgeline solutions by outcome, company size and industry.","url":"solutions.html"},
      {"title":"Continuous integration and delivery","desc":"How Forgeline CI/CD builds, tests and ships software from one workflow.","url":"solutions-ci-cd.html"},
      {"title":"Customer stories","desc":"Case studies from fictional Forgeline customers, filterable by industry.","url":"customers.html"},
      {"title":"Meridian Labs customer story","desc":"How the fictional Meridian Labs unified its build systems on Forgeline.","url":"customer-story.html"},
      {"title":"Blog","desc":"Engineering, security, AI and company news from Forgeline, with search and category filter.","url":"blog.html"},
      {"title":"Contact sales","desc":"Talk to the Forgeline sales team using this demo form.","url":"contact-sales.html"},
      {"title":"Request a demo","desc":"Request a Forgeline product demonstration using this demo form.","url":"request-demo.html"},
      {"title":"Join Forgeline","desc":"Life, values and teams at Forgeline, with a route to all open roles.","url":"careers.html"},
      {"title":"Open roles","desc":"Browse and filter open Forgeline roles by department and location.","url":"careers-all.html"},
      {"title":"About Forgeline","desc":"Mission, leadership, trust and legal notes for the fictional Forgeline company.","url":"company.html"},
      {"title":"CI/CD","desc":"Build, test, and deploy with pipelines defined next to your code.","url":"platform.html#ci-cd"},
      {"title":"Source code management","desc":"Branching, reviews, and protected paths with a clear history.","url":"platform.html#source-code"},
      {"title":"Agile delivery","desc":"Plan work in boards and milestones linked to real changes.","url":"platform.html#agile"},
      {"title":"Artifact management","desc":"Store packages and images with retention and access rules.","url":"platform.html#artifacts"},
      {"title":"Application security testing","desc":"Static, dynamic, and dependency scans on every merge request.","url":"platform.html#security-testing"},
      {"title":"Governance and compliance","desc":"Policies, approvals, and evidence that map to your frameworks.","url":"platform.html#governance"},
      {"title":"Secrets management","desc":"Detect leaks, rotate credentials, and issue short-lived tokens.","url":"platform.html#secrets"},
      {"title":"Supply chain security","desc":"Signed builds and recorded inputs for every release artifact.","url":"platform.html#supply-chain"},
      {"title":"Agent platform","desc":"Run reviewers and assistants inside the same permissions as people.","url":"platform.html#agent-platform"},
      {"title":"Context Map","desc":"A shared graph of services, owners, and recent changes.","url":"platform.html#context-map"},
      {"title":"Value stream analytics","desc":"Measure lead time, deployment frequency, and review delays.","url":"platform.html#visibility"},
      {"title":"DevOps modernization","desc":"Replace a patchwork of tools with one delivery workflow.","url":"solutions.html#devops"},
      {"title":"Security and compliance","desc":"Shift checks left without slowing teams down.","url":"solutions.html#security"},
      {"title":"AI-assisted delivery","desc":"Adopt automation with guardrails and an audit trail.","url":"solutions.html#ai-modernization"},
      {"title":"Enterprise","desc":"Scale governance across hundreds of teams.","url":"solutions.html#enterprise"},
      {"title":"Small business","desc":"A simple setup that grows with you.","url":"solutions.html#small-business"},
      {"title":"Startups","desc":"Ship fast from day one with sensible defaults.","url":"solutions.html#startups"},
      {"title":"Financial services","desc":"Change control and evidence for regulated releases.","url":"solutions.html#financial-services"},
      {"title":"Public sector","desc":"Transparent, auditable delivery for agencies.","url":"solutions.html#public-sector"},
      {"title":"Telecommunications","desc":"Coordinate releases across network and software teams.","url":"solutions.html#telecommunications"},
      {"title":"Automotive","desc":"Deliver embedded and cloud software together.","url":"solutions.html#automotive"},
      {"title":"Education","desc":"Affordable tooling for institutions and research groups.","url":"solutions.html#education"},
      {"title":"Aerospace","desc":"Traceability from requirement to release.","url":"solutions.html#aerospace"},
      {"title":"Pipelines that explain their own failures","desc":"Blog, Engineering: Failure summaries that point at the changed line instead of a 4,000-line log.","url":"blog-post.html?post=pipelines-that-explain-failures"},
      {"title":"A practical guide to secrets hygiene","desc":"Blog, Security: Rotate, scope, and scan: three habits that remove most credential incidents.","url":"blog-post.html?post=secrets-hygiene-guide"},
      {"title":"Agents in the merge request: what we learned","desc":"Blog, AI: Six months of letting automated reviewers comment next to humans.","url":"blog-post.html?post=agents-in-the-merge-request"},
      {"title":"Cutting cold-start time for shared runners","desc":"Blog, Engineering: How image caching and warm pools took the median queue wait from 41 to 9 seconds.","url":"blog-post.html?post=faster-shared-runners"},
      {"title":"Our approach to dependency provenance","desc":"Blog, Security: Signed builds, recorded inputs, and a verification step you can run yourself.","url":"blog-post.html?post=dependency-provenance"},
      {"title":"Introducing the Forgeline Context Map","desc":"Blog, AI: A browsable graph of services, owners, and recent changes that agents and people share.","url":"blog-post.html?post=introducing-context-map"},
      {"title":"How we run quarterly planning, remotely","desc":"Blog, Company: A written-first process that works across eleven time zones.","url":"blog-post.html?post=quarterly-planning-remotely"},
      {"title":"Release notes: October 2026","desc":"Blog, Engineering: Merge trains for monorepos, clearer approval rules, and a calmer notifications page.","url":"blog-post.html?post=release-notes-october-2026"},
      {"title":"Senior Backend Engineer, Pipelines","desc":"Open role, Engineering, Remote - Americas","url":"careers-all.html"},
      {"title":"Staff Site Reliability Engineer","desc":"Open role, Engineering, Remote - EMEA","url":"careers-all.html"},
      {"title":"Frontend Engineer, Developer Experience","desc":"Open role, Engineering, Dublin","url":"careers-all.html"},
      {"title":"Security Engineer, Supply Chain","desc":"Open role, Engineering, Remote - APAC","url":"careers-all.html"},
      {"title":"Engineering Manager, Runners","desc":"Open role, Engineering, Austin","url":"careers-all.html"},
      {"title":"Enterprise Account Executive","desc":"Open role, Sales, Austin","url":"careers-all.html"},
      {"title":"Solutions Architect","desc":"Open role, Sales, Remote - EMEA","url":"careers-all.html"},
      {"title":"Sales Development Representative","desc":"Open role, Sales, Dublin","url":"careers-all.html"},
      {"title":"Product Marketing Manager, Security","desc":"Open role, Marketing, Remote - Americas","url":"careers-all.html"},
      {"title":"Technical Writer","desc":"Open role, Marketing, Remote - APAC","url":"careers-all.html"},
      {"title":"Support Engineer, Tier 2","desc":"Open role, Support, Remote - EMEA","url":"careers-all.html"},
      {"title":"Support Engineer, Tier 1","desc":"Open role, Support, Remote - Americas","url":"careers-all.html"},
      {"title":"Talent Partner","desc":"Open role, People, Dublin","url":"careers-all.html"},
      {"title":"People Operations Specialist","desc":"Open role, People, Austin","url":"careers-all.html"}
    ],
    posts: [
      {"slug":"pipelines-that-explain-failures","title":"Pipelines that explain their own failures","date":"2026-10-28","category":"Engineering","excerpt":"Failure summaries that point at the changed line instead of a 4,000-line log.","body":["Most pipeline failures are not mysterious; they are just buried. We started grouping log output by the job step that produced it and attaching the nearest changed file to each failure.","The result is a short summary at the top of every failed run. Teams told us triage time dropped because the first screen already answered the question \"what did I break?\"."]},
      {"slug":"secrets-hygiene-guide","title":"A practical guide to secrets hygiene","date":"2026-10-21","category":"Security","excerpt":"Rotate, scope, and scan: three habits that remove most credential incidents.","body":["Long-lived tokens in environment variables are the most common finding in our internal reviews. The fix is rarely exotic: short lifetimes, narrow scopes, and scanning on every push.","This guide walks through a rollout plan that a platform team can finish in a quarter, including how to measure whether rotation is actually happening."]},
      {"slug":"agents-in-the-merge-request","title":"Agents in the merge request: what we learned","date":"2026-10-14","category":"AI","excerpt":"Six months of letting automated reviewers comment next to humans.","body":["We put an automated reviewer in the same thread as human reviewers and kept a log of every suggestion that was accepted, edited, or dismissed.","The most useful comments were narrow and cited a line. The least useful were broad style opinions. We now tune for the first kind and let teams mute the second."]},
      {"slug":"faster-shared-runners","title":"Cutting cold-start time for shared runners","date":"2026-10-02","category":"Engineering","excerpt":"How image caching and warm pools took the median queue wait from 41 to 9 seconds.","body":["Queue time is felt more than build time. We profiled where the first minute of a job goes and found that image pulls dominated.","A warm pool of pre-pulled base images, plus a smarter placement rule, cut the median wait dramatically without raising idle cost by more than a few percent."]},
      {"slug":"dependency-provenance","title":"Our approach to dependency provenance","date":"2026-09-24","category":"Security","excerpt":"Signed builds, recorded inputs, and a verification step you can run yourself.","body":["Knowing what went into a build matters as much as knowing it passed. Every release artifact now carries a signed record of its inputs.","Consumers can verify that record with a single command. We describe the format, the threat model it addresses, and the cases it does not."]},
      {"slug":"introducing-context-map","title":"Introducing the Forgeline Context Map","date":"2026-09-16","category":"AI","excerpt":"A browsable graph of services, owners, and recent changes that agents and people share.","body":["Automation is only as good as the context it can see. The Context Map links repositories, pipelines, environments, and owners into one graph.","People can browse it; agents can query it. Both see the same permissions, so nothing is exposed that the requester could not already open."]},
      {"slug":"quarterly-planning-remotely","title":"How we run quarterly planning, remotely","date":"2026-09-05","category":"Company","excerpt":"A written-first process that works across eleven time zones.","body":["Planning used to mean a week of meetings. We moved to a written-first format: proposals are drafted, commented asynchronously, and only then discussed live.","Decisions are recorded in the handbook with an owner and a review date, which makes it easy to revisit them later."]},
      {"slug":"release-notes-october-2026","title":"Release notes: October 2026","date":"2026-10-31","category":"Engineering","excerpt":"Merge trains for monorepos, clearer approval rules, and a calmer notifications page.","body":["This month adds merge trains that understand path ownership, so unrelated changes no longer wait on each other.","Approval rules now show why a rule applies, and the notifications page groups by project so busy days are easier to scan."]}
    ]
  };

  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  doc.documentElement.classList.add('js');

  /* ---------- Primary navigation: mega-menus + mobile disclosure ---------- */
  var nav = $('#primary-nav');
  var navToggle = $('.nav-toggle');
  var menuButtons = $$('.menu-button');
  var isMobile = function () { return window.matchMedia('(max-width: 62.5em)').matches; };

  function setMenu(button, open) {
    button.setAttribute('aria-expanded', String(open));
    doc.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  }
  function closeMenus(except) {
    menuButtons.forEach(function (b) { if (b !== except) setMenu(b, false); });
  }
  menuButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeMenus(b);
      setMenu(b, !open);
    });
  });
  navToggle.addEventListener('click', function () {
    var open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
    if (open) closeMenus();
  });
  doc.addEventListener('click', function (e) { if (!e.target.closest('.has-menu')) closeMenus(); });
  nav.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !e.relatedTarget.closest('.has-menu')) closeMenus();
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openButton = menuButtons.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openButton) { closeMenus(); openButton.focus(); return; }
    if (isMobile() && navToggle.getAttribute('aria-expanded') === 'true') {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      navToggle.focus();
    }
  });

  /* ---------- Site search dialog over an inline index ---------- */
  var dialog = $('#search-dialog');
  var searchOpen = $('.search-open');
  if (dialog && searchOpen) {
    var searchInput = $('#site-search-input');
    var resultList = $('#search-results');
    var searchStatus = $('#search-status');
    var renderResults = function () {
      var terms = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
      resultList.textContent = '';
      if (!terms.length) { searchStatus.textContent = 'Type to search pages, products, posts and solutions.'; return; }
      var hits = DATA.search.filter(function (item) {
        var hay = (item.title + ' ' + item.desc).toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      hits.slice(0, 8).forEach(function (item) {
        var li = doc.createElement('li');
        var a = doc.createElement('a');
        a.href = item.url;
        a.textContent = item.title;
        var p = doc.createElement('span');
        p.textContent = item.desc;
        li.appendChild(a);
        li.appendChild(p);
        resultList.appendChild(li);
      });
      searchStatus.textContent = hits.length
        ? hits.length + (hits.length === 1 ? ' result' : ' results') + (hits.length > 8 ? ', showing the first 8' : '') + '.'
        : 'No results for "' + searchInput.value.trim() + '". Try a broader word such as "pipeline" or "security".';
    };
    searchOpen.addEventListener('click', function () {
      dialog.showModal();
      searchInput.focus();
      renderResults();
    });
    $('.search-close', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    $('form', dialog).addEventListener('submit', function (e) { e.preventDefault(); renderResults(); });
    searchInput.addEventListener('input', renderResults);
  }

  /* ---------- Accordions (aria-expanded buttons) ---------- */
  $$('.accordion-trigger').forEach(function (button) {
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      doc.getElementById(button.getAttribute('aria-controls')).hidden = open;
    });
  });

  /* ---------- Tabs filtering customer stories ---------- */
  $$('[data-component="tabs"]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    var panel = $('[role="tabpanel"]', root);
    var items = $$('[data-industry]', panel);
    var status = $('.tabs-status', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      var industry = tab.getAttribute('data-industry-filter');
      var shown = 0;
      items.forEach(function (item) {
        var match = industry === 'all' || item.getAttribute('data-industry') === industry;
        item.hidden = !match;
        if (match) shown++;
      });
      status.textContent = 'Showing ' + shown + ' of ' + items.length + ' customer stories: ' + tab.textContent + '.';
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select(tabs[(next + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ---------- Filter bars (blog, jobs): text box + selects over data-* attributes ---------- */
  $$('[data-component="filter-bar"]').forEach(function (form) {
    var list = doc.getElementById(form.getAttribute('data-target'));
    var items = $$('[data-filter-item]', list);
    var status = $('.filter-status', form);
    var empty = doc.getElementById(form.getAttribute('data-empty'));
    var noun = form.getAttribute('data-noun');
    function apply() {
      var shown = 0;
      items.forEach(function (item) {
        var match = $$('[data-filter-key]', form).every(function (control) {
          var value = control.value.trim().toLowerCase();
          if (!value) return true;
          var key = control.getAttribute('data-filter-key');
          if (key === 'q') return item.textContent.toLowerCase().indexOf(value) !== -1;
          return (item.getAttribute('data-' + key) || '').toLowerCase() === value;
        });
        item.hidden = !match;
        if (match) shown++;
      });
      empty.hidden = shown !== 0;
      status.textContent = 'Showing ' + shown + ' of ' + items.length + ' ' + noun + '.';
    }
    form.addEventListener('input', apply);
    form.addEventListener('change', apply);
    form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    form.addEventListener('reset', function () { setTimeout(apply, 0); });
    $('.filter-reset', empty).addEventListener('click', function () { form.reset(); apply(); $('[data-filter-key]', form).focus(); });
    apply();
  });

  /* ---------- Labeled demo buttons (no real action) ---------- */
  $$('[data-demo-message]').forEach(function (button) {
    button.addEventListener('click', function () {
      var note = doc.getElementById(button.getAttribute('data-demo-note'));
      note.textContent = button.getAttribute('data-demo-message');
    });
  });

  /* ---------- Demo forms: validation, error summary, focus management ---------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function fieldMessage(control) {
    var label = control.getAttribute('data-label') || 'This field';
    var value = control.value.trim();
    if (control.required && !value) return label + ' is required.';
    if (control.type === 'email' && value && !EMAIL.test(value)) return 'Enter ' + label.toLowerCase() + ' in the format name@example.com.';
    var min = Number(control.getAttribute('data-minlength'));
    if (min && value && value.length < min) return label + ' needs at least ' + min + ' characters (currently ' + value.length + ').';
    return '';
  }
  function setError(control, message) {
    var id = control.id + '-error';
    var existing = doc.getElementById(id);
    if (!message) {
      if (existing) existing.remove();
      control.removeAttribute('aria-invalid');
      control.removeAttribute('aria-describedby');
      return;
    }
    if (!existing) {
      existing = doc.createElement('p');
      existing.id = id;
      existing.className = 'field-error';
      control.parentNode.appendChild(existing);
    }
    existing.textContent = 'Error: ' + message;
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', id);
  }
  $$('form[data-component="demo-form"]').forEach(function (form) {
    var summary = $('.error-summary', form.parentNode);
    var success = $('.demo-success', form.parentNode);
    var controls = $$('input[data-label], select[data-label], textarea[data-label]', form);
    controls.forEach(function (c) {
      c.addEventListener('blur', function () { if (c.hasAttribute('aria-invalid')) setError(c, fieldMessage(c)); });
      c.addEventListener('input', function () { if (c.hasAttribute('aria-invalid')) setError(c, fieldMessage(c)); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var problems = [];
      controls.forEach(function (c) {
        var message = fieldMessage(c);
        setError(c, message);
        if (message) problems.push({ control: c, message: message });
      });
      if (problems.length) {
        var list = $('ul', summary);
        list.textContent = '';
        problems.forEach(function (p) {
          var li = doc.createElement('li');
          var a = doc.createElement('a');
          a.href = '#' + p.control.id;
          a.textContent = p.message;
          a.addEventListener('click', function (ev) { ev.preventDefault(); p.control.focus(); });
          li.appendChild(a);
          list.appendChild(li);
        });
        $('.error-count', summary).textContent = problems.length === 1 ? '1 problem needs your attention' : problems.length + ' problems need your attention';
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  });

  /* ---------- Blog article page (rendered from inline data) ---------- */
  var article = $('#post-article');
  if (article) {
    var slug = new URLSearchParams(window.location.search).get('post');
    var post = DATA.posts.filter(function (p) { return p.slug === slug; })[0];
    var heading = $('h1', article);
    if (post) {
      doc.title = post.title + ' | Forgeline blog';
      heading.textContent = post.title;
      $('#post-meta').textContent = post.category + ' · Published ' + post.date;
      $('#post-crumb').textContent = post.title;
      var body = $('#post-body');
      body.textContent = '';
      post.body.forEach(function (text) {
        var p = doc.createElement('p');
        p.textContent = text;
        body.appendChild(p);
      });
    } else {
      doc.title = 'Article not found | Forgeline blog';
      heading.textContent = 'We could not find that article';
      $('#post-meta').textContent = '';
      $('#post-body').textContent = 'The article link may be out of date. Browse all posts from the blog index.';
    }
  }
})();
