'use strict';

var chalk = require('chalk');
var db    = require('../db').db;
var logId = '[HOME]';

function getIndex(req, res) {
  console.log(chalk.blue(logId), 'GET');
  db.view('general', 'quotation', {
    include_docs: true,
    descending: true,
    reduce: false
  }, couchResp);

  function couchResp(err, body) {
    console.log(body);
    if (err) {
      console.log(chalk.red(logId));
      console.log(err);
      return res.status(500).send('Error in create invoice');
    }
    var quotations = body.rows.map(function (row) {
      return row.doc;
    });
    res.render('home', {
      quotations: quotations,
    });
  }
}

module.exports = {
  get:  getIndex,
};
