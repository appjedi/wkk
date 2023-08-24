const debug = require('debug')('app:joinemailController');
const moment = require('moment');

function joinemailController(appInfo) {


  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();

    var passedVariableType = ''; 
    if (req.query.type) passedVariableType = req.query.type;
    var passedVariableStatus = ''; 
    if (req.query.status) passedVariableStatus = req.query.status;
    var passedVariablemsg = '';
    if (req.query.msg) passedVariablemsg = req.query.msg

    var text = '';

    if (passedVariableType !== '') {
        switch(passedVariableType){
            case 'specialclasses':
                text = 'This email list is used when Wado Ki Kai wants to let people know about Special Classes that are being held. The classes are usually for Free Self-Defense classes, but there may be a visiting martial arts instructor.<br/><br/>Please join this list if you want to be notified for these types of events.';
            break;
            case 'promotions':
                text = 'This email list is used when Wado Ki Kai wants to let people know about promotions that are being held.<br/><br/>Please join this list if you want to be notified for upcoming promotion events.';
            break;
            case 'tournaments':
                text = 'This email list is used to let people know about Karate Tournaments that are being held.<br/><br/>Please join this list if you want to be notified for upcoming tournament events.'
            break;
            case 'blackbeltclasses':
                text = 'This email list is used to let people black belts know about Black Belt Classes.<br/><br/>NOTE: You do not have to be a Wado Ki Kia black belt, but if you come to class you will be asked to teach us something from your style.<br/><br/>Please join this list if you are a black belt and want to be notified for upcoming Black Belt Classes.'
            break;
            default:
                text = 'No e-mail list type was identified';
        }
    }

    res.render('joinemail',
      {
        navNuMain: navNuMain,
        title: 'Join e-mail List',
        text,
        activePage: '',
        type: passedVariableType,
        status: passedVariableStatus,
        msg: passedVariablemsg,
      });
  }

  // Handles the POST /joinemail
  async function postJoinEmail(req, res) {
    debug('postJoinEmail Called');
    debug(`req body: ${JSON.stringify(req.body)}`);

    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    let error = '';

    // Validate that we have all the info we need to send an email to someone.
    if (typeof req.body.email == 'undefined' || req.body.email == '') {
        error += 'email empty! ';
    }
    if (typeof req.body.name == 'undefined' || req.body.name == '') {
        error += 'name empty! ';
    }

    if (error != '') {
        // if not valid return - with error
        console.log(error);
        if (req.body.route === 'index') {
            res.redirect('/?err=error#signup');
        } else {
            res.redirect('/contact/?err=error');
        }
    }

    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone, 
        dateJoined: new Date(),

    }
    let newinfo = {};
    switch(req.body.type){
        case 'specialclasses':
            // save name to db
            newinfo = await dbctrlr.setSpecialClasses(data);
            break;
        case 'promotions':
            newinfo = await dbctrlr.setPromotions(data);
            break;
        case 'tournaments':
            newinfo = await dbctrlr.setTournaments(data);
            break;
        case 'blackbeltclasses':
            newinfo = await dbctrlr.setBlackBeltClasses(data);
            break;
        break;
        default:
            // redirect back to the form with status 1 for success and 0 for fail
            res.redirect('/joinemail/?status=0');
    }
    debug(`Got back newinfo: ${JSON.stringify(newinfo)}`);
    // check to see if the new info object has error values
    if(newinfo.error) {
        res.redirect(`/joinemail/?type=${req.body.type}&status=0&msg=${newinfo.error}`);
    } else {
        // redirect back to the form with status 1 for success and 0 for fail
        res.redirect(`/joinemail/?type=${req.body.type}&status=1`);
    }
  }

  return { getIndex, postJoinEmail};
}

module.exports = joinemailController;
