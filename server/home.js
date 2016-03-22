'use strict';

import {view}         from '../db';
import * as Quotation from '../db/quotation'
import * as Invoice   from '../db/invoice'
import {render}       from './_react';
import Home           from '../views/home.jsx';

function getIndex(req, res, next) {
  Promise
    .all([Quotation.getAllActive(), Invoice.getAllActive()])
    .then(function (couchres) {
      let [quotations, invoices] = couchres;
      res.render('empty-layout', {
        reactDom: render(Home, {quotations, invoices}),
      });
    })
    .catch(next);
}

module.exports = {
  get:  getIndex,
};
