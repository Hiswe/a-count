'use strict';

var db            = require('./index').db;
var slug          = require('slug');
slug.charmap['_'] = '-';

function create(data, next, done) {
  var customerId = data.customerId || null;
  data.id   = slug(data.name);
  db.atomic('customer', 'create', customerId, data, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    done(err, couchRes);
  }
}

function getByName() {

}

module.exports = {
  create: create
};
