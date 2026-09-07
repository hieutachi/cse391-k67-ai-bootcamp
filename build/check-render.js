'use strict';
/** Node >=22 + installed Edge/Chrome, no npm dependencies.
 * node build/check-render.js --local (starts/stops its own server)
 * node build/check-render.js https://hieutachi.github.io/cse391-k67-ai-bootcamp/
 * Screenshots + report: .publish/render-qa/ (not committed).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn } = require('child_process');
const SITE = path.resolve(__dirname, '../site');
const OUT = path.resolve(__dirname, '../.publish/render-qa');
const PORT = Number(process.env.CDP_PORT || 9444);
const LOCAL = process.argv.includes('--local');
const BASE = (LOCAL ? 'http://127.0.0.1:8123/' : process.argv[2] || 'https://hieutachi.github.io/cse391-k67-ai-bootcamp/').replace(/\/?$/, '/');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pages = fs.readdirSync(SITE).filter((f) => f.endsWith('.html')).concat(fs.readdirSync(path.join(SITE, 'lessons')).filter((f) => f.endsWith('.html')).map((f) => 'lessons/' + f));
const report = { base: BASE, checks: [], pages: [] };
function check(ok, label, detail) {
  report.checks.push({ ok: !!ok, label, detail });
  if (!ok) console.error('FAIL ' + label + ' ' + JSON.stringify(detail));
}

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.id && this.pending.has(msg.id)) this.pending.get(msg.id)(msg);
      else if (msg.method) this.events.push(msg);
    };
    this.ws.onclose = () => {
      for (const finish of this.pending.values()) finish({ error: { message: 'CDP closed' } });
    };
  }
  async open() {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('CDP open timeout')), 10000);
      this.ws.onopen = () => { clearTimeout(timer); resolve(); };
      this.ws.onerror = () => { clearTimeout(timer); reject(new Error('WebSocket error')); };
    });
  }
  send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      const finish = (msg) => {
        clearTimeout(timer);
        this.pending.delete(id);
        if (msg.error) reject(new Error(method + ': ' + msg.error.message));
        else resolve(msg.result);
      };
      const timer = setTimeout(() => finish({ error: { message: 'timeout' } }), 20000);
      this.pending.set(id, finish);
      try { this.ws.send(JSON.stringify({ id, method, params, sessionId })); }
      catch (error) { finish({ error }); }
    });
  }
}

function startServer() {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
  const server = http.createServer((req, res) => {
    let file;
    try { file = path.resolve(SITE, '.' + decodeURIComponent(new URL(req.url, BASE).pathname)); }
    catch { res.writeHead(400).end(); return; }
    if (file !== SITE && !file.startsWith(SITE + path.sep)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const exists = fs.existsSync(file);
    if (!exists) file = path.join(SITE, '404.html');
    res.writeHead(exists ? 200 : 404, { 'Content-Type': (types[path.extname(file)] || 'text/plain') + '; charset=utf-8', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(8123, '127.0.0.1', () => resolve(server));
  });
}

// Browser-side: inspect effective opacity of ancestors, not only the element.
function visibility() {
  const nodes = [...document.querySelectorAll('.reveal, [data-reveal], main h1, .visual-lab')];
  const hidden = nodes.filter((node) => {
    if (!node.getClientRects().length) return true;
    for (let el = node; el; el = el.parentElement) {
      const css = getComputedStyle(el);
      if (Number(css.opacity) < 0.95 || css.visibility === 'hidden' || css.display === 'none') return true;
    }
    return false;
  }).map((el) => el.id || el.className);
  return { total: nodes.length, hidden, overflow: document.documentElement.scrollWidth - innerWidth,
    title: document.querySelector('main h1')?.textContent, headingTop: document.querySelector('main h1')?.getBoundingClientRect().top, text: document.querySelector('main')?.innerText.length,
    lab: !!document.querySelector('.visual-lab iframe'), brokenImages: [...document.images].filter((im) => im.complete && !im.naturalWidth).length };
}

async function main() {
  const browser = [process.env.BROWSER_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => p && fs.existsSync(p));
  if (!browser || typeof WebSocket === 'undefined') throw new Error('Need Node >=22 and Edge/Chrome (or BROWSER_PATH)');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cse391-qa-'));
  let server, proc, cdp;
  try {
    fs.mkdirSync(OUT, { recursive: true });
    if (LOCAL) server = await startServer();
    proc = spawn(browser, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile], { stdio: 'ignore' });
    let spawnError;
    proc.on('error', (error) => { spawnError = error; });
    let version;
    for (let i = 0; i < 50; i++) {
      if (spawnError) throw spawnError;
      try { version = await (await fetch('http://127.0.0.1:' + PORT + '/json/version', { signal: AbortSignal.timeout(1000) })).json(); break; }
      catch { await sleep(200); }
    }
    if (!version) throw new Error('Browser startup timeout');
    cdp = new CDP(version.webSocketDebuggerUrl);
    await cdp.open();
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    const rpc = (method, params) => cdp.send(method, params, sessionId);
    for (const domain of ['Page', 'Runtime', 'Network', 'Log']) await rpc(domain + '.enable');
    await rpc('Network.setCacheDisabled', { cacheDisabled: true });
    const evaluate = async (expression) => {
      const response = await rpc('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
      return response.result.value;
    };
    const navigate = async (file) => {
      cdp.events.length = 0;
      const nav = await rpc('Page.navigate', { url: file.startsWith('data:') ? file : BASE + file });
      if (nav.errorText) throw new Error(nav.errorText);
      const until = Date.now() + 25000;
      while (!cdp.events.some((e) => e.sessionId === sessionId && e.method === 'Page.loadEventFired')) {
        if (Date.now() > until) throw new Error('Load timeout ' + file);
        await sleep(50);
      }
      await sleep(120);
    };
    const viewport = (width) => rpc('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    const media = (value) => rpc('Emulation.setEmulatedMedia', { media: value === 'print' ? 'print' : '', features: [{ name: 'prefers-reduced-motion', value: value === 'reduce' ? 'reduce' : 'no-preference' }] });
    const inspect = async (label) => {
      const state = await evaluate('(' + visibility.toString() + ')()');
      check(state.total > 0 && state.hidden.length === 0 && state.text > 80 && state.overflow <= 2 && !state.brokenImages, label, state);
      return state;
    };
    const screenshot = async (name) => {
      const { data } = await rpc('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(data, 'base64'));
    };
    // Full catalog on both layouts. Reduced-motion also tests its dedicated fallback.
    await media('reduce');
    for (const width of [1440, 380]) {
      await viewport(width);
      for (const file of pages) {
        await navigate(file);
        const state = await inspect(width + 'px ' + file);
        check(state.headingTop >= 0 && state.headingTop < 800, 'above fold ' + width + ' ' + file, state.headingTop);
        if (file.startsWith('lessons/')) check(state.lab, 'visual lab ' + width + ' ' + file);
        const errors = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown' || e.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(e.params.type));
        check(errors.length === 0, 'console ' + width + ' ' + file, errors.map((e) => e.params));
        report.pages.push({ file, width, ...state });
        if (['index.html', 'lessons/buoi-21.html'].includes(file)) await screenshot(width + '-' + file.replace(/[/.]/g, '-'));
      }
      console.log('Rendered ' + pages.length + ' pages at ' + width + 'px');
    }
    // Real scrolling with animation enabled on all formerly affected page types.
    await viewport(1440);
    await media('normal');
    for (const file of ['index.html', 'lo-trinh.html', 'gioi-thieu.html', 'du-an.html', 'lessons/buoi-01.html']) {
      await navigate(file);
      await evaluate(`(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          window.scrollTo({top: y, behavior: 'instant'});
          await new Promise(r => setTimeout(r, 80));
        }
      })()`);
      await sleep(1000);
      await inspect('animated scroll ' + file);
    }
    await runInteractions({ rpc, evaluate, navigate, viewport, media, inspect, screenshot });
  } finally {
    if (cdp) {
      try { await cdp.send('Browser.close'); } catch { /* browser closed socket */ }
      cdp.ws.close();
    }
    if (proc && proc.exitCode === null) proc.kill();
    if (server) await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); });
    await sleep(300);
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* OS may retain profile briefly */ }
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  }
  const failed = report.checks.filter((c) => !c.ok).length;
  console.log((report.checks.length - failed) + '/' + report.checks.length + ' PASS; ' + failed + ' FAIL — ' + BASE);
  process.exitCode = failed ? 1 : 0;
}

async function runInteractions({ rpc, evaluate, navigate, viewport, media, inspect, screenshot }) {
  await media('reduce');
  await navigate('lessons/buoi-01.html');
  check(await evaluate(`(async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true}));
    const input = document.querySelector('#search-q');
    input.value = 'grid'; input.dispatchEvent(new Event('input', {bubbles:true}));
    const ok = !document.querySelector('#search').hidden && document.querySelectorAll('.search__item').length > 0;
    document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}));
    await new Promise(resolve => setTimeout(resolve, 250));
    return ok && document.querySelector('#search').hidden;
  })()`), 'Ctrl+K search / Escape');
  check(await evaluate(`(() => {
    document.querySelectorAll('.quiz input[data-correct="1"]').forEach(input => { input.checked=true; input.dispatchEvent(new Event('change', {bubbles:true})); });
    document.querySelector('[data-quiz-check]').click();
    return document.querySelector('[data-quiz-score]').classList.contains('is-good');
  })()`), 'quiz grading');
  await evaluate(`document.querySelector('[data-mark-done]').click(); document.querySelector('[data-theme-toggle]').click()`);
  const theme = await evaluate('document.documentElement.dataset.theme');
  await navigate('lessons/buoi-02.html');
  check(await evaluate(`document.querySelector('[data-progress-count]').textContent.startsWith('1/')`), 'progress across navigation');
  await navigate('lessons/buoi-01.html');
  check(await evaluate(`document.querySelector('[data-mark-done]').getAttribute('aria-pressed') === 'true' && document.querySelector('[data-quiz-score]').classList.contains('is-good') && document.querySelector('[data-quiz-score]').textContent.includes('Kết quả đã lưu')`), 'progress + quiz reload persistence');
  check(await evaluate('document.documentElement.dataset.theme') === theme, 'theme persistence');
  await screenshot('lesson-dark');
  await evaluate(`document.querySelector('#hoc-truc-quan').scrollIntoView(); document.documentElement.dataset.theme='light'`);
  await screenshot('visual-lab-light');
  check(await evaluate(`(() => {
    const lab = document.querySelector('.visual-lab');
    const editor = lab.querySelector('textarea');
    lab.querySelector('.visual-lab__editor').open = true;
    editor.value = '<head></head><h1>QA preview</h1>';
    lab.querySelector('[data-preview-run]').click();
    const ok = lab.querySelector('iframe').srcdoc.includes('QA preview');
    lab.querySelector('[data-preview-reset]').click();
    lab.querySelector('[data-preview-width="360"]').click();
    return ok && !editor.value.includes('QA preview') && lab.querySelector('iframe').style.width === '360px';
  })()`), 'preview edit / run / reset / resize');
  await viewport(380);
  await evaluate(`document.querySelector('[data-menu]').click()`);
  await sleep(350);
  check(await evaluate(`document.body.classList.contains('nav-open') && document.querySelector('#sidebar').getBoundingClientRect().left >= -2`), 'mobile drawer opens');
  await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape',bubbles:true}))`);
  check(await evaluate(`!document.body.classList.contains('nav-open')`), 'mobile drawer closes');
  await navigate('tu-dien.html');
  check(await evaluate(`(() => { const q=document.querySelector('#glossary-q'); q.value='flexbox'; q.dispatchEvent(new Event('input')); const n=document.querySelectorAll('.dict__row:not(.is-hidden)').length; return n>0 && n<document.querySelectorAll('.dict__row').length; })()`), 'glossary filtering');

  await navigate('lessons/buoi-10.html');
  await evaluate(`document.querySelector('.task__box').click()`);
  await navigate('lessons/buoi-10.html');
  check(await evaluate(`document.querySelector('.task__box').getAttribute('aria-checked') === 'true'`), 'task reload persistence');
  await evaluate(`document.querySelector('.task__box').dispatchEvent(new KeyboardEvent('keydown', {key:' ',bubbles:true}))`);
  check(await evaluate(`document.querySelector('.task__box').getAttribute('aria-checked') === 'false'`), 'task keyboard toggle');
  await viewport(1440);
  check(await evaluate(`[...document.querySelectorAll('[data-toc]')].every(link => document.getElementById(link.dataset.toc))`), 'TOC targets exist');
  await evaluate(`document.querySelector('[data-toc="hoc-truc-quan"]').click()`);
  await sleep(150);
  check(await evaluate(`document.querySelector('[data-toc="hoc-truc-quan"]').classList.contains('is-active')`), 'TOC click active');
  await rpc('Browser.grantPermissions', { origin: new URL(BASE).origin, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await evaluate(`document.querySelector('.visual-lab__source').open = true; document.querySelector('.visual-lab [data-copy]').click()`);
  await sleep(150);
  check(await evaluate(`document.querySelector('.visual-lab [data-copy]').classList.contains('is-copied')`), 'copy code');
  for (const mode of ['no-js', 'print', 'no-io', 'broken-io']) {
    await media(mode === 'print' ? 'print' : 'normal');
    await rpc('Emulation.setScriptExecutionDisabled', { value: mode === 'no-js' });
    let script;
    if (mode.includes('io')) script = await rpc('Page.addScriptToEvaluateOnNewDocument', { source: mode === 'no-io' ? 'delete window.IntersectionObserver;' : 'window.IntersectionObserver = function(){ throw new Error("QA injected failure"); };' });
    for (const file of ['index.html', 'gioi-thieu.html', 'lessons/buoi-01.html']) {
      await navigate(file);
      await sleep(650);
      await inspect(mode + ' ' + file);
    }
    if (script) await rpc('Page.removeScriptToEvaluateOnNewDocument', { identifier: script.identifier });
    await rpc('Emulation.setScriptExecutionDisabled', { value: false });
  }
  // Execute the 13 self-contained chapter demos, including their actual JS.
  await media('reduce');
  const { documentFor } = require('./visuals');
  for (let chapter = 1; chapter <= 13; chapter++) {
    await navigate('data:text/html;charset=utf-8,' + encodeURIComponent(documentFor(chapter)));
    check(await evaluate('!!document.querySelector("h1") && document.documentElement.scrollWidth <= innerWidth'), 'demo render ' + chapter);
    if (chapter === 3) check(await evaluate(`document.querySelector('input').value='test@example.com'; document.querySelector('button').click(); document.querySelector('footer').textContent.includes('hợp lệ')`), 'demo form validation');
    if (chapter === 9) check(await evaluate(`document.querySelector('#result').textContent.includes('300.000')`), 'demo reduce total');
    if (chapter === 10) check(await evaluate(`document.querySelector('input').value='Bình'; document.querySelector('input').dispatchEvent(new Event('input')); document.querySelectorAll('li:not([hidden])').length === 1`), 'demo DOM filter');
    if (chapter === 11) {
      await evaluate(`document.querySelector('button').click()`);
      await sleep(750);
      check(await evaluate(`document.querySelector('#status').textContent.includes('09:30') && !document.querySelector('button').disabled`), 'demo async loading');
    }
    if (chapter === 12) check(await evaluate(`document.querySelector('button').click(); document.querySelector('#status').textContent.includes('08:00')`), 'demo booking');
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });