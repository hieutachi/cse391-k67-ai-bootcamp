# Thiết lập môi trường làm việc

## Mục tiêu bài học
- Cài đặt và cấu hình VS Code với Live Server
- Tạo cấu trúc thư mục chuẩn cho dự án Highland Hospital
- Làm quen với Chrome DevTools — người bạn đồng hành của mọi bài sau

## Bước 1: Cài VS Code và Live Server

1. Tải VS Code từ trang chủ và cài đặt như ứng dụng thông thường.
2. Mở VS Code, vào tab **Extensions** (⌘⇧X), tìm **Live Server** (tác giả Ritwick Dey), cài đặt.
3. Mở một thư mục trống qua **File → Open Folder**. Đây sẽ là nơi chứa dự án.

Live Server làm một việc rất quan trọng: nó chạy một máy chủ nhỏ ngay trên máy bạn và **tự tải lại trình duyệt mỗi khi bạn lưu file**. Khi đến chương 11 học Fetch API, bạn sẽ hiểu vì sao không thể mở file HTML bằng cách double-click (giao thức `file://` chặn gọi API) — Live Server giải quyết việc đó từ bây giờ.

## Bước 2: Cấu trúc thư mục dự án

Tạo cấu trúc sau (dùng nút New Folder trong VS Code hoặc terminal):

```
highland-hospital/
├── index.html          # Trang chủ — Landing Page
├── booking.html        # Trang đặt lịch (xây từ chương 8)
├── admin.html          # Admin Dashboard (xây từ chương 12)
├── css/
│   └── style.css       # CSS tự viết, nạp sau Bootstrap
├── js/
│   ├── data.js         # Dữ liệu mẫu bác sĩ, dịch vụ
│   ├── main.js         # Logic trang chủ
│   └── admin.js        # Logic dashboard
└── assets/
    └── images/         # Ảnh bác sĩ, banner
```

Mỗi bài học từ giờ sẽ nói rõ "thêm vào file nào" — hãy giữ cấu trúc này nhất quán để prompt AI của bạn luôn chỉ đúng đường dẫn.

## Bước 3: File HTML tối thiểu và chạy thử

Tạo `index.html` với nội dung tối thiểu, sau đó **click chuột phải vào file → Open with Live Server**. Trình duyệt sẽ mở `http://127.0.0.1:5500/index.html`.

## Bước 4: Làm quen Chrome DevTools

Mở DevTools bằng **⌥⌘I** (hoặc click phải → Inspect). Bốn tab bạn dùng nhiều nhất:

- **Elements** — xem cây DOM và CSS đang áp dụng; tắt/bật style để thử nghiệm trước khi sửa file.
- **Console** — nơi in lỗi JavaScript và lệnh `console.log`; thử gõ JavaScript trực tiếp.
- **Network** — xem trình duyệt tải file nào, request API nào đang chạy; mở tab này khi học Fetch API.
- **Device Toolbar** (⌘⇧M) — mô phỏng màn hình điện thoại/máy tính bảng để kiểm tra responsive.

## Thực hành

1. Tạo đủ cấu trúc thư mục `highland-hospital/` như trên.
2. Viết `index.html` tối thiểu gồm `<!DOCTYPE html>`, thẻ `head` (có `meta viewport`) và một câu "Highland Hospital — đang xây dựng".
3. Mở bằng Live Server, rồi dùng Device Toolbar xem trang ở kích thước 375px và 1440px.
4. Hỏi AI: *"Tôi dùng VS Code + Live Server, chưa cài gì thêm. Extension nào giúp tự động format HTML/CSS khi lưu file?"* — cài extension được gợi ý và kiểm tra.

## Bài tiếp theo

Môi trường đã sẵn sàng — bài cuối chương này giới thiệu dự án xuyên suốt Highland Hospital: ba trang web bạn sẽ xây và dữ liệu chúng dùng chung.
