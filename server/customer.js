'use strict';

var chalk         = require('chalk');
var db            = require('../db').db;
var slug          = require('slug');
slug.charmap['_'] = '-';
var logId         = '[CUSTOMER]';

function edit(req, res, next) {
  var customerId = req.params.customerId;
  db.get(customerId, couchResp);
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
  var body  = req.body;
  body.id   = slug(req.body.name);
  db.atomic('general', 'customer', customerId, req.body, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    console.log(couchRes);
    // TODO add a flash message
    return res.status(302).redirect('/customer/' + couchRes._id);
  }
}

function get(req, res, next) {
  db.view('general', 'customers', {
    include_docs: true,
    reduce: false
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var customers = body.rows.map(function (row) { return row.doc; });
    return res.render('customers', {customers: customers});
  }
}

module.exports = {
  create: create,
  edit:   edit,
  post:   post,
  get:    get,
};
