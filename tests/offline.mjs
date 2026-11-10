// Run against a built static site: SITE_URL=http://localhost:8765 node tests/offline.mjs
// Requires Playwright; PLAYWRIGHT_MODULE can point to an existing installation.
import assert from 'node:assert/strict';
const playwright = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = playwright[process.env.BROWSER || 'chromium'];
const base = process.env.SITE_URL || 'http://localhost:8765';
const browser = await engine.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const first = '/posts/2026/06/ai-engineering/';
const second = '/posts/2023/03/path-to-production/';
const toggle = page.locator('.offline-toggle');
async function saved() {
    await page.waitForFunction(() => document.querySelector('.offline-toggle')?.getAttribute('aria-pressed') === 'true');
}
try {
    await page.goto(base + first);
    await toggle.waitFor({ state: 'visible' });
    await page.goto(base + '/saved/');
    await page.getByText('No saved articles yet.', { exact: true }).waitFor();
    // A required resource returning 404 must not publish a partial article.
    const failure = await page.evaluate(async () => {
        const worker = (await navigator.serviceWorker.ready).active;
        return new Promise(resolve => {
            const channel = new MessageChannel();
            channel.port1.onmessage = event => resolve(event.data);
            worker.postMessage({ type: 'save', article: { url: location.origin + '/posts/failed/', title: 'Failed download', html: '<h1>Incomplete</h1>', assets: ['/missing-offline-required-asset.png'] }, library: { url: location.origin + '/saved/', html: '', assets: [] } }, [channel.port2]);
        });
    });
    assert(failure.error, 'Missing required assets must reject the download');
    await page.reload();
    await page.getByText('No saved articles yet.', { exact: true }).waitFor();
    await page.goto(base + first);
    await toggle.click();
    await saved();
    await page.getByRole('button', { name: 'Focus mode', exact: true }).click();
    assert(await page.locator('body').evaluate(el => el.classList.contains('focus-mode')));
    await page.keyboard.press('Escape');
    for (const width of [1280, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => document.fonts.ready);
        const focus = await page.getByRole('button', { name: 'Focus mode', exact: true }).boundingBox();
        const offline = await toggle.boundingBox();
        assert(Math.abs(focus.y - offline.y) < 2, 'Controls must align');
        assert(offline.x >= focus.x + focus.width - 1, 'Offline icon follows focus mode');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
        await page.screenshot({ path: `/tmp/offline-${width}.png` });
    }
    await context.setOffline(true);
    await page.reload();
    await saved();
    assert(await page.locator('.post').innerText());
    await page.goto(base + '/saved/');
    await page.getByText('1 article saved offline.', { exact: true }).waitFor();
    await page.locator('#saved-articles a').click();
    await saved();
    await page.goto(base + second);
    await page.getByRole('heading', { name: 'This page is not saved offline' }).waitFor();
    await context.setOffline(false);
    await page.goto(base + second);
    await toggle.click();
    await saved();
    await context.setOffline(true);
    await page.goto(base + '/saved/');
    await page.getByText('2 articles saved offline.', { exact: true }).waitFor();
    await page.locator('#saved-articles li').filter({ has: page.locator(`a[href="${base + first}"]`) }).getByRole('button').click();
    await page.getByText('1 article saved offline.', { exact: true }).waitFor();
    await page.goto(base + first);
    await page.getByRole('heading', { name: 'This page is not saved offline' }).waitFor();
    await page.goto(base + second);
    await saved();
    assert(await page.locator('.post img').count() > 0, 'Image test must exercise actual images');
    await page.locator('.post img').evaluateAll(images => Promise.all(images.map(img => img.decode().catch(() => {}))));
    const broken = await page.locator('.post img').evaluateAll(images => images.filter(img => img.src.startsWith(location.origin) && (!img.complete || !img.naturalWidth)).map(img => img.src));
    assert.deepEqual(broken, [], 'Saved local images load offline');
    await toggle.click();
    await page.getByText('Download removed.', { exact: true }).waitFor();
    await page.goto(base + '/saved/');
    await page.getByText('No saved articles yet.', { exact: true }).waitFor();
    await page.reload();
    await page.getByText('No saved articles yet.', { exact: true }).waitFor();
    // Reload the library in a new tab, with no network or existing document state.
    const reopened = await context.newPage();
    await reopened.goto(base + '/saved/');
    await reopened.getByText('No saved articles yet.', { exact: true }).waitFor();
    await reopened.close();
    assert.deepEqual(errors, []);
    console.log('PASS: opt-in saves, responsive controls, focus mode, offline reload/list, unsaved fallback, shared assets, removal.');
} finally {
    await browser.close();
}
