const debug = require('debug')('app:overviewController');
const moment = require('moment');

function overviewController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNav();
    // const signupURL = '/signup';
    const karateOverview = await dbctrlr.getOverviewData();

    debug(karateOverview);

    const main = karateOverview.main;
    debug(main);
    const section1 = karateOverview.section1;
    const section2 = karateOverview.section2;
    const section3 = karateOverview.section3;
    const section4 = karateOverview.section4;
    const section5 = karateOverview.section5;


    res.render('overview',
      {
        nav: nav,
        title: appInfo.title,
        main,
        section1,
        section2,
        section3,
        section4,
        section5,
      });
    }
    return { getIndex };
  }

module.exports = overviewController;
