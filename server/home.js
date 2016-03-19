'use strict';

import {view}   from '../db';
import {render} from './_react';
import Home     from '../views/home.jsx';

function getIndex(req, res, next) {
  view('quotation', 'byTime', {descending: true})
    .then(function (body) {
      res.render('empty-layout', {
        reactDom: render(Home, {quotations: body}),
      });
    })
    .catch(next);
}

module.exports = {
  get:  getIndex,
};
