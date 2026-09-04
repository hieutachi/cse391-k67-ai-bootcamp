# Màu sắc, Typography & CSS Variables

## Mục tiêu bài học
- Đọc và viết màu bằng hex, rgb, hsl
- Chọn font hệ thống, đặt cỡ chữ bằng `rem` và `line-height` hợp lý
- Dùng CSS Custom Properties (`:root`, `var()`) cho design token
- Xây bộ token màu y tế của Highland Hospital

## Ba cách viết màu — dùng sao cho đúng ngữ cảnh

```css
/* HEX — gọn, phổ biến nhất khi copy từ Figma */
.color-primary { background: #0d6efd; }

/* rgb — dễ thêm độ trong suốt bằng kênh alpha */
.overlay { background: rgba(13, 110, 253, 0.12); }

/* hsl — trực quan nhất khi cần pha biến thể */
/* hue=210 (xanh), saturation=95%, lightness=53% */
.color-primary { background: hsl(210, 95%, 53%); }
.color-primary-light { background: hsl(210, 95%, 90%); } /* chỉ sửa lightness */
```

Với HSL, một màu "nhạt hơn" chỉ là tăng `lightness` — không cần đoán mã hex. Đây là lý do nhiều hệ thống token hiện đại định nghĩa màu bằng HSL/HWB rồi sinh biến thể.

## Typography — nền tảng của cảm giác "chuyên nghiệp"

Hệ font **hệ thống** tải tức thì, không tốn request, và trông tự nhiên trên từng máy:

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;          /* 1rem = 16px mặc định trình duyệt */
  line-height: 1.6;         /* không đơn vị → nhân với cỡ chữ */
}
```

Quy tắc vàng của khoá học: **cỡ chữ luôn bằng `rem`** (phụ thuộc root, không phụ thuộc cha → người dùng phóng to chữ trình duyệt thì trang vẫn co giãn đúng), và `line-height` **không viết đơn vị** — `1.6` luôn tỷ lệ với cỡ chữ hiện tại, không bao giờ bị lệch khi đổi font-size.

```css
h1 { font-size: 3rem; line-height: 1.15; }  /* tiêu đề Hero */
h2 { font-size: 2rem; line-height: 1.25; }
h3 { font-size: 1.5rem; line-height: 1.3; }
p  { font-size: 1rem; line-height: 1.7; }   /* văn bản dài thoáng hơn */
```

## CSS Custom Properties — bộ nhớ của giao diện

```css
:root {
  --hh-primary: #0b6bcb;        /* xanh dương y tế chủ đạo */
  --hh-primary-dark: #08549e;
  --hh-accent: #14b8a6;         /* xanh ngọc cho nút hành động */
  --hh-white: #ffffff;
  --hh-gray-50: #f8fafc;        /* nền nhạt xen kẽ */
  --hh-gray-500: #64748b;       /* chữ phụ */
  --hh-gray-900: #0f172a;       /* chữ chính */
  --hh-space: 1rem;             /* bước nhịp khoảng cách */
}
```

Biến CSS không phải "hằng số" của preprocessor — chúng **sống trong trình duyệt**, kế thừa theo cây DOM và đổi được lúc runtime. Khai báo ở `:root` (tức phần tử gốc `<html>`) để mọi phần tử con đều thấy. Khi dùng:

```css
.btn-primary {
  background: var(--hh-primary);
  color: var(--hh-white);
  padding: calc(var(--hh-space) * 0.75) var(--hh-space);
}
```

`var(--hh-primary, #0b6bcb)` có thêm **fallback**: nếu biến chưa được định nghĩa (ví dụ copy CSS ra ngoài), màu dự phòng được dùng — trang không bao giờ mất màu.

Lợi ích lớn nhất: đổi thương hiệu chỉ cần sửa **một dòng** trong `:root`, và làm nền cho dark mode (chương 6) bằng cách ghi đè biến theo media query.

## Prompt mẫu — nhờ AI xây bộ token chuẩn

```text
Tôi cần bộ design token màu cho website bệnh viện Highland
Hospital: chủ đạo xanh dương y tế, trắng, các bậc xám. Hãy sinh:
1) bảng 12 màu dạng CSS custom properties trong :root (primary,
primary-dark, primary-light, accent, success, warning, danger +
các bậc gray), 2) mỗi màu kèm hex, 3) gợi ý cặp chữ/nền đạt tỷ lệ
tương phản WCAG AA cho văn bản chính và phụ. Đừng viết CSS khác
ngoài khối :root.
```

## Thực hành

1. Tạo file `tokens.css` với `:root` chứa tối thiểu 10 biến màu + 3 biến khoảng cách của Highland Hospital.
2. Style lại trang Landing Page của bạn: body dùng font hệ thống, `line-height: 1.6`; h1–h3 cỡ `rem` theo nhịp nêu trên.
3. Viết class `.btn-primary` dùng `var(--hh-primary)` và một class `.text-muted` dùng `var(--hh-gray-500)`. Thử đổi giá trị biến trong `:root` — cả trang phải đổi màu theo mà không sửa chỗ khác.
4. Mở DevTools → tab Elements, chọn `<html>`, xem danh sách biến CSS trong panel Styles; thử ghi đè `--hh-primary` ngay tại đó để thấy hiệu ứng runtime.

## Bài tiếp theo

Đã có màu và chữ "đúng chuẩn", câu hỏi tiếp theo hiển nhiên: kích thước ghi bằng đơn vị nào để trang co giãn đúng ý — rem, %, vh, vw...?
