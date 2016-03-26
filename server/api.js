import express from 'express';

import * as Quotation     from '../db/quotation'
import * as Invoice       from '../db/invoice'
import * as Customer      from '../db/customer'
import * as BusinessForm  from '../db/business-form'

const api = express();

const apiRouting = {
  'GET /invoices': function () {
    return Invoice.getAllActive();
  },
}

let bootApi = {};

//----- HOME PAGES

api
  .route('/home')
  .get(function (req, res, next) {
    Promise
      .all([Quotation.getAllActive(), Invoice.getAllActive()])
      .then(function (results) {
        let [quotations, invoices] = results
        res.json({quotations, invoices})
      })
      .catch(next)
  })

api
  .route('/invoices')
  .get(function (req, res, next) {
    Invoice.getAllActive()
      .then(invoices => res.json({invoices}) )
      .catch(next)
  })

//----- CUSTOMER

api
  .route('/customers')
  .get(function (req, res, next) {
    Customer.getAll()
      .then(customers => res.json({customers}) )
      .catch(next)
  })

api
  .route('/customer/:customerId?')
  .get(function (req, res, next) {
    if (req.params.customerId == null) return res.json({})
    Customer.byId(req.params.customerId)
      .then(customer => res.json({customer}) )
      .catch(next)
  })

//----- QUOTATIONS

api
  .route('/quotations')
  .get(function (req, res, next) {
    Quotation.getAllActive()
      .then(quotations => res.json({quotations}) )
      .catch(next)
  })

api
  .route('/quotation/:fakeId?')
  .get(function (req, res, next) {
    let isCreating        = req.params.fakeId == null
    let customersPromise  = Customer.getAll()
    let quotationPromise  = req.flash('quotation')[0]

    if (quotationPromise) {
      quotationPromise = Promise.resolve(quotationPromise)
    } else {
      if (isCreating) {
        quotationPromise = BusinessForm.getEmptyQuotation()
      } else {
        quotationPromise = BusinessForm.getByFakeId(req.params.fakeId, 'quotation')
      }
    }

    Promise
      .all([ customersPromise, quotationPromise, ])
      .then(function (body) {
        let [customers, quotation] = body
        return res.json({customers, quotation})
      })
      .catch(next)
  })

//----- INVOICES

api
  .route('/invoice/:fakeId?')
  .get(function (req, res, next) {
    BusinessForm
      .getByFakeId(req.params.fakeId, 'invoice')
      .then(function (invoice) {
        return res.json({invoice})
      })
      .catch(next)
  })

api.use(function (req, res, next) {
  console.log('api 404')
  res.sendStatus(404)
});

export {api as default, bootApi}
