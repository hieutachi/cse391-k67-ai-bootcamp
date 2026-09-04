# Media Queries & Breakpoints

## Mục tiêu bài học
- Hiểu cú pháp `@media` với `min-width` / `max-width` — hai hướng điều khiển ngược nhau
- Nắm bốn breakpoints 576 / 768 / 992 / 1200 px và vì sao chúng phổ biến
- Dùng AI sinh media query từ mô tả, rồi tự kiểm chứng bằng DevTools

## Vấn đề của CSS "một kích thước"

Bạn vừa dựng xong Hero Highland Hospital cho màn hình desktop: dòng tiêu đề to bên trái, ảnh minh hoạ bên phải. Thu cửa sổ xuống 360px — bề ngang một chiếc điện thoại thật — chữ vẫn 3rem, ảnh vẫn chiếm nửa màn hình, và trang vỡ ngay trước mắt.

Media query cho phép bạn nói với trình duyệt: *"khi viewport rộng ít nhất 768px, hãy áp dụng các luật này"*. Một file CSS vì thế trở thành nhiều tầng quy tắc được bật theo kích thước màn hình — nền tảng của Responsive Web Design.

## Cú pháp @media

```css
/* Mặc định cho mọi màn hình */
.service-list {
  display: block;
}

/* Chỉ áp dụng khi viewport rộng TỪ 768px trở lên */
@media (min-width: 768px) {
  .service-list {
    display: flex;
    gap: 1.5rem;
  }
}

/* Chỉ áp dụng khi viewport hẹp DƯỚI 992px */
@media (max-width: 991.98px) {
  .hero-image {
    display: none; /* giấu ảnh lớn trên tablet dọc */
  }
}
```

Hai hướng viết ngược nghĩa nhau:
- `@media (min-width: 768px)` — "từ 768px trở lên": luật có hiệu lực khi viewport đạt mức tối thiểu.
- `@media (max-width: 991.98px)` — "dưới 992px": luật hết hiệu lực khi viewport vượt quá mốc. Con số lẻ `.98` giúp mốc này không đè lên mốc `992px` kế bên.

Ngoài ra có thể kết hợp nhiều điều kiện, ví dụ `@media (min-width: 768px) and (orientation: landscape)` — ít khi cần nhưng biết để dùng khi gặp.

## Bốn breakpoints phổ biến

Bảng dưới chính là bộ breakpoints mặc định của Bootstrap 5 — cũng là bộ giá trị được dùng rộng rãi nhất vì phần lớn thiết bị hiện hành nằm gọn trong bốn nhóm sau:

| Breakpoint | Ký hiệu | Viewport | Thường tương ứng |
|---|---|---|---|
| Small | `sm` | ≥ 576px | điện thoại nằm ngang, tablet dọc |
| Medium | `md` | ≥ 768px | tablet |
| Large | `lg` | ≥ 992px | laptop, desktop nhỏ |
| Extra large | `xl` | ≥ 1200px | desktop lớn |

Đừng áp dụng máy móc: breakpoint đúng là nơi **nội dung bắt đầu vỡ**. Chạy trang, kéo dần cửa sổ, chỗ nào cột chữ chen nhau hay ảnh tràn thì đặt media query đúng chỗ đó — con số trong bảng chỉ là điểm khởi đầu hợp lý.

## Vị trí media query trong file CSS

CSS là thác đổ (cascade): cùng độ ưu tiên, luật viết sau thắng. Vì vậy media query thường đặt **cuối file hoặc cuối từng nhóm component**, và nên viết selector có độ đặc hiệu (specificity) bằng bản gốc thay vì nhồi thêm class chỉ để "mạnh hơn".

## Prompt mẫu: nhờ AI sinh media query từ mô tả

```text
Tôi đang dựng Hero trang chủ Highland Hospital (website bệnh viện đặt lịch
khám). Trên mobile: nền gradient phủ kín, tiêu đề 1.8rem căn trái, nút
"Đặt lịch khám" màu xanh dương chiếm toàn chiều rộng. Từ 768px: nội dung
vào khung trung tâm tối đa 720px, nút tự co theo nội dung. Từ 992px: bố
trí 2 cột — chữ trái, ảnh phải — tiêu đề 3rem.
Viết CSS cho các class .hero, .hero-title, .hero-cta theo đúng mô tả,
dùng media query min-width. Không thêm hiệu ứng chưa được yêu cầu.
```

Mẹo để prompt phát huy tác dụng: nêu rõ **tên class, kết quả hiển thị ở từng mốc**, và **cấm AI sáng tác thêm**. Nhận kết quả xong đừng dán thẳng vào file — đọc từng dòng xem có đúng ý đồ của bạn không, đúng tinh thần bước 3 "Phân tích & Thấu hiểu sâu".

## Kiểm tra bằng DevTools Responsive Mode

1. Mở trang Hero, bấm `F12` rồi `Ctrl+Shift+M` (macOS: `Cmd+Shift+M`) để bật thanh thiết bị.
2. Chọn một thiết bị sẵn có như iPhone SE (375px), rồi kéo mép cửa sổ lần lượt qua 576 / 768 / 992 / 1200 — quan sát layout "nhảy" đúng lúc nào.
3. Trong Chrome mới, tab **Media queries** (cạnh Console) vẽ mỗi query thành một thanh màu; kéo thanh để thấy chính xác phạm vi viewport của từng luật.

Nếu trang chỉ nhảy ở 992px dù bạn khai mốc 768px, rất có thể luật bị đặt sai vị trí hoặc specificity thấp hơn luật gốc — quay lại kiểm tra hai mục vừa rồi.

## Thực hành

- Lấy Hero đã dựng ở Chương 4, thêm media query `min-width` cho các mốc 768px, 992px và 1200px.
- Ở mốc 768px, ép nội dung hero vào cột trung tâm tối đa 720px bằng `margin: 0 auto`.
- Gửi HTML của hero kèm yêu cầu "thêm media query sao cho không vỡ layout ở 360px" cho AI, rồi tự kiểm chứng bằng Responsive Mode.

## Bài tiếp theo

Đã biết cách bật/tắt luật theo màn hình — bài sau sẽ đảo ngược thứ tự làm việc: viết CSS cho mobile trước rồi mới phóng to dần bằng `min-width`, tức Mobile-First Workflow.
