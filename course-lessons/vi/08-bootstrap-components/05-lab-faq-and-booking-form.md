# Lab: FAQ & đặt lịch tĩnh

## Mục tiêu bài học
- Ghép toàn bộ component đã học — navbar, accordion, form, modal — vào một trang đặt lịch thống nhất
- Phân biệt rõ phần "tĩnh" (component chạy bằng bundle JS) và phần "động" (submit form — để dành chương 10)
- Luyện Workflow 4 bước trên một đoạn trang hoàn chỉnh: phân tích → prompt AI → thấu hiểu → tinh chỉnh

## Bức tranh của trang booking.html

Trang `booking.html` sẽ gồm năm khối xếp dọc:

| Khu vực | Component | Trạng thái |
|---|---|---|
| Thanh navbar | `navbar navbar-expand-lg` | chạy ngay |
| Tiêu đề + mô tả | `page-header` có `breadcrumb` | tĩnh |
| Form đặt lịch | form + `needs-validation` | nhìn được lỗi khi bật `was-validated` |
| FAQ | `accordion` | chạy ngay |
| Footer | `bg-dark text-white` | tĩnh |

Phần **chưa** làm ở bài này: bắt sự kiện submit để lấy dữ liệu và hiện modal xác nhận — đó là JavaScript thật sự, bắt đầu từ chương 9. Bài này đặt modal sẵn trong trang để kiểm tra nút mở thủ công.

## Cấu trúc đề xuất

```html
<main class="py-5 bg-light">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-7">
        <!-- <h2> + form đặt lịch -->
      </div>
      <div class="col-lg-5">
        <!-- card giờ khám (list-group-flush) -->
        <!-- accordion FAQ ngắn -->
      </div>
    </div>
  </div>
</main>
```

Bố cục hai cột: `col-lg-7` (form) + `col-lg-5` (FAQ) là lựa chọn hợp lý trên desktop, tự chồng dọc trên mobile. Phân chia kiểu này là **quyết định layout của bạn** — AI không nên quyết thay.

## Yêu cầu tối thiểu của lab

1. Nhúng đủ CSS `<link>` và bundle `<script>` Bootstrap 5
2. Navbar có mục `Đặt lịch` đang `active`
3. Form gồm họ tên, email, số điện thoại, ngày khám, chuyên khoa — mỗi ô có `invalid-feedback` tiếng Việt; form mang `needs-validation` + `novalidate`
4. Accordion FAQ ít nhất 3 câu hỏi
5. Modal xác nhận đặt lịch (nội dung mẫu) mở được bằng nút bấm thử

## Khung code gợi ý

```html
<main class="py-5 bg-light">
  <div class="container">
    <h2 class="mb-1">Đặt lịch khám</h2>
    <p class="text-body-secondary mb-4">Điền thông tin bên dưới, bệnh viện sẽ gọi xác nhận trong 24 giờ.</p>

    <div class="row g-4">
      <div class="col-lg-7">
        <form class="row g-3 needs-validation bg-white p-4 rounded-3 shadow-sm" id="bookingForm" novalidate>
          <div class="col-md-6">
            <label for="fullName" class="form-label">Họ và tên</label>
            <input type="text" class="form-control" id="fullName" required>
            <div class="invalid-feedback">Vui lòng nhập họ và tên.</div>
          </div>
          <!-- col-md-6: email, phone, specialty, date — làm tiếp theo bài 03 -->
          <div class="col-12 d-flex gap-2">
            <button type="submit" class="btn btn-primary px-4">Xác nhận đặt lịch</button>
            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#confirmModal">
              Xem modal thử
            </button>
          </div>
        </form>
      </div>

      <div class="col-lg-5">
        <div class="card mb-4 shadow-sm">
          <div class="card-header fw-semibold">Giờ khám các khoa</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between"><span>Khám theo yêu cầu</span><strong>07:30–17:00</strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Cấp cứu</span><strong>24/7</strong></li>
          </ul>
        </div>
        <!-- accordion FAQ + modal confirmModal đặt ngay trước </body> -->
      </div>
    </div>
  </div>
</main>
```

Nhận xét nhanh: nút "Xem modal thử" chỉ phục vụ kiểm tra trong lab; khi có JavaScript (chương 10), nút này biến mất và chính nút submit sẽ mở modal với dữ liệu thật của form.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Bạn là senior frontend developer. Tôi đang dựng trang đặt lịch cho website Highland Hospital (Bootstrap 5 CDN, bundle JS đã có). Hãy tạo cấu trúc HTML: hai cột trong container — bên trái (`col-lg-7`) là form đặt lịch: họ tên, email, số điện thoại (pattern 10–11 số), ngày khám, chuyên khoa (form-select), mỗi trường có invalid-feedback tiếng Việt; form dùng `needs-validation` `novalidate`, chưa cần JavaScript submit. Bên phải (`col-lg-5`) là accordion FAQ 3–4 câu về đặt lịch khám. Thêm modal xác nhận mở được bằng nút thử. Trước khi viết, đừng tự bịa nội dung: dùng những câu hỏi và thông tin bệnh viện tôi đưa cho bạn.

## Phân tích code AI trả về

Khi nhận code từ AI, đọc theo thứ tự để không bỏ sót:
1. `id` của các input có khớp `for` của label và `data-bs-target` của nút không
2. Mỗi `invalid-feedback` nằm **cùng cấp** với input của nó (con của cùng một `div` bọc)
3. `novalidate` còn nguyên trên thẻ `<form>` — đừng để AI xoá vì "cho đẹp"
4. Accordion có `data-bs-parent` trỏ đúng id của accordion
5. Script bundle nằm cuối `<body>`

## Thực hành
1. Tự phân tích yêu cầu (bước 1) rồi viết `booking.html` từ các bài 01–04, chưa mở AI.
2. Mở bằng Live Server, kiểm tra: navbar thu gọn, accordion mở một panel một, modal mở/đóng, nút submit chưa làm gì (đúng như thiết kế).
3. Thêm `was-validated` tạm thời vào form (qua DevTools) và bấm submit trống để xem toàn bộ thông báo lỗi.
4. Chạy prompt mẫu với AI, so sánh với bản tay của bạn, sửa những chỗ AI làm tốt hơn.
5. Ghi lại danh sách những thứ "tĩnh đã xong" và "động còn thiếu" — nó là kế hoạch cho chương 10.

## Tiêu chí chấm nhanh

Trang của bạn hoàn thành tốt khi trả lời được "có" cho cả năm câu:
1. Kéo cửa sổ hẹp: navbar có thu gọn thành hamburger và mở ra được?
2. Accordion FAQ mỗi lần chỉ mở một panel (nhờ `data-bs-parent`)?
3. Modal mở từ nút "Xem modal thử" và đóng bằng nút ×, nút "Chỉnh sửa" hay bấm ra ngoài?
4. Bấm submit khi form trống: form tĩnh **chưa** báo lỗi (chưa có JS), đúng như thiết kế của bài này?
5. Không có lỗi đỏ nào trong Console DevTools?

Trả lời "không" ở câu nào thì quay lại đúng bài tương ứng: câu 1 → bài 01, câu 3 → bài 04.

## Bài tiếp theo

Giao diện tĩnh của chương 8 đã trọn vẹn; từ bài sau chúng ta rẽ sang JavaScript ES6+ — bắt đầu bằng `let`/`const` và template literals để biến dữ liệu bác sĩ thành chuỗi HTML.
