/* =========================================================
   MEDICORE HOSPITAL MANAGEMENT SYSTEM
   Main JavaScript Application
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL HMS OBJECT
========================================================= */

const HMS = {

  /* -------------------------------------------------------
     STORAGE KEYS
  ------------------------------------------------------- */

  storage: {
    patients: "medicore_patients",
    doctors: "medicore_doctors",
    appointments: "medicore_appointments",
    billing: "medicore_billing",
    medicines: "medicore_medicines",
    notifications: "medicore_notifications",
    settings: "medicore_settings",
    loggedIn: "hmsLoggedIn",
    user: "hmsUser"
  },


  /* -------------------------------------------------------
     DEFAULT PATIENT DATA
  ------------------------------------------------------- */

  defaultPatients: [
    {
      id: "P-1001",
      name: "Rahul Kumar",
      age: 42,
      gender: "Male",
      phone: "9876543210",
      email: "rahul@example.com",
      bloodGroup: "B+",
      doctor: "Dr. Ananya Sharma",
      department: "Cardiology",
      status: "Active",
      address: "Patna, Bihar",
      registrationDate: "2026-09-25"
    },

    {
      id: "P-1002",
      name: "Priya Singh",
      age: 31,
      gender: "Female",
      phone: "9123456780",
      email: "priya@example.com",
      bloodGroup: "O+",
      doctor: "Dr. Raj Verma",
      department: "Orthopedics",
      status: "Active",
      address: "Patna, Bihar",
      registrationDate: "2026-09-25"
    },

    {
      id: "P-1003",
      name: "Amit Das",
      age: 56,
      gender: "Male",
      phone: "9988776655",
      email: "amit@example.com",
      bloodGroup: "A+",
      doctor: "Dr. Neha Gupta",
      department: "Neurology",
      status: "Discharged",
      address: "Gaya, Bihar",
      registrationDate: "2026-09-22"
    }
  ],


  /* -------------------------------------------------------
     DEFAULT DOCTORS
  ------------------------------------------------------- */

  defaultDoctors: [
    {
      id: "D-001",
      name: "Dr. Ananya Sharma",
      specialization: "Cardiology",
      department: "Cardiology",
      experience: "12 Years",
      phone: "9876500011",
      email: "ananya@medicore.com",
      fee: 1200,
      status: "Available"
    },

    {
      id: "D-002",
      name: "Dr. Raj Verma",
      specialization: "Orthopedics",
      department: "Orthopedics",
      experience: "9 Years",
      phone: "9876500022",
      email: "raj@medicore.com",
      fee: 1000,
      status: "In Surgery"
    },

    {
      id: "D-003",
      name: "Dr. Neha Gupta",
      specialization: "Neurology",
      department: "Neurology",
      experience: "15 Years",
      phone: "9876500033",
      email: "neha@medicore.com",
      fee: 1500,
      status: "Available"
    },

    {
      id: "D-004",
      name: "Dr. Vivek Jain",
      specialization: "Dermatology",
      department: "Dermatology",
      experience: "7 Years",
      phone: "9876500044",
      email: "vivek@medicore.com",
      fee: 900,
      status: "Available"
    }
  ],


  /* -------------------------------------------------------
     DEFAULT APPOINTMENTS
  ------------------------------------------------------- */

  defaultAppointments: [
    {
      id: "APT-2301",
      patient: "Rahul Kumar",
      doctor: "Dr. Ananya Sharma",
      department: "Cardiology",
      date: "2026-09-26",
      time: "09:00 AM",
      type: "Consultation",
      status: "Confirmed"
    },

    {
      id: "APT-2302",
      patient: "Priya Singh",
      doctor: "Dr. Raj Verma",
      department: "Orthopedics",
      date: "2026-09-26",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Waiting"
    },

    {
      id: "APT-2303",
      patient: "Amit Das",
      doctor: "Dr. Neha Gupta",
      department: "Neurology",
      date: "2026-09-26",
      time: "11:00 AM",
      type: "Consultation",
      status: "Checked-in"
    }
  ],


  /* -------------------------------------------------------
     DEFAULT BILLING
  ------------------------------------------------------- */

  defaultBilling: [
    {
      id: "INV-9001",
      patient: "Rahul Kumar",
      service: "OPD + Laboratory",
      amount: 4800,
      paid: 4800,
      balance: 0,
      status: "Paid"
    },

    {
      id: "INV-9002",
      patient: "Suresh Kumar",
      service: "IPD",
      amount: 86500,
      paid: 60000,
      balance: 26500,
      status: "Partial"
    },

    {
      id: "INV-9003",
      patient: "Priya Singh",
      service: "Pharmacy",
      amount: 2150,
      paid: 2150,
      balance: 0,
      status: "Paid"
    }
  ],


  /* -------------------------------------------------------
     DEFAULT MEDICINES
  ------------------------------------------------------- */

  defaultMedicines: [
    {
      id: "MED-001",
      name: "Paracetamol 500mg",
      category: "Analgesic",
      batch: "PCM24A",
      stock: 820,
      reorder: 200,
      price: 3.5,
      expiry: "2028-06-30"
    },

    {
      id: "MED-002",
      name: "Amoxicillin 500mg",
      category: "Antibiotic",
      batch: "AMX26B",
      stock: 94,
      reorder: 150,
      price: 8,
      expiry: "2027-03-31"
    },

    {
      id: "MED-003",
      name: "Insulin Glargine",
      category: "Diabetes",
      batch: "INS11",
      stock: 36,
      reorder: 20,
      price: 550,
      expiry: "2027-01-31"
    }
  ],


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  init() {

    this.initializeStorage();

    this.setupSidebar();

    this.setupSearch();

    this.setupForms();

    this.setupModals();

    this.setupLogout();

    this.highlightCurrentPage();

    this.updateUserInformation();

    this.renderPatients();

    this.renderDoctors();

    this.renderAppointments();

    this.renderBilling();

    this.renderMedicines();

    this.updateDashboard();

  },


  /* =======================================================
     LOCAL STORAGE
  ======================================================= */

  initializeStorage() {

    if (!localStorage.getItem(this.storage.patients)) {
      this.save(
        this.storage.patients,
        this.defaultPatients
      );
    }

    if (!localStorage.getItem(this.storage.doctors)) {
      this.save(
        this.storage.doctors,
        this.defaultDoctors
      );
    }

    if (!localStorage.getItem(this.storage.appointments)) {
      this.save(
        this.storage.appointments,
        this.defaultAppointments
      );
    }

    if (!localStorage.getItem(this.storage.billing)) {
      this.save(
        this.storage.billing,
        this.defaultBilling
      );
    }

    if (!localStorage.getItem(this.storage.medicines)) {
      this.save(
        this.storage.medicines,
        this.defaultMedicines
      );
    }

    if (!localStorage.getItem(this.storage.notifications)) {
      this.save(
        this.storage.notifications,
        []
      );
    }

  },


  get(key) {

    try {

      return JSON.parse(
        localStorage.getItem(key)
      ) || [];

    } catch (error) {

      console.error(
        "Storage error:",
        error
      );

      return [];

    }

  },


  save(key, value) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  },


  /* =======================================================
     UNIQUE ID GENERATOR
  ======================================================= */

  generateId(prefix) {

    const random =
      Math.floor(
        Math.random() * 9000
      ) + 1000;

    return `${prefix}-${random}`;

  },


  /* =======================================================
     SIDEBAR
  ======================================================= */

  setupSidebar() {

    const button =
      document.querySelector(".hamb");

    const sidebar =
      document.querySelector(".sidebar");

    if (!button || !sidebar) {
      return;
    }

    button.addEventListener(
      "click",
      () => {

        sidebar.classList.toggle(
          "open"
        );

      }
    );

  },


  /* =======================================================
     CURRENT PAGE
  ======================================================= */

  highlightCurrentPage() {

    const current =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document
      .querySelectorAll(".nav a")
      .forEach(link => {

        const href =
          link.getAttribute("href");

        if (!href) {
          return;
        }

        const page =
          href.split("/").pop()
            .toLowerCase();

        if (page === current) {

          link.classList.add(
            "active"
          );

        }

      });

  },


  /* =======================================================
     SEARCH
  ======================================================= */

  setupSearch() {

    document
      .querySelectorAll(
        "[data-search]"
      )
      .forEach(input => {

        input.addEventListener(
          "input",
          event => {

            const query =
              event.target.value
                .toLowerCase()
                .trim();

            const selector =
              event.target.dataset.search;

            document
              .querySelectorAll(
                selector
              )
              .forEach(row => {

                const text =
                  row.innerText
                    .toLowerCase();

                row.style.display =
                  text.includes(query)
                    ? ""
                    : "none";

              });

          }
        );

      });

  },


  /* =======================================================
     USER INFORMATION
  ======================================================= */

  updateUserInformation() {

    const user =
      localStorage.getItem(
        this.storage.user
      ) || "Administrator";

    document
      .querySelectorAll(
        "[data-user]"
      )
      .forEach(element => {

        element.textContent = user;

      });

  },


  /* =======================================================
     PATIENT MANAGEMENT
  ======================================================= */

  getPatients() {

    return this.get(
      this.storage.patients
    );

  },


  addPatient(patient) {

    const patients =
      this.getPatients();

    const newPatient = {

      id: this.generateId("P"),

      name: patient.name,

      age: Number(patient.age),

      gender: patient.gender,

      phone: patient.phone,

      email: patient.email || "",

      bloodGroup:
        patient.bloodGroup || "Unknown",

      doctor:
        patient.doctor || "Not Assigned",

      department:
        patient.department || "General",

      address:
        patient.address || "",

      status: "Active",

      registrationDate:
        new Date()
          .toISOString()
          .split("T")[0]

    };

    patients.unshift(
      newPatient
    );

    this.save(
      this.storage.patients,
      patients
    );

    this.renderPatients();

    this.updateDashboard();

    this.addNotification(
      `New patient registered: ${newPatient.name}`
    );

    toast(
      "Patient registered successfully."
    );

    return newPatient;

  },


  renderPatients() {

    const tbody =
      document.querySelector(
        "#patientRows"
      );

    if (!tbody) {
      return;
    }

    const patients =
      this.getPatients();

    if (!patients.length) {

      tbody.innerHTML = `
        <tr>
          <td colspan="8"
              style="text-align:center">
            No patients found.
          </td>
        </tr>
      `;

      return;

    }

    tbody.innerHTML =
      patients.map(patient => {

        const badge =
          patient.status === "Active"
            ? "green"
            : patient.status === "Critical"
              ? "red"
              : "blue";

        return `
          <tr>

            <td>
              <strong>${escapeHTML(patient.id)}</strong>
            </td>

            <td>
              <strong>${escapeHTML(patient.name)}</strong>
            </td>

            <td>
              ${escapeHTML(patient.age)}
            </td>

            <td>
              ${escapeHTML(patient.gender)}
            </td>

            <td>
              ${escapeHTML(patient.phone)}
            </td>

            <td>
              ${escapeHTML(patient.doctor)}
            </td>

            <td>
              <span class="badge ${badge}">
                ${escapeHTML(patient.status)}
              </span>
            </td>

            <td>

              <div class="actions">

                <button
                  class="btn secondary"
                  onclick="viewPatient('${patient.id}')">
                  View
                </button>

                <button
                  class="btn danger"
                  onclick="deletePatient('${patient.id}')">
                  Delete
                </button>

              </div>

            </td>

          </tr>
        `;

      }).join("");

  },


  deletePatient(id) {

    if (
      !confirm(
        "Are you sure you want to delete this patient?"
      )
    ) {

      return;

    }

    let patients =
      this.getPatients();

    patients =
      patients.filter(
        patient =>
          patient.id !== id
      );

    this.save(
      this.storage.patients,
      patients
    );

    this.renderPatients();

    this.updateDashboard();

    toast(
      "Patient deleted successfully."
    );

  },


  /* =======================================================
     DOCTOR MANAGEMENT
  ======================================================= */

  getDoctors() {

    return this.get(
      this.storage.doctors
    );

  },


  addDoctor(doctor) {

    const doctors =
      this.getDoctors();

    const newDoctor = {

      id: this.generateId("D"),

      name: doctor.name,

      specialization:
        doctor.specialization,

      department:
        doctor.department,

      experience:
        doctor.experience,

      phone:
        doctor.phone,

      email:
        doctor.email,

      fee:
        Number(doctor.fee || 0),

      status: "Available"

    };

    doctors.unshift(
      newDoctor
    );

    this.save(
      this.storage.doctors,
      doctors
    );

    this.renderDoctors();

    toast(
      "Doctor added successfully."
    );

  },


  renderDoctors() {

    const tbody =
      document.querySelector(
        "#doctorRows"
      );

    if (!tbody) {
      return;
    }

    const doctors =
      this.getDoctors();

    tbody.innerHTML =
      doctors.map(doctor => {

        const statusClass =
          doctor.status === "Available"
            ? "green"
            : doctor.status === "In Surgery"
              ? "yellow"
              : "blue";

        return `
          <tr>

            <td>${escapeHTML(doctor.id)}</td>

            <td>
              <strong>
                ${escapeHTML(doctor.name)}
              </strong>
            </td>

            <td>
              ${escapeHTML(
                doctor.specialization
              )}
            </td>

            <td>
              ${escapeHTML(
                doctor.department
              )}
            </td>

            <td>
              ${escapeHTML(
                doctor.experience
              )}
            </td>

            <td>
              <span class="badge ${statusClass}">
                ${escapeHTML(
                  doctor.status
                )}
              </span>
            </td>

          </tr>
        `;

      }).join("");

  },


  /* =======================================================
     APPOINTMENTS
  ======================================================= */

  getAppointments() {

    return this.get(
      this.storage.appointments
    );

  },


  addAppointment(appointment) {

    const appointments =
      this.getAppointments();

    const newAppointment = {

      id:
        this.generateId("APT"),

      patient:
        appointment.patient,

      doctor:
        appointment.doctor,

      department:
        appointment.department,

      date:
        appointment.date,

      time:
        appointment.time,

      type:
        appointment.type ||
        "Consultation",

      status:
        "Confirmed"

    };

    appointments.unshift(
      newAppointment
    );

    this.save(
      this.storage.appointments,
      appointments
    );

    this.renderAppointments();

    this.updateDashboard();

    this.addNotification(
      `Appointment booked for ${newAppointment.patient}`
    );

    toast(
      "Appointment booked successfully."
    );

  },


  renderAppointments() {

    const tbody =
      document.querySelector(
        "#appointmentRows"
      );

    if (!tbody) {
      return;
    }

    const appointments =
      this.getAppointments();

    tbody.innerHTML =
      appointments.map(appointment => {

        let statusClass = "blue";

        if (
          appointment.status === "Confirmed"
        ) {
          statusClass = "green";
        }

        if (
          appointment.status === "Waiting"
        ) {
          statusClass = "yellow";
        }

        if (
          appointment.status === "Cancelled"
        ) {
          statusClass = "red";
        }

        return `
          <tr>

            <td>
              ${escapeHTML(
                appointment.id
              )}
            </td>

            <td>
              ${escapeHTML(
                appointment.patient
              )}
            </td>

            <td>
              ${escapeHTML(
                appointment.doctor
              )}
            </td>

            <td>
              ${escapeHTML(
                appointment.date
              )}
            </td>

            <td>
              ${escapeHTML(
                appointment.time
              )}
            </td>

            <td>
              ${escapeHTML(
                appointment.department
              )}
            </td>

            <td>
              <span class="badge ${statusClass}">
                ${escapeHTML(
                  appointment.status
                )}
              </span>
            </td>

          </tr>
        `;

      }).join("");

  },


  /* =======================================================
     BILLING
  ======================================================= */

  getBilling() {

    return this.get(
      this.storage.billing
    );

  },


  addInvoice(invoice) {

    const billing =
      this.getBilling();

    const amount =
      Number(invoice.amount || 0);

    const paid =
      Number(invoice.paid || 0);

    const balance =
      Math.max(
        amount - paid,
        0
      );

    let status =
      "Paid";

    if (paid === 0) {
      status = "Unpaid";
    } else if (balance > 0) {
      status = "Partial";
    }

    const newInvoice = {

      id:
        this.generateId("INV"),

      patient:
        invoice.patient,

      service:
        invoice.service,

      amount,

      paid,

      balance,

      status

    };

    billing.unshift(
      newInvoice
    );

    this.save(
      this.storage.billing,
      billing
    );

    this.renderBilling();

    this.updateDashboard();

    toast(
      "Invoice created successfully."
    );

  },


  renderBilling() {

    const tbody =
      document.querySelector(
        "#billingRows"
      );

    if (!tbody) {
      return;
    }

    const billing =
      this.getBilling();

    tbody.innerHTML =
      billing.map(invoice => {

        let badge = "green";

        if (
          invoice.status === "Partial"
        ) {
          badge = "yellow";
        }

        if (
          invoice.status === "Unpaid"
        ) {
          badge = "red";
        }

        return `
          <tr>

            <td>
              ${escapeHTML(invoice.id)}
            </td>

            <td>
              ${escapeHTML(invoice.patient)}
            </td>

            <td>
              ${escapeHTML(invoice.service)}
            </td>

            <td>
              ₹${formatNumber(invoice.amount)}
            </td>

            <td>
              ₹${formatNumber(invoice.paid)}
            </td>

            <td>
              ₹${formatNumber(invoice.balance)}
            </td>

            <td>
              <span class="badge ${badge}">
                ${escapeHTML(invoice.status)}
              </span>
            </td>

          </tr>
        `;

      }).join("");

  },


  /* =======================================================
     PHARMACY
  ======================================================= */

  getMedicines() {

    return this.get(
      this.storage.medicines
    );

  },


  addMedicine(medicine) {

    const medicines =
      this.getMedicines();

    const newMedicine = {

      id:
        this.generateId("MED"),

      name:
        medicine.name,

      category:
        medicine.category,

      batch:
        medicine.batch,

      stock:
        Number(medicine.stock),

      reorder:
        Number(medicine.reorder),

      price:
        Number(medicine.price),

      expiry:
        medicine.expiry

    };

    medicines.unshift(
      newMedicine
    );

    this.save(
      this.storage.medicines,
      medicines
    );

    this.renderMedicines();

    toast(
      "Medicine added successfully."
    );

  },


  renderMedicines() {

    const tbody =
      document.querySelector(
        "#medicineRows"
      );

    if (!tbody) {
      return;
    }

    const medicines =
      this.getMedicines();

    tbody.innerHTML =
      medicines.map(medicine => {

        const lowStock =
          medicine.stock <=
          medicine.reorder;

        return `
          <tr>

            <td>
              <strong>
                ${escapeHTML(
                  medicine.name
                )}
              </strong>
            </td>

            <td>
              ${escapeHTML(
                medicine.category
              )}
            </td>

            <td>
              ${escapeHTML(
                medicine.batch
              )}
            </td>

            <td>
              ${formatNumber(
                medicine.stock
              )}
            </td>

            <td>
              ${formatNumber(
                medicine.reorder
              )}
            </td>

            <td>
              ₹${formatNumber(
                medicine.price
              )}
            </td>

            <td>
              <span class="badge ${
                lowStock
                  ? "red"
                  : "green"
              }">
                ${
                  lowStock
                    ? "Low Stock"
                    : "In Stock"
                }
              </span>
            </td>

          </tr>
        `;

      }).join("");

  },


  /* =======================================================
     DASHBOARD
  ======================================================= */

  updateDashboard() {

    const patients =
      this.getPatients();

    const appointments =
      this.getAppointments();

    const billing =
      this.getBilling();

    const medicines =
      this.getMedicines();

    this.setDashboardValue(
      "totalPatients",
      patients.length
    );

    this.setDashboardValue(
      "totalAppointments",
      appointments.length
    );

    this.setDashboardValue(
      "totalRevenue",
      "₹" +
      formatNumber(
        billing.reduce(
          (sum, item) =>
            sum +
            Number(item.paid || 0),
          0
        )
      )
    );

    this.setDashboardValue(
      "lowStock",
      medicines.filter(
        medicine =>
          medicine.stock <=
          medicine.reorder
      ).length
    );

  },


  setDashboardValue(
    elementId,
    value
  ) {

    const element =
      document.getElementById(
        elementId
      );

    if (element) {
      element.textContent = value;
    }

  },


  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  addNotification(message) {

    const notifications =
      this.get(
        this.storage.notifications
      );

    notifications.unshift({

      id:
        this.generateId("NOT"),

      message,

      date:
        new Date().toLocaleString(),

      read: false

    });

    this.save(
      this.storage.notifications,
      notifications
    );

  },


  getNotifications() {

    return this.get(
      this.storage.notifications
    );

  },


  /* =======================================================
     MODALS
  ======================================================= */

  setupModals() {

    document
      .querySelectorAll(
        "[data-modal-open]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const modalId =
              button.dataset.modalOpen;

            openModal(modalId);

          }
        );

      });


    document
      .querySelectorAll(
        "[data-modal-close]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const modalId =
              button.dataset.modalClose;

            closeModal(modalId);

          }
        );

      });


    document
      .querySelectorAll(".modal")
      .forEach(modal => {

        modal.addEventListener(
          "click",
          event => {

            if (
              event.target === modal
            ) {

              modal.classList.remove(
                "show"
              );

            }

          }
        );

      });

  },


  /* =======================================================
     FORM HANDLERS
  ======================================================= */

  setupForms() {

    const patientForm =
      document.getElementById(
        "patientForm"
      );

    if (patientForm) {

      patientForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const data =
            new FormData(
              patientForm
            );

          this.addPatient({

            name:
              data.get("name"),

            age:
              data.get("age"),

            gender:
              data.get("gender"),

            phone:
              data.get("phone"),

            email:
              data.get("email"),

            bloodGroup:
              data.get("bloodGroup"),

            doctor:
              data.get("doctor"),

            department:
              data.get("department"),

            address:
              data.get("address")

          });

          patientForm.reset();

          closeAllModals();

        }
      );

    }


    const appointmentForm =
      document.getElementById(
        "appointmentForm"
      );

    if (appointmentForm) {

      appointmentForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const data =
            new FormData(
              appointmentForm
            );

          this.addAppointment({

            patient:
              data.get("patient"),

            doctor:
              data.get("doctor"),

            department:
              data.get("department"),

            date:
              data.get("date"),

            time:
              data.get("time"),

            type:
              data.get("type")

          });

          appointmentForm.reset();

          closeAllModals();

        }
      );

    }


    const invoiceForm =
      document.getElementById(
        "invoiceForm"
      );

    if (invoiceForm) {

      invoiceForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const data =
            new FormData(
              invoiceForm
            );

          this.addInvoice({

            patient:
              data.get("patient"),

            service:
              data.get("service"),

            amount:
              data.get("amount"),

            paid:
              data.get("paid")

          });

          invoiceForm.reset();

          closeAllModals();

        }
      );

    }


    const doctorForm =
      document.getElementById(
        "doctorForm"
      );

    if (doctorForm) {

      doctorForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const data =
            new FormData(
              doctorForm
            );

          this.addDoctor({

            name:
              data.get("name"),

            specialization:
              data.get("specialization"),

            department:
              data.get("department"),

            experience:
              data.get("experience"),

            phone:
              data.get("phone"),

            email:
              data.get("email"),

            fee:
              data.get("fee")

          });

          doctorForm.reset();

          closeAllModals();

        }
      );

    }

  },


  /* =======================================================
     LOGOUT
  ======================================================= */

  setupLogout() {

    document
      .querySelectorAll(
        "[data-logout]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            logout();

          }
        );

      });

  }

};


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */


/* ---------------------------------------------------------
   OPEN MODAL
--------------------------------------------------------- */

function openModal(id) {

  const modal =
    document.getElementById(id);

  if (modal) {

    modal.classList.add(
      "show"
    );

  }

}


/* ---------------------------------------------------------
   CLOSE MODAL
--------------------------------------------------------- */

function closeModal(id) {

  const modal =
    document.getElementById(id);

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


/* ---------------------------------------------------------
   CLOSE ALL MODALS
--------------------------------------------------------- */

function closeAllModals() {

  document
    .querySelectorAll(".modal")
    .forEach(modal => {

      modal.classList.remove(
        "show"
      );

    });

}


/* ---------------------------------------------------------
   TOAST NOTIFICATION
--------------------------------------------------------- */

function toast(message) {

  const existing =
    document.querySelector(
      ".hms-toast"
    );

  if (existing) {
    existing.remove();
  }

  const notification =
    document.createElement(
      "div"
    );

  notification.className =
    "hms-toast";

  notification.innerHTML = `
    <span>✓</span>
    <span>${escapeHTML(message)}</span>
  `;

  notification.style.cssText = `
    position:fixed;
    right:20px;
    bottom:20px;
    z-index:9999;
    background:#111827;
    color:white;
    padding:13px 18px;
    border-radius:10px;
    display:flex;
    align-items:center;
    gap:10px;
    box-shadow:0 10px 30px rgba(0,0,0,.2);
    font-size:13px;
    animation:hmsToastIn .25s ease;
  `;

  document.body.appendChild(
    notification
  );

  setTimeout(() => {

    notification.remove();

  }, 2800);

}


/* ---------------------------------------------------------
   PATIENT VIEW
--------------------------------------------------------- */

function viewPatient(id) {

  const patients =
    HMS.getPatients();

  const patient =
    patients.find(
      item =>
        item.id === id
    );

  if (!patient) {

    toast(
      "Patient not found."
    );

    return;

  }

  const container =
    document.getElementById(
      "viewPatientBody"
    );

  if (!container) {

    alert(
      `Patient: ${patient.name}\n` +
      `ID: ${patient.id}\n` +
      `Age: ${patient.age}\n` +
      `Gender: ${patient.gender}\n` +
      `Phone: ${patient.phone}\n` +
      `Doctor: ${patient.doctor}`
    );

    return;

  }

  container.innerHTML = `

    <div style="
      display:grid;
      grid-template-columns:80px 1fr;
      gap:18px;
      align-items:center;
      margin-bottom:20px;
    ">

      <div style="
        width:80px;
        height:80px;
        border-radius:50%;
        background:#dbeafe;
        color:#1d4ed8;
        display:grid;
        place-items:center;
        font-size:28px;
        font-weight:800;
      ">
        ${escapeHTML(
          patient.name.charAt(0)
        )}
      </div>

      <div>
        <h2>
          ${escapeHTML(
            patient.name
          )}
        </h2>

        <p class="muted">
          Patient ID:
          ${escapeHTML(
            patient.id
          )}
        </p>
      </div>

    </div>

    <div class="form-grid">

      <div class="card">
        <strong>Age</strong>
        <p>${escapeHTML(patient.age)}</p>
      </div>

      <div class="card">
        <strong>Gender</strong>
        <p>${escapeHTML(patient.gender)}</p>
      </div>

      <div class="card">
        <strong>Blood Group</strong>
        <p>${escapeHTML(patient.bloodGroup)}</p>
      </div>

      <div class="card">
        <strong>Phone</strong>
        <p>${escapeHTML(patient.phone)}</p>
      </div>

      <div class="card">
        <strong>Doctor</strong>
        <p>${escapeHTML(patient.doctor)}</p>
      </div>

      <div class="card">
        <strong>Department</strong>
        <p>${escapeHTML(patient.department)}</p>
      </div>

    </div>

    <br>

    <div class="card">

      <h3>Address</h3>

      <p class="muted">
        ${escapeHTML(
          patient.address ||
          "Not provided"
        )}
      </p>

    </div>

  `;

  openModal(
    "viewModal"
  );

}


/* ---------------------------------------------------------
   DELETE PATIENT
--------------------------------------------------------- */

function deletePatient(id) {

  HMS.deletePatient(id);

}


/* ---------------------------------------------------------
   LOGOUT
--------------------------------------------------------- */

function logout() {

  const confirmed =
    confirm(
      "Are you sure you want to logout?"
    );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(
    HMS.storage.loggedIn
  );

  localStorage.removeItem(
    HMS.storage.user
  );

  window.location.href =
    getRootPath() + "index.html";

}


/* ---------------------------------------------------------
   ROOT PATH
--------------------------------------------------------- */

function getRootPath() {

  const path =
    window.location.pathname;

  if (
    path.includes("/pages/")
  ) {

    return "../";

  }

  return "";

}


/* ---------------------------------------------------------
   HTML SECURITY
--------------------------------------------------------- */

function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* ---------------------------------------------------------
   NUMBER FORMAT
--------------------------------------------------------- */

function formatNumber(value) {

  return Number(
    value || 0
  ).toLocaleString(
    "en-IN"
  );

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    HMS.init();

  }
);


/* =========================================================
   TOAST ANIMATION
========================================================= */

const toastStyle =
  document.createElement(
    "style"
  );

toastStyle.textContent = `

@keyframes hmsToastIn {

  from {
    opacity:0;
    transform:translateY(20px);
  }

  to {
    opacity:1;
    transform:translateY(0);
  }

}

`;

document.head.appendChild(
  toastStyle
);


/* =========================================================
   GLOBAL KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    /* ESC closes modal */

    if (
      event.key === "Escape"
    ) {

      closeAllModals();

    }

    /* CTRL + K focuses search */

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      const search =
        document.querySelector(
          ".search"
        );

      if (search) {
        search.focus();
      }

    }

  }
);
