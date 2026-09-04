# Bootstrap Forms & Validation

## Learning objectives
- Build form controls the Bootstrap way: `form-label`, `form-control`, `form-select`, `form-check`
- Use `input-group` and floating labels for richer inputs
- Turn on client-side validation with `needs-validation`, `was-validated` and `invalid-feedback`
- Assemble the Highland Hospital booking form validating name, email, phone, date and specialty

## The Bootstrap form system

Bootstrap styles forms by *class*, not element type: an input or select becomes a control with `form-control` (text, email, date…) or `form-select` (dropdowns). Labels use `form-label`; checkboxes use `form-check`. Fields sit in grid columns for layout:

```html
<form class="row g-3">
  <div class="col-md-6">
    <label for="fullName" class="form-label">Full name</label>
    <input type="text" class="form-control" id="fullName" placeholder="Jane Doe">
  </div>
  <div class="col-md-6">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" placeholder="jane@example.com">
  </div>
</form>
```

This *two-column grid of labeled fields* is the default shape of any real booking form, and it stays responsive because `col-md-6` collapses to full width on phones.

## input-group and floating labels

Sometimes the label belongs inside the field. `input-group` fuses an `input-group-text` prefix to the control — the right tool for a phone's `+84` country code (the booking form below uses it). `form-floating` is the other option: the label starts inside the field and floats up on focus or content; it must come *after* the input, which needs a `placeholder` (invisible once filled) for the CSS to detect. Use it sparingly — a long "reason for visit" textarea reads well this way.

## Validation with was-validated

Bootstrap's validation is declarative: `required` and `type="email"` are native browser constraints, each message lives in a sibling `invalid-feedback` (you will see this pairing in the full form below), and `was-validated` on the `<form>` reveals every state after a submit attempt. `needs-validation` + `novalidate` hand control to Bootstrap instead of the browser's default tooltip; on submit, the `bootstrap.bundle.min.js` script adds `was-validated`, which turns on the green/red states and shows each `invalid-feedback`. Disabling the submit button until the form is valid needs your own JavaScript — that arrives in the JavaScript chapters.

## The Highland Hospital booking form

```html
<form class="row g-3 needs-validation" novalidate>
  <div class="col-md-6">
    <label for="name" class="form-label">Full name</label>
    <input type="text" class="form-control" id="name" required>
    <div class="invalid-feedback">Please tell us your name.</div>
  </div>
  <div class="col-md-6">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback">Please enter a valid email address.</div>
  </div>
  <div class="col-md-6">
    <label for="phone" class="form-label">Phone</label>
    <div class="input-group">
      <span class="input-group-text" id="phone-addon">+84</span>
      <input type="tel" class="form-control" id="phone" pattern="[0-9]{9,11}"
             aria-describedby="phone-addon" required>
    </div>
    <div class="invalid-feedback">Phone needs 9–11 digits.</div>
  </div>
  <div class="col-md-6">
    <label for="date" class="form-label">Preferred date</label>
    <input type="date" class="form-control" id="date" required>
    <div class="invalid-feedback">Choose a date for the visit.</div>
  </div>
  <div class="col-12">
    <label for="specialty" class="form-label">Specialty</label>
    <select class="form-select" id="specialty" required>
      <option value="" selected>Choose a specialty…</option>
      <option>Cardiology</option><option>Pediatrics</option>
      <option>Orthopedics</option><option>Neurology</option>
      <option>General practice</option>
    </select>
    <div class="invalid-feedback">Please pick a specialty.</div>
  </div>
  <div class="col-12 d-flex justify-content-end">
    <button type="submit" class="btn btn-primary">Request appointment</button>
  </div>
</form>
```

Read the choices: text for the name, `type="email"` for email, `input-group` for the country code, `pattern` to enforce digits on the phone, a native date picker, and a `form-select` whose first `<option>` is empty so `required` treats "no choice" as invalid. Every field that can fail carries its own `invalid-feedback`.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
I am building the Highland Hospital booking form with Bootstrap 5.3 validation.
Fields: full name, email, phone (with +84 prefix), preferred date, and a
specialty dropdown. Use needs-validation + novalidate, required on every field,
pattern="[0-9]{9,11}" on the phone, and an invalid-feedback message under each
control. Add the Bootstrap JS bundle. Explain what happens when a user submits
an empty form — step by step.
```

## Practice

1. Build the booking form and submit it empty — then fix each red field and resubmit to watch the green states.
2. Change the phone `pattern` to allow spaces and dashes, e.g. `[0-9 +-]{9,13}`, and check that the error message still reads clearly.
3. Ask an AI chat to add a "Send me SMS reminders" `form-check` under the date field, then verify the markup against this lesson's rules.

## What's next

The form is ready to be wrapped in chrome — the next lesson, Modal, Offcanvas & Accordion, shows how to present it as a dialog, a mobile drawer, or a step-by-step FAQ.
