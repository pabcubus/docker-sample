const express = require('express');
const router = express.Router();
const DbDao = require('../DAO/dbDao');

function createApiClient(endpointName) {
  const dbDao = new DbDao();

  dbDao.connectDB();

  router.use(function timeLog(req, res, next) {
    next();
  });

  router.get('/', function(req, res) {
    dbDao.get(endpointName)
      .then(items => {
        res.status(200).json(items)
      })
  });

  router.post('/', function(req, res) {
    dbDao.post(endpointName, req.body)
      .then(item => {
        res.status(200).json(item)
      })
  });

  return { router }
}

module.exports = createApiClient