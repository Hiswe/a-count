'use strict';

var chalk         = require('chalk');
var host          = 'http://admin:admin@localhost:5984';
var nano          = require('nano')(host);
export const db   = nano.use('concompte');

import { normalize, schema } from 'normalizr'

import config               from '../shared/config'
import { setFakeId }        from '../shared/_format'

//////
// DB SETUP FUNCTION
//////

var general   = require('./design-general');
var customer  = require('./design-customer');
var quotation = require('./design-quotation');
var invoice   = require('./design-invoice');

function insertDesignDocument(designDocument) {
  let name    = designDocument._id;
  let promise = new Promise(function (resolve, reject) {
    db.head(name, function(err, res, headers) {
      // Send error if something else than no document
      if (err && err.statusCode !== 404) return reject(err);
      // to be updated, couch docs needs the last revision in parameter
      // -> Add current rev if doc exist
      if (headers && headers.etag) designDocument._rev = headers.etag.replace(/"/g,'');
      // update or create
      db.insert(designDocument, function(err, body) {
        if (err) return reject(err);
        console.log(chalk.green('design documents done'), name);
        resolve(body);
      });
    });
  });
  return promise;
}

function setupDesignDocuments() {
  return Promise.all([
    insertDesignDocument(general),
    insertDesignDocument(customer),
    insertDesignDocument(quotation),
    insertDesignDocument(invoice),
  ]);
}

export {setupDesignDocuments as setup}

//////
// PROMISE SHORTCUT
//////

const viewDefaultParams = {
  include_docs: true,
  reduce: false
};
export function view(designname, viewname, params = {}) {
  params = Object.assign({}, viewDefaultParams, params);
  // take care of query_parse_error
  // Reduce should invalidate include_docs?
  if (!params.include_docs) delete params.include_docs;
  if (params.reduce)        delete params.reduce;
  //
  return new Promise(function (resolve, reject) {
    db.view(designname, viewname, params, function (err, body) {
      if (err) return reject(err);
      // we want to access docs when using include_docs
      if (params.include_docs) body = body.rows.map( row => row.doc);
      // Reduce of no entries is empty
      if (params.reduce == null) {
        body = body.rows.length ? body.rows[0].value : 0;
      }
      return resolve(body);
    })
  });
}

export function get(name) {
  return new Promise(function (resolve, reject) {
    db.get(name, function (err, body) {
      if (err) return reject(err);
      return resolve(body);
    });
  });
}

export {get as dbGet}

export function atomic(designname, updatename, docname, body) {
  return new Promise(function (resolve, reject) {
    db.atomic(designname, updatename, docname, body, function (err, body) {
      if (err) return reject(err);
      return resolve(body);
    });
  });
}

export function viewWithList(designname, viewname, listname, params = {}) {
  return new Promise( (resolve, reject ) => {
    db.viewWithList(designname, viewname, listname, params, (err, body) => {
      if (err) return reject(err)
      return resolve(body)
    })
  })
}

//////
// “GLOBAL” METHOD
//////

const quotations = new schema.Entity('quotations', { idAttribute:  'id' })
const invoices   = new schema.Entity('invoices', { idAttribute:    'id' })
const customers  = new schema.Entity('customers', { idAttribute: '_id' })

export function getInitialState() {
  return viewWithList('general', 'getAll', 'getState')
    .then( initialState => {
      // we don't want raw index to appear on window.__initialState__
      initialState.quotations = initialState.quotations.map( q => setFakeId(q, config) )
      initialState.invoices   = initialState.invoices.map(  i => setFakeId(i, config) )
      // normalize datas for better handling with Redux
      return Promise.resolve(normalize(initialState, {
        quotations: new schema.Array( quotations ),
        invoices:   new schema.Array( invoices ),
        customers:  new schema.Array( customers ),
      }))
    })
}
