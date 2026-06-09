// ========================================
//  PERITO IMOBILIÁRIO — JavaScript
//  Animações scroll, smooth scroll, etc.
// ========================================

(function () {
  'use strict';

  // ── Reveal on Scroll ──────────────────────
  const revealElements = document.querySelectorAll(
    '.section-header, .info-card, .split-image, .split-content, .service-card, .ia-card, .ia-highlight, .timeline-item, .cta-box'
  );

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    revealElements.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      if (top < trigger) {
        element.classList.add('reveal', 'visible');
      } else {
        element.classList.add('reveal');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);

  // ── Smooth Scroll para âncoras internas ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
