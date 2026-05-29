(function () {
  /* ===== Nav scroll ===== */
  var nav = document.getElementById('mainNav');
  if (nav) {
    var onScroll = function () {
      if (window.pageYOffset > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== Hamburger / mobile menu ===== */
  var burger = document.getElementById('hamburger');
  var mobile = document.getElementById('mobileMenu');
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      mobile.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mobile.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ===== Active link detection ===== */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* ===== Form validation helpers ===== */
  function setError(field, on) {
    if (!field) return;
    field.classList.toggle('error', on);
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validateForm(form, rules) {
    var valid = true;
    rules.forEach(function (r) {
      var input = form.querySelector('[name="' + r.name + '"]');
      var field = input ? input.closest('.field') : null;
      var val = input ? input.value.trim() : '';
      var ok = r.email ? isEmail(val) : val.length > 0;
      setError(field, !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  /* ===== Contact form ===== */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validateForm(contactForm, [
        { name: 'firstName' }, { name: 'lastName' },
        { name: 'email', email: true }, { name: 'company' }
      ]);
      if (!ok) return;
      var success = document.getElementById('contactSuccess');
      contactForm.style.display = 'none';
      if (success) success.classList.add('show');
      setTimeout(function () {
        var cal = document.getElementById('calendly');
        if (cal) cal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1200);
    });
  }

  /* ===== Webinar form ===== */
  var webForm = document.getElementById('webinarForm');
  if (webForm) {
    webForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validateForm(webForm, [
        { name: 'fullName' }, { name: 'email', email: true }, { name: 'company' }
      ]);
      if (!ok) return;
      var success = document.getElementById('webinarSuccess');
      webForm.style.display = 'none';
      if (success) success.classList.add('show');
    });
  }

  /* ===== FAQ accordion ===== */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!open) item.classList.add('open');
    });
  });
})();
