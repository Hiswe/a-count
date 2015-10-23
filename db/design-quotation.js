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
      emit(doc.time.lastUpdate, 1);
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
        created: new Date()
      }
    };
  }
  doc._id             = doc._id || 'quot-' + body.id;
  doc.time.lastUpdate = new Date();
  doc.title           = body.title || doc.title || 'New quotation at ' + new Date().toString();
  doc.customer        = body.customer || doc.customer || 'unknown customer!!';
  doc.products        = body.products || doc.products;

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
