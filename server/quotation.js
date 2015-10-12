'use strict';

var chalk   = require('chalk');
var async   = require('async');
var config  = require('./config');
var db      = require('../db').db;
var compute = require('../shared/compute');

function get(req, res, next) {
  db.view('general', 'quotation', {
    include_docs: true,
    descending: true,
    reduce: false
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var quotations = body.rows.map(function (row) { return row.doc; });
    res.render('quotations', {quotations: quotations});
  }
}

function edit(req, res, next) {
  var quotationId = req.params.quotationId;
  db.get(quotationId, couchResp);
  function couchResp(err, body) {
    if (err) return next(err);
    return res.render('quotation', {quotation: body});
  }
}

function create(req, res, next) {
  async.parallel({
    quotation: function (callback) {
      db.view('general', 'quotation', callback);
    },
    customers: function (callback) {
      db.view('general', 'customers', {
        include_docs: true
      }, callback);
    },
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var quotation = body.quotation[0].rows;
    var customers = body.customers[0].rows.map(function(customer) {
      return customer.doc;
    });
    // Reduce of no entries is empty
    var quotationId = quotation.length ? quotation[0].value : 0;
    return res.render('quotation', {
      quotationId:  quotationId,
      customers: customers,
      emptyProduct: config.defaultProduct,
      total: compute.productPrice(config.defaultProduct),
    });
  }
}

function post(req, res, next) {
  var quotationId = req.params.quotationId || null;
  var body = req.body;
  db.atomic('general', 'quotation', quotationId, req.body, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    console.log(couchRes);
    // TODO add a flash message
    return res.status(302).redirect('/quotation/' + couchRes._id);
  }
}

module.exports = {
  create: create,
  edit:   edit,
  post:   post,
  get:    get,
};
