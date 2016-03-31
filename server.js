'use strict';

var path            = require('path');
var express         = require('express');
var chalk           = require('chalk');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var compression     = require('compression');
var errorHandler    = require('express-error-handler');
var marked          = require('marked');
var favicon         = require('serve-favicon');
var moment          = require('moment');
var session         = require('express-session');
var flash           = require('connect-flash');

var config          = require('./shared/config');

var quotation       = require('./server/quotation');
var invoice         = require('./server/invoice');
var customer        = require('./server/customer');
var reset           = require('./server/reset');
var print           = require('./server/print');

import reactRoutingMiddleware from './server/express-react-routing';

//////
// SERVER CONFIG
//////

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.png'));

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
// … Jade is used for wrappers & error
app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'jade');

// statics
app.use(express.static('./public'));

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

var database    = require('./db');
import {db} from './db/index'
let dbStatus    = true;
database
  .setup()
  .then(function () {
    console.log(chalk.green('db setup is done'));
  })
  .catch(function (err) {
    console.log(chalk.red('db setup FAIL'));
    dbStatus = err;
    if (err.code !== 'ECONNREFUSED') return console.log(err);
    console.log(chalk.yellow('db is not acessible\nlaunch it for god sake'));
  });

//////
// ROUTING
//////

// Don't show anything if database is not up…
app.use(function (req, res, next) {
  if (dbStatus === true) return next();
  let err     = new Error('enable to connect to database');
  err.status  = 500;
  err.reason  = 'enable to connect to database';
  return next(dbStatus);
});

import {bootApi} from './server/api';

function buildApiUrl(req, route, params) {
  // construct routes with react params
  Object.keys(params).forEach(function (name) {
    let val = params[name];
    if (route.indexOf(name) < 0) return;
    let param = `/:${name}`;
    route = route.replace(new RegExp(param), val ? `/${val}` : '');
  });
  // node-fetch only use absolute url
  // https://www.npmjs.com/package/node-fetch#url
  let {protocol, hostname} = req;
  return `${protocol}://${hostname}:${config.PORT}${route}`;
}

//----- API

import api from './server/api';

app.use('/api/v1', api);

//----- NO-JS BACKUP

app.post('/quotation/add-line',                   quotation.addLine);
app.post('/quotation/remove-line',                quotation.removeLine);
app.post('/quotation/recompute',                  quotation.recompute);
app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
app.post('/quotation/:fakeId?',                   quotation.post);

app.post('/customer/:customerId?',  customer.post);

app.post('/reset',    reset.post);

// http://maxlapides.com/forcing-browsers-print-backgrounds/
app.get('/print/:fakeId', print.get);

//----- REACT

app.use(reactRoutingMiddleware);

// import React                    from 'react';
// import {renderToString}         from 'react-dom/server'
// // react-router need history module
// import { RouterContext, match } from 'react-router';
// // Redux
// import { createStore }          from 'redux'
// import { Provider }             from 'react-redux'

// import 'isomorphic-fetch';

// import routes from './shared/routes';
// app.use(function (req, res, next) {
//   const location = req.url;
//   match({routes, location }, function (error, redirectLocation, renderProps) {
//     if (error) return next(err);
//     if (redirectLocation) {
//       return res.redirect(redirectLocation.pathname + redirectLocation.search);
//     }
//     if (!renderProps) return next();

//     let {components, params} = renderProps;
//     let apiCalls        = [];
//     let cashedData      = req.flash();
//     let cashedDataKeys  = Object.keys(cashedData);

//     // get all datas
//     components.forEach( function (component) {
//       if (!component.load) return;
//       let apiReq = fetch(buildApiUrl(req, component.load, params))
//         .then(function (response) {
//           if (response.status >= 400) {
//             let err = new Error(response.statusText);
//             err.status = response.status;
//             throw err;
//           }
//           return Promise.resolve(response.json());
//         })
//       apiCalls.push(apiReq);
//     })

//     wait for all datas to be resolved
//     Promise.all(apiCalls)
//       .then(function (results) {
//         // merge all datas
//         let datas = {};
//         results.forEach(r => datas = Object.assign(datas, r))
//         // update datas with in memory updated datas
//         if (cashedDataKeys.length) {
//           cashedDataKeys.forEach(function (key) {
//             datas[key] = Object.assign( datas[key] || {}, cashedData[key][0])
//           })
//         }
//         // console.log();
//         components[0].datas = datas;
//         return res.render('_layout', {
//           dom:          renderToString(<RouterContext {...renderProps} />),
//           initialState: datas,
//         });
//       })
//       .catch(next);

//   });
// });

//////
// ERROR HANDLING
//////

var handler = errorHandler({
  views: {
    default:  'error/default',
    404:      'error/404',
  },
});
app.use(function (err, req, res, next) {
  if (err.reason == null) err.reason = err.toString();
  console.trace(err);
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

export {app as default};
