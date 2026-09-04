# Event Handling & Delegation

## Mục tiêu bài học
- Đăng ký hành vi cho phần tử bằng `addEventListener`
- Làm quen các sự kiện thường gặp: `click`, `input`, `submit`, `change`, `scroll`
- Đọc sự kiện qua event object: `target`, `preventDefault()`
- Hiểu Event Delegation — một listener trên container thay cho N listener con

## addEventListener — "khi X xảy ra thì làm Y"

```js
const searchInput = document.querySelector('#search-doctor');

searchInput.addEventListener('input', (event) => {
  console.log('Người dùng đang gõ:', event.target.value);
});
```

Cú pháp: `element.addEventListener('tên sự kiện', handler)`. Handler nhận một **event object** — vật mang thông tin về sự việc vừa xảy ra.

| Sự kiện | Kích hoạt khi | Dùng cho |
|---|---|---|
| `click` | bấm chuột / chạm | nút, card, liên kết |
| `input` | gõ phím, thay đổi giá trị | ô tìm kiếm, live filter |
| `change` | kết thúc thay đổi (blur, chọn xong) | `<select>`, checkbox |
| `submit` | bấm nút submit trong form | form đặt lịch |
| `scroll` | cuộn trang / vùng chứa | sticky header, lazy load |

## Event object: target và preventDefault

```js
document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();          // chặn trình duyệt tự reload trang
  const form = event.currentTarget;
  const patientName = form.querySelector('#patient-name').value.trim();
  console.log('Đặt lịch cho:', patientName);
});
```

- `event.target` — phần tử gốc rễ *thực sự* bị bấm/gõ (có thể là một node con sâu bên trong).
- `event.preventDefault()` — chặn hành vi mặc định: form không reload, link không nhảy trang, checkbox không đổi trạng thái. Form `<form>` mà không gọi dòng này sẽ **reload lại trang** và mất hết trạng thái — lỗi kinh điển của người mới.

## Event Delegation — một tai nghe cho cả hội trường

Khi danh sách được render bằng JavaScript (chương 9), các nút **"Đặt lịch"** trên card **chưa tồn tại lúc trang tải** — nên gắn `addEventListener` trực tiếp lên chúng sẽ không bao giờ chạy. Giải pháp: gắn listener lên **container tồn tại từ đầu**, rồi dùng `event.target` để đoán xem cú click có rơi vào nút không.

Sự kiện trong DOM *nổi bọt* (bubbling): click vào nút con sẽ trồi lên qua các phần tử cha cho tới `document`. Nghe ở cha tức là nghe được mọi thứ diễn ra ở con — kể cả con được thêm vào sau này.

```js
// Ví dụ: danh sách lịch hẹn — mỗi dòng có nút xoá .btn-delete
const appointmentList = document.querySelector('#appointment-list');

appointmentList.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.btn-delete');
  if (!deleteBtn) return;                    // click không rơi vào nút xoá → bỏ qua

  const row = deleteBtn.closest('li');       // tìm nguyên dòng lịch hẹn
  const id = row.dataset.id;                 // đọc id từ data-*
  row.remove();

  console.log(`Đã xoá lịch hẹn #${id} — bước 4 sẽ lưu thay đổi vào localStorage`);
});
```

- `closest('.btn-delete')` — đi *ngược lên* từ `event.target` tìm phần tử khớp selector; không khớp thì trả `null`. Nhờ đó bạn không cần biết người dùng bấm đúng vào chữ hay vào icon trong nút.
- Vì chỉ có **một** listener trên container, bạn không phải gỡ/gắn lại listener mỗi lần render lại danh sách — đây là lý do delegation được dùng ở khắp nơi.

## Prompt AI mẫu

```text
Dự án Highland Hospital, danh sách lịch hẹn được render bằng JS vào
ul#appointment-list, mỗi <li> có data-id và nút xoá class "btn-delete".
Viết JS dùng Event Delegation: gắn MỘT listener click vào ul,
dùng event.target.closest('.btn-delete') để nhận diện nút xoá, xoá <li>
tương ứng và log id. Kèm 3 dòng giải thích vì sao không gắn listener
trực tiếp lên từng nút.
```

## Thực hành
1. Render 5 lịch hẹn mẫu vào `#appointment-list`, mỗi dòng kèm nút xoá.
2. Gắn listener theo delegation như trên, kiểm tra xoá được dòng đúng.
3. Thử thách: trước khi xoá, gọi `event.preventDefault()` không có tác dụng với `click` — hãy thêm `confirm('Xoá lịch hẹn này?')` và chỉ xoá khi người dùng đồng ý.
4. Thêm một ô input lọc và quan sát sự kiện `input` log từng ký tự.

## Bài tiếp theo

Đã bắt được sự kiện `submit` — bài sau ta dùng nó cho việc quan trọng nhất của form đặt lịch: kiểm tra dữ liệu phía client và hiển thị lỗi đúng chỗ.
