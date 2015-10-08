'use strict';

var path          = require('path');
var express       = require('express');
var bodyParser    = require('body-parser');
var compression   = require('compression');
var errorHandler  = require('express-error-handler');

var home          = require('./server/home');
var quotation     = require('./server/quotation');

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

app.use(compression());

// statics
app.use(express.static('./public'));

//////
// ROUTING
//////

app.get('/quotation/:quotationId', quotation.edit);
app.get('/quotation', quotation.create);
app.post('/quotation/:quotationId?', quotation.post);

app.get('/', home.get);

var handler = errorHandler({
  views: {
    '404': 'error/404',
  },
});

app.use(errorHandler.httpError(404));

app.use(handler);

//////
// LAUNCHING
//////

var server = app.listen(3000, function endInit() {
  console.log("Server is listening on port ", server.address().port);
});
