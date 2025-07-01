//using express
const express = require("express");
const app = express();

//swagger
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//path
const path = require("path");
const { fileURLToPath } = require("url");

//serve static files
app.use("/", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/calculator.html");
});

//import route
const calculatorRouter = require("./routes/calculatorRoutes.js");

//define routes
app.use("/calculator", calculatorRouter);

//export the app
module.exports = app;
