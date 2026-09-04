# Xây Admin Dashboard

## Mục tiêu bài học
- Dựng layout dashboard: navbar (hoặc sidebar) + vùng nội dung chính
- Tính 4 metrics cards (tổng lịch hẹn, hôm nay, chờ duyệt, hoàn thành) trực tiếp từ mảng `appointments`
- Xây data table lịch hẹn: tìm kiếm theo tên bệnh nhân, lọc theo trạng thái
- Cập nhật trạng thái, xoá lịch hẹn, đồng bộ mọi thay đổi vào `localStorage`

## Nguồn dữ liệu: appointments + localStorage

Bài trước, bệnh nhân tạo lịch hẹn ở trang đặt lịch. Dashboard phải đọc **đúng cùng nguồn đó** — key `highland_appointments` trong `localStorage`, dữ liệu gốc seed trong `js/data.js`:

```js
// js/data.js — dữ liệu seed lần đầu (khi localStorage trống)
const seedAppointments = [
  { id: 1, patient: 'Nguyễn Văn An',   doctor: 'BS. Nguyễn Văn An',      specialty: 'Tim mạch',      date: '2026-05-18', time: '08:30', status: 'cho' },
  { id: 2, patient: 'Trần Thị Bích',   doctor: 'TS.BS. Trần Thị Bích',   specialty: 'Nội tổng quát', date: '2026-05-18', time: '09:00', status: 'xac_nhan' },
  { id: 3, patient: 'Lê Minh Châu',    doctor: 'BS.CKII. Lê Minh Châu',  specialty: 'Tim mạch',      date: '2026-05-19', time: '14:00', status: 'cho' },
  { id: 4, patient: 'Phạm Quốc Dũng',  doctor: 'BS. Hoàng Thu Hà',       specialty: 'Nội tổng quát', date: '2026-05-15', time: '10:00', status: 'hoan_thanh' },
  { id: 5, patient: 'Hoàng Thu Hà',    doctor: 'ThS.BS. Phạm Quốc Dũng', specialty: 'Nhi khoa',      date: '2026-05-17', time: '16:00', status: 'huy' },
];

// js/admin.js — helpers đọc/ghi dùng chung
const STORAGE_KEY = 'highland_appointments';
function loadAppointments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAppointments)); // seed lần đầu
  return [...seedAppointments];
}
function saveAppointments(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
```

Trạng thái dùng giá trị ổn định `'cho' / 'xac_nhan' / 'huy' / 'hoan_thanh'` (không dấu tiếng Việt — dễ nhập sai, khó so sánh); **nhãn hiển thị** map riêng:

```js
const STATUS_LABEL = { cho: 'Chờ duyệt', xac_nhan: 'Xác nhận', huy: 'Huỷ', hoan_thanh: 'Hoàn thành' };
const STATUS_BADGE = { cho: 'text-bg-warning', xac_nhan: 'text-bg-success', huy: 'text-bg-danger', hoan_thanh: 'text-bg-secondary' };
```

## Layout dashboard

Dùng navbar tối giản thay sidebar — trên mobile nó thu gọn sẵn mà không cần CSS thêm:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin — Highland Hospital</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-light">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="admin.html">🏥 Highland Admin</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav"
              aria-controls="adminNav" aria-expanded="false" aria-label="Mở menu quản trị">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="adminNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Về trang chủ</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="admin.html">Dashboard</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 fw-bold mb-0">Tổng quan lịch hẹn</h1>
      <a href="booking.html" class="btn btn-primary btn-sm">+ Lịch hẹn mới</a>
    </div>
    <!-- metrics + bảng dựng dưới đây -->
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/data.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
```

## Metrics cards tính từ dữ liệu

4 thẻ thống kê **không được hardcode số** — mọi con số tính từ mảng `appointments` mỗi lần render, để dữ liệu đổi thì metrics tự đúng:

```html
<div class="row g-3 mb-4" id="metricRow"><!-- 4 cột col-sm-6 col-xl-3 render bằng JS --></div>
```

```js
function renderMetrics(appointments) {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD' — khớp format date
  const metrics = [
    { label: 'Tổng lịch hẹn', value: appointments.length, extra: 'tất cả thời gian', icon: '📋', color: 'primary' },
    { label: 'Hôm nay', value: appointments.filter(a => a.date === today).length, extra: new Date().toLocaleDateString('vi-VN'), icon: '📅', color: 'info' },
    { label: 'Chờ duyệt', value: appointments.filter(a => a.status === 'cho').length, extra: 'cần xử lý', icon: '⏳', color: 'warning' },
    { label: 'Hoàn thành', value: appointments.filter(a => a.status === 'hoan_thanh').length, extra: 'đã kết thúc', icon: '✅', color: 'success' },
  ];
  document.getElementById('metricRow').innerHTML = metrics.map(m => `
    <div class="col-sm-6 col-xl-3">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-body d-flex align-items-center gap-3">
          <div class="bg-${m.color}-subtle rounded-3 p-3 fs-4">${m.icon}</div>
          <div>
            <p class="text-secondary small mb-0">${m.label}</p>
            <p class="h3 fw-bold mb-0">${m.value}</p>
            <p class="text-secondary small mb-0">${m.extra}</p>
          </div>
        </div>
      </div>
    </div>`).join('');
}
```

Dữ liệu mẫu dùng năm cố định nên metric "Hôm nay" có thể ra 0 — hãy cập nhật vài lịch hẹn về đúng ngày hôm nay khi thử.

## Data table có tìm kiếm + lọc trạng thái

```html
<div class="card border-0 shadow-sm">
  <div class="card-body">
    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <input type="search" id="searchInput" class="form-control"
               placeholder="Tìm theo tên bệnh nhân…" aria-label="Tìm lịch hẹn theo tên bệnh nhân">
      </div>
      <div class="col-md-6">
        <select id="statusFilter" class="form-select" aria-label="Lọc theo trạng thái">
          <option value="all">Tất cả trạng thái</option>
          <option value="cho">Chờ duyệt</option>
          <option value="xac_nhan">Xác nhận</option>
          <option value="huy">Huỷ</option>
          <option value="hoan_thanh">Hoàn thành</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">Bệnh nhân</th>
            <th scope="col">Chuyên khoa</th>
            <th scope="col">Bác sĩ</th>
            <th scope="col">Ngày giờ</th>
            <th scope="col">Trạng thái</th>
            <th scope="col" class="text-end">Thao tác</th>
          </tr>
        </thead>
        <tbody id="appointmentBody"></tbody>
      </table>
    </div>
    <p id="emptyNote" class="text-center text-secondary my-4 d-none">Không có lịch hẹn nào khớp.</p>
  </div>
</div>
```

State của bảng gói vào một object — mọi thay đổi chỉ cần gọi lại `applyFilters()`:

```js
let appointments = loadAppointments();
const filters = { keyword: '', status: 'all' };

function applyFilters() {
  const kw = filters.keyword.trim().toLowerCase();
  const result = appointments.filter(a =>
    (filters.status === 'all' || a.status === filters.status) &&
    (!kw || a.patient.toLowerCase().includes(kw))
  );
  renderTable(result);
}
function renderTable(list) {
  document.getElementById('appointmentBody').innerHTML = list.map(rowHTML).join('');
  document.getElementById('emptyNote').classList.toggle('d-none', list.length > 0);
}
```

Tìm kiếm + lọc là **hai điều kiện độc lập** gộp trong một `filter` — mô hình y hệt bộ lọc bác sĩ ở bài 03. Hàm `rowHTML` sinh một hàng:

```js
function rowHTML(a) {
  return `
    <tr data-id="${a.id}">
      <td class="fw-semibold">${a.patient}</td>
      <td>${a.specialty}</td>
      <td>${a.doctor}</td>
      <td>${a.date} · ${a.time}</td>
      <td><span class="badge ${STATUS_BADGE[a.status]}">${STATUS_LABEL[a.status]}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-success me-1" data-action="xac_nhan" title="Xác nhận">✓</button>
        <button class="btn btn-sm btn-outline-danger me-1" data-action="huy" title="Huỷ">✕</button>
        <button class="btn btn-sm btn-outline-secondary" data-action="delete" title="Xoá">🗑</button>
      </td>
    </tr>`;
}
```

## Cập nhật trạng thái & xoá — bằng event delegation

Một listener trên `<tbody>` xử lý mọi nút của mọi hàng; tìm hàng chứa nút qua `closest('tr')`:

```js
document.getElementById('appointmentBody').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const row = btn.closest('tr');
  const id = Number(row.dataset.id);
  const target = appointments.find(a => a.id === id);
  if (!target) return;
  const action = btn.dataset.action;
  if (action === 'delete') {
    if (!confirm(`Xoá lịch hẹn của "${target.patient}"?`)) return;
    appointments = appointments.filter(a => a.id !== id);
  } else {
    target.status = action; // 'xac_nhan' hoặc 'huy'
  }
  saveAppointments(appointments); // ghi lại ngay sau mỗi thay đổi
  applyFilters();                 // badge tự đổi
  renderMetrics(appointments);    // metrics tự cập nhật
});

document.getElementById('searchInput').addEventListener('input', (e) => { filters.keyword = e.target.value; applyFilters(); });
document.getElementById('statusFilter').addEventListener('change', (e) => { filters.status = e.target.value; applyFilters(); });
```

Toàn bộ giao diện chỉ là **hàm render của dữ liệu**: sửa dữ liệu → ghi `localStorage` → gọi lại render. Đó là mô hình "state-driven UI" — gặp lại nguyên xi khi học React.

## Prompt AI cho bài này

```text
Tôi đang xây Admin Dashboard cho bệnh viện Highland Hospital bằng Bootstrap 5,
JS thuần ES6+. Dữ liệu là mảng appointments trong localStorage (key
highland_appointments), mỗi phần tử: { id, patient, doctor, specialty, date,
time, status } với status ∈ cho | xac_nhan | huy | hoan_thanh.
Tôi đã có HTML: ô #searchInput, select #statusFilter, tbody #appointmentBody,
vùng #metricRow. Viết giúp js/admin.js:
1. renderMetrics(list): 4 card — tổng số, lịch hẹn hôm nay (so date với ngày hiện
   tại), số chờ duyệt, số hoàn thành
2. applyFilters() lọc theo từ khoá (tên bệnh nhân, không phân biệt hoa thường)
   và trạng thái, render vào #appointmentBody kèm badge màu khác nhau cho 4 trạng thái
3. Event delegation trên tbody: nút data-action="xac_nhan" | "huy" | "delete"
4. Mọi thay đổi phải ghi localStorage ngay rồi render lại
5. Có trạng thái rỗng khi không có kết quả
Giải thích ngắn vì sao nên tách render thành hàm riêng và chỗ dùng confirm().
```

## Thực hành

1. Tạo `admin.html` + `js/admin.js` theo cấu trúc trên; kiểm tra 4 metrics khớp số lượng dữ liệu seed.
2. Tìm "Thu" — kết quả đúng; lọc "Chờ duyệt" rồi gõ thêm từ khoá — hai điều kiện chạy đồng thời.
3. Bấm ✓ xác nhận một lịch hẹn → badge chuyển xanh, metrics "Chờ duyệt" giảm 1. Tải lại trang — dữ liệu còn nhờ `localStorage`.
4. Xoá một lịch hẹn (có confirm) → metrics giảm tương ứng.
5. Gõ `localStorage.clear()` trong Console rồi tải lại — dữ liệu seed tự nạp lần đầu.
6. Chạy prompt AI trên, đối chiếu output với code của bạn.

## Bài tiếp theo

Chức năng đã đủ — giờ làm cả 3 trang chạy **nhanh và mượt trên mọi màn hình**: đo Lighthouse, tối ưu ảnh, giảm layout shift, kiểm tra responsive 320/768/1024/1440, accessibility cơ bản — bài *Tối ưu hiệu năng & Responsive*.
