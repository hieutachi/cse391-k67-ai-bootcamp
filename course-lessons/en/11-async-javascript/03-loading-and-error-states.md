# Loading & Error states

## Learning objectives
- Adopt the rule that every data-loading operation has three states: loading, success, error
- Show a Bootstrap `spinner-border` while waiting, and upgrade to a skeleton screen
- Handle failures with `try/catch` plus a visible Bootstrap alert with a **Retry** button
- Never leave the interface silently hanging — not while waiting, and not on failure

## Why silence is the worst failure

Fetching data takes time. If you only render when the data arrives, the user stares at an **empty region** and cannot tell: is it loading? Is it stuck? Did it fail? The professional convention: every data region is always in one of three explicit states.

| State | Interface | When |
|---|---|---|
| **Loading** | spinner / skeleton | request in flight |
| **Success** | real content | data arrived |
| **Error** | alert + retry button | the fetch failed |

## The Loading state

Bootstrap gives you a spinner with a single element. Note the `visually-hidden` text — the `role="status"` spinner is purely visual, so screen-reader users get a spoken "Loading…" instead:

```html
<div id="doctors-loading" class="text-center py-4">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading…</span>
  </div>
  <p class="text-muted mt-2 mb-0">Loading the list of doctors…</p>
</div>
```

Toggle it with `classList` — you learned this in the DOM chapter:

```js
const loadingBox = document.querySelector('#doctors-loading');
const container = document.querySelector('#doctors-container');
loadingBox.classList.remove('d-none');  // show spinner BEFORE fetching
container.classList.add('d-none');       // hide any stale content
```

A **skeleton** is classier: placeholder blocks that mimic the real layout and shimmer gently, so the eye reads "content is coming" instead of "this page is empty". Plain HTML + CSS:

```html
<div id="doctors-skeleton" class="row g-4 d-none" aria-hidden="true">
  <div class="col-md-4"><div class="card"><div class="card-body">
    <div class="skeleton-line skeleton-avatar mb-3"></div>
    <div class="skeleton-line w-75 mb-2"></div>
    <div class="skeleton-line w-50"></div>
  </div></div></div>
</div>
```

```css
.skeleton-line {
  height: 14px; border-radius: 4px;
  background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
.skeleton-avatar { width: 56px; height: 56px; border-radius: 50%; }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
```

## The Error state: alert + retry

The alert lives in the HTML, hidden until needed, with a Retry button that simply calls the **same** load function again:

```html
<div id="doctors-error" class="alert alert-danger d-none" role="alert">
  <h5 class="alert-heading">Could not load the doctors</h5>
  <p class="mb-2">Check your connection, or make sure JSON Server is still running.</p>
  <button id="btn-retry-doctors" class="btn btn-outline-danger btn-sm">↻ Retry</button>
</div>
```

Now the complete function that drives all three states — one function, one source of truth:

```js
async function loadDoctors() {
  const loading = document.querySelector('#doctors-loading');
  const container = document.querySelector('#doctors-container');
  const errorBox = document.querySelector('#doctors-error');

  // 1. show loading, hide stale content and any old error
  loading.classList.remove('d-none');
  container.classList.add('d-none');
  errorBox.classList.add('d-none');

  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const doctors = await response.json();

    // 2. success: hide loading, render, reveal content
    loading.classList.add('d-none');
    renderDoctors(doctors);
    container.classList.remove('d-none');
  } catch (error) {
    // 3. error: hide loading, show the alert
    loading.classList.add('d-none');
    errorBox.classList.remove('d-none');
    console.error('Loading doctors failed:', error);
  }
}

document.querySelector('#btn-retry-doctors').addEventListener('click', loadDoctors);
```

Why is the retry so cheap? Because all three states live inside one function, clicking **Retry** simply re-runs the whole state machine from the top. When the network dies, the user sees a clear message and a next action — never a frozen page.

### Sample prompt — three-state doctor loader

```text
Highland Hospital project (Bootstrap 5, vanilla ES6+ JavaScript). Write loadDoctors() that fetches "http://localhost:3000/doctors" from JSON Server with all three states:
1. Show the spinner inside #doctors-loading before the fetch starts.
2. On success, render doctor cards into #doctors-container and hide the spinner.
3. On error (network failure OR !response.ok), hide the spinner and show an alert-danger box #doctors-error that contains a "Retry" button wired to call loadDoctors() again.
Do not use innerHTML to render any user data. Provide sample HTML for the three regions: loading / container / error.
```

## Practice

- Add loading and error regions to your doctor list page using the samples above.
- Start JSON Server and reload the page — the spinner should appear, then vanish when data arrives.
- **Stop JSON Server** and click Retry: the alert appears immediately and the Console only shows the log line you wrote yourself.
- Upgrade the spinner to a three-column skeleton and watch the shimmer effect.

## What's next

Your async handling is solid. In **Multi-step booking flow** we wire it into the booking form: split into three steps with a `state` object and `currentStep`, Back/Continue buttons, and a Bootstrap progress indicator.
