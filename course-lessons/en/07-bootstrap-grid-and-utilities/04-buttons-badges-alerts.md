# Buttons, Badges & Alerts

## Learning objectives
- Style and size buttons with `btn` variants, outline styles, `btn-lg` / `btn-sm` and the disabled state
- Use badges for statuses and counts on Highland Hospital content
- Show dismissible success, danger and warning alerts
- Combine a "Book now" button, a "New" badge and a form-error alert in one realistic snippet

## The button recipe

Every Bootstrap button starts with the same two classes: `btn` (the base) plus a variant such as `btn-primary`. Drop the variant and you get a bare button — the pairing is mandatory:

```html
<button type="button" class="btn btn-primary">Book an appointment</button>
<button type="button" class="btn btn-outline-primary">View services</button>
<a href="#" class="btn btn-success">Register</a>
```

`btn` works on `<button>`, `<a>` and `<input>` alike, which is handy when a link should look like a button. Reach for `btn-primary` (solid brand), `btn-outline-primary` (hollow — the secondary action beside a solid one), plus the semantic `btn-success` / `btn-danger` / `btn-warning` for actions with consequences.

## Sizes and states

`btn-lg` suits hero call-to-actions, `btn-sm` suits table rows and toolbars. The `disabled` class (on a `<button>`) or the `disabled` attribute (on an `<a>`) greys the control out and blocks clicks:

```html
<button type="button" class="btn btn-primary btn-lg">Book now</button>
<button type="button" class="btn btn-primary btn-sm">Edit</button>
<button type="button" class="btn btn-secondary" disabled>Unavailable</button>
<a href="#" class="btn btn-outline-primary btn-sm disabled">Details</a>
```

## Badges: small status pills

A badge is a compact label that scales to its parent font size, so one inside a heading or button inherits the right proportions automatically:

```html
<h2 class="h4">Pediatrics
  <span class="badge text-bg-success">Open today</span>
</h2>
```

For a notification dot pinned to a button corner, pair `position-relative` on the button with `position-absolute top-0 start-100 translate-middle` on the badge — read aloud that decodes as *top edge, past the right edge* — and round it with `rounded-pill`.

For status labels like "Available", "On leave" or "Confirmed", the pairing is `badge` + `text-bg-*`:

```html
<span class="badge text-bg-primary">Cardiology</span>
<span class="badge text-bg-success">Available today</span>
<span class="badge text-bg-warning">On leave</span>
<span class="badge text-bg-danger">Unavailable</span>
```

## Alerts

An alert is a message bar built from `alert` plus a variant — `alert-success`, `alert-danger`, `alert-warning`, `alert-info`. Add `alert-dismissible`, a close button with `data-bs-dismiss="alert"`, and the Bootstrap JS bundle, and users can close it:

```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Request received!</strong> We will confirm your appointment by email.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

`fade show` animates the entrance and exit; `role="alert"` makes screen readers announce the message. No JavaScript of your own is needed — `data-bs-dismiss` plus the `bootstrap.bundle.min.js` bundle (installed in lesson Installing Bootstrap 5) handles dismissal.

## One snippet: button + badge + form-error alert

```html
<section class="container py-5">
  <div class="row justify-content-between align-items-center g-3">
    <div class="col">
      <h2 class="h4 mb-1">General check-up — Health Plus plan</h2>
      <span class="badge text-bg-primary rounded-pill">New</span>
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-primary btn-lg">Book now</button>
    </div>
  </div>

  <div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
    <strong>Check the form:</strong> the phone number you entered has only 8 digits.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</section>
```

The `col` / `col-auto` pairing is a workhorse: the title column takes all free space while the button column shrinks to its own width, and `justify-content-between` pushes them to opposite edges.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For the Highland Hospital homepage, build a "Same-day appointments" panel using
Bootstrap 5.3 classes: a title in an h4 with a "New" rounded-pill badge next to
it, three status badges for departments (Open today, Few slots left, Fully
booked), a large "Book now" button, and below them a dismissible warning alert
that says same-day slots fill quickly. Use the 12-column grid and Bootstrap
utilities only — no custom CSS. Explain your variant choices briefly.
```

## Practice

1. Build the snippet above and click the close button on the alert — confirm it needs the Bootstrap JS bundle loaded to disappear.
2. Turn the department status badges into buttons: `btn-outline-primary btn-sm` for open departments and a real `disabled` state for "Fully booked".
3. Ask an AI chat to compare `alert-warning` and `alert-danger` for a "slots nearly full" message, then justify the choice yourself.

## What's next

Now that single components look right, the next lesson, Lab: the Services section, assembles the whole Services grid for Highland Hospital from icons, cards and utilities — still zero custom CSS.
