/* The console's one moment of motion: the pipeline fills in the first time it appears.
   GSAP is vendored (vendor/gsap.min.js); the demo variables live in :root in style.css. Skipped for reduced motion. */
(function () {
  'use strict';
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var view = document.getElementById('view');
  if (!view) return;
  var v = function (n, d) { var x = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n)); return isNaN(x) ? d : x; };
  var seen = false;
  var obs = new MutationObserver(function () {
    if (seen || !view.querySelector('.step')) return;
    seen = true; obs.disconnect();
    var d = v('--motion-duration', 0.7), q = function (s) { return gsap.utils.toArray(s, view); };
    var tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: d }, onComplete: function () { gsap.set(view.querySelectorAll('.step, .bar > span, .spend-fill, .mark'), { clearProps: 'transform,opacity,transformOrigin' }); } });
    tl.from(q('.step'), { y: v('--motion-distance', 18), opacity: 0, stagger: v('--motion-stagger', 0.09) })
      .from(q('.step .bar > span'), { scaleX: 0, transformOrigin: 'left center', stagger: v('--motion-stagger', 0.09), duration: d * 1.4 }, '<0.15')
      .from(q('.spend-fill'), { scaleX: 0, transformOrigin: 'left center', duration: d * 1.6 }, 0.2)
      .from(q('.spend .mark'), { opacity: 0, stagger: 0.12 }, '>-0.4');
    // the running step keeps a slow orange ring so it reads as in progress
    gsap.fromTo(q('.step-active .step-n'), { boxShadow: '0 0 0 0 rgb(255 100 6 / .55)' }, { boxShadow: '0 0 0 5px rgb(255 100 6 / 0)', duration: 1.4, repeat: -1, ease: 'power1.out' });
  });
  obs.observe(view, { childList: true, subtree: true });
})();
