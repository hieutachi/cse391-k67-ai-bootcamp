# Hình ảnh & Typography linh hoạt

## Mục tiêu bài học
- Làm cho mọi hình ảnh co giãn theo container bằng `max-width: 100%` và `height: auto`
- Dùng `object-fit` / `object-position` để cắt ảnh đúng ý mà không méo
- Viết typography linh hoạt bằng `clamp()` thay cho font-size cứng

## Hai thủ phạm làm vỡ layout trên mobile

Khi một ảnh khai `width: 800px` cứng hoặc tiêu đề `font-size: 48px`, chúng không thể co lại khi viewport hẹp — kết quả là tràn ngang, kéo theo thanh cuộn ngang cả trang. Điều trị bằng hai ý tưởng: hình ảnh **chảy theo container**, chữ **chảy theo viewport**.

## Hình ảnh linh hoạt: max-width + height auto

```css
/* Đặt một lần ở đầu file, đúng cho mọi ảnh */
img {
  max-width: 100%;
  height: auto;
}
```

Khác `width: 100%` (luôn căng bằng container, ảnh nhỏ bị phóng mờ), `max-width: 100%` cho phép ảnh **giữ kích thước gốc khi còn chỗ**, chỉ co xuống khi container hẹp hơn. `height: auto` giữ tỷ lệ, tránh ảnh bị bẹp.

Với ảnh trang trí trong Hero Highland Hospital, bạn thường muốn ảnh **lấp đầy một khung có sẵn** thay vì đẩy layout theo kích thước của nó:

```css
.doctor-photo {
  width: 100%;
  height: 240px;          /* khung cố định, đẹp cho lưới card */
  object-fit: cover;      /* cắt phần thừa để lấp đầy, không méo */
  object-position: center top; /* ưu tiên giữ vùng mặt (trên cùng) */
  border-radius: 12px;
}
```

Phân biệt nhanh: `object-fit: cover` cắt ảnh để lấp khung (dùng khi ảnh minh hoạ); `object-fit: contain` thu ảnh cho vừa khung, phần thừa để trống (dùng khi ảnh là sơ đồ, logo cần nhìn đủ). `object-position` quyết định phần nào của ảnh được giữ lại khi bị cắt — với ảnh chân dung bác sĩ, luôn ưu tiên phần khuôn mặt.

## Typography linh hoạt bằng clamp()

Muốn tiêu đề to trên desktop, nhỏ trên mobile — nhưng không muốn viết ba lần font-size trong ba media query? Hàm `clamp()` gói cả ba giá trị vào một dòng:

```css
.hero-title {
  /* font-size: clamp(MIN, ƯU TIÊN, MAX) */
  font-size: clamp(1.75rem, 5vw + 0.5rem, 3.5rem);
}
```

Đọc là: tối thiểu 1.75rem, lý tưởng 5vw + 0.5rem (co giãn theo viewport), tối đa 3.5rem. Với chữ, dùng `rem` cho hai đầu còn `vw` cho giá trị giữa — nếu để `vw` thuần (ví dụ `font-size: 6vw`), chữ sẽ phóng to vô hạn trên màn hình rộng và nhỏ không đọc nổi trên màn hình hẹp. `clamp()` chính là chiếc phanh hai đầu.

Ví dụ một bộ chữ cho toàn trang Highland Hospital:

```css
:root {
  --fs-hero: clamp(1.9rem, 4.5vw + 0.6rem, 3.4rem); /* tiêu đề hero */
  --fs-h2:   clamp(1.4rem, 2vw + 0.6rem, 2rem);     /* tiêu đề section */
  --fs-body: clamp(1rem, 1vw + 0.6rem, 1.125rem);   /* thân bài */
}

.hero-title { font-size: var(--fs-hero); }
.section-title { font-size: var(--fs-h2); }
.hero-sub { font-size: var(--fs-body); }
```

`clamp()` cũng dùng tốt cho khoảng cách: `padding: clamp(1rem, 4vw, 3rem)` giúp các section "thở" đều trên mọi màn hình.

## Prompt mẫu: sinh bộ typography linh hoạt

```text
Tôi đang dựng trang chủ Highland Hospital bằng CSS thuần. Nội dung:
1 tiêu đề hero ngắn (có thể 2 dòng), 1 đoạn giới thiệu 2-3 dòng, tiêu đề
section "Dịch vụ nổi bật", và chữ cho card dịch vụ.
Hãy đề xuất hệ thống font-size bằng clamp() cho 4 cấp này: giá trị min phù
hợp đọc trên iPhone (viewport 360px), max không vượt quá 3.5rem, giá trị
giữa dùng vw. Trả kèm :root biến CSS. Giải thích một dòng cho mỗi cấp.
```

## Thực hành

- Thêm luật `img { max-width: 100%; height: auto; }` vào file CSS chung.
- Với ảnh bác sĩ trong lưới Doctor Cards, cho mỗi ảnh khung `height: 240px` + `object-fit: cover` và thử đổi `object-position` để giữ khuôn mặt.
- Thay toàn bộ `font-size` cứng trong Hero bằng biến `clamp()` trong `:root`.

## Bài tiếp theo

Trang đã co giãn đúng trên mọi màn hình — bài sau thêm sức sống: chuyển động mượt với `transition`, `transform` và `@keyframes`, kèm tôn trọng người dùng thích chuyển động ít (`prefers-reduced-motion`).
