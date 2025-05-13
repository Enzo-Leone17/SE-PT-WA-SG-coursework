const express = require("express");
const app = express();
const bookRouter = require("./routes/bookRoutes.js");
const studentRouter = require("./routes/studentRouter.js");

app.use(express.json());
app.use("/api/books", bookRouter);
app.use("/api/students", studentRouter);

app.listen(3000, () => {
  console.log("Running on the port 3000")
})
