(() => {
  // Nav solidifies after scrolling past the hero.
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle.
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links && nav) {
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

  // Ensure the hero video plays when in view (some browsers defer autoplay).
  document.querySelectorAll('video[autoplay]').forEach((v) => {
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
  });

  // Footer year.
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Video reel (peek carousel — active slide plays, neighbours pause,
  // progress bars fill with the active video's currentTime).
  const reel = document.getElementById('reel');
  const reelTrack = document.getElementById('reelTrack');
  const reelDots = document.getElementById('reelDots');
  const reelPrev = document.getElementById('reelPrev');
  const reelNext = document.getElementById('reelNext');
  if (reel && reelTrack && reelDots) {
    const slides = Array.from(reelTrack.children);
    const videos = slides.map((s) => s.querySelector('video'));
    const total = slides.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let fallbackTimer = null;

    // Build timeline bars (each with an inner fill element).
    slides.forEach((_, i) => {
      const bar = document.createElement('button');
      bar.type = 'button';
      bar.className = 'reel__dot';
      bar.setAttribute('aria-label', `Go to video ${i + 1}`);
      const fill = document.createElement('span');
      fill.className = 'reel__dot-fill';
      bar.appendChild(fill);
      bar.addEventListener('click', () => go(i));
      reelDots.appendChild(bar);
    });
    const bars = Array.from(reelDots.children);
    const fillOf = (i) => bars[i] && bars[i].querySelector('.reel__dot-fill');

    const setBarState = () => {
      bars.forEach((b, i) => {
        b.classList.toggle('reel__dot--done', i < index);
        const f = fillOf(i);
        if (!f) return;
        if (i < index) f.style.width = '100%';
        else if (i > index) f.style.width = '0%';
        // The active bar is driven by the video's timeupdate.
      });
    };

    const layout = () => {
      const first = slides[0];
      if (!first) return;
      const gap = parseFloat(getComputedStyle(reelTrack).gap || '0');
      const step = first.offsetWidth + gap;
      reelTrack.style.transform = `translateX(${-index * step}px)`;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    };

    const playActive = () => {
      videos.forEach((v, i) => {
        if (!v) return;
        if (i === index) {
          // Start from the beginning every time the slide becomes active.
          try { v.currentTime = 0; } catch (_) {}
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          v.pause();
          try { v.currentTime = 0; } catch (_) {}
        }
      });
      // Reset the active bar's fill so it starts from 0.
      const activeFill = fillOf(index);
      if (activeFill) activeFill.style.width = '0%';
    };

    const scheduleFallback = () => {
      clearTimeout(fallbackTimer);
      if (reducedMotion) return;
      // Budget = this video's duration + 2s buffer, with sensible floor/ceiling.
      // If we don't know the duration yet, default to 20s and let loadedmetadata refresh.
      const v = videos[index];
      const dur = v && v.duration && isFinite(v.duration) ? v.duration : 20;
      const ms = Math.min(45000, Math.max(6000, (dur + 2) * 1000));
      fallbackTimer = setTimeout(() => go(index + 1), ms);
    };

    const go = (i) => {
      index = ((i % total) + total) % total;
      layout();
      setBarState();
      playActive();
      scheduleFallback();
    };

    // Drive each bar from its video's playback progress (only the active one fires often).
    videos.forEach((v, i) => {
      if (!v) return;
      v.addEventListener('timeupdate', () => {
        if (i !== index || !v.duration || !isFinite(v.duration)) return;
        const pct = Math.min(100, (v.currentTime / v.duration) * 100);
        const f = fillOf(i);
        if (f) f.style.width = pct + '%';
      });
      v.addEventListener('ended', () => {
        if (i !== index) return;
        const f = fillOf(i);
        if (f) f.style.width = '100%';
        go(index + 1);
      });
      // Once we know the real duration, tighten the fallback timer for the active slide.
      v.addEventListener('loadedmetadata', () => {
        if (i === index) scheduleFallback();
      });
    });

    reelPrev && reelPrev.addEventListener('click', () => go(index - 1));
    reelNext && reelNext.addEventListener('click', () => go(index + 1));

    // Pause when the pointer is over the reel; resume on leave.
    reel.addEventListener('mouseenter', () => {
      clearTimeout(fallbackTimer);
      const v = videos[index]; if (v) v.pause();
    });
    reel.addEventListener('mouseleave', () => {
      const v = videos[index];
      if (v) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      scheduleFallback();
    });

    // Re-apply layout after viewport resize.
    window.addEventListener('resize', () => {
      reelTrack.classList.add('reel__track--snap');
      layout();
      requestAnimationFrame(() => reelTrack.classList.remove('reel__track--snap'));
    }, { passive: true });

    // Initial layout and play the first video.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      layout();
      setBarState();
      playActive();
      scheduleFallback();
    }));
  }
})();
