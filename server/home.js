'use strict';

import {view}         from '../db';
import * as Quotation from '../db/quotation'
import {render}       from './_react';
import Home           from '../views/home.jsx';

function getIndex(req, res, next) {
  Quotation
    .getAllActive()
    .then(function (quotations) {
      res.render('empty-layout', {
        reactDom: render(Home, {quotations}),
      });
    })
    .catch(next);
}

module.exports = {
  get:  getIndex,
};
