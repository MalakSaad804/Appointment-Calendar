import React, { useState } from "react";
import { updateVisit, deleteVisit } from "../api";
import PrescriptionUpload from "./PrescriptionUpload";

export default function VisitDetail({ visit, onClose, onChanged }) {
  const [current, setCurrent] = useState(visit);
  const [notes, setNotes] = useState(visit.notes || "");
  const [saving, setSaving] = useState(false);

  async function saveNotes() {
    setSaving(true);
    try {
      const updated = await updateVisit(current._id, { notes });
      setCurrent(updated);
      onChanged(updated);
    } finally {
      setSaving(false);
    }
  }

  async function markCompleted() {
    const updated = await updateVisit(current._id, { status: "completed" });
    setCurrent(updated);
    onChanged(updated);
  }

  async function cancelVisit() {
    await deleteVisit(current._id);
    onChanged(null, current._id);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Visit details</h3>
        <p style={{ fontSize: 13 }}>
          Patient: <strong>{current.patient?.name || "N/A"}</strong>
          <br />
          Status: {current.status}
          <br />
          {new Date(current.startTime).toLocaleString()}
        </p>

        <label style={{ display: "block", margin: "10px 0" }}>
          Visit notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </label>
        <button onClick={saveNotes} disabled={saving}>
          {saving ? "Saving..." : "Save notes"}
        </button>

        <hr style={{ margin: "14px 0" }} />

        <PrescriptionUpload visit={current} onUploaded={(v) => { setCurrent(v); onChanged(v); }} />

        <div className="modal-actions">
          {current.status !== "completed" && (
            <button onClick={markCompleted}>Mark completed</button>
          )}
          <button onClick={cancelVisit} style={{ color: "#c0392b" }}>
            Cancel visit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

