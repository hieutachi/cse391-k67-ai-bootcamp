# Lab: bộ lọc bác sĩ theo chuyên khoa

## Mục tiêu bài học
- Tổng hợp DOM, sự kiện và array methods vào một tính năng thật
- Lọc mảng `doctors` theo `select` chuyên khoa + ô tìm kiếm, rồi render lại card
- Dùng Event Delegation cho nút "Đặt lịch" trên từng card
- Thực hành AI-Accelerated Workflow: prompt AI sinh code, sau đó tự phân tích và sửa

## Bài toán

Landing Page có section "Đội ngũ bác sĩ". Bệnh nhân cần: (1) chọn chuyên khoa → chỉ thấy bác sĩ khoa đó; (2) gõ ô tìm kiếm → lọc theo tên/chuyên khoa; (3) bấm **"Đặt lịch"** trên card → chuyển tới form đặt lịch. Hai bộ lọc **kết hợp** được với nhau, mỗi lần đổi giá trị là render lại từ dữ liệu.

## Dữ liệu và HTML nền

```js
const doctors = [
  { id: 1, name: 'BS. Nguyễn Thu Hà', specialty: 'Tim mạch', experience: 12 },
  { id: 2, name: 'BS. Trần Minh Khang', specialty: 'Nội tổng hợp', experience: 8 },
  { id: 3, name: 'BS. Lê Hoàng Yến', specialty: 'Tim mạch', experience: 5 },
  { id: 4, name: 'BS. Phạm Quốc Bảo', specialty: 'Nhi', experience: 15 },
];
```

```html
<div class="row g-3 mb-4">
  <div class="col-md-4">
    <label for="filter-specialty" class="form-label">Chuyên khoa</label>
    <select id="filter-specialty" class="form-select">
      <option value="">Tất cả chuyên khoa</option>
    </select>
  </div>
  <div class="col-md-8">
    <label for="search-doctor" class="form-label">Tìm bác sĩ</label>
    <input type="search" id="search-doctor" class="form-control"
           placeholder="Nhập tên hoặc chuyên khoa…">
  </div>
</div>
<div id="doctors-grid" class="row g-4"></div>
```

## Lọc + render: mọi thứ chảy qua một hàm

Nguyên tắc của lab: **không** tô/xoá trực tiếp trên card cũ — mỗi lần dữ liệu thay đổi, tính lại danh sách phù hợp rồi **render lại toàn bộ lưới**. Dữ liệu là nguồn chân lý, DOM chỉ là bản vẽ lại.

```js
const specialtySelect = document.querySelector('#filter-specialty');
const searchInput = document.querySelector('#search-doctor');
const grid = document.querySelector('#doctors-grid');

// Nạp chuyên khoa duy nhất vào select (Set để loại trùng)
[...new Set(doctors.map((doc) => doc.specialty))].forEach((specialty) => {
  const option = document.createElement('option');
  option.value = specialty;
  option.textContent = specialty;
  specialtySelect.append(option);
});

function getFilteredDoctors() {
  const specialty = specialtySelect.value;
  const keyword = searchInput.value.trim().toLowerCase();
  return doctors.filter((doc) => {
    const matchSpecialty = specialty === '' || doc.specialty === specialty;
    const matchKeyword = keyword === '' ||
      doc.name.toLowerCase().includes(keyword) ||
      doc.specialty.toLowerCase().includes(keyword);
    return matchSpecialty && matchKeyword;   // hai điều kiện cùng lúc (AND)
  });
}

function renderDoctors(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<div class="col-12"><p class="text-muted">Không tìm thấy bác sĩ phù hợp.</p></div>';
    return;
  }
  for (const doctor of list) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm doctor-card" data-id="${doctor.id}">
        <div class="card-body">
          <h3 class="h6 card-title">${doctor.name}</h3>
          <p class="text-muted small mb-1">${doctor.specialty}</p>
          <p class="small mb-3">${doctor.experience} năm kinh nghiệm</p>
          <button type="button" class="btn btn-sm btn-primary btn-book">Đặt lịch</button>
        </div>
      </div>`;
    grid.append(col);
  }
}
```

Chú ý: tên bác sĩ nằm trong **mảng dữ liệu do bạn kiểm soát**, không phải dữ liệu người dùng nhập — nên template literal cho gọn là chấp nhận được. Render dữ liệu người dùng (tên bệnh nhân, feedback…) thì quay lại `createElement` + `textContent` như bài DOM.

## Nối sự kiện

```js
// Hai bộ lọc: hễ đổi giá trị là render lại — ít code, không sót trường hợp
specialtySelect.addEventListener('change', () => renderDoctors(getFilteredDoctors()));
searchInput.addEventListener('input', () => renderDoctors(getFilteredDoctors()));

// Nút "Đặt lịch" sinh ra sau khi render → bắt buộc delegation trên container
grid.addEventListener('click', (event) => {
  const bookButton = event.target.closest('.btn-book');
  if (!bookButton) return;
  const card = bookButton.closest('.doctor-card');
  const doctor = doctors.find((doc) => doc.id === Number(card.dataset.id));
  console.log('Đặt lịch với:', doctor.name, `(#${doctor.id})`);
  // chương 11: chỗ này sẽ mở form đặt lịch đa bước kèm sẵn bác sĩ đã chọn
});
```

## Prompt AI mẫu — rồi tự phân tích

```text
Dự án Highland Hospital, JS thuần ES6+. Có mảng doctors = [{id, name,
specialty, experience}] và HTML gồm select#filter-specialty (đã có option
theo chuyên khoa), input#search-doctor, div#doctors-grid. Viết JS:
(1) getFilteredDoctors() kết hợp lọc specialty + từ khoá tên/chuyên khoa
không phân biệt hoa thường; (2) renderDoctors() dựng card Bootstrap có nút
.btn-book và data-id; (3) lắng nghe change + input để render lại;
(4) Event Delegation trên grid bắt click .btn-book. Không thêm thư viện.
```

Code AI trả về, đừng chạy ngay — tự phân tích theo AI-Accelerated Workflow:

1. Render lại có đúng khi **cả hai** điều kiện cùng bật (chọn khoa + đang gõ chữ)?
2. Có xử lý danh sách rỗng hay để lưới trống trơn?
3. Nút Đặt lịch xử lý bằng delegation, hay AI lại gắn listener trong vòng lặp render (sẽ hỏng khi render lại)?
4. Có chỗ nào `innerHTML` với dữ liệu người dùng kiểm soát không?

Chỉnh sửa chỗ chưa đạt rồi mới chạy — đây là bước Refine mà AI không làm thay bạn được.

## Thực hành
1. Dựng HTML + mảng `doctors`, tự viết hai hàm trước (10 phút) rồi mới chạy prompt.
2. So sánh code AI với bản của bạn: ghi 2 điểm AI hay hơn và 2 điểm bạn giữ cách của mình.
3. Kiểm tra ca khó: chọn "Tim mạch" + gõ "khang" → danh sách rỗng kèm thông báo; bấm Đặt lịch → log đúng bác sĩ.
4. Thêm nút "Chi tiết" thứ hai và mở rộng delegation bằng `closest('.btn-book, .btn-detail')`.

## Bài tiếp theo

Bộ lọc chạy trên dữ liệu tĩnh đã xong — chương sau thay mảng `doctors` cứng bằng dữ liệu lấy từ API bất đồng bộ, bắt đầu từ Fetch API và async/await.
