import React, { useState } from "react";
import { createVisit } from "../api";

export default function BookingModal({ slot, doctorId, patients, onClose, onBooked }) {
  const [patientId, setPatientId] = useState(patients[0]?._id || "");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!patientId) {
      setError("Please choose a patient.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const visit = await createVisit({
        patient: patientId,
        doctor: doctorId,
        startTime: slot.start.toISOString(),
        endTime: slot.end.toISOString(),
        notes,
      });
      onBooked(visit);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not book this slot.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Book appointment</h3>
        <p style={{ fontSize: 13, color: "#555" }}>
          {slot.start.toLocaleString()} - {slot.end.toLocaleTimeString()}
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Patient
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            >
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block", marginBottom: 8 }}>
            Notes (optional)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>

          {error && <p style={{ color: "#c0392b" }}>{error}</p>}

          <div className="modal-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Booking..." : "Book slot"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

