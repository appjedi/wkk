/* eslint-disable no-underscore-dangle */
const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
var fs = require('fs');

// const dotenv = require('dotenv');

const app = express();
const SSL_CERT_KEY = "/opt/bitnami/letsencrypt/certificates/wadokikai.org.key";
const SSL_CERT_CRT = "/opt/bitnami/letsencrypt/certificates/wadokikai.org.crt";

var privateKey  = fs.readFileSync(SSL_CERT_KEY, 'utf8');
var certificate = fs.readFileSync(SSL_CERT_CRT, 'utf8');
var credentials = {key: privateKey, cert: certificate};

const appSever = require('http').createServer(app);
const appSecureServer = require('https').createServer(credentials, app);



const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
var rfs = require('rotating-file-stream') 


const port = 80;
const secureport = 443;
const homeURL = '/';

const localURL = 'http://localhost';

const appInfo = {
  title: 'Wado Ki Kai', 
};

//debug(`Process env vars: ${JSON.stringify(process.env)}`);

// uses
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

morgan.format('logFormat', ':date :method :url :status :res[content-length] - :response-time ms');
app.use(morgan('logFormat'));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('/images', express.static('images')));
app.use(express.static('/js', express.static('js')));
app.use(express.static(path.resolve('./public')));

const homeRouter = require('./source/routes/home')(appInfo);
const contactRouter = require('./source/routes/contact')(appInfo);
const eventsRouter = require('./source/routes/events')(appInfo);
const instructorsRouter = require('./source/routes/instructors')(appInfo);
const studentsRouter = require('./source/routes/students')(appInfo);
const sendemailRouter = require('./source/routes/sendemail')(appInfo);
const joinemailRouter = require('./source/routes/joinemail')(appInfo);
const registrationRoute = require('./source/routes/registration')(appInfo);


// uses:routes
app.use('/', homeRouter);
app.use('/events', eventsRouter);
app.use('/resources', studentsRouter);
app.use('/schools', instructorsRouter);
app.use('/contact', contactRouter);
app.use('/sendemail', sendemailRouter);
app.use('/joinemail', joinemailRouter);
app.use('/registration', registrationRoute);

// views
app.set('views', './source/views/');
app.set('view engine', 'ejs');

// server
console.log("about to listen port 80");

appSever.listen(port, (req, res) => {
//  console.log(`Listening on port ${chalk.green(port)}.`);
  debug(`Listening on port ${chalk.green(port)}.`);
});


console.log("about to listen port 443");
appSecureServer.listen(secureport, () => {
  debug(`Listening on port ${chalk.green(secureport)}.`);
});




