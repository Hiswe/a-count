'use strict';

import  {view, atomic, get} from './index';
var db            = require('./index').db;
var slug          = require('slug');
slug.charmap['_'] = '-';

function create(data) {
  var customerId  = data.customerId || null;
  data.id         = slug(data.name);
  return atomic('customer', 'create', customerId, data);
}

function getByName(name) {
  return view('customer', 'byName', {
    key: name,
  });
}

function byId(id) {
  return get(id)
}

// can't use a head request as we use the name
function exist(name) {
  return view('customer', 'byName', {
    key: name,
    include_docs: false,
    reduce: true
  })
    .then(function (count) {
      return Promise.resolve(count > 0)
    });
}

function getAll() {
  return view('customer', 'byId');
}

module.exports = {
  create:     create,
  getByName:  getByName,
  getAll:     getAll,
  exist:      exist,
  byId:       byId,
};
