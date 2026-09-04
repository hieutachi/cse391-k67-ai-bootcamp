# Navbar & navigation

## Learning objectives
- Assemble a responsive navbar from `navbar`, `navbar-expand-lg`, `navbar-brand`, `nav-link` and the toggler
- Remember that the hamburger button only works when the Bootstrap JS bundle is loaded
- Switch between nav pills and nav tabs for in-page navigation
- Build the Highland Hospital navbar with a "Book appointment" button

## Anatomy of a navbar

Bootstrap's navbar is a stack of opinionated pieces. Read them in order:

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
  <div class="container">
    <a class="navbar-brand" href="#">🏥 Highland Hospital</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNav" aria-controls="mainNav"
            aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#home">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
        <li class="nav-item"><a class="nav-link" href="#doctors">Doctors</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
        <li class="nav-item ms-lg-3">
          <a class="btn btn-primary" href="booking.html">Book appointment</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Piece by piece:

- `navbar` — the base; `navbar-expand-lg` says *below 992px, collapse the links behind a hamburger; at 992px and up, show them in a row*.
- `navbar-brand` — the logo/title, styled larger and padded.
- `navbar-toggler` — the hamburger. It is a `<button>` whose `data-bs-toggle="collapse"` and `data-bs-target="#mainNav"` point at the collapsible element's id.
- `collapse navbar-collapse` — the wrapper holding the links. On small screens it is hidden until the toggler opens it.
- `nav-link` on each anchor; `active` + `aria-current="page"` marks the current page for styling *and* screen readers.
- `ms-auto` pushes the whole list right; `ms-lg-3` adds a gap before the button, which uses the `btn` recipe from Buttons, Badges & Alerts instead of `nav-link` because it should stand out.

## The one thing beginners forget

**Without `bootstrap.bundle.min.js` at the end of `<body>`, the hamburger does nothing.** The toggler is pure data-attribute glue: `data-bs-toggle="collapse"` is only read by Bootstrap's JavaScript. If you click the hamburger and nothing happens, do not debug your HTML — check that the bundle tag is present and that DevTools shows no console error.

## Nav tabs and pills

The same `nav` system powers tabs (bordered, content-switching look) and pills (rounded buttons), with each item still a `nav-link`. `nav-underline` is the third, underline-only variant from 5.3:

```html
<ul class="nav nav-pills">
  <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">General</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Cardiology</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Pediatrics</a></li>
</ul>
```

For a real tab *panel* (clicking swaps content) you need `data-bs-toggle="tab"` and matching `tab-pane` sections — also JavaScript-driven, so again: bundle required. Nav tabs suit a booking page that switches between "Book a visit" and "Manage appointment".

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
For the Highland Hospital website, generate a responsive Bootstrap 5.3 navbar:
brand "Highland Hospital" on the left, links Home, Services, Doctors and Contact
on the right (desktop) that collapse into a hamburger menu below the lg
breakpoint. The last item must be a "Book appointment" button linking to
booking.html. Use navbar-expand-lg, ms-auto, and a container inside the navbar.
Remember to include the bootstrap.bundle.min.js script and the navbar-toggler
with its data-bs-target. Tell me which part stops working if the JS bundle is
missing.
```

## Practice

1. Add the navbar to a fresh page and resize below 992px — verify the hamburger opens and closes the menu, then remove the JS bundle and confirm the failure mode you learned about.
2. Change the brand text to include a `navbar-brand` icon image or a Bootstrap icon.
3. Ask an AI chat to explain `aria-expanded` and `aria-controls` on the toggler, then check its answer with DevTools while toggling the menu.

## What's next

With navigation in place, the next lesson, Cards & List groups, builds the reusable content blocks — doctor profiles and appointment details — that fill the pages behind those links.
