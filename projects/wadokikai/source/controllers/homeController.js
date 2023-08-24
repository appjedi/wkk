const debug = require('debug')('app:homeController');
const moment = require('moment');

function homeController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const navNuHome = await dbctrlr.getNavHome();
    const zoomInfo = await dbctrlr.getZoomInfo();
    const wadokikaihomepage = await dbctrlr.getWadoKiKaiData();
    const schools = await dbctrlr.getSchoolsData();
    const signupURL = '/signup';
    var passedVariablemsg = ''; 
    if (req.query.msg) passedVariablemsg = req.query.msg;
    var passedVariableerr = ''; 
    if (req.query.err) passedVariableerr = req.query.err;

    // see what we get in the req object
    debug(req.ip);

    // fill in the <DT> 
    // Get the current date
    // const now = new Date();
    // debug(`process zoom date ${JSON.stringify(zoomInfo)}`);
    // Replace DB data token with real date data.
    // const zoomText = zoomInfo[now.getDay()].text.replace('<DT>', now);

    // wadokikaihomepage.zoomText = zoomText;
    // replace Zoom link with data from the zoom db. 
    // wadokikaihomepage.zoomlink = zoomInfo[now.getDay()].link;

    const imageArray = ['images/dragon-trans.png', 'images/tiger.bmp', 'images/wadokikai kanji.jpg' ]
    let currentdate = Date.now();
    let futuredate = new Date();
    futuredate.setFullYear(2300, 1, 1);
    
    res.render('index',
      {
        navNuMain: navNuMain,
        navNuHome: navNuHome,
        title: appInfo.title,
        wadokikaihomepage,
        schools,
        imageArray,
        activePage: '/',
        msg: passedVariablemsg,
        err: passedVariableerr,
        subject: '',
        currentdate,
        futuredate,
        moment: moment
      });
  }

  async function getErrIndex(req, res) {
    debug('getErrIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNavMain();
    res.render('error',
      {
        navNuMain: navNuMain,
        navNuHome: navNuHome,
        title: appInfo.title,
        errorMsg: 'Unknown Error.',
      });
  }

  async function getIndexTodo(req, res) {
    debug('getIndexTodo Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const nav = await dbctrlr.getNavMain();

    res.render('error',
      {
        navNuMain: navNuMain,
        navNuHome: navNuHome,
        title: appInfo.title,
        errorMsg: 'TODO',
      });
  }

  return { getIndex, getErrIndex, getIndexTodo};
}

module.exports = homeController;
