# Bonus — Lab: Từ Figma đến Bootstrap trong một phiên làm việc

## Mục tiêu bài học
- Phối hợp trọn vẹn hai khung prompt chuẩn (phân tích Figma → sinh code Bootstrap) vào một quy trình
- Tự đánh giá được chất lượng prompt và chất lượng code AI trả về
- Hoàn thành một section hoàn chỉnh của Highland Hospital từ thiết kế đến HTML chạy được

## Nhiệm vụ

Chọn **một** trong ba section sau của trang chủ Highland Hospital:

1. **Hero** — nền gradient hoặc ảnh, tiêu đề lớn, mô tả, 2 nút CTA.
2. **Services** — 6 thẻ dịch vụ, icon, tiêu đề, mô tả.
3. **Testimonials** — 3 đánh giá bệnh nhân (ảnh, tên, sao, nhận xét).

Nếu bạn có thiết kế Figma thật thì dùng luôn; nếu không, hãy tự vẽ đặc tả chi tiết (có thể nhờ AI vẽ mô tả trước).

## Quy trình 5 bước

### Bước 1 — Phân tích (khung prompt bài 01)
Dán ảnh/mô tả thiết kế + khung prompt phân tích 5 mục. **Kiểm tra** số cột, khoảng cách, trạng thái; sửa những gì AI ước lượng sai.

### Bước 2 — Sinh code (khung prompt bài 02)
Dán đặc tả đã sửa + khung prompt sinh code Bootstrap. Nhận HTML section.

### Bước 3 — Phân tích code (Analyze — bước 3 của workflow)
Với từng dòng code nhận được, trả lời:
- Vì sao dùng `col-md-6` mà không phải `col-6`? *(tránh 2 cột dồn trên màn hình hẹp)*
- Vì sao cần `h-100` trên card? *(đồng chiều cao khi nội dung lệch)*
- Vì sao nút CTA chính là `<a>` điều hướng mà không phải `<button>`? *(vì nó dẫn sang booking.html)*
- Nếu có class lạ, hỏi AI giải thích trước khi giữ lại.

### Bước 4 — Refine
Kiểm tra ở 375px/768px/1440px bằng Device Toolbar. Liệt kê tối đa **3** vấn đề ưu tiên, yêu cầu AI sửa từng vấn đề với prompt chỉ đích danh (không "sửa giúp tất cả").

### Bước 5 — Ghi lại prompt đã dùng
Dán prompt cuối cùng (bản đã sửa) vào cuối file `templates/prompt-templates.md` hoặc file ghi chú riêng — đây là tài sản bạn giữ lại sau khoá học.

## Checklist đánh giá prompt của bạn

| Tiêu chí | Câu hỏi tự kiểm tra |
|---|---|
| Bối cảnh | Prompt có nói rõ dự án Highland Hospital + stack (Bootstrap 5.3, tiếng Việt)? |
| Cụ thể | Có đưa design token / số cột / breakpoint / trạng thái, hay để AI tự đoán? |
| Ràng buộc | Có cấm CSS riêng, inline style, yêu cầu thẻ semantic, heading đúng bậc? |
| Định dạng đầu ra | Có yêu cầu "chỉ trả HTML section, không giải thích"? |
| Vòng lặp sửa | Khi sai, bạn có yêu cầu sửa đúng điểm thay vì viết lại toàn bộ? |

Nếu trả lời "không" từ 2 câu trở lên, hãy sửa prompt rồi chạy lại — đó chính là lúc bạn học nhanh nhất.

## Đánh giá code AI trả về

Code đạt yêu cầu khi:
- Không có inline style, không có CSS riêng thừa (trừ chỗ đánh dấu CUSTOM có lý do).
- Grid mobile-first, đủ breakpoint, card có `h-100`, ảnh có `alt`.
- Heading đúng bậc; nút CTA dùng `<a>` hoặc `<button>` đúng vai trò.
- Mở Live Server: hiển thị khớp thiết kế ở cả 3 kích thước, không tràn ngang.

## Nếu kẹt ở đâu

- **AI sinh code sai quá nhiều** → quay lại bước 1: đặc tả của bạn chưa đủ rõ, hãy bổ sung số cột/khoảng cách/trạng thái trước khi đổ lỗi cho AI.
- **Không biết class Bootstrap nào** → hỏi AI kèm bối cảnh: "Tôi cần [mô tả], class Bootstrap 5 nào phù hợp? Cho 2 phương án kèm ví dụ."
- **Section chạy nhưng xấu** → đừng sửa code mù; chụp màn hình, dán kèm câu hỏi: "So với đặc tả, chỗ nào lệch? Sửa tối thiểu để khớp."

## Kết thúc module

Bạn vừa chạy trọn một phiên **từ Figma đến Bootstrap** đúng quy trình 4 bước của khoá học: Define (phân tích) → Draft (sinh code) → Analyze (đọc hiểu) → Refine (sửa đúng điểm). Lặp lại quy trình này ở mọi section, bạn sẽ cắt cả một trang chủ Highland Hospital trong thời gian rất ngắn mà vẫn hiểu từng dòng code — đó chính là cách Senior Frontend Developer làm việc với AI.
