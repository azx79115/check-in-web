const { User, Record, State } = require("../models");
const moment = require("moment");

const homeController = {
  // 渲染首頁畫面
  renderHome: (req, res, next) => {
    const nowTime = moment().format("HH:mm:ss");
    const today = moment().format("YYYY-MM-DD");
    res.render("home", { nowTime, today });
  },
  checkIn: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      //存入時間
      const nowTime = moment().format("HH:mm:ss");
      //檢查當前時間是否小於5點，小於5點以前一日計算
      const targetTime = moment().hours(5).minutes(0).seconds(0);
      let today;
      if (moment(nowTime, "HH:mm:ss").isBefore(targetTime)) {
        today = moment().subtract(1, "days").format("YYYY-MM-DD");
      } else {
        today = moment().format("YYYY-MM-DD");
      }
      //獲取該用戶今天的所有records
      const records = await Record.findAll({
        where: { UserId, date: today },
        raw: true,
      });

      //獲取該用戶在今天的state資料
      const state = await State.findOne({ where: { UserId, date: today } });
      // 設定條件如果還未有狀態，新建立一個，如果已經存在，則更新資料，並設置條件式判斷時間是否大於8小時來調整出缺勤狀態!
      if (!state) {
        await State.create({
          UserId,
          date: today,
          state: "值勤中",
        });
      } else {
        const firstTime = records[0].createdAt;

        const lastTime = records[records.length - 1].createdAt;

        const diffHours = moment(lastTime).diff(firstTime, "hours");

        const diffTime = moment
          .utc(moment(lastTime, "HH:mm:ss").diff(moment(firstTime, "HH:mm:ss")))
          .format("HH:mm:ss");

        if (diffHours >= 8) {
          await state.update({ state: "出勤", durations: diffTime });
        } else {
          await state.update({ state: "缺勤", durations: diffTime });
        }
      }
      //新增紀錄
      const newRecord = await Record.create({
        UserId,
        date: today,
        checkIn: nowTime,
      });
      //檢查今日是否已經打過卡，有的話代表下班了!
      if (records.length > 0) {
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
