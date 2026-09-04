# Dựng Landing Page bằng Bootstrap

## Mục tiêu bài học
- Dựng hoàn chỉnh Landing Page Highland Hospital bằng Bootstrap 5 CDN, theo spec đã viết ở bài 01
- Tổ chức mã nguồn đúng vai trò: cấu trúc trong `index.html`, style trong `css/style.css`, logic trong `js/main.js`
- Biết viết prompt AI dựng từng section, và **review code AI sinh ra** theo chuẩn semantic

## Bootstrap từ CDN

Ba dòng CSS trong `<head>` và một cặp `<script>` cuối `<body>` là đủ — grid lẫn component tương tác (navbar collapse, modal, carousel) đều chạy, vì `bootstrap.bundle.min.js` đã gộp sẵn Popper:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Highland Hospital — Chăm sóc sức khoẻ tận tâm</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Dựng dần từng vùng bên dưới -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

## Bộ xương semantic

Khung trang dùng thẻ semantic; vùng nào có trong navbar thì gán `id` để neo: `<header><nav>` → `<main>` gồm các `<section id="hero|services|doctors|testimonials">` → `<footer>`.

Vì navbar `fixed-top` che mất đầu nội dung, thêm vào `css/style.css`:

```css
body { padding-top: 72px; } /* chiều cao navbar */
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
```

`scroll-padding-top` bù navbar khi neo tới `#doctors` — thiếu nó, tiêu đề section sẽ bị navbar che mất.

## Bước 1 — Navbar

```html
<nav class="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="index.html">🏥 Highland Hospital</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false" aria-label="Mở menu điều hướng">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item"><a class="nav-link" href="#hero">Trang chủ</a></li>
        <li class="nav-item"><a class="nav-link" href="#services">Dịch vụ</a></li>
        <li class="nav-item"><a class="nav-link" href="#doctors">Bác sĩ</a></li>
        <li class="nav-item"><a class="nav-link" href="#testimonials">Đánh giá</a></li>
        <li class="nav-item ms-lg-3 mt-2 mt-lg-0"><a class="btn btn-primary rounded-pill px-4" href="booking.html">Đặt lịch khám</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Điểm cần review: `data-bs-target` khớp `id` của khối collapse; hamburger có đủ `aria-*`; nút CTA là `<a>` điều hướng chứ không phải `<button>`.

## Bước 2 — Hero

Hero static chia 2 cột (chữ trái – ảnh phải), tự xếp dọc trên mobile nhờ lưới 12 cột — đủ tốt cho dự án; carousel chỉ thêm hiệu ứng, không thêm giá trị nội dung:

```html
<section id="hero" class="bg-primary bg-gradient text-white py-5">
  <div class="container py-lg-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-sm">Chăm sóc sức khoẻ <br class="d-none d-lg-block">bạn đáng nhận</h1>
        <p class="lead mt-3 text-white-50">Highland Hospital quy tụ 120+ bác sĩ chuyên khoa đầu ngành — đặt lịch khám trực tuyến chỉ trong 2 phút.</p>
        <div class="d-flex flex-wrap gap-3 mt-4">
          <a href="booking.html" class="btn btn-light btn-lg rounded-pill px-4">Đặt lịch ngay</a>
          <a href="#doctors" class="btn btn-outline-light btn-lg rounded-pill px-4">Xem bác sĩ</a>
        </div>
      </div>
      <div class="col-lg-6 text-center">
        <img src="img/hospital-hero.jpg" alt="Sảnh chính bệnh viện Highland" class="img-fluid rounded-4 shadow-lg">
      </div>
    </div>
  </div>
</section>
```

## Bước 3 — Services bằng Card

Lưới `row g-4`, mỗi card trong cột `col-md-6 col-lg-4` (1 cột mobile → 2 tablet → 3 desktop). Viết tay 6 card một lần để thấy rõ HTML; bài 03 sẽ thay bằng vòng lặp JS:

```html
<section id="services" class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <span class="badge bg-primary-subtle text-primary mb-2">Dịch vụ</span>
      <h2 class="fw-bold">Dịch vụ y tế toàn diện</h2>
    </div>
    <div class="row g-4">
      <!-- Lặp lại khối cột dưới cho 6 dịch vụ: Khám tổng quát, Nội soi tiêu hoá,
           Xét nghiệm, Chẩn đoán hình ảnh, Tim mạch, Răng hàm mặt -->
      <div class="col-md-6 col-lg-4">
        <article class="card h-100 border-0 shadow-sm">
          <div class="card-body p-4">
            <h3 class="h5 fw-bold">🩺 Khám tổng quát</h3>
            <p class="card-text text-secondary">Gói khám sức khoẻ định kỳ đầy đủ xét nghiệm cho cá nhân và doanh nghiệp.</p>
            <a href="booking.html" class="stretched-link text-decoration-none">Đặt lịch →</a>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
```

`stretched-link` cho phép bấm vào **bất kỳ đâu trên card** đều kích hoạt link.

## Bước 4 — Doctors & Testimonials

Doctors để sẵn `<div id="doctorGrid" class="row g-4">` **trống** — bài 03 sẽ render vào đây. Testimonials cùng kiểu `row g-4` với 3 card nội dung đánh giá bệnh nhân:

```html
<section id="doctors" class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <span class="badge bg-primary-subtle text-primary mb-2">Đội ngũ</span>
      <h2 class="fw-bold">Bác sĩ chuyên khoa</h2>
    </div>
    <div id="doctorGrid" class="row g-4"></div> <!-- JS sẽ render doctor-card vào đây -->
  </div>
</section>
```

## Bước 5 — Footer

Ba cột: giới thiệu + giờ làm việc, link nhanh, liên hệ:

```html
<footer class="bg-dark text-white-50 py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">🏥 Highland Hospital</h2>
        <p class="mt-3">Hệ thống y tế tư nhân với 20 năm kinh nghiệm, 3 cơ sở tại TP.HCM.</p>
      </div>
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">Giờ làm việc</h2>
        <ul class="list-unstyled mt-3">
          <li>Thứ 2 – Thứ 6: 7:00 – 20:00</li>
          <li>Thứ 7: 7:00 – 17:00</li>
          <li>Chủ nhật & lễ: cấp cứu 24/7</li>
        </ul>
      </div>
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">Liên hệ</h2>
        <address class="mt-3 mb-1">12 Nguyễn Du, Quận 1, TP.HCM</address>
        <p class="mb-0">📞 1900 1234 · ✉️ hello@highlandhospital.vn</p>
      </div>
    </div>
  </div>
</footer>
```

## Prompt AI dựng từng section

Đặc tả viết ở bài 01 nhét thẳng vào prompt sẽ cho sản phẩm khớp ý ngay lần đầu:

```text
Dựng section "Doctors" bằng Bootstrap 5 cho website bệnh viện Highland Hospital,
dùng tiếng Việt cho nội dung hiển thị. Yêu cầu:
1. Section id="doctors", nền bg-light, badge "Đội ngũ" + h2
2. Bên trong là <div id="doctorGrid" class="row g-4"> TRỐNG — tôi sẽ render bằng JS
3. Giải thích ngắn vai trò từng class dùng tới (col, g-4, bg-light...)
4. KHÔNG dùng inline style, KHÔNG viết JS
Chỉ trả về HTML của section, kèm 3 dòng lưu ý responsive cho người mới.
```

Chạy prompt này cho từng vùng (hero, services, doctors, testimonials, footer), ghép vào `index.html`. Sau mỗi lần nhận code AI: đọc từng dòng trước khi giữ — quy tắc bất biến của khoá học.

## Tự review semantic

Mở DevTools (F12) và tự kiểm tra:

- ✅ Đúng **một** `<header>`, **một** `<main>`, **một** `<footer>` toàn trang; mỗi vùng là `<section>` có heading bên trong
- ✅ Chỉ **một** `h1` (trong hero); tiêu đề khác dùng `h2`/`h3` đúng cấp; mọi ảnh có `alt` mô tả nội dung
- ✅ Link "Đặt lịch" trỏ `booking.html`; link nav neo đúng `id`; dưới 992px navbar thu gọn thành hamburger, không tràn ngang

Dán toàn bộ `<body>` cho AI với lời nhắc *"tìm lỗi semantic và lỗi lồng thẻ"* cũng được — nhưng tự review trước vẫn nhanh và nhớ lâu hơn.

## Thực hành

1. Tạo `index.html` hoàn chỉnh theo đúng 5 bước; thay nội dung 6 services + 3 testimonials bằng nội dung riêng của bạn.
2. Tạo `css/style.css`: biến màu riêng của Highland + hiệu ứng card hover nổi bóng nhẹ.
3. Mở bằng Live Server, duyệt từng vùng ở desktop và mobile (chế độ responsive trong DevTools).
4. Chạy prompt AI cho 2 vùng bạn chưa tự làm, review và giữ lại phần đạt chuẩn.
5. Chạy checklist review semantic và sửa hết lỗi tìm được.

## Bài tiếp theo

Trang đã tĩnh và đẹp — giờ làm nó "sống": render bác sĩ từ mảng dữ liệu, lọc chuyên khoa, và nút Đặt lịch mở modal, trong bài *Tương tác JavaScript trên Landing Page*.
