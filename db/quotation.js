'use strict';

var slug          = require('slug');
slug.charmap['_'] = '-';
var async         = require('async');

var db            = require('./index').db;
var customer      = require('./customer');

function getById(id, next, done) {
  async.parallel({
    quotation: function (callback) {
      db.get(id, callback);
    },
    customers: customer.getAll,
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var quotation = body.quotation[0];
    var customers = body.customers[0].rows.map(function(customer) {
      return customer.doc;
    });
    done(err, {
      quotation: quotation,
      customers: customers,
    });
  }

}

module.exports = {
  getById: getById,
};
