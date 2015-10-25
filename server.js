'use strict';

var path          = require('path');
var express       = require('express');
var chalk         = require('chalk');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var compression   = require('compression');
var errorHandler  = require('express-error-handler');
var marked        = require('marked');
var favicon       = require('serve-favicon');

var config        = require('./server/config');
var home          = require('./server/home');
var quotation     = require('./server/quotation');
var customer      = require('./server/customer');
var reset         = require('./server/reset');

//////
// DB CONFIG
//////

var database    = require('./db');
database.setup();

//////
// SERVER CONFIG
//////

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'jade');
app.locals.marked = function markdownToHtml(data) {
  // prevent error while passing unsupported marked datas
  if (typeof data !== 'string') return '';
  return marked(data);
};
app.locals.config = config;
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.png'));


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
// ROUTING
//////

app.get('/quotations', quotation.get);
app.get('/quotation/:quotationId', quotation.edit);
app.get('/quotation', quotation.create);
app.post('/quotation/:quotationId?', quotation.post);


app.get('/customers', customer.get);
app.get('/customer/:customerId', customer.edit);
app.get('/customer', customer.create);
app.post('/customer/:customerId?', customer.post);

app.get('/reset', reset.get);
app.post('/reset', reset.post);

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
  console.log(err);
  // force status for morgan to catch up
  res.status(err.status || err.statusCode)
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
