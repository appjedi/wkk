const express = require('express');
const debug = require('debug')('app:homeRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating home router')
  const homeRoute = express.Router();
  const { getIndex, getErrIndex } = homeController(appInfo);

  debug('Creating home router for /')
  homeRoute.route('/')
    .get(getIndex);

  debug('Creating home router for /err')
  homeRoute.route('/err')
    .get(getErrIndex);

  return homeRoute;
}

module.exports = router;
