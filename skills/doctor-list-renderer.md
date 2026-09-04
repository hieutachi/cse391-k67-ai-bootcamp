# Skill: Doctor Card / List Renderer

Dùng khi cần render danh sách bác sĩ, dịch vụ hoặc lịch hẹn từ mảng dữ liệu ra giao diện.

## Khi nào dùng
- Render `doctors` / `appointments` từ `js/data.js` hoặc mock API.
- Thêm bộ lọc/tìm kiếm cho một danh sách.

## Quy trình
1. **Định hình dữ liệu**: nhắc lại shape `doctor`/`appointment` (xem `templates/PROJECT_CONTEXT.md`).
2. **Viết component render**: hàm thuần `itemCard(item)` trả template literal; nhúng đúng `data-id`.
3. **Render + delegation**: `container.innerHTML = list.map(itemCard).join("")`; gắn một listener trên container.
4. **Xử lý rỗng**: khi danh sách rỗng, render thông báo thay vì để trống.
5. **Prompt**: dùng `Prompt Templates #2` và #3 trong `templates/prompt-templates.md`.

## Prompt gốc

```text
Bạn là skill "Doctor Card Renderer" của dự án Highland Hospital.
Bối cảnh: JS ES6+ thuần, dữ liệu mảng [mô tả shape] có sẵn.
Nhiệm vụ: viết hàm render + hàm lọc theo [điều kiện].
Yêu cầu: dùng map/filter; template literal; nút tương tác có data-id;
xử lý trường hợp danh sách rỗng; không thêm dependency.
Đầu ra: mã hoàn chỉnh + giải thích ngắn luồng dữ liệu.
```
