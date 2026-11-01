/* Version the storage schema independently of site builds: saved snapshots survive deploys. */
const ASSETS = 'articles-offline-assets-v1';
const RECORDS = 'articles-offline-records-v1';
const LIBRARY = new URL('/saved/', self.location.origin).href;
let mutations = Promise.resolve();
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

async function records() {
    const cache = await caches.open(RECORDS);
    return Promise.all((await cache.keys()).map(async key => (await cache.match(key)).json()));
}
async function collectGarbage() {
    const keep = new Set((await records()).flatMap(record => record.assets));
    const cache = await caches.open(ASSETS);
    await Promise.all((await cache.keys()).filter(key => !keep.has(key.url)).map(key => cache.delete(key)));
}
function localURL(value) {
    const url = new URL(value, self.location.origin);
    if (url.origin !== self.location.origin) throw new Error('Only articles from this site can be saved.');
    url.hash = '';
    return url.href;
}
async function save({ article, library }) {
    article.url = localURL(article.url);
    if (!new URL(article.url).pathname.startsWith('/posts/') || localURL(library.url) !== LIBRARY) {
        throw new Error('This page cannot be saved as an article.');
    }
    const cache = await caches.open(ASSETS);
    const metadata = await caches.open(RECORDS);
    const seen = new Set();
    async function download(value) {
        const url = localURL(value);
        if (seen.has(url)) return;
        seen.add(url);
        let response = await cache.match(url);
        if (!response) {
            response = await fetch(url, { cache: 'reload', signal: AbortSignal.timeout(30000) });
            if (!response.ok) throw new Error('An article asset could not be downloaded. Please try again.');
            await cache.put(url, response.clone());
        }
        if (response.headers.get('Content-Type')?.includes('text/css')) {
            const css = await response.text();
            const dependencies = [...css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)|@import\s+['"]([^'"]+)['"]/g)];
            for (const match of dependencies) {
                const dependency = new URL(match[1] || match[2], url);
                if (dependency.origin === self.location.origin) await download(dependency.href);
            }
        }
    }
    try {
        for (const asset of library.assets) await download(asset);
        const libraryAssets = [...seen, LIBRARY];
        seen.clear();
        for (const asset of article.assets) await download(asset);
        // Publish complete snapshots only after every local dependency succeeds.
        for (const document of [library, article]) {
            await cache.put(document.url, new Response(document.html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
        }
        await metadata.put(LIBRARY, new Response(JSON.stringify({ url: LIBRARY, assets: libraryAssets })));
        const assets = [...seen, article.url];
        await metadata.put(article.url, new Response(JSON.stringify({ url: article.url, title: article.title, assets })));
    } catch (error) {
        await collectGarbage();
        throw error;
    }
}
self.addEventListener('message', event => {
    if (!event.ports[0]) return;
    const operation = async () => {
        const { type, url } = event.data;
        if (type === 'list') return (await records()).filter(record => record.url !== LIBRARY);
        if (type === 'save') await save(event.data);
        else if (type === 'remove') {
            await (await caches.open(RECORDS)).delete(localURL(url));
            await collectGarbage();
        }
    };
    // Serialize writes across tabs; failed requests do not poison the queue.
    const task = mutations.then(operation);
    mutations = task.catch(() => {});
    event.waitUntil(task.then(result => event.ports[0].postMessage({ result }), error => {
        event.ports[0].postMessage({ error: error.name === 'QuotaExceededError' ? 'Not enough browser storage. Remove some downloads and try again.' : error.message });
    }));
});
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
    event.respondWith((async () => {
        try {
            const response = await fetch(event.request);
            if (response.status < 500) return response;
        } catch (_) { /* Offline: fall through to explicitly downloaded content. */ }
        const cache = await caches.open(ASSETS);
        const key = event.request.mode === 'navigate' ? new URL(url.pathname, url.origin).href : event.request.url;
        const cached = await cache.match(key);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
            return new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Article unavailable offline</title><h1>This page is not saved offline</h1><p>Connect to the internet to open it, or choose one of your <a href="/saved/">saved articles</a>.</p></html>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
        return Response.error();
    })());
});
