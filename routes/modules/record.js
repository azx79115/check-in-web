const express = require("express");
const router = express.Router();
const recordController = require("../../controller/record-controller");

router.get("/", recordController.recordPage);

module.exports = router;
