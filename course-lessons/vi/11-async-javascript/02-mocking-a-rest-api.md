# Mock REST API

## Mục tiêu bài học
- Hiểu mô hình REST API: tài nguyên + endpoint + phương thức HTTP
- Dựng API giả nhanh bằng JSON Server: `npx json-server db.json`
- Định nghĩa `db.json` chuẩn cho Highland Hospital với `/doctors`, `/appointments`
- Biết cách mock thuần bằng `Promise` + `setTimeout` khi không muốn cài thêm

## REST API là gì (bản tối giản)

REST quy ước tổ chức dữ liệu thành **tài nguyên** (resource), mỗi tài nguyên một URL gọi là **endpoint**, hành động diễn tả bằng **phương thức HTTP**:

| Phương thức | Ý nghĩa | Endpoint Highland Hospital |
|---|---|---|
| `GET` | đọc danh sách / một bản ghi | `GET /doctors`, `GET /appointments/3` |
| `POST` | tạo mới | `POST /appointments` |
| `PATCH` / `PUT` | cập nhật | `PATCH /appointments/3` |
| `DELETE` | xoá | `DELETE /appointments/3` |

Phía client trao đổi JSON: gửi object JSON, nhận object JSON. Khoá học này chưa cần server thật — ta chỉ cần thứ trả về **đúng format đó**, gọi là *mock API*.

## Cách 1: JSON Server (nhanh, gần thật nhất)

Chỉ cần một file dữ liệu và một lệnh:

```bash
# chạy trong thư mục dự án, ở terminal riêng (đừng tắt khi test)
npx json-server --watch db.json --port 3000
```

Lệnh này dựng nguyên một REST API từ file `db.json` — mỗi khoá cấp cao trở thành một endpoint. Tạo `db.json`:

```json
{
  "doctors": [
    { "id": 1, "name": "BS. Nguyễn Thu Hà", "specialty": "Tim mạch",
      "experience": 12, "avatar": "https://i.pravatar.cc/150?img=47" },
    { "id": 2, "name": "BS. Trần Minh Khang", "specialty": "Nội tổng hợp",
      "experience": 8, "avatar": "https://i.pravatar.cc/150?img=12" }
  ],
  "appointments": [
    { "id": 1, "patientName": "Trần Văn An", "phone": "0912 345 678",
      "specialty": "Tim mạch", "doctorId": 1, "date": "2025-06-20",
      "time": "09:00", "status": "pending" }
  ]
}
```

Sau khi chạy, mở trình duyệt thử:

- `http://localhost:3000/doctors` — mảng bác sĩ
- `http://localhost:3000/doctors/1` — một bác sĩ
- `http://localhost:3000/appointments` — mảng lịch hẹn

JSON Server hỗ trợ sẵn `POST`/`PATCH`/`DELETE` lẫn lọc query như `GET /doctors?specialty=Tim mạch`. Lưu ý CORS: trang mở bằng `file://` sẽ bị chặn fetch — hãy luôn mở qua **Live Server** (`http://127.0.0.1:5500`).

## Cách 2: mock thuần bằng Promise + setTimeout

Khi chưa muốn cài thêm gì (demo offline), giả lập độ trễ mạng bằng tay — hàm vẫn trả về `Promise` nên chỗ gọi giống hệt khi fetch API thật:

```js
// mock-api.js — chỉ dùng để học, xoá khi có API thật
const fakeDoctors = [
  { id: 1, name: 'BS. Nguyễn Thu Hà', specialty: 'Tim mạch', experience: 12 },
  { id: 2, name: 'BS. Trần Minh Khang', specialty: 'Nội tổng hợp', experience: 8 },
];

function getDoctors() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeDoctors), 600);   // giả lập mạng 600ms
  });
}

async function demo() {
  const doctors = await getDoctors();   // gọi y như await fetch
  console.log(doctors);
}
demo();
```

Mẹo hay: mock cả lỗi để tập xử lý `catch` — đổi `resolve` thành `reject(new Error('Mạng lỗi'))`.

## Prompt AI mẫu

```text
Tôi đang học mock API cho dự án Highland Hospital (frontend thuần).
Tạo db.json cho JSON Server gồm: 6 doctors (id, name, specialty,
experience, avatar) thuộc 3 chuyên khoa Tim mạch / Nội tổng hợp / Nhi,
và 3 appointments (id, patientName, phone, specialty, doctorId, date,
time, status) — tên tiếng Việt hợp lý. Kèm 3 lệnh fetch minh hoạ:
GET /doctors, GET /appointments?status=pending, POST /appointments.
```

## Thực hành
1. Tạo `db.json` (tự viết hoặc theo prompt), chạy `npx json-server --watch db.json --port 3000`.
2. Mở `http://localhost:3000/doctors` trong trình duyệt, ghi nhận JSON trả về.
3. Gửi `POST` một lịch hẹn bằng Console:
   `fetch('http://localhost:3000/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patientName: 'Lê Thị Bích', phone: '0908 123 456', specialty: 'Nhi', doctorId: 3, date: '2025-06-22', time: '14:00', status: 'pending' }) })`
   rồi `GET` lại danh sách xem bản ghi mới.
4. Xoá `db.json` và thử cách mock thuần — so sánh cách gọi hàm của hai cách giống nhau ở điểm nào.

## Bài tiếp theo

Đã có API giả — nhưng mạng luôn chậm và hay lỗi; bài sau dạy hai trạng thái không thể thiếu của mọi màn hình tải dữ liệu: spinner loading và thông báo lỗi kèm nút retry.
