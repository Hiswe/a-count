'use strict';

var chalk = require('chalk');

var db    = require('../db').db;

var logId = '[QUOTATION]';

function getQuotation(req, res, next) {
  db.view('general', 'quotation', couchResp);
  function couchResp(err, body) {
    if (err) {
      console.log(chalk.red(logId));
      console.log(err);
      return res.status(500).send('Error in get quotation list');
    }
    console.log(body);
    return res.render('quotation', {quotationId: body.rows[0].value});
  }
}

function post(req, res, next) {

  var body = req.body;
  console.log(req.body);
  db.atomic('general', 'quotation', null, req.body, couchDone);

  function couchDone(err, couchRes) {
    if (err) {
      console.log(chalk.red(logId));
      console.log(err);
      return res.status(500).send('Error in create quotation');
    }
    console.log(logId, chalk.grey('couch response'));
    console.log(couchRes);
    // return response.redirect(302,'/article/'+body.id);
    return res.render('quotation', {
      succes:     true,
      quotation:  couchRes,
    });
  }
}

module.exports = {
  get:  getQuotation,
  post: post
};
