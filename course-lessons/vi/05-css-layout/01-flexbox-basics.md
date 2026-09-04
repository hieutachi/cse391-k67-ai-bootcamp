# Flexbox căn bản

## Mục tiêu bài học
- Hiểu mô hình trục chính (main-axis) và trục chéo (cross-axis)
- Dùng `justify-content`, `align-items`, `flex-direction`, `gap`, `flex-wrap` thành thạo
- Dàn thanh nav và hàng nút CTA Highland Hospital chỉ bằng vài dòng CSS

## Một chiều — ý tưởng cốt lõi của Flexbox

Flexbox sắp xếp phần tử con theo **một trục**. Hiểu hai trục là hiểu 90% Flexbox:

```
   main-axis (mặc định: ngang, trái → phải)
   ─────────────────────────────────────────────►
 ┌────────────────────────────────────────────────┐
 │  justify-content: căn theo trục CHÍNH          │◄── flex-start ──┐
 │  [con]  [con]  [con]           ┌───────────┐   │◄── center ──────┤
 │                                │ align-items│  │◄── flex-end ────┤
 │                                │ căn trục CHÉO│                  │
 │                                └───────────┘   │                 │
 │                                (cross-axis: dọc)                │
 └────────────────────────────────────────────────┘
```

Mặc định `flex-direction: row`: trục chính nằm ngang, trục chéo thẳng đứng. Khi đổi thành `column`, hai trục hoán đổi — mọi thứ bạn học về hai thuộc tính căn chỉnh vẫn đúng, chỉ đổi vai.

## Các thuộc tính cốt lõi

```css
.nav {
  display: flex;              /* con trở thành flex item, nằm một hàng */
  justify-content: space-between; /* đẩy 2 đầu: logo trái, menu phải */
  align-items: center;        /* căn giữa theo chiều dọc */
  gap: 1.5rem;                /* khoảng cách đều GIỮA các con (không dùng margin) */
}
```

```css
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
```

- `justify-content`: phân phối dọc theo **trục chính** — `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.
- `align-items`: căn theo **trục chéo** — `stretch` (mặc định, con kéo dãn lấp trục chéo), `center`, `flex-start`, `flex-end`.
- `flex-wrap: wrap`: cho phép con xuống hàng khi không đủ chỗ — bắt buộc có nếu số phần tử không cố định.
- `gap`: khoảng cách giữa các con; hoạt động cả hai chiều khi wrap, thay thế mẹo `margin` lẻ.

## Thanh nav Highland Hospital

```html
<nav class="navbar">
  <a href="#" class="navbar__brand">🏥 Highland Hospital</a>
  <ul class="navbar__menu">
    <li><a href="#services">Dịch vụ</a></li>
    <li><a href="#doctors">Bác sĩ</a></li>
    <li><a href="#booking">Đặt lịch</a></li>
  </ul>
  <a href="tel:1900-1234" class="navbar__hotline">1900 1234</a>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between; /* brand trái, menu giữa, hotline phải */
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--hh-white);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.navbar__menu {
  display: flex;      /* bản thân menu cũng là một flex container */
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;         /* reset margin/padding mặc định của ul */
}

.navbar__menu a { text-decoration: none; color: var(--hh-gray-900); }
.navbar__menu a:hover { color: var(--hh-primary); }
```

Chú ý: một phần tử vừa là **flex item** (`.navbar__menu` là con của `.navbar`) vừa là **flex container** (nó chứa các `<li>`). Cấu trúc lồng nhau này là hình mẫu điển hình — flexbox hoạt động theo từng cặp cha-con, không "xuyên" qua nhiều tầng.

## Prompt mẫu — dựng nav bằng AI

```text
Dùng Flexbox dựng thanh nav cho Highland Hospital, HTML đính kèm.
Ràng buộc: logo trái, 3 liên kết giữa, số hotline phải; căn giữa
theo chiều dọc; menu là flex, gap 1.5rem; khi màn hình < 640px thì
các liên kết ẩn đi (chưa cần hamburger). Viết CSS ngắn kèm chú
thích tiếng Việt cho justify-content, align-items, gap.
```

## Thực hành

1. Mở trang Highland Hospital, thêm class `.navbar` vào thanh điều hướng bạn đã dựng ở chương 3, áp dụng CSS mẫu.
2. Thực hành căn giữa tuyệt đối: `.hero__content` trong `.hero` dùng `display: flex; align-items: center; justify-content: center;` và so sánh với cách ở bài 05 (chỉ căn dọc).
3. Lần lượt đổi `flex-direction: column` cho `.hero__actions`, rồi đổi `justify-content` thành `flex-end`/`space-evenly` — quan sát mỗi lần thay đổi trục.
4. Thêm 5 nút vào hàng CTA và bỏ `flex-wrap: wrap` — xem điều gì xảy ra ở màn hình hẹp, rồi thêm lại `wrap`.

## Bài tiếp theo

Đã biết cách "xếp hàng" các phần tử, giờ đến sức mạnh thật sự: flex-grow/shrink/basis để con tự co giãn chia không gian — giải bài toán hàng card bằng chiều cao và nav đẩy nút sang phải.
