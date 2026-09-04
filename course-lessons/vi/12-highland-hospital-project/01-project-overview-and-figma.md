# Tổng quan dự án & phân tích Figma

## Mục tiêu bài học
- Nắm được bức tranh toàn cảnh dự án Highland Hospital: 3 trang, dữ liệu dùng chung, mục tiêu người dùng của từng trang
- Biết cách đọc bản thiết kế (Figma) như một lập trình viên: bóc tách vùng, liệt kê component, liệt kê trạng thái
- Viết được một **đặc tả cắt giao diện** (spec) cho từng vùng để làm prompt đầu vào cho AI
- Cài đặt cấu trúc thư mục chuẩn cho cả dự án

## Dự án ở đây là gì

Highland Hospital là một bệnh viện tư nhân giả định. Web Portal của bệnh viện gồm **3 trang nối nhau bằng 1 nguồn dữ liệu**, đúng kiểu một sản phẩm thật:

| Trang | Người dùng | Mục tiêu chính | Trang này dạy gì |
|---|---|---|---|
| `index.html` — Landing Page | Bệnh nhân mới | Ấn tượng, tin tưởng, bấm "Đặt lịch" | HTML semantic, Bootstrap, render động |
| `booking.html` — Đặt lịch khám | Bệnh nhân đã chọn bác sĩ | Điền form, chọn chuyên khoa + bác sĩ, nhận xác nhận | Form, Validation, luồng dữ liệu |
| `admin.html` — Admin Dashboard | Lễ tân / quản lý | Xem metrics, duyệt lịch hẹn | Data table, filter, CRUD, localStorage |

Điểm mấu chốt: **lịch hẹn do bệnh nhân tạo ở trang đặt lịch phải xuất hiện trong bảng của Admin** và ngược lại. Vì khoá học không dùng server, cả hai trang đọc–ghi cùng một mảng `appointments` lưu trong `localStorage` — chính là lý do bài 10.04 dạy `localStorage` rất sâu.

## Đọc bản thiết kế như thế nào

Bạn có thể nhận thiết kế dưới dạng file Figma (bản xem được miễn phí), ảnh PNG hay chỉ là một đoạn mô tả. Dù nguồn nào, quy trình bóc tách luôn 3 bước:

### Bước 1 — Bóc tách vùng (section) của từng trang

Landing Page gồm các vùng điển hình:

```text
Landing Page
├── 1. Navbar            (logo, menu, nút "Đặt lịch" — cố định trên cùng)
├── 2. Hero              (headline, câu giới thiệu, nút CTA, ảnh)
├── 3. Stats / Trust bar (số năm, số bệnh nhân, số bác sĩ)
├── 4. Services          (6 thẻ: Khám tổng quát, Nội soi, Xét nghiệm…)
├── 5. Doctors           (lưới 4–8 bác sĩ, mỗi thẻ: ảnh, tên, chuyên khoa, nút Đặt lịch)
├── 6. Testimonials      (đánh giá bệnh nhân — nhớ để dạng dữ liệu để render sau)
├── 7. CTA band          (tấm nền màu kêu gọi đặt lịch ngay)
└── 8. Footer            (liên hệ, giờ làm việc, link nhanh)
```

Mẹo: mỗi vùng trên thiết kế thường được `frame` riêng trong Figma. Tên frame chính là tên section bạn sẽ dùng làm `id` để cho `<nav>` neo tới (`#services`, `#doctors`…).

### Bước 2 — Liệt kê component và trạng thái của chúng

Component là "bộ phận lặp lại" trong thiết kế. Mỗi component phải liệt kê kèm **trạng thái**: thiết kế chỉ vẽ 1 trạng thái, còn người code phải tự bổ sung phần còn lại.

```text
Component: Doctor Card
- Ảnh bác sĩ (vẽ placeholder khi thiếu ảnh)
- Tên + học hàm/học vị
- Chuyên khoa (badge màu)
- Trạng thái: Rảnh / Kín lịch
- Nút "Đặt lịch"
- Trạng thái tương tác: hover nâng bóng, focus viền, card mờ khi bác sĩ kín lịch

Component: Appointment Row (trong Admin)
- Bệnh nhân, chuyên khoa, bác sĩ, giờ khám
- Badge trạng thái: chờ duyệt (vàng) / xác nhận (xanh) / huỷ (đỏ) / hoàn thành (xám)
- Nút "Xác nhận" / "Huỷ" / "Xoá"
- Trạng thái: dòng mới chưa đọc nền nhạt, đã duyệt bỏ highlight
```

### Bước 3 — Viết đặc tả cắt giao diện cho từng vùng

Một đặc tả tốt trả lời 4 câu: **vùng này gồm gì, dữ liệu lấy ở đâu, tương tác ra sao, responsive thế nào**. Đây là khuôn mẫu để dùng lại cho mọi vùng:

```text
Vùng: Hero (Landing Page)
- Nội dung: headline + 1 câu giới thiệu + 2 nút (Đặt lịch ngay → #booking,
  Xem bác sĩ → #doctors) + ảnh minh hoạ
- Layout: desktop chia 2 cột (chữ trái, ảnh phải); mobile (< 768px) xếp dọc,
  ảnh xuống dưới và thu nhỏ
- Màu: nền gradient xanh dương (#0d6efd → #0a58ca), chữ trắng
- Khoảng cách: padding block 80px desktop / 48px mobile
- Dữ liệu: tĩnh trong HTML (không render bằng JS)
```

## Prompt AI phân tích thiết kế

Bạn có thể cho AI xem trực tiếp ảnh thiết kế (Gemini, ChatGPT) hoặc mô tả chi tiết (cả ba). Prompt chuẩn hoá bên dưới dùng được với mọi công cụ:

```text
Bạn là senior frontend developer. Tôi có bản thiết kế trang chủ của bệnh viện
Highland Hospital (file/ảnh kèm theo). Hãy phân tích giúp tôi:

1. Bóc tách thành các vùng (hero, services, doctors, testimonials, footer...)
2. Với mỗi vùng: cho biết layout dự kiến (1/2/3 cột), component bên trong,
   và gợi ý thẻ HTML semantic nên dùng (header, main, section, article...)
3. Liệt kê toàn bộ component lặp lại (card, button, badge...) kèm các trạng thái
   cần code (default, hover, focus, disabled, empty)
4. Nêu bảng màu và font chữ chính, kèm mã hex và cỡ chữ ước lượng
5. Chỉ ra những chỗ thiết kế chưa nói rõ mà tôi phải tự quyết định
   (chẳng hạn ảnh chưa có, text quá dài, trạng thái trống)

Trả lời ngắn gọn theo từng vùng, đừng viết code — tôi sẽ viết code ở bước sau.
```

## Cấu trúc thư mục dự án

Tạo trong workspace của bạn (thư mục làm việc của khoá học) cây thư mục sau — đây sẽ là "bộ xương" bạn dùng cho các bài 02 → 06:

```text
highland-hospital/
├── index.html        # Landing Page
├── booking.html      # Trang đặt lịch khám
├── admin.html        # Admin Dashboard
├── css/
│   └── style.css     # Tuỳ biến Bootstrap + biến màu của Highland
├── js/
│   ├── main.js       # Logic Landing Page (render bác sĩ, modal…)
│   ├── booking.js    # Logic trang đặt lịch
│   ├── admin.js      # Logic Admin Dashboard
│   └── data.js       # Dữ liệu mẫu: doctors, testimonials, appointments
└── img/              # Hình ảnh của dự án
```

Nguyên tắc đặt tên: file HTML theo trang, file JS theo trang nó phục vụ, còn `data.js` dùng chung cho tất cả — vì **cả ba trang cùng một nguồn dữ liệu**.

## Thực hành

1. Dùng Figma (hoặc bất kỳ ảnh chụp website bệnh viện nào) và tự bóc tách 3 trang của Highland theo 3 bước ở trên; ghi kết quả vào file `SPEC.md` trong thư mục dự án.
2. Tạo đúng cây thư mục ở trên (có thể gõ lệnh `mkdir -p highland-hospital/{css,js,img}`).
3. Mở VS Code, cài extension **Live Server** nếu chưa có — bài sau sẽ cần nó để mở `index.html`.
4. Chạy prompt phân tích thiết kế ở trên với ảnh bạn chọn; đối chiếu phần trả lời của AI với bản tự phân tích của bạn, ghi lại điểm khác nhau.
5. Viết đặc tả cắt giao diện cho 3 vùng: `services`, `doctors`, `testimonials`.

## Bài tiếp theo

Bạn đã có bản đồ thiết kế và spec từng vùng — giờ dựng toàn bộ Landing Page bằng Bootstrap 5: navbar, hero, lưới services, lưới bác sĩ và footer, trong bài *Dựng Landing Page bằng Bootstrap*.
