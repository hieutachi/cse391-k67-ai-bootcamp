# Đặc tả dự án — Highland Hospital Web Portal

## 1. Giới thiệu

Highland Hospital là bệnh viện đa khoa hư cấu. Khoá học xây dựng **Highland Hospital Web Portal** — bộ ba trang web phía client cho phép bệnh nhân tìm hiểu dịch vụ, xem bác sĩ và đặt lịch khám trực tuyến; nhân viên quản lý lịch hẹn. Mục đích: ôm trọn toàn bộ kiến thức HTML5, CSS3, Bootstrap 5 và JavaScript ES6+ của khoá vào một sản phẩm hoàn chỉnh.

- **Kiến trúc**: tĩnh phía client — không server, không database. Dữ liệu từ mảng JS → mock API → `localStorage`.
- **Chạy thử**: VS Code + Live Server (cần HTTP, không mở bằng `file://` khi gọi API).

## 2. Các trang

### 2.1. `index.html` — Landing Page
- **Navbar**: brand, link Trang chủ / Dịch vụ / Bác sĩ / Liên hệ, nút "Đặt lịch khám" (collapse trên mobile).
- **Hero**: tiêu đề, mô tả, 2 CTA ("Đặt lịch khám", "Xem bác sĩ"), ảnh minh hoạ. Responsive 375→1440px.
- **Services**: 6 thẻ dịch vụ (icon, tiêu đề, mô tả) — `col-md-6 col-lg-4`.
- **Doctors**: bộ lọc theo chuyên khoa (`<select>`) + ô tìm kiếm tên; lưới card bác sĩ render bằng JS; nút "Đặt lịch" trên card mở modal đặt lịch nhanh.
- **Testimonials**: 3 đánh giá của bệnh nhân.
- **Footer**: thông tin liên hệ, giờ làm việc, link nhanh, bản quyền.

### 2.2. `booking.html` — Đặt lịch khám (đa bước)
- **Bước 1 — Chọn dịch vụ & bác sĩ**: chọn chuyên khoa → chọn bác sĩ (hiện giá, kinh nghiệm).
- **Bước 2 — Thông tin bệnh nhân**: họ tên, số điện thoại, email, ngày khám (không ở quá khứ), giờ khám.
- **Bước 3 — Xác nhận**: tóm tắt thông tin, nút "Xác nhận đặt lịch".
- **Validate**: từng bước, chặn submit khi chưa hợp lệ; hiển thị lỗi theo chuẩn Bootstrap.
- **Kết quả**: lưu vào `localStorage`, hiện modal xác nhận thành công.

### 2.3. `admin.html` — Admin Dashboard
- **Metrics cards**: tổng lịch hẹn, lịch hôm nay, chờ xác nhận, đã hoàn thành (tính từ dữ liệu).
- **Data table**: cột bệnh nhân, chuyên khoa, bác sĩ, ngày, giờ, trạng thái, thao tác.
- **Tìm kiếm**: lọc theo tên bệnh nhân.
- **Lọc trạng thái**: pending / confirmed / completed / cancelled.
- **Thao tác**: cập nhật trạng thái, xoá lịch hẹn (có xác nhận).
- **Dữ liệu**: đọc/ghi `localStorage`, seed dữ liệu mẫu khi trống.

## 3. Mô hình dữ liệu

```js
const doctors = [
  { id: 1, name: "BS. Nguyễn Văn An", specialty: "Nội tổng hợp", experience: 12,
    fee: 300000, avatar: "assets/images/doctor-1.jpg" }
  // ... 6 bác sĩ
];

// appointment — trạng thái bốn giá trị xuyên suốt
const appointment = {
  id: 1710000000000,          // Date.now()
  patientName: "Trần Thị Bình",
  phone: "0901234567",
  specialty: "Tim mạch",
  doctorName: "BS. Lê Hoàng Cường",
  date: "2026-10-05",          // ISO yyyy-mm-dd
  time: "09:00",
  status: "pending"            // pending | confirmed | completed | cancelled
};
```

- **Chuyên khoa**: Nội tổng hợp, Nhi khoa, Tim mạch, Da liễu, Sản phụ khoa, Tai Mũi Họng.
- **localStorage key**: `highland_appointments`.
- **Mock API** (chương 11): `GET /doctors`, `GET /appointments`, `POST /appointments` — chạy bằng JSON Server (`npx json-server db.json --port 3000`) hoặc mock thuần `Promise + setTimeout`.

## 4. Thiết kế (design tokens)

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--hh-primary` | `#0f766e` | nút chính, link, badge, accent |
| `--hh-dark` | `#0f172a` | chữ tiêu đề, footer |
| `--hh-light` | `#f0fdfa` | nền section xen kẽ |
| `--hh-border` | `#e2e8f0` | viền card, bảng |
| `--hh-muted` | `#475569` | chữ mô tả |

- Typography: hệ font mặc định (Bootstrap), heading dùng `display-*`/`h1–h6`, thân dùng `lead` khi cần.
- Bo góc: `rounded-3`/`rounded-4` cho card; shadow: `shadow-sm`.
- Ngôn ngữ giao diện: tiếng Việt.

## 5. Tiêu chí hoàn thành (Definition of Done)

- [ ] Cả 3 trang chạy bằng Live Server, không lỗi Console.
- [ ] Landing: render + lọc bác sĩ; nút đặt lịch mở modal và lưu được lịch hẹn.
- [ ] Booking: 3 bước, validate đầy đủ, chặn ngày quá khứ, lưu thành công có thông báo.
- [ ] Admin: metrics đúng số liệu; tìm kiếm/lọc/cập nhật/xoá hoạt động; dữ liệu sống sót sau reload.
- [ ] Responsive tốt 320–1440px; Lighthouse ≥ 90 cho Accessibility; không tràn ngang.
- [ ] Đã deploy lên GitHub Pages hoặc Vercel (tuỳ chọn, khuyến khích).
