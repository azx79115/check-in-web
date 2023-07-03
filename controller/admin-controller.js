const { User, Record, State } = require("../models");
const moment = require("moment");

const adminController = {
  // 渲染record畫面
  adminPage: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      const today = moment().format("YYYY-MM-DD");
      const absent = await State.findAll({
        where: { state: "缺勤", date: today },
        nest: true,
        raw: true,
        include: [{ model: User, attributes: ["id", "name", "account"] }],
        order: [["createdAt", "DESC"]],
      });
      const attendance = await State.findAll({
        where: { state: "出勤", date: today },
        nest: true,
        raw: true,
        include: [{ model: User, attributes: ["id", "name", "account"] }],
        order: [["createdAt", "DESC"]],
      });
      const Attending = await State.findAll({
        where: { state: "值勤中", date: today },
        nest: true,
        raw: true,
        include: [{ model: User, attributes: ["id", "name", "account"] }],
        order: [["createdAt", "DESC"]],
      });

      res.render("admin", { states: { absent, attendance, Attending } });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
