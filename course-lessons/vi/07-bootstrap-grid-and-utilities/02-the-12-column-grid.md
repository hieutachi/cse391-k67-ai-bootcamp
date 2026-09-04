# Hệ thống lưới 12 cột

## Mục tiêu bài học
- Hiểu cấu trúc container → row → col và cách 12 cột chia đều mỗi hàng
- Dùng `col-*` cho màn hình nhỏ, `col-md-*`, `col-lg-*`... để lưới phản ứng theo breakpoint
- Áp dụng `offset`, gutters `g-*`; dựng hàng 3 cột dịch vụ và 4 cột bác sĩ

## Ý tưởng cốt lõi: mọi hàng chia cho 12

Bootstrap chia chiều ngang container thành **12 cột lý thuyết**. Bạn gán cho mỗi phần tử một con số — các con số trong cùng một hàng nên cộng lại bằng 12 (hoặc nhỏ hơn để chừa khoảng trống). Không cần viết một dòng media query nào: con số kèm tiền tố breakpoint chính là "media query trong class".

| Số cột gán | Chiếm bề ngang |
|---|---|
| `col-12` | toàn hàng (mặc định khi không ghi gì) |
| `col-6` | nửa hàng |
| `col-4` | một phần ba hàng |
| `col-3` | một phần tư hàng |

## container, row, col

```html
<div class="container">      <!-- cột giữa, tự căn giữa, rộng theo màn hình -->
  <div class="row">          <!-- bọc các cột, tạo rãnh gutter đều -->
    <div class="col-12 col-md-4">Cột A</div>
    <div class="col-12 col-md-4">Cột B</div>
    <div class="col-12 col-md-4">Cột C</div>
  </div>
</div>
```

Đọc class `col-12 col-md-4`: dưới 768px mỗi cột chiếm cả hàng (xếp dọc — đúng tinh thần mobile-first ở Chương 6); **từ 768px trở lên** mỗi cột chiếm 4/12 (ba cột ngang nhau). Chỉ viết `col` không số thì Bootstrap tự chia đều. Ba hộp container nên nhớ: `.container` rộng tối đa theo từng breakpoint; `.container-fluid` luôn rộng 100% viewport (cho section nền tràn: hero, footer); `.container-{sm|md|lg|xl|xxl}` chỉ giới hạn bề rộng từ breakpoint đó.

## col-*, col-md-*, col-lg-* nghĩa là gì

Tiền tố chính là mốc "từ bao nhiêu px trở lên" — khớp bảng breakpoints ở Chương 6. Ví dụ `col-12 col-md-6 col-lg-4`: mobile full hàng → tablet nửa hàng → desktop một phần ba. Càng nhiều mốc, layout càng trôi mượt — đó là cách Bootstrap hoá media query bạn tự viết ở Chương 6.

| Class | Viewport áp dụng | Ghi chú |
|---|---|---|
| `col-*` | mọi màn hình | không có tiền tố |
| `col-sm-*` | ≥ 576px | điện thoại ngang, tablet dọc |
| `col-md-*` | ≥ 768px | tablet |
| `col-lg-*` | ≥ 992px | desktop |
| `col-xl-*` | ≥ 1200px | desktop lớn |

## Offset và gutters

```html
<div class="row">
  <!-- chừa 2 cột trái, dùng 8 cột cho nội dung -->
  <div class="col-8 offset-2">
    <p class="text-center">Hồ sơ bệnh viện — đoạn giới thiệu trung tâm.</p>
  </div>
</div>
```

- `.offset-*` / `.offset-md-*`: đẩy cột sang phải N cột (tương đương `margin-left`).
- Gutters — rãnh giữa các cột — mặc định 1.5rem, chỉnh bằng `g-*`: `g-0` (không rãnh, cho ảnh ghép liền), `g-3`, `g-5`...; tách theo trục bằng `gx-4` (ngang) / `gy-4` (dọc).

## Dựng hai hàng điển hình của Highland Hospital

```html
<section class="container py-5">
  <!-- Hàng 3 cột DỊCH VỤ: mobile xếp dọc, md 2 cột, lg 3 cột -->
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <h3>Khám tổng quát</h3>
      <p>Gói kiểm tra sức khỏe định kỳ cho cá nhân và gia đình.</p>
    </div>
    <div class="col-12 col-md-6 col-lg-4"><!-- card Xét nghiệm --></div>
    <div class="col-12 col-md-6 col-lg-4"><!-- card Răng hàm mặt --></div>
  </div>

  <!-- Hàng 4 cột BÁC SĨ: md 2 cột, lg 4 cột (col-lg-3 × 4 = 12) -->
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-3">
      <h4>BS. Nguyễn Minh Anh</h4>
      <p>Nội tổng hợp · 12 năm kinh nghiệm</p>
    </div>
    <div class="col-12 col-md-6 col-lg-3"><!-- card BS thứ 2 --></div>
    <div class="col-12 col-md-6 col-lg-3"><!-- card BS thứ 3 --></div>
    <div class="col-12 col-md-6 col-lg-3"><!-- card BS thứ 4 --></div>
  </div>
</section>
```

Miễn tổng số cột của các phần tử trong một `.row` là 12 (`col-lg-4 × 3` hoặc `col-lg-3 × 4`), Bootstrap tự xếp vừa một hàng và tự xuống dòng khi vượt 12.

## Prompt mẫu: AI dựng lưới

```text
Dùng Bootstrap 5 (CDN) dựng section "Đội ngũ bác sĩ" cho Highland
Hospital: 8 bác sĩ, mỗi bác sĩ là một card gồm ảnh (dùng
https://via.placeholder.com/300x200), họ tên, chuyên khoa, nút "Đặt
lịch". Lưới: 1 cột trên mobile, 2 cột từ col-md, 4 cột từ col-lg, gutter
g-4. Toàn bộ nằm trong .container. Chỉ dùng class có sẵn của Bootstrap —
không viết CSS riêng. Giải thích ngắn vì sao dùng col-lg-3 cho 4 cột.
```

## Thực hành

- Tạo `grid-demo.html`, dựng lại hàng 3 cột dịch vụ và hàng 4 cột bác sĩ từ code mẫu.
- Thử đổi `col-lg-4` thành `col-lg-3` và thêm bác sĩ thứ tư — quan sát hàng chuyển từ 3 sang 4 cột.
- Kéo cửa sổ qua 768px và 992px, xác nhận số cột đổi đúng mốc.

## Bài tiếp theo

Lưới đã xếp được khung — bài sau trang điểm nội dung bên trong bằng bộ utilities spacing, màu sắc và typography của Bootstrap.