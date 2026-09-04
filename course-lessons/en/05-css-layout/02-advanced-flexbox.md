# Advanced Flexbox

## Learning objectives
- Grow, shrink and size flex items with `flex-grow`, `flex-shrink` and `flex-basis`
- Read and write the one-line `flex` shorthand
- Override alignment per item with `align-self` and reorder items with `order`
- Build equal-height service cards and push the booking button to the far right of the navbar

## Three properties, one negotiation

By default every flex item is sized by its content; `flex-grow`, `flex-shrink` and `flex-basis` decide what happens to the *leftover space* — the gap between the container's width and the items' natural width.

**`flex-grow` — claiming leftover space.** `flex-grow: 0` is the default: nothing claims extra space. Set `flex-grow: 1` and the item absorbs its share of the surplus; factors are ratios, so two items of `1` and `2` give the second item twice the extra space.

**`flex-shrink` — giving space back.** `flex-shrink: 1` is the default: a narrowing container shrinks items proportionally. `flex-shrink: 0` forbids it — the item keeps its size and the row overflows. That is the classic cause of "my flexbox is broken" reports.

**`flex-basis` — the starting size.** `flex-basis` sets each item's size *before* growing or shrinking: `auto` (default) means "use the content size", or pass a length like `200px`. Every item starts at its basis; grow then distributes the surplus and shrink absorbs the deficit.

**The `flex` shorthand.** Real code rarely writes the three longhands:

- `flex: 1` — grow, shrink, basis `0%`: items split the row into equal columns.
- `flex: auto` — `1 1 auto`: grows, but starts from the content size.
- `flex: none` — `0 0 auto`: never grows, never shrinks; fixed at content size.

`flex: 1` is the workhorse of card rows; `flex: none` suits a logo you never want crushed. Two gotchas: the `0%` basis is what makes `flex: 1` items truly equal, and items refuse to shrink below their content width without `min-width: 0` — the fix for overflowing rows.

**`align-self` and `order`.** `align-items` styles every item on the cross axis; `align-self` overrides a single one — say, an avatar that hugs the top of a stretching row. `order` changes *visual* order only (default `0`, negatives first), leaving keyboard and screen-reader order untouched; use it for visual tweaks, never to fix badly ordered HTML.

## Equal-height cards in a row

Leave the default `align-items: stretch` and every card matches the tallest one automatically; pair it with `flex: 1` for equal widths:

```html
<section class="services">
  <article class="card">
    <h3>Emergency care</h3>
    <p>Round-the-clock urgent treatment.</p>
    <a class="card__link" href="#booking">Book now</a>
  </article>
  <article class="card">
    <h3>Outpatient clinic</h3>
    <p>A deliberately longer description so this card would be taller on its own — the row keeps both cards equal anyway.</p>
    <a class="card__link" href="#booking">Book now</a>
  </article>
</section>
```

```css
.services { display: flex; gap: 1.5rem; }   /* stretch is the default */
.card {
  flex: 1;                 /* equal width and, with stretch, equal height */
  display: flex;           /* the card becomes its own column container */
  flex-direction: column;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.card__link { margin-top: auto; }   /* button pinned to the bottom of the card */
```

Two nested flex contexts: the row handles outer geometry, each card's inner column aligns its own content. `margin-top: auto` swallows the leftover space above the link, so every "Book now" shares one baseline even when the descriptions differ in length.

## Pushing the button to the far right of the navbar

Same trick, other axis. Inside the nav from Lesson 1, give the booking link `margin-left: auto`:

```html
<nav class="nav">
  <a class="nav__brand" href="/">Highland Hospital</a>
  <a href="#services">Services</a>
  <a href="#doctors">Doctors</a>
  <a class="nav__cta" href="#booking">Book an appointment</a>
</nav>
```

```css
.nav { display: flex; align-items: center; gap: 1.5rem; padding: 1rem 2rem; }
.nav__cta {
  margin-left: auto;                 /* absorbs all free space on its left */
  background: var(--color-primary);  /* teal #0f766e */
  color: #ffffff;
  padding: 0.5em 1em;
  border-radius: 8px;
  text-decoration: none;
}
```

`margin-left: auto` eats every pixel of free space, so the button pins to the right edge no matter how many links the nav gains — the same mechanism that later pins card buttons to their bottom edge via `margin-top: auto`.

## Sample prompt — explain my odd flex behaviour

```text
On the Highland Hospital homepage each service .card is flex: 1 1 240px inside a wrapping .services row (display: flex; flex-wrap: wrap; gap: 1.5rem). The cards overflow the row on a 1024px viewport instead of sharing the width, and an <img> inside each card refuses to shrink. Explain the mechanism using flex-basis, flex-shrink and the implicit min-width: auto of flex items, then give the minimal fix and why it works. Palette: teal #0f766e, dark slate #0f172a, light #f0fdfa.
```

## Practice

- Predict, then verify in DevTools' Computed panel: three items with `flex-grow: 1, 1, 2` and the same basis share a row in 1 : 1 : 2 proportions.
- Add the `margin-left: auto` CTA to your navbar, and rebuild the service cards with one long and one short description — the buttons must align at the bottom.
- Use `order: -1` to pull the call button before the booking button in the CTA row, and explain in one sentence why the HTML source should stay unchanged.

## What's next

In **CSS Grid basics** you move from one-dimensional rows to two-dimensional layout — columns and rows declared together with `fr` units and named areas, the tool that will structure the whole Highland Hospital homepage.
