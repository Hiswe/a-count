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
var home            = require('./server/home');
var quotation       = require('./server/quotation');
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
app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'jade');

// templates global datas
app.locals.marked = function markdownToHtml(data) {
  // prevent error while passing unsupported marked datas
  if (typeof data !== 'string') return '';
  return marked(data);
};
app.locals.formatDate = function formatDate(data) {
  if (typeof data !== 'string') return '';
  var formatedDate = moment(data).format('DD/MM/YYYY HH:mm');
  return formatedDate === 'Invalid date' ? '' : formatedDate;
}
app.locals.config = config;

// statics
app.use(express.static('./public'));

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
app.all('*', function (req, res, next) {
  if (dbStatus === true) return next();
  let err     = new Error('enable to connect to database');
  err.status  = 500;
  err.reason  = 'enable to connect to database';
  return next(dbStatus);
});

app.get('/quotations', quotation.get);

app.get('/quotation/:fakeId?',                    quotation.editOrCreate);
app.post('/quotation/add-line',                   quotation.addLine);
app.post('/quotation/remove-line',                quotation.removeLine);
app.post('/quotation/recompute',                  quotation.recompute);
app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
app.post('/quotation/:fakeId?',                   quotation.post);

app.get('/customers',               customer.get);
app.get('/customer/:customerId',    customer.edit);
app.get('/customer',                customer.create);
app.post('/customer/:customerId?',  customer.post);

app.get('/reset',   reset.get);
app.post('/reset',  reset.post);

// http://maxlapides.com/forcing-browsers-print-backgrounds/
app.get('/print/:fakeId', print.get);

app.get('/', home.get);

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
  console.log(err);
  // force status for morgan to catch up
  res.status(err.status || err.statusCode);
  next(err);
});

app.use(errorHandler.httpError(404));
app.use(handler);

//////
// LAUNCHING
//////

var server = app.listen(3000, function endInit() {
  console.log('Server is listening on port ', server.address().port);
});
