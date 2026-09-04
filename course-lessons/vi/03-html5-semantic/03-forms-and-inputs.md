# Forms & các kiểu Input hiện đại

## Mục tiêu bài học
- Dựng form HTML chuẩn: `form`, `label`, các kiểu `input`, `select`, `textarea`
- Dùng đúng thuộc tính `required`, `placeholder`, `autocomplete` cho trải nghiệm tốt
- Xây được form đặt lịch khám cho Highland Hospital

## Form là "cửa hàng" của trang web

Form là nơi người dùng giao dữ liệu cho bạn — với Highland Hospital, đó là thông tin cá nhân và yêu cầu khám. HTML hiện đại giúp form **tự kiểm tra hợp lệ cơ bản mà không cần một dòng JavaScript**: chọn đúng kiểu `input` là đã được nửa chặng đường.

## Các khối xây dựng

- `<form>` — khung chứa, với `action` (nơi gửi dữ liệu) và `method`. Trong giai đoạn chưa có server, dùng `action="#"` và để JavaScript (chương 10) xử lý.
- `<label>` — nhãn đi kèm mỗi ô nhập; thuộc tính `for` trỏ tới `id` của ô. Label vừa giúp người dùng biết cần điền gì, vừa là "tay cầm" cho trình đọc màn hình và cho thao tác bấm vào nhãn để focus ô.
- `<input>` — ô nhập; kiểu được quyết định bởi thuộc tính `type`:

| type | Dùng cho | Trình duyệt tự cho gì |
|---|---|---|
| `text` | Họ tên | — |
| `email` | Địa chỉ email | Bàn phím có `@`, tự kiểm tra định dạng |
| `tel` | Số điện thoại | Bàn phím số trên mobile |
| `date` | Ngày khám | Bộ chọn lịch có sẵn |
| `number` | Số (cân nặng, tuổi) | Nút tăng/giảm, chỉ nhận số |
| `radio` | Chọn 1 trong nhóm | — |
| `checkbox` | Chọn nhiều / đồng ý điều khoản | — |
| `password` | Mật khẩu | Che ký tự |

- `<select>` + `<option>` — dropdown chọn một trong nhiều giá trị (chuyên khoa, chi nhánh).
- `<textarea>` — ô nhập nhiều dòng (triệu chứng mô tả, ghi chú).

## Thuộc tính làm nên trải nghiệm

- `required` — không cho submit khi ô trống; kèm `:invalid` mặc định của CSS ta có thể định kiểu.
- `placeholder` — ví dụ gợi ý ("VD: Nguyễn Văn A"). Chỉ là gợi ý, **không thay thế label** — vì placeholder biến mất khi gõ và gây khó cho người dùng trình đọc màn hình.
- `autocomplete` — cho phép trình duyệt tự điền (`name`, `email`, `tel`...). Với form y tế, **không** đặt `autocomplete="on"` chung; chỉ bật cho từng trường thật sự nên tự điền.
- `name` — tên field gửi lên server (và bài chương 10 sẽ đọc bằng `FormData`). Đừng quên: thiếu `name` thì ô đó không có trong dữ liệu gửi đi.
- Nhóm `radio`/`checkbox` phải dùng chung thuộc tính `name` để trình duyệt biết chúng là một nhóm.

## Form đặt lịch khám mẫu

```html
<form action="#" method="post" id="booking-form">
  <div class="form-group">
    <label for="patient-name">Họ và tên</label>
    <input type="text" id="patient-name" name="patientName"
           placeholder="VD: Nguyễn Thị Hương" required
           autocomplete="name">
  </div>

  <div class="form-group">
    <label for="patient-email">Email</label>
    <input type="email" id="patient-email" name="patientEmail"
           placeholder="ban@email.com" required autocomplete="email">
  </div>

  <div class="form-group">
    <label for="appointment-date">Ngày khám dự kiến</label>
    <input type="date" id="appointment-date" name="appointmentDate" required>
  </div>

  <div class="form-group">
    <label for="specialty">Chuyên khoa</label>
    <select id="specialty" name="specialty" required>
      <option value="">— Chọn chuyên khoa —</option>
      <option value="tim-mach">Tim mạch</option>
      <option value="noi-tong-hop">Nội tổng hợp</option>
      <option value="nhi-khoa">Nhi khoa</option>
    </select>
  </div>

  <button type="submit">Gửi yêu cầu đặt lịch</button>
</form>
```

Đọc lại và tự trả lời: ô nào trình duyệt sẽ tự chặn nếu bỏ trống? Ngày khám có ô nào chặn chọn ngày trong quá khứ không (chưa — bài chương 10 sẽ thêm bằng JS)? Vì sao option đầu tiên có `value=""`? — để `required` hoạt động: người dùng chưa chọn thì giá trị rỗng và bị chặn submit.

## Prompt mẫu: nâng cấp form bằng AI

```text
Bối cảnh: Highland Hospital, trang booking.html. Tôi có form đặt lịch
khám đang chạy gồm họ tên, email, ngày khám, chuyên khoa (dán code form).
Nhiệm vụ: thêm vào form: (1) radio "Giới tính" gồm Nam/Nữ/Khác; (2)
textarea "Mô tả triệu chứng" dài tối đa 500 ký tự; (3) checkbox "Tôi đã
đọc và đồng ý với quy định khám bệnh" bắt buộc.
Ràng buộc: HTML thuần, không Bootstrap, không JavaScript; giữ nguyên các
trường cũ và cấu trúc class .form-group.
Định dạng: trả về toàn bộ <form> mới để tôi thay thế trực tiếp.
```

## Thực hành
Dựng form đặt lịch của Highland Hospital với đủ: họ tên (text), email, số điện thoại (tel), ngày khám (date), chuyên khoa (select), triệu chứng (textarea), checkbox đồng ý quy định. Mở trang, thử bấm Gửi khi để trống vài ô — quan sát thông báo hợp lệ của trình duyệt xuất hiện thế nào.

## Bài tiếp theo

Ngoài form, nội dung bệnh viện còn là giờ làm việc, bảng giá, hình ảnh bác sĩ — bài *Bảng biểu & đa phương tiện* dạy `table`, `img` và `svg` đúng chuẩn.
