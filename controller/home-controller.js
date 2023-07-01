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

      //確認今天是否已經打卡
      const isRecord = await Record.findOne({ where: { UserId, date: today } });
      if (!isRecord) {
        //新增紀錄
        await Record.create({
          UserId,
          date: today,
          checkIn: nowTime,
          state: "值勤中",
        });
      } else {
        //獲取該用戶今天的所有records
        const records = await Record.findAll({
          where: { UserId, date: today },
          raw: true,
        });
        const firstTime = records[0].createdAt;

        const lastTime = moment();

        const diffHours = moment(lastTime).diff(firstTime, "hours");

        const diffTime = moment
          .utc(moment(lastTime, "HH:mm:ss").diff(moment(firstTime, "HH:mm:ss")))
          .format("HH:mm:ss");
        // 設置條件式判斷時間是否大於8小時來調整出缺勤狀態!
        if (diffHours >= 8) {
          await await Record.create({
            UserId,
            date: today,
            checkIn: nowTime,
            state: "出勤",
            durations: diffTime,
          });
        } else {
          await Record.create({
            UserId,
            date: today,
            checkIn: nowTime,
            state: "缺勤",
            durations: diffTime,
          });
        }
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
