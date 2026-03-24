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

    <div class="wf-mob-overlay" id="mobileMenu">
      <div class="wf-mob-overlay__inner">
        <div class="wf-mob-overlay__header">
          <img src="/assets/img/logo/Logo_trs.png" alt="Wraff Force" style="width:24px;height:24px;object-fit:contain;opacity:0.7;">
          <span class="wf-mob-overlay__brand">WRAFF FORCE</span>
          <button class="wf-mob-overlay__close" id="drawerClose" aria-label="Close">✕</button>
        </div>
        <nav class="wf-mob-overlay__nav">
          <a href="/about.html"          data-i18n="nav.agency">AGENCY</a>
          <a href="/operatives.html"     data-i18n="nav.operatives">OPERATIVES</a>
          <div class="wf-mob-overlay__group">
            <span class="wf-mob-overlay__section" data-i18n="nav.operations">OPERATIONS</span>
            <a href="/operations.html"       data-i18n="nav.missionArchive">Mission Archive</a>
            <a href="/incident-reports.html" data-i18n="nav.incidentReports">Incident Reports</a>
            <a href="/intel-board.html"      data-i18n="nav.intelBoard">Intel Board</a>
          </div>
          <a href="/status.html"         data-i18n="nav.status">STATUS</a>
          <div class="wf-mob-overlay__group">
            <span class="wf-mob-overlay__section" data-i18n="nav.files">FILES</span>
            <a href="/field-manual.html"   data-i18n="nav.fieldManual">Field Manual</a>
            <a href="/anthem-hall.html"    data-i18n="nav.anthemHall">Anthem Hall</a>
          </div>
          <a href="/contact.html"        data-i18n="nav.contact">CONTACT</a>
        </nav>
        <div class="wf-mob-overlay__footer">
          <a href="/classified.html" class="wf-mob-overlay__classified">
            <span class="pulse-dot"></span>
            <span data-i18n="nav.classified">CLASSIFIED</span>
          </a>
          <div class="wf-mob-overlay__meta">wraff.agency · K9 Division</div>
        </div>
      </div>
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
      navEl.insertAdjacentHTML('beforebegin', navHTML);
      navEl.remove();
    } else {
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
    const navLinks = document.querySelectorAll('.wf-nav__links a, .wf-mob-overlay__nav a');

    navLinks.forEach(link => {
      if (!link.href) return; // Skip links ohne href (role=button)
      try {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === '/' && linkPath === '/') {
          link.classList.add('active');
          return;
        }
        if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
          link.classList.add('active');
        }
      } catch(e) { /* invalid URL überspringen */ }
    });
  }

  // ── MOBILE OVERLAY MENU ──────────────────────────────────
  function initHamburger() {
    const hamburger = document.querySelector('#hamburger');
    const overlay   = document.querySelector('#mobileMenu');
    const closeBtn  = document.querySelector('#drawerClose');
    if (!hamburger || !overlay) return;

    function openMenu() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── LANGUAGE TOGGLE ───────────────────────────────────────
  function initLangToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = window.WF_LANG || localStorage.getItem('wf-lang') || 'en';
    langBtns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const lang = btn.dataset.lang;
        if (window.WFi18n && typeof window.WFi18n.setLang === 'function') {
          window.WFi18n.setLang(lang);
        }
        langBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    injectNav();
    injectFooter();
    // rAF ensures all injected DOM is parsed before we query/bind
    requestAnimationFrame(function() {
      setActiveNavLink();
      initHamburger();
      initLangToggle();
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
