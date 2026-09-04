# Lab: the complete booking flow

## Learning objectives
- Connect everything from the course so far: DOM, events, validation, `localStorage`, fetch, async/await
- Render doctors from the mock API into the multi-step form — with a graceful fallback
- Validate each step; on a valid submit, save the appointment to `localStorage` and show a Bootstrap confirmation modal
- Self-check the finished flow against a completion checklist

## The problem

Assemble the pieces into one uninterrupted flow: page opens → fetch doctors from JSON Server (with loading and error handling) → the user completes the 3-step form (each step validated) → Confirm is clicked → the appointment is saved to `localStorage` and a success modal appears:

```
fetch /doctors ──► populate specialty & doctor selects (step 1)
                        │
 step 1 → step 2 (validate) → step 3: review
                        │
              valid submit
                        │
  ┌─────────────────────┼──────────────────────┐
  ▼                     ▼                      ▼
saveAppointments    reset form → step 1   modal "Booking confirmed"
(localStorage)
```

## Step 1 — Fetch doctors, then fill the form

```js
const STORAGE_KEY = 'highland_appointments';

const DOCTORS_FALLBACK = [
  { id: 1, name: 'Dr. Emma Wilson', specialty: 'Cardiology', experience: 12 },
  { id: 2, name: 'Dr. Liam Carter', specialty: 'General Medicine', experience: 8 },
  { id: 3, name: 'Dr. Sofia Nguyen', specialty: 'Pediatrics', experience: 15 },
];

const state = { currentStep: 1, doctors: [], data: {
  specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '',
} };

async function initBookingPage() {
  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    populateSpecialtySelect(await response.json());
  } catch (error) {
    console.warn('Mock API not available — using fallback data:', error);
    populateSpecialtySelect(DOCTORS_FALLBACK);
  }
}

function populateSpecialtySelect(doctors) {
  state.doctors = doctors;
  const specialtySelect = document.querySelector('#bk-specialty');
  specialtySelect.innerHTML = '<option value="">— Choose a specialty —</option>';
  [...new Set(doctors.map((doc) => doc.specialty))].forEach((specialty) => {
    const option = document.createElement('option');
    option.value = specialty;
    option.textContent = specialty;
    specialtySelect.append(option);
  });
}
```

The `change` handler on `#bk-specialty` from the previous lesson now calls `filterDoctorsBySpecialty` and fills `#bk-doctor` with the matching doctors:

```js
function filterDoctorsBySpecialty(specialty) {
  return state.doctors.filter((doc) => doc.specialty === specialty);
}
```

`validateStep()` inherits the exact rules from the Form Validation lesson but runs against `state`. The only new requirement: the submit handler must call it again before saving, in case the user reached step 3 by an unusual path.

## Step 2 — Submit: save + confirmation modal

```js
function loadAppointments() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // corrupted JSON → empty list, never crash the page
  }
}

function saveAppointments(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const form = document.querySelector('#booking-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateStep(state.currentStep)) return; // safety net against early submit

  const doctor = state.doctors.find((doc) => doc.id === state.data.doctorId);
  const appointment = {
    id: Date.now(),
    patientName: state.data.patientName,
    phone: state.data.phone,
    specialty: state.data.specialty,
    doctorId: state.data.doctorId,
    doctorName: doctor ? doctor.name : '',
    date: state.data.date,
    time: state.data.time,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // 1. persist to localStorage
  const list = loadAppointments();
  list.push(appointment);
  saveAppointments(list);

  // 2. fill and show the Bootstrap success modal
  document.querySelector('#modal-confirm-name').textContent = appointment.patientName;
  document.querySelector('#modal-confirm-detail').textContent =
    `${appointment.specialty} — ${appointment.doctorName} — ${appointment.date} at ${appointment.time}`;
  bootstrap.Modal.getOrCreateInstance(
    document.querySelector('#booking-success-modal')
  ).show();

  // 3. reset back to step 1
  form.reset();
  state.data = { specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '' };
  showStep(1);
});
```

Modal HTML (place it just before the closing `</body>`):

```html
<div class="modal fade" id="booking-success-modal" tabindex="-1"
     aria-labelledby="booking-success-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="booking-success-label">✅ Booking confirmed</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="mb-1"><strong id="modal-confirm-name"></strong></p>
        <p class="text-muted mb-0" id="modal-confirm-detail"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>
```

### Sample prompt — the whole flow in one ask

```text
Highland Hospital project (Bootstrap 5, vanilla JS ES6+). Write the JavaScript for the booking page:
1. On load, fetch "http://localhost:3000/doctors" with async/await, check response.ok, and on failure fall back to a DOCTORS_FALLBACK array; populate #bk-specialty and #bk-doctor.
2. Three-step form using <section class="step-panel"> with state { currentStep, doctors, data } and a showStep() function.
3. Validate each step when "Continue" is clicked, marking invalid fields with the Bootstrap .is-invalid class.
4. On submit, save the appointment { id: Date.now(), ...data, doctorName: looked up from doctors, status: "pending" } into localStorage under key "highland_appointments", then show modal #booking-success-modal and reset the form to step 1.
Render any user-entered names with textContent only — never innerHTML.
```

## Completion checklist

- [ ] `#bk-specialty` and `#bk-doctor` are populated — test both cases: JSON Server running and stopped
- [ ] Changing specialty filters the doctor list; you cannot pick a doctor from another specialty
- [ ] Clicking Continue on an invalid step is blocked with a clear message
- [ ] Going Back to step 1 keeps the previously chosen values (state holds them)
- [ ] Step 3 shows exactly what was entered — no `[object Object]` anywhere
- [ ] Submitting shows the modal; DevTools → Application → Local Storage now contains a new `highland_appointments` record
- [ ] Reload the page (F5) — the record survives, ready for the Admin Dashboard in Chapter 12
- [ ] No red errors in the Console when running the happy path

## Practice

- Run the whole flow against the checklist above — fix anything that fails immediately.
- Create two bookings, then open Local Storage and study the stored data structure.
- Temporarily delete `db.json` to force the `DOCTORS_FALLBACK` branch — the page must stay fully usable.
- Get ready for Chapter 12: call `loadAppointments()` in the Console and try rendering it — the Admin Dashboard will read exactly this data.

## What's next

The complete booking flow now runs end to end. Chapter 12 builds the Landing Page and the Admin Dashboard — the place where every appointment you just saved appears for the hospital staff to manage.
