// Marks the table-of-contents entry for the section currently being read.
(function () {
    var toc = document.querySelector('.toc');
    if (!toc) return;

    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var entries = [];
    links.forEach(function (link) {
        var heading = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
        if (heading) entries.push({ link: link, heading: heading });
    });
    if (!entries.length) return;

    var offset = 140; // just below the sticky header
    var active = null;
    var ticking = false;

    function update() {
        ticking = false;
        var found = entries[0];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].heading.getBoundingClientRect().top <= offset) found = entries[i];
            else break;
        }
        if (found === active) return;
        if (active) active.link.removeAttribute('aria-current');
        found.link.setAttribute('aria-current', 'true');
        active = found;
    }

    function schedule() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
})();
