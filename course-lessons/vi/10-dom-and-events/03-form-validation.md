# Form Validation phía client

## Mục tiêu bài học
- Hiểu giới hạn của `required` thuần HTML5 và vì sao phải validate bằng JavaScript
- Viết hàm kiểm tra định dạng email, số điện thoại, field bắt buộc
- Hiển thị lỗi cạnh field bằng Bootstrap `is-invalid` / `is-valid`
- Dựng luồng validate cho form đặt lịch khám Highland Hospital

## Vì sao không chỉ dựa vào HTML5 required

```html
<input type="email" required>
```

HTML5 `required` và `type="email"` chặn được form gửi đi, nhưng **chưa đủ**:

- Trình duyệt tự hiện bong bóng lỗi — bạn không kiểm soát nội dung, ngôn ngữ, vị trí, style.
- Bệnh nhân gõ `abc@def` vẫn "hợp lệ" với HTML5 dù không phải email liên hệ được.
- Không tách được luồng kiểm tra riêng để tái dùng cho form đa bước (chương 11).
- Validation phải là **tầng logic của riêng bạn**: bạn quyết định "hợp lệ" là gì và hiển thị lỗi đúng ngôn ngữ, đúng chỗ bạn muốn.

## Luồng validate chuẩn: thu thập → kiểm tra → hiển thị

```js
const form = document.querySelector('#booking-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();                     // 1. chặn reload

  const values = {
    name: form.querySelector('#patient-name').value.trim(),
    phone: form.querySelector('#patient-phone').value.trim(),
    email: form.querySelector('#patient-email').value.trim(),
  };
  const errors = validate(values);            // 2. chạy mọi luật

  if (Object.keys(errors).length > 0) {
    showErrors(errors);                       // 3. còn lỗi → tô đỏ + báo
    return;
  }
  console.log('Hợp lệ — tiến hành đặt lịch:', values);
});

function validate({ name, phone, email }) {
  const errors = {};
  if (name.length < 2) errors.name = 'Vui lòng nhập họ tên (tối thiểu 2 ký tự).';

  if (phone === '') errors.phone = 'Vui lòng nhập số điện thoại.';
  else if (!/^(0|\+84)\d{9,10}$/.test(phone.replace(/[\s.-]/g, '')))
    errors.phone = 'Số điện thoại không hợp lệ (VD: 0912 345 678).';

  if (email === '') errors.email = 'Vui lòng nhập email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = 'Email không đúng định dạng (VD: benh-nhan@example.com).';

  return errors;
}
```

Cách viết này tách ba việc: lấy dữ liệu, kiểm tra (hàm thuần, không đụng DOM — dễ test, dễ tái dùng), hiển thị lỗi.

## Hiển thị lỗi cạnh field với Bootstrap

Bootstrap có sẵn cơ chế: class `is-invalid` trên input tô viền đỏ, `.invalid-feedback` đặt **ngay sau** input sẽ hiện thông báo:

```js
function showErrors(errors) {
  // reset form về trạng thái sạch trước khi vẽ lỗi mới
  form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));

  for (const [fieldName, message] of Object.entries(errors)) {
    const input = form.querySelector(`#${fieldName}`);
    if (!input) continue;
    input.classList.add('is-invalid');                 // viền đỏ
    const feedback = input.nextElementSibling;         // div.invalid-feedback
    if (feedback) feedback.textContent = message;      // ghi lỗi đúng chỗ
  }
}
```

HTML tương ứng trong form:

```html
<div class="mb-3">
  <label for="patient-email" class="form-label">Email</label>
  <input type="email" class="form-control" id="patient-email">
  <div class="invalid-feedback">Email không hợp lệ</div>
</div>
```

Có thể thêm `is-valid` + `.valid-feedback` với dấu tích xanh khi field hợp lệ — nhưng đừng tô xanh khi người dùng chưa gõ gì; chỉ tô sau khi họ rời field (`blur`) hoặc sau submit.

> Mẹo UX: đừng hét lỗi trong lúc người dùng đang gõ dở. Luồng hay dùng: **validate lần đầu khi submit → về sau validate lại mỗi lần `input`** để lỗi tự biến mất khi sửa đúng.

```js
form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', () => {
    if (input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');   // gõ lại là xoá trạng thái lỗi cũ
    }
  });
});
```

## Prompt AI mẫu

```text
Form đặt lịch Highland Hospital (Bootstrap 5, JS thuần ES6+, tiếng Việt):
các field #patient-name, #patient-phone, #patient-email, #appointment-date.
Viết JS validate: name ≥ 2 ký tự; phone Việt Nam hợp lệ (10-11 số, đầu 0
hoặc +84); email đúng định dạng; ngày khám là hôm nay hoặc tương lai.
Hiển thị lỗi tiếng Việt cạnh field bằng .is-invalid + .invalid-feedback,
xoá lỗi khi người dùng gõ lại, chặn submit nếu còn lỗi. Không dùng HTML5
required làm nguồn kiểm tra chính.
```

## Thực hành
1. Dựng form đặt lịch (có từ chương 8), thêm 4 field như trên kèm `.invalid-feedback`.
2. Viết `validate()` + `showErrors()` và nối vào sự kiện `submit`.
3. Thử: submit form trống, gõ email sai, chọn ngày quá khứ — quan sát lỗi hiện đúng chỗ.
4. Mở DevTools → tab Network, kiểm tra trang **không bị reload** sau khi submit.

## Bài tiếp theo

Dữ liệu hợp lệ rồi thì lưu vào đâu để lần mở lại trang vẫn còn? Bài sau — localStorage, nơi Highland Hospital cất danh sách lịch hẹn.
