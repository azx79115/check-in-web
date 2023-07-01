const { User, Record } = require("../models");
const moment = require("moment");

const homeController = {
  // 渲染首頁畫面
  renderHome: (req, res, next) => {
    const nowTime = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();
    res.render("home", { nowTime, today });
  },
  checkIn: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      const now = new Date();
      const nowTime = now.toLocaleTimeString();
      let today;
      //檢查當前時間是否小於5點，小於5點以前一日計算
      if (now.getHours() < 5) {
        now.setDate(now.getDate() - 1);
        today = now.toLocaleDateString();
      } else {
        today = now.toLocaleDateString();
      }
      const record = await Record.findOne({ where: { UserId, date: today } });
      //新增紀錄
      const newRecord = await Record.create({
        UserId,
        date: today,
        checkIn: now,
      });

      //檢查今日是否已經打過卡，有的話代表下班了!
      if (record) {
        req.flash("success_msg", "下班了辛苦囉!");
        return res.redirect("/");
      }
      req.flash("success_msg", "打卡成功");
      return res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = homeController;
