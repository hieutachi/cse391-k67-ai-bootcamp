'use strict';
/**
 * highlight.js — tô màu cú pháp tối giản, không dependency.
 * Cách làm: token hoá bằng sticky regex, escape từng token khi xuất ra.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

function span(cls, text) {
  return `<span class="tok tok--${cls}">${esc(text)}</span>`;
}

/** Token hoá chuỗi bằng danh sách sticky-regex (thử theo thứ tự, không khớp thì escape 1 ký tự). */
function tokenize(src, patterns) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    let matched = null;
    for (const p of patterns) {
      p.re.lastIndex = i;
      const m = p.re.exec(src);
      if (m && m[0].length > 0) {
        matched = { p, text: m[0] };
        break;
      }
    }
    if (!matched) {
      out += esc(src[i]);
      i += 1;
      continue;
    }
    out += matched.p.render ? matched.p.render(matched.text) : span(matched.p.cls, matched.text);
    i += matched.text.length;
  }
  return out;
}

/* ------------------------------------------------------------------ HTML */

const TAG_PATTERNS = [
  { re: /^\s+/y, render: (t) => esc(t) },
  { re: /^(?:<\/|\/?>)/y, cls: 'punc' },
  { re: /^[a-zA-Z][\w:.-]*/y, cls: 'tag' },
  { re: /^(?:"[^"]*"|'[^']*')/y, cls: 'str' },
  { re: /^=/y, cls: 'punc' },
  { re: /^[\w:.$#[\]()%-]+/y, cls: 'attr' },
];

const HTML_PATTERNS = [
  { re: /<!--[\s\S]*?-->/y, cls: 'com' },
  { re: /<!DOCTYPE[^>]*>/iy, cls: 'tag' },
  {
    re: /<\/?[a-zA-Z][\w:.-]*(?:"[^"]*"|'[^']*'|[^>"'])*>/y,
    render: (tag) => tokenize(tag, TAG_PATTERNS),
  },
  { re: /&[a-zA-Z]+;|&#\d+;/y, cls: 'str' },
  { re: /[^<&]+/y, render: (t) => esc(t) },
];

/* ------------------------------------------------------------------- CSS */

const CSS_PATTERNS = [
  { re: /\/\*[\s\S]*?\*\//y, cls: 'com' },
  { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y, cls: 'str' },
  { re: /@[\w-]+/y, cls: 'kw' },
  { re: /#[0-9a-fA-F]{3,8}(?![\w-])/y, cls: 'num' },
  { re: /--[\w-]+/y, cls: 'var' },
  { re: /#[\w-]+/y, cls: 'sel' },
  { re: /\.[\w-]+/y, cls: 'sel' },
  { re: /::?[\w-]+/y, cls: 'sel' },
  { re: /[-\w]+(?=\s*:)/y, cls: 'prop' },
  { re: /\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|vmin|vmax|s|ms|fr|deg|ch|pt)?\b/y, cls: 'num' },
  { re: /\b(?:important|and|not|only|from|to|infinite|both|none|auto|inherit)\b/y, cls: 'kw' },
  { re: /[a-zA-Z][\w-]*(?=\()/y, cls: 'fn' },
  { re: /[{}();:,>~+*]/y, cls: 'punc' },
  { re: /[a-zA-Z][\w-]*/y, cls: 'tag' },
  { re: /\s+/y, render: (t) => esc(t) },
];

/* -------------------------------------------------------------------- JS */

const JS_KEYWORDS =
  /^(?:const|let|var|function|return|if|else|for|while|do|of|in|new|class|extends|super|this|import|export|from|as|async|await|try|catch|finally|throw|typeof|instanceof|switch|case|default|break|continue|delete|void|yield|null|undefined|true|false)\b/y;

const JS_PATTERNS = [
  { re: /\/\/[^\n]*/y, cls: 'com' },
  { re: /\/\*[\s\S]*?\*\//y, cls: 'com' },
  { re: /`(?:[^`\\]|\\.)*`/y, cls: 'str' },
  { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y, cls: 'str' },
  { re: JS_KEYWORDS, cls: 'kw' },
  { re: /\b\d[\d_]*(?:\.\d+)?\b/y, cls: 'num' },
  { re: /[A-Z][\w$]*/y, cls: 'cls' },
  { re: /[\w$]+(?=\s*\()/y, cls: 'fn' },
  { re: /(?<=\.)[\w$]+/y, cls: 'prop' },
  { re: /[\w$]+(?=\s*:)/y, cls: 'prop' },
  { re: /=>|[{}();,:.?[\]]|[+\-*/%<>=!&|^~]+/y, cls: 'punc' },
  { re: /[\w$]+/y, cls: 'plain' },
  { re: /\s+/y, render: (t) => esc(t) },
];

/* ------------------------------------------------------------------ bash */

const SH_PATTERNS = [
  { re: /#[^\n]*/y, cls: 'com' },
  { re: /"(?:[^"\\]|\\.)*"|'[^']*'/y, cls: 'str' },
  { re: /^\s*(?:cd|npm|npx|node|git|python|mkdir|code|open|ls|curl|echo)\b/my, cls: 'kw' },
  { re: /\s+--?[\w-]+/y, cls: 'attr' },
  { re: /\$\{?[\w@?]+\}?/y, cls: 'var' },
  { re: /\s+/y, render: (t) => esc(t) },
];

const LANGUAGE_MAP = {
  html: HTML_PATTERNS,
  xml: HTML_PATTERNS,
  svg: HTML_PATTERNS,
  css: CSS_PATTERNS,
  scss: CSS_PATTERNS,
  js: JS_PATTERNS,
  javascript: JS_PATTERNS,
  json: JS_PATTERNS,
  ts: JS_PATTERNS,
  bash: SH_PATTERNS,
  sh: SH_PATTERNS,
  shell: SH_PATTERNS,
  powershell: SH_PATTERNS,
};

const PROMPT_KEYS =
  /^(Bối cảnh dự án|Bối cảnh|Ngữ cảnh|Nhiệm vụ|Yêu cầu|Ràng buộc|Giao diện|Thiết kế|Định dạng|Định dạng đầu ra|Đầu ra|Đầu vào|Dữ liệu|Bối cảnh hiện tại|Context|Task|Constraints|Design|Output|Format|Goal)\s*:/i;

/**
 * Khối `text` trong khoá học chủ yếu là PROMPT MẪU: làm nổi bật nhãn từng phần,
 * chuỗi trong ngoặc kép, mã màu và số đo.
 */
function renderPrompt(raw) {
  return raw
    .split('\n')
    .map((line) => {
      const m = line.match(PROMPT_KEYS);
      let html = esc(line);
      if (m) {
        html =
          span('prompt-key', m[0]) +
          esc(line.slice(m[0].length));
      }
      return html
        .replace(/(&quot;|&#39;)[\s\S]*?\1/g, (t) => `<span class="tok tok--str">${t}</span>`)
        .replace(/(#[0-9a-fA-F]{3,8})\b/g, (t) => `<span class="tok tok--num">${t}</span>`)
        .replace(
          /\b(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr|deg)?)\b/g,
          (t) => `<span class="tok tok--num">${t}</span>`
        );
    })
    .join('\n');
}

/** Entry point: trả về HTML đã escape + gắn class tok--*. */
function highlight(code, lang) {
  const raw = String(code).replace(/\s+$/, '');
  const key = (lang || '').toLowerCase();
  if (key === 'text' || key === 'prompt') return { html: renderPrompt(raw), isPrompt: true };
  const patterns = LANGUAGE_MAP[key];
  if (!patterns) return { html: esc(raw), isPrompt: false };
  return { html: tokenize(raw, patterns), isPrompt: false };
}

module.exports = { highlight, esc };
