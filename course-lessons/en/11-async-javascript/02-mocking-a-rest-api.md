# Mocking a REST API

## Learning objectives
- Understand the REST model at a practical level: resources, endpoints and HTTP methods
- Spin up a fake API in seconds with JSON Server: `npx json-server db.json`
- Write a `db.json` shaped for Highland Hospital with `/doctors` and `/appointments`
- Mock with a plain `Promise` + `setTimeout` when you do not want to install anything

## REST in one minute

REST organises data into **resources**, each resource has a URL called an **endpoint**, and the action is expressed by an **HTTP method**:

| Method | Meaning | Highland Hospital endpoint |
|---|---|---|
| `GET` | read a list or one record | `GET /doctors`, `GET /appointments/3` |
| `POST` | create | `POST /appointments` |
| `PATCH` / `PUT` | update | `PATCH /appointments/3` |
| `DELETE` | remove | `DELETE /appointments/3` |

The client and server exchange JSON: you send a JSON object, you receive a JSON object. This course needs no real server — you only need something that answers with **that exact format**. That something is called a *mock API*.

## Option 1 — JSON Server (fastest, closest to the real thing)

Install nothing globally; `npx` downloads and runs it. All you need is one data file and one command, run in a terminal of its own inside the project folder:

```bash
npx json-server db.json
```

The command builds a complete REST API from `db.json` — every top-level key becomes an endpoint. (Older versions of the tool used `npx json-server --watch db.json --port 3000`; modern JSON Server v1 watches by default and serves on port 3000.)

Create `db.json` in the project root:

```json
{
  "doctors": [
    { "id": 1, "name": "Dr. Emma Wilson", "specialty": "Cardiology",
      "experience": 12, "avatar": "https://i.pravatar.cc/150?img=47" },
    { "id": 2, "name": "Dr. Liam Carter", "specialty": "General Medicine",
      "experience": 8, "avatar": "https://i.pravatar.cc/150?img=12" },
    { "id": 3, "name": "Dr. Sofia Nguyen", "specialty": "Pediatrics",
      "experience": 15, "avatar": "https://i.pravatar.cc/150?img=32" }
  ],
  "appointments": [
    { "id": 1, "patientName": "John Smith", "phone": "+1 555 010 1234",
      "specialty": "Cardiology", "doctorId": 1, "date": "2026-05-18",
      "time": "09:00", "status": "pending" },
    { "id": 2, "patientName": "Mary Johnson", "phone": "+1 555 010 5678",
      "specialty": "Pediatrics", "doctorId": 3, "date": "2026-05-19",
      "time": "14:30", "status": "confirmed" }
  ]
}
```

While the server runs, open these in the browser:

- `http://localhost:3000/doctors` — the doctors array
- `http://localhost:3000/doctors/1` — one doctor
- `http://localhost:3000/appointments` — the appointments array

JSON Server handles `POST`/`PATCH`/`DELETE` and query filters out of the box, e.g. `GET /appointments?status=pending`. One gotcha: opening the page as a `file://` file gets blocked by CORS when you fetch — always open your pages through **Live Server** (`http://127.0.0.1:5500`), not by double-clicking the HTML file.

## Option 2 — pure mock with Promise + setTimeout

When you want zero dependencies (an offline demo, a quick experiment), simulate the network delay by hand. The function still returns a `Promise`, so the calling code is identical to fetching a real API:

```js
// mock-api.js — teaching stand-in; delete it once you have a real API
const fakeDoctors = [
  { id: 1, name: 'Dr. Emma Wilson', specialty: 'Cardiology', experience: 12 },
  { id: 2, name: 'Dr. Liam Carter', specialty: 'General Medicine', experience: 8 }
];

function getDoctors() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeDoctors), 600); // pretend the network takes 600ms
  });
}

async function demo() {
  const doctors = await getDoctors(); // looks exactly like await fetch(...)
  console.log(doctors);
}
demo();
```

A useful trick: mock failures too, so you can practise your `catch` branch — swap `resolve` for `reject(new Error('Network down'))` and watch the error handler run.

### Sample prompt — build the Highland mock

```text
I am learning to mock APIs for the Highland Hospital project (plain frontend, no backend).
Create a db.json for JSON Server with:
1. 6 doctors: fields id, name, specialty, experience, avatar — spread across 3 specialties: Cardiology, General Medicine, Pediatrics.
2. 3 appointments: fields id, patientName, phone, specialty, doctorId, date, time, status (use status values pending | confirmed | completed | cancelled).
Use realistic English patient and doctor names, and dates in the near future.
Then give me 3 example fetch calls: GET /doctors, GET /appointments?status=pending, and POST /appointments with a JSON body.
```

## Practice

- Create `db.json` (write it yourself first, then compare with the AI output), and run `npx json-server db.json`.
- Open `http://localhost:3000/doctors` in the browser and note the JSON shape you get back.
- `POST` a new appointment from the Console:
  `fetch('http://localhost:3000/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patientName: 'Jane Doe', phone: '+1 555 010 9999', specialty: 'Cardiology', doctorId: 1, date: '2026-05-22', time: '10:00', status: 'pending' }) })`
  then `GET /appointments` again to see your new record.
- Delete `db.json` and switch to the pure `Promise` + `setTimeout` mock — compare how similar the two calling styles are.

## What's next

You now have a fake API — but networks are always slow and occasionally broken. In **Loading & Error states** you give every data-driven region of the page its two essential companions: a Bootstrap spinner while loading, and a visible error alert with a retry button when things go wrong.
