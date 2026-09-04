# CSS units

## Learning objectives
- Distinguish absolute and relative units: px, %, rem, em, vh, vw, vmin, vmax
- Choose the right unit per job — rem for font-size, % for widths, em for spacing tied to the font
- Build a full-height hero with `min-height: 100vh`

## A unit is a promise about scale

Every measurement in CSS makes a promise about *what it scales with*. Pixels promise to ignore everything around them. Percentages promise to follow their parent. `rem` promises to follow the root font size, `em` its own element's font size, and `vh`/`vw` the viewport. Choose the promise that matches the intent — that is the whole skill.

| Unit | Scales with | Best for |
|---|---|---|
| `px` | nothing | hairline borders (`1px`), shadows, fixed icon sizes |
| `%` | the parent's corresponding size | widths of layout columns and images |
| `rem` | the root (`<html>`) font size | font sizes, most spacing |
| `em` | the element's own font size | padding inside a button, `border-radius` that grows with text |
| `vh` / `vw` | the viewport height / width | full-screen heroes, sticky headers |
| `vmin` / `vmax` | the smaller / larger viewport side | huge display type that fits any screen |

## Rules of thumb that cover 95% of cases

- **Font-size: rem.** If the user enlarges their browser's default font (accessibility setting), every rem-based size grows with it; `px` fonts stay frozen and can clip text. This is a hard rule for this course.
- **Widths: %.** `width: 100%` on an image means "as wide as its container", which is what lets layouts bend at every breakpoint. Never set a fixed `px` width on a container you expect to be responsive.
- **Spacing that should move with text: em.** Padding of `0.75em` on a button scales with its own font size, so one class works whether the button reads "Book" or "Book an appointment online". Padding of `0.75rem` also scales — with the *root* — which is fine for layout rhythm. The two differ when the button's own font-size changes: `em` follows it, `rem` does not.
- **Vertical space tied to the screen: vh.** The Hero should fill one viewport height; a sticky header should occupy `10vh` or a rem value — your call.
- **Borders and shadows: px.** A `1px` hairline border scaled to a font size would look wrong at large sizes; keep these absolute.

## The full-height Hero

The classic first use of viewport units is a Hero that fills the screen on arrival:

```css
.hero {
  min-height: 100vh;          /* at least one viewport height — never less */
  display: flex;
  align-items: center;        /* content vertically centred */
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.85),
    rgba(15, 118, 110, 0.75)
  ),
  url("../images/hospital-corridor.jpg") center / cover no-repeat;
  color: var(--color-white);
  padding: 2rem;
}
```

Use `min-height: 100vh`, not `height: 100vh`: if the headline wraps to two lines on a narrow phone, `height` locks the box and clips the extra line, while `min-height` lets the Hero grow and still scrolls to reveal everything. The gradient overlay guarantees the white text stays readable no matter what photo ships.

```html
<section class="hero">
  <h1>Highland Hospital — expert care, close to home</h1>
  <p>Book an appointment online in under two minutes.</p>
  <a href="#booking" class="btn-primary">Book an appointment</a>
</section>
```

### Sample prompt — sizing a full-screen section

```text
Context: I am building the Highland Hospital Hero. It must fill the entire viewport height on first load, keep its text readable over a background photo, and never clip content on small phones.

Requirement: write the CSS for .hero and a page wrapper that contains it.

Constraints: use min-height with a viewport unit (explain why not height), a gradient overlay over the background image, rem units for all font sizes, a line-height between 1.5 and 1.7 for the body copy, and % widths only where a width is needed; reference the page's custom color tokens rather than raw hex. No media queries. Then list, in one sentence each, which unit you chose for: the hero height, the h1 font-size, the paragraph font-size, and the button padding — and why.
```

## Practice

- Write the `.hero` rule above into `style.css` and link the corresponding HTML in `index.html`, with a real background photo.
- Resize the window from desktop to a 320px-wide phone (DevTools device toolbar): the Hero should always cover the screen, and the headline must never be cut off at the bottom.
- Swap `min-height: 100vh` for `height: 100vh`, shrink the window so the headline wraps, and scroll — you will see the clip that `min-height` prevents. Then swap it back.
- Re-set all font sizes currently in `px` in your stylesheet to `rem`, and re-read the result: the layout should look identical.

## What's next

In **Lab: building a Hero section**, you put the whole chapter to work — Box Model, CSS Variables, colors, typography and viewport units — drafting the Highland Hospital Hero with AI and then explaining every declaration line by line.
