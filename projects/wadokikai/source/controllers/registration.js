const debug = require('debug')('app:registrationController');
const moment = require('moment');
const nodeMailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

function registrationController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();

    var passedVariableID = ''; 
    if (req.query.id) passedVariableID = req.query.id;
    var passedVariableErr = ''; 
    if (req.query.err) passedVariableErr = req.query.err;
    var passedVariableMsg = ''; 
    if (req.query.msg) passedVariableMsg = req.query.msg;

    var passedVariableStatus= ''; 
    if (req.query.status) passedVariableStatus = req.query.status;

    // get the event information from the DB
    let eventInfo = await dbctrlr.getEventSpecialClassDetails(passedVariableID);
    
    res.render('registration',
      {
        navNuMain: navNuMain,
        title: 'Event Registration',
        activePage: '/events',
        msg: passedVariableMsg,
        err: passedVariableErr,
        eventID: passedVariableID,
        status: passedVariableStatus,
        eventName: eventInfo.title,
        eventLocation: eventInfo.location,
        eventdate: eventInfo.date,
        eventtime: eventInfo.time,
        eventowner: eventInfo.owner,
        moment: moment,

      });
  }

  // Handles the POST /registration
  async function postRegistration(req, res) {
    debug('postRegistration Called');
    debug(`req body: ${JSON.stringify(req.body)}`);
    const DBController = require('./DBController');
    const spamfilter = require('./SPAMFilter');
    const dbctrlr = new DBController();


    let error = '';
    
    // Validate that we have all the info we need to send an email to someone.
    if (typeof req.body.eventId == 'undefined' || req.body.eventId == '') {
        error += 'eventId empty! ';
    }
    if (typeof req.body.eventName == 'undefined' || req.body.eventName == '') {
        error += 'eventName empty! ';
    }

    if (typeof req.body.eventLocation == 'undefined' || req.body.eventLocation == '') {
        error += 'eventLocation empty! ';
    }
    if (typeof req.body.eventDate == 'undefined' || req.body.eventDate == '') {
        error += 'eventDate empty! ';
    }
    if (typeof req.body.eventTime == 'undefined' || req.body.eventTime == '') {
        error += 'eventTime empty! ';
    }
    if (typeof req.body.eventOwner == 'undefined' || req.body.eventOwner == '') {
        error += 'eventOwner empty! ';
    }

    if (typeof req.body.email == 'undefined' || req.body.email == '') {
        error += 'email empty! ';
    }
    // validate that the FROM is an email address if not it is spam or a bot
    if (typeof req.body.email == 'undefined' || !req.body.email.includes('@')) {
        error += 'email not valid! ';
    }
    if (typeof req.body.name == 'undefined' || req.body.name == '') {
        error += 'name empty! ';
    }
    if (typeof req.body.msg == 'undefined' || req.body.msg == '') {
        error += 'msg empty! ';
    }
    if (error != '') {
        // if not valid return - with error
        console.log(error);
        if (req.body.route === 'index') {
            res.redirect('/?err=error#signup');
        } else {
            res.redirect('/contact/?err=error');
        }
        return;
    }


    // If it is SPAM act like we sent an email 
    let SPAM = false; 
    // Check From 
    if (spamfilter.isSPAMFrom(req.body.email)) {
        debug('postSendEmail FROM is SPAM');
        SPAM = true; 
    }
    // Check Body
    if (spamfilter.isSPAMBody(req.body.msg)) {
        debug('postSendEmail BODY is SPAM');
        SPAM = true; 
    }

    if (SPAM) {
        debug('postSendEmail THIS IS SPAM');
        res.redirect('/registration/?status=1&msg=registered&s=1');
        return;
    }

    // create the data object for the registration record
    let data = {
        dateJoined: new Date(),
        
        eventID: req.body.eventId,
        eventName: req.body.eventName,
        eventlocation: req.body.eventLocation,
        eventdate: req.body.eventDate, 
        eventtime: req.body.eventTime,
        eventOwner: req.body.eventOwner,

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone, 
        registrationmsg: req.body.msg,

    }

    // First register the person for the event. 
    let newInfo = await dbctrlr.setEventRegistration(data); 
    if (newInfo.error) {
        // If already signed up - Don't add them - you can send a follow up email. 
        res.redirect(`/registration/?err=${newInfo.error}&status=1`);
        return;
    } else {
        // Need to send a registration email. 
        let transporter = nodeMailer.createTransport({
            host: 'mail.wadokikai.org',   // wadokikai.org email server spro3.fcomet.com or mail.wadokikai.org
            port: 465,                // wadokikai.org email port 465 (standard port)
            secure: true,
            auth: {
                user: 'no-reply@wadokikai.org',  // we need a email address like NOREPLY@wadokikai.org
                pass: 'Void2022!!'
            }
        });
    
    
        let sendTo = '';
        if (req.body.school) {
            sendTo = req.body.email;
            sendTo += ', events@wadokikai.org';
        } else {
            sendTo = 'events@wadokikai.org';
        }
        console.log("Sending To: ");
        console.log(sendTo);
        debug("Sending To: %s", sendTo);
        let mailOptions = {
            from: 'no-reply@wadokikai.org', // sender address
            to: sendTo, // list of receivers
            subject: 'Registration Confirmation -' + req.body.eventName, // Subject line''
            text: "\n", // plain text body
            html: `Thank you for registering for ${req.body.eventName}<br/>
            <br/>
            Remember to bring clothes you don't mind getting sweaty.  Also, bring some water, a mask, and a light jacket.<br/>
            <br/>  
            Name: ${req.body.name}
            email: ${req.body.email}
            phone: ${req.body.phone}<br/>
            Message: ${req.body.msg}<br/>
            <br/>
            The class will be:<br/>
            ${req.body.eventLocation}<br/>
            ${req.body.eventDate}<br/>
            ${req.body.eventTime}<br/><br/>
            If you have an questions please send an e-mail to ${req.body.eventOwner}
            <br/>`, // html body
        };
      
        // TODO = Validate that we have all the info we need to send an email to someone.
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.redirect('/registration/?err=error');
                return;
            }
    
            console.log('Message %s sent: %s', info.messageId, info.response);
    
            debug('Message %s sent: %s', info.messageId, info.response);
            res.redirect('/registration/?status=1&msg=registered&s=0');
    
        });
    }
  }

  return { getIndex, postRegistration};
}

module.exports = registrationController;
