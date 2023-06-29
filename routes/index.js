const express = require("express");
const router = express.Router();
const record = require("./modules/record");
const admin = require("./modules/admin");
const home = require("./modules/home");
const user = require("./modules/user");
const login = require("./modules/login");

//紀錄
router.use("/record", record);
//後台
router.use("/admin", admin);
//登入
router.use("/login", login);
//首頁
router.use("/", home);

module.exports = router;
