const { User, Record, State } = require("../models");
const moment = require("moment");
const holidays = require("../2023.json");

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
        today = moment().subtract(1, "days").format("YYYYMMDD");
      } else {
        today = moment().format("YYYYMMDD");
        console.log("🚀 ~ today:", today);
      }

      const isHoliday = holidays.some(
        (item) => item.isHoliday === true && item.date === today.toString()
      );
      console.log("🚀 ~ isHoliday:", isHoliday);
      if (isHoliday) {
        req.flash("warning_msg", "今天放假不用打卡!");
        return res.redirect("/");
      }
      //獲取該用戶在今天的state資料
      let state = await State.findOne({ where: { UserId, date: today } });
      if (!state) {
        state = await State.create({
          UserId,
          date: today,
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
          await state.update({
            state: "出勤",
            durations: diffTime,
          });
        } else {
          await state.update({
            state: "缺勤",
            durations: diffTime,
          });
        }
      }
      await Record.create({
        UserId,
        StateId: state.id,
        date: today,
        checkIn: nowTime,
      });
      req.flash("success_msg", "打卡成功");
      return res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = homeController;
