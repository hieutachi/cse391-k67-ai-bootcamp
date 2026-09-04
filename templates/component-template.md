# Component Template (HTML + Bootstrap 5)

Khuôn mẫu tư duy "component" cho dự án thuần HTML/CSS/JS: mỗi component = 1 hàm render nhận dữ liệu, trả về chuỗi HTML — giống hệt cách React/Vue render (xem bài 12-06).

```html
<!-- 1. Nơi component được gắn vào (trong file .html) -->
<section id="doctorsSection" class="py-5">
  <div class="container">
    <div class="row g-4" id="doctorsGrid"><!-- render vào đây --></div>
  </div>
</section>
```

```js
// 2. "Component" — hàm thuần: dữ liệu vào, HTML ra
function doctorCard(doctor) {
  return `
    <div class="col">
      <article class="card h-100 shadow-sm">
        <img src="${doctor.avatar}" class="card-img-top" alt="${doctor.name}">
        <div class="card-body">
          <h3 class="h5 card-title">${doctor.name}</h3>
          <p class="card-text text-muted">${doctor.specialty} · ${doctor.experience} năm</p>
          <button class="btn btn-primary btn-book" data-id="${doctor.id}">Đặt lịch</button>
        </div>
      </article>
    </div>`;
}

// 3. "Render" — gắn dữ liệu vào DOM
function renderDoctors(list) {
  document.getElementById("doctorsGrid").innerHTML = list.map(doctorCard).join("");
}
```

## Quy ước
- Tên hàm component dạng `tênComponent` (camelCase), nhận đúng 1 object dữ liệu.
- Luôn có `data-id` trên phần tử tương tác để dùng Event Delegation (bài 10-02).
- Dữ liệu người dùng nhập KHÔNG được nhúng vào template literal — dùng `textContent`/`createElement` (tránh XSS, bài 10-01).
