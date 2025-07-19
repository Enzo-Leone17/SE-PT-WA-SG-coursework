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
  res.sendFile(__dirname + "/public/index.html");
});

//import route
const storeRouter = require("./routes/storeRoutes.js");

//define routes
app.use("/storeAPI", storeRouter);

//export the app
module.exports = app;
