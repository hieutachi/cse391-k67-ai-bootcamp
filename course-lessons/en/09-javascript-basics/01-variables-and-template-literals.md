# let/const & Template Literals

## Learning objectives
- Explain why modern JavaScript swapped `var` for `let` and `const`
- Use block scope and the "const by default" habit
- Build multi-line dynamic strings with template literals and `${}`

## Three ways to declare a variable — and why only two survive

Every ES5 codebase used `var`. ES6 introduced `let` and `const`, and well-run projects stopped using `var` for new code. The decisive difference is **scope**.

`var` is scoped to the nearest *function*, while `let` and `const` are scoped to the nearest *block* — the `{ ... }` of an `if`, a `for`, or any bare block.

```js
function varLeaks() {
  if (true) {
    var specialty = 'Cardiology';   // var: escapes the if block
  }
  console.log(specialty);           // 'Cardiology' — visible out here
}

function letStays() {
  if (true) {
    let specialty = 'Cardiology';   // let: trapped inside the block
  }
  console.log(specialty);           // ReferenceError: specialty is not defined
}
```

That leak causes real bugs — loop counters and scratch values escaping their block and silently overwriting each other. Block scope makes a variable exist only where it is needed.

Two legacy `var` behaviors are worth recognizing when you read old code: `var` may be redeclared (`var x = 1; var x = 2;` is legal, while `let` throws a SyntaxError), and a `var` declaration is hoisted to the top of its function as `undefined`, whereas a `let`/`const` binding lives in a "temporal dead zone" until its own line executes.

## Const by default, let only to reassign

Ask one question per variable: *do I reassign it?*

- **`const`** — the binding cannot be reassigned. The default for almost everything.
- **`let`** — you will reassign it: loop counters, accumulators, toggles.
- **`var`** — no new code. Ever.

```js
const fee = 500000;      // one doctor's consultation fee
fee = 600000;            // TypeError: Assignment to constant variable

let availableSlots = 3;  // the clinic still has free slots
availableSlots -= 1;     // must be able to change → let
```

Note what `const` does *not* do: it does not freeze objects. `const doctor = { name: 'Dr. An' }; doctor.name = 'Dr. Binh';` is perfectly legal, because `const` protects the variable binding, not the object's properties.

## Template literals: strings with superpowers

Template literals use backticks, and `${ }` inside them evaluates any expression and coerces it to text:

```js
const doctor = { name: 'Dr. Nguyen Van An', specialty: 'Internal Medicine', fee: 500000 };

const line = `${doctor.name} · ${doctor.specialty} · ${doctor.fee.toLocaleString('vi-VN')} VND`;
console.log(line); // Dr. Nguyen Van An · Internal Medicine · 500.000 VND
```

Compare that with the old approach — `doctor.name + ' · ' + doctor.specialty + ' · '` — and backticks win on readability alone. Any expression is allowed inside `${ }`: arithmetic, method calls, even a nested template literal.

Backticks also preserve newlines, which makes generating HTML feel natural:

```js
function doctorCard(doctor) {
  return `
    <article class="doctor-card">
      <img src="${doctor.avatar}" alt="Portrait of ${doctor.name}">
      <h3>${doctor.name}</h3>
      <p>${doctor.specialty} · ${doctor.experience} years experience</p>
      <span class="fee">${doctor.fee.toLocaleString('vi-VN')} VND</span>
    </article>`;
}
```

The function *looks* like the HTML it returns. Two details to remember: whitespace inside the backticks is real content, and to print a literal backtick or `${` you escape them as `` \` `` and `\${`.

One safety rule before you interpolate HTML everywhere: template literals trust their data. Interpolating a doctor object you typed yourself is fine; interpolating raw user input into HTML is how cross-site scripting (XSS) starts. Chapter 10 lesson 1 shows the safe alternative with `textContent`.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
We are building the Highland Hospital web portal. Doctors are objects shaped like
{ id, name, specialty, experience, fee, avatar }.

Write a function doctorCard(doctor) that returns one card as a template-literal HTML
string: an <article> with the avatar <img>, the doctor's name in an <h3>, a <p> with
specialty + experience years, and the fee formatted with toLocaleString('vi-VN').
Explain each line briefly, then add a two-line comment warning about when this
function must NOT be used (any data a user typed).
```

Try writing `doctorCard` yourself for ten minutes before running the prompt — the gap between your version and the AI's is the fastest lesson in this course.

## Practice

1. Fix the scope bug and convert to `const`/`let` — predict the output before running:
```js
const fees = [400000, 500000, 600000];
var mostExpensive = 0;
for (var i = 0; i < fees.length; i++) {
  if (fees[i] > mostExpensive) { mostExpensive = fees[i]; }
}
console.log(i, mostExpensive);   // why is `i` visible here? Fix it.
```
2. In the browser console, declare `const clinicName = 'Highland Hospital'` and build `Welcome to ${clinicName} — today you will see ${doctor.name}` from your own object.
3. Extend `doctorCard` with a `<button>Book</button>` inside the card. Note every template-literal mistake you make before it renders — that list is what to watch for next time.

## What's next

Next up is *Arrow functions & Destructuring*, where the verbose `function` keyword and dot-by-dot object access give way to concise arrows and one-line unpacking of the very doctor objects you just rendered.
