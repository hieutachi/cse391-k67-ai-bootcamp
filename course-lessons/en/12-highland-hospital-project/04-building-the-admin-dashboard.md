# Building the Admin Dashboard

## Learning objectives
- Lay out a dashboard: a navbar (or sidebar) plus a main content area
- Derive 4 metric cards (total, today, pending, completed) directly from the `appointments` array
- Build a data table with search-by-name and a status filter (pending / confirmed / completed / cancelled)
- Update status and delete rows via event delegation, persisting every change to `localStorage`

## The data source: appointments + localStorage

In the previous chapter, patients created appointments on the booking page. The dashboard must read **exactly the same source** — the key `highland_appointments` in `localStorage`, seeded from `js/data.js` the first time:

```js
// js/data.js — first-run seed data (used when localStorage is empty)
const seedAppointments = [
  { id: 1, patientName: 'John Smith',    doctorName: 'Dr. Emma Wilson',  specialty: 'Cardiology',       date: '2026-05-18', time: '08:30', status: 'pending' },
  { id: 2, patientName: 'Mary Johnson',  doctorName: 'Dr. Liam Carter',  specialty: 'General Medicine', date: '2026-05-18', time: '09:00', status: 'confirmed' },
  { id: 3, patientName: 'David Brown',   doctorName: 'Dr. Olivia Martin',specialty: 'Cardiology',       date: '2026-05-19', time: '14:00', status: 'pending' },
  { id: 4, patientName: 'Sarah Davis',   doctorName: 'Dr. Ava Thompson', specialty: 'General Medicine', date: '2026-05-15', time: '10:00', status: 'completed' },
  { id: 5, patientName: 'James Miller',  doctorName: 'Dr. Ethan Lee',    specialty: 'Pediatrics',       date: '2026-05-17', time: '16:00', status: 'cancelled' },
];

// js/admin.js — shared read/write helpers
const STORAGE_KEY = 'highland_appointments';

function loadAppointments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAppointments)); // seed on first run
  return [...seedAppointments];
}

function saveAppointments(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
```

Statuses are stored as stable ASCII values (`'pending' / 'confirmed' / 'cancelled' / 'completed'` — no accents, no display formatting, easy to compare), while the **display labels** and badge colors are mapped separately:

```js
const STATUS_LABEL = {
  pending: 'Pending', confirmed: 'Confirmed',
  cancelled: 'Cancelled', completed: 'Completed',
};
const STATUS_BADGE = {
  pending: 'text-bg-warning', confirmed: 'text-bg-success',
  cancelled: 'text-bg-danger', completed: 'text-bg-secondary',
};
```

## Dashboard layout

Use a minimal navbar instead of a sidebar — on mobile it already collapses into a hamburger without extra CSS:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin — Highland Hospital</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-light">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="admin.html">🏥 Highland Admin</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav"
              aria-controls="adminNav" aria-expanded="false" aria-label="Toggle admin navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="adminNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Back to website</a></li>
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="admin.html">Dashboard</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 fw-bold mb-0">Appointment overview</h1>
      <a href="booking.html" class="btn btn-primary btn-sm">+ New appointment</a>
    </div>
    <!-- metrics + table go below -->
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/data.js"></script>
  <script src="js/admin.js"></script>
</body>
</html>
```

## Metric cards derived from the data

The 4 stat cards **must not hardcode numbers** — every figure is computed from the `appointments` array on each render, so the metrics stay correct when the data changes:

```html
<div class="row g-3 mb-4" id="metricRow"><!-- 4 cols col-sm-6 col-xl-3 rendered by JS --></div>
```

```js
function renderMetrics(appointments) {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD' — matches date format
  const metrics = [
    { label: 'Total appointments', value: appointments.length,              extra: 'all time',   icon: '📋', color: 'primary' },
    { label: 'Today',             value: appointments.filter(a => a.date === today).length, extra: new Date().toLocaleDateString('en-GB'), icon: '📅', color: 'info' },
    { label: 'Pending',           value: appointments.filter(a => a.status === 'pending').length,   extra: 'need action', icon: '⏳', color: 'warning' },
    { label: 'Completed',         value: appointments.filter(a => a.status === 'completed').length, extra: 'finished',     icon: '✅', color: 'success' },
  ];
  document.getElementById('metricRow').innerHTML = metrics.map(m => `
    <div class="col-sm-6 col-xl-3">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-body d-flex align-items-center gap-3">
          <div class="bg-${m.color}-subtle rounded-3 p-3 fs-4">${m.icon}</div>
          <div>
            <p class="text-secondary small mb-0">${m.label}</p>
            <p class="h3 fw-bold mb-0">${m.value}</p>
            <p class="text-secondary small mb-0">${m.extra}</p>
          </div>
        </div>
      </div>
    </div>`).join('');
}
```

The seed data uses fixed dates, so the "Today" metric may read 0 — set a couple of appointments to today's real date when you test.

## Data table with search + status filter

```html
<div class="card border-0 shadow-sm">
  <div class="card-body">
    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <input type="search" id="searchInput" class="form-control"
               placeholder="Search by patient name…" aria-label="Search appointments by patient name">
      </div>
      <div class="col-md-6">
        <select id="statusFilter" class="form-select" aria-label="Filter by status">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Specialty</th>
            <th scope="col">Doctor</th>
            <th scope="col">Date & time</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody id="appointmentBody"></tbody>
      </table>
    </div>
    <p id="emptyNote" class="text-center text-secondary my-4 d-none">No appointments match your filters.</p>
  </div>
</div>
```

The table state lives in one object, so any change only needs `applyFilters()` to be called again:

```js
let appointments = loadAppointments();
const filters = { keyword: '', status: 'all' };

function applyFilters() {
  const kw = filters.keyword.trim().toLowerCase();
  const result = appointments.filter(a =>
    (filters.status === 'all' || a.status === filters.status) &&
    (!kw || a.patientName.toLowerCase().includes(kw))
  );
  renderTable(result);
}

function renderTable(list) {
  document.getElementById('appointmentBody').innerHTML = list.map(rowHTML).join('');
  document.getElementById('emptyNote').classList.toggle('d-none', list.length > 0);
}
```

Search and status are **two independent conditions combined in one `filter`** — the exact model of the doctor filter from lesson 03. `rowHTML` produces one row:

```js
function rowHTML(a) {
  return `
    <tr data-id="${a.id}">
      <td class="fw-semibold">${a.patientName}</td>
      <td>${a.specialty}</td>
      <td>${a.doctorName}</td>
      <td>${a.date} · ${a.time}</td>
      <td><span class="badge ${STATUS_BADGE[a.status]}">${STATUS_LABEL[a.status]}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-success me-1" data-action="confirmed" title="Confirm">✓</button>
        <button class="btn btn-sm btn-outline-danger me-1" data-action="cancelled" title="Cancel">✕</button>
        <button class="btn btn-sm btn-outline-secondary" data-action="delete" title="Delete">🗑</button>
      </td>
    </tr>`;
}
```

Note how the row carries `data-action` values that are exactly the status strings — no mapping table needed for the update path.

## Status update & delete — via event delegation

One listener on `<tbody>` handles every button in every row; find the owning row with `closest('tr')`:

```js
document.getElementById('appointmentBody').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const row = btn.closest('tr');
  const id = Number(row.dataset.id);
  const target = appointments.find(a => a.id === id);
  if (!target) return;

  const action = btn.dataset.action;
  if (action === 'delete') {
    if (!confirm(`Delete the appointment of "${target.patientName}"?`)) return;
    appointments = appointments.filter(a => a.id !== id);
  } else {
    target.status = action; // 'confirmed' | 'cancelled' | 'completed'
  }
  saveAppointments(appointments); // persist immediately after every change
  applyFilters();                 // badges update
  renderMetrics(appointments);    // metrics stay in sync
});

document.getElementById('searchInput').addEventListener('input', (e) => { filters.keyword = e.target.value; applyFilters(); });
document.getElementById('statusFilter').addEventListener('change', (e) => { filters.status = e.target.value; applyFilters(); });
```

The whole interface is just a **render function of the data**: change data → write `localStorage` → re-render. That is the "state-driven UI" model — you will meet it again verbatim when you learn React.

## Sample prompt — build the dashboard logic

```text
I am building an Admin Dashboard for Highland Hospital with Bootstrap 5 and vanilla
ES6+ JavaScript. The data is the appointments array in localStorage (key
highland_appointments); each item is { id, patientName, doctorName, specialty, date,
time, status } with status ∈ pending | confirmed | completed | cancelled.
My HTML already has #searchInput, a #statusFilter select, tbody #appointmentBody and a
#metricRow container. Write js/admin.js that:
1. renderMetrics(list): 4 cards — total, today's appointments (compare date with today),
   pending count, completed count
2. applyFilters() filters by keyword (patient name, case-insensitive) AND status, and
   renders rows into #appointmentBody with a different badge color per status
3. Uses event delegation on the tbody for buttons with data-action="confirmed" |
   "cancelled" | "completed" | "delete"
4. Persists every change to localStorage immediately, then re-renders
5. Shows an empty state when nothing matches
Briefly explain why rendering should be split into separate functions and where
confirm() is used.
```

## Practice

- Create `admin.html` + `js/admin.js` following the structure above; check the 4 metrics match the seed data counts.
- Search "John" — correct results; filter "Pending" then type a keyword — both conditions apply at once.
- Click ✓ to confirm one appointment → the badge turns green and the "Pending" metric drops by 1. Reload — the data survives, thanks to `localStorage`.
- Delete an appointment (confirm dialog appears) → the metrics drop accordingly.
- Run `localStorage.clear()` in the Console and reload — the seed data loads itself on first run.
- Run the AI prompt above and compare its output with your own code.

## What's next

Functionality is complete — now make all three pages **fast and smooth on every screen**: measure with Lighthouse, optimize images, reduce layout shift, check responsive behavior at 320/768/1024/1440, and apply basic accessibility — in **Performance & responsive polish**.
