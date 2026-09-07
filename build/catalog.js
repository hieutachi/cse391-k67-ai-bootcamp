'use strict';
// Giữ nguyên URL và tiến độ 5 buổi cũ; xuất mọi bài tiếng Việt còn lại.
const fs = require('fs');
const path = require('path');
const { parseLesson } = require('./markdown');

function expandCatalog(config) {
  const root = path.resolve(__dirname, '..');
  const known = new Set(config.SESSIONS.map((s) => s.file));
  config.CHAPTERS.forEach((chapter) => {
    const dir = 'course-lessons/vi/' + chapter.dir;
    const files = fs.readdirSync(path.join(root, dir)).filter((f) => /^\d.*\.md$/.test(f)).sort();
    if (!files.length) throw new Error('Chương rỗng: ' + dir);
    chapter.published = true;
    chapter.lessons = files.length;
    files.forEach((name) => {
      const file = dir + '/' + name;
      if (known.has(file)) return;
      const parsed = parseLesson(fs.readFileSync(path.join(root, file), 'utf8'));
      const n = config.SESSIONS.length + 1;
      config.SESSIONS.push({
        n, chapter: chapter.n, file, url: 'lessons/buoi-' + String(n).padStart(2, '0') + '.html',
        title: parsed.title, en: chapter.en, kind: /lab|workshop|project/.test(name) ? 'Thực hành' : 'Bài học',
        summary: parsed.objectives.slice(0, 2).join(' · ') || chapter.summary,
        readMinutes: Math.max(1, Math.ceil(parsed.plainText.split(/\s+/).length / 200)),
        minutes: null, terms: [], quiz: [],
      });
    });
  });
  config.COURSE.lessons = config.SESSIONS.length;
  return config.SESSIONS;
}

module.exports = { expandCatalog };