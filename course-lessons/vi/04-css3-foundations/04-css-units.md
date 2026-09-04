# Đơn vị đo trong CSS

## Mục tiêu bài học
- Phân biệt đơn vị tuyệt đối và tương đối: px, %, rem, em, vh, vw, vmin, vmax
- Biết quy tắc chọn đơn vị: rem cho chữ, % cho width, vh cho chiều cao màn hình
- Dựng hero full-screen Highland Hospital với đơn vị đúng

## Nhìn nhanh các đơn vị

| Đơn vị | Tương đối với | Dùng khi |
|---|---|---|
| `px` | điểm ảnh (tuyệt đối) | viền, bóng đổ, bán kính bo góc, kích thước tối thiểu |
| `rem` | font-size của `:root` (16px) | cỡ chữ, khoảng cách lớn |
| `em` | font-size của **phần tử cha** | padding theo cỡ chữ cục bộ, `max-width` của chữ |
| `%` | thuộc tính cùng loại của cha | width, height của layout |
| `vh` / `vw` | 1% chiều cao / rộng viewport | hero full-screen, overlay toàn màn |
| `vmin` / `vmax` | 1% cạnh nhỏ / cạnh lớn của viewport | hình vuông luôn vừa màn hình |

## Quy tắc quyết định — hỏi "nó nên phụ thuộc vào gì?"

**Chữ → `rem`.** Nếu đổi cỡ chữ gốc (`html { font-size: 18px }`) hoặc người dùng phóng to chữ, toàn bộ hệ chữ co giãn theo — layout giữ tỷ lệ. `px` cho font-size là cách nhanh nhất để phá vỡ accessibility.

**Bề rộng layout → `%`.** `width: 100%` luôn là "vừa khít cha", không bao giờ tràn ra ngoài ở màn hình bất kỳ. `max-width: 1100px` chặn dòng chữ quá dài trên màn hình lớn:

```css
.container {
  width: 100%;            /* co giãn theo màn hình */
  max-width: 1100px;      /* nhưng không quá 1100px */
  margin-inline: auto;    /* căn giữa */
}
```

**`em` dùng có chủ đích** — thường cho padding "tự co" theo cỡ chữ của chính phần tử:

```css
.btn { font-size: 1rem; padding: 0.6em 1.4em; }
```

Nút to hơn (font-size 1.25rem) tự có padding to tương ứng mà không cần viết lại.

## Hero full-screen — đơn vị cho chiều cao

Hero Highland Hospital nên lấp gần hết màn hình đầu tiên:

```css
.hero {
  min-height: 100vh;      /* tối thiểu bằng chiều cao viewport */
  display: flex;
  align-items: center;    /* nội dung nằm giữa theo chiều dọc */
  padding: clamp(4rem, 10vh, 8rem) 1rem;  /* thoáng trên mobile */
}
```

Vì sao `min-height: 100vh` chứ không `height: 100vh`? Với `height` cứng, nội dung dài hơn viewport sẽ **tràn**; `min-height` cho phép hero nở thêm khi cần — điều gần như luôn xảy ra trên điện thoại nhỏ. `100vh` có nhược điểm nhỏ trên mobile (thanh địa chỉ trình duyệt), ta sẽ xử lý bằng `100dvh` khi học Responsive ở chương 6.

So sánh nhanh cho vùng nội dung:

```css
/* SAI về ý đồ: cứng 80% màn hình — nội dung dài sẽ tràn */
.hero-content { height: 80vh; }

/* ĐÚNG: nội dung tự quyết chiều cao, chỉ căn giữa theo chiều dọc */
.hero-content { margin-block: auto; }
```

## Prompt mẫu — hỏi AI chọn đơn vị

```text
Tôi đang dựng hero Highland Hospital: nền gradient, tiêu đề 1 dòng,
mô tả 2 dòng, 2 nút CTA. Tôi băn khoăn đơn vị cho: cỡ chữ h1,
padding của .hero, khoảng cách giữa mô tả và nút, chiều cao hero.
Hãy đưa ra từng thuộc tính kèm đơn vị đề xuất (rem/em/%/vh/clamp),
giải thích vì sao, và cảnh báo trường hợp nào sẽ vỡ trên mobile.
Trả lời bằng bảng, không cần viết toàn bộ CSS.
```

## Thực hành

1. Đặt `html { font-size: 16px }` rồi lần lượt thử `html { font-size: 20px }` — quan sát toàn bộ trang co giãn vì mọi kích thước đều `rem`.
2. Tạo vùng `.hero` với `min-height: 100vh`, nền xanh `var(--hh-primary)`, tiêu đề `3rem`, đoạn mô tả `1.125rem`, nút CTA có padding `em`.
3. Thêm một phần tử `.full-bleed-banner { width: 100vw; }` và đặt nó trong container có padding — ghi lại hiện tượng tràn ngang; sửa lại bằng cách dùng `width: 100%` bên trong.
4. Mở DevTools, thay đổi giá trị đơn vị của `.hero` (100vh → 100% → 60vh) và ghi nhận khác biệt khi kéo cửa sổ nhỏ lại.

## Bài tiếp theo

Đủ kiến thức nền để làm sản phẩm đầu tiên ra "sản phẩm thật": Lab dựng Hero section hoàn chỉnh cho Highland Hospital, gộp Box Model, màu, token và đơn vị vào một file CSS sạch.
