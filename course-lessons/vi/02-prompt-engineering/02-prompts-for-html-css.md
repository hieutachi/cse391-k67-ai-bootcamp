# Prompt cho HTML & CSS

## Mục tiêu bài học
- Yêu cầu được AI viết HTML semantic đúng cấu trúc mong muốn
- Truyền khoảng cách và màu sắc bằng con số cụ thể: rem, mã hex, design token
- Nhận diện và chặn các chỗ AI hay tự bịa: spacing, font, tên class

## AI bịa nhiều nhất ở khoảng cách và màu

AI không nhìn thấy màn hình của bạn. Khi bạn nói "cho đẹp một chút", nó chọn padding `80px` hay `8px` đều như nhau. Với HTML/CSS, nguyên tắc số một là: **chỗ nào bạn không nói con số, AI tự quyết** — và bạn sẽ phải sửa lại hết. Hãy nói bằng con số.

## Design token của Highland Hospital

Để mọi prompt và mọi section khớp nhau, khoá học dùng bộ token thống nhất (chương 4 sẽ học khai báo bằng CSS Variables):

| Token | Giá trị | Dùng cho |
|---|---|---|
| `hh-teal` | `#0f766e` | nút chính, điểm nhấn, link |
| `hh-teal-dark` | `#134e4a` | hover, footer |
| `hh-bg-soft` | `#f0fdfa` | nền các section so le |
| `hh-slate` | `#0f172a` | chữ tiêu đề |
| `hh-gray` | `#475569` | chữ thân |
| `hh-border` | `#e2e8f0` | viền, đường kẻ |
| Spacing cơ bản | bội số của `0.5rem` | padding, gap, margin |

Khi viết prompt, nhắc cả tên token lẫn giá trị hex. Muốn đổi thương hiệu về sau chỉ cần sửa ở một chỗ duy nhất.

## Cách yêu cầu HTML semantic

Đừng nói "viết một cái khối có ảnh". Nói rõ cấu trúc và ý nghĩa từng vùng:

- Yêu cầu đúng thẻ: `section`, `article`, `figure`, `ul/li` cho nhóm lặp lại.
- Yêu cầu tên class có nghĩa, nhất quán (khoá học dùng tiền tố `hh-`: `hh-doctor-card`, `hh-btn-primary`).
- Yêu cầu *"không thêm phần tử nào ngoài danh sách tôi liệt kê"* nếu muốn kiểm soát tuyệt đối — AI rất hay "hào phóng" chèn thêm content.

## Prompt mẫu: dựng Hero section

```text
Bối cảnh: Landing Page Highland Hospital (web bệnh viện), HTML5 + CSS
thuần, chưa có framework. Đang dựng phần đầu trang chủ.
Nhiệm vụ: Dựng hero section gồm: (1) tiêu đề h1 "Chăm sóc sức khoẻ chủ
động cùng Highland", (2) đoạn mô tả 1–2 câu, (3) nút chính "Đặt lịch
khám" trỏ booking.html và nút phụ "Xem chuyên khoa", (4) ảnh minh hoạ.
Ràng buộc: HTML semantic (section > div > h1/p/a); class tiền tố hh-;
không dùng Bootstrap; không thêm nội dung ngoài mô tả trên.
Giao diện: nền trắng; tiêu đề màu #0f172a (hh-slate); chữ thân #475569;
nút chính nền #0f766e (hh-teal), chữ trắng, bo góc 8px, padding
0.75rem 1.5rem; nút phụ chỉ viền 1px #e2e8f0; khoảng cách giữa các khối
trong hero là bội số của 1rem; hero padding 4rem 0.
Định dạng: trả HTML và CSS thành hai khối riêng, không giải thích dài.
```

Kết quả nhận về có dạng (lược bớt) — hãy đọc kỹ từng dòng trước khi dùng:

```html
<section class="hh-hero">
  <div class="hh-hero__content">
    <h1>Chăm sóc sức khoẻ chủ động cùng Highland</h1>
    <p>Đội ngũ bác sĩ giàu kinh nghiệm, đặt lịch khám trong 2 phút.</p>
    <a class="hh-btn hh-btn--primary" href="booking.html">Đặt lịch khám</a>
  </div>
  <figure class="hh-hero__media">
    <img src="images/hero-doctor.jpg" alt="Bác sĩ Highland đang tư vấn cho bệnh nhân" width="640" height="420">
  </figure>
</section>
```

Hai nút điều hướng sang trang khác nên dùng `<a>` mang class nút, không phải `<button>` — `<button>` chỉ dành cho hành động trong trang (mở modal, submit form).

## Chặn AI bịa khoảng cách ngay trong prompt

Thêm một trong các câu ràng buộc sau khi cần:

- "Chỉ dùng rem, mọi khoảng cách là bội số của 0.5rem."
- "Không thêm margin/padding vào phần tôi không yêu cầu."
- "Không tự thêm font-family lạ; dùng hệ font mặc định của hệ thống."

## Thực hành
Viết lại prompt hero ở trên theo lời của bạn nhưng cho **Services section**: 6 dịch vụ (Khám tổng quát, Tim mạch, Nhi khoa, Xét nghiệm, Chẩn đoán hình ảnh, Phục hồi chức năng) xếp lưới 3 cột, mỗi ô có icon, tên và mô tả một câu. Chạy prompt rồi mở trình duyệt: khoảng cách cột có đều như bạn yêu cầu không? Có dịch vụ nào bị AI thêm vào không?

## Bài tiếp theo

Đã làm chủ prompt cho phần nhìn; phần hành vi sẽ được xử lý trong bài *Prompt cho JavaScript* — cách mô tả dữ liệu vào/ra để AI viết đúng hàm.
