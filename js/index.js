import $ from 'jquery';

$('.js-product').on('keyup', computeProductTotal);

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
};
