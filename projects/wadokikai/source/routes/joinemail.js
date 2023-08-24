const express = require('express');
const debug = require('debug')('app:joinemailRouter');
const joinemailRouterController = require('../controllers/joinemail');

function router(appInfo) {
  debug('Creating sendemail router')
  const joinemailRoute = express.Router();
  const { getIndex, postJoinEmail } = joinemailRouterController(appInfo);

  debug('Creating sendemail router for /')
  joinemailRoute.route('/')
    .get(getIndex)
    .post(postJoinEmail);

  return joinemailRoute;
}

module.exports = router;
