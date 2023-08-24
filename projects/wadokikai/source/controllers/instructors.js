const debug = require('debug')('app:instructorsController');

function instructorsController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called for instructorsController');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const navInstructors = await dbctrlr.getNavInstructors();
    const instructors = await dbctrlr.getInstructorsData();
    const schools = await dbctrlr.getSchoolsData();

    const instrImg0 = instructors[0].image;
    const instrImg1 = instructors[1].image;
    const instrImg2 = instructors[2].image;
    const instrImg3 = instructors[3].image;
    const instrImg4 = instructors[4].image;
    const instrImg5 = instructors[5].image;
    const instrImg6 = instructors[6].image;
    const instrImg7 = instructors[7].image;
    const instrImg8 = instructors[8].image;
    const instrImg9 = instructors[9].image;
    const instrImg10 = instructors[10].image;
    const instrImg11 = instructors[11].image;
    const instrImg12 = instructors[12].image;
    const instrImg13 = instructors[13].image;
    const instrImg14 = instructors[14].image;
    // const instrImg15 = instructors[15].image;
    // const instrImg16 = instructors[16].image;
    // const instrImg17 = instructors[17].image;
    // const instrImg18 = instructors[18].image;


    res.render('schools',
      {
        navNuMain: navNuMain,
        nav: navInstructors,
        title: appInfo.title,
        schools,
        instructors,
        activePage: '/schools',

      });
  }

  return { getIndex };
}

module.exports = instructorsController;
