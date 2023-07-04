const express = require("express");
const router = express.Router();
const homeController = require("../../controller/home-controller");

router.post("/checkin", homeController.checkIn);
router.get("/", homeController.renderHome);

module.exports = router;
