'use strict';

var chalk     = require('chalk');
var database  = require('../db');
var db        = require('../db').db;
var logId     = '[CUSTOMER]';

function edit(req, res, next) {
  var customerId = req.params.customerId;
  db.get(quotationId, couchResp);
  function couchResp(err, body) {
    if (err) return next(err);
    return res.render('customer', {customer: body});
  }
}

function create(req, res, next) {
  return res.render('customer');
}

function post(req, res, next) {
  var customerId = req.params.customerId || null;
  var body = req.body;
  db.atomic('general', 'customer', customerId, req.body, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
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
