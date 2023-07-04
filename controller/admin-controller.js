const { User, Record, State } = require("../models");
const moment = require("moment");

const adminController = {
  // 渲染record畫面
  adminPage: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      const today = moment().format("YYYY-MM-DD");
      const attendance = await State.findAll({
        nest: true,
        raw: true,
        include: [{ model: User, attributes: ["id", "name", "account"] }],
        order: [["createdAt", "DESC"]],
      });

      res.render("admin", { attendance });
    } catch (err) {
      next(err);
    }
  },
  changeState: async (req, res, next) => {
    try {
      const StateId = req.params.id;
      const state = await State.findByPk(StateId);
      await state.update({
        state: "出勤",
      });
      req.flash("success_msg", "更改成功");
      res.redirect("/admin");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
