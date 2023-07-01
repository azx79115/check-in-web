const { User, Record, State } = require("../models");

const recordController = {
  // 渲染首頁畫面
  recordPage: async (req, res, next) => {
    const record = await Record.findAll({
      nest: true,
      raw: true,
      include: [{ model: User }, { model: State }],
      order: [["createdAt", "DESC"]],
    });
    console.log("record", record);

    res.render("record");
  },
};

module.exports = recordController;
