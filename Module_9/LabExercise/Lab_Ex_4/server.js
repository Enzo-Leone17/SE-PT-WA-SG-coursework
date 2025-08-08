//env config
require('dotenv').config();

// server.js (Express App Entry Point)
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// parse requests of content-type - application/json
app.use(express.json());

//base route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my car API application." });
});

//car route
const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});