# CSS Grid căn bản

## Mục tiêu bài học
- Dựng layout hai chiều bằng `display: grid` và đơn vị `fr`
- Khai báo lưới bằng `grid-template-columns/rows`, `gap`
- Đặt tên vùng bằng `grid-template-areas` và xếp phần tử theo dòng/cột
- Dàn layout trang chủ Highland Hospital bằng grid areas

## Hai chiều cùng lúc

Flexbox sắp theo một trục; Grid quản lý **hàng và cột song song** — đúng thứ layout trang cần. Container cha khai báo lưới, các con tự động xếp vào ô:

```css
.doctors-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 cột đều nhau */
  gap: 1.5rem;                          /* khoảng cách ô — cả hàng lẫn cột */
}
```

`fr` (fraction) là đơn vị riêng của Grid: chia **không gian còn lại** theo tỷ lệ, không cần biết kích thước cụ thể. `1fr 1fr 1fr` ⇔ `repeat(3, 1fr)`. Cột `2fr` rộng gấp đôi cột `1fr`. Khác `%` ở chỗ `fr` không cộng với padding/gap — không bao giờ tràn.

## Điều khiển từng con — dòng và cột

Mặc định các con tự xếp tuần tự. Muốn một con chiếm nhiều ô, dùng số dòng (grid line):

```css
.featured {
  grid-column: 1 / 3;   /* từ dòng lưới 1 đến dòng lưới 3 → rộng 2 cột */
}
.doctor-card--wide { grid-column: span 2; }   /* tương đương, dễ đọc hơn */
```

## grid-template-areas — vẽ layout bằng tên

Cách trực quan nhất: đặt tên cho từng vùng, rồi "vẽ" bản đồ lưới bằng chuỗi:

```css
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "header header header"
    "hero   hero   sidebar"
    "doctors doctors doctors"
    "footer footer footer";
}
```

Mỗi dòng chuỗi là một **hàng lưới**, mỗi từ là tên vùng ở cột tương ứng; cùng tên lặp lại = vùng trải nhiều ô; `.` là ô bỏ trống. Gán phần tử vào vùng:

```css
.site-header { grid-area: header; }
.hero        { grid-area: hero; }
.booking-tip { grid-area: sidebar; }
.doctors     { grid-area: doctors; }
.site-footer { grid-area: footer; }
```

HTML khi đó chỉ là thứ tự logic (header, main, aside, footer...) — Grid hoàn toàn chịu trách nhiệm vị trí. Muốn đổi bố cục (sidebar xuống dưới hero) chỉ cần sửa `grid-template-areas`, không đụng HTML. Đây là lý do `grid-template-areas` là lựa chọn hàng đầu cho layout cấp trang.

## Vì sao Grid hợp lý cho "khung" chứ không phải mọi thứ

Cùng khoảng `gap` và căn chỉnh, nhưng khác triết lý:

- **Grid**: bạn định nghĩa lưới trước, nội dung xếp vào — khớp layout trang (header/hero/sidebar/footer) nơi cấu trúc đã biết.
- **Flexbox**: nội dung quyết định dòng chảy — khớp thanh nav, hàng nút, chuỗi card nơi số lượng đổi thay.

## Prompt mẫu — nhờ AI dựng khung trang

```text
Dùng CSS Grid dựng khung trang chủ Highland Hospital: header cao
tự động, hero chiếm 2/3 bề rộng còn 1/3 là panel "Giờ khám" bên
phải, bên dưới là vùng danh sách bác sĩ full-width, cuối cùng là
footer. Dùng grid-template-areas, tên vùng rõ nghĩa, đơn vị fr,
gap 0 cho khung trang (các section tự lo padding). Kèm HTML 5 thẻ
semantic tối thiểu và giải thích ngắn cách đọc bản đồ areas.
```

## Thực hành

1. Dựng khung trang chủ Highland Hospital: `grid-template-areas` 4 vùng như mẫu, thay `.booking-tip` bằng panel "Giờ khám 7:00–19:00".
2. Bên trong vùng `.doctors`, thêm grid con `repeat(3, 1fr)` — grid lồng grid là chuyện thường ngày.
3. Đổi `grid-template-columns: 2fr 1fr` và quan sát hero rộng hơn panel; rồi hoán đổi `grid-template-areas` để panel lên trước — HTML không đổi.
4. Thêm một con có `grid-column: span 2` vào lưới 3 cột và quan sát cách các con còn lại tự dồn sang hàng mới.

## Bài tiếp theo

Cả Flexbox và Grid đều "cân" được nhiều layout — vậy khi nào dùng cái nào? Bài kế đưa ra quy tắc quyết định và dựng cùng một danh sách bác sĩ bằng cả hai cách.
