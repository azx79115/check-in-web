const { User } = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const loginController = {
  // 登入畫面
  signInPage: (req, res) => {
    res.render("signin");
  },
  signUpPage: (req, res) => {
    res.render("signup");
  },
  signIn: (req, res) => {
    req.flash("success_messages", "登入成功!");
    console.log("成功");
    res.redirect("/");
  },
  signUp: async (req, res, next) => {
    try {
      const { name, account, password, passwordCheck } = req.body;
      if (password !== passwordCheck)
        throw new Error("Passwords do not match!");
      const existingAccount = await User.findOne({ where: { account } });
      if (existingAccount) throw new Error("Account already exists");
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, account, password: hash });
      req.flash("success_messages", "註冊成功");
      res.redirect("/login/signin");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = loginController;
