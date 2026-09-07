/**
 * qa-check.js — kiểm tra nhanh site/ sau khi build (không phát hành kèm website).
 *   node build/build.js && node build/qa-check.js && node build/check-css.js
 * Kiểm tra: liên kết trong search-index, mọi href nội bộ, id mà main.js cần,
 * biến CSS dùng nhưng chưa định nghĩa, và norm tiếng Việt của main.js.
 */
const fs = require('fs');
const path = require('path');
const site = path.join(__dirname, '..', 'site');

global.window = {};
require(path.join(site, 'assets', 'js', 'search-index.js'));
const items = global.window.__CSE391_SEARCH__ || [];
const badIndex = items.filter((i) => !fs.existsSync(path.join(site, i.u.split('#')[0])));
console.log('search items: ' + items.length + ' | bad urls: ' + badIndex.length);
badIndex.slice(0, 8).forEach((i) => console.log('   ' + i.u));

const pages = fs.readdirSync(site).filter((f) => f.endsWith('.html'))
  .concat(fs.readdirSync(path.join(site, 'lessons')).map((f) => 'lessons/' + f));
let broken = 0, checked = 0;
for (const f of pages) {
  const html = fs.readFileSync(path.join(site, f), 'utf8');
  const dir = path.dirname(path.join(site, f));
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|#|data:|tel:)/.test(u)) continue;
    checked += 1;
    const target = u.split('#')[0];
    if (!target) continue;
    const abs = path.normalize(path.join(dir, target));
    if (fs.existsSync(abs)) continue;
    broken += 1;
    console.log('   BROKEN ' + f + ' -> ' + u);
  }
}
console.log('pages: ' + pages.length + ' | local hrefs: ' + checked + ' | broken: ' + broken);

const problems = [];
for (const f of pages) {
  const html = fs.readFileSync(path.join(site, f), 'utf8');
  ['main', 'sidebar', 'search', 'search-q', 'search-results'].forEach((id) => {
    if (!html.includes('id="' + id + '"')) problems.push(f + ' thiếu #' + id);
  });
  if (f === 'tu-dien.html' && !html.includes('id="glossary-q"')) problems.push(f + ' thiếu #glossary-q');
}
console.log('id check: ' + (problems.length ? problems.join(' | ') : 'ok'));

/* biến CSS được dùng nhưng không định nghĩa */
const css = fs.readFileSync(path.join(site, 'assets', 'css', 'main.css'), 'utf8');
const defined = new Set((css.match(/--[a-z0-9-]+(?=\s*:)/gi) || []).map((s) => s));
const usedVars = new Set((css.match(/var\(\s*--[a-z0-9-]+/gi) || []).map(function (s) { return s.replace(/var\(\s*/, ''); }));
const undef = [...usedVars].filter((v) => !defined.has(v)).sort();
console.log('css vars used: ' + usedVars.size + ' | undefined: ' + (undef.length ? undef.join(', ') : 'none'));

/* hàm norm/highlight thuần: kiểm tra khớp chỉ số với tiếng Việt có dấu */
const js = fs.readFileSync(path.join(site, 'assets', 'js', 'main.js'), 'utf8');
const groups = js.match(/NORM_GROUPS = '([^']+)'/)[1];
const map = {};
groups.split('|').forEach((g) => { for (let i = 1; i < g.length; i += 1) map[g.charAt(i)] = g.charAt(0); });
const norm = (s) => String(s).toLowerCase().split('').map((c) => (c in map ? map[c] : c)).join('');
[['Lộ trình', 'lo trinh'], ['Đường dẫn', 'duong dan'], ['Thuật ngữ', 'thuat ngu']].forEach(([word]) => {
  const n = norm(word);
  if (n.length !== word.length) console.log('   ĐỘ DÀI LỆCH: ' + word);
});
console.log('norm sample: ' + norm('Đường dẫn “Thuật ngữ”'));
