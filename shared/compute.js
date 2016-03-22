'use strict';

// no ES6 here.
// It goes partly on couchDb -> can't babelify

function linePrice(product) {
  var quantity  = parseFloat(product.quantity, 10);
  var price     = parseFloat(product.price, 10);
  return quantity * price;
}

function taxedPrice(total, tax) {
  total       = parseFloat(total, 10);
  tax         = parseFloat(tax, 10);
  return ((total * tax) / 100);
}


function computePrice(businessForm) {
  let tax       = businessForm.tax;
  let totalNet  = 0;
  businessForm.products.forEach(function (product) {
    totalNet    = totalNet + linePrice(product);
  });
  var taxes     = taxedPrice(totalNet, tax);
  return  {
    net:    totalNet,
    taxes:  taxes,
    total:  totalNet + taxes
  };
}

module.exports = {
  linePrice:    linePrice,
  taxedPrice:   taxedPrice,
  computePrice: computePrice,
  // aliases
  line:         linePrice,
  taxed:        taxedPrice,
  price:        computePrice,
};
