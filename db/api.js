import express from 'express'
import chalk from 'chalk'
import { inspect } from 'util'

import Customer from './model-customer'
import asyncMiddleware from '../server/express-async-middleware'

const router = express()

router
  .route('/')
  .get((req, res, next) => {
    res.json({
      name:    `concompte API`,
      version: `1.0.0`,
    })
  })

//////
// CUSTOMERS
//////

router
  .route(`/customers`)
  .get( asyncMiddleware( async (req, res, next) => {
    const customers = await Customer.findAll()
    return res.json( customers )
  }))

router
  .route(`/customers/new`)
  .get( asyncMiddleware( async (req, res, next) => {
    const customerTemplate = await Customer.describe()
    const blankCustomer = {}
    Object
    .entries( customerTemplate)
    .forEach( ([key, value]) => {
      if (value.defaultValue !== null) {
        return blankCustomer[ key ] = value.defaultValue
      }
      if (value.type === `TEXT` || value.type === `CHARACTER VARYING(255)` ) {
        blankCustomer[ key ] = ``
      }
    })
    return res.json( blankCustomer )
  }))
  .post( asyncMiddleware( async (req, res, next) => {
    const customer = await Customer.updateOrCreate( false, req.body )
    return res.json( customer )
  }))

router
  .route(`/customers/:id`)
  .get( asyncMiddleware( async (req, res, next) => {
    const customer = await Customer.findById( req.params.id )
    return res.json( customer )
  }))
  .post( asyncMiddleware( async (req, res, next) => {
    const customer = await Customer.updateOrCreate( req.body.id, req.body )
    return res.json( customer )
  }))

//////
// ERRORS
//////

router.use( (err, req, res, next)  => {
  if (err.reason == null) err.reason = err.toString()
  console.log( inspect(err, {colors: true}) )
  err.stacktrace = err.stacktrace || err.stack || false
  // force status for morgan to catch up
  res.status(err.status || err.statusCode || 500)
  res.json( err )
})

export { router as default }
