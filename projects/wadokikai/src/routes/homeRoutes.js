const express = require('express');

const homeController = require('../controllers/homeController');

const homeRoute = express.Router();

function router(appInfo) {
	const { getIndex } = homeController(appInfo);
	
	homeRoute.route('/')
		.get(getIndex);

	return homeRoute;
}

module.exports = router;

