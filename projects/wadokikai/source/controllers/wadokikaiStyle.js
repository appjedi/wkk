const debug = require('debug')('app:wadokikaiStyleCtrlr');
const moment = require('moment');

function wadokikaiStyleController (appInfo){
  
  async function getIndex(req, res) {
    debug('getIndex Called');
    debug(`appinfo: ${JSON.stringify(appInfo)}`);
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNav();
    // const signupURL = '/signup';
    const data = await dbctrlr.getWadoKiKaiStyleData();

    debug(data);

    const main = data.main;
    debug(main);
    const section1 = data.section1;
    const section2 = data.section2;
    const section3 = data.section3;
    const section4 = data.section4;
    const section5 = data.section5;
    const section1Img = data.section1.paras[1].paraImg;
    const section5Img = data.section5.paras[1].paraImg;

    res.render('wkkstyle',
      {
        nav: nav,
        title: appInfo.title,
        main,
        section1,
        section1Img,
        section2,
        section3,
        section4,
        section5,
        section5Img,
      });
    }
    return { getIndex };
  }

module.exports = wadokikaiStyleController;
