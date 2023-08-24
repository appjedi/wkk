const express = require('express');
const debug = require('debug')('app:registrationRouter');
const registrationController = require('../controllers/registration');

function router(appInfo) {
  debug('Creating registration router')
  const registrationRoute = express.Router(); 
  const { getIndex, postRegistration } = registrationController(appInfo);

  debug('Creating contact router for /registration')
  registrationRoute.route('/')
    .get(getIndex)
    .post(postRegistration);


  return registrationRoute;
}

module.exports = router;
