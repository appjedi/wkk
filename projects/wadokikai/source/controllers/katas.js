const debug = require('debug')('app:katasCtrlr');
const moment = require('moment');

function katasController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNav();
    // const signupURL = '/signup';
    const data = await dbctrlr.getKatasData();

    debug(data);

    res.render('katas',
      {
        nav: nav,
        title: appInfo.title,
        data
      });
    }
    return { getIndex };
  }

module.exports = katasController;
