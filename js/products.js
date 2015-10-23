import autosize       from 'autosize';
import productTmpl    from '../views/front/product.jade';
import defaultConfig  from '../shared/default-config';
import * as compute   from '../shared/compute';
import logger         from './_logger';

const log = logger('products', true);
var   $ui = {};

function init() {
  $ui.products = $('.js-products');
  if (!$ui.products.length) return;
  log('init');
  bindUI();
  bindEvents();
}

function bindUI() {
  $ui.tax       = $('.js-tax');
  $ui.netTotal  = $('.js-total-net');
  $ui.taxTotal  = $('.js-total-tax');
  $ui.total     = $('.js-total-all');
}

function bindEvents() {
  $('.js-add-product').on('click', addLine);
  // change event is for type=number input
  // fire when using arrows or controls
  // see browser support of 'change/input' event
  $ui.products
    .on('keyup change', '.js-product', computeProductTotal)
    .on('click', '.js-product-remove', removeLine);

  $ui.tax
    .on('keyup change', computeTotal);

  autosize($ui.products.find('textarea'));
}

function computeProductTotal(e) {
  var $input      = $(e.target);
  if ($input.hasClass('js-product-descriptions')) return;
  var $product    = $(e.currentTarget);
  var totalTaxed  = compute.linePrice({
    quantity: $product.find('.js-product-quantity').val(),
    price:    $product.find('.js-product-price').val(),
  });
  $product
    .find('.js-product-total')
    .text(totalTaxed);
  computeTotal();
}

function addLine(e) {
  e.preventDefault();
  var length = $('.js-product').length;
  $ui.products.append(productTmpl({
    index: length,
    emptyProduct: defaultConfig.defaultProduct,
  }));
  computeTotal();
}

function computeTotal() {
  var totalNet = 0;
  $('.js-product-total').each(function (index, el) {
    totalNet = totalNet + ~~$(el).text();
  });
  var taxes = compute.taxedPrice(totalNet, $ui.tax.val());
  $ui.netTotal.text(totalNet);
  $ui.taxTotal.text(taxes);
  $ui.total.text(totalNet + taxes);
}

function removeLine(e) {
  $(e.currentTarget)
    .parents('.js-product')
    .remove();
  computeTotal();
}

export {init as default};
