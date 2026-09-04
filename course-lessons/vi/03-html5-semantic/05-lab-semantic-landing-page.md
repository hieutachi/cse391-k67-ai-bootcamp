# Lab: Landing Page semantic

## Mục tiêu bài học
- Dùng AI dựng toàn bộ khung semantic trang chủ Highland Hospital trong một lượt
- Đọc hiểu và đánh dấu từng vùng bằng comment HTML như một senior dev
- Kiểm tra trang bằng checklist thay vì "nhìn là thấy ổn"

Đây là bài tổng hợp của chương: áp dụng đồng thời khung tài liệu (bài 01), thẻ ngữ nghĩa (bài 02), và một chút media từ bài 04. CSS chỉ cần tối thiểu để dễ nhìn — trọng tâm là **cấu trúc HTML**.

## Bước 1 — Dựng khung bằng AI

Dán prompt bên dưới vào Gemini/Claude/ChatGPT. Prompt này gom đủ 5 thành phần đã học ở chương 2:

```text
Bối cảnh: tôi đang dựng trang chủ Highland Hospital (web bệnh viện, đặt
lịch khám trực tuyến). Đây là bước dựng khung HTML semantic, chưa có CSS.
Nhiệm vụ: dựng toàn bộ trang chủ gồm 6 vùng theo thứ tự —
(1) header + nav 4 mục: Trang chủ, Bác sĩ, Đặt lịch, Liên hệ;
(2) hero với h1 "Chăm sóc sức khoẻ chủ động cùng Highland", đoạn mô tả
và 2 nút (Đặt lịch khám, Xem chuyên khoa);
(3) section "Dịch vụ nổi bật" — 6 dịch vụ: Khám tổng quát, Tim mạch, Nhi
khoa, Xét nghiệm, Chẩn đoán hình ảnh, Phục hồi chức năng;
(4) section "Đội ngũ bác sĩ" — 3 article: mỗi article có h3 tên bác sĩ,
chuyên khoa, số năm kinh nghiệm;
(5) section "Đánh giá" — 2 lời nhận xét của bệnh nhân;
(6) footer: tên bệnh viện, địa chỉ, hotline, bản quyền.
Ràng buộc: HTML semantic — header+nav, main bọc toàn bộ 4 khu vực giữa,
section riêng cho từng chủ đề, article cho mỗi bác sĩ; đúng một h1;
heading các section là h2; nội dung placeholder tiếng Việt ngắn; thêm
comment HTML <!-- tên vùng --> trước mỗi vùng; không dùng thuộc tính
style; không CSS; class tiền tố hh-.
Định dạng: một khối HTML duy nhất.
```

## Bước 2 — Đọc và đánh dấu từng vùng

Code AI trả về **chưa phải là của bạn** cho tới khi bạn đọc hiểu từng dòng. Mở file trong VS Code và tự trả lời bằng miệng cho từng vùng:

- `header` chứa `nav` — vì sao menu nằm trong `nav`, còn logo để ngoài? (nav chỉ chứa liên kết điều hướng; logo là thương hiệu.)
- Vì sao 4 khu vực giữa (hero, dịch vụ, bác sĩ, đánh giá) nằm trong `main`, còn footer để ngoài? (main là nội dung chính duy nhất; footer là thông tin chung của trang.)
- Vì sao mỗi bác sĩ là `article` thay vì `div`? (thẻ bác sĩ tự đứng riêng được — độc lập như một bài viết nhỏ.)
- Vì sao các nút dùng `<a href>` thay vì `<button>`? (chúng điều hướng sang trang khác.)

Comment HTML AI thêm vào đã giúp bạn định vị; giờ hãy **tự viết thêm** comment của riêng bạn cho từng vùng theo lối senior dev: một dòng ghi rõ *vùng này là gì và chương sau sẽ thêm gì vào*.

```html
<!-- ===== HEADER + NAV =====
     Chương 8 sẽ thay bằng Bootstrap Navbar có nút hamburger cho mobile -->
<header class="hh-header">
  <a class="hh-logo" href="index.html">Highland Hospital</a>
  <nav aria-label="Điều hướng chính">
    <ul>
      <li><a href="index.html">Trang chủ</a></li>
      <li><a href="#doctors">Bác sĩ</a></li>
      <li><a href="booking.html">Đặt lịch</a></li>
      <li><a href="#contact">Liên hệ</a></li>
    </ul>
  </nav>
</header>

<main>
  <!-- ===== HERO ===== Chương 6 sẽ làm hero này responsive -->
  <section class="hh-hero">
    <h1>Chăm sóc sức khoẻ chủ động cùng Highland</h1>
    <p>Đội ngũ bác sĩ giàu kinh nghiệm, đặt lịch khám chỉ trong 2 phút.</p>
    <a class="hh-btn hh-btn--primary" href="booking.html">Đặt lịch khám</a>
    <a class="hh-btn hh-btn--outline" href="#services">Xem chuyên khoa</a>
  </section>
  <!-- ...các section dịch vụ, bác sĩ, đánh giá... -->
</main>

<footer>
  <!-- Chương 4-5 sẽ dàn cột này bằng Flexbox -->
  <p>© 2025 Highland Hospital. Hotline: 1900 1234.</p>
</footer>
```

Chú ý `aria-label="Điều hướng chính"` trên `nav` — khi trang có nhiều hơn một `nav`, label giúp phân biệt. Đây là chi tiết accessibility nhỏ mà AI hay bỏ, bạn cần tự kiểm và thêm.

## Bước 3 — Chạy checklist kiểm tra

Mở trang bằng Live Server, dùng DevTools (F12) và chạy Lighthouse (tab Lighthouse → Generate report). Tự chấm:

- [ ] Có đúng một `h1`, các section đều có `h2`, không nhảy bậc heading?
- [ ] `main` chứa đúng nội dung chính; `footer` nằm ngoài `main`?
- [ ] Mỗi `img` đều có `alt` mô tả thật (không phải "ảnh bác sĩ")?
- [ ] Mọi link trong `nav` đều trỏ tới đích tồn tại (`#doctors`, `booking.html`)?
- [ ] Không còn `<div>` nào "trá hình" heading — mọi tiêu đề là thẻ heading thật?
- [ ] Lighthouse Accessibility/SEO đạt ít nhất 90?

## Thực hành
Làm đủ 3 bước trên cho trang chủ của bạn: dán prompt → đọc hiểu và tự thêm comment từng vùng → chạy checklist. Nếu một mục checklist trượt, viết prompt sửa *một* lỗi đó (vòng lặp từng bước nhỏ, bài 01 chương 2) rồi chạy lại Lighthouse xác nhận điểm tăng.

## Bài tiếp theo

Khung semantic đã vững; từ chương sau khung đó bắt đầu "mặc áo" bằng CSS3 — mở đầu là *CSS Selectors & Specificity* để hiểu vì sao vài dòng CSS thắng, vài dòng khác bị bỏ qua.
