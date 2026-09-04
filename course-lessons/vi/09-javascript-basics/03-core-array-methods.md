# Array Methods cốt lõi

## Mục tiêu bài học
- Dùng thành thạo `map`, `filter`, `find`, `forEach`, `reduce`, `sort`, `includes`
- Tư duy "mô tả đầu vào → đầu ra" trước khi viết code
- Lọc bác sĩ nội khoa, tìm bác sĩ theo id, đếm bác sĩ theo chuyên khoa

## Tư duy mô tả đầu vào/đầu ra

Trước khi tra cứu cú pháp, hãy nói thành câu điều bạn cần:

| Bạn muốn | Nói với chính mình | Method |
|---|---|---|
| Biến đổi từng phần tử thành phần tử mới | "Mỗi bác sĩ → một card HTML" | `map` |
| Giữ lại một nhóm phần tử thoả điều kiện | "Giữ bác sĩ nào thuộc Nội khoa" | `filter` |
| Lấy đúng MỘT phần tử theo điều kiện | "Bác sĩ có id = D002" | `find` |
| Làm gì đó với từng phần tử, không cần kết quả mới | "In từng bác sĩ ra console" | `forEach` |
| Gom toàn bộ mảng về một giá trị | "Tổng lượt khám, đếm theo chuyên khoa" | `reduce` |

Chọn được method đúng là đã giải được nửa bài toán.

## Dữ liệu mẫu

```js
const doctors = [
  { id: 'D001', name: 'Nguyễn Minh Anh', specialty: 'Nội tổng hợp', experience: 12, fee: 500000, bookings: 240 },
  { id: 'D002', name: 'Lê Hoàng Nam',   specialty: 'Tim mạch',     experience: 15, fee: 650000, bookings: 310 },
  { id: 'D003', name: 'Trần Thu Hà',    specialty: 'Nhi khoa',     experience: 8,  fee: 400000, bookings: 198 },
  { id: 'D004', name: 'Phạm Quốc Bảo',  specialty: 'Nội tổng hợp', experience: 10, fee: 450000, bookings: 175 },
];
```

## map — biến đổi từng phần tử

```js
// Đầu vào: mảng bác sĩ → Đầu ra: mảng chuỗi mô tả
const labels = doctors.map((d) => `${d.name} — ${d.specialty}`);
console.log(labels);

// Thành HTML sẵn sàng đưa vào trang (chương 9 bài 5 sẽ dùng)
const cards = doctors.map((d) => `<p>${d.name} (${d.specialty})</p>`);
console.log(cards);
```

`map` luôn trả mảng **cùng số phần tử**, mỗi phần tử là kết quả của callback.

## filter — giữ phần tử thoả điều kiện

```js
// Bác sĩ thuộc Nội tổng hợp
const internists = doctors.filter((d) => d.specialty === 'Nội tổng hợp');
console.log(internists.length); // 2

// Bác sĩ dưới 10 năm kinh nghiệm
const juniors = doctors.filter((d) => d.experience < 10);
console.log(juniors.map((d) => d.name)); // ['Trần Thu Hà']
```

## find — lấy đúng một phần tử

```js
// Đầu vào: tìm theo điều kiện → Đầu ra: phần tử ĐẦU TIÊN khớp, hoặc undefined
const doctor = doctors.find((d) => d.id === 'D002');
console.log(doctor?.name); // Lê Hoàng Nam

// find kết hợp toán tử optional chaining (?.) tránh lỗi khi không tìm thấy
const missing = doctors.find((d) => d.id === 'D999');
console.log(missing?.name ?? 'Không có bác sĩ này'); // Không có bác sĩ này
```

## forEach — duyệt không cần kết quả

```js
doctors.forEach((d) => console.log(`${d.name}: ${d.fee.toLocaleString('vi-VN')}đ`));
```

Nếu bạn định *trả về* mảng mới từ `forEach` thì đã chọn nhầm — dùng `map`.

## reduce — gom về một giá trị

```js
// Tổng lượt khám của toàn bệnh viện
const totalBookings = doctors.reduce((sum, d) => sum + d.bookings, 0);
console.log(totalBookings); // 923

// Đếm số bác sĩ theo từng chuyên khoa → một object
const countBySpecialty = doctors.reduce((acc, d) => {
  acc[d.specialty] = (acc[d.specialty] || 0) + 1;
  return acc;
}, {});
console.log(countBySpecialty); // { 'Nội tổng hợp': 2, 'Tim mạch': 1, 'Nhi khoa': 1 }
```

`reduce` nhận callback hai tham số: biến tích luỹ `acc` và phần tử hiện tại; tham số thứ hai của `reduce` là giá trị khởi tạo (`0`, `{}`...).

## sort và includes

```js
// sort SỬA mảng gốc — hãy sao chép trước khi sắp xếp
const byFeeDesc = [...doctors].sort((a, b) => b.fee - a.fee);
console.log(byFeeDesc.map((d) => d.name)); // đắt nhất đứng đầu

// includes: kiểm tra phần tử có trong mảng không
const morningShifts = ['D001', 'D003'];
console.log(morningShifts.includes('D001')); // true
```

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Cho mảng doctors sau: `[{ id, name, specialty, experience, fee, bookings }]` gồm 4 bác sĩ chuyên khoa Nội tổng hợp, Tim mạch, Nhi khoa. Hãy viết code dùng đúng một array method cho mỗi yêu cầu và ghi chú "đầu vào → đầu ra" trước mỗi đoạn: (1) in tên từng bác sĩ; (2) mảng tên các bác sĩ Tim mạch; (3) bác sĩ có id 'D003'; (4) tổng `fee` nếu cả 4 người khám một lượt; (5) xếp danh sách theo `experience` giảm dần mà không sửa mảng gốc. Giải thích vì sao không nên dùng forEach cho yêu cầu (4).

## Thực hành
1. Gõ mảng `doctors` vào Console DevTools (hoặc file `doctors-data.js`).
2. `filter` lấy bác sĩ Nội tổng hợp, rồi `map` để lấy tên — thử ghép chuỗi `.filter(...).map(...)`.
3. `find` bác sĩ theo `id` do bạn nhập, in ra tên hoặc thông báo "không tìm thấy".
4. `reduce` đếm bác sĩ theo từng chuyên khoa.
5. Chạy prompt mẫu với AI, dán kết quả vào console và kiểm tra từng dòng.

## Bài tiếp theo

Xử lý được cả mảng là nửa trận; bài sau gói dữ liệu thành object và chuyển đổi qua lại với JSON — định dạng mà mọi API bệnh viện đều trả về.
