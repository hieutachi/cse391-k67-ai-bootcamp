# Forms & modern input types

## Learning objectives
- Structure a form with `<form>`, `<label>` and `<fieldset>` so every control has a clear name
- Choose the right input type for each piece of patient data: text, email, tel, date, number, radio, checkbox, select and textarea
- Apply `required`, `placeholder` and `autocomplete` correctly

## Why forms are the heart of the project

A hospital website earns its keep when a patient can book an appointment without a phone call, and that journey starts and ends in a form. The good news: modern HTML already knows what an email address, a phone number and a date *are*. Pick the right input type and the browser — and the on-screen keyboard of a phone — validates and fills data for you, for free.

## A booking form, built control by control

```html
<form action="/booking" method="post" id="booking-form">
  <fieldset>
    <legend>Patient details</legend>
    <div><label for="full-name">Full name</label> <input type="text" id="full-name" name="fullName" placeholder="e.g. Alex Nguyen" autocomplete="name" required></div>
    <div><label for="email">Email</label> <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" required></div>
    <div><label for="phone">Phone</label> <input type="tel" id="phone" name="phone" placeholder="+84 900 000 000" autocomplete="tel" required></div>
  </fieldset>
  <fieldset>
    <legend>Appointment</legend>
    <div><label for="specialty">Specialty</label>
      <select id="specialty" name="specialty" required>
        <option value="">Choose a specialty…</option>
        <option>General medicine</option>
        <option>Cardiology</option>
        <option>Paediatrics</option>
        <option>Orthopaedics</option>
      </select></div>
    <div><label for="date">Preferred date</label> <input type="date" id="date" name="preferredDate" required></div>
    <div><label for="slots">Preferred time</label>
      <select id="slots" name="slot" required>
        <option value="">Choose a slot…</option>
        <option>Morning (08:00–11:00)</option>
        <option>Afternoon (13:00–16:00)</option>
        <option>Evening (17:00–20:00)</option>
      </select></div>
    <fieldset>
      <legend>How did you hear about us?</legend>
      <label><input type="radio" name="source" value="search"> Search engine</label>
      <label><input type="radio" name="source" value="referral"> Doctor referral</label>
      <label><input type="radio" name="source" value="social"> Social media</label>
    </fieldset>
    <label><input type="checkbox" name="consent" required> I agree to Highland Hospital storing my details for this appointment.</label>
    <div><label for="notes">Notes for the doctor (optional)</label> <textarea id="notes" name="notes" rows="3" placeholder="Describe your symptoms…"></textarea></div>
    <button type="submit">Book appointment</button>
  </fieldset>
</form>
```

## Choosing the right control

- `type="text"` — free-form short text such as a name; the default when no type is given.
- `type="email"` — the browser rejects submissions that are not `name@domain`; phones add the `@` key.
- `type="tel"` — no format enforced (phone formats differ worldwide), but phones switch to a numeric keypad.
- `type="date"` — opens a native calendar picker and always submits `YYYY-MM-DD`.
- `type="number"` — spin buttons and numeric keyboards; ideal for age or quantity fields.
- `radio` — exactly one choice per group; radios sharing a `name` deselect each other.
- `checkbox` — independent on/off choices; essential for consent.
- `select` — a dropdown that saves space for long lists; the first empty option is a "please choose" prompt.
- `textarea` — multi-line free text for symptoms or notes.

## Attributes that earn their keep

- `for` + matching `id` — links a label to its control: clicking the text focuses the input, and screen readers announce the label on focus. *Never* use `placeholder` as a label — grey hint text disappears on typing.
- `required` — the browser blocks submission and shows a native message before any JavaScript runs.
- `placeholder` — an example of the expected format ("+84 900 000 000"); a hint, never the label.
- `autocomplete` — lets browsers and password managers prefill `name`, `email`, `tel`, removing real booking friction.
- `<fieldset>` + `<legend>` — groups related controls and names the group; required for radio groups.

## Validation: free, but early

Native validation runs when you submit, and it refuses to send until everything is valid — correct, but abrupt. Real products validate as the user types with styled messages: that is JavaScript (Chapter 10) and Bootstrap Forms (Chapter 8) work. For now, `required` plus the right input types is your first safety net.

### Sample prompt — a booking form component

```text
Context: Highland Hospital's website lets patients book appointments online; the homepage form collects personal and appointment details.

Requirement: generate the HTML5 booking form using only HTML — no CSS, no JavaScript.

Constraints: two <fieldset> groups ("Patient details", "Appointment") with <legend>; one <label for> per control; input types text (full name), email, tel, and date (preferred date); a <select> for specialty (General medicine, Cardiology, Paediatrics, Orthopaedics) and one for time slot; radios for "How did you hear about us?"; a required data-consent checkbox; a <textarea> for symptoms; essential fields required; autocomplete where it applies; a submit button reading "Book appointment". Output only the form markup.
```

## Practice

- Add the booking form to `index.html` below the Services section and open it in a browser.
- Submit it empty, then with an invalid email — note which fields the browser flags and how.
- Open the page in the phone emulator and focus the email, then the tel field: the keyboard that appears is the payoff of choosing the right input types.

## What's next

In **Tables, images & SVG**, we present data the browser should read as data — opening hours and a price list in `<table>` — and add `<img>` and inline `<svg>` graphics that stay crisp and accessible.
