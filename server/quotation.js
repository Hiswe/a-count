'use strict';

var chalk     = require('chalk');
var async     = require('async');

import {db, view}       from '../db';
import {render}         from './_react';
import QuotationsHome   from '../views/quotations-home.jsx';
import QuotationForm    from '../views/quotation-form.jsx';
import {defaultProduct} from './config';

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
  let quotationPromise = view('quotation', 'byTime', {
    include_docs: false,
    reduce: true,
  });
  Promise.
    all([quotationPromise, view('customer', 'byId')])
    .then(function (body) {
      let quotationId, customers;
      [quotationId, customers] = body;
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
        reactDom: render(QuotationForm, {quotationId, customers, emptyTotal, defaultProduct}),
      });
    })
    .catch(next)
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

// NO-JS add line function
function addLine(req, res, next) {
  console.log('add line');
  res.redirect('/quotation');
}

module.exports = {
  create: create,
  addLine,
  edit:   edit,
  post:   post,
  get:    get,
};
