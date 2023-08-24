const express = require('express');
const debug = require('debug')('app:wadokikaiRouter');
const wadokikaiStyleController = require('../controllers/wadokikaiStyle');

function router(appInfo) {
  debug('Creating wadokikai router')
  const wadokikaiRoute = express.Router();
  const { getIndex } = wadokikaiStyleController(appInfo);

  debug('Creating wadokikai Route for /wadokikai')
  wadokikaiRoute.route('/')
    .get(getIndex);

  return wadokikaiRoute;
}

module.exports = router;
