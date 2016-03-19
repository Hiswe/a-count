'use strict';

var chalk = require('chalk');
var host  = 'http://admin:admin@localhost:5984';
var nano  = require('nano')(host);
var db    = nano.use('concompte');

//////
// DB SETUP FUNCTION
//////

var general   = require('./design-general');
var customer  = require('./design-customer');
var quotation = require('./design-quotation');

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
    insertDesignDocument(quotation)
  ]);
}

//////
// EXPORTS
//////

module.exports = {
  db:     db,
  setup:  setupDesignDocuments,
};
