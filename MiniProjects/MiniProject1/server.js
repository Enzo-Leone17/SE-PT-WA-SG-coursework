//initialize the dependencies and express server
const express = require("express");
const cors = require('cors');
const path = require("path");

//initialize app and port
const app = express();
const port = 8000;

//define routes
const itemRouter = require("./routes/itemRouter.js");

//middleware: bridging
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + "/./assets")));

//routes
app.use("/api/items", itemRouter);

//open index html for main page
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/./assets/pages/index.html"));
});


//open on port
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`)
})


