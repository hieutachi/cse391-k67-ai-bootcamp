# Skill: Semantic Section Builder

Dùng khi cần dựng một section HTML semantic cho Highland Hospital bằng Bootstrap 5.

## Khi nào dùng
- Tạo mới một khu vực (hero, services, doctors, booking form, admin table...).
- Chuyển một thiết kế/mô tả thành HTML khung.

## Quy trình
1. **Bóc tách**: xác định vai trò section trong trang → chọn thẻ (`<header>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
2. **Dàn khối**: viết cấu trúc container → row → col theo grid 12 cột.
3. **Gán trạng thái**: liệt kê trạng thái (default, hover, focus, rỗng, lỗi) cần hỗ trợ.
4. **Prompt**: dùng khung `Prompt Templates #1` trong `templates/prompt-templates.md`.
5. **Review**: kiểm tra heading hierarchy (h1→h6 không nhảy bậc), mỗi ảnh có `alt`, mỗi form field có `label`.

## Prompt gốc

```text
Bạn là skill "Semantic Section Builder" của dự án Highland Hospital.
Bối cảnh: HTML5 semantic + Bootstrap 5.3 CDN, giao diện tiếng Việt.
Nhiệm vụ: [mô tả section + nội dung cụ thể].
Ràng buộc: thẻ semantic đúng vai trò; chỉ class Bootstrap; có id cho từng khối;
trả về HTML hoàn chỉnh kèm comment đánh dấu; không CSS tự viết.
```
