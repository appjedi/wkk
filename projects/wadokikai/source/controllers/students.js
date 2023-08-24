const debug = require('debug')('app:studentsController');

function studentsController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const navNuStudents = await dbctrlr.getNavStudents();
    const data = await dbctrlr.getStudentPageData();
    const dataShinko = await dbctrlr.getShinkoKatasData();
    const dataKata = await dbctrlr.getKatasData();
    const dataBooks = await dbctrlr.getLibraryData();

    const Block = await dbctrlr.getTermsData("Block");
    const Body = await dbctrlr.getTermsData("Body");
    const General = await dbctrlr.getTermsData("General");
    const Kata = await dbctrlr.getTermsData("Forms");
    const Kick = await dbctrlr.getTermsData("Kick");
    const Kumite = await dbctrlr.getTermsData("Sparring");
    const Numbers = await dbctrlr.getTermsData("Number");
    const Procedures = await dbctrlr.getTermsData("Procedures");
    const Punch = await dbctrlr.getTermsData("Punch");
    const Stance = await dbctrlr.getTermsData("Stance");
    const Strike = await dbctrlr.getTermsData("Strike");
    const Weapon = await dbctrlr.getTermsData("Weapon");
    const Info = await dbctrlr.getTermsData("Info");

    const karateOverview = await dbctrlr.getOverviewData();
    const wkkdata = await dbctrlr.getWadoKiKaiStyleData();
    const dojoProcedures = await dbctrlr.getDojoProceduresData();

    const OVmain = karateOverview.main;
    const OVsection1 = karateOverview.section1;
    const OVsection2 = karateOverview.section2;
    const OVsection3 = karateOverview.section3;
    const OVsection4 = karateOverview.section4;
    const OVsection5 = karateOverview.section5;

    const wkkmain = wkkdata.main;
    const wkksection1 = wkkdata.section1;
    const wkksection2 = wkkdata.section2;
    const wkksection3 = wkkdata.section3;
    const wkksection4 = wkkdata.section4;
    const wkksection5 = wkkdata.section5;
    const wkksection1Img = wkkdata.section1.paras[1].paraImg;
    const wkksection5Img = wkkdata.section5.paras[1].paraImg;

    const DPmain = dojoProcedures.main;
    const DPsection1 = dojoProcedures.section1;
    const DPsection2 = dojoProcedures.section2;
    const DPsection2Img = dojoProcedures.section2.paras[1].paraImg;

    const dataVideos = await dbctrlr.getVideosData();

    const imageArray = ['images/dragon-trans.png', 'images/tiger.bmp', ]

    res.render('resources',
      {
        navNuMain: navNuMain,
        nav: navNuStudents,
        title: appInfo.title,
        data: data,
        dataShinko,
        dataKata,
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
        dataBooks,
        OVmain,
        OVsection1,
        OVsection2,
        OVsection3,
        OVsection4,
        OVsection5,
        wkkmain,
        wkksection1,
        wkksection1Img,
        wkksection2,
        wkksection3,
        wkksection4,
        wkksection5,
        wkksection5Img,
        DPmain,
        DPsection1,
        DPsection2,
        dataVideos,
        imageArray,
        activePage: '/resources'

      });
  }

  return { getIndex };
}

module.exports = studentsController;
