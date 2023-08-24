const express = require('express');
const debug = require('debug')('app:termsRouter');
const terms = require('../controllers/terms');

function router(appInfo) {
  debug('Creating terminology router')
  const termsRoute = express.Router();
  const { getIndex } = terms(appInfo);

  debug('Creating terminology router for /')
  termsRoute.route('/')
    .get(getIndex);

  return termsRoute;
}

module.exports = router;
