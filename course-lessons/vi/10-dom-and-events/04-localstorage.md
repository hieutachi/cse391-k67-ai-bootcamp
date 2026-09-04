# Lưu trữ với localStorage

## Mục tiêu bài học
- Dùng `localStorage.setItem` / `getItem` / `removeItem` đúng cách
- Lưu và đọc mảng object qua `JSON.stringify` / `JSON.parse`
- Hiểu vì sao `localStorage` là lựa chọn hợp lý cho dữ liệu lịch hẹn phía client
- Viết luồng lưu – đọc – sửa danh sách `appointments` của Highland Hospital

## localStorage là gì?

`localStorage` là một "két sắt" nhỏ trình duyệt cấp riêng cho từng trang web: dữ liệu **sống lâu dài** theo tên miền — đóng tab, tắt máy, mở lại vẫn còn, cho tới khi bạn hoặc người dùng xoá. Giới hạn thường ~5MB, đủ cho vài trăm lịch hẹn JSON.

Ba thao tác cốt lõi:

```js
localStorage.setItem('ten-khoa', 'giá trị');   // lưu (ghi đè nếu đã có)
const value = localStorage.getItem('ten-khoa'); // đọc — null nếu chưa tồn tại
localStorage.removeItem('ten-khoa');            // xoá một khoá
localStorage.clear();                           // xoá toàn bộ (cẩn thận khi dùng)
```

**Chú ý:** localStorage chỉ lưu được **chuỗi** (string). Lưu số `5` vào thì đọc ra là chuỗi `"5"`. Còn lưu mảng/object mà không qua JSON thì sẽ ra chuỗi vô nghĩa `"[object Object]"`.

## Lưu mảng: bắt buộc qua JSON

Mọi lịch hẹn của Highland Hospital là object:

```js
const appointments = [
  { id: 1, patientName: 'Trần Văn An', specialty: 'Tim mạch', date: '2025-06-20', time: '09:00' },
];
```

Để lưu được, ta **mã hoá** mảng thành chuỗi JSON, và khi đọc thì **giải mã** ngược lại:

```js
// LƯU
localStorage.setItem('appointments', JSON.stringify(appointments));

// ĐỌC — luôn phòng trường hợp chưa có gì trong kho
const raw = localStorage.getItem('appointments');
const saved = raw ? JSON.parse(raw) : [];
```

Một mẹo quan trọng khi làm việc với dữ liệu từ `localStorage`: nó nằm ngoài tầm kiểm soát của code bạn — người dùng có thể sửa tay, hoặc từ bản cũ để lại cấu trúc khác. **Luôn kiểm tra trước khi dùng**:

```js
function loadAppointments() {
  try {
    const parsed = JSON.parse(localStorage.getItem('appointments'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // JSON hỏng → trả về danh sách trống thay vì làm crash trang
  }
}
```

## Vì sao dùng localStorage cho lịch hẹn?

Highland Hospital Web Portal **chỉ có frontend** (không server, không database — đã nói ở bài đầu khoá). Người dùng là lễ tân hoặc bệnh nhân trên *một máy*, và yêu cầu đặt ra là: đặt lịch xong, quay lại trang (kể cả ngày mai) vẫn thấy. `localStorage` trả lời đúng yêu cầu đó mà không cần backend. Khi dự án thật cần đồng bộ nhiều máy, bạn mới thay bằng API — và để làm được điều đó, mọi chỗ đang đụng `localStorage` phải gom về hai hàm `loadAppointments` / `saveAppointments` để sau này chỉ sửa một nơi.

## Luồng lưu – đọc – sửa

```js
const STORAGE_KEY = 'appointments';

function saveAppointments(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function addAppointment(appointment) {
  const list = loadAppointments();
  appointment.id = Date.now();          // id tạm đủ dùng phía client
  list.push(appointment);
  saveAppointments(list);
  return appointment;
}

function removeAppointment(id) {
  // SỬA = đọc ra → lọc bỏ phần tử → ghi đè lại
  const list = loadAppointments().filter((appt) => appt.id !== id);
  saveAppointments(list);
}

function updateAppointment(id, changes) {
  const list = loadAppointments().map((appt) =>
    appt.id === id ? { ...appt, ...changes } : appt
  );
  saveAppointments(list);
}
```

Toàn bộ triết lý gói trong một câu: **`localStorage` không sửa được "tại chỗ" — muốn sửa thì đọc nguyên danh sách, biến đổi bằng `filter`/`map`, rồi ghi đè lại.** Nút xoá ở bài 02 (delegation) giờ chỉ cần gọi `removeAppointment(id)` rồi render lại là xong luồng xoá thật.

## Prompt AI mẫu

```text
Dự án Highland Hospital (JS thuần ES6+), khoá localStorage "appointments"
lưu mảng appointment: { id, patientName, specialty, date, time, status }.
Viết 4 hàm tiêu chuẩn: loadAppointments (an toàn khi JSON hỏng, trả mảng),
saveAppointments, addAppointment (tự sinh id bằng Date.now, mặc định
status "pending"), updateAppointmentStatus(id, newStatus). Kèm ví dụ gọi
thử 3 dòng ở cuối file để tôi test trên Console.
```

## Thực hành
1. Mở Console DevTools → tab Application → Local Storage để quan sát dữ liệu trực tiếp.
2. Gõ thử: `localStorage.setItem('demo', JSON.stringify([1,2,3]))`, rồi đọc lại và `JSON.parse` — nhìn thấy sự khác biệt giữa chuỗi và mảng.
3. Viết bộ hàm theo prompt, thêm 2 lịch hẹn, tải lại trang (F5) và kiểm tra danh sách còn nguyên.
4. Sửa trạng thái một lịch hẹn bằng `updateAppointmentStatus`, quan sát giá trị trong tab Application thay đổi.

## Bài tiếp theo

Đủ công cụ DOM + sự kiện + validate + lưu trữ rồi — bài Lab tiếp theo gộp tất cả thành tính năng thật đầu tiên: bộ lọc bác sĩ theo chuyên khoa.
