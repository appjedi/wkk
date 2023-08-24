const express = require('express');
const debug = require('debug')('app:zoomclassRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating zoomclass router')
  const wadokikaiRoute = express.Router();
  const { getIndexTodo } = homeController(appInfo);

  debug('Creating zoomclass Route for /zoomclass/...')
  wadokikaiRoute.route('/')
    .get(getIndexTodo);

  return wadokikaiRoute;
}

module.exports = router;
