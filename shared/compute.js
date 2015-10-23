'use strict';

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

module.exports = {
  linePrice:      linePrice,
  taxedPrice:     taxedPrice,
};
