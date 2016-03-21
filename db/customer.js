'use strict';

import  {view} from './index';
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
  db.view('customer', 'byName', {
    key: name,
    include_docs: true,
  }, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    done(err, couchRes.rows[0].doc);
  }
}

function exist(name, next, done) {
  db.view('customer', 'byName', {key: name}, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    done(err, couchRes.rows.length > 0);
  }
}

function getAll(done) {
  return view('customer', 'byId');
}

module.exports = {
  create:     create,
  getByName:  getByName,
  getAll:     getAll,
  exist:      exist,
};
