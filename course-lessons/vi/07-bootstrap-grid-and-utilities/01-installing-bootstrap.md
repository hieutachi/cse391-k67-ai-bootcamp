# Cài đặt Bootstrap 5

## Mục tiêu bài học
- Nhúng Bootstrap 5 vào trang bằng CDN: thẻ CSS trong `<head>`, thẻ JS bundle cuối `<body>`
- Kiểm tra được version Bootstrap đang chạy
- Hiểu vì sao khoá học dùng CDN và cách đặt CSS tự viết để override đúng

## Bootstrap là gì và vì sao không cần tải về

Bootstrap 5 là thư viện CSS + JS mã nguồn mở: hệ thống lưới, components (navbar, card, modal...) và hàng trăm utility class giúp bạn dựng giao diện nhanh. Với khoá học này, ta dùng **CDN** — Bootstrap được phục vụ từ máy chủ toàn cầu qua một đường link, thay vì tải file về máy. Chỉ cần hai dòng là cả thư viện sẵn sàng.

> ⚠️ Khác Bootstrap 4, **Bootstrap 5 không cần jQuery**. Chỉ cần một file `bootstrap.bundle.min.js` duy nhất (bundle = JS lõi + Popper dùng cho dropdown/tooltip). Đừng chép nhầm code cũ có jQuery vào.

## Cấu trúc trang tối thiểu

Thứ tự là yếu tố quyết định: CSS Bootstrap **trước**, CSS tự viết **sau**; JS đặt cuối `<body>`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Highland Hospital</title>

  <!-- 1. CSS Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- 2. CSS tự viết — luôn SAU Bootstrap để override được -->
  <link href="css/custom.css" rel="stylesheet">
</head>
<body>

  <!-- 3. Nội dung trang -->
  <h1 class="text-primary">Highland Hospital</h1>
  <button class="btn btn-primary">Đặt lịch khám</button>

  <!-- 4. JS Bundle — cuối body, chỉ cần khi dùng component JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Giải thích từng chi tiết:
- `<meta name="viewport">` bắt buộc có để trang responsive hoạt động đúng trên điện thoại — thiếu nó, Bootstrap vẫn render như trang desktop thu nhỏ.
- Version cố định `5.3.3` thay vì `5` chung chung: đảm bảo mọi người trong khoá học cùng một phiên bản, không lỗi "chạy trên máy tôi mà".
- CSS tự viết đặt **sau** link Bootstrap vì cascade — cùng độ đặc hiệu, file sau thắng. Muốn nút chính của bệnh viện màu xanh riêng, chỉ cần khai báo ở `custom.css` là ghi đè được.

## Kiểm tra version đang chạy

Mở DevTools (`F12`) → Console, gõ:

```js
bootstrap.Tooltip.VERSION
// kết quả ví dụ: "5.3.3"
```

Nếu báo `bootstrap is not defined`, nghĩa là JS bundle chưa tải được — kiểm tra lại đường link hoặc mạng. Còn muốn xác nhận CSS đã vào, chọn tab Elements và nhìn class `.btn-primary` có đủ thuộc tính Bootstrap trong panel Styles.

## Vì sao khoá học dùng CDN

- **Khởi động 0 giây**: không cần cài npm, không cần cấu hình build — dán link, chạy Live Server là thấy kết quả. Phù hợp giai đoạn học HTML/CSS/JS thuần.
- **Giữ mọi bài lab đồng bộ**: ai cũng tải đúng cùng phiên bản từ cùng một CDN.
- **Miễn phí và nhanh**: jsDelivr phục vụ từ nhiều nút trên thế giới, có thể dùng cache trình duyệt sẵn từ các website khác.

Khi ra dự án thật cần offline hoặc build production, bạn mới chuyển sang cách cài qua npm — không cần học ngay lúc này.

## Prompt mẫu: AI kiểm tra trang Bootstrap

```text
Tôi mới nhúng Bootstrap 5 vào trang Highland Hospital qua CDN nhưng nút
.btn-primary không có màu xanh Bootstrap mà vẫn màu mặc định. Đây là
đầu file HTML của tôi: [dán 10 dòng <head>]. Hãy chỉ ra lỗi có thể xảy
ra theo thứ tự khả năng cao nhất (ví dụ: thiếu link CSS, link sai version,
CSS tự viết đặt trước link Bootstrap...), và cho tôi <head> đúng chuẩn
để dán lại.
```

## Thực hành

- Tạo `bootstrap-hello.html` đúng cấu trúc trên, thêm một nút `.btn-primary` và một đoạn `.text-primary`.
- Mở bằng Live Server, kiểm tra version bằng Console, thử xoá dòng link CSS để thấy trang "mất hồn" thế nào.
- Tạo `css/custom.css` đặt sau link Bootstrap, thử ghi đè màu `.btn-primary` — nhận ra vai trò thứ tự link.

## Bài tiếp theo

Bootstrap đã chạy — bài sau khám phá trái tim của nó: hệ thống lưới 12 cột giúp dựng layout responsive mà không cần viết media query nào.
