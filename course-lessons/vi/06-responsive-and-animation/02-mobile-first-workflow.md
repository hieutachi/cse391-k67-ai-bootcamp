# Mobile-First Workflow

## Mục tiêu bài học
- Hiểu khái niệm mobile-first: viết CSS nền cho màn hình nhỏ trước, phóng to dần sau
- Giải thích được ba lý do chiến lược khiến mobile-first thắng desktop-first
- Chuyển một đoạn CSS desktop-first sang mobile-first với sự trợ giúp của AI

## Mobile-first nghĩa là gì

Có hai cách tổ chức CSS responsive:

- **Desktop-first**: viết layout hoàn chỉnh cho màn hình rộng, rồi dùng `@media (max-width: ...)` để "vá" lại cho màn hình nhỏ.
- **Mobile-first**: viết CSS tối giản cho màn hình hẹp trước, rồi dùng `@media (min-width: ...)` để **nâng cấp dần** khi màn hình rộng ra.

Cùng một kết quả — menu trên desktop xếp ngang, trên mobile bị giấu — viết hai kiểu sẽ khác hẳn nhau:

```css
/* --- DESKTOP-FIRST: viết to trước, "sửa" nhỏ sau --- */
.header-nav { display: flex; justify-content: space-between; }
.header-nav .menu { display: flex; gap: 1rem; }

@media (max-width: 767.98px) {
  .header-nav { display: block; }
  .header-nav .menu { display: none; } /* vô hiệu hoá luật desktop */
}
```

```css
/* --- MOBILE-FIRST: viết nhỏ trước, "thêm" to sau --- */
.header-nav { display: block; }
.header-nav .menu { display: none; } /* mặc định: ẩn, JS sẽ mở khi bấm nút */

@media (min-width: 768px) {
  .header-nav { display: flex; justify-content: space-between; }
  .header-nav .menu { display: flex; gap: 1rem; }
}
```

Chú ý sự khác biệt về tư duy: desktop-first **gỡ bỏ** khả năng đã có; mobile-first chỉ **thêm** khả năng mới. Bản mobile-first khớp với bản năng của CSS hơn — luật mặc định là "sự thật" cho mọi màn hình, media query chỉ là lớp gia cố.

## Vì sao mobile-first thắng

1. **Đúng với người dùng thật.** Trang Highland Hospital phần lớn khách truy cập từ điện thoại — họ tìm giờ khám, bấm nút đặt lịch ngay trên màn hình nhỏ. Nếu trải nghiệm mobile chỉ là "bản desktop bị vá", họ sẽ là người chịu thiệt.
2. **Ràng buộc là người thầy tốt.** Bắt đầu từ 360px, bạn buộc phải hỏi: điều gì quan trọng nhất với bệnh nhân? Số điện thoại đặt lịch phải nổi bật, chuyên khoa phải dễ thấy — còn slogan dài có thể cắt. Khoảng hẹp ép bạn ưu tiên nội dung.
3. **CSS ngắn hơn, ít lỗi hơn.** Với `min-width`, mỗi media query chỉ thêm vài dòng thay đổi nhỏ. Với `max-width`, muốn sửa trên màn hình nhỏ bạn phải ghi đè từng thuộc tính desktop đã đặt — vừa dài vừa dễ quên một thuộc tính, sinh ra chiến tranh cascade.

## Prompt mẫu: chuyển desktop-first sang mobile-first

Quy trình an toàn: dán CSS cũ + mô tả kết quả hiển thị, yêu cầu AI viết lại theo mobile-first, đồng thời **giữ nguyên tên class và hành vi**.

```text
Đây là CSS desktop-first của khối "Đặt lịch nhanh" trên trang Highland
Hospital: lưới 3 cột khi màn hình rộng, xếp dọc khi hẹp (ảnh chụp kèm).

/* [Dán CSS desktop-first của bạn vào đây] */

Viết lại theo mobile-first: luật cơ bản dành cho màn hình dưới 768px
(xếp dọc, nút đặt lịch toàn chiều rộng), sau đó @media (min-width: 768px)
bật lưới 2 cột, @media (min-width: 992px) chuyển sang 3 cột và tăng
khoảng cách. Giữ nguyên tên class, màu sắc, font-size. Kèm một dòng
giải thích cho từng khối CSS.
```

Khi nhận câu trả lời, đừng bê nguyên vào file. So sánh hai bản xem hành vi nào bị đổi, đặc biệt các thuộc tính "biến mất" khi lật ngược hướng query — đó là chỗ AI hay sót. Đã hiểu từng dòng rồi mới thay thế, đúng bước 4 "Tinh chỉnh & Tối ưu".

## Thứ tự viết file CSS theo mobile-first

```css
/* 1. Reset + biến + kiểu nền (áp dụng cho mọi màn hình) */
:root { --brand: #0d6efd; --space: 1rem; }
* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.6; }

/* 2. Layout mặc định — chính là trải nghiệm mobile */
.doctor-grid { display: block; }
.booking-form label { display: block; margin-top: var(--space); }

/* 3. Nâng cấp dần theo min-width, tăng dần mốc */
@media (min-width: 768px) {
  .doctor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
}

@media (min-width: 992px) {
  .doctor-grid { grid-template-columns: repeat(4, 1fr); }
}
```

Quy tắc vàng để nhớ: **`min-width` đi cùng mobile-first, `max-width` đi cùng desktop-first**. Trong một dự án chỉ dùng một hướng — trộn hai hướng là cách nhanh nhất để có một file CSS không ai dám đụng vào.

## Thực hành

- Mở lại Hero hoặc lưới Doctor Cards ở Chương 5, xác định nó đang viết theo hướng nào.
- Nếu là desktop-first, dùng prompt ở trên để AI viết lại theo mobile-first, rồi tự review và thay thế.
- Kiểm tra bằng Responsive Mode: trang phải đẹp sẵn ở 360px mà không cần một media query nào "vá lỗi".

## Bài tiếp theo

Đã có nền tảng responsive đúng hướng — bài sau xử lý hai thành phần hay vỡ nhất trên màn hình nhỏ: hình ảnh và chữ, với `max-width: 100%` và hàm `clamp()`.
