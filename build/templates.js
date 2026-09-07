'use strict';
/**
 * templates.js — dựng HTML cho toàn bộ trang tĩnh của website khoá học.
 * Không dùng template engine: chỉ chuỗi + hàm, để build chạy bằng Node thuần.
 */

const {
  COURSE, CHAPTERS, SESSIONS, WORKFLOW, AUDIENCE, TIPS, ROADMAP, TOOLS, FAQ,
} = require('./config');

const esc = (s) =>
  String(s === undefined || s === null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const attr = esc;
const pad2 = (n) => String(n).padStart(2, '0');

/** Thuật ngữ của một buổi, gắn thêm nguồn để trang từ điển dùng lại. */
const sessionTerms = (s) => s.terms.map((t) => ({ ...t, session: s.n, url: s.url }));

/** Toàn bộ thuật ngữ (5 buổi + phần mở rộng), bỏ trùng và sắp xếp theo A-Z tiếng Việt. */
function allTerms() {
  const config = require('./config');
  const list = [...SESSIONS.flatMap(sessionTerms), ...config.EXTRA_TERMS.map((t) => ({ ...t, session: null }))];
  const seen = new Set();
  const unique = list.filter((t) => {
    const key = t.en.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const norm = (x) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
  return unique.sort((a, b) => norm(a.en).localeCompare(norm(b.en)));
}

/* ------------------------------------------------------------------ icons */

const ICONS = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 21l-3-3-9.2-9.2a4 4 0 0 1 5-5z"/><path d="M3 3l7 7"/>',
  loop: '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6M13 3l-2 18"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".9"/><circle cx="17.5" cy="10.5" r=".9"/><circle cx="8.5" cy="7.5" r=".9"/><circle cx="6.5" cy="12.5" r=".9"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 10 10 0 0 0-10-10z"/>',
  db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 12a15 15 0 0 1 8-9c2 0 4 2 4 4a15 15 0 0 1-9 8z"/><path d="m9 12 3 3"/>',
  book: '<path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  moon: '<path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/>',
  check: '<path d="m5 13 4 4L19 7"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v6H5V6h6"/>',
  hospital: '<path d="M3 21V8l9-5 9 5v13"/><path d="M12 8v6M9 11h6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7"/><path d="M12 17h.01"/>',
};

function icon(name, cls) {
  const d = ICONS[name] || ICONS.spark;
  return '<svg class="' + attr(cls || 'ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
}

/* ---------------------------------------------------------------- layout */

function head(o) {
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${attr(o.desc)}">
<meta name="theme-color" content="#0f766e">
<meta property="og:type" content="website">
<meta property="og:title" content="${attr(o.title)}">
<meta property="og:description" content="${attr(o.desc)}">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/svg+xml" href="${o.root}assets/img/favicon.svg">
<link rel="manifest" href="${o.root}site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="${o.root}assets/css/main.css">
<script>(function(){try{var t=localStorage.getItem('cse391-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
</head>`;
}

function sidebar(root, active) {
  const link = (href, label, key) =>
    '<a class="nav__link' + (active === key ? ' is-active' : '') + '" href="' + root + href + '">' +
    '<span>' + esc(label) + '</span></a>';
  const lessons = SESSIONS.map((s) =>
    '<a class="nav__link nav__link--lesson' + (active === 'lesson-' + s.n ? ' is-active' : '') + '" href="' + root + s.url + '" data-lesson-link="' + s.n + '">' +
    '<span class="nav__dot" data-dot="' + s.n + '">' + icon('check', 'ico ico--xs') + '</span>' +
    '<span class="nav__num">' + pad2(s.n) + '</span>' +
    '<span class="nav__label">' + esc(s.title) + '</span></a>'
  ).join('');
  return `<aside class="sidebar" id="sidebar" aria-label="Điều hướng khoá học">
  <div class="sidebar__inner">
    <p class="sidebar__eyebrow">${esc(COURSE.school)}</p>
    <nav class="nav">
      <p class="nav__title">Bắt đầu</p>
      ${link('index.html', 'Trang chủ', 'home')}
      ${link('gioi-thieu.html', 'Giới thiệu khoá học', 'about')}
      <p class="nav__title">Chương 1 · 5 buổi đã phát hành</p>
      <div class="nav__lessons">${lessons}</div>
      <p class="nav__title">Tham khảo</p>
      ${link('lo-trinh.html', 'Lộ trình 8 tuần', 'roadmap')}
      ${link('du-an.html', 'Dự án tốt nghiệp', 'project')}
      ${link('tu-dien.html', 'Từ điển thuật ngữ', 'glossary')}
    </nav>
    <div class="sidebar__foot">
      <div class="progress-card">
        <div class="progress-card__top">
          <span class="progress-card__label">Tiến độ của bạn</span>
          <strong class="progress-card__val" data-progress-count>0/5</strong>
        </div>
        <span class="progress-bar" role="progressbar" aria-label="Số buổi đã hoàn thành" aria-valuemin="0" aria-valuemax="5" aria-valuenow="0" data-progressbar><i class="progress-bar__fill" data-progress-fill></i></span>
        <button class="btn btn--ghost btn--sm" type="button" data-reset-progress>Đặt lại tiến độ</button>
      </div>
    </div>
  </div>
</aside>`;
}

function searchOverlay() {
  return `<div class="search" id="search" hidden>
  <div class="search__panel" role="dialog" aria-modal="true" aria-label="Tìm kiếm trong khoá học">
    <div class="search__bar">${icon('search')}
      <input type="search" id="search-q" placeholder="Tìm theo thuật ngữ, khái niệm, buổi học…" autocomplete="off" aria-label="Từ khoá tìm kiếm">
      <button class="icon-btn" type="button" data-close-search aria-label="Đóng tìm kiếm"><span aria-hidden="true">✕</span></button>
    </div>
    <ul class="search__results" id="search-results" aria-live="polite"></ul>
    <p class="search__hint">Thử ngay: <button class="chip chip--btn" data-try="flexbox">flexbox</button> <button class="chip chip--btn" data-try="prompt">prompt</button> <button class="chip chip--btn" data-try="Live Server">Live Server</button> <button class="chip chip--btn" data-try="localStorage">localStorage</button></p>
  </div>
</div>`;
}

function layout(o) {
  const root = o.root || '';
  return `${head(o)}
<body class="tpl-${attr(o.tpl || 'page')}" data-root="${attr(root)}" data-total="${SESSIONS.length}">
<a class="skip-link" href="#main">Bỏ qua tới nội dung chính</a>
<header class="topbar">
  <button class="icon-btn topbar__menu" type="button" data-menu aria-expanded="false" aria-controls="sidebar" aria-label="Mở thực đơn">${icon('menu')}</button>
  <a class="brand" href="${root}index.html">
    <span class="brand__mark">${icon('hospital', 'ico')}</span>
    <span class="brand__text"><strong>CSE391 · K67</strong><small>AI-Accelerated Frontend</small></span>
  </a>
  <span class="topbar__spacer"></span>
  <button class="btn btn--search" type="button" data-open-search>${icon('search')}<span>Tìm kiếm</span><kbd>Ctrl</kbd><kbd>K</kbd></button>
  <span class="topbar__ring" data-ring title="Tiến độ khoá học">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="ring-bg" cx="18" cy="18" r="15.5"></circle><circle class="ring-fg" cx="18" cy="18" r="15.5" stroke-dasharray="97.4" data-ring-circle></circle></svg>
    <span data-ring-label>0%</span>
  </span>
  <button class="icon-btn" type="button" data-theme-toggle aria-label="Đổi giao diện sáng / tối">
    <span class="theme-ico theme-ico--light">${icon('sun')}</span><span class="theme-ico theme-ico--dark">${icon('moon')}</span>
  </button>
</header>
<div class="shell">
${sidebar(root, o.active)}
<main class="main" id="main">
${o.body}
</main>
</div>
<footer class="site-footer"><div class="site-footer__inner">
  <p><strong>${esc(COURSE.title)}</strong> · ${esc(COURSE.school)} — ${esc(COURSE.cohort)} · Dự án: ${esc(COURSE.project)}</p>
  <p class="muted">Tiến độ và bài làm của bạn được lưu ngay trên máy — không tài khoản, không server.</p>
  <p class="site-footer__links"><a href="${root}index.html">Trang chủ</a> · <a href="${root}lo-trinh.html">Lộ trình</a> · <a href="${root}tu-dien.html">Từ điển</a> · <a href="${attr(COURSE.repo)}" target="_blank" rel="noopener noreferrer">Mã nguồn khoá học</a></p>
</div></footer>
<span class="scrim" data-scrim hidden></span>
${searchOverlay()}
<script src="${root}assets/js/search-index.js"></script>
<script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------- shared fragments */

const chip = (text) => '<span class="chip">' + esc(text) + '</span>';

function sectionHead(o) {
  return `<div class="section-head${o.center ? ' section-head--center' : ''}">
  ${o.kicker ? '<p class="kicker">' + esc(o.kicker) + '</p>' : ''}
  <h2${o.id ? ' id="' + attr(o.id) + '"' : ''}>${esc(o.title)}</h2>
  ${o.text ? '<p class="section-head__text">' + esc(o.text) + '</p>' : ''}
</div>`;
}

function statItems() {
  return [
    { v: COURSE.weeks, l: 'tuần học' },
    { v: COURSE.chapters, l: 'chương trình' },
    { v: COURSE.lessons, l: 'bài học' },
    { v: SESSIONS.length, l: 'buổi đã phát hành' },
  ];
}

function statsHTML() {
  return '<dl class="stats">' + statItems()
    .map((s) => '<div class="stat"><dt>' + esc(s.l) + '</dt><dd>' + s.v + '</dd></div>')
    .join('') + '</dl>';
}

function workflowHTML() {
  return '<ol class="steps">' + WORKFLOW.map((w, i) =>
    `<li class="step reveal" style="--d:${i * 80}ms">
    <span class="step__n">${i + 1}</span>
    <h3>${esc(w.vi)} <span class="step__en">${esc(w.en)}</span></h3>
    <p>${esc(w.text)}</p>
  </li>`).join('') + '</ol>';
}

function lessonCard(root, s, i) {
  return `<article class="card card--lesson reveal" style="--d:${i * 70}ms" data-lesson-card="${s.n}">
  <a class="card__hit" href="${root}${s.url}" aria-label="Mở buổi ${pad2(s.n)}: ${attr(s.title)}"></a>
  <header class="card__head">
    <span class="card__num">${pad2(s.n)}</span>
    <span class="card__meta">${chip(s.kind)}<span class="card__time">${icon('clock', 'ico ico--xs')}${s.minutes} phút</span></span>
  </header>
  <h3 class="card__title">${esc(s.title)}</h3>
  <p class="card__en">${esc(s.en)}</p>
  <p class="card__sum">${esc(s.summary)}</p>
  <span class="card__done" data-card-done="${s.n}">${icon('check', 'ico ico--xs')}<span>Đã hoàn thành</span></span>
  <footer class="card__foot"><span data-card-cta="${s.n}">Học buổi này</span>${icon('arrow', 'ico ico--sm')}</footer>
</article>`;
}

function lessonsHTML(root) {
  return '<div class="grid grid--lessons">' + SESSIONS.map((s, i) => lessonCard(root, s, i)).join('') + '</div>';
}

function audienceHTML() {
  const icons = ['book', 'rocket', 'spark'];
  return '<div class="grid grid--3">' + AUDIENCE.map((a, i) =>
    `<article class="card card--soft reveal" style="--d:${i * 70}ms">
    <span class="card__icon">${icon(icons[i] || 'spark')}</span><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`
  ).join('') + '</div>';
}

function tipsHTML() {
  return '<ul class="tips">' + TIPS.map((t, i) =>
    `<li class="reveal" style="--d:${i * 60}ms"><span class="tips__n">${icon('check', 'ico ico--sm')}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></li>`
  ).join('') + '</ul>';
}

function roadmapMiniHTML() {
  return '<ol class="weeks">' + ROADMAP.map((r, i) =>
    `<li class="week reveal" style="--d:${i * 50}ms"><span class="week__label">${esc(r.label)}</span><span class="week__ch">Chương ${r.chapters.join(', ')}</span><p>${esc(r.text)}</p></li>`
  ).join('') + '</ol>';
}

const PROJECT_PAGES = [
  { file: 'index.html', name: 'Landing Page', desc: 'Hero, 6 dịch vụ, 8 bác sĩ, 6 đánh giá, lịch sử khám — dựng bằng Bootstrap 5.' },
  { file: 'booking.html', name: 'Đặt lịch khám', desc: 'Form đa bước: chọn khoa → bác sĩ → ngày giờ → thông tin → xác nhận.' },
  { file: 'admin.html', name: 'Admin Dashboard', desc: 'Thẻ số liệu, bảng lịch hẹn, tìm kiếm, lọc và đổi trạng thái.' },
];

function projectHTML(root) {
  return `<div class="proj">
  <div class="proj__mock" aria-hidden="true">
    ${PROJECT_PAGES.map((p, i) => `<span class="mock mock--${i}"><b>${esc(p.name)}</b><i></i><i></i><i></i></span>`).join('')}
  </div>
  <ul class="proj__list">${PROJECT_PAGES.map((p) => `<li><code>${esc(p.file)}</code><div><strong>${esc(p.name)}</strong><p>${esc(p.desc)}</p></div></li>`).join('')}</ul>
  <a class="btn btn--ghost" href="${root}du-an.html">Xem chi tiết dự án${icon('chevron', 'ico ico--sm')}</a>
</div>`;
}

function ctaHTML(root) {
  return `<section class="cta reveal">
  <div class="cta__box">
    <h2>Sẵn sàng bắt đầu?</h2>
    <p>Năm buổi đầu đã có đầy đủ bài giảng, prompt mẫu và checklist. Chỉ cần một trình duyệt, một chat AI và VS Code.</p>
    <div class="cta__actions">
      <a class="btn btn--primary" href="${root}lessons/buoi-01.html" data-cta-start>Bắt đầu buổi 01</a>
      <a class="btn" href="${root}lo-trinh.html">Xem lộ trình 8 tuần</a>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ lesson page */

function tocHTML(toc) {
  if (!toc.length) return '';
  return `<nav class="rail__nav" aria-label="Mục lục bài học">
  <p class="rail__title">Nội dung bài</p>
  <ol class="toc">
    ${toc.map((t) => `<li><a href="#${attr(t.id)}" data-toc="${attr(t.id)}">${esc(t.title)}</a>${
      t.children.length ? '<ol class="toc__sub">' + t.children.map((c) => `<li><a href="#${attr(c.id)}" data-toc="${attr(c.id)}">${esc(c.title)}</a></li>`).join('') + '</ol>' : ''
    }</li>`).join('')}
  </ol>
</nav>`;
}

function quizHTML(session) {
  const qs = session.quiz || [];
  if (!qs.length) return '';
  return `<section class="prose" id="kiem-tra" data-reveal>
  <h2 class="section__title">${icon('quiz', 'ico ico--sm')}<span>Kiểm tra nhanh</span></h2>
  <p class="section__lead">Bốn câu hỏi lấy trực tiếp từ nội dung buổi học. Chọn đáp án rồi bấm <em>Kiểm tra</em> — kết quả chỉ lưu trên máy bạn.</p>
  <form class="quiz" data-quiz="${session.n}">
    ${qs.map((item, qi) => `<fieldset class="quiz__q" data-q="${qi}">
      <legend><span class="quiz__qn">${qi + 1}</span>${esc(item.q)}</legend>
      <div class="quiz__opts">
        ${item.options.map((opt, oi) => `<label class="quiz__opt"><input type="radio" name="q${session.n}-${qi}" value="${oi}" data-opt="${oi}" data-correct="${item.a === oi ? '1' : '0'}"><span class="quiz__mark" aria-hidden="true"></span><span class="quiz__text">${esc(opt)}</span></label>`).join('')}
      </div>
      <p class="quiz__why" hidden>${icon('spark', 'ico ico--sm')}<span>${esc(item.why)}</span></p>
    </fieldset>`).join('')}
    <div class="quiz__foot">
      <button class="btn btn--primary" type="button" data-quiz-check>Kiểm tra đáp án</button>
      <button class="btn btn--ghost" type="reset" data-quiz-reset>Làm lại</button>
      <p class="quiz__score" data-quiz-score aria-live="polite"></p>
    </div>
  </form>
</section>`;
}

function termsHTML(session) {
  return `<section class="prose" id="thuat-ngu" data-reveal>
  <h2 class="section__title">${icon('book', 'ico ico--sm')}<span>Thuật ngữ trong bài</span></h2>
  <dl class="terms">
    ${session.terms.map((t) => `<div class="term"><dt><code>${esc(t.en)}</code><span>${esc(t.vi)}</span></dt><dd>${esc(t.def)}</dd></div>`).join('')}
  </dl>
  <p class="section__foot"><a class="btn btn--ghost btn--sm" href="../tu-dien.html">Xem toàn bộ từ điển${icon('chevron', 'ico ico--sm')}</a></p>
</section>`;
}

function lessonNavHTML(root, prev, next, session) {
  const side = (l, dir) => (l
    ? `<a class="pn pn--${dir}" href="${root}${l.url}"><span class="pn__label">${dir === 'prev' ? 'Buổi trước' : 'Buổi tiếp theo'}</span><span class="pn__title">${esc(l.title)}</span></a>`
    : `<span class="pn pn--${dir} pn--empty"><span class="pn__label">${dir === 'prev' ? 'Buổi trước' : 'Buổi tiếp theo'}</span><span class="pn__title">${session.n === 1 ? 'Bạn đang ở buổi mở đầu' : 'Sắp phát hành'}</span></span>`);
  return `<nav class="pn-wrap" aria-label="Điều hướng giữa các buổi học">${side(prev, 'prev')}${side(next, 'next')}</nav>`;
}

/**
 * Trang một buổi học.
 * @param {object} ctx { root, session, parsed, prev, next, sourceUrl }
 */
function pageLesson(ctx) {
  const { root, session, parsed, prev, next, sourceUrl } = ctx;
  const ch = CHAPTERS.find((c) => c.n === session.chapter) || { n: 1, title: 'Chương 1' };

  const sections = parsed.sections.map((s, i) => {
    const anchor = `<a class="anchor" href="#${attr(s.id)}" aria-label="Liên kết tới mục ${attr(s.title)}">#</a>`;
    const badge = s.kind === 'practice'
      ? '<span class="section__badge">Thực hành</span>'
      : (s.kind === 'prompt' ? '<span class="section__badge section__badge--prompt">Prompt</span>' : '');
    return `<section class="prose${s.kind === 'practice' ? ' prose--practice' : ''}" id="${attr(s.id)}" data-reveal style="--d:${Math.min(i, 6) * 40}ms">
    <h2 class="section__title"><span class="section__idx">${pad2(i + 1)}</span><span>${esc(s.title)}</span>${anchor}${badge}</h2>
    ${s.html}
  </section>`;
  }).join('\n');

  const goals = parsed.goalsSection
    ? `<aside class="goals" data-reveal>
    <h2 class="goals__title">${icon('target', 'ico ico--sm')}<span>${esc(parsed.goalsSection.title)}</span></h2>
    <ul class="goals__list">${(parsed.objectives || []).map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
  </aside>` : '';

  const nextUp = parsed.nextSection
    ? `<section class="prose" id="${attr(parsed.nextSection.id)}" data-reveal><h2 class="section__title"><span>${esc(parsed.nextSection.title)}</span></h2>${parsed.nextSection.html}</section>` : '';

  const body = `
<article class="lesson" data-session="${session.n}">
  <header class="lesson__head" data-reveal>
    <nav class="crumbs" aria-label="Vị trí trang">
      <a href="${root}index.html">Trang chủ</a>${icon('chevron', 'ico ico--xs')}
      <a href="${root}lo-trinh.html#ch-${ch.n}">Chương ${ch.n}</a>${icon('chevron', 'ico ico--xs')}
      <span aria-current="page">Buổi ${pad2(session.n)}</span>
    </nav>
    <p class="lesson__kicker">Buổi ${pad2(session.n)} · ${esc(ch.title)}</p>
    <h1 class="lesson__title">${esc(parsed.title || session.title)}</h1>
    <p class="lesson__en">${esc(session.en)}</p>
    <ul class="lesson__meta">
      <li>${icon('clock', 'ico ico--sm')}<span>${session.minutes} phút trên lớp</span></li>
      <li>${icon('book', 'ico ico--sm')}<span>~${session.readMinutes} phút đọc</span></li>
      <li>${icon('spark', 'ico ico--sm')}<span>${esc(session.kind)}</span></li>
    </ul>
    <p class="lesson__sum">${esc(session.summary)}</p>
    <div class="lesson__actions">
      <button class="btn btn--primary" type="button" data-mark-done="${session.n}" aria-pressed="false">
        ${icon('check', 'ico ico--sm')}<span data-mark-label>Đánh dấu đã hoàn thành</span>
      </button>
      <a class="btn btn--ghost" href="${attr(sourceUrl)}" target="_blank" rel="noopener noreferrer">${icon('external', 'ico ico--sm')}<span>Mở bản Markdown gốc</span></a>
    </div>
  </header>

  <div class="lesson__grid">
    <div class="lesson__body">
      ${goals}
      ${parsed.leadHtml ? `<div class="prose prose--lead" data-reveal>${parsed.leadHtml}</div>` : ''}
      ${sections}
      ${session.highlight ? `<aside class="takeaway" data-reveal>
        <p class="takeaway__label">${icon('spark', 'ico ico--sm')}Điểm chốt</p>
        <p>${esc(session.highlight)}</p>
      </aside>` : ''}
      ${termsHTML(session)}
      ${quizHTML(session)}
      ${nextUp}
      ${lessonNavHTML(root, prev, next, session)}
    </div>
    <aside class="rail" aria-label="Công cụ hỗ trợ bài học">
      <div class="rail__inner">
        ${tocHTML(parsed.toc)}
        ${(session.tasks || 0) > 0 ? `<div class="rail__box">
          <p class="rail__title">Tiến độ buổi học</p>
          <p class="rail__tasks"><span data-task-progress>0</span>/${session.tasks} đầu việc đã tick</p>
          <span class="progress-bar progress-bar--sm"><i class="progress-bar__fill" data-task-fill></i></span>
        </div>` : ''}
        <div class="rail__box">
          <p class="rail__title">Cần giúp đỡ?</p>
          <p class="rail__hint">Dán prompt mẫu trong bài vào chat AI bạn đã chọn, hoặc hỏi giảng viên trên lớp.</p>
          <a class="btn btn--ghost btn--sm" href="${root}gioi-thieu.html#faq">Xem câu hỏi thường gặp</a>
        </div>
        <button class="btn btn--ghost btn--sm" type="button" data-to-top>Về đầu trang ${icon('chevron', 'ico ico--sm to-top-ico')}</button>
      </div>
    </aside>
  </div>
</article>`;

  return layout({
    root, tpl: 'lesson', active: 'lesson-' + session.n,
    title: `${parsed.title || session.title} · Buổi ${pad2(session.n)} — ${COURSE.title}`,
    desc: session.summary,
    body,
  });
}



function pageHome(root) {
  const body = `
<section class="hero">
  <p class="hero__badge">${esc(COURSE.cohort)} · ${esc(COURSE.school)} · học trên lớp + tự học ở nhà</p>
  <h1>${esc(COURSE.title)}</h1>
  <p class="hero__tag">${esc(COURSE.tagline)}</p>
  <p class="hero__sub">${esc(COURSE.subtitle)}</p>
  <div class="hero__actions">
    <a class="btn btn--primary btn--lg" href="${root}lessons/buoi-01.html" data-cta-start>${icon('spark', 'ico ico--sm')}<span data-cta-label>Bắt đầu buổi 01</span></a>
    <a class="btn btn--lg" href="${root}gioi-thieu.html">Giới thiệu khoá học</a>
  </div>
  ${statsHTML()}
</section>

<section class="band" id="workflow">
  ${sectionHead({ kicker: 'Cách khoá học vận hành', title: 'Bốn bước của quy trình tăng tốc bằng AI', text: 'Mọi bài học, mọi component trong dự án đều đi qua đúng vòng lặp này.' })}
  ${workflowHTML()}
  <p class="band__note">Quy trình này được dùng lại ở 100% bài thực hành trong khoá — đó là kỹ năng bạn mang theo chứ không phải syntax.</p>
</section>

<section class="band band--alt" id="buoi-hoc">
  ${sectionHead({ kicker: 'Đã phát hành', title: 'Năm buổi đầu tiên — Chương 1', text: 'Nền móng: công cụ AI, quy trình làm việc, môi trường và dự án xuyên suốt.' })}
  ${lessonsHTML(root)}
</section>

<section class="band" id="du-an">
  ${sectionHead({ kicker: 'Dự án tốt nghiệp', title: 'Highland Hospital Web Portal', text: 'Một bệnh viện quốc tế giả định với 3 trang: giới thiệu, đặt lịch khám và bảng quản lý.' })}
  ${projectHTML(root)}
</section>

<section class="band band--alt" id="doi-tuong">
  ${sectionHead({ kicker: 'For whom', title: 'Khoá học dành cho ai' })}
  ${audienceHTML()}
</section>

<section class="band" id="cach-hoc">
  ${sectionHead({ kicker: 'Cách học hiệu quả', title: 'Bốn nguyên tắc của khoá' })}
  ${tipsHTML()}
</section>

<section class="band band--alt" id="lo-trinh">
  ${sectionHead({ kicker: '8 tuần · 12 chương', title: 'Lộ trình toàn khoá', text: 'Năm buổi đang xem nằm ở tuần 1. Các chương còn lại sẽ mở dần theo tiến độ lớp.' })}
  ${roadmapMiniHTML()}
  <p class="band__more"><a class="btn btn--ghost" href="${root}lo-trinh.html">Mở lộ trình chi tiết${icon('chevron', 'ico ico--sm')}</a></p>
</section>

${ctaHTML(root)}
`;
  return layout({
    root, tpl: 'home', active: 'home',
    title: `${COURSE.title} — ${COURSE.tagline}`,
    desc: `Khoá học frontend hiện đại dùng AI cho sinh viên CSE391 K67: ${SESSIONS.length} buổi đầu của Chương 1 đã phát hành, dự án Highland Hospital, HTML5 · CSS3 · JavaScript ES6+ · Bootstrap 5.`,
    body,
  });
}

/* ------------------------------------------------------- curriculum pages */

const PHASES = [
  { name: 'Giai đoạn 1 · Nền móng & tư duy AI', chapters: [1, 2], note: 'Tuần 1' },
  { name: 'Giai đoạn 2 · Cốt lõi Frontend', chapters: [3, 4, 5], note: 'Tuần 2–4' },
  { name: 'Giai đoạn 3 · Framework & thực chiến', chapters: [6, 7, 8], note: 'Tuần 4–6' },
  { name: 'Giai đoạn 4 · Nâng cao & đồ án', chapters: [9, 10, 11, 12, 13], note: 'Tuần 5–8' },
];

function chapterCard(root, c, i) {
  const live = !!c.published;
  const lessons = SESSIONS.filter(() => live).map((s) =>
    `<li><a href="${root}${s.url}"><span class="lp__n">${pad2(s.n)}</span><span>${esc(s.title)}</span><span class="lp__min">${s.minutes}′</span></a></li>`).join('');
  return `<article class="chapter${live ? ' chapter--live' : ''} reveal" id="ch-${c.n}" style="--d:${(i % 3) * 70}ms">
  <header class="chapter__head">
    <span class="chapter__icon">${icon(live ? c.icon : 'lock')}</span>
    <div><p class="chapter__k">Chương ${pad2(c.n)} · Tuần ${c.week}</p><h3>${esc(c.title)}</h3></div>
    <span class="badge badge--${live ? 'live' : 'soon'}">${live ? 'Đã phát hành' : 'Sắp ra mắt'}</span>
  </header>
  <p class="chapter__en">${esc(c.en)}</p>
  <p class="chapter__sum">${esc(c.summary)}</p>
  ${live ? `<ul class="chapter__list">${lessons}</ul>` : `<p class="chapter__soon">${c.lessons} bài học · mở dần theo tiến độ lớp</p>`}
  <p class="chapter__out"><strong>Làm được:</strong> ${esc(c.outcome)}</p>
</article>`;
}

function pageRoadmap(root) {
  const body = `
<section class="pagehead">
  <p class="kicker">Curriculum</p>
  <h1>Lộ trình 8 tuần · ${CHAPTERS.length} chương · ${COURSE.lessons} bài học</h1>
  <p>Từ chỗ chưa biết gì tới một portfolio hoàn chỉnh, deploy được và đưa vào CV. Năm buổi đầu tiên đã phát hành, nằm ở Chương 1.</p>
  ${statsHTML()}
</section>
${PHASES.map((p) => {
  const list = p.chapters.map((n) => CHAPTERS.find((c) => c.n === n)).filter(Boolean);
  return `<section class="band" data-reveal>
  ${sectionHead({ kicker: p.note, title: p.name })}
  <div class="grid grid--chapters">${list.map((c, i) => chapterCard(root, c, i)).join('')}</div>
</section>`;
}).join('\n')}
${ctaHTML(root)}`;
  return layout({
    root, tpl: 'roadmap', active: 'roadmap',
    title: `Lộ trình 8 tuần — ${COURSE.title}`,
    desc: `Toàn bộ ${CHAPTERS.length} chương / ${COURSE.lessons} bài học của khoá frontend dùng AI: HTML5, CSS3, Bootstrap 5, JavaScript ES6+, API và dự án Highland Hospital.`,
    body,
  });
}

function pageProject(root) {
  const icons = ['layers', 'target', 'monitor'];
  const body = `
<section class="pagehead">
  <p class="kicker">Capstone project</p>
  <h1>Dự án tốt nghiệp: ${esc(COURSE.project)}</h1>
  <p>Một bệnh viện quốc tế giả định: ba trang, một luồng đặt lịch đa bước, một bảng quản lý lịch hẹn. Không server, không database, nhưng vẫn giống hệ thống thật.</p>
</section>
<section class="band" data-reveal>
  ${sectionHead({ kicker: 'Phạm vi', title: 'Ba trang bạn sẽ xây' })}
  <div class="grid grid--3">${PROJECT_PAGES.map((p, i) => `<article class="card card--soft reveal" style="--d:${i * 70}ms"><span class="card__icon">${icon(icons[i])}</span><h3>${esc(p.name)}</h3><p><code>${esc(p.file)}</code> — ${esc(p.desc)}</p></article>`).join('')}</div>
</section>
<section class="band band--alt" data-reveal>
  ${sectionHead({ kicker: 'Design language', title: 'Màu, font và khoảng cách' })}
  <div class="tokens">
    <span class="token" style="--t:#0D6E63">#0D6E63<em>Primary</em></span>
    <span class="token" style="--t:#B45309">#B45309<em>Accent</em></span>
    <span class="token" style="--t:#3B82F6">#3B82F6<em>Info</em></span>
    <span class="token" style="--t:#22C55E">#22C55E<em>Success</em></span>
    <span class="token" style="--t:#EF4444">#EF4444<em>Error</em></span>
    <span class="token token--text">Be Vietnam Pro<em>Heading</em></span>
    <span class="token token--text">Inter<em>Body</em></span>
  </div>
  <p class="band__note">Spacing theo thang 4pt, bo góc 4–16px, bóng đổ rất nhẹ — đó là lý do giao diện trông "có nghề" dù chỉ dựng bằng Bootstrap.</p>
</section>
<section class="band" data-reveal>
  ${sectionHead({ kicker: 'Đánh giá', title: 'Bạn sẽ nộp gì' })}
  <div class="split">
    <div class="prose"><ul><li><strong>Buổi 1–5:</strong> môi trường chạy được bằng Live Server, viết được prompt có cấu trúc.</li><li><strong>Giữa kỳ:</strong> Landing Page dựng từ Figma, responsive đủ 3 breakpoint.</li><li><strong>Cuối kỳ:</strong> form đặt lịch đa bước + Admin Dashboard có tìm kiếm, lọc, đổi trạng thái.</li><li><strong>Bonus:</strong> gọi mock API bằng Fetch, chuyển 2 trang sang React (Vite + TypeScript).</li></ul></div>
    <aside class="card card--soft"><h3>Ràng buộc</h3><p>Không dùng CSS framework nào ngoài Bootstrap 5 ở chương 7–8; JavaScript thuần cho tới chương 12; mọi đoạn code do AI sinh ra phải giải thích được khi chấm bài.</p></aside>
  </div>
</section>
${ctaHTML(root)}`;
  return layout({
    root, tpl: 'project', active: 'project',
    title: `Dự án tốt nghiệp: ${COURSE.project} — ${COURSE.title}`,
    desc: 'Ba trang của Highland Hospital Web Portal: Landing Page, luồng đặt lịch đa bước và Admin Dashboard — phạm vi, design token và tiêu chí đánh giá.',
    body,
  });
}

/* --------------------------------------------------------- glossary & misc */

function letterOf(term) {
  const c = term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/i, 'd').charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

function pageGlossary(root) {
  const terms = allTerms();
  const letters = [];
  terms.forEach((t) => {
    const l = letterOf(t.en);
    const last = letters[letters.length - 1];
    if (last && last.l === l) last.items.push(t);
    else letters.push({ l, items: [t] });
  });
  const body = `
<section class="pagehead">
  <p class="kicker">Glossary · Từ điển</p>
  <h1>${terms.length} thuật ngữ bạn sẽ gặp</h1>
  <p>Tiếng Anh được giữ nguyên vì đó là ngôn ngữ của tài liệu, của lỗi bạn sẽ đọc trên Stack Overflow. Kèm theo là nghĩa tiếng Việt và nơi thuật ngữ xuất hiện.</p>
  <div class="glossary__bar">
    <label class="field">${icon('search', 'ico ico--sm')}<span class="sr-only">Lọc thuật ngữ</span>
      <input type="search" id="glossary-q" placeholder="Lọc: flexbox, prompt, token…" aria-label="Lọc thuật ngữ">
    </label>
    <p class="glossary__count" data-glossary-count aria-live="polite">${terms.length} thuật ngữ</p>
  </div>
</section>
<section class="band" data-reveal>
  <div class="alphabet" aria-hidden="true">${letters.map((g) => `<a href="#g-${attr(g.l)}">${attr(g.l)}</a>`).join('')}</div>
  ${letters.map((g) => `<div class="letter" id="g-${attr(g.l)}" data-letter-group="${attr(g.l)}">
    <h2 class="letter__h">${attr(g.l)}</h2>
    <dl class="dict">
      ${g.items.map((t) => `<div class="dict__row" data-term="${attr((t.en + ' ' + t.vi + ' ' + t.def).toLowerCase())}">
        <dt><code>${esc(t.en)}</code>${t.vi ? '<span class="dict__vi">' + esc(t.vi) + '</span>' : ''}</dt>
        <dd>${esc(t.def)}<span class="dict__src">${t.session ? 'Buổi ' + pad2(t.session) : 'Chương ' + (t.chapter || '—')}</span>${t.session ? '<a class="dict__link" href="' + root + (t.url || '') + '">đọc bài</a>' : ''}</dd>
      </div>`).join('')}
    </dl>
  </div>`).join('\n')}
  <p class="band__note" data-glossary-empty hidden>Không tìm thấy thuật ngữ nào khớp. Thử từ khoá ngắn hơn.</p>
</section>`;
  return layout({
    root, tpl: 'glossary', active: 'glossary',
    title: `Từ điển thuật ngữ — ${COURSE.title}`,
    desc: `${terms.length} thuật ngữ frontend và AI có nghĩa tiếng Việt: HTML ngữ nghĩa, Box model, Flexbox, Grid, Prompt, Mock API, localStorage, design token…`,
    body,
  });
}

function pageAbout(root) {
  const config = require('./config');
  const body = `
<section class="pagehead">
  <p class="kicker">About · ${esc(COURSE.cohort)}</p>
  <h1>${esc(COURSE.tagline)}</h1>
  <p>Bootcamp 8 tuần dành cho sinh viên ${esc(COURSE.school)}: ${CHAPTERS.length} chương, ${COURSE.lessons} bài học, một dự án duy nhất xuyên suốt. Website này phát hành 5 buổi đầu.</p>
  ${statsHTML()}
</section>
<section class="band" data-reveal>
  ${sectionHead({ kicker: 'Sứ mệnh', title: 'Biến AI thành đồng đội, không phải cái máy copy-paste' })}
  <div class="prose"><p>Phần lớn tutorial ngoài kia hoặc dạy lập trình mà phớt lờ AI, hoặc chỉ dừng ở vài mẹo prompt. Khoá này đi giữa: học bản chất (HTML ngữ nghĩa, CSS hiện đại, JavaScript từ gốc) <em>và</em> học quy trình làm việc cùng AI để dựng giao diện nhanh gấp nhiều lần — với điều kiện bạn hiểu rõ mọi dòng code mình commit.</p></div>
</section>
<section class="band band--alt" data-reveal>
  ${sectionHead({ kicker: 'Dành cho ai', title: 'Ba nhóm học viên' })}
  ${audienceHTML()}
</section>
<section class="band" data-reveal>
  ${sectionHead({ kicker: 'Stack', title: 'Công cụ bạn cần', text: 'Tất cả đều miễn phí hoặc có bản miễn phí đủ dùng.' })}
  <div class="table-wrap"><table class="table"><thead><tr><th scope="col">Công cụ</th><th scope="col">Dùng để</th><th scope="col">Ghi chú</th></tr></thead><tbody>
    ${config.TOOLS.map((t) => `<tr><td><strong>${esc(t.name)}</strong></td><td>${esc(t.role)}</td><td>${esc(t.note)}</td></tr>`).join('')}
  </tbody></table></div>
</section>
<section class="band band--alt" data-reveal>
  ${sectionHead({ kicker: 'Methodology', title: 'Bốn nguyên tắc khi học với AI' })}
  ${tipsHTML()}
</section>
<section class="band" id="faq" data-reveal>
  ${sectionHead({ kicker: 'FAQ', title: 'Câu hỏi thường gặp' })}
  <div class="faq">
    ${config.FAQ.map((f, i) => `<details class="faq__item"${i === 0 ? ' open' : ''}><summary><span>${esc(f.q)}</span>${icon('chevron', 'ico ico--sm faq__ico')}</summary><div class="faq__a"><p>${esc(f.a)}</p></div></details>`).join('')}
  </div>
</section>
${ctaHTML(root)}`;
  return layout({
    root, tpl: 'about', active: 'about',
    title: `Giới thiệu khoá học — ${COURSE.title}`,
    desc: 'Sứ mệnh, đối tượng, bộ công cụ, phương pháp học và câu hỏi thường gặp của bootcamp frontend dùng AI cho sinh viên CSE391 K67.',
    body,
  });
}

function page404(root) {
  const body = `
<section class="pagehead pagehead--center">
  <p class="kicker">404</p>
  <h1>Trang này chưa được mở</h1>
  <p>Có thể bạn vừa gõ một địa chỉ của buổi học chưa phát hành. Năm buổi đầu của Chương 1 luôn sẵn sàng.</p>
  <div class="hero__actions">
    <a class="btn btn--primary btn--lg" href="${root}index.html">Về trang chủ</a>
    <a class="btn btn--lg" href="${root}lo-trinh.html">Xem lộ trình</a>
  </div>
</section>`;
  return layout({
    root, tpl: '404', active: '',
    title: `Không tìm thấy trang — ${COURSE.title}`,
    desc: 'Trang bạn tìm không tồn tại trong bản phát hành 5 buổi đầu của khoá học.',
    body,
  });
}

module.exports = {
  esc, attr, icon, layout, allTerms, sessionTerms,
  pageHome, pageLesson, pageRoadmap, pageProject, pageGlossary, pageAbout, page404,
  PROJECT_PAGES,
};








