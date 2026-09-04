# Bảng biểu & đa phương tiện

## Mục tiêu bài học
- Viết bảng hợp lệ với `table/thead/tbody/tr/th/td/caption`
- Dùng `img` đúng chuẩn: `alt`, `width/height`, `loading="lazy"`
- Chọn svg inline cho icon và hiểu vì sao ưu việt với icon UI

## Bảng: dùng cho dữ liệu, không dùng cho layout

Bảng dành cho dữ liệu dạng lưới: giờ làm việc, bảng giá dịch vụ, danh sách lịch hẹn của Admin Dashboard. Ngày xưa người ta dùng `table` để dàn trang — đừng làm vậy, layout là việc của CSS (chương 4–7).

```html
<table>
  <caption>Giờ làm việc các khoa khám ngoại trú</caption>
  <thead>
    <tr>
      <th scope="col">Khoa</th>
      <th scope="col">Sáng</th>
      <th scope="col">Chiều</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Khám tổng quát</th>
      <td>07:30 – 11:30</td>
      <td>13:30 – 16:30</td>
    </tr>
    <tr>
      <th scope="row">Tim mạch</th>
      <td>07:30 – 11:00</td>
      <td>13:30 – 16:00</td>
    </tr>
    <tr>
      <th scope="row">Cấp cứu</th>
      <td colspan="2">Hoạt động 24/7 — không cần đặt lịch</td>
    </tr>
  </tbody>
</table>
```

Cấu trúc bắt buộc nhớ: `<caption>` (chú thích bảng, giúp ích cho accessibility), `<thead>` chứa hàng tiêu đề với `<th scope="col">`, `<tbody>` chứa dữ liệu, ô tiêu đề hàng dùng `<th scope="row">`, và `colspan`/`rowspan` khi một ô trải nhiều cột/hàng. Trình duyệt **không** tự thêm `thead/tbody` — bạn phải viết, vì CSS và JS (lọc tìm kiếm ở chương 12) đều cần chúng để truy vấn.

## Hình ảnh: ba thuộc tính không được quên

```html
<img src="images/doctors/bs-huong.jpg"
     alt="BS. Nguyễn Thị Hương đang tư vấn cho bệnh nhân tại Highland Hospital"
     width="400" height="300"
     loading="lazy">
```

- `alt` — mô tả hình khi không tải được và cho trình đọc màn hình. Hình **trang trí** thì để `alt=""` (rỗng) để máy bỏ qua; hình **thông tin** (chân dung bác sĩ) thì mô tả nội dung. Viết `alt="Ảnh bác sĩ"` cũng vô nghĩa như không viết.
- `width` + `height` — khai báo tỉ lệ khung hình ngay trong HTML để trình duyệt chừa sẵn chỗ, tránh hiện tượng layout nhảy (CLS) khi ảnh tải xong. Tuỳ chỉnh kích thước hiển thị vẫn là việc của CSS.
- `loading="lazy"` — chỉ tải ảnh khi nó sắp vào viewport. Dùng cho ảnh **dưới** màn hình đầu; ảnh hero nằm trên cần hiện ngay thì không lazy.

## SVG inline cho icon

Icon của dịch vụ, icon liên hệ trong Highland Hospital nên là **SVG inline** (dán trực tiếp vào HTML) thay vì file ảnh rời:

- Nhọn ở mọi kích thước — SVG là vector, không vỡ nền như PNG khi phóng to.
- Nhuộm màu theo CSS được — ta có thể cho `fill="currentColor"` để icon tự mang màu chữ của nút/tiêu đề (rất hợp với design token `hh-teal` ở chương 2).
- Không tốn thêm request HTTP như file ảnh.

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M12 21s-7-4.6-7-11a4 4 0 0 1 7-2.8A4 4 0 0 1 19 10c0 6.4-7 11-7 11z"/>
  <circle cx="12" cy="10" r="2.5"/>
</svg>
```

Với icon chỉ có tính trang trí, thêm `aria-hidden="true"` để trình đọc màn hình bỏ qua; icon **có chức năng** (icon kèm nghĩa, như nút "gọi hotline" chỉ toàn icon) thì cần `role="img"` và `<title>` bên trong.

## Prompt mẫu: dựng bảng giờ làm việc

```text
Bối cảnh: Highland Hospital, mục "Giờ làm việc" trên trang chủ, HTML thuần.
Nhiệm vụ: dựng bảng giờ làm việc 6 khoa (Khám tổng quát, Tim mạch, Nhi
khoa, Xét nghiệm, Chẩn đoán hình ảnh, Cấp cứu) với cột Sáng và Chiều;
khoa Cấp cứu ghi "24/7" trải cả hai cột.
Ràng buộc: cấu trúc đầy đủ table > caption + thead (th scope="col") +
tbody; mỗi hàng có th scope="row" cho tên khoa; không dùng thuộc tính
style; không thêm nội dung ngoài danh sách khoa trên.
Định dạng: một khối HTML duy nhất, chú thích ngắn sau caption.
```

## Thực hành
Thêm vào trang chủ Highland Hospital: (1) bảng "Giờ làm việc" như prompt mẫu; (2) phần "Đội ngũ bác sĩ" gồm 3 `<figure>` — mỗi figure có `img` chân dung với `alt` mô tả, `width/height`, `loading="lazy"` và `<figcaption>` ghi tên + chuyên khoa. Mở DevTools tab Network, cuộn nhanh xuống dưới và xác nhận ảnh chỉ tải khi bạn cuộn tới.

## Bài tiếp theo

Đã đủ mọi mảnh ghép: khung tài liệu, thẻ ngữ nghĩa, form, bảng và media — bài *Lab: Landing Page semantic* yêu cầu ghép tất cả thành trang chủ hoàn chỉnh.
