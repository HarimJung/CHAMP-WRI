(function() {
  'use strict';

  function animateValue(element, start, end, duration, suffix) {
    var startTime = null;
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = easeOutCubic(progress);
      var current = Math.floor(start + (end - start) * easedProgress);
      element.textContent = current + (suffix || '');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var text = el.textContent.trim();
        var suffix = '';
        var value = parseInt(text);
        if (text.indexOf('%') !== -1) {
          suffix = '%';
          value = parseInt(text);
        }
        el.textContent = '0' + suffix;
        animateValue(el, 0, value, 1200, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function(el) {
    observer.observe(el);
  });
})();
