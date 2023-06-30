module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      req.flash("error_msg", `${err.message}`);
    } else {
      req.flash("error_msg", `${err}`);
    }
    res.redirect("back");
    next(err);
  },
};
