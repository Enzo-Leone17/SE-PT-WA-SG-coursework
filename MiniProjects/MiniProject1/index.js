//initialize the dependencies and express server
const express = require("express");
const cors = require('cors');

//initialize app and port
const app = express();
const port = 8000;

//define routes
const itemRouter = require("./routes/itemRouter.js");

//middleware: bridging
app.use(cors());
app.use(express.json());

//routes
app.use("/api/items", itemRouter);




//open on port
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`)
})