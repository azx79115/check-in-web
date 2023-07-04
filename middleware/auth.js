module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請先登入才能使用！");
    res.redirect("/login/signin");
  },
  authenticatedAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin === "admin") return next();
      res.redirect("/");
    } else {
      res.redirect("login/signin");
    }
  },
};
