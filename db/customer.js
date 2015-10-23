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

function getByName(name, next, done) {
  db.view('customer', 'byName', {key: name}, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    done(err, couchRes);
  }
}

module.exports = {
  create: create,
  getByName: getByName,
};
