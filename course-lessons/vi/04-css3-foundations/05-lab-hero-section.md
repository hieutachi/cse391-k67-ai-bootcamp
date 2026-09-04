# Lab: dựng Hero section

## Mục tiêu bài học
- Vận dụng toàn bộ chương 4 vào một sản phẩm thật: Hero Highland Hospital
- Thực hành vòng lặp AI-Accelerated: prompt AI → nhận nháp → đọc hiểu → tinh chỉnh tay
- Đọc và giải thích được từng dòng CSS trong kết quả cuối cùng

## Bối cảnh & ràng buộc

Hero là khung hình đầu tiên bệnh nhân thấy: nền gradient xanh y tế (hoặc ảnh), tiêu đề lớn, mô tả ngắn, nút CTA "Đặt lịch khám". Yêu cầu lab: HTML semantic, CSS thuần viết tay, áp dụng Box Model + `box-sizing`, đơn vị `rem`/`%`/`vh`, màu lấy từ CSS Variables.

## Bước 1 — HTML: dựng khung trước

```html
<main>
  <section class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">Highland Hospital · 25 năm đồng hành</p>
      <h1 class="hero__title">Chăm sóc sức khỏe<br>cho cả gia đình bạn</h1>
      <p class="hero__subtitle">Đội ngũ 120+ bác sĩ chuyên khoa đầu ngành,
        đặt lịch khám trực tuyến trong 2 phút.</p>
      <div class="hero__actions">
        <a href="#booking" class="btn btn--primary">Đặt lịch khám</a>
        <a href="#doctors" class="btn btn--ghost">Xem đội ngũ bác sĩ</a>
      </div>
    </div>
  </section>
</main>
```

(Đoạn trên nằm trong file `index.html` chuẩn bạn dựng ở chương 3 — nhớ giữ `<!DOCTYPE html>`, `<meta name="viewport">` và liên kết file CSS.)

## Bước 2 — Prompt AI lấy bản nháp

```text
Bạn là senior frontend developer. Dựng CSS cho Hero section bệnh
viện Highland Hospital với HTML đính kèm (class: .hero,
.hero__content, .hero__title...). Ràng buộc:
- Nền linear-gradient xanh dương y tế, không cần ảnh
- Chữ trắng; tiêu đề ~3rem; mô tả ~1.125rem, độ trong suốt 90%
- min-height 100vh, nội dung căn giữa theo chiều dọc
- Nút .btn--primary nền trắng chữ xanh, .btn--ghost viền trắng mờ
- Dùng box-sizing border-box, đơn vị rem/%, màu qua biến
var(--hh-*); trả về CSS KÈM chú thích tiếng Việt từng dòng.
```

## Bước 3 — CSS kết quả & đọc từng dòng

```css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --hh-primary: #0b6bcb;
  --hh-primary-dark: #08549e;
  --hh-white: #ffffff;
}
.hero {
  min-height: 100vh;                 /* chiếm trọn màn hình đầu */
  display: flex;                     /* bật flex để căn giữa dọc */
  align-items: center;               /* content nằm giữa theo chiều dọc */
  padding: 4rem 1.5rem;              /* tránh chạm mép trên mobile */
  background: linear-gradient(135deg, var(--hh-primary) 0%, var(--hh-primary-dark) 100%);
  color: var(--hh-white);
}
.hero__content { max-width: 640px; } /* dòng chữ không quá dài */
.hero__eyebrow {
  font-size: 0.875rem;
  letter-spacing: 0.12em;            /* chữ in hoa cách dãn */
  text-transform: uppercase;
  opacity: 0.85;                     /* phụ so với tiêu đề */
  margin-bottom: 1rem;
}
.hero__title {
  font-size: clamp(2.25rem, 6vw, 3.5rem);  /* co giãn giữa hai cận */
  line-height: 1.15;
  margin-bottom: 1.5rem;
}
.hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 2rem;               /* Box Model: đẩy khối nút xuống */
}
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn {
  display: inline-block;
  padding: 0.8rem 1.75rem;           /* Box Model: hộp bấm thoải mái */
  border-radius: 999px;              /* hình viên thuốc */
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn--primary { background: var(--hh-white); color: var(--hh-primary); }
.btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.5);  /* viền mờ, không fill */
  color: var(--hh-white);
}
.btn:hover { transform: translateY(-2px); }     /* phản hồi nhẹ khi trỏ */
```

Ba chi tiết đáng nhớ: (1) `clamp(2.25rem, 6vw, 3.5rem)` cho cỡ chữ co giãn giữa hai cận — chương 6 sẽ đào sâu; (2) nút CTA nền trắng là điểm tương phản duy nhất để mắt dừng đúng chỗ thiết kế muốn; (3) khoảng cách dọc chỉ đặt một chiều (`margin-bottom`) — tránh margin collapse đã học.

## Bước 4 — Tinh chỉnh bằng câu hỏi đúng

```text
Hero của tôi trên iPhone vẫn thừa khoảng trống phía dưới và chữ
eyebrow bị xuống dòng. CSS hiện tại: [dán]. Hãy chỉ ra vấn đề
thuộc đơn vị hay spacing nào và đề xuất tối đa 3 dòng sửa.
```

## Thực hành

1. Tự viết prompt mô tả hero *bằng lời của bạn* (nền ảnh thay gradient, tiêu đề khác), nhận CSS từ AI rồi áp 4 bước: Define → Draft → Analyze → Refine.
2. Đối chiếu code AI trả về với code mẫu; tô highlight chỗ chưa hiểu và hỏi AI giải thích.
3. DevTools: tab Computed của `.btn--primary` có đúng `border-box` không? Đổi `--hh-primary` trong `:root` → cả hero đổi màu.
4. Kéo cửa sổ xuống 320px: chữ có tràn, nút có chồng nhau không? Sửa bằng `flex-wrap` và `clamp`.

## Bài tiếp theo

Hero đã đứng vững — nhưng để căn giữa nó bạn mới chạm tay vào Flexbox. Chương 5 bắt đầu với Flexbox căn bản: trục chính, trục chéo và cách dàn thanh nav cùng hàng nút CTA.
