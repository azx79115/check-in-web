const { User, Record, State } = require("../models");

const recordController = {
  // 渲染record畫面
  recordPage: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      const records = await Record.findAll({
        where: { UserId },
        nest: true,
        raw: true,
        include: [
          { model: User, attributes: ["id", "name"] },
          { model: State, attributes: ["id", "durations", "state"] },
        ],
        attributes: ["id", "date", "checkIn"],
        order: [["createdAt", "DESC"]],
      });

      res.render("record", { records });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = recordController;
