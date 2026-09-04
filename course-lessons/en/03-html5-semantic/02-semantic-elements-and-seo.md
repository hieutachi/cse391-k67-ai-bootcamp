# Semantic elements & SEO

## Learning objectives
- Map `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` and `<footer>` onto the Highland Hospital homepage regions
- Use a single, logical `h1`–`h6` heading hierarchy
- Explain why semantic HTML improves SEO and accessibility — and when a plain `<div>` is fine

## Why tags carry meaning

Every element is a promise to three readers: the browser, the search engine and the assistive technology. `<div>` promises nothing — it is a neutral box. Semantic tags make promises: `<nav>` says "these links move you around this site", `<article>` says "this block stands on its own", `<h1>` says "this is the single most important heading on the page". A page built only from `<div>` still renders identically in a browser — the difference appears in search rankings and in screen-reader navigation.

## The regions of the homepage

```html
<body>
  <header>
    <p class="topbar">Open 24/7 · Emergency: (099) 123-4567</p>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#doctors">Doctors</a></li>
        <li><a href="#booking">Book an appointment</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Highland Hospital — expert care, close to home</h1>
      <p>Modern medicine with the warmth of a community hospital.</p>
    </section>

    <section id="services" aria-labelledby="services-heading">
      <h2 id="services-heading">Our services</h2>
      <article>
        <h3>General medicine</h3>
        <p>Routine check-ups and treatment of everyday illnesses.</p>
      </article>
      <article>
        <h3>Paediatrics</h3>
        <p>Child-friendly care from birth to adolescence.</p>
      </article>
    </section>

    <aside>
      <h2>Visiting hours</h2>
      <p>Outpatients: Mon–Sat, 07:00–19:00</p>
    </aside>
  </main>

  <footer>
    <p>© 2025 Highland Hospital. All rights reserved.</p>
  </footer>
</body>
</html>
```

How each tag maps to Highland Hospital:

- `<header>` — the intro band of the page: contact bar and navigation. Not "a header" visually, but the page's introductory header.
- `<nav>` — the primary menu. Wrapping the list in `<nav>` is what lets a screen-reader user jump straight to navigation.
- `<main>` — the unique core of this page. There should be exactly one, and it should not repeat content found on other pages.
- `<section>` — a themed group of content, each with its own heading: `#services`, `#doctors`.
- `<article>` — one self-contained unit inside a section: a single service card. It could be lifted onto its own page and still make sense.
- `<aside>` — a sidebar with content related to but separate from the main flow, such as visiting hours.
- `<footer>` — closing info shared across pages.

## The heading hierarchy

Headings are a document outline, not a sizing tool. `h1` is the page topic — only one per page. `h2` marks the major sections (`Services`, `Doctors`, `Booking`), and `h3` sub-parts of those sections (a single service card). Never skip from `h2` to `h4`; never pick `<h3>` because "it looks smaller". If you need smaller text, CSS does that — the heading tag stays honest about its rank.

## div vs semantic

Keep the mental rule: *semantic by default, `<div>` when nothing fits.* Use `<div>` for pure layout wrappers — a flex container that groups two buttons, a card's inner padding box — because no semantic tag is meant for those. Use semantic tags when you can name what the content *is*, not just how it looks.

## What semantic HTML buys you

- **SEO** — search engines extract structure: they index the heading hierarchy, treat `<nav>` links as navigation, and reward one clear `<h1>` describing the page topic.
- **Accessibility** — a screen reader announces "navigation landmark", "main landmark" or "article" so a blind visitor can jump between regions without reading every line.
- **Future-proofing** — browsers and assistive tools keep adding features built on these landmarks; a page of bare `<div>`s cannot opt in later.

### Sample prompt — semantic skeleton of the homepage

```text
Context: I am building the landing page for Highland Hospital, an English general-hospital website. I have already drafted the page content.

Requirement: produce the complete semantic HTML skeleton of the homepage.

Constraints: use <header> with a <nav> listing Services, Doctors, and Book an appointment; exactly one <main> containing: a <section id="hero"> with a single <h1>, a <section id="services"> with an <h2> and one <article> per service (General medicine, Cardiology, Paediatrics, Emergency), a <section id="doctors"> for the doctor list, and an <aside> for visiting hours; then a <footer> with copyright text. Do not invent copy — use the content I provide. Do not add CSS, classes, or filler text.
```

## Practice

- Ask your AI assistant for the semantic skeleton of the homepage using the sample prompt above, then open the result in DevTools.
- Check the structure the way a machine does: run a free HTML validator and read its warnings about headings and landmarks.
- Rebuild the same page using only `<div>` tags, then write three sentences explaining what a search engine and a screen-reader user lose in that version.

## What's next

In **Forms & modern input types**, we add the interactive heart of the site — a booking form that collects a patient's name, email, phone, preferred date and specialty using modern HTML input types.
