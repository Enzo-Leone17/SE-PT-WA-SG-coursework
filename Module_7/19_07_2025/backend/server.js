const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Secret key
const SECRET = "Testing123";

// Mock User Data
const user = { username: "admin", password: "123456", name: "Admin User" };

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "10000" });
    const refreshToken = jwt.sign({ username }, SECRET, { expiresIn: "1d" });
    res.json({ token, refreshToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Refresh token route
app.post("/api/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  jwt.verify(refreshToken, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const token = jwt.sign({ username: decoded.username }, SECRET, { expiresIn: "1h" });
    res.json({ token, refreshToken });
  });
});

// Protected route
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ username: decoded.username, name: user.name });
  });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
