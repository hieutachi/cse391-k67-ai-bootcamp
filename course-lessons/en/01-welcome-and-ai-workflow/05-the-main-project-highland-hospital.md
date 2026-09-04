# The main project: Highland Hospital

## Learning objectives
- Know the three pages you will build, and which chapter builds each
- Learn the shared sample data model every page works from
- See what each chapter contributes to the finished product

## What Highland Hospital needs to do

Highland Hospital is a fictional general hospital. Its website must solve three real problems:

1. **Introduce** — potential patients see which services exist, which doctors work there and what other patients say.
2. **Book** — a patient picks a specialty, a doctor, a date and time, then fills in contact details.
3. **Manage** — hospital staff see the full list of appointments, search, filter by status, and confirm or cancel bookings.

## The three pages

| Page | File | Built in | Contents |
|---|---|---|---|
| Landing Page | `index.html` | chapters 3–8 (static), 9–10 (dynamic) | Navbar, hero, services, doctor list with filter, testimonials, footer |
| Booking page | `booking.html` | chapter 8 (static form), 11 (multi-step flow) | Choose service/doctor → patient details → confirmation |
| Admin Dashboard | `admin.html` | chapter 12 | Four stat cards, appointment table with search, status filter and updates |

## Shared sample data

All three pages work from one data set. In chapter 9 you move it into `js/data.js`, but this is the shape you will see everywhere in the course:

```js
const doctors = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', experience: 12, fee: 120, avatar: 'assets/images/doctor-1.jpg' },
  { id: 2, name: 'Dr. Tom Bauer', specialty: 'General Medicine', experience: 8, fee: 80, avatar: 'assets/images/doctor-2.jpg' },
  { id: 3, name: 'Dr. Emma Lindqvist', specialty: 'Pediatrics', experience: 15, fee: 95, avatar: 'assets/images/doctor-3.jpg' },
  { id: 4, name: 'Dr. James Osei', specialty: 'Dermatology', experience: 7, fee: 75, avatar: 'assets/images/doctor-4.jpg' },
  { id: 5, name: 'Dr. Maria Santos', specialty: 'Neurology', experience: 10, fee: 110, avatar: 'assets/images/doctor-5.jpg' },
  { id: 6, name: 'Dr. David Chen', specialty: 'Orthopedics', experience: 20, fee: 130, avatar: 'assets/images/doctor-6.jpg' }
];

const appointments = [
  { id: 1, patientName: 'Anna Reyes', phone: '555-0103', specialty: 'Cardiology', doctorName: 'Dr. Sarah Mitchell', date: '2025-08-14', time: '09:30', status: 'pending' },
  { id: 2, patientName: 'Ben Okafor', phone: '555-0147', specialty: 'General Medicine', doctorName: 'Dr. Tom Bauer', date: '2025-08-15', time: '14:00', status: 'confirmed' }
];
// status is always one of: 'pending' | 'confirmed' | 'completed' | 'cancelled'
```

Keep the field names exactly as written here. When your prompts paste this real data, the AI never has to invent a field name again. In chapters 10–11, `appointments` moves from memory into `localStorage` and a mock API.

## What each chapter contributes

- **Chapters 3–4**: semantic HTML and the first CSS for the hero and services.
- **Chapters 5–6**: the Doctor Cards grid and responsive behaviour across the page.
- **Chapters 7–8**: the Landing Page rebuilt with Bootstrap 5, plus a static booking form.
- **Chapters 9–10**: doctors rendered from data, a specialty filter, appointments stored locally.
- **Chapter 11**: a mock API call and the complete multi-step booking flow.
- **Chapter 12**: assemble the Landing Page and the Admin Dashboard, then deploy.

## A kickoff prompt

```text
Context: I am starting the Highland Hospital project — a hospital website
where patients book appointments. Stack: semantic HTML5, CSS3, Bootstrap 5
from CDN, plain JavaScript ES6+. No frameworks.
Task: create index.html as an empty skeleton with these sections: navbar,
hero, services, doctors, testimonials, booking CTA, footer — each a
<section> with an id and an HTML comment marking its purpose.
Constraint: no detailed content yet; only valid structure and sensible
Bootstrap classes; return the complete file.
```

## Practice

1. Create `highland-hospital/js/data.js` with the six doctors and the appointments array shown above.
2. Run the kickoff prompt, paste the result into `index.html`, open Live Server and inspect the skeleton.
3. Keep the prompt output — the next chapter teaches you to write prompts noticeably better than that one.

## What's next

The skeleton renders in your browser — chapter 2 teaches you to write prompts good enough to turn that skeleton into a real interface, starting with the anatomy of a good prompt.
