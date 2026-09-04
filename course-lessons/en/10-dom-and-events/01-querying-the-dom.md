# Querying & manipulating the DOM

## Learning objectives
- Select elements with `querySelector` and `querySelectorAll` and navigate the live DOM tree in DevTools Elements
- Choose `textContent` or `innerHTML` — and know why raw user input must never become `innerHTML`
- Toggle classes with `classList` and build elements with `createElement` + `append`

## The DOM is a live tree

When the browser parses your HTML it builds the Document Object Model: a tree of nodes — `document` at the root, then `<html>`, `<head>`/`<body>`, and every element below. JavaScript does not edit HTML files; it edits this tree, and the browser repaints instantly. That is why your scripts must sit at the end of `<body>` or wait for the document to exist.

Two selectors replace the entire old zoo of `getElementById`, `getElementsByClassName`, `getElementsByTagName`:

```js
const grid = document.querySelector('#doctor-grid');       // first match, any selector
const cards = document.querySelectorAll('.doctor-card');   // every match → NodeList

const header = document.querySelector('header h1');        // CSS selectors work in full
const firstInput = document.querySelector('form input[name="patientName"]');
```

`querySelector` returns one element (or `null`), `querySelectorAll` returns a static NodeList. A NodeList looks like an array but is not one — you can `forEach` it, but not `map`/`filter` without converting first (`[...document.querySelectorAll('.card')]`).

## Read the tree before you change it

Chrome DevTools → **Elements** is the tree viewer: it shows nesting, the exact classes matched by your CSS, and the *computed* styles of any node. When your selector finds nothing, this is the fastest debugger — you visually confirm the real class name and structure instead of guessing. Practice: hover `#doctor-grid`, note its children appear inside it; right-click an `<h3>` → *Break on → subtree modifications* to pause JS that edits it.

## textContent vs innerHTML — the security fork

Both write into an element, but they are not interchangeable:

- **`textContent`** — treats the string as *text*. It is safe with anything, including user input.
- **`innerHTML`** — parses the string as *HTML*. Powerful for template-literal rendering, and dangerous when the string contains user data.

```js
const nameInput = document.querySelector('#patient-name');

el.textContent = nameInput.value;        // ✔ prints exactly what was typed
el.innerHTML   = nameInput.value;        // ✖ if someone types <img src=x onerror=alert(1)>
                                         //   the browser runs it — that is XSS
```

**Never inject raw user input with `innerHTML`.** Never. The rule: build cards with `innerHTML` only when every interpolated value is your own data or data from a trusted source, and sanitize anything else. When the value is user-entered — an appointment's patient name, for instance — write it with `textContent`.

You can combine both safely:

```js
const li = document.createElement('li');
li.textContent = appointment.patientName;              // user text → textContent
li.innerHTML = `<span class="time">${appointment.time}</span>`;  // own data → innerHTML
```

## classList — read and toggle classes

```js
const card = document.querySelector('.doctor-card');
card.classList.add('is-selected');        // add one
card.classList.remove('is-selected');     // remove one
card.classList.toggle('is-selected');     // flip on/off — perfect for filters and menus
card.classList.contains('is-selected');   // boolean check
```

`classList` never clobbers existing classes, unlike `card.className = '...'`, which replaces everything.

## createElement + append — building nodes, not strings

For small, data-driven pieces, string building hides structure. The programmatic route is explicit:

```js
function makeStatusBadge(status) {
  const badge = document.createElement('span');
  badge.classList.add('badge', `status-${status}`);   // .status-pending, .status-confirmed, ...
  badge.textContent = status;                          // status is fixed data — still use textContent by habit
  return badge;
}

const row = document.createElement('tr');
row.append(makeStatusBadge('pending'), ...);
```

`append` accepts several nodes or strings in one call; the older `appendChild` takes a single node.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital renders appointment rows into <tbody id="appointment-rows">.
Each row shows patientName, phone, date, time and a status badge with classes
badge status-pending | status-confirmed | status-completed | status-cancelled.

Write buildAppointmentRow(appointment): create the <tr> and its <td> cells with
createElement and append — patientName must be assigned with textContent so that
user input can never execute as HTML; other cells may use innerHTML. Add the badge
via classList. No global variable lookups inside the function; take no DOM queries
in it either. Then explain when querySelectorAll returns an empty NodeList and why.
```

## Practice

1. In the console on any page: select `#doctor-grid` with `querySelector`, list its children, and toggle a class — watch Elements update live.
2. Take a row-building loop from a past lesson that used `innerHTML` with user data and rewrite it with `createElement` + `textContent`.
3. Add, remove, then toggle `is-hidden` on an element, and log `classList.contains` after each step.
4. Investigate: create `<div id="probe"></div>`, set `probe.innerHTML = '<img src=x onerror="console.log(\'XSS ran\')">'`, and note what fires — then repeat with `textContent` and note what does not.

## What's next

Next up is *Event Handling & Delegation*, where static selections start reacting — clicks, typing and submits captured with `addEventListener`, plus delegation to handle Book buttons and delete rows that did not exist when the page loaded.
