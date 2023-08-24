const express = require('express');
const debug = require('debug')('app:photosRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating photos router')
  const photosRoute = express.Router();
  const { getIndexTodo } = homeController(appInfo);

  debug('Creating photos Route for /')
  photosRoute.route('/')
    .get(getIndexTodo);

  return photosRoute;
}

module.exports = router;
