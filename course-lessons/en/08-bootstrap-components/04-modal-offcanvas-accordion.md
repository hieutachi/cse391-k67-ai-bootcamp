# Modal, Offcanvas & Accordion

## Learning objectives
- Drive components from data attributes: `data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`
- Build a centered confirmation modal and an offcanvas filter drawer
- Structure an FAQ accordion with `data-bs-parent`
- Remember: all three components need the Bootstrap JS bundle

## The same grammar drives everything

Modal, offcanvas and accordion all run on three data attributes: `data-bs-toggle` (what the trigger does: `modal`, `offcanvas`, `collapse`), `data-bs-target` (which element to open — a CSS selector, usually `#someId`) and `data-bs-dismiss` (which open component a button closes). No id, no match — nothing happens. And none of it happens without **`bootstrap.bundle.min.js`** at the end of `<body>`. When a modal silently refuses to open, check the bundle and the id spelling first — the two top real-world causes.

## Modal

A modal is a dialog layered above the page — trigger, dialog, and parts inside:

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#confirmModal">Book this appointment</button>
<div class="modal fade" id="confirmModal" tabindex="-1"
     aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="confirmModalLabel">Confirm your booking</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Appointment with <strong>Dr. Ava Stone</strong> on <strong>Friday, 14:30</strong>.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm booking</button>
      </div>
    </div>
  </div>
</div>
```

The trigger's `data-bs-target` must match the modal's `id`; `modal-dialog-centered` vertically centers the box; `fade` adds the entrance animation; the X and Cancel both use `data-bs-dismiss="modal"`. The accessibility attributes (`tabindex="-1"`, `aria-*`) are part of the recipe, not decoration.

## Offcanvas

Offcanvas is a slide-in panel — full height on a side, or a bottom sheet — and the modern replacement for a cramped hamburger menu. Its markup mirrors the modal's:

```html
<button type="button" class="btn btn-primary" data-bs-toggle="offcanvas"
        data-bs-target="#filterDrawer">Filter doctors</button>
<div class="offcanvas offcanvas-end" tabindex="-1" id="filterDrawer"
     aria-labelledby="filterDrawerLabel">
  <div class="offcanvas-header">
    <h2 class="offcanvas-title fs-5" id="filterDrawerLabel">Filter by specialty</h2>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="f-cardio">
      <label class="form-check-label" for="f-cardio">Cardiology</label></div>
  </div>
</div>
```

`offcanvas-end` slides in from the right; use `offcanvas-start` for a mobile navigation menu and `offcanvas-end` for a filter drawer that keeps the doctor list uncluttered on small screens. Note `data-bs-dismiss` here is `"offcanvas"`, matching the toggle name.

## Accordion

An accordion is a stack of collapsible panels. Each item pairs a header button (`data-bs-toggle="collapse"`, `data-bs-target` → panel id) with a `collapse` body; point `data-bs-parent` at the accordion's id and opening one panel closes the others:

```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button"
              data-bs-toggle="collapse" data-bs-target="#faq1"
              aria-expanded="true" aria-controls="faq1">
        Do you accept walk-in patients?
      </button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        Yes — walk-ins are welcome for urgent care until 20:00. For specialists, an appointment is recommended.
      </div>
    </div>
  </div>
</div>
```

`show` on the first body opens it by default. Remove `data-bs-parent` and each panel toggles independently — useful for a longer FAQ where several answers should stay open at once.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For the Highland Hospital booking flow, generate three Bootstrap 5.3 pieces in
one page (JS bundle included): (1) a modal-dialog-centered confirmation modal
that shows the chosen doctor, date and time, triggered by a "Confirm booking"
button; (2) an offcanvas-end drawer titled "Filter doctors" with checkbox
filters for specialty; (3) an accordion with four FAQ entries about insurance,
walk-ins, parking and rescheduling, using data-bs-parent so only one opens at a
time. Point out which markup element each data-bs-target links to.
```

## Practice

1. Build the confirmation modal, then close it three ways: the X, Cancel, and a click on the backdrop.
2. Turn the Highland navbar from lesson Navbar & navigation into an `offcanvas-start` menu that replaces the collapse — and explain the trade-off to a classmate.
3. Change the FAQ accordion to allow multiple open panels (drop `data-bs-parent`) and describe the difference in behaviour.

## What's next

Every component is now familiar — the next lesson, Lab: FAQ & a static booking form, combines the accordion and the validated form into the actual `booking.html` page.
