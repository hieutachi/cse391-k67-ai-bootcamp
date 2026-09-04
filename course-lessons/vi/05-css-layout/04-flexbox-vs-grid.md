# Chọn Flexbox hay Grid

## Mục tiêu bài học
- Ra quyết định nhanh: layout một chiều → Flexbox, hai chiều → Grid
- Đọc được bảng so sánh và biết khi nào hai công cụ phối hợp
- Hỏi AI tư vấn layout đúng cách, kèm bối cảnh đủ
- Dựng cùng danh sách bác sĩ bằng cả Flexbox lẫn Grid để tự cảm nhận

## Quy tắc quyết định — hỏi một câu duy nhất

> Nội dung chảy theo **một trục** (hàng ngang hay cột dọc) hay cần canh cả **hàng lẫn cột** cùng lúc?

```text
Chảy một chiều (nav, nút, chuỗi badge...) ──► Flexbox
Cần lưới 2 chiều có hàng + cột đồng thời  ──► CSS Grid
```

Bẫy phổ biến của người mới: thấy "mấy tấm card" là vội dùng Grid, nhưng một hàng card trượt ngang (horizontal scroll) chỉ cần Flexbox. Ngược lại, dùng Flexbox ghép nhiều hàng bằng `flex-wrap` để làm lưới thì các hàng không thẳng cột với nhau — Grid làm việc đó đúng bản chất.

## Bảng so sánh nhanh

| Tiêu chí | Flexbox | CSS Grid |
|---|---|---|
| Số chiều điều khiển | 1 (main-axis) | 2 (row + column) |
| Điểm xuất phát | Nội dung → dàn theo dòng chảy | Khai báo lưới → xếp nội dung vào |
| Căn chỉnh theo trục chéo | `align-items` | `align-items` + `justify-items` |
| Phần tử chiếm nhiều ô | Không có khái niệm | `grid-column/row: span n` |
| Đổi chỗ layout | `order` (hạn chế) | `grid-template-areas`, đặt tọa độ |
| Điểm mạnh nhất | Nav, toolbar, chuỗi item, căn giữa | Khung trang, lưới card, dashboard |
| Có thể lồng nhau | ✅ (bài này dùng) | ✅ |

Hai công cụ **không loại trừ nhau** — chúng là hai tầng: Grid dàn khung trang, Flexbox dàn nội dung bên trong từng ô. Khuôn mẫu chuẩn ngành:

```css
.doctors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

.doctor-card {
  display: flex;              /* bên trong ô: xếp dọc, đẩy nút xuống đáy */
  flex-direction: column;
}
.doctor-card .btn { margin-top: auto; }
```

## Cùng một danh sách bác sĩ — làm bằng cả hai

**Bản Flexbox** (một hàng, wrap khi chật — hàng sau không cần thẳng cột hàng trước):

```css
.doctors-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.doctors-flex .doctor-card { flex: 1 1 280px; }   /* mỗi card ≥ 280px */
```

**Bản Grid** (lưới thật — mọi hàng thẳng cột):

```css
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

Cả hai đều "responsive tự nhiên", nhưng chỉ Grid bảo đảm các card ở hàng dưới **căn thẳng** theo cột của hàng trên. Với lưới card bác sĩ, Grid là lựa chọn đúng — đó cũng là lý do bài Lab kế tiếp dùng Grid.

## Prompt mẫu — hỏi AI tư vấn layout

```text
Tôi cần dàn vùng "Đội ngũ bác sĩ" của Highland Hospital: 8 card
(avatar, tên, chuyên khoa, kinh nghiệm, nút đặt lịch), desktop 4
cột, tablet 2 cột, mobile 1 cột; card cùng hàng phải bằng chiều
cao, nút luôn bám đáy card. Hãy tư vấn: dùng Flexbox hay Grid cho
lưới, và dùng gì bên trong từng card? Nêu lý do từng lựa chọn và
một đoạn CSS tối thiểu cho lưới.
```

## Thực hành

1. Dựng cùng 6 `.doctor-card` hai lần: một lần `.doctors-flex`, một lần `.doctors-grid`, cùng nội dung. Kéo màn hình từ 320px → 1200px, so sánh cách xuống hàng của hai bản.
2. Ghi vào một dòng nhận xét của bạn: khác biệt dễ thấy nhất giữa hai bản là gì.
3. Trong bản Grid, thêm `grid-auto-rows: 1fr` và quan sát các card cùng hàng tự đồng chiều cao.
4. Tìm trên trang chủ một chỗ "lẽ ra nên dùng công cụ kia" (ví dụ nav đang là Grid) và refactor lại cho đúng — đây là bài tập rèn mắt layout.

## Bài tiếp theo

Lý thuyết đã đủ — Lab cuối chương: dựng lưới 4 Doctor Cards với `auto-fit/minmax`, prompt AI kèm phân tích từng dòng, kết thúc Chương 5 bằng một sản phẩm hoàn chỉnh.
