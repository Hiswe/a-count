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

var config          = require('./server/config');
var quotation       = require('./server/quotation');
var invoice         = require('./server/invoice');
var customer        = require('./server/customer');
var reset           = require('./server/reset');
var print           = require('./server/print');

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

app.locals.config = config;

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
let dbStatus    = true;
database
  .setup()
  .then(function () {
    console.log(chalk.green('db setup is done'))
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

import React                    from 'react';
// react-router need history module
import { RouterContext, match } from 'react-router';
import createLocation           from 'history/lib/createLocation';
import {renderToString}         from 'react-dom/server'

import routes from './shared/routes';
import {bootApi} from './server/api';

app.use(function (req, res, next) {
  const location = req.url;
  console.log(req.url);


  match({routes, location }, function (error, redirectLocation, renderProps) {
    if (error) return next(err);
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    if (renderProps) {
      let {components, params, location, route} = renderProps;
      let apiCalls  = [];
      // could use isomorphic-fetch
      // https://www.npmjs.com/package/isomorphic-fetch
      renderProps.components.forEach( function (component) {
        if (!component.load) return;
        let datas = bootApi[component.load]();
        datas.then(function (result) {
          component.datas = result;
        })
        apiCalls.push(datas);

      });
      let results = apiCalls.length === 0 ? Promise.resolve() : apiCalls.length === 1 ? apiCalls[0] : Promise.all(apiCalls);
      Promise.all(apiCalls)
        .then(function (results) {
          renderProps.datas = results;
          return res.render('_layout', {
            dom: renderToString(<RouterContext {...renderProps} />),
          });
        })
        .catch(next);
    }
  });
  // according to doc :
  // req.url here should be the full URL path fromthe original request, including the query string.
  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md#server-rendering
});

// app.get('/quotation/:fakeId?',                    quotation.editOrCreate);
app.post('/quotation/add-line',                   quotation.addLine);
app.post('/quotation/remove-line',                quotation.removeLine);
app.post('/quotation/recompute',                  quotation.recompute);
app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
app.post('/quotation/:fakeId?',                   quotation.post);

// app.get('/invoices', function (req, res, next) {
//   res.redirect('/');
// });
// app.get('/invoice/:fakeId',                       invoice.get);

// app.get('/customers',               customer.get);
// app.get('/customer/:customerId',    customer.edit);
// app.get('/customer',                customer.create);
app.post('/customer/:customerId?',  customer.post);

// app.get('/settings',    reset.get);
app.post('/reset',    reset.post);

// http://maxlapides.com/forcing-browsers-print-backgrounds/
app.get('/print/:fakeId', print.get);


//----- API

import api from './server/api';

app.use('/api', api);
// app.get('/', home.get);

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
