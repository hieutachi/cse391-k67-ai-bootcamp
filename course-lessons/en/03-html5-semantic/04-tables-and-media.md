# Tables, images & SVG

## Learning objectives
- Build an accessible table with `<caption>`, `<thead>`, `<tbody>`, `scope` and `colspan`
- Use `img` with `alt`, explicit dimensions and `loading="lazy"`
- Draw a simple icon with inline SVG that inherits its color via `currentColor`

## Tables: data needs structure

A table communicates relationships between rows and columns. When a screen-reader user enters a table, the assistive technology must know what each cell *means* — which header applies to it. That meaning is built with markup, not pixels.

```html
<table>
  <caption>Outpatient department opening hours</caption>
  <thead>
    <tr>
      <th scope="col">Department</th>
      <th scope="col">Weekdays</th>
      <th scope="col">Weekends</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">General medicine</th>
      <td>07:00 – 19:00</td>
      <td>08:00 – 12:00</td>
    </tr>
    <tr>
      <th scope="row">Cardiology</th>
      <td>07:00 – 17:00</td>
      <td>Closed</td>
    </tr>
    <tr>
      <th scope="row">Paediatrics</th>
      <td colspan="2">07:00 – 20:00, every day</td>
    </tr>
  </tbody>
</table>
```

- `<caption>` — the table's title, read aloud before the data. Required for accessibility.
- `<thead>` / `<tbody>` — group header rows and data rows so the browser can repeat headers when a table breaks across pages or scrolls.
- `<th scope="col">` — "this cell is the header for its column". `<th scope="row">` — "this cell is the header for its row". The `scope` attribute is what lets a screen reader say "Cardiology, weekends: closed".
- `colspan="2"` — a cell that spans two columns, useful when a row's value covers every column.

Layout tables built with `<table>` and hacked with `colspan` are a pre-2000s technique — that is CSS Grid's job now (Chapter 5). Use `<table>` only for data.

## Images: every attribute pays rent

```html
<img src="images/cardiology.jpg"
     alt="Cardiologist reviewing an ECG monitor with a patient in the Highland Hospital cardiology unit"
     width="800" height="500"
     loading="lazy">
```

- `alt` — what a blind visitor hears in place of the picture. Describe what the image *shows*, not what the file is called. If the image is decorative, write `alt=""` so the screen reader skips it instead of reading a filename.
- `width` and `height` — reserve the image's space *before* it downloads. Without them, text jumps down when each image arrives (layout shift); with them, the browser can lay out the page immediately. CSS still controls the displayed size.
- `loading="lazy"` — the browser delays downloading off-screen images until the visitor scrolls near them. Apply it to images below the fold; never to the Hero image, which should load instantly. `fetchpriority="high"` on the Hero image tells the browser to start that download first.

## SVG: an image format that is also code

SVG files are vector drawings — circles, paths, text — that scale to any size without blurring, which makes them ideal for logos and icons. Inline SVG (written directly into the HTML) adds no network request and can be styled and recolored with CSS, unlike a `<img src="icon.png">`.

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
  <path d="M12 21s-7-4.35-7-9a4 4 0 0 1 7-2.83A4 4 0 0 1 19 12c0 4.65-7 9-7 9z"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
</svg>
```

This draws the "location pin" that sits next to the address in the hospital footer. The trick is `stroke="currentColor"`: the drawing inherits the CSS `color` of whatever element wraps it. Paint the footer link `color: teal` and the pin turns teal with one CSS rule, no image editor needed.

Add `aria-hidden="true"` because decorative icons must be skipped by screen readers, and `focusable="false"` because some browsers would otherwise tab into the SVG.

### Sample prompt — data and icons

```text
Context: I am building the Highland Hospital landing page and need two new pieces of content.

Requirement 1: produce an accessible HTML table of a consultation price list with columns: Specialty, Consultation fee, Notes.

Rows: General medicine 250,000 VND; Cardiology 400,000 VND (ECG included); Paediatrics 300,000 VND; Emergency 500,000 VND (24/7).

Constraint: use <caption>, <thead>, <tbody>, <th scope="col"> and <th scope="row">; the fee column uses <td>.

Requirement 2: give me the inline SVG code for a simple heart-cross medical icon, 24×24, stroke-based, using stroke="currentColor" and aria-hidden="true".

Output only the two code blocks.
```

## Practice

- Add the opening-hours table and the price-list table to `index.html`, each with `caption`, `thead`, `tbody` and `scope` attributes.
- Place a real photo of a hospital corridor (or any free stock image) above the fold and a second image further down with `loading="lazy"`. In DevTools → Network, reload and watch the second image's request arrive only when you scroll to it.
- Insert the location-pin SVG next to a footer address, give it a color with CSS, and zoom the page to 200% — the pin stays sharp where a PNG would blur.

## What's next

In **Lab: a semantic landing page**, you assemble everything from this chapter — document skeleton, semantic regions, booking form, tables and images — into the full homepage skeleton, with AI generating the first draft and you reading and annotating every line of it.
