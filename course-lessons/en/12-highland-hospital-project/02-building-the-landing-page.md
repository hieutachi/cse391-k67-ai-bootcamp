# Building the Landing Page with Bootstrap

## Learning objectives
- Build the complete Highland Hospital Landing Page with the Bootstrap 5 CDN, following the specs written in lesson 01
- Organize the source by role: structure in `index.html`, styles in `css/style.css`, logic in `js/main.js`
- Write per-section AI prompts and review the generated code against semantic standards

## Bootstrap from the CDN

Three lines of CSS in `<head>` and one `<script>` pair at the end of `<body>` is all it takes — grid and interactive components (navbar collapse, modal, carousel) all work because `bootstrap.bundle.min.js` already bundles Popper:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Highland Hospital — Expert care, close to home</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Build each region below, one section at a time -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

## The semantic skeleton

The page frame uses semantic tags; any region listed in the navbar gets an `id` so it can be anchored: `<header><nav>` → `<main>` holding `<section id="hero|services|doctors|testimonials">` → `<footer>`.

Because the navbar is `fixed-top` and would cover the top of the content, add this to `css/style.css`:

```css
body { padding-top: 72px; } /* navbar height */
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
```

`scroll-padding-top` compensates for the navbar when anchoring to `#doctors` — without it the section heading is hidden underneath.

## Step 1 — Navbar

```html
<nav class="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="index.html">🏥 Highland Hospital</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item"><a class="nav-link" href="#hero">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
        <li class="nav-item"><a class="nav-link" href="#doctors">Doctors</a></li>
        <li class="nav-item"><a class="nav-link" href="#testimonials">Reviews</a></li>
        <li class="nav-item ms-lg-3 mt-2 mt-lg-0"><a class="btn btn-primary rounded-pill px-4" href="booking.html">Book an appointment</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Points to review: `data-bs-target` matches the `id` of the collapsible block; the hamburger carries full `aria-*` attributes; the CTA is an `<a>` that navigates — not a `<button>`.

## Step 2 — Hero

A static two-column hero (text left, image right) that stacks automatically on mobile thanks to the 12-column grid — good enough for this project; a carousel only adds effects, not content value:

```html
<section id="hero" class="bg-primary bg-gradient text-white py-5">
  <div class="container py-lg-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-sm">The care you deserve, <br class="d-none d-lg-block">close to home</h1>
        <p class="lead mt-3 text-white-50">Highland Hospital brings together 120+ leading specialists — book your visit online in under two minutes.</p>
        <div class="d-flex flex-wrap gap-3 mt-4">
          <a href="booking.html" class="btn btn-light btn-lg rounded-pill px-4">Book now</a>
          <a href="#doctors" class="btn btn-outline-light btn-lg rounded-pill px-4">See our doctors</a>
        </div>
      </div>
      <div class="col-lg-6 text-center">
        <img src="img/hospital-hero.jpg" alt="The main lobby of Highland Hospital" class="img-fluid rounded-4 shadow-lg">
      </div>
    </div>
  </div>
</section>
```

## Step 3 — Services with Cards

A `row g-4` grid where each card sits in a `col-md-6 col-lg-4` (1 column on mobile → 2 on tablet → 3 on desktop). Write the six cards by hand once to see the HTML clearly; lesson 03 replaces them with a JS loop:

```html
<section id="services" class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <span class="badge bg-primary-subtle text-primary mb-2">Services</span>
      <h2 class="fw-bold">Comprehensive medical care</h2>
    </div>
    <div class="row g-4">
      <!-- Repeat this column block for 6 services: General checkup, Endoscopy,
           Laboratory tests, Diagnostic imaging, Cardiology, Dental care -->
      <div class="col-md-6 col-lg-4">
        <article class="card h-100 border-0 shadow-sm">
          <div class="card-body p-4">
            <h3 class="h5 fw-bold">🩺 General checkup</h3>
            <p class="card-text text-secondary">Full periodic health screening with lab tests, for individuals and companies.</p>
            <a href="booking.html" class="stretched-link text-decoration-none">Book now →</a>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
```

`stretched-link` makes the whole card clickable — tapping anywhere on the card triggers the link.

## Step 4 — Doctors & Testimonials

Leave the Doctors grid as an **empty** `<div id="doctorGrid" class="row g-4">` — lesson 03 will render doctor cards into it. Testimonials use the same `row g-4` pattern with three review cards:

```html
<section id="doctors" class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <span class="badge bg-primary-subtle text-primary mb-2">Our team</span>
      <h2 class="fw-bold">Specialist doctors</h2>
    </div>
    <div id="doctorGrid" class="row g-4"></div> <!-- JS renders doctor cards here -->
  </div>
</section>
```

## Step 5 — Footer

Three columns: an intro + opening hours, quick links, and contact details:

```html
<footer class="bg-dark text-white-50 py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">🏥 Highland Hospital</h2>
        <p class="mt-3">A private healthcare network with 20 years of experience and three facilities in the city.</p>
      </div>
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">Opening hours</h2>
        <ul class="list-unstyled mt-3">
          <li>Mon – Fri: 7:00 – 20:00</li>
          <li>Saturday: 7:00 – 17:00</li>
          <li>Sunday & holidays: 24/7 emergency</li>
        </ul>
      </div>
      <div class="col-lg-4">
        <h2 class="h5 text-white fw-bold">Contact</h2>
        <address class="mt-3 mb-1">12 Nguyễn Du, District 1, Ho Chi Minh City</address>
        <p class="mb-0">📞 1900 1234 · ✉️ hello@highlandhospital.vn</p>
      </div>
    </div>
  </div>
</footer>
```

## Sample prompt — build one section at a time

The spec you wrote in lesson 01 drops straight into the prompt, which produces a result that matches the design on the first try:

```text
Build a "Doctors" section with Bootstrap 5 for the Highland Hospital website.
Requirements:
1. Section id="doctors" with a bg-light background, a "Our team" badge and an h2 heading.
2. Inside it, an EMPTY <div id="doctorGrid" class="row g-4"> — I will render cards with JS later.
3. Briefly explain the role of each class you use (col, g-4, bg-light…).
4. Do NOT use inline styles and do NOT write any JavaScript.
Return only the section HTML, plus 3 responsive notes for a beginner.
```

Run this prompt for each region (hero, services, doctors, testimonials, footer), then assemble them into `index.html`. After every AI response, read each line before keeping it — that is the course's invariable rule.

## Semantic self-review

Open DevTools (F12) and check yourself:

- ✅ Exactly **one** `<header>`, **one** `<main>`, **one** `<footer>` per page; every region is a `<section>` containing a heading
- ✅ Only **one** `h1` (in the hero); other headings use `h2`/`h3` at the right levels; every image has a descriptive `alt`
- ✅ The "Book" links point to `booking.html`; nav links anchor to real `id`s; below 992px the navbar collapses into a hamburger without overflowing sideways

You can also paste the entire `<body>` to the AI with the instruction *"find semantic and tag-nesting errors"* — but reviewing it yourself first is faster and sticks better.

## Practice

- Create the complete `index.html` following the five steps; replace the six services and three testimonials with content of your own.
- Create `css/style.css`: Highland color variables plus a subtle shadow-lift hover effect for cards.
- Open it with Live Server and walk every region at desktop and mobile widths (DevTools responsive mode).
- Run the AI prompt for two regions you did not write yourself, review the output and keep whatever meets the standard.
- Run the semantic review checklist and fix every issue you find.

## What's next

The page is static and handsome — now make it *alive*: render the doctors from a data array, filter by specialty and search, and wire each Book button to open the booking modal, in **JavaScript interactivity on the Landing Page**.
