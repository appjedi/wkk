const express = require('express');
const debug = require('debug')('app:overviewRouter');
const overviewController = require('../controllers/overviewController');

function router(appInfo) {
  debug('Creating overview router')
  const overviewRoute = express.Router();
  const { getIndex } = overviewController(appInfo);

  debug('Creating overview Route for /')
  overviewRoute.route('/')
    .get(getIndex);

  return overviewRoute;
}

module.exports = router;
