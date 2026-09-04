# Flexbox vs Grid

## Learning objectives

- Apply the one-dimensional-versus-two-dimensional rule to choose a layout tool
- Read a layout problem and name which tool its shape demands
- Write prompts that ask AI to justify its layout choice instead of silently picking one
- Build the Highland Hospital doctor list both ways and compare the result

## One dimension or two — the whole rule

Beginners ask "which is better, Flexbox or Grid?" The senior answer: they are not rivals, they answer different questions.

- **Flexbox** is *one-dimensional*. It lays out items along a single line — a row **or** a column — and is brilliant when items flow along that line and you mainly control spacing and alignment along it.
- **Grid** is *two-dimensional*. It controls rows **and** columns together, and shines when content occupies cells of a plane at once.

The decision rule is short: **if the layout is one line — a nav, a button row, a card's inner column — use flexbox. If the layout is a plane where rows and columns must agree — a page skeleton, a card grid, a gallery — use grid.**

Two honest caveats keep you out of trouble. First, the tools overlap: grid can center one row and flexbox can wrap into a pseudo-plane. Prefer what states the intent plainly, not what merely works. Second, nested layouts are normal — a grid page full of flexbox components (or vice versa) is the professional norm, not a mistake.

## Comparison table

| | Flexbox | Grid |
|---|---|---|
| Dimension | One (main axis + cross axis) | Two (rows and columns together) |
| Direction | Content flows along a line: `row` or `column` | Content placed in named cells or by line numbers |
| Best for | Navbars, button rows, card internals, centring | Page skeletons, card grids, galleries, app shells |
| Sizing model | `flex-grow` / `flex-shrink` / `flex-basis` negotiation | `fr` tracks, `minmax()`, explicit areas |
| Wrapping | `flex-wrap: wrap` (rows of items) | Automatic by template; no extra property |
| Reordering | `order` on items | Any item placed anywhere by `grid-area` |
| The tell-tale question | "How should this row of items space out?" | "Where do these regions live on the page?" |

## Sample prompt — make AI justify its tool choice

```text
For the Highland Hospital landing page, I am building three pieces: the top navbar, the row of service cards, and the page shell that keeps a sidebar beside the main content. For each, say whether Flexbox or CSS Grid fits, explain your choice in one sentence, and warn against the wrong tool. Then produce the CSS for the service-card row and the shell only, using palette teal #0f766e, dark slate #0f172a, light #0fdfa. Do not write flexbox for a grid problem or grid for a flexbox problem — justify every property.
```

That last line matters. An AI that picks a tool for you silently leaves you unable to defend it in a code review; a prompt that forces the reasoning is also teaching you the same reasoning.

## The same doctor list, both ways

The doctors section is the chapter's project, so try it with each tool and learn where the boundary really sits.

### 1. With Flexbox (one row, wrapping into more)

```css
.doctors {
  display: flex;
  flex-wrap: wrap;          /* cards flow onto new lines when they run out of room */
  gap: 1.5rem;
}
.doctors .doctor-card { flex: 1 1 240px; }   /* grow to share the row, wrap when narrow */
```

Each line wraps independently, so the last row can be shorter than the others — and every card in a line is stretched to equal height. Good enough for a handful of doctors, and the wrapping is effortless.

### 2. With Grid (one true plane)

```css
.doctors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```

Now the browser creates as many equal 240px-minimum tracks as fit and the remaining space is shared evenly — all rows always align, and no flex item ever needs `min-width: 0`.

## Which one is right here?

Both render a usable doctor row, but their guarantees differ: flexbox promises *flowing lines*, grid promises *aligned cells on a plane*. For a card grid the plane is the stronger promise, and `auto-fit` with `minmax(240px, 1fr)` is the whole responsive system in one line — no breakpoints, no wrapper widths. The next lab builds that exact grid. Meanwhile, the navbar from Lesson 1 stays flexbox: it is one line of links, and grid would add ceremony without adding control.

## Practice

- Classify ten components of the Highland Hospital homepage as one- or two-dimensional, then defend each call in one sentence.
- Rebuild the doctor list both ways in separate files and note what changes — and what does not — when the last row holds two cards instead of four.
- Run the sample prompt and review the answer: does the AI justify `fr`, `minmax` and wrapping honestly, or reach for a default?

## What's next

In **Lab: the Doctor Cards grid** you build the chapter's centerpiece — the responsive grid of four doctor cards — with the `auto-fit` + `minmax()` pattern you just met, and annotate every line of its CSS.
