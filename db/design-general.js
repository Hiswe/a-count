'use strict';

var views   = {};
var updates = {};

//////
// VIEWS
//////

views.quotation = {
  map: function(doc) {
    if (doc.type === 'quotation') {
      emit(doc.title, 1);
    }
  },
  reduce: function(keys, values, rereduce) {
    return sum(values);
  },
};

views.lib = {
  product: 'exports.price = ' + require('../shared/compute').productPrice.toString(),
};

//////
// UPDATES
//////

updates.quotation = function (doc,req) {
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
  var total   = 0;
  doc.products.forEach(function (product) {
    total     = total + require('views/lib/product').price(product);
  });
  doc.total   = total;

  return [doc, toJSON(doc)];
};

//////
// COMPUTE
//////

// var productPrice     = 'exports.productPrice = ';
// productPrice         += require('../shared/compute').productPrice.toString();
// compute.productPrice = productPrice;

//////
// EXPORTS
//////

module.exports = {
  _id: '_design/general',
  updates:  updates,
  views:    views,
};
