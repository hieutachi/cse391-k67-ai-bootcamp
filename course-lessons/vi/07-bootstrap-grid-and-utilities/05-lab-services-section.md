# Lab: Services section

## Mục tiêu bài học
- Dựng section danh mục dịch vụ khám (6 dịch vụ kèm icon) hoàn toàn bằng Bootstrap
- Dùng lưới `col-md-6 col-lg-4` để 6 card tự chia 1 → 2 → 3 cột theo màn hình
- Viết prompt yêu cầu AI chỉ dùng Bootstrap utilities — không CSS tự viết — rồi phân tích code nhận được

## Yêu cầu thực hiện

Tạo `services.html` hiển thị 6 dịch vụ của Highland Hospital:

| # | Dịch vụ | Mô tả ngắn |
|---|---|---|
| 1 | Khám tổng quát | Kiểm tra sức khỏe định kỳ toàn diện |
| 2 | Xét nghiệm | Lấy mẫu nhanh, trả kết quả trong 24 giờ |
| 3 | Nội soi tiêu hóa | Đội ngũ chuyên khoa, thiết bị nội soi HD |
| 4 | Chăm sóc răng hàm mặt | Niềng răng, trám, cấy ghép implant |
| 5 | Vật lý trị liệu | Phục hồi chức năng sau chấn thương |
| 6 | Tiêm chủng | Gói vắc-xin cho trẻ em và người lớn |

Ràng buộc kỹ thuật:
- Mỗi card gồm icon (dùng biểu tượng đơn giản: emoji, hoặc thẻ `<svg>`/kí tự `♡` — chưa cần thư viện icon), tiêu đề, mô tả, một liên kết "Chi tiết".
- Lưới `col-md-6 col-lg-4`: mobile 1 cột, tablet 2 cột, desktop 3 cột — không thêm class lạ.
- **Toàn bộ** style đến từ class Bootstrap: `container`, `row`, `col-*`, `g-*`, `text-*`, `bg-*`, `rounded`, `shadow-sm`, `p-*`...
- Kiểm chứng: trong DevTools, đặt trỏ vào mỗi card, tab Styles **không được có luật CSS nào do bạn tự viết**.

## Prompt mẫu: yêu cầu AI chỉ dùng Bootstrap utilities

```text
Dùng Bootstrap 5 (CDN) dựng section "Dịch vụ khám" cho trang chủ
Highland Hospital. Điều kiện TIÊN QUYẾT: chỉ dùng class có sẵn của
Bootstrap (grid, spacing, color, typography, shadow, rounded, flex) —
KHÔNG viết bất kỳ dòng CSS riêng nào, không dùng <style> hay file css
ngoài link bootstrap.min.css.
Nội dung: tiêu đề section "Dịch vụ khám" dùng display-5, căn giữa,
kèm câu dẫn .lead; bên dưới là 6 card dịch vụ xếp trong .row với
.col-md-6 .col-lg-4 và gutter g-4. Mỗi card: icon emoji to (🩺 🔬
🔭 🦷 💪 💉), h3 tiêu đề dịch vụ, đoạn mô tả 1-2 câu, link "Chi tiết"
dạng btn btn-link p-0. Card có nền bg-white, viền border, bo góc
rounded-3, bóng nhẹ shadow-sm, đệm p-4, chiều cao đều (d-flex flex-column
h-100). Section nền bg-light, đệm dọc py-5.
Trả file HTML hoàn chỉnh, kèm 5 dòng giải thích từng nhóm class đã dùng.
```

Prompt trên có ba "mẹo" để AI không lén viết CSS riêng: nói thẳng **cấm** `<style>`/file css, đưa đủ từng class cần dùng, và yêu cầu **giải thích** — bắt AI phải biết mình đang làm gì.

## Phân tích code mẫu

```html
<section class="bg-light py-5">
  <div class="container">
    <h2 class="display-5 text-center mb-2">Dịch vụ khám</h2>
    <p class="lead text-center text-muted mb-5">
      Đa khoa, chuyên sâu — phục vụ mọi nhu cầu của gia đình bạn
    </p>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm rounded-3 p-4 text-center">
          <div class="display-3 mb-3">🩺</div>
          <h3 class="h5 fw-bold">Khám tổng quát</h3>
          <p class="text-muted mb-4">Kiểm tra sức khỏe định kỳ toàn diện cho cả gia đình.</p>
          <a href="#" class="btn btn-link p-0 mt-auto text-decoration-none">Chi tiết →</a>
        </div>
      </div>
      <!-- Lặp lại 5 khối col giống hệt, đổi icon + nội dung -->
    </div>
  </div>
</section>
```

Điểm cần thấu hiểu trong code này:

- `.row.g-4` tạo rãnh đều giữa các card ở mọi màn hình — không cần tự đặt margin từng card.
- `.card` + `h-100` bên trong `col`: card trong cùng hàng **cao bằng nhau** dù nội dung lệch — nhờ `col` (flex item) tự giãn và `h-100` kéo card theo. Không có hai class này, hàng dưới sẽ "lởm chởm".
- `d-flex flex-column` + `mt-auto` ở link "Chi tiết": đẩy link luôn **dính mép dưới** card dù mô tả dài ngắn khác nhau.
- `h3.h5`: dùng thẻ `h3` cho cấu trúc ngữ nghĩa, nhưng thu nhỏ hình thức bằng class `h5` — phân tách cấu trúc và trình bày, thói quen của frontend chuyên nghiệp.
- `card` mặc định có viền; thêm `border-0` để bỏ viền, bù lại `shadow-sm` cho card "nổi" trên nền `bg-light` — toàn bộ là mặc định của Bootstrap, không dòng CSS riêng.

## Checklist tự kiểm tra

| # | Kiểm tra | Cách làm |
|---|---|---|
| 1 | Đúng 1/2/3 cột theo màn hình | Kéo cửa sổ qua 768px, 992px |
| 2 | Card cùng chiều cao trong một hàng | So hai card kề nhau trên desktop |
| 3 | Link "Chi tiết" thẳng hàng đáy | Nhìn mép dưới các link trên cùng hàng |
| 4 | Không có CSS tự viết | DevTools → Styles của card chỉ thấy luật Bootstrap |
| 5 | Tiêu đề + câu dẫn căn giữa đẹp | Nhìn section trên mobile lẫn desktop |
| 6 | Khoảng cách section thoáng | `py-5` cho section, `mb-5` cho câu dẫn |

## Thực hành

1. Tự dựng `services.html` bằng tay trước (không hỏi AI) — giới hạn 15 phút.
2. Gửi prompt ở trên cho AI, so sánh cấu trúc và class của AI với bản của bạn.
3. Ghép class hay từ bản AI vào, chạy checklist, và đọc to từng nhóm class giải thích vì sao có mặt.

## Bài tiếp theo

Đã dựng được Services section hoàn toàn bằng Bootstrap — Chương 8 sẽ ráp các component lớn: Navbar responsive, Cards, Forms, Modal và Accordion để hoàn thiện Landing Page.
