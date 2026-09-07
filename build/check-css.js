/**
 * check-css.js — kiểm kê lớp CSS so với HTML đã sinh.
 * Dùng sau khi chạy `node build/build.js`: in ra mọi class xuất hiện trong
 * trang mà main.css chưa hề nhắc tới, để phần style không sót component mới.
 *   node build/check-css.js
 */
const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'site', 'assets', 'css', 'main.css'), 'utf8');
const cssClasses = new Set((css.match(/\.[A-Za-z_][\w-]*/g) || []).map((s) => s.slice(1)));
const pages = ['index.html', 'lo-trinh.html', 'du-an.html', 'tu-dien.html', 'gioi-thieu.html', '404.html', 'lessons/buoi-01.html', 'lessons/buoi-04.html', 'lessons/buoi-05.html'];
const used = new Map();
for (const p of pages) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'site', p), 'utf8');
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    m[1].split(/\s+/).filter(Boolean).forEach((c) => {
      if (!used.has(c)) used.set(c, new Set());
      used.get(c).add(p);
    });
  }
}
const missing = [...used.keys()].filter((c) => !cssClasses.has(c)).sort();
console.log('classes used: ' + used.size + ' | styled: ' + (used.size - missing.length));
console.log('MISSING (' + missing.length + '):');
missing.forEach((c) => console.log('  ' + c + '  <- ' + [...used.get(c)].join(', ')));
