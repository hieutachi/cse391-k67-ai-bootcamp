# Thẻ ngữ nghĩa & SEO

## Mục tiêu bài học
- Phân biệt thẻ ngữ nghĩa với `<div>` và biết dùng khi nào
- Nắm 7 thẻ cấu trúc chính và thứ bậc heading `h1`–`h6`
- Hiểu vì sao semantic giúp SEO và accessibility, và nhờ AI dựng khung đúng

## `<div>` không sai, nhưng không nói gì

`<div>` giống một chiếc hộp trung tính — trình duyệt, Google và trình đọc màn hình đều không biết trong đó là gì. Nếu cả trang chỉ toàn `<div>`, máy móc phải *đoán* đâu là menu, đâu là nội dung chính, đâu là chân trang. Còn với thẻ ngữ nghĩa, mọi thứ được khai báo rõ ràng:

| Thẻ | Ý nghĩa | Trong Highland Hospital |
|---|---|---|
| `<header>` | Phần đầu trang hoặc đầu một khu vực | Logo + số hotline + menu đăng nhập |
| `<nav>` | Khối liên kết điều hướng chính | Trang chủ · Bác sĩ · Đặt lịch · Liên hệ |
| `<main>` | Nội dung chính duy nhất của trang | Hero + dịch vụ + danh sách bác sĩ |
| `<section>` | Nhóm nội dung có cùng chủ đề, thường kèm heading | "Dịch vụ nổi bật", "Đội ngũ bác sĩ" |
| `<article>` | Nội dung độc lập, tự đứng riêng được | Một bài tin sức khoẻ, một thẻ bác sĩ |
| `<aside>` | Nội dung phụ bên cạnh nội dung chính | Khối tin khuyến mãi, banner phụ |
| `<footer>` | Chân trang | Bản quyền, liên kết, địa chỉ bệnh viện |

Quy tắc chọn nhanh: cứ hỏi *"khối này có ý nghĩa gì với người đọc?"* — có thì dùng thẻ ngữ nghĩa, chỉ dùng `<div>` khi thực sự là hộp trang trí/layout thuần (bài sau sẽ học grid).

## Thứ bậc heading — một trang một `h1`

Heading tạo nên "mục lục" của trang cho cả Google lẫn người dùng trình đọc màn hình:

- Mỗi trang đúng **một** `<h1>` — với Highland Hospital, `index.html` có h1 là câu chào chính của hero, không phải logo.
- Đi xuống theo thứ tự: `h1` → `h2` (tên từng section) → `h3` (tên từng bác sĩ/dịch vụ) → `h4` nếu cần chi tiết hơn.
- Không nhảy cóc (`h1` rồi `h4`) và không dùng heading để làm chữ to — cỡ chữ là việc của CSS. Trình đọc màn hình cho phép người dùng nhảy giữa các heading để dò nội dung; thứ bậc rối đồng nghĩa mục lục rối.

## Vai trò với SEO và accessibility

- **SEO**: Google ưu tiên hiểu cấu trúc. Trang semantic giúp nó xác định nội dung chính, trích đoạn hiển thị và ngữ cảnh — đồng thời là nền để thẻ `<meta>` ở bài 01 phát huy tác dụng.
- **Accessibility**: trình đọc màn hình (screen reader) thông báo "điều hướng", "nội dung chính", "chân trang" để người khiếm thị nhảy tới thẳng phần cần đọc. Thẻ semantic còn hỗ trợ landmark-based navigation có sẵn trong nhiều trình duyệt.

Kiểm chứng nhanh trên trang của bạn: cài extension **WAVE** hoặc mở Lighthouse (F12 → tab Lighthouse → chạy Accessibility/SEO) để thấy AI/điểm trừ khi thiếu heading hoặc dùng `<div>` cho vùng điều hướng.

## Prompt mẫu: dựng khung semantic cho trang chủ

```text
Bối cảnh: Trang chủ Highland Hospital — web bệnh viện có các khu vực:
điều hướng, hero, dịch vụ, bác sĩ, đánh giá, footer. Dự án HTML5 thuần,
chưa có CSS.
Nhiệm vụ: dựng khung HTML semantic của cả trang chủ, nội dung các khu
vực chỉ cần placeholder tiếng Việt ngắn.
Ràng buộc: dùng đúng thẻ — header+nav cho phần đầu, main bọc hero và
các section, article cho từng thẻ bác sĩ, footer cho chân trang; đúng
một h1; heading các section là h2; class tiền tố hh-.
Định dạng: một khối HTML duy nhất kèm chú thích HTML <!-- tên khu vực -->
trước mỗi vùng.
```

## Thực hành
So sánh: viết thủ công phần header của trang chủ bằng toàn `<div>`, rồi viết lại bằng `header > nav > ul > li > a` cho 4 mục (Trang chủ, Bác sĩ, Đặt lịch, Liên hệ). Mở Lighthouse chạy mục SEO và Accessibility cho cả hai phiên bản, ghi lại chênh lệch — đó là giá trị của semantic bằng điểm số thực tế.

## Bài tiếp theo

Trang chủ đã có khung; khi người dùng muốn đặt lịch, họ cần điền thông tin — bài *Forms & các kiểu Input hiện đại* dạy cách dựng form chuẩn.
