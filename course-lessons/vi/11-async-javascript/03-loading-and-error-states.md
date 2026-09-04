# Loading & Error states

## Mục tiêu bài học
- Nắm nguyên tắc: mọi thao tác tải dữ liệu có 3 trạng thái — loading, thành công, lỗi
- Hiển thị spinner bằng Bootstrap `spinner-border`, nâng cao với skeleton
- Xử lý lỗi bằng `try/catch` + alert Bootstrap kèm nút **Retry**
- Không bao giờ để giao diện "treo" im lặng trong lúc chờ hay khi lỗi

## Vì sao không được để giao diện im lặng?

Gọi API mất thời gian — nếu chỉ render khi có dữ liệu, người dùng nhìn vào **vùng trống rỗng** và không biết: đang tải? treo? lỗi? Quy ước chuyên nghiệp: mỗi vùng dữ liệu luôn ở một trong ba trạng thái rõ ràng:

| Trạng thái | Giao diện | Khi nào |
|---|---|---|
| **Loading** | spinner / skeleton | đang chờ API |
| **Success** | nội dung thật | có dữ liệu |
| **Error** | alert + nút retry | fetch thất bại |

## Trạng thái Loading

Bootstrap có sẵn spinner chỉ với một thẻ:

```html
<div id="doctors-loading" class="text-center py-4">
  <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Đang tải…</span>
  </div>
  <p class="text-muted mt-2 mb-0">Đang tải danh sách bác sĩ…</p>
</div>
```

Bật/tắt bằng `classList` (đã học ở bài DOM):

```js
const loadingBox = document.querySelector('#doctors-loading');
const container = document.querySelector('#doctors-container');
loadingBox.classList.remove('d-none');     // bật spinner trước khi gọi API
container.classList.add('d-none');          // giấu nội dung cũ
```

**Skeleton** tinh tế hơn: dựng sẵn hình dáng placeholder nhấp nháy giống layout thật — mắt cảm nhận trang "sắp có nội dung" thay vì "đang tải rỗng". HTML + CSS thuần:

```html
<div id="doctors-skeleton" class="row g-4 d-none" aria-hidden="true">
  <div class="col-md-4"><div class="card"><div class="card-body">
    <div class="skeleton-line skeleton-avatar mb-3"></div>
    <div class="skeleton-line w-75 mb-2"></div>
    <div class="skeleton-line w-50"></div>
  </div></div></div>
</div>
```

```css
.skeleton-line {
  height: 14px; border-radius: 4px;
  background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
```

## Trạng thái Error: alert + nút retry

```js
async function loadDoctors() {
  const loading = document.querySelector('#doctors-loading');
  const container = document.querySelector('#doctors-container');
  const errorBox = document.querySelector('#doctors-error');

  // 1. bật loading, giấu lỗi cũ
  loading.classList.remove('d-none');
  container.classList.add('d-none');
  errorBox.classList.add('d-none');

  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) throw new Error(`Lỗi ${response.status}`);
    const doctors = await response.json();

    // 2. thành công: tắt loading, render
    loading.classList.add('d-none');
    renderDoctors(doctors);
    container.classList.remove('d-none');
  } catch (error) {
    // 3. lỗi: tắt loading, hiện alert
    loading.classList.add('d-none');
    errorBox.classList.remove('d-none');
    console.error('Tải bác sĩ thất bại:', error);
  }
}
```

Alert lỗi trong HTML, kèm nút **Thử lại**:

```html
<div id="doctors-error" class="alert alert-danger d-none" role="alert">
  <h5 class="alert-heading">Không tải được danh sách bác sĩ</h5>
  <p class="mb-2">Kiểm tra kết nối mạng hoặc xem JSON Server đã chạy chưa.</p>
  <button id="btn-retry-doctors" class="btn btn-outline-danger btn-sm">↻ Thử lại</button>
</div>
```

```js
document.querySelector('#btn-retry-doctors').addEventListener('click', loadDoctors);
```

Điểm hay: nút retry chỉ cần gọi **lại chính hàm `loadDoctors`** — cả ba trạng thái tự chạy lại từ đầu vì chúng nằm trong một hàm duy nhất. Khi mạng lỗi, người dùng thấy thông báo rõ ràng và có hành động làm tiếp — không bao giờ "treo".

## Prompt AI mẫu

```text
Dự án Highland Hospital (Bootstrap 5, JS thuần ES6+). Viết loadDoctors()
fetch "http://localhost:3000/doctors" (JSON Server) với đủ 3 trạng thái:
(1) spinner-border hiện trong #doctors-loading trước khi fetch; (2) thành
công thì render card vào #doctors-container rồi ẩn spinner; (3) lỗi
(network hoặc !response.ok) thì ẩn spinner, hiện alert-danger #doctors-error
kèm nút "Thử lại" gọi lại loadDoctors(). Không dùng innerHTML để render
dữ liệu người dùng. Kèm HTML mẫu cho 3 vùng loading/container/error.
```

## Thực hành
1. Thêm vùng loading + error vào trang danh sách bác sĩ theo mẫu.
2. Chạy JSON Server, tải lại trang — spinner hiện rồi biến mất khi có dữ liệu.
3. **Tắt JSON Server** rồi bấm Thử lại: alert hiện đúng lúc, Console chỉ có log bạn chủ động ghi.
4. Nâng cấp spinner thành skeleton 3 cột và quan sát hiệu ứng shimmer.

## Bài tiếp theo

Xử lý async đã vững — giờ ráp vào form đặt lịch: chia thành 3 bước với state, nút Tiếp tục/Quay lại và progress indicator trong bài kế tiếp.
