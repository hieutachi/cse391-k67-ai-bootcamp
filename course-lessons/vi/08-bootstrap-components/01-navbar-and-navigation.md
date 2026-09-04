# Navbar & Navigation

## Mục tiêu bài học
- Dựng thanh điều hướng responsive bằng `navbar` + `navbar-expand-lg` của Bootstrap 5
- Hiểu vai trò của `navbar-brand`, `navbar-toggler`, `nav-link` và class `active`
- Nhớ đưa bundle JavaScript Bootstrap vào trang để hamburger hoạt động
- Xây navbar Highland Hospital: logo, Trang chủ, Dịch vụ, Bác sĩ, Liên hệ, nút Đặt lịch

## Skeleton của trang có Bootstrap

Ở chương 7 bạn đã quen hai dòng nhúng. Nhắc lại vì chương này bài nào cũng cần:

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Highland Hospital</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- nội dung trang -->

  <!-- bundle JS: bắt buộc cho toggler, modal, offcanvas, accordion... -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

CSS đặt trong `<head>`, bundle JS đặt cuối `<body>`.

## Navbar Highland Hospital hoàn chỉnh

```html
<nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="index.html">
      🏥 Highland Hospital
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNav" aria-controls="mainNav"
            aria-expanded="false" aria-label="Mở menu điều hướng">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Trang chủ</a>
        </li>
        <li class="nav-item"><a class="nav-link" href="services.html">Dịch vụ</a></li>
        <li class="nav-item"><a class="nav-link" href="doctors.html">Bác sĩ</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Liên hệ</a></li>
        <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
          <a class="btn btn-primary px-3" href="booking.html">Đặt lịch</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Đọc từng class:
- `navbar-expand-lg`: từ màn hình `lg` (≥992px) trở lên các link hiện ngang; nhỏ hơn thì thu gọn sau nút hamburger. Đổi thành `md`/`xl` sẽ dịch điểm gãy.
- `navbar-brand`: logo + tên thương hiệu.
- `navbar-toggler`: nút hamburger; hai attribute quyết định là `data-bs-toggle="collapse"` và `data-bs-target="#mainNav"` trỏ đúng `id` của khối menu — cơ chế này cần bundle JS.
- `navbar-collapse`: vùng menu thu-gọn-được.
- `nav-link active`: class `active` làm nổi mục đang mở; nên đi kèm `aria-current="page"` cho trình đọc màn hình.
- `ms-auto`: đẩy nhóm link sát lề phải.
- Nút "Đặt lịch" là lời gọi hành động (CTA) nên dùng `btn btn-primary`, không phải `nav-link`, để nổi bật.
- `sticky-top`: thanh dính phía trên khi cuộn trang.

## nav-tabs — dùng khi nào

`nav-tabs` không phải menu đầu trang mà là tab **trong nội dung** (ví dụ trang chi tiết khoa phòng):

```html
<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Thông tin chung</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Quy trình khám</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Bảo hiểm & chi phí</a></li>
</ul>
```

## Vì sao hamburger không chạy?

90% trường hợp là thiếu bundle JS, hoặc `data-bs-target` không khớp `id` của khối menu. Kiểm tra theo đúng thứ tự đó. Thử xoá dòng `<script>` rồi bấm hamburger — bạn sẽ thấy không có gì xảy ra; đó là cách nhớ bài học này lâu nhất.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Bạn là senior frontend developer. Tôi đang xây website Highland Hospital bằng Bootstrap 5 (CDN, có sẵn `bootstrap.bundle.min.js`). Hãy tạo navbar: logo kèm tên "Highland Hospital" bên trái; các link Trang chủ / Dịch vụ / Bác sĩ / Liên hệ; nút "Đặt lịch khám" dạng `btn btn-primary` bên phải. Dùng `navbar-expand-lg` để trên màn hình nhỏ thu gọn thành hamburger, mục Trang chủ `active`, thanh `sticky-top`. Trả về đủ thẻ `<link>` CSS và `<script>` bundle JS. Giải thích ngắn vai trò của `data-bs-toggle` và `data-bs-target`.

Trước khi hỏi AI, hãy tự phân tích (bước 1 của Workflow): menu gồm mấy mục? Mục nào active? Có nút CTA không? Điểm gãy nào? Bạn nói càng rõ, code nhận về càng ít phải sửa.

## Thực hành
1. Tạo `navbar.html` với skeleton CDN, dán navbar ở trên, mở bằng Live Server.
2. Kéo cửa sổ hẹp dưới 992px, bấm hamburger kiểm tra menu xổ xuống.
3. Xoá dòng `<script>` bundle rồi bấm hamburger lần nữa — ghi lại hiện tượng và nguyên nhân.
4. Đổi `navbar-expand-lg` → `navbar-expand-md`, quan sát điểm gãy thay đổi.
5. Chạy prompt mẫu với AI và so sánh với code của bạn.

## Bài tiếp theo

Navbar đã xong; bài sau dựng khối nội dung phong phú nhất của trang — Cards và List group — để trưng bày đội ngũ bác sĩ Highland Hospital.
