const { User, Record, State } = require("../models");
const moment = require("moment");

const adminController = {
  // 渲染record畫面
  adminPage: async (req, res, next) => {
    const UserId = req.user.id;
    const today = moment().format("YYYY-MM-DD");
    const lack = await Record.findAll({
      where: { state: "缺勤", date: today },
      nest: true,
      raw: true,
      include: [{ model: User, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });
    console.log("🚀 ~ records:", lack);

    res.render("admin", { records });
  },
};

module.exports = adminController;
