const UserService = require("../services/user.service");

module.exports = {
  async login(req, res) {
    try {
      const email = req.body?.email ? req.body.email : null;
      const password = req.body?.password ? req.body.password : null;
      const data = await UserService.login(email, password);
      res.json(data);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body?.refreshToken ? req.body.refreshToken : null;
      const data = await UserService.refresh(refreshToken);
      res.json(data);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  async logout(req, res) {
    try {
      const accessToken = req.body?.accessToken ? req.body.accessToken : null;
      const refreshToken = req.body?.refreshToken ? req.body.refreshToken : null;
      await UserService.logout(accessToken, refreshToken);
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      const user_id = req.params?.user_id ? req.params.user_id : null;
      const oldPassword = req.body?.oldPassword ? req.body.oldPassword : null;
      const newPassword = req.body?.newPassword ? req.body.newPassword : null;
      const data = await UserService.changePassword(user_id, oldPassword, newPassword);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
