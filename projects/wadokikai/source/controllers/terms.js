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
    const Block = await dbctrlr.getTermsData("Block");
    const Body = await dbctrlr.getTermsData("Body");
    const General = await dbctrlr.getTermsData("General");
    const Kata = await dbctrlr.getTermsData("Kata");
    const Kick = await dbctrlr.getTermsData("Kick");
    const Kumite = await dbctrlr.getTermsData("Kumite");
    const Numbers = await dbctrlr.getTermsData("Number");
    const Procedures = await dbctrlr.getTermsData("Procedures");
    const Punch = await dbctrlr.getTermsData("Punch");
    const Stance = await dbctrlr.getTermsData("Stance");
    const Strike = await dbctrlr.getTermsData("Strike");
    const Weapon = await dbctrlr.getTermsData("Weapon");
    const Info = await dbctrlr.getTermsData("Info");
  
    debug(Info);
    res.render('terms',
      {
        nav: nav,
        title: appInfo.title,
        Procedures,
        Block,
        Strike,
        Punch,
        Stance,
        Kick,
        Body,
        Numbers,
        Weapon,
        Kata,
        General,
        Kumite,
        Info,
      });
    }
    return { getIndex };
  }

module.exports = termsController;
