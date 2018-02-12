import Router from 'koa-router'
import chalk from 'chalk'
import { inspect } from 'util'

import Customer from './model-customer'

const router = new Router()

//////
// ERRORS
//////

router.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err, {colors: true}) )
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      name:    `concompte API`,
      version: `1.0.0`,
      message: err.message,
      stacktrace: err.stacktrace || err.stack || false,
    }
  }
})

//////
// INFOS
//////

router
.get( `/`, (ctx, next) => {
  ctx.body = {
    name:    `concompte API`,
    version: `1.0.0`,
  }
})

//////
// CUSTOMERS
//////

const customersRoutes = new Router({prefix: `/customers`})

customersRoutes
.get(`/`, async (ctx, next) => {
  const customers = await Customer.findAll()
  ctx.body = customers
})
//----- NEW
.get(`/new`, async (ctx, next) => {
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
  ctx.body = blankCustomer
})
.post(`/new`,  async (ctx, next) => {
  const { body } = ctx.request
  const customer = await Customer.updateOrCreate( false, body )
  ctx.body = customer
})
//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const customer = await Customer.findById( ctx.params.id )
  ctx.body = customer
})
.post(`/:id`, async (ctx, next) => {
  const { body } = ctx.request
  const customer = await Customer.updateOrCreate( body.id, body )
  ctx.body = customer
})

router
  .use( customersRoutes.routes() )
  .use( customersRoutes.allowedMethods() )

export { router as default }
