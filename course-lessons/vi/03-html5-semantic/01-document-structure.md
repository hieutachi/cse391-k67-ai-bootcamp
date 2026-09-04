# Cấu trúc tài liệu web chuẩn

## Mục tiêu bài học
- Viết được khung tài liệu HTML5 hợp lệ: `<!DOCTYPE html>`, `lang`, `head`, `body`
- Hiểu nhiệm vụ của từng thẻ trong `<head>` và vì sao `viewport` quyết định responsive
- Dựng được cấu trúc tối thiểu chuẩn cho dự án Highland Hospital

## Khung tối thiểu của mọi trang web

Dù là Landing Page hay Admin Dashboard, mọi trang đều bắt đầu từ một khung duy nhất. Mở VS Code, tạo `index.html`, gõ `!` rồi Enter (Emmet) hoặc tự gõ khung bên dưới:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Highland Hospital — Đặt lịch khám trực tuyến</title>
  <meta name="description"
        content="Highland Hospital: đặt lịch khám trực tuyến, tra cứu bác sĩ theo chuyên khoa và dịch vụ chăm sóc sức khoẻ.">
</head>
<body>
  <!-- Toàn bộ nội dung trang sẽ nằm ở đây -->
</body>
</html>
```

## Từng dòng có nhiệm vụ gì

- `<!DOCTYPE html>` — tuyên bố đây là tài liệu HTML5, giúp trình duyệt chạy ở "chuẩn mode" thay vì "quirks mode" (chế độ bắt chước trình duyệt 20 năm trước, dễ vỡ layout). Luôn đặt ở dòng đầu tiên, không có gì phía trước nó.
- `<html lang="vi">` — khai báo ngôn ngữ trang cho công cụ tìm kiếm, trình đọc màn hình và tính năng dịch tự động. Highland Hospital dùng tiếng Việt nên là `vi`; nếu có trang tiếng Anh thì đổi thành `en`.
- `<meta charset="UTF-8">` — đảm bảo tiếng Việt có dấu (ă, â, ê, ô, ơ, ư) hiển thị đúng. Thiếu thẻ này, chữ "đặt lịch" có thể thành "Ä‘áº·t lá»‹ch".
- `<meta name="viewport">` — nói với trình duyệt di động: lấy chiều rộng thật của màn hình thiết bị làm chiều rộng trang và tỉ lệ ban đầu là 1.0.
- `<title>` — hiện trên tab trình duyệt và là dòng đầu tiên của kết quả Google.
- `<meta name="description">` — đoạn mô tả ngắn hiển thị dưới title trong kết quả tìm kiếm.

## Vì sao viewport quyết định responsive

Không có thẻ viewport, điện thoại không hiểu trang đã responsive mà phóng to cả trang rộng 980px (chiều rộng giả định mặc định) để nhét vừa màn hình — chữ nhỏ xíu, người dùng phải pinch-to-zoom. Có thẻ viewport, CSS của bạn (bài các chương sau: media queries, `%`, `rem`, `fr`) mới áp lên đúng chiều rộng thật của thiết bị. Quy tắc: **không có `viewport`, không có responsive** — đây là thẻ dễ quên nhất nhưng lại là tiền đề của cả chương 6.

## Thứ tự khuyến nghị trong `<head>`

Giữ một trật tự cố định để trang nào cũng giống trang nào: `charset` → `viewport` → `title` → `description` → sau đó đến CSS (bài sau) và font. Kiểm tra nhanh cấu trúc sau khi viết xong: nhấn F12, tab Elements — cú pháp sai (ví dụ quên đóng `</head>`) thường khiến toàn bộ trang hiển thị lệch.

## Cấu trúc tối thiểu chuẩn cho Highland Hospital

Mỗi trang của dự án (trang chủ, `booking.html`, `admin.html`) dùng đúng khung trên với `title` và `description` riêng — đây là chỗ bắt đầu cấu trúc thư mục bài 05 sẽ đặt tên: `index.html`, `booking.html`, `admin.html` cùng thư mục `css/`, `js/`, `images/`.

## Thực hành
Tạo `index.html` cho Highland Hospital với khung tối thiểu: `lang="vi"`, title chứa tên bệnh viện, description 1–2 câu. Sau đó tạo tiếp `booking.html` và `admin.html` với title riêng (ví dụ "Đặt lịch khám — Highland Hospital"). Mở `index.html` bằng Live Server rồi dùng DevTools (biểu tượng điện thoại) — nếu trang co giãn theo đúng bề rộng màn hình thiết bị nghĩa là `viewport` đã hoạt động.

## Bài tiếp theo

Khung đã chuẩn, giờ ta điền nội dung bằng các thẻ có *ý nghĩa* — bài *Thẻ ngữ nghĩa & SEO* giới thiệu `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
