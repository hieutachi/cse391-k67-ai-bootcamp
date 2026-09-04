# Objects & JSON

## Learning objectives
- Create, read, update and delete object properties with dot and bracket notation
- Add methods to objects and understand their `this`
- Serialize and parse with `JSON.stringify`/`JSON.parse` and know when each is needed

## Objects are named pockets of data

Every feature of the Highland portal hangs off plain objects. A doctor is one; an appointment is another:

```js
const doctor = {
  id: 1,
  name: 'Dr. Nguyen Van An',
  specialty: 'Internal Medicine',
  experience: 12,
  fee: 500000,
  avatar: 'assets/doctors/an.jpg',
};
```

Four CRUD operations cover nearly everything you will do:

```js
// Create — add a property (works on objects declared with const)
doctor.phone = '0912345678';           // dot notation

// Read
doctor.name;                           // 'Dr. Nguyen Van An'
doctor['specialty'];                   // bracket notation — same result

// Update
doctor.fee = 550000;                   // reassign the property
doctor['fee'] = 550000;                // identical, useful for dynamic keys

// Delete
delete doctor.phone;                   // removes the property entirely
```

Use **dot notation** for names you type literally and **bracket notation** when the key lives in a variable — for example a sortable table column name coming from an `<option>` value.

The critical subtlety: `const` protects the binding, not the contents. `doctor = {}` throws; `doctor.fee = 550000` is fine. That is exactly why later lessons can `const` the whole doctor list and still update one entry.

## Methods: functions that live inside an object

A property whose value is a function is a method. Function shorthand is the modern form, and `this` refers to the object the method was called on:

```js
const clinic = {
  name: 'Highland Hospital',
  doctors: 6,
  summary() {
    return `${this.name} — ${this.doctors} doctors online`;  // ✔ reads this
  },
};
clinic.summary();   // 'Highland Hospital — 6 doctors online'
```

Never define such a method with an arrow function — arrows have no `this` of their own, so `this.doctors` would silently be `undefined`. (Lesson 2 of this chapter covered exactly why.)

## JSON: the text format behind the wire

Objects live in memory; storage, APIs and the Admin Dashboard all speak text. JSON — JavaScript Object Notation — is that text format: it looks like a JS object literal, but it is a *string*, with stricter rules:

- Property names must be double-quoted.
- Only strings, numbers, booleans, `null`, arrays and nested objects are allowed — no methods, no `undefined`, no `NaN`.

The two directions:

```js
const appointments = [
  { patientName: 'Mai Lan',  phone: '0912345678', date: '2026-03-18', time: '09:00', status: 'pending' },
  { patientName: 'Tuan Anh', phone: '0908123456', date: '2026-03-18', time: '10:30', status: 'confirmed' },
];

const json = JSON.stringify(appointments);   // object(s) → text for saving/sending
console.log(json);                            // [{"patientName":"Mai Lan","phone":"0912...","status":"pending"}, ...]

const back = JSON.parse(json);                // text → live JS objects again
console.log(back[0].patientName);             // 'Mai Lan'
```

The output above is the *exact* JSON shape you will store in `localStorage` in chapter 10 and later render as an admin table — patient name, phone, date, time, and a status from the fixed set `pending` / `confirmed` / `completed` / `cancelled`.

## The object methods every pipeline needs

Pairs that appear constantly in frontend code:

```js
const ids = doctors.map(d => d.id);               // collect one field
const names = doctors.map(({ name }) => name);    // destructure inline

const withInitials = doctors.map(d => ({
  ...d,                                            // spread the original
  initials: d.name.split(' ').map(w => w[0]).join(''),  // then add one key
}));
```

`Object.keys(obj)` returns an array of the property names, and `Object.values(obj)` the values — both handy when rendering a summary grid of dashboard metrics.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For the Highland Hospital admin module, appointments have the shape
{ patientName, phone, date, time, status } where status is one of
pending | confirmed | completed | cancelled.

Write, using the sample JSON array below, and explain each step:
1. parse the JSON string into an array
2. update the first pending appointment to status 'confirmed' without mutating the
   original array (spread a copy)
3. count appointments per status with reduce
4. serialize the result back to JSON and log it
Sample: [{"patientName":"Mai Lan","phone":"0912345678","date":"2026-03-18",
"time":"09:00","status":"pending"},{"patientName":"Tuan Anh",
"phone":"0908123456","date":"2026-03-18","time":"10:30","status":"confirmed"}]
```

## Why this matters for the Admin Dashboard

By chapter 12 your admin table will read appointments from `localStorage` (chapter 10 lesson 4): `JSON.parse` on the way in so rows become real objects, `JSON.stringify` on the way out after a status update. Every skill in this lesson — read the property, update it, serialize, persist — is a direct preview of that feature. Get comfortable now, while the data is only in your console.

## Practice

1. Build `const appointment = { patientName: 'Mai Lan', phone: '0912345678', date: '2026-03-18', time: '09:00', status: 'pending' }` in the console, then set `status` to `'confirmed'` and log the whole object.
2. Write a `toggleStatus` function that swaps a status between `'pending'` and `'confirmed'`, returning a *new* object (`{ ...appointment, status }`) without mutating the input.
3. Round-trip an array of three appointments through `JSON.stringify` → `JSON.parse` and confirm deep equality field by field.
4. In one `map`, return `{ name: doctor.name, specialty: doctor.specialty }` for every doctor — then do the same with parameter destructuring.

## What's next

Next up is *Lab: rendering the doctor list*, where data and DOM finally meet — six doctors mapped into a card grid through your own `data.js`, `logic.js` and `app.js` files.
