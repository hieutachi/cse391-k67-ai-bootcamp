# Bản đồ công cụ AI cho Frontend

## Mục tiêu bài học
- Nhận diện bốn nhóm công cụ AI đang được frontend developer dùng hằng ngày
- Biết công cụ nào mạnh cho việc gì, và nên đưa công cụ nào vào quy trình của bạn
- Chọn được bộ công cụ tối thiểu cho khoá học Highland Hospital

## Bốn nhóm công cụ, bốn loại việc

### 1. Chat tổng quát — Gemini, Claude, ChatGPT

Dùng để **bàn phương án trước khi viết code**: hỏi "nên dùng flexbox hay grid cho hàng bác sĩ này", nhờ giải thích đoạn CSS lạ, hoặc nhờ review một hàm JavaScript. Điểm mạnh là bạn có thể dán code, dán lỗi, hỏi đi hỏi lại mà không sợ làm hỏng file đang mở.

```text
Tôi đang dựng trang chủ cho bệnh viện Highland Hospital bằng HTML + CSS thuần.
Tôi muốn hiển thị 6 thẻ dịch vụ, mỗi thẻ có icon, tiêu đề, mô tả 2 dòng.
Nên dùng Flexbox hay CSS Grid cho layout này? Giải thích lý do trong 5 câu,
kèm một đoạn code tối thiểu cho cả hai cách.
```

### 2. AI trong editor — GitHub Copilot, Cursor, VS Code Copilot

Hoạt động ngay trong file bạn đang sửa: gợi ý dòng tiếp theo, sinh cả một khối markup khi bạn gõ chú thích, hoặc sửa nhiều chỗ cùng lúc. Đây là công cụ **tăng tốc sản xuất** — nhưng vì nó gợi ý nhanh nên dễ tạo cảm giác bạn đã hiểu code. Với người mới, hãy dùng nó sau khi đã tự viết được phần tương tự.

### 3. Design-to-code — Figma AI, các plugin chuyển thiết kế thành code

Nhận một frame Figma và trả về HTML/CSS tương ứng. Hữu ích để có **bản nháp đầu tiên**, nhưng bản nháp gần như luôn cần sửa: tên class không khớp chuẩn của bạn, màu lấy sai token, thiếu trạng thái hover/focus. Quy tắc của khoá học: coi output này là *bản phác thảo để phân tích*, không bao giờ là code cuối cùng.

### 4. AI tìm kiếm / đọc tài liệu — Perplexity, tài liệu có chat

Khi gặp API mới, attribute lạ, hoặc lỗi trình duyệt cụ thể, nhóm này trả lời kèm nguồn. Nó giúp bạn tránh bẫy lớn nhất của chat tổng quát: **trả lời tự tin nhưng sai** với thông tin cũ. Luôn ưu tiên câu trả lời có trích nguồn MDN, caniuse hoặc tài liệu chính thức.

## Công cụ nào cho việc nào ở dự án Highland Hospital

| Việc cần làm | Công cụ phù hợp | Ví dụ prompt |
|---|---|---|
| Quyết định layout / giải thích code | Chat tổng quát | "Giải thích đoạn grid này chạy thế nào" |
| Gõ nhanh markup lặp lại | AI trong editor | Gõ `<!-- services card -->` rồi nhận gợi ý |
| Chuyển thiết kế thành HTML nháp | Design-to-code | Xuất section hero từ Figma |
| Tra cứu attribute hay API lạ | AI tìm kiếm | "HTML `autocomplete` có những giá trị nào" |

## Bộ công cụ tối thiểu của khoá học

Bạn không cần mua gì. Bộ tối thiểu gồm: **một chat AI** (Gemini bản miễn phí là đủ cho toàn khoá), **VS Code** với extension **Live Server**, và **Chrome DevTools**. Nếu đã có GitHub Copilot hoặc Cursor thì càng tốt, nhưng không bắt buộc — mọi bài đều viết được với chat + trình duyệt.

## Thực hành

Chọn một section bất kỳ trong trang chủ Highland Hospital (ví dụ hero), tự mô tả nó bằng lời trong 3 câu, rồi đưa mô tả đó cho chat AI xin bản nháp HTML. Ghi lại: bản nháp đúng được bao nhiêu phần trăm? Chỗ nào AI phải tự đoán vì bạn chưa nói rõ?

## Bài tiếp theo

Bạn đã có bản đồ công cụ — giờ học cách phối hợp chúng thành một quy trình 4 bước lặp lại được, thay vì hỏi AI một cách hứng lên.
