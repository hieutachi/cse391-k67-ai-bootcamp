# Lab: lưới Doctor Cards

## Mục tiêu bài học
- Dựng lưới 4 card bác sĩ Highland Hospital bằng Grid + Flexbox phối hợp
- Responsive tự nhiên không cần media query nhờ `auto-fit`/`minmax`
- Chạy vòng lặp AI: prompt → nháp → đọc hiểu từng dòng → tinh chỉnh
- Hoàn thiện sản phẩm gộp toàn bộ Chương 4 + 5

## Bối cảnh

Vùng "Đội ngũ bác sĩ" là nơi bệnh nhân chọn người khám — card cần rõ: ảnh, tên, chuyên khoa, kinh nghiệm và nút "Đặt lịch". Yêu cầu: 4 cột desktop, tự co xuống 1 cột trên mobile, card cùng hàng đồng chiều cao, nút luôn bám đáy.

## Bước 1 — HTML: một card chuẩn, lặp bốn lần

```html
<section id="doctors" class="doctors">
  <h2 class="doctors__title">Đội ngũ bác sĩ</h2>
  <p class="doctors__intro">Chuyên gia đầu ngành, đồng hành cùng bạn ở mọi giai đoạn.</p>
  <div class="doctors-grid">
    <article class="doctor-card">
      <img src="img/doctor-nguyen-minh-anh.jpg" alt="BS. Nguyễn Minh Anh" class="doctor-card__avatar">
      <h3 class="doctor-card__name">BS. Nguyễn Minh Anh</h3>
      <p class="doctor-card__specialty">Tim mạch can thiệp</p>
      <p class="doctor-card__experience">15 năm kinh nghiệm · Bệnh viện Chợ Rẫy</p>
      <a href="#booking" class="btn doctor-card__btn">Đặt lịch khám</a>
    </article>
    <!-- Lặp thêm 3 card: BS. Trần Lan Hương (Nhi), BS. Lê Quốc Bảo (Thần kinh),
         BS. Phạm Thu Ngân (Sản phụ khoa) — cùng cấu trúc -->
  </div>
</section>
```

`alt` mô tả đúng bác sĩ (không phải "ảnh 1") — vừa tốt cho SEO vừa đúng accessibility. Nút để trong thẻ `<a>` vì trỏ tới vùng đặt lịch (chưa có hành động JS).

## Bước 2 — Prompt AI

```text
Bạn là senior frontend developer. Dựng CSS cho vùng danh sách bác
sĩ Highland Hospital (HTML đính kèm, class: .doctors-grid,
.doctor-card, .doctor-card__avatar...). Ràng buộc:
- Grid lưới card: auto-fit + minmax(240px, 1fr), gap 1.5rem
- Card: nền trắng, bo góc, đổ bóng nhẹ, hover nâng lên 4px
- Avatar: ảnh vuông bo tròn 50%, căn giữa, width 96px
- Trong card dùng flex column; tên 1.25rem, specialty màu xanh
chủ đạo var(--hh-primary), experience xám nhỏ
- Nút luôn bám đáy card dù nội dung dài ngắn khác nhau
- Responsive tự nhiên, KHÔNG dùng media query
Trả CSS kèm chú thích tiếng Việt từng dòng, chỉ rõ dòng nào tạo
responsive.
```

## Bước 3 — CSS kết quả & phân tích từng dòng

```css
.doctors-grid {
  display: grid;                                   /* chuyển sang chế độ lưới */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;                                     /* khoảng cách đều 2 chiều */
}
```

Dòng thần kỳ: `auto-fit` bảo trình duyệt **tự đếm** xem bao nhiêu cột 240px vừa container; đủ chỗ 4 cột thì hiện 4, màn hình hẹp còn 1 cột thì tự xuống — toàn bộ responsive không cần một media query nào.

```css
.doctor-card {
  display: flex;               /* trong mỗi ô là flex một chiều dọc */
  flex-direction: column;
  align-items: center;         /* avatar, tên, nút... căn giữa ngang */
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.doctor-card:hover {
  transform: translateY(-4px);                     /* hover: card nhấc lên */
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}
.doctor-card__avatar {
  width: 96px; height: 96px;                       /* hộp vuông cố định */
  border-radius: 50%;                              /* bo tròn như ảnh đại diện */
  object-fit: cover;                               /* ảnh cắt gọn, không méo */
  margin-bottom: 1rem;
}
.doctor-card__name { font-size: 1.25rem; margin-bottom: 0.25rem; }
.doctor-card__specialty { color: var(--hh-primary); font-weight: 600; margin-bottom: 0.5rem; }
.doctor-card__experience {
  color: var(--hh-gray-500);
  font-size: 0.875rem;
  line-height: 1.6;
}
.doctor-card__btn { margin-top: auto; }            /* đẩy nút xuống đáy card */
```

Cơ chế "nút bám đáy": card là flex column; `margin-top: auto` trên nút ngốn toàn bộ khoảng trống phía trên nó, nên dù phần kinh nghiệm ngắn hay dài, mọi nút trong cùng hàng đều **thẳng hàng ở đáy** (nhờ các card cùng chiều cao do `align-items: stretch` mặc định của Grid).

## Bước 4 — Tinh chỉnh bằng AI

```text
Lưới doctor cards của tôi trên máy bàn hiện 3 cột thay vì 4 vì
container max-width 1100px. Đây là CSS [dán]. Tôi muốn đúng 4 cột
trên màn hình ≥ 1200px mà vẫn giữ auto-fit cho màn hình nhỏ hơn.
Đề xuất cách sửa ngắn nhất và giải thích vì sao minmax(240px,1fr)
lại tạo ra 3 cột trong container này.
```

## Thực hành

1. Dựng đủ 4 card bác sĩ theo HTML mẫu (tự chọn ảnh placeholder hoặc dùng ảnh màu đơn giản), áp CSS từng dòng như trên.
2. Kéo cửa sổ từ 320px → 1400px và ghi lại số cột hiển thị ở từng bề rộng; tìm bề rộng đúng lúc 4 cột → 3 cột và đối chiếu với `minmax(240px, 1fr)`.
3. Xóa `margin-top: auto` ở nút rồi thêm lại — quan sát đáy card lệch thế nào.
4. Chạy lại prompt ở Bước 2 với thay đổi nhỏ (card nền gradient, avatar có viền xanh) và review code AI trả về theo 4 bước của workflow.

## Bài tiếp theo

Grid đã giúp card tự xuống hàng — nhưng đó mới là responsive "tự nhiên". Chương 6 chính thức hóa Responsive Web Design: media queries, breakpoints và Mobile-First workflow để làm chủ mọi kích thước màn hình.
