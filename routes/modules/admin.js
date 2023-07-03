const express = require("express");
const router = express.Router();
const adminController = require("../../controller/admin-controller");

router.get("/", adminController.adminPage);

module.exports = router;
