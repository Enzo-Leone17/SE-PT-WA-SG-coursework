//dependencies
const jwt = require("jsonwebtoken");
//blacklist check
//const { isTokenBlacklisted } = require("./cacheService.js");

module.exports = async function (req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ error: "Access denied. No token provided." });
  // }
  // const isBlacklisted = await isTokenBlacklisted(token);
  // if (isBlacklisted) {
  //   return res.status(401).json({ error: "Access denied. Token is blacklisted." });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(403).json({ error: "Invalid or expired token." });
  // }
  next(); //force bypass check
};
