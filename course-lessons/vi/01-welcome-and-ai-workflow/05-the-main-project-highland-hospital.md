# Dự án xuyên suốt: Highland Hospital

## Mục tiêu bài học
- Hiểu rõ ba trang web bạn sẽ xây trong khoá học
- Nắm dữ liệu mẫu dùng chung giữa các trang
- Biết mỗi chương đóng góp phần nào vào dự án cuối cùng

## Bệnh viện Highland là ai?

Highland Hospital là một bệnh viện đa khoa hư cấu. Trang web của bệnh viện cần giải quyết ba việc thật:

1. **Giới thiệu** — bệnh nhân tiềm năng xem bệnh viện cung cấp dịch vụ gì, có những bác sĩ nào, người khác đánh giá ra sao.
2. **Đặt lịch** — bệnh nhân chọn chuyên khoa, chọn bác sĩ, chọn ngày giờ và điền thông tin liên hệ.
3. **Quản lý** — nhân viên bệnh viện xem danh sách lịch hẹn, tìm kiếm, lọc theo trạng thái, xác nhận hoặc huỷ lịch.

## Ba trang bạn sẽ xây

| Trang | File | Xây ở chương | Nội dung chính |
|---|---|---|---|
| Landing Page | `index.html` | 3–8 (tĩnh), 9–10 (động) | Navbar, Hero, dịch vụ, danh sách bác sĩ có bộ lọc, đánh giá, footer |
| Trang đặt lịch | `booking.html` | 8 (form tĩnh), 11 (luồng đa bước) | Form 3 bước: chọn dịch vụ/bác sĩ → thông tin bệnh nhân → xác nhận |
| Admin Dashboard | `admin.html` | 12 | 4 thẻ thống kê, bảng lịch hẹn có tìm kiếm + lọc trạng thái + cập nhật |

## Dữ liệu mẫu dùng chung

Cả ba trang làm việc trên cùng một bộ dữ liệu. Ở chương 9 bạn sẽ đưa nó vào `js/data.js`:

```js
// js/data.js
const doctors = [
  { id: 1, name: "BS. Nguyễn Văn An", specialty: "Nội tổng hợp", experience: 12, fee: 300000, avatar: "assets/images/doctor-1.jpg" },
  { id: 2, name: "BS. Trần Thị Bình", specialty: "Nhi khoa", experience: 9, fee: 250000, avatar: "assets/images/doctor-2.jpg" },
  { id: 3, name: "BS. Lê Hoàng Cường", specialty: "Tim mạch", experience: 15, fee: 400000, avatar: "assets/images/doctor-3.jpg" },
  { id: 4, name: "BS. Phạm Minh Dung", specialty: "Da liễu", experience: 7, fee: 220000, avatar: "assets/images/doctor-4.jpg" }
];

const appointments = []; // { id, patientName, phone, specialty, doctorName, date, time, status }
```

Trạng thái lịch hẹn dùng bốn giá trị xuyên suốt: `chờ xác nhận`, `đã xác nhận`, `đã hoàn thành`, `đã huỷ`. Ở chương 10–11, `appointments` chuyển từ mảng trong bộ nhớ sang `localStorage` và mock API.

## Mỗi chương đóng góp gì

- **Chương 3–4**: khung HTML semantic và CSS cho Hero + Services.
- **Chương 5–6**: lưới Doctor Cards và responsive toàn trang.
- **Chương 7–8**: dựng lại Landing bằng Bootstrap, form đặt lịch tĩnh.
- **Chương 9–10**: render bác sĩ từ dữ liệu, bộ lọc chuyên khoa, lưu lịch hẹn.
- **Chương 11**: gọi mock API, luồng đặt lịch đa bước.
- **Chương 12**: lắp ráp Landing + Admin Dashboard hoàn chỉnh và deploy.

## Một prompt khởi động dự án

```text
Tôi bắt đầu dự án frontend "Highland Hospital" — website bệnh viện đặt lịch khám.
Dùng HTML5 semantic + CSS3 + Bootstrap 5 CDN + JavaScript ES6+ thuần, không framework.
Tôi cần tạo index.html với cấu trúc rỗng gồm navbar, hero, services, doctors, testimonials,
booking CTA và footer — mỗi vùng là một <section> có id và comment HTML đánh dấu.
Hãy trả về toàn bộ nội dung file index.html, chưa cần nội dung chi tiết, chỉ khung + class Bootstrap hợp lệ.
```

## Thực hành

1. Tạo thư mục `highland-hospital/` (nếu chưa có từ bài trước) và file `js/data.js` với mảng `doctors` 6 bác sĩ và `appointments` rỗng.
2. Chạy prompt khởi động ở trên, dán kết quả vào `index.html`, mở Live Server và xem khung trang.
3. Mở bài tiếp theo để bắt đầu chương 2 — nơi bạn học viết những prompt tốt hơn prompt vừa dùng.

## Bài tiếp theo

Khung trang đầu tiên đã hiện trên trình duyệt — chương 2 dạy bạn viết prompt đủ tốt để biến khung đó thành giao diện thật, bắt đầu từ giải phẫu một prompt.
