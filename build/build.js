'use strict';
/**
 * build.js — sinh toàn bộ website tĩnh vào thư mục `site/`.
 * Chạy: `node build/build.js` (không cần dependency nào).
 *
 * Đầu vào : toàn bộ 64 bài Markdown trong `course-lessons/vi/` (13 chương).
 * Đầu ra  : site/index.html, gioi-thieu.html, lo-trinh.html, du-an.html, tu-dien.html, 404.html,
 *           lessons/buoi-0X.html, assets/js/search-index.js, sitemap.xml, robots.txt,
 *           site.webmanifest, .nojekyll
 */

const fs = require('fs');
const path = require('path');

const config = require('./config');
require('./catalog').expandCatalog(config);
const { parseLesson } = require('./markdown');
const T = require('./templates');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const pad2 = (n) => String(n).padStart(2, '0');

/** Đổi thành miền deploy thật (hoặc đặt env CSE391_BASE_URL) — dùng cho sitemap + robots. */
const BASE_URL = process.env.CSE391_BASE_URL || 'https://hieutachi.github.io/cse391-k67-ai-bootcamp/';

const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  return rel;
};

/** Đọc + parse danh mục, gắn title / số đầu việc / nguồn để template và tìm kiếm dùng. */
function loadSessions() {
  return config.SESSIONS.map((s) => {
    const abs = path.join(ROOT, s.file);
    if (!fs.existsSync(abs)) throw new Error('Thiếu file bài học: ' + s.file);
    const parsed = parseLesson(fs.readFileSync(abs, 'utf8'));
    s.title = parsed.title;
    s.sourceUrl = config.COURSE.repo + '/blob/main/' + s.file;
    s.words = parsed.plainText.split(/\s+/).filter(Boolean).length;
    s.tasks = parsed.sections
      .concat(parsed.goalsSection ? [parsed.goalsSection] : [], parsed.nextSection ? [parsed.nextSection] : [])
      .reduce((n, sec) => n + (sec.html.match(/class="task__box/g) || []).length, 0);
    s.parsed = parsed;
    return s;
  });
}

function buildSearchIndex(sessions) {
  const items = [];
  items.push({ t: 'Trang chủ', k: 'Trang', u: 'index.html', x: config.COURSE.tagline + ' — ' + config.COURSE.subtitle });
  items.push({ t: 'Giới thiệu khoá học', k: 'Trang', u: 'gioi-thieu.html', x: 'Sứ mệnh, đối tượng, bộ công cụ và câu hỏi thường gặp.' });
  items.push({ t: 'Lộ trình 8 tuần', k: 'Trang', u: 'lo-trinh.html', x: config.CHAPTERS.map((c) => c.title + ': ' + c.summary).join(' | ') });
  items.push({ t: 'Dự án tốt nghiệp', k: 'Trang', u: 'du-an.html', x: config.COURSE.project + ' — Landing Page, đặt lịch khám, Admin Dashboard.' });
  items.push({ t: 'Từ điển thuật ngữ', k: 'Trang', u: 'tu-dien.html', x: 'Toàn bộ thuật ngữ tiếng Anh kèm nghĩa tiếng Việt.' });

  sessions.forEach((s) => {
    items.push({
      t: 'Buổi ' + pad2(s.n) + ' · ' + s.title,
      k: 'Buổi học',
      u: s.url,
      x: s.summary + ' — ' + s.parsed.toc.map((x) => x.title).join(' · '),
      q: s.quiz.map((q) => q.q).join(' '),
    });
  });

  T.allTerms().forEach((t) => {
    items.push({
      t: t.en + (t.vi ? ' — ' + t.vi : ''),
      k: 'Thuật ngữ',
      u: 'tu-dien.html#g-' + t.en.charAt(0).toUpperCase(),
      x: t.def,
    });
  });

  config.WORKFLOW.forEach((w) => {
    items.push({ t: w.vi + ' — ' + w.en, k: 'Khái niệm', u: 'index.html#workflow', x: w.text });
  });
  config.FAQ.forEach((f) => {
    items.push({ t: f.q, k: 'Hỏi đáp', u: 'gioi-thieu.html#faq', x: f.a });
  });

  return 'window.__CSE391_SEARCH__ = ' + JSON.stringify(items) + ';';
}

function manifest() {
  return JSON.stringify({
    name: config.COURSE.title,
    short_name: 'CSE391 AI FE',
    description: config.COURSE.tagline,
    lang: 'vi',
    start_url: './index.html',
    display: 'standalone',
    background_color: '#f7f9fb',
    theme_color: '#0f766e',
    icons: [{ src: './assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }, null, 2);
}

function sitemap(pages) {
  const base = BASE_URL.replace(/\/$/, '');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + pages.map((p) => '  <url><loc>' + base + '/' + p + '</loc></url>').join('\n') + '\n</urlset>\n';
}

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" rx="14" fill="#0f766e"/>
<path d="M32 14 50 24v16L32 50 14 40V24z" fill="none" stroke="#99f6e4" stroke-width="3" stroke-linejoin="round"/>
<path d="M32 24v16M24 32h16" stroke="#f0fdfa" stroke-width="4" stroke-linecap="round"/>
</svg>
`;

function main() {
  const started = Date.now();
  console.log('\nCSE391 · build website tĩnh');

  const sessions = loadSessions();
  // Markdown liên kết sang bài khác: đổi sang URL site, không để link .md bị 404.
  const bySource = new Map(sessions.map((s) => [path.resolve(ROOT, s.file), s.url]));
  sessions.forEach((s) => {
    const rewrite = (html) => html.replace(/href="([^"#]+\.md)(#[^"]*)?"/g, (match, href) => {
      if (/^https?:/.test(href)) return match;
      const dest = path.resolve(ROOT, path.dirname(s.file), decodeURIComponent(href));
      const url = bySource.get(dest);
      return 'href="' + (url ? '../' + url : config.COURSE.repo + '/blob/main/' + path.relative(ROOT, dest).split(path.sep).join('/')) + '"';
    });
    s.parsed.leadHtml = rewrite(s.parsed.leadHtml);
    [...s.parsed.sections, s.parsed.nextSection, s.parsed.goalsSection].filter(Boolean).forEach((sec) => { sec.html = rewrite(sec.html); });
  });
  const pages = [];
  const emit = (rel, html) => {
    write(rel, html);
    pages.push(rel);
    console.log('  ' + rel.padEnd(30) + (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1) + ' KB');
  };

  emit('index.html', T.pageHome(''));
  emit('gioi-thieu.html', T.pageAbout(''));
  emit('lo-trinh.html', T.pageRoadmap(''));
  emit('du-an.html', T.pageProject(''));
  emit('tu-dien.html', T.pageGlossary(''));
  emit('404.html', T.page404(''));

  sessions.forEach((s, i) => {
    emit(s.url, T.pageLesson({
      root: '../',
      session: s,
      parsed: s.parsed,
      prev: i > 0 ? sessions[i - 1] : null,
      next: i < sessions.length - 1 ? sessions[i + 1] : null,
      sourceUrl: s.sourceUrl,
    }));
  });

  write('assets/js/search-index.js', buildSearchIndex(sessions));
  write('assets/img/favicon.svg', FAVICON);
  write('site.webmanifest', manifest());
  write('sitemap.xml', sitemap(pages.filter((p) => p.endsWith('.html'))));
  write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + BASE_URL.replace(/\/$/, '') + '/sitemap.xml\n');
  write('.nojekyll', '');

  const tasks = sessions.reduce((n, s) => n + s.tasks, 0);
  console.log('\n  ' + pages.length + ' trang · ' + sessions.length + ' buổi · ' + tasks + ' đầu việc · '
    + T.allTerms().length + ' thuật ngữ · ' + ((Date.now() - started) / 1000).toFixed(2) + 's');
  console.log('  Chạy thử:  npx serve site   rồi mở http://localhost:3000\n');
}

main();

