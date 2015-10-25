'use strict';

function get(req, res, next) {
  res.render('print');
}

module.exports = {
  get: get,
};
