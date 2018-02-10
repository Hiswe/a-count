const floatClass  = 'is-floating';
var $ui           = {};

function init () {
  bindUi();
  bindEvents();
  $ui.floating.each(checkval);
}

function bindUi() {
  $ui.floating = $('.input-float input, .input-float textarea');
}

function bindEvents() {
  $ui.floating.on('keyup focus', checkval);
}

function checkval() {
  var $label = $(this).siblings('label');
  if(this.value !== ''){
     return $label.addClass(floatClass);
  }
  $label.removeClass(floatClass);
}

export {init as default};
