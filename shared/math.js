'use strict';

function productPrice(product) {
  product.quantity  = ~~product.quantity;
  product.price     = ~~product.price;
  product.tax       = ~~product.tax;
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
