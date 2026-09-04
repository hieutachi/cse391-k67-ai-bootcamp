# Fetch API & Async/Await

## Mục tiêu bài học
- Hiểu `fetch` trả về `Promise` và vì sao gọi API bắt buộc phải xử lý bất đồng bộ
- Viết đúng cú pháp `async` / `await` kết hợp `response.json()`
- Xử lý lỗi bằng `try/catch` để trang không crash khi API lỗi
- Fetch danh sách lịch hẹn từ một API giả của Highland Hospital

## Vì sao cần async khi gọi API?

Khi gọi API, dữ liệu phải đi qua mạng — có thể mất vài trăm mili giây tới vài giây. JavaScript chạy **một luồng duy nhất**: nếu nó ngồi chờ câu trả lời thì toàn bộ trang (cuộn chuột, gõ phím, bấm nút) đứng hình. Nên trình duyệt trả về ngay một **`Promise`** — "tờ phiếu hẹn" cho biết *sẽ có* dữ liệu hoặc lỗi trong tương lai — và code của bạn tiếp tục chạy tiếp.

`async`/`await` là cách viết gọn gàng để nói: "đợi tờ phiếu này được thanh toán rồi mới đi tiếp", mà không chặn trang:

```js
async function loadAppointments() {
  const response = await fetch('http://localhost:3000/appointments');
  const appointments = await response.json();
  return appointments;
}
```

Luật cú pháp quan trọng (AI hay quên, bạn phải nhớ):

- `await` **chỉ dùng được bên trong hàm `async`** — nếu dùng ở ngoài sẽ báo lỗi cú pháp.
- Hàm `async` **luôn trả về một `Promise`** — chỗ gọi nó phải dùng `await` (trong hàm async khác) hoặc `.then()`.
- Phải `await response.json()` — `fetch` xong mới có *header* của phản hồi, còn *thân dữ liệu* thì phải đọc tiếp.

## fetch trả về gì — và cạm bẫy "HTTP 404"

```js
async function fetchAppointments() {
  try {
    const response = await fetch('http://localhost:3000/appointments');

    // fetch KHÔNG ném lỗi khi server trả 404/500 — phải tự kiểm tra
    if (!response.ok) {
      throw new Error(`API trả lỗi ${response.status}`);
    }

    const appointments = await response.json();
    renderAppointments(appointments);
  } catch (error) {
    console.error('Không tải được lịch hẹn:', error);
  }
}
```

Điểm dễ trượt nhất: `fetch` chỉ *reject* khi **mạng** lỗi (mất mạng, sai địa chỉ). Server trả `404` hay `500` vẫn được tính là "thành công về mặt mạng" — nên bạn phải tự kiểm tra `response.ok` (true khi status 200–299) rồi tự ném lỗi.

## try/catch — bắt lỗi trước khi nó làm chết trang

Mọi thứ "đi ra ngoài" — mạng, server — đều có thể lỗi bất cứ lúc nào. Không có `try/catch`, một lỗi nhỏ trong `fetch` sẽ làm dừng toàn bộ script phía sau. Luồng chuẩn:

```js
async function init() {
  try {
    const appointments = await fetchAppointments();
    renderAppointments(appointments);
  } catch (error) {
    showErrorMessage('Không tải được dữ liệu. Vui lòng thử lại sau.');
  }
}

init();
```

Lưu ý: nếu bạn viết `async function` rồi gọi mà không `await`, lỗi sẽ rơi vào "unhandled promise rejection" và `try/catch` bên ngoài không bắt được — luôn `await` lời gọi ở nơi gọi.

## Prompt AI mẫu

```text
Dự án Highland Hospital, JS thuần ES6+ chạy trong trình duyệt (không
framework). Viết hàm async loadAppointments(): fetch GET
"http://localhost:3000/appointments" (JSON Server), kiểm tra
response.ok, trả về mảng appointment qua response.json(). Viết thêm
hàm renderAppointments(list) đổ vào ul#appointment-list bằng createElement
+ textContent (KHÔNG dùng innerHTML). Ở ngoài cùng gọi trong try/catch,
khi lỗi thì console.error. Giải thích 3 dòng vì sao phải async/await
và vì sao phải kiểm tra response.ok.
```

Chạy prompt rồi đọc từng dòng: nếu AI quên `response.ok`, quên `await`, hay lén dùng `innerHTML`, hãy tự sửa trước khi chạy.

## Thực hành
1. Trong Console, gõ `fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()).then(console.log)` để thấy Promise hoạt động.
2. Viết `loadAppointments()` theo prompt; thử mở tab Network → chọn Fetch/XHR để xem request `GET` và status `200`.
3. Đổi URL thành `http://localhost:3000/appointments-sai` và quan sát lỗi 404 — xác nhận code của bạn báo lỗi rõ ràng chứ không im lặng.
4. Chuẩn bị endpoint giả: bài kế tiếp sẽ dựng JSON Server để có dữ liệu thật để fetch.

## Bài tiếp theo

`fetch` giờ cần một cái đích thật để bắn tới — bài sau dựng mock REST API bằng JSON Server với các endpoint `/doctors` và `/appointments`.
