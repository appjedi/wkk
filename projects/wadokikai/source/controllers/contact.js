const debug = require('debug')('app:contactController');

function contactController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const schools = await dbctrlr.getSchoolsData();

    var passedVariableSubject = ''; 
    if (req.query.s) passedVariableSubject = req.query.s;
    var passedVariableSchool = '0'; 
    if (req.query.ss) passedVariableSchool = req.query.ss;
    var passedVariablemsg = ''; 
    if (req.query.msg) passedVariablemsg = req.query.msg;
    var passedVariableerr = ''; 
    if (req.query.err) passedVariableerr = req.query.err;

    var subject = '';
    // set the default Subject
    switch (passedVariableSubject)  {
      case '1':
        subject = 'What is the price of your class';
        break;
      case '2': 
        subject = 'I would like to sign up for classes';
      break;
      default:
        subject = 'I would like to learn more about Wado Ki Kai Karate';
    } 

    res.render('contact',
      {
        navNuMain: navNuMain,
        title: appInfo.title,
        activePage: '/contact',
        schools,
        subject,
        selectschool: passedVariableSchool,
        msg: passedVariablemsg,
        err: passedVariableerr,
      });
  }

  return { getIndex };
}

module.exports = contactController;
