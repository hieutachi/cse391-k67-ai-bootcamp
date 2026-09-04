# Buttons, Badges & Alerts

## Mục tiêu bài học
- Dựng nút đủ biến thể: `btn btn-primary`, `btn-outline-*`, `btn-lg`/`btn-sm`, trạng thái `disabled`
- Gắn `badge` để đánh dấu trạng thái "Mới", "Sắp hết chỗ", "Đã xác nhận"
- Tạo `alert` thông báo success/danger/warning có thể đóng được
- Áp dụng cả ba vào luồng "Đặt lịch khám" của Highland Hospital

## Buttons: một class nền, vô số biến thể

Mọi nút Bootstrap bắt đầu bằng `btn`, rồi thêm màu và kích thước (có cả `btn-lg`, `btn-sm`):

```html
<button class="btn btn-primary">Đặt lịch khám</button>
<button class="btn btn-outline-primary">Xem bác sĩ</button>
<button class="btn btn-success">Xác nhận lịch hẹn</button>
<button class="btn btn-danger">Hủy lịch hẹn</button>
<button class="btn btn-primary" disabled>Đang xử lý…</button>
<a class="btn btn-outline-success" href="tel:19001234">Gọi hotline</a>
```

Quy tắc phối màu theo ý nghĩa — rất quan trọng với sản phẩm y tế: `primary` cho hành động chính (một trang chỉ nên có **một** nút chính); `outline-*` cho hành động phụ; `success`/`danger`/`warning` cho kết quả xác nhận/hủy/đang chờ; `disabled` kèm `aria-disabled="true"` nếu là thẻ `<a>`. Lưu ý `<a class="btn ...">` cũng hiện như nút — dùng khi hành động là điều hướng, còn `<button>` cho gửi form hay chạy JavaScript.

## Badges: nhãn trạng thái nhỏ

```html
<h2>
  Dịch vụ nổi bật
  <span class="badge text-bg-primary">6 dịch vụ</span>
</h2>
<span class="badge text-bg-success">Còn chỗ</span>
<span class="badge text-bg-warning">Sắp kín</span>
<span class="badge text-bg-danger">Hết chỗ</span>
```

`text-bg-*` tự lo tương phản chữ/nền; `rounded-pill` biến badge thành viên thuốc tròn; ghép `position-relative`/`absolute` để badge bám góc nút như thông báo chưa đọc:

```html
<button class="btn btn-primary position-relative">
  Tin nhắn
  <span class="badge text-bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">3</span>
</button>
```

## Alerts: thông báo + đóng được

Alert là hộp thông báo; muốn có nút đóng thì thêm `alert-dismissible` (cần JS bundle đã cài ở bài đầu chương):

```html
<div class="alert alert-success" role="alert">
  <strong>Thành công!</strong> Lịch khám của bạn đã được ghi nhận.
</div>

<div class="alert alert-danger" role="alert">
  <strong>Lỗi:</strong> số điện thoại chưa đúng định dạng.
</div>

<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Lưu ý:</strong> đến trước giờ hẹn 15 phút để làm thủ tục.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Đóng"></button>
</div>
```

`role="alert"` cho trình đọc màn hình biết đây là thông báo quan trọng. Nút `.btn-close` có `data-bs-dismiss="alert"` — bấm X là alert biến mất nhờ `bootstrap.bundle.min.js`; thiếu script thì nút X không hoạt động.

## Ví dụ tổng hợp: khu đặt lịch

```html
<section class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2 class="mb-4">Đặt lịch khám</h2>
      <!-- Alert giả lập form lỗi (thường do JS sinh động) -->
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Vui lòng điền đầy đủ họ tên và số điện thoại.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Đóng"></button>
      </div>
      <p class="mb-4">
        Gói khám tổng quát
        <span class="badge text-bg-success">Còn chỗ hôm nay</span>
      </p>
      <button class="btn btn-primary btn-lg w-100 mb-2">Đặt lịch ngay</button>
      <button class="btn btn-outline-primary w-100">So sánh các gói khám</button>
    </div>
  </div>
</section>
```

Chú ý `w-100`: nút chính chiếm trọn cột trên màn hình hẹp — cùng ý tưởng "CTA to trên mobile" của Hero Chương 6; nút phụ outline đặt dưới để mắt chỉ thấy một hành động chính.

## Prompt mẫu: AI dựng khu đặt lịch

```text
Dùng Bootstrap 5 dựng khu "Đặt lịch khám" cho Highland Hospital trong
.container: bên trái (col-lg-7) là form họ tên, số điện thoại, chọn
chuyên khoa, nút submit btn-primary btn-lg; bên phải (col-lg-5) là card
tóm tắt gói khám gồm badge "Còn chỗ" màu success và một alert-warning
có nút đóng nhắc mang CCCD khi đến khám. Chỉ dùng class Bootstrap, thêm
data-bs-dismiss cho alert. Giải thích ngắn vì sao chọn từng biến thể
button/badge/alert.
```

## Thực hành

- Dựng lại khu đặt lịch ở ví dụ tổng hợp; bấm thử nút X trên alert xem có đóng được không.
- Tạo ba badge trạng thái lịch hẹn ("Còn chỗ"/"Sắp kín"/"Hết chỗ") và đổi màu đúng ngữ nghĩa.
- Gửi prompt cho AI, đối chiếu và sửa phần AI chọn sai biến thể.

## Bài tiếp theo

Đã rành nút, badge, alert — bài Lab tới ráp nối toàn bộ kỹ năng Bootstrap (lưới + utilities) để dựng section "Dịch vụ khám" của Highland Hospital.