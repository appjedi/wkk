const debug = require('debug')('app:homeController');

function  homeController(appInfo) {

	function getIndex(req, res) {
		debug('Get Index called');
		res.render('index');
	}
   return { getIndex };
}

module.exports = homeController;


