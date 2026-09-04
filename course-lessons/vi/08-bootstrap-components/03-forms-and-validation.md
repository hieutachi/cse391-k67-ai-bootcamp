# Bootstrap Forms & Validation

## Mục tiêu bài học
- Tạo form đúng chuẩn Bootstrap: `form-control`, `form-label`, `form-select`, `form-check`
- Gộp label và input gọn gàng bằng `input-group` và floating labels
- Bật validation phía client bằng class `was-validated` + thông báo `invalid-feedback`
- Dựng form đặt lịch khám Highland Hospital validate họ tên, email, số điện thoại, ngày khám, chuyên khoa

## Form chuẩn Bootstrap

Mọi input text đều khoác `form-control` để Bootstrap căn chiều cao, viền và trạng thái focus đồng bộ. Mỗi ô có một `label` đi kèm bằng class `form-label`:

```html
<div class="mb-3">
  <label for="fullName" class="form-label">Họ và tên</label>
  <input type="text" class="form-control" id="fullName" placeholder="VD: Nguyễn Văn An">
</div>
```

- `for` ở label trỏ đúng `id` ở input — bấm vào label là con trỏ nhảy vào ô (tốt cho accessibility)
- `mb-3` tạo khoảng cách dọc giữa các trường

## Các trường còn lại

```html
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" placeholder="an.nguyen@email.com">
</div>

<div class="mb-3">
  <label for="phone" class="form-label">Số điện thoại</label>
  <input type="tel" class="form-control" id="phone" placeholder="0901 234 567">
</div>

<div class="mb-3">
  <label for="specialty" class="form-label">Chuyên khoa</label>
  <select class="form-select" id="specialty">
    <option value="">-- Chọn chuyên khoa --</option>
    <option>Nội tổng hợp</option>
    <option>Tim mạch</option>
    <option>Nhi khoa</option>
    <option>Răng hàm mặt</option>
  </select>
</div>

<div class="mb-3">
  <label for="apptDate" class="form-label">Ngày khám</label>
  <input type="date" class="form-control" id="apptDate">
</div>
```

Dropdown dùng `form-select` thay vì `form-control`. `input[type=date]` hiện date picker của trình duyệt — thử bấm vào ô để xem.

## Floating labels — tiết kiệm diện tích

Label nằm lơ lửng bên trong ô và trượt lên khi bạn nhập:

```html
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingName" placeholder="Họ và tên">
  <label for="floatingName">Họ và tên</label>
</div>
```

Lưu ý: với floating label, **placeholder bắt buộc phải có** dù hiển thị trống, vì nó được dùng làm "chỗ ngồi" cho label; và thứ tự input phải đứng trước label.

## Input group — tiền tố/hậu tố cho ô nhập

```html
<div class="input-group mb-3">
  <span class="input-group-text">📞</span>
  <input type="tel" class="form-control" id="phoneGroup" placeholder="Số điện thoại">
</div>
```

Hữu ích khi muốn thêm icon, đơn vị tiền tệ hay nút vào ngay trong ô.

## Validation: `was-validated` + `invalid-feedback`

Bootstrap có sẵn kiểu đỏ/xanh cho trạng thái hợp lệ, nhưng chỉ hiển thị khi form khoác class `was-validated` — bạn bật class này từ JavaScript khi người dùng bấm nút gửi (chương 9–10 sẽ làm kỹ). Ô bắt buộc cần thêm `required`:

```html
<form class="row g-3 needs-validation" id="bookingForm" novalidate>
  <div class="col-md-6">
    <label for="name" class="form-label">Họ và tên</label>
    <input type="text" class="form-control" id="name" required>
    <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
  </div>
  <!-- các trường khác: email, phone, specialty, date -->
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Xác nhận đặt lịch</button>
  </div>
</form>
```

Cơ chế:
- `novalidate` tắt tooltip mặc định của trình duyệt để Bootstrap tự lo
- `required` (hoặc `pattern`/`min`/`max`) là ràng buộc thật; Bootstrap chỉ tô màu
- Khi ô lỗi: hiện `.invalid-feedback`; ô đúng: `:valid` tự tô xanh nhờ CSS của Bootstrap
- `row g-3` + `col-md-6` giúp hai trường nằm cạnh nhau trên màn hình lớn, chồng nhau trên mobile — grid chương 7 phối hợp với form

Ví dụ email định dạng sai: `type="email"` + `required` đủ để Bootstrap báo lỗi; với số điện thoại bạn có thể thêm `pattern="[0-9]{10,11}"`.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Tôi đang xây form đặt lịch khám cho website Highland Hospital bằng Bootstrap 5. Viết form có các trường: họ và tên (text, required), email (email, required), số điện thoại Việt Nam (tel, pattern 10–11 chữ số, required), chuyên khoa (form-select, required), ngày khám (date, required), và nút submit "Xác nhận đặt lịch". Mỗi trường phải có label, invalid-feedback tiếng Việt tương ứng; form dùng class `needs-validation` và `novalidate`, sẵn sàng bật `was-validated` bằng JavaScript sau này. Dùng grid hai cột trên desktop.

## Thực hành
1. Tạo `booking.html`, dựng form đặt lịch với các class đã học và `invalid-feedback` tiếng Việt cho từng trường.
2. Tạm thêm class `was-validated` vào thẻ `<form>` (sửa tay trong DevTools) rồi bấm nút submit để xem trạng thái lỗi/đúng.
3. Thử điền email sai định dạng, số điện thoại thiếu số — quan sát thông báo.
4. Chuyển một trường sang floating label và một trường sang input-group.
5. Chạy prompt mẫu với AI, so sánh cấu trúc grid và feedback với bản của bạn.

## Bài tiếp theo

Form đã "biết" báo lỗi; bài sau làm nó trở nên sống động hơn với Modal xác nhận, Offcanvas cho bộ lọc và Accordion cho phần FAQ.
