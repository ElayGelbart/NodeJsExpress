function errorHandler(err, req, res, next) {
  if (err.status) {
    console.log('in error')
    res.status(err.status);
    res.send();
  }
  else {
    res.status(500);
    res.send()
  }
}

module.exports = errorHandler;