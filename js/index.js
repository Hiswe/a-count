import $ from 'jquery';
import productTmpl from '../views/front/product.jade'

// 'keyup input'
$('.js-product').on('keyup change', computeProductTotal);
$('.js-add-product').on('click', addLine);

function computeProductTotal(e) {
  var $input      = $(e.target);
  if ($input.hasClass('js-product-descriptions')) return;
  var $product    = $(e.currentTarget);
  var quantity    = ~~$product.find('.js-product-quantity').val();
  var price       = ~~$product.find('.js-product-price').val();
  var tax         = ~~$product.find('.js-product-tax').val();
  var total       = quantity * price;
  var totalTaxed  = total + (total * tax) / 100;
  $product.find('.js-product-total').text(totalTaxed);
}

function addLine(e) {
  e.preventDefault();
  var length = $('.js-product').length;
  $('.js-products').append(productTmpl({index: length}));
}
