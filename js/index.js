import $ from 'jquery';
import productTmpl    from '../views/front/product.jade'
import defaultConfig  from '../shared/default-config'
import * as math      from '../shared/math'

// 'keyup input'
$('.js-products').on('keyup change', computeProductTotal);
$('.js-add-product').on('click', addLine);

function computeProductTotal(e) {
  var $input      = $(e.target);
  if ($input.hasClass('js-product-descriptions')) return;
  var $product    = $input.parents('.js-product');
  var totalTaxed  = math.productPrice({
    quantity: $product.find('.js-product-quantity').val(),
    price:    $product.find('.js-product-price').val(),
    tax:      $product.find('.js-product-tax').val()
  });
  $product.find('.js-product-total').text(totalTaxed);
  computeSubtotal();
}

function addLine(e) {
  e.preventDefault();
  var length = $('.js-product').length;
  $('.js-products').append(productTmpl({
    index: length,
    emptyProduct: defaultConfig.defaultProduct,
  }));
  computeSubtotal();
}

function computeSubtotal() {
  var subtotal = 0;
  $('.js-product-total').each(function (index, el) {
    subtotal = subtotal + ~~$(el).text();
  });
  $('.js-subtotal').text(subtotal);
}
