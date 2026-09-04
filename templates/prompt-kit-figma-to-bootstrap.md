# Prompt Kit — Figma → Bootstrap (Frontend Developer)

Bộ hai prompt chuẩn dành riêng cho frontend developer: phân tích thiết kế Figma thành đặc tả, rồi sinh code Bootstrap 5 dùng được ngay. Bổ trợ cho module 13 (`course-lessons/{en,vi}/13-bonus-prompt-engineering-frontend/`).

## Cách dùng

1. Chạy **Prompt A** với ảnh/link thiết kế → nhận đặc tả 5 mục.
2. Kiểm tra số cột, khoảng cách, trạng thái — sửa chỗ AI ước lượng sai.
3. Dán đặc tả vào **Prompt B** → nhận HTML section.
4. Kiểm tra code (xem checklist cuối trang) rồi mới đưa vào dự án.

---

## Prompt A — Phân tích thiết kế Figma

```text
Bạn là chuyên gia phân tích thiết kế UI. Hãy phân tích frame sau đây theo 5 mục,
mỗi mục trả lời ngắn gọn bằng bullet, KHÔNG viết code:

1. BỐ CỤC TỔNG THỂ: frame này là section gì của trang? Nằm giữa section nào và section nào?
   Bên trong gồm những khối lớn nào, xếp theo chiều dọc hay ngang?
2. LƯỚI & CĂN CHỈNH: đếm số cột trong từng hàng; khoảng cách giữa các phần tử (ước lượng theo
   bội số 4px/8px); lề trái/phải so với container; phần tử nào căn giữa, phần tử nào căn trái.
3. THÀNH PHẦN (component): liệt kê từng thành phần lặp lại (card, button, input, badge...)
   và cấu trúc bên trong của nó.
4. TRẠNG THÁI: với mỗi thành phần tương tác, nêu các trạng thái cần có
   (default, hover, focus, disabled, active, rỗng, lỗi) và điểm khác biệt về màu/đổ bóng.
5. RESPONSIVE: dự đoán cách layout này nên chuyển đổi ở 768px và 375px
   (bao nhiêu cột, phần tử nào ẩn đi, nút nào chuyển full-width).

Bối cảnh dự án: Highland Hospital, HTML5 semantic + Bootstrap 5.3, tiếng Việt,
design token --hh-primary #0f766e, --hh-dark #0f172a, --hh-light #0fdfa.
```

## Prompt B — Sinh code Bootstrap 5 từ đặc tả

```text
Bạn là Senior Frontend Developer. Dựa vào ĐẶC TẢ bên dưới, sinh code HTML hoàn chỉnh
cho một section, dùng Bootstrap 5.3 (CDN). Tuân thủ tuyệt đối:

1. THẺ NGỮ NGHĨA: chọn thẻ đúng vai trò (section/article/header/footer...);
   heading đúng bậc (h2 cho section, h3 cho card bên trong).
2. GRID: container → row → col; mobile-first: col-12 mặc định, tăng dần col-md-*, col-lg-*;
   gutter dùng g-*; không dùng inline style.
3. DESIGN TOKEN: màu dùng --hh-primary #0f766e, --hh-dark #0f172a, --hh-light #0fdfa,
   --hh-border #e2e8f0, --hh-muted #475569; áp bằng class Bootstrap (text-*, bg-*, border-*)
   hoặc CSS biến khi thật cần.
4. KHÔNG VIẾT CSS RIÊNG: nếu buộc phải override, đánh dấu comment "CUSTOM" kèm lý do 1 dòng.
5. TRẠNG THÁI: khai báo đủ hover/focus/disabled; input có is-invalid + invalid-feedback.
6. NỘI DUNG: dùng nội dung tiếng Việt mẫu hợp lý cho bệnh viện; ảnh dùng placeholder
   https://placehold.co/600x400/0f766e/white?text=... với alt mô tả.
7. ĐẦU RA: chỉ trả về mã HTML của section, có comment HTML đánh dấu từng khối,
   KHÔNG giải thích, KHÔNG bọc code block thừa.

ĐẶC TẢ:
[dán 5 mục từ Prompt A, hoặc mô tả chi tiết section]
```

---

## Prompt sửa nhanh (Refine) — chỉ đích danh, không viết lại

```text
Giữ nguyên toàn bộ cấu trúc. Sửa đúng các điểm sau: [liệt kê từng điểm kèm mô tả,
ví dụ "hàng card phải đủ 4 cột desktop nên dùng col-xl-3"]. Chỉ trả về phần đã sửa.
```

## Checklist kiểm tra code AI trả về

- [ ] Grid mobile-first, đủ breakpoint; hàng đúng số cột (4 cột = `col-xl-3`/`col-lg-3`).
- [ ] Card có `h-100`; nút full-width bọc `d-grid`; ảnh có `alt`.
- [ ] Heading đúng bậc; CTA điều hướng là `<a>`, hành động trong trang là `<button>`.
- [ ] Không inline style; không CSS riêng thừa; badge dùng `text-bg-*` giữ contrast.
- [ ] Khớp thiết kế ở 375px / 768px / 1440px, không tràn ngang.
