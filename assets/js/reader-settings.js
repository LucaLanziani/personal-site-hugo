// Reading preferences stay on this device and also apply to downloaded articles.
(() => {
    const toggle = document.querySelector('.reader-toggle');
    const panel = document.querySelector('#reader-settings');
    const article = document.querySelector('.post');
    if (!toggle || !panel || !article) return;

    const key = 'article-text-scale';
    const sizes = [100, 110, 120, 130, 140];
    const output = panel.querySelector('output');
    const smaller = panel.querySelector('[data-reader-size="smaller"]');
    const larger = panel.querySelector('[data-reader-size="larger"]');
    const reset = panel.querySelector('[data-reader-size="reset"]');
    let size = 100;
    try {
        const stored = Number(localStorage.getItem(key));
        if (sizes.includes(stored)) size = stored;
    } catch (_) { /* Browser text zoom remains available when storage is blocked. */ }

    function position() {
        if (panel.hidden) return;
        const rect = toggle.getBoundingClientRect();
        const gap = 12;
        panel.style.left = Math.max(gap, Math.min(rect.right - panel.offsetWidth, innerWidth - panel.offsetWidth - gap)) + 'px';
        panel.style.top = Math.max(gap, Math.min(rect.bottom + 8, innerHeight - panel.offsetHeight - gap)) + 'px';
    }
    function close(restoreFocus = false) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        if (restoreFocus) toggle.focus({ preventScroll: true });
    }
    function apply(next, remember = false) {
        const anchor = Array.from(article.children).find(element => element.getBoundingClientRect().bottom > 80);
        const top = anchor?.getBoundingClientRect().top;
        size = next;
        article.style.setProperty('--reader-scale', size / 100);
        output.value = size + '%';
        smaller.disabled = size === sizes[0];
        larger.disabled = size === sizes[sizes.length - 1];
        if (document.activeElement === smaller && smaller.disabled || document.activeElement === larger && larger.disabled) reset.focus({ preventScroll: true });
        if (remember) {
            try { localStorage.setItem(key, String(size)); } catch (_) { /* Preference still works for this visit. */ }
            if (anchor && window.scrollY > 0) window.scrollBy({ top: anchor.getBoundingClientRect().top - top, behavior: 'instant' });
        }
        position();
    }
    smaller.addEventListener('click', () => apply(sizes[Math.max(0, sizes.indexOf(size) - 1)], true));
    larger.addEventListener('click', () => apply(sizes[Math.min(sizes.length - 1, sizes.indexOf(size) + 1)], true));
    reset.addEventListener('click', () => apply(100, true));
    toggle.addEventListener('click', () => {
        const open = panel.hidden;
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        position();
        if (open) (smaller.disabled ? reset : smaller).focus();
    });
    document.addEventListener('click', event => {
        if (!panel.contains(event.target) && !toggle.contains(event.target)) close();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) {
            event.preventDefault();
            event.stopImmediatePropagation();
            close(true);
        }
    }, true);
    document.addEventListener('focusin', event => {
        if (!panel.contains(event.target) && event.target !== toggle) close();
    });
    window.addEventListener('resize', position);
    window.addEventListener('scroll', () => {
        if (toggle.getBoundingClientRect().bottom < 0) close();
        else position();
    }, { passive: true });
    apply(size);
    toggle.hidden = false;
})();
