const portraitToggle = document.querySelector('.intro__portrait-toggle');

if (portraitToggle) {
    const portraitLabel = portraitToggle.getAttribute('aria-label');

    portraitToggle.addEventListener('click', () => {
        const showQr = portraitToggle.getAttribute('aria-pressed') !== 'true';
        portraitToggle.setAttribute('aria-pressed', String(showQr));
        portraitToggle.setAttribute('aria-label', showQr ? portraitToggle.dataset.qrLabel : portraitLabel);
    });
}
