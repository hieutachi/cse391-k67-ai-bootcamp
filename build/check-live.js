/**
 * build/check-live.js — kiểm tra bản thể đã publish trên GitHub Pages.
 * Không cần dependency (dùng fetch có sẵn của Node >= 18).
 *
 *   node build/check-live.js https://hieutachi.github.io/cse391-k67-ai-bootcamp/
 *
 * Exit code 0 + dòng cuối "ALL PASS" khi mọi kiểm tra đạt.
 * Lý do dùng Node thay vì Invoke-WebRequest: Windows PowerShell 5.1 giải mã thân
 * đáp ứng UTF-8 theo CP1252 nên tiếng Việt bị loạn, sinh báo động giả.
 */
"use strict";

const BASE = (process.argv[2] || "https://hieutachi.github.io/cse391-k67-ai-bootcamp/")
  .replace(/\/+$/, "") + "/";

const PAGES = [
  "", "index.html", "gioi-thieu.html", "lo-trinh.html", "du-an.html", "tu-dien.html", "404.html",
  "lessons/buoi-01.html", "lessons/buoi-02.html", "lessons/buoi-03.html",
  "lessons/buoi-04.html", "lessons/buoi-05.html",
];
const EXPECT = { locs: 11, searchItems: 69 };

let fails = 0;
const pass = (m) => console.log("PASS  " + m);
const fail = (m) => { fails++; console.log("FAIL  " + m); };
const check = (cond, m) => (cond ? pass : fail)(m);

const get = async (p) => {
  const res = await fetch(BASE + p, { redirect: "follow" });
  const text = await res.text();
  return {
    status: res.status,
    type: (res.headers.get("content-type") || "").split(";")[0].trim(),
    text,
  };
};

(async () => {
  let absSite = 0;
  let rootRel = 0;
  let markers = 0;

  for (const p of PAGES) {
    const r = await get(p);
    const lesson = p.startsWith("lessons/");
    const name = p === "" ? "(root)" : p;
    const title = (r.text.match(/<title>([^<]*)<\/title>/) || [, ""])[1];
    const viOk = r.text.includes("Điều hướng khoá học");
    const assetRef = lesson ? "../assets/css/main.css" : "assets/css/main.css";
    const assetOk = r.text.includes(assetRef);
    const jsOk = r.text.includes(lesson ? "../assets/js/main.js" : "assets/js/main.js");

    absSite += (r.text.match(/(?:href|src)="\/site\//g) || []).length;
    rootRel += (r.text.match(/(?:href|src)="\/(?!\/)/g) || []).length;
    markers += (r.text.match(/TODO|FIXME|\{\{[A-Z_]+\}\}/g) || []).length;

    check(
      r.status === 200 && /text\/html/.test(r.type) && title !== "" && viOk && assetOk && jsOk,
      name + " → HTTP " + r.status + " " + (r.type || "?") +
      " | title " + (title ? "ok" : "THIẾU") +
      " | vi " + (viOk ? "ok" : "THIẾU") +
      " | css " + (assetOk ? "ok" : "THIẾU " + assetRef) +
      " | js " + (jsOk ? "ok" : "THIẾU")
    );
  }

  check(absSite === 0, 'đường dẫn "/site/" còn sót trên 12 request: ' + absSite);
  check(rootRel === 0, 'đường dẫn root-relative (href="/...") còn sót: ' + rootRel);
  check(markers === 0, "marker build còn sót (TODO/FIXME/{{X}}): " + markers);

  const css = await get("assets/css/main.css");
  const open = (css.text.match(/\{/g) || []).length;
  const close = (css.text.match(/\}/g) || []).length;
  check(css.status === 200 && /text\/css/.test(css.type), "main.css → HTTP " + css.status + " " + css.type);
  check(open === close && open > 0, "main.css ngoặc cân bằng " + open + "/" + close);
  check(
    css.text.includes(":root") && css.text.includes("--brand") && css.text.includes("[data-theme"),
    "main.css có :root + --brand + biến theme tối"
  );

  const js = await get("assets/js/main.js");
  check(js.status === 200 && /javascript/.test(js.type), "main.js → HTTP " + js.status + " " + js.type);
  check(
    js.text.includes("__CSE391_SEARCH__") && js.text.includes("dataset.root") &&
    js.text.includes("stroke-dashoffset") && js.text.includes("cse391-k67-state-v1"),
    "main.js nối search index + data-root + progress ring + localStorage state"
  );

  const idx = await get("assets/js/search-index.js");
  check(idx.status === 200 && /javascript/.test(idx.type), "search-index.js → HTTP " + idx.status + " " + idx.type);
  const items = (idx.text.match(/"u":/g) || []).length;
  check(items === EXPECT.searchItems, "search index có " + items + "/" + EXPECT.searchItems + " mục");
  check(!/"u":"\//.test(idx.text), "search index không chứa URL root-relative");

  const sm = await get("sitemap.xml");
  const locs = (sm.text.match(/<loc>([^<]*)<\/loc>/g) || []).map((s) => s.slice(5, -6));
  check(sm.status === 200 && locs.length === EXPECT.locs, "sitemap có " + locs.length + "/" + EXPECT.locs + " <loc>");
  check(locs.length > 0 && locs.every((l) => l.startsWith(BASE)), "mọi <loc> thuộc " + BASE);

  const rb = await get("robots.txt");
  check(rb.status === 200 && rb.text.includes(BASE + "sitemap.xml"), "robots.txt trỏ đúng sitemap của " + BASE);

  const missing = await fetch(BASE + "khong-ton-tai-" + Date.now() + ".html", { redirect: "follow" });
  const missingText = await missing.text();
  check(missing.status === 404 && missingText.includes("Về trang chủ"),
    "404 tuỳ biến → HTTP " + missing.status + " | " + (missingText.includes("Về trang chủ") ? "đúng trang 404" : "SAI NỘI DUNG"));

  const mf = await get("site.webmanifest");
  check(mf.status === 200 && (mf.text.match(/"start_url"\s*:\s*"([^"]+)"/) || [, ""])[1].startsWith("./"),
    "webmanifest → HTTP " + mf.status + " | start_url tương đối");

  const nj = await get(".nojekyll");
  check(nj.status === 200, ".nojekyll được phục vụ → HTTP " + nj.status);

  console.log("");
  if (fails > 0) {
    console.log(fails + " FAIL — " + BASE);
    process.exit(1);
  }
  console.log("ALL PASS — " + BASE);
})().catch((err) => {
  console.log("FAIL  lỗi mạng/trình duyệt: " + (err && err.message ? err.message : err));
  process.exit(1);
});
