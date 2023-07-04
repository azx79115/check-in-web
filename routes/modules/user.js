const express = require("express");
const router = express.Router();
const userController = require("../../controller/user-controller");

router.get("/settings", userController.settingsPage);
router.patch("/settings", userController.patchUser);

module.exports = router;
