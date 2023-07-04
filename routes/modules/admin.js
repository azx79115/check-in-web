const express = require("express");
const router = express.Router();
const adminController = require("../../controller/admin-controller");

router.get("/", adminController.adminPage);
router.patch("/states/:id", adminController.changeState);

module.exports = router;
