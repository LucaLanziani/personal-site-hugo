// Marks the table-of-contents entry for the section currently being read.
(function () {
    var tocs = document.querySelectorAll('.toc, .toc-mobile');
    if (!tocs.length) return;

    var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"], .toc-mobile a[href^="#"]'));
    var entries = [];
    links.forEach(function (link) {
        var heading = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
        if (heading) entries.push({ link: link, heading: heading });
    });
    if (!entries.length) return;

    var active = null;
    var ticking = false;

    function update() {
        ticking = false;
        var offset = (document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0) + 24;
        var found = entries[0];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].heading.getBoundingClientRect().top <= offset) found = entries[i];
        }
        if (found.heading === active) return;
        entries.forEach(function (entry) {
            if (entry.heading === found.heading) entry.link.setAttribute('aria-current', 'location');
            else entry.link.removeAttribute('aria-current');
        });
        active = found.heading;
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
