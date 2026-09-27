const express = require("express");
const cors = require("cors");
const path = require("path");

const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const visitRoutes = require("./routes/visits");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded prescription images so the frontend can show them as <img src="...">
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/visits", visitRoutes);

app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));

module.exports = app;
