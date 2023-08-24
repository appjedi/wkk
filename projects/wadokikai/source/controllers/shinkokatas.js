const debug = require('debug')('app:shinkoKatasCtrlr');
const moment = require('moment');

function shinkoKatasController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNav();
    // const signupURL = '/signup';
    const data = await dbctrlr.getShinkoKatasData();

    debug(data);

    res.render('shinkokatas',
      {
        nav: nav,
        title: appInfo.title,
        data
      });
    }
    return { getIndex };
  }

module.exports = shinkoKatasController;
