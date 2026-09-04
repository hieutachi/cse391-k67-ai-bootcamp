# Lab: Hero responsive

## Mục tiêu bài học
- Dựng Hero Highland Hospital chạy tốt trên mobile / tablet / desktop
- Áp dụng đồng bộ mobile-first, `clamp()` và hiệu ứng chuyển động đã học
- Tự kiểm tra theo checklist và review code do AI sinh ra

## Yêu cầu thực hiện

Tạo `hero-responsive.html` (CSS trong thẻ `<style>` cho gọn) đáp ứng đủ các mốc:

- **Mobile (< 768px)**: nền gradient xanh dương đậm phủ kín; tiêu đề dùng `clamp()`; nút CTA "Đặt lịch khám" màu trắng, chữ xanh, **toàn chiều rộng** — ngón tay bấm vừa; ẩn ảnh minh hoạ (hoặc đưa xuống cuối); padding trái/phải ≥ 1.25rem.
- **Tablet (≥ 768px)**: nội dung vào cột trung tâm tối đa 720px; nút CTA thu về vừa nội dung; ảnh xuất hiện dưới chữ.
- **Desktop (≥ 992px)**: bố trí 2 cột — chữ trái, ảnh phải; thêm nút phụ "Xem danh sách bác sĩ" (kiểu viền); ảnh dùng `object-fit: cover` trong khung có bo góc.

Điểm tự đánh giá: trang phải **đẹp sẵn ở 360px mà không cần bất kỳ media query nào chạy**, các media query chỉ làm cho bố cục rộng ra. Hãy tự viết trước 10 phút rồi mới dùng prompt hỗ trợ — theo phương pháp đã học.

## Prompt mẫu: dựng Hero với AI

```text
Dựng Hero cho trang chủ Highland Hospital, website bệnh viện đặt lịch
khám. Viết một file HTML hoàn chỉnh, CSS thuần trong <style>, KHÔNG
dùng framework. Bố cục mobile-first:
- Mobile: nền gradient tuyến tính từ #0d6efd đến #0a58ca, chữ trắng.
  Tiêu đề "Chăm sóc sức khỏe toàn diện cho gia đình bạn" dùng clamp(),
  đoạn mô tả ngắn, nút chính "Đặt lịch khám" nền trắng chữ xanh chiếm
  toàn bộ chiều rộng, cao tối thiểu 52px, border-radius 8px. Ẩn ảnh.
- 768px trở lên: nội dung trong cột tối đa 720px canh giữa, nút co theo
  nội dung, hiện ảnh minh hoạ dưới chữ.
- 992px trở lên: 2 cột flex — text trái, ảnh phải chiếm 50%; ảnh trong
  khung object-fit: cover, border-radius 16px; thêm nút phụ kiểu outline
  "Xem danh sách bác sĩ".
Thêm hiệu ứng: hero content fade + slide lên khi tải trang, kèm khối
prefers-reduced-motion. Dùng class semantic. Mỗi khối CSS kèm 1 dòng
giải thích.
```

Nhận kết quả, bạn vẫn phải kiểm tra kỹ ba điểm AI hay làm sai: (1) tiêu đề gõ tiếng Việt có sai dấu không, (2) có lén thêm màu/class không có trong yêu cầu, (3) cột giữa 720px có áp dụng đúng từ mốc 768px không.

## Checklist tự kiểm tra

| # | Hạng mục | Cách kiểm tra |
|---|---|---|
| 1 | Không thanh cuộn ngang | Kéo cửa sổ từ 320px đến 1400px, cuộn ngang phải không xuất hiện |
| 2 | Mobile đẹp sẵn | Ở 360px, không cần media query nào cũng thấy rõ tiêu đề + nút |
| 3 | Nút CTA to trên mobile | Ở < 768px: nút chiếm trọn chiều ngang, cao ≥ 52px, dễ bấm |
| 4 | Tiêu đề linh hoạt | Thay đổi viewport liên tục, chữ to nhỏ mượt, không tràn, không nhỏ quá 1.5rem |
| 5 | Layout "nhảy" đúng mốc | Mở DevTools Responsive, layout đổi đúng tại 768px và 992px |
| 6 | Ảnh không méo | Desktop: ảnh lấp khung đẹp, không bẹp, mặt bác sĩ / ảnh minh hoạ không bị cắt sai |
| 7 | Hover hoạt động | Nút: đổi màu + nhấc lên; card/ảnh: scale nhẹ — chuyển động mượt |
| 8 | Giảm chuyển động | DevTools → Rendering → emulate `prefers-reduced-motion: reduce`: hiệu ứng phải tắt |

## Phân tích code mẫu (đoạn quan trọng nhất)

```css
@media (min-width: 992px) {
  .hero-inner {
    display: flex;
    align-items: center;
    gap: 3rem;
    max-width: 1140px;
  }
  .hero-text { flex: 1; }
  .hero-media { flex: 1; }
}
```

Vì sao `flex: 1` cho cả hai cột mà không khai `width: 50%`? `flex: 1` nghĩa là "cả hai được chia phần còn lại bằng nhau" — không cần cộng trừ cho vừa `gap` 3rem, trình duyệt tự làm. Còn `max-width: 1140px` thay vì `width: 100%` giữ cho cột không bị giãn vô hạn trên màn hình siêu rộng — trang luôn có chiều ngang đọc thoải mái.

## Thực hành

1. Tự viết `hero-responsive.html` trước (giới hạn 10 phút).
2. Gửi prompt cho AI, đối chiếu, sửa bản của bạn bằng những ý hay hơn từ bản AI.
3. Chạy hết 8 mục trong checklist trên chính file của mình.

## Bài tiếp theo

Hero đã responsive bằng CSS thuần — từ Chương 7 trở đi ta dựng lại toàn bộ trang bằng Bootstrap 5, bắt đầu với cài đặt framework qua CDN.
