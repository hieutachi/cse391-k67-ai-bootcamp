# Prompt Templates — Highland Hospital

Dán các mẫu sau vào Gemini / Claude / ChatGPT, kèm bối cảnh dự án (`templates/PROJECT_CONTEXT.md`). Điều chỉnh phần trong `[...]`.

## 1. Dựng khung HTML semantic cho một section

```text
Bối cảnh: dự án Highland Hospital (HTML5 semantic + Bootstrap 5.3 CDN, xem PROJECT_CONTEXT).
Nhiệm vụ: tạo section [tên section, ví dụ: danh sách bác sĩ] cho trang [index.html/booking.html/admin.html].
Yêu cầu: dùng thẻ semantic đúng; cấu trúc Bootstrap hợp lệ; có id và comment HTML đánh dấu từng khối.
Ràng buộc: không CSS tự viết, chỉ dùng class Bootstrap; không JS.
Đầu ra: toàn bộ mã HTML của section, không giải thích.
```

## 2. Render danh sách bằng JavaScript

```text
Bối cảnh: Highland Hospital, JS ES6+ thuần, dữ liệu mảng [doctors] trong js/data.js.
Nhiệm vụ: viết hàm render [danh sách bác sĩ] ra [selector #doctorsGrid] dạng card [mô tả card].
Yêu cầu: dùng map + template literal; mỗi card có nút với data-id; không dependency mới.
Đầu ra: mã hàm hoàn chỉnh; giải thích 3 câu cách hoạt động.
```

## 3. Bộ lọc / tìm kiếm

```text
Bối cảnh: Highland Hospital, JS thuần.
Nhiệm vụ: lọc mảng [doctors] theo [specialty] từ <select> và từ khoá tìm kiếm trong <input>.
Yêu cầu: lọc kết hợp cả hai điều kiện; không phân biệt hoa thường; render lại danh sách.
Đầu ra: mã hoàn chỉnh kèm 2 ví dụ dữ liệu vào → ra.
```

## 4. Sửa lỗi hiển thị (debug)

```text
Tôi đang gặp lỗi: [dán code tối thiểu + mô tả hiện tượng, kèm kích thước màn hình/trình duyệt].
Hãy nêu 3 nguyên nhân khả dĩ xếp theo khả năng xảy ra, giải thích ngắn từng nguyên nhân,
rồi mới đề xuất cách sửa cho nguyên nhân số 1. Đừng viết lại toàn bộ code của tôi.
```

## 5. Rà soát accessibility / responsive

```text
Bối cảnh: Highland Hospital.
Nhiệm vụ: rà soát đoạn code sau về accessibility (alt, label, contrast, focus) và responsive (320-1440px).
Đầu ra: danh sách vấn đề theo mức độ ưu tiên, mỗi vấn đề kèm đoạn sửa gợi ý. [dán code]
```

## 6. Giải thích code (Analyze — bước 3 của workflow)

```text
Đọc đoạn code sau và giải thích như đang dạy người mới: (1) vì sao dùng thẻ/class này,
(2) layout/cấu trúc vận hành thế nào, (3) luồng dữ liệu và sự kiện ra sao. [dán code]
```
