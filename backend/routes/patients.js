const express = require("express");
const Patient = require("../models/Patient");

const router = express.Router();

// POST /api/patients - add a patient
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/patients - list all patients
router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json(patients);
});

module.exports = router;
