# Frontend Coding Standards — Highland Hospital

Quy ước dùng chung cho mọi mã nguồn trong khoá học. Copy sang dự án thật của bạn và điều chỉnh.

## HTML

- Luôn khai báo `<!DOCTYPE html>`, `<html lang="vi">`, `meta charset` và `meta viewport`.
- Dùng thẻ semantic đúng vai trò: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` — không bọc mọi thứ bằng `<div>`.
- Heading theo bậc, không nhảy từ `h1` xuống `h3`.
- Mọi `img` có `alt` mô tả; mọi `input`/`select`/`textarea` có `label` liên kết (`for`/`id`).
- Nút hành động dùng `<button>` (không phải `<a>` không có `href`); link điều hướng dùng `<a>`.
- Comment HTML đánh dấu đầu mỗi khối lớn: `<!-- ===== HERO ===== -->`.

## CSS

- Nạp CSS tự viết SAU link Bootstrap để override đúng thứ tự ưu tiên.
- Không dùng `!important` trừ trường hợp override component Bootstrap thật sự cần.
- Đặt design token vào biến CSS trong `:root`: màu `--hh-*`, spacing bội số `0.25rem`.
- Đơn vị: `rem` cho font-size và spacing; `%` cho width; `vh/vw` cho vùng full-screen; tránh px cứng cho chữ.
- Không inline style trong HTML — dùng class.
- Ưu tiên Bootstrap utilities trước; chỉ viết CSS riêng khi utility không làm được.

## JavaScript (ES6+)

- Không dùng `var` — chỉ `const` (mặc định) và `let` (khi cần gán lại).
- Dùng arrow function, template literal, destructuring.
- Tên hàm/hằng: camelCase; hằng dữ liệu tĩnh: `doctors`, `appointments`.
- Tách "hàm thuần sinh HTML" (`doctorCard(doctor)`) với "hàm render DOM" (`renderDoctors(list)`).
- Sự kiện trên danh sách động: event delegation trên container, đọc `data-id` từ `event.target.closest()`.
- Dữ liệu người dùng chỉ đưa vào DOM bằng `textContent`/`createElement` — KHÔNG nhúng vào `innerHTML`/template literal (chống XSS).
- Gọi API dùng `async/await` + `try/catch`; luôn có trạng thái loading và thông báo lỗi.
- Lưu mảng/object vào `localStorage` bằng `JSON.stringify`, đọc bằng `JSON.parse` trong `try/catch`.

## Bootstrap 5

- Dùng CDN `bootstrap@5.3` và bundle JS (`bootstrap.bundle.min.js`) khi dùng Navbar toggler, Modal, Offcanvas, Accordion, Dropdown, Toast.
- Grid: `container` > `row` > `col-*`; thiết kế mobile-first (bắt đầu `col-12`, tăng dần `col-md-*`, `col-lg-*`).
- Nút: `btn btn-primary` cho hành động chính; `btn-outline-*` cho hành động phụ.
- Form validate: dùng class `was-validated`, `is-invalid`, `invalid-feedback` của Bootstrap.

## Accessibility & Responsive

- Kiểm tra ở 4 bề rộng: 320px, 768px, 1024px, 1440px (Device Toolbar).
- Độ tương phản chữ/ nền đạt WCAG AA (kiểm tra bằng Lighthouse).
- Focus visible rõ ràng khi điều hướng bằng bàn phím.
- Tôn trọng `prefers-reduced-motion`.
