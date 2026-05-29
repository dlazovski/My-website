(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== Reveal + stagger observer ===== */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ===== Counter animation ===== */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.round(easeOutQuart(p) * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.count-up');
  if ('IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || ''); });
  }

  /* ===== Hero word-by-word ===== */
  var heading = document.querySelector('.hero__heading');
  if (heading && !reduce) {
    var words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = '';
    words.forEach(function (w, i) {
      var span = document.createElement('span');
      span.className = 'word-animate';
      span.textContent = w;
      span.style.animationDelay = (0.15 + i * 0.07) + 's';
      heading.appendChild(span);
      heading.appendChild(document.createTextNode(' '));
    });
  }

  /* ===== Marquee pause on hover ===== */
  document.querySelectorAll('.marquee__track').forEach(function (track) {
    track.addEventListener('mouseenter', function () { track.classList.add('paused'); });
    track.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
  });

  /* ===== Parallax hero grid ===== */
  var grid = document.getElementById('heroGrid');
  if (grid && !reduce) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      grid.style.transform = 'translateY(' + (y * 0.15) + 'px)';
    }, { passive: true });
  }

  /* ===== Mouse radial glow shift ===== */
  var glow = document.getElementById('heroGlow');
  if (glow && !reduce) {
    var gx = 0, gy = 0, raf = null;
    document.addEventListener('mousemove', function (e) {
      gx = (e.clientX / window.innerWidth - 0.5) * 10;
      gy = (e.clientY / window.innerHeight - 0.5) * 10;
      if (!raf) {
        raf = requestAnimationFrame(function () {
          glow.style.marginLeft = gx + 'px';
          glow.style.marginTop = gy + 'px';
          raf = null;
        });
      }
    });
  }

  /* ===== Debounced resize ===== */
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      document.dispatchEvent(new CustomEvent('moduvo:resize'));
    }, 200);
  });
})();
