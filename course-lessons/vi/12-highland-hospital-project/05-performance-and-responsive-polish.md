# Tối ưu hiệu năng & Responsive

## Mục tiêu bài học
- Đo hiệu năng bằng Lighthouse trong DevTools và biết đọc kết quả
- Tối ưu hình ảnh: lazy loading, kích thước đúng chỗ dùng — giảm layout shift
- Kiểm tra responsive toàn bộ 3 trang ở 320 / 768 / 1024 / 1440 px
- Áp dụng accessibility cơ bản: contrast, alt, label, focus

## Chức năng xong rồi — giờ là chất lượng

Bài 02–04 giúp trang **chạy được**. Bài này giúp trang **chạy tốt**: mở nhanh trên mạng 3G, không giật layout, đọc được bằng screen reader, dùng được bằng bàn phím. Đây cũng là nhóm tiêu chí mà nhà tuyển dụng và khách hàng hay kiểm tra nhất.

## Đo bằng Lighthouse

Lighthouse là công cụ audit miễn phí có sẵn trong Chrome:

1. Mở `index.html` bằng Live Server (phải chạy qua HTTP, không phải `file://`).
2. DevTools (F12) → tab **Lighthouse**.
3. Chọn **Mobile**, loại **Pages**, bấm *Analyze page load*.
4. Chờ ~30 giây, đọc 4 chỉ số: **Performance, Accessibility, Best Practices, SEO** — mỗi chỉ số từ 0–100.

Lần chạy đầu tiên thường báo 3 vấn đề quen thuộc — ghi lại điểm số trước khi sửa để sau này so sánh:

| Vấn đề Lighthouse hay báo | Nghĩa là gì | Cách xử lý |
|---|---|---|
| "Images: display next-gen formats" | Ảnh JPEG/PNG nặng | Chuyển sang WebP/AVIF, nén |
| "Properly size images" | Ảnh gửi về to hơn chỗ hiển thị | Cấp ảnh đúng kích thước + `srcset` |
| "Eliminate render-blocking resources" | CSS/JS chặn render | Giữ CDN, thêm `defer` cho JS |
| "Preload Largest Contentful Paint image" | Ảnh hero tải quá muộn | Đặt ảnh hero tải sớm (mặc định) |

## Hình ảnh: lazy loading + đúng kích thước

Quy tắc vàng của hình ảnh trên web: **chỉ tải thứ người dùng sắp nhìn thấy, và chỉ tải đúng độ phân giải cần dùng**.

### 1. Lazy loading ảnh dưới fold

Ảnh hero (xuất hiện ngay khi mở trang) phải tải ngay; mọi ảnh **dưới vùng nhìn đầu tiên** — chân dung bác sĩ, ảnh trong testimonials — nên trì hoãn:

```html
<!-- Landing: ảnh bác sĩ do JS render — thêm loading="lazy" ngay trong template -->
<img src="${d.avatar}" alt="Ảnh ${d.name}"
     loading="lazy" width="400" height="300" class="card-img-top doctor-avatar">
```

Thêm **`width` + `height`** cho mọi ảnh: trình duyệt dành sẵn đúng khoảng trống đó trước khi ảnh về, chống layout shift (điểm CLS trong Lighthouse). Lưu ý: kích thước khai báo là kích thước gốc của file ảnh, CSS vẫn tự co ảnh cho vừa card.

### 2. Nguồn ảnh linh hoạt

Tạo 2 bản ảnh (bản 400px cho mobile, bản 800px cho desktop) rồi để trình duyệt tự chọn:

```html
<img src="img/hero-800.webp"
     srcset="img/hero-400.webp 400w, img/hero-800.webp 800w"
     sizes="(max-width: 992px) 100vw, 50vw"
     width="800" height="500"
     fetchpriority="high"
     alt="Đội ngũ bác sĩ Highland Hospital tại sảnh bệnh viện">
```

Giải thích nhanh: `srcset` + `sizes` là cơ chế trình duyệt chọn file ảnh theo màn hình; `fetchpriority="high"` báo trình duyệt ưu tiên tải ảnh này (dùng cho ảnh hero duy nhất, không dùng tràn lan).

## Giảm layout shift & render nhanh

- **Đặt `width`/`height`** cho mọi ảnh (đã làm ở trên) — nguyên nhân số một của layout shift.
- **Không chèn nội dung vào giữa trang sau khi đã vẽ** — render lưới bác sĩ vào một container có chiều cao dự kiến thay vì để trang "nhảy" khi JS chạy.
- **Giữ navbar `fixed-top` nhưng nhớ `scroll-padding-top`** (đã làm ở bài 02).
- **JS `defer`** (đã làm ở bài 03) — trình duyệt vẽ trang trước, chạy script sau.

Toàn bộ các mẹo trên nằm trong nhóm "Core Web Vitals": **LCP** (ảnh hero tải nhanh), **CLS** (trang không nhảy), **INP** (bấm nút phản hồi tức thì) — chạy lại Lighthouse sau khi sửa, cả 3 nhóm này phải xanh.

## Kiểm tra responsive 4 mốc

Mở chế độ responsive trong DevTools (Ctrl+Shift+M) và duyệt **cả 3 trang** (index, booking, admin) ở 4 mốc:

| Mốc | Thiết bị điển hình | Điều cần xác nhận trên Highland |
|---|---|---|
| **320px** | iPhone SE / Android cũ | Navbar gọn thành hamburger; card 1 cột; không tràn ngang (không có thanh cuộn ngang); nút vừa chạm |
| **768px** | iPad dọc | Services/doctors 2 cột; form đặt lịch không bị bóp |
| **1024px** | iPad ngang / laptop nhỏ | Doctors 3 cột; bảng admin có cuộn ngang trong `table-responsive` |
| **1440px** | Desktop phổ biến | Container căn giữa đẹp; ảnh không vỡ, không giãn méo |

Cách kiểm tra nhanh hiện tượng tràn: kéo ngang trang ở 320px — nếu có thanh cuộn ngang, dùng DevTools Elements để tìm phần tử thừa, hoặc gõ trong Console:

```js
// Tìm phần tử rộng hơn viewport — nguyên nhân gây tràn ngang
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.warn('Tràn ngang:', el.tagName, el.className, el.scrollWidth);
  }
});
```

## Accessibility cơ bản — đủ dùng là chuẩn

Bốn kiểm tra nhanh, sửa được ngay trên dự án của bạn:

1. **Contrast** — chữ xám nhạt trên nền trắng (`text-secondary` mặc định của Bootstrap) có thể dưới chuẩn 4.5:1 với chữ nhỏ. Kiểm tra bằng Lighthouse hoặc tiện ích *axe DevTools*. Cách chữa nhanh: thay `text-secondary` bằng `text-body-secondary` (tối hơn vừa đủ) hoặc tự đặt màu `#4b5563` trong `css/style.css`.
2. **`alt` mô tả được nội dung** — `alt="Ảnh bác sĩ"` là chưa đủ; phải là `alt="BS. Nguyễn Văn An — chuyên khoa Tim mạch"`. Ảnh trang trí thuần tuý dùng `alt=""` để screen reader bỏ qua.
3. **Label cho mọi input** — mỗi ô nhập phải có `<label>` với `for` khớp `id`, hoặc `aria-label`; nút chỉ có icon phải có `title` hoặc `aria-label` (nút ✓ / ✕ / 🗑 ở bảng admin chính là điểm hay bị quên).
4. **Focus nhìn thấy được** — dùng phím `Tab` đi hết trang: mọi link/nút phải có viền focus rõ (Bootstrap có sẵn `:focus-visible`; đừng viết CSS xoá outline).

```html
<!-- Ví dụ sửa cho nút icon ở bảng admin -->
<button class="btn btn-sm btn-outline-danger" data-action="delete"
        aria-label="Xoá lịch hẹn của ${a.patient}">🗑</button>
```

## Prompt AI rà soát

```text
Rà soát giúp tôi trang web Highland Hospital (tôi dán toàn bộ index.html,
css/style.css và js/main.js). Kiểm tra và liệt kê theo mức độ ưu tiên:

1. Accessibility: thẻ semantic, heading cấp, alt ảnh, label form, aria-*, focus
2. Hiệu năng: ảnh thiếu width/height hoặc loading="lazy", tài nguyên chặn render
3. Responsive: class col không nhất quán, text/container có thể tràn ở 320px
4. Lỗi HTML: thẻ lồng sai, id trùng, thuộc tính sai

Mỗi lỗi cho: vị trí (dòng/section), vì sao là lỗi, và đoạn sửa cụ thể.
Đừng viết lại cả file — chỉ liệt kê vấn đề và chỗ cần sửa.
```

## Thực hành

1. Chạy Lighthouse cho cả 3 trang, chụp lại điểm số ban đầu.
2. Sửa ảnh: thêm `width`/`height`, `loading="lazy"` cho ảnh bác sĩ, chuyển 2–3 ảnh sang WebP (dùng ảnh placeholder miễn phí là được).
3. Sửa hết lỗi contrast và `aria-label` cho nút icon trong bảng admin.
4. Duyệt 4 mốc 320/768/1024/1440 cho cả 3 trang, chạy đoạn Console tìm phần tử tràn và sửa.
5. Chạy lại Lighthouse — ghi lại điểm mới và so sánh; mục tiêu ≥ 90 Performance và 100 Accessibility trên bản đã nén ảnh.
6. Chạy prompt rà soát ở trên và xử lý 3 lỗi quan trọng nhất AI tìm được (sau khi tự kiểm chứng).

## Bài tiếp theo

Dự án đã chạy nhanh và mượt trên mọi màn hình. Bài cuối cùng — *Tư duy component & hướng đi tiếp theo* — sẽ soi lại toàn bộ dự án dưới góc component, chỉ đường sang React/Vue/Angular và cách deploy sản phẩm lên mạng.
