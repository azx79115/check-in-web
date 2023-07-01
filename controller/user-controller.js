const { User, Record } = require("../models");
const bcrypt = require("bcryptjs");

const userController = {
  settingsPage: async (req, res, next) => {
    res.render("settings");
  },
  patchUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, password, passwordCheck } = req.body;
      if (!name || !password || !passwordCheck)
        throw new Error("所有欄位都要填寫");
      if (password !== passwordCheck) throw new Error("密碼與確認密碼需一致");
      const user = await User.findByPk(userId);
      const hash = await bcrypt.hash(password, 10);
      if (!user) {
        throw new Error("此用戶不存在");
      } else {
        await user.update({
          name,
          password: hash,
        });
        req.flash("success_msg", "修改成功");
        return res.redirect("/");
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
