# Workshop: viết prompt cắt giao diện

## Mục tiêu bài học
- Thực hành trọn quy trình viết prompt cho 3 tình huống thật
- Nhận ra bẫy thường gặp của từng loại nhiệm vụ: dựng mới, thêm tính năng, sửa lỗi
- Tự đánh giá prompt bằng checklist trước khi gửi cho AI

Cách học bài này: làm trước khi đọc. Với mỗi tình huống, tự viết prompt trong 5 phút và chạy thử, rồi mới so sánh với gợi ý bên dưới — chênh lệch giữa hai bản chính là bài học.

## Tình huống 1 — Cắt một section từ mô tả

**Bối cảnh**: chưa có Figma, chỉ có mô tả bằng lời: khu vực "Dịch vụ nổi bật" gồm 6 ô dịch vụ xếp lưới 3 cột, mỗi ô có icon, tên dịch vụ và mô tả một câu.

Viết prompt rồi so sánh gợi ý:

```text
Bối cảnh: Landing Page Highland Hospital, HTML5 + CSS thuần.
Nhiệm vụ: dựng section "Dịch vụ nổi bật" — lưới 3 cột, đúng 6 ô, mỗi ô
có icon (SVG inline), tên dịch vụ, mô tả 1 câu. Dịch vụ: Khám tổng quát,
Tim mạch, Nhi khoa, Xét nghiệm, Chẩn đoán hình ảnh, Phục hồi chức năng.
Ràng buộc: section > h2 + div dùng display: grid,
grid-template-columns: repeat(3, 1fr); không framework; không thêm dịch
vụ nào ngoài 6 tên trên.
Giao diện: nền #f0fdfa; mỗi ô nền trắng, viền 1px #e2e8f0, bo góc 12px,
padding 1.5rem; icon màu #0f766e; tiêu đề #0f172a.
Định dạng: HTML rồi CSS, hai khối riêng.
```

**Bẫy thường gặp**: quên ràng buộc "không thêm nội dung" → AI chèn dịch vụ thứ 7, thứ 8; quên token màu → AI chọn màu xanh dương mặc định lệch thương hiệu.

## Tình huống 2 — Thêm tính năng lọc vào code có sẵn

**Bối cảnh**: danh sách bác sĩ đã render bằng `renderDoctors` (bài 03 chương này). Bạn muốn thêm dropdown lọc chuyên khoa ngay trên file đang chạy.

Quy tắc vàng khi prompt trên code cũ: **dán đúng code thật đang chạy**, nêu rõ chỗ muốn chèn, và giới hạn "không sửa phần đã chạy đúng":

```text
Dưới đây là toàn bộ file doctors.js đang chạy đúng trên trang chủ
Highland Hospital: (dán file).
Nhiệm vụ: thêm <select id="specialty-filter"> ở đầu danh sách; các option
sinh động từ chính mảng doctors (mỗi chuyên khoa một option, không trùng,
kèm option "Tất cả"). Khi đổi giá trị select, render lại danh sách bằng
hàm renderDoctors đã có.
Ràng buộc: giữ nguyên tên và hoạt động của hàm cũ; chỉ thêm code mới,
không sửa renderDoctors; không dùng thư viện.
Định dạng: trả về phần code mới cần chèn kèm vị trí chèn.
```

**Bẫy thường gặp**: không dán code thật → AI viết hàm mới khác tên, dán vào là vỡ; yêu cầu "làm đẹp hơn" → AI đụng vào phần đang chạy ổn.

## Tình huống 3 — Sửa lỗi hiển thị

**Bối cảnh**: ở màn hình 320px, tên bác sĩ dài ("BS. Nguyễn Thị Thanh Trúc") làm thẻ doctor card tràn chữ, đè lên dòng số năm kinh nghiệm.

Áp dụng công thức bài 04 — code tối thiểu + hiện tượng + thứ tự nguyên nhân — và nhớ *"giải thích trước khi sửa"*:

```text
Code: đây là toàn bộ CSS liên quan đến thẻ bác sĩ —
.doctor-card { max-width: 320px; padding: 1rem; }
.doctor-card h3 { font-size: 1.05rem; }
Hiện tượng: ở 320px, tên bác sĩ dài làm chữ tràn ra khỏi khung, đè lên
dòng dưới. Từ 375px trở lên không sao.
Nguyên nhân khả dĩ của tôi, phân tích theo thứ tự:
1. h3 không cho xuống dòng (thiếu word-break / overflow-wrap).
2. padding + max-width khiến vùng chữ quá hẹp.
3. line-height của h3 quá nhỏ.
Giải thích rồi mới đưa bản sửa, thay đổi tối thiểu.
```

**Bẫy thường gặp**: dán cả file style.css 300 dòng → AI phân tích loãng, sửa nhầm chỗ. Càng khoanh nhỏ phạm vi càng dễ đúng.

## Tiêu chí tự đánh giá prompt

Trước khi nhấn gửi, tự chấm 6 câu — đủ 6/6 thì prompt sẵn sàng:

- [ ] Có nói rõ dự án Highland Hospital và file/trang đang làm?
- [ ] Nhiệm vụ đo được: dựng/thêm/sửa **cái gì**, ở **đâu**?
- [ ] Có ràng buộc công nghệ (không framework, không thư viện, giữ nguyên hàm cũ)?
- [ ] Màu sắc, khoảng cách, dữ liệu được nêu bằng giá trị cụ thể?
- [ ] Có yêu cầu định dạng đầu ra (khối code, thứ tự trả về)?
- [ ] Với prompt sửa tiếp theo: mỗi lượt chỉ thay đổi một điểm?

## Thực hành
Chạy đủ 3 tình huống trên code của bạn, mỗi tình huống chấm checklist trước khi gửi. Cuối buổi, lấy một prompt "tệ nhất bạn từng gửi" và viết lại cho đủ 6 tiêu chí.

## Bài tiếp theo

Đã đủ công cụ giao tiếp với AI — chương sau bạn bắt tay vào HTML5 thực thụ, mở đầu bằng *Cấu trúc tài liệu web chuẩn* với `<!DOCTYPE html>`, `<head>` và `<body>`.
