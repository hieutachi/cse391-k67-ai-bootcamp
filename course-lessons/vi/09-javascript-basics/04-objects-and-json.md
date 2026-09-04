# Objects & JSON

## Mục tiêu bài học
- Tạo object, truy cập và sửa thuộc tính, thêm phương thức
- Hiểu JSON là gì và chuyển đổi với `JSON.stringify` / `JSON.parse`
- Làm việc với mảng lịch hẹn mẫu dạng JSON của bệnh viện
- Phân biệt object trong code (JavaScript) và JSON (định dạng văn bản)

## Tạo và thao tác object

```js
// Object literal
const appointment = {
  id: 'A001',
  patientName: 'Nguyễn Văn An',
  specialty: 'Tim mạch',
  doctorId: 'D002',
  date: '2025-12-12',
  time: '09:00',
  status: 'pending', // pending | confirmed | done | cancelled
};

// Truy cập — hai cách tương đương
console.log(appointment.patientName); // Nguyễn Văn An
console.log(appointment['specialty']); // Tim mạch — dùng khi tên thuộc tính là biến

// Sửa thuộc tính
appointment.status = 'confirmed';
appointment.doctorId = 'D005'; // đổi bác sĩ

// Thêm thuộc tính mới
appointment.note = 'Cần khám lúc chiều';

// Xoá thuộc tính
delete appointment.note;

// Phương thức — hàm nằm trong object, dùng this để trỏ vào chính object
const bookingService = {
  confirm(appt) {
    appt.status = 'confirmed';
    return `Lịch ${appt.id} đã xác nhận cho ${appt.patientName}.`;
  },
};
console.log(bookingService.confirm(appointment));
```

Dấu ngoặc vuông `appointment['date']` hữu ích khi tên thuộc tính nằm trong biến hoặc chứa ký tự đặc biệt (`'thời-gian-khám'` thì phải dùng ngoặc vuông).

## Mảng lịch hẹn — dữ liệu gốc của bệnh viện

```js
const appointments = [
  { id: 'A001', patientName: 'Nguyễn Văn An', specialty: 'Tim mạch',     date: '2025-12-12', time: '09:00', status: 'pending'   },
  { id: 'A002', patientName: 'Trần Thu Hà',   specialty: 'Nhi khoa',     date: '2025-12-12', time: '10:30', status: 'confirmed' },
  { id: 'A003', patientName: 'Phạm Quốc Bảo', specialty: 'Nội tổng hợp', date: '2025-12-13', time: '14:00', status: 'done'      },
];

// Kết hợp mọi thứ bài 03 đã học
const pendingCount = appointments.filter((a) => a.status === 'pending').length;
console.log(`Có ${pendingCount} lịch hẹn đang chờ xác nhận.`);

const tomorrow = appointments
  .filter((a) => a.date === '2025-12-13')
  .map((a) => `${a.time} — ${a.patientName} (${a.specialty})`);
console.log(tomorrow);
```

Một object là "một lịch hẹn"; một mảng object là "toàn bộ sổ lịch" — cấu trúc này sẽ chạy xuyên suốt phần Admin Dashboard ở chương 12.

## JSON — định dạng trao đổi dữ liệu

JSON (JavaScript Object Notation) là **văn bản** để truyền dữ liệu giữa trình duyệt và server. Nó trông giống object JavaScript nhưng khác ba điểm: mọi key phải bọc nháy kép, chuỗi dùng nháy kép, không chứa hàm hay `undefined`.

```js
// Object trong bộ nhớ
const appointment = {
  patientName: 'Nguyễn Văn An',
  specialty: 'Tim mạch',
  fee: 650000,
};

// Object → chuỗi JSON (để gửi lên server / lưu localStorage)
const json = JSON.stringify(appointment);
console.log(json);
// {"patientName":"Nguyễn Văn An","specialty":"Tim mạch","fee":650000}

// Chuỗi JSON → object (khi nhận từ server)
const restored = JSON.parse(json);
console.log(restored.patientName); // Nguyễn Văn An
```

Tham số thứ ba của `stringify` thêm khoảng trắng cho dễ đọc khi debug: `JSON.stringify(appointments, null, 2)` in toàn bộ sổ lịch dạng cây.

## JSON hợp lệ — kiểm tra nhanh

Lỗi thường gặp: key thiếu nháy kép, dư dấu phẩy cuối, hoặc dùng nháy đơn.

```json
// ❌ Không phải JSON hợp lệ
{ "patientName": 'Nguyễn Văn An', specialty: "Tim mạch", }

// ✅ JSON hợp lệ
{ "patientName": "Nguyễn Văn An", "specialty": "Tim mạch" }
```

Khi bị `JSON.parse` báo `Unexpected token`, dán chuỗi vào validator trực tuyến hoặc hỏi AI sửa — nhưng bạn phải đọc được lỗi ở dòng nào.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Tôi đang xây Admin Dashboard cho Highland Hospital, dữ liệu là mảng lịch hẹn JSON dạng `[{ id, patientName, specialty, doctorId, date, time, status }]`. Hãy viết code: (1) `JSON.stringify` một lịch hẹn mẫu rồi `JSON.parse` lại, in ra console; (2) dùng `filter` lấy các lịch `confirmed` vào ngày `2025-12-12`; (3) viết JSON thủ công cho 3 lịch hẹn và cho tôi biết nếu tôi gõ sai cú pháp thì lỗi trông thế nào. Giải thích khác biệt giữa object JavaScript và JSON.

## Thực hành
1. Tạo `appointments.js` chứa mảng 3 lịch hẹn; mở Console và in `JSON.stringify(appointments, null, 2)`.
2. Dùng `filter` đếm lịch theo từng trạng thái (pending/confirmed/done).
3. Tạo object `appointment` mới, thêm thuộc tính `note`, rồi xoá nó bằng `delete` — quan sát kết quả in ra.
4. Mở một API bất kỳ trả JSON (ví dụ `jsonplaceholder.typicode.com/todos/1`) trong trình duyệt và nhận xét điểm giống/khác với object bạn viết.
5. Chạy prompt mẫu với AI, tự sửa JSON lỗi trước khi nhờ nó.

## Bài tiếp theo

Dữ liệu đã sẵn ở dạng object/array; bài Lab cuối chương gom toàn bộ — map + template literal — để render sáu bác sĩ thành lưới card thật sự.
