(() => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Sticky-nav blur after the hero scrolls away.
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle.
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Fade-in on scroll.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    targets.forEach((el) => io.observe(el));
  }

  // Footer year stamp.
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Hero carousel — auto-rotate with a cloned first slide for a seamless loop.
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  if (track && track.children.length > 1) {
    const originalCount = track.children.length;
    const firstClone = track.firstElementChild.cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    track.appendChild(firstClone);

    for (let i = 0; i < originalCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dotsEl.appendChild(dot);
    }
    const dots = Array.from(dotsEl.children);

    let index = 0;
    const advance = () => {
      index++;
      track.style.transform = `translateX(-${index * 100}%)`;
      const realIndex = index % originalCount;
      dots.forEach((d, i) => d.classList.toggle('carousel__dot--active', i === realIndex));
    };

    track.addEventListener('transitionend', () => {
      if (index >= originalCount) {
        track.classList.add('carousel__track--snap');
        index = 0;
        track.style.transform = 'translateX(0)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          track.classList.remove('carousel__track--snap');
        }));
      }
    });

    if (!reduced) {
      setInterval(advance, 5000);
    }
  }

  // Campus life media gallery — endless-entertainment-style horizontal strip.
  const mg = document.getElementById('mgGallery');
  const mgTrack = document.getElementById('mgTrack');
  const mgDots = document.getElementById('mgDots');
  if (mg && mgTrack) {
    const cards = Array.from(mgTrack.children);
    const total = cards.length;
    const SLIDE_MS = 4500;

    const visibleCount = () => {
      const v = getComputedStyle(mg).getPropertyValue('--mg-visible').trim();
      return Math.max(1, parseInt(v, 10) || 1);
    };
    const pageCount = () => Math.max(1, total - visibleCount() + 1);

    let page = 0;
    let timer = null;

    const renderDots = () => {
      mgDots.innerHTML = '';
      const n = pageCount();
      for (let i = 0; i < n; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'mg__dot' + (i === Math.min(page, n - 1) ? ' mg__dot--active' : '');
        dot.setAttribute('aria-label', `Show slide group ${i + 1}`);
        dot.addEventListener('click', () => { page = i; apply(); schedule(); });
        mgDots.appendChild(dot);
      }
    };
    const apply = () => {
      const step = cards[0].getBoundingClientRect().width +
        parseFloat(getComputedStyle(mgTrack).gap || '0');
      mgTrack.style.transform = `translateX(${-page * step}px)`;
      mgDots.querySelectorAll('.mg__dot').forEach((d, i) => {
        d.classList.toggle('mg__dot--active', i === page);
      });
    };
    const advance = () => {
      page = (page + 1) % pageCount();
      apply();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (reduced) return;
      timer = setTimeout(() => { advance(); schedule(); }, SLIDE_MS);
    };

    renderDots();
    // Apply once images have laid out.
    requestAnimationFrame(() => requestAnimationFrame(apply));
    schedule();

    mg.addEventListener('mouseenter', () => clearTimeout(timer));
    mg.addEventListener('mouseleave', schedule);

    window.addEventListener('resize', () => {
      if (page >= pageCount()) page = 0;
      renderDots();
      mgTrack.classList.add('mg__track--snap');
      apply();
      requestAnimationFrame(() => mgTrack.classList.remove('mg__track--snap'));
    }, { passive: true });
  }
})();
