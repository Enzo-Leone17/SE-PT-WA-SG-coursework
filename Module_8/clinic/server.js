//env config
require('dotenv').config();

// server.js (Express App Entry Point)
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// Load Sequelize and models
const db = require("./models");

// Middleware
app.use(cors());
app.use(express.json());
// Using redis for rate limiting
const rateLimiter = require("./middleware/rateLimiter");
// Apply globally or per route per minute
app.use(rateLimiter(30, 60));

// Routes
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const checkInRoutes = require("./routes/checkInRoutes");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/clinic/patients", patientRoutes);
app.use("/api/clinic/appointments", appointmentRoutes);
app.use("/api/clinic/invoices", invoiceRoutes);
app.use("/api/clinic/checkin", checkInRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clinic/doctors", doctorRoutes);


// Connect to DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start server
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`);
});
