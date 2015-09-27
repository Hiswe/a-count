'use strict';

var chalk = require('chalk');

var db    = require('../db').db;

var logId = '[INVOICE]';

function getInvoice(req, res, next) {
  return res.render('invoice');
}

function post(req, res, next) {

  var body = req.body;
  db.atomic('general', 'invoice', null, req.body, couchDone);

  function couchDone(err, couchRes) {
    if (err) {
      console.log(chalk.red(logId));
      console.log(err);
      res.status(500).send('Error in create invoice');
    }
    console.log(logId, chalk.grey('couch response'));
    console.log(couchRes);
    // return response.redirect(302,'/article/'+body.id);
    return res.render('invoice', {
      succes: true,
    });
  }
}

module.exports = {
  get:  getInvoice,
  post: post
};
