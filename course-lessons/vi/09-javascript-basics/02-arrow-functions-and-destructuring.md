# Arrow functions & Destructuring

## Mục tiêu bài học
- Viết hàm gọn bằng arrow function và hiểu return ngầm (implicit return)
- Biết khi nào KHÔNG dùng arrow function (làm method của object)
- Lấy dữ liệu ra khỏi object/array bằng destructuring; trải/phần còn lại với rest/spread
- Trích xuất thông tin bác sĩ từ object dữ liệu

## Arrow function — cú pháp và return ngầm

So sánh hai cách viết cùng một hàm:

```js
// Cú pháp hàm thường (function declaration)
function doctorFullName(doctor) {
  return `${doctor.title} ${doctor.name}`;
}

// Arrow function — dạng đầy đủ
const doctorFullName = (doctor) => {
  return `${doctor.title} ${doctor.name}`;
};

// Arrow function — dạng ngắn: bỏ {} và return (return ngầm)
const doctorFullName = (doctor) => `${doctor.title} ${doctor.name}`;
```

Luật dạng ngắn:
- Một tham số thì bỏ được cả cặp ngoặc: `doctor => ...`
- Thân hàm chỉ **một biểu thức** mới bỏ được `{}` + `return` — biểu thức đó chính là giá trị trả về
- Muốn trả object ở dạng ngắn phải bọc ngoặc: `(a, b) => ({ sum: a + b })`, nếu không `{}` bị hiểu là thân hàm

## Khi nào KHÔNG dùng arrow

Arrow function **không có `this` của riêng nó** — nó mượn `this` từ nơi được viết. Vì vậy không dùng arrow làm method của object:

```js
const booking = {
  patient: 'Nguyễn Văn An',
  specialty: 'Tim mạch',
  // ❌ Sai: this ở đây không trỏ vào booking
  describe: () => `${this.patient} khám ${this.specialty}`,
  // ✅ Đúng: dùng hàm thường để this trỏ vào booking
  describe() {
    return `${this.patient} khám ${this.specialty}`;
  },
};
console.log(booking.describe());
```

Nhớ gọn: **method của object dùng hàm thường; callback, hàm ngắn, hàm dựng sẵn trong pipeline dùng arrow.**

## Destructuring object

Thay vì lặp đi lặp lại `doctor.name`, `doctor.specialty`, tách thẳng ra biến:

```js
const doctor = {
  id: 'D001',
  name: 'BS.CKI Nguyễn Minh Anh',
  specialty: 'Nội tổng hợp',
  experience: 12,
  fee: 500000,
};

const { name, specialty, fee } = doctor;
console.log(name);       // BS.CKI Nguyễn Minh Anh
console.log(specialty);  // Nội tổng hợp

// Đổi tên biến và đặt giá trị mặc định
const { name: fullName, phone = 'Chưa cập nhật' } = doctor;
console.log(fullName, phone);
```

Rất hợp với tham số hàm — chỉ lấy đúng thứ hàm cần:

```js
function renderDoctorCard({ name, specialty, experience }) {
  return `${name} — ${specialty} (${experience} năm)`;
}
console.log(renderDoctorCard(doctor));
```

## Destructuring array

```js
const services = ['Nội tổng hợp', 'Tim mạch', 'Nhi khoa'];
const [first, second] = services;
console.log(first, second); // Nội tổng hợp Tim mạch

// Bỏ qua phần tử bằng dấu phẩy trống
const [, , third] = services;
console.log(third); // Nhi khoa
```

## Rest và Spread

Ba dấu chấm `...` đảm nhận hai vai trò tuỳ chỗ đứng:
- **Rest** gom phần còn lại khi *đứng ở phía nhận* (khai báo, tham số)
- **Spread** trải một mảng/object khi *đứng ở phía nguồn* (lời gọi, literal)

```js
// Rest: gom phần còn lại
const [firstService, ...others] = services;
console.log(others); // ['Tim mạch', 'Nhi khoa']

const { id, ...doctorInfo } = doctor; // bỏ id, giữ phần còn lại
console.log(doctorInfo);

// Spread: trải mảng — sao chép rồi thêm phần tử
const departments = [...services, 'Răng hàm mặt'];
console.log(departments);

// Spread: trộn object — ghi đè bằng dữ liệu mới
const updatedDoctor = { ...doctor, fee: 650000 };
console.log(updatedDoctor.fee); // 650000 — doctor gốc không đổi
```

Spread giúp **không sửa dữ liệu gốc** — thói quen quan trọng khi dữ liệu bác sĩ về sau được chia sẻ giữa nhiều phần của trang.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Tôi đang học ES6+ cho dự án Highland Hospital. Cho tôi ví dụ: (1) một hàm bình thường và arrow function tương đương, rồi giải thích khi nào được bỏ `return`; (2) một object `doctor` và dùng destructuring để lấy `name`, `specialty`, `fee` kèm giá trị mặc định cho `phone`; (3) minh hoạ spread để tạo object `doctor` mới có `fee` tăng 10% mà không sửa object gốc; (4) chỉ ra lỗi khi dùng arrow function làm method của object. Giải thích từng ví dụ như dạy người mới.

## Thực hành
1. Viết arrow function `formatFee(fee)` trả về `fee.toLocaleString('vi-VN') + 'đ'`.
2. Dùng destructuring lấy `name`, `specialty`, `experience` từ object bác sĩ của bài trước và in ra console.
3. Tạo `updatedDoctor = { ...doctor, fee: 600000 }`; kiểm tra `doctor.fee` không đổi.
4. Viết một method `getLabel()` kiểu hàm thường cho object `booking` và gọi thử.
5. Chạy prompt mẫu với AI và đối chiếu cách giải thích của bạn với của nó.

## Bài tiếp theo

Đã viết được hàm gọn và lấy dữ liệu ra ngoài; bài sau học bộ công cụ mạnh nhất của mảng — `map`, `filter`, `find`, `reduce` — để xử lý cả danh sách bác sĩ.
