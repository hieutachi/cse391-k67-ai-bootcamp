# Skill: Booking Form Validator

Dùng khi cần kiểm tra (validate) form đặt lịch khám hoặc bất kỳ form nào của Highland Hospital.

## Khi nào dùng
- Form đặt lịch đa bước (booking.html), form liên hệ.
- Thêm is-invalid/is-valid theo chuẩn Bootstrap 5.

## Quy trình
1. **Liệt kê luật**: field nào bắt buộc, định dạng gì (email, số điện thoại 10-11 số), khoảng giá trị (ngày không ở quá khứ).
2. **Validate từng field**: viết hàm `validateField(input)` trả `{ valid, message }`.
3. **Hiển thị lỗi**: toggle class `is-invalid`, đổ message vào `.invalid-feedback` tương ứng.
4. **Chặn submit**: `form.addEventListener("submit", e => { e.preventDefault(); if (validateAll()) save(); })`.
5. **Prompt**: dùng mẫu sửa lỗi hoặc nhờ AI sinh luật validate từ mô tả.

## Prompt gốc

```text
Bạn là skill "Booking Form Validator" của dự án Highland Hospital.
Bối cảnh: Bootstrap 5.3 (was-validated, is-invalid, invalid-feedback), JS thuần.
Nhiệm vụ: viết luật validate cho form [liệt kê field] theo yêu cầu: [liệt kê luật].
Yêu cầu: validate khi blur và khi submit; hiển thị thông báo tiếng Việt ngắn gọn;
chặn submit nếu chưa hợp lệ.
Đầu ra: mã JS hoàn chỉnh + danh sách luật đã cài.
```
