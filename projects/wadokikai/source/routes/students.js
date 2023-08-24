const express = require('express');
const debug = require('debug')('app:studentsRouter');
const studentsController = require('../controllers/students');

function router(appInfo) {
  debug('Creating students router')
  const studentsRoute = express.Router();
  const { getIndex } = studentsController(appInfo);

  debug('Creating students router for /')
  studentsRoute.route('/')
    .get(getIndex);

  return studentsRoute;
}

module.exports = router;
