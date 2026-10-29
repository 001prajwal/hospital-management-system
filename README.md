# CarePoint Hospital Management System

A beginner-friendly, single-page hospital administration dashboard built with HTML, CSS, and vanilla JavaScript. It uses Chart.js for charts, Font Awesome for icons, Unsplash for illustrative hospital imagery, Indian rupees (INR) for billing, and browser `localStorage` for fictional demo data.

> **Important:** This is a college-project demonstration, not a medical system. Do not enter real patient information. `localStorage` is not encrypted, access-controlled, backed up, or suitable for storing real patient medical records. The demo login is client-side only and is not production-grade authentication.

## Run in VS Code

1. Open the `skilllab` folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Open `index.html`, then choose **Go Live** in the VS Code status bar (or right-click the file and choose **Open with Live Server**).
4. Sign in with the demo account below.

The app loads Chart.js, Font Awesome, Google Fonts, and hospital photos from public CDNs, so those visual assets require an internet connection. The login and dashboard include hospital photography; the dashboard photo appears as a subtle page background behind its cards. Core page layout and demo records are local.

Existing demo data from the earlier USD version is automatically converted to INR once at a fixed demonstration rate of ₹83 per USD. This migration is only for sample data and is not a live exchange-rate conversion.

## Demo login

- **Email:** `admin@carepoint.demo`
- **Password:** `CarePoint123!`

The login is a simple client-side presentation flow. It does not provide real authentication, authorization, or data protection.

## Features

- **Dashboard:** patient, doctor, appointment, and bed summary cards; admissions/discharges, department distribution, and weekly appointment charts; recent registrations, upcoming appointments, activity, and revenue.
- **Patients:** register, search, filter by department, view details, edit, delete with confirmation, and export a CSV. Patient IDs are generated automatically.
- **Doctors:** profile cards with specialization, contact details, consultation fee, and availability; add, edit, and delete records.
- **Appointments:** book, edit, complete, and cancel appointments; filter by date, doctor, and status; prevent duplicate scheduled bookings for the same doctor and time.
- **Departments:** seven specialty cards with descriptions and live doctor/patient counts.
- **Beds & rooms:** track available and occupied beds, assign patients, discharge them, and add beds.
- **Billing:** create and edit invoices in Indian rupees (INR) with consultation, room, medicine, and service charges; calculate payment status; print invoices.
- **Reports:** registrations, appointment status, revenue and occupancy summaries, sample charts, date-range controls, and print.
- **Settings:** edit the administrator profile, toggle dark mode, and reset demo records.
- **Interaction:** responsive navigation, page search, profile and notification menus, confirmation prompts, and success/error toasts.
- **Persistence:** patient, doctor, appointment, bed, invoice, profile, and theme data persist in the current browser using `localStorage`.

## Project files

- `index.html` — login screen, application shell, navigation, and external libraries.
- `style.css` — shared visual system, responsive layout, and dark theme.
- `script.js` — sample data, page rendering, validation, storage, charts, and interactions.
- `README.md` — setup, demo account, feature overview, and safety notes.

## Button and page testing checklist

- [ ] Sign in with the demo credentials; try a wrong password and the show/hide control.
- [ ] Navigate to every sidebar item and confirm each page loads without a full reload.
- [ ] Dashboard: use its schedule, patient, department, billing, and report links; check the charts and summary cards.
- [ ] Patients: search, department filter, register, view, edit, delete (confirm and cancel), and export CSV.
- [ ] Doctors: search, add, edit availability and fee, delete (confirm and cancel), and verify profile image fallback.
- [ ] Appointments: book, edit, complete, cancel, filter by date/doctor/status, and attempt a duplicate doctor/time booking.
- [ ] Departments: verify all seven cards and their live counts.
- [ ] Beds: add a bed, assign a patient, discharge (confirm and cancel), and verify summary counts.
- [ ] Billing: create invoices with zero, partial, and full payment; edit, delete, and print an invoice.
- [ ] Reports: change date range, submit a reversed range to check validation, and print.
- [ ] Settings: save valid and invalid profile values, toggle dark mode, and reset demo data.
- [ ] Test the mobile menu, page search, notifications, profile menu, help guide, and sign out.
- [ ] Refresh the page after changing records and confirm localStorage persistence.

## Extending the project

1. Add a field to the corresponding form schema and update the table/card renderer in `script.js`.
2. Add or adjust validation in the form submit handler before records are saved.
3. Store new demo collections in `initialData()` and include them in the storage load validation.
4. Add a renderer to the `pages` map and a navigation item to `index.html` for a new section.
5. Add styles to `style.css` using the existing CSS variables and responsive breakpoints.
6. Update this README and its checklist when adding user-facing features.

For any real deployment, replace the client-side login and browser storage with a properly secured backend, access controls, encrypted transport and storage, audit logging, backups, and appropriate privacy/compliance review.
