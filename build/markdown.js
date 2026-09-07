'use strict';
/**
 * markdown.js — bộ chuyển Markdown (subset dùng trong repo) sang HTML có cấu trúc.
 * Hỗ trợ: heading 1-4, đoạn, bold/italic/inline code/link, danh sách lồng nhau,
 * task list `- [ ]`, bảng GFM, blockquote, hr, code fence có ngôn ngữ.
 * Output: danh sách "section" theo `## ` để trang bài học dựng TOC + callout.
 */

const { highlight, esc } = require('./highlight');

const INLINE_CODE_ESC = '\u0000';

function slugify(input) {
  let s = String(input).toLowerCase();
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  s = s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'muc';
}

/** Định dạng nội dung inline (chạy trên text thô, escape trước khi chèn tag). */
function inline(text) {
  const codes = [];
  let src = String(text).replace(/`([^`]+?)`/g, (_, code) => {
    codes.push(code);
    return `${INLINE_CODE_ESC}${codes.length - 1}${INLINE_CODE_ESC}`;
  });

  let out = esc(src);

  out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[\s(>])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[\s(>])_([^_\n]+)_(?=$|[\s).,!?:;])/g, '$1<em>$2</em>');
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_m, label, href, title) => {
      const external = /^https?:\/\//i.test(href) || /^mailto:/i.test(href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}"${titleAttr}${attrs}>${label}</a>`;
    }
  );

  out = out.replace(
    /(^|[\s(])((?:https?:\/\/|mailto:)[^\s<)]+[^\s<).,;:!?])/g,
    (_m, pre, url) => `${pre}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );

  out = out.replace(new RegExp(`${INLINE_CODE_ESC}(\\d+)${INLINE_CODE_ESC}`, 'g'), (_m, idx) => {
    const code = codes[Number(idx)];
    return `<code class="inline${inlineKind(code)}">${esc(code)}</code>`;
  });

  return out;
}

/** Đoán loại inline code để tô màu nhẹ: thẻ HTML, selector, đường dẫn, thuộc tính. */
function inlineKind(code) {
  if (/^<\/?[a-zA-Z]/.test(code)) return ' inline--tag';
  if (/^[.#][\w-]/.test(code)) return ' inline--sel';
  if (/^[\w-]+\/[\w.-]+/.test(code) || /\.(html|css|js|json|md|svg|png|jpg)$/i.test(code)) return ' inline--path';
  if (/^[a-z-]+=$/.test(code) || /^[a-z-]+="[^"]*"$/.test(code)) return ' inline--attr';
  return '';
}

/* ------------------------------------------------------------ helpers */

const RE_HEADING = /^(#{1,6})\s+(.*)$/;
const RE_FENCE = /^\s*```+\s*([\w+#.-]*)\s*$/;
const RE_UL = /^(\s*)([-*+])\s+(.*)$/;
const RE_OL = /^(\s*)(\d{1,2})[.)]\s+(.*)$/;
const RE_TASK = /^\[( |x|X)\]\s+(.*)$/;
const RE_HR = /^\s*(?:---+|\*\*\*+|___+)\s*$/;
const RE_BLOCKQUOTE = /^\s*>\s?(.*)$/;
const RE_TABLE_DIVIDER = /^\s*\|?\s*:?-{2,}.*\|/;

function indentOf(line) {
  return line.match(/^\s*/)[0].replace(/\t/g, '  ').length;
}

function isTableStart(lines, i) {
  return (
    lines[i] !== undefined &&
    lines[i].includes('|') &&
    lines[i + 1] !== undefined &&
    RE_TABLE_DIVIDER.test(lines[i + 1]) &&
    !RE_FENCE.test(lines[i])
  );
}

function splitRow(row) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, '|'));
}

function renderCodeFence(body, lang) {
  const { html, isPrompt } = highlight(body, lang);
  const label = isPrompt ? 'Prompt mẫu' : (lang || 'code').toUpperCase();
  const lines = body.replace(/\s+$/, '').split('\n');
  const cls = ['code', isPrompt ? 'code--prompt' : '', lines.length > 1 ? 'code--multi' : '']
    .filter(Boolean)
    .join(' ');
  return [
    `<figure class="${cls}" data-lang="${esc(lang || 'text')}">`,
    `  <figcaption class="code__bar"><span class="code__lang">${esc(label)}</span>`,
    `  <button class="btn-copy" type="button" data-copy aria-label="Sao chép đoạn code">`,
    `    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    `    <span>Sao chép</span></button></figcaption>`,
    `  <pre><code>${html}</code></pre>`,
    `</figure>`,
  ].join('\n');
}

function renderTable(headerCells, bodyRows) {
  const head = headerCells.map((c) => `<th scope="col">${inline(c)}</th>`).join('');
  const body = bodyRows
    .map((cells) => {
      const tds = headerCells
        .map((_h, idx) => `<td>${inline(cells[idx] === undefined ? '' : cells[idx])}</td>`)
        .join('');
      return `<tr>${tds}</tr>`;
    })
    .join('\n');
  return `<div class="table-wrap"><table class="table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

/* ------------------------------------------------------------- lists */

function parseList(lines, start) {
  const baseIndent = indentOf(lines[start]);
  const ordered = RE_OL.test(lines[start]);
  const items = [];
  let cur = null;
  let i = start;

  const dedent = (line) => line.replace(new RegExp(`^\\s{0,${baseIndent + 2}}`), '');

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      let j = i;
      while (j < lines.length && lines[j].trim() === '') j += 1;
      if (j >= lines.length) { i = j; break; }
      const next = lines[j];
      const nextIndent = indentOf(next);
      const nextIsItem = RE_UL.test(next) || RE_OL.test(next);
      if (nextIsItem && nextIndent >= baseIndent) { i = j; continue; }
      if (!nextIsItem && nextIndent > baseIndent) { i = j; continue; }
      i = j;
      break;
    }

    const indent = indentOf(line);
    const mUL = line.match(RE_UL);
    const mOL = line.match(RE_OL);

    if (indent <= baseIndent && (mUL || mOL)) {
      if (indent < baseIndent) break;
      if (ordered ? !mOL : !mUL) break; // đổi loại danh sách -> danh sách mới
      cur = { text: (ordered ? mOL : mUL)[3], children: [] };
      items.push(cur);
      i += 1;
      continue;
    }

    if (indent > baseIndent && cur) {
      cur.children.push(dedent(line));
      i += 1;
      continue;
    }

    if (cur) {
      cur.text += ' ' + line.trim(); // lazy continuation
      i += 1;
      continue;
    }
    break;
  }

  const TASK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>';

  const rendered = items
    .map((item) => {
      const task = item.text.match(RE_TASK);
      let body = task ? inline(task[2]) : inline(item.text);
      let prefix = '';
      if (task) {
        const done = task[1].toLowerCase() === 'x';
        prefix = `<span class="task__box${done ? ' is-done' : ''}" aria-hidden="true">${done ? TASK_SVG : ''}</span>`;
        body = `<span class="task__text">${body}</span>`;
      }
      let nested = '';
      if (item.children.length) {
        const firstReal = item.children.findIndex((l) => l.trim() !== '');
        if (firstReal >= 0 && (RE_UL.test(item.children[firstReal]) || RE_OL.test(item.children[firstReal]))) {
          nested = parseList(item.children, firstReal).html;
        } else {
          nested = `<p>${inline(item.children.join(' ').trim())}</p>`;
        }
      }
      return `<li${task ? ' class="task"' : ''}>${prefix}${body}${nested}</li>`;
    })
    .join('\n');

  const tag = ordered ? 'ol' : 'ul';
  const startNum = ordered ? Number(lines[start].match(RE_OL)[2]) : 1;
  const startAttr = ordered && startNum !== 1 ? ` start="${startNum}"` : '';
  return { html: `<${tag}${startAttr}>\n${rendered}\n</${tag}>`, next: i };
}

/* ------------------------------------------------------------ quotes */

function blockquoteHtml(rawLines) {
  const inner = [];
  let buffer = [];
  const flush = () => {
    if (buffer.length) {
      const text = buffer.join(' ').trim();
      if (text) inner.push(`<p>${inline(text)}</p>`);
      buffer = [];
    }
  };
  rawLines.forEach((line) => {
    if (line.trim() === '') { flush(); return; }
    if (RE_UL.test(line) || RE_OL.test(line)) {
      flush();
      inner.push(parseList([line], 0).html);
      return;
    }
    buffer.push(line);
  });
  flush();
  const first = inner[0] || '';
  let tone = 'note';
  if (/⚠|lưu ý|cẩn thận|bẫy|warning|don&#39;t/i.test(first)) tone = 'warn';
  else if (/💡|mẹo|tip|pro/i.test(first)) tone = 'tip';
  else if (/✅|kết quả|expect/i.test(first)) tone = 'ok';
  return `<blockquote class="callout callout--${tone}">${inner.join('')}</blockquote>`;
}

/** Phân loại một section `## ` để template chọn cách trình bày. */
function classify(title) {
  const t = String(title).toLowerCase().trim();
  if (GOAL_RE.test(t)) return 'goals';
  if (NEXT_RE.test(t)) return 'next';
  if (PRACTICE_RE.test(t)) return 'practice';
  if (PROMPT_RE.test(t)) return 'prompt';
  return 'section';
}

/* ------------------------------------------------------------ blocks */

function toBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i += 1; continue; }

    const fence = line.match(RE_FENCE);
    if (fence) {
      const lang = fence[1];
      const body = [];
      i += 1;
      while (i < lines.length && !/^\s*```+\s*$/.test(lines[i])) { body.push(lines[i]); i += 1; }
      i += 1; // bỏ dòng đóng fence
      blocks.push({ type: 'code', lang, body: body.join('\n') });
      continue;
    }

    const heading = line.match(RE_HEADING);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2].trim() });
      i += 1;
      continue;
    }

    if (RE_HR.test(line)) { blocks.push({ type: 'hr' }); i += 1; continue; }

    if (isTableStart(lines, i)) {
      const header = splitRow(lines[i]);
      const body = [];
      i += 2;
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        body.push(splitRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: 'table', header, body });
      continue;
    }

    if (RE_BLOCKQUOTE.test(line)) {
      const buffer = [];
      while (i < lines.length && (RE_BLOCKQUOTE.test(lines[i]) || (lines[i].trim() !== '' && /^\s{2,}/.test(lines[i])))) {
        buffer.push(lines[i].replace(RE_BLOCKQUOTE, '$1').replace(/^\s{2,}/, ''));
        i += 1;
      }
      blocks.push({ type: 'quote', lines: buffer });
      continue;
    }

    if (RE_UL.test(line) || RE_OL.test(line)) {
      const res = parseList(lines, i);
      blocks.push({ type: 'raw', html: res.html });
      i = res.next;
      continue;
    }

    const paragraph = [line.trim()];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !RE_HEADING.test(lines[i]) &&
      !RE_FENCE.test(lines[i]) &&
      !RE_HR.test(lines[i]) &&
      !RE_UL.test(lines[i]) &&
      !RE_OL.test(lines[i]) &&
      !RE_BLOCKQUOTE.test(lines[i]) &&
      !isTableStart(lines, i)
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'para', text: paragraph.join(' ') });
  }
  return blocks;
}

function renderBlock(block) {
  switch (block.type) {
    case 'code': return renderCodeFence(block.body, block.lang);
    case 'table': return renderTable(block.header, block.body);
    case 'quote': return blockquoteHtml(block.lines);
    case 'hr': return '<hr class="rule">';
    case 'raw': return block.html;
    case 'heading': {
      const level = Math.min(Math.max(block.level, 3), 4);
      const id = block.id ? ` id="${esc(block.id)}"` : '';
      const cls = block.sub !== undefined ? ' class="sub"' : '';
      return `<h${level}${id}${cls}>${inline(block.text.replace(/^\d+[.)]\s*/, ''))}</h${level}>`;
    }
    case 'para': return `<p>${inline(block.text)}</p>`;
    default: return '';
  }
}

const GOAL_RE = /^(mục tiêu|learning objectives)/i;
const PRACTICE_RE = /^(thực hành|practice|bài tập|lab)/i;
const NEXT_RE = /^(bài tiếp theo|what.?s next|tiếp theo)/i;
const PROMPT_RE = /prompt/i;


/* --------------------------------------------------------- public API */

function plain(html) {
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse một bài học Markdown thành cấu trúc để template dựng trang.
 * @returns {{title:string, leadHtml:string, sections:Array, toc:Array, objectives:string[], plainText:string}}
 */
function parseLesson(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  const blocks = toBlocks(lines);
  const titleBlock = blocks.find((b) => b.type === 'heading' && b.level === 1);
  const title = titleBlock ? titleBlock.text : 'Bài học';

  const usedIds = new Set(['_']);
  const ensureId = (base) => {
    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n}`;
    usedIds.add(id);
    return id;
  };

  const groups = [];
  let current = { kind: 'lead', title: '', id: 'dau-bai', blocks: [] };
  groups.push(current);

  blocks.forEach((block) => {
    if (block.type === 'heading') {
      if (block.level === 1) return;
      if (block.level === 2) {
        current = { kind: classify(block.text), title: block.text, id: ensureId(slugify(block.text)), blocks: [] };
        groups.push(current);
        return;
      }
      const sub = block.text.replace(/^\d+[.)]\s*/, '');
      current.blocks.push({ ...block, id: ensureId(slugify(sub)), sub });
      return;
    }
    current.blocks.push(block);
  });

  const lead = groups.find((g) => g.kind === 'lead' && g.blocks.length);
  const leadHtml = lead ? lead.blocks.map(renderBlock).join('\n') : '';

  const sections = groups
    .filter((g) => g.kind !== 'lead')
    .map((g) => ({
      kind: g.kind,
      title: g.title,
      id: g.id,
      html: g.blocks.map(renderBlock).join('\n'),
      subs: g.blocks
        .filter((b) => b.type === 'heading' && b.level >= 3)
        .map((b) => ({ id: b.id, title: b.sub })),
    }));

  const toc = sections
    .filter((s) => s.kind !== 'next')
    .map((s) => ({ id: s.id, title: s.title, kind: s.kind, children: s.subs }));

  const goalsSection = sections.find((s) => s.kind === 'goals');
  const objectives = goalsSection
    ? [...goalsSection.html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => plain(m[1]))
    : [];

  const practiceSection = sections.find((s) => s.kind === 'practice');
  const practiceItems = practiceSection
    ? [...practiceSection.html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => plain(m[1]))
    : [];

  const bodySections = sections.filter((s) => s.kind !== 'next' && s.kind !== 'goals');

  const plainText = plain([leadHtml, ...sections.map((s) => `<h2>${s.title}</h2>${s.html}`)].join(' '));

  return {
    title,
    leadHtml,
    sections: bodySections,
    nextSection: sections.find((s) => s.kind === 'next') || null,
    goalsSection: goalsSection || null,
    practiceSection: practiceSection || null,
    toc,
    objectives,
    practiceItems,
    plainText,
  };
}

module.exports = { parseLesson, renderBlock, inline, plain, esc, slugify, classify };



