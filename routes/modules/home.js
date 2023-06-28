const express = require("express");
const router = express.Router();
const homeController = require("../../controller/home-controller");

router.post("/checkin", homeController.checkIn);
router.post("/checkout", homeController.checkOut);
router.get("/", homeController.renderHome);

module.exports = router;
