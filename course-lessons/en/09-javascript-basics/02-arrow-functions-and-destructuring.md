# Arrow functions & Destructuring

## Learning objectives
- Write arrow functions, including the single-expression implicit return
- Explain why arrows make poor object methods
- Pull values out of objects and arrays with destructuring, defaults, rest and spread

## From function expressions to arrows

ES6's arrow syntax removes the `function` keyword and most of the ceremony:

```js
const doctors = [
  { id: 1, name: 'Dr. Nguyen Van An', specialty: 'Internal Medicine', experience: 12, fee: 500000, avatar: 'assets/doctors/an.jpg' },
  { id: 3, name: 'Dr. Le Quoc Cuong', specialty: 'Cardiology', experience: 15, fee: 600000, avatar: 'assets/doctors/cuong.jpg' },
];

// function expression
const byId = function (list, id) {
  return list.find(function (d) { return d.id === id; });
};

// same logic as arrows
const byId = (list, id) => {
  return list.find(d => d.id === id);
};

// single expression → implicit return: no braces, no return keyword
const byId = (list, id) => list.find(d => d.id === id);
```

The last form is the one you will see everywhere. Rules of thumb:

- One parameter → parentheses optional: `fee => fee * 2`. Zero or two-plus parameters → parentheses required: `() => ...`, `(a, b) => ...`.
- Body braces present → you must write `return`; a single-expression body returns that expression automatically.
- An arrow returning an object literal needs wrapping parentheses: `() => ({ name: 'Dr. An' })` — otherwise `{ }` is read as a body block.

### Don't use arrows as methods

Arrows do not have their own `this`; they inherit it from the surrounding scope, so an arrow used as an object method looks up the wrong object:

```js
const clinic = {
  name: 'Highland Hospital',
  doctors: 6,
  describe() { return `${this.name} has ${this.doctors} doctors`; }, // ✔ method shorthand
};

const broken = {
  name: 'Highland Hospital',
  doctors: 6,
  describe: () => `${this.name} has ${this.doctors} doctors`, // ✖ this is not the object
};

clinic.describe();  // "Highland Hospital has 6 doctors"
broken.describe();  // "undefined has undefined doctors"
```

Use method shorthand or a regular function for methods; use arrows when you need a short callback or want `this` to stay whatever it was outside.

## Destructuring: unpacking in one line

Data arrives bundled — a whole doctor object — and you want its pieces as named variables:

```js
const doctor = { id: 3, name: 'Dr. Le Quoc Cuong', specialty: 'Cardiology', experience: 15, fee: 600000, avatar: 'assets/doctors/cuong.jpg' };

const { name, specialty, fee } = doctor;   // variable name = property name
console.log(name, specialty, fee);         // Dr. Le Quoc Cuong Cardiology 600000

const { specialty: field } = doctor;       // rename: "specialty as field"
const { phone = 'N/A' } = doctor;          // default when property is missing
```

Array destructuring matches by position:

```js
const [first, second, ...rest] = doctors;  // first → doctors[0], rest → the tail
```

A classic trick is swapping without a temporary variable:

```js
let a = '09:00';
let b = '10:30';
[a, b] = [b, a];                           // a='10:30', b='09:00'
```

## Rest and spread: the same three dots, two jobs

- **Rest** collects leftovers *into* a variable — in function parameters and destructuring patterns.
- **Spread** *expands* an iterable into individual items — in calls and array/object literals.

```js
function logBookings(header, ...rows) {    // rest parameters → rows is a real array
  console.log(header, rows.length);
}

const morning = ['09:00', '09:30'];
const evening = ['16:00', '16:30'];
const allSlots = [...morning, ...evening]; // spread: flatten both in

const updated = { ...doctor, fee: 650000 }; // copy, then override fee
```

That last line is worth memorizing: `{ ...doctor, fee: 650000 }` creates a *new* object holding every property of `doctor` except `fee`, which becomes 650000. It is the idiomatic "update without mutating" move you will reuse constantly.

## Reading doctor objects the modern way

Put it together — a summary line and a total built from real data:

```js
const summarize = ({ name, specialty, experience }) =>
  `${name} (${specialty}, ${experience} yrs)`;

doctors.forEach(doctor => console.log(summarize(doctor)));

const totalFees = doctors.reduce((sum, { fee }) => sum + fee, 0);
console.log(`Combined daily fees: ${totalFees.toLocaleString('vi-VN')} VND`);
```

`forEach` runs the arrow once per item, ignoring the result; `reduce` folds the array into one number. Both get a full lesson next.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For the Highland Hospital portal, doctors are { id, name, specialty, experience, fee, avatar }.

Write:
1. const renderDoctorCard = ({ name, specialty, experience, fee, avatar }) => ...
   returning a template-literal card, destructuring the whole doctor in the parameter list.
2. feeSummary(doctors): use reduce to total all fees and return the doctor name with the
   highest fee — destructuring wherever it reads cleaner.
Explain your choices of arrow vs regular function, and where rest/spread could appear.
```

## Practice

1. Convert these three functions to arrows, then to implicit-return form where possible: a function doubling a fee, a greeting `(clinicName, doctorName)`, and one returning a fresh `{ id, name, fee }` object.
2. Destructure this appointment into five variables, renaming `status` to `state` with a default of `'pending'`:
```js
const appointment = { id: 101, patientName: 'Mai Lan', phone: '0912345678', date: '2026-03-18', time: '09:00', status: 'pending' };
```
3. Explain to a classmate, in one sentence, why `broken.describe()` above logs `undefined` — then fix it.

## What's next

Next up is *Core Array Methods*, where `map`, `filter`, `find`, `reduce` and friends turn raw doctor arrays into rendered cards, filtered shortlists and dashboard counts.
