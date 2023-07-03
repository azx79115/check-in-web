const { User, Record, State } = require("../models");

const recordController = {
  // 渲染record畫面
  recordPage: async (req, res, next) => {
    const UserId = req.user.id;
    const records = await Record.findAll({
      where: { UserId },
      nest: true,
      raw: true,
      include: [{ model: User, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });

    res.render("record", { records });
  },
};

module.exports = recordController;
