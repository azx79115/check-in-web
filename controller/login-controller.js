const { User } = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const loginController = {
  signInPage: (req, res) => {
    res.render("signin");
  },
  signUpPage: (req, res) => {
    res.render("signup");
  },
  signIn: (req, res) => {
    req.flash("success_msg", "登入成功!");
    res.redirect("/");
  },
  signUp: async (req, res, next) => {
    try {
      const { name, account, password, passwordCheck } = req.body;
      if (!name || !account || !password || !passwordCheck) {
        throw new Error("所有欄位都是必填的");
      }
      if (password !== passwordCheck) {
        throw new Error("密碼與確認密碼不符");
      }
      const existingAccount = await User.findOne({ where: { account } });
      if (existingAccount) {
        throw new Error("這個帳號已經註冊過了!");
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, account, password: hash });
      req.flash("success_msg", "註冊成功");
      res.redirect("/login/signin");
    } catch (err) {
      next(err);
    }
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.flash("success_msg", "登出成功");
      res.redirect("/login/signin");
    });
  },
};

module.exports = loginController;
