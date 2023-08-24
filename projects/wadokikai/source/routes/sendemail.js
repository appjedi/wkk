const express = require('express');
const debug = require('debug')('app:sendemailRouter');
const sendemailController = require('../controllers/sendemail');

function router(appInfo) {
  debug('Creating sendemail router')
  const sendemailRoute = express.Router();
  const { getIndex, postSendEmail } = sendemailController(appInfo);

  debug('Creating sendemail router for /')
  sendemailRoute.route('/')
    .get(getIndex)
    .post(postSendEmail);

  return sendemailRoute;
}

module.exports = router;
