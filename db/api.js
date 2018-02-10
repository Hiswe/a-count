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

router
  .route(`/customers`)
  .get( asyncMiddleware( async (req, res, next) => {
    const customers = await Customer.findAll()
    return res.json( customers )
  }))

router.use( (err, req, res, next)  => {
  if (err.reason == null) err.reason = err.toString()
  console.log( inspect(err, {colors: true}) )
  err.stacktrace = err.stacktrace || err.stack || false
  // force status for morgan to catch up
  res.status(err.status || err.statusCode || 500)
  res.json( err )
})

export { router as default }
