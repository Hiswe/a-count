import express from 'express';

import * as Quotation from '../db/quotation'
import * as Invoice   from '../db/invoice'
import * as Customer  from '../db/customer'

const api = express();

const apiRouting = {
  'GET /invoices': function () {
    return Invoice.getAllActive();
  },
}

let bootApi = {};

api
  .route('/home')
  .get(function (req, res, next) {
    Promise
      .all([Quotation.getAllActive(), Invoice.getAllActive()])
      .then(function (results) {
        let [quotations, invoices] = results
        res.json({quotations, invoices})
      })
  })

api
  .route('/quotations')
  .get(function (req, res, next) {
    Quotation.getAllActive().then(quotations => res.json({quotations}) )
  })

api
  .route('/invoices')
  .get(function (req, res, next) {
    Invoice.getAllActive().then(invoices => res.json({invoices}) )
  })

api
  .route('/customers')
  .get(function (req, res, next) {
    Customer.getAll().then(customers => res.json({customers}) )
  })

api.use(function (req, res, next) {
  res.sendStatus(404);
});

export {api as default, bootApi}
