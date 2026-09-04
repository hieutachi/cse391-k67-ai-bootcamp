# Transitions & Animations

## Mục tiêu bài học
- Làm chủ `transition` để hover của nút và card mượt mà
- Dùng `transform` (scale/translate) thay cho thay đổi gây giật layout
- Viết animation bằng `@keyframes` và tôn trọng `prefers-reduced-motion`

## Phân biệt transition và animation

**Transition** chuyển đổi *giữa hai trạng thái* (bình thường ↔ hover), tự kích hoạt khi trạng thái đổi — không cần code thêm. **Animation** là chuỗi chuyển động *tự chạy nhiều bước* qua `@keyframes`, có thể lặp vô hạn hay chạy một lần khi phần tử xuất hiện.

## Transition cho nút và card

Cú pháp đầy đủ: `transition: <thuộc tính> <thời gian> <hàm thời gian> <độ trễ>`. Nên liệt kê thuộc tính cụ thể thay vì `transition: all` để tránh hiệu ứng phụ ngoài ý muốn:

```css
.btn-book {
  background-color: #0d6efd;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-book:hover {
  background-color: #0a58ca;
  transform: translateY(-2px);   /* nhấc nhẹ lên */
  box-shadow: 0 6px 14px rgba(13, 110, 253, 0.35);
}

.btn-book:active {
  transform: translateY(0);      /* bấm xuống lại */
}
```

Đừng transition `width`, `margin`, `top`... — mỗi thay đổi của chúng buộc trình duyệt tính lại layout (reflow) nên chuyển động giật. `transform` và `opacity` chạy trên lớp đồ hoạ riêng nên luôn mượt — ưu tiên hai thuộc tính này. Card bác sĩ áp dụng cùng nguyên tắc:

```css
.doctor-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.doctor-card:hover { transform: scale(1.03); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12); }
```

Bốn hàm thời gian thông dụng: `ease` (mặc định, tự nhiên), `linear` (đều — hợp chuyển động xoay/vô hạn), `ease-in` (nhanh dần), `ease-out` (chậm dần).

## @keyframes và animation

Animation gồm khung hình `@keyframes` mô tả các trạng thái và luật `animation` gắn khung hình vào phần tử:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-content { animation: fadeInUp 0.6s ease-out both; }
```

Viết tắt `animation: fadeInUp 0.6s ease-out both` gồm: tên khung hình, thời gian, hàm thời gian, và `both` — giữ trạng thái `from` khi chưa chạy và `to` khi kết thúc, chống "nháy" nội dung hiện lên sớm. Có thể thêm `delay`, `infinite`, `alternate`:

```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.5); }
  50%      { box-shadow: 0 0 0 12px rgba(220, 53, 69, 0); }
}

.badge-hotline { animation: pulse 2s ease-in-out infinite; } /* "nhịp đập" cho hotline */
```

Khác `transition` (chỉ hai trạng thái), `@keyframes` cho nhiều cột mốc: `0%` → `50%` → `100%`.

## Tôn trọng prefers-reduced-motion

Nhiều người (rối loạn tiền đình, nhạy cảm thị giác) bật giảm chuyển động trên hệ điều hành. Bệnh viện phục vụ cả người cao tuổi — khối sau là thói quen chuyên nghiệp, không phải phụ kiện:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Prompt mẫu: sinh animation cho Hero

```text
Trang chủ Highland Hospital: khi trang tải, tôi muốn tiêu đề "Chăm sóc
sức khỏe toàn diện cho gia đình bạn" và nút "Đặt lịch khám ngay" xuất
hiện nhẹ nhàng: mờ dần + trượt lên từ 24px, tiêu đề chạy trước nút
0.15s. Nút hover dịch lên 2px và đổ bóng, khi bấm về vị trí cũ. Viết
CSS thuần (không framework) cho .hero-title và .btn-book: dùng
@keyframes fadeInUp, transition cho nút, kèm khối prefers-reduced-motion
tắt toàn bộ hiệu ứng.
```

## Thực hành

- Thêm hover cho nút "Đặt lịch khám" (đổi màu + `translateY(-2px)`) và card bác sĩ (`scale(1.03)`).
- Thêm `fadeInUp` cho `.hero-content`, thử `delay: 0.15s` cho nút để tiêu đề xuất hiện trước.
- Chèn khối `prefers-reduced-motion`; kiểm tra bằng DevTools → Rendering → *Emulate prefers-reduced-motion: reduce*.
- Gửi prompt cho AI, đối chiếu bản AI viết với bản bạn tự làm, ghi lại điểm khác biệt.

## Bài tiếp theo

Đủ công cụ cho một trang đẹp và sống động trên mọi màn hình — bài Lab tới gói tất cả lại: dựng Hero Highland Hospital chạy tốt trên 3 kích thước thiết bị với checklist tự kiểm tra.
