'use strict';

var chalk   = require('chalk');
var db      = require('../db').db;
var logId   = '[CUSTOMER]';

function edit(req, res, next) {
  var customerId = req.params.customerId;
  console.log(chalk.blue(logId), 'GET', quotationId);
  db.get(quotationId, couchResp);
  function couchResp(err, body) {
    if (err) {
      console.log(chalk.red(logId), 'can\'t get document');
      return next(err);
    }
    return res.render('customer', {customer: body});
  }
}

function create(req, res, next) {
  console.log(chalk.blue(logId), 'GET without ID');
  return res.render('customer');
}

function post(req, res, next) {
  var customerId = req.params.customerId || null;
  console.log(chalk.blue(logId), 'POST');
  var body = req.body;
  db.atomic('general', 'customer', customerId, req.body, couchDone);
  function couchDone(err, couchRes) {
    if (err) {
      console.log(chalk.red(logId), 'POST');
      console.log(err);
      return next(err);
    }
    console.log(logId, chalk.grey('couch response'));
    console.log(couchRes);
    // TODO add a flash message
    return res.status(302).redirect('/customer/' + couchRes._id);
  }
}

module.exports = {
  create: create,
  edit:   edit,
  post:   post,
};
