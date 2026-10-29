/* CarePoint is an educational frontend demo. All records live in this browser's localStorage. */
const STORAGE_KEY = "carepoint-demo-v1";
const SESSION_KEY = "carepoint-demo-session";
const today = new Date();
const isoDate = (date = today) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const offsetDate = (days) => { const date = new Date(); date.setDate(date.getDate() + days); return isoDate(date); };
const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);
const prettyDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const departments = [
  { name: "Cardiology", icon: "fa-heart-pulse", color: "#e46e79", tint: "#fff0f1", description: "Heart health, diagnostics, and cardiovascular care." },
  { name: "Neurology", icon: "fa-brain", color: "#806ed3", tint: "#f1efff", description: "Specialist care for the brain and nervous system." },
  { name: "Orthopedics", icon: "fa-bone", color: "#d39434", tint: "#fff5e7", description: "Bone, joint, and musculoskeletal treatment." },
  { name: "Pediatrics", icon: "fa-child-reaching", color: "#299f91", tint: "#e8f8f5", description: "Compassionate healthcare for infants and children." },
  { name: "Dermatology", icon: "fa-hand-dots", color: "#ca7e5c", tint: "#fff1ea", description: "Expert medical and cosmetic skin care." },
  { name: "General Medicine", icon: "fa-stethoscope", color: "#3980c7", tint: "#edf5ff", description: "Everyday primary care and health checkups." },
  { name: "Emergency", icon: "fa-truck-medical", color: "#de5864", tint: "#fff0f1", description: "Round-the-clock urgent and emergency care." }
];
const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&q=80`;
const initialData = () => ({
  patients: [
    { id: "PT-2026-1042", name: "Sophia Martinez", age: 34, gender: "Female", contact: "+1 (415) 555-0182", bloodGroup: "O+", department: "Cardiology", visitDate: offsetDate(-1), email: "sophia.m@example.demo", address: "18 Oak Street, San Francisco", notes: "Follow-up consultation", createdAt: offsetDate(-1) },
    { id: "PT-2026-1041", name: "Ethan Brooks", age: 52, gender: "Male", contact: "+1 (415) 555-0127", bloodGroup: "A+", department: "Orthopedics", visitDate: offsetDate(-1), email: "ethan.b@example.demo", address: "240 Pine Avenue, San Francisco", notes: "", createdAt: offsetDate(-1) },
    { id: "PT-2026-1040", name: "Isabella Chen", age: 8, gender: "Female", contact: "+1 (415) 555-0164", bloodGroup: "B+", department: "Pediatrics", visitDate: offsetDate(-2), email: "isabella.c@example.demo", address: "62 Maple Road, San Francisco", notes: "Fictional demo record", createdAt: offsetDate(-2) },
    { id: "PT-2026-1039", name: "Noah Wilson", age: 45, gender: "Male", contact: "+1 (415) 555-0148", bloodGroup: "AB+", department: "Neurology", visitDate: offsetDate(-3), email: "noah.w@example.demo", address: "91 Market Street, San Francisco", notes: "", createdAt: offsetDate(-3) },
    { id: "PT-2026-1038", name: "Ava Thompson", age: 29, gender: "Female", contact: "+1 (415) 555-0193", bloodGroup: "O-", department: "General Medicine", visitDate: offsetDate(-4), email: "ava.t@example.demo", address: "5 Hillcrest Way, San Francisco", notes: "", createdAt: offsetDate(-4) }
  ],
  currencyVersion: "INR",
  doctors: [
    { id: "DR-001", name: "Dr. Amelia Carter", specialization: "Cardiology", contact: "+1 (415) 555-0101", email: "amelia.carter@carepoint.demo", availability: "Available", fee: 1800, photo: photo("photo-1559839734-2b71ea197ec2") },
    { id: "DR-002", name: "Dr. James Wilson", specialization: "Neurology", contact: "+1 (415) 555-0102", email: "james.wilson@carepoint.demo", availability: "Available", fee: 1600, photo: photo("photo-1612349317150-e413f6a5b16d") },
    { id: "DR-003", name: "Dr. Sofia Patel", specialization: "Pediatrics", contact: "+1 (415) 555-0103", email: "sofia.patel@carepoint.demo", availability: "Available", fee: 1300, photo: photo("photo-1594824476967-48c8b964273f") },
    { id: "DR-004", name: "Dr. Daniel Kim", specialization: "Orthopedics", contact: "+1 (415) 555-0104", email: "daniel.kim@carepoint.demo", availability: "Unavailable", fee: 1700, photo: photo("photo-1622253692010-333f2da6031d") },
    { id: "DR-005", name: "Dr. Olivia Green", specialization: "Dermatology", contact: "+1 (415) 555-0105", email: "olivia.green@carepoint.demo", availability: "Available", fee: 1450, photo: photo("photo-1580489944761-15a19d654956") },
    { id: "DR-006", name: "Dr. Ethan Moore", specialization: "General Medicine", contact: "+1 (415) 555-0106", email: "ethan.moore@carepoint.demo", availability: "Available", fee: 1100, photo: photo("photo-1500648767791-00dcc994a43e") }
  ],
  appointments: [
    { id: "AP-2601", patientId: "PT-2026-1042", doctorId: "DR-001", department: "Cardiology", date: offsetDate(0), time: "10:30", status: "Scheduled", reason: "Follow-up" },
    { id: "AP-2602", patientId: "PT-2026-1041", doctorId: "DR-004", department: "Orthopedics", date: offsetDate(0), time: "11:00", status: "Scheduled", reason: "Knee consultation" },
    { id: "AP-2603", patientId: "PT-2026-1039", doctorId: "DR-002", department: "Neurology", date: offsetDate(1), time: "09:30", status: "Scheduled", reason: "Initial consultation" },
    { id: "AP-2604", patientId: "PT-2026-1040", doctorId: "DR-003", department: "Pediatrics", date: offsetDate(0), time: "14:00", status: "Completed", reason: "Annual checkup" },
    { id: "AP-2605", patientId: "PT-2026-1038", doctorId: "DR-006", department: "General Medicine", date: offsetDate(-1), time: "15:30", status: "Completed", reason: "General consultation" }
  ],
  beds: Array.from({ length: 18 }, (_, index) => {
    const occupied = [1, 4, 6, 9, 12, 15].includes(index);
    const patient = occupied ? ["PT-2026-1042", "PT-2026-1041", "PT-2026-1039", "PT-2026-1038", "PT-2026-1040", "PT-2026-1042"][[1, 4, 6, 9, 12, 15].indexOf(index)] : "";
    return { id: `BED-${String(index + 1).padStart(3, "0")}`, room: `Room ${201 + Math.floor(index / 2)}`, bedNumber: `Bed ${index % 2 + 1}`, status: occupied ? "Occupied" : "Available", patientId: patient };
  }),
  invoices: [
    { id: "INV-2026-031", patientId: "PT-2026-1042", date: offsetDate(-1), consultation: 1800, room: 2200, medicine: 640, services: 350, status: "Paid", paid: 4990 },
    { id: "INV-2026-030", patientId: "PT-2026-1041", date: offsetDate(-2), consultation: 1700, room: 0, medicine: 850, services: 250, status: "Pending", paid: 0 },
    { id: "INV-2026-029", patientId: "PT-2026-1039", date: offsetDate(-3), consultation: 1600, room: 1200, medicine: 420, services: 180, status: "Partially Paid", paid: 2000 }
  ],
  activities: [
    { icon: "fa-user-plus", text: "New patient <strong>Sophia Martinez</strong> registered", time: "12 minutes ago" },
    { icon: "fa-calendar-check", text: "Appointment confirmed with <strong>Dr. Amelia Carter</strong>", time: "38 minutes ago" },
    { icon: "fa-credit-card", text: "Invoice <strong>INV-2026-031</strong> marked as paid", time: "1 hour ago" },
    { icon: "fa-bed-pulse", text: "Patient assigned to <strong>Room 202, Bed 2</strong>", time: "2 hours ago" }
  ],
  settings: { name: "Olivia Bennett", email: "admin@carepoint.demo", darkMode: false }
});
let data;
let migratedCurrency = false;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  const savedData = saved ? JSON.parse(saved) : null;
  data = savedData ? { ...initialData(), ...savedData } : initialData();
  for (const key of ["patients", "doctors", "appointments", "beds", "invoices", "activities"]) if (!Array.isArray(data[key])) data[key] = initialData()[key];
  if (savedData && savedData.currencyVersion !== "INR") {
    data.doctors.forEach((doctor) => { doctor.fee = Math.round(Number(doctor.fee || 0) * 83); });
    data.invoices.forEach((invoice) => {
      for (const field of ["consultation", "room", "medicine", "services", "paid"]) invoice[field] = Math.round(Number(invoice[field] || 0) * 83);
    });
    data.currencyVersion = "INR";
    migratedCurrency = true;
  }
} catch (error) {
  console.error("Could not read saved demo data:", error);
  data = initialData();
}
if (migratedCurrency) saveData();
let activePage = "dashboard";
let charts = [];
let searchTerm = "";
let reportRange = { from: offsetDate(-30), to: isoDate() };
let appointmentFilters = { date: "", doctorId: "", status: "" };
const pageContent = document.getElementById("pageContent");
const modalRoot = document.getElementById("modalRoot");
const pageTitles = { dashboard: "Dashboard", patients: "Patients", doctors: "Doctors", appointments: "Appointments", departments: "Departments", beds: "Beds & Rooms", billing: "Billing", reports: "Reports & Analytics", settings: "Settings" };
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch (error) { console.error("Could not save demo data:", error); toast("Unable to save data in this browser.", "error"); }
}
function toast(message, type = "success") {
  const element = document.createElement("div");
  element.className = `toast ${type}`;
  element.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>${escapeHtml(message)}`;
  document.getElementById("toastStack").append(element);
  setTimeout(() => element.remove(), 3500);
}
function patientById(id) { return data.patients.find((patient) => patient.id === id); }
function doctorById(id) { return data.doctors.find((doctor) => doctor.id === id); }
function invoiceTotal(invoice) { return Number(invoice.consultation) + Number(invoice.room) + Number(invoice.medicine) + Number(invoice.services); }
function makeId(prefix, list, year = false) {
  const number = list.reduce((max, record) => Math.max(max, Number(record.id.match(/\d+$/)?.[0] || 0)), 0) + 1;
  return `${prefix}${year ? `${new Date().getFullYear()}-` : ""}${String(number).padStart(3, "0")}`;
}
function statusClass(status) { return `status-${String(status).toLowerCase().replace(/\s+/g, "-")}`; }
function emptyState(icon, title, detail) { return `<div class="empty-state"><i class="fa-regular ${icon}"></i><strong>${title}</strong><span>${detail}</span></div>`; }
function heading(title, description, button = "") { return `<div class="page-heading"><div><h1>${title}</h1><p>${description}</p></div>${button}</div>`; }
function statCard(title, value, icon, tint, note) { return `<article class="stat-card"><div class="stat-top"><span>${title}</span><span class="stat-icon ${tint}"><i class="fa-solid ${icon}"></i></span></div><div class="stat-value">${value}</div><div class="stat-foot">${note}</div></article>`; }
function avatar(name) { return `<span class="person-avatar">${escapeHtml(name.split(" ").map((part) => part[0]).slice(0, 2).join(""))}</span>`; }
function refreshPage() {
  charts.forEach((chart) => chart.destroy()); charts = [];
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => link.classList.toggle("active", link.dataset.page === activePage));
  document.getElementById("currentPageLabel").textContent = pageTitles[activePage];
  document.getElementById("patientNavCount").textContent = data.patients.length;
  const pages = { dashboard: renderDashboard, patients: renderPatients, doctors: renderDoctors, appointments: renderAppointments, departments: renderDepartments, beds: renderBeds, billing: renderBilling, reports: renderReports, settings: renderSettings };
  pageContent.innerHTML = (pages[activePage] || renderDashboard)();
  document.getElementById("globalSearch").value = searchTerm;
  if (activePage === "dashboard") renderDashboardCharts();
  if (activePage === "reports") renderReportCharts();
}
function renderDashboard() {
  const todayAppointments = data.appointments.filter((item) => item.date === isoDate() && item.status !== "Cancelled");
  const availableBeds = data.beds.filter((item) => item.status === "Available").length;
  const monthRevenue = data.invoices.filter((invoice) => invoice.date?.startsWith(isoDate().slice(0, 7))).reduce((sum, invoice) => sum + Number(invoice.paid), 0);
  const hour = today.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Welcome back";
  const filteredPatients = data.patients.filter((patient) => `${patient.name} ${patient.id} ${patient.department}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const recent = filteredPatients.slice(0, 5);
  const upcoming = data.appointments.filter((item) => item.status === "Scheduled" && item.date >= isoDate()).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 4);
  return `${`<section class="welcome-banner"><div class="welcome-copy"><span class="eyebrow">${today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase()}</span><h1>${greeting}, ${escapeHtml(data.settings.name.split(" ")[0])} <span>☀️</span></h1><p>Here’s what’s happening across your hospital today.</p><button class="button" data-action="navigate" data-page="appointments">View today's schedule <i class="fa-solid fa-arrow-right"></i></button></div></section>`}
    <section class="stats-grid">${statCard("Total patients", data.patients.length, "fa-hospital-user", "icon-blue", '<span class="positive">+12%</span> vs. last month')}${statCard("Available doctors", data.doctors.filter((doctor) => doctor.availability === "Available").length, "fa-user-doctor", "icon-teal", `of ${data.doctors.length} medical professionals`)}${statCard("Today's appointments", todayAppointments.length, "fa-calendar-check", "icon-orange", "Across all departments")}${statCard("Available beds", availableBeds, "fa-bed-pulse", "icon-purple", `of ${data.beds.length} total hospital beds`)}${statCard("Monthly revenue", money(monthRevenue), "fa-sack-dollar", "icon-teal", "Payments received this month")}</section>
    <section class="dashboard-grid"><article class="panel"><div class="panel-head"><div><h2>Patient admissions & discharges</h2><p>Hospital activity overview · last 7 days</p></div><span class="status status-active">This week</span></div><div class="chart-wrap"><canvas id="admissionChart" aria-label="Admissions and discharges chart"></canvas></div></article>
    <article class="panel"><div class="panel-head"><div><h2>Patients by department</h2><p>Current patient distribution</p></div><button class="icon-button" data-action="navigate" data-page="departments" aria-label="View departments"><i class="fa-solid fa-arrow-right"></i></button></div><div class="chart-wrap donut"><canvas id="departmentChart" aria-label="Patients by department chart"></canvas></div><div class="chart-legend" id="departmentLegend"></div></article></section>
    <section class="dashboard-grid"><article class="panel"><div class="panel-head"><div><h2>Weekly appointments</h2><p>Appointment volume by day</p></div><button class="button button-soft button-sm" data-action="navigate" data-page="appointments">View schedule</button></div><div class="chart-wrap"><canvas id="appointmentChart" aria-label="Weekly appointments chart"></canvas></div></article>
    <article class="panel"><div class="panel-head"><div><h2>Recent activity</h2><button class="icon-button" data-action="navigate" data-page="reports" aria-label="View reports"><i class="fa-solid fa-arrow-right"></i></button></div></div><div class="activity-list">${data.activities.slice(0, 4).map((activity) => `<div class="activity-row"><span class="activity-mark"><i class="fa-solid ${activity.icon}"></i></span><div class="activity-text">${activity.text}<small>${escapeHtml(activity.time)}</small></div></div>`).join("")}</div></article></section>
    <section class="split-panels"><article class="panel table-panel"><div class="table-toolbar"><h2>Recent patient registrations</h2><button class="button button-outline button-sm" data-action="navigate" data-page="patients">All patients <i class="fa-solid fa-arrow-right"></i></button></div>${recent.length ? `<div class="table-wrap"><table><thead><tr><th>PATIENT</th><th>DEPARTMENT</th><th>VISIT DATE</th><th>STATUS</th></tr></thead><tbody>${recent.map((patient) => `<tr><td><div class="person-cell">${avatar(patient.name)}<span><strong>${escapeHtml(patient.name)}</strong><br><small>${escapeHtml(patient.id)}</small></span></div></td><td>${escapeHtml(patient.department)}</td><td>${prettyDate(patient.visitDate)}</td><td><span class="status status-active">Registered</span></td></tr>`).join("")}</tbody></table></div>` : emptyState("fa-folder-open", "No patient records", "Register a patient to get started.")}</article>
    <article class="panel table-panel"><div class="table-toolbar"><h2>Upcoming appointments</h2><button class="button button-outline button-sm" data-action="navigate" data-page="appointments">View all <i class="fa-solid fa-arrow-right"></i></button></div>${upcoming.length ? `<div class="table-wrap"><table><thead><tr><th>PATIENT & DOCTOR</th><th>DATE / TIME</th><th>STATUS</th></tr></thead><tbody>${upcoming.map((item) => `<tr><td><strong>${escapeHtml(patientById(item.patientId)?.name || "Removed patient")}</strong><br><small>${escapeHtml(doctorById(item.doctorId)?.name || "Removed doctor")}</small></td><td>${prettyDate(item.date)}<br><small>${escapeHtml(item.time)}</small></td><td><span class="status ${statusClass(item.status)}">${item.status}</span></td></tr>`).join("")}</tbody></table></div>` : emptyState("fa-calendar-xmark", "No upcoming appointments", "New bookings will appear here.")}</article></section>
    <div class="dashboard-revenue-note"><i class="fa-solid fa-arrow-trend-up"></i> Recorded revenue this month <strong>${money(monthRevenue)}</strong><button class="button button-soft button-sm" data-action="navigate" data-page="billing">View billing</button></div>`;
}
function renderDashboardCharts() {
  if (!window.Chart) return;
  const grid = { color: "#edf1f5" };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: "#94a1b1", font: { size: 10 } } }, y: { grid, ticks: { color: "#94a1b1", font: { size: 10 }, precision: 0 }, beginAtZero: true } } };
  const labels = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - 6 + index); return date.toLocaleDateString("en-US", { weekday: "short" }); });
  const admissions = [8, 12, 9, 15, 11, 18, 14], discharges = [5, 7, 8, 9, 10, 12, 11];
  charts.push(new Chart(document.getElementById("admissionChart"), { type: "bar", data: { labels, datasets: [{ label: "Admissions", data: admissions, backgroundColor: "#4b8fdb", borderRadius: 5 }, { label: "Discharges", data: discharges, backgroundColor: "#75d0bf", borderRadius: 5 }] }, options: { ...options, plugins: { legend: { position: "top", align: "end", labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, color: "#8190a3", font: { size: 10 } } } } } }));
  const deptCounts = departments.map((department) => data.patients.filter((patient) => patient.department === department.name).length);
  const palette = departments.map((department) => department.color);
  charts.push(new Chart(document.getElementById("departmentChart"), { type: "doughnut", data: { labels: departments.map((d) => d.name), datasets: [{ data: deptCounts.map((count) => count || 1), backgroundColor: palette, borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "70%", plugins: { legend: { display: false } } } }));
  document.getElementById("departmentLegend").innerHTML = departments.slice(0, 4).map((department, index) => `<span class="legend-item"><i class="legend-dot" style="--dot:${palette[index]}"></i>${department.name}<b>${deptCounts[index]}</b></span>`).join("");
  const counts = labels.map((_, index) => data.appointments.filter((item) => { const date = new Date(); date.setDate(date.getDate() - 6 + index); return item.date === isoDate(date) && item.status !== "Cancelled"; }).length);
  charts.push(new Chart(document.getElementById("appointmentChart"), { type: "line", data: { labels, datasets: [{ label: "Appointments", data: counts, borderColor: "#2477d4", backgroundColor: "#2477d418", fill: true, tension: .38, pointRadius: 3, pointBackgroundColor: "#2477d4" }] }, options }));
}
function renderPatients() {
  const list = data.patients.filter((patient) => `${patient.name} ${patient.id} ${patient.department} ${patient.contact}`.toLowerCase().includes(searchTerm.toLowerCase()));
  return `${heading("Patients", "Manage registrations, patient details, and care records.", '<button class="button button-primary" data-action="add" data-kind="patient"><i class="fa-solid fa-plus"></i> Register patient</button>')}
  <section class="panel table-panel"><div class="table-toolbar"><h2>Patient directory <span class="muted-count">(${list.length})</span></h2><div class="section-toolbar"><select class="inline-select" id="patientDepartmentFilter"><option value="">All departments</option>${departments.map((d) => `<option>${d.name}</option>`).join("")}</select><button class="button button-outline button-sm" data-action="export-patients"><i class="fa-solid fa-download"></i> Export CSV</button></div></div>
  ${list.length ? `<div class="table-wrap"><table><thead><tr><th>PATIENT</th><th>AGE / GENDER</th><th>CONTACT</th><th>BLOOD GROUP</th><th>DEPARTMENT</th><th>VISIT DATE</th><th>ACTIONS</th></tr></thead><tbody id="patientsTable">${list.map((patient) => `<tr data-department="${escapeHtml(patient.department)}"><td><div class="person-cell">${avatar(patient.name)}<span><strong>${escapeHtml(patient.name)}</strong><br><small>${escapeHtml(patient.id)}</small></span></div></td><td>${patient.age} / ${escapeHtml(patient.gender)}</td><td>${escapeHtml(patient.contact)}</td><td><strong>${escapeHtml(patient.bloodGroup)}</strong></td><td>${escapeHtml(patient.department)}</td><td>${prettyDate(patient.visitDate)}</td><td><div class="row-actions"><button data-action="view" data-kind="patient" data-id="${patient.id}" aria-label="View patient"><i class="fa-regular fa-eye"></i></button><button data-action="edit" data-kind="patient" data-id="${patient.id}" aria-label="Edit patient"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete" data-action="delete" data-kind="patient" data-id="${patient.id}" aria-label="Delete patient"><i class="fa-regular fa-trash-can"></i></button></div></td></tr>`).join("")}</tbody></table></div>` : emptyState("fa-folder-open", "No patients found", "Try another search or register a new patient.")}</section>`;
}
function renderDoctors() {
  const list = data.doctors.filter((doctor) => `${doctor.name} ${doctor.specialization} ${doctor.contact}`.toLowerCase().includes(searchTerm.toLowerCase()));
  return `${heading("Medical team", "Manage doctor profiles, specializations, and availability.", '<button class="button button-primary" data-action="add" data-kind="doctor"><i class="fa-solid fa-plus"></i> Add doctor</button>')}<div class="doctor-grid">${list.map((doctor) => `<article class="doctor-card"><div class="doctor-card-top"><img class="doctor-avatar" src="${escapeHtml(doctor.photo || "")}" alt="${escapeHtml(doctor.name)}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'"><span class="status ${doctor.availability === "Available" ? "status-available" : "status-unavailable"}">${escapeHtml(doctor.availability)}</span></div><h3>${escapeHtml(doctor.name)}</h3><span class="doctor-specialty">${escapeHtml(doctor.specialization)}</span><div class="doctor-meta"><span><i class="fa-regular fa-envelope"></i>${escapeHtml(doctor.email)}</span><span><i class="fa-solid fa-phone"></i>${escapeHtml(doctor.contact)}</span></div><div class="doctor-card-bottom"><span>Consultation fee <strong>${money(doctor.fee)}</strong></span><div class="row-actions"><button data-action="edit" data-kind="doctor" data-id="${doctor.id}" aria-label="Edit doctor"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete" data-action="delete" data-kind="doctor" data-id="${doctor.id}" aria-label="Delete doctor"><i class="fa-regular fa-trash-can"></i></button></div></div></article>`).join("")}${list.length ? "" : `<div class="content-card">${emptyState("fa-user-doctor", "No doctors found", "Add a doctor to build your medical team.")}</div>`}</div>`;
}
function renderAppointments() {
  const { doctorId: doctorFilter, status: statusFilter, date: dateFilter } = appointmentFilters;
  const list = data.appointments.filter((item) => {
    const text = `${patientById(item.patientId)?.name || ""} ${doctorById(item.doctorId)?.name || ""} ${item.department}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase()) && (!doctorFilter || item.doctorId === doctorFilter) && (!statusFilter || item.status === statusFilter) && (!dateFilter || item.date === dateFilter);
  }).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  return `${heading("Appointments", "Schedule and track patient visits across every department.", '<button class="button button-primary" data-action="add" data-kind="appointment"><i class="fa-solid fa-plus"></i> Book appointment</button>')}<section class="panel table-panel"><div class="table-toolbar"><h2>Appointment schedule <span class="muted-count">(${list.length})</span></h2><div class="section-toolbar"><input class="inline-input" id="appointmentDateFilter" type="date" aria-label="Filter by date" value="${dateFilter}"><select class="inline-select" id="appointmentDoctorFilter"><option value="">All doctors</option>${data.doctors.map((doctor) => `<option value="${doctor.id}" ${doctorFilter === doctor.id ? "selected" : ""}>${escapeHtml(doctor.name)}</option>`).join("")}</select><select class="inline-select" id="appointmentStatusFilter"><option value="">All statuses</option>${["Scheduled", "Completed", "Cancelled"].map((status) => `<option ${statusFilter === status ? "selected" : ""}>${status}</option>`).join("")}</select></div></div>${list.length ? `<div class="table-wrap"><table><thead><tr><th>APPOINTMENT</th><th>PATIENT</th><th>DOCTOR</th><th>DEPARTMENT</th><th>DATE & TIME</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>${list.map((item) => `<tr><td><strong>${item.id}</strong></td><td>${escapeHtml(patientById(item.patientId)?.name || "Removed patient")}</td><td>${escapeHtml(doctorById(item.doctorId)?.name || "Removed doctor")}</td><td>${escapeHtml(item.department)}</td><td>${prettyDate(item.date)}<br><small>${escapeHtml(item.time)}</small></td><td><span class="status ${statusClass(item.status)}">${item.status}</span></td><td><div class="row-actions"><button data-action="edit" data-kind="appointment" data-id="${item.id}" aria-label="Edit appointment"><i class="fa-regular fa-pen-to-square"></i></button>${item.status === "Scheduled" ? `<button data-action="complete-appointment" data-id="${item.id}" aria-label="Mark completed"><i class="fa-solid fa-check"></i></button><button class="delete" data-action="cancel-appointment" data-id="${item.id}" aria-label="Cancel appointment"><i class="fa-solid fa-ban"></i></button>` : ""}</div></td></tr>`).join("")}</tbody></table></div>` : emptyState("fa-calendar-xmark", "No appointments found", "Adjust your filters or book an appointment.")}</section>`;
}
function renderDepartments() {
  return `${heading("Departments", "Explore specialties and current department activity.", "")}<div class="department-grid">${departments.map((department) => {
    const doctors = data.doctors.filter((doctor) => doctor.specialization === department.name);
    const patients = data.patients.filter((patient) => patient.department === department.name);
    return `<article class="department-card"><span class="department-icon" style="--accent:${department.color};--tint:${department.tint}"><i class="fa-solid ${department.icon}"></i></span><h3>${department.name}</h3><p>${department.description}</p><div class="department-foot"><span><i class="fa-solid fa-user-doctor"></i> ${doctors.length} doctor${doctors.length === 1 ? "" : "s"}</span><span><i class="fa-solid fa-hospital-user"></i> ${patients.length} patient${patients.length === 1 ? "" : "s"}</span></div></article>`;
  }).join("")}</div>`;
}
function renderBeds() {
  const occupied = data.beds.filter((bed) => bed.status === "Occupied").length;
  return `${heading("Beds & rooms", "Track room occupancy and patient assignments.", '<button class="button button-outline" data-action="add" data-kind="bed"><i class="fa-solid fa-plus"></i> Add bed</button>')}<div class="bed-summary">${statCard("Total beds", data.beds.length, "fa-bed", "icon-blue", "Across all rooms")}${statCard("Occupied", occupied, "fa-bed-pulse", "icon-orange", `${data.beds.length ? Math.round(occupied / data.beds.length * 100) : 0}% occupancy`)}${statCard("Available", data.beds.length - occupied, "fa-circle-check", "icon-teal", "Ready for admission")}</div><div class="bed-grid">${data.beds.filter((bed) => `${bed.room} ${bed.bedNumber} ${patientById(bed.patientId)?.name || ""}`.toLowerCase().includes(searchTerm.toLowerCase())).map((bed) => `<article class="bed-card ${bed.status === "Occupied" ? "occupied" : ""}"><div class="bed-card-top"><span class="bed-room">${escapeHtml(bed.room)}</span><span class="status ${bed.status === "Occupied" ? "status-occupied" : "status-available"}">${bed.status}</span></div><h3>${escapeHtml(bed.bedNumber)}</h3><div class="bed-assignee">${bed.patientId ? `Patient: ${escapeHtml(patientById(bed.patientId)?.name || "Unknown patient")}` : "Ready for assignment"}</div>${bed.status === "Available" ? `<button class="button button-soft button-sm" data-action="assign-bed" data-id="${bed.id}">Assign patient</button>` : `<button class="button button-outline button-sm" data-action="discharge-bed" data-id="${bed.id}">Discharge patient</button>`}</article>`).join("")}${data.beds.length ? "" : `<div class="content-card">${emptyState("fa-bed", "No beds configured", "Add a bed to get started.")}</div>`}</div>`;
}
function renderBilling() {
  const list = data.invoices.filter((invoice) => `${invoice.id} ${patientById(invoice.patientId)?.name || ""}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const total = data.invoices.reduce((sum, invoice) => sum + Number(invoice.paid), 0);
  return `${heading("Billing & payments", "Create invoices and keep track of patient payments.", '<button class="button button-primary" data-action="add" data-kind="invoice"><i class="fa-solid fa-plus"></i> Create invoice</button>')}<div class="stats-grid">${statCard("Recorded revenue", money(total), "fa-sack-dollar", "icon-teal", "Payments received")}${statCard("Invoices", data.invoices.length, "fa-file-invoice-dollar", "icon-blue", "All patient invoices")}${statCard("Pending payments", data.invoices.filter((item) => item.status !== "Paid").length, "fa-clock", "icon-orange", "Awaiting full payment")}${statCard("Paid in full", data.invoices.filter((item) => item.status === "Paid").length, "fa-circle-check", "icon-purple", "Completed invoices")}</div><div class="billing-grid">${list.map((invoice) => `<article class="invoice-card"><div class="invoice-head"><div><h3>${invoice.id}</h3><p>${escapeHtml(patientById(invoice.patientId)?.name || "Removed patient")}</p></div><span class="status ${statusClass(invoice.status)}">${invoice.status}</span></div><div class="invoice-amount">${money(invoiceTotal(invoice))}</div><p class="invoice-sub">Issued ${prettyDate(invoice.date)} · Paid ${money(invoice.paid)}</p><div class="invoice-bottom"><button class="button button-outline button-sm" data-action="print-invoice" data-id="${invoice.id}"><i class="fa-solid fa-print"></i> Print</button><div class="row-actions"><button data-action="edit" data-kind="invoice" data-id="${invoice.id}" aria-label="Edit invoice"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete" data-action="delete" data-kind="invoice" data-id="${invoice.id}" aria-label="Delete invoice"><i class="fa-regular fa-trash-can"></i></button></div></div></article>`).join("")}${list.length ? "" : `<div class="content-card">${emptyState("fa-file-invoice", "No invoices found", "Create an invoice to record a patient charge.")}</div>`}</div>`;
}
function renderReports() {
  const inRange = (value) => (!reportRange.from || value >= reportRange.from) && (!reportRange.to || value <= reportRange.to);
  const patients = data.patients.filter((item) => inRange(item.createdAt || item.visitDate));
  const appointments = data.appointments.filter((item) => inRange(item.date));
  const invoices = data.invoices.filter((item) => inRange(item.date));
  const label = `${reportRange.from ? prettyDate(reportRange.from) : "All time"} – ${reportRange.to ? prettyDate(reportRange.to) : "Today"}`;
  return `${heading("Reports & analytics", "A live overview of registrations, appointments, revenue, and capacity.", '<button class="button button-primary" data-action="print-report"><i class="fa-solid fa-print"></i> Print report</button>')}<div class="panel report-filters" style="margin-bottom:16px"><label class="form-field"><span>From date</span><input id="reportFrom" type="date" value="${reportRange.from}"></label><label class="form-field"><span>To date</span><input id="reportTo" type="date" value="${reportRange.to}"></label><button class="button button-soft" data-action="filter-reports"><i class="fa-solid fa-filter"></i> Apply date range</button><span id="reportRangeLabel" class="muted-count">Showing ${label}</span></div><div class="stats-grid">${statCard("Patient registrations", patients.length, "fa-hospital-user", "icon-blue", "In selected date range")}${statCard("Appointments", appointments.length, "fa-calendar-check", "icon-teal", "In selected date range")}${statCard("Revenue collected", money(invoices.reduce((sum, item) => sum + Number(item.paid), 0)), "fa-sack-dollar", "icon-orange", "Payments in selected range")}${statCard("Bed occupancy", `${data.beds.length ? Math.round(data.beds.filter((bed) => bed.status === "Occupied").length / data.beds.length * 100) : 0}%`, "fa-bed-pulse", "icon-purple", `${data.beds.filter((bed) => bed.status === "Occupied").length} of ${data.beds.length} beds occupied`)}</div><div class="dashboard-grid"><article class="panel"><div class="panel-head"><div><h2>Patient registrations</h2><p>Registrations by month in selected range</p></div></div><div class="chart-wrap"><canvas id="reportPatientsChart"></canvas></div></article><article class="panel"><div class="panel-head"><div><h2>Appointments by status</h2><p>Appointments in selected range</p></div></div><div class="chart-wrap"><canvas id="reportAppointmentsChart"></canvas></div></article></div><article class="panel"><div class="panel-head"><div><h2>Revenue by invoice</h2><p>Collected payment amounts in INR · selected range</p></div></div><div class="chart-wrap"><canvas id="reportRevenueChart"></canvas></div></article>`;
}
function renderReportCharts() {
  if (!window.Chart) return;
  const style = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: "#94a1b1", font: { size: 10 } } }, y: { grid: { color: "#edf1f5" }, beginAtZero: true, ticks: { color: "#94a1b1", precision: 0, font: { size: 10 } } } } };
  const inRange = (value) => (!reportRange.from || value >= reportRange.from) && (!reportRange.to || value <= reportRange.to);
  const patients = data.patients.filter((item) => inRange(item.createdAt || item.visitDate));
  const appointments = data.appointments.filter((item) => inRange(item.date));
  const invoices = data.invoices.filter((item) => inRange(item.date));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthCounts = monthNames.map((_, month) => patients.filter((item) => new Date(`${item.createdAt || item.visitDate}T12:00:00`).getMonth() === month).length);
  charts.push(new Chart(document.getElementById("reportPatientsChart"), { type: "bar", data: { labels: monthNames, datasets: [{ data: monthCounts, backgroundColor: "#4b8fdb", borderRadius: 5 }] }, options: style }));
  const statuses = ["Scheduled", "Completed", "Cancelled"];
  charts.push(new Chart(document.getElementById("reportAppointmentsChart"), { type: "doughnut", data: { labels: statuses, datasets: [{ data: statuses.map((status) => appointments.filter((item) => item.status === status).length), backgroundColor: ["#e9a23b", "#29a67e", "#df6671"], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "65%" } }));
  const revenueStyle = { ...style, scales: { ...style.scales, y: { ...style.scales.y, ticks: { ...style.scales.y.ticks, callback: (value) => money(value) } } } };
  charts.push(new Chart(document.getElementById("reportRevenueChart"), { type: "bar", data: { labels: invoices.map((item) => item.id), datasets: [{ data: invoices.map((item) => item.paid), backgroundColor: "#18a999", borderRadius: 5 }] }, options: revenueStyle }));
}
function renderSettings() {
  return `${heading("Settings", "Manage your demo profile and application preferences.", '<button class="button button-primary" data-action="save-profile"><i class="fa-solid fa-check"></i> Save changes</button>')}<div class="settings-layout"><section class="panel settings-card"><h2>Administrator profile</h2><p>Update the profile details displayed in your workspace.</p><div class="form-grid"><div class="form-field"><label for="settingName">Full name</label><input id="settingName" value="${escapeHtml(data.settings.name)}" required></div><div class="form-field"><label for="settingEmail">Email address</label><input id="settingEmail" type="email" value="${escapeHtml(data.settings.email)}" required></div></div><div class="setting-row" style="margin-top:20px"><div><strong>Dark appearance</strong><small>Switch the dashboard to a darker color theme.</small></div><input id="darkModeToggle" class="toggle" type="checkbox" ${data.settings.darkMode ? "checked" : ""}></div></section><section class="panel settings-card"><h2>Application information</h2><p>CarePoint is an educational hospital administration demo.</p><div class="setting-row"><div><strong>Data storage</strong><small>Records are saved in this browser only.</small></div><i class="fa-solid fa-database" style="color:#4385c8"></i></div><div class="setting-row"><div><strong>Demo account</strong><small>admin@carepoint.demo</small></div><i class="fa-regular fa-circle-user" style="color:#4385c8"></i></div><div class="setting-row"><div><strong>Version</strong><small>CarePoint Admin v1.0</small></div><span class="status status-active">Demo</span></div><button class="button button-danger button-sm" data-action="reset-demo"><i class="fa-solid fa-rotate-left"></i> Reset all demo data</button></section></div>`;
}
const schemas = {
  patient: { title: "Patient", fields: [{ name: "name", label: "Full name", required: true }, { name: "age", label: "Age", type: "number", min: 0, max: 120, required: true }, { name: "gender", label: "Gender", type: "select", options: ["Female", "Male", "Non-binary", "Prefer not to say"], required: true }, { name: "contact", label: "Contact number", required: true }, { name: "email", label: "Email address", type: "email" }, { name: "bloodGroup", label: "Blood group", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true }, { name: "department", label: "Department", type: "select", options: departments.map((d) => d.name), required: true }, { name: "visitDate", label: "Visit date", type: "date", required: true }, { name: "address", label: "Address", full: true }, { name: "notes", label: "Notes", type: "textarea", full: true }] },
  doctor: { title: "Doctor", fields: [{ name: "name", label: "Full name", required: true }, { name: "specialization", label: "Specialization", type: "select", options: departments.map((d) => d.name), required: true }, { name: "contact", label: "Contact number", required: true }, { name: "email", label: "Email address", type: "email", required: true }, { name: "availability", label: "Availability", type: "select", options: ["Available", "Unavailable"], required: true }, { name: "fee", label: "Consultation fee (₹)", type: "number", min: 0, required: true }, { name: "photo", label: "Photo URL", type: "url", full: true }] },
  appointment: { title: "Appointment", fields: [{ name: "patientId", label: "Patient", type: "select", optionsFrom: "patients", required: true }, { name: "doctorId", label: "Doctor", type: "select", optionsFrom: "doctors", required: true }, { name: "department", label: "Department", type: "select", options: departments.map((d) => d.name), required: true }, { name: "date", label: "Date", type: "date", required: true }, { name: "time", label: "Time", type: "time", required: true }, { name: "status", label: "Status", type: "select", options: ["Scheduled", "Completed", "Cancelled"], required: true }, { name: "reason", label: "Reason for visit", full: true }] },
  invoice: { title: "Invoice", fields: [{ name: "patientId", label: "Patient", type: "select", optionsFrom: "patients", required: true }, { name: "date", label: "Invoice date", type: "date", required: true }, { name: "consultation", label: "Consultation fee (₹)", type: "number", min: 0, required: true }, { name: "room", label: "Room charges (₹)", type: "number", min: 0, required: true }, { name: "medicine", label: "Medicine charges (₹)", type: "number", min: 0, required: true }, { name: "services", label: "Other services (₹)", type: "number", min: 0, required: true }, { name: "paid", label: "Amount paid (₹)", type: "number", min: 0, required: true }] },
  bed: { title: "Bed", fields: [{ name: "room", label: "Room number", required: true }, { name: "bedNumber", label: "Bed number", required: true }] }
};
function fieldMarkup(field, value = "", kind) {
  const name = field.name;
  const attrs = `${field.required ? "required" : ""} ${field.min !== undefined ? `min="${field.min}"` : ""} ${field.max !== undefined ? `max="${field.max}"` : ""}`;
  let control;
  if (field.type === "select") {
    const options = field.optionsFrom === "patients" ? data.patients.map((p) => [p.id, `${p.name} (${p.id})`]) : field.optionsFrom === "doctors" ? data.doctors.map((d) => [d.id, d.name]) : field.options.map((option) => [option, option]);
    control = `<select name="${name}" ${attrs}><option value="">Choose ${field.label.toLowerCase()}</option>${options.map(([optionValue, label]) => `<option value="${escapeHtml(optionValue)}" ${String(value) === String(optionValue) ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}</select>`;
  } else if (field.type === "textarea") control = `<textarea name="${name}" ${attrs}>${escapeHtml(value)}</textarea>`;
  else control = `<input name="${name}" type="${field.type || "text"}" value="${escapeHtml(value)}" ${attrs}>`;
  return `<div class="form-field ${field.full ? "full" : ""}"><label>${field.label}${field.required ? " *" : ""}</label>${control}</div>`;
}
function showForm(kind, id = "") {
  const schema = schemas[kind];
  if (!schema) return;
  const existing = id ? data[`${kind === "invoice" ? "invoices" : `${kind}s`}`]?.find((record) => record.id === id) : null;
  const initial = existing ? { ...existing } : {};
  if (kind === "patient") initial.visitDate ||= isoDate();
  if (kind === "appointment") { initial.date ||= isoDate(); initial.time ||= "09:00"; initial.status ||= "Scheduled"; }
  if (kind === "invoice") { initial.date ||= isoDate(); for (const key of ["consultation", "room", "medicine", "services", "paid"]) initial[key] ??= 0; }
  if (kind === "doctor") { initial.availability ||= "Available"; initial.photo ||= ""; }
  const fields = schema.fields.map((field) => fieldMarkup(field, initial[field.name] ?? "", kind)).join("");
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><header class="modal-head"><h2 id="modalTitle">${id ? "Edit" : "Add"} ${schema.title.toLowerCase()}</h2><button class="icon-button modal-close" data-action="close-modal" aria-label="Close"><i class="fa-solid fa-xmark"></i></button></header><form id="recordForm" class="modal-body" data-kind="${kind}" data-id="${id}"><div class="form-grid">${fields}</div><p class="form-error" id="modalError" role="alert"></p><div class="modal-actions"><button type="button" class="button button-outline" data-action="close-modal">Cancel</button><button type="submit" class="button button-primary">${id ? "Save changes" : `Add ${schema.title.toLowerCase()}`}</button></div></form></section></div>`;
  modalRoot.querySelector("form input, form select")?.focus();
}
function showDetails(kind, id) {
  const record = data[`${kind}s`]?.find((item) => item.id === id);
  if (!record) return;
  const fields = kind === "patient" ? [["Patient ID", record.id], ["Full name", record.name], ["Age", record.age], ["Gender", record.gender], ["Contact", record.contact], ["Email", record.email || "—"], ["Blood group", record.bloodGroup], ["Department", record.department], ["Visit date", prettyDate(record.visitDate)], ["Address", record.address || "—"], ["Notes", record.notes || "—"]] : Object.entries(record).map(([key, value]) => [key, value]);
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><h2>${kind === "patient" ? "Patient details" : "Record details"}</h2><button class="icon-button modal-close" data-action="close-modal"><i class="fa-solid fa-xmark"></i></button></header><div class="modal-body"><div class="detail-grid">${fields.map(([label, value]) => `<div class="detail-item"><small>${escapeHtml(String(label))}</small><strong>${escapeHtml(String(value))}</strong></div>`).join("")}</div><div class="modal-actions"><button class="button button-outline" data-action="close-modal">Close</button><button class="button button-primary" data-action="edit" data-kind="${kind}" data-id="${id}"><i class="fa-regular fa-pen-to-square"></i> Edit record</button></div></div></section></div>`;
}
function handleSubmit(form) {
  const kind = form.dataset.kind, id = form.dataset.id;
  const fields = new FormData(form);
  const record = Object.fromEntries(fields.entries());
  const numberFields = kind === "patient" ? ["age"] : kind === "doctor" ? ["fee"] : kind === "invoice" ? ["consultation", "room", "medicine", "services", "paid"] : [];
  numberFields.forEach((key) => { record[key] = Number(record[key]); });
  const error = document.getElementById("modalError");
  if (kind === "appointment" && record.status === "Scheduled") {
    const duplicate = data.appointments.some((item) => item.id !== id && item.status === "Scheduled" && item.doctorId === record.doctorId && item.date === record.date && item.time === record.time);
    if (duplicate) { error.textContent = "This doctor already has a scheduled appointment at that date and time."; return; }
  }
  if (kind === "invoice") {
    const total = invoiceTotal(record);
    if (record.paid > total) { error.textContent = "Amount paid cannot exceed the invoice total."; return; }
    record.status = record.paid === total ? "Paid" : record.paid > 0 ? "Partially Paid" : "Pending";
  }
  let collection = kind === "invoice" ? data.invoices : data[`${kind}s`];
  if (kind === "bed") collection = data.beds;
  if (id) {
    const index = collection.findIndex((item) => item.id === id);
    if (index >= 0) collection[index] = { ...collection[index], ...record };
  } else {
    if (kind === "patient") record.id = makeId("PT-2026-", data.patients);
    if (kind === "doctor") record.id = makeId("DR-", data.doctors);
    if (kind === "appointment") record.id = makeId("AP-", data.appointments);
    if (kind === "invoice") record.id = makeId("INV-2026-", data.invoices);
    if (kind === "bed") { record.id = makeId("BED-", data.beds); record.status = "Available"; record.patientId = ""; }
    collection.unshift(record);
  }
  if (kind === "appointment") {
    const patient = patientById(record.patientId);
    if (patient) patient.department = record.department;
  }
  data.activities.unshift({ icon: kind === "patient" ? "fa-user-plus" : kind === "appointment" ? "fa-calendar-check" : kind === "invoice" ? "fa-credit-card" : "fa-pen-to-square", text: `${id ? "Updated" : "Added"} <strong>${escapeHtml(record.name || record.id)}</strong> ${kind} record`, time: "Just now" });
  saveData(); modalRoot.innerHTML = ""; refreshPage(); toast(`${schemas[kind].title} ${id ? "updated" : "added"} successfully.`);
}
function deleteRecord(kind, id) {
  if (!window.confirm(`Delete this ${kind} record? This cannot be undone.`)) return;
  const key = kind === "invoice" ? "invoices" : `${kind}s`;
  data[key] = data[key].filter((item) => item.id !== id);
  if (kind === "patient") {
    data.appointments = data.appointments.filter((item) => item.patientId !== id);
    data.invoices = data.invoices.filter((item) => item.patientId !== id);
    data.beds.forEach((bed) => { if (bed.patientId === id) { bed.patientId = ""; bed.status = "Available"; } });
  }
  if (kind === "doctor") data.appointments = data.appointments.filter((item) => item.doctorId !== id);
  saveData(); refreshPage(); toast(`${kind[0].toUpperCase() + kind.slice(1)} deleted.`);
}
function assignBed(id) {
  if (!data.patients.length) { toast("Register a patient before assigning a bed.", "error"); return; }
  const bed = data.beds.find((item) => item.id === id);
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><h2>Assign patient to ${escapeHtml(bed.room)} · ${escapeHtml(bed.bedNumber)}</h2><button class="icon-button modal-close" data-action="close-modal"><i class="fa-solid fa-xmark"></i></button></header><form id="assignBedForm" class="modal-body" data-bed-id="${id}"><div class="form-grid">${fieldMarkup({ name: "patientId", label: "Patient", type: "select", optionsFrom: "patients", required: true })}</div><div class="modal-actions"><button class="button button-outline" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Assign bed</button></div></form></section></div>`;
}
function dischargeBed(id) {
  if (!window.confirm("Discharge this patient and mark the bed available?")) return;
  const bed = data.beds.find((item) => item.id === id);
  if (bed) { bed.status = "Available"; bed.patientId = ""; }
  saveData(); refreshPage(); toast("Bed marked available.");
}
function printInvoice(id) {
  const invoice = data.invoices.find((item) => item.id === id), patient = patientById(invoice.patientId);
  const popup = window.open("", "_blank", "width=720,height=800");
  if (!popup) { toast("Allow pop-ups to print this invoice.", "error"); return; }
  popup.document.write(`<!doctype html><html lang="en-IN"><head><title>${invoice.id} · CarePoint invoice</title><style>body{font:15px Arial,sans-serif;color:#263b57;padding:40px}h1{color:#2477d4}table{width:100%;border-collapse:collapse;margin:25px 0}td{padding:12px;border-bottom:1px solid #ddd}.total{font-weight:bold;font-size:20px}.muted{color:#78889a}</style></head><body><h1>CarePoint Health</h1><p class="muted">Patient invoice · Amounts in Indian rupees (INR)</p><hr><p><strong>Invoice:</strong> ${escapeHtml(invoice.id)}<br><strong>Patient:</strong> ${escapeHtml(patient?.name || "Removed patient")}<br><strong>Patient ID:</strong> ${escapeHtml(invoice.patientId)}<br><strong>Date:</strong> ${prettyDate(invoice.date)}</p><table>${[["Consultation fee", invoice.consultation], ["Room charges", invoice.room], ["Medicine charges", invoice.medicine], ["Other services", invoice.services]].map(([label, amount]) => `<tr><td>${label}</td><td>${money(amount)}</td></tr>`).join("")}<tr class="total"><td>Total</td><td>${money(invoiceTotal(invoice))}</td></tr><tr><td>Paid</td><td>${money(invoice.paid)}</td></tr><tr><td>Status</td><td>${escapeHtml(invoice.status)}</td></tr></table><p class="muted">Demonstration invoice only. This is not a real medical or payment record.</p><script>window.onload=()=>window.print()<\/script></body></html>`);
  popup.document.close();
}
function exportPatients() {
  const rows = [["Patient ID", "Name", "Age", "Gender", "Contact", "Blood group", "Department", "Visit date"], ...data.patients.map((patient) => [patient.id, patient.name, patient.age, patient.gender, patient.contact, patient.bloodGroup, patient.department, patient.visitDate])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = "carepoint-patients-demo.csv"; link.click(); URL.revokeObjectURL(link.href); toast("Patient CSV downloaded.");
}
function applyDarkMode(value) {
  data.settings.darkMode = value; document.body.classList.toggle("dark", value); saveData();
  const toggle = document.getElementById("darkModeToggle"); if (toggle) toggle.checked = value;
}
function actionClick(button, event) {
  const { action, kind, id, page } = button.dataset;
  if (action === "navigate") { navigate(page); return; }
  if (action === "add") { if (kind === "appointment" && (!data.patients.length || !data.doctors.length)) { toast("Add at least one patient and doctor before booking.", "error"); return; } if (kind === "invoice" && !data.patients.length) { toast("Register a patient before creating an invoice.", "error"); return; } showForm(kind); return; }
  if (action === "edit") { modalRoot.innerHTML = ""; showForm(kind, id); return; }
  if (action === "view") { showDetails(kind, id); return; }
  if (action === "delete") { deleteRecord(kind, id); return; }
  if (action === "close-modal") { if (button.classList.contains("modal-backdrop") && event.target !== button) return; modalRoot.innerHTML = ""; return; }
  if (action === "complete-appointment") { const item = data.appointments.find((entry) => entry.id === id); item.status = "Completed"; saveData(); refreshPage(); toast("Appointment marked completed."); return; }
  if (action === "cancel-appointment") { if (!window.confirm("Cancel this appointment?")) return; const item = data.appointments.find((entry) => entry.id === id); item.status = "Cancelled"; saveData(); refreshPage(); toast("Appointment cancelled."); return; }
  if (action === "assign-bed") { assignBed(id); return; }
  if (action === "discharge-bed") { dischargeBed(id); return; }
  if (action === "print-invoice") { printInvoice(id); return; }
  if (action === "export-patients") { exportPatients(); return; }
  if (action === "print-report") { window.print(); return; }
  if (action === "filter-reports") { const from = document.getElementById("reportFrom").value, to = document.getElementById("reportTo").value; if (from && to && from > to) { toast("Start date must be on or before end date.", "error"); return; } reportRange = { from, to }; refreshPage(); toast("Report date range applied."); return; }
  if (action === "save-profile") { const name = document.getElementById("settingName").value.trim(), email = document.getElementById("settingEmail").value.trim(); if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast("Enter a name and a valid email address.", "error"); return; } data.settings.name = name; data.settings.email = email; saveData(); document.getElementById("profileName").textContent = name; refreshPage(); toast("Profile saved."); return; }
  if (action === "reset-demo") { if (!window.confirm("Reset all demo records to the original sample data?")) return; data = initialData(); saveData(); applyDarkMode(false); refreshPage(); toast("Demo data has been reset."); return; }
  if (action === "help") { showHelp(); return; }
}
function showHelp() {
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><h2>CarePoint demo guide</h2><button class="icon-button modal-close" data-action="close-modal"><i class="fa-solid fa-xmark"></i></button></header><div class="modal-body"><p style="color:#718096;line-height:1.7">Use the left navigation to explore each area. Add or edit records with the blue action buttons; demo records persist in localStorage. Appointment bookings prevent scheduling the same doctor twice at one time. Billing invoices can be printed from the Billing page.</p><p style="color:#c15e65;font-size:11px"><strong>Privacy:</strong> This project is an educational frontend demo. Never enter real patient details. localStorage is not secure or appropriate for actual medical records.</p><div class="modal-actions"><button class="button button-primary" data-action="close-modal">Got it</button></div></div></section></div>`;
}
function navigate(page) {
  if (!pageTitles[page]) return;
  activePage = page; searchTerm = ""; refreshPage();
  document.getElementById("sidebar").classList.remove("open"); document.getElementById("sidebarScrim").classList.remove("open");
  document.getElementById("profileMenu").classList.remove("open");
}
function initializeLogin() {
  const authenticated = sessionStorage.getItem(SESSION_KEY) === "true";
  document.getElementById("loginScreen").classList.toggle("is-hidden", authenticated);
  document.getElementById("appShell").classList.toggle("is-hidden", !authenticated);
  if (authenticated) { applyDarkMode(data.settings.darkMode); refreshPage(); }
}
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action],[data-page],#notificationButton,#profileButton,#menuButton,#closeSidebar,#sidebarScrim,#logoutButton,#profileDarkMode,#helpButton");
  if (!target) {
    if (!event.target.closest(".dropdown-wrap")) document.querySelectorAll(".dropdown").forEach((menu) => menu.classList.remove("open"));
    return;
  }
  if (target.dataset.action) { actionClick(target, event); return; }
  if (target.dataset.page) { navigate(target.dataset.page); return; }
  if (target.id === "notificationButton") { document.getElementById("notificationMenu").classList.toggle("open"); document.getElementById("profileMenu").classList.remove("open"); return; }
  if (target.id === "profileButton") { document.getElementById("profileMenu").classList.toggle("open"); document.getElementById("notificationMenu").classList.remove("open"); return; }
  if (target.id === "menuButton") { document.getElementById("sidebar").classList.add("open"); document.getElementById("sidebarScrim").classList.add("open"); return; }
  if (target.id === "closeSidebar" || target.id === "sidebarScrim") { document.getElementById("sidebar").classList.remove("open"); document.getElementById("sidebarScrim").classList.remove("open"); return; }
  if (target.id === "logoutButton") { sessionStorage.removeItem(SESSION_KEY); initializeLogin(); return; }
  if (target.id === "profileDarkMode") { applyDarkMode(!data.settings.darkMode); return; }
  if (target.id === "helpButton") showHelp();
});
document.addEventListener("submit", (event) => {
  if (event.target.id === "recordForm") {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    handleSubmit(event.target);
  } else if (event.target.id === "assignBedForm") {
    event.preventDefault();
    const bed = data.beds.find((item) => item.id === event.target.dataset.bedId);
    const patientId = new FormData(event.target).get("patientId");
    if (bed) { bed.status = "Occupied"; bed.patientId = patientId; saveData(); modalRoot.innerHTML = ""; refreshPage(); toast("Patient assigned to bed."); }
  }
});
document.addEventListener("change", (event) => {
  if (event.target.id === "patientDepartmentFilter") {
    document.querySelectorAll("#patientsTable tr").forEach((row) => { row.hidden = Boolean(event.target.value && row.dataset.department !== event.target.value); });
  }
  if (event.target.id === "appointmentDateFilter") appointmentFilters.date = event.target.value;
  if (event.target.id === "appointmentDoctorFilter") appointmentFilters.doctorId = event.target.value;
  if (event.target.id === "appointmentStatusFilter") appointmentFilters.status = event.target.value;
  if (["appointmentDateFilter", "appointmentDoctorFilter", "appointmentStatusFilter"].includes(event.target.id)) refreshPage();
  if (event.target.id === "darkModeToggle") applyDarkMode(event.target.checked);
});
document.addEventListener("input", (event) => {
  if (event.target.id === "globalSearch") { searchTerm = event.target.value; refreshPage(); const input = document.getElementById("globalSearch"); input.focus(); input.setSelectionRange(searchTerm.length, searchTerm.length); }
});
document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("loginPassword"), icon = document.querySelector("#togglePassword i");
  input.type = input.type === "password" ? "text" : "password";
  icon.className = input.type === "password" ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("globalSearch").focus(); }
  if (event.key === "Escape") { modalRoot.innerHTML = ""; document.querySelectorAll(".dropdown").forEach((menu) => menu.classList.remove("open")); }
});
document.getElementById("currentDate").textContent = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
document.getElementById("notificationItems").innerHTML = `<div class="notification-item"><b>${data.appointments.filter((item) => item.date === isoDate() && item.status === "Scheduled").length} appointments</b> scheduled for today.</div><div class="notification-item"><b>${data.beds.filter((item) => item.status === "Available").length} beds</b> are currently available.</div><div class="notification-item"><b>Demo data</b> is stored only in this browser.</div>`;
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const error = document.getElementById("loginError");
  if (values.get("email") === "admin@carepoint.demo" && values.get("password") === "CarePoint123!") { sessionStorage.setItem(SESSION_KEY, "true"); error.textContent = ""; initializeLogin(); }
  else error.textContent = "The email or password is incorrect. Use the demo credentials shown below.";
});
if (data.settings.name) document.getElementById("profileName").textContent = data.settings.name;
initializeLogin();
