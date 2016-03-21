'use strict';

var chalk     = require('chalk');
var async     = require('async');

import {db, view, dbGet}      from '../db';
import {render}               from './_react';
import QuotationsHome         from '../views/quotations-home.jsx';
import QuotationForm          from '../views/quotation-form.jsx';
import {defaultProduct, tax}  from './config';

var config    = require('./config');
var customer  = require('../db/customer');
var compute   = require('../shared/compute');

function get(req, res, next) {
  view('quotation', 'byTime', {descending: true})
    .then(function (quotations) {
      res.render('_react-layout', {
        dom: render(QuotationsHome, {quotations}),
      });
    })
    .catch(next)
}

function edit(req, res, next) {
  Promise
    .all([
      customer.getAll(),
      dbGet(req.params.quotationId),
    ])
    .then(function (body) {
      let [customers, quotation] = body;
      res.render('_react-layout', {
        dom: render(QuotationForm, {customers, quotation}),
      });
    })
    .catch(next)
}

function create(req, res, next) {
  console.log(req.session.quotation);
  let isFromRedirect    = req.session.quotation != null;
  let quotationPromise  = view('quotation', 'byTime', {
    include_docs: false,
    reduce: true,
  });
  Promise
    .all([quotationPromise, view('customer', 'byId')])
    .then(function (body) {
      let [id, customers] = body;
      let quotation = isFromRedirect ? req.session.quotation : createEmptyQuotation(id);
      delete req.session.quotation;
      res.render('_react-layout', {
        dom: render(QuotationForm, {customers, quotation}),
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

////////
// UTILS
////////

function createEmptyQuotation(id) {
  let net = compute.linePrice(defaultProduct);
  return {
    id,
    tax,
    price: {
      net,
      taxes: compute.taxedPrice(net, tax),
      total: net + compute.taxedPrice(net, tax),
    },
    products: [
      defaultProduct,
    ]
  };
}

////////
// NO-JS SPECIFIC
////////

function addLine(req, res, next) {
  console.log('add line');
  console.log(req.body);

  req.body.products.push(defaultProduct);
  // console.log(req.sessionID);
  req.session.quotation = req.body;

  // TODO redirect using realProductId when working on an existing product
  res.redirect('/quotation');
}


// a reload without loosing datas.
// just to have a fresh computation
function removeLine(req, res, next) {

}

// a reload without loosing datas.
// just to have a fresh computation
function recompute(req, res, next) {

}

////////
// EXPORTS
////////

module.exports = {
  create,
  addLine,
  removeLine,
  recompute,
  edit,
  post,
  get,
};
