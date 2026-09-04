# Lab: the Services section

## Learning objectives
- Slice the Highland Hospital Services design into grid, spacing and typography decisions
- Write a precise prompt that makes the AI produce a Bootstrap-only Services section
- Explain — line by line — the `h-100` and `mt-auto` pattern that aligns card buttons

## The brief

Highland Hospital needs its Services section: six services — Cardiology, Pediatrics, Orthopedics, Neurology, Laboratory & Diagnostics, and Pharmacy — each with an icon, a heading, one sentence of description and a "Learn more" link. The section must be fully responsive and, per the course styling rule, built with **Bootstrap classes only, no custom CSS**.

## Step 1 — Analyze the layout before prompting

Do this analysis yourself; never outsource the judgment. From the design:

- One section, a `<section>` with a heading that should sit above the grid → `py-5` + `text-center` + a `display-6`-ish heading and a `lead` intro.
- Six equal cards → `col-md-6 col-lg-4`, because 6 divides 12 on desktop (three per row × 2 rows) and 2 per row on tablet.
- Cards of unequal text length must stay equal height with buttons aligned at the bottom → `h-100` on the card plus a flex spacer (`mt-auto`) on the button.
- Vertical breathing room between rows → `gy-4` or `g-4` on the row.

## Step 2 — Draft with AI

```text
For Highland Hospital, generate the Services section with Bootstrap 5.3 classes
ONLY (no custom CSS, no inline styles). Use one row of six cards, each wrapping
in col-md-6 col-lg-4 with g-4 gutters. Each card: an icon in a circle at the
top (use Bootstrap Icons, e.g. bi-heart-pulse, bi-balloon-heart,
bi-activity, bi-dpad, bi-droplet-half, bi-capsule), a card title, one
sentence of description, and a "Learn more" link at the bottom of the card.
Make all cards equal height with h-100 and pin the link to the bottom with
mt-auto. Give the section a centered heading and intro. Bootstrap icons are
available via the CDN link
https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css.
```

Notice what the prompt pins down so the AI cannot drift: the exact classes for each breakpoint, the gutter, the icon set and names, equal-height behavior, and the CDN for icons. Vague prompts return vague markup.

## Step 3 — Read and understand every line

The AI returns something close to this — and you must be able to explain it:

```html
<section class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-6 fw-bold">Our services</h2>
      <p class="lead text-body-secondary mx-auto" style="max-width: 640px;">
        Comprehensive care, all under one roof.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <i class="bi bi-heart-pulse fs-1 text-primary mb-3"></i>
            <h3 class="h5 card-title">Cardiology</h3>
            <p class="card-text flex-grow-1">Heart checks, ECG and
               round-the-clock cardiac monitoring.</p>
            <a href="#" class="btn btn-link p-0 mt-auto align-self-start">Learn more</a>
          </div>
        </div>
      </div>
      <!-- …the other five services repeat this card… -->
    </div>
  </div>
</section>
```

Walk through the mechanics that keep this robust:

- `h-100` on `.card` makes every card as tall as the tallest card in its row, because the parent column stretches by default.
- `d-flex flex-column` on `.card-body` turns the card content into a vertical flex container.
- `flex-grow-1` on the description pushes all the slack space beneath it…
- …so `mt-auto` on the "Learn more" link pins it to the bottom edge — `margin-top: auto` absorbs whatever space the description left over.
- Icons use the Bootstrap Icons webfont: `<i class="bi bi-heart-pulse">` draws a glyph, and `fs-1` sizes it, `text-primary` colors it.

The one `style="max-width: 640px;"` inline style is a reasonable AI choice — cap an intro line without a custom CSS file — though `col-md-8 col-lg-6 mx-auto` on a wrapper would do the same in pure utilities.

## Step 4 — Refine

Check the generated page at 400px, 768px and 1200px. Common fixes an AI typically needs: the icon circle overlapping the title (add `mb-3`), the "Learn more" links not aligned (forgot `flex-grow-1` or `mt-auto`), or card borders touching on mobile (increase `g-*`). Then run the four-step loop once more if anything looks off.

## Sample prompt — when output quality disappoints

```text
My Highland Hospital Services grid has cards of different heights and the
"Learn more" links sit at different heights. It is built with Bootstrap 5.3
col-md-6 col-lg-4 cards. Fix it using ONLY Bootstrap classes — explain which
classes you add to make the cards equal height and the links bottom-aligned.
```

## Practice

1. Build the six-card Services section from the prompt and verify the reflow at phone, tablet and desktop widths in DevTools.
2. Swap in your own SVG icons or emoji if you prefer to skip the Bootstrap Icons dependency, keeping the layout identical.
3. Modify the prompt to ask for a "Learn more" link styled as `btn btn-outline-primary btn-sm` at the bottom, and describe how the layout changes.

## What's next

The Services section is live — in the next chapter the pieces start talking to each other, beginning with Navbar & navigation and the responsive hamburger menu.
