/* ============================================================
   WRAFF FORCE — i18n.js
   Language switching system (EN / DE)
   Loads JSON files, replaces data-i18n attributes,
   persists language choice in localStorage
   Version 1.0
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'wf-lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'de'];

  // Cache loaded translations
  const cache = {};

  // ── DETECT LANGUAGE ───────────────────────────────────────
  function detectLang() {
    // 1. Check localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;

    // 2. Check browser language
    const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browser.startsWith('de')) return 'de';

    // 3. Default
    return DEFAULT_LANG;
  }

  // ── LOAD TRANSLATIONS ─────────────────────────────────────
  async function loadTranslations(lang) {
    if (cache[lang]) return cache[lang];

    try {
      const response = await fetch(`/assets/lang/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      const data = await response.json();
      cache[lang] = data;
      return data;
    } catch (err) {
      console.warn(`[WF i18n] Could not load ${lang}.json — falling back to EN`, err);
      if (lang !== 'en') return loadTranslations('en');
      return {};
    }
  }

  // ── GET NESTED VALUE ──────────────────────────────────────
  // Supports dot notation: "nav.operatives" → translations.nav.operatives
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
  }

  // ── APPLY TRANSLATIONS ────────────────────────────────────
  function applyTranslations(translations) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);

      if (value === null) {
        // Key not found — leave original content, log warning
        console.warn(`[WF i18n] Missing key: "${key}"`);
        return;
      }

      // Handle HTML content vs plain text
      if (value.includes('<')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    // Handle placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('placeholder', value);
    });

    // Update html lang attribute
    document.documentElement.setAttribute('lang', window.WF_LANG || DEFAULT_LANG);
  }

  // ── SET LANGUAGE ──────────────────────────────────────────
  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) {
      console.warn(`[WF i18n] Unsupported language: ${lang}`);
      return;
    }

    window.WF_LANG = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const translations = await loadTranslations(lang);
    applyTranslations(translations);

    // Update lang toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Dispatch event for other scripts to react
    document.dispatchEvent(new CustomEvent('wf:langChanged', { detail: { lang } }));
  }

  // ── INIT ──────────────────────────────────────────────────
  async function init() {
    const lang = detectLang();
    window.WF_LANG = lang;
    await setLang(lang);
  }

  // ── PUBLIC API ────────────────────────────────────────────
  window.WFi18n = {
    setLang,
    getLang: () => window.WF_LANG || DEFAULT_LANG,
    t: (key) => {
      const translations = cache[window.WF_LANG || DEFAULT_LANG] || {};
      return getNestedValue(translations, key) || key;
    }
  };

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
