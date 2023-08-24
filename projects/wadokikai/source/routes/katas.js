const express = require('express');
const debug = require('debug')('app:katasRouter');
const katasController = require('../controllers/katas');

function router(appInfo) {
  debug('Creating katas router')
  const katasRoute = express.Router();
  const { getIndex } = katasController(appInfo);

  debug('Creating katas router for /katas')
  katasRoute.route('/')
    .get(getIndex);


  return katasRoute;
}

module.exports = router;
