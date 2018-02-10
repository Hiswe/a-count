import path from 'path'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import errorHandler from 'express-error-handler'
import marked from 'marked'
import favicon from 'serve-favicon'
import moment from 'moment'
import session from 'express-session'
import flash from 'connect-flash'
import { inspect } from 'util'

import config from '../shared/config'
// import quotation from './quotation'
// import invoice from './invoice'
// import customer from './customer'
// import reset from './reset'
// import print from './print'
import { sequelize } from '../db'
import reactRoutingMiddleware from './express-react-routing'

//////
// SERVER CONFIG
//////

var app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( compression() )
app.use( favicon(__dirname + '/../public/favicon.png') )

// see Warning here
// https://github.com/expressjs/session#sessionoptions
// https://www.npmjs.com/package/session-file-store
app.use(session({
  secret: 'con con con compte',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());

// templates
// even if React is used for the most part…
// …Jade is still used for wrappers & error
app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'jade');

// statics

app.use(express.static(path.join(__dirname, '../public')));

//////
// LOGGING
//////

// don't want to log static
function logRequest(tokens, req, res) {
  var method  = tokens.method(req, res);
  var url     = tokens.url(req, res);
  return chalk.blue(method) + ' ' + chalk.grey(url);
}
function logResponse(tokens, req, res) {
  var method      = tokens.method(req, res);
  var status      = tokens.status(req, res);
  var url         = tokens.url(req, res);
  var statusColor = status >= 500
    ? 'red' : status >= 400
    ? 'yellow' : status >= 300
    ? 'cyan' : 'green';
  return chalk.blue(method) + ' '
    + chalk.grey(url) + ' '
    + chalk[statusColor](status);
}
app.use(morgan(logRequest, {immediate: true}));
app.use(morgan(logResponse));

//////
// DB CONFIG
//////

// database
//   .setup()
//   .then(function () {
//     console.log(chalk.green('db setup is done'));
//   })
//   .catch(function (err) {
//     console.log(chalk.red('db setup FAIL'));
//     dbStatus = err;
//     if (err.code !== 'ECONNREFUSED') return console.log(err);
//     console.log(chalk.yellow('db is not acessible\nlaunch it for god sake'));
//   });

//////
// ROUTING
//////

// // Don't show anything if database is not up…
// app.use(function (req, res, next) {
//   if (dbStatus === true) return next();
//   let err     = new Error('enable to connect to database');
//   err.status  = 500;
//   err.reason  = 'enable to connect to database';
//   return next(dbStatus);
// });

// import {bootApi} from './api';

// function buildApiUrl(req, route, params) {
//   // construct routes with react params
//   Object.keys(params).forEach(function (name) {
//     let val = params[name];
//     if (route.indexOf(name) < 0) return;
//     let param = `/:${name}`;
//     route = route.replace(new RegExp(param), val ? `/${val}` : '');
//   });
//   // node-fetch only use absolute url
//   // https://www.npmjs.com/package/node-fetch#url
//   let {protocol, hostname} = req;
//   return `${protocol}://${hostname}:${config.PORT}${route}`;
// }

//----- API

import api from '../db/api'

app.use('/api/v1', api)

// //----- NO-JS BACKUP

// app.post('/quotation/add-line',                   quotation.addLine);
// app.post('/quotation/remove-line',                quotation.removeLine);
// app.post('/quotation/recompute',                  quotation.recompute);
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
// app.post('/quotation/:fakeId?',                   quotation.post);

// app.post( '/customer/:customerId?',  customer.post);
// app.post( `/customers/new`,          customer.create )

// app.post('/reset',    reset.post);

// // http://maxlapides.com/forcing-browsers-print-backgrounds/
// // TODO should be handled by react?
// app.get('/print/:fakeId', print.get);

//----- MOUNT REACT ROUTER

app.use(`/`, reactRoutingMiddleware);

//////
// ERROR HANDLING
//////

const handler = errorHandler({
  views: {
    default:  'error/default',
    404:      'error/404',
  },
});
app.use( (err, req, res, next) => {
  if (err.reason == null) err.reason = err.toString();
  console.log( inspect(err, {colors: true}) )
  err.stacktrace = err.stacktrace || err.stack || false;
  // force status for morgan to catch up
  res.status(err.status || err.statusCode);
  next(err);
});

app.use(errorHandler.httpError(404));
app.use(handler);

//////
// EXPORTS
//////

export {app as default}
