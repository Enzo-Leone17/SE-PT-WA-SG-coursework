const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./config/dbConnect");
// parse requests of content-type - application/json
app.use(express.json());
app.get("/", (req, res) => {
res.json({ message: "Welcome to my MongoDB application." });
});

//routing
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port
${PORT}.`);
});