const express = require("express");
const router = express.Router();
const record = require("./modules/record");
const admin = require("./modules/admin");

router.use("/record", record);
router.use("/admin", admin);
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
