# Prompts for JavaScript

## Learning objectives
- Describe the input and output data so AI cannot invent the shape
- Name the DOM APIs you allow, to keep the code familiar
- Demand dependency-free code split into pure and render functions

## JavaScript fails on the missing contract

JavaScript errors rarely show on the page — they sit in the Console. The most common reason AI writes broken JS is that you described data vaguely and it invented the object shape, producing `undefined` at the first property access. A JS prompt needs **what goes in, what comes out, and how it connects to the DOM** — a contract between you and the AI.

## Four things to state in every JS prompt

1. **Input data** — paste the real array or object instead of describing it. When AI sees the actual fields, it stops inventing names.
2. **Output** — what does the function return? A new array, an HTML string, or a direct DOM update?
3. **Allowed DOM APIs** — `querySelector`, template literals, `map`/`filter`/`join`, `addEventListener`. Explicitly forbid `document.write`, jQuery and library imports.
4. **Function split** — separate *pure* functions (compute on data, never touch the DOM) from *render* functions (touch the DOM). Clean logic is testable, and when the design changes later you swap the render layer without rewriting the logic.

The doctor data every lesson in this course reuses:

```js
const doctors = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', experience: 12 },
  { id: 2, name: 'Dr. Tom Bauer', specialty: 'General Medicine', experience: 8 },
  { id: 3, name: 'Dr. Emma Lindqvist', specialty: 'Pediatrics', experience: 15 }
];
```

## Sample prompt: render and filter

```text
Context: Highland Hospital landing page, plain JavaScript ES6+, no
framework, no external libraries.
Input data: the array doctors —
[{ id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', experience: 12 },
 { id: 2, name: 'Dr. Tom Bauer', specialty: 'General Medicine', experience: 8 },
 { id: 3, name: 'Dr. Emma Lindqvist', specialty: 'Pediatrics', experience: 15 }]
Task: (1) a function renderDoctors(items) that renders this array into
<ul id="doctor-list">, one <li> per doctor showing name, specialty and
years of experience; (2) a function filterBySpecialty(doctors, keyword)
that filters by specialty, case-insensitive, and returns a new array.
Constraints: ES6+; use only querySelector, template literals, map,
filter and join; no new dependencies; never mutate the input array;
keep pure logic and DOM rendering in separate functions.
Output: one code block, with a short comment above each function.
```

A correct answer looks like this:

```js
const list = document.querySelector('#doctor-list');

function filterBySpecialty(doctors, keyword) {
  const kw = keyword.trim().toLowerCase();
  return doctors.filter((doc) => doc.specialty.toLowerCase().includes(kw));
}

function renderDoctors(items) {
  list.innerHTML = items
    .map((doc) => `
      <li>
        <h3>${doc.name}</h3>
        <p>${doc.specialty} · ${doc.experience} years of experience</p>
      </li>`)
    .join('');
}

renderDoctors(doctors);
```

Read three details carefully. `filterBySpecialty` is pure — array in, new array out, no DOM. `renderDoctors` only touches the DOM. And `map().join('')` builds the entire HTML string before assigning `innerHTML` **once** — never assign `innerHTML` inside a loop.

## Ask for a call example when the flow matters

To make sure the AI understands how the functions connect, add one line at the end: *"Finally, call `renderDoctors(filterBySpecialty(doctors, 'cardio'))` and comment what you expect to appear."* Asking for the expected result is the cheapest way to catch a misunderstood data shape.

## Practice

Add a `fee` field to the doctors array (a number, e.g. `120`), then write a prompt that shows the fee on each `<li>` **while keeping the two functions above unchanged**. Test with the keyword `"pedi"` — only the pediatrician should remain — and check the Console for errors.

## What's next

Code that runs but displays wrong is a different problem entirely — the next lesson gives you the debug prompt formula: minimal code plus symptom plus ranked candidate causes.
