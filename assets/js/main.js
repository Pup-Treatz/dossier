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
            <a role="button" data-i18n="nav.operations" style="cursor:default;">OPERATIONS</a>
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
            <a role="button" data-i18n="nav.files" style="cursor:default;">FILES</a>
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
      <span class="wf-mob-section" data-i18n="nav.operations">OPERATIONS</span>
      <a href="/operations.html"      data-i18n="nav.missionArchive" class="wf-mob-sub">↳ Mission Archive</a>
      <a href="/incident-reports.html" data-i18n="nav.incidentReports" class="wf-mob-sub">↳ Incident Reports</a>
      <a href="/intel-board.html"      data-i18n="nav.intelBoard"      class="wf-mob-sub">↳ Intel Board</a>
      <a href="/status.html"      data-i18n="nav.status">STATUS</a>
      <span class="wf-mob-section" data-i18n="nav.files">FILES</span>
      <a href="/field-manual.html" data-i18n="nav.fieldManual" class="wf-mob-sub">↳ Field Manual</a>
      <a href="/anthem-hall.html"  data-i18n="nav.anthemHall"  class="wf-mob-sub">↳ Anthem Hall</a>
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
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('mobileMenu');
      if (!menu) return;

      if (e.target.closest('#hamburger')) {
        menu.classList.toggle('open');
        return;
      }
      if (e.target.closest('#mobileMenu a')) {
        menu.classList.remove('open');
        return;
      }
      // Klik buiten menu sluit het
      if (menu.classList.contains('open') &&
          !e.target.closest('#mobileMenu') &&
          !e.target.closest('#hamburger')) {
        menu.classList.remove('open');
      }
    });
  }

  // ── LANGUAGE TOGGLE ───────────────────────────────────────
  function initLangToggle() {
    // Set initial active state
    const currentLang = window.WF_LANG || localStorage.getItem('wf-lang') || 'en';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Event delegation — werkt altijd
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (window.WFi18n && typeof window.WFi18n.setLang === 'function') {
        window.WFi18n.setLang(lang);
      }
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
