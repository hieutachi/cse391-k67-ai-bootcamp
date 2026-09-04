# Persisting with localStorage

## Learning objectives
- Save, read and delete with `setItem`, `getItem`, `removeItem` and the `storage` event
- Serialize appointment arrays with `JSON.stringify`/`JSON.parse` — and handle corrupt data
- Build load/save/add/remove/update helpers as the single gate to storage

## What localStorage is — and is not

`localStorage` is a key/value store owned by the browser, scoped per origin (`scheme + host + port`), with no expiry — data survives reloads and browser restarts. It is why your booking list can persist in a course project with no server at all.

The honest limits: values must be **strings** (never objects — see below); the quota is roughly 5 MB per origin; it is synchronous, so it briefly blocks the main thread on large writes; and it is *not* a database — no queries, no indexes. Sensitive data (health details!) must never live here, and anything critical needs server-side storage. For the Highland portal's appointment demo it is exactly right.

## The three raw methods

```js
localStorage.setItem('key', 'value');     // store or overwrite
const raw = localStorage.getItem('key');  // read → string, or null when missing
localStorage.removeItem('key');           // delete one key
localStorage.clear();                     // delete everything for this origin
```

Because `setItem` takes only strings, a plain object stored directly becomes the useless text `"[object Object]"`. Hence the JSON step — objects in, text on the wire, objects back:

```js
localStorage.setItem('appointments', JSON.stringify(appointments)); // array → JSON text
const loaded = JSON.parse(localStorage.getItem('appointments'));    // text → real array
```

`getItem` returns `null` for a missing key, and `JSON.parse(null)` throws — which is why the read helper below checks first.

## The helper layer — the only place that touches storage

Keep `localStorage` calls in one module of small functions, then every other file calls these instead of raw APIs. You get one spot to handle missing data, one spot to handle corruption, and one spot to change later (say, to a real API) without touching the rest of the app.

```js
const STORAGE_KEY = 'highland_appointments';

function loadAppointments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];                       // first visit — nothing stored yet

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Corrupt appointments data, starting fresh', error);
    return [];                               // never crash the page on bad data
  }
}

function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

function addAppointment(appointment) {
  const all = loadAppointments();
  const next = [...all, { ...appointment, id: Date.now(), status: 'pending' }];
  saveAppointments(next);
  return next;
}

function removeAppointment(id) {
  saveAppointments(loadAppointments().filter(a => a.id !== id));
}

function updateAppointment(id, patch) {
  const next = loadAppointments().map(a =>
    a.id === id ? { ...a, ...patch } : a      // merge the patch into the match
  );
  saveAppointments(next);
  return next;
}
```

Notes on the design: every helper reloads, changes and saves — one source of truth, no stale copies kept in memory; `id: Date.now()` is a fine demo id but two tabs could collide, so a real app would use `crypto.randomUUID()`; and the whole layer is reusable across the landing page and the Admin Dashboard in chapter 12.

The returned `next` array matters: the UI re-renders from that *return value*, so the screen and the store never drift apart.

## When data changes in another tab

The `storage` event fires in *other* tabs of the same origin when a key changes — your own tab does not receive it. A minimal sync:

```js
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) renderAppointments(loadAppointments());
});
```

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital stores appointments as
{ id, patientName, phone, date, time, status } with status one of
pending | confirmed | completed | cancelled, under key 'highland_appointments'.

Write loadAppointments, saveAppointments, addAppointment, removeAppointment and
updateAppointment per these rules: load returns [] when the key is missing or the
JSON is corrupt (wrap parse in try/catch, require an array); add appends with
status 'pending' and a crypto.randomUUID() id; update merges a patch into the
matching appointment only; every save writes JSON.stringify. Each function returns
the new full array. Never mutate the stored array in place. Explain why getItem
needs an Array.isArray check.
```

## Practice

1. In the console, save three appointments, reload the page and confirm `loadAppointments()` still returns three objects with the same `patientName` values.
2. Type `localStorage.setItem('highland_appointments', 'not json')`, then call `loadAppointments()` — it should warn and return `[]`, not throw.
3. Chain add → update (change one status) → remove and log the array length and statuses after every step.
4. Open the same page in a second tab, add an appointment in tab A, and verify tab B's list updates through the `storage` listener.

## What's next

Next up is *Lab: filtering doctors by specialty*, the chapter's capstone — a specialty `<select>` plus a live search input filtering the doctors array and re-rendering the grid, with delegated Book buttons throughout.
