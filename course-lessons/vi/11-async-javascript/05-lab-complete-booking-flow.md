# Lab: đặt lịch khám hoàn chỉnh

## Mục tiêu bài học
- Nối toàn bộ kiến thức: DOM, sự kiện, validate, localStorage, fetch, async/await
- Render bác sĩ từ mock API vào select của form đa bước
- Submit hợp lệ → lưu appointment vào localStorage và hiện modal xác nhận
- Tự kiểm tra bằng checklist hoàn thiện trước khi chuyển chương

## Bài toán

Ghép các mảnh đã học thành một luồng duy nhất: trang mở → fetch bác sĩ từ JSON Server (có loading + lỗi) → người dùng điền form 3 bước (validate từng bước) → bấm Xác nhận → lịch hẹn lưu vào `localStorage` và modal báo thành công:

```
fetch /doctors ──► select "Bác sĩ" (bước 1)
                        │
 bước 1 → bước 2 (validate) → bước 3: xác nhận
                        │
              submit hợp lệ
                        │
 ┌──────────────────────┼──────────────────────┐
 ▼                      ▼                      ▼
saveAppointments    reset form → bước 1   modal "Đặt lịch thành công"
(localStorage)
```

## Bước 1 — Kết nối API và form

```js
const state = { currentStep: 1, doctors: [], data: {
  specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '',
} };

async function initBookingPage() {
  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) throw new Error(`Lỗi ${response.status}`);
    populateDoctorSelect(await response.json());
  } catch (error) {
    console.warn('API chưa sẵn sàng, dùng dữ liệu mẫu:', error);
    populateDoctorSelect(DOCTORS_FALLBACK);
  }
}

function populateDoctorSelect(doctors) {
  state.doctors = doctors;
  const specialtySelect = document.querySelector('#bk-specialty');
  specialtySelect.innerHTML = '<option value="">— Chọn chuyên khoa —</option>';
  [...new Set(doctors.map((doc) => doc.specialty))].forEach((specialty) => {
    const option = document.createElement('option');
    option.value = specialty;
    option.textContent = specialty;
    specialtySelect.append(option);
  });
}

function filterDoctorsBySpecialty(specialty) {
  return state.doctors.filter((doc) => doc.specialty === specialty);
}
```

Handler `change` của `#bk-specialty` (bài đa bước) sẽ gọi `filterDoctorsBySpecialty` rồi đổ kết quả vào `#bk-doctor`. Còn `validateStep()` kế thừa nguyên luật của bài Form Validation nhưng chạy **trên state** (bài trước đã nêu) — giờ chỉ cần đảm bảo submit gọi nó trước khi lưu.

## Bước 2 — Submit: lưu + modal xác nhận

```js
const STORAGE_KEY = 'appointments';

function loadAppointments() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];   // JSON hỏng → trả danh sách trống, không crash trang
  }
}

const form = document.querySelector('#booking-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateStep(state.currentStep)) return;   // phòng submit sớm

  const doctor = state.doctors.find((doc) => doc.id === state.data.doctorId);
  const appointment = {
    id: Date.now(),
    patientName: state.data.patientName,
    phone: state.data.phone,
    specialty: state.data.specialty,
    doctorId: state.data.doctorId,
    doctorName: doctor ? doctor.name : '',
    date: state.data.date,
    time: state.data.time,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // 1. lưu vào localStorage
  const list = loadAppointments();
  list.push(appointment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // 2. hiện modal xác nhận (Bootstrap 5)
  document.querySelector('#modal-confirm-name').textContent = appointment.patientName;
  document.querySelector('#modal-confirm-detail').textContent =
    `${appointment.specialty} — ${appointment.doctorName} — ${appointment.date} ${appointment.time}`;
  bootstrap.Modal.getOrCreateInstance(
    document.querySelector('#booking-success-modal')
  ).show();

  // 3. reset form về bước 1
  form.reset();
  state.data = { specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '' };
  showStep(1);
});
```

HTML modal (đặt cuối `<body>`):

```html
<div class="modal fade" id="booking-success-modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">✅ Đặt lịch thành công</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="mb-1"><strong id="modal-confirm-name"></strong></p>
        <p class="text-muted mb-0" id="modal-confirm-detail"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
```

## Prompt AI mẫu — prompt tổng hợp cả luồng

```text
Dự án Highland Hospital (Bootstrap 5, JS thuần ES6+, tiếng Việt). Viết
JS cho trang đặt lịch: (1) khi tải, fetch "http://localhost:3000/doctors"
bằng async/await, kiểm tra response.ok, lỗi thì dùng mảng DOCTORS_FALLBACK,
đổ chuyên khoa vào #bk-specialty và bác sĩ vào #bk-doctor; (2) form 3
bước .step-panel với state { currentStep, doctors, data } và showStep();
(3) validate từng bước khi bấm "Tiếp tục" dùng classList is-invalid;
(4) submit lưu appointment { id: Date.now(), ...data, doctorName tra từ
doctors, status: "pending" } vào localStorage "appointments" rồi hiện
modal #booking-success-modal và reset form về bước 1. Chỉ render tên
người bằng textContent, không innerHTML.
```

## Checklist hoàn thiện

- [ ] `#bk-specialty` và `#bk-doctor` có dữ liệu — thử cả hai trường hợp: JSON Server chạy / tắt
- [ ] Đổi chuyên khoa → bác sĩ lọc đúng; không thể chọn bác sĩ khác khoa
- [ ] Bấm Tiếp tục khi bước còn lỗi → bị chặn và có thông báo rõ ràng
- [ ] Quay lại bước 1 → dữ liệu đã chọn vẫn còn (state giữ)
- [ ] Bước 3 hiển thị đúng thông tin đã nhập (không có `[object Object]`)
- [ ] Submit thành công → modal hiện; tab Application → Local Storage có bản ghi `appointments` mới
- [ ] F5 tải lại → bản ghi vẫn còn trong localStorage (chương 12 Admin Dashboard sẽ đọc chúng)
- [ ] Không có lỗi đỏ trong Console khi chạy đúng luồng

## Thực hành
1. Chạy lại toàn bộ luồng và đối chiếu checklist — mục nào chưa qua thì sửa ngay.
2. Đặt 2 lịch hẹn, mở `localStorage` quan sát cấu trúc dữ liệu lưu được.
3. Xoá tạm `db.json` để ép code rơi vào nhánh `DOCTORS_FALLBACK` — trang vẫn dùng được.
4. Chuẩn bị cho chương 12: gọi `loadAppointments()` trong Console và tự render thử — Admin Dashboard sẽ dùng chính dữ liệu này.

## Bài tiếp theo

Luồng đặt lịch hoàn chỉnh đã chạy từ đầu tới cuối — chương 12 sẽ dựng Landing Page và Admin Dashboard, nơi mọi lịch hẹn bạn vừa lưu sẽ hiện lên để quản lý.
