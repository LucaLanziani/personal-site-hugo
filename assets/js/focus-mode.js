// Keep the article in place while removing the surrounding page chrome.
(function () {
    var button = document.querySelector('.focus-toggle');
    if (!button) return;

    var controls = button.closest('.reading-controls');
    var label = button.querySelector('.focus-toggle__label');
    var article = document.querySelector('.post');
    var enabled = false;

    function setFocusMode(nextEnabled) {
        // Anchor the visible paragraph/section, since removing the header changes
        // its position. At the top of the page, keep the title in view instead.
        var anchor = null;
        if (window.scrollY > 0) {
            anchor = Array.prototype.find.call(article.children, function (element) {
                return element.getBoundingClientRect().bottom > 80;
            });
        }
        var previousTop = anchor ? anchor.getBoundingClientRect().top : 0;

        enabled = nextEnabled;
        document.body.classList.toggle('focus-mode', enabled);
        button.setAttribute('aria-pressed', String(enabled));
        label.textContent = enabled ? 'Exit focus mode' : 'Focus mode';
        button.title = enabled ? 'Exit focus mode (Esc)' : 'Focus mode';

        if (anchor) {
            window.scrollBy({ top: anchor.getBoundingClientRect().top - previousTop, behavior: 'instant' });
        }
    }

    button.addEventListener('click', function () {
        setFocusMode(button.getAttribute('aria-pressed') !== 'true');
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && button.getAttribute('aria-pressed') === 'true') {
            setFocusMode(false);
            button.focus({ preventScroll: true });
        }
    });
    // Bring keyboard-focused links into the clear reading area.
    article.addEventListener('focusin', function (event) {
        if (!enabled) return;
        var rect = event.target.getBoundingClientRect();
        if (rect.top < window.innerHeight / 4 || rect.bottom > window.innerHeight * 0.75) {
            window.scrollBy({ top: rect.top - window.innerHeight / 2, behavior: 'instant' });
        }
    });

    controls.hidden = false;
})();
