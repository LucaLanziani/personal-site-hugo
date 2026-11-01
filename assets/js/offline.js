/* Downloads are opt-in. Registering the worker never downloads articles. */
(() => {
    const button = document.querySelector('.offline-toggle');
    const list = document.querySelector('#saved-articles');
    const status = document.querySelector('.offline-status');
    const path = location.pathname;
    let saved = false;

    function announce(message) {
        if (!status) return;
        status.hidden = false;
        status.textContent = message;
    }
    async function request(type, data = {}) {
        const worker = (await navigator.serviceWorker.ready).active;
        return new Promise((resolve, reject) => {
            const channel = new MessageChannel();
            const timeout = setTimeout(() => {
                channel.port1.close();
                reject(new Error('Download timed out. Check your connection and try again.'));
            }, 180000);
            channel.port1.onmessage = ({ data: reply }) => {
                clearTimeout(timeout);
                channel.port1.close();
                reply.error ? reject(new Error(reply.error)) : resolve(reply.result);
            };
            worker.postMessage({ type, ...data }, [channel.port2]);
        });
    }
    function setSaved(value) {
        saved = value;
        button.setAttribute('aria-pressed', String(value));
        button.title = value ? 'Saved offline — remove download' : 'Save for offline';
        button.setAttribute('aria-label', button.title);
    }
    // Discover assets from fresh HTML, including lazy images and responsive variants.
    async function page(url) {
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) throw new Error('Could not download the article. Please try again.');
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const assets = new Set();
        function add(value) {
            if (!value) return;
            const asset = new URL(value, response.url);
            if (asset.origin === location.origin && !asset.pathname.includes('livereload')) {
                asset.hash = '';
                assets.add(asset.href);
            }
        }
        doc.querySelectorAll('script[src], img[src], link[rel="stylesheet"], link[rel="icon"], link[rel="apple-touch-icon"]').forEach(el => add(el.getAttribute('src') || el.getAttribute('href')));
        doc.querySelectorAll('img[srcset], source[srcset]').forEach(el => {
            el.getAttribute('srcset').split(',').forEach(item => add(item.trim().split(/\s+/)[0]));
        });
        return { url: new URL(url, location.href).href, html, assets: [...assets], title: doc.querySelector('h1')?.textContent || doc.title };
    }
    async function renderList() {
        const articles = await request('list');
        list.replaceChildren();
        for (const article of articles) {
            const row = document.createElement('li');
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = article.title;
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.textContent = 'Remove';
            remove.setAttribute('aria-label', `Remove ${article.title} from offline storage`);
            remove.onclick = async () => {
                remove.disabled = true;
                try { await request('remove', { url: article.url }); await renderList(); }
                catch (error) { announce(error.message); remove.disabled = false; }
            };
            row.append(link, remove);
            list.append(row);
        }
        announce(articles.length ? `${articles.length} article${articles.length === 1 ? '' : 's'} saved offline.` : 'No saved articles yet.');
    }
    async function init() {
        if (!('serviceWorker' in navigator) || !window.isSecureContext) {
            if (list) announce('Offline reading is unavailable in this browser. It requires HTTPS.');
            return;
        }
        // Ordinary pages do not need to install a worker until a download is requested.
        const existing = await navigator.serviceWorker.getRegistration('/');
        if (!button && !list && !existing) return;
        const registration = existing || await navigator.serviceWorker.register('/offline-worker.js', { scope: '/' });
        if (button) {
            setSaved((await request('list')).some(article => new URL(article.url).pathname === path));
            button.hidden = false;
            button.closest('.reading-controls').hidden = false;
            button.onclick = async () => {
                button.disabled = true;
                button.setAttribute('aria-busy', 'true');
                announce(saved ? 'Removing download…' : 'Saving article…');
                try {
                    if (saved) {
                        await request('remove', { url: new URL(path, location.origin).href });
                        setSaved(false);
                        announce('Download removed.');
                    } else {
                        const article = await page(path);
                        const library = await page('/saved/');
                        await request('save', { article, library });
                        setSaved(true);
                        announce('Saved offline. Find it in Saved articles in the footer. External media needs a connection.');
                        navigator.storage?.persist?.().catch(() => {});
                    }
                } catch (error) { announce(error.message); }
                finally { button.disabled = false; button.removeAttribute('aria-busy'); }
            };
        }
        if (list) await renderList();
        // Keep already installed workers up to date without changing saved snapshots.
        registration.update().catch(() => {});
    }
    init().catch(() => announce('Offline storage is unavailable. Check your browser settings and reload to try again.'));
})();
