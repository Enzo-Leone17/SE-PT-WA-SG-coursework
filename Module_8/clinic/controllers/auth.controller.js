const UserService = require("../services/user.service");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await UserService.login(email, password);
      res.json(data);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const data = await UserService.refresh(refreshToken);
      res.json(data);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  async logout(req, res) {
    try {
      const { accessToken, refreshToken} = req.body;
      await UserService.logout(accessToken, refreshToken);
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
