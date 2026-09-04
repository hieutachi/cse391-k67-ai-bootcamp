# Cards & List groups

## Learning objectives
- Assemble the card anatomy: `card`, `card-img-top`, `card-body`, `card-title`, `card-text`
- Lay out uniform card grids with `row-cols-*` and know when `card-group` fits
- Flatten lists into `list-group` with `list-group-flush`
- Build a complete doctor card for Highland Hospital and prompt the AI for real data

## Card anatomy

A card is a bordered, rounded box with flexible parts — the base class `card` plus at least one child region:

```html
<div class="card">
  <img src="img/dr-ava-stone.jpg" class="card-img-top" alt="Portrait of Dr. Ava Stone">
  <div class="card-body">
    <h3 class="card-title">Dr. Ava Stone</h3>
    <p class="card-text text-body-secondary">Cardiologist · 12 years of experience</p>
    <a href="booking.html" class="btn btn-primary btn-sm">Book a visit</a>
  </div>
</div>
```

- `card-img-top` fills the card's top and rounds its top corners (`card-img-bottom` for the bottom edge).
- `card-title` and `card-text` are typography helpers — not required classes, they just inherit the card padding.
- Any Bootstrap content fits in a card body: buttons, badges, lists, even forms. `card-header` and `card-footer` add the two reserved bands when a grid of cards needs a title strip or an action strip.

## Row-cols-* lays out the whole grid

Writing `col-*` on four cards repeats itself. Put the column rules on the `row` instead — `row-cols-*` sets how many columns every direct child gets at each breakpoint:

```html
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
  <div class="col"><div class="card h-100">Dr. Ava Stone — Cardiologist</div></div>
  <div class="col"><div class="card h-100">Dr. Liam Fox — Pediatrician</div></div>
  <div class="col"><div class="card h-100">Dr. Maya Chen — General practitioner</div></div>
  <div class="col"><div class="card h-100">Dr. Noah Patel — Radiologist</div></div>
</div>
```

`row-cols-1 row-cols-md-2 row-cols-lg-4` reads as *one per row on phones, two on tablets, four on desktop* and applies to every child `col` automatically. Combine with `h-100` (from Lab: the Services section) and the whole grid stays level. `card-group` is the alternative for a tight, glued row of equal cards — no gutters, one visual unit — use it sparingly.

## List groups

A `list-group` renders list items as a clean block with hover states — ideal for department menus or appointment summaries. `list-group-flush` removes the outer borders so the list sits flush inside a card or page edge:

```html
<ul class="list-group list-group-flush">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Cardiology <span class="badge text-bg-primary rounded-pill">2 free slots</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Neurology <span class="badge text-bg-warning rounded-pill">1 slot left</span>
  </li>
  <!-- more departments… -->
</ul>
```

Add `list-group-item-action` and the items become full-width clickable rows — perfect for a "pick a department" step.

## A complete Highland Hospital doctor card

```html
<div class="card h-100 shadow-sm">
  <img src="img/doctors/ava-stone.jpg" class="card-img-top" alt="Dr. Ava Stone, cardiologist at Highland Hospital">
  <div class="card-body d-flex flex-column">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h3 class="card-title h5 mb-0">Dr. Ava Stone</h3>
      <span class="badge text-bg-success">Available today</span>
    </div>
    <p class="card-text text-body-secondary">Cardiology · 12 years</p>
    <ul class="list-group list-group-flush mb-3">
      <li class="list-group-item px-0">Mon – Fri, 8:00 – 15:00</li>
      <li class="list-group-item px-0">English &amp; Mandarin</li>
    </ul>
    <a href="booking.html" class="btn btn-primary mt-auto">Book a visit</a>
  </div>
</div>
```

The pattern is the Services-lab pattern plus a `list-group-flush`: the details list sits between the meta line and the bottom-aligned button (`mt-auto` again). Every card region reads top to bottom — image, title row with badge, meta, details, action.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Generate a "Meet our doctors" section for Highland Hospital with Bootstrap 5.3.
Use one row with row-cols-1 row-cols-md-2 row-cols-lg-4 and g-4 gutters. Each
doctor card has a portrait (use https://picsum.photos/seed/doctor1/400/300 or
placeholder), name, specialty and years of experience, an "Available today / On
leave" badge, and a "Book a visit" button linking to booking.html. Before you
write code, ask me for the four doctors' real names, specialties and languages —
do not invent patient-facing data.
```

That final sentence matters: a good AI prompt for real content **asks for the data it does not have** instead of fabricating doctor names for a hospital site.

## Practice

1. Build the doctor grid above, replacing the AI's invented data with four real-sounding, clearly labeled placeholder doctors.
2. Swap the four-card grid to a `card-group` and note the visual difference (glued vs. guttered) — then decide which fits a hospital homepage.
3. Ask an AI chat to add a `list-group list-group-flush` of consultation hours to the card, review the output, and explain the `mt-auto` role.

## What's next

Cards give content a home; the next lesson, Bootstrap Forms & Validation, makes those "Book a visit" buttons lead somewhere — a booking form that checks itself.
