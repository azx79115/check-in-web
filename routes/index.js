const express = require("express");
const router = express.Router();
const record = require("./modules/record");
const admin = require("./modules/admin");
const home = require("./modules/home");

router.use("/record", record);
router.use("/admin", admin);
router.use("/", home);

module.exports = router;
