'use strict';

var compute = require('../shared/compute');

// IDS should be
// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

//////
// VIEWS
//////

views.byTime =  {
  map: function(doc) {
    if (doc.type === 'quotation') {
      emit(doc.time.created, 1);
    }
  },
  reduce: function(keys, values, rereduce) {
    return sum(values);
  },
};

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
        + ';\n'
};

//////
// UPDATES
//////

updates.create = function (doc, req) {
  var body = JSON.parse(req.body);
  if (!doc) {
    var doc = {
      type:   'quotation',
      time:   {
        created:    new Date(),
        send:       false,
        validated:  false,
        signed:     false,
        done:       false,
      }
    };
  }

  doc._id             = doc._id || 'quot-' + body.id;
  doc.title           = body.title || doc.title || 'New quotation at ' + new Date().toString();
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

  // taxes
  doc.tax = typeof body.tax !== 'undefined' ? body.tax : doc.tax || 1;

  // compute prices
  doc.price     = require('views/lib/compute').computePrice(doc);

  return [doc, toJSON(doc)];
};

updates.archive = function (doc, req) {
  time.lastUpdate = new Date();
  if (!time.send) time.send = new Date();
  if (!time.validated) time.validated = new Date();
  if (!time.signed) time.signed = new Date();
  if (!time.done) time.done = new Date();

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
