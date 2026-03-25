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

// ─────────────────────────────────────────────────────────────────────────────
// WF-TERMINAL — FLOATING ACCESS BUTTON
// Ans Ende von assets/js/main.js anhängen.
// Erscheint auf allen Seiten AUSSER terminal.html.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  // Nicht auf terminal.html anzeigen
  if (window.location.pathname.includes('terminal')) return;

  // CSS
  const style = document.createElement('style');
  style.textContent = `
    #wf-terminal-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #0E1117;
      border: 1px solid #1A9E5C;
      color: #1A9E5C;
      font-family: 'DM Mono', 'Courier New', monospace;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 10px 16px 10px 14px;
      cursor: pointer;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 0 0 1px rgba(26,158,92,0.15), 0 4px 24px rgba(0,0,0,0.6);
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      user-select: none;
      animation: wfBtnAppear 0.5s ease 0.8s both;
    }
    #wf-terminal-btn:hover {
      background: #111a14;
      border-color: #2dce74;
      box-shadow: 0 0 0 1px rgba(26,158,92,0.35), 0 0 20px rgba(26,158,92,0.15), 0 6px 30px rgba(0,0,0,0.7);
      color: #2dce74;
    }
    #wf-terminal-btn:active { transform: translateY(1px); }
    .wf-tb-pulse-wrap { position:relative; width:8px; height:8px; flex-shrink:0; }
    .wf-tb-pulse-dot  { position:absolute; inset:0; width:8px; height:8px; border-radius:50%; background:#1A9E5C; }
    .wf-tb-pulse-ring {
      position:absolute; inset:-3px; width:14px; height:14px;
      border-radius:50%; border:1px solid #1A9E5C;
      opacity:0; animation: wfPulse 2.4s ease-out infinite;
    }
    .wf-tb-pulse-ring:nth-child(2) { animation-delay:1.2s; }
    @keyframes wfPulse {
      0%   { opacity:0.7; transform:scale(0.6); }
      80%  { opacity:0;   transform:scale(1.6); }
      100% { opacity:0;   transform:scale(1.6); }
    }
    .wf-tb-icon  { font-size:15px; line-height:1; }
    .wf-tb-label { line-height:1; }
    @keyframes wfBtnAppear {
      from { opacity:0; transform:translateY(12px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @media (max-width:500px) {
      #wf-terminal-btn { bottom:20px; right:20px; padding:11px 13px; gap:0; }
      .wf-tb-label { display:none; }
      .wf-tb-icon  { font-size:17px; }
    }
  `;
  document.head.appendChild(style);

  // Button-Element
  const btn = document.createElement('a');
  btn.id    = 'wf-terminal-btn';
  btn.href  = '/terminal.html';
  btn.setAttribute('aria-label', 'WF-Terminal öffnen');
  btn.title = 'WF-TERMINAL · Automatisches Kommunikationssystem';
  btn.innerHTML = `
    <span class="wf-tb-pulse-wrap" aria-hidden="true">
      <span class="wf-tb-pulse-ring"></span>
      <span class="wf-tb-pulse-ring"></span>
      <span class="wf-tb-pulse-dot"></span>
    </span>
    <span class="wf-tb-icon" aria-hidden="true">&gt;_</span>
    <span class="wf-tb-label">Terminal</span>
  `;

  // Label bei Sprachwechsel aktualisieren (optional, da "Terminal" in beiden Sprachen gleich ist)
  document.addEventListener('wf:langChanged', function () {
    const lang = (window.WFi18n && window.WFi18n.getLang()) || 'en';
    btn.title = lang === 'de'
      ? 'WF-TERMINAL · Automatisches Kommunikationssystem'
      : 'WF-TERMINAL · Automated Communication System';
  });

  document.body.appendChild(btn);
})();
