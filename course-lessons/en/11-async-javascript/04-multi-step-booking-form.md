# Multi-step booking flow

## Learning objectives
- Split one long booking form into three focused steps: service + doctor → patient info + date/time → review
- Manage the whole flow with a `state` object and a `currentStep` number
- Move between steps with Back / Continue buttons that validate before advancing
- Show progress with a Bootstrap progress bar and step indicators

## Why split a form into steps?

A one-page booking form is long and easy to abandon. Three short steps let the user focus on one job at a time — and, just as importantly, let you **validate each step before the user moves on**, catching mistakes early instead of dumping ten errors at the final submit.

## HTML: three panels + a progress indicator

```html
<ol class="progress-indicator mb-4">
  <li class="step active" data-step="1">1. Service & doctor</li>
  <li class="step" data-step="2">2. Your details & time</li>
  <li class="step" data-step="3">3. Review & confirm</li>
</ol>
<div class="progress mb-4" style="height: 6px;" role="progressbar"
     aria-label="Booking progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="33">
  <div id="progress-bar" class="progress-bar" style="width: 33%"></div>
</div>

<form id="booking-form" novalidate>
  <section class="step-panel" data-panel="1">
    <h2 class="h5 mb-3">Choose a service</h2>
    <div class="mb-3">
      <label for="bk-specialty" class="form-label">Specialty</label>
      <select id="bk-specialty" class="form-select"></select>
    </div>
    <div class="mb-3">
      <label for="bk-doctor" class="form-label">Doctor</label>
      <select id="bk-doctor" class="form-select"></select>
    </div>
    <button type="button" class="btn btn-primary" data-action="next">Continue</button>
  </section>

  <section class="step-panel d-none" data-panel="2">
    <h2 class="h5 mb-3">Patient details</h2>
    <!-- #bk-name, #bk-phone, #bk-date, #bk-time live here -->
    <button type="button" class="btn btn-outline-secondary" data-action="prev">Back</button>
    <button type="button" class="btn btn-primary" data-action="next">Continue</button>
  </section>

  <section class="step-panel d-none" data-panel="3">
    <h2 class="h5 mb-3">Review your booking</h2>
    <dl id="bk-summary" class="row"></dl>
    <button type="button" class="btn btn-outline-secondary" data-action="prev">Back</button>
    <button type="submit" class="btn btn-success">Confirm booking</button>
  </section>
</form>
```

The step indicator is a plain list of three items carrying `data-step`; the `.progress-bar` changes its `width` to match the current step. Later you will style `.progress-indicator .step.active` in `css/style.css` with a highlighted color.

## State: one object holds everything

All data the user picks or types lives in the `state` object. Panels appear and disappear, but the data never lives *in* the DOM — it lives here, which is why going Back never loses what was entered:

```js
const state = {
  currentStep: 1,
  data: { specialty: '', doctorId: null, patientName: '', phone: '', date: '', time: '' },
};
const TOTAL_STEPS = 3;

function showStep(step) {
  state.currentStep = step;
  document.querySelectorAll('.step-panel').forEach((panel) => {
    panel.classList.toggle('d-none', Number(panel.dataset.panel) !== step);
  });
  document.querySelectorAll('.progress-indicator .step').forEach((el) => {
    el.classList.toggle('active', Number(el.dataset.step) === step);
  });
  const bar = document.querySelector('#progress-bar');
  const width = Math.round((step / TOTAL_STEPS) * 100);
  bar.style.width = `${width}%`;
  bar.closest('.progress').setAttribute('aria-valuenow', String(width));
  if (step === 3) renderSummary(); // last step: rebuild the review from state
}
```

## Navigation: write state, validate, then move

One delegated click listener on the form handles every Back / Continue button. Continue is blocked if the current step does not validate:

```js
document.querySelector('#booking-form').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action; // 'next' | 'prev'
  if (action === 'next' && !validateStep(state.currentStep)) return; // blocked here
  const next = action === 'next' ? state.currentStep + 1 : state.currentStep - 1;
  if (next >= 1 && next <= TOTAL_STEPS) showStep(next);
});
```

Each input writes straight into `state` as the user types or selects:

```js
const form = document.querySelector('#booking-form');

form.querySelector('#bk-specialty').addEventListener('change', (e) => {
  state.data.specialty = e.target.value;
  state.data.doctorId = null; // specialty changed → reset the chosen doctor
});
form.querySelector('#bk-name').addEventListener('input', (e) => {
  state.data.patientName = e.target.value.trim();
});
// ...same pattern for #bk-phone, #bk-date, #bk-time
```

`validateStep(step)` reuses the rules you learned in the Form Validation lesson but runs them **against `state`** (name ≥ 2 characters, a valid phone, a date not in the past, specialty and doctor chosen). It returns `true`/`false`; the next Lab writes the full version.

## The review step reads state only — and stays XSS-safe

Step 3 shows the patient's name — **user data** — so build it with `createElement` + `textContent`, never `innerHTML`:

```js
function renderSummary() {
  const summary = document.querySelector('#bk-summary');
  summary.innerHTML = ''; // clear the previous drawing
  const rows = [
    ['Specialty', state.data.specialty],
    ['Doctor', state.data.doctorId ? `Doctor #${state.data.doctorId}` : '—'],
    ['Patient', state.data.patientName],
    ['Date', state.data.date],
    ['Time', state.data.time],
  ];
  for (const [label, value] of rows) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    summary.append(dt, dd);
  }
}
```

### Sample prompt — three-step state machine

```text
Highland Hospital project, vanilla JS ES6+, Bootstrap 5. I have three <section class="step-panel"> elements inside #booking-form:
step 1 selects specialty + doctor, step 2 collects name/phone/date/time, step 3 reviews.
Write: a state object { currentStep, data }; a showStep(step) function that toggles the .d-none class on panels, updates .progress-bar width and the .step.active class;
delegated click handling on the form for button[data-action="next|prev"] — before allowing 'next', run validateStep(step) returning a boolean (name >= 2 chars, valid phone pattern, date not in the past, specialty and doctor selected);
on step 3 render the summary with createElement + textContent.
Explain in 5 lines why the data must live in state rather than being read from the DOM when switching steps.
```

## Practice

- Build the three panels from the HTML sample (static placeholder data for the doctor select for now).
- Write `state`, `showStep` and the delegated navigation; confirm Continue refuses to advance past a step with errors.
- Fill step 1, advance, then go **Back** — the values are still there, because they live in state.
- Watch the progress bar move 33% → 66% → 100%, and the `aria-valuenow` update to match.

## What's next

The three steps already run. The chapter's final Lab — **Lab: the complete booking flow** — joins everything up: rendering doctors from the mock API, validating each step, saving the appointment to `localStorage` on submit, and showing a Bootstrap confirmation modal.
