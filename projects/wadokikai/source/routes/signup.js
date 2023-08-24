const express = require('express');
const debug = require('debug')('app:signupRouter');
const signupController = require('../controllers/signup');

function router(appInfo) {
  debug('Creating signup router')
  const signupRoute = express.Router();
  const { getIndex } = signupController(appInfo);

  debug('Creating signup Route for /')
  signupRoute.route('/')
    .get(getIndex);

  return signupRoute;
}

module.exports = router;
