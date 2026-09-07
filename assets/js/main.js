/* ==========================================================================
   CSE391 · K67 — main.js
   Tiến độ học, tick đầu việc, quiz, tìm kiếm, lọc từ điển, sao chép code,
   drawer điều hướng, theme sáng/tối, reveal. Không thư viện — chạy offline.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'cse391-k67-state-v1';
  var THEME_KEY = 'cse391-theme';
  var RING_LEN = 97.4;
  var CHECK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>';

  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var total = parseInt(body.getAttribute('data-total'), 10) || 5;

  function q(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  var NORM_GROUPS = 'aáàảãạăắằẳẵặâấầẩẫậ|eéèẻẽẹêếềểễệ|iíìỉĩị|oóòỏõọôốồổỗộơớờởỡợ|uúùủũụưứừửữự|yýỳỷỹỵ|dđ';
  var NORM_MAP = {};
  NORM_GROUPS.split('|').forEach(function (grp) {
    var base = grp.charAt(0);
    for (var i = 1; i < grp.length; i += 1) NORM_MAP[grp.charAt(i)] = base;
  });

  // Chuẩn hoá không dấu nhưng GIỮ NGUYÊN độ dài để chỉ số highlight khớp với bản gốc.
  function norm(s) {
    var str = String(s == null ? '' : s).toLowerCase();
    var out = '';
    for (var i = 0; i < str.length; i += 1) {
      var c = str.charAt(i);
      out += Object.prototype.hasOwnProperty.call(NORM_MAP, c) ? NORM_MAP[c] : c;
    }
    return out;
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ------------------------------------------------------------------ state */
  var state = { done: {}, tasks: {}, quiz: {}, picks: {} };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var p = JSON.parse(raw);
      if (!p || typeof p !== 'object') return;
      state.done = p.done || {};
      state.tasks = p.tasks || {};
      state.quiz = p.quiz || {};
      state.picks = p.picks || {};
    } catch (e) { /* chế độ ẩn danh -> dùng state trắng */ }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* bỏ qua */ }
  }

  function isDone(n) { return !!state.done[n]; }

  function doneCount() {
    var c = 0;
    for (var n = 1; n <= total; n += 1) if (isDone(n)) c += 1;
    return c;
  }

  function nextOpen() {
    for (var n = 1; n <= total; n += 1) if (!isDone(n)) return n;
    return 0;
  }

  /* ------------------------------------------------------------------ toast */
  var toastEl = null, toastTimer = null;

  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add('is-show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, 2200);
  }

  /* ------------------------------------------------------------------ theme */
  function initTheme() {
    qa('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      });
    });
  }

  /* ---------------------------------------------------------------- drawer */
  function initDrawer() {
    var sidebar = q('#sidebar');
    var scrim = q('[data-scrim]');
    var menuBtns = qa('[data-menu]');
    if (!sidebar || !menuBtns.length) return;

    function setOpen(open) {
      body.classList.toggle('nav-open', open);
      if (scrim) scrim.hidden = !open;
      menuBtns.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    }

    menuBtns.forEach(function (b) {
      b.addEventListener('click', function () { setOpen(!body.classList.contains('nav-open')); });
    });
    if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
    qa('.nav__link', sidebar).forEach(function (a) {
      a.addEventListener('click', function () { if (window.innerWidth <= 880) setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) { setOpen(false); menuBtns[0].focus(); }
    });
  }

  /* ---------------------------------------------------------------- reveal */
  // Ba lớp an toàn, theo thứ tự ưu tiên:
  //   1) IntersectionObserver — cách chuẩn, tiết kiệm, cho hiệu ứng vào khung hình;
  //   2) quét hình học thuần khi load/cuon/thay-doi-kich-thuoc — chạy được cả khi
  //      observer không phát sinh callback (trình duyệt cũ, chế độ tiết kiệm pin,
  //      trang bị tracker chặn script làm IO hỏng);
  //   3) prefers-reduced-motion hoặc không có IO -> hiện toàn bộ ngay, không hiệu ứng.
  // Nhờ CSS chỉ ẩn khi có html.has-js, nếu hàm này không chạy được thì nội dung
  // vẫn hiển thị — site không bao giờ trắng.
  function initReveal() {
    var items = qa('.reveal');
    document.documentElement.classList.add('has-js');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });

    function show(el) {
      if (el.classList.contains('is-visible')) return;
      el.classList.add('is-visible');
      io.unobserve(el);
    }

    function sweep() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      var left = [];
      items.forEach(function (el) {
        if (el.classList.contains('is-visible')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) show(el);
        else left.push(el);
      });
      if (!left.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('load', onScroll);
      }
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      if (window.requestAnimationFrame) window.requestAnimationFrame(sweep);
      else sweep();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    onScroll();
  }

  /* -------------------------------------------------------------- progress */
  function paintRing(pct) {
    qa('[data-ring-circle]').forEach(function (c) {
      c.setAttribute('stroke-dasharray', String(RING_LEN));
      c.setAttribute('stroke-dashoffset', String(RING_LEN * (1 - pct)));
    });
    qa('[data-ring-label]').forEach(function (l) { l.textContent = Math.round(pct * 100) + '%'; });
    qa('[data-ring]').forEach(function (r) {
      r.setAttribute('title', 'Tiến độ khoá học: ' + Math.round(pct * 100) + '%');
    });
  }

  function renderProgress() {
    var count = doneCount();
    var pct = total ? count / total : 0;

    for (var n = 1; n <= total; n += 1) {
      qa('[data-lesson-link="' + n + '"]').forEach(function (a) {
        a.classList.toggle('is-lesson-done', isDone(n));
        qa('.nav__dot', a).forEach(function (d) { d.setAttribute('aria-label', isDone(n) ? 'Đã hoàn thành' : 'Chưa hoàn thành'); });
      });
      qa('[data-lesson-card="' + n + '"]').forEach(function (c) {
        c.classList.toggle('is-card-done', isDone(n));
        var cta = q('[data-card-cta="' + n + '"]', c);
        if (cta) cta.textContent = isDone(n) ? 'Ôn lại buổi này' : 'Học buổi này';
      });
      qa('[data-mark-done="' + n + '"]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', isDone(n) ? 'true' : 'false');
        var label = q('[data-mark-label]', btn);
        if (label) label.textContent = isDone(n) ? 'Đã hoàn thành buổi này' : 'Đánh dấu đã hoàn thành';
      });
    }

    qa('[data-progress-count]').forEach(function (el) { el.textContent = count + '/' + total; });
    qa('[data-progress-fill]').forEach(function (el) {
      if (el.hasAttribute('data-task-fill')) return;
      el.style.width = (pct * 100).toFixed(1) + '%';
    });
    qa('[data-progressbar]').forEach(function (el) {
      el.setAttribute('aria-valuenow', String(count));
      el.setAttribute('aria-valuetext', count + '/' + total + ' buổi đã hoàn thành');
    });
    paintRing(pct);

    var open = nextOpen();
    qa('[data-cta-start]').forEach(function (a) {
      a.href = root + 'lessons/buoi-' + pad2(open || 1) + '.html';
      var text = open ? 'Bắt đầu buổi ' + pad2(open) : 'Hoàn thành rồi — ôn lại buổi 01';
      var label = q('[data-cta-label]', a);
      if (label) label.textContent = text;
      else if (!q('svg', a)) a.textContent = text;
    });
  }

  /* -------------------------------------------------------- progress buttons */
  function initProgressButtons() {
    qa('[data-mark-done]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = parseInt(btn.getAttribute('data-mark-done'), 10);
        if (!n) return;
        if (isDone(n)) delete state.done[n]; else state.done[n] = Date.now();
        save();
        renderProgress();
        toast(isDone(n) ? 'Đã lưu: buổi ' + pad2(n) + ' hoàn thành.' : 'Đã bỏ đánh dấu buổi ' + pad2(n) + '.');
      });
    });

    qa('[data-reset-progress]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!window.confirm('Xoá toàn bộ tiến độ, tick đầu việc và kết quả quiz trên máy này?')) return;
        state = { done: {}, tasks: {}, quiz: {}, picks: {} };
        save();
        qa('.task__box').forEach(function (b) {
          b.classList.remove('is-done');
          b.setAttribute('aria-checked', 'false');
          b.innerHTML = '';
        });
        qa('.quiz').forEach(function (f) { resetQuiz(f); });
        renderProgress();
        renderTasks();
        toast('Đã đặt lại tiến độ học.');
      });
    });
  }

  /* ------------------------------------------------------------------ tasks */
  function currentSession() {
    var lesson = q('.lesson');
    return lesson ? parseInt(lesson.getAttribute('data-session'), 10) || 0 : 0;
  }

  function syncTaskStore() {
    var n = currentSession();
    if (!n) return;
    var arr = [];
    qa('.task__box').forEach(function (b, j) { if (b.classList.contains('is-done')) arr.push(j); });
    state.tasks[n] = arr;
    save();
  }

  function restoreTasks() {
    var saved = state.tasks[currentSession()];
    if (!Array.isArray(saved) || !saved.length) return;
    var boxes = qa('.task__box');
    saved.forEach(function (i) {
      var b = boxes[i];
      if (!b || b.classList.contains('is-done')) return;
      b.classList.add('is-done');
      b.innerHTML = CHECK_SVG;
    });
  }

  function initTasks() {
    var boxes = qa('.task__box');
    if (!boxes.length) return;
    restoreTasks();

    boxes.forEach(function (box, i) {
      box.setAttribute('role', 'checkbox');
      box.setAttribute('tabindex', '0');
      box.setAttribute('aria-checked', box.classList.contains('is-done') ? 'true' : 'false');
      if (!box.hasAttribute('aria-label')) box.setAttribute('aria-label', 'Đầu việc ' + (i + 1));

      function toggle() {
        var on = !box.classList.contains('is-done');
        box.classList.toggle('is-done', on);
        box.setAttribute('aria-checked', on ? 'true' : 'false');
        box.innerHTML = on ? CHECK_SVG : '';
        syncTaskStore();
        renderTasks();
      }
      box.addEventListener('click', toggle);
      box.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
      });
    });
  }

  function renderTasks() {
    var boxes = qa('.task__box');
    if (!boxes.length) return;
    var done = boxes.filter(function (b) { return b.classList.contains('is-done'); }).length;
    qa('[data-task-progress]').forEach(function (el) { el.textContent = String(done); });
    qa('[data-task-fill]').forEach(function (el) {
      el.style.width = ((done / boxes.length) * 100).toFixed(1) + '%';
    });
  }

  /* ------------------------------------------------- toc scrollspy + top */
  function initToc() {
    var links = qa('.toc a[data-toc]');
    var sections = links.map(function (a) {
      return document.getElementById(a.getAttribute('data-toc'));
    }).filter(Boolean);

    function setActive(id) {
      links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-toc') === id); });
    }

    if (sections.length && 'IntersectionObserver' in window) {
      var ratio = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          ratio[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0;
        });
        var best = null, bestRatio = 0;
        sections.forEach(function (s) {
          var r = ratio[s.id] || 0;
          if (r > bestRatio) { bestRatio = r; best = s.id; }
        });
        if (best) setActive(best);
      }, { rootMargin: '-72px 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.8] });
      sections.forEach(function (s) { io.observe(s); });
    }
    links.forEach(function (a) {
      a.addEventListener('click', function () { setActive(a.getAttribute('data-toc')); });
    });

    var top = q('[data-to-top]');
    if (top) {
      top.addEventListener('click', function () {
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
    }
  }

  /* ------------------------------------------------- copy prompt / code */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        body.removeChild(ta);
        resolve();
      } catch (e) { reject(e); }
    });
  }

  function initCopy() {
    qa('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fig = btn.closest ? btn.closest('figure') : null;
        var code = fig ? fig.querySelector('pre code, pre') : null;
        if (!code) return;
        copyText(code.innerText.replace(/\s+$/, '')).then(function () {
          btn.classList.add('is-copied');
          var span = q('span', btn);
          var old = span ? span.textContent : '';
          if (span) span.textContent = 'Đã sao chép';
          toast('Đã sao chép đoạn code vào clipboard.');
          setTimeout(function () {
            btn.classList.remove('is-copied');
            if (span) span.textContent = old;
          }, 1800);
        })['catch'](function () {
          toast('Trình duyệt chặn clipboard — hãy chọn thủ công rồi Copy.');
        });
      });
    });
  }

  /* ------------------------------------------------------------------- quiz */
  function optsOf(fs) { return qa('.quiz__opt', fs); }

  function clearQuiz(fs) {
    optsOf(fs).forEach(function (o) { o.classList.remove('is-correct', 'is-wrong', 'is-picked'); });
    var why = q('.quiz__why', fs);
    if (why) why.hidden = true;
    qa('input', fs).forEach(function (i) { i.checked = false; });
  }

  function resetQuiz(form) {
    var n = form.getAttribute('data-quiz');
    qa('.quiz__q', form).forEach(clearQuiz);
    var score = q('[data-quiz-score]', form);
    if (score) { score.textContent = ''; score.className = 'quiz__score'; }
    if (n) { delete state.quiz[n]; delete state.picks[n]; save(); }
  }

  function gradeQuiz(form) {
    var n = parseInt(form.getAttribute('data-quiz'), 10) || 0;
    var fields = qa('.quiz__q', form);
    var score = q('[data-quiz-score]', form);
    var unanswered = 0, correct = 0;

    fields.forEach(function (fs, qi) {
      var picked = null, right = null;
      optsOf(fs).forEach(function (opt) {
        var input = q('input', opt);
        if (!input) return;
        opt.classList.remove('is-correct', 'is-wrong');
        if (input.checked) { picked = input; opt.classList.add('is-picked'); }
        if (input.getAttribute('data-correct') === '1') right = opt;
      });
      if (!picked) { unanswered += 1; return; }
      if (picked.getAttribute('data-correct') === '1') correct += 1;
      else picked.classList.add('is-wrong');
      if (right) right.classList.add('is-correct');
      var why = q('.quiz__why', fs);
      if (why) why.hidden = false;
      if (state.picks[n]) state.picks[n][qi] = parseInt(picked.value, 10);
    });

    if (!score) return;
    if (unanswered) {
      score.className = 'quiz__score';
      score.textContent = 'Còn ' + unanswered + ' câu chưa chọn đáp án.';
      return;
    }
    var good = correct >= Math.ceil(fields.length * 0.75);
    score.className = 'quiz__score ' + (good ? 'is-good' : 'is-bad');
    score.textContent = 'Điểm: ' + correct + '/' + fields.length + (good ? ' — tốt lắm!' : ' — xem lại phần giải thích rồi làm lại.');
    state.quiz[n] = { score: correct, total: fields.length, at: Date.now() };
    save();
  }

  function restoreQuiz(form) {
    var n = parseInt(form.getAttribute('data-quiz'), 10) || 0;
    var picks = state.picks[n];
    if (picks) {
      qa('.quiz__q', form).forEach(function (fs, qi) {
        var v = picks[qi];
        if (v == null) return;
        optsOf(fs).forEach(function (opt) {
          var input = q('input', opt);
          if (input && parseInt(input.value, 10) === v) {
            input.checked = true;
            opt.classList.add('is-picked');
          }
        });
      });
    }
    var saved = state.quiz[n];
    var score = q('[data-quiz-score]', form);
    if (!saved || !score) return;
    score.className = 'quiz__score ' + (saved.score >= Math.ceil(saved.total * 0.75) ? 'is-good' : 'is-bad');
    score.textContent = 'Kết quả đã lưu: ' + saved.score + '/' + saved.total + ' — bấm Làm lại để kiểm tra lại.';
    qa('.quiz__q', form).forEach(function (fs) {
      var why = q('.quiz__why', fs);
      if (why && q('input:checked', fs)) why.hidden = false;
    });
  }

  function initQuiz() {
    qa('.quiz').forEach(function (form) {
      var n = parseInt(form.getAttribute('data-quiz'), 10) || 0;
      restoreQuiz(form);

      qa('input[type="radio"]', form).forEach(function (input) {
        input.addEventListener('change', function () {
          var fs = input.closest ? input.closest('.quiz__q') : null;
          if (!fs || !n) return;
          var qi = parseInt(fs.getAttribute('data-q'), 10);
          var opt = input.closest ? input.closest('.quiz__opt') : null;
          if (opt) {
            optsOf(fs).forEach(function (o) { o.classList.remove('is-picked'); });
            opt.classList.add('is-picked');
          }
          if (!state.picks[n]) state.picks[n] = {};
          state.picks[n][qi] = parseInt(input.value, 10);
          save();
        });
      });

      var check = q('[data-quiz-check]', form);
      if (check) check.addEventListener('click', function () { gradeQuiz(form); });
      var reset = q('[data-quiz-reset]', form);
      if (reset) reset.addEventListener('click', function () { setTimeout(function () { resetQuiz(form); }, 0); });
    });
  }

  /* -------------------------------------------------------- glossary filter */
  function initGlossary() {
    var input = q('#glossary-q');
    var rows = qa('.dict__row');
    if (!rows.length) return;
    var countEl = q('[data-glossary-count]');
    var emptyEl = q('[data-glossary-empty]');
    var groups = qa('[data-letter-group]');
    var totalTerms = rows.length;

    function apply() {
      var needle = norm(input && input.value ? input.value.trim() : '');
      var shown = 0;
      rows.forEach(function (row) {
        var hit = !needle || norm(row.getAttribute('data-term') || '').indexOf(needle) >= 0;
        row.classList.toggle('is-hidden', !hit);
        if (hit) shown += 1;
      });
      groups.forEach(function (g) {
        var any = qa('.dict__row', g).some(function (r) { return !r.classList.contains('is-hidden'); });
        g.classList.toggle('is-hidden', !any);
      });
      if (countEl) countEl.textContent = needle ? shown + '/' + totalTerms + ' thuật ngữ' : totalTerms + ' thuật ngữ';
      if (emptyEl) emptyEl.hidden = shown !== 0;
    }

    if (input) {
      input.addEventListener('input', apply);
      input.addEventListener('search', apply);
      if (input.form) input.form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    }
    apply();
  }

  /* ------------------------------------------------------- search helpers */
  function highlight(text, needle) {
    var hay = norm(text), n = norm(needle), out = '', pos = 0, i;
    if (!n) return escHtml(text);
    while ((i = hay.indexOf(n, pos)) !== -1) {
      out += escHtml(text.slice(pos, i)) + '<mark>' + escHtml(text.slice(i, i + n.length)) + '</mark>';
      pos = i + n.length;
    }
    return out + escHtml(text.slice(pos));
  }

  function snippet(item, n) {
    var text = item.x || '';
    if (!n) return text.slice(0, 130);
    var at = norm(text).indexOf(n);
    if (at < 0) return text.slice(0, 130);
    var start = Math.max(0, at - 40);
    return (start ? '…' : '') + text.slice(start, start + 160);
  }

  function scoreItem(item, words) {
    var t = norm(item.t), k = norm(item.k), x = norm(item.x || ''), qq = norm(item.q || '');
    var s = 0;
    for (var i = 0; i < words.length; i += 1) {
      var w = words[i];
      if (!w) continue;
      if (t === w) s += 12;
      else if (t.indexOf(w) === 0) s += 8;
      else if (t.indexOf(w) >= 0) s += 5;
      if (k.indexOf(w) >= 0) s += 2;
      if (x.indexOf(w) >= 0) s += 2;
      if (qq.indexOf(w) >= 0) s += 1;
    }
    return s;
  }

  /* ------------------------------------------------------- search overlay */
  function initSearch() {
    var overlay = q('#search');
    var input = q('#search-q');
    var list = q('#search-results');
    if (!overlay || !input || !list) return;

    var index = window.__CSE391_SEARCH__ || [];
    var lastFocus = null, active = -1;

    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      input.focus();
      input.select();
      run();
    }

    function close() {
      overlay.classList.remove('is-open');
      setTimeout(function () { overlay.hidden = true; }, 200);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function render(rows, n) {
      list.innerHTML = '';
      active = -1;
      if (!n) {
        var hint = document.createElement('li');
        hint.className = 'search__count';
        hint.textContent = index.length + ' mục trong khoá học — gõ từ khoá để tìm.';
        list.appendChild(hint);
        return;
      }
      if (!rows.length) {
        var none = document.createElement('li');
        none.className = 'search__none';
        none.textContent = 'Không có kết quả cho “' + n + '”. Thử: prompt, flexbox, bootstrap, localStorage.';
        list.appendChild(none);
        return;
      }
      rows.forEach(function (r) {
        var li = document.createElement('li');
        li.className = 'search__item';
        li.innerHTML = '<a href="' + escHtml(root + r.item.u) + '">' +
          '<span class="search__kind">' + escHtml(r.item.k) + '</span>' +
          '<strong>' + highlight(r.item.t, n) + '</strong>' +
          '<p>' + highlight(snippet(r.item, n), n) + '</p></a>';
        list.appendChild(li);
      });
    }

    function run() {
      var raw = input.value.trim();
      var n = norm(raw);
      var rows = [];
      if (n.length < 2) { render([], ''); return; }
      var words = n.split(/\s+/).filter(Boolean);
      index.forEach(function (item) {
        var s = scoreItem(item, words);
        if (s > 0) rows.push({ item: item, s: s });
      });
      rows.sort(function (a, b) { return b.s - a.s; });
      render(rows.slice(0, 14), n);
    }

    function move(dir) {
      var items = qa('.search__item', list);
      if (!items.length) return;
      active = (active + dir + items.length) % items.length;
      items.forEach(function (li, i) { li.classList.toggle('is-active', i === active); });
      if (items[active].scrollIntoView) items[active].scrollIntoView({ block: 'nearest' });
    }

    qa('[data-open-search]').forEach(function (b) { b.addEventListener('click', open); });
    qa('[data-close-search]').forEach(function (b) { b.addEventListener('click', close); });
    qa('[data-try]').forEach(function (b) {
      b.addEventListener('click', function () {
        open();
        input.value = b.getAttribute('data-try');
        run();
      });
    });
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var links = qa('.search__item a', list);
        var target = links[active] || links[0];
        if (target) window.location.href = target.getAttribute('href');
      } else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });

    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement || {}).tagName || '';
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(tag);
      var mod = e.ctrlKey || e.metaKey;
      if (mod && norm(e.key) === 'k') { e.preventDefault(); if (overlay.hidden) { open(); } else { close(); } }
      else if (e.key === '/' && !typing && overlay.hidden) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && !overlay.hidden) { close(); }
    });
  }

  /* -------------------------------------------------------------- boot */
  // Mỗi widget khởi động trong try/catch riêng: một lỗi ở widget này không được
  // làm chết phần còn lại (đặc biệt không được để .reveal nằm mãi ở opacity:0).
  function safe(name, fn) {
    try {
      fn();
    } catch (err) {
      if (name === 'reveal') document.documentElement.classList.remove('has-js');
      if (window.console && window.console.warn) {
        window.console.warn('[cse391] ' + name + ': ' + ((err && err.message) || err));
      }
    }
  }

  function boot() {
    load();
    safe('reveal', initReveal);
    safe('theme', initTheme);
    safe('drawer', initDrawer);
    safe('progress-buttons', initProgressButtons);
    safe('tasks', initTasks);
    safe('quiz', initQuiz);
    safe('search', initSearch);
    safe('glossary', initGlossary);
    safe('copy', initCopy);
    safe('toc', initToc);
    safe('render-progress', renderProgress);
    safe('render-tasks', renderTasks);

    var hash = window.location.hash;
    if (hash && hash.length > 1) {
      var target = document.getElementById(hash.slice(1));
      if (target) target.classList.add('is-visible');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }






})();
