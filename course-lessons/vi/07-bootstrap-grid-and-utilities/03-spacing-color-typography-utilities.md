# Spacing, Colors & Typography utilities

## Mục tiêu bài học
- Điều chỉnh khoảng cách bằng `m-*`, `p-*`, `mx-auto`, `gap` mà không viết CSS
- Tô màu nhanh bằng `bg-*`, `text-*`, `text-bg-*` và hiểu cách chúng tương tác
- Bật/tắt phần tử theo màn hình bằng `d-none` / `d-md-block`; dùng typography `display-*`, `lead`, `text-center`
- Áp dụng vào header Highland Hospital

## Utility class — vũ khí bỏ qua file CSS

Utility class là những class một thuộc tính, một ý nghĩa: `mt-3` = `margin-top: 1rem`, `p-2` = `padding: 0.5rem`. Lợi ích: chỉnh khoảng cách **ngay trong HTML**, không phải mở CSS, không lo cascade đè nhau. Chi phí là HTML dài hơn — nhưng với AI hỗ trợ viết thì gần như bằng không.

## Spacing: m, p và thang 0–5

Thang đo Bootstrap tính theo `rem` (1rem = 16px):

| Class | Giá trị | | Class | Giá trị |
|---|---|---|---|---|
| `m-0` / `p-0` | 0 | | `m-3` / `p-3` | 1rem |
| `m-1` / `p-1` | 0.25rem | | `m-4` / `p-4` | 1.5rem |
| `m-2` / `p-2` | 0.5rem | | `m-5` / `p-5` | 3rem |

Mở rộng theo hướng: `t` (top), `b` (bottom), `s` (start/trái), `e` (end/phải), `x` (trái+phải), `y` (trên+dưới) — ví dụ `pt-4`, `mx-auto`, `py-5`. `mx-auto` chỉ canh giữa được khi phần tử có bề ngang giới hạn — nhớ kèm `max-width` hoặc nằm trong cột `col-*`. Khoảng cách **giữa** các phần tử con trong flex/grid dùng class `gap-*` (như `gap-3`, `gap-md-4`) thay vì `me-*` cho từng đứa con:

## Colors: bg, text và text-bg

```html
<p class="text-primary">Xanh chủ đạo Bootstrap</p>
<p class="text-success">Thông báo thành công</p>
<p class="text-danger">Lỗi nhập liệu</p>
<p class="text-muted">Phụ đề mờ — dùng cho mô tả</p>

<div class="bg-primary text-white p-3 rounded">Nền xanh, chữ trắng</div>
<div class="bg-light text-dark p-3 rounded">Nền nhạt, chữ tối</div>
```

Bộ màu gồm 8 màu ngữ nghĩa: `primary` (xanh dương), `secondary` (xám), `success` (xanh lá — thành công), `danger` (đỏ — lỗi), `warning` (vàng — cảnh báo), `info`, `light`, `dark`. Hai điều cần biết:
- Có cả biến thể nhạt: `bg-primary-subtle`, `text-primary-emphasis` — đẹp cho vùng highlight.
- `text-bg-*` (Bootstrap 5.2+) tự chọn chữ tương phản: `<div class="text-bg-warning p-2">` cho chữ tối trên nền vàng đúng chuẩn, không cần tự nghĩ `text-white` hay `text-dark`.

## Display utilities: bật/tắt theo màn hình

Họ `d-*` chính là `display` — và kết hợp breakpoint cho khả năng responsive:

```html
<p class="d-none d-md-block">
  Đoạn này ẩn trên mobile (d-none), hiện lại từ 768px (d-md-block).
</p>
<p class="d-md-none">
  Đoạn này chỉ hiện dưới 768px — thường là "slogan ngắn" cho màn hình nhỏ.
</p>
```

Nguyên lý luôn là "đặt trạng thái nền trước, mở lại sau": `d-none` (ẩn) rồi `d-md-block` (hiện từ md). Họ này sẽ phát huy sức mạnh ở Chương 8 khi làm navbar mobile với nút hamburger.

## Typography utilities

```html
<h1 class="display-3">Highland Hospital</h1>   <!-- to hơn h1 thường -->
<p class="lead">Hệ thống y tế vì sức khỏe gia đình bạn.</p> <!-- đoạn dẫn lớn hơn -->
<p class="text-center">Đặt lịch qua hotline 1900 1234</p>
<p class="fw-bold">Chữ đậm</p>
```

`display-1` đến `display-6` dành cho tiêu đề trang trí (hero), `lead` cho câu dẫn dưới tiêu đề, `text-center`/`text-md-start`... canh chữ — họ này cũng chạy theo breakpoint.

## Áp dụng: header Highland Hospital

```html
<header class="bg-primary text-white">
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1 class="display-6 mb-0">Highland Hospital</h1>
        <p class="d-none d-sm-block mb-0 small text-white-50">
          Đặt lịch khám trực tuyến · Khám chữa bệnh chất lượng cao
        </p>
      </div>
      <a href="tel:19001234" class="btn btn-light">1900 1234</a>
    </div>
  </div>
</header>
```

Đọc ngược lại: header nền xanh chữ trắng; nội dung trong container, đệm dọc `py-4`; hàng ngang `d-flex` với `justify-content-between` (hai đầu) và `align-items-center` (canh giữa dọc); slogan **chỉ hiện từ 576px** nhờ `d-none d-sm-block` — mobile chỉ còn tên bệnh viện và số điện thoại.

## Prompt mẫu: AI dùng utilities cho header

```text
Dựng header cho trang Highland Hospital chỉ bằng Bootstrap 5 utilities và
components, KHÔNG viết CSS riêng. Yêu cầu: nền gradient? — không, dùng
bg-primary; bên trái là tên bệnh viện bằng display-6 cùng slogan
.lead nhỏ chỉ hiện từ breakpoint sm; bên phải nút "Đặt lịch khám" dạng
btn-light có icon điện thoại. Khoảng cách đệm dọc vừa phải, dùng py-4
hoặc tương đương. Trả file HTML hoàn chỉnh kèm 3-4 dòng giải thích cách
phối các utility class.
```

## Thực hành

- Dựng header ở trên, thay đổi vài giá trị để cảm nhận: `py-4` → `py-5`, `display-6` → `display-3`, slogan `d-none d-sm-block` → `d-none d-md-block`.
- Dùng `bg-primary-subtle` + `text-primary-emphasis` làm một banner "Tuyển dụng" mini.
- Gửi prompt cho AI, đối chiếu sự lựa chọn class của nó với bản của bạn.

## Bài tiếp theo

Đã biết phối màu và khoảng cách — bài sau học bộ ba giao diện thông dụng nhất: Buttons, Badges và Alerts, dùng ngay cho nút "Đặt lịch" và thông báo form.
