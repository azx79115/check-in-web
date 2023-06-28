const { User, Record } = require("../models");

const homeController = {
  // 渲染首頁畫面
  renderHome: (req, res) => {
    const today = new Date().toLocaleTimeString();
    res.render("home", { today });
  },
  checkIn: (req, res) => {
    res.send("打卡成功");
  },
  checkOut: (req, res) => {
    res.send("打卡成功");
  },
};

module.exports = homeController;
