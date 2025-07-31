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


// Routes
const staffRoutes = require("./routes/staffRoutes");
const managerRoutes = require("./routes/managerRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bin_locationRoutes = require("./routes/bin_locationRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/warehouse/staffs", staffRoutes);
app.use("/api/warehouse/managers", managerRoutes);
app.use("/api/warehouse/assignments", assignmentRoutes);
app.use("/api/warehouse/tasks", taskRoutes);
app.use("/api/warehouse/items", itemRoutes);
app.use("/api/warehouse/bin_locations", bin_locationRoutes);
app.use("/api/warehouse/auth", authRoutes);


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
