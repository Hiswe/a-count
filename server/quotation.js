'use strict';

var chalk     = require('chalk');

// db
import {db, view, get as dbGet, atomic} from '../db';
import * as Quotation         from '../db/quotation'
import * as Invoice           from '../db/invoice';
import * as businessForm      from '../db/business-form';
import {createBlank}          from '../shared/blank-business-form';

import * as format            from '../shared/format';
import config                 from '../shared/config'

import {id as formatId}       from '../views/_format';

var Customer  = require('../db/customer');
var compute   = require('../shared/compute');

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
  console.log(config.defaultProduct);
  req.body.products.push(config.defaultProduct);
  console.log(req.body);
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
  post,
  convert,
};
