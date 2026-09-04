# Modal, Offcanvas & Accordion

## Mục tiêu bài học
- Hiểu cơ chế mở/đóng component tương tác: `data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`
- Dựng modal xác nhận đặt lịch với `modal-dialog-centered`
- Dùng offcanvas làm menu mobile / drawer bộ lọc
- Dựng accordion FAQ bệnh viện — và nhớ: tất cả cần bundle JavaScript

## Ba component, một cơ chế

Modal (hộp thoại), offcanvas (bảng trượt vào từ cạnh màn hình) và accordion (dàn ô xếp/nếp) là các component **có hành vi**, khác với card hay navbar tĩnh. Mọi component dạng này đều được điều khiển bằng cặp attribute:

- `data-bs-toggle` khai báo loại component sẽ bật (collapse, modal, offcanvas)
- `data-bs-target`/`data-bs-href` trỏ tới `id` của phần tử cần mở
- `data-bs-dismiss` đóng component: `data-bs-dismiss="modal"` hoặc `"offcanvas"`

Nếu các thẻ sau không hoạt động, 99% là thiếu dòng `<script src="...bootstrap.bundle.min.js"></script>` cuối `<body>`.

## Modal xác nhận đặt lịch

```html
<!-- Nút mở modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal">
  Xác nhận đặt lịch
</button>

<!-- Modal -->
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">Xác nhận thông tin</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>
      <div class="modal-body">
        <p>Bạn Nguyễn Văn An sẽ khám chuyên khoa <strong>Tim mạch</strong> lúc <strong>09:00 – 12/12/2025</strong>.</p>
        <p class="mb-0 text-body-secondary">Bệnh viện sẽ gọi điện xác nhận trước 1 ngày.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Chỉnh sửa</button>
        <button type="button" class="btn btn-primary">Hoàn tất</button>
      </div>
    </div>
  </div>
</div>
```

- `modal-dialog-centered`: hộp thoại canh giữa màn hình theo cả hai trục
- `fade` tạo hiệu ứng mờ dần khi mở
- Cấu trúc chuẩn: `modal-dialog` → `modal-content` → `modal-header` / `modal-body` / `modal-footer`
- Chương 10 bạn sẽ lấp dòng chữ trong `modal-body` bằng JavaScript để hiển thị đúng thông tin người dùng vừa nhập

## Offcanvas — menu mobile và drawer bộ lọc

Offcanvas là bảng trượt vào từ một cạnh, thường dùng cho menu mobile thay hamburger hoặc bộ lọc tạm trú:

```html
<button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterDrawer">
  Bộ lọc bác sĩ
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="filterDrawer" aria-labelledby="filterDrawerLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="filterDrawerLabel">Bộ lọc</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Đóng"></button>
  </div>
  <div class="offcanvas-body">
    <p class="fw-semibold">Chuyên khoa</p>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="specCardio">
      <label class="form-check-label" for="specCardio">Tim mạch</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="specNeuro">
      <label class="form-check-label" for="specNeuro">Thần kinh</label>
    </div>
    <!-- thêm tuỳ chọn... -->
  </div>
</div>
```

Hướng trượt do class quyết định: `offcanvas-start` (trái), `offcanvas-end` (phải), `offcanvas-top`, `offcanvas-bottom`.

## Accordion FAQ

Accordion là nhóm các `collapse` mà mỗi lần chỉ mở một panel; panel đang mở tự đóng khi mở panel khác:

```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">
        Bệnh viện có nhận bảo hiểm y tế không?
      </button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        Highland Hospital có liên kết với hơn 30 hãng bảo hiểm và áp dụng bảo hiểm y tế cho dịch vụ khám chữa bệnh nội trú.
      </div>
    </div>
  </div>
  <!-- lặp lại accordion-item cho các câu hỏi khác -->
</div>
```

Lưu ý:
- `accordion-collapse collapse` nằm trong mỗi item; thêm `show` cho item mở mặc định
- `data-bs-parent="#faqAccordion"` là thứ ràng buộc "mỗi lần chỉ mở một panel"
- Nút mở đặt trong `accordion-header`, dùng `accordion-button` để có mũi tên +/-

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Website Highland Hospital dùng Bootstrap 5 (có sẵn bundle JS). Tôi cần hai thứ: (1) accordion FAQ 5 câu hỏi tiếng Việt thường gặp tại bệnh viện (giờ khám, đặt lịch online, bảo hiểm, kết quả xét nghiệm, cấp cứu) — chỉ cần viết câu hỏi và câu trả lời một hai câu; (2) modal xác nhận đặt lịch hiện tên bệnh nhân, chuyên khoa, ngày giờ khám với hai nút "Chỉnh sửa" (đóng modal) và "Hoàn tất". Giải thích ngắn vai trò của `data-bs-target` và `data-bs-parent`.

## Thực hành
1. Tạo `modal.html` với nút mở modal xác nhận đặt lịch ở trên; bấm "Chỉnh sửa" thấy modal đóng.
2. Bấm ngoài vùng modal (vùng đen mờ) để thấy modal tự đóng — hành vi mặc định của Bootstrap.
3. Dựng `faq.html` với accordion 5 câu; bỏ `data-bs-parent` ở một item và quan sát khác biệt.
4. Tạo drawer bộ lọc bằng offcanvas `offcanvas-start` và thử đổi hướng trượt.
5. Chạy prompt mẫu với AI, đọc hiểu code trả về theo từng class.

## Bài tiếp theo

Có đủ component lắp ráp rồi; bài Lab tới dồn toàn bộ FAQ accordion và form đặt lịch (chưa có JS submit) vào một trang Highland Hospital thống nhất.
