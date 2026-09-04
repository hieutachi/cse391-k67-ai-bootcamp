# Tương tác JavaScript trên Landing Page

## Mục tiêu bài học
- Nối toàn bộ kiến thức đã học vào một trang thật: render dữ liệu, filter, sự kiện, modal
- Render lưới bác sĩ từ mảng `doctors`; lọc theo chuyên khoa và tìm kiếm theo tên
- Nút "Đặt lịch" trên mỗi card mở modal chứa form đặt lịch
- Smooth scroll cho nav link; tránh lỗi kinh điển "script chạy trước DOM"

## Dữ liệu: js/data.js

```js
// js/data.js — khai báo global để index.html, booking.html, admin.html cùng dùng
const doctors = [
  { id: 1, name: 'BS. Nguyễn Văn An',   specialty: 'Tim mạch',       experience: 15, avatar: 'img/doctor-1.jpg' },
  { id: 2, name: 'TS.BS. Trần Thị Bích', specialty: 'Nội tổng quát', experience: 12, avatar: 'img/doctor-2.jpg' },
  { id: 3, name: 'BS.CKII. Lê Minh Châu', specialty: 'Tim mạch',     experience: 20, avatar: 'img/doctor-3.jpg' },
  { id: 4, name: 'ThS.BS. Phạm Quốc Dũng', specialty: 'Nhi khoa',    experience: 9,  avatar: 'img/doctor-4.jpg' },
  { id: 5, name: 'BS. Hoàng Thu Hà',     specialty: 'Nội tổng quát', experience: 8,  avatar: 'img/doctor-5.jpg' },
  { id: 6, name: 'BS. Võ Thành Nam',     specialty: 'Nhi khoa',      experience: 11, avatar: 'img/doctor-6.jpg' },
];
```

Trong `index.html` khai báo **`data.js` trước `main.js`** (script đặt cuối `<body>`): `<script src="js/data.js"></script>` rồi `<script src="js/main.js"></script>`.

## Lỗi kinh điển: script chạy trước DOM

Script chạy khi HTML chưa parse xong thì `document.getElementById('doctorGrid')` trả về `null` và `null.innerHTML` ném lỗi làm **chết cả file JS**. Hai cách chữa chuẩn:

1. **`defer`** — đặt script trong `<head>`: trình duyệt tải song song, chỉ chạy sau khi DOM xong.
2. **`DOMContentLoaded`** — bọc logic lại (script vẫn nên đặt cuối `<body>`):

```js
document.addEventListener('DOMContentLoaded', () => {
  renderDoctors(doctors);
  setupFilters();
  setupBookingModal();
});
```

## Render lưới bác sĩ

Hàm nhận một bác sĩ, trả về chuỗi HTML card — "component" đầu tiên của bạn:

```js
// js/main.js
function doctorCardHTML(d) {
  return `
    <div class="col-md-6 col-lg-4">
      <article class="card h-100 border-0 shadow-sm">
        <img src="${d.avatar}" class="card-img-top" alt="Ảnh ${d.name}">
        <div class="card-body text-center">
          <h3 class="h5 fw-bold mb-1">${d.name}</h3>
          <p class="text-secondary mb-2">${d.specialty} · ${d.experience} năm kinh nghiệm</p>
          <button class="btn btn-outline-primary btn-sm rounded-pill px-3"
                  data-bs-toggle="modal" data-bs-target="#bookingModal"
                  data-doctor-name="${d.name}" data-doctor-id="${d.id}">Đặt lịch</button>
        </div>
      </article>
    </div>`;
}

function renderDoctors(list) {
  const grid = document.getElementById('doctorGrid');
  grid.innerHTML = list.length
    ? list.map(doctorCardHTML).join('')
    : '<p class="text-center text-secondary w-100 py-4">Không tìm thấy bác sĩ phù hợp.</p>';
}
```

Ba điểm đáng học: thẻ `<article>` cho nội dung độc lập; `data-*` attribute mang dữ liệu từ card sang modal; **luôn có trạng thái rỗng** khi filter không ra gì.

## Filter chuyên khoa + tìm kiếm theo tên

```html
<div class="container pb-4">
  <div class="row g-3 align-items-center justify-content-center">
    <div class="col-auto">
      <div class="btn-group" role="group" aria-label="Lọc bác sĩ theo chuyên khoa">
        <button class="btn btn-outline-primary active" data-specialty="all">Tất cả</button>
        <button class="btn btn-outline-primary" data-specialty="Tim mạch">Tim mạch</button>
        <button class="btn btn-outline-primary" data-specialty="Nội tổng quát">Nội tổng quát</button>
        <button class="btn btn-outline-primary" data-specialty="Nhi khoa">Nhi khoa</button>
      </div>
    </div>
    <div class="col-auto">
      <input type="search" id="doctorSearch" class="form-control"
             placeholder="Tìm theo tên bác sĩ…" aria-label="Tìm bác sĩ theo tên">
    </div>
  </div>
</div>
```

Hai điều kiện gộp trong một `filter`, và mọi thay đổi chỉ cần gọi lại một hàm — **một nguồn sự thật duy nhất**:

```js
let activeSpecialty = 'all';

function setupFilters() {
  const group = document.querySelector('.btn-group');
  const searchInput = document.getElementById('doctorSearch');
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('button'); // event delegation: 1 listener cho cả nhóm nút
    if (!btn) return;
    activeSpecialty = btn.dataset.specialty;
    group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
  searchInput.addEventListener('input', applyFilters); // gõ đến đâu lọc đến đó
}

function applyFilters() {
  const keyword = document.getElementById('doctorSearch').value.trim().toLowerCase();
  const result = doctors.filter(d =>
    (activeSpecialty === 'all' || d.specialty === activeSpecialty) &&
    (!keyword || d.name.toLowerCase().includes(keyword))
  );
  renderDoctors(result);
}
```

Sau này thêm chuyên khoa mới, chỉ cần thêm HTML — không đụng vào JS.

## Nút "Đặt lịch" mở modal

Modal dùng chung một cho mọi card. Bootstrap tự mở nhờ `data-bs-toggle`; ta chỉ điền tên bác sĩ vào form khi modal sắp hiện:

```html
<!-- index.html, trước <script> -->
<div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="quickBookingForm" novalidate>
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="bookingModalLabel">Đặt lịch khám nhanh</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body">
          <p class="text-secondary small mb-3" id="selectedDoctorNote"></p>
          <div class="mb-3">
            <label for="patientName" class="form-label">Họ và tên</label>
            <input type="text" class="form-control" id="patientName" required>
          </div>
          <div class="mb-3">
            <label for="patientPhone" class="form-label">Số điện thoại</label>
            <input type="tel" class="form-control" id="patientPhone" required>
          </div>
          <div class="mb-3">
            <label for="bookingDate" class="form-label">Ngày khám</label>
            <input type="date" class="form-control" id="bookingDate" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="submit" class="btn btn-primary">Xác nhận đặt lịch</button>
        </div>
      </form>
    </div>
  </div>
</div>
```

```js
function setupBookingModal() {
  const modal = document.getElementById('bookingModal');
  const note = document.getElementById('selectedDoctorNote');
  modal.addEventListener('show.bs.modal', (e) => {
    const btn = e.relatedTarget; // phần tử đã kích hoạt modal — đọc data-doctor-* từ đây
    note.textContent = `Bạn đang đặt lịch với ${btn.dataset.doctorName}.`;
    const hiddenId = document.createElement('input');
    hiddenId.type = 'hidden';
    hiddenId.name = 'doctorId';
    hiddenId.value = btn.dataset.doctorId;
    modal.querySelector('form').appendChild(hiddenId);
  });
  modal.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const date = document.getElementById('bookingDate').value;
    if (!name || !phone || !date) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và ngày khám.');
      return;
    }
    // booking.html sẽ lưu lịch hẹn vào localStorage — xử lý sâu ở chương đặt lịch
    alert(`Cảm ơn ${name}! Chúng tôi sẽ gọi ${phone} để xác nhận lịch khám ngày ${date}.`);
    bootstrap.Modal.getInstance(modal).hide();
  });
}
```

`show.bs.modal` là **sự kiện Bootstrap** (khác sự kiện DOM thường): bắn ra ngay trước khi modal hiện, và `e.relatedTarget` chính là nút đã mở modal.

## Smooth scroll cho nav link

CSS thuần là cách gọn nhất, không cần JS — đã thêm ở bài 02: `html { scroll-behavior: smooth; scroll-padding-top: 80px; }`.

## Prompt AI cho bài này

```text
Tôi có trang web bệnh viện Highland Hospital bằng Bootstrap 5. Mảng doctors
trong js/data.js mỗi phần tử có: id, name, specialty, experience, avatar.
Trong index.html đã có <div id="doctorGrid"> trống và ô tìm kiếm #doctorSearch.
Viết giúp js/main.js (ES6+, không thư viện ngoài):
1. renderDoctors(list): render card bác sĩ dùng template literals, mỗi card có
   nút "Đặt lịch" mang data-doctor-id và data-doctor-name để mở modal #bookingModal
2. Lọc kết hợp: nút chuyên khoa (class .specialty-filter, data-specialty) + từ khoá
   trong #doctorSearch (không phân biệt hoa thường)
3. Không có kết quả thì hiện "Không tìm thấy bác sĩ phù hợp"
4. Bọc trong DOMContentLoaded; dùng event delegation cho nhóm nút filter
Kèm 3 lưu ý về lỗi người mới hay gặp.
```

## Thực hành

1. Tạo `js/data.js` với 6–8 bác sĩ thuộc 3–4 chuyên khoa; khai báo trong `index.html` trước `main.js`.
2. Copy code mẫu, chạy và xác nhận: lưới render đủ; filter chuyên khoa và tìm kiếm tên hoạt động **đồng thời**; nút Đặt lịch mở modal có sẵn tên bác sĩ.
3. Gõ từ khoá vô nghĩa để kiểm tra trạng thái rỗng.
4. Cố tình đặt `<script src="js/main.js">` trong `<head>` **không** `defer` — đọc lỗi Console, rồi sửa đúng.
5. Chạy prompt AI với yêu cầu riêng của bạn, đối chiếu với code mẫu, giải thích điểm khác nhau.

## Bài tiếp theo

Bệnh nhân đã đặt được lịch — phía bệnh viện cần nơi quản lý. Sang bài *Xây Admin Dashboard*: metrics tính từ mảng `appointments`, bảng lịch hẹn có tìm kiếm, lọc, cập nhật trạng thái, lưu `localStorage`.
