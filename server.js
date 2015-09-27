'use strict';

var path        = require('path');
var express 		= require('express');
var bodyParser 	= require('body-parser');

var invoice     = require('./server/invoice');

//////
// DB CONFIG
//////

var db          = require('./db');
db.setup();

//////
// SERVER CONFIG
//////

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'jade');

// statics
app.use(express.static('./public'));

//////
// ROUTING
//////

app.get('/', function getIndex(req, res) {
  return res.render('home');
});

app.get('/invoice', invoice.get);
app.post('/invoice', invoice.post);

//////
// LAUNCHING
//////

var server = app.listen(3000, function endInit() {
  console.log("Server is listening on port ", server.address().port);
});
