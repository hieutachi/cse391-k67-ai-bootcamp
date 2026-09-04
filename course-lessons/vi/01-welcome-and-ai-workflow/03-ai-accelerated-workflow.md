# AI-Accelerated Workflow 4 bước

## Mục tiêu bài học
- Nắm được vòng lặp 4 bước dùng cho mọi bài trong khoá học
- Phân biệt "soạn thảo bằng AI" với "phân tích & thấu hiểu" — bước quyết định chất lượng
- Áp dụng thử quy trình vào một việc cắt giao diện nhỏ

## Vòng lặp 4 bước

Khoá học không dạy bạn "copy-paste code mù quáng" từ AI. Thay vào đó, mọi bài đều xoay quanh một vòng lặp — gọi là **AI-Accelerated Workflow**:

### 1. Phân tích yêu cầu (Define)
Đọc bản thiết kế Figma hoặc mô tả, bóc tách cấu trúc khối: vùng nào là Box Model gì, hàng nào nên là Flexbox, khu nào là lưới Grid, có những component và trạng thái tương tác nào (hover, focus, rỗng, lỗi). Viết ra 3–5 câu đặc tả trước khi đụng đến AI.

### 2. Soạn thảo với AI (Draft)
Viết prompt chính xác dựa trên đặc tả ở bước 1 — kèm bối cảnh dự án, ràng buộc và định dạng đầu ra. Nhận bản nháp HTML/CSS/JS. Bản nháp này **chưa phải code** — nó là tài liệu để bạn học và sửa.

### 3. Phân tích & thấu hiểu (Analyze)
Đọc từng dòng code AI sinh ra và trả lời được ba câu: *Tại sao dùng thẻ/class này? Layout này vận hành thế nào? Luồng dữ liệu và sự kiện ra sao?* Nếu giải thích không được một dòng nào, đừng giữ dòng đó.

### 4. Tinh chỉnh & tối ưu (Refine)
Chỉnh responsive breakpoints, sửa lỗi hiển thị, chuẩn hoá class theo Bootstrap utilities, tách hàm lặp lại. Kiểm tra trên nhiều kích thước màn hình rồi mới coi là xong.

## Vì sao bước 3 là bước quan trọng nhất

AI sinh code nhanh, nhưng nó không phải là người phải bảo trì code đó — bạn mới là người đó. Một đoạn code bạn không hiểu sẽ là món nợ kỹ thuật ngay ngày hôm sau. Ngược lại, nếu bạn hiểu từng dòng, lần sau bạn sẽ tự viết được nhanh hơn, và prompt của bạn cũng tốt hơn vì bạn biết chính xác mình cần gì.

```text
Áp dụng quy trình 4 bước để phản hồi yêu cầu sau của tôi:
Bước 1 tôi sẽ mô tả thiết kế; bước 2 bạn sinh code;
bước 3 tôi hỏi bạn giải thích từng phần; bước 4 tôi nhờ bạn sửa theo nhận xét.
Đừng làm thay tôi bước 1 và bước 3.
```

## Một vòng lặp mẫu với Highland Hospital

Giả sử bạn cần dựng khu danh sách bác sĩ:

1. **Define** — "Hàng 4 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile. Mỗi card: ảnh, tên, chuyên khoa, nút đặt lịch."
2. **Draft** — prompt cho AI xin khung HTML + CSS.
3. **Analyze** — hỏi AI: "Vì sao chỗ này dùng `flex-wrap`? Nếu tên bác sĩ dài hai dòng thì card có vỡ không?"
4. **Refine** — yêu cầu: "Giữ nguyên cấu trúc, thêm trạng thái hover và chống tràn khi tên dài."

## Thực hành

Lấy một đoạn giao diện bạn đã làm (hoặc một card bất kỳ trên web bạn thích). Chạy đủ 4 bước: viết đặc tả, nhờ AI dựng, tự giải thích từng dòng thành tiếng Việt, rồi yêu cầu AI sửa đúng một điểm bạn chọn. Ghi lại thời gian từng bước — bạn sẽ thấy bước 3 tuy chậm nhưng giúp bước 4 lần sau ngắn đi rất nhiều.

## Bài tiếp theo

Quy trình cần một môi trường để chạy: bài sau hướng dẫn thiết lập VS Code, Live Server và DevTools để bạn có nơi kiểm tra mọi bản nháp.
