//initialize the dependencies and express server
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//initialize app and port
const app = express();
const port = 8000;

//define routes
import itemRouter from "./routes/itemRouter.js";
import accountRouter from "./routes/accountRouter.js";

//middleware: bridging
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + "/./assets")));

//routes
app.use("/api/items", itemRouter);
app.use("/api/accounts", accountRouter);

//open index html for main page >> localhost:8000
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/./assets/pages/index.html"));
});


//open on port
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`)
})


