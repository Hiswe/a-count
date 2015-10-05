'use strict';

var chalk = require('chalk');

var db    = require('../db').db;

var logId = '[QUOTATION]';

function getQuotation(req, res, next) {
  return res.render('quotation');
}

function post(req, res, next) {

  var body = req.body;
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
      succes: true,
    });
  }
}

module.exports = {
  get:  getQuotation,
  post: post
};
