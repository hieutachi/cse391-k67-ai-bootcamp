# Flexbox nâng cao

## Mục tiêu bài học
- Làm chủ `flex-grow`, `flex-shrink`, `flex-basis` và shorthand `flex`
- Dùng `align-self`, `order` cho các ngoại lệ trong layout
- Giải hai bài toán thật: hàng card đồng chiều cao, nav đẩy nút sang phải
- Biết cách nhờ AI giải thích hành vi flex kỳ lạ

## Không gian dư thừa đi đâu? — flex-grow

```css
.doctor-card { flex: 1 1 0; }   /* 3 card chia đều bề rộng container */
```

Ba con `flex: 1 1 0` trong container rộng: tổng `grow` = 3, không gian dư chia làm 3 phần bằng nhau → ba card **bằng nhau**. Con nào `flex-grow: 2` sẽ nhận gấp đôi phần dư của con `grow: 1`.

## Khi container chật — flex-shrink

Ngược lại, nếu tổng kích thước con vượt container, con co lại theo `flex-shrink` (mặc định 1 — ai cũng co như nhau). Đặt `flex-shrink: 0` cho phần tử không bao giờ được bóp (logo, ảnh avatar, nút):

```css
.navbar__brand { flex-shrink: 0; }   /* logo không bao giờ méo */
```

## flex-basis — kích thước khởi điểm

`flex-basis` là kích thước con *muốn* có trên trục chính trước khi grow/shrink. Giá trị hay gặp: `0` (bỏ qua nội dung, chia đều thuần túy) hoặc `auto` (lấy theo width/nội dung).

Shorthand đầy đủ: `flex: <grow> <shrink> <basis>`. Ba pattern phổ biến nhất trong dự án:

```css
flex: 1 1 0;        /* con linh hoạt, các con grow bằng nhau */
flex: 0 0 auto;     /* con GIỮ NGUYÊN kích thước (không lớn, không bé) */
flex: 1 1 240px;    /* tối thiểu 240px rồi mới chia — nền móng của auto-fit (bài 05) */
```

## align-self & order — phá lệ có kiểm soát

```css
.navbar {
  display: flex;
  align-items: center;       /* mọi con căn giữa dọc */
}
.navbar__hotline {
  align-self: stretch;       /* riêng hotline kéo dài hết chiều cao nav */
  display: flex;
  align-items: center;
}
```

`align-self` ghi đè `align-items` cho **một** con. `order` đổi thứ tự hiển thị mà không đụng HTML — dùng thận trọng vì nó tách rời thứ tự thị giác khỏi thứ tự DOM (ảnh hưởng bàn phím/trợ năng):

```css
.navbar__hotline { order: 3; }   /* ép ra cuối dù HTML đặt giữa */
```

## Bài toán 1 — hàng card đồng chiều cao

```html
<section class="services">
  <article class="service-card">
    <h3>Khám tổng quát</h3>
    <p>Gói khám sức khỏe định kỳ toàn diện cho mọi lứa tuổi, có bác sĩ tư vấn kết quả ngay trong buổi.</p>
  </article>
  <article class="service-card"><h3>Xét nghiệm</h3><p>Lấy mẫu tại nhà, trả kết quả trong 24 giờ.</p></article>
  <article class="service-card"><h3>Chăm sóc đặc biệt</h3><p>ICU và phòng bệnh tiêu chuẩn quốc tế.</p></article>
</section>
```

```css
.services { display: flex; gap: 1.5rem; }
.service-card {
  flex: 1;                  /* bằng nhau: grow=1, shrink=1, basis=0% */
  display: flex;
  flex-direction: column;   /* nội dung xếp dọc bên trong card */
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
}
```

Mặc định `align-items: stretch` kéo **các hộp card** bằng chiều cao — nhưng nội dung dài ngắn khác nhau vẫn lệch đáy. Biến card thành flex column rồi đẩy phần tử cuối xuống đáy:

```css
.service-card p { margin-top: auto; }   /* mô tả bám đáy card */
```

## Bài toán 2 — nav đẩy nút sang phải

Không cần `justify-content: space-between` cồng kềnh với nhiều nhóm; chỉ cần một "bộ đệm" co giãn:

```css
.navbar { display: flex; align-items: center; gap: 1.5rem; }
.navbar__menu { display: flex; gap: 1.25rem; list-style: none; }
.navbar__spacer { flex: 1; }       /* ngốn hết khoảng trống giữa menu và nút */
```

`<a class="btn navbar__cta">Đặt lịch khám</a>` với `.navbar__cta { flex-shrink: 0; }` sẽ nằm sát mép phải, còn menu đứng cạnh logo. Kỹ thuật "spacer co giãn" (`flex: 1` trên phần tử rỗng) là một trong những mẹo flex được dùng nhiều nhất.

## Prompt mẫu — AI gỡ rối hành vi flex

```text
Trong trang Highland Hospital, 3 card dịch vụ flex: 1 trong
.container có max-width 1100px, nhưng card giữa luôn cao hơn hai
card bên dù nội dung ngắn nhất, và một ảnh bên trong bị tràn ra
ngoài. HTML và CSS đính kèm: [dán]. Hãy giải thích theo thứ tự
khả năng (flex-basis mặc định auto + nội dung ảnh, align-items
stretch, min-width:auto của flex item) rồi đưa bản sửa tối thiểu.
```

## Thực hành

1. Chuyển `.hero__actions` và `.navbar` của bạn sang flex như bài này; thêm `.navbar__cta` dùng kỹ thuật spacer.
2. Dựng hàng 3 card dịch vụ nội dung dài ngắn khác nhau; dùng `align-items: stretch` + `margin-top: auto` để đáy card thẳng hàng.
3. Thử `flex: 1 1 0` vs `flex: 1 1 240px` với cùng 3 card — ghi nhận khác biệt khi container hẹp dần.
4. Đặt một ảnh không có `width` vào card và quan sát nó "đẩy" card rộng ra — đây là hành vi `min-width: auto` của flex item; sửa bằng `min-width: 0` hoặc cho ảnh `width: 100%`.

## Bài tiếp theo

Flexbox xử lý xuất sắc một chiều; khi cần dàn trang hai chiều (hàng VÀ cột cùng lúc) — như layout tổng thể trang chủ — CSS Grid mới là công cụ chủ lực.
