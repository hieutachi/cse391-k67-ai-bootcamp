# Bonus — Phân tích giao diện Figma bằng Prompt chuẩn

## Mục tiêu bài học
- Biết cách "đọc" một frame Figma thành thông tin AI cần, thay vì dán ảnh và nói chung chung
- Nắm khung prompt chuẩn phân tích thiết kế (bóc tách layout, thành phần, trạng thái)
- Dùng được ngay với thiết kế Highland Hospital

## Vì sao "nhìn ảnh" chưa đủ

AI xử lý ảnh tốt, nhưng để sinh ra code HTML/Bootstrap dùng được ngay, nó cần những quyết định bạn chưa nói ra: section này đặt trong khối nào? Khoảng cách giữa các card là bao nhiêu? Nút "Đặt lịch" khi hover đổi màu ra sao? Trên mobile, hàng 4 cột có còn là 4 cột không?

Nếu không nói, AI sẽ **tự bịa** — và phần bịa thường không khớp design system của bạn. Khung prompt chuẩn dưới đây ép bạn bóc tách thiết kế thành 5 nhóm thông tin, đúng tinh thần bước 1 (Define) của AI-Accelerated Workflow.

## Khung prompt chuẩn phân tích Figma

Khi có một frame Figma (dán ảnh chụp hoặc link Figma nếu công cụ đọc được), hãy dùng đúng cấu trúc này:

```text
Bạn là chuyên gia phân tích thiết kế UI. Hãy phân tích frame sau đây theo 5 mục,
mỗi mục trả lời ngắn gọn bằng bullet, KHÔNG viết code:

1. BỐ CỤC TỔNG THỂ: frame này là section gì của trang? Nằm giữa section nào và section nào?
   Bên trong gồm những khối lớn nào, xếp theo chiều dọc hay ngang?
2. LƯỚI & CĂN CHỈNH: đếm số cột trong từng hàng; khoảng cách giữa các phần tử (ước lượng theo
   bội số 4px/8px); lề trái/phải so với container; phần tử nào căn giữa, phần tử nào căn trái.
3. THÀNH PHẦN (component): liệt kê từng thành phần lặp lại (card, button, input, badge...)
   và cấu trúc bên trong của nó.
4. TRẠNG THÁI: với mỗi thành phần tương tác, nêu các trạng thái cần có
   (default, hover, focus, disabled, active, rỗng, lỗi) và điểm khác biệt về màu/đổ bóng.
5. RESPONSIVE: dự đoán cách layout này nên chuyển đổi ở 768px và 375px
   (bao nhiêu cột, phần tử nào ẩn đi, nút nào chuyển full-width).

Bối cảnh dự án: Highland Hospital, HTML5 semantic + Bootstrap 5.3, tiếng Việt,
design token --hh-primary #0f766e, --hh-dark #0f172a, --hh-light #f0fdfa.
```

## Đọc kết quả phân tích

Đầu ra 5 mục này chính là **đặc tả cắt giao diện** — thứ bạn sẽ dán vào prompt sinh code ở bài sau. Khi nhận kết quả, hãy kiểm tra ba điểm dễ sai:

- **Số cột**: AI hay đếm nhầm hàng 3 cột thành 4. Đối chiếu lại frame.
- **Khoảng cách**: nếu frame không có thước đo, mọi con số đều là ước lượng — bạn phải xác nhận bằng design token thật của dự án.
- **Trạng thái**: AI thường chỉ liệt kê default + hover. Hỏi thêm: "Còn trạng thái focus, disabled, rỗng thì sao?"

## Ví dụ áp dụng cho Highland Hospital

Giả sử bạn cần phân tích **section đặt lịch hẹn nhanh** trên trang chủ. Thay vì hỏi:

> "Dựng giúp tôi cái form đặt lịch như trong ảnh"

Hãy dùng khung chuẩn, và sau khi có kết quả, bạn sẽ có một đặc tả đại loại:

- Bố cục: 2 cột — trái là thông tin + số điện thoại, phải là form.
- Form gồm 4 trường (chuyên khoa, bác sĩ, ngày, giờ) xếp 2 cột, nút submit full-width.
- Trạng thái: input có `is-invalid` kèm thông báo; nút disabled khi chưa đủ thông tin.
- Responsive: dưới 768px chuyển 1 cột, form xếp chồng.

## Thực hành

1. Chọn một section bất kỳ trên trang chủ Highland Hospital (hoặc thiết kế bạn đang làm).
2. Dán khung prompt chuẩn vào Gemini/Claude/ChatGPT kèm ảnh chụp thiết kế.
3. Kiểm tra kết quả theo 3 điểm dễ sai ở trên, sửa lại những chỗ AI đếm/ước lượng sai.
4. Lưu đặc tả thu được — bài sau sẽ dùng chính đặc tả này để sinh code Bootstrap.

## Bài tiếp theo

Đã có đặc tả chuẩn — bài sau trang bị khung prompt sinh code Bootstrap 5 trực tiếp từ đặc tả đó, kèm các ràng buộc để code ra "dùng được ngay".
