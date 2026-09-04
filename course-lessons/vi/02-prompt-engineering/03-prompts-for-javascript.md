# Prompt cho JavaScript

## Mục tiêu bài học
- Mô tả dữ liệu vào/ra rõ ràng để AI viết đúng hàm
- Nêu rõ DOM API được phép dùng để tránh code lạ
- Yêu cầu được code không dependency, tách hàm thuần và hàm render

## JavaScript dễ sai vì thiếu "hợp đồng"

Lỗi JS thường không hiện ra màn hình mà nằm trong console. Lý do phổ biến nhất khiến AI viết sai JS: bạn mô tả dữ liệu mơ hồ, còn AI tự bịa hình dạng (shape) của object — viết xong là lỗi `undefined`. Với JS, prompt phải nêu **dữ liệu vào, dữ liệu ra và cách nối với DOM** — như một hợp đồng giữa bạn và AI.

## 4 điều phải nói trong mọi prompt JS

1. **Dữ liệu vào**: dán thẳng mảng/object mẫu thật thay vì mô tả bằng lời — AI nhìn được field nào tồn tại, tránh tự bịa tên field.
2. **Dữ liệu ra**: hàm trả về gì — mảng mới? chuỗi HTML? hay cập nhật thẳng DOM?
3. **DOM API được phép**: `querySelector`, template literals, `map`/`filter`/`join`, `addEventListener`. Cấm `document.write`, cấm jQuery, cấm import thư viện.
4. **Cấu trúc hàm**: tách hàm *thuần* (chỉ tính toán trên dữ liệu, không đụng DOM) khỏi hàm *render* (đụng DOM). Logic sạch thì test được, và sau này đổi giao diện không phải viết lại logic.

Dữ liệu bác sĩ dùng chung trong khoá học:

```js
const doctors = [
  { id: 1, name: 'BS. Nguyễn Thị Hương', specialty: 'Tim mạch', experience: 12 },
  { id: 2, name: 'BS. Trần Văn Minh', specialty: 'Nội tổng hợp', experience: 8 },
  { id: 3, name: 'BS. Lê Thu Trang', specialty: 'Nhi khoa', experience: 15 },
];
```

## Prompt mẫu: render danh sách + lọc theo chuyên khoa

```text
Bối cảnh: Trang chủ Highland Hospital, JavaScript ES6+ thuần, không
framework, không thư viện ngoài.
Dữ liệu vào: mảng doctors —
[{ id: 1, name: 'BS. Nguyễn Thị Hương', specialty: 'Tim mạch', experience: 12 },
 { id: 2, name: 'BS. Trần Văn Minh', specialty: 'Nội tổng hợp', experience: 8 },
 { id: 3, name: 'BS. Lê Thu Trang', specialty: 'Nhi khoa', experience: 15 }]
Nhiệm vụ: (1) Hàm renderDoctors(items) đổ mảng vào <ul id="doctor-list">,
mỗi bác sĩ một <li> hiện tên, chuyên khoa, số năm kinh nghiệm.
(2) Hàm filterBySpecialty(doctors, keyword) lọc theo specialty, không
phân biệt hoa thường, trả về mảng mới.
Ràng buộc: ES6+; chỉ dùng querySelector, template literals, map, filter,
join; không thêm dependency; không sửa mảng gốc; hàm thuần và hàm render
tách riêng.
Định dạng: một khối code duy nhất, có chú thích ngắn từng hàm.
```

Kết quả đúng chuẩn sẽ tương tự:

```js
const list = document.querySelector('#doctor-list');

function filterBySpecialty(doctors, keyword) {
  const kw = keyword.trim().toLowerCase();
  return doctors.filter((doc) => doc.specialty.toLowerCase().includes(kw));
}

function renderDoctors(items) {
  list.innerHTML = items
    .map((doc) => `
      <li>
        <h3>${doc.name}</h3>
        <p>Chuyên khoa: ${doc.specialty} · ${doc.experience} năm kinh nghiệm</p>
      </li>`)
    .join('');
}

renderDoctors(doctors);
```

Đọc kỹ ba điểm: `filterBySpecialty` là hàm thuần (nhận mảng, trả mảng mới, không đụng DOM); `renderDoctors` chỉ đụng DOM; và `map().join('')` dựng toàn bộ chuỗi trước khi gán `innerHTML` **một lần** — không bao giờ gán `innerHTML` bên trong vòng lặp.

## Thêm "ví dụ gọi hàm" khi cần chắc luồng

Khi muốn AI hiểu đúng cách các hàm nối với nhau, thêm dòng cuối prompt: *"Cuối code, gọi `renderDoctors(filterBySpecialty(doctors, 'tim'))` và chú thích kết quả mong đợi."* Yêu cầu AI nói ra kết quả mong đợi là cách rẻ nhất để phát hiện nó hiểu sai dữ liệu.

## Thực hành
Bổ sung vào mảng `doctors` field `room` (kiểu chuỗi, ví dụ `"P.302"`) rồi viết prompt yêu cầu AI hiển thị thêm số phòng vào mỗi `<li>` **trong khi giữ nguyên hai hàm cũ**. Chạy thử với keyword `"nhi"` — kết quả chỉ còn bác sĩ Nhi khoa — và mở Console xác nhận không có lỗi.

## Bài tiếp theo

Code đã chạy mà hiển thị vẫn sai là tình huống khác hẳn — bài *Prompt cho Debug* sẽ dạy công thức dán code + hiện tượng + thứ tự nguyên nhân khả dĩ.
