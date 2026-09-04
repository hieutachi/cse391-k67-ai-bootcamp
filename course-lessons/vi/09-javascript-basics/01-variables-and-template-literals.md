# let/const & Template Literals

## Mục tiêu bài học
- Phân biệt `var`, `let`, `const` và nắm phạm vi khối (block scope)
- Biết khi nào dùng `const`, khi nào dùng `let`
- Tạo chuỗi nhiều dòng và chèn biến bằng template literals `${}`
- Sinh chuỗi HTML card bác sĩ bằng template literal

## var vs let vs const

Ba từ khoá khai báo biến, nhưng hành vi rất khác nhau:

```js
// 1. var — PHẠM VI HÀM: không nên dùng trong code mới
if (true) {
  var a = 10;
}
console.log(a); // 10 — var "lọt" ra ngoài khối if

// 2. let — PHẠM VI KHỐI: chỉ tồn tại trong cặp {} gần nhất
if (true) {
  let b = 20;
}
// console.log(b); // ❌ ReferenceError: b is not defined

// 3. const — giống let nhưng KHÔNG gán lại được
const c = 30;
// c = 40; // ❌ TypeError
```

Quy tắc thực tế:
- Mặc định dùng `const` — biến bạn khai báo thường không cần gán lại
- Chỉ chuyển sang `let` khi biết chắc giá trị sẽ đổi (bộ đếm, tổng dồn...)
- Bỏ hẳn `var`; nếu gặp trong tài liệu cũ, hiểu rằng nó gây rò rỉ phạm vi

`const` không đồng nghĩa "không đổi": object và array khai báo `const` vẫn sửa được nội dung bên trong (thêm thuộc tính, push phần tử) — chỉ là không thể gán lại biến đó cho giá trị khác.

## Template literals

Chuỗi viết trong cặp backtick `` ` `` cho phép xuống dòng tự do và chèn biểu thức bằng `${...}`:

```js
const doctorName = 'BS.CKI Nguyễn Minh Anh';
const specialty = 'Nội tổng hợp';

// Nối chuỗi kiểu cũ — khó đọc
const old = 'Bác sĩ: ' + doctorName + ' — ' + specialty;

// Template literal — đọc như câu tiếng Việt
const intro = `Bác sĩ: ${doctorName} — ${specialty}`;
console.log(intro);
```

Bên trong `${}` có thể là biểu thức bất kỳ, không chỉ biến:

```js
const fee = 500000;
console.log(`Giá khám: ${fee.toLocaleString('vi-VN')}đ`); // Giá khám: 500.000đ
```

## Template literal dựng HTML card

Sức mạnh thật sự: template literal dựng cả khối HTML rồi gán vào trang bằng `innerHTML`. Đây là cầu nối đúng nghĩa sang chương 10:

```js
const doctor = {
  name: 'BS.CKI Nguyễn Minh Anh',
  specialty: 'Nội tổng hợp',
  experience: 12,
  fee: 500000,
};

const doctorCard = `
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">${doctor.name}</h5>
      <span class="badge text-bg-success">${doctor.specialty}</span>
      <p class="card-text mt-2">${doctor.experience} năm kinh nghiệm</p>
      <p class="fw-semibold">Giá khám: ${doctor.fee.toLocaleString('vi-VN')}đ</p>
    </div>
  </div>
`;

// Thử in ra console trước; gắn vào trang ở chương 10
console.log(doctorCard);
```

Điểm mấu chốt: HTML bây giờ **sinh ra từ dữ liệu**. Đổi một con số trong object là card đổi theo — đây chính là tư duy "dữ liệu → giao diện" cả khoá học hướng tới.

## Prompt mẫu

> **Prompt gửi Gemini/Claude/ChatGPT:** Tôi đang học JavaScript ES6+ để render danh sách bác sĩ cho website Highland Hospital. Hãy dạy tôi: (1) viết 3 đoạn code ngắn minh hoạ `var` rò rỉ khỏi khối `if`, còn `let` thì không; (2) giải thích khi nào dùng `const` thay `let`; (3) tạo một template literal nhiều dòng sinh HTML card bác sĩ (tên, chuyên khoa, năm kinh nghiệm, giá khám) từ object mẫu, dùng `${}` để nội suy và `toLocaleString('vi-VN')` cho giá tiền. Giải thích từng dòng code bạn viết.

## Thực hành
1. Mở DevTools → tab Console, gõ lại đoạn `var`/`let`/`const` và quan sát lỗi `ReferenceError`.
2. Dựng object `doctor` và template literal card như trên; in kết quả ra console.
3. Sửa giá khám thành `1200000` và chạy lại — kiểm tra định dạng tiền.
4. Viết một template literal cho lời chào: `Chào {họ tên}, lịch khám {chuyên khoa} của bạn lúc {giờ} đã được xác nhận.` với ba biến của riêng bạn.
5. Chạy prompt mẫu với AI, đối chiếu lời giải thích về block scope.

## Bài tiếp theo

Đã khai báo được dữ liệu và bọc nó vào chuỗi HTML; bài sau rút gọn cách viết hàm với arrow functions và lấy dữ liệu ra khỏi object bằng destructuring.
