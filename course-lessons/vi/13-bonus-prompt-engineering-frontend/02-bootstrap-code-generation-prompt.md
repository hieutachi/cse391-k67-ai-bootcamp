# Bonus — Sinh code Bootstrap 5 từ đặc tả Figma

## Mục tiêu bài học
- Biết khung prompt chuẩn biến đặc tả giao diện thành code Bootstrap 5 dùng được ngay
- Nắm các ràng buộc quan trọng (design token, responsive, semantic, không CSS thừa)
- Phân biệt "prompt sinh code tốt" và "prompt sinh code phải sửa nhiều"

## Từ đặc tả đến code

Bài trước bạn đã có đặc tả 5 mục từ khung phân tích Figma. Bài này dạy cách dán đặc tả đó vào một khung prompt sinh code — với các ràng buộc giúp AI không tự bịa.

## Khung prompt chuẩn sinh code Bootstrap

```text
Bạn là Senior Frontend Developer. Dựa vào ĐẶC TẢ bên dưới, sinh code HTML hoàn chỉnh
cho một section, dùng Bootstrap 5.3 (CDN). Tuân thủ tuyệt đối:

1. THẺ NGỮ NGHĨA: chọn thẻ đúng vai trò (section/article/header/footer...);
   heading đúng bậc (h2 cho section, h3 cho card bên trong).
2. GRID: container → row → col; mobile-first: col-12 mặc định, tăng dần col-md-*, col-lg-*;
   gutter dùng g-*; không dùng inline style.
3. DESIGN TOKEN: màu dùng --hh-primary #0f766e, --hh-dark #0f172a, --hh-light #f0fdfa,
   --hh-border #e2e8f0, --hh-muted #475569; chữ/background bằng class Bootstrap
   (text-*, bg-*, border-*) hoặc CSS biến khi cần.
4. KHÔNG VIẾT CSS RIÊNG: nếu phải override, đánh dấu bằng comment "CUSTOM" kèm lý do.
5. TRẠNG THÁI: khai báo đủ hover/focus/disabled; input có is-invalid + invalid-feedback.
6. NỘI DUNG: dùng nội dung tiếng Việt mẫu hợp lý cho bệnh viện; ảnh dùng placeholder
   https://placehold.co/600x400/0f766e/white?text=... với alt mô tả.
7. ĐẦU RA: chỉ trả về mã HTML của section, có comment HTML đánh dấu từng khối,
   KHÔNG giải thích, KHÔNG bọc toàn bộ bằng code block nếu không cần.

ĐẶC TẢ:
[mục 1–5 ở bài 01, hoặc mô tả chi tiết section của bạn]
```

## Ví dụ: sinh section Doctors từ đặc tả

Đặc tả: *"Section danh sách bác sĩ, nền --hh-light. Hàng 4 cột trên desktop (col-lg-4 = 3 cột với container rộng? — đúng: dùng col-xl-3 cho 4 cột), card gồm ảnh, tên, chuyên khoa, badge kinh nghiệm, nút Đặt lịch full-width. Hover: card nổi lên nhẹ, nút chuyển màu đậm hơn."*

Sau khi dán khung chuẩn + đặc tả, code AI trả về thường có dạng:

```html
<!-- ===== DOCTORS SECTION ===== -->
<section class="py-5 bg-light" id="doctors">
  <div class="container">
    <h2 class="text-center mb-4">Đội ngũ bác sĩ</h2>
    <div class="row g-4">
      <!-- Card bác sĩ -->
      <div class="col-12 col-md-6 col-xl-3">
        <article class="card h-100 shadow-sm border-0">
          <img src="https://placehold.co/600x400/0f766e/white?text=BS.+Nguy%E1%BB%85n+V%C4%83n+An" class="card-img-top" alt="BS. Nguyễn Văn An">
          <div class="card-body text-center">
            <h3 class="h5 card-title">BS. Nguyễn Văn An</h3>
            <p class="card-text text-muted mb-2">Nội tổng hợp</p>
            <span class="badge text-bg-primary mb-3">12 năm kinh nghiệm</span>
            <div class="d-grid">
              <a href="booking.html" class="btn btn-primary">Đặt lịch</a>
            </div>
          </div>
        </article>
      </div>
      <!-- ...lặp lại cho các bác sĩ khác... -->
    </div>
  </div>
</section>
```

### Phân tích code vừa nhận — 4 điểm phải kiểm tra

1. **Số cột**: hàng 4 cột phải là `col-xl-3` (12/4) hoặc `col-lg-3`; nếu AI trả `col-lg-4` nghĩa là 3 cột — sai đặc tả.
2. **`h-100`**: có trên card để các card cùng chiều cao dù tên bác sĩ dài ngắn khác nhau.
3. **`d-grid`**: bọc nút để nút full-width — đúng chuẩn, không cần CSS riêng.
4. **Badge màu**: `text-bg-primary` tự đảm bảo contrast — không nên tự đổi màu chữ.

Nếu thiếu một trong bốn điểm, đừng sửa tay vội — hãy yêu cầu AI sửa đúng điểm đó (bước Refine):

```text
Giữ nguyên toàn bộ cấu trúc. Sửa 2 điểm: (1) hàng card phải đúng 4 cột trên desktop
nên dùng col-xl-3; (2) thêm h-100 vào card và d-grid quanh nút Đặt lịch.
Chỉ trả về phần đã sửa.
```

## Thực hành

1. Lấy đặc sả bạn đã viết ở bài 01 (hoặc tự viết đặc tả 3 câu cho một section).
2. Dán khung prompt chuẩn + đặc tả vào AI, nhận code HTML.
3. Kiểm tra code theo 4 điểm ở trên; nếu sai, dùng prompt sửa điểm cụ thể (không yêu cầu viết lại toàn bộ).
4. Dán code vào file HTML có sẵn Bootstrap CDN, mở Live Server kiểm tra ở 375px/768px/1440px.

## Bài tiếp theo

Bài cuối module: một lab tổng hợp — cắt cả một trang con (hoặc toàn bộ trang chủ) từ thiết kế bằng đúng hai khung prompt đã học, kèm checklist đánh giá chất lượng prompt của bạn.
