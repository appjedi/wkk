const express = require('express');
const debug = require('debug')('app:instructorsRouter');
const instructorsController = require('../controllers/instructors');

function router(appInfo) {
  debug('Creating instructors router')
  const instructorsRoute = express.Router();
  const { getIndex } = instructorsController(appInfo);

  debug('Creating instructors router for /')
  instructorsRoute.route('/')
    .get(getIndex);

  return instructorsRoute;
}

module.exports = router;
