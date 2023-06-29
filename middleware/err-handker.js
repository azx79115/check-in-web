module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      req.flash("error_messages");
    }
  },
};
