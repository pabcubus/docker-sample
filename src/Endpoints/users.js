const express = require('express');
const router = express.Router();

const DbDao = require('../DAO/dbDao');
const dbDao = new DbDao();

dbDao.connectDB();

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  dbDao.get('users')
    .then(items => {
      res.json(items)
    })
});

module.exports = router;