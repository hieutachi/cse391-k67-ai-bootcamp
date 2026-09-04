# Core Array Methods

## Learning objectives
- Pick the right method by thinking input → output, not by memorizing syntax
- Transform, filter, locate and summarize real doctor arrays with `map`/`filter`/`find`/`reduce`
- Sort safely (without mutating the original) and test membership with `includes`

## Think input → output first

Beginners ask "which method do I use?" The reliable move is to name the *shape* of the data going in and coming out:

| Task | Method | Input | Output |
|---|---|---|---|
| Turn every doctor into a card string | `map` | array of doctors | new array, same length |
| Keep only Internal Medicine doctors | `filter` | array of doctors | smaller array, order kept |
| Locate one doctor by id | `find` | array of doctors | one doctor object or `undefined` |
| Do something per item, no result needed | `forEach` | array | nothing (side effects) |
| Boil an array down to a count or total | `reduce` | array | any single value |
| Order doctors by fee | `sort` | array | sorted array — copy first! |
| Is this specialty in the list? | `includes` | array + value | boolean |

`map` and `filter` never touch the original array; they return a new one. That is the philosophy of this lesson: data flows in, a *new* value flows out, and nothing shared is damaged.

```js
const doctors = [
  { id: 1, name: 'Dr. Nguyen Van An',  specialty: 'Internal Medicine', experience: 12, fee: 500000, avatar: 'assets/doctors/an.jpg' },
  { id: 2, name: 'Dr. Tran Thi Binh',  specialty: 'Pediatrics',        experience: 8,  fee: 400000, avatar: 'assets/doctors/binh.jpg' },
  { id: 3, name: 'Dr. Le Quoc Cuong',  specialty: 'Cardiology',        experience: 15, fee: 600000, avatar: 'assets/doctors/cuong.jpg' },
  { id: 4, name: 'Dr. Pham Minh Dung', specialty: 'Internal Medicine', experience: 6,  fee: 350000, avatar: 'assets/doctors/dung.jpg' },
];
```

## map — every item in, one transformed item out

```js
const names = doctors.map(d => d.name);       // ['Dr. Nguyen Van An', 'Dr. Tran Thi Binh', ...]
const cards = doctors.map(d => `<article><h3>${d.name}</h3><p>${d.specialty}</p></article>`);
```

## filter — keep the items that pass the test

```js
const internists = doctors.filter(d => d.specialty === 'Internal Medicine');
// only ids 1 and 4 — the predicate must return truthy to keep an item
```

## find — first match, or undefined

```js
const doctor = doctors.find(d => d.id === 3);
if (!doctor) console.log('No doctor with that id');   // always guard the undefined case
```

## reduce — from many to one

```js
const totalFees = doctors.reduce((sum, d) => sum + d.fee, 0);
// sum starts at 0 (the second argument); the arrow runs once per doctor, adding d.fee
```

Count doctors per specialty — the accumulator does not have to be a number:

```js
const bySpecialty = doctors.reduce((counts, d) => {
  counts[d.specialty] = (counts[d.specialty] || 0) + 1;
  return counts;                                     // reducers must return the accumulator
}, {});
// { 'Internal Medicine': 2, 'Pediatrics': 1, 'Cardiology': 1 }
```

## forEach vs map

`map` builds a new array and returns it — use it in transformation pipelines. `forEach` returns nothing — use it for side effects such as logging or DOM updates. If you write `array.map(...)` and ignore the result, you meant `forEach`.

## sort mutates — copy first with [...]

```js
const byFeeAscending = [...doctors].sort((a, b) => a.fee - b.fee);
const byName = [...doctors].sort((a, b) => a.name.localeCompare(b.name));
```

The comparator returns a negative number (a first), zero (equal), or positive (b first). Always pass one for numbers: the default sort converts items to strings, so `[10, 9, 100].sort()` gives `[10, 100, 9]`. Because `sort` works in place, spread into a copy first — that keeps `doctors` untouched.

## includes — quick membership check

```js
const active = ['pending', 'confirmed'];
const activeBookings = appointments.filter(a => active.includes(a.status));
```

`includes` reads almost like English and beats a hand-rolled `indexOf(...) > -1`.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital data shapes: doctors { id, name, specialty, experience, fee, avatar };
appointments { patientName, phone, date, time, status } with status one of
pending | confirmed | completed | cancelled.

Using the four doctors and these appointments, write and explain:
1. filter all 'Internal Medicine' doctors
2. find the doctor whose id is 5 — and handle a missing id gracefully
3. count doctors per specialty with reduce
4. list appointments whose status is 'pending' and time is before '12:00'
Never mutate the input arrays. Show the console output for each result.
```

## Practice

1. `doctors.filter(...)` for fee under 450000, then `map` those to `name: fee` strings in one chain.
2. Use `reduce` to find the doctor with the most experience (compare inside the reducer), then verify with `find` by id.
3. Sort a copy by experience descending, then confirm `doctors` is unchanged with `console.log(doctors[0].name)`.
4. Add `includes` to answer: "Is there a Dermatology doctor in the department list?"

## What's next

Next up is *Objects & JSON*, the shape underneath all this data — how objects are created, read and updated, and how JSON serialization prepares your appointment records for storage and the Admin Dashboard.
