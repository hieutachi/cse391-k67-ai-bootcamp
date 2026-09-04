# The 12-column grid system

## Learning objectives
- Build layouts from the three grid blocks: `container`, `row` and `col`
- Read and write breakpoint classes like `col-md-6 col-lg-4` and predict the result at each screen width
- Use offsets and gutters (`offset-*`, `g-*`) to space and position columns
- Lay out a 3-column Services row and a 4-column Doctors row for Highland Hospital

## Why twelve columns?

The grid splits every row into 12 columns because 12 divides evenly by 2, 3, 4 and 6. Three equal cards? Each takes `col-4`. Four doctors? Each takes `col-3`. Half-and-half? Two `col-6` columns. Almost every layout is a clean fraction of 12, so you never hand-roll percentages or media queries.

## The three building blocks

- `container` — a centered wrapper with responsive side margins; `container-fluid` is the full-width variant.
- `row` — a horizontal line of columns; it counteracts the container padding with negative margins and carries the gutters.
- `col` — a column. With no number, all columns share the row equally.

```html
<div class="container">
  <div class="row g-3">
    <div class="col border">Cardiology</div>
    <div class="col border">Pediatrics</div>
    <div class="col border">Pharmacy</div>
  </div>
</div>
```

The `border` class is just a utility so you can see the boxes. Three `col`s in one `row` means three equal columns.

## How the grid goes responsive

Every column class can carry a breakpoint prefix — the class then applies *at that width and above*. Bootstrap 5 uses: `sm` ≥ 576px, `md` ≥ 768px (tablets), `lg` ≥ 992px (laptops), `xl` ≥ 1200px, `xxl` ≥ 1400px. No prefix means "always".

So `col-md-6` is full width on a phone, then half width from 768px up. List several classes on one element and Bootstrap applies the right one at each width — the CSS media queries from Chapter 6 are now baked into class names.

```html
<!-- Services: 1 column on phones, 2 on tablets, 3 on desktop -->
<div class="row g-4">
  <div class="col-md-6 col-lg-4"><div class="card">Cardiology</div></div>
  <div class="col-md-6 col-lg-4"><div class="card">Pediatrics</div></div>
  <div class="col-md-6 col-lg-4"><div class="card">Pharmacy</div></div>
</div>
```

The numbers add up per breakpoint line: two `col-md-6` fill a tablet row (the third wraps below), and three `col-lg-4` fill a desktop row (3 × 4 = 12).

## The 4-column Doctors row

Four doctors use `col-lg-3` — four quarters of 12. On tablets we keep two per row so names stay readable:

```html
<div class="row g-4">
  <div class="col-md-6 col-lg-3"><div class="card h-100">Dr. Ava Stone — Cardiologist</div></div>
  <div class="col-md-6 col-lg-3"><div class="card h-100">Dr. Liam Fox — Pediatrician</div></div>
  <div class="col-md-6 col-lg-3"><div class="card h-100">Dr. Maya Chen — GP</div></div>
  <div class="col-md-6 col-lg-3"><div class="card h-100">Dr. Noah Patel — Radiologist</div></div>
</div>
```

`h-100` stretches every card to the height of the tallest in its row, so the bottom edges line up. You will use this constantly.

## Offsets

`offset-*` pushes a column right by that many grid units — the classic trick is centering a narrower column:

```html
<div class="row">
  <div class="col-md-8 offset-md-2">
    <p class="lead">Book an appointment at Highland Hospital in under two minutes.</p>
  </div>
</div>
```

`col-md-8 offset-md-2` means *8 wide, starting 2 from the left* — centered, because 2 + 8 + 2 = 12.

## Gutters: the space between columns

Gutters are the gaps between columns, set on the `row`. The scale mirrors spacing utilities: `g-3` is 1rem, `g-4` is 1.5rem. Use `gx-*` for horizontal-only gaps, `gy-*` for vertical-only, and `g-0` to remove gaps entirely.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
I am building the Highland Hospital homepage with Bootstrap 5.3. Generate the
skeleton HTML for two sections inside one <div class="container">: (1) a
Services section whose three cards are one per row on phones, two per row on
tablets (col-md-6), and three on desktop (col-lg-4); (2) a Doctors section
with four cards using col-md-6 col-lg-3. Use g-4 gutters and h-100 on the
cards. Placeholder text only — I will fill in the real content later.
```

## Practice

1. Recreate the 3-column Services row and 4-column Doctors row above, then resize the browser from 320px to 1400px and note exactly when each row reflows.
2. Invert the doctor grid: put eight doctors in the page and predict which classes keep them at 4-up on desktop and 2-up on tablet.
3. Change the gutters on one row to `g-0`, then to `gy-5`, and observe the difference before restoring `g-4`.

## What's next

Now that rows and columns behave predictably, the next lesson, Spacing, Color & Typography utilities, shows how to tune padding, color and type inside those columns without writing a line of CSS.
