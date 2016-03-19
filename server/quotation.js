'use strict';

var chalk     = require('chalk');
var async     = require('async');

import {db, view}     from '../db';
import {render}       from './_react';
import QuotationsHome from '../views/quotations-home.jsx';
var config    = require('./config');
var customer  = require('../db/customer');
var quotation = require('../db/quotation');
var compute   = require('../shared/compute');

function get(req, res, next) {
  view('quotation', 'byTime', {descending: true})
    .then(function (body) {
      res.render('empty-layout', {
        reactDom: render(QuotationsHome, {quotations: body}),
      });
    })
    .catch(next)
}

function edit(req, res, next) {
  quotation.getById(req.params.quotationId, next, couchResp);
  function couchResp(err, body) {
    return res.render('quotation', body);
  }
}

function create(req, res, next) {
  async.parallel({
    quotation: function (callback) {
      db.view('quotation', 'byTime', callback);
    },
    customers: customer.getAll,
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var quotation = body.quotation[0].rows;
    var customers = body.customers[0].rows.map(function(customer) {
      return customer.doc;
    });
    // Reduce of no entries is empty
    var quotationId = quotation.length ? quotation[0].value : 0;

    var emptyTotal = {
      net: compute.linePrice(config.defaultProduct)
    };
    emptyTotal.taxes = compute.taxedPrice(emptyTotal.net, config.tax);
    emptyTotal.total = emptyTotal.net + emptyTotal.taxes;

    return res.render('quotation', {
      quotationId:  quotationId,
      customers: customers,
      emptyProduct: config.defaultProduct,
      emptyTotal: emptyTotal,
    });
  }
}

function post(req, res, next) {
  var quotationId = req.params.quotationId || null;
  var body = req.body;
  console.log(body);

  // create customer if none with the same name
  customer.exist(body.customer, next, checkCustomerDone);
  function checkCustomerDone(err, customerExist) {
    if (customerExist) return updateQuotation();
    return customer.create({name: body.customer}, next, updateQuotation);
  }

  function updateQuotation() {
    db.atomic('quotation', 'create', quotationId, req.body, couchDone);
  }

  function couchDone(err, couchRes) {
    if (err) return next(err);
    // console.log(couchRes);
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
