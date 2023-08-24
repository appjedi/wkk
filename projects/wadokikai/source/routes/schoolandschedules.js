const express = require('express');
const debug = require('debug')('app:schoolandschedulesRouter');
const homeController = require('../controllers/homeController');

function router(appInfo) {
  debug('Creating schoolandschedules router')
  const schoolandschedulesRoute = express.Router();
  const { getIndexTodo } = homeController(appInfo);

  debug('Creating schoolandschedules Route for /')
  schoolandschedulesRoute.route('/')
    .get(getIndexTodo);

  return schoolandschedulesRoute;
}

module.exports = router;
