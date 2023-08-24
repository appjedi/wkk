const debug = require('debug')('app:DojoProceduresController');
const moment = require('moment');

function dojoProceduresController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNavMain();
    // const signupURL = '/signup';
    const dojoProcedures = await dbctrlr.getDojoProceduresData();

    debug(dojoProcedures);

    const main = dojoProcedures.main;
    debug(main);
    const section1 = dojoProcedures.section1;
    const section2 = dojoProcedures.section2;

    res.render('overview',
      {
        nav: nav,
        title: appInfo.title,
        main,
        section1,
        section2,
        section3: null,
        section4: null,
        section5: null,
      });
    }
    return { getIndex };
  }

module.exports = dojoProceduresController;
