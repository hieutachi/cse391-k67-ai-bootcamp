# CSS Selectors & Specificity

## Mục tiêu bài học
- Chọn đúng phần tử bằng bộ chọn cơ bản, combinator và pseudo-class
- Hiểu Specificity là gì và tự tính được nó trong đầu
- Biết `!important` giải quyết rắc rối thế nào nhưng vì sao nên tránh
- Áp dụng ngay để chọn phần tử trong trang Highland Hospital

## CSS "dính" vào phần tử như thế nào

Mỗi dòng CSS gồm hai nửa: **bộ chọn** (nửa trước dấu `{`) và **khối khai báo** (các thuộc tính bên trong). Toàn bộ sức mạnh của CSS nằm ở chỗ viết được bộ chọn đúng — quá rộng thì style văng sang nơi khác, quá hẹp thì không trúng phần tử cần đổi.

### Bộ chọn cơ bản

```css
/* 1. Element — trúng MỌI thẻ cùng tên */
section { padding: 2rem 0; }
/* 2. Class — trúng mọi phần tử mang class, dùng lại được, nên ưu tiên */
.card { border-radius: 12px; }
/* 3. ID — trúng đúng MỘT phần tử, không dùng lại được */
#booking-form { max-width: 640px; }
/* 4. Attribute — trúng theo thuộc tính */
input[type="tel"] { letter-spacing: 0.05em; }
a[href^="tel:"] { font-weight: 600; }  /* href bắt đầu bằng "tel:" */
```

Với trang Highland Hospital: `#doctors` là vùng danh sách bác sĩ (một nơi duy nhất → ID hợp lý), còn `.doctor-card` xuất hiện nhiều lần → phải là class.

### Combinator — đi theo quan hệ trong cây DOM

```css
/* Con trực tiếp: nav là cha trực tiếp của ul */
nav > ul { list-style: none; }
/* Hậu duệ: mọi a nằm bên trong .hero (không cần là con trực tiếp) */
.hero a { color: white; }
/* Anh chị em liền kề: p ngay sau h1 */
h1 + p { font-size: 1.125rem; }
/* Anh chị em cùng cha, xuất hiện sau */
.specialty ~ .doctor-card { border-top: 1px solid #e5e7eb; }
```

### Pseudo-class — trạng thái & vị trí

```css
a:hover { text-decoration: underline; }        /* khi trỏ chuột */
input:focus { outline: 3px solid #93c5fd; }    /* khi đang nhập liệu */
.news-item:first-child { border-top: none; }   /* phần tử đầu tiên */
.news-item:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f8fafc; }     /* dòng lẻ xen kẽ */
```

Pseudo-class là "ngụy class" trình duyệt tự thêm theo trạng thái — bạn không cần JavaScript để tô đậm liên kết đang được trỏ tới.

## Specificity — vì sao có style "không chịu đổi"

Khi hai bộ chọn cùng tác động vào một phần tử, trình duyệt chọn theo **Specificity** (độ cụ thể), không theo thứ tự xuất hiện. Cách tính nhanh:

| Bộ chọn | Điểm (a, b, c) |
|---|---|
| `*` , `a:hover` ngoài pseudo-class | (0,0,0) |
| Element, pseudo-element (`::before`) | +1 vào c |
| Class, attribute, pseudo-class | +1 vào b |
| ID | +1 vào a |

So từ trái qua phải: `(1,0,0)` — một ID — thắng mọi tổ hợp class. Ví dụ:

```css
/* (0,1,1): 1 class + 1 element */
.card p { color: #334155; }
/* (0,2,0): 2 class — thắng dòng trên dù viết TRƯỚC nó */
.card .text-muted { color: #64748b; }
```

Muốn style đè được nhưng không phình selector, hãy **giữ độ đặc sâu vừa đủ**: `.doctor-card .btn` thay vì `.main-content .doctor-card .btn.btn-primary`.

## `!important` — công cụ cuối cùng

```css
.hidden { display: none !important; }
```

`!important` nhảy qua cả Specificity lẫn thứ tự. Khi nào dùng được? Khi override class của thư viện (như Bootstrap) mà không kiểm soát được nguồn — đó là lý do chính đáng duy nhất. Còn trong CSS tự viết, `!important` rải rác là dấu hiệu selector đang cấu trúc kém: một `!important` hôm nay sẽ buộc bạn thêm `!important` khác để thắng nó ngày mai. Nếu thấy mình sắp viết, hãy hỏi lại: *selector này có đang quá thấp hoặc quá cao độ ưu tiên so với cấu trúc thật không?*

## Prompt mẫu — nhờ AI chỉ đúng selector

```text
Trang Highland Hospital có HTML như sau:
<section id="services">...</section>
<section id="doctors">
  <article class="doctor-card">
    <h3>BS. Nguyễn Minh Anh</h3>
    <p class="specialty">Tim mạch</p>
  </article>
  <article class="doctor-card">...</article>
</section>

Tôi muốn: 1) chữ màu xám cho mọi .specialty; 2) viền trên chỉ
cho .doctor-card ngay sau .specialty; 3) nền sáng cho doctor-card
lẻ. Viết CSS kèm giải thích Specificity của từng dòng theo điểm
(a,b,c). Đừng dùng !important.
```

## Thực hành

1. Mở file HTML bạn đã dựng ở chương 3 (Landing Page semantic của Highland Hospital).
2. Dùng DevTools (Chuột phải → Inspect) tìm ra: selector ngắn nhất chọn đúng tiêu đề Hero, đúng nút "Đặt lịch khám" đầu tiên.
3. Viết 5 quy tắc CSS: hover lên thẻ bác sĩ đổi bóng đổ, `input:focus` có viền xanh, `li:nth-child(odd)` cho hàng trong bảng giờ khám, `h2 + p` cho đoạn mô tả dưới mỗi tiêu đề section.
4. Thử đặt `.doctor-card { background: red; }` ở cuối file và `#doctors .doctor-card { background: blue; }` ở đầu file — quan sát màu nào thắng và giải thích bằng Specificity.

## Bài tiếp theo

Đã chọn trúng phần tử, giờ ta đi sâu vào thứ quyết định kích thước thật của từng phần tử — Box Model — và cách tránh những phép tính layout sai kinh điển.
