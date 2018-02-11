'use strict';

var chalk         = require('chalk');

import {db, view, get as dbGet}   from '../db';
import CustomerHome               from '../views/customer-home.jsx';
import CustomerForm               from '../views/customer-form.jsx';

var slug          = require('slug');
slug.charmap['_'] = '-';
var logId         = '[CUSTOMER]';
var customer      = require('../db/customer');

// function edit(req, res, next) {
//   dbGet(req.params.customerId)
//     .then( function (customer) {
//       res.render('_layout', {dom: render(CustomerForm, {customer}) });
//     })
//     .catch(next);
// }

// function create(req, res, next) {
//   res.render('_layout', {dom: render(CustomerForm, {}) });
// }

// function post(req, res, next) {
//   req.body.customerId = req.params.customerId;
//   customer
//     .create(req.body)
//     .then(function (couchRes) {
//       // TODO add a flash message
//       return res.status(302).redirect('/customer/' + couchRes._id);
//     });
// }

// function get(req, res, next) {
//   view('customer', 'byId')
//     .then(function (customers) {
//       res.render('_layout', {
//         dom: render(CustomerHome, {customers}),
//       });
//     })
//     .catch(next)
// }

const create = (req, res, next) => {
  res.redirect( req.originalUrl )
}

export {
  create,
}

// module.exports = {
//   create: create,
//   edit:   edit,
//   post:   post,
//   get:    get,
// };
