const debug = require('debug')('app:eventsController');
const moment = require('moment');

function eventsController(appInfo) {

  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const navNuEvents = await dbctrlr.getNavEvents();
    const data = await dbctrlr.getEventPageData();
    const specialclasses = await dbctrlr.getEventSpecialClasses();
    const promotions = await dbctrlr.getEventPromotions();
    const tournaments = await dbctrlr.getEventTournaments();
    const blackbeltclasses = await dbctrlr.getEventBlackBeltClasses();
    

    // debug(`specialclasses: ${JSON.stringify(specialclasses)}`);
    // debug(`promotions: ${JSON.stringify(promotions)}`);
    // debug(`tournaments: ${JSON.stringify(tournaments)}`);
    // debug(`blackbeltclasses: ${JSON.stringify(blackbeltclasses)}`);

    let currentdate = Date.now();
    
    var specialclassesShow = false; 
    for(let i = 0; i < specialclasses.specialclasses.length; i++) { 
      if (new Date(specialclasses.specialclasses[i].date).getTime() > currentdate) { 
       specialclassesShow = true; 
      }  
    }  

    
    var promotionsShow = false; 
    for(let i = 0; i < promotions.promotions.length; i++) { 
      if (new Date(promotions.promotions[i].dt).getTime() > currentdate) { 
       promotionsShow = true; 
      }  
    }  

    
    var tournamentsShow = false; 
    for(let i = 0; i < tournaments.tournaments.length; i++) { 
      if (new Date(tournaments.tournaments[i].dt).getTime() > currentdate) { 
       tournamentsShow = true; 
      }  
    }  

    
    var blackbeltclassesShow = false; 
    for(let i = 0; i < blackbeltclasses.blackbeltclasses.length; i++) { 
      let date = new Date(blackbeltclasses.blackbeltclasses[i].dt);
      if (date.getTime() > currentdate) { 
       blackbeltclassesShow = true; 
      }  
    }  

    debug(`currentdate: ${Date(currentdate)}`);
    debug(`currentdate: ${currentdate}`);
    debug(`specialclasses: ${specialclassesShow}`);
    debug(`promotions: ${promotionsShow}`);
    debug(`tournaments: ${tournamentsShow}`);
    debug(`blackbeltclasses: ${blackbeltclassesShow}`);

    res.render('events',
      {
        navNuMain: navNuMain,
        nav: navNuEvents,
        title: appInfo.title,
        data,
        specialclasses,
        promotions,
        tournaments,
        blackbeltclasses,
        specialclassesShow,
        tournamentsShow,
        promotionsShow,
        blackbeltclassesShow,
        moment: moment,
        activePage: '/events',
        currentdate,
      });
  }

  async function getBBIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const navNuEvents = await dbctrlr.getNavEvents();
    const data = await dbctrlr.getBBEventPageData();
    const eventListPromo = await dbctrlr.getPromotions();
    const eventListSC = await dbctrlr.getSpecialClasses();
    const eventListTour = await dbctrlr.getTournaments();
    const eventListBB = await dbctrlr.getBlackBeltClasses();
    
    let prevEvent = '';
    let newevent = true;
    let firsttime = true;

    debug(eventListPromo);
    debug(eventListTour);
    debug(eventListBB);


    res.render('bbeventsview',
      {
        navNuMain: navNuMain,
        title: 'Black Belt Event View',
        data,
        eventListPromo,
        eventListSC,
        eventListTour,
        eventListBB,
        moment: moment,
        activePage: '/events',
        prevEvent,
        newevent,
        firsttime
      });
  }

  return { getIndex, getBBIndex };
}

module.exports = eventsController;
