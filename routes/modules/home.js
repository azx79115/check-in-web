const express = require("express");
const router = express.Router();
const moment = require("moment");

router.get("/", (req, res) => {
  const today = moment().format("YYYY/MM/DD HH:mm:ss");
  res.render("home", { today });
});

module.exports = router;
