const express = require('express');
const debug = require('debug')('app:libraryRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating library router')
  const libraryRoute = express.Router();
  const { getIndexTodo } = homeController(appInfo);

  debug('Creating library Route for /')
  libraryRoute.route('/')
    .get(getIndexTodo);

  return libraryRoute;
}

module.exports = router;
