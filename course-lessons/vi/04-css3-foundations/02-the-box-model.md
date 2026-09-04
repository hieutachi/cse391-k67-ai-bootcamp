# The Box Model

## Mục tiêu bài học
- Nắm 4 lớp của mọi phần tử: content, padding, border, margin
- Hiểu `box-sizing: border-box` và vì sao nên đặt toàn cục từ đầu
- Giải thích được hiện tượng margin bị "nuốt" (margin collapse)
- Dùng DevTools tab Computed để đọc kích thước thật khi layout lạ

## Mọi thứ trên trang đều là một cái hộp

Trình duyệt không nhìn trang như "chữ và ảnh" mà như chồng các **hộp chữ nhật** lồng nhau. Mỗi hộp có bốn lớp tính từ trong ra:

```
┌──────────────────────────── margin (ngoài cùng, trong suốt) ──┐
│  ┌──────────────────────── border ────────────────────────┐   │
│  │  ┌──────────────────── padding ────────────────────┐   │   │
│  │  │  ┌──────────────── content ────────────────┐    │   │   │
│  │  │  │  chữ, ảnh, nội dung thật                 │    │   │   │
│  │  │  └──────────────────────────────────────────┘    │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

```css
.doctor-card {
  width: 300px;
  padding: 24px;        /* đệm trong: đẩy content ra xa mép hộp */
  border: 1px solid #e2e8f0;  /* viền: nhìn thấy được */
  margin: 16px;         /* đẩy các hộp khác ra xa hộp này */
  background: white;    /* background nằm dưới cả padding + border */
}
```

## box-sizing: border-box — quy ước đặt đầu tiên trong mọi dự án

Mặc định (content-box), `width: 300px` chỉ là bề rộng của **content**; padding và border cộng thêm ra ngoài → hộp thực tế rộng `300 + 24×2 + 1×2 = 350px`. Hai cạnh nhau là 700px, vượt container 640px → vỡ layout.

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

Quy tắc trên nói: "mọi hộp, width đã bao gồm padding và border". Giờ `width: 300px` luôn là **kích thước hiển thị thật**, không còn phép cộng trừ bất ngờ. Đây là quy ước toàn ngành (Bootstrap, Tailwind đều đặt sẵn), hãy đặt ở dòng đầu CSS của bạn và không bao giờ bỏ đi.

## Margin collapse — hai lề "gặp nhau" rồi biến mất một cái

```html
<section class="services"><h2>Dịch vụ</h2></section>
<section class="doctors"><h2>Đội ngũ bác sĩ</h2></section>
```

```css
h2 { margin: 32px 0; }
```

Theo trực giác, khoảng cách giữa hai tiêu đề là `32 + 32 = 64px`. Thực tế chỉ còn **32px**: theo chiều dọc, hai margin liền kề **gộp lại** lấy giá trị lớn hơn (không cộng). Điều tương tự xảy ra khi margin con "chui qua" cha không có border/padding — cha trượt xuống dù bạn không đặt margin cho nó.

Cách xử lý thực dụng cho người mới:

- Ưu tiên **padding** cho khoảng cách bên trong section, **margin** chỉ cho khoảng cách giữa các khối độc lập.
- Tránh đặt margin dọc hai bên cho phần tử kề nhau; hãy nghĩ "mỗi hộp chỉ đẩy một lần" (ví dụ chỉ đặt `margin-bottom`).
- Khi cần cha tách hẳn khỏi con theo Box Model, thêm `padding: 1px` hoặc `display: flow-root` cho cha.

## Prompt mẫu — dùng AI đọc layout lạ qua Computed

```text
Hero section Highland Hospital của tôi bị cách xa thanh nav ~40px
dù tôi không đặt margin nào. Đây là CSS hiện tại:

.hero { padding-top: 0; }
h1 { margin: 24px 0; }

Trong DevTools tab Computed tôi thấy .hero cao 0px nhưng chữ vẫn
hiện. Hãy giải thích theo Box Model (margin collapse giữa h1 và
.hero) và cho cách sửa tối giản, không dùng !important.
```

## Thực hành

1. Mở trang Highland Hospital (HTML chương 3 + CSS bạn viết), tạo `.doctor-card` với `width: 280px; padding: 20px; border: 1px solid …; margin: 16px`. Đo bằng DevTools xem hộp rộng bao nhiêu trước và sau khi đặt `box-sizing: border-box`.
2. Chuột phải một thẻ bác sĩ → Inspect → tab **Computed**: đọc `width`, `padding`, `border`, `margin`; tô màu từng vùng ở tab **Layout** để thấy 4 lớp Box Model hiển thị trực quan.
3. Dựng hai `<h2>` liền nhau trong cùng section, cho mỗi cái `margin: 30px 0`, đo khoảng cách thật. Rồi đổi sang `margin-bottom: 30px` ở phần tử trên — ghi lại sự khác biệt.
4. Cố tình làm vỡ layout (width cố định + padding) để tự trải nghiệm, rồi sửa bằng `box-sizing`.

## Bài tiếp theo

Đã kiểm soát được kích thước từng hộp, giờ đến lúc "mặc" cho hộp đó bộ nhận diện thương hiệu: màu sắc, chữ và biến CSS dùng chung cho cả bệnh viện.
