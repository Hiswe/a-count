'use strict';

// no ES6 here.
// It goes partly on couchDb -> can't babelify

function id(type, count) {
  var prefix  = type.prefix;
  var now     = new Date();
  var month   = now.getMonth() + '';
  month       = month.length < 2 ? '0' + month : month;
  var year    = /\d\d$/.exec(new Date().getFullYear())[0];
  return type.prefix + year + month + '-' + count;
}

module.exports = {
  id: id,
};
