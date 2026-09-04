# Lab: filtering doctors by specialty

## Learning objectives
- Combine a specialty `<select>` and a search input into one live filter
- Re-render the card grid from filtered data and keep the UI in sync with the data
- Handle each card's Book button with delegation, not per-button listeners

## The feature

The Highland landing page shows all six doctors (chapter 9's lab). Now the user picks `Cardiology` in a `<select>` — or types `an` into a search box — and the grid updates instantly. Filtering never touches the source array: a *new* filtered array is rendered, and rendering it does not lose the filter.

## The page shell

```html
<main class="container">
  <h1>Find your doctor</h1>

  <section class="row g-3 align-items-end mb-4" id="doctor-filters">
    <div class="col-md-4">
      <label for="specialty-filter" class="form-label">Specialty</label>
      <select id="specialty-filter" class="form-select">
        <option value="all">All specialties</option>
        <option value="Internal Medicine">Internal Medicine</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Dermatology">Dermatology</option>
      </select>
    </div>
    <div class="col-md-4">
      <label for="search-input" class="form-label">Search by name</label>
      <input id="search-input" type="search" class="form-control" placeholder="e.g. Dr. An">
    </div>
    <p id="result-count" class="text-muted mb-0"></p>
  </section>

  <section id="doctor-grid" class="doctor-grid"><!-- re-rendered by JS --></section>
</main>

<script src="js/data.js"></script>
<script src="js/logic.js"></script>
<script src="js/app.js"></script>
```

## A pure filter function — easy to reason about, easy to test

Put the combination logic in `logic.js` as one pure function. Pure means: same inputs, same output, no DOM, no `localStorage`, nothing mutated:

```js
// logic.js
function filterDoctors(allDoctors, { specialty = 'all', query = '' } = {}) {
  const term = query.trim().toLowerCase();

  return allDoctors.filter(doctor => {
    const matchesSpecialty = specialty === 'all' || doctor.specialty === specialty;
    const matchesQuery = term === '' || doctor.name.toLowerCase().includes(term);
    return matchesSpecialty && matchesQuery;
  });
}
```

## app.js — read controls, compute, render

The filter state always comes from the controls; the renderer never invents its own state:

```js
// app.js
const specialtySelect = document.querySelector('#specialty-filter');
const searchInput = document.querySelector('#search-input');
const grid = document.querySelector('#doctor-grid');
const resultCount = document.querySelector('#result-count');

function applyFilters() {
  const filtered = filterDoctors(doctors, {
    specialty: specialtySelect.value,
    query: searchInput.value,
  });
  renderDoctorCards(filtered);                    // chapter 9's renderer, reused
  resultCount.textContent =
    `${filtered.length} of ${doctors.length} doctors shown`;
}

// input fires per keystroke (instant search); change fires when a choice is committed
searchInput.addEventListener('input', applyFilters);
specialtySelect.addEventListener('change', applyFilters);

applyFilters();                                   // initial render on load
```

Read the flow top to bottom and note the discipline: the function that changed (the select or the input) is the only thing that asks for a re-render; `renderDoctorCards` replaces the grid's content, so the filter survives; and empty results are a *valid* outcome — "0 of 6 doctors shown" is informative, not an error. If you want a friendly empty state, that is an `if (filtered.length === 0)` branch in `applyFilters`, not a special case buried in the renderer.

## Book buttons stay delegated

Chapter 10 lesson 2's listener needs no changes at all — it sits on the stable `#doctor-grid` container and finds Book buttons with `closest`:

```js
grid.addEventListener('click', (event) => {
  const button = event.target.closest('.btn-book');
  if (!button) return;
  const doctor = doctors.find(d => d.id === Number(button.dataset.id));
  openBookingModal(doctor);                       // chapter 11 wires the real flow
});
```

Re-rendering the grid every keystroke creates and destroys buttons constantly; because the listener lives on the container, that churn is invisible to it. Filter, render, click — all three coexist without any of them re-attaching listeners.

### Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Highland Hospital doctors are { id, name, specialty, experience, fee, avatar } with
six doctors: two Internal Medicine, two Cardiology, one Pediatrics, one Dermatology.

Write, for files data.js / logic.js / app.js:
1. filterDoctors(allDoctors, { specialty, query }): specialty 'all' or an exact match;
   query matched case-insensitively against the name after trim; both conditions ANDed.
2. app.js wiring: an input listener on #search-input and a change listener on
   #specialty-filter both calling applyFilters(), which renders the filtered array
   into #doctor-grid and updates #result-count text. No other DOM writes anywhere.
3. A delegated click listener on #doctor-grid that resolves the nearest .btn-book's
   data-id against the doctors array and calls openBookingModal(doctor).
Show the console output of filterDoctors(doctors, { specialty: 'Cardiology',
query: '' }) and filterDoctors(doctors, { specialty: 'all', query: 'an' }).
```

## Practice

1. Type `an` into the search box: you should see Dr. Nguyen Van An and Dr. Vo Thanh Nam (both contain "an"). Now pick *Cardiology* with no query: two doctors. Combine both — the results are the intersection.
2. Self-analysis (write it down): why does filtering not lose your search text? What would happen if `renderDoctorCards` appended cards instead of replacing the grid content? Which single line makes the input field search as you type?
3. Add an empty-state message ("No doctors match your filters") as a pure `if` in `applyFilters`.
4. Use `closest` and `dataset` to make each Book button log its doctor's name — without touching `renderDoctorCards`.

## What's next

Next up, in chapter 11, the Book button finally does something real: *Fetch API & Async/Await* turns `openBookingModal` into a genuine multi-step booking flow against a mock API.
