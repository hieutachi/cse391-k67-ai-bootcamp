# Prompt cho Debug

## Mục tiêu bài học
- Viết được prompt debug theo công thức: code + hiện tượng + thứ tự nguyên nhân
- Yêu cầu AI giải thích trước khi sửa để tránh vá mù
- Kiểm chứng nguyên nhân bằng DevTools trước khi áp dụng bản sửa

## "Bị lỗi, sửa giúp" là prompt hỏng nhất

Gửi cả file kèm câu "nó bị lỗi, sửa giúp" thì AI sẽ đoán. Có khi đúng, có khi sửa nhầm chỗ và tạo thêm lỗi mới. Debug hiệu quả bắt đầu từ việc **bạn mô tả được hiện tượng** — hiện tượng chính là dữ liệu đầu vào của mọi phán đoán, của cả AI lẫn bạn.

## Công thức prompt debug 3 phần

1. **Code tối thiểu**: chỉ dán phần liên quan (HTML của modal + CSS + dòng JS khởi tạo). Không dán cả dự án; nếu lỗi nằm rải rác, nói rõ "đây là file A, phần còn lại nằm ở file B dòng 12".
2. **Hiện tượng**: mô tả *thấy gì* và *đã thử gì* — ví dụ: "Trên iPhone SE (375px), modal mở ra tràn khỏi màn hình bên phải, nút đóng nằm ngoài tầm nhìn. Desktop không sao."
3. **Thứ tự nguyên nhân khả dĩ**: tự liệt kê 2–3 nghi vấn xếp theo khả năng xảy ra, và yêu cầu AI phân tích **đúng theo thứ tự đó**. Việc này ép bạn nghĩ trước; AI nói đúng trọng tâm thay vì lan man.

Luôn kết thúc bằng: *"Trước khi đưa code sửa, hãy giải thích nguyên nhân bằng 2–3 câu."* Nếu lời giải thích không khớp hiện tượng bạn thấy thì đừng áp dụng bản sửa.

## Prompt mẫu: modal vỡ trên mobile

```text
Code: Tôi dùng Bootstrap 5 qua CDN. Modal "hủy lịch hẹn" nằm bên trong
<section> của trang Admin, section này có overflow-x: hidden. HTML modal
viết đúng cú pháp Bootstrap (data-bs-toggle, data-bs-target).
Hiện tượng: trên màn hình <= 480px, khi mở modal, lớp phủ và hộp modal
bị lệch, nội dung không cuộn được, nút Đóng nằm ngoài màn hình. Desktop
bình thường.
Thứ tự nguyên nhân khả dĩ của tôi:
1. Modal bị kẹt trong phần tử cha có overflow/transform nên bị cắt.
2. CSS của tôi (style.css) ghi đè position/width của .modal.
3. JavaScript không khởi tạo được do lỗi ở nơi khác.
Yêu cầu: phân tích theo đúng thứ tự trên, xác định nguyên nhân có khả
năng nhất, giải thích ngắn gọn rồi mới đưa bản sửa tối thiểu.
```

Nguyên nhân số 1 là thủ phạm kinh điển: modal Bootstrap dùng `position: fixed`, nhưng khi nằm trong phần tử cha có `transform`, `filter`, `overflow` hay `contain`, nó bị "bẫy" vào phần tử đó và vỡ layout. Sửa chuẩn: đưa modal ra làm con trực tiếp của `<body>`:

```html
<body>
  <!-- Toàn bộ trang Admin -->

  <!-- Modal đặt ngay dưới <body>, không nằm trong section nào -->
  <div class="modal fade" id="cancelModal" tabindex="-1"
       aria-labelledby="cancelModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="cancelModalLabel">Huỷ lịch hẹn?</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body">
          Lịch hẹn của bệnh nhân sẽ bị xoá. Hành động này không thể hoàn tác.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Giữ lịch</button>
          <button type="button" class="btn btn-danger" id="confirmCancel">Xác nhận huỷ</button>
        </div>
      </div>
    </div>
  </div>
</body>
```

Nếu vẫn lỗi, chuyển sang nghi vấn 2 và 3 rồi kiểm chứng bằng DevTools: tab Elements chọn `.modal` xem computed `position` có còn `fixed` không; tab Console xem có lỗi đỏ xuất hiện trước lúc mở modal không.

## Mẹo: chia đôi để khoanh vùng

Lỗi "cả trang" thường không cần AI phân tích 500 dòng. Tự khoanh vùng trước: comment nửa file, xem lỗi còn không, rồi chỉ dán nửa có lỗi vào prompt. Prompt ngắn + đúng trọng tâm luôn cho kết quả tốt hơn prompt dài + mơ hồ.

## Thực hành
Cố tình tạo lỗi: bọc modal "Xác nhận đặt lịch" của bạn trong một `<div style="transform: translateX(0)">`. Mở ở chế độ thiết bị mobile (DevTools, biểu tượng chiếc điện thoại), ghi lại hiện tượng, rồi viết prompt debug theo công thức 3 phần và đối chiếu với bản sửa AI trả về.

## Bài tiếp theo

Đã đủ công cụ viết prompt cho cả dựng mới lẫn sửa lỗi; bài cuối chương — *Workshop: viết prompt cắt giao diện* — sẽ ép bạn thực hành cả ba loại trên ba tình huống thật.
