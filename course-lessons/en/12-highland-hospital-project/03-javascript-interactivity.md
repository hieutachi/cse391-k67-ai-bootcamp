# JavaScript interactivity on the Landing Page

## Learning objectives
- Connect everything learned so far on one real page: rendering data, filtering, events, a modal
- Render the doctors grid from the `doctors` array; filter by specialty and search by name
- Make each card's "Book" button open the booking modal pre-filled for that doctor
- Smooth-scroll nav links — and dodge the classic "script runs before the DOM" bug

## The data: js/data.js

```js
// js/data.js — global on purpose, so index.html, booking.html and admin.html all share it
const doctors = [
  { id: 1, name: 'Dr. Emma Wilson',    specialty: 'Cardiology',       experience: 15, avatar: 'img/doctor-1.jpg' },
  { id: 2, name: 'Dr. Liam Carter',    specialty: 'General Medicine', experience: 12, avatar: 'img/doctor-2.jpg' },
  { id: 3, name: 'Dr. Olivia Martin',  specialty: 'Cardiology',       experience: 20, avatar: 'img/doctor-3.jpg' },
  { id: 4, name: 'Dr. Noah Kim',       specialty: 'Pediatrics',       experience: 9,  avatar: 'img/doctor-4.jpg' },
  { id: 5, name: 'Dr. Ava Thompson',   specialty: 'General Medicine', experience: 8,  avatar: 'img/doctor-5.jpg' },
  { id: 6, name: 'Dr. Ethan Lee',      specialty: 'Pediatrics',       experience: 11, avatar: 'img/doctor-6.jpg' },
];
```

In `index.html` declare **`data.js` before `main.js`** (scripts at the end of `<body>`): `<script src="js/data.js"></script>` then `<script src="js/main.js"></script>`.

## The classic bug: script runs before the DOM

If the script executes before the HTML is parsed, `document.getElementById('doctorGrid')` returns `null` — and `null.innerHTML` throws, **killing the whole JS file**. Two standard fixes:

1. **`defer`** — put the script in `<head>`: the browser downloads it in parallel and only runs it after the DOM is ready.
2. **`DOMContentLoaded`** — wrap the logic (the script should still sit at the end of `<body>`):

```js
document.addEventListener('DOMContentLoaded', () => {
  renderDoctors(doctors);
  setupFilters();
  setupBookingModal();
});
```

## Rendering the doctors grid

A function that takes one doctor and returns the card's HTML string — your first real "component":

```js
// js/main.js
function doctorCardHTML(d) {
  return `
    <div class="col-md-6 col-lg-4">
      <article class="card h-100 border-0 shadow-sm">
        <img src="${d.avatar}" class="card-img-top" alt="Portrait of ${d.name}">
        <div class="card-body text-center">
          <h3 class="h5 fw-bold mb-1">${d.name}</h3>
          <p class="text-secondary mb-2">${d.specialty} · ${d.experience} years of experience</p>
          <button class="btn btn-outline-primary btn-sm rounded-pill px-3"
                  data-bs-toggle="modal" data-bs-target="#bookingModal"
                  data-doctor-name="${d.name}" data-doctor-id="${d.id}">Book</button>
        </div>
      </article>
    </div>`;
}

function renderDoctors(list) {
  const grid = document.getElementById('doctorGrid');
  grid.innerHTML = list.length
    ? list.map(doctorCardHTML).join('')
    : '<p class="text-center text-secondary w-100 py-4">No doctors match your search.</p>';
}
```

Three things worth learning: `<article>` for self-contained content; `data-*` attributes carry data from the card to the modal; and there is **always an empty state** when a filter finds nothing.

## Filter by specialty + search by name

```html
<div class="container pb-4">
  <div class="row g-3 align-items-center justify-content-center">
    <div class="col-auto">
      <div class="btn-group" role="group" aria-label="Filter doctors by specialty">
        <button class="btn btn-outline-primary active" data-specialty="all">All</button>
        <button class="btn btn-outline-primary" data-specialty="Cardiology">Cardiology</button>
        <button class="btn btn-outline-primary" data-specialty="General Medicine">General Medicine</button>
        <button class="btn btn-outline-primary" data-specialty="Pediatrics">Pediatrics</button>
      </div>
    </div>
    <div class="col-auto">
      <input type="search" id="doctorSearch" class="form-control"
             placeholder="Search by doctor name…" aria-label="Search doctors by name">
    </div>
  </div>
</div>
```

Both conditions combine in a single `filter`, and every change just calls one function again — **one source of truth**:

```js
let activeSpecialty = 'all';

function setupFilters() {
  const group = document.querySelector('.btn-group');
  const searchInput = document.getElementById('doctorSearch');

  group.addEventListener('click', (e) => {
    const btn = e.target.closest('button'); // event delegation: one listener for the whole group
    if (!btn) return;
    activeSpecialty = btn.dataset.specialty;
    group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters); // filter as the user types
}

function applyFilters() {
  const keyword = document.getElementById('doctorSearch').value.trim().toLowerCase();
  const result = doctors.filter(d =>
    (activeSpecialty === 'all' || d.specialty === activeSpecialty) &&
    (!keyword || d.name.toLowerCase().includes(keyword))
  );
  renderDoctors(result);
}
```

Adding a new specialty later only means adding HTML — the JS never changes.

## "Book" buttons opening the modal

One shared modal serves every card. Bootstrap opens it via `data-bs-toggle`, so the only JS needed is filling in the doctor's name as the modal is about to appear:

```html
<!-- index.html, right before the <script> tags -->
<div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="quickBookingForm" novalidate>
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="bookingModalLabel">Book a quick appointment</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-secondary small mb-3" id="selectedDoctorNote"></p>
          <div class="mb-3">
            <label for="patientName" class="form-label">Full name</label>
            <input type="text" class="form-control" id="patientName" required>
          </div>
          <div class="mb-3">
            <label for="patientPhone" class="form-label">Phone number</label>
            <input type="tel" class="form-control" id="patientPhone" required>
          </div>
          <div class="mb-3">
            <label for="bookingDate" class="form-label">Preferred date</label>
            <input type="date" class="form-control" id="bookingDate" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Confirm booking</button>
        </div>
      </form>
    </div>
  </div>
</div>
```

```js
function setupBookingModal() {
  const modal = document.getElementById('bookingModal');
  const note = document.getElementById('selectedDoctorNote');

  modal.addEventListener('show.bs.modal', (e) => {
    const btn = e.relatedTarget; // the element that triggered the modal — read data-doctor-* from it
    note.textContent = `You are booking with ${btn.dataset.doctorName}.`;
    const hiddenId = document.createElement('input');
    hiddenId.type = 'hidden';
    hiddenId.name = 'doctorId';
    hiddenId.value = btn.dataset.doctorId;
    modal.querySelector('form').appendChild(hiddenId);
  });

  modal.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const date = document.getElementById('bookingDate').value;
    if (!name || !phone || !date) {
      alert('Please fill in your name, phone number and preferred date.');
      return;
    }
    // booking.html saves appointments into localStorage — covered in depth there
    alert(`Thank you, ${name}! We will call ${phone} to confirm your visit on ${date}.`);
    bootstrap.Modal.getInstance(modal).hide();
  });
}
```

`show.bs.modal` is a **Bootstrap event** (not a regular DOM event): it fires just before the modal appears, and `e.relatedTarget` is exactly the button that opened it.

## Smooth scrolling nav

Plain CSS is the cleanest way — no JS needed (already added in lesson 02): `html { scroll-behavior: smooth; scroll-padding-top: 80px; }`.

## Sample prompt — this lesson in one ask

```text
I have a Highland Hospital website built with Bootstrap 5. The doctors array in
js/data.js has objects with: id, name, specialty, experience, avatar.
index.html already contains an empty <div id="doctorGrid"> and a search box
#doctorSearch. Write js/main.js (ES6+, no extra libraries):
1. renderDoctors(list): render doctor cards with template literals; each card has a
   "Book" button carrying data-doctor-id and data-doctor-name that opens modal #bookingModal.
2. Combined filtering: specialty buttons (class .specialty-filter, data-specialty) AND the
   keyword in #doctorSearch (case-insensitive).
3. When nothing matches, show "No doctors match your search."
4. Wrap everything in DOMContentLoaded and use event delegation for the filter button group.
Add 3 notes about the mistakes beginners make most often.
```

## Practice

- Create `js/data.js` with 6–8 doctors across 3–4 specialties and include it before `main.js` in `index.html`.
- Copy the sample code and verify: the grid renders fully; specialty filtering and name search work **at the same time**; the Book button opens the modal already showing that doctor.
- Type a nonsense keyword to test the empty state.
- Deliberately put `<script src="js/main.js">` in `<head>` **without** `defer` — read the Console error, then fix it properly.
- Run the AI prompt with your own requirements and compare its output with the sample code, explaining the differences.

## What's next

Patients can now book an appointment — the hospital side needs a place to manage those bookings. In **Building the Admin Dashboard**: metrics derived from the `appointments` array, a data table with search and status filter, status updates and delete via delegation, all persisted to `localStorage`.
