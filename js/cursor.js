(function () {
  var isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (isTouch) return;

  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  var ringX = mouseX, ringY = mouseY;
  var lag = 0.18; // approx 60ms lag at 60fps

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%, -50%)';
  });

  function render() {
    ringX += (mouseX - ringX) * lag;
    ringY += (mouseY - ringY) * lag;
    ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  var hoverSel = 'a, button, .card, .vertical-card, .tier-card, .faq-q, input, select, textarea';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverSel)) ring.classList.add('expand');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverSel)) ring.classList.remove('expand');
  });
})();
