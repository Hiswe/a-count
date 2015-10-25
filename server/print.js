'use strict';

var db        = require('../db').db;
var customer  = require('../db/customer');

function get(req, res, next) {
  var doc;

  db.get(req.params.docId, docResp);

  function docResp(err, body) {
    if (err) return next(err);
    doc = body;
    customer.getByName(body.customer, next, customerResp);
  }

  function customerResp(err, body) {
    res.render('print', {
      doc:      doc,
      customer: body,
    });
  }
}

module.exports = {
  get: get,
};
