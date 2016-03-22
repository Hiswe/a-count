'use strict';

var compute = require('../shared/compute');

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

views.lib = {
  compute: 'exports.linePrice = '
        + compute.linePrice.toString()
        + ';\n'
        + 'exports.taxedPrice = '
        + compute.taxedPrice.toString()
        + ';\n',
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

  // compute price
  doc.tax             = typeof body.tax !== 'undefined' ? body.tax : doc.tax || 1;
  var totalNet  = 0;
  doc.products.forEach(function (product) {
    totalNet    = totalNet + require('views/lib/compute').linePrice(product);
  });
  var taxes     = require('views/lib/compute').taxedPrice(totalNet, doc.tax);

  doc.price     = {
    net:    totalNet,
    taxes:  taxes,
    total:  totalNet + taxes
  };

  return [doc, toJSON(doc)];
};

//////
// EXPORTS
//////

module.exports = {
  _id:      '_design/quotation',
  updates:  updates,
  views:    views,
};
