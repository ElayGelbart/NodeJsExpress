const express = require('express');
const router = express.Router();

router.use(express.json()) // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })) // for parsing routerlication/x-www-form-urlencoded


router.post('/', (req, res, next) => {
  try { res.send({ username: req.headers.username }) }
  catch (err) {
    next(401)
  }
});

module.exports = router;