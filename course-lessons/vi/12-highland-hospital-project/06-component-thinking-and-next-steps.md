# Tư duy component & hướng đi tiếp theo

## Mục tiêu bài học
- Nhìn lại dự án Highland dưới góc **component**: cái gì lặp lại thì gom thành một khối tái dùng
- Ánh xạ những gì đã viết sang khái niệm `props` / `state` của React, Vue, Angular
- Nắm roadmap học tiếp: Tailwind, React/Vue, TypeScript, Vite — và biết chọn gì trước
- Deploy dự án lên GitHub Pages / Vercel; dùng AI có trách nhiệm

## Nhìn lại: bạn đã viết component mà không hề hay biết

Đi qua bài 02–05, bạn đã vô tình lặp lại một công việc nhiều lần: **sinh HTML từ dữ liệu bằng hàm và dán vào trang**. Đó chính là bản năng component. Soi lại dự án:

| Thứ bạn đã viết | Đúng chất là một… | Vì sao |
|---|---|---|
| Hàm `doctorCardHTML(d)` | Component **DoctorCard** | Nhận 1 bác sĩ, trả về 1 thẻ — dùng lại cho cả grid, cả bộ lọc |
| Hàm `rowHTML(a)` | Component **AppointmentRow** | Nhận 1 lịch hẹn, trả về 1 hàng bảng |
| `<nav>` dùng chung ý tưởng ở 3 trang | Component **Navbar** | Cùng cấu trúc, khác link active — chỉ khác nhau ở "đầu vào" |
| `renderDoctors(list)` + `applyFilters()` | Phần **state-driven render** | Giao diện = hàm số của dữ liệu: `UI = f(state)` |
| `data.js` (doctors, appointments) | **Nguồn dữ liệu (data layer)** | Tách khỏi giao diện để sau này thay bằng API không đụng HTML |

Một component chỉ là: **một khối giao diện + dữ liệu đầu vào + hành vi riêng của nó**, và phải **tái dùng được**. Bạn đã viết ít nhất 4–5 component bằng JS thuần — framework chỉ là cách đóng gói lại chúng gọn gàng hơn.

## props và state — khái niệm bạn đã dùng

Hai từ framework nào cũng xoay quanh, thực ra là thứ bạn đã làm:

**Props = đầu vào từ bên ngoài.** `doctorCardHTML(d)` nhận `d` — đó là props. Navbar nhận "trang nào đang mở" để tô link active — cũng là props. Đặc tính của props: component **không tự sửa** đầu vào của mình.

**State = dữ liệu nội bộ mà component tự quản và thay đổi được.** `filters.status` trong admin.js, `activeSpecialty` trong main.js, và chính mảng `appointments` — tất cả là state. Mỗi lần state đổi, bạn **gọi lại hàm render**; framework làm việc đó tự động và chỉ sửa đúng phần thay đổi:

```js
// Bạn đã viết (JS thuần, bài 04) —        // React viết gần như cùng ý tưởng:
let appointments = loadAppointments();      const [appointments, setAppointments] = useState(loadAppointments);
function renderMetrics(list) { ... }        // gọi setAppointments(...) là giao diện tự render lại
function renderTable(list) { ... }          // React so sánh và chỉ cập nhật phần khác (Virtual DOM)
```

```js
// Vue — cùng một doctor card:
// <DoctorCard v-for="d in filteredDoctors" :doctor="d" @book="openModal" />
```

```js
// Angular — template + component class:
// @Component({ selector: 'app-doctor-card', ... }) + *ngFor="let d of filtered"
```

Cả ba framework đều chung một câu thần chú: **"giao diện là hàm của state"** — và bạn đã thực hành nguyên tắc đó bằng tay suốt chương 12.

## Roadmap học tiếp — đi theo thứ tự này

Không học tất cả cùng lúc. Lộ trình gợi ý cho người vừa xong khoá này:

**1. Tailwind CSS (1–2 tuần)** — Bootstrap dạy bạn dùng class có sẵn; Tailwind dạy bạn *tự dựng* design system bằng utility class. Học xong bạn hiểu sâu hơn vì sao Bootstrap thiết kế như vậy. Làm lại giao diện Highland bằng Tailwind để so sánh.

**2. Một framework UI — React trước (3–4 tuần)** — React đang phổ biến nhất ở thị trường Việt Nam và có hệ sinh thái việc làm rộng nhất. Học theo đúng thứ tự: JSX → component + props → state & sự kiện → `useEffect` (thay cho `DOMContentLoaded` + fetch) → `useState` quản lý form. **Chuyển thẳng dự án Highland sang React** — đây là bài tập tốt nhất vì bạn đã biết rõ yêu cầu.

**3. TypeScript (2 tuần, học song song React)** — thêm kiểu cho `doctors`, `appointments`, `status`. Lỗi "`a.status` không tồn tại" sẽ bị bắt **trước khi chạy**, thay vì lúc 2 giờ sáng bạn mò trong Console.

**4. Vite (vài ngày)** — công cụ chạy dự án hiện đại: dev server nhanh, build tối ưu sẵn. Khi tạo dự án React hãy dùng lệnh `npm create vite@latest` — nó cài sẵn React + (tuỳ chọn) TypeScript.

Sau đó, học theo nhu cầu công việc: **Next.js** (React cho web hoàn chỉnh), **Vue/Nuxt** nếu công ty dùng Vue, hoặc **React Native** nếu rẽ sang mobile.

## Deploy: đưa Highland Hospital lên mạng

Dự án tĩnh (3 file HTML + CSS + JS) deploy được ngay bằng 2 cách miễn phí:

### Cách 1 — GitHub Pages (5 phút, không cần cài gì)

1. Đẩy thư mục `highland-hospital/` lên một repository GitHub (nhớ có `README.md`).
2. Vào repo → **Settings → Pages** → mục *Build and deployment* chọn *Deploy from a branch* → chọn nhánh `main` + thư mục `/root` → **Save**.
3. Đợi ~1 phút, trang của bạn sống tại `https://<username>.github.io/<repo-name>/`.

### Cách 2 — Vercel (nhanh hơn, dùng được cả cho React sau này)

1. Vào [vercel.com](https://vercel.com), đăng nhập bằng GitHub.
2. **Add New → Project** → chọn repo Highland → Vercel tự nhận dạng dự án tĩnh → **Deploy**.
3. Mỗi lần `git push` lên nhánh chính, Vercel tự deploy bản mới.

Lưu ý duy nhất: `localStorage` là dữ liệu **trên máy từng người dùng** — sau khi deploy, lịch hẹn bạn tạo ở máy mình không xuất hiện trên máy người khác. Đó là giới hạn cố ý của dự án frontend-only; khi học backend/API (hoặc dùng `json-server` như chương 11), bạn sẽ thay tầng lưu trữ này bằng server thật.

## Dùng AI có trách nhiệm — sau khoá này

Bạn đã dùng AI suốt 12 chương. Giờ là lúc chốt lại bộ quy tắc để làm việc lâu dài:

- **Hiểu trước khi giữ lại** — chưa bao giờ commit code AI sinh ra mà bạn không đọc hiểu từng dòng. Nếu không giải thích được, đừng merge.
- **Review bằng mắt thật, không chỉ bằng mắt AI** — AI không nhìn thấy trang render. Bạn mở trình duyệt, bạn bấm thử, bạn là người cuối cùng chịu trách nhiệm.
- **Chia nhỏ prompt, kiểm tra từng bước** — xin AI dựng từng section, từng hàm, thay vì "viết cả website". Lỗi nhỏ dễ tìm hơn lỗi to.
- **Đừng hỏi AI trước khi tự thử 10 phút** — khoảng cách giữa bản của bạn và bản AI là bài học nhanh nhất.
- **Cẩn trọng với dữ liệu nhạy cảm** — không dán mã nguồn nội bộ, mật khẩu hay dữ liệu bệnh nhân thật vào prompt công khai.

> *AI giúp bạn viết nhanh hơn. Chỉ có bạn mới giúp sản phẩm đúng, an toàn và đáng tin.*

## Thực hành (bài cuối)

1. Lập bảng liệt kê mọi component trong dự án của bạn (navbar, doctor-card, appointment-row, metrics-card, footer…) và ghi rõ: props là gì, state là gì.
2. Viết lại `doctorCardHTML` theo phong cách JSX của React (không cần chạy, chỉ để thấy sự giống nhau).
3. Deploy dự án lên GitHub Pages hoặc Vercel, gửi link cho một người bạn mở thử trên điện thoại.
4. Viết 3 mục tiêu học tiếp theo của bạn (ví dụ: *"Tuần tới làm lại Landing bằng Tailwind"*, *"Tháng sau chuyển Admin Dashboard sang React + TypeScript"*) và dán vào đầu file `README.md` của dự án.

## Chúc mừng!

Bạn vừa đi hết một hành trình dài. Nhìn lại những gì bạn làm được:

- ✅ Viết HTML5 chuẩn ngữ nghĩa, cấu trúc rõ ràng cho một website 3 trang
- ✅ Dàn trang chuyên nghiệp bằng Bootstrap 5 — grid, components, utilities, responsive
- ✅ Lập trình JavaScript ES6+: render dữ liệu, filter, sự kiện, `localStorage`, modal
- ✅ Phân tích thiết kế thành spec, dùng AI dựng nhanh và **tự review được output**
- ✅ Tối ưu hiệu năng và accessibility tới mức Lighthouse ≥ 90
- ✅ Xây một sản phẩm hoàn chỉnh: Landing Page + đặt lịch + Admin Dashboard + deploy

Bạn không chỉ biết code — bạn biết **quy trình**: phân tích → soạn thảo với AI → thấu hiểu → tinh chỉnh. Đó là thứ giúp bạn làm việc nhanh gấp 3–5 lần mà vẫn giữ chất lượng.

Highland Hospital đã sẵn sàng lên mạng. Còn bạn — hãy đem bộ kỹ năng này đi xây dựng dự án tiếp theo của chính mình. Chúc mừng bạn tốt nghiệp! 🎉
