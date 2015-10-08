'use strict';

function productPrice(product) {
  product.quantity  = parseFloat(product.quantity, 10);
  product.price     = parseFloat(product.price, 10);
  product.tax       = parseFloat(product.tax, 10);
  var total         = product.quantity * product.price;
  var totalTaxed    = total + (total * product.tax) / 100;
  return totalTaxed;
}

function quotationPrice(products) {
  var total = 0;
  products.forEach(function (product) {
    total = total + productPrice(product);
  });
  return total;
};

module.exports = {
  productPrice:   productPrice,
  quotationPrice: quotationPrice,
};
