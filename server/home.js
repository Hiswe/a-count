'use strict';

import {db}           from '../db';
import {render}       from './_react';
import Home           from '../views/home.jsx';

function getIndex(req, res, next) {
  db.view('quotation', 'byTime', {
    include_docs: true,
    descending:   true,
    reduce:       false
  }, couchResp);

  function couchResp(err, body) {
    if (err) return next(err);
    var quotations = body.rows.map(function (row) {
      return row.doc;
    });
    res.render('empty-layout', {
      reactDom: render(Home, {quotations}),
    });
  }
}

module.exports = {
  get:  getIndex,
};
