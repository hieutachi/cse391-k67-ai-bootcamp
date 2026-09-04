# Lab: render danh sách bác sĩ

## Mục tiêu bài học
- Tổng hợp `map` + template literal + destructuring để render mảng 6 bác sĩ ra lưới card
- Chạy prompt AI sinh toàn bộ code rồi **tự giải thích từng dòng** trước khi dùng
- Chuẩn bị nền tảng cho chương 10 — nơi thay dữ liệu tĩnh bằng DOM tương tác

## Dữ liệu 6 bác sĩ

```js
const doctors = [
  { id: 'D001', name: 'BS.CKI Nguyễn Minh Anh', specialty: 'Nội tổng hợp', experience: 12, fee: 500000, img: 'doctor-01.jpg' },
  { id: 'D002', name: 'BS.CKI Lê Hoàng Nam',    specialty: 'Tim mạch',     experience: 15, fee: 650000, img: 'doctor-02.jpg' },
  { id: 'D003', name: 'BS Trần Thu Hà',         specialty: 'Nhi khoa',     experience: 8,  fee: 400000, img: 'doctor-03.jpg' },
  { id: 'D004', name: 'BS.CKI Phạm Quốc Bảo',   specialty: 'Nội tổng hợp', experience: 10, fee: 450000, img: 'doctor-04.jpg' },
  { id: 'D005', name: 'TS.BS Vũ Hoàng Yến',     specialty: 'Sản phụ khoa', experience: 18, fee: 700000, img: 'doctor-05.jpg' },
  { id: 'D006', name: 'BS Đặng Minh Khoa',      specialty: 'Thần kinh',    experience: 9,  fee: 550000, img: 'doctor-06.jpg' },
];
```

## Render bằng map + template literal

```js
function renderDoctorCard(doctor) {
  const { name, specialty, experience, fee, img } = doctor; // destructuring bài 02
  return `
    <div class="col">
      <div class="card h-100 shadow-sm">
        <img src="assets/images/${img}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${name}</h5>
            <span class="badge text-bg-info">${specialty}</span>
          </div>
          <p class="card-text text-body-secondary">${experience} năm kinh nghiệm</p>
          <p class="fw-semibold mb-3">Giá khám: ${fee.toLocaleString('vi-VN')}đ</p>
          <a href="booking.html" class="btn btn-outline-primary w-100">Đặt lịch khám</a>
        </div>
      </div>
    </div>
  `;
}

const gridHTML = doctors.map((doctor) => renderDoctorCard(doctor)).join('');
console.log(gridHTML);
// Ở chương 10: document.querySelector('#doctorGrid').innerHTML = gridHTML;
```

Điểm đáng chú ý:
- `map` biến 6 object thành 6 chuỗi HTML; `.join('')` nối chúng thành **một** chuỗi lớn
- `renderDoctorCard` tách riêng giúp tái sử dụng và dễ đọc — component thinking sơ khai
- HTML card khớp chuẩn Bootstrap chương 8 nên khi đưa vào trang là hiển thị đẹp ngay

## Tổ chức file — tách dữ liệu khỏi logic

Ngay từ bây giờ hãy chia làm ba file, vì chương 10 và Admin Dashboard sẽ cần chính cấu trúc này:

```
highland-hospital/
├── doctors.html          # trang: grid rỗng + nhúng 2 script
├── assets/
│   ├── css/ (tuỳ chọn)
│   └── js/
│       ├── doctors-data.js     # chỉ chứa mảng doctors (dữ liệu)
│       └── doctors-render.js   # hàm renderDoctorCard + gridHTML (logic)
└── images/  (đặt file ảnh bác sĩ)
```

Điểm mấu chốt là **thứ tự nhúng script**: file dữ liệu phải nằm trước file logic, và cả hai đặt cuối `<body>`:

```html
<body>
  <div id="doctorGrid" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>

  <script src="assets/js/doctors-data.js"></script>
  <script src="assets/js/doctors-render.js"></script>
</body>
```

Nếu bạn nhúng `doctors-render.js` trước, nó chạy trong khi `doctors` chưa tồn tại và văng lỗi `ReferenceError` — lỗi kinh điển khi mới tách file. Chia tách "dữ liệu" và "cách hiển thị" chính là tiền đề cho việc về sau thay mảng tĩnh bằng dữ liệu từ API (chương 11) mà không đụng tới hàm render.

## Prompt AI sinh code — rồi tự giải thích

Prompt dưới đây yêu cầu AI sinh **toàn bộ** file — bản nháp nhanh (bước 2 của Workflow). Phần quan trọng nhất không phải code mà là bài tập bạn tự làm sau đó.

> **Prompt gửi Gemini/Claude/ChatGPT:** Bạn là senior frontend developer. Website Highland Hospital dùng Bootstrap 5. Viết một file HTML hoàn chỉnh (CDN Bootstrap 5 CSS + JS) có: navbar đơn giản, section tiêu đề "Đội ngũ bác sĩ", và lưới card hiển thị 6 bác sĩ từ mảng `doctors` dưới đây — KHÔNG viết tay HTML cho từng bác sĩ mà dùng `Array.map` + template literal để render, mỗi card gồm ảnh, tên, badge chuyên khoa, số năm kinh nghiệm, giá khám (dùng `toLocaleString('vi-VN')`), nút "Đặt lịch khám". Lưới dùng `row-cols-1 row-cols-md-2 row-cols-lg-3 g-4` và card `h-100`. Dữ liệu: `[...6 bác sĩ như trên...]`. Sau khi trả code, kèm mục "Giải thích từng dòng" ngắn gọn.

Sau khi AI trả về, tự trả lời những câu sau trước khi dán vào trang (bước 3 — thấu hiểu):
1. Vì sao dùng `.join('')` sau `map` — nếu bỏ đi thì mảng chuỗi bị nối dấu phẩy kiểu gì?
2. Ký tự backtick và `${}` trong template literal đang giữ vai trò gì?
3. Hàm `renderDoctorCard` nhận vào gì và trả về gì (mô tả đầu vào → đầu ra)?
4. Nếu một bác sĩ thiếu `fee`, code sẽ in ra gì — và làm sao phòng tránh?

## Các lỗi render hay gặp

- Quên `.join('')`: lưới card hiện ra kèm dấu phẩy lạ giữa các card — vì mảng bị ép thành chuỗi
- Đường dẫn ảnh sai: đặt `assets/images/` cho khớp cấu trúc thư mục dự án của bạn
- Quên đóng backtick hoặc `${`: template literal nuốt lỗi rất im lặng, hãy đọc lại console

## Thực hành
1. Tạo `doctors.html` với grid rỗng `<div id="doctorGrid" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>`.
2. Tạo `doctors-data.js` (mảng) và `doctors-render.js` (hàm render + `console.log(gridHTML)`), mở trang bằng Live Server và kiểm tra console.
3. Chạy prompt mẫu, dán file AI sinh ra, rồi viết ra giấy phần giải thích 4 câu hỏi ở trên trước khi đọc phần AI giải thích.
4. Tinh chỉnh (bước 4): thêm một bác sĩ thứ 7 vào mảng và quan sát card thứ 7 tự xuống hàng theo grid.
5. Chuẩn bị cho chương 10: đổi dòng `console.log(gridHTML)` thành gán `innerHTML` — nhưng đừng lo nếu chưa hiểu `innerHTML`, bài sau sẽ nói kỹ.

## Bài tiếp theo

Dữ liệu đã chảy thành giao diện; chương 10 sẽ nối nó vào DOM và sự kiện — bộ lọc chuyên khoa, submit form và modal xác nhận bắt đầu hoạt động thật.
