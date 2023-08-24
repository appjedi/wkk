const express = require('express');
const debug = require('debug')('app:shinkokataRouter');
const shinkoKatasController = require('../controllers/shinkokatas');

function router(appInfo) {
  debug('Creating shinkokata router')
  const shinkokataRoute = express.Router();
  const {getIndex } = shinkoKatasController(appInfo);

  debug('Creating shinkokata router for /')
  shinkokataRoute.route('/')
    .get(getIndex);

  return shinkokataRoute;
}

module.exports = router;
