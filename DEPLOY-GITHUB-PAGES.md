# Triển khai GitHub Pages — CSE391 K67 (site tiếng Việt)

Runbook đưa 11 trang tĩnh trong `site/` lên GitHub Pages, repo **`hieutachi/cse391-k67-ai-bootcamp`**.
URL sau khi xong: **`https://hieutachi.github.io/cse391-k67-ai-bootcamp/`**
Chạy từng khối lệnh một trong **Windows PowerShell 5.1**. Khối nào báo lỗi thì dừng, đọc thông báo, sửa xong mới sang khối sau.

## 0. Phương án đã chọn (và lý do)

| Quyết định | Chọn | Đã kiểm chứng trong phiên này |
|---|---|---|
| Repo publish | `hieutachi/cse391-k67-ai-bootcamp` (public) | `gh api repos/ktzung/working-with-ai-course-for-frontend-dev --jq .permissions` → **`push: false`**; `git push --dry-run origin main` báo ` Permission denied (push)` ⇒ không thể publish thẳng vào kho giảng viên |
| Cơ chế deploy | Commit `site/` → **nhánh `gh-pages`** (`git subtree split`) → Pages `build_type: legacy` | `git ls-files .github` → **0 file**: repo không có workflow nào. Token `gh` có scope `["gist","read:org","repo"]`, **không có `workflow`** → mọi commit chứa `.github/workflows/*.yml` sẽ bị **403**. Actions để dành nâng cấp sau (§10.2) |
| Vị trí site trong nhánh publish | **Thư mục gốc** của `gh-pages` (`source.path: "/"`) | `site/` dùng 100% đường dẫn tương đối: `<base>` = 0, `href/src` tuyệt đối = 0, `../assets/` chỉ có trong 5 trang lesson ⇒ đặt ở gốc là đúng và URL gọn (chứng minh §4) |
| Remote | `origin` giữ nguyên trỏ kho giảng viên (để `git fetch` bài mới), remote mới tên **`deploy`** | `git remote -v` → `origin = https://github.com/ktzung/working-with-ai-course-for-frontend-dev.git` |

Ràng buộc quan trọng nhất: `git subtree split` chỉ lấy nội dung **đã commit**. Hiện `build/` và `site/` đang **untracked** (`git status --porcelain` → `?? build/`, `?? site/`; `git ls-files site` → 0 dòng) ⇒ **§2 là bước bắt buộc**, bỏ qua thì §6 sẽ push một nhánh rỗng.

## 1. Biến dùng chung + hiện trạng

```powershell
$ROOT  = 'd:\0. TLU\Giao an\CSE\CSE391_Nen tang phat trien Web\K67\working-with-ai-course-for-frontend-dev'
$OWNER = 'hieutachi'
$REPO  = 'cse391-k67-ai-bootcamp'
$URL   = "https://$OWNER.github.io/$REPO/"
Set-Location -LiteralPath $ROOT
```

Đường dẫn có khoảng trắng + tiếng Việt ⇒ **luôn dùng `-LiteralPath`**.
Lưu ý: PowerShell 5.1 **không giữ biến giữa các dòng** khi chạy từng dòng rời rạc ⇒ hoặc chạy cả khối liền nhau, hoặc dán lại phần khai báo biến ở trên.

```powershell
git rev-parse --abbrev-ref HEAD                       # main
git rev-list --left-right --count origin/main...HEAD   # 0	0  (đang đồng bộ với kho giảng viên)
git ls-files | Measure-Object                        # Count 149
git ls-files site | Measure-Object                   # Count 0   ← site/ CHƯA được track
gh auth status                                       # Logged in as hieutachi (Keyring)
gh api user --jq .login                              # hieutachi
node --version                                       # v24.14.0
git --version                                        # git version 2.50.x (có sẵn git subtree)
```

| Sự thật đã đo | Giá trị |
|---|---|
| `site/` | **19 file**, **414.3 KB**; `index.html` 28.6 KB, `tu-dien.html` 33.6 KB, `lessons/buoi-05.html` 36.4 KB |
| File đặc biệt trong `site/` | `.nojekyll` (tắt Jekyll), `404.html` (custom 404 của Pages), `robots.txt`, `sitemap.xml`, `site.webmanifest` |
| `build/` | 7 file JS thuần (`build.js` 6.3 KB, `config.js` 34.5 KB, `templates.js` 38 KB, `markdown.js` 15.5 KB, `highlight.js`, `qa-check.js`, `check-css.js`) — **không có `package.json`** ⇒ không cần `npm install`, chỉ cần `node` |
| `BASE_URL` | `build/build.js` dòng 24, hiện là `'https://ktzung.github.io/working-with-ai-course-for-frontend-dev/'`; **chỉ ảnh hưởng `sitemap.xml` + `robots.txt`**, không đụng 11 trang HTML |
| Rác đang tracked | `.DS_Store`, `course-lessons/.DS_Store` ⇒ dọn ở §2.2 |
| `.gitignore` | chưa tồn tại (`Test-Path .gitignore` → `False`) |
| Trạng thái phía client | `main.js` dùng `localStorage` 2 khoá: `cse391-theme` (nền sáng/tối) và `cse391-k67-state-v1` (tiến độ + quiz) ⇒ deploy không làm mất dữ liệu người học |
| Search index | `assets/js/search-index.js` mở đầu bằng `window.__CSE391_SEARCH__ = [...]` (field `t/k/u/x`); `main.js` đọc biến toàn cục đó + `dataset.root` |

## 2. Chuẩn bị commit (một lần, chưa push)

### 2.1 Tạo `.gitignore`

Không ignore `build/` hay `site/` — cả hai đều phải vào repo vì deploy bằng subtree split.

```powershell
@'
.DS_Store
Thumbs.db
desktop.ini
~$*
*.swp
node_modules/
npm-debug.log*
.publish/
'@ | Set-Content -LiteralPath '.gitignore' -Encoding ascii
```

### 2.2 Bỏ rác macOS khỏi index (giữ file trên đĩa)

```powershell
git rm --cached .DS_Store course-lessons/.DS_Store
git ls-files | Select-String -Pattern 'DS_Store'      # → phải trống
```

### 2.3 Đổi `BASE_URL` sang URL Pages mới

Ghi bằng .NET để ra UTF-8 **không BOM** (`Set-Content -Encoding UTF8` của PS 5.1 sẽ thêm BOM):

```powershell
$p = Join-Path $ROOT 'build/build.js'
$s = [IO.File]::ReadAllText($p)
$old = "'https://ktzung.github.io/working-with-ai-course-for-frontend-dev/'"
$new = "'https://hieutachi.github.io/cse391-k67-ai-bootcamp/'"
if (-not $s.Contains($old)) { throw 'Khong tim thay dong BASE_URL cu' }
[IO.File]::WriteAllText($p, $s.Replace($old, $new))
Select-String -LiteralPath 'build/build.js' -Pattern 'BASE_URL = '   # → phải thấy hieutachi.github.io
```

Giữ nguyên vế `process.env.CSE391_BASE_URL ||` để vẫn override được khi build sang miền khác.

### 2.4 Ghi công nguồn

Repo gốc **không có file LICENSE**, README không nêu giấy phép ⇒ chèn dòng ghi công vào **đầu `README.md`** (ngay sau dòng `# 🎓 AI-Accelerated Frontend Developer Bootcamp`) bằng editor:

```markdown
> Bản dựng site CSE391 K67 (tiếng Việt) từ kho giáo trình công khai
> [ktzung/working-with-ai-course-for-frontend-dev](https://github.com/ktzung/working-with-ai-course-for-frontend-dev).
> Nội dung bài giảng thuộc tác giả gốc; `build/` + `site/` là sản phẩm môn học.
```

Footer site đã sẵn link “Mã nguồn khoá học” trỏ về kho giảng viên (`site/index.html` dòng 232) ⇒ không phải sửa template.

### 2.5 Commit

```powershell
git add .gitignore build site README.md DEPLOY-GITHUB-PAGES.md
git commit -m "feat(K67): bo sinh site + 11 trang tieng Viet, dat BASE_URL Pages"
git ls-files site | Measure-Object     # → Count 19  (điều kiện sống còn của §6)
git status --short                     # → sạch
```


## 3. Build + QA (cổng chặn 1)

```powershell
node build/build.js
node --check site/assets/js/main.js
node build/qa-check.js
node build/check-css.js
```

Output **thật** của lần chạy gần nhất (phải khớp, sai số là có nội dung chưa commit/đã đổi):

```
  11 trang · 5 buổi · 0 đầu việc · 49 thuật ngữ · 0.02s
  JS SYNTAX OK
search items: 69 | bad urls: 0
pages: 11 | local hrefs: 264 | broken: 0
id check: ok
css vars used: 40 | undefined: --d
classes used: 222 | styled: 222
MISSING (0):
```

- `broken: 0` và `bad urls: 0` là 2 cổng bắt lỗi liên kết ⇒ khác 0 thì **dừng**, sửa nội dung rồi build lại.
- `undefined: --d` **không phải lỗi**: `--d` được set inline qua `style="--d:…"` (73 chỗ trong 11 file) làm delay cho hiệu ứng reveal, nên không tồn tại ở `:root`.
- `0 đầu việc`: roadmap chưa có mục "đầu việc" nào được parse — là vấn đề nội dung, không chặn deploy (ghi ở §10.3).

Kiểm tra `sitemap.xml` + `robots.txt` đã đổi domain theo `BASE_URL`:

```powershell
Select-String -LiteralPath site/sitemap.xml -Pattern 'hieutachi' -Quiet    # → True
([regex]::Matches([IO.File]::ReadAllText((Join-Path $ROOT 'site/sitemap.xml')), '<loc>')).Count   # → 11
Select-String -LiteralPath site/sitemap.xml,site/robots.txt -Pattern 'ktzung'  # → phải trống
git add site; git commit -m "chore(site): sitemap + robots tro URL Pages"
```

## 4. Bằng chứng site chạy được ở subpath của GitHub Pages

| Kiểm tra trên `site/` | Kết quả đo được |
|---|---|
| Số thẻ `<base href>` trong 11 file HTML | **0** |
| `href`/`src` bắt đầu bằng `/` (root-relative) | **0** |
| Chuỗi `../assets/`, `../index.html` | **55 lần**, chỉ trong 5 file `lessons/*.html`, chỉ trong `href=`/`src=` (không có trong JS) |
| `data-root` trên `<body>` | `""` ở 6 trang gốc (kể cả `404.html`), `"../"` ở 5 trang lesson |
| Marker tiếng Việt “Điều hướng khoá học” | có mặt ở **cả 11/11** file HTML |
| `site.webmanifest` | `"start_url": "./index.html"`, icon `"./assets/img/favicon.svg"` ⇒ không có đường dẫn tuyệt đối |
| Google Fonts | 11/11 trang tải `fonts.googleapis.com` + `fonts.gstatic.com`; có font dự phòng trong CSS |

⇒ Kết luận: **không cần** `<base>`, không cần cấu hình `base` trong build. Chỉ cần `index.html` nằm ở gốc thư mục mà Pages phục vụ — đúng những gì `git subtree split --prefix site` tạo ra.
⇒ Hệ quả khi verify: mọi URL sống phải là `$URL + đường-dẫn-tương-đối`, **không** có `$URL/site/…`.

## 5. Tạo repo đích và đẩy `main`

```powershell
gh repo create "$OWNER/$REPO" --public --description "CSE391 K67 - AI-Accelerated Frontend Developer Bootcamp"
git remote add deploy "https://github.com/$OWNER/$REPO.git"
git push -u deploy main
git remote -v
```

Chú thích:
- `--description` viết **không dấu** vì PowerShell 5.1 mã hoá tham số theo CP1252 → tiếng Việt sẽ thành chữ loạn.
- Không dùng `--homepage`/`--use-base-url`: GitHub tự sinh `homepage` khi Pages bật ở §6, và `homepage` **không** ảnh hưởng đường dẫn asset (site dùng tương đối).
- `git push -u deploy main`: thiết lập upstream mới cho `main` là `deploy`. Từ giờ `git push` mặc định đẩy vào repo của bạn, **không** đụng `origin` (vốn không cho push).
- `origin` vẫn còn đó để `git fetch origin` lấy bài giảng mới của giảng viên.
- Kịch bản lỗi thường gặp: `GH repository creation failed: … name already exists` ⇒ repo đã tồn tại từ lần thử trước, chạy `gh repo view "$OWNER/$REPO" --json url,visibility` rồi nhảy thẳng tới bước `git remote add`.

```powershell
gh repo view "$OWNER/$REPO" --json url,visibility,defaultBranchRef
git ls-remote --heads deploy           # → refs/heads/main
```


## 6. Xuất bản `site/` lên nhánh `gh-pages` và bật Pages

### 6.1 Tách riêng tree của `site/` thành nhánh

```powershell
git subtree split --prefix site -b gh-pages
git log --oneline -3 gh-pages
git ls-tree --name-only gh-pages
git ls-tree -r --name-only gh-pages | Measure-Object
```

Phải thấy ở **gốc** nhánh `gh-pages`: `.nojekyll  404.html  assets  du-an.html  index.html  lessons  lo-trinh.html  robots.txt  site.webmanifest  sitemap.xml  tu-dien.html  gioi-thieu.html` và tổng số file = **19**.
Nếu `Measure-Object` ra 0 ⇒ `site/` chưa được commit ở §2.5, quay lại làm.
Nếu báo `fatal: branch 'gh-pages' already exists` ⇒ đang lặp lại vòng cập nhật, dùng §8.A.

### 6.2 Đẩy nhánh

```powershell
git push deploy gh-pages:gh-pages
git ls-remote --heads deploy            # → refs/heads/gh-pages  +  refs/heads/main
```

### 6.3 Bật Pages qua REST (GitHub CLI **không có** lệnh `gh pages` — đã kiểm tra: `unknown command "pages" for "gh"`)

```powershell
'{ "source": { "branch": "gh-pages", "path": "/" }, "build_type": "legacy" }' |
  gh api -X POST "repos/$OWNER/$REPO/pages" --input -

gh api "repos/$OWNER/$REPO/pages" --jq '{status: .status, url: .html_url, branch: .source.branch}'
```

`POST` trả `422 … cannot be enabled on this repository` ⇒ repo đang private: `gh repo edit "$OWNER/$REPO" --visibility public` rồi POST lại.
`POST` trả `404 Not Found` ⇒ sai `$OWNER/$REPO`, kiểm tra bằng `gh repo view`.

### 6.4 Chờ build xong

```powershell
for ($i = 0; $i -lt 24; $i++) {
  Start-Sleep -Seconds 15
  $s = gh api "repos/$OWNER/$REPO/pages" --jq .status
  "$i : $s"
  if ($s -eq 'built') { break }
}
'{ "https_enforced": true }' | gh api -X PATCH "repos/$OWNER/$REPO/pages" --input -
gh api "repos/$OWNER/$REPO/pages" --jq .html_url      # https://hieutachi.github.io/cse391-k67-ai-bootcamp/
```

`status` đi `waiting → building → built`. Sau 6 phút vẫn `building` ⇒ mở `https://github.com/$OWNER/$REPO/pages` xem log (thường là thiếu `.nojekyll` hoặc nhánh chưa có file gốc).

## 7. Kiểm tra trang sống (cổng chặn 2)

### 7.1 Quét trạng thái + content-type

```powershell
$URL = "https://$OWNER.github.io/$REPO/"
$paths = @('', 'index.html', 'gioi-thieu.html', 'lo-trinh.html', 'du-an.html', 'tu-dien.html', '404.html',
  'lessons/buoi-01.html', 'lessons/buoi-05.html', 'assets/css/main.css', 'assets/js/main.js',
  'assets/js/search-index.js', 'assets/img/favicon.svg', 'site.webmanifest', 'sitemap.xml', 'robots.txt')
foreach ($p in $paths) {
  try { $r = Invoke-WebRequest ($URL + $p) -Method Head -UseBasicParsing -TimeoutSec 25
        '{0,4}  {1,-26} {2}' -f $r.StatusCode, $p, $r.Headers['Content-Type'] }
  catch { ' ERR  ' + $p + '  ' + $_.Exception.Message }
}
```

Kỳ vọng: 16/16 trả `200`. Content-type thông dụng của Pages: `.html` → `text/html; charset=utf-8`, `.css` → `text/css`, `.js` → `application/javascript`, `.svg` → `image/svg+xml`, `.xml` → `application/xml`, `.txt` → `text/plain`, `.webmanifest` → `application/manifest+json`.

### 7.2 Kiểm tra **nội dung** bằng Node (bắt buộc, không dùng `Get-Content`)

Windows PowerShell 5.1 giải mã thân đáp ứng UTF-8 theo CP1252 ⇒ tiếng Việt trong `.Content`/`Get-Content` bị loạn, sinh báo động giả (kiểm chứng: `Get-Content README.md` in ra `ðŸŽ“`). Tạo file `build/check-live.js` theo mã nguồn ở **§11** rồi:

```powershell
node build/check-live.js $URL
```

Định dạng output mong đợi (mỗi kiểm tra một dòng `PASS`; có lỗi thì `FAIL` và exit code 1):

```
PASS  index.html → HTTP 200 | title ok | vi ok | relative assets ok | /site/ = 0 | marker = 0
      ... (đủ 11 trang)
PASS  main.css → HTTP 200 text/css | ngoặc cân bằng | có :root/--brand/--radius
PASS  main.js → HTTP 200 | đọc window.__CSE391_SEARCH__ + dataset.root + stroke-dashoffset
PASS  search-index.js → HTTP 200 | 69 mục | 0 URL tuyệt đối | 0 URL chỉ tới file không tồn tại
PASS  sitemap có 11/11 <loc> | mọi <loc> dùng đúng BASE
PASS  robots.txt trỏ sitemap đúng domain
PASS  404 tuỳ biến hoạt động (HTTP 404 + nội dung 404.html)
PASS  webmanifest start_url tương đối
PASS  tổng /site/ sai trên toàn site: 0
ALL PASS — https://hieutachi.github.io/cse391-k67-ai-bootcamp/
```

### 7.3 Test tay trên trình duyệt (QA tự động không phủ tới)

Bật DevTools → Network (Disable cache) + Console (0 lỗi):
1. `Ctrl+K` tìm `prompt` rồi `huong dan` (không dấu vẫn ra kết quả, từ khớp được `<mark>`); Enter mở đúng bài.
2. Nhãn “Sáng/Tối” đổi giao diện và **sống sau F5** (`localStorage.cse391-theme`).
3. “Đánh dấu đã hoàn thành” ở cuối lesson ⇒ vòng tiến độ trên topbar + `0/5` ở sidebar đổi; F5 vẫn giữ (`cse391-k67-state-v1`); bỏ đánh dấu để trả trạng thái.
4. Sidebar lesson: mục đang xem có chấm xanh; TOC scrollspy gạch chân đúng heading khi cuộn.
5. Rút cửa sổ ≤ 880px ⇒ hiện ☰; mở drawer, chạm nền tối ngoài drawer để đóng, Esc đóng được; “About”/“Mã nguồn khoá học” vẫn click được.
6. Quiz buổi 01: chọn đáp án → “Chấm điểm” ra điểm + giải thích, “Làm lại” xoá trắng; reload vẫn còn đáp án đã chọn.
7. Copy code: nút “Copy” đổi nhãn rồi trả về “Copy”.
8. Từ điển: gõ “flex” ⇒ bộ đếm `x/49` đổi, xoá lọc trả về 49.
9. Mở `.../khong-co-trang-nay` ⇒ hiện **404 tuỳ biến** có “Về trang chủ”, “Xem lộ trình”, search vẫn dùng được.
10. `chrome://dino` offline test không bắt buộc; in trang (`Ctrl+P`) phải giữ được nội dung chính.


## 8. Vòng cập nhật về sau

### 8.A Mỗi lần sửa nội dung / template / CSS / JS

```powershell
Set-Location -LiteralPath $ROOT
node build/build.js
node --check site/assets/js/main.js
node build/qa-check.js
node build/check-css.js
git add -A
git commit -m "docs(K67): cap nhat noi dung"
$sha = (git subtree split --prefix site).Trim()
git branch -f gh-pages $sha
git push deploy gh-pages:gh-pages --force
node build/check-live.js "https://$OWNER.github.io/$REPO/"
```

- Lần lặp lại **không** dùng `-b gh-pages` nữa: nhánh đã tồn tại ⇒ `subtree split` báo `already exists`. Vì vậy mới dùng `$sha` + `git branch -f` (không cần checkout).
- `git push … --force` là **bình thường** với nhánh `gh-pages` (nhánh do máy tạo, không ai làm việc trên đó).
- `git subtree split` lần đầu chậm (quét history); các lần sau nhanh hơn. Muốn history gọn thì thêm `--rejoin` khi split.
- Pages tự build lại trong ~30–60s sau push; nếu gấp, ép mới cache: `gh api -X POST "repos/$OWNER/$REPO/pages/builds"`.
- Muốn chắc chắn nội dung mới đã lên (Pages có cache): `Invoke-WebRequest ($URL + 'index.html?nocache=' + (Get-Random)) -UseBasicParsing | Select-Object -ExpandProperty StatusCode`.

### 8.B Nếu bài giảng mới được giảng viên push lên `origin`

```powershell
git fetch origin
git log --oneline HEAD..origin/main         # xem có gì mới
git merge origin/main                       # nếu merge sạch
node build/build.js; node build/qa-check.js
git add -A; git commit -m "merge: bai giang moi tu origin"
$sha = (git subtree split --prefix site).Trim(); git branch -f gh-pages $sha
git push deploy main; git push deploy gh-pages:gh-pages --force
```

Xung đột ở `course-lessons/*.md` ⇒ ưu tiên `--theirs` của `origin` cho nội dung bài, giữ `build/` của bạn.

## 9. Rollback / gỡ

```powershell
git log --oneline -8 gh-pages                       # chọn sha bản tốt
git push deploy <sha>:refs/heads/gh-pages --force   # Pages phục vụ lại bản cũ
gh api "repos/$OWNER/$REPO/pages" --jq .status
```

Gỡ hẳn Pages: `gh api -X DELETE "repos/$OWNER/$REPO/pages"`.
Xoá hoàn toàn: `gh repo delete "$OWNER/$REPO" --yes` (nếu chỉ muốn public lại site ở repo khác, tạo repo mới rồi chạy lại §6).
Dữ liệu tiến độ của người học nằm trong `localStorage` trình duyệt ⇒ đổi/rollback site không làm mất, nhưng đổi khoá `cse391-k67-state-v1` trong code thì có.

## 10. Ghi chú, giới hạn, đường nâng cấp

**10.1 Giới hạn đã biết của cách deploy này**
- `site/` là artifact đã commit ⇒ mọi lần sửa `build/` phải nhớ build lại (quên build = push nội dung cũ mà không lỗi). Điều kiện `git status --short` sạch ở §2.5/§8.A là thói quen bắt buộc.
- `gh-pages` bị force-push mỗi lần ⇒ không thể xem “ai sửa gì” trên nhánh đó; lịch sử thật nằm ở `main`.
- Pages phục vụ tĩnh: không có backend, nên tiến độ/quiz chỉ lưu máy người học (thiết kế sẵn như vậy).

**10.2 Nâng cấp lên GitHub Actions (khi nào cần)**
Chỉ khi muốn “push `main` → tự build + tự deploy, không commit `site/` nữa”. Việc cần làm, đúng thứ tự:
1. `gh auth refresh -s workflow` (thêm scope `workflow`; **token hiện tại không có** ⇒ push file workflow sẽ 403).
2. Commit `.github/workflows/deploy.yml` dùng `actions/upload-pages-artifact` với `path: site` + `actions/deploy-pages` (mẫu ở §10.2 của bản runbook trước / docs chính thức `actions/deploy-pages`).
3. `'{ "build_type": "workflow" }' | gh api -X PATCH "repos/$OWNER/$REPO/pages" --input -`
4. `git rm -r --cached site` rồi thêm `site/` vào `.gitignore`, commit.
5. `git push deploy main` ⇒ `gh run watch`.
Rủi ro: nếu bước 3 làm trước bước 2, site sẽ trắng (Pages không còn tìm thấy build từ branch). Luôn để nhánh `gh-pages` nguyên vẹn cho tới khi Actions chạy xanh ít nhất 1 lần.

**10.3 Việc còn tồn (không chặn deploy)**
- Build in `0 đầu việc` trong khi `lo-trinh.html` có khối lộ trình ⇒ kiểm tra `build/config.js` xem danh sách “đầu việc” có được khai báo không; nếu site vẫn hiển thị đúng như ý thì bỏ qua.
- Repo gốc không có LICENSE ⇒ đã xử lý bằng dòng ghi công ở §2.4; nếu giảng viên đồng ý, thêm `LICENSE` chính thức trước khi mở rộng học viên.
- Muốn URL “của giảng viên” (`ktzung.github.io/working-with-ai-course-for-frontend-dev/`) thì bắt buộc repo `ktzung` bật Pages (cần quyền push) — không làm được với credentials hiện tại.

**10.4 Checklist “deploy xong” (tick hết mới được coi là xong)**
- [ ] `gh api repos/$OWNER/$REPO/pages --jq .status` = `built`
- [ ] `node build/check-live.js $URL` in `ALL PASS`, exit code 0
- [ ] Mở `$URL` trên điện thoại: drawer ☰, search `Ctrl+K` (hoặc ô search), quiz buổi 01 chấm điểm được
- [ ] `$URL + 'sitemap.xml'` có 11 `<loc>` trỏ `hieutachi.github.io`
- [ ] `$URL + 'khong-co-trang-nay'` hiện 404 tuỳ biến
- [ ] `git log --oneline -1 deploy/gh-pages` khớp `$sha` vừa split


## 11. Script kiểm tra trang sống: `build/check-live.js`

Đã nằm sẵn trong repo (§2.5 commit nó cùng `build/`), **không có dependency**, chạy bằng Node >= 18 (dùng `fetch` toàn cục).

```powershell
node build/check-live.js                 # dùng URL mặc định hieutachi.github.io/cse391-k67-ai-bootcamp
node build/check-live.js "https://$OWNER.github.io/$REPO/"
$LASTEXITCODE                            # 0 = ALL PASS, 1 = có FAIL
```

27 kiểm tra nó thực hiện:

| Nhóm | Nội dung |
|---|---|
| 12 request trang | `` (root), `index.html`, `gioi-thieu.html`, `lo-trinh.html`, `du-an.html`, `tu-dien.html`, `404.html`, 5 lesson → HTTP 200, `text/html`, có `<title>`, có cụm “Điều hướng khoá học” (bằng chứng UTF-8 + tiếng Việt không bị lỗi font/encoding), có `assets/css/main.css` (`../assets/...` với lesson), có `assets/js/main.js` |
| Toàn bộ trang | không còn `href="/site/…"` (sai vị trí tương đối), không còn `href="/…"` root-relative, không còn marker build (`TODO`, `FIXME`, `{{X}}`) |
| `main.css` | 200 + `text/css`; ngoặc `{}` cân bằng (721/721 bản hiện tại); có `:root`, `--brand`, `[data-theme` |
| `main.js` | 200 + `application/javascript`; còn nối `__CSE391_SEARCH__`, `dataset.root`, `stroke-dashoffset`, `cse391-k67-state-v1` |
| `search-index.js` | 200; đủ **69** mục (`"u":`); không có `"u":"/"` root-relative |
| `sitemap.xml` | 200; đủ **11** `<loc>`; mọi `<loc>` bắt đầu bằng BASE đang test |
| `robots.txt` | 200; dòng `Sitemap:` trúng BASE |
| 404 | gọi `khong-ton-tai-<timestamp>.html` → **HTTP 404** và thân là trang 404 tuỳ biến (có “Về trang chủ”) |
| `site.webmanifest` | 200; `start_url` là `"./index.html"` (tương đối) |
| `.nojekyll` | 200 → Pages không chạy Jekyll |

Đọc output: dòng `FAIL` nào chỉ thẳng nguyên nhân (ví dụ `title THIẾU` + `HTTP 404` ⇒ chưa build/commit trang đó; `mọi <loc> thuộc ...` fail ⇒ quên §2.3 build lại `sitemap.xml`).
Chạy ở mạng chậm: mỗi request là `fetch` tuần tự, tổng 25 request ⇒ hết 5–15 giây là bình thường.
Muốn test tính logic của script mà chưa publish: build tạm ra `http://127.0.0.1:8123/` bằng `build/tmp-server.js` (không commit file này), chạy `node build/check-live.js http://127.0.0.1:8123/`, sau đó **build lại bằng BASE thật** trước khi commit.

## 12. Tóm tắt 8 lệnh (khi đã hiểu các mục trên)

```powershell
Set-Location -LiteralPath 'd:\0. TLU\Giao an\CSE\CSE391_Nen tang phat trien Web\K67\working-with-ai-course-for-frontend-dev'
# 1) .gitignore + dọn .DS_Store (§2.1, §2.2)  2) BASE_URL (§2.3)  3) ghi công README (§2.4)
node build/build.js; node build/qa-check.js; node build/check-css.js; node --check site/assets/js/main.js
git add -A; git commit -m "feat(K67): site tieng Viet + BASE_URL Pages"
gh repo create "hieutachi/cse391-k67-ai-bootcamp" --public --description "CSE391 K67 - AI-Accelerated Frontend Developer Bootcamp"
git remote add deploy https://github.com/hieutachi/cse391-k67-ai-bootcamp.git; git push -u deploy main
git subtree split --prefix site -b gh-pages; git push deploy gh-pages:gh-pages
'{ "source": { "branch": "gh-pages", "path": "/" }, "build_type": "legacy" }' | gh api -X POST repos/hieutachi/cse391-k67-ai-bootcamp/pages --input -
gh api repos/hieutachi/cse391-k67-ai-bootcamp/pages --jq .status   # lặp tới khi ra: built
node build/check-live.js https://hieutachi.github.io/cse391-k67-ai-bootcamp/
```

