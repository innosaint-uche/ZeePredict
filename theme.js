/* ZeePredict - Shared Theme Toggle */
(function () {
    'use strict';
    var KEY = 'theme';

    function readStored() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function store(value) {
        try { localStorage.setItem(KEY, value); } catch (e) { /* storage unavailable (private mode etc.) */ }
    }

    function prefersLight() {
        var stored = readStored();
        if (stored === 'light') return true;
        if (stored === 'dark') return false;
        // No stored preference: follow the OS/browser appearance on first visit.
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    function apply(isLight) {
        var html = document.documentElement;
        var btn = document.getElementById('themeToggle');
        html.classList.toggle('light-mode', isLight);
        if (btn) {
            btn.textContent = isLight ? '\u2600\uFE0F' : '\uD83C\uDF19';
            btn.setAttribute('aria-pressed', String(isLight));
            btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        }
    }

    function setTheme(isLight) {
        apply(isLight);
        store(isLight ? 'light' : 'dark');
    }

    function bind() {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            setTheme(!document.documentElement.classList.contains('light-mode'));
        });
    }

    // Apply before first paint to avoid a theme flash.
    // This file must be loaded in <head> (not at end of <body>).
    apply(prefersLight());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
