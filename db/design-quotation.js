'use strict';

var compute       = require('../shared/compute');
var format        = require('../shared/format');
var emptyProduct  = require('../shared/blank-business-form');
var config        = require('../server/config');

// IDS should be
// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

//////
// VIEWS
//////

// take creation time as a basis
views.byTime =  {
  map: function(doc) {
    if (doc.type === 'quotation') {
      emit(doc.time.created, doc.index.quotation);
    }
  },
};

views.byIndex =  {
  map: function(doc) {
    if (doc.type === 'quotation') {
      emit(~~doc.index.quotation, doc._id);
    }
  },
};

//////
// COMPUTE FUNCTIONS
//////

var computePrice  = compute.computePrice.toString();
computePrice      = computePrice.replace('linePrice', "require('views/lib/compute').linePrice");
computePrice      = computePrice.replace('taxedPrice', "require('views/lib/compute').taxedPrice");

views.lib = {
  compute: 'exports.linePrice = '
        + compute.linePrice.toString()
        + ';\n'
        + 'exports.taxedPrice = '
        + compute.taxedPrice.toString()
        + ';\n'
        + 'exports.computePrice = '
        + computePrice
        + ';\n',
  empty: 'exports.create = '
        + emptyProduct.createBlank.toString()
        + ';\n',
};

//////
// UPDATES
//////

updates.create = function (doc, req) {
  var body    = JSON.parse(req.body);
  if (!doc) {
    var doc = require('views/lib/empty').create(~~body.index.quotation);
    doc._id = req.uuid;
  }

  doc.title           = body.title    || doc.title || 'New quotation at ' + new Date().toString();
  doc.customer        = body.customer || doc.customer || 'unknown customer!!';
  doc.products        = body.products || doc.products;

  // times
  var time    = doc.time;
  var status  = body.status || {};
  time.lastUpdate = new Date();
  if (status.send === 'on' && !time.send) time.send = new Date();
  if (status.validated === 'on' && !time.validated) time.validated = new Date();
  if (status.signed === 'on' && !time.signed) time.signed = new Date();
  if (status.done === 'on' && !time.done) time.done = new Date();

  // // payments
  // var payments    = body.payments || {};
  // var advance     = payments.advance || {};
  // if (advance.amount !== doc.payments.advance) {
  //   doc.payments.advance.amount = advance.amount;
  //   doc.payments.advance.time   = new Date();
  // }

  // taxes
  doc.tax = typeof body.tax !== 'undefined' ? body.tax : doc.tax;

  // compute prices
  doc.price     = require('views/lib/compute').computePrice(doc);

  return [doc, toJSON(doc)];
};

updates.convertToInvoice = function (doc, req) {
  var body              = JSON.parse(req.body);
  doc.type              = 'invoice';
  doc.index.invoice     = body.index.invoice;

  doc.title           = body.title    || doc.title || 'New invoice at ' + new Date().toString();
  doc.customer        = body.customer || doc.customer || 'unknown customer!!';
  doc.products        = body.products || doc.products;
  // times
  var time              = doc.time;
  time.lastUpdate       = new Date();
  // this is for having an accurate view ordered byTime
  time.converted        = new Date();
  //
  if (!time.send)       time.send       = new Date();
  if (!time.validated)  time.validated  = new Date();
  if (!time.signed)     time.signed     = new Date();
  if (!time.done)       time.done       = new Date();

  // taxes
  doc.tax = typeof body.tax !== 'undefined' ? body.tax : doc.tax;
  // compute prices
  doc.price     = require('views/lib/compute').computePrice(doc);

  return [doc, toJSON(doc)];
}

//////
// EXPORTS
//////

module.exports = {
  _id:      '_design/quotation',
  updates:  updates,
  views:    views,
};
