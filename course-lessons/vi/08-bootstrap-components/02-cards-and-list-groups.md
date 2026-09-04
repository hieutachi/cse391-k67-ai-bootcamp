# Cards & List groups

## Mục tiêu bài học
- Dựng `card` với header/body/footer, ảnh trên (`card-img-top`), tiêu đề, text và nút
- Sắp xếp nhiều card bằng `card-group` và lưới `row-cols-*`
- Dùng `list-group` và `list-group-flush` cho danh sách gọn gàng
- Hoàn thiện card bác sĩ Highland Hospital: ảnh, badge chuyên khoa, nút đặt lịch

## Giải phẫu một card

Card là hộp nội dung gồm các phần tuỳ chọn `.card-header`, `.card-body`, `.card-footer`. Class `card-img-top` đặt ảnh tràn ngang phía trên:

```html
<div class="card" style="width: 20rem;">
  <img src="assets/images/doctor-01.jpg" class="card-img-top" alt="Bác sĩ Nguyễn Minh Anh">
  <div class="card-body">
    <h5 class="card-title">BS.CKI Nguyễn Minh Anh</h5>
    <p class="card-text">Hơn 12 năm kinh nghiệm Nội tổng hợp, từng công tác tại Bệnh viện Bạch Mai.</p>
    <a href="booking.html" class="btn btn-primary">Đặt lịch khám</a>
  </div>
  <div class="card-footer text-body-secondary">Khoa Nội tổng hợp</div>
</div>
```

- `card-title` / `card-text` chỉ định font trong card (không bắt buộc nhưng nên dùng)
- Card tự rộng theo nội dung; muốn kiểm soát chiều rộng thì thêm CSS hoặc class width như ví dụ trên

## Ghép badge vào card

```html
<span class="badge text-bg-success">Còn lịch hôm nay</span>
```

Badge (đã học ở chương 7) đặt cạnh tiêu đề giúp người dùng nắm trạng thái trong nửa giây.

## card-group vs lưới row-cols

- `card-group`: các card dính liền nhau, cùng chiều cao, chỉ nằm trên một hàng
- Lưới `row-cols-*`: card nằm trong cột, có gutter và tự xuống hàng ở từng breakpoint

```html
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
  <div class="col">
    <div class="card h-100">
      <!-- nội dung card 1 -->
    </div>
  </div>
  <!-- col cho card 2, 3... -->
</div>
```

`h-100` bảo đảm mọi card trong cùng một hàng cao bằng nhau dù nội dung dài ngắn khác nhau — chi tiết hay bị bỏ quên nhất.

## Card bác sĩ hoàn chỉnh

```html
<div class="col">
  <div class="card h-100 shadow-sm">
    <img src="assets/images/doctor-02.jpg" class="card-img-top" alt="Bác sĩ Lê Hoàng Nam">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0">BS.CKI Lê Hoàng Nam</h5>
        <span class="badge text-bg-info">Tim mạch</span>
      </div>
      <p class="card-text text-body-secondary">Chuyên can thiệp tim mạch, 15 năm kinh nghiệm.</p>
      <p class="fw-semibold mb-3">Giá khám: 500.000đ</p>
      <a href="booking.html" class="btn btn-outline-primary w-100">Đặt lịch khám</a>
    </div>
  </div>
</div>
```

Badge được xếp cùng dòng với tiêu đề nhờ `d-flex justify-content-between` — flexbox chương 5 giờ phát huy tác dụng ngay trong component.

## List group — dùng khi nào

`list-group` hợp cho danh sách đồng nhất: giờ làm việc, danh sách khoa, câu hỏi thường gặp. `list-group-flush` bỏ viền ngoài và bo góc để danh sách "ăn khớp" vào trong card:

```html
<ul class="list-group list-group-flush">
  <li class="list-group-item d-flex justify-content-between">
    <span>Khám tổng quát</span> <strong>08:00–17:00</strong>
  </li>
  <li class="list-group-item d-flex justify-content-between">
    <span>Cấp cứu</span> <strong>24/7</strong>
  </li>
  <li class="list-group-item d-flex justify-content-between">
    <span>Hotline</span> <strong>1900 636 636</strong>
  </li>
</ul>
```

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Website Highland Hospital dùng Bootstrap 5 CDN. Hãy viết section "Đội ngũ bác sĩ" hiển thị 6 bác sĩ dạng card: ảnh, tên, badge chuyên khoa, số năm kinh nghiệm, giá khám và nút "Đặt lịch khám". Dùng lưới `row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`, mỗi card phải có `h-100` và `shadow-sm`. Đừng tự bịa dữ liệu: trước khi viết code, hãy hỏi tôi danh sách 6 bác sĩ (tên, chuyên khoa, kinh nghiệm, giá, ảnh).

Mẹo quan trọng của bài này: **cho AI dữ liệu thật thay vì để nó bịa**. Prompt trên chủ động yêu cầu AI hỏi lại dữ liệu — bạn đang giữ phần phán đoán (bước 1 của Workflow) trước khi giao phần sản xuất (bước 2).

## Thực hành
1. Dựng section 3 card bác sĩ trong `doctors.html` theo mẫu hoàn chỉnh ở trên.
2. Đổi `row-cols-lg-3` → `row-cols-lg-4`, quan sát thay đổi trên màn hình rộng.
3. Bỏ `h-100` để thấy card lệch chiều cao khi nội dung dài ngắn khác nhau.
4. Đặt `list-group-flush` giờ làm việc vào body hoặc footer của một card.
5. Chạy prompt mẫu với AI, đọc hiểu từng dòng code trả về rồi mới dùng.

## Bài tiếp theo

Đã có cách trưng bày thông tin; bài sau giải quyết phần hay gây lúng túng nhất — dựng form đặt lịch khám có validation ngay trong Bootstrap.
