'use strict';

var chalk   = require('chalk');
var config  = require('./config');
var db      = require('../db').db;
var compute = require('../shared/compute');

function edit(req, res, next) {
  var quotationId = req.params.quotationId;
  db.get(quotationId, couchResp);
  function couchResp(err, body) {
    if (err) return next(err);
    return res.render('quotation', {quotation: body});
  }
}

function create(req, res, next) {
  db.view('general', 'quotation', couchResp);
  function couchResp(err, body) {
    if (err) return next(err);
    // Reduce of no entries is empty
    var quotationId = body.rows.length ? body.rows[0].value : 0;
    return res.render('quotation', {
      quotationId:  quotationId,
      emptyProduct: config.defaultProduct,
      total: compute.productPrice(config.defaultProduct),
    });
  }
}

function post(req, res, next) {
  var quotationId = req.params.quotationId || null;
  var body = req.body;
  db.atomic('general', 'quotation', quotationId, req.body, couchDone);
  function couchDone(err, couchRes) {
    if (err) return next(err);
    console.log(couchRes);
    // TODO add a flash message
    return res.status(302).redirect('/quotation/' + couchRes._id);
  }
}

module.exports = {
  create: create,
  edit:   edit,
  post:   post,
};
