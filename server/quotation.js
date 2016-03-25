'use strict';

var chalk     = require('chalk');

// db
import {db, view, get as dbGet, atomic} from '../db';
import * as Quotation         from '../db/quotation'
import * as Invoice           from '../db/invoice';
import * as businessForm      from '../db/business-form';
import {createBlank}          from '../shared/blank-business-form';
// views
import {render}               from './_react';
import QuotationsHome         from '../views/quotations-home.jsx';
import QuotationForm          from '../views/quotation-form.jsx';
import {defaultProduct, tax}  from './config';
import * as format            from '../shared/format';
import {id as formatId}       from '../views/_format';

var config    = require('./config');
var Customer  = require('../db/customer');
var compute   = require('../shared/compute');

function createEmptyQuotation() {
  return businessForm
    .getNextIndex('quotation')
    .then(function(index) {
      let net   = compute.linePrice(defaultProduct);
      let base = createBlank(index);
      return Promise.resolve(Object.assign(base, {
        tax,
        price: {
          net,
          taxes: compute.taxedPrice(net, tax),
          total: net + compute.taxedPrice(net, tax),
        },
        products: [ defaultProduct ]
      }));
    });
}

function editOrCreate(req, res, next) {
  let isCreating        = req.params.fakeId == null;
  let customersPromise  = Customer.getAll();
  let quotationPromise  = req.flash('quotation')[0];

  if (quotationPromise) {
    quotationPromise = Promise.resolve(quotationPromise)
  } else {
    quotationPromise = isCreating ? createEmptyQuotation() : businessForm.getByFakeId(req.params.fakeId, 'quotation');
  }

  Promise
    .all([
      customersPromise,
      quotationPromise,
    ])
    .then(function (body) {
      let [customers, quotation] = body;
      res.render('_layout', {
        dom: render(QuotationForm, {customers, quotation}),
      });
    })
    .catch(next)
}

function createCustomerIfNew(customerName) {
  return Customer
    .exist(customerName)
    .then(function(isCustomer) {
      if (!isCustomer) return Customer.create({name: customerName});
      return Promise.resolve(isCustomer);
    });
}

function post(req, res, next) {
  var body        = req.body;
  var quotationId = body._id || null;
  createCustomerIfNew(body.customer)
    .then(function () {
      return atomic('quotation', 'create', quotationId, req.body);
    })
    .then(function (couchRes) {
      return res.status(302).redirect(`/quotation/${formatId('quotation', couchRes)}`);
    })
    .catch(next);
}

function convert(req, res, next) {
  var body        = req.body;
  createCustomerIfNew(body.customer)
    .then(function () {
      return businessForm.getNextIndex('invoice');
    })
    .then(function (invoiceIndex) {
      body.index.invoice = invoiceIndex;
      return atomic('quotation', 'convertToInvoice', body._id, body);
    })
    .then(function (couchRes) {
      // return res.status(302).redirect('/quotation/' + body.fakeId);
      return res.status(302).redirect('/');
    })
    .catch(next)
}

////////
// NO-JS SPECIFIC
////////

function getRedirectUrl(body) {
  return body.fakeId == null ? '/quotation' : `/quotation/${body.fakeId}`;
}

function addLine(req, res, next) {
  req.body.products.push(defaultProduct);
  req.body.price = compute.price(req.body);
  req.flash('quotation', req.body);
  res.redirect(getRedirectUrl(req.body));
}

function removeLine(req, res, next) {
  let index       = ~~req.body.removeIndex;
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
  addLine,
  removeLine,
  recompute,
  editOrCreate,
  post,
  convert,
};
