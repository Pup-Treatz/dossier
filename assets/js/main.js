/* ============================================================
   WRAFF FORCE — main.js
   Navigation injection, footer injection, hamburger menu,
   active nav link highlighting
   Version 1.0
   ============================================================ */

(function () {
  'use strict';

  // ── NAV HTML ──────────────────────────────────────────────
  const navHTML = `
    <nav class="wf-nav" id="wf-nav">
      <div class="wf-nav__inner">

        <a href="/" class="wf-nav__logo">
          <img src="/assets/img/logo/Logo_trs.png" alt="Wraff Force Logo">
          <span class="wf-nav__logo-text">WRAFF FORCE</span>
        </a>

        <ul class="wf-nav__links" id="nav-links">
          <li><a href="/about.html"      data-i18n="nav.agency">AGENCY</a></li>
          <li><a href="/operatives.html" data-i18n="nav.operatives">OPERATIVES</a></li>
          <li class="wf-nav__has-dropdown">
            <a href="/operations.html" data-i18n="nav.operations">OPERATIONS</a>
            <div class="wf-nav__dropdown">
              <div class="wf-nav__dropdown-inner">
                <a href="/operations.html"       data-i18n="nav.missionArchive">Mission Archive</a>
                <a href="/incident-reports.html" data-i18n="nav.incidentReports">Incident Reports</a>
                <a href="/intel-board.html"      data-i18n="nav.intelBoard">Intel Board</a>
              </div>
            </div>
          </li>
          <li><a href="/status.html" data-i18n="nav.status">STATUS</a></li>
          <li class="wf-nav__has-dropdown">
            <a href="/field-manual.html" data-i18n="nav.files">FILES</a>
            <div class="wf-nav__dropdown">
              <div class="wf-nav__dropdown-inner">
                <a href="/field-manual.html" data-i18n="nav.fieldManual">Field Manual</a>
                <a href="/anthem-hall.html"  data-i18n="nav.anthemHall">Anthem Hall</a>
              </div>
            </div>
          </li>
          <li><a href="/contact.html" data-i18n="nav.contact">CONTACT</a></li>
        </ul>

        <div class="wf-nav__right">
          <a href="/classified.html" class="wf-nav__classified">
            <span class="pulse-dot"></span>
            <span data-i18n="nav.classified">CLASSIFIED</span>
          </a>
          <div class="lang-toggle">
            <button class="lang-btn" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="de">DE</button>
          </div>
          <button class="wf-nav__hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </nav>

    <div class="wf-mobile-menu" id="mobileMenu">
      <a href="/about.html"       data-i18n="nav.agency">AGENCY</a>
      <a href="/operatives.html"  data-i18n="nav.operatives">OPERATIVES</a>
      <a href="/operations.html"  data-i18n="nav.operations">OPERATIONS</a>
      <a href="/operations.html"      data-i18n="nav.missionArchive" style="padding-left:28px; font-size:10px; opacity:0.7;">↳ Mission Archive</a>
      <a href="/incident-reports.html" data-i18n="nav.incidentReports" style="padding-left:28px; font-size:10px; opacity:0.7;">↳ Incident Reports</a>
      <a href="/intel-board.html"      data-i18n="nav.intelBoard"      style="padding-left:28px; font-size:10px; opacity:0.7;">↳ Intel Board</a>
      <a href="/status.html"      data-i18n="nav.status">STATUS</a>
      <a href="/field-manual.html" data-i18n="nav.files">FILES</a>
      <a href="/field-manual.html"     data-i18n="nav.fieldManual"     style="padding-left:28px; font-size:10px; opacity:0.7;">↳ Field Manual</a>
      <a href="/anthem-hall.html"      data-i18n="nav.anthemHall"      style="padding-left:28px; font-size:10px; opacity:0.7;">↳ Anthem Hall</a>
      <a href="/contact.html"     data-i18n="nav.contact">CONTACT</a>
      <a href="/classified.html"  class="mob-classified">
        <span class="pulse-dot"></span>
        <span data-i18n="nav.classified">CLASSIFIED</span>
      </a>
    </div>
  `;

  // ── FOOTER HTML ───────────────────────────────────────────
  const footerHTML = `
    <footer class="wf-footer">
      <div class="wrap">
        <div class="wf-footer__inner">
          <div class="wf-footer__logo">
            <img src="/assets/img/logo/Logo_trs.png" alt="Wraff Force">
            <span class="wf-footer__logo-text">WRAFF FORCE</span>
          </div>
          <div class="wf-footer__tagline" data-i18n="footer.tagline">
            Paws on the Ground · Noses in the Air · Snacks Secured
          </div>
          <div class="wf-footer__note">
            wraff.agency · K9 Division · Est. 2025
          </div>
        </div>
      </div>
    </footer>
  `;

  // ── INJECT NAV ────────────────────────────────────────────
  function injectNav() {
    const navEl = document.getElementById('main-nav');
    if (navEl) {
      navEl.outerHTML = navHTML;
    } else {
      // Fallback: prepend to body
      document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
  }

  // ── INJECT FOOTER ─────────────────────────────────────────
  function injectFooter() {
    const footerEl = document.getElementById('main-footer');
    if (footerEl) {
      footerEl.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }

  // ── ACTIVE NAV LINK ───────────────────────────────────────
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.wf-nav__links a, .wf-mobile-menu a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Homepage special case
      if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active');
        return;
      }

      // Match by path start (handles /dossier/ etc.)
      if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
        link.classList.add('active');
      }
    });
  }

  // ── HAMBURGER MENU ────────────────────────────────────────
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── LANGUAGE TOGGLE ───────────────────────────────────────
  function initLangToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');

    // Set initial active state from i18n module
    const currentLang = window.WF_LANG || localStorage.getItem('wf-lang') || 'en';
    langBtns.forEach(btn => {
      if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
      }
    });

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (window.WFi18n && typeof window.WFi18n.setLang === 'function') {
          window.WFi18n.setLang(lang);
        }
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    injectNav();
    injectFooter();
    setActiveNavLink();
    initHamburger();
    initLangToggle();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
