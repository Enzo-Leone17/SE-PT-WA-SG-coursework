const express = require("express");
const app = express();

require("dotenv").config();
let db = require("./models/index");

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MySQLDB application." });
});

let userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// let postRoutes = require('./routes/postRoutes')
// app.use('/api/posts', postRoutes)

// let commentRoutes = require('./routes/commentRoutes')
// app.use('/api/comments', commentRoutes)

// let likeRoutes = require('./routes/likeRoutes')
// app.use('/api/likes', likeRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Connect to DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log(`Database ${process.env.DB_NAME} connection has been established successfully.`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});