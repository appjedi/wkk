const express = require('express');
const debug = require('debug')('app:videosRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating videos router')
  const videosRoute = express.Router();
  const { getIndexTodo } = homeController(appInfo);

  debug('Creating videos Route for /')
  videosRoute.route('/')
    .get(getIndexTodo);

  return videosRoute;
}

module.exports = router;
