const express = require('express');
const debug = require('debug')('app:eventsRouter');
const eventsController = require('../controllers/events');

function router(appInfo) {
  debug('Creating events router')
  const eventsRoute = express.Router();
  const { getIndex, getBBIndex } = eventsController(appInfo);

  debug('Creating events router for /')
  eventsRoute.route('/')
    .get(getIndex);
  eventsRoute.route('/bbview')
    .get(getBBIndex);


  return eventsRoute;
}

module.exports = router;
