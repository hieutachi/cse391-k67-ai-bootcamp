# Truy vấn & thao tác DOM

## Mục tiêu bài học
- Biết cây DOM là gì và đọc cấu trúc trang qua DevTools → tab Elements
- Truy vấn phần tử với `document.querySelector` / `querySelectorAll`
- Phân biệt `textContent` và `innerHTML` — và vì sao `innerHTML` dễ dính XSS
- Tạo phần tử mới bằng `createElement` + `append`, đổi class bằng `classList`

## Cây DOM: HTML sau khi trình duyệt "dịch"

Trình duyệt không làm việc với file `.html` thô mà dựng thành một cây đối tượng gọi là **DOM (Document Object Model)**. Mỗi thẻ, mỗi đoạn text là một *node* trong cây. Khi JavaScript gõ `document.querySelector(...)`, bạn đang đi tìm một node trong cái cây đó.

Hãy mở trang Highland Hospital, bấm **F12 → tab Elements**. Bạn thấy chính xác cây DOM đang chạy, kể cả những phần tử do JavaScript thêm vào sau khi tải. Muốn "nhìn thấy" cái code mà JS đang thao tác, DevTools Elements là công cụ số một.

## Truy vấn phần tử

```js
// Trả về PHẦN TỬ ĐẦU TIÊN khớp — hoặc null nếu không có
const heroTitle = document.querySelector('.hero h1');
const bookBtn = document.querySelector('#btn-book-appointment');

// Trả về NodeList (giống mảng) — tất cả phần tử khớp
const doctorCards = document.querySelectorAll('.doctor-card');
const allInputs = document.querySelectorAll('.booking-form input');
```

Tham số là **CSS selector** — đúng cú pháp bạn đã học ở chương CSS: `#id`, `.class`, `tag`, `.card .btn`, v.v. `querySelectorAll` trả về `NodeList`; muốn dùng `map`/`filter` thì chuyển qua mảng: `[...doctorCards].map(card => card.dataset.id)`.

## textContent vs innerHTML — khác nhau một trời một vực

```js
const card = document.querySelector('.doctor-card');

// textContent: thay NỘI DUNG CHỮ — an toàn, không phân tích HTML
card.querySelector('.doctor-name').textContent = 'BS. Nguyễn Thu Hà';

// innerHTML: phân tích CHUỖI NHƯ HTML — tiện nhưng rất nguy hiểm
card.querySelector('.doctor-bio').innerHTML = '<strong>Tim mạch</strong> can thiệp';
```

Quy tắc vàng của frontend:

> **Không bao giờ nối dữ liệu người dùng vào `innerHTML`.** Nếu một bệnh nhân nhập tên là `<img src=x onerror="alert(1)">` và bạn chèn thẳng vào `innerHTML`, trình duyệt sẽ *chạy* đoạn mã đó — đó là tấn công **XSS**. Dữ liệu từ form, từ API, từ `localStorage` đều coi là "người dùng", phải gán bằng `textContent` hoặc tạo phần tử thật.

Lý do đơn giản: `textContent` chỉ đặt chữ, trình duyệt không bao giờ hiểu chuỗi đó thành thẻ hay sự kiện.

## classList — bật/tắt class như bật công tắc

```js
const section = document.querySelector('#doctors-section');
section.classList.add('bg-light');        // thêm
section.classList.remove('bg-light');     // gỡ
section.classList.toggle('d-none');       // có thì gỡ, không có thì thêm
console.log(section.classList.contains('bg-light')); // true/false
```

`toggle` cực kỳ hợp với trạng thái: hiện/ẩn filter, active menu, card được chọn.

## createElement + append — dựng phần tử bằng code

```js
// Tạo badge "Mới" gắn lên card bác sĩ
const badge = document.createElement('span');
badge.className = 'badge text-bg-success position-absolute top-0 start-0 m-2';
badge.textContent = 'Nhận bệnh mới';

const cardBody = document.querySelector('.doctor-card .card-body');
cardBody.append(badge);   // append: thêm node (có thể nhiều node, kể cả chuỗi text)
```

Đây là cách **an toàn** để dựng nội dung động — không qua trung gian chuỗi HTML, nên không có đường nào cho XSS chui vào.

## Prompt AI mẫu

```text
Dự án Highland Hospital (Bootstrap 5 + JS thuần ES6+).
Tôi có section #doctors-section chứa nhiều thẻ .doctor-card, mỗi card có
.badge-status trống. Viết JS: dùng querySelectorAll lấy tất cả card, đọc
data-status trên card ("available" | "busy"), rồi với card available thì
dùng classList.add + textContent để gắn badge xanh "Có thể đặt lịch",
card busy gắn badge xám "Đang khám". KHÔNG dùng innerHTML. Giải thích từng dòng ngắn gọn.
```

Chạy prompt, đọc kỹ code AI sinh ra, rồi tự sửa nếu thấy nó lách qua `innerHTML`.

## Thực hành
1. Mở Landing Page của bạn, F12 → Elements, tìm thẻ chứa danh sách bác sĩ và đếm xem có bao nhiêu `.card` con.
2. Trong Console, tự gõ: lấy `h1` đầu trang, đổi `textContent`, rồi `classList.add` một class làm nó đổi màu.
3. Viết hàm `addAvailabilityBadge()` dùng đúng mẫu prompt ở trên và gắn vào một card giả lập có `data-status="busy"` để kiểm chứng.

## Bài tiếp theo

Phần tử đã truy vấn được rồi — giờ đến phần khiến trang "sống": học cách bắt sự kiện click, submit, scroll và kỹ thuật Event Delegation trong bài kế tiếp.
