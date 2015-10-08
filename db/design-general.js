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

  // TODO use shared/compute
  var total = 0;
  doc.products.forEach(function (product) {
    product.quantity  = ~~product.quantity;
    product.price     = ~~product.price;
    product.tax       = ~~product.tax;
    var totalTaxed    = product.quantity * product.price;
    totalTaxed        = totalTaxed + (totalTaxed * product.tax) / 100;
    total = total + totalTaxed;
  });
  doc.total           = total;
  //
  return [doc, toJSON(doc)];
};

//////
// EXPORTS
//////

module.exports = {
  _id: '_design/general',
  updates:  updates,
  views:    views,
};
