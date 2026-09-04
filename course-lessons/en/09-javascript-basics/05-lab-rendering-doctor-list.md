# Lab: rendering the doctor list

## Learning objectives
- Apply a three-file setup — data, logic, page — and explain why the split exists
- Render six doctors into a card grid with `map` + one template literal
- Justify the `<script>` order and inspect the result in DevTools

## The data we render

Six doctors, exactly matching the shape used across the course — `id`, `name`, `specialty`, `experience`, `fee`, `avatar`:

```js
// data.js — data and nothing else
const doctors = [
  { id: 1, name: 'Dr. Nguyen Van An',  specialty: 'Internal Medicine', experience: 12, fee: 500000, avatar: 'assets/doctors/an.jpg' },
  { id: 2, name: 'Dr. Tran Thi Binh',  specialty: 'Pediatrics',        experience: 8,  fee: 400000, avatar: 'assets/doctors/binh.jpg' },
  { id: 3, name: 'Dr. Le Quoc Cuong',  specialty: 'Cardiology',        experience: 15, fee: 600000, avatar: 'assets/doctors/cuong.jpg' },
  { id: 4, name: 'Dr. Pham Minh Dung', specialty: 'Internal Medicine', experience: 6,  fee: 350000, avatar: 'assets/doctors/dung.jpg' },
  { id: 5, name: 'Dr. Hoang Thu Ha',   specialty: 'Dermatology',       experience: 10, fee: 450000, avatar: 'assets/doctors/ha.jpg' },
  { id: 6, name: 'Dr. Vo Thanh Nam',   specialty: 'Cardiology',        experience: 9,  fee: 550000, avatar: 'assets/doctors/nam.jpg' },
];
```

Why a real `data.js` and not hard-coded HTML? Because the next chapter's specialty filter must swap that grid while `doctors` itself never changes — data that lives apart from the page can be filtered, extended and later even fetched from an API without touching the rendering code.

## The three-file setup

```
highland-hospital/
├── index.html      # structure: the #doctor-grid container + <script> tags
├── css/style.css   # card styling
├── js/
│   ├── data.js     # 1 — the doctors array
│   ├── logic.js    # 2 — renderDoctorCards(doctors) and helpers
│   └── app.js      # 3 — boots the page: reads the DOM and calls render
└── assets/doctors/ # avatar images
```

`index.html`:

```html
<body>
  <main class="container">
    <h1>Our doctors</h1>
    <section id="doctor-grid" class="doctor-grid"><!-- cards land here --></section>
  </main>

  <!-- ORDER MATTERS: data.js must load before logic.js, which needs doctors;
       logic.js before app.js, which calls renderDoctorCards. -->
  <script src="js/data.js"></script>
  <script src="js/logic.js"></script>
  <script src="js/app.js"></script>
</body>
```

`logic.js` owns the rendering skill from lesson 1 — one doctor object in, one card string out:

```js
// logic.js — pure-ish logic; no DOM lookups, so it is reusable and testable
function doctorCard(doctor) {
  const { name, specialty, experience, fee, avatar } = doctor;
  return `
    <article class="doctor-card">
      <img src="${avatar}" alt="Portrait of ${name}">
      <h3>${name}</h3>
      <p>${specialty} · ${experience} years experience</p>
      <span class="fee">${fee.toLocaleString('vi-VN')} VND</span>
      <button class="btn-book" data-id="${doctor.id}">Book</button>
    </article>`;
}

function renderDoctorCards(doctorList) {
  const container = document.querySelector('#doctor-grid');
  container.innerHTML = doctorList.map(doctorCard).join('');
}
```

`app.js` keeps page startup tiny — it is the only file that touches the fixed container:

```js
// app.js — boots the page
renderDoctorCards(doctors);
```

`data-id="${doctor.id}"` is the hook that makes next chapter's delegation work: the Book button never needs its own listener because its parent container will read `data-id` when clicked.

## Read the rendered page in DevTools

1. Open the page via Live Server and press Ctrl/Cmd+Shift+I.
2. In **Elements**, right-click a doctor card → *Edit as HTML* — that is exactly the string `doctorCard` produced.
3. In **Console**, type `doctors.length` (6), `doctors[0].name`, then `renderDoctorCards(doctors.filter(d => d.specialty === 'Cardiology'))` — the grid should shrink live to two cards. Undo with the full `renderDoctorCards(doctors)`.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For Highland Hospital, a page shows six doctors from the constant array below, one
per <article class="doctor-card"> inside <section id="doctor-grid">.

Constraints:
- js/data.js declares const doctors = [six objects with id/name/specialty/experience/
  fee/avatar as below];
- js/logic.js has doctorCard(doctor) returning one template-literal <article> with
  avatar <img>, <h3> name, specialty + experience <p>, fee formatted via
  toLocaleString('vi-VN'), and a <button class="btn-book" data-id="...">Book</button>;
- js/app.js calls renderDoctorCards(doctors) once the page is loaded;
- index.html loads the scripts in that order at the end of <body>.
Write all four files and explain in three sentences why the script order is safe here.
```

## Review checklist — run before you ask the AI

- The grid shows exactly six cards and the browser console has no errors.
- `doctorCard` returns a string; no `document.write`, no `alert`.
- Every property is present — a missing `fee` or `avatar` would surface as `undefined` in the card.
- The container shows cards *replacing* whatever was inside, not stacking duplicates.

## Practice

1. Rebuild the three files from memory *without* looking at this page, then diff them.
2. Add a small edit: render a `— fully booked today` line on the two Cardiology cards by checking `doctor.specialty` inside `doctorCard`.
3. Self-explanation (write it out): why must `data.js` load before `logic.js`? Why does `logic.js` never call `document.querySelector`, while `app.js` does? What would break if a fourth script loaded before `data.js`?

## What's next

Next up is *Querying & manipulating the DOM*, the first lesson of the DOM & events chapter — replacing string-building with `createElement`, reading the live tree in DevTools, and choosing `textContent` over `innerHTML`.
