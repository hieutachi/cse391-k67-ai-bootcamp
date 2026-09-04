# Event Handling & Delegation

## Learning objectives
- Attach behavior with `addEventListener` and the common event types
- Read the event object — `target`, `currentTarget`, `preventDefault`, `type`
- Handle events on elements that are added later, using delegation on a container

## addEventListener — behavior separated from markup

You *can* write `onclick` in HTML, but you should not. Attributes sprinkle behavior across markup and only allow one handler. `addEventListener` keeps your JS in one file and supports many listeners, options and clean removal:

```js
const bookButton = document.querySelector('.btn-book');

bookButton.addEventListener('click', () => {
  console.log('Booking requested');
});
```

When the event fires, the browser hands your handler an **event object** — commonly named `e` or `event`:

```js
grid.addEventListener('click', (event) => {
  console.log(event.target);        // the deepest element actually clicked
  console.log(event.currentTarget); // the element the listener sits on (the grid)
  console.log(event.type);          // 'click'
});
```

The classic gotcha: in an inline `onclick` attribute, `this` is the element; with `addEventListener` plus an arrow function, `this` is *not* the element — use `event.currentTarget` when you want the element the listener is attached to.

## The events you will actually use

| Event | Fires when | Typical use |
|---|---|---|
| `click` | element clicked | Book buttons, filter chips |
| `input` | value changes (every keystroke) | live search-as-you-type |
| `change` | value committed | `<select>` specialty picker |
| `submit` | form submitted | booking form — always `preventDefault` first |
| `scroll` | element/page scrolls | sticky headers, infinite lists (throttle it) |

Form handlers must stop the default round-trip, which would reload the page and wipe your JS state:

```js
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();            // stop the native submit → page reload
  saveAppointment(collectFormData()); // your logic runs instead
});
```

`scroll` fires at high frequency — dozens of times per second. Attach it sparingly and consider throttling; a `console.log` inside a scroll handler will convince you why.

## Event delegation: one listener for N dynamic buttons

The chapter 9 lab rendered Book buttons via `innerHTML`, and next chapter's filter will re-render them constantly. Attaching one listener per button is fragile: every re-render orphans the old ones. Events **bubble** — they travel from the clicked element up through every ancestor — so one listener on a stable container catches clicks on any current or future child. That is delegation:

```js
const grid = document.querySelector('#doctor-grid');

grid.addEventListener('click', (event) => {
  const button = event.target.closest('.btn-book');   // climb to the nearest Book button
  if (!button) return;                                // ignore clicks on the card body
  const doctorId = Number(button.dataset.id);         // data-id="3" → 3
  console.log(`Booking doctor #${doctorId}`);
});
```

Three moves make it robust:

1. `closest('.btn-book')` — the click may land on the button's text node or a nested `<span>`; `closest` climbs to the nearest matching ancestor.
2. Early return when nothing matches — the container also receives clicks on cards, images and whitespace.
3. `event.target.closest(...)` (not `event.currentTarget.closest(...)`) — `target` is the deep element clicked; checking the whole subtree for that click is what makes the guard correct.

### Delete buttons in an appointment list

Rows rendered from stored appointments need a delete button — including rows created after the page loaded:

```js
// container that exists once, in the HTML
const list = document.querySelector('#appointment-list');

list.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-appointment');
  if (!deleteButton) return;

  const appointmentId = Number(deleteButton.dataset.id);
  removeAppointment(appointmentId);          // lesson 4 of this chapter
  list.querySelector(`[data-id="${appointmentId}"]`)?.remove();
});
```

One listener covers today's rows and every future row; nothing breaks when the list is re-rendered. `?.` is optional chaining — it returns `undefined` instead of throwing if no row matches the selector.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital: the doctor grid (#doctor-grid) is re-rendered whenever the user
filters by specialty. Doctors have { id, name, specialty, experience, fee, avatar },
and each card's Book button carries data-id.

1. Write one delegated 'click' listener on #doctor-grid that finds the nearest
   .btn-book, reads data-id as a number, and opens a booking modal
   (just call openBookingModal(doctorId) — do not implement it).
2. Explain in your own words why attaching one listener per button breaks after a
   re-render, and what event.target.closest('.btn-book') does when the user clicks
   the button's inner <span>.
```

## Practice

1. Attach `input`, `change` and `click` listeners to one search field and log `event.type` plus the current value — note which fires per keystroke and which fires only on blur/Enter.
2. Prevent a form's native submit, log the data, and confirm the page does not reload.
3. Add three dynamically created `<li data-id="...">` rows with delete buttons, then handle all deletions with a single listener on the parent `<ul>`. Verify a click on the button's padding still deletes the right row.
4. Predict and then verify: what does `event.target` log when you click empty space inside the container versus the button itself?

## What's next

Next up is *Client-side Form Validation*, where the booking form's `submit` handler grows real checks — required fields, email and phone formats, Bootstrap's `is-invalid`/`is-valid` states, and per-field error messages.
