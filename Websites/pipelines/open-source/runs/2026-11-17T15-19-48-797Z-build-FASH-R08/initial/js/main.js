/* Sample data arrays for demo purposes */
const fashionArticles = [
  {title:"Spring Layering Guide", blurb:"How to master transitional dressing with light jackets and scarves.", img:"assets/placeholder.svg", date:"2026-03-12"},
  {title:"Denim Trends 2026", blurb:"From wide‑leg to cropped, see what’s dominating the denim scene.", img:"assets/placeholder.svg", date:"2026-02-28"},
  {title:"Sustainable Sneakers", blurb:"Eco‑friendly kicks that don’t compromise on style.", img:"assets/placeholder.svg", date:"2026-02-15"},
  {title:"Office‑to‑Evening Dresses", blurb:"One piece that works for meetings and after‑work drinks.", img:"assets/placeholder.svg", date:"2026-02-01"},
  {title:"Accessorizing with Belts", blurb:"Define your waist and add polish to any outfit.", img:"assets/placeholder.svg", date:"2026-01-20"},
  {title:"Travel Wardrobe Essentials", blurb:"Pack light, look polished on any journey.", img:"assets/placeholder.svg", date:"2026-01-05"},
  {title:"Vintage Revival", blurb:"How to incorporate 90s pieces into a modern closet.", img:"assets/placeholder.svg", date:"2025-12-18"},
  {title:"Monochrome Styling", blurb:"Tips for creating impactful single‑color looks.", img:"assets/placeholder.svg", date:"2025-12-04"},
  {title:"Statement Outerwear", blurb:"Coats that become the focal point of your outfit.", img:"assets/placeholder.svg", date:"2025-11-22"},
  {title:"Footwear for All Seasons", blurb:"Versatile shoes that transition from rain to shine.", img:"assets/placeholder.svg", date:"2025-11-08"},
  {title:"Color Blocking Basics", blurb:"Learn to pair bold hues without clashing.", img:"assets/placeholder.svg", date:"2025-10-25"},
  {title:"Minimalist Jewelry", blurb:"Delicate pieces that add just the right sparkle.", img:"assets/placeholder.svg", date:"2025-10-11"}
];

const beautyArticles = [
  {title:"Spring Skincare Routine", blurb:"Adjust your regimen for warmer weather and increased sun exposure.", img:"assets/placeholder.svg", date:"2026-03-10"},
  {title:"Bold Lip Colors", blurb:"Shades that make a statement this season.", img:"assets/placeholder.svg", date:"2026-02-25"},
  {title:"Heatless Hair Waves", blurb:"Achieve beachy texture without damaging your strands.", img:"assets/placeholder.svg", date:"2026-02-10"},
  {title:"Vitamin C Serums", blurb:"Why this antioxidant is a staple for brightening.", img:"assets/placeholder.svg", date:"2026-01-28"},
  {title:"Eyebrow Shaping Guide", blurb:"Techniques for defining your arches at home.", img:"assets/placeholder.svg", date:"2026-01-15"},
  {title:"Fragrance Layering", blurb:"Combine scents for a personalized signature.", img:"assets/placeholder.svg", date:"2026-01-02"},
  {title:"Nail Art Trends", blurb:"From negative space to metallic accents.", img:"assets/placeholder.svg", date:"2025-12-20"},
  {title:"Under‑Eye Care", blurb:"Combat puffiness and dark circles with targeted products.", img:"assets/placeholder.svg", date:"2025-12-05"},
  {title:"Clean Beauty Brands", blurb:"Transparent formulas you can trust.", img:"assets/placeholder.svg", date:"2025-11-20"},
  {title:"Makeup for Glasses Wearers", blurb:"Tips to enhance your eyes behind frames.", img:"assets/placeholder.svg", date:"2025-11-05"}
];

const shoppingItems = [
  {name:"Organic Cotton Tee", price:29, img:"assets/placeholder.svg"},
  {name:"Linen Wide‑Leg Pants", price:89, img:"assets/placeholder.svg"},
  {name:"Recycled Polyester Blazer", price:120, img:"assets/placeholder.svg"},
  {name:"Leather Ankle Boots", price:150, img:"assets/placeholder.svg"},
  {name:"Silk Scarf", price:45, img:"assets/placeholder.svg"},
  {name:"Denim Jacket", price:95, img:"assets/placeholder.svg"},
  {name:"Knit Sweater Dress", price:75, img:"assets/placeholder.svg"},
  {name:"Vegetable‑Tanned Leather Bag", price:180, img:"assets/placeholder.svg"},
  {name:"Wool Blend Coat", price:220, img:"assets/placeholder.svg"},
  {name:"Comfortable Loafers", price:65, img:"assets/placeholder.svg"},
  {name:"Statement Earrings", price:35, img:"assets/placeholder.svg"},
  {name:"UV‑Protected Sunglasses", price:80, img:"assets/placeholder.svg"},
  {name:"Travel‑Size Perfume", price:22, img:"assets/placeholder.svg"},
  {name:"Reusable Makeup Pads", price:12, img:"assets/placeholder.svg"},
  {name:"Yoga Leggings", price:55, img:"assets/placeholder.svg"}
];

const lookbookImages = Array.from({length:20}, (_,i)=>({
  alt:`Lookbook outfit ${i+1}`,
  img:`assets/placeholder.svg`
}));

const moneyDiaryEntries = [
  {title:"Weekend in Paris", excerpt:"How I spent €450 on food, fashion, and fun.", author:"Alex R.", date:"2026-03-08"},
  {title:"Monthly Budget Review", excerpt:"Tracking every penny to reach my savings goal.", author:"Jamie L.", date:"2026-03-01"},
  {title:"Spring Wardrobe Update", excerpt:"Investing in versatile pieces rather than fast fashion.", author:"Taylor K.", date:"2026-02-22"},
  {title:"Beauty Splurge vs. Save", excerpt:"Where I chose to indulge and where I cut back.", author:"Morgan S.", date:"2026-02-14"},
  {title:"Side‑Hustle Income", excerpt:"Freelance projects that boosted my monthly cash flow.", author:"Casey M.", date:"2026-02-05"},
  {title:"Holiday Gift Planning", excerpt:"Budgeting for presents without breaking the bank.", author:"Riley J.", date:"2026-01-18"},
  {title:"Fashion Rental Experiment", excerpt:"Trying a subscription service for special occasions.", author:"Quinn B.", date:"2026-01-09"},
  {title:"Skincare Stock‑Up", excerpt:"Buying my favorite products during the annual sale.", author:"Drew P.", date:"2026-01-02"}
];

const horoscopeSigns = [
  {sign:"Aries", range:"Mar 21‑Apr 19", prediction:"A surge of creative energy inspires new projects."},
  {sign:"Taurus", range:"Apr 20‑May 20", prediction:"Financial stability grows as you focus on long‑term goals."},
  {sign:"Gemini", range:"May 21‑Jun 20", prediction:"Social connections bring unexpected opportunities."},
  {sign:"Cancer", range:"Jun 21‑Jul 22", prediction:"Home improvements bring comfort and joy."},
  {sign:"Leo", range:"Jul 23‑Aug 22", prediction:"Your charisma opens doors in both personal and professional spheres."},
  {sign:"Virgo", range:"Aug 23‑Sep 22", prediction:"Attention to detail yields successful outcomes in work."},
  {sign:"Libra", range:"Sep 23‑Oct 22", prediction:"Balance in relationships leads to deeper harmony."},
  {sign:"Scorpio", range:"Oct 23‑Nov 21", prediction:"Introspection reveals hidden strengths."},
  {sign:"Sagittarius", range:"Nov 22‑Dec 21", prediction:"Adventure calls—consider a trip or new learning experience."},
  {sign:"Capricorn", range:"Dec 22‑Jan 19", prediction:"Discipline and perseverance bring career advancement."},
  {sign:"Aquarius", range:"Jan 20‑Feb 18", prediction:"Innovative ideas gain traction among peers."},
  {sign:"Pisces", range:"Feb 19‑Mar 20", prediction:"Creative pursuits flourish; trust your intuition."}
];

const podcastEpisodes = [
  {title:"The Rise of Gender‑Fluid Fashion", host:"Jordan Lee", duration:"34:12", description:"Designers discuss inclusivity on the runway."},
  {title:"Skincare Science: Retinoids Explained", host:"Dr. Maya Patel", duration:"28:45", description:"Dermatologist breaks down benefits and usage."},
  {title:"Building a Capsule Wardrobe", host:"Alex Rivera", duration:"31:07", description:"Step‑by‑step guide to versatile, minimal dressing."},
  {title:"The Psychology of Color in Beauty", host:"Samir Khan", duration:"26:33", description="How hues affect mood and perception."},
  {title:"Sustainable Manufacturing in Apparel", host:"Lena Gomez", duration:"39:20", description="Inside look at eco‑friendly factories."},
  {title:"Navigating Fashion Week as a First‑Timer", host:"Talia Wu", duration:"33:58", description="Tips for making the most of the shows."}
];

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Set active nav link
  const setActiveNav = () => {
    const path = location.pathname.replace(/^\/|\\/g, '');
    const current = path || 'index.html';
    document.querySelectorAll('.primary-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (href === '' && current === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };
  // Search filtering
  const initSearch = () => {
    const form = document.querySelector('.primary-nav form');
    if (!form) return;
    const input = form.querySelector('input[type="search"]');
    input.addEventListener('input', e => {
      const term = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.card-grid .card, .article-list article').forEach(el => {
        const text = el.textContent.toLowerCase();
        if (term === '' || text.includes(term)) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
      // announce results count for screen readers
      const visible = document.querySelectorAll('.card-grid .card:not([style*="display: none"]), .article-list article:not([style*="display: none"])').length;
      const live = document.getElementById('search-live') || (() => {
        const el = document.createElement('div');
        el.id = 'search-live';
        el.setAttribute('aria-live', 'polite');
        el.className = 'visually-hidden';
        document.body.appendChild(el);
        return el;
      })();
      live.textContent = `${visible} results`;
    });
  };
  // Carousel
  const initCarousel = () => {
    document.querySelectorAll('[data-component="gallery-carousel"]').forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
      const prevBtn = carousel.querySelector('.carousel-button.prev');
      const nextBtn = carousel.querySelector('.carousel-button.next');
      let index = 0;
      const update = () => {
        if (prefersReducedMotion) {
          track.style.transition = 'none';
        } else {
          track.style.transition = 'transform .4s ease';
        }
        track.style.transform = `translateX(-${index * 100}%)`;
      };
      const move = (step) => {
        index = (index + step + slides.length) % slides.length;
        update();
      };
      prevBtn.addEventListener('click', () => move(-1));
      nextBtn.addEventListener('click', () => move(1));
      // keyboard
      carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
      });
      update();
    });
  };
  // Lightbox
  const initLightbox = () => {
    document.querySelectorAll('[data-component="gallery-carousel"] img').forEach(img => {
      img.addEventListener('click', e => {
        e.preventDefault();
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
          <button class="lightbox-close" aria-label="Close">&times;</button>
          <img src="${img.src}" alt="${img.alt}" class="lightbox-content">
        `;
        document.body.appendChild(lightbox);
        // trigger show via reflow
        requestAnimationFrame(() => lightbox.classList.add('show'));
        const close = () => {
          lightbox.classList.remove('show');
          lightbox.addEventListener('transitionend', function self() {
            lightbox.remove();
            lightbox.removeEventListener('transitionend', self);
          }, {once:true});
        };
        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        lightbox.addEventListener('click', e => {
          if (e.target === lightbox) close();
        });
        document.addEventListener('keydown', function esc(e) {
          if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
        });
        // trap focus
        const focusable = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length-1];
        lightbox.addEventListener('keydown', e => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
              if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
          }
        });
        first.focus();
      });
    });
  };
  // Newsletter toast
  const initNewsletter = () => {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value.trim();
        if (!email) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = `Thank you for subscribing, ${email}!`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
          toast.classList.remove('show');
          toast.addEventListener('transitionend', () => toast.remove(), {once:true});
        }, 3000);
        form.reset();
        // move focus to toast
        toast.setAttribute('tabindex', '-1');
        toast.focus();
      });
    });
  };
  // Initialize
  setActiveNav();
  initSearch();
  initCarousel();
  initLightbox();
  initNewsletter();
})();
