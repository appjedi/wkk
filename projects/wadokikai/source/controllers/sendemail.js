const debug = require('debug')('app:sendemailController');
const moment = require('moment');
const nodeMailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

function sendemailController(appInfo) {
  async function getIndex(req, res) {
    debug('getIndex Called');
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const navNuMain = await dbctrlr.getNavMain();
    const schools = await dbctrlr.getSchoolsData();


    res.render('contact',
      {
        navNuMain: navNuMain,
        title: appInfo.title,
        activePage: '/contact',
        schools,
        msg: '',
        err: '',
      });
  }

  // Handles the POST /sendemail
  async function postSendEmail(req, res) {
    const DBController = require('./DBController');
    const dbctrlr = new DBController();
    const SPAMFilter = require('./spamfilter');
    const spamfilter = new SPAMFilter();
    debug('postSendEmail Called');
    debug(`req body: ${JSON.stringify(req.body)}`);
    let error = '';
    
    // Validate that we have all the info we need to send an email to someone.
    if (typeof req.body.from == 'undefined' || req.body.from == '') {
        error += 'from empty! ';
    }
    // validate that the FROM is an email address if not it is spam or a bot
    if (typeof req.body.from == 'undefined' || !req.body.from.includes('@')) {
        error += 'from not valid! ';
    }

    if (typeof req.body.name == 'undefined' || req.body.name == '') {
        error += 'name empty! ';
    }

    if (typeof req.body.body == 'undefined' || req.body.body == '') {
        error += 'message empty! ';
    }
    if (typeof req.body.school == 'undefined' || req.body.school == '') {
        error += 'school empty! ';
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
    if (spamfilter.isSPAMFrom(req.body.from)) {
        debug('postSendEmail FROM is SPAM');
        SPAM = true; 
    }
    // Check Body
    if (spamfilter.isSPAMBody(req.body.body)) {
        debug('postSendEmail BODY is SPAM');
        SPAM = true; 
    }

    if (SPAM) {
        debug('postSendEmail THIS IS SPAM');
        if (req.body.route === 'index') {
            res.redirect('/?msg=sent&s=1#signup');
        } else {
            res.redirect('/contact/?msg=sent&s=1');
        }
        return;
    }

    // Log what we got to DB and send the email if valid 
    let data = {
                Module: 'SendEmail',
                Date: new Date(),
                School: req.body.school,
                From: req.body.from, 
                ip: req.ip,
                Name: req.body.name, 
                MSG:  req.body.body,
            };

    await dbctrlr.setSendEmail(data);

    let transporter = nodeMailer.createTransport({
        host: 'spro3.fcomet.com',   // wadokikai.org email server spro3.fcomet.com or mail.wadokikai.org
        port: 465,                // wadokikai.org email port 465 (standard port)
        secure: true,
        auth: {
            user: 'no-reply@wadokikai.org',  // we need a email address like NOREPLY@wadokikai.org
            pass: 'Void2022!!'
        }
    });


    let sendTo = '';
    if (req.body.school) {
        sendTo = req.body.school;
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
        subject: req.body.subject, // Subject line
        text: "From: " + req.body.from + "----------  Name: " + req.body.name + "  ----- MSG:  \n" + req.body.body, // plain text body
        html: "From: " + req.body.from + "<br/><br/> Name: " + req.body.name + "<br/><br/>MSG:  <br/><br/> " + req.body.body, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            if (req.body.route === 'index') {
                res.redirect('/?err=error#signup');
            } else {
                res.redirect('/contact/?err=error');
            }
            return;
        }
        var infosplit = info.response.split(' ');
        console.log(infosplit);
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log(`This is my route: ${req.body.route}`);
        debug('Message %s sent: %s', info.messageId, info.response);
        if (req.body.route === 'index') {
            res.redirect('/?msg=sent#signup');
        } else {
            res.redirect('/contact/?msg=sent');
        }
        return;
        
    });
  }

  return { getIndex, postSendEmail};
}

module.exports = sendemailController;
