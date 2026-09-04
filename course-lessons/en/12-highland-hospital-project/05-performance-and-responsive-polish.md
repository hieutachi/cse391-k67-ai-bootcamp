# Performance & responsive polish

## Learning objectives
- Measure performance with Lighthouse in DevTools and read the results
- Optimize images: lazy-loading plus explicit `width`/`height` to prevent layout shift
- Check all three pages at 320 / 768 / 1024 / 1440 px
- Apply basic accessibility: contrast, `alt`, labels, visible focus

## Features are done — now quality

Lessons 02–04 made the site **work**. This lesson makes it **work well**: fast to open on a 3G connection, no layout jumping, readable by screen readers, usable with the keyboard alone. These are the criteria recruiters and clients check most often.

## Measure with Lighthouse

Lighthouse is a free audit tool built into Chrome:

1. Open `index.html` through Live Server (it must run over HTTP, not `file://`).
2. DevTools (F12) → **Lighthouse** tab.
3. Choose **Mobile**, category **Pages**, click *Analyze page load*.
4. Wait ~30 seconds, then read the four scores: **Performance, Accessibility, Best Practices, SEO** — each from 0–100.

The first run usually reports the same familiar issues. Record the scores before fixing so you can compare afterwards:

| Typical Lighthouse finding | What it means | Fix |
|---|---|---|
| "Serve images in next-gen formats" | JPEG/PNG images are heavy | Convert to WebP/AVIF and compress |
| "Properly size images" | Image is larger than its display box | Serve the right size + `srcset` |
| "Eliminate render-blocking resources" | CSS/JS blocks first paint | Keep the CDN, add `defer` to JS |
| "Preload Largest Contentful Paint image" | Hero image loads too late | Load the hero image early (default) |

## Images: lazy loading + right size

The golden rule of web images: **only load what the user is about to see, and only at the resolution they need**.

### 1. Lazy-load below-the-fold images

The hero image (visible on page open) must load immediately; every image **below the first viewport** — doctor portraits, testimonial photos — should be deferred:

```html
<!-- Landing: doctor images rendered by JS — add loading="lazy" inside the template -->
<img src="${d.avatar}" alt="Portrait of ${d.name}"
     loading="lazy" width="400" height="300" class="card-img-top doctor-avatar">
```

Add **`width` + `height`** to every image: the browser reserves exactly that space before the image arrives, preventing layout shift (the CLS score in Lighthouse). Note: the declared size is the file's intrinsic size — CSS still scales the image to fit the card.

### 2. Flexible image sources

Create two versions of an image (a 400px one for mobile, an 800px one for desktop) and let the browser choose:

```html
<img src="img/hero-800.webp"
     srcset="img/hero-400.webp 400w, img/hero-800.webp 800w"
     sizes="(max-width: 992px) 100vw, 50vw"
     width="800" height="500"
     fetchpriority="high"
     alt="Highland Hospital's doctors standing in the hospital lobby">
```

Quick explanation: `srcset` + `sizes` is the mechanism by which the browser picks the right file for the screen; `fetchpriority="high"` tells it to prioritize this image (reserve it for the single hero image — do not scatter it around).

## Cut layout shift & render faster

- **Give every image `width`/`height`** (done above) — the number one cause of layout shift.
- **Do not inject content mid-page after it has painted** — render the doctor grid into a container that reserves expected height instead of letting the page "jump" when JS runs.
- **Keep the navbar `fixed-top` but remember `scroll-padding-top`** (done in lesson 02).
- **Defer your JS** (done in lesson 03) — the browser paints the page first and runs scripts after.

All of these belong to the "Core Web Vitals" group: **LCP** (hero image loads fast), **CLS** (page does not jump), **INP** (button clicks respond instantly). Re-run Lighthouse after fixing; all three groups should be green.

## Responsive pass at four widths

Open DevTools responsive mode (Ctrl+Shift+M) and walk **all three pages** (index, booking, admin) at four widths:

| Width | Typical device | What to confirm on Highland |
|---|---|---|
| **320px** | iPhone SE / older Android | Navbar becomes a hamburger; cards are 1 column; nothing overflows sideways (no horizontal scrollbar); buttons are tappable |
| **768px** | iPad portrait | Services/doctors at 2 columns; the booking form is not squeezed |
| **1024px** | iPad landscape / small laptop | Doctors at 3 columns; the admin table scrolls inside `table-responsive` |
| **1440px** | Common desktop | Container centered nicely; images are not stretched or distorted |

Quick overflow check at 320px: drag the page sideways — if a horizontal scrollbar appears, find the offending element in DevTools Elements, or run this in the Console:

```js
// Find elements wider than the viewport — the cause of horizontal overflow
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.warn('Overflowing:', el.tagName, el.className, el.scrollWidth);
  }
});
```

## Basic accessibility — "good enough" is the standard

Four quick checks you can fix right now on your own project:

1. **Contrast** — light grey text on white (`text-secondary`, Bootstrap's default) can fall below the 4.5:1 standard for small text. Verify with Lighthouse or the *axe DevTools* extension. Quick fix: replace `text-secondary` with `text-body-secondary` (slightly darker) or set your own `#4b5563` color in `css/style.css`.
2. **`alt` describes the content** — `alt="Doctor photo"` is not enough; use `alt="Dr. Emma Wilson — Cardiology"`. Purely decorative images take `alt=""` so screen readers skip them.
3. **A label for every input** — each field needs a `<label>` whose `for` matches the input's `id`, or an `aria-label`. Icon-only buttons need a `title` or `aria-label` — the ✓ / ✕ / 🗑 buttons in the admin table are exactly the spot people forget.
4. **Visible focus** — Tab through the whole page: every link and button must show a clear focus outline (Bootstrap provides `:focus-visible`; never write CSS that removes `outline`).

```html
<!-- Example fix for an icon button in the admin table -->
<button class="btn btn-sm btn-outline-danger" data-action="delete"
        aria-label="Delete appointment of ${a.patientName}">🗑</button>
```

## Sample prompt — ask AI to audit

```text
Audit my Highland Hospital website for me (I will paste the full index.html,
css/style.css and js/main.js). Check and list the findings by priority:

1. Accessibility: semantic elements, heading levels, image alt text, form labels,
   aria-* attributes, keyboard focus
2. Performance: images missing width/height or loading="lazy", render-blocking resources
3. Responsive: inconsistent col classes, text or containers that could overflow at 320px
4. HTML errors: wrong tag nesting, duplicate ids, invalid attributes

For each issue give: location (line/section), why it is an issue, and a concrete fix.
Do not rewrite whole files — only list problems and where to fix them.
```

## Practice

- Run Lighthouse on all three pages and screenshot the starting scores.
- Fix images: add `width`/`height`, `loading="lazy"` on doctor images, convert 2–3 images to WebP (free placeholders are fine).
- Fix every contrast and `aria-label` issue, including the icon buttons in the admin table.
- Walk the 320/768/1024/1440 widths for all three pages, run the Console overflow snippet and fix what it finds.
- Run Lighthouse again — record the new scores and compare; aim for ≥ 90 Performance and 100 Accessibility on the compressed build.
- Run the audit prompt above and act on the three most important issues it finds (after verifying them yourself).

## What's next

The project now runs fast and smoothly on every screen. The final lesson — **Component thinking & next steps** — re-examines the whole project through the lens of components, points the way to React/Vue/Angular, and shows you how to deploy the finished product to the web.
