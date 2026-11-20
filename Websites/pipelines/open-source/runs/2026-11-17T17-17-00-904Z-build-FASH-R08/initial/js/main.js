/* Shared JavaScript for the replica site */
(() => {
  /* ---------- Sample data ---------- */
  const fashionArticles = [
    {title: "Spring Layering Tips", img: "assets/img/fashion1.svg", blurb: "How to transition your wardrobe."},
    {title: "Denim Trends 2026", img: "assets/img/fashion2.svg", blurb: "What's new in jeans this season."},
    {title: "Sustainable Fabrics", img: "assets/img/fashion3.svg", blurb: "Eco‑friendly materials to look for."},
    {title: "Accessorizing Basics", img: "assets/img/fashion4.svg", blurb: "Bags, belts and jewelry."},
    {title: "Work‑to‑Weekend Looks", img: "assets/img/fashion5.svg", blurb: "Versatile outfits."},
    {title: "Vintage Revival", img: "assets/img/fashion6.svg", blurb: "Retro pieces making a comeback."},
    {title: "Athleisure Evolution", img: "assets/img/fashion7.svg", blurb: "From gym to street."},
    {title: "Color Blocking Guide", img: "assets/img/fashion8.svg", blurb: "Bold combinations."},
    {title: "Footwear Forecast", img: "assets/img/fashion9.svg", blurb: "Shoes to invest in."},
    {title: "Celebrity Style Breakdown", img: "assets/img/fashion10.svg", blurb: "Red carpet insights."}
  ];
  const beautyArticles = [
    {title: "Summer Skincare Routine", img: "assets/img/beauty1.svg", blurb: "Hydration and SPF."},
    {title: "Bold Lip Trends", img: "assets/img/beauty2.svg", blurb: "Shades to try."},
    {title: "Haircare for Humidity", img: "assets/img/beauty3.svg", blurb: "Frizz‑free tips."},
    {title: "Minimalist Makeup", img: "assets/img/beauty4.svg", blurb: "Natural look."},
    {title: "Nail Art Ideas", img: "assets/img/beauty5.svg", blurb: "Simple designs."},
    {title: "Fragrance Layering", img: "assets/img/beauty6.svg", blurb: "Creating signature scents."},
    {title: "Eye Cream Essentials", img: "assets/img/beauty7.svg", blurb: "What to look for."},
    {title: "DIY Hair Masks", img: "assets/img/beauty8.svg", blurb: "Kitchen ingredients."}
  ];
  const shoppingItems = [
    {name: "Linen Blend Shirt", price: "$45", img: "assets/img/shop1.svg"},
    {name: "High‑Rise Denim", price: "$68", img: "assets/img/shop2.svg"},
    {name: "Leather Ankle Boots", price: "$120", img: "assets/img/shop3.svg"},
    {name: "Silk Scarf", price: "$32", img: "assets/img/shop4.svg"},
    {name: "Canvas Tote", price: "$25", img: "assets/img/shop5.svg"},
    {name: "Pearl Earrings", price: "$50", img: "assets/img/shop6.svg"},
    {name: "Sporty Sunglasses", price: "$40", img: "assets/img/shop7.svg"},
    {name: "Structured Blazer", price: "$110", img: "assets/img/shop8.svg"},
    {name: "Knitted Dress", price: "$75", img: "assets/img/shop9.svg"},
    {name: "Minimalist Watch", price: "$95", img: "assets/img/shop10.svg"},
    {name: "Eco‑Friendly Sneakers", price: "$80", img: "assets/img/shop11.svg"},
    {name: "Silk Pillowcase", price: "$55", img: "assets/img/shop12.svg"}
  ];
  const lookbookImages = [
    "assets/img/look1.svg",
    "assets/img/look2.svg",
    "assets/img/look3.svg",
    "assets/img/look4.svg",
    "assets/img/look5.svg",
    "assets/img/look6.svg",
    "assets/img/look7.svg",
    "assets/img/look8.svg",
    "assets/img/look9.svg",
    "assets/img/look10.svg",
    "assets/img/look11.svg",
    "assets/img/look12.svg",
    "assets/img/look13.svg",
    "assets/img/look14.svg",
    "assets/img/look15.svg"
  ];
  const diaryEntries = [
    {title: "Week 1: Budgeting Basics", blurb: "Tracking every coffee."},
    {title: "Week 2: Splurge vs Save", blurb: "When to treat yourself."},
    {title: "Week 3: Side‑Hustle Income", blurb: "Freelance gigs."},
    {title: "Week 4: Unexpected Expense", blurb: "Car repair surprise."},
    {title: "Week 5: Savings Goal Reached", blurb: "Emergency fund complete."}
  ];
  const horoscopeSigns = [
    {sign: "Aries", dates: "Mar 21‑Apr 19", advice: "Take initiative in projects."},
    {sign: "Taurus", dates: "Apr 20‑May 20", advice: "Focus on financial stability."},
    {sign: "Gemini", dates: "May 21‑Jun 20", advice: "Communicate clearly."},
    {sign: "Cancer", dates: "Jun 21‑Jul 22", advice: "Nurture home life."},
    {sign: "Leo", dates: "Jul 23‑Aug 22", advice: "Showcase your creativity."},
    {sign: "Virgo", dates: "Aug 23‑Sep 22", advice: "Organize your workspace."},
    {sign: "Libra", dates: "Sep 23‑Oct 22", advice: "Seek balance in relationships."},
    {sign: "Scorpio", dates: "Oct 23‑Nov 21", advice: "Trust your intuition."},
    {sign: "Sagittarius", dates: "Nov 22‑Dec 21", advice: "Explore new horizons."},
    {sign: "Capricorn", dates: "Dec 22‑Jan 19", advice: "Set long‑term goals."},
    {sign: "Aquarius", dates: "Jan 20‑Feb 18", advice: "Engage in community."},
    {sign: "Pisces", dates: "Feb 19‑Mar 20", advice: "Practice self‑compassion."}
  ];
  const podcastEpisodes = [
    {title: "Episode 1: Fashion Futures", host: "Alex", duration: "28:12"},
    {title: "Episode 2: Beauty Inside Out", host: "Sam", duration: "31:05"},
    {title: "Episode 3: Sustainable Shopping", host: "Taylor", duration: "26:40"},
    {title: "Episode 4: Money Mindset", host: "Jordan", duration: "29:58"},
    {title: "Episode 5: Horoscope Deep Dive", host: "Casey", duration: "27:33"},
    {title: "Episode 6: Behind the Lookbook", host: "Riley", duration: "30:10"}
  ];

  /* ---------- Utility helpers ---------- */
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  /* ---------- Navigation highlight ---------- */
  function setActiveNav() {
    const path = location.pathname.replace(/^\/|\/$/g, '');
    const map = {
      '': 'index.html',
      'index.html': 'index.html',
      'fashion.html': 'fashion.html',
      'beauty.html': 'beauty.html',
      'shopping.html': 'shopping.html',
      'summer-lookbook-2026.html': 'summer-lookbook-2026.html',
      'money-diary.html': 'money-diary.html',
      'horoscope.html': 'horoscope.html',
      'podcasts.html': 'podcasts.html'
    };
    const target = map[path] || 'index.html';
    qsa('.primary-nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.endsWith(target)) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  /* ---------- Search functionality ---------- */
  function initSearch() {
    const form = qs('.search-form');
    if (!form) return;
    const input = qs('input[type="search"]', form);
    const resultsContainer = qs('.search-results');
    if (!input || !resultsContainer) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const term = input.value.trim().toLowerCase();
      resultsContainer.innerHTML = '';
      if (!term) {
        resultsContainer.innerHTML = '<p>Enter a search term.</p>';
        return;
      }
      let dataset = [];
      if (location.pathname.includes('fashion')) dataset = fashionArticles;
      else if (location.pathname.includes('beauty')) dataset = beautyArticles;
      else if (location.pathname.includes('shopping')) dataset = shoppingItems;
      else dataset = [...fashionArticles, ...beautyArticles, ...shoppingItems];

      const matches = dataset.filter(item =>
        item.title.toLowerCase().includes(term) ||
        (item.blurb && item.blurb.toLowerCase().includes(term))
      );
      if (matches.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
      }
      const list = document.createElement('ul');
      matches.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}</strong>: ${item.blurb || ''}`;
        list.appendChild(li);
      });
      resultsContainer.appendChild(list);
    });
  }

  /* ---------- Carousel / Lightbox for lookbook ---------- */
  function initLookbook() {
    const carousel = qs('.lookbook-carousel');
    if (!carousel) return;
    const prevBtn = qs('.carousel-prev', carousel);
    const nextBtn = qs('.carousel-next', carousel);
    const modalBackdrop = qs('.modal-backdrop');
    const modalImg = qs('.modal-content img', modalBackdrop);
    const modalClose = qs('.modal-close', modalBackdrop);
    let index = 0;

    function showSlide(i) {
      const slides = qsa('.lookbook-slide', carousel);
      slides.forEach((s, idx) => {
        s.style.display = idx === i ? 'block' : 'none';
      });
    }
    function loadSlides() {
      carousel.innerHTML = '';
      lookbookImages.forEach((src, idx) => {
        const slide = document.createElement('div');
        slide.className = 'lookbook-slide';
        slide.style.display = idx === 0 ? 'block' : 'none';
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Lookbook image ${idx + 1}`;
        img.loading = 'lazy';
        img.addEventListener('click', () => {
          modalImg.src = src;
          modalImg.alt = `Lookbook image ${idx + 1}`;
          modalBackdrop.setAttribute('aria-hidden', 'false');
        });
        slide.appendChild(img);
        carousel.appendChild(slide);
      });
    }
    loadSlides();
    if (prevBtn) prevBtn.addEventListener('click', () => {
      index = (index - 1 + lookbookImages.length) % lookbookImages.length;
      showSlide(index);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      index = (index + 1) % lookbookImages.length;
      showSlide(index);
    });
    if (modalClose) modalClose.addEventListener('click', () => {
      modalBackdrop.setAttribute('aria-hidden', 'true');
    });
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) modalBackdrop.setAttribute('aria-hidden', 'true');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modalBackdrop.setAttribute('aria-hidden', 'true');
      if (modalBackdrop.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'ArrowLeft') { e.preventDefault(); index = (index - 1 + lookbookImages.length) % lookbookImages.length; showSlide(index); }
        if (e.key === 'ArrowRight') { e.preventDefault(); index = (index + 1) % lookbookImages.length; showSlide(index); }
      }
    });
  }

  /* ---------- Newsletter form simulation ---------- */
  function initNewsletter() {
    const form = qs('.newsletter-form');
    if (!form) return;
    const input = qs('input[type="email"]', form);
    const submit = qs('button[type="submit"]', form);
    const toast = qs('.toast');
    if (!input || !submit || !toast) return;

    submit.addEventListener('click', e => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email) return;
      // Simulate success
      toast.textContent = 'Thanks for subscribing!';
      toast.classList.add('visible');
      input.value = '';
      setTimeout(() => toast.classList.remove('visible'), 3000);
    });
  }

  /* ---------- Init on DOMContentLoaded ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initSearch();
    initLookbook();
    initNewsletter();
  });
})();
