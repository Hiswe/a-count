'use strict'

import express from 'express'
import chalk from 'chalk'
import { inspect } from 'util'

// import * as Quotation     from '../db/quotation'
// import * as Invoice       from '../db/invoice'
// import * as Customer      from '../db/customer'
// import * as BusinessForm  from '../db/business-form'

const api = express()

let bootApi = {};

import { sequelize } from '../db'

let dbStatus    = true

//////
// DB CONFIG
//////

sequelize
.authenticate()
.then( () => {
  console.log(chalk.green('[DB] setup is done'))
  return sequelize
  .sync()
  .then( () => { console.log(chalk.green('[DB] sync is done')) } )
  .catch( err => {
    console.log( chalk.red('[DB] sync FAIL') )
    console.log( inspect(err, {colors: true}) )
  })
})
.catch( err => {
    console.log(chalk.red('[DB] setup FAIL'))
    console.log( inspect(err, {colors: true}) )
    dbStatus = err
    if (err.code !== 'ECONNREFUSED') return console.log(err)
    console.log(chalk.yellow('db is not acessible\nlaunch it for god sake'))
})

//////
// API
//////

api
.route('/')
.get((req, res, next) => {
  res.json({
    name:     'concompte API',
    version: '1.0.0',
  })
})

//----- HOME PAGES

api
  .route('/home')
  .get(function (req, res, next) {
    Promise
      // .all([Quotation.getAllActive(), Invoice.getAllActive()])
      .resolve( [[], []])
      .then(([quotations, invoices]) => {
        res.json({quotations, invoices})
      })
      .catch(next)
  })

api
  .route('/invoices')
  .get(function (req, res, next) {
    // Invoice.getAllActive()
    Promise.resolve( [] )
      .then(invoices => res.json({invoices}) )
      .catch(next)
  })

//----- CUSTOMER

api
  .route('/customers')
  .get(function (req, res, next) {
    // Customer.getAll()
    Promise.resolve( [] )
      .then(customers => res.json({customers}) )
      .catch(next)
  })

api
  .route('/customer/:customerId?')
  .get(function (req, res, next) {
    if (req.params.customerId == null) return res.sendStatus(404)
    // Customer.byId(req.params.customerId)
    Promise.resolve( {} )
      .then(customer => res.json({customer}) )
      .catch(next)
  })

//----- QUOTATIONS

api
.route('/quotations')
.get(function (req, res, next) {
  // Quotation.getAllActive()
  Promise.resolve( [] )
    .then(quotations => res.json({quotations}) )
    .catch(next)
})

api
.route('/quotation/:fakeId?')
.get(function (req, res, next) {
  let isCreating        = req.params.fakeId == null
  // let customersPromise  = Customer.getAll()
  let customersPromise  = Promise.resolve( [] )
  let quotationPromise  = req.flash('quotation')[0]

  if (quotationPromise) {
    // quotationPromise = Promise.resolve(quotationPromise)
    quotationPromise = Promise.resolve(quotationPromise)
  } else {
    if (isCreating) {
      // quotationPromise = BusinessForm.getEmptyQuotation()
      quotationPromise = Promise.resolve({})
    } else {
      // quotationPromise = Quotation.getByFakeId(req.params.fakeId)
      quotationPromise = Promise.resolve({})
    }
  }

  Promise
    .all([ customersPromise, quotationPromise, ])
    .then( ([customers, quotation]) => {
      return res.json({customers, quotation})
    })
    .catch(next)
})
.post( (req, res, next) => {
  console.log(req.body)
  const isCreating        = req.params.fakeId == null
  // let customersPromise    = Customer.getAll()
  let customersPromise    = Promise.resolve( [] )
  // let nextIndex           = Quotation.getNextIndex()
  let nextIndex           = Promise.resolve( {} )

  Promise
  .all([customersPromise, nextIndex])
  .then( ([customers, nextIndex]) => {
    res.json({
      customers: customers,
      nextIndex: nextIndex,
    })
  })
})

//----- INVOICES

api
  .route('/invoice/:fakeId?')
  .get( (req, res, next) => {
    // BusinessForm
    //   .getByFakeId(req.params.fakeId, 'invoice')
    Promise.resolve({})
      .then(  (invoice) => {
        return res.json({invoice})
      })
      .catch(next)
  })

api.use( (req, res, next) => {
  console.log('api 404')
  res.sendStatus(404)
});

export {api as default, bootApi}
