'use strict';

var chalk     = require('chalk');

// db
import {db, view, get as dbGet, atomic} from '../db';
import * as Quotation         from '../db/quotation'
import * as Invoice             from '../db/invoice';
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
  return Quotation
    .getNextIndex()
    .then(function(index) {
      let net = compute.linePrice(defaultProduct);
      // id: format.id(config.quotation, id + config.quotation.startingAt),
      return Promise.resolve({
        index: {
          quotation: index,
        },
        tax,
        time:   {
          created: new Date(),
        },
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
  let customersPromise  = Customer.getAll();
  let quotationPromise  = req.flash('quotation')[0];

  if (quotationPromise) {
    quotationPromise = Promise.resolve(quotationPromise)
  } else {
    quotationPromise = isCreating ? createEmptyQuotation() : Quotation.getByFakeId(req.params.id);
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

// function create(req, res, next) {
//   console.log(req.session.quotation);
//   let isFromRedirect    = req.session.quotation != null;
//   let quotationPromise  = view('quotation', 'byTime', {
//     include_docs: false,
//     reduce: true,
//   });
//   Promise
//     .all([quotationPromise, view('customer', 'byId')])
//     .then(function (body) {
//       let [id, customers] = body;
//       let quotation = isFromRedirect ? req.session.quotation : createEmptyQuotation(id);
//       delete req.session.quotation;
//       res.render('_react-layout', {
//         dom: render(QuotationForm, {customers, quotation}),
//       });
//     })
//     .catch(next)
// }

function createCustomerIfNew(customerName) {
  return Customer
    .exist(customerName)
    .then(function(isCustomer) {
      console.log('is Customer', isCustomer);
      if (!isCustomer) return Customer.create({name: customerName});
      return Promise.resolve(isCustomer);
    });
}

function post(req, res, next) {
  var body        = req.body;
  var quotationId = body._id || null;
  console.log(body);
  createCustomerIfNew(body.customer)
    .then(function () {
      console.log('create quotation');
      return atomic('quotation', 'create', quotationId, req.body);
    })
    .then(function (couchRes) {
      console.log('creation response');
      return res.status(302).redirect(`/quotation/${formatId('quotation', couchRes)}`);
    })
    .catch(next);
}

function convert(req, res, next) {
  var body        = req.body;
  var quotationId = body._id;
  console.log(body)
  createCustomerIfNew(body.customer)
    .then(Invoice.getNextId)
    .then(function (id) {
      console.log('convert to');
      console.log(id);
      return res.status(302).redirect('/quotation/' + quotationId);
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
  // create,
  addLine,
  removeLine,
  recompute,
  editOrCreate,
  post,
  get,
  convert,
};
