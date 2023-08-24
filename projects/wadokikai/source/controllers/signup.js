const debug = require('debug')('app:termsController');
const moment = require('moment');

function termsController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNav();
    // const signupURL = '/signup';
    const data = await dbctrlr.getSignUpData();

    res.render('signup',
      {
        nav: nav,
        title: appInfo.title,
        data,
      });
    }
    return { getIndex };
  }

module.exports = termsController;
