# Chào mừng — vì sao Frontend cần AI

## Mục tiêu bài học
- Hiểu công việc frontend thay đổi thế nào khi có AI tham gia
- Nhận ra phần việc AI làm nhanh thật, phần nào thì không
- Biết bạn sẽ xây dựng gì trong khoá học

## Nghề frontend đã dịch chuyển

Công việc frontend luôn gồm hai hoạt động rất khác nhau. Một là **phán đoán**: quyết định màn hình nên hoạt động thế nào, mắt người dùng dừng ở đâu, chuyện gì xảy ra khi mạng chậm. Hai là **sản xuất**: gõ ra markup, danh sách class, các hàm xử lý sự kiện, biến thể thứ mười lăm của một tấm card.

AI đang rất giỏi ở hoạt động thứ hai, còn với hoạt động thứ nhất thì chỉ ở mức tư vấn. Ranh giới đó chính là ý tưởng của cả khoá học: **bạn giữ phần phán đoán, và giao đi càng nhiều phần sản xuất càng tốt** — miễn là bạn kiểm tra lại được nhanh.

## Một ngày làm việc thực tế

Khi môi trường đã chạy ổn, vòng lặp công việc của một frontend developer dùng AI thường như sau:

- **Buổi sáng** — Bạn nhận một frame Figma cho khu vực danh sách bác sĩ. Thay vì tự viết grid, bạn mô tả layout, các breakpoint và màu sắc đang dùng, rồi nhận bản nháp trong vài giây. Thời gian tiết kiệm được dành cho những thứ thiết kế chưa nói tới: trạng thái focus, tên bác sĩ quá dài, giao diện ở màn hình 320px.
- **Buổi trưa** — Một tấm card bị tràn khỏi container, nhưng chỉ trên Safari của iOS. Bạn dán đoạn CSS liên quan kèm mô tả hiện tượng và nhận về ba nguyên nhân khả dĩ, xếp theo mức độ có thể xảy ra. Bạn xác nhận nguyên nhân thật bằng DevTools.
- **Buổi chiều** — Bạn cần chuyển một danh sách lịch hẹn từ mảng tĩnh sang đọc từ API. Việc này sửa nhiều file, nên bạn dùng AI hỗ trợ viết hàm `fetch` và render lại, sau đó tự review từng dòng.

Không có bước nào ở trên giúp bạn khỏi phải hiểu HTML semantic, CSS layout hay DOM. Chúng chỉ giúp bạn khỏi phải *gõ* 70% phần việc nhàm chán.

## Những việc AI không làm thay bạn

Nên nói rõ giới hạn ngay từ đầu để sau này không thất vọng:

- AI không biết design của bạn nếu bạn không nói. Thiếu bối cảnh, nó sẽ tự bịa màu, khoảng cách và tên class.
- AI không biết người dùng thật sự cần gì. Nó sẽ dựng rất đẹp một tính năng sai yêu cầu.
- AI không nhìn thấy trang đã render. Nó suy luận trên code, không suy luận trên kết quả hiển thị — người mở trình duyệt vẫn là bạn.
- AI có lúc sai mà vẫn rất tự tin, đặc biệt với API mới của framework và chi tiết hỗ trợ trình duyệt.

Mỗi giới hạn đều có cách xử lý, và mười một chương còn lại chính là để dạy những cách đó.

## Bốn trụ cột của khoá học

1. **HTML5 chuẩn ngữ nghĩa** — cấu trúc tài liệu chuẩn, thẻ semantic cho SEO và Accessibility, Forms, Table, hình ảnh và SVG.
2. **CSS3 hiện đại & tư duy dàn trang** — Box Model, Flexbox, Grid, đơn vị tương đối, Responsive Web Design, Transitions và Animations.
3. **Bootstrap 5** — hệ thống 12-Column Grid, Utility Classes và các Components tương tác sẵn có (Navbar, Modal, Offcanvas, Accordion...).
4. **JavaScript ES6+ & DOM** — cú pháp hiện đại, Array Methods, DOM Manipulation, sự kiện, `localStorage`, Fetch API / Async-Await.

## Dự án bạn sẽ xây: Highland Hospital Web Portal

Mọi chương đều góp phần vào một ứng dụng duy nhất — **Highland Hospital** — website của một bệnh viện cho phép bệnh nhân xem dịch vụ, tìm bác sĩ theo chuyên khoa và đặt lịch khám trực tuyến.

Dự án cố ý chỉ có frontend: không server phải bảo trì, không database phải khởi tạo, nhưng vẫn đủ phức tạp thật — render danh sách động, lọc theo chuyên khoa, form đặt lịch đa bước có validate, bảng quản lý lịch hẹn, dữ liệu lưu trong `localStorage` — để bạn dùng hết những gì đã học. Đến chương 12, bạn hoàn thiện Landing Page lẫn Admin Dashboard và deploy nó.

## Khoá học dành cho ai

Bạn **không cần** biết lập trình trước đó. Bạn chỉ cần một chiếc máy tính có trình duyệt Chrome, một editor (VS Code khuyến nghị), và sẵn sàng gõ lại code thay vì chỉ đọc. Không cần kinh nghiệm dùng AI.

## Cách học

Đọc xong một bài, hãy chạy ngay các prompt trong bài trên code của chính bạn. Một thói quen rất hiệu quả: tự làm trước mười phút rồi mới hỏi AI. Khoảng cách giữa bản của bạn và bản AI sinh ra là bài học nhanh nhất bạn có thể nhận được.

## Bài tiếp theo

Chúng ta sẽ phác bản đồ công cụ — Gemini, Claude, ChatGPT và nhóm công cụ thiết kế — rồi chọn ra những gì thực sự nên có trong quy trình hằng ngày của bạn.
