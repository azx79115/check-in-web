const express = require("express");
const router = express.Router();
const record = require("./modules/record");
const admin = require("./modules/admin");
const home = require("./modules/home");
const user = require("./modules/user");
const login = require("./modules/login");
const { authenticator } = require("../middleware/auth");
const { generalErrorHandler } = require("../middleware/err-handler");

//紀錄
router.use("/record", authenticator, record);
//後台
router.use("/admin", authenticator, admin);
//使用者
router.use("/users", authenticator, user);
//登入
router.use("/login", login);
//首頁
router.use("/", authenticator, home);
router.use("/", generalErrorHandler);

module.exports = router;
