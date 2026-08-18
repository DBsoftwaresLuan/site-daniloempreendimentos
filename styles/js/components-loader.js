/* ========================================================================
   DANILO EMPREENDIMENTOS — Loader de componentes (Header/Footer)
   HTML/CSS/JS puro: injeta header e footer via fetch em todas as páginas.
   ======================================================================== */
(function () {
  "use strict";

  async function loadComponent(targetSelector, url) {
    var target = document.querySelector(targetSelector);
    if (!target) return;
    try {
      var res = await fetch(url);
      if (!res.ok) throw new Error("Falha ao carregar " + url);
      var html = await res.text();
      target.innerHTML = html;
    } catch (err) {
      console.log("[v0] Erro ao carregar componente:", url, err);
    }
  }

  function initHeaderBehavior() {
    var nav = document.getElementById("deNav");
    var hamburger = document.getElementById("deHamburger");
    var mobileMenu = document.getElementById("deMobileMenu");
    var mobileOverlay = document.getElementById("deMobileOverlay");
    var mobileClose = document.getElementById("deMobileClose");

    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 24) {
        nav.classList.add("de-nav--scrolled");
      } else {
        nav.classList.remove("de-nav--scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function openMenu() {
      hamburger.classList.add("de-active");
      hamburger.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("de-active");
      mobileOverlay.classList.add("de-active");
      mobileMenu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      hamburger.classList.remove("de-active");
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("de-active");
      mobileOverlay.classList.remove("de-active");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function toggleMenu() {
      if (mobileMenu.classList.contains("de-active")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    if (hamburger) hamburger.addEventListener("click", toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenu);
    if (mobileClose) mobileClose.addEventListener("click", closeMenu);

    var mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Marca o link ativo com base em data-de-page no <body>
    var currentPage = document.body.getAttribute("data-de-page");
    if (currentPage) {
      document.querySelectorAll('[data-nav="' + currentPage + '"]').forEach(function (el) {
        el.classList.add("de-nav__link--active");
      });
    }
  }

  function initFooterBehavior() {
    var yearEl = document.getElementById("deFooterYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function initRevealObserver() {
    var items = document.querySelectorAll(".de-reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("de-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("de-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    var basePath = document.body.getAttribute("data-de-base") || "";

    var tasks = [];
    if (headerMount) {
      tasks.push(loadComponent("#site-header", basePath + "/components/header/header.html"));
    }
    if (footerMount) {
      tasks.push(loadComponent("#site-footer", basePath + "/components/footer/footer.html"));
    }

    Promise.all(tasks).then(function () {
      initHeaderBehavior();
      initFooterBehavior();
      initRevealObserver();
    });

    if (!headerMount && !footerMount) {
      initRevealObserver();
    }
  });
})();
