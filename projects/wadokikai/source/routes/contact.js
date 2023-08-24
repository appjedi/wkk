const express = require('express');
const debug = require('debug')('app:contactRouter');
const contactController = require('../controllers/contact');

function router(appInfo) {
  debug('Creating contact router')
  const contactRoute = express.Router(); 
  const { getIndex } = contactController(appInfo);

  debug('Creating contact router for /contact')
  contactRoute.route('/')
    .get(getIndex);


  return contactRoute;
}

module.exports = router;
