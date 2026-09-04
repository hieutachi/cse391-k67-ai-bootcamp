# Client-side Form Validation

## Learning objectives
- Validate required fields, email format and phone format with plain JavaScript
- Show per-field errors with Bootstrap's `is-invalid`/`is-valid` classes and `invalid-feedback` messages
- Know what HTML5 validation handles — and where its limits end

## HTML5 gives you the first layer — with limits

Markup can require a field and check format without any JavaScript:

```html
<input type="email" required>
<input type="tel" required pattern="[0-9]{10,11}" title="10-11 digits">
```

The browser then blocks submission and shows its own bubble. Handy, but limited: the bubbles' text and language cannot be styled or customized per field, `pattern` gives cryptic errors, and the same rules are enforced on a *different* form element than the one you want (the user's browser decides). Real projects validate in JavaScript on the `submit` event, control every message, and use Bootstrap to paint the result.

## Validate in the submit handler

A booking form from chapter 8 (`#booking-form`) collects patient name, phone, date, time and specialty. The submit handler runs every rule and paints errors next to each field:

```js
const form = document.querySelector('#booking-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();                      // stop the native submit first

  const name = form.elements.patientName.value.trim();
  const phone = form.elements.phone.value.trim();
  const date = form.elements.date.value;
  const time = form.elements.time.value;

  const errors = validateBooking({ name, phone, date, time });
  if (Object.keys(errors).length > 0) {
    showFieldErrors(errors);
    return;                                    // never save when invalid
  }
  saveAppointment({ patientName: name, phone, date, time, status: 'pending' });
});
```

## Validation rules — one concern each

```js
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      // adequate for most apps
const PHONE_RE = /^(0|\+84)[0-9]{9,10}$/;           // Vietnamese mobile, e.g. 0912345678

function validateBooking({ name, phone, date, time }) {
  const errors = {};

  if (!name) errors.name = 'Patient name is required.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!phone) errors.phone = 'Phone is required.';
  else if (!PHONE_RE.test(phone)) errors.phone = 'Enter 10-11 digits, e.g. 0912345678.';

  if (!date) errors.date = 'Please choose a date.';
  else if (date < todayISO()) errors.date = 'Date cannot be in the past.';

  if (!time) errors.time = 'Please choose a time.';

  return errors;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);    // '2026-03-18' — comparable to <input type="date"> values
}
```

Returning an `errors` object instead of logging keeps the function pure and testable, and it gives the UI layer exactly what it needs to render messages.

## Painting the state with Bootstrap

Bootstrap 5 pairs `is-invalid`/`is-valid` on the control with a sibling `.invalid-feedback` / `.valid-feedback` block. The snippet below can drive *any* field via its name — one function, all fields:

```js
function showFieldErrors(errors) {
  for (const field of form.elements) {
    const control = field.closest('.mb-3')?.querySelector('.form-control, .form-select');
    const feedback = field.closest('.mb-3')?.querySelector('.invalid-feedback');
    if (!control || !feedback) continue;           // buttons and hidden inputs skip

    if (errors[field.name]) {
      control.classList.add('is-invalid');
      control.classList.remove('is-valid');
      feedback.textContent = errors[field.name];   // our own message — safe textContent
    } else if (field.value.trim() !== '') {
      control.classList.remove('is-invalid');
      control.classList.add('is-valid');           // green tick for what passed
    }
  }
}
```

Optional but nice: re-validate a single field live by listening to its `input` event — the red border disappears the moment the user fixes it, which is feedback users feel instantly.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital booking form fields: patientName (text), phone, date (type="date"),
time (type="time"), specialty (select). Appointments are saved with
{ patientName, phone, date, time, status: 'pending' }.

Write validateBooking(data) returning an errors object { fieldName: message } with rules:
patientName required and at least 2 characters; phone required and matching
/^(0|\+84)[0-9]{9,10}$/; date required and not in the past; time required.
Then write showFieldErrors(errors, form) that toggles Bootstrap's
is-invalid / is-valid on each control and writes each message into the matching
.invalid-feedback with textContent. Explain why patientName is written with
textContent, not innerHTML.
```

## The limits of validation

Client-side validation is convenience, not security — anyone can open DevTools and submit a crafted request, so the server (or, later, your API) must validate again. Within the browser, remember three gaps: HTML5 `required` blocks submission before your handler ever runs, so decide between `novalidate` on the form (full JS control) and letting native checks run first; the same rules must live in one place, or name/phone rules drift apart across forms; and format regexes are heuristics — a phone that *looks* valid may still be a wrong number.

## Practice

1. Add `date not before today` to the rules and confirm it rejects yesterday but accepts today.
2. Wire the `input` event so each field clears its own `is-invalid` as the user types.
3. Use the console to run `validateBooking({ name: '', phone: 'abc', date: '2020-01-01', time: '' })` and confirm every message is present and accurate.
4. Remove `required` from an input and confirm your handler still rejects the empty value — your rules are the source of truth, not the markup.

## What's next

Next up is *Persisting with localStorage*, where validated bookings finally survive a page reload — stored as JSON under one key and managed by load/save/add/remove helpers.
