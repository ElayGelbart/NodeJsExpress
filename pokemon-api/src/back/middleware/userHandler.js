function userHandler(req, res, next) {
  if (!req.headers.username) {
    next({ status: 401 })
  }
  else {
    next();
  }
}

module.exports = userHandler;