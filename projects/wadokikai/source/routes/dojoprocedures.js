const express = require('express');
const debug = require('debug')('app:dojoproceduresRouter');
const dojoProceduresController = require('../controllers/dojoProceduresController');

function router(appInfo) {
  debug('Creating dojoprocedures router')
  const dojoproceduresRoute = express.Router();
  const { getIndex } = dojoProceduresController(appInfo);

  debug('Creating dojoprocedures route for /dojoprocedures')
  dojoproceduresRoute.route('/')
    .get(getIndex);

  return dojoproceduresRoute;
}

module.exports = router;
