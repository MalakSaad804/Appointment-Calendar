import React, { useEffect, useState } from "react";
import { getDoctors, getPatients } from "./api";
import AppointmentCalendar from "./components/AppointmentCalendar";
import "./styles.css";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState("");
 
  useEffect(() => {
    getDoctors().then((docs) => {
      setDoctors(docs);
      if (docs.length) setDoctorId(docs[0]._id);
    });
    getPatients().then(setPatients);
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span>+</span></div>
          <div>
            <p className="brand-name">Visit / Care</p>
            <p className="brand-caption">Practice calendar</p>
          </div>
        </div>
        <div className="topbar-status"><span /> Scheduling desk</div>
      </header>

      <main>
        <section className="page-heading">
          <p className="eyebrow"><span>Care coordination</span><i /> Weekly overview</p>
          <h1>Appointments, at a glance.</h1>
          <p className="page-intro">A clear view of your clinic week, one visit at a time.</p>
        </section>

        <section className="doctor-bar" aria-label="Doctor selection">
          <div className="doctor-selection">
            <div className="doctor-glyph" aria-hidden="true">+</div>
            <div className="doctor-label-wrap">
              <label htmlFor="doctor-select">Selected clinician</label>
              <span>Choose a calendar to view</span>
            </div>
            <select
              id="doctor-select"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          <div className="record-counts">
            <span><strong>{doctors.length}</strong> clinicians</span>
            <i />
            <span><strong>{patients.length}</strong> patients</span>
          </div>
        </section>

        {doctorId ? (
          <section className="calendar-panel" aria-label="Appointment calendar">
            <div className="calendar-panel-heading">
              <div>
                <p className="eyebrow">Schedule</p>
                <h2>Availability &amp; visits</h2>
              </div>
              <div className="calendar-legend" aria-label="Calendar legend">
                <span><i className="legend-booked" />Booked visit</span>
                <span><i className="legend-open" />Open time</span>
              </div>
            </div>
            <AppointmentCalendar doctorId={doctorId} patients={patients} />
          </section>
        ) : (
          <section className="empty-state">
            <div className="empty-state-mark" aria-hidden="true">+</div>
            <h2>No clinician selected</h2>
            <p>Add a doctor to start viewing the appointment calendar.</p>
          </section>
        )}
      </main>
      <footer className="page-footer">Visit / Care <span>·</span> Clinic scheduling</footer>
    </div>
  );
}
