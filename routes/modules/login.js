const express = require("express");
const router = express.Router();
const loginController = require("../../controller/login-controller");
const passport = require("../../config/passport");

router.get("/signin", loginController.signInPage);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/login/signin",
    failureFlash: true,
  }),
  loginController.signIn
);
router.get("/signup", loginController.signUpPage);
router.post("/signup", loginController.signUp);
router.get("/logout", loginController.logout);

module.exports = router;
