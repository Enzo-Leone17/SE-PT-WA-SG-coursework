// services/UserService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../models");
//const redis = require("../config/redis");



const SECRET_KEY = process.env.SECRET_KEY;

const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "3h" });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "3h" });

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, is_deleted: false } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);


  await RefreshToken.create({
    token: refreshToken,
    user_id: user.id,
    expires_at: new Date(Date.now() +  3 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token provided");

  const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!stored) throw new Error("Refresh token not found or expired");

  const decoded = jwt.verify(refreshToken, SECRET_KEY);
  const user = await User.findByPk(decoded.id);

  return { accessToken: generateAccessToken(user) };
};

const logout = async (accessToken, refreshToken) => {
  // const blacklistAccessToken = `blacklist:${accessToken}`; // blacklist tokens
  // const blacklistRefreshToken = `blacklist:${refreshToken}`; // blacklist tokens
  // await redis.setEx(blacklistAccessToken, 180, "true");
  // await redis.setEx(blacklistRefreshToken, 180, "true");
  await RefreshToken.destroy({ where: { token: refreshToken } });
};

const changeUserDetails = async (userId, accessToken, refreshToken, username, email) => {
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
  await User.update({ username, email }, { where: { id: userId } });
  } catch (error) {
    
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) throw new Error("Invalid old password");
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { id: userId } });
};

module.exports = {
  login,
  refresh,
  logout,
  changePassword,
};
