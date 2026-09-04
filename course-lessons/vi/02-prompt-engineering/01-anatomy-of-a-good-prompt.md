# Giải phẫu một prompt tốt

## Mục tiêu bài học
- Nắm được 5 thành phần khiến một prompt dựng ra giao diện đúng như ý
- Biết chuẩn bị gì trước khi viết prompt và kiểm tra gì sau khi nhận code
- Thoát thói quen "hỏi lại cả câu" bằng vòng lặp cải thiện từng bước nhỏ

## Prompt tồi bắt nguồn từ thiếu thông tin

Hỏi AI *"Viết giúp hero section cho trang bệnh viện"* thì bạn nhận code chạy được nhưng màu sắc bịa đại, khoảng cách tuỳ hứng, tên class vô nghĩa và gần như chắc chắn lệch design. Không phải AI kém — là bạn chưa đưa cho nó thông tin. Nguyên tắc xuyên suốt khoá học: **viết prompt như đang giao việc cho một đồng nghiệp mới vào dự án**.

## 5 thành phần của một prompt tốt

| # | Thành phần | Trả lời câu hỏi | Ví dụ cho Highland Hospital |
|---|---|---|---|
| 1 | **Bối cảnh** | Tôi đang làm gì, dự án nào, cho ai? | "Đang dựng Landing Page của Highland Hospital — web bệnh viện có đặt lịch khám, thuần HTML5 + CSS, chưa dùng framework." |
| 2 | **Nhiệm vụ** | Tôi muốn AI làm việc cụ thể gì? | "Dựng khối HTML cho khu vực danh sách bác sĩ gồm 6 thẻ." |
| 3 | **Ràng buộc** | Giới hạn công nghệ, phong cách, nội dung? | "Chỉ HTML semantic, không CSS, không Bootstrap; class tiền tố `hh-`; chữ tiếng Việt." |
| 4 | **Giao diện / Dữ liệu** | Bám theo design token hoặc dữ liệu nào? | "Nút chính dùng màu `#0f766e`; mỗi bác sĩ gồm tên, chuyên khoa, số năm kinh nghiệm." |
| 5 | **Định dạng đầu ra** | Tôi muốn nhận lại dạng gì? | "Một khối code duy nhất kèm 3 dòng giải thích cấu trúc." |

Bốn mục đầu là *thông tin bạn phải có sẵn*; mục 5 là *cách bạn muốn nhận kết quả*. Thiếu mục nào, AI sẽ tự bịa mục đó.

## Trước khi viết prompt

- Đã mở đúng file cần sửa và phóng to bản thiết kế/mô tả cần dựng chưa?
- Đã tự thử làm khoảng 10 phút chưa? Khoảng cách giữa bản tự làm và bản AI trả về là bài học nhanh nhất bạn có được (bài 1 chương 1 đã nói điều này).
- Viết mục tiêu thành một câu: *"Tôi muốn AI tạo ra cái gì để tôi dùng được ngay?"*

## Sau khi nhận kết quả

Đừng dán code vào file rồi commit. Làm đủ workflow bước 3–4: đọc từng dòng, chạy thử trong trình duyệt, rồi mới nói chuyện tiếp với AI. Khi thấy sai, chỉ ra **vị trí và hiện tượng cụ thể**, đừng nói chung chung "vẫn không đúng" — AI không nhìn thấy màn hình của bạn.

## Vòng lặp cải thiện từng bước nhỏ

Mỗi lượt chỉ sửa **một** điểm, kiểm tra xong mới chuyển điểm kế tiếp:

1. "Giữ nguyên khối code vừa trả, đổi màu nút từ `#0f766e` sang `#134e4a`." — một thay đổi, dễ kiểm chứng.
2. "Giờ tăng khoảng cách giữa tiêu đề và đoạn mô tả lên gấp đôi." — đã chắc chắn bước 1 đúng mới làm tiếp.

Hỏi kiểu "sửa lại cho đẹp hơn" là bắt AI đoán mò; hỏi kiểu "sửa mục nào, thành giá trị nào" thì mỗi vòng lặp đều tiến một bước có kiểm soát.

## Prompt mẫu: một prompt đủ 5 thành phần

```text
Bối cảnh: Tôi đang dựng trang chủ Highland Hospital bằng HTML5 + CSS
thuần, chưa dùng framework.
Nhiệm vụ: Dựng khối hero gồm câu slogan, đoạn mô tả, nút "Đặt lịch khám".
Ràng buộc: HTML semantic + CSS trong một file; không thêm nội dung
ngoài những gì tôi mô tả.
Giao diện: nền trắng; chữ tiêu đề màu #0f172a; nút nền #0f766e, chữ
trắng, bo góc 8px, padding 0.75rem 1.5rem; khoảng cách nội dung theo rem.
Định dạng: trả về HTML rồi đến CSS, mỗi phần một khối code riêng.
```

## Thực hành
Lấy yêu cầu "đặt lịch khám" của Highland Hospital và viết một prompt đủ 5 thành phần để AI dựng form đặt lịch. Tự chấm: prompt có cho AI biết trường nào bắt buộc, có mấy bước, và màu nhấn nào không?

## Bài tiếp theo

Hai thành phần dễ khiến AI "bịa" nhất — khoảng cách và màu sắc — sẽ được xử lý trong bài *Prompt cho HTML & CSS*.
