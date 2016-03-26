'use strict';

// no ES6 here.
// It goes partly on couchDb -> can't babelify

function line(product) {
  if (!product) return 0;
  var quantity  = parseFloat(product.quantity, 10);
  var price     = parseFloat(product.price, 10);
  return quantity * price;
}

function taxed(total, tax) {
  total       = parseFloat(total, 10);
  tax         = parseFloat(tax, 10);
  return ((total * tax) / 100);
}

function price(businessForm) {
  let tax       = businessForm.tax;
  let net       = 0;
  businessForm.products.forEach(function (product) {
    net    = net + line(product);
  });
  var taxes     = taxed(net, tax);
  return  {
    net:    net,
    taxes:  taxes,
    total:  net + taxes
  };
}

module.exports = {
  line:   line,
  taxed:  taxed,
  price:  price,
  // aliases
  linePrice:    line,
  taxedPrice:   taxed,
  computePrice: price,
};
