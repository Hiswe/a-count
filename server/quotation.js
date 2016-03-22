'use strict';

var chalk     = require('chalk');
var async     = require('async');

import {db, view, get as dbGet, atomic} from '../db';
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

function createEmptyQuotation() {
  console.log('create empty quotation');
  return view('quotation', 'byTime', {
    include_docs: false,
    reduce: true,
  })
    .then(function(id) {
      let net = compute.linePrice(defaultProduct);
      return Promise.resolve({
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
      });
    });
}

function editOrCreate(req, res, next) {
  let isCreating        = req.params.id == null;
  console.log('[QUOTATION] is creating?', isCreating);
  // console.log(req.flash('quotation'));
  let customersPromise  = customer.getAll();
  let quotationPromise  = req.flash('quotation')[0];

  if (quotationPromise) {
    quotationPromise = Promise.resolve(quotationPromise)
  } else {
    quotationPromise = isCreating ? createEmptyQuotation() : dbGet(req.params.id);
  }

  Promise
    .all([
      customersPromise,
      quotationPromise,
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
  var quotationId = req.params.id || null;
  var body        = req.body;
  console.log(body);
  customer
    .exist(body.customer)
    .then(function(isCustomer) {
      console.log('is Customer', isCustomer);
      if (!isCustomer) return customer.create({name: body.customer});
      return Promise.resolve(isCustomer);
    })
    .then(function () {
      console.log('create quotation');
      return atomic('quotation', 'create', quotationId, req.body);
    })
    .then(function (couchRes) {
      console.log('creation response');
      return res.status(302).redirect('/quotation/' + couchRes._id);
    })
    .catch(next);
}

////////
// NO-JS SPECIFIC
////////

function getRedirectUrl(body) {
  return body._id == null ? '/quotation' : `/quotation/${body._id}`;
}

function addLine(req, res, next) {
  req.body.products.push(defaultProduct);
  req.body.price = compute.price(req.body);
  req.flash('quotation', req.body);
  res.redirect(getRedirectUrl(req.body));
}

function removeLine(req, res, next) {
  let index       = ~~req.body.index;
  req.body.products.splice(index, 1);
  req.body.price  = compute.price(req.body);
  req.flash('quotation', req.body);
  res.redirect(getRedirectUrl(req.body));
}

// a reload without loosing datas.
// just to have a fresh computation
function recompute(req, res, next) {
  req.body.price = compute.price(req.body);
  req.flash('quotation', req.body);
  res.redirect(getRedirectUrl(req.body));
}

////////
// EXPORTS
////////

module.exports = {
  create,
  addLine,
  removeLine,
  recompute,
  editOrCreate,
  post,
  get,
};
