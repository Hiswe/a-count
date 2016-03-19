'use strict';

var chalk         = require('chalk');

import {db, view}   from '../db';
import {render}     from './_react';
import CustomerList from '../views/customer-list.jsx';

var slug          = require('slug');
slug.charmap['_'] = '-';
var logId         = '[CUSTOMER]';
var customer      = require('../db/customer');

function edit(req, res, next) {
  var customerId = req.params.customerId;
  db.get(customerId, couchResp);
  function couchResp(err, body) {
    if (err) return next(err);
    return res.render('customer', {customer: body});
  }
}

function create(req, res, next) {
  return res.render('customer');
}

function post(req, res, next) {
  req.body.customerId = req.params.customerId;
  customer.create(req.body, next, function couchDone(err, couchRes) {
    console.log(couchRes);
    // TODO add a flash message
    return res.status(302).redirect('/customer/' + couchRes._id);
  });
}

function get(req, res, next) {
  view('customer', 'byId')
    .then(function (customers) {
      res.render('empty-layout', {
        reactDom: render(CustomerList, {customers}),
      });
    })
    .catch(next)
}

module.exports = {
  create: create,
  edit:   edit,
  post:   post,
  get:    get,
};
