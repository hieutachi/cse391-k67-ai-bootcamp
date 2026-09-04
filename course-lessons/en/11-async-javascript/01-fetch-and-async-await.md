# Fetch API & Async/Await

## Learning objectives
- Explain why a network request must be asynchronous, and what a `Promise` is
- Write correct `async` / `await` code that calls `fetch()` and reads the body with `response.json()`
- Check `response.ok` so HTTP 404/500 responses become real, catchable errors
- Wrap every request in `try/catch` so a failed API never crashes the rest of the page

## Why async is required

JavaScript runs on a **single thread**: the same thread that executes your code also paints the page, scrolls it and answers every click and keystroke. If your code sat still waiting for a server reply, the whole tab would freeze — the spinner would stop spinning and buttons would feel dead, for seconds on a slow connection.

So the browser does not make you wait. `fetch()` returns immediately with a **Promise** — an IOU that says *"I don't have the data yet, but I will call you back with it — or with an error — later."* Meanwhile the thread keeps serving the user.

```js
const promise = fetch('http://localhost:3000/doctors');
console.log(promise); // Promise { <pending> } — not the data, just the IOU
```

## async/await reads like synchronous code

Chaining `.then()` callbacks works, but it nests quickly. `async`/`await` is a cleaner syntax that reads top-to-bottom while doing exactly the same thing:

```js
async function loadDoctors() {
  const response = await fetch('http://localhost:3000/doctors');
  const doctors = await response.json();
  return doctors;
}
```

Three grammar rules — AI assistants forget these constantly, so keep them in your own head:

- `await` is only legal **inside a function declared `async`**. Using it at the top level of a normal script is a syntax error.
- An `async` function **always returns a Promise**, even when it `return`s a plain value. The caller must `await` it (from another `async` function) or use `.then()`.
- `fetch()` resolves as soon as the response *headers* arrive. The *body* must still be read, and `response.json()` returns another Promise — so it needs its own `await`.

## The response.ok trap

Here is the trap that catches almost every beginner: `fetch` only *rejects* when the **network** itself fails (offline, wrong address, DNS error). When the server answers with `404 Not Found` or `500 Internal Server Error`, the fetch **resolves successfully** — from the network's point of view the server did reply. You must check the status yourself:

```js
async function loadDoctors() {
  const response = await fetch('http://localhost:3000/doctors');

  // fetch does NOT throw on 404/500 — you have to check this yourself
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const doctors = await response.json();
  return doctors;
}
```

`response.ok` is `true` for every status in the 200–299 range. Everything else — 404, 500, 503 — falls through to your `throw`, which sends the error straight into the nearest `catch`.

## try/catch — catch the error before it catches you

Anything that leaves your machine (network, server, disk) can fail at any moment. Without a `catch`, one failed request stops the whole script and the console turns red with an uncaught error. The standard shape for a booking page is:

```js
async function initBookingPage() {
  try {
    const doctors = await loadDoctors();
    renderDoctorSelect(doctors); // step 1 of the multi-step form
  } catch (error) {
    console.error('Booking page could not load doctors:', error);
    showErrorAlert('We could not reach the server. Please try again later.');
  }
}

initBookingPage();
```

One subtlety: if you call an `async` function without `await`-ing it, its errors become "unhandled promise rejections" that an outer `try/catch` cannot catch. Always `await` the call where you make it.

### Sample prompt — fetch with safe error handling

```text
Context: Highland Hospital booking page, vanilla JavaScript ES6+ in the browser, no framework.
Requirement: write an async function loadDoctors() that fetches GET "http://localhost:3000/doctors" (a JSON Server mock API). It must check response.ok and throw on failure, then return the parsed array via response.json().
Also write renderDoctorSelect(doctors) that fills a <select id="doctor-select"> with <option> elements created with createElement + textContent (do NOT use innerHTML for this).
Finally call loadDoctors() inside try/catch at the top level; on error call console.error with a clear message.
Explain in 3 lines why async/await is needed and why response.ok must be checked even though fetch succeeded.
```

Run the prompt, then read every line before keeping it. If the AI forgets `response.ok`, forgets an `await`, or sneaks in `innerHTML`, fix it yourself before running — that review habit is the whole point of this course.

## Practice

- In the browser Console, run `fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()).then(console.log)` — watch a real Promise resolve.
- Write `loadDoctors()` from the prompt, open DevTools → Network → Fetch/XHR, reload, and confirm the `GET` request with status `200`.
- Change the URL to `http://localhost:3000/doctors-typo` and confirm your code reports the 404 clearly instead of failing silently.
- The next lesson gives this code a real target: a mock REST API for Highland Hospital with `/doctors` and `/appointments` endpoints.

## What's next

`fetch` needs a real destination. In **Mocking a REST API** we spin up a local mock server with JSON Server — `npx json-server db.json` — and shape a `db.json` file for Highland Hospital, plus a pure `Promise` + `setTimeout` fallback for when you do not want to install anything.
