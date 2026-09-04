# Luồng đặt lịch đa bước

## Mục tiêu bài học
- Chia form dài thành 3 bước: dịch vụ+bác sĩ → thông tin bệnh nhân+thời gian → xác nhận
- Quản lý trạng thái bằng object `state` và biến `currentStep`
- Điều hướng Tiếp tục / Quay lại có kiểm soát giữa các bước
- Hiển thị tiến trình bằng progress indicator Bootstrap

## Vì sao chia bước?

Form đặt lịch gom hết vào một trang sẽ dài và dễ bỏ sót. Chia 3 bước giúp người dùng chỉ tập trung một việc mỗi lần, và bạn **validate từng bước** trước khi cho đi tiếp — bắt lỗi sớm, không để tới cuối mới "nổ" hàng loạt.

## Cấu trúc HTML: 3 panel + progress

```html
<ol class="progress-indicator mb-4">
  <li class="step active" data-step="1">1. Chọn dịch vụ</li>
  <li class="step" data-step="2">2. Thông tin & lịch</li>
  <li class="step" data-step="3">3. Xác nhận</li>
</ol>
<div class="progress mb-4" style="height: 6px;">
  <div id="progress-bar" class="progress-bar" style="width: 33%"></div>
</div>

<form id="booking-form" novalidate>
  <section class="step-panel" data-panel="1">
    <h2 class="h5 mb-3">Chọn dịch vụ khám</h2>
    <div class="mb-3"><label class="form-label">Chuyên khoa</label>
      <select id="bk-specialty" class="form-select"></select></div>
    <div class="mb-3"><label class="form-label">Bác sĩ</label>
      <select id="bk-doctor" class="form-select"></select></div>
    <button type="button" class="btn btn-primary" data-action="next">Tiếp tục</button>
  </section>

  <section class="step-panel d-none" data-panel="2">
    <h2 class="h5 mb-3">Thông tin bệnh nhân</h2>
    <!-- #bk-name, #bk-phone, #bk-date, #bk-time -->
    <button type="button" class="btn btn-outline-secondary" data-action="prev">Quay lại</button>
    <button type="button" class="btn btn-primary" data-action="next">Tiếp tục</button>
  </section>

  <section class="step-panel d-none" data-panel="3">
    <h2 class="h5 mb-3">Xác nhận thông tin</h2>
    <dl id="bk-summary" class="row"></dl>
    <button type="button" class="btn btn-outline-secondary" data-action="prev">Quay lại</button>
    <button type="submit" class="btn btn-success">Xác nhận đặt lịch</button>
  </section>
</form>
```

Progress indicator chỉ là danh sách 3 thẻ có `data-step`; thanh `.progress-bar` đổi `width` theo bước hiện tại.

## State: một object giữ toàn bộ dữ liệu

Gom mọi dữ liệu người dùng chọn/gõ vào object `state` — panel ẩn/hiện nhưng dữ liệu luôn nằm đây, không nằm trong DOM:

```js
const state = { currentStep: 1, data: {
  specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '',
} };
const TOTAL_STEPS = 3;

function showStep(step) {
  state.currentStep = step;
  document.querySelectorAll('.step-panel').forEach((panel) => {
    panel.classList.toggle('d-none', Number(panel.dataset.panel) !== step);
  });
  document.querySelectorAll('.progress-indicator .step').forEach((el) => {
    el.classList.toggle('active', Number(el.dataset.step) === step);
  });
  document.querySelector('#progress-bar').style.width = `${(step / TOTAL_STEPS) * 100}%`;
  if (step === 3) renderSummary();   // bước cuối: vẽ lại phần xác nhận từ state
}
```

## Điều hướng: ghi state + validate rồi mới chuyển bước

```js
document.querySelector('#booking-form').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'next' && !validateStep(state.currentStep)) return; // chặn ở đây
  const next = action === 'next' ? state.currentStep + 1 : state.currentStep - 1;
  if (next >= 1 && next <= TOTAL_STEPS) showStep(next);
});

const form = document.querySelector('#booking-form');
form.querySelector('#bk-specialty').addEventListener('change', (e) => {
  state.data.specialty = e.target.value;
  state.data.doctorId = null;              // đổi khoa → reset bác sĩ đã chọn
});
form.querySelector('#bk-name').addEventListener('input', (e) => {
  state.data.patientName = e.target.value.trim();
});
// ... tương tự cho #bk-phone, #bk-date, #bk-time
```

`validateStep(step)` tái dùng đúng luật bài Form Validation nhưng chạy **trên state** (tên ≥ 2 ký tự, phone hợp lệ, ngày không quá khứ, đã chọn bác sĩ), trả `true/false` — bài Lab tới sẽ viết bản hoàn chỉnh.

## Bước xác nhận: chỉ đọc state, render bằng textContent

Bước 3 hiển thị tên bệnh nhân — **dữ liệu người dùng** — nên chỉ dùng `createElement` + `textContent`, không qua `innerHTML` (bài DOM đã cảnh báo XSS):

```js
function renderSummary() {
  const summary = document.querySelector('#bk-summary');
  summary.innerHTML = '';    // sạch bản vẽ cũ
  const rows = [
    ['Chuyên khoa', state.data.specialty],
    ['Bác sĩ', state.data.doctorId ? `Bác sĩ #${state.data.doctorId}` : '—'],
    ['Bệnh nhân', state.data.patientName],
    ['Ngày khám', state.data.date],
    ['Giờ khám', state.data.time],
  ];
  for (const [label, value] of rows) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    summary.append(dt, dd);
  }
}
```

## Prompt AI mẫu

```text
Dự án Highland Hospital, JS thuần ES6+, Bootstrap 5. Tôi có 3 section
.step-panel (1: chọn chuyên khoa+bác sĩ, 2: tên/điện thoại/ngày/giờ,
3: xác nhận). Viết: object state { currentStep, data }; showStep(step)
ẩn/hiện panel, cập nhật .progress-bar width và .step active; delegation
click trên form xử lý button[data-action="next|prev"] — trước khi next
chạy validateStep(step) trả boolean (name ≥ 2, phone hợp lệ, ngày không
quá khứ, đã chọn specialty + doctor); bước 3 render tóm tắt bằng
createElement + textContent. Kèm 5 dòng giải thích vì sao dữ liệu phải
nằm trong state thay vì đọc từ DOM khi chuyển bước.
```

## Thực hành
1. Dựng 3 panel theo HTML mẫu (tạm dùng dữ liệu tĩnh cho select bác sĩ).
2. Viết `state` + `showStep` + delegation điều hướng; kiểm tra bấm Tiếp tục không qua bước còn lỗi.
3. Nhập bước 1, đi tiếp rồi **Quay lại** — giá trị còn nguyên (vì nằm trong state).
4. Quan sát progress bar chạy 33% → 66% → 100% theo từng bước.

## Bài tiếp theo

Ba bước đã chạy — bài Lab cuối chương nối toàn bộ: render bác sĩ từ mock API, validate từng bước, lưu lịch hẹn vào localStorage và hiện modal xác nhận thành công.
